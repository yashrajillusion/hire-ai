import { PhoneOff } from "lucide-react";

interface HangUpButtonProps {
  onClick: () => void;
}

const HangUpButton = ({ onClick }: HangUpButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="
        flex items-center gap-2 
        px-6 py-3 
        bg-gradient-to-r from-rose-600 to-red-600 
        hover:from-rose-500 hover:to-red-500
        text-white font-medium rounded-full
        shadow-lg shadow-red-500/20
        transition-all duration-300 ease-out
        hover:scale-105 active:scale-95
      "
    >
      <PhoneOff className="h-5 w-5" />
      <span>Hang Up</span>
    </button>
  );
};

export default HangUpButton;
