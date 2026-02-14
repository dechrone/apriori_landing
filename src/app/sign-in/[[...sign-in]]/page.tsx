import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-deep px-4">
      <div className="w-full max-w-[420px]">
        <SignIn
          appearance={{
            baseTheme: undefined,
            variables: {
              colorPrimary: "#F59E0B",
              colorBackground: "#0A0A0A",
              colorText: "#FAFAFA",
              colorTextSecondary: "#94A3B8",
              colorInputBackground: "#1E293B",
              colorInputText: "#FAFAFA",
              colorInputPlaceholder: "#64748B",
              borderRadius: "8px",
            },
            elements: {
              rootBox: "mx-auto",
              card: "bg-elevated/80 border border-border-subtle shadow-[var(--shadow-glass)]",
              headerTitle: "text-text-primary",
              headerSubtitle: "text-text-secondary",
              socialButtonsBlockButton: "bg-elevated border-border-subtle text-text-primary hover:bg-elevated/80",
              formFieldLabel: "text-text-secondary",
              formFieldInput: "bg-deep border-border-subtle text-text-primary",
              formButtonPrimary: "bg-amber text-deep hover:opacity-90",
              footerActionLink: "text-amber hover:text-amber/80",
              dividerLine: "bg-border-subtle",
              dividerText: "text-text-tertiary",
            },
          }}
          routing="path"
          path="/sign-in"
          signUpUrl="/sign-up"
          fallbackRedirectUrl="/"
        />
      </div>
    </main>
  );
}
