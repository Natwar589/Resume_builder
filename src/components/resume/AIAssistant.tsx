"use client";

import { defaultResumeData } from "@/lib/resumeData";
import { ResumeData } from "@/lib/resumeTypes";
import { useEffect } from "react";

interface AIAssistantProps {
  onResumeUpdate?: (data: ResumeData) => void;
}

export function AIAssistant({ onResumeUpdate }: AIAssistantProps) {
  useEffect(() => {
    // @ts-ignore
    if (typeof window.sendDataToChatbot !== "undefined") {
      // @ts-ignore
      window.SendDataToChatbot({ "parentId": "chatbot-main-container" })
    }

    setTimeout(() => {
      // @ts-ignore
      window.SendDataToChatbot({ "parentId": "chatbot-main-container" })
      // @ts-ignore
      const variables = { defaultResumeData };
      // @ts-ignore
      window.SendDataToChatbot({ "variables": variables })

      // @ts-ignore
      window.openChatbot();
      return () => {
        // @ts-ignore
        window.closeChatbot();
      }
    }, 1000)
  }, []);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      try {
        const payload = typeof event.data === "string"
          ? JSON.parse(event.data)
          : event.data;

        if (payload?.type === "MESSAGE_RECEIVED" && payload?.data) {
          const inner = typeof payload.data === "string"
            ? JSON.parse(payload.data)
            : payload.data;

          const updatedResume: ResumeData | undefined = inner?.updated_resume;

          if (updatedResume && onResumeUpdate) {
            onResumeUpdate(updatedResume);
          }
        }
      } catch {
        // not a parseable resume message — ignore
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [onResumeUpdate]);


  return (
    <div id="chatbot-main-container" className="w-[97%] h-full">
    </div>
  );
}
