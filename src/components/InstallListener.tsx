"use client";
import { useEffect } from "react";
import useStore from "@/hooks/useStore";

export interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
}

export default function InstallListener() {
  const setInstallDeferredPrompt = useStore((s) => s.setInstallDeferredPrompt);

  // Listen for PWA install event
  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setInstallDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, [setInstallDeferredPrompt]);

  return null;
}
