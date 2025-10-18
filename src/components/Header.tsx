import React from "react";
import clsx from "clsx";

interface Props {
  className?: string;
}

function Header({ className }: Props) {
  return <header className={clsx(className, "")}></header>;
}

export default Header;
