"use client";

/**
 * Dealshare — WhatsApp referral CTAs.
 *
 * `WhatsAppReferButton` — a green button that opens WhatsApp pre-filled.
 * `WhatsAppReferCard`   — the "easiest way to refer" panel for the dashboard.
 */

import type { Scout } from "@/lib/dealshare";
import { buildReferralWaLink } from "@/lib/dealshare-whatsapp";

// Inline WhatsApp glyph (lucide has no brand icon).
function WaIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.748-.989a9.857 9.857 0 002.736.382zm5.314-4.456c-.151.071-.93.461-1.073.514-.143.052-.247.078-.351-.078-.104-.156-.402-.514-.493-.62-.091-.104-.182-.117-.338-.039-.156.078-.66.243-1.257.776-.465.415-.779.927-.87 1.083-.091.156-.01.24.068.318.07.07.156.182.234.273.078.091.104.156.156.26.052.104.026.195-.013.273-.039.078-.351.846-.481 1.158-.127.305-.256.264-.351.269-.091.004-.195.005-.299.005a.578.578 0 00-.416.195c-.143.156-.546.534-.546 1.302 0 .768.559 1.51.637 1.614.078.104 1.101 1.682 2.668 2.359.373.161.664.257.891.329.374.119.715.102.984.062.300-.045.93-.380 1.062-.747.130-.367.130-.682.091-.747-.039-.065-.143-.104-.299-.182z" />
    </svg>
  );
}

export function WhatsAppReferButton({
  scout,
  size = "md",
  label = "Refer on WhatsApp",
}: {
  scout: Scout;
  size?: "sm" | "md";
  label?: string;
}) {
  const pad = size === "sm" ? "px-3.5 py-2 text-[13px]" : "px-5 py-3 text-[15px]";
  return (
    <a
      href={buildReferralWaLink(scout)}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] bg-[#25D366] font-semibold text-white shadow-[var(--shadow-sm)] transition-standard hover:bg-[#1FB855] hover:-translate-y-0.5 ${pad}`}
    >
      <WaIcon className={size === "sm" ? "h-4 w-4" : "h-5 w-5"} />
      {label}
    </a>
  );
}

export function WhatsAppReferCard({ scout }: { scout: Scout }) {
  return (
    <div className="flex flex-col gap-3 rounded-[var(--radius-md)] border border-[#A7F3D0] bg-[#F0FDF4] p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white">
          <WaIcon className="h-5 w-5" />
        </span>
        <div>
          <p className="text-[14px] font-semibold text-[#065F46]">Refer in seconds on WhatsApp</p>
          <p className="text-[13px] text-[#047857]">
            Opens a pre-filled chat to the Apriori team — just add the company &amp; contact and
            send. We&apos;ll add it to your pipeline.
          </p>
        </div>
      </div>
      <div className="flex-shrink-0">
        <WhatsAppReferButton scout={scout} size="sm" />
      </div>
    </div>
  );
}
