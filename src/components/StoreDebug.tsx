"use client";
import { useEffect, useState } from "react";
import useStore from "@/hooks/useStore";
import clsx from "clsx";
import { Code2Icon } from "lucide-react";

function StoreDebug() {
  const [mounted, setMounted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const state = useStore();

  useEffect(() => {
    setMounted(true);
  }, []);

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
      {!isExpanded && <Code2Icon className="size-5" />}
    </div>
  );
}

export default StoreDebug;
