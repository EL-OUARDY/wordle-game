"use client";
import React from "react";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import ChartIcon from "@/components/ui/icons/chart";
import MenuIcon from "@/components/ui/icons/menu";
import GlobeIcon from "@/components/ui/icons/globe";
import InfoIcon from "@/components/ui/icons/info";
import SettingsIcon from "@/components/ui/icons/settings";
import { motion } from "motion/react";
import Drawer from "@/components/ui/drawer";
interface Props {
  className?: string;
}

type Menu = "settings" | "language" | "sidebar" | "statistics" | "info" | null;

function Header({ className }: Props) {
  const [shownMenu, setShownMenu] = React.useState<Menu>(null);

  return (
    <motion.header
      className={clsx(className, "border-muted-foreground border-b")}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <nav className="flex h-12 sm:h-14 sm:px-[8px]">
        <Button
          onClick={() => setShownMenu("sidebar")}
          variant="icon"
          className="size-12 sm:size-14"
        >
          <MenuIcon className="size-[1.35rem] sm:size-6" />
        </Button>

        <div className="ml-auto flex">
          <Button
            onClick={() => setShownMenu("language")}
            variant="icon"
            className="size-12 sm:size-14"
          >
            <GlobeIcon className="size-[1.35rem] sm:size-6" />
          </Button>
          <Button
            onClick={() => setShownMenu("statistics")}
            variant="icon"
            className="size-12 sm:size-14"
          >
            <ChartIcon className="size-[1.35rem] sm:size-6" />
          </Button>
          <Button
            onClick={() => setShownMenu("info")}
            variant="icon"
            className="size-12 sm:size-14"
          >
            <InfoIcon className="size-[1.35rem] sm:size-6" />
          </Button>
          <Button
            onClick={() => setShownMenu("settings")}
            variant="icon"
            className="size-12 sm:size-14"
          >
            <SettingsIcon className="size-[1.35rem] sm:size-6" />
          </Button>
        </div>
      </nav>

      {/* Menus */}
      <Drawer
        open={!!shownMenu}
        onOpenChange={(value) => {
          if (!value) setShownMenu(null);
        }}
        direction={shownMenu === "info" ? "right" : "bottom"}
      >
        {/* Content */}
        hello
      </Drawer>
    </motion.header>
  );
}

export default Header;
