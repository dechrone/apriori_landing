"use client";

/**
 * Dealshare — refer a new deal.
 *
 * A scout submits a prospect; it lands at the "Submitted" stage and starts
 * its tracked journey through the pipeline.
 */

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { useAuthContext } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";
import { useToast } from "@/components/ui/Toast";
import { getMyScout, createDeal, type Scout } from "@/lib/dealshare";
import { TNC_VERSION } from "@/lib/dealshare-constants";
import { WhatsAppReferCard } from "@/components/dealshare/WhatsAppRefer";

export default function NewDealPage() {
  const { userId, profile } = useUser();
  const { user } = useAuthContext();
  const email = profile?.email || user?.email || "";
  const router = useRouter();
  const { showToast } = useToast();

  const [scout, setScout] = useState<Scout | null>(null);
  const [ready, setReady] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    companyName: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    website: "",
    description: "",
    dealValue: "",
    currency: "INR",
  });

  useEffect(() => {
    if (!userId) return;
    (async () => {
      try {
        const s = await getMyScout(userId, email);
        setScout(s);
        if (!s || s.tncVersion !== TNC_VERSION) {
          showToast("warning", "Please finish onboarding before referring a deal.");
          router.replace("/dealshare");
          return;
        }
        if (s.status !== "active") {
          showToast("warning", "Your scout account is paused — contact the Apriori team to resume.");
          router.replace("/dealshare");
          return;
        }
      } catch (e) {
        showToast("error", e instanceof Error ? e.message : "Could not load your scout account.");
      } finally {
        setReady(true);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, email]);

  function set<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!scout) return;
    if (!form.companyName.trim()) {
      showToast("warning", "Company name is required.");
      return;
    }
    setSaving(true);
    try {
      const parsedValue = form.dealValue.trim() ? Number(form.dealValue.replace(/[^0-9.]/g, "")) : null;
      const id = await createDeal(scout.id, {
        companyName: form.companyName.trim(),
        contactName: form.contactName.trim() || undefined,
        contactEmail: form.contactEmail.trim() || undefined,
        contactPhone: form.contactPhone.trim() || undefined,
        website: form.website.trim() || undefined,
        description: form.description.trim() || undefined,
        dealValue: parsedValue && !Number.isNaN(parsedValue) ? parsedValue : null,
        currency: form.currency,
      });
      showToast("success", "Deal referred — now tracking it.");
      router.push(`/dealshare/${id}`);
    } catch (err) {
      showToast("error", err instanceof Error ? err.message : "Could not save the deal.");
      setSaving(false);
    }
  }

  return (
    <>
      <div className="p-5 sm:p-8 lg:p-10">
        <div className="mx-auto max-w-[680px]">
          <Link
            href="/dealshare"
            className="mb-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-text-secondary hover:text-text-primary"
          >
            <ArrowLeft className="h-4 w-4" /> Back to dashboard
          </Link>

          {!ready ? (
            <div className="flex justify-center py-24">
              <Spinner />
            </div>
          ) : (
            <>
              {scout && (
                <div className="mb-5">
                  <WhatsAppReferCard scout={scout} />
                  <div className="my-5 flex items-center gap-3 text-[12px] font-medium uppercase tracking-wide text-text-tertiary">
                    <span className="h-px flex-1 bg-border-subtle" /> or fill the form{" "}
                    <span className="h-px flex-1 bg-border-subtle" />
                  </div>
                </div>
              )}
              <Card>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h2 className="text-h4 font-semibold text-text-primary">Deal details</h2>
                  <p className="mt-1 text-[13px] text-text-secondary">
                    Tip: use the prospect&apos;s correct registered email and CC (not BCC) the
                    Apriori team — that&apos;s the #1 cause of missing attribution.
                  </p>
                </div>

                <Input
                  label="Company / prospect"
                  required
                  value={form.companyName}
                  onChange={(e) => set("companyName", e.target.value)}
                  placeholder="Nomadiq Pvt Ltd"
                />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Input
                    label="Contact name"
                    value={form.contactName}
                    onChange={(e) => set("contactName", e.target.value)}
                    placeholder="Atindra Mishra"
                  />
                  <Input
                    label="Contact email"
                    type="email"
                    value={form.contactEmail}
                    onChange={(e) => set("contactEmail", e.target.value)}
                    placeholder="atindra.k@nomadiq.co.in"
                  />
                  <Input
                    label="Contact phone"
                    value={form.contactPhone}
                    onChange={(e) => set("contactPhone", e.target.value)}
                    placeholder="+91 …"
                  />
                  <Input
                    label="Website"
                    value={form.website}
                    onChange={(e) => set("website", e.target.value)}
                    placeholder="nomadiq.co.in"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="sm:col-span-2">
                    <Input
                      label="Estimated deal value"
                      value={form.dealValue}
                      onChange={(e) => set("dealValue", e.target.value)}
                      placeholder="500000"
                      inputMode="numeric"
                    />
                  </div>
                  <Select
                    label="Currency"
                    value={form.currency}
                    onChange={(e) => set("currency", e.target.value)}
                    options={[
                      { value: "INR", label: "₹ INR" },
                      { value: "USD", label: "$ USD" },
                      { value: "EUR", label: "€ EUR" },
                      { value: "GBP", label: "£ GBP" },
                    ]}
                  />
                </div>

                <Textarea
                  label="Context / why it's a fit"
                  rows={4}
                  value={form.description}
                  onChange={(e) => set("description", e.target.value)}
                  placeholder="How you know them, what they sell, why Apriori fits…"
                />

                <div className="flex justify-end gap-3 pt-2">
                  <Link href="/dealshare">
                    <Button variant="secondary" type="button">
                      Cancel
                    </Button>
                  </Link>
                  <Button variant="primary" type="submit" disabled={saving}>
                    {saving ? "Submitting…" : "Refer deal"}
                  </Button>
                </div>
              </form>
              </Card>
            </>
          )}
        </div>
      </div>
    </>
  );
}
