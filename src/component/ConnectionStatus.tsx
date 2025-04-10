import { Loader2 } from "lucide-react";

const ConnectionStatus = () => {
  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full scale-150 animate-pulse"></div>
        <div className="p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full relative ">
          <Loader2 className="h-16 w-16 text-white animate-spin" />
        </div>
        <div className="absolute inset-0 border-2 border-indigo-500/30 rounded-full ripple-animation"></div>
        <div
          className="absolute inset-0 border-2 border-indigo-500/20 rounded-full ripple-animation"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute inset-0 border-2 border-indigo-500/10 rounded-full ripple-animation"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>
      <div className="bg-black/50 px-5 py-2 rounded-full backdrop-blur-sm">
        <p className="text-lg font-medium text-indigo-200 animate-pulse">
          Connecting...
        </p>
      </div>
    </div>
  );
};

export default ConnectionStatus;
