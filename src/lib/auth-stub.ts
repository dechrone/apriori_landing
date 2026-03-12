// Stub replacing @clerk/nextjs hooks while auth is disabled
export function useAuth() {
  return {
    getToken: async () => null as string | null,
    isLoaded: true,
    isSignedIn: false,
    userId: null as string | null,
  };
}

export function useUser() {
  return {
    isLoaded: true,
    isSignedIn: false,
    user: null as null | { id: string; firstName: string | null; lastName: string | null; primaryEmailAddress: { emailAddress: string } | null; emailAddresses: { emailAddress: string }[] },
  };
}
