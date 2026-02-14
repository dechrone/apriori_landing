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
              w-full bg-bg-input border border-border-subtle rounded-md
              px-4 py-3 pr-10 text-body text-text-primary
              appearance-none cursor-pointer
              transition-standard
              focus:outline-none focus:border-accent-gold focus:ring-3 focus:ring-accent-gold/10
              disabled:bg-bg-elevated disabled:text-text-quaternary disabled:cursor-not-allowed
              ${error ? 'border-accent-red focus:border-accent-red focus:ring-accent-red/10' : ''}
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
            className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary pointer-events-none" 
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
