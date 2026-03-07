"use client";

import { Check } from 'lucide-react';

interface StepProgressBarProps {
  currentStep: number;
  totalSteps: number;
  labels: string[];
}

export function StepProgressBar({ currentStep, totalSteps, labels }: StepProgressBarProps) {
  const filledWidth = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="max-w-[640px] mx-auto mb-10 px-2">
      {/* Track + Nodes */}
      <div className="relative flex items-center justify-between" style={{ minHeight: 32 }}>
        {/* Background line */}
        <div
          className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-[2px] bg-[#E5E7EB]"
          style={{ zIndex: 0 }}
        />
        {/* Filled line */}
        <div
          className="absolute left-4 top-1/2 -translate-y-1/2 h-[2px] bg-[#F59E0B]"
          style={{
            width: `calc(${filledWidth}% - ${filledWidth === 100 ? 32 : filledWidth === 0 ? 0 : 16}px)`,
            transition: 'width 400ms ease',
            zIndex: 1,
          }}
        />
        {/* Step circles */}
        {labels.map((_, idx) => {
          const stepNum = idx + 1;
          const isCompleted = stepNum < currentStep;
          const isActive = stepNum === currentStep;
          // const isUpcoming = stepNum > currentStep;

          return (
            <div
              key={idx}
              className="relative flex items-center justify-center"
              style={{ zIndex: 2 }}
            >
              <div
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold
                  transition-all duration-300 ease-in-out
                  ${isCompleted
                    ? 'bg-[#F59E0B] text-white'
                    : isActive
                      ? 'bg-[#F59E0B] text-white shadow-[0_0_0_4px_rgba(245,158,11,0.2)]'
                      : 'bg-white border-2 border-[#E5E7EB] text-[#9CA3AF]'
                  }
                `}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4" />
                ) : (
                  stepNum
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Labels */}
      <div className="flex justify-between mt-2">
        {labels.map((label, idx) => {
          const stepNum = idx + 1;
          const isActive = stepNum <= currentStep;

          return (
            <span
              key={idx}
              className={`text-[12px] text-center ${
                isActive
                  ? 'font-semibold text-[#1A1A1A]'
                  : 'font-normal text-[#9CA3AF]'
              }`}
              style={{ width: `${100 / labels.length}%` }}
            >
              {label}
            </span>
          );
        })}
      </div>
    </div>
  );
}
