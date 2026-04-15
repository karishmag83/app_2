interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
}

export const SectionHeader = ({ label, title, description }: SectionHeaderProps) => {
  return (
    <div className="space-y-3 mb-8">
      {label && (
        <span className="text-xs font-semibold uppercase tracking-widest text-accent">
          {label}
        </span>
      )}
      <h2 className="text-2xl md:text-3xl font-bold text-foreground text-balance">
        {title}
      </h2>
      {description && (
        <p className="text-lg text-muted-foreground max-w-3xl">
          {description}
        </p>
      )}
    </div>
  );
};
