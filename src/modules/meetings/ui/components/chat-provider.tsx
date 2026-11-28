"use client";

import { authClient } from "@/lib/auth-client";
import { LoadingState } from "@/components/loading-state";
import { ErrorState } from "@/components/error-state";
import { Button } from "@/components/ui/button";

import { ChatUI } from "./chat-ui";

interface Props {
  meetingId: string;
  meetingName: string;
}

export const ChatProvider = ({ meetingId, meetingName }: Props) => {
  const { data, isPending, error } = authClient.useSession();

  if (error) {
    return (
      <div className="flex flex-col gap-3 items-center">
        <ErrorState
          title="Unable to load chat session"
          description="Please try again before opening the meeting chat"
        />
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  if (isPending) {
    return (
      <LoadingState
        title="Loading..."
        description="Please wait while we load the chat"
      />
    );
  }

  if (!data?.user) {
    return (
      <div className="flex flex-col gap-3 items-center">
        <ErrorState
          title="Chat session unavailable"
          description="Please sign in again to use meeting chat"
        />
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }
  return (
    <ChatUI
      meetingId={meetingId}
      meetingName={meetingName}
      userId={data.user.id}
      userName={data.user.name}
      userImage={data.user.image ?? ""}
    />
  );
};
