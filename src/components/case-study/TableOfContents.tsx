import { useEffect, useState } from 'react';
import { RESTORATION_SECTIONS } from '@/data/caseStudies';

interface TOCItem {
  id: string;
  label: string;
  level?: number;
}

const tocItems: TOCItem[] = RESTORATION_SECTIONS;

export const TableOfContents = () => {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0% -70% 0%', threshold: 0 }
    );

    tocItems.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Below lg the case-study dock (CaseStudyAssistant) shows the current section
  return (
    <nav
      className="hidden lg:block fixed z-30 top-24 left-0 w-64 h-[calc(100vh-6rem)] overflow-y-auto bg-background/95 backdrop-blur-sm border-r border-border"
      aria-label="Table of contents"
    >
      <div className="p-6">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
          Contents
        </h2>
        <ul className="space-y-1">
          {tocItems.map(({ id, label }) => (
            <li key={id}>
              <button
                onClick={() => scrollToSection(id)}
                className={`toc-link w-full text-left ${activeSection === id ? 'active' : ''}`}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
