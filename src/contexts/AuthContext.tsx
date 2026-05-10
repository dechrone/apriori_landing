"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Session, SupabaseClient, User } from "@supabase/supabase-js";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";

/**
 * Auth context, preserved from the Firebase-era shape so TopBar, AuthGuard,
 * the sign-in page, and the site header don't need to change.
 *
 * `user` is a thin view with a Firebase-User-like surface:
 *   uid          → auth.users.id
 *   email        → auth.users.email
 *   displayName  → raw_user_meta_data.full_name / name
 *   photoURL     → raw_user_meta_data.avatar_url / picture
 */
export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  raw: User;
}

interface AuthContextValue {
  user: AuthUser | null;
  session: Session | null;
  loading: boolean;
  /** True when Supabase env vars are missing — public pages still render. */
  configError: string | null;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  /** Current Supabase access token (JWT). null if signed out or unconfigured. */
  getAccessToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  session: null,
  loading: true,
  configError: null,
  signInWithGoogle: async () => {},
  signOut: async () => {},
  getAccessToken: async () => null,
});

function toAuthUser(u: User | null): AuthUser | null {
  if (!u) return null;
  const meta = (u.user_metadata ?? {}) as Record<string, unknown>;
  return {
    uid: u.id,
    email: u.email ?? null,
    displayName:
      (meta.full_name as string | undefined) ??
      (meta.name as string | undefined) ??
      null,
    photoURL:
      (meta.avatar_url as string | undefined) ??
      (meta.picture as string | undefined) ??
      null,
    raw: u,
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Try to build the client; tolerate missing env so the public landing page
  // and waitlist still render during setup. Protected routes will surface a
  // clear "not configured" state.
  const { supabase, configError } = useMemo(() => {
    try {
      return { supabase: getSupabaseBrowserClient(), configError: null as string | null };
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      if (typeof window !== "undefined") {
        console.warn("[AuthProvider] Supabase not configured:", message);
      }
      return { supabase: null as SupabaseClient | null, configError: message };
    }
  }, []);

  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(!!supabase);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    let cancelled = false;

    supabase.auth.getSession()
      .then(({ data }) => {
        if (cancelled) return;
        setSession(data.session ?? null);
      })
      .catch((err) => {
        // Network failure / Supabase unreachable. Don't deadlock loading=true
        // forever — the header would render blank (no Sign In button).
        if (typeof window !== "undefined") {
          console.warn("[AuthProvider] getSession failed:", err);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setLoading(false);
    });

    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, [supabase]);

  const signInWithGoogle = useCallback(async () => {
    if (!supabase) {
      throw new Error(configError ?? "Supabase is not configured");
    }
    const redirectTo =
      typeof window !== "undefined"
        ? `${window.location.origin}/auth/callback?next=/dashboard`
        : undefined;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo,
        queryParams: { prompt: "select_account" },
      },
    });
    if (error) throw error;
  }, [supabase, configError]);

  const signOut = useCallback(async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    setSession(null);
  }, [supabase]);

  const getAccessToken = useCallback(async () => {
    if (!supabase) return null;
    const { data } = await supabase.auth.getSession();
    return data.session?.access_token ?? null;
  }, [supabase]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user: toAuthUser(session?.user ?? null),
      session,
      loading,
      configError,
      signInWithGoogle,
      signOut,
      getAccessToken,
    }),
    [session, loading, configError, signInWithGoogle, signOut, getAccessToken]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  return useContext(AuthContext);
}
