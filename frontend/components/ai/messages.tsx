import type { Message as TMessage } from "ai";
import { Message } from "./message";
import { useScrollToBottom } from "@/hooks/use-scroll-to-bottom";
import { motion } from "motion/react";
import { SparklesIcon } from "lucide-react";
import { SpinnerIcon } from "./icons";

// ThinkingIndicator component to show when the model is thinking
const ThinkingIndicator = () => {
  return (
    <motion.div
      className="w-full mx-auto px-4"
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      data-role="assistant"
    >
      <div className="flex gap-4 w-full">
        <div className="size-8 flex items-center rounded-full justify-center ring-1 shrink-0 ring-border bg-background">
          <div className="">
            <SparklesIcon size={14} />
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
          <div className="animate-spin">
            <SpinnerIcon />
          </div>
          <div>Thinking...</div>
        </div>
      </div>
    </motion.div>
  );
};

export const Messages = ({
  messages,
  isLoading,
  status,
}: {
  messages: TMessage[];
  isLoading: boolean;
  status: "error" | "submitted" | "streaming" | "ready";
}) => {
  const [containerRef, endRef] = useScrollToBottom();
  return (
    <div
      className="flex-1 h-full space-y-4 overflow-y-auto py-8"
      ref={containerRef}
    >
      <div className="max-w-3xl mx-auto pt-8">
        {messages.map((m, i) => (
          <Message
            key={i}
            isLatestMessage={i === messages.length - 1}
            isLoading={isLoading}
            message={m}
            status={status}
          />
        ))}
        {status === "submitted" && <ThinkingIndicator />}
        <div className="h-1" ref={endRef} />
      </div>
    </div>
  );
};
