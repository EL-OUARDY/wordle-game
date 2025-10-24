"use client";
import React, { ReactNode } from "react";
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

  const menus: Record<Menu, MenuContent> = {
    settings: { title: "Settings", content: <Settings />, direction: "right" },
    sidebar: { title: "", content: <SideBar />, direction: "left" },
    statistics: {
      title: "Statistics",
      content: <UserStats />,
      direction: "center",
    },
    info: { title: "How To Play", content: <HowToPlay />, direction: "right" },
  };

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
          <Button
            variant="icon"
            className="size-12 sm:size-14"
            aria-label="Choose Language"
          >
            <GlobeIcon className="size-[1.35rem] sm:size-6" />
          </Button>
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
