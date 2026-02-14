interface SpinnerProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export function Spinner({ size = 'medium', className = '' }: SpinnerProps) {
  const sizes = {
    small: 'w-5 h-5',
    medium: 'w-10 h-10',
    large: 'w-15 h-15'
  };

  return (
    <div className={`${sizes[size]} ${className}`}>
      <div className="w-full h-full border-3 border-border-subtle border-t-accent-gold rounded-full animate-spin" />
    </div>
  );
}

interface LoadingStateProps {
  message?: string;
  className?: string;
}

export function LoadingState({ message = 'Loading...', className = '' }: LoadingStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center gap-4 py-12 ${className}`}>
      <Spinner size="large" />
      <p className="text-body text-text-secondary">{message}</p>
    </div>
  );
}
