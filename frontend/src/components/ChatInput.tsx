import React from "react";

interface ChatInputProps {
  newMessage: string;
  setNewMessage: (value: string) => void;
  sendMessage: () => void;
}

export default function ChatInput({
  newMessage,
  setNewMessage,
  sendMessage,
}: ChatInputProps) {
  return (
    <div className="p-4 flex items-center border-t border-gray-700">
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Ketik pesan..."
        className="flex-1 p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-neon-blue"
      />
      <button
        onClick={sendMessage}
        className="ml-2 p-3 rounded bg-neon-green hover:bg-neon-blue transition"
      >
        Kirim
      </button>
    </div>
  );
}
