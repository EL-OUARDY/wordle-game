"use client";
import { useEffect } from "react";
import * as Switch from "@radix-ui/react-switch";
import Button from "@/components/ui/button";
import GamepadIcon from "@/components/ui/icons/gamepad";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { languagesList } from "@/components/LanguagesMenu";
import useStore from "@/hooks/useStore";
import ColorsGrid from "@/components/ui/colors-grid";
import { Language, Theme } from "@/types";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const themes: {
  name: Theme;
  color1: string;
  color2: string;
  color3: string;
}[] = [
  { name: "classic", color1: "#22c55e", color2: "#eab308", color3: "#9ca3af" },
  { name: "coffee", color1: "#22c55e", color2: "#eab308", color3: "#9ca3af" },
  { name: "sakura", color1: "#22c55e", color2: "#eab308", color3: "#9ca3af" },
  { name: "dracula", color1: "#22c55e", color2: "#eab308", color3: "#9ca3af" },
];

function Settings() {
  const settings = useStore((s) => s.settings);
  const setSettings = useStore((s) => s.setSettings);

  const router = useRouter();

  // Persist settings to localStorage whenever they change
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("wordle_settings", JSON.stringify(settings));
      }
    } catch {
      // ignore storage errors
    }
  }, [settings]);

  if (!settings) return;

  return (
    <div className="settings relative flex h-full flex-col gap-4">
      <div className="flex flex-1 flex-col gap-4 pb-42">
        <div className="default-language flex items-center justify-between">
          <label className="font-semibold" htmlFor="default-language">
            Default Language
          </label>
          <Select
            value={
              languagesList.find((l) => l.name === settings.defaultLanguage)
                ?.name
            }
            onValueChange={(value) => {
              setSettings({ ...settings, defaultLanguage: value as Language });
              const link = languagesList.find((l) => l.name === value)?.link;
              if (link) router.push(link);
            }}
          >
            <SelectTrigger
              id="default-language"
              className="w-fit gap-1 border-0 px-0"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="!min-w-24">
              <SelectGroup className="">
                {languagesList.map((language, index) => (
                  <SelectItem
                    key={index}
                    value={language.name}
                    className="flex justify-center"
                  >
                    {language.icon}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="themes flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex w-full items-center gap-2">
              <span className="font-semibold">Themes</span>
              <hr className="separator border-key-background flex-1" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {themes.map((theme, index) => (
              <motion.div
                onClick={() => setSettings({ ...settings, theme: theme.name })}
                key={index}
                className={cn(
                  "theme border-key-background hover:bg-tile-background cursor-pointer border py-1",
                  settings.theme === theme.name && "border-foreground",
                )}
                whileTap={{ scale: 0.95 }}
              >
                <div className="mx-auto flex w-3/5 items-center justify-between gap-2">
                  <ColorsGrid
                    color1={theme.color1}
                    color2={theme.color2}
                    color3={theme.color3}
                  />
                  <span className="flex-1 capitalize">{theme.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
          <hr className="separator border-key-background mt-2" />
        </div>

        <div className="high-contrast-mode flex items-center justify-between">
          <label className="font-semibold" htmlFor="high-contrast-mode">
            High Contrast Mode
          </label>
          <Switch.Root
            checked={settings.highContrastMode}
            onCheckedChange={(value) =>
              setSettings({ ...settings, highContrastMode: value })
            }
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
            checked={settings.onScreenOnly}
            onCheckedChange={(value) =>
              setSettings({ ...settings, onScreenOnly: value })
            }
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
            checked={settings.swapEnterBackspace}
            onCheckedChange={(value) =>
              setSettings({ ...settings, swapEnterBackspace: value })
            }
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
              checked={settings.reduceMotion}
              onCheckedChange={(value) =>
                setSettings({ ...settings, reduceMotion: value })
              }
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
