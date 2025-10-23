"use client";

import clsx from "clsx";
import { ReactNode } from "react";
import { Drawer as VaulDrawer } from "vaul";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
  direction?: "bottom" | "left" | "right";
  className?: string;
  title?: string;
}

function Drawer({
  open,
  onOpenChange,
  children,
  direction = "bottom",
  className,
  title = "",
}: Props) {
  return (
    <VaulDrawer.Root
      open={open}
      onOpenChange={onOpenChange}
      direction={direction}
    >
      <VaulDrawer.Portal>
        <VaulDrawer.Overlay className="fixed inset-0 bg-black/40" />
        <VaulDrawer.Content
          aria-describedby={undefined}
          className={clsx(
            "fixed flex outline-none",
            direction === "left" && "top-2 bottom-2 left-2 z-10 w-[310px]",
            direction === "right" && "top-2 right-2 bottom-2 z-10 w-[310px]",
            direction === "bottom" &&
              "right-0 bottom-0 left-0 mt-24 h-fit flex-col rounded-t-[10px]",
          )}
          style={
            direction === "right" || direction === "left"
              ? ({
                  "--initial-transform": "calc(100% + 8px)",
                } as React.CSSProperties)
              : {}
          }
        >
          <div
            className={clsx(
              "bg-background drawer-container",
              (direction === "right" || direction === "left") &&
                "flex h-full w-full grow flex-col rounded-[16px] p-5",
              direction === "bottom" && "flex-1 rounded-t-[10px] p-4",
              className,
            )}
          >
            {direction === "bottom" && (
              <div className="bg-key-background mx-auto mb-8 h-1.5 w-12 flex-shrink-0 rounded-full" />
            )}
            <div className="mx-auto max-w-md">
              <VaulDrawer.Title className="mb-4 text-xl font-semibold">
                {title}
              </VaulDrawer.Title>
              {children}
            </div>
          </div>
        </VaulDrawer.Content>
      </VaulDrawer.Portal>
    </VaulDrawer.Root>
  );
}

export default Drawer;
