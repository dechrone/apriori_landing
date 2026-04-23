"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Loader2, X } from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";

type Logo = { name: string; domain: string; color: string };

const LOGOS: Logo[] = [
  { name: "Flipkart", domain: "flipkart.com", color: "#2874F0" },
  { name: "Snapdeal", domain: "snapdeal.com", color: "#E40046" },
  { name: "Jar", domain: "myjar.app", color: "#1A1A1A" },
  { name: "Snapmint", domain: "snapmint.com", color: "#5E2CA5" },
  { name: "Apps For Bharat", domain: "appsforbharat.com", color: "#FF6B35" },
  { name: "Apollo", domain: "apollo.io", color: "#0E1B4D" },
  { name: "Earnin", domain: "earnin.com", color: "#00C389" },
  { name: "Univest", domain: "univest.in", color: "#1E40AF" },
  { name: "GoodScore", domain: "goodscore.app", color: "#16A34A" },
  { name: "Blink Money", domain: "blinkmoney.in", color: "#7C3AED" },
  { name: "PoP", domain: "pop.in", color: "#EC4899" },
];

export function WaitlistPage() {
  // Read the `?from=signup` query param client-side only, AFTER hydration.
  // Reading it during render would make server (false) and client (true)
  // disagree and trip React's hydration check.
  const [fromSignup, setFromSignup] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const flag =
      new URLSearchParams(window.location.search).get("from") === "signup";
    setFromSignup(flag);
  }, []);

  useEffect(() => {
    if (!fromSignup) return;
    const t = setTimeout(() => setOpen(true), 1400);
    return () => clearTimeout(t);
  }, [fromSignup]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <main
      className="relative h-screen overflow-hidden flex flex-col"
      style={{
        backgroundColor: "#F4EEDF",
        color: "#1A1712",
      }}
    >
      {/* Tiny wordmark — corner anchor */}
      <div className="absolute top-8 left-8 md:top-10 md:left-12 z-10">
        <span
          className="text-[11px] font-semibold tracking-[0.28em]"
          style={{ color: "#1A1712" }}
        >
          APRIORI
        </span>
      </div>

      <div className="absolute top-8 right-8 md:top-10 md:right-12 z-10 hidden sm:flex items-center gap-2.5">
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: "#B8860B" }}
        />
      </div>

      {/* Redirect notice — appears briefly when user lands from /signup */}
      <AnimatePresence>
        {fromSignup && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5, ease: [0.2, 0.65, 0.2, 1] }}
            className="absolute top-20 md:top-24 left-1/2 -translate-x-1/2 z-20 px-4"
          >
            <div
              className="flex items-center gap-3 pl-4 pr-5 py-2.5 rounded-full whitespace-nowrap"
              style={{
                backgroundColor: "rgba(26, 23, 18, 0.92)",
                color: "#F4EEDF",
                boxShadow: "0 12px 32px -16px rgba(20,16,8,0.5)",
                backdropFilter: "blur(6px)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: "#E2B55A" }}
              />
              <span
                className="text-[12.5px] font-medium"
                style={{ letterSpacing: "-0.005em" }}
              >
                Apriori is in closed alpha — join the waitlist and we&apos;ll
                take it from here.
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero */}
      <section className="relative flex-1 flex items-center">
        <div className="w-full max-w-[1240px] mx-auto px-8 md:px-14">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.2, 0.65, 0.2, 1] }}
            className="max-w-[960px]"
          >
            <h1
              style={{
                fontSize: "clamp(2.8rem, 7.2vw, 5.6rem)",
                fontWeight: 500,
                letterSpacing: "-0.045em",
                lineHeight: 0.98,
                color: "#141008",
              }}
            >
              The most expensive decisions in product
              <br className="hidden md:block" /> ship with the{" "}
              <span
                style={{
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: "#B8860B",
                }}
              >
                least evidence
              </span>
              .
            </h1>

            <div
              className="mt-10 max-w-[960px] flex flex-col gap-6"
              style={{ color: "#3D372A" }}
            >
              <p
                style={{
                  fontSize: "clamp(1.05rem, 1.4vw, 1.18rem)",
                  lineHeight: 1.5,
                  fontWeight: 400,
                }}
              >

                Run any flow through thousands of synthetic users in <span
                style={{
                  color: "#B8860B",
                  fontWeight: 600,
                }}
              >
              hours</span> and see <span
                style={{
                  color: "#B8860B",
                  fontWeight: 600,
                }}
              >
              why</span> each segment drops off <span
                style={{
                  color: "#B8860B",
                  fontWeight: 600,
                }}
              >
              before</span> you commit a single sprint.
              </p>

              <div className="flex items-center gap-5 pt-2">
                <button
                  onClick={() => setOpen(true)}
                  className="group inline-flex items-center gap-2.5 pl-6 pr-5 py-3.5 rounded-full font-medium text-[14px] text-white transition-all duration-200"
                  style={{
                    backgroundColor: "#1A1712",
                    letterSpacing: "-0.005em",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#B8860B";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#1A1712";
                  }}
                >
                  Claim 100 free credits
                  <span
                    className="inline-flex items-center justify-center w-5 h-5 rounded-full"
                    style={{ backgroundColor: "rgba(255,255,255,0.18)" }}
                  >
                    <ArrowRight
                      size={11}
                      strokeWidth={2.5}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </span>
                </button>
                <span
                  // className="hidden sm:inline text-[13px]"
                  style={{ color: "#7A7164", fontWeight: 600 }}
                >
                  Closed Alpha. 30s to join.
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Marquee logo strip */}
      <LogoMarquee logos={LOGOS} />

      <AnimatePresence>
        {open && <WaitlistModal onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </main>
  );
}

