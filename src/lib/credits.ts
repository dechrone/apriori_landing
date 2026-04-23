/**
 * Credit + plan hook. Reads directly from Supabase `profiles` — no backend
 * hop needed now that auth and credits live in the same DB.
 */

"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import { fetchCreditProfile as fetchFromDb } from "@/lib/db";

export interface CreditProfile {
  uid: string;
  email: string;
  display_name: string;
  plan: "free" | "pro" | "custom" | string;
  credits_remaining: number;
  credits_total: number;
  credits_used: number;
}

export async function fetchCreditProfile(userId: string): Promise<CreditProfile> {
  const p = await fetchFromDb(userId);
  return {
    uid: p.userId,
    email: p.email,
    display_name: p.displayName,
    plan: p.plan,
    credits_remaining: p.creditsRemaining,
    credits_total: p.creditsTotal,
    credits_used: p.creditsUsed,
  };
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
      const p = await fetchCreditProfile(user.uid);
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
