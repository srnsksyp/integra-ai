import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import type { MeetingGetOne } from "../../types";

export const ProcessingState = ({ meeting, onRetry, isRetrying, error }: { meeting: MeetingGetOne; onRetry: () => void; isRetrying: boolean; error?: string }) => {
  const failed = meeting.summary === "Summary generation failed. Please retry.";
  return (
    <div className="bg-white rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center">
      <EmptyState
        image="/processing.svg"
        title={failed ? "Summary generation failed" : "Generating summary"}
        description={failed ? "We couldn't generate a summary. You can retry now." : "Your transcript is being processed. This may take a few minutes."}
      />
      {failed && <Button onClick={onRetry} disabled={isRetrying || !meeting.transcriptUrl}>{isRetrying && <Loader2 className="mr-2 size-4 animate-spin" />}Retry Summary</Button>}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};
