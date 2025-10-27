import React from "react";
import * as Switch from "@radix-ui/react-switch";

function Settings() {
  return (
    <div className="settings flex flex-col gap-4">
      {/* <div className="language">
        <h3 className="text-lg font-semibold">Default language</h3>
      </div> */}

      <div className="high-contrast flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label className="text-lg font-semibold" htmlFor="high-contrast-mode">
            High Contrast Mode
          </label>
          <Switch.Root
            id="high-contrast-mode"
            className="focus-visible:ring-ring focus-visible:ring-offset-background data-[state=unchecked]:bg-key-background data-[state=checked]:bg-foreground inline-flex h-5 w-10 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Switch.Thumb className="bg-background pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0" />
          </Switch.Root>
        </div>
        <p className="text-muted-foreground text-base">
          Improves readability with stronger colors
        </p>
      </div>
    </div>
  );
}

export default Settings;
