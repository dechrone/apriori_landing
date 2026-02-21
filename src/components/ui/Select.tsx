import { SelectHTMLAttributes, forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, helperText, options, className = '', required, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-body-sm font-medium text-text-secondary mb-2">
            {label}
            {required && <span className="text-accent-red ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            className={`
              w-full h-11 bg-bg-secondary border border-border-medium rounded-[10px]
              px-4 pr-10 text-body text-text-primary font-medium
              appearance-none cursor-pointer
              transition-all duration-200 ease-out
              shadow-[0_1px_2px_rgba(0,0,0,0.05)]
              focus:outline-none focus:border-accent-gold focus:shadow-[0_0_0_3px_rgba(245,158,11,0.1)]
              hover:border-border-strong hover:bg-bg-elevated
              disabled:bg-bg-subtle disabled:text-text-quaternary disabled:cursor-not-allowed disabled:opacity-50
              ${error ? 'border-accent-red focus:border-accent-red focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]' : ''}
              ${className}
            `}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown 
            className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary pointer-events-none transition-colors" 
          />
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
);

Select.displayName = 'Select';
