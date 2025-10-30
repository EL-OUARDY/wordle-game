import React from "react";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  color1: string;
  color2: string;
  color3: string;
}

function ColorsGrid({ className, color1, color2, color3 }: Props) {
  return (
    <div className={cn("grid size-4 grid-cols-3 gap-0.5", className)}>
      <div className="rounded-full" style={{ backgroundColor: color1 }} />
      <div className="rounded-full" style={{ backgroundColor: color2 }} />
      <div className="rounded-full" style={{ backgroundColor: color3 }} />
      <div className="rounded-full" style={{ backgroundColor: color1 }} />
      <div className="rounded-full" style={{ backgroundColor: color1 }} />
      <div className="rounded-full" style={{ backgroundColor: color3 }} />
      <div className="rounded-full" style={{ backgroundColor: color1 }} />
      <div className="rounded-full" style={{ backgroundColor: color1 }} />
      <div className="rounded-full" style={{ backgroundColor: color1 }} />
    </div>
  );
}

export default ColorsGrid;
