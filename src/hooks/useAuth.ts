"use client";
import { useEffect, useState } from "react";
import {
  auth,
  providerFacebook,
  providerGoogle,
  providerMicrosoft,
} from "@/lib/firebase";
import {
  signOut,
  onAuthStateChanged,
  User,
  signInWithPopup,
  AuthProvider,
} from "firebase/auth";

const providers: Record<string, AuthProvider> = {
  google: providerGoogle,
  facebook: providerFacebook,
  microsoft: providerMicrosoft,
};

export default function useAuth() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    return onAuthStateChanged(auth, setUser);
  }, []);

  const login = async (providerName: keyof typeof providers) => {
    const provider = providers[providerName];
    if (!provider) throw new Error("Unknown provider");
    await signInWithPopup(auth, provider);
  };
  const logout = () => signOut(auth);

  return { user, login, logout };
}
