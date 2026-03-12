"use client";

import { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

interface DropdownOption {
  value: string;
  label: string;
}

interface StyledDropdownProps {
  label?: string;
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  helperText?: string;
}

export function StyledDropdown({
  label,
  options,
  value,
  onChange,
  error,
  helperText,
}: StyledDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const selectedLabel = options.find((o) => o.value === value)?.label ?? '';

  return (
    <div className="w-full">
      {label && (
        <label className="block text-body-sm font-medium text-text-secondary mb-2">
          {label}
        </label>
      )}
      <div ref={ref} className="relative">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className={`
            flex items-center gap-2 w-full border-[1.5px] rounded-[10px] px-4 py-[10px] 
            bg-bg-secondary text-[14px] text-text-primary font-medium cursor-pointer
            transition-all duration-200 ease-out
            shadow-[0_1px_2px_rgba(0,0,0,0.05)]
            ${open
              ? 'border-accent-gold shadow-[0_0_0_3px_rgba(245,158,11,0.1)]'
              : error
                ? 'border-accent-red'
                : 'border-border-medium hover:border-border-strong hover:bg-bg-elevated'
            }
          `}
        >
          <span className="flex-1 text-left truncate">{selectedLabel}</span>
          <ChevronDown
            className={`w-4 h-4 text-text-tertiary transition-transform duration-200 flex-shrink-0 ${open ? 'rotate-180' : ''}`}
          />
        </button>

        {open && (
          <div
            className="absolute top-full left-0 mt-1.5 z-50 w-full bg-white border border-[#E8E4DE] rounded-[10px] py-1 overflow-hidden"
            style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
          >
            {options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={`
                  block w-full text-left px-4 py-2.5 text-[14px] transition-colors duration-150
                  ${opt.value === value
                    ? 'text-[#F59E0B] font-semibold bg-[#FFFBEB]'
                    : 'text-[#374151] hover:bg-[#F9FAFB]'
                  }
                `}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>
      {error && (
        <p className="mt-2 text-body-sm text-accent-red">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-2 text-body-sm text-text-tertiary">{helperText}</p>
      )}
    </div>
  );
}
