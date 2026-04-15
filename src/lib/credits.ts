/**
 * Credits API client + React hook.
 * Talks to GET /api/v1/auth/me on the backend.
 */

import { useCallback, useEffect, useState } from "react";
import { useAuthContext } from "@/contexts/AuthContext";

const BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

export interface CreditProfile {
  uid: string;
  email: string;
  display_name: string;
  plan: "free" | "pro" | "custom" | string;
  credits_remaining: number;
  credits_total: number;
  credits_used: number;
}

export async function fetchCreditProfile(token: string): Promise<CreditProfile> {
  const res = await fetch(`${BASE_URL}/api/v1/auth/me`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Failed to load credits (${res.status}): ${text}`);
  }
  return res.json();
}

/**
 * Hook: returns the caller's credit profile. Refetches whenever `refreshKey`
 * changes (pass a counter you bump after a simulation run).
 */
export function useCreditProfile(refreshKey: number = 0) {
  const { user, loading: authLoading } = useAuthContext();
  const [profile, setProfile] = useState<CreditProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (authLoading) return;
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const token = await user.getIdToken();
      const p = await fetchCreditProfile(token);
      setProfile(p);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }, [user, authLoading]);

  useEffect(() => {
    load();
  }, [load, refreshKey]);

  return { profile, loading, error, refresh: load };
}
