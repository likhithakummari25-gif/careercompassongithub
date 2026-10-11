import { type ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  onClick?: () => void;
}

export function Card({ children, className = '', hover = false, glow = false, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`glass rounded-2xl ${glow ? 'gradient-border' : ''} ${hover ? 'transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:-translate-y-1 cursor-pointer' : ''} ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
