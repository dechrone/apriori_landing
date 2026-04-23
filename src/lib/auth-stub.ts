/**
 * Auth hooks consumed by the Figma integration components + api.ts wrapper.
 * Thin adapter over Supabase auth, exposing a Clerk-ish surface so the
 * existing callers don't need to change.
 */
"use client";

import { useCallback } from "react";
import { useAuthContext } from "@/contexts/AuthContext";

export function useAuth() {
  const { user, loading, getAccessToken } = useAuthContext();

  const getToken = useCallback(async () => {
    return getAccessToken();
  }, [getAccessToken]);

  return {
    getToken,
    isLoaded: !loading,
    isSignedIn: !!user,
    userId: user?.uid ?? null,
  };
}

export function useUser() {
  const { user, loading } = useAuthContext();

  if (!user) {
    return {
      isLoaded: !loading,
      isSignedIn: false as const,
      user: null as null | {
        id: string;
        firstName: string | null;
        lastName: string | null;
        primaryEmailAddress: { emailAddress: string } | null;
        emailAddresses: { emailAddress: string }[];
      },
    };
  }

  const nameParts = user.displayName?.split(" ") ?? [];
  const firstName = nameParts[0] || null;
  const lastName = nameParts.slice(1).join(" ") || null;
  const email = user.email || "";

  return {
    isLoaded: !loading,
    isSignedIn: true as const,
    user: {
      id: user.uid,
      firstName,
      lastName,
      primaryEmailAddress: email ? { emailAddress: email } : null,
      emailAddresses: email ? [{ emailAddress: email }] : [],
    },
  };
}
