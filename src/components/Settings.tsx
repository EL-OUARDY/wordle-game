import React from "react";
import * as Switch from "@radix-ui/react-switch";
import Button from "@/components/ui/button";
import GamepadIcon from "@/components/ui/icons/gamepad";

function Settings() {
  return (
    <div className="settings relative flex h-full flex-col gap-4">
      <div className="flex flex-1 flex-col gap-4 pb-42">
        <div className="default-language flex items-center justify-between">
          <label className="font-semibold" htmlFor="default-language">
            Default Language
          </label>
          <Switch.Root
            id="default-language"
            className="data-[state=unchecked]:bg-key-background data-[state=checked]:bg-foreground inline-flex h-5 w-10 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Switch.Thumb className="bg-background pointer-events-none block size-[1.05rem] rounded-full ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0" />
          </Switch.Root>
        </div>

        <div className="theme flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="font-semibold" htmlFor="theme">
              Theme
            </label>
            <Switch.Root
              id="theme"
              className="data-[state=unchecked]:bg-key-background data-[state=checked]:bg-foreground inline-flex h-5 w-10 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Switch.Thumb className="bg-background pointer-events-none block size-[1.05rem] rounded-full ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0" />
            </Switch.Root>
          </div>
          <p className="text-muted-foreground">
            Switch between light, dark, or custom themes to personalize the
            look.
          </p>
        </div>

        <div className="high-contrast-mode flex items-center justify-between">
          <label className="font-semibold" htmlFor="high-contrast-mode">
            High Contrast Mode
          </label>
          <Switch.Root
            id="high-contrast-mode"
            className="data-[state=unchecked]:bg-key-background data-[state=checked]:bg-foreground inline-flex h-5 w-10 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Switch.Thumb className="bg-background pointer-events-none block size-[1.05rem] rounded-full ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0" />
          </Switch.Root>
        </div>

        <div className="onscreen-input-only flex items-center justify-between">
          <label className="font-semibold" htmlFor="onscreen-input-only">
            Onscreen Input Only
          </label>
          <Switch.Root
            id="onscreen-input-only"
            className="data-[state=unchecked]:bg-key-background data-[state=checked]:bg-foreground inline-flex h-5 w-10 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Switch.Thumb className="bg-background pointer-events-none block size-[1.05rem] rounded-full ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0" />
          </Switch.Root>
        </div>

        <div className="swap-enter-backspace flex items-center justify-between">
          <label className="font-semibold" htmlFor="swap-enter-backspace">
            Swap Enter/Backspace
          </label>
          <Switch.Root
            id="swap-enter-backspace"
            className="data-[state=unchecked]:bg-key-background data-[state=checked]:bg-foreground inline-flex h-5 w-10 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Switch.Thumb className="bg-background pointer-events-none block size-[1.05rem] rounded-full ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0" />
          </Switch.Root>
        </div>

        <div className="reduce-motion flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="font-semibold" htmlFor="reduce-motion">
              Reduce Motion
            </label>
            <Switch.Root
              id="reduce-motion"
              className="data-[state=unchecked]:bg-key-background data-[state=checked]:bg-foreground inline-flex h-5 w-10 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Switch.Thumb className="bg-background pointer-events-none block size-[1.05rem] rounded-full ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0" />
            </Switch.Root>
          </div>
          <p className="text-muted-foreground">
            Turn off animations for a simpler, distraction-free experience.
          </p>
        </div>
      </div>

      <div className="install-app bg-tile-background border-key-background absolute bottom-0 flex w-full flex-col gap-4 rounded-2xl border p-4">
        <p className="text-lg">
          Install the game on your device to play offline and access it
          instantly.
        </p>
        <Button
          onClick={() => alert("Install")}
          className="flex w-fit flex-1 items-center gap-2 rounded-xl !py-1 normal-case"
          aria-label="Install"
          whileTap={{ scale: 0.95 }}
        >
          <GamepadIcon className="size-4" />
          Install
        </Button>
      </div>
    </div>
  );
}

export default Settings;
