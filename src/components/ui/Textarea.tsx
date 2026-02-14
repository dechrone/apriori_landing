import { TextareaHTMLAttributes, forwardRef } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className = '', required, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-body-sm font-medium text-text-secondary mb-2">
            {label}
            {required && <span className="text-accent-red ml-1">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          className={`
            w-full bg-bg-input border border-border-subtle rounded-md
            px-4 py-3 text-body text-text-primary
            placeholder:text-text-quaternary
            transition-standard resize-y
            min-h-[100px]
            focus:outline-none focus:border-accent-gold focus:ring-3 focus:ring-accent-gold/10
            disabled:bg-bg-elevated disabled:text-text-quaternary disabled:cursor-not-allowed
            ${error ? 'border-accent-red focus:border-accent-red focus:ring-accent-red/10' : ''}
            ${className}
          `}
          {...props}
        />
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

Textarea.displayName = 'Textarea';
