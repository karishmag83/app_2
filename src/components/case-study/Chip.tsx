import type { ReactNode } from 'react';

interface ChipProps {
  children: ReactNode;
  /** onDark: for chips placed over photos or dark heroes */
  variant?: 'primary' | 'accent' | 'muted' | 'onDark';
  icon?: ReactNode;
}

export const Chip = ({ children, variant = 'muted', icon }: ChipProps) => {
  const variantClasses = {
    primary: 'chip-primary',
    accent: 'chip-accent',
    muted: 'chip-muted',
    onDark: 'chip bg-white/15 text-white ring-1 ring-inset ring-white/25 backdrop-blur-sm',
  };

  return (
    <span className={variantClasses[variant]}>
      {icon}
      {children}
    </span>
  );
};
