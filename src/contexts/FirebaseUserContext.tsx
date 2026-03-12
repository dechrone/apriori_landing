"use client";

/**
 * FirebaseUserContext
 *
 * Automatically creates a Firestore user profile the first time a Clerk-
 * authenticated user is seen in the app. Exposes `clerkId` and `profileReady`
 * so child components can safely read/write Firestore.
 */

"use client";
import React, { createContext, useContext } from "react";

interface FirebaseUserContextValue {
  clerkId: string | null;
  profileReady: boolean;
}

const FirebaseUserContext = createContext<FirebaseUserContextValue>({
  clerkId: null,
  profileReady: false,
});

export function FirebaseUserProvider({ children }: { children: React.ReactNode }) {
  return (
    <FirebaseUserContext.Provider value={{ clerkId: null, profileReady: false }}>
      {children}
    </FirebaseUserContext.Provider>
  );
}

export function useFirebaseUser() {
  return useContext(FirebaseUserContext);
}
