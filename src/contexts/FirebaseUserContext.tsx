"use client";

/**
 * FirebaseUserContext
 *
 * Automatically creates a Firestore user profile the first time a Firebase-
 * authenticated user is seen in the app. Exposes `userId` (= Firebase UID)
 * and `profileReady` so child components can safely read/write Firestore.
 */

import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import { createUserProfile } from "@/lib/firestore";

interface FirebaseUserContextValue {
  userId: string | null;
  profileReady: boolean;
}

const FirebaseUserContext = createContext<FirebaseUserContextValue>({
  userId: null,
  profileReady: false,
});

export function FirebaseUserProvider({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuthContext();
  const [profileReady, setProfileReady] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      setProfileReady(false);
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        await createUserProfile(user.uid, {
          email: user.email || "",
          firstName: user.displayName?.split(" ")[0] || undefined,
          lastName: user.displayName?.split(" ").slice(1).join(" ") || undefined,
        });
        if (!cancelled) setProfileReady(true);
      } catch (error) {
        console.error("Error setting up user profile:", error);
        if (!cancelled) setProfileReady(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [user, loading]);

  return (
    <FirebaseUserContext.Provider
      value={{
        userId: user?.uid || null,
        profileReady,
      }}
    >
      {children}
    </FirebaseUserContext.Provider>
  );
}

export function useFirebaseUser() {
  return useContext(FirebaseUserContext);
}
