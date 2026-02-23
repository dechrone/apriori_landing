import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-deep px-4">
      <div className="clerk-auth-wrapper w-full max-w-[420px]">
        <SignUp
          appearance={{
            baseTheme: undefined,
            variables: {
              colorPrimary: "#F59E0B",
              colorBackground: "#0A0A0A",
              colorText: "#FAFAFA",
              colorTextSecondary: "#D1D5DB",
              colorInputBackground: "#1E293B",
              colorInputText: "#FAFAFA",
              borderRadius: "8px",
              /* Official variable names so all Clerk-generated text is light */
              colorForeground: "#F9FAFB",
              colorMutedForeground: "#D1D5DB",
              colorInputForeground: "#FAFAFA",
              colorPrimaryForeground: "#0A0E1A",
              colorNeutral: "#9CA3AF",
              colorMuted: "#374151",
            },
            elements: {
              rootBox: "mx-auto",
              card: "bg-elevated/80 border border-border-subtle shadow-[var(--shadow-glass)]",
              headerTitle: "text-[#F9FAFB]",
              headerSubtitle: "text-[#D1D5DB]",
              socialButtonsBlockButton:
                "bg-elevated border-border-subtle text-[#F9FAFB] hover:bg-elevated/80 [&_span]:text-[#F9FAFB]",
              formFieldLabel: "text-[#D1D5DB]",
              formFieldInput: "bg-deep border-border-subtle text-[#FAFAFA] placeholder:text-[#94A3B8]",
              formFieldLabelRow: "text-[#D1D5DB]",
              formFieldOptionalLabel: "text-[#9CA3AF]",
              formButtonPrimary: "bg-amber text-[#0A0E1A] hover:opacity-90",
              footerActionLink: "text-amber hover:text-amber/80",
              footerAction: "text-[#D1D5DB]",
              footerActionText: "text-[#D1D5DB]",
              dividerLine: "bg-border-subtle",
              dividerText: "text-[#9CA3AF]",
              identityPreviewEditButton: "text-[#D1D5DB]",
              formResendCodeLink: "text-amber",
              alertText: "text-[#D1D5DB]",
            },
          }}
          routing="path"
          path="/sign-up"
          signInUrl="/sign-in"
          fallbackRedirectUrl="/"
        />
      </div>
    </main>
  );
}
