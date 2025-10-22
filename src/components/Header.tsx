import React from "react";
import clsx from "clsx";

interface Props {
  className?: string;
}

function Header({ className }: Props) {
  return <header className={clsx(className, "h-12 border")}></header>;
}

export default Header;
