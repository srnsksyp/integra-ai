import { and, eq, inArray } from "drizzle-orm";
import JSONL from "jsonl-parse-stringify";
import { createAgent, openai, TextMessage } from "@inngest/agent-kit";

import { db } from "@/db";
import { agents, meetings, user } from "@/db/schema";
import { inngest } from "@/inngest/client";

import { StreamTranscriptItem } from "@/modules/meetings/types";

export const SUMMARY_FAILURE_MESSAGE = "Summary generation failed. Please retry.";

const summarizer = createAgent({
  name: "summarizer",
  system: `
        You are an expert summarizer. You write readable, concise, simple content. You are given a transcript of a meeting and you need to summarize it.

        Use the following markdown structure for every output:

        ### Overview
        Provide a detailed, engaging summary of the session's content. Focus on major features, user workflows, and any key takeaways. Write in a narrative style, using full sentences. Highlight unique or powerful aspects of the product, platform, or discussion.

        ### Notes
        Break down key content into thematic sections with timestamp ranges. Each section should summarize key points, actions, or demos in bullet format.

        Example:
        #### Section Name
        - Main point or demo shown here
        - Another key insight or interaction
        - Follow-up tool or explanation provided

        #### Next Section
        - Feature X automatically does Y
        - Mention of integration with Z
    `.trim(),
  model: openai({ model: "gpt-4o", apiKey: process.env.OPENAI_API_KEY }),
});

export const meetingsProcessing = inngest.createFunction(
  {
    id: "meetings/processing",
    onFailure: async ({ event, error }) => {
      console.error("Meeting summary generation failed", {
        meetingId: event.data.event.data.meetingId,
        error: error instanceof Error ? error.message : String(error),
      });

      await db
        .update(meetings)
        .set({ status: "cancelled", summary: SUMMARY_FAILURE_MESSAGE })
        .where(
          and(
            eq(meetings.id, event.data.event.data.meetingId),
            eq(meetings.status, "processing")
          )
        );
    },
  },
  { event: "meetings/processing" },
  async ({ event, step }) => {
    const response = await step.run("fetch-transcript", async () => {
      const result = await fetch(event.data.transcriptUrl);
      if (!result.ok) {
        throw new Error(`Transcript fetch failed with status ${result.status}`);
      }
      const text = await result.text();
      if (!text.trim()) throw new Error("Transcript response was empty");
      return text;
    });

    const transcript = await step.run("parse-transcript", async () => {
      const parsed = JSONL.parse<StreamTranscriptItem>(response);
      if (!parsed.length) throw new Error("Transcript contained no entries");
      return parsed;
    });

    const transcriptWithSpeakers = await step.run("add-speakers", async () => {
      const speakerIds = [
        ...new Set(transcript.map((item) => item.speaker_id)),
      ];

      const userSpeakers = await db
        .select()
        .from(user)
        .where(inArray(user.id, speakerIds))
        .then((users) =>
          users.map((user) => ({
            ...user,
          }))
        );

      const agentSpeakers = await db
        .select()
        .from(agents)
        .where(inArray(agents.id, speakerIds))
        .then((agents) =>
          agents.map((agent) => ({
            ...agent,
          }))
        );

      const speakers = [...userSpeakers, ...agentSpeakers];

      return transcript.map((item) => {
        const speaker = speakers.find(
          (speaker) => speaker.id === item.speaker_id
        );

        if (!speaker) {
          return {
            ...item,
            user: {
              name: "Unknown",
            },
          };
        }

        return {
          ...item,
          user: {
            name: speaker.name,
          },
        };
      });
    });

    const { output } = await summarizer.run(
      "Summarize the following transcript: " +
        JSON.stringify(transcriptWithSpeakers)
    );

    await step.run("save-summary", async () => {
      await db
        .update(meetings)
        .set({
          summary: (output[0] as TextMessage).content as string,
          status: "completed",
        })
        .where(
          and(
            eq(meetings.id, event.data.meetingId),
            eq(meetings.status, "processing")
          )
        );
    });
  }
);