function LogoMarquee({ logos }: { logos: Logo[] }) {
  // Duplicate the list for seamless scroll
  const row = [...logos, ...logos];

  return (
    <div
      className="relative w-full py-6 md:py-7"
      style={{
        borderTop: "1px solid rgba(26, 23, 18, 0.08)",
        backgroundColor: "#EFE7D2",
      }}
    >
      <div className="flex flex-col gap-3 md:gap-3.5">
        <div
          className="pl-8 md:pl-12 whitespace-nowrap text-[10px] font-semibold tracking-[0.24em] uppercase"
          style={{ color: "#8A7F68" }}
        >
          Used by PMs at
        </div>

        {/* Marquee track */}
        <div
          className="relative w-full overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0, black 60px, black calc(100% - 60px), transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0, black 60px, black calc(100% - 60px), transparent 100%)",
          }}
        >
          <div
            className="flex items-center gap-10 md:gap-14"
            style={{
              width: "max-content",
              animation: "apriori-marquee 42s linear infinite",
            }}
          >
            {row.map((l, i) => (
              <LogoMark key={`${l.name}-${i}`} logo={l} />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes apriori-marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}

function LogoMark({ logo }: { logo: Logo }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="flex items-center gap-2.5 flex-shrink-0">
      {!failed ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={`https://www.google.com/s2/favicons?domain=${logo.domain}&sz=128`}
          alt=""
          width={20}
          height={20}
          className="rounded-[4px] flex-shrink-0"
          style={{
            objectFit: "contain",
          }}
          onError={() => setFailed(true)}
        />
      ) : (
        <span
          className="w-5 h-5 rounded-[4px] flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0"
          style={{ backgroundColor: logo.color, letterSpacing: "-0.02em" }}
        >
          {logo.name[0]}
        </span>
      )}
      <span
        className="text-[14px] font-medium whitespace-nowrap"
        style={{ color: "#4A4232", letterSpacing: "-0.01em" }}
      >
        {logo.name}
      </span>
    </div>
  );
}

function WaitlistModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [building, setBuilding] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    setErrorMsg("");
    try {
      const sb = getSupabaseBrowserClient();
      const { error } = await sb.from("signups").insert({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        company: company.trim(),
        role: role.trim(),
        building: building.trim(),
        source: "/joinwaitlist",
        user_agent: typeof navigator !== "undefined" ? navigator.userAgent : null,
      });
      if (error) throw error;
      setStatus("done");
    } catch (err) {
      console.error(err);
      setErrorMsg(
        "Something went wrong. Email alpha@apriori.work and we'll sort it."
      );
      setStatus("error");
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        backgroundColor: "rgba(20, 16, 8, 0.58)",
        backdropFilter: "blur(8px)",
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 14, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 8, scale: 0.985 }}
        transition={{ duration: 0.28, ease: [0.2, 0.65, 0.2, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[440px] rounded-[14px] p-8"
        style={{
          backgroundColor: "#FBF7EC",
          border: "1px solid rgba(26, 23, 18, 0.1)",
          boxShadow:
            "0 40px 90px -30px rgba(20,16,8,0.55), 0 1px 0 rgba(255,255,255,0.7) inset",
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
          style={{ color: "#7A7164" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "rgba(26,23,18,0.06)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "transparent")
          }
        >
          <X size={16} />
        </button>

        {status === "done" ? (
          <div className="flex flex-col items-start gap-4 py-1">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "rgba(184, 134, 11, 0.14)" }}
            >
              <Check size={18} style={{ color: "#B8860B" }} strokeWidth={3} />
            </div>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: 500,
                letterSpacing: "-0.025em",
                lineHeight: 1.15,
                color: "#141008",
              }}
            >
              You&apos;re in.
            </h2>
            <p
              style={{
                color: "#4E4839",
                lineHeight: 1.55,
                fontSize: "0.95rem",
              }}
            >
              We&apos;ll be in touch from{" "}
              <span style={{ color: "#141008", fontWeight: 500 }}>
                alpha@apriori.work
              </span>. <br /> Welcome to the Future of how product teams ship.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <h2
                style={{
                  fontSize: "1.4rem",
                  fontWeight: 500,
                  letterSpacing: "-0.025em",
                  lineHeight: 1.15,
                  color: "#141008",
                }}
              >
                Request access
              </h2>
              <p
                className="mt-2"
                style={{
                  fontSize: "0.92rem",
                  color: "#7A7164",
                  lineHeight: 1.55,
                }}
              >
                A few quick details. We onboard in small weekly batches.
              </p>
            </div>

            <Field
              label="Name"
              value={name}
              onChange={setName}
              placeholder="Aanya Kapoor"
            />
            <Field
              label="Work email"
              value={email}
              onChange={setEmail}
              placeholder="aanya@yourcompany.com"
              type="email"
              required
            />
            <div className="grid grid-cols-2 gap-3">
              <Field
                label="Company"
                value={company}
                onChange={setCompany}
                placeholder="Jar"
              />
              <Field
                label="Role"
                value={role}
                onChange={setRole}
                placeholder="Senior PM"
              />
            </div>
            <Field
              label="What are you shipping?"
              value={building}
              onChange={setBuilding}
              placeholder="A redesigned KYC onboarding"
              multiline
            />

            <button
              type="submit"
              disabled={status === "loading"}
              className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium text-[14px] text-white transition-all duration-200 disabled:opacity-60 mt-2"
              style={{ backgroundColor: "#1A1712" }}
              onMouseEnter={(e) => {
                if (status !== "loading")
                  e.currentTarget.style.backgroundColor = "#B8860B";
              }}
              onMouseLeave={(e) => {
                if (status !== "loading")
                  e.currentTarget.style.backgroundColor = "#1A1712";
              }}
            >
              {status === "loading" ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  Adding you…
                </>
              ) : (
                <>
                  Request access
                  <ArrowRight
                    size={14}
                    strokeWidth={2.5}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </>
              )}
            </button>

            {status === "error" && (
              <p className="text-sm" style={{ color: "#B45309" }}>
                {errorMsg}
              </p>
            )}
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  multiline = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  multiline?: boolean;
}) {
  const baseStyle: React.CSSProperties = {
    backgroundColor: "#FFFFFF",
    border: "1px solid rgba(26, 23, 18, 0.12)",
    color: "#141008",
    fontSize: "0.95rem",
    width: "100%",
    padding: "11px 13px",
    borderRadius: 8,
    outline: "none",
    transition: "border-color 0.15s, box-shadow 0.15s",
    fontFamily: "inherit",
  };
  return (
    <label className="flex flex-col gap-1.5">
      <span
        className="text-[10px] font-semibold uppercase tracking-[0.16em]"
        style={{ color: "#8A7F68" }}
      >
        {label}
        {required && <span style={{ color: "#B8860B" }}> *</span>}
      </span>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={2}
          style={baseStyle}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "#B8860B";
            e.currentTarget.style.boxShadow =
              "0 0 0 3px rgba(184,134,11,0.12)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "rgba(26, 23, 18, 0.12)";
            e.currentTarget.style.boxShadow = "none";
          }}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          style={baseStyle}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "#B8860B";
            e.currentTarget.style.boxShadow =
              "0 0 0 3px rgba(184,134,11,0.12)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "rgba(26, 23, 18, 0.12)";
            e.currentTarget.style.boxShadow = "none";
          }}
        />
      )}
    </label>
  );
}
