import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

interface TOCItem {
  id: string;
  label: string;
  level?: number;
}

const tocItems: TOCItem[] = [
  { id: 'hero', label: 'Overview' },
  { id: 'snapshot', label: 'Project Snapshot' },
  { id: 'challenge', label: 'The Challenge' },
  { id: 'goals', label: 'Goals & Metrics' },
  { id: 'research', label: 'Research' },
  { id: 'users', label: 'Users & Journey' },
  { id: 'ia', label: 'Information Architecture' },
  { id: 'wireframes', label: 'Wireframes' },
  { id: 'branding', label: 'Branding & Assets' },
  { id: 'ui-design', label: 'UI Design' },
  { id: 'frontend', label: 'Frontend Build' },
  { id: 'accessibility', label: 'Accessibility' },
  { id: 'results', label: 'Results & Impact' },
  { id: 'reflection', label: 'Reflection' },
  { id: 'tldr', label: 'TL;DR' },
];

export const TableOfContents = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isOpen, setIsOpen] = useState(false);

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
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-elevated-lg flex items-center justify-center"
        aria-label="Toggle table of contents"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* TOC panel */}
      <nav
        className={`
          fixed z-30 bg-background/95 backdrop-blur-sm border-r border-border
          transition-transform duration-300 ease-out
          lg:translate-x-0 lg:top-24 lg:left-0 lg:w-64 lg:h-[calc(100vh-6rem)] lg:overflow-y-auto
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          top-0 left-0 w-72 h-full
        `}
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

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-20 bg-foreground/20 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};
