interface ChatMessageProps {
  role: "user" | "system" | "assistant";
  content: string;
}

const ChatMessage = ({ role, content }: ChatMessageProps) => {
  return (
    <div
      className={`p-4 max-w-[85%] shadow-md,
        ${
          role === "user"
            ? "user-bubble ml-auto text-white"
            : "assistant-bubble text-gray-100"
        }`}
    >
      <div className="flex items-center mb-2">
        <span className="text-xs font-semibold opacity-80">
          {role === "user" ? "You" : "Assistant"}
        </span>
      </div>
      <p className="text-sm leading-relaxed">{content}</p>
    </div>
  );
};

export default ChatMessage;
