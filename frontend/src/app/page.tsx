"use client";
import { useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import ChatIcon from "@mui/icons-material/Chat";

const users = [
  { id: 1, name: "Andi", status: "Offline" },
  { id: 2, name: "Rendi", status: "Online" },
  { id: 3, name: "Renala", status: "Offline" },
];

export default function Chat() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Halo! Selamat datang di chat.", sender: "system" },
    { id: 2, text: "apakah aq sudah gila", sender: "user" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        { id: messages.length + 1, text: newMessage, sender: "user" },
      ]);
      setNewMessage("");
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-800 p-4 flex flex-col justify-between shadow-lg">
        {/* Header */}
        <h2 className="text-2xl font-bold text-neon-blue mb-4 flex items-center">
          <ChatIcon fontSize="large" className="mr-2" /> Chat
        </h2>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search"
          className="w-full p-2 rounded bg-gray-700 text-white mb-4 focus:outline-none focus:ring-2 focus:ring-neon-blue"
        />

        {/* User List */}
        <div className="flex-grow space-y-2">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center gap-2 p-3 bg-gray-700 rounded cursor-pointer hover:bg-gray-600 transition duration-200 border-l-4 border-transparent hover:border-neon-blue"
            >
              <div
                className={`text-xl ${
                  user.status === "Online" ? "text-green-500" : "text-red-500"
                }`}
              >
                ●
              </div>
              <div>
                <span className="block font-semibold">{user.name}</span>
                <span className="text-sm text-gray-400">{user.status}</span>
              </div>
            </div>
          ))}
        </div>

        {/* User Account & Logout */}
        <div className="flex items-center justify-between p-3 bg-gray-700 rounded mb-8">
          <div className="flex items-center gap-2">
            <div className="text-2xl text-neon-pink">👤</div>
            <span className="font-semibold">HaloZra</span>
          </div>
          <button className="p-2 rounded bg-red-600 hover:bg-red-700 transition text-white">
            <LogoutIcon />
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="bg-gray-800 p-4 text-center text-lg font-bold border-b border-gray-700">
          Chat App
        </div>
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

        {/* Input Chat */}
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
      </div>
    </div>
  );
}
