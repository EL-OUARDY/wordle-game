"use server";

import { Locale } from "@/types";
import { cookies } from "next/headers";

const COOKIE_NAME = "NEXT_LOCALE";
const defaultLocale: Locale = "en";

export async function getUserLocale() {
  return (await cookies()).get(COOKIE_NAME)?.value || defaultLocale;
}

export async function setUserLocale(locale: Locale) {
  (await cookies()).set(COOKIE_NAME, locale);
}
