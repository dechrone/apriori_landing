'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: DropdownOption[];
  placeholder?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

export function Dropdown({
  value,
  onChange,
  options,
  placeholder = 'Select...',
  className = '',
  size = 'md',
  disabled = false,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  // Size classes - improved padding
  const sizeClasses = {
    sm: 'text-xs py-2 px-3',
    md: 'text-body py-3 px-4',
    lg: 'text-body-lg py-3.5 px-5',
  };

  const triggerSizeClasses = {
    sm: 'h-8 text-xs px-3',
    md: 'h-11 text-body px-4',
    lg: 'h-12 text-body-lg px-5',
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (!isOpen) return;

      switch (event.key) {
        case 'Escape':
          setIsOpen(false);
          setFocusedIndex(-1);
          break;
        case 'ArrowDown':
          event.preventDefault();
          setFocusedIndex((prev) => (prev < options.length - 1 ? prev + 1 : prev));
          break;
        case 'ArrowUp':
          event.preventDefault();
          setFocusedIndex((prev) => (prev > 0 ? prev - 1 : 0));
          break;
        case 'Enter':
          event.preventDefault();
          if (focusedIndex >= 0 && focusedIndex < options.length) {
            handleSelect(options[focusedIndex].value);
          }
          break;
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, focusedIndex, options]);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    setFocusedIndex(-1);
  };

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      if (!isOpen) {
        // Set focus to current selected item when opening
        const selectedIndex = options.findIndex((opt) => opt.value === value);
        setFocusedIndex(selectedIndex >= 0 ? selectedIndex : 0);
      }
    }
  };

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      {/* Trigger button */}
      <button
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`
          w-full flex items-center justify-between gap-3
          bg-bg-secondary border border-border-medium rounded-[10px]
          transition-all duration-200 ease-out
          ${triggerSizeClasses[size]}
          ${
            disabled
              ? 'bg-bg-subtle text-text-quaternary cursor-not-allowed opacity-50'
              : 'hover:border-border-strong hover:bg-bg-elevated cursor-pointer'
          }
          ${
            isOpen
              ? 'border-accent-gold bg-bg-elevated shadow-[0_0_0_3px_rgba(245,158,11,0.1)]'
              : 'shadow-[0_1px_2px_rgba(0,0,0,0.05)]'
          }
          focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold focus-visible:ring-offset-2
        `}
      >
        <span
          className={`flex-1 text-left truncate font-medium ${
            selectedOption ? 'text-text-primary' : 'text-text-tertiary font-normal'
          }`}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-text-tertiary transition-all duration-200 flex-shrink-0 ${
            isOpen ? 'rotate-180 text-accent-gold' : ''
          }`}
        />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          role="listbox"
          className={`
            absolute z-50 w-full mt-2
            bg-bg-secondary border border-border-medium rounded-[10px]
            shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_10px_15px_-3px_rgba(0,0,0,0.1)]
            max-h-64 overflow-y-auto
            animate-in fade-in-0 slide-in-from-top-1 duration-200
            py-1
          `}
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgb(209, 213, 219) transparent',
          }}
        >
          {options.map((option, index) => {
            const isSelected = option.value === value;
            const isFocused = index === focusedIndex;
            
            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(option.value)}
                onMouseEnter={() => setFocusedIndex(index)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3
                  transition-all duration-150 ease-out
                  text-left relative group
                  ${
                    isSelected
                      ? 'bg-accent-gold/10 text-accent-gold font-semibold'
                      : isFocused
                      ? 'bg-bg-hover text-text-primary'
                      : 'text-text-secondary hover:bg-bg-hover hover:text-text-primary'
                  }
                `}
              >
                {/* Left accent bar for selected item */}
                {isSelected && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent-gold rounded-r-full" />
                )}
                
                <span className="flex-1 truncate pl-1">{option.label}</span>
                
                {/* Check icon for selected item */}
                {isSelected && (
                  <Check className="w-4 h-4 flex-shrink-0 text-accent-gold" strokeWidth={2.5} />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
