"use client";

import clsx from "clsx";
import { ReactNode, useMemo } from "react";
import { Drawer as VaulDrawer } from "vaul";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
  direction?: "bottom" | "left" | "right" | "center";
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
  const initialTransformStyle: React.CSSProperties = useMemo(() => {
    if (direction === "right" || direction === "left")
      return {
        "--initial-transform": "calc(100% + 8px)",
      } as React.CSSProperties;

    // default return
    return {};
  }, [direction]);

  return (
    <VaulDrawer.Root
      open={open}
      onOpenChange={onOpenChange}
      // since Vault does not support "center" direction
      direction={direction === "center" ? "bottom" : direction}
      dismissible={direction !== "center"}
    >
      <VaulDrawer.Portal>
        <VaulDrawer.Overlay
          onClick={() => onOpenChange(false)}
          className="fixed inset-0 bg-black/40"
        />
        <VaulDrawer.Content
          aria-describedby={undefined}
          className={clsx(
            "font-body fixed flex outline-none",
            direction === "left" && "top-2 bottom-2 left-2 z-10 w-[320px]",
            direction === "right" && "top-2 right-2 bottom-2 z-10 w-[320px]",
            direction === "bottom" &&
              "right-0 bottom-0 left-0 mt-24 h-fit flex-col rounded-t-[10px]",
            direction === "center" &&
              "top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 !animate-none ![animation-duration:0s]",
          )}
          style={initialTransformStyle}
        >
          <div
            className={clsx(
              "bg-background drawer-container",
              (direction === "right" || direction === "left") &&
                "flex h-full w-full max-w-md grow flex-col rounded-[16px] p-5",
              direction === "bottom" && "max-w-md flex-1 rounded-t-[10px] p-4",
              direction === "center" &&
                "w-[90vw] max-w-sm flex-1 rounded-[10px] p-4 md:w-[80vw] md:max-w-md lg:w-[60vw] lg:max-w-lg",
              className,
            )}
            style={
              direction === "center"
                ? ({
                    "--initial-transform": "calc(30%)",
                    animation: "slideFromBottom",
                    transition: "transform .5s cubic-bezier(.32, .72, 0, 1)",
                    animationDuration: "0.5s",
                    animationTimingFunction: "cubic-bezier(0.32, 0.72, 0, 1)",
                  } as React.CSSProperties)
                : {}
            }
          >
            {direction === "bottom" && (
              <div className="bg-key-background mx-auto mb-8 h-1.5 w-12 flex-shrink-0 rounded-full" />
            )}
            <div className="mx-auto overflow-y-auto">
              <VaulDrawer.Title className="border-key-background mb-4 border-b pb-4 text-2xl font-semibold">
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
