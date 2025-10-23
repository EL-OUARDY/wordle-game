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
          className="fixed right-0 bottom-0 left-0 mt-24 flex h-fit flex-col rounded-t-[10px] bg-gray-100 outline-none"
        >
          <div className="flex-1 rounded-t-[10px] bg-white p-4">
            <div className="mx-auto mb-8 h-1.5 w-12 flex-shrink-0 rounded-full bg-gray-300" />
            <div className="mx-auto max-w-md">
              <VaulDrawer.Title className="mb-4 font-medium text-gray-900">
                A controlled VaulDrawer.
              </VaulDrawer.Title>
              <p className="mb-2 text-gray-600">
                This means that the drawer no longer manages its own state.
                Instead, you can control it programmatically from the outside.
              </p>
              <p className="mb-2 text-gray-600">
                But you can still let the drawer help you a bit by passing the
                `onOpenChange` prop. This way, the drawer will change your open
                state when the user clicks outside of it, or when they press the
                escape key for example.
              </p>
            </div>
          </div>
          <div className="mt-auto border-t border-gray-200 bg-gray-100 p-4">
            <div className="mx-auto flex max-w-md justify-end gap-6">
              <a
                className="flex items-center gap-0.25 text-xs text-gray-600"
                href="https://github.com/emilkowalski/vaul"
                target="_blank"
              >
                GitHub
                <svg
                  fill="none"
                  height="16"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="16"
                  aria-hidden="true"
                  className="ml-1 h-3 w-3"
                >
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                  <path d="M15 3h6v6"></path>
                  <path d="M10 14L21 3"></path>
                </svg>
              </a>
              <a
                className="flex items-center gap-0.25 text-xs text-gray-600"
                href="https://twitter.com/emilkowalski_"
                target="_blank"
              >
                Twitter
                <svg
                  fill="none"
                  height="16"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="16"
                  aria-hidden="true"
                  className="ml-1 h-3 w-3"
                >
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                  <path d="M15 3h6v6"></path>
                  <path d="M10 14L21 3"></path>
                </svg>
              </a>
            </div>
          </div>
        </VaulDrawer.Content>
      </VaulDrawer.Portal>
    </VaulDrawer.Root>
  );
}

export default Drawer;
