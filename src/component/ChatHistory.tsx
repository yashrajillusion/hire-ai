import React, { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";

interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

interface ChatHistoryProps {
  messages: SavedMessage[];
}

const ChatHistory = ({ messages }: ChatHistoryProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-b from-gray-900 to-black border-l border-gray-800">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-gray-900 to-black border-b border-gray-800">
        <h2 className="text-lg font-semibold text-white">Chat History</h2>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-5 overflow-y-auto chat-container">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center opacity-60">
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <p className="text-gray-400 text-sm">No messages yet...</p>
            <p className="text-gray-500 text-xs mt-2">
              Start speaking to begin the conversation
            </p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <ChatMessage key={index} role={msg.role} content={msg.content} />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatHistory;
