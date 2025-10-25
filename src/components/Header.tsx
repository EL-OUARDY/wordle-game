"use client";
import React, { ReactNode, useEffect } from "react";
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
import LanguagesMenu from "@/components/LanguagesMenu";
import useMediaQuery from "@/hooks/useMediaQuery";
import StatsService from "@/services/stats";
import useStore from "@/hooks/useStore";
interface Props {
  className?: string;
}

type Menu = "settings" | "sidebar" | "statistics" | "info";

interface MenuContent {
  title: string;
  direction: "bottom" | "left" | "right" | "center";
  content: ReactNode;
}

function Header({ className }: Props) {
  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);
  const [activeMenu, setActiveMenu] = React.useState<Menu | null>(null);
  const [isLanguagesListShown, setIsLanguagesListShown] =
    React.useState<boolean>(false);
  const isDesktop = useMediaQuery("(min-width: 768px)", true);

  const setUserStats = useStore((s) => s.setUserStats);

  const menus: Record<Menu, MenuContent> = {
    settings: {
      title: "Settings",
      content: <Settings />,
      direction: isDesktop ? "right" : "bottom",
    },
    sidebar: { title: APP_NAME, content: <SideBar />, direction: "left" },
    statistics: {
      title: "Statistics",
      content: <UserStats />,
      direction: isDesktop ? "center" : "bottom",
    },
    info: { title: "How To Play", content: <HowToPlay />, direction: "right" },
  };

  // Load user stats
  useEffect(() => {
    const stats = StatsService.get();
    if (stats) setUserStats(stats);
  }, [setUserStats]);

  return (
    <motion.header
      className={clsx(className, "border-key-background border-b")}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <nav className="flex h-12 sm:h-14 sm:px-[8px]">
        <Button
          onClick={() => {
            setActiveMenu("sidebar");
            setIsMenuOpen(true);
          }}
          variant="icon"
          className="size-12 sm:size-14"
          aria-label="Open Menu"
        >
          <MenuIcon className="size-[1.35rem] sm:size-6" />
        </Button>

        <div className="ml-auto flex">
          <div className="languages relative">
            <Button
              onClick={() => setIsLanguagesListShown((prev) => !prev)}
              variant="icon"
              className="size-12 sm:size-14"
              aria-label="Choose Language"
            >
              <GlobeIcon className="size-[1.35rem] sm:size-6" />
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
        >
          {menus[activeMenu].content}
        </Drawer>
      )}
    </motion.header>
  );
}

export default Header;
