import { type ReactNode } from 'react';
import { type LucideIcon } from 'lucide-react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: Variant;
  size?: Size;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  type?: 'button' | 'submit';
}

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-gradient-to-r from-cyan-400 to-purple-500 text-navy-950 font-semibold hover:shadow-[0_0_24px_rgba(34,211,238,0.4)] hover:scale-[1.02] active:scale-100',
  secondary:
    'bg-white/10 text-white border border-white/20 hover:bg-white/15 backdrop-blur-md',
  ghost: 'text-white/70 hover:text-white hover:bg-white/5',
  outline:
    'border border-cyan-400/40 text-cyan-300 hover:bg-cyan-400/10 hover:border-cyan-400',
};

const sizeStyles: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm rounded-lg gap-1.5',
  md: 'px-6 py-3 text-sm rounded-xl gap-2',
  lg: 'px-8 py-4 text-base rounded-xl gap-2.5',
};

export function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  disabled,
  fullWidth,
  className = '',
  type = 'button',
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center font-medium transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 ${variantStyles[variant]} ${sizeStyles[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4" />}
      {children}
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4" />}
    </button>
  );
}
