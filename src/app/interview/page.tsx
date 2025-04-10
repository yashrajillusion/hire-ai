"use client";

import Vapi from "@vapi-ai/web";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import ChatHistory from "@/component/ChatHistory";
import HangUpButton from "@/component/HangUpButton";
import UserAvatar from "@/component/UserAvatar";
import ConnectionStatus from "@/component/ConnectionStatus";
import CallConnectButton from "@/component/CallConnectButton";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

export default function Interview() {
  const vapi = useMemo(
    () =>
      new Vapi(process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN!, undefined, {
        alwaysIncludeMicInPermissionPrompt: true,
      }),
    []
  );
  const router = useRouter();
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    const handleCallStart = () => setCallStatus(CallStatus.ACTIVE);
    const handleCallEnd = () => {
      setCallStatus(CallStatus.FINISHED);
      router.push("/");
    };
    const handleMessage = (message: any) => {
      if (
        message?.type === "transcript" &&
        message?.transcriptType === "final"
      ) {
        setMessages((prev) => [
          ...prev,
          { role: message.role, content: message.transcript },
        ]);
      }
    };
    const handleSpeechStart = () => setIsSpeaking(true);
    const handleSpeechEnd = () => setIsSpeaking(false);
    const handleError = (error: Error) => console.error("VAPI Error:", error);

    vapi.on("call-start", handleCallStart);
    vapi.on("call-end", handleCallEnd);
    vapi.on("message", handleMessage);
    vapi.on("speech-start", handleSpeechStart);
    vapi.on("speech-end", handleSpeechEnd);
    vapi.on("error", handleError);

    // handleCall()

    return () => {
      vapi.off("call-start", handleCallStart);
      vapi.off("call-end", handleCallEnd);
      vapi.off("message", handleMessage);
      vapi.off("speech-start", handleSpeechStart);
      vapi.off("speech-end", handleSpeechEnd);
      vapi.off("error", handleError);
    };
  }, [vapi, router]);

  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);
    await vapi.start(process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID!);
  };

  const handleDisconnect = () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
    router.push("/");
  };

  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-gray-950 to-black text-white overflow-hidden">
      <div className="w-2/3 flex flex-col items-center justify-center relative overflow-hidden">
        {callStatus === CallStatus.INACTIVE && (
          <div className="flex flex-col items-center space-y-8">
            <div className="relative p-4 rounded-3xl bg-gradient-to-br from-gray-900 to-gray-950 shadow-xl mb-8">
              <UserAvatar isSpeaking={false} />
            </div>

            <CallConnectButton onClick={handleCall} />
          </div>
        )}

        {callStatus === CallStatus.CONNECTING && <ConnectionStatus />}

        {callStatus === CallStatus.ACTIVE && (
          <div className="flex flex-col items-center space-y-8">
            <UserAvatar isSpeaking={isSpeaking} />

            <div className="mt-8">
              <HangUpButton onClick={handleDisconnect} />
            </div>
          </div>
        )}
      </div>

      <div className="w-1/3">
        <ChatHistory messages={messages} />
      </div>
    </div>
  );
}
