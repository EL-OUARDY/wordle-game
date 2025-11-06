/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import useStore from "@/hooks/useStore";
import clsx from "clsx";

type StoreState = ReturnType<typeof useStore.getState>;
interface Props {
  property?: keyof StoreState;
  exclude?: (keyof StoreState)[];
}

// Helper to safely serialize, excluding functions
function serialize(value: any, exclude: string[] = []) {
  const seen = new WeakSet();
  return JSON.stringify(
    value,
    (_, v) => {
      if (typeof v === "function") return undefined; // skip functions
      if (v instanceof Set) return [...v];
      if (v instanceof Map) return Object.fromEntries(v);
      if (v instanceof Date) return v.toISOString();
      if (typeof v === "undefined") return "undefined";
      if (typeof v === "symbol") return v.toString();
      if (v && typeof v === "object") {
        if (seen.has(v)) return "[Circular]";
        seen.add(v);
        if (!Array.isArray(v)) {
          exclude.forEach((key) => delete v[key]);
        }
      }
      return v;
    },
    2,
  );
}

function StoreDebug({ property, exclude = [] }: Props) {
  const [mounted, setMounted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const state = useStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (process.env.NODE_ENV === "production") return null;
  if (!mounted) return null;

  const filteredState = { ...state };
  exclude.forEach((key) => delete filteredState[key]);

  return (
    <div
      onClick={() => setIsExpanded(!isExpanded)}
      className={clsx(
        "fixed flex items-center justify-center bg-gray-950 p-2 text-sm text-emerald-600",
        !isExpanded && "top-4 left-4 cursor-pointer rounded-full",
        isExpanded && "relative inset-0 min-h-screen",
      )}
    >
      {isExpanded && <pre>{serialize(filteredState)}</pre>}
      {!isExpanded && (
        <div className="flex items-center gap-2 px-4">
          {!property && "Store"}
          {property && (
            <span>{`${property}:${serialize(state[property as keyof typeof state])}`}</span>
          )}
        </div>
      )}
    </div>
  );
}

export default StoreDebug;
