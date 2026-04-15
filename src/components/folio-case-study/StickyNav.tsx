import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const sections = [
  { id: 'walkthrough', label: 'Product Walkthrough' },
  { id: 'hero', label: 'Overview' },
  { id: 'context', label: 'Context & Problem' },
  { id: 'goals', label: 'Goals & Metrics' },
  { id: 'users', label: 'Users & JTBD' },
  { id: 'strategy', label: 'UX Strategy' },
  { id: 'architecture', label: 'IA & Flows' },
  { id: 'data-layer', label: 'Data & Trust' },
  { id: 'visualizations', label: 'Data Viz System' },
  { id: 'screens', label: 'Key Screens' },
  { id: 'components', label: 'Component System' },
  { id: 'performance', label: 'Performance' },
  { id: 'testing', label: 'Usability Testing' },
  { id: 'accessibility', label: 'Accessibility' },
  { id: 'roadmap', label: 'Roadmap' },
  { id: 'reflection', label: 'Reflection' },
];

export const StickyNav = () => {
  const [activeSection, setActiveSection] = useState('walkthrough');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="sticky-nav hidden lg:block">
      <div className="border-l border-border">
        {sections.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            className={cn(
              'nav-link block',
              activeSection === id && 'nav-link-active'
            )}
          >
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
};
