"use client";

import { useAuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export default function SignInPage() {
  const { user, loading, signInWithGoogle } = useAuthContext();
  const router = useRouter();
  const [signingIn, setSigningIn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && user) {
      router.replace("/dashboard");
    }
  }, [user, loading, router]);

  const handleGoogleSignIn = async () => {
    setSigningIn(true);
    setError(null);
    try {
      await signInWithGoogle();
      router.replace("/dashboard");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Sign-in failed. Please try again.";
      // Don't show error for user-cancelled popups
      if (!message.includes("popup-closed-by-user") && !message.includes("cancelled")) {
        setError(message);
      }
    } finally {
      setSigningIn(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-deep">
        <Loader2 className="w-8 h-8 animate-spin text-[#F59E0B]" />
      </div>
    );
  }

  if (user) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-deep px-4">
      <div className="w-full max-w-[400px]">
        {/* Card */}
        <div
          className="bg-[#1A1A2E] border border-[#2A2A3E] rounded-2xl p-8 shadow-xl"
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white tracking-tight">Apriori</h1>
            <p className="text-[14px] text-[#9CA3AF] mt-2">
              Sign in to access your dashboard
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-[#FEE2E2]/10 border border-[#EF4444]/20">
              <p className="text-[13px] text-[#EF4444]">{error}</p>
            </div>
          )}

          {/* Google Sign-In Button */}
          <button
            onClick={handleGoogleSignIn}
            disabled={signingIn}
            className="
              w-full flex items-center justify-center gap-3 
              h-12 px-4 rounded-xl
              bg-white hover:bg-[#F9FAFB] 
              text-[#1A1A1A] text-[15px] font-semibold
              transition-all duration-200
              disabled:opacity-60 disabled:cursor-not-allowed
              shadow-md hover:shadow-lg
              cursor-pointer
            "
          >
            {signingIn ? (
              <Loader2 className="w-5 h-5 animate-spin text-[#6B7280]" />
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
            )}
            {signingIn ? "Signing in…" : "Continue with Google"}
          </button>

          {/* Divider */}
          <div className="mt-6 pt-6 border-t border-[#2A2A3E]">
            <p className="text-[12px] text-[#6B7280] text-center">
              By signing in, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>

        {/* Back to home */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-[13px] text-[#9CA3AF] hover:text-[#F59E0B] transition-colors"
          >
            ← Back to home
          </a>
        </div>
      </div>
    </div>
  );
}
