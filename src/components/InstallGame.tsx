/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import Button from "@/components/ui/button";
import GamepadIcon from "@/components/ui/icons/gamepad";
import ShareIcon from "@/components/ui/icons/share";

export default function InstallGame() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  useEffect(() => {
    // Detect iOS
    setIsIOS(
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream,
    );

    // Detect if PWA
    setIsStandalone(window.matchMedia("(display-mode: standalone)").matches);

    // Listen for Android PWA install event
    const handler = (e: { preventDefault: () => void }) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      // Android
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        console.log("User choice:", choiceResult.outcome);
        setDeferredPrompt(null);
      });
    } else if (isIOS) {
      // iOS
      setShowIOSGuide(true);
    }
  };

  // Show only if install is possible on Android or iOSs
  if (!deferredPrompt && !isIOS) return null;

  // Don't show install button if already installed
  if (isStandalone) {
    return null;
  }

  return (
    <div className="install-app bg-tile-background border-key-background absolute bottom-0 flex w-full flex-col gap-4 rounded-2xl border p-4">
      {!showIOSGuide ? (
        <>
          <p className="text-lg">
            Install the game on your device to play offline and access it
            instantly.
          </p>
          <Button
            onClick={handleInstallClick}
            className="flex w-fit flex-1 items-center gap-2 rounded-xl !py-1 normal-case"
            aria-label="Install"
            whileTap={{ scale: 0.95 }}
          >
            <GamepadIcon className="size-4" />
            Install
          </Button>
        </>
      ) : (
        <p className="text-lg">
          To install this app on your iOS device, tap the share button
          <span role="img" aria-label="share icon">
            <ShareIcon className="mx-2 inline size-4" />
          </span>
          and then &quot;
          <span className="font-semibold">Add to Home Screen</span>
          &quot;.
        </p>
      )}
    </div>
  );
}
