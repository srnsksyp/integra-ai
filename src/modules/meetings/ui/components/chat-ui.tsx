import { useCallback, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import type { Channel as StreamChannel } from "stream-chat";
import {
  useCreateChatClient,
  Chat,
  Channel,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";

import { useTRPC } from "@/trpc/client";
import { LoadingState } from "@/components/loading-state";
import { Button } from "@/components/ui/button";

import "stream-chat-react/dist/css/v2/index.css";

interface ChatUIProps {
  meetingId: string;
  meetingName: string;
  userId: string;
  userName: string;
  userImage: string | undefined;
}

export const ChatUI = ({
  meetingId,
  meetingName,
  userId,
  userName,
  userImage,
}: ChatUIProps) => {
  const trpc = useTRPC();
  const { mutateAsync: generateChatToken } = useMutation(
    trpc.meetings.generateChatToken.mutationOptions()
  );

  const [channel, setChannel] = useState<StreamChannel>();
  const [connectionState, setConnectionState] = useState<
    "connecting" | "connected" | "disconnected" | "reconnecting"
  >("connecting");
  const [initializationError, setInitializationError] = useState<string>();
  const [attempt, setAttempt] = useState(0);
  const tokenProvider = useCallback(async () => {
    try {
      const { token } = await generateChatToken();
      if (!token) throw new Error("Chat token was empty");
      return token;
    } catch (error) {
      console.error("Stream Chat token generation failed", error);
      setInitializationError("We couldn't connect to chat. Please try again.");
      throw error;
    }
  }, [generateChatToken, attempt]);

  const client = useCreateChatClient({
    apiKey: process.env.NEXT_PUBLIC_STREAM_CHAT_API_KEY!,
    tokenOrProvider: tokenProvider,
    userData: {
      id: userId,
      name: userName,
      image: userImage,
    },
  });

  useEffect(() => {
    if (!client) return;

    setInitializationError(undefined);
    setConnectionState("connecting");

    const handleConnectionChange = (event: { online?: boolean }) => {
      setConnectionState(event.online ? "reconnecting" : "disconnected");
    };
    const handleConnectionRecovered = () => setConnectionState("connected");
    const handleBrowserOnline = () => setConnectionState("reconnecting");
    const handleBrowserOffline = () => setConnectionState("disconnected");

    client.on("connection.changed", handleConnectionChange);
    client.on("connection.recovered", handleConnectionRecovered);
    window.addEventListener("online", handleBrowserOnline);
    window.addEventListener("offline", handleBrowserOffline);

    const channel = client.channel("messaging", meetingId, {
      members: [userId],
    });

    setChannel(channel);

    return () => {
      client.off("connection.changed", handleConnectionChange);
      client.off("connection.recovered", handleConnectionRecovered);
      window.removeEventListener("online", handleBrowserOnline);
      window.removeEventListener("offline", handleBrowserOffline);
      setChannel(undefined);
    };
  }, [client, meetingId, meetingName, userId]);

  const retry = () => {
    if (initializationError) {
      setInitializationError(undefined);
      setConnectionState("connecting");
      setChannel(undefined);
      setAttempt((current) => current + 1);
    }
  };

  if (initializationError) {
    return (
      <div className="bg-white rounded-lg border p-6 flex flex-col gap-4 items-center justify-center">
        <p className="text-sm text-red-600">{initializationError}</p>
        <Button onClick={retry}>Retry</Button>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="overflow-y-hidden h-[70vh]">
        <LoadingState
          title="Loading Chat"
          description="This may take a few seconds"
        />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border outline-hidden">
      <Chat client={client}>
        {connectionState !== "connected" && (
          <div className="px-4 py-2 text-sm text-amber-700 bg-amber-50 border-b">
            {connectionState === "reconnecting"
              ? "Reconnecting to chat…"
              : connectionState === "disconnected"
                ? "Chat is offline. We’ll reconnect when the network is available."
                : "Connecting to chat…"}
          </div>
        )}
        <Channel channel={channel}>
          <Window>
            <div className="flex-1 overflow-y-auto max-h-[calc(100vh-23rem)] border-b">
              <MessageList />
            </div>
            <MessageInput />
            <p className="px-4 pb-2 text-xs text-muted-foreground">
              Assistant replies may take a moment to arrive.
            </p>
          </Window>
          <Thread />
        </Channel>
      </Chat>
    </div>
  );
};
