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
interface Props {
  className?: string;
}

function Header({ className }: Props) {
  return (
    <motion.header
      className={clsx(className, "border-muted-foreground border-b")}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <nav className="flex h-12 sm:h-14 sm:px-[8px]">
        <Button variant="icon" className="size-12 sm:size-14">
          <MenuIcon className="size-[1.35rem] sm:size-6" />
        </Button>
        <div className="ml-auto flex">
          <Button variant="icon" className="size-12 sm:size-14">
            <GlobeIcon className="size-[1.35rem] sm:size-6" />
          </Button>
          <Button variant="icon" className="size-12 sm:size-14">
            <ChartIcon className="size-[1.35rem] sm:size-6" />
          </Button>
          <Button variant="icon" className="size-12 sm:size-14">
            <InfoIcon className="size-[1.35rem] sm:size-6" />
          </Button>
          <Button variant="icon" className="size-12 sm:size-14">
            <SettingsIcon className="size-[1.35rem] sm:size-6" />
          </Button>
        </div>
      </nav>
    </motion.header>
  );
}

export default Header;
