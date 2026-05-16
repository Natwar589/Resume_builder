"use client";

import { useEffect } from "react";

const EMBED_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdfaWQiOiIxODc3NCIsImNoYXRib3RfaWQiOiI2ODkzMTBlMjNmOTg1N2U3MzhhYjgzODUiLCJ1c2VyX2lkIjoibnNyIn0.PNtDW4vkZEc7CDhQkS2fajfY4k2dxWGbXpt157lKmkw";

/**
 * Loads the GTWY chatbot script once, globally, at app startup.
 * Renders nothing — purely a side-effect component placed in the root layout.
 */
export function GtwyChatbotScript() {
  useEffect(() => {
    if (document.getElementById("chatbot-main-script")) return;

    const script = document.createElement("script");
    script.id = "chatbot-main-script";
    script.src = "https://chatbot.gtwy.ai/chatbot.js";
    script.setAttribute("embedToken", EMBED_TOKEN);
    script.setAttribute("bridgeName", "resume_builder");
    script.setAttribute("hideIcon", "true");
    script.setAttribute("theme", "dark");
    script.setAttribute("parentId", "chatbot-main-container");
    script.setAttribute("chatTitle", "AI Resume Reviewer");
    script.setAttribute("fullScreen", "true");
    script.setAttribute("threadId", crypto.randomUUID());
    script.async = true;

    document.body.appendChild(script);
  }, []);

  return null;
}
