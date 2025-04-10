import { PhoneCall } from "lucide-react";

interface CallConnectButtonProps {
  onClick: () => void;
}

const CallConnectButton = ({ onClick }: CallConnectButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="
        flex items-center gap-2 
        px-6 py-3 
        bg-gradient-to-r from-green-600 to-emerald-600 
        hover:from-green-500 hover:to-emerald-500
        text-white font-medium rounded-full
        shadow-lg shadow-green-500/20
        transition-all duration-300 ease-out
        hover:scale-105 active:scale-95
      "
    >
      <PhoneCall className="h-5 w-5" />
      <span>Start Call</span>
    </button>
  );
};

export default CallConnectButton;
