import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const dataMemory = {
  id: [1, 2, 3],
  nama: ["Andi", "Rendi", "Renala"],
  typingLatests: ["Kamu ngetik", "Maneh ngetik"], // Cuma ada 2 item
};

export default function MainContact() {
  return (
    <div className="w-1/4 bg-gray-800 p-4 text-white w-full">
      {/* Title */}
      <h2 className="text-xl font-bold mb-4">Chat</h2>

      {/* Search Box */}
      <input
        type="text"
        placeholder="Search"
        className="w-full p-2 rounded bg-gray-700 text-white mb-4 focus:outline-none"
      />

      {/* Contact List */}
      <div className="space-y-2">
        {dataMemory.id.map((id, index) => (
          <div key={id} className="flex items-center gap-2 p-2 bg-gray-700 rounded">
            {/* Icon */}
            <AccountCircleIcon fontSize="large" />

            {/* Nama dan Status */}
            <div>
              <span className="block font-semibold">{dataMemory.nama[index]}</span>
              <span className="text-sm text-gray-400">
                {dataMemory.typingLatests[index] || "Online"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
