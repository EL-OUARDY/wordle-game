/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import Button from "@/components/ui/button";
import GamepadIcon from "@/components/ui/icons/gamepad";
import ShareIcon from "@/components/ui/icons/share";
import useStore from "@/hooks/useStore";
import { useTranslations } from "next-intl";
import clsx from "clsx";

interface Props {
  className?: string;
}

export default function InstallGame({ className }: Props) {
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const installdeferredPrompt = useStore((s) => s.installdeferredPrompt);

  const t = useTranslations("Settings");

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
    <div
      className={clsx(
        "install-app bg-tile-background border-key-background flex w-full flex-col gap-4 rounded-2xl border p-4",
        className,
      )}
    >
      {!showGuide && (
        <>
          <p className="">{t("pwaInstall.description")}</p>
          <Button
            onClick={handleInstallClick}
            className="flex w-fit flex-1 items-center gap-2 rounded-xl !py-1 normal-case"
            aria-label={t("pwaInstall.button")}
            whileTap={{ scale: 0.95 }}
          >
            <GamepadIcon className="size-4" />
            {t("pwaInstall.button")}
          </Button>
        </>
      )}

      {/* iOS guide */}
      {showGuide && isIOS && (
        <p className="">
          {t.rich("pwaInstall.iosInstructions", {
            shareBtn: () => (
              <span>
                <ShareIcon className="mx-2 inline size-4" />
              </span>
            ),
            addToHomeScreen: (chunks) => (
              <span className="font-semibold">{chunks}</span>
            ),
          })}
        </p>
      )}

      {/* Android/Desktop guide */}
      {showGuide && !isIOS && (
        <p className="">
          {t.rich("pwaInstall.androidInstructions", {
            addToHomeScreen: (chunks) => (
              <span className="font-semibold">{chunks}</span>
            ),
          })}
        </p>
      )}
    </div>
  );
}
