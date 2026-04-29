"use client";

import { useRouter } from 'next/navigation';
import { Sparkles, PlayCircle, Rocket, Users, Layers, BarChart3, X } from 'lucide-react';

interface WelcomeModalProps {
  firstName?: string;
  onDismiss: () => void;
}

export function WelcomeModal({ firstName, onDismiss }: WelcomeModalProps) {
  const router = useRouter();

  const handleSample = () => {
    onDismiss();
    router.push('/demo/univest');
  };

  const handleRunOwn = () => {
    onDismiss();
    router.push('/simulations/new/product-flow');
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-[fadeIn_0.2s_ease-out]"
      onClick={onDismiss}
    >
      <div
        className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onDismiss}
          aria-label="Close"
          className="absolute top-4 right-4 text-[#9CA3AF] hover:text-[#1A1A1A] transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header band */}
        <div className="bg-gradient-to-br from-gray-100 via-gray-100/50 to-white px-8 pt-8 pb-6 border-b border-[#F3F4F6]">
          <div className="w-12 h-12 bg-gray-700 rounded-xl flex items-center justify-center mb-4 shadow-[0_4px_12px_rgba(31, 41, 55,0.3)]">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-1.5">
            Welcome{firstName ? `, ${firstName}` : ''} 👋
          </h2>
          <p className="text-[15px] text-[#4B5563] leading-relaxed">
            Apriori simulates synthetic users walking through your product before you ship.
            See where they drop off, what confuses them, and what to fix, in minutes, not weeks.
          </p>
        </div>

        {/* How it works — 3 steps */}
        <div className="px-8 pt-6 pb-2">
          <p className="text-[12px] font-semibold text-[#9CA3AF] uppercase tracking-wider mb-4">
            How it works
          </p>
          <div className="grid grid-cols-3 gap-3 mb-6">
            <Step
              icon={<Users className="w-4 h-4 text-gray-800" />}
              n={1}
              title="Pick an audience"
              body="Use a curated template or define your own."
            />
            <Step
              icon={<Layers className="w-4 h-4 text-gray-800" />}
              n={2}
              title="Upload your flow"
              body="Drop in screens in the order users see them."
            />
            <Step
              icon={<BarChart3 className="w-4 h-4 text-gray-800" />}
              n={3}
              title="Read the verdict"
              body="Funnel, friction points, and recommended fixes."
            />
          </div>
        </div>

        {/* CTAs */}
        <div className="px-8 pb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={handleSample}
              className="group flex items-center gap-3 text-left bg-white border-[1.5px] border-[#E5E7EB] hover:border-gray-700 hover:bg-gray-100/40 rounded-xl px-4 py-3.5 transition-all"
            >
              <div className="w-9 h-9 bg-[#F3F4F6] group-hover:bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors">
                <PlayCircle className="w-5 h-5 text-[#4B5563] group-hover:text-gray-800 transition-colors" />
              </div>
              <div className="min-w-0">
                <p className="text-[14px] font-semibold text-[#1A1A1A]">See a sample run</p>
                <p className="text-[12px] text-[#6B7280] mt-0.5">2 min · no setup</p>
              </div>
            </button>

            <button
              onClick={handleRunOwn}
              className="group flex items-center gap-3 text-left bg-gray-700 hover:bg-gray-800 rounded-xl px-4 py-3.5 transition-all shadow-[0_2px_8px_rgba(31, 41, 55,0.3)] hover:shadow-[0_4px_12px_rgba(31, 41, 55,0.4)]"
            >
              <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Rocket className="w-5 h-5 text-white" />
              </div>
              <div className="min-w-0">
                <p className="text-[14px] font-semibold text-white">Run my first sim</p>
                <p className="text-[12px] text-gray-100/90 mt-0.5">Bring your own flow</p>
              </div>
            </button>
          </div>

          <button
            onClick={onDismiss}
            className="block mx-auto mt-4 text-[13px] text-[#9CA3AF] hover:text-[#6B7280] transition-colors"
          >
            Skip, I&apos;ll explore on my own
          </button>
        </div>
      </div>
    </div>
  );
}

function Step({ icon, n, title, body }: { icon: React.ReactNode; n: number; title: string; body: string }) {
  return (
    <div className="bg-[#FAFAF8] border border-[#F3F4F6] rounded-xl p-3.5">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-6 h-6 bg-white border border-[#E5E7EB] rounded-md flex items-center justify-center">
          {icon}
        </div>
        <span className="text-[11px] font-semibold text-[#9CA3AF]">STEP {n}</span>
      </div>
      <p className="text-[13px] font-semibold text-[#1A1A1A] mb-1 leading-tight">{title}</p>
      <p className="text-[12px] text-[#6B7280] leading-snug">{body}</p>
    </div>
  );
}
