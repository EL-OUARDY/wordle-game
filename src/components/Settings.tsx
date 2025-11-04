"use client";
import { useEffect } from "react";
import * as Switch from "@radix-ui/react-switch";
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
import { GameSettings, Language, Theme } from "@/types";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import InstallGame from "@/components/InstallGame";

const themes: {
  name: Theme;
  bgColor: string;
  color1: string;
  color2: string;
  color3: string;
}[] = [
  {
    name: "classic",
    bgColor: "#ffffff",
    color1: "#22c55e",
    color2: "#eab308",
    color3: "#9ca3af",
  },
  {
    name: "night",
    bgColor: "#181818",
    color1: "#22c55e",
    color2: "#eab308",
    color3: "#9ca3af",
  },
  {
    name: "coffee",
    bgColor: "#f7f3ef",
    color1: "#6b5c4b",
    color2: "#d0bfae",
    color3: "#8b8078",
  },
  {
    name: "sakura",
    bgColor: "#fff5f7",
    color1: "#ff5c8a",
    color2: "#f5c2cb",
    color3: "#8a8f99",
  },
  {
    name: "slate",
    bgColor: "#2e3440",
    color1: "#2e3440",
    color2: "#434c5e",
    color3: "#787c7e",
  },
  {
    name: "dracula",
    bgColor: "#282a36",
    color1: "#8d5fcd",
    color2: "#6272a4",
    color3: "#bfbfbf",
  },
];

export const defaultSettings: GameSettings = {
  defaultLanguage: "English",
  theme: "classic",
  highContrastMode: false,
  onScreenOnly: false,
  swapEnterBackspace: false,
  reduceMotion: false,
};

function Settings() {
  const settings = useStore((s) => s.settings);
  const setSettings = useStore((s) => s.setSettings);

  const router = useRouter();

  // Load saved settings from localStorage on mount
  useEffect(() => {
    if (settings) return;
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem("wordle_settings");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object") {
          // parsed is expected to be a full Settings object saved by Settings component
          setSettings(parsed);
          return;
        }
      }
    } catch {
      // ignore storage / parse errors
    }

    // fallback to default settings
    setSettings(defaultSettings);
  }, [setSettings, settings]);

  // Persist settings to localStorage whenever they change
  useEffect(() => {
    if (!settings) return;
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("wordle_settings", JSON.stringify(settings));
      }
    } catch {
      // ignore storage errors
    }
  }, [settings]);

  const applyTheme = (theme: Theme, bgColor: string) => {
    document.documentElement.classList.remove(...themes.map((t) => t.name));
    document.documentElement.classList.add(theme);
    // Update meta tag
    const themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta) themeMeta.setAttribute("content", bgColor);
  };

  if (!settings) return;

  return (
    <div className="settings relative flex h-full flex-col gap-4">
      <div className="flex flex-1 flex-col gap-4 pb-42">
        <div className="border-key-background flex items-center gap-2 border-b pb-4">
          <h2 className="text-2xl font-semibold">Settings</h2>
        </div>

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
                onClick={() => {
                  setSettings({ ...settings, theme: theme.name });
                  applyTheme(theme.name, theme.bgColor);
                }}
                key={index}
                className={cn(
                  "theme border-key-background hover:bg-tile-background cursor-pointer border py-1",
                  settings.theme === theme.name &&
                    "bg-tile-background border-foreground border",
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
            className="data-[state=unchecked]:bg-key-background inline-flex h-5 w-10 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-[#f5793a]"
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
            Swap Enter & Backspace
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
        </div>
      </div>

      {/* Display the PWA install prompt when supported by the browser. */}
      <InstallGame />
    </div>
  );
}

export default Settings;
