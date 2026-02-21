"use client";

/**
 * FirebaseUserContext
 *
 * Automatically creates a Firestore user profile the first time a Clerk-
 * authenticated user is seen in the app. Exposes `clerkId` and `profileReady`
 * so child components can safely read/write Firestore.
 */

import React, { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { createUserProfile } from "@/lib/firestore";

interface FirebaseUserContextValue {
  clerkId: string | null;
  profileReady: boolean;
}

const FirebaseUserContext = createContext<FirebaseUserContextValue>({
  clerkId: null,
  profileReady: false,
});

export function FirebaseUserProvider({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useUser();
  const [profileReady, setProfileReady] = useState(false);

  useEffect(() => {
    if (!isLoaded || !user) return;

    const email =
      user.primaryEmailAddress?.emailAddress ??
      user.emailAddresses[0]?.emailAddress ??
      "";

    createUserProfile(user.id, {
      email,
      firstName: user.firstName ?? undefined,
      lastName: user.lastName ?? undefined,
    })
      .then(() => setProfileReady(true))
      .catch((err) => {
        console.error("[FirebaseUser] Failed to create/verify profile:", err);
        setProfileReady(true); // still allow the app to work
      });
  }, [isLoaded, user]);

  return (
    <FirebaseUserContext.Provider
      value={{ clerkId: user?.id ?? null, profileReady }}
    >
      {children}
    </FirebaseUserContext.Provider>
  );
}

export function useFirebaseUser() {
  return useContext(FirebaseUserContext);
}
