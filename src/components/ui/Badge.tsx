import { type ReactNode } from 'react';

type BadgeVariant = 'default' | 'cyan' | 'purple' | 'green' | 'amber' | 'red';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  icon?: ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-white/10 text-white/70 border-white/15',
  cyan: 'bg-cyan-400/15 text-cyan-300 border-cyan-400/30',
  purple: 'bg-purple-400/15 text-purple-300 border-purple-400/30',
  green: 'bg-green-400/15 text-green-300 border-green-400/30',
  amber: 'bg-amber-400/15 text-amber-300 border-amber-400/30',
  red: 'bg-red-400/15 text-red-300 border-red-400/30',
};

export function Badge({ children, variant = 'default', icon, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${variantStyles[variant]} ${className}`}
    >
      {icon}
      {children}
    </span>
  );
}
