"use client";

/**
 * Dealshare onboarding + T&C gate.
 *
 * Two jobs, in one modal flow:
 *   1. If the user has no scout row, collect name/company and create one.
 *   2. If the scout hasn't accepted the current terms, show them and require
 *      acceptance before the dashboard unlocks.
 *
 * The parent renders this over a blurred dashboard and refreshes the scout on
 * completion.
 */

import { useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";
import { TNC_TEXT, TNC_VERSION } from "@/lib/dealshare-constants";
import { acceptTerms, createMyScout, type Scout } from "@/lib/dealshare";

export function TermsGate({
  scout,
  userId,
  email,
  onDone,
}: {
  scout: Scout | null;
  userId: string;
  email: string;
  onDone: () => void;
}) {
  const { showToast } = useToast();
  const needsOnboarding = !scout;
  const [name, setName] = useState(scout?.name ?? "");
  const [company, setCompany] = useState(scout?.company ?? "");
  const [agreed, setAgreed] = useState(false);
  const [busy, setBusy] = useState(false);

  async function handleSubmit() {
    if (!agreed) {
      showToast("warning", "Please accept the terms to continue.");
      return;
    }
    setBusy(true);
    try {
      let s = scout;
      if (!s) {
        if (!name.trim()) {
          showToast("warning", "Your name is required.");
          setBusy(false);
          return;
        }
        s = await createMyScout(userId, email, {
          name: name.trim(),
          company: company.trim() || undefined,
        });
      }
      await acceptTerms(s.id);
      showToast("success", "Welcome to Apriori Dealshare.");
      onDone();
    } catch (e) {
      showToast("error", e instanceof Error ? e.message : "Could not complete onboarding.");
      setBusy(false);
    }
  }

  return (
    <Modal isOpen onClose={() => {}} size="medium">
      <ModalHeader>{needsOnboarding ? "Join Apriori Dealshare" : "Updated scout terms"}</ModalHeader>
      <ModalBody className="space-y-4">
        <p className="text-[13px] text-text-secondary">
          {needsOnboarding
            ? "Set up your scout account to start referring deals."
            : `Please review and accept the latest terms (v${TNC_VERSION}).`}
        </p>
        {needsOnboarding && (
          <div className="space-y-3">
            <Input label="Your name" value={name} onChange={(e) => setName(e.target.value)} required />
            <Input
              label="Company (optional)"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
            <Input label="Registered email" value={email} disabled helperText="Deals are attributed to this email — keep it consistent and CC (not BCC) the Apriori team." />
          </div>
        )}

        <div className="max-h-64 overflow-y-auto rounded-[var(--radius-md)] border border-border-subtle bg-[#FAFAF8] p-4 text-[13px] leading-relaxed text-text-secondary whitespace-pre-wrap">
          {TNC_TEXT}
        </div>

        <label className="flex cursor-pointer items-start gap-2.5 text-[13px] text-text-primary">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5 h-4 w-4 accent-[#16A34A]"
          />
          <span>
            I have read and agree to the Apriori Dealshare Scout Terms (v{TNC_VERSION}).
          </span>
        </label>
      </ModalBody>
      <ModalFooter>
        <Button variant="primary" onClick={handleSubmit} disabled={busy || !agreed}>
          {busy ? "Saving…" : needsOnboarding ? "Create account & accept" : "Accept terms"}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
