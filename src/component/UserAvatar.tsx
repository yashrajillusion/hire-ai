import { User, Mic, MicOff } from "lucide-react";

interface UserAvatarProps {
  isSpeaking: boolean;
}

const UserAvatar = ({ isSpeaking }: UserAvatarProps) => {
  return (
    <div className="relative">
      <div
        className={`
        relative overflow-hidden 
        bg-gradient-to-br from-gray-800 to-gray-900 
        rounded-2xl w-72 h-56 
        flex items-center justify-center
        transition-all duration-300
        ${isSpeaking ? "speaking-animation" : ""}
      `}
      >
        {/* User Avatar Icon */}
        <div
          className={`
          p-6 rounded-full 
          bg-gradient-to-br from-gray-700 to-gray-800
          ${isSpeaking ? "breathing-animation" : ""}
        `}
        >
          {isSpeaking && (
            <>
              <div className="absolute inset-0 border-2 border-indigo-500/30 rounded-full ripple-animation"></div>
              <div
                className="absolute inset-0 border-2 border-indigo-500/20 rounded-full ripple-animation"
                style={{ animationDelay: "0.5s" }}
              ></div>
            </>
          )}

          <User className="h-16 w-16 text-gray-300" />
        </div>

        {/* Mic Status */}
        <div className="absolute top-3 right-3 p-1.5 bg-gray-900/70 rounded-full">
          {isSpeaking ? (
            <Mic className="h-5 w-5 text-indigo-400" />
          ) : (
            <Mic className="h-5 w-5 text-gray-400" />
          )}
        </div>

        {/* Speaking Indicator Rings */}
        {isSpeaking && (
          <>
            <div className="absolute inset-0 border border-indigo-500/30 rounded-2xl"></div>
            <div
              className="absolute inset-0 border border-indigo-500/20 rounded-2xl"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div
              className="absolute inset-0 border border-indigo-500/10 rounded-2xl"
              style={{ animationDelay: "1s" }}
            ></div>
          </>
        )}

        {/* User Name Label */}
        <div className="absolute bottom-3 left-3 bg-black/60 px-2.5 py-1 rounded-lg backdrop-blur-sm">
          <span className="text-sm font-medium text-white">You</span>
        </div>
      </div>
    </div>
  );
};

export default UserAvatar;
