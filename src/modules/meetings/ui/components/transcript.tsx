import { useState } from "react";
import { format } from "date-fns";
import { Loader2, RefreshCw, SearchIcon } from "lucide-react";
import Highlighter from "react-highlight-words";
import { useQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { generateAvatarUri } from "@/lib/avatar";
import { formatTranscriptTimestamp } from "./format-transcript-timestamp";

interface Props {
  meetingId: string;
}

export const Transcript = ({ meetingId }: Props) => {
  const trpc = useTRPC();
  const { data, isPending, isError, refetch, isRefetching } = useQuery(
    trpc.meetings.getTranscript.queryOptions({ id: meetingId })
  );

  const [searchQuery, setSearchQuery] = useState("");
  const filteredData = (data ?? []).filter((item) =>
    item.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg border px-4 py-5 flex flex-col gap-y-4 w-full">
      <p className="text-sm font-medium">Transcript</p>
      {!isPending && !isError && data?.length !== 0 && <div className="relative">
        <Input
          placeholder="Search Transcript"
          className="pl-7 h-9 w-[240px]"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <SearchIcon className="size-4 absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
      </div>}
      <ScrollArea>
        <div className="flex flex-col gap-y-4">
          {isPending && (
            <div role="status" aria-label="Loading transcript" className="space-y-4">
              <Loader2 className="size-5 animate-spin text-muted-foreground" aria-hidden="true" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          )}
          {isError && (
            <div role="alert" className="flex flex-col items-start gap-3 rounded-md border p-4">
              <p className="text-sm text-muted-foreground">
                We couldn’t load this transcript. Please try again.
              </p>
              <Button type="button" variant="outline" size="sm" onClick={() => refetch()} disabled={isRefetching}>
                <RefreshCw className="mr-2 size-4" aria-hidden="true" />
                {isRefetching ? "Retrying…" : "Retry"}
              </Button>
            </div>
          )}
          {!isPending && !isError && data?.length === 0 && (
            <p className="text-sm text-muted-foreground" role="status">
              No transcript is available for this meeting.
            </p>
          )}
          {filteredData.map((item) => {
            const timestamp = formatTranscriptTimestamp(item.start_ts);

            return (
              <div
                key={item.start_ts}
                className="flex flex-col gap-y-2 hover:bg-muted p-4 rounded-md border"
              >
                <div className="flex gap-x-2 items-center">
                  <Avatar className="size-6">
                    <AvatarImage
                      src={item.user.image ?? generateAvatarUri({ seed: item.user.name, variant: "initials"})}
                      alt="User Avatar"
                    />
                  </Avatar>
                  <p className="text-sm font-medium">{item.user.name}</p>
                  {timestamp && (
                    <p className="text-xs text-blue-500 font-medium">
                      {timestamp}
                    </p>
                  )}
                </div>
                <Highlighter 
                    className="text-sm text-neutral-700"
                    highlightClassName="bg-yellow-200"
                    searchWords={[searchQuery]}
                    autoEscape={true}
                    textToHighlight={item.text}
                />
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};
