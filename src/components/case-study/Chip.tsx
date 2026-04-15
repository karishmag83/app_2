import type { ReactNode } from 'react';

interface ChipProps {
  children: ReactNode;
  variant?: 'primary' | 'accent' | 'muted';
  icon?: ReactNode;
}

export const Chip = ({ children, variant = 'muted', icon }: ChipProps) => {
  const variantClasses = {
    primary: 'chip-primary',
    accent: 'chip-accent',
    muted: 'chip-muted',
  };

  return (
    <span className={variantClasses[variant]}>
      {icon}
      {children}
    </span>
  );
};
