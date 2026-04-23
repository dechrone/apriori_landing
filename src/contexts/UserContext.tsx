"use client";

/**
 * UserContext
 *
 * Loads the authenticated user's profile + credit summary once per session
 * and exposes helpers for refreshing after a mutation (e.g. after a sim run
 * debits credits).
 *
 * Profile rows are created server-side by the `handle_new_user` Postgres
 * trigger, which also grants the free-tier signup bonus. We still call
 * `createUserProfile` as a safety net in case the trigger hasn't fired yet
 * (race between auth redirect and first dashboard hit).
 */

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useAuthContext } from "./AuthContext";
import {
  createUserProfile,
  getUserProfile,
  type UserProfile,
} from "@/lib/db";

interface UserContextValue {
  /** Supabase auth.users.id (uuid). Stable across sessions. */
  userId: string | null;
  /** True once we've read (or created) the corresponding profile row. */
  profileReady: boolean;
  /** Profile snapshot, including credits. null until loaded. */
  profile: UserProfile | null;
  /** Re-read profile from Supabase (e.g. after a debit). */
  refreshProfile: () => Promise<void>;
}

const UserContext = createContext<UserContextValue>({
  userId: null,
  profileReady: false,
  profile: null,
  refreshProfile: async () => {},
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuthContext();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [profileReady, setProfileReady] = useState(false);

  const userId = user?.uid ?? null;

  const loadProfile = useCallback(async () => {
    if (!userId) {
      setProfile(null);
      setProfileReady(false);
      return;
    }
    try {
      // First-login race: the auth.users INSERT trigger may not have created
      // the profile yet by the time we hit the dashboard. Upsert is a no-op
      // if the row already exists.
      await createUserProfile(userId, {
        email: user?.email ?? "",
        firstName: user?.displayName?.split(" ")[0] || undefined,
        lastName: user?.displayName?.split(" ").slice(1).join(" ") || undefined,
      });
      const p = await getUserProfile(userId);
      setProfile(p);
      setProfileReady(true);
    } catch (err) {
      console.error("[UserContext] profile load failed:", err);
      setProfile(null);
      setProfileReady(false);
    }
  }, [userId, user?.email, user?.displayName]);

  useEffect(() => {
    if (loading) return;
    loadProfile();
  }, [loading, loadProfile]);

  const value = useMemo<UserContextValue>(
    () => ({ userId, profileReady, profile, refreshProfile: loadProfile }),
    [userId, profileReady, profile, loadProfile]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  return useContext(UserContext);
}
