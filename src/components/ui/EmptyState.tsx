import { ReactNode } from 'react';
import { Button } from './Button';

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({ icon, title, description, action, className = '' }: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center text-center py-20 px-10 max-w-md mx-auto ${className}`}>
      <div className="w-16 h-16 flex items-center justify-center text-text-quaternary mb-5">
        {icon}
      </div>
      <h3 className="text-h4 text-text-primary mb-3">{title}</h3>
      <p className="text-body text-text-tertiary leading-relaxed mb-6">{description}</p>
      {action && (
        <Button onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}
