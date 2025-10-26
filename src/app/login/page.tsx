"use client";
import Login from "@/components/Login";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const { user } = useAuth();

  const router = useRouter();

  useEffect(() => {
    // Navigates to home page when user logs in
    if (user) router.push("/");
  }, [router, user]);

  return (
    <main className="mx-auto flex w-full max-w-[520px] flex-1 flex-col items-center justify-center">
      <Login className="max-w-md" />
    </main>
  );
}
