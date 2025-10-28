import React from "react";
import * as Switch from "@radix-ui/react-switch";

function Settings() {
  return (
    <div className="settings flex flex-col gap-4">
      <div className="default-language flex flex-col gap-2">
        <div className="flex items-center justify-between">
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
          Switch between light, dark, or custom themes to personalize the look.
        </p>
      </div>

      <div className="install-app flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label className="font-semibold" htmlFor="install-app">
            Install App
          </label>
          <Switch.Root
            id="install-app"
            className="data-[state=unchecked]:bg-key-background data-[state=checked]:bg-foreground inline-flex h-5 w-10 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Switch.Thumb className="bg-background pointer-events-none block size-[1.05rem] rounded-full ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0" />
          </Switch.Root>
        </div>
        <p className="text-muted-foreground">
          Install the game on your device to play offline and access it
          instantly.
        </p>
      </div>

      <div className="high-contrast-mode flex flex-col gap-2">
        <div className="flex items-center justify-between">
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
        {/* <p className="text-muted-foreground">
          Makes colors easier to distinguish for better visibility.
        </p> */}
      </div>

      <div className="onscreen-input-only flex flex-col gap-2">
        <div className="flex items-center justify-between">
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
      </div>

      <div className="swap-enter-backspace flex flex-col gap-2">
        <div className="flex items-center justify-between">
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
  );
}

export default Settings;
