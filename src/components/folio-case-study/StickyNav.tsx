import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { FOLIO_SECTIONS } from '@/data/caseStudies';

const sections = FOLIO_SECTIONS;

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
