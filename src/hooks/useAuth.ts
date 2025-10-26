"use client";
import { useEffect, useState } from "react";
import { auth, provider } from "@/lib/firebase";
import {
  signOut,
  onAuthStateChanged,
  User,
  signInWithPopup,
} from "firebase/auth";

export default function useAuth() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    return onAuthStateChanged(auth, setUser);
  }, []);

  const login = () => signInWithPopup(auth, provider);
  const logout = () => signOut(auth);

  return { user, login, logout };
}
