import React from "react";

interface Message {
  id: number;
  text: string;
  sender: string;
}

interface MessagesProps {
  messages: Message[];
}

export default function MessageList({ messages }: MessagesProps) {
  return (
    <div className="flex-1 p-4 overflow-y-auto space-y-3">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`max-w-xs p-3 rounded-lg shadow-lg transition duration-200 ${
            msg.sender === "user"
              ? "bg-neon-purple self-end rounded-br-none"
              : "bg-neon-blue self-start rounded-bl-none"
          }`}
        >
          {msg.text}
        </div>
      ))}
    </div>
  );
}
