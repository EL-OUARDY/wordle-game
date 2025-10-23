import React from "react";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import ChartIcon from "@/components/ui/icons/chart";
import MenuIcon from "@/components/ui/icons/menu";
import GlobeIcon from "@/components/ui/icons/globe";
import InfoIcon from "@/components/ui/icons/info";
import SettingsIcon from "@/components/ui/icons/settings";
interface Props {
  className?: string;
}

function Header({ className }: Props) {
  return (
    <header className={clsx(className, "border-muted-foreground border-b")}>
      <nav className="flex h-12 sm:h-14 sm:px-[8px]">
        <Button variant="icon">
          <MenuIcon className="size-[1.35rem] sm:size-6" />
        </Button>
        <div className="ml-auto flex">
          <Button variant="icon">
            <GlobeIcon className="size-[1.35rem] sm:size-6" />
          </Button>
          <Button variant="icon">
            <ChartIcon className="size-[1.35rem] sm:size-6" />
          </Button>
          <Button variant="icon">
            <InfoIcon className="size-[1.35rem] sm:size-6" />
          </Button>
          <Button variant="icon">
            <SettingsIcon className="size-[1.35rem] sm:size-6" />
          </Button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
