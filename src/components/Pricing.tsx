"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Star, Zap, Crown } from "lucide-react";
import { GlassCard } from "./ui/GlassCard";
import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";

const pricingPlans = [
  {
    name: "Starter",
    price: "$299",
    period: "one-time",
    description: "Perfect for validating your first high-stakes decision",
    features: [
      "Single scenario simulation",
      "5 core persona cohorts",
      "Risk assessment report",
      "Email support",
    ],
    cta: "Start Validating",
    popular: false,
  },
  {
    name: "Strategic",
    price: "$1,499",
    period: "one-time",
    description: "Comprehensive audit for product launches & pivots",
    features: [
      "Up to 5 competing scenarios",
      "All 20 persona cohorts",
      "Detailed risk mitigation plan",
      "Implementation roadmap",
      "1-week email support",
      "Stakeholder presentation deck",
    ],
    cta: "Most Teams Start Here",
    popular: true,
    badge: "Most Popular",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "pricing",
    description: "White-glove service for scale-up companies",
    features: [
      "Unlimited scenarios",
      "Custom persona development",
      "Real-time simulation access",
      "Dedicated success manager",
      "API integration",
      "Custom reporting",
      "On-site workshops",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export function Pricing() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 70%, rgba(245, 158, 11, 0.03) 0%, transparent 50%)",
        }}
      />

      <div className="relative max-w-[1280px] mx-auto px-6 md:px-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold text-amber uppercase tracking-[0.1em] mb-4 block">
            PRICING THAT SCALES WITH CONFIDENCE
          </span>
          <h2 className="text-h2 text-text-primary max-w-[700px] mx-auto mb-4">
            One Audit. Zero Regrets.
          </h2>
          <p className="text-large text-text-secondary max-w-[600px] mx-auto">
            Most teams spend $50K+ fixing post-launch failures. We prevent them for a fraction of the cost.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className={`relative ${plan.popular ? 'md:scale-105 md:-mt-4' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <Badge variant="amber" className="px-4 py-1 text-sm">
                    <Star size={14} className="mr-1" />
                    {plan.badge}
                  </Badge>
                </div>
              )}

              <GlassCard
                padding="lg"
                className={`h-full relative overflow-hidden ${
                  plan.popular
                    ? 'border-amber shadow-[0_0_40px_rgba(245,158,11,0.15)] bg-amber/[0.02]'
                    : 'border-border-subtle'
                }`}
              >
                {/* Popular glow effect */}
                {plan.popular && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    animate={{ opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                      boxShadow: "inset 0 0 60px rgba(245, 158, 11, 0.1)",
                    }}
                  />
                )}

                <div className="relative z-10 space-y-6">
                  {/* Header */}
                  <div className="text-center">
                    <h3 className={`text-xl font-semibold mb-2 ${plan.popular ? 'text-amber' : 'text-text-primary'}`}>
                      {plan.name}
                    </h3>
                    <p className="text-sm text-text-tertiary mb-4">
                      {plan.description}
                    </p>
                  </div>

                  {/* Pricing */}
                  <div className="text-center">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className={`text-4xl font-bold ${plan.popular ? 'text-amber' : 'text-text-primary'}`}>
                        {plan.price}
                      </span>
                      {plan.period !== "pricing" && (
                        <span className="text-text-tertiary text-lg">
                          {plan.period}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
                          plan.popular ? 'bg-amber/20' : 'bg-border-emphasis/50'
                        }`}>
                          <Check
                            size={12}
                            className={plan.popular ? 'text-amber' : 'text-text-tertiary'}
                          />
                        </div>
                        <span className="text-sm text-text-secondary">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="pt-4">
                    <Button
                      variant={plan.popular ? "primary" : "secondary"}
                      size="lg"
                      className="w-full"
                      rightIcon={plan.popular ? <Zap size={16} /> : undefined}
                    >
                      {plan.cta}
                    </Button>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Bottom Trust Elements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-text-tertiary">
            <div className="flex items-center gap-2">
              <Check size={14} className="text-emerald-400" />
              <span>No monthly fees • Pay once, own forever</span>
            </div>
            <div className="flex items-center gap-2">
              <Check size={14} className="text-emerald-400" />
              <span>48-hour delivery guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <Check size={14} className="text-emerald-400" />
              <span>Money-back if not satisfied</span>
            </div>
          </div>

          <p className="text-tiny text-text-tertiary mt-8 max-w-md mx-auto">
            Join 200+ teams who've prevented $50M+ in failed launches. Your next audit could save your company.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
