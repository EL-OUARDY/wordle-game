import React from "react";
import clsx from "clsx";
import GamepadIcon from "@/components/ui/icons/gamepad";

interface Props {
  className?: string;
}

function LogoIcon({ className }: Props) {
  return <GamepadIcon className={clsx(className, "")} />;
}

export default LogoIcon;
