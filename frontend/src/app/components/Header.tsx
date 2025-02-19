import { FC } from "react";
import ChatIcon from "@mui/icons-material/Chat";
import ScatterPlotIcon from "@mui/icons-material/ScatterPlot";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Header: FC = () => {
  return (
    <div className="h-screen bg-gray-600 w-20 flex flex-col items-center p-6 gap-10 justify-between">
      <div className="flex flex-col gap-6">
        <button
          type="button"
          aria-label="Chat"
          className="w-12 h-12 bg-white rounded-3xl hover:bg-black/20 flex justify-center items-center"
        >
          <ChatIcon />
        </button>
        <button
          type="button"
          aria-label="Scatter Plot"
          className="w-12 h-12 bg-white rounded-3xl hover:bg-black/20 flex justify-center items-center"
        >
          <ScatterPlotIcon />
        </button>
      </div>
      <button
        type="button"
        aria-label="Profile"
        className="w-12 h-12 bg-white rounded-3xl hover:bg-black/20 flex justify-center items-center"
      >
        <AccountCircleIcon />
      </button>
    </div>
  );
};

export default Header;
