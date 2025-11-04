"use client";
import React, { ReactNode, useCallback, useEffect } from "react";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import ChartIcon from "@/components/ui/icons/chart";
import MenuIcon from "@/components/ui/icons/menu";
import GlobeIcon from "@/components/ui/icons/globe";
import InfoIcon from "@/components/ui/icons/info";
import SettingsIcon from "@/components/ui/icons/settings";
import { motion } from "motion/react";
import Drawer from "@/components/ui/drawer";
import Settings from "@/components/Settings";
import HowToPlay from "@/components/HowToPlay";
import UserStats from "@/components/UserStats";
import SideBar from "@/components/Sidebar";
import { APP_NAME } from "@/lib/constants";
import LanguagesMenu, { languagesList } from "@/components/LanguagesMenu";
import useMediaQuery from "@/hooks/useMediaQuery";
import StatsService from "@/services/stats";
import useStore from "@/hooks/useStore";
import useAuth from "@/hooks/useAuth";
import Image from "next/image";
import LogoIcon from "@/components/ui/icons/logo";
import Create from "@/components/Create";
import PlusIcon from "@/components/ui/icons/plus";
import FlagIcon from "@/components/ui/icons/flag";
import BackIcon from "@/components/ui/icons/back";
import { usePathname, useRouter } from "next/navigation";
interface Props {
  className?: string;
}

type Menu = "settings" | "sidebar" | "statistics" | "info" | "create";

interface MenuContent {
  title: string;
  direction: "bottom" | "left" | "right" | "center";
  content: ReactNode;
  showTitle?: boolean;
}

