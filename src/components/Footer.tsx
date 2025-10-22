import React from "react";
import clsx from "clsx";

interface Props {
  className?: string;
}

function Footer({ className }: Props) {
  return <footer className={clsx(className, "h-12 border")}></footer>;
}

export default Footer;
