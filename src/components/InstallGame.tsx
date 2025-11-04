/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import Button from "@/components/ui/button";
import GamepadIcon from "@/components/ui/icons/gamepad";
import ShareIcon from "@/components/ui/icons/share";
import useStore from "@/hooks/useStore";

export default function InstallGame() {
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const installdeferredPrompt = useStore((s) => s.installdeferredPrompt);

  useEffect(() => {
    // Detect iOS
    setIsIOS(
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream,
    );
    // Detect if PWA
    setIsStandalone(window.matchMedia("(display-mode: standalone)").matches);
  }, []);

  const handleInstallClick = () => {
    if (installdeferredPrompt) {
      installdeferredPrompt.prompt();
      installdeferredPrompt.userChoice.then((choiceResult: any) => {
        console.log("User choice:", choiceResult.outcome);
      });
    } else {
      setShowGuide(true);
    }
  };

  // Don't show install button if already installed
  if (isStandalone) {
    return null;
  }

  return (
    <div className="install-app bg-tile-background border-key-background absolute bottom-0 flex w-full flex-col gap-4 rounded-2xl border p-4">
      {!showGuide && (
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
      )}

      {/* iOS guide */}
      {showGuide && isIOS && (
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

      {/* Android/Desktop guide */}
      {showGuide && !isIOS && (
        <p className="text-lg">
          To install, open the browser menu and tap the option &quot;
          <span className="font-semibold">Add to Home Screen</span>
          &quot;. or click the install icon in the address bar.
        </p>
      )}
    </div>
  );
}