function Header({ className }: Props) {
  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);
  const [activeMenu, setActiveMenu] = React.useState<Menu | null>(null);
  const [isLanguagesListShown, setIsLanguagesListShown] =
    React.useState<boolean>(false);
  const isDesktop = useMediaQuery("(min-width: 768px)", true);

  const setUserStats = useStore((s) => s.setUserStats);
  const currentGuessIndex = useStore((s) => s.currentGuessIndex);
  const language = useStore((s) => s.language);
  const setIsGameOver = useStore((s) => s.setIsGameOver);
  const isGameOver = useStore((s) => s.isGameOver);

  const { user } = useAuth();

  const router = useRouter();
  const pathname = usePathname();

  // Only show on login and privacy pages
  const showBackBtn = pathname === "/login" || pathname === "/privacy-policy";

  const menus: Record<Menu, MenuContent> = {
    settings: {
      title: "Settings",
      content: <Settings />,
      direction: "right",
    },
    sidebar: {
      title: APP_NAME,
      content: <SideBar onClose={() => setIsMenuOpen(false)} />,
      direction: "left",
      showTitle: false,
    },
    statistics: {
      title: "Statistics",
      content: <UserStats />,
      direction: isDesktop ? "center" : "bottom",
      showTitle: false,
    },
    info: { title: "How To Play", content: <HowToPlay />, direction: "right" },
    create: {
      title: "Create your own Wordle",
      content: <Create />,
      direction: isDesktop ? "center" : "bottom",
      showTitle: false,
    },
  };

  // Load user stats
  useEffect(() => {
    if (!user) return;

    const loadStats = async () => {
      const stats = await StatsService.get(user?.uid);
      if (stats) setUserStats(stats);
    };

    loadStats();
  }, [setUserStats, user]);

  // Block keyboard typing when a menu is open
  useEffect(() => {
    if (!isMenuOpen) return;
    // block typing
    window.dispatchEvent(new CustomEvent("blockTyping", { detail: true }));

    return () => {
      // unblock typing on unmount
      window.dispatchEvent(new CustomEvent("blockTyping", { detail: false }));
    };
  }, [isMenuOpen]);

  const giveUp = useCallback(async () => {
    setIsGameOver(true);

    // User is not logged in
    if (!user) return;

    const serverStats = await StatsService.get(user.uid);

    if (!serverStats) return;

    const newStats = {
      ...serverStats,
      played: serverStats.played + 1,
      streak: 0,
    };
    setUserStats(newStats);
    StatsService.save(user.uid, newStats);
  }, [setIsGameOver, setUserStats, user]);

  return (
    <motion.header
      className={clsx(className, "border-key-background border-b")}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <nav className="flex h-12 sm:h-14 sm:px-[8px]">
        {/* Sidebar btn */}
        {!showBackBtn && (
          <Button
            onClick={() => {
              setActiveMenu("sidebar");
              setIsMenuOpen(true);
            }}
            variant="icon"
            className="size-12 sm:size-14"
            aria-label="Open Menu"
          >
            {!user ? (
              <MenuIcon className="size-[1.35rem] sm:size-6" />
            ) : (
              <div className="user-avatar">
                {user.photoURL ? (
                  <Image
                    src={user.photoURL}
                    alt="User avatar"
                    width={40}
                    height={40}
                    className="size-[1.35rem] rounded-full sm:size-6"
                  />
                ) : user.displayName ? (
                  <span className="flex size-full items-center justify-center text-lg">
                    {user.displayName
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                      .slice(0, 2)}
                  </span>
                ) : (
                  <LogoIcon className="size-[1.35rem] sm:size-6" />
                )}
              </div>
            )}
          </Button>
        )}

        {/* Back btn */}
        {showBackBtn && (
          <Button
            onClick={() => {
              router.back();
            }}
            variant="icon"
            className="size-12 sm:size-14"
            aria-label="Go back"
          >
            <BackIcon className="size-[1.35rem] sm:size-6" />
          </Button>
        )}

        <div className="ml-auto flex">
          {/* Create btn */}
          {(currentGuessIndex === 0 || isGameOver) && (
            <Button
              onClick={() => {
                setActiveMenu("create");
                setIsMenuOpen(true);
              }}
              variant="icon"
              className="size-12 sm:size-14"
              aria-label="Create your own custom wordle"
            >
              <PlusIcon className="size-[1.35rem] sm:size-6" />
            </Button>
          )}

          {/* Give up */}
          {currentGuessIndex > 0 && !isGameOver && (
            <Button
              onClick={giveUp}
              variant="icon"
              className="size-12 sm:size-14"
              aria-label="Give up"
            >
              <FlagIcon className="size-[1.35rem] sm:size-6" />
            </Button>
          )}

          {/* languages btn */}
          <div className="languages relative">
            <Button
              onClick={() => setIsLanguagesListShown((prev) => !prev)}
              variant="icon"
              className="size-12 sm:size-14"
              aria-label="Choose Language"
            >
              {!language ? (
                <GlobeIcon className="size-[1.35rem] sm:size-6" />
              ) : (
                languagesList.find((l) => l.name === language)?.icon
              )}
            </Button>

            {isLanguagesListShown && (
              <div
                onClick={() => setIsLanguagesListShown(false)}
                className="overlay fixed inset-0"
              />
            )}

            <LanguagesMenu
              key={isLanguagesListShown.toString()}
              onClick={() => setIsLanguagesListShown(false)}
              className={clsx(
                !isLanguagesListShown && "hidden",
                "border-key-background absolute left-1/2 z-100 mt-1 -translate-x-1/2 transform border",
              )}
            />
          </div>

          {/* Stats btn */}
          <Button
            onClick={() => {
              setActiveMenu("statistics");
              setIsMenuOpen(true);
            }}
            variant="icon"
            className="size-12 sm:size-14"
            aria-label="Statistics"
          >
            <ChartIcon className="size-[1.35rem] sm:size-6" />
          </Button>

          {/* How to play btn */}
          <Button
            onClick={() => {
              setActiveMenu("info");
              setIsMenuOpen(true);
            }}
            variant="icon"
            className="size-12 sm:size-14"
            aria-label="How To Play"
          >
            <InfoIcon className="size-[1.35rem] sm:size-6" />
          </Button>

          {/* Settings btn */}
          <Button
            onClick={() => {
              setActiveMenu("settings");
              setIsMenuOpen(true);
            }}
            variant="icon"
            className="size-12 sm:size-14"
            aria-label="Settings"
          >
            <SettingsIcon className="size-[1.35rem] sm:size-6" />
          </Button>
        </div>
      </nav>

      {/* Menus */}
      {activeMenu && (
        <Drawer
          open={isMenuOpen}
          onOpenChange={setIsMenuOpen}
          direction={menus[activeMenu].direction}
          title={menus[activeMenu].title}
          showTitle={menus[activeMenu].showTitle}
        >
          {menus[activeMenu].content}
        </Drawer>
      )}
    </motion.header>
  );
}

export default Header;
