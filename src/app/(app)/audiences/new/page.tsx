"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TopBar } from "@/components/app/TopBar";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { useAppShell } from "@/components/app/AppShell";
import { useToast } from "@/components/ui/Toast";
import { useFirebaseUser } from "@/contexts/FirebaseUserContext";
import { AudienceFilterBuilder, type ConditionGroupNode } from "@/components/audiences/AudienceFilterBuilder";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { saveAudience } from "@/lib/firestore";

export default function NewAudiencePage() {
  const { toggleMobileMenu, sidebarCollapsed } = useAppShell();
  const router = useRouter();
  const { showToast } = useToast();
  const { clerkId } = useFirebaseUser();

  const [step, setStep] = useState<"details" | "builder">("details");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [filters, setFilters] = useState<ConditionGroupNode | null>(null);
  const [saving, setSaving] = useState(false);

  const handleContinueToBuilder = () => {
    const trimmed = name.trim();
    if (!trimmed) {
      showToast("error", "Audience name required", "Add a name to continue.");
      return;
    }
    setStep("builder");
  };

  const handleSaveDraft = async () => {
    if (!clerkId) return;
    setSaving(true);
    try {
      await saveAudience(clerkId, {
        name: name.trim(),
        description: description.trim() || undefined,
        filters: filters ?? undefined,
        status: "draft",
        usedInSimulations: 0,
        demographics: [],
        psychographics: [],
        budget: "",
        risk: "",
      });
      showToast("success", "Draft saved", "Your audience draft has been saved.");
      router.push("/audiences");
    } catch (err) {
      console.error(err);
      showToast("error", "Failed to save draft", "Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleCreateAudience = async () => {
    const trimmed = name.trim();
    if (!trimmed) {
      showToast("error", "Audience name required", "Add a name to continue.");
      setStep("details");
      return;
    }
    if (!filters || filters.children.length === 0) {
      showToast(
        "error",
        "Add at least one condition",
        "Define at least one filter so this audience is segmentable."
      );
      return;
    }
    if (!clerkId) return;
    setSaving(true);
    try {
      await saveAudience(clerkId, {
        name: trimmed,
        description: description.trim() || undefined,
        filters: filters ?? undefined,
        status: "active",
        usedInSimulations: 0,
        demographics: [],
        psychographics: [],
        budget: "",
        risk: "",
      });
      showToast("success", "Audience created", "Your audience has been saved to Firebase.");
      router.push("/audiences");
    } catch (err) {
      console.error(err);
      showToast("error", "Failed to create audience", "Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <TopBar title="Create Audience" onMenuClick={toggleMobileMenu} />

      <div className="max-w-[1600px] mx-auto relative pb-24">
        {step === "details" ? (
          <div className="max-w-3xl space-y-6 mt-6">
            <Card>
              <CardContent className="space-y-5">
                <div>
                  <p className="text-label text-text-quaternary uppercase tracking-wide mb-1">
                    Step 1 · Audience details
                  </p>
                  <p className="text-body-sm text-text-tertiary">
                    Give this audience a clear name so you can reuse it across
                    simulations and ad experiments.
                  </p>
                </div>
                <Input
                  label="Audience name"
                  required
                  placeholder="e.g., Tier 1 Metro · ₹50K-1L Income · Age 25-35"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Textarea
                  label="Description (optional)"
                  placeholder="Short note for collaborators. e.g., Urban millennials in Mumbai/Delhi with high digital adoption, monthly income ₹50K-1L, frequent online shoppers."
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </CardContent>
            </Card>

            <div className="flex items-center justify-between">
              <Link href="/audiences">
                <Button variant="ghost" leftIcon={<ArrowLeft className="w-5 h-5" />}>
                  Cancel
                </Button>
              </Link>
              <Button
                rightIcon={<ArrowRight className="w-5 h-5" />}
                onClick={handleContinueToBuilder}
              >
                Save & continue to filters
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-4">
                <Card>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-label text-text-quaternary uppercase tracking-wide mb-1">
                        Audience
                      </p>
                      <p className="text-body-sm text-text-tertiary">
                        Basic metadata used anywhere this audience is referenced.
                      </p>
                    </div>
                    <Input
                      label="Audience name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <Textarea
                      label="Description (optional)"
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </CardContent>
                </Card>
              </div>
              <div className="lg:col-span-8">
                <AudienceFilterBuilder onChange={setFilters} />
              </div>
            </div>

            <footer className={`fixed bottom-0 left-0 right-0 bg-bg-secondary/95 backdrop-blur-sm shadow-[0_-1px_3px_rgba(0,0,0,0.06)] px-4 lg:px-8 py-4 z-20 transition-[left] duration-200 ease-out ${sidebarCollapsed ? 'lg:left-[72px]' : 'lg:left-[260px]'}`}>
              <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    leftIcon={<ArrowLeft className="w-5 h-5" />}
                    onClick={() => setStep("details")}
                  >
                    Back to details
                  </Button>
                  <Link href="/audiences">
                    <Button variant="ghost">Discard</Button>
                  </Link>
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="secondary" onClick={handleSaveDraft} disabled={saving}>
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                    Save draft
                  </Button>
                  <Button onClick={handleCreateAudience} disabled={saving}>
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                    Create audience
                  </Button>
                </div>
              </div>
            </footer>
          </div>
        )}
      </div>
    </>
  );
}

