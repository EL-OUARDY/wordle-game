"use client";
import { useEffect, useState } from "react";
import useStore from "@/hooks/useStore";
import clsx from "clsx";

type StoreState = ReturnType<typeof useStore.getState>;
interface Props {
  property?: keyof StoreState;
}

function StoreDebug({ property }: Props) {
  const [mounted, setMounted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const state = useStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Do not render on production environement
  if (process.env.NODE_ENV === "production") return null;

  if (!mounted) return null; // skip SSR render

  return (
    <div
      onClick={() => setIsExpanded(!isExpanded)}
      className={clsx(
        "fixed flex items-center justify-center bg-gray-950 p-2 text-sm text-emerald-600",
        !isExpanded && "top-4 left-4 cursor-pointer rounded-full",
        isExpanded && "relative inset-0 min-h-screen",
      )}
    >
      {isExpanded && <pre>{JSON.stringify(state, null, 2)}</pre>}
      {!isExpanded && (
        <div className="flex items-center gap-2 px-4">
          {!property && "Store"}
          {property && (
            <span>{`${property}:${JSON.stringify(state[property as keyof typeof state])}`}</span>
          )}
        </div>
      )}
    </div>
  );
}

export default StoreDebug;
