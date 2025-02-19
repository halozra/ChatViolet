import { useState } from "react";

export default function MainContent() {
  const [messages, setMessages] = useState(["Halo! Selamat datang di chat."]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim() !== "") {
      setMessages([...messages, input]);
      setInput("");
    }
  };

  return (
    <div className="w-screen h-screen bg-gray-900 flex">


      {/* Chat Box */}
      <div className="flex-1 flex flex-col h-screen bg-gray-100">
        {/* Header */}
        <div className="h-16 bg-gray-600 text-white flex items-center justify-center text-lg font-bold">
          Chat App
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {messages.map((msg, index) => (
            <div key={index} className="bg-gray-500 text-white p-2 rounded-lg w-fit">
              {msg}
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <div className="h-16 bg-gray-200 flex items-center px-4">
          <input
            type="text"
            placeholder="Ketik pesan..."
            className="flex-1 px-3 py-2 border rounded-lg focus:outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            className="ml-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            onClick={sendMessage}
          >
            Kirim
          </button>
        </div>
      </div>
    </div>
  );
}
