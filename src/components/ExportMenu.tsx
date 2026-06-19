"use client";

import { useState } from "react";
import { Download, Check, ChevronDown } from "lucide-react";
import type { SimulationData } from "@/types/simulation";
import {
  simulationToMarkdown,
  simulationToCSV,
  copyToClipboard,
  downloadFile,
  safeFilename,
} from "@/lib/exportSimulation";

interface Props {
  data: SimulationData;
  name?: string;
  /** Tailwind classes for the trigger button (so callers match their toolbar). */
  className?: string;
}

/**
 * Self-contained export menu for a finished single-flow simulation. Assembles a
 * Markdown decision memo + CSV client-side (no backend). Free on purpose — every
 * exported memo / shared link markets Apriori. Shows local success/failure
 * feedback so it works on the public share page (no Toast provider there).
 */
export function ExportMenu({ data, name, className }: Props) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");

  const base = safeFilename(name || data.flow_name || "simulation");

  const flash = (s: "copied" | "error") => {
    setStatus(s);
    setTimeout(() => setStatus("idle"), 2200);
  };

  const handleCopyMarkdown = async () => {
    try {
      await copyToClipboard(simulationToMarkdown(data, name));
      flash("copied");
    } catch {
      flash("error");
    }
    setOpen(false);
  };

  const handleDownloadMarkdown = () => {
    downloadFile(`${base}.md`, simulationToMarkdown(data, name), "text/markdown");
    setOpen(false);
  };

  const handleDownloadCsv = () => {
    downloadFile(`${base}.csv`, simulationToCSV(data), "text/csv");
    setOpen(false);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen((o) => !o)}
        className={
          className ??
          "inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-[13px] font-semibold border bg-white text-[#1A1A1A] border-[#E8E4DE] hover:bg-[#F8F6F1] transition-colors"
        }
        title="Export this report"
      >
        {status === "copied" ? (
          <Check className="w-4 h-4 text-emerald-600" />
        ) : (
          <Download className="w-4 h-4" />
        )}
        {status === "copied" ? "Copied" : status === "error" ? "Copy failed" : "Export"}
        <ChevronDown className="w-3.5 h-3.5 opacity-60" />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-2 z-50 w-56 rounded-xl border border-[#E8E4DE] bg-white shadow-lg overflow-hidden">
            <MenuItem label="Copy as Markdown" sub="Paste into Notion / Slack" onClick={handleCopyMarkdown} />
            <MenuItem label="Download Markdown" sub={`${base}.md`} onClick={handleDownloadMarkdown} />
            <MenuItem label="Download CSV" sub="Per-persona × per-screen" onClick={handleDownloadCsv} />
          </div>
        </>
      )}
    </div>
  );
}

function MenuItem({
  label,
  sub,
  onClick,
}: {
  label: string;
  sub: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left px-4 py-2.5 hover:bg-[#F8F6F1] transition-colors border-b border-[#F1F5F9] last:border-b-0"
    >
      <p className="text-[13px] font-semibold text-[#1A1A1A]">{label}</p>
      <p className="text-[11px] text-[#94A3B8] mt-0.5">{sub}</p>
    </button>
  );
}

export default ExportMenu;
