"use client";

import { ReactNode } from "react";
import { Drawer as VaulDrawer } from "vaul";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
  direction?: "top" | "bottom" | "left" | "right";
  className?: string;
}

function Drawer({
  open,
  onOpenChange,
  children,
  direction = "bottom",
  className,
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
          className="fixed right-0 bottom-0 left-0 mt-24 flex h-fit flex-col rounded-t-[10px] outline-none"
        >
          <div className="bg-background flex-1 rounded-t-[10px] p-4">
            <div className="bg-key-background mx-auto mb-8 h-1.5 w-12 flex-shrink-0 rounded-full" />
            <div className="mx-auto max-w-md">
              <VaulDrawer.Title className="mb-4 font-medium">
                A controlled VaulDrawer.
              </VaulDrawer.Title>
              <p className="text-muted-foreground mb-2">
                This means that the drawer no longer manages its own state.
                Instead, you can control it programmatically from the outside.
              </p>
              <p className="text-muted-foreground mb-2">
                But you can still let the drawer help you a bit by passing the
                `onOpenChange` prop. This way, the drawer will change your open
                state when the user clicks outside of it, or when they press the
                escape key for example.
              </p>
            </div>
          </div>
        </VaulDrawer.Content>
      </VaulDrawer.Portal>
    </VaulDrawer.Root>
  );
}

export default Drawer;
