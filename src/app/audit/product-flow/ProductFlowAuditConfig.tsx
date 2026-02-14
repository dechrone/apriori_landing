"use client";

import { useState, useCallback, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Trash2,
  Upload,
  ArrowLeft,
  Play,
  FileText,
  List,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";

// Types
interface FlowStep {
  id: string;
  image: File | null;
  imagePreview: string | null;
  pageLabel: string;
  description: string;
}

interface StructuredAudience {
  jobTitles: string;
  industries: string;
  geography: string;
  keyPainPoints: string;
}

const PAGE_LABEL_OPTIONS = [
  "Landing Page",
  "Pricing",
  "Signup",
  "OTP Verification",
  "Onboarding",
  "Checkout",
  "Dashboard",
  "Settings",
  "Profile",
  "Other",
];

const createEmptyStep = (): FlowStep => ({
  id: crypto.randomUUID(),
  image: null,
  imagePreview: null,
  pageLabel: "",
  description: "",
});

export function ProductFlowAuditConfig() {
  const [steps, setSteps] = useState<FlowStep[]>(() => [createEmptyStep()]);
  const [audienceMode, setAudienceMode] = useState<"freeform" | "structured">("freeform");
  const [freeformICP, setFreeformICP] = useState("");
  const [structuredAudience, setStructuredAudience] = useState<StructuredAudience>({
    jobTitles: "",
    industries: "",
    geography: "",
    keyPainPoints: "",
  });
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  // Flow Builder handlers
  const addStep = useCallback(() => {
    setSteps((prev) => [...prev, createEmptyStep()]);
  }, []);

  const removeStep = useCallback((id: string) => {
    setSteps((prev) => {
      if (prev.length <= 1) return prev;
      return prev.filter((s) => s.id !== id);
    });
  }, []);

  const updateStep = useCallback(
    (id: string, updates: Partial<FlowStep>) => {
      setSteps((prev) =>
        prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
      );
    },
    []
  );

  const handleImageChange = useCallback(
    (stepId: string, e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file || !file.type.startsWith("image/")) return;

      const reader = new FileReader();
      reader.onload = () => {
        updateStep(stepId, {
          image: file,
          imagePreview: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    },
    [updateStep]
  );

  const removeImage = useCallback(
    (stepId: string) => {
      updateStep(stepId, { image: null, imagePreview: null });
      const input = fileInputRefs.current[stepId];
      if (input) input.value = "";
    },
    [updateStep]
  );

  const handleDrop = useCallback(
    (stepId: string, e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files?.[0];
      if (!file || !file.type.startsWith("image/")) return;

      const reader = new FileReader();
      reader.onload = () => {
        updateStep(stepId, {
          image: file,
          imagePreview: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    },
    [updateStep]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  // Validation
  const hasValidSteps = steps.some((s) => s.pageLabel.trim() !== "");
  const hasValidAudience =
    audienceMode === "freeform"
      ? freeformICP.trim().length >= 20
      : Object.values(structuredAudience).some((v) => v.trim() !== "");
  const canSubmit = hasValidSteps && hasValidAudience;

  // Submit handler (mock)
  const handleSubmit = useCallback(() => {
    const payload = {
      flow: steps.map((s, i) => ({
        stepNumber: i + 1,
        pageLabel: s.pageLabel,
        description: s.description,
        hasImage: !!s.image,
        imageName: s.image?.name,
      })),
      audience: {
        mode: audienceMode,
        freeform: audienceMode === "freeform" ? freeformICP : undefined,
        structured:
          audienceMode === "structured" ? structuredAudience : undefined,
      },
    };
    console.log("[Product Flow Audit] Submission payload:", payload);
    alert(
      "Simulation submitted! (Mock)\n\nCheck the console for the payload."
    );
  }, [steps, audienceMode, freeformICP, structuredAudience]);

  return (
    <div className="min-h-screen flex flex-col bg-deep">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border-subtle bg-deep/95 backdrop-blur-md">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-text-tertiary hover:text-amber transition-colors text-sm font-medium"
          >
            <ArrowLeft size={18} />
            Back to home
          </Link>
          <h1 className="text-lg font-semibold text-text-primary">
            Product Flow Audit
          </h1>
          <div className="w-24" /> {/* Spacer for centering */}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-[1400px] mx-auto w-full px-6 md:px-16 py-8 pb-32">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Section 1: Flow Builder */}
          <section>
            <div className="mb-6">
              <h2 className="text-h3 text-text-primary mb-2">
                The Flow Builder
              </h2>
              <p className="text-sm text-text-secondary">
                Define each step of your user journey. Add screenshots to help
                the simulation understand context.
              </p>
            </div>

            <div className="space-y-6">
              <AnimatePresence mode="popLayout">
                {steps.map((step, index) => (
                  <motion.div
                    key={step.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{
                      duration: 0.3,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <GlassCard
                      padding="lg"
                      className="relative border-border-subtle"
                    >
                      {/* Step header */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-tiny font-mono text-amber uppercase tracking-wider">
                          Step {String(index + 1).padStart(2, "0")}
                        </span>
                        {steps.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeStep(step.id)}
                            className="p-2 rounded-lg text-text-tertiary hover:text-red-400 hover:bg-red-500/10 transition-colors"
                            aria-label="Delete step"
                          >
                            <Trash2 size={18} />
                          </button>
                        )}
                      </div>

                      {/* Image Uploader */}
                      <div className="mb-4">
                        <input
                          ref={(el) => {
                            fileInputRefs.current[step.id] = el;
                          }}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageChange(step.id, e)}
                        />
                        {step.imagePreview ? (
                          <div className="relative rounded-lg overflow-hidden border border-border-subtle bg-elevated/30">
                            <img
                              src={step.imagePreview}
                              alt={`Step ${index + 1} preview`}
                              className="w-full h-40 object-cover object-top"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(step.id)}
                              className="absolute top-2 right-2 p-2 rounded-lg bg-deep/80 text-text-tertiary hover:text-red-400 hover:bg-red-500/20 transition-colors"
                              aria-label="Remove image"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ) : (
                          <div
                            onClick={() =>
                              fileInputRefs.current[step.id]?.click()
                            }
                            onDrop={(e) => handleDrop(step.id, e)}
                            onDragOver={handleDragOver}
                            className="flex flex-col items-center justify-center h-40 rounded-lg border-2 border-dashed border-border-subtle hover:border-amber/40 bg-elevated/20 cursor-pointer transition-colors group"
                          >
                            <div className="w-12 h-12 rounded-lg bg-amber/10 flex items-center justify-center mb-2 group-hover:bg-amber/20 transition-colors">
                              <Upload size={24} className="text-amber" />
                            </div>
                            <p className="text-sm text-text-secondary">
                              Drag & drop or click to upload
                            </p>
                            <p className="text-tiny text-text-tertiary mt-1">
                              Screenshot of this step
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Page Label */}
                      <div className="mb-4">
                        <label className="block text-tiny font-medium text-text-secondary mb-2">
                          Page / Screen
                        </label>
                        <select
                          value={step.pageLabel}
                          onChange={(e) =>
                            updateStep(step.id, {
                              pageLabel: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 rounded-lg bg-elevated/50 border border-border-subtle text-text-primary focus:border-amber focus:ring-1 focus:ring-amber/50 outline-none transition-colors"
                        >
                          <option value="">Select page type...</option>
                          {PAGE_LABEL_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Description */}
                      <div>
                        <label className="block text-tiny font-medium text-text-secondary mb-2">
                          Description (optional)
                        </label>
                        <textarea
                          value={step.description}
                          onChange={(e) =>
                            updateStep(step.id, {
                              description: e.target.value,
                            })
                          }
                          placeholder="e.g., User sees pricing tiers after signup..."
                          rows={2}
                          className="w-full px-4 py-3 rounded-lg bg-elevated/50 border border-border-subtle text-text-primary placeholder:text-text-tertiary focus:border-amber focus:ring-1 focus:ring-amber/50 outline-none transition-colors resize-none"
                        />
                      </div>
                    </GlassCard>
                  </motion.div>
                ))}
              </AnimatePresence>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Button
                  variant="secondary"
                  size="md"
                  leftIcon={<Plus size={18} />}
                  onClick={addStep}
                  className="w-full"
                >
                  Add Next Step
                </Button>
              </motion.div>
            </div>
          </section>

          {/* Section 2: Target Audience */}
          <section>
            <div className="mb-6">
              <h2 className="text-h3 text-text-primary mb-2">
                Target Audience
              </h2>
              <p className="text-sm text-text-secondary">
                The simulation will generate 10 distinct personas based on
                your input. Choose how you&apos;d like to define them.
              </p>
            </div>

            <GlassCard padding="lg" className="border-border-subtle">
              {/* Mode Tabs */}
              <div className="flex rounded-lg bg-elevated/50 p-1 mb-6">
                <button
                  type="button"
                  onClick={() => setAudienceMode("freeform")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-md text-sm font-medium transition-all ${
                    audienceMode === "freeform"
                      ? "bg-amber text-deep shadow-sm"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  <FileText size={18} />
                  Freeform (Narrative)
                </button>
                <button
                  type="button"
                  onClick={() => setAudienceMode("structured")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-md text-sm font-medium transition-all ${
                    audienceMode === "structured"
                      ? "bg-amber text-deep shadow-sm"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  <List size={18} />
                  Structured (Fields)
                </button>
              </div>

              {audienceMode === "freeform" ? (
                <motion.div
                  key="freeform"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <label className="block text-tiny font-medium text-text-secondary mb-2">
                    Ideal Customer Profile (ICP)
                  </label>
                  <textarea
                    value={freeformICP}
                    onChange={(e) => setFreeformICP(e.target.value)}
                    placeholder="e.g., CTOs at Series B startups looking to cut cloud costs. Typically 35–50, technical background, frustrated with vendor lock-in and opaque pricing..."
                    rows={8}
                    className="w-full px-4 py-3 rounded-lg bg-elevated/50 border border-border-subtle text-text-primary placeholder:text-text-tertiary focus:border-amber focus:ring-1 focus:ring-amber/50 outline-none transition-colors resize-none"
                  />
                  <p className="text-tiny text-text-tertiary mt-2">
                    Minimum 20 characters. Be as detailed as possible.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="structured"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-tiny font-medium text-text-secondary mb-2">
                      Job Titles
                    </label>
                    <input
                      type="text"
                      value={structuredAudience.jobTitles}
                      onChange={(e) =>
                        setStructuredAudience((prev) => ({
                          ...prev,
                          jobTitles: e.target.value,
                        }))
                      }
                      placeholder="e.g., Product Manager, CTO, VP Engineering"
                      className="w-full px-4 py-3 rounded-lg bg-elevated/50 border border-border-subtle text-text-primary placeholder:text-text-tertiary focus:border-amber focus:ring-1 focus:ring-amber/50 outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-tiny font-medium text-text-secondary mb-2">
                      Industries
                    </label>
                    <input
                      type="text"
                      value={structuredAudience.industries}
                      onChange={(e) =>
                        setStructuredAudience((prev) => ({
                          ...prev,
                          industries: e.target.value,
                        }))
                      }
                      placeholder="e.g., Fintech, Healthcare, SaaS"
                      className="w-full px-4 py-3 rounded-lg bg-elevated/50 border border-border-subtle text-text-primary placeholder:text-text-tertiary focus:border-amber focus:ring-1 focus:ring-amber/50 outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-tiny font-medium text-text-secondary mb-2">
                      Geography
                    </label>
                    <input
                      type="text"
                      value={structuredAudience.geography}
                      onChange={(e) =>
                        setStructuredAudience((prev) => ({
                          ...prev,
                          geography: e.target.value,
                        }))
                      }
                      placeholder="e.g., North America, EMEA, APAC"
                      className="w-full px-4 py-3 rounded-lg bg-elevated/50 border border-border-subtle text-text-primary placeholder:text-text-tertiary focus:border-amber focus:ring-1 focus:ring-amber/50 outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-tiny font-medium text-text-secondary mb-2">
                      Key Pain Points
                    </label>
                    <textarea
                      value={structuredAudience.keyPainPoints}
                      onChange={(e) =>
                        setStructuredAudience((prev) => ({
                          ...prev,
                          keyPainPoints: e.target.value,
                        }))
                      }
                      placeholder="e.g., Budget constraints, compliance requirements, integration complexity..."
                      rows={3}
                      className="w-full px-4 py-3 rounded-lg bg-elevated/50 border border-border-subtle text-text-primary placeholder:text-text-tertiary focus:border-amber focus:ring-1 focus:ring-amber/50 outline-none transition-colors resize-none"
                    />
                  </div>
                </motion.div>
              )}
            </GlassCard>
          </section>
        </div>
      </main>

      {/* Sticky Footer */}
      <footer className="fixed bottom-0 left-0 right-0 z-40 border-t border-border-subtle bg-deep/95 backdrop-blur-md">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16 py-4 flex items-center justify-between">
          <p className="text-sm text-text-tertiary hidden sm:block">
            {!hasValidSteps && "Add at least one step with a page label."}
            {hasValidSteps && !hasValidAudience && "Complete audience configuration."}
            {canSubmit && "Ready to run simulation."}
          </p>
          <Button
            variant="primary"
            size="lg"
            leftIcon={<Play size={20} />}
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="min-w-[200px]"
          >
            Run Simulation
          </Button>
        </div>
      </footer>
    </div>
  );
}
