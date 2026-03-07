import { ReactNode } from 'react';
import { Button } from './Button';

interface GhostCard {
  lines: number[];
  badge?: boolean;
}

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  ghostCards?: GhostCard[];
  className?: string;
}

export function EmptyState({ icon, title, description, action, ghostCards, className = '' }: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center text-center py-16 px-6 ${className}`}>
      {/* Illustrated icon in tinted circle */}
      <div className="w-[72px] h-[72px] rounded-full bg-[#FEF3C7] flex items-center justify-center text-[#F59E0B] mb-6">
        {icon}
      </div>

      <h3 className="text-[20px] font-semibold text-[#1A1A1A] mb-2">{title}</h3>
      <p className="text-[15px] text-[#4B5563] max-w-[360px] leading-[1.7] mb-6 text-center">{description}</p>

      {action && (
        <Button onClick={action.onClick} className="mb-8">
          {action.label}
        </Button>
      )}

      {/* Ghost preview cards */}
      {ghostCards && ghostCards.length > 0 && (
        <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pointer-events-none select-none">
          {ghostCards.map((card, i) => (
            <div
              key={i}
              className="bg-white rounded-[14px] p-5 shadow-[0_1px_4px_rgba(0,0,0,0.06),0_4px_16px_rgba(0,0,0,0.04)] opacity-35"
            >
              {card.lines.map((width, j) => (
                <div
                  key={j}
                  className="h-3 bg-[#E5E7EB] rounded mb-2.5 last:mb-0"
                  style={{ width: `${width}%` }}
                />
              ))}
              {card.badge && (
                <div className="h-5 w-20 bg-[#E5E7EB] rounded-full mt-3" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
