import { Blocks, LayoutTemplate, Palette, Type } from 'lucide-react';

const components = [
  {
    name: 'KPI Card',
    description: 'Displays a single metric with label, value, and optional change indicator.',
    props: ['label', 'value', 'change', 'changePercent', 'icon'],
    variants: ['Default', 'With Icon', 'Compact'],
    usage: 'Dashboard header, screen summaries',
  },
  {
    name: 'Chart Container',
    description: 'Wrapper for all chart types with consistent header, loading, and empty states.',
    props: ['title', 'subtitle', 'children', 'isLoading', 'isEmpty'],
    variants: ['Default', 'Full Width', 'Compact'],
    usage: 'All chart visualizations throughout the app',
  },
  {
    name: 'Data Table',
    description: 'Sortable, filterable table for holdings and similar data-heavy views.',
    props: ['columns', 'data', 'sortable', 'filterable', 'searchable'],
    variants: ['Default', 'Compact', 'With Actions'],
    usage: 'Holdings page, transaction history',
  },
  {
    name: 'Filter Bar',
    description: 'Horizontal bar with search input and type dropdown for data filtering.',
    props: ['searchPlaceholder', 'filterOptions', 'onSearch', 'onFilter'],
    variants: ['Default', 'Minimal'],
    usage: 'Above data tables and lists',
  },
  {
    name: 'Asset Card',
    description: 'Card displaying a single asset with symbol, name, price, and change.',
    props: ['symbol', 'name', 'price', 'change', 'changePercent'],
    variants: ['Default', 'Compact', 'With Chart'],
    usage: 'Watchlist, top movers list',
  },
  {
    name: 'Insight Callout',
    description: 'Highlighted box for important insights or recommendations.',
    props: ['type', 'title', 'description', 'action'],
    variants: ['Info', 'Warning', 'Success'],
    usage: 'Dashboard alerts, concentration warnings',
  },
  {
    name: 'Empty State',
    description: 'Placeholder for empty lists and charts with helpful messaging.',
    props: ['icon', 'title', 'description', 'ctaLabel', 'onCta'],
    variants: ['Default', 'Minimal'],
    usage: 'Empty holdings, empty watchlist, no results',
  },
  {
    name: 'Skeleton Loader',
    description: 'Animated placeholder during data loading.',
    props: ['type', 'lines', 'width', 'height'],
    variants: ['Card', 'Table Row', 'Chart', 'Text'],
    usage: 'All loading states throughout app',
  },
];

const designTokens = {
  colors: [
    { name: 'Primary', value: 'hsl(162, 63%, 48%)', usage: 'Accent, interactive, positive values' },
    { name: 'Background', value: 'hsl(222, 47%, 6%)', usage: 'App background' },
    { name: 'Card', value: 'hsl(222, 47%, 9%)', usage: 'Card surfaces' },
    { name: 'Border', value: 'hsl(217, 33%, 18%)', usage: 'Dividers, card borders' },
    { name: 'Muted', value: 'hsl(215, 20%, 55%)', usage: 'Secondary text' },
    { name: 'Destructive', value: 'hsl(0, 72%, 51%)', usage: 'Errors, negative values' },
  ],
  typography: [
    { name: 'heading-hero', size: '4rem-5rem', weight: '700', usage: 'Page hero titles' },
    { name: 'heading-section', size: '2rem-2.5rem', weight: '700', usage: 'Section headers' },
    { name: 'heading-subsection', size: '1.25rem-1.5rem', weight: '600', usage: 'Subsection headers' },
    { name: 'body-large', size: '1.125rem-1.25rem', weight: '400', usage: 'Lead paragraphs' },
    { name: 'body-regular', size: '1rem', weight: '400', usage: 'Body text' },
    { name: 'label', size: '0.75rem', weight: '500', usage: 'Labels, tags, uppercase' },
    { name: 'mono', size: '0.875rem', weight: '400', usage: 'Numbers, code' },
  ],
  spacing: [
    { name: 'Section padding', value: '4rem-6rem', usage: 'Vertical section spacing' },
    { name: 'Card padding', value: '1.5rem', usage: 'Inside cards' },
    { name: 'Component gap', value: '1rem', usage: 'Between related elements' },
    { name: 'Grid gap', value: '1.5rem', usage: 'Card grids' },
  ],
  radii: [
    { name: 'sm', value: '0.375rem', usage: 'Small elements, tags' },
    { name: 'md', value: '0.5rem', usage: 'Buttons, inputs' },
    { name: 'lg', value: '0.75rem', usage: 'Cards, containers' },
    { name: 'xl', value: '1rem', usage: 'Large cards, modals' },
    { name: 'full', value: '9999px', usage: 'Pills, avatars' },
  ],
};

export const ComponentsSection = () => {
  return (
    <section id="components" className="section-container border-b border-border">
      <span className="label mb-4 block text-primary">Section 10</span>
      <h2 className="heading-section mb-4">Component System & Reusability</h2>
      
      <p className="body-large mb-12 max-w-2xl">
        I built a modular component library that enables rapid iteration and 
        ensures visual consistency across the application.
      </p>

      {/* Component Library */}
      <div className="mb-16">
        <h3 className="heading-subsection mb-6">Core Components</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {components.map((comp) => (
            <div key={comp.name} className="card-elevated">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Blocks className="w-5 h-5 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground">{comp.name}</h4>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">{comp.description}</p>
              
              <div className="space-y-3">
                <div>
                  <span className="label block mb-1">Props</span>
                  <div className="flex flex-wrap gap-1">
                    {comp.props.map((prop) => (
                      <code key={prop} className="text-xs bg-secondary px-2 py-0.5 rounded font-mono text-muted-foreground">
                        {prop}
                      </code>
                    ))}
                  </div>
                </div>
                
                <div>
                  <span className="label block mb-1">Variants</span>
                  <div className="flex flex-wrap gap-1">
                    {comp.variants.map((variant) => (
                      <span key={variant} className="tag">{variant}</span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <span className="label block mb-1">Usage</span>
                  <p className="text-sm text-muted-foreground">{comp.usage}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Design Tokens */}
      <div>
        <h3 className="heading-subsection mb-6">Design Tokens</h3>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Colors */}
          <div className="card-elevated">
            <div className="flex items-center gap-3 mb-4">
              <Palette className="w-5 h-5 text-primary" />
              <h4 className="font-semibold text-foreground">Color Palette</h4>
            </div>
            <div className="space-y-3">
              {designTokens.colors.map((color) => (
                <div key={color.name} className="flex items-center gap-3">
                  <div 
                    className="w-8 h-8 rounded-lg border border-border"
                    style={{ backgroundColor: color.value }}
                  />
                  <div className="flex-1">
                    <span className="text-sm font-medium text-foreground">{color.name}</span>
                    <p className="text-xs text-muted-foreground">{color.usage}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Typography */}
          <div className="card-elevated">
            <div className="flex items-center gap-3 mb-4">
              <Type className="w-5 h-5 text-primary" />
              <h4 className="font-semibold text-foreground">Typography Scale</h4>
            </div>
            <div className="space-y-3">
              {designTokens.typography.map((type) => (
                <div key={type.name} className="flex items-start gap-3">
                  <code className="text-xs bg-secondary px-2 py-0.5 rounded font-mono text-primary min-w-[120px]">
                    {type.name}
                  </code>
                  <div>
                    <span className="text-sm text-foreground">{type.size}, {type.weight}</span>
                    <p className="text-xs text-muted-foreground">{type.usage}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Spacing */}
          <div className="card-elevated">
            <div className="flex items-center gap-3 mb-4">
              <LayoutTemplate className="w-5 h-5 text-primary" />
              <h4 className="font-semibold text-foreground">Spacing System</h4>
            </div>
            <div className="space-y-3">
              {designTokens.spacing.map((space) => (
                <div key={space.name} className="flex items-center justify-between">
                  <span className="text-sm text-foreground">{space.name}</span>
                  <div className="text-right">
                    <code className="text-xs bg-secondary px-2 py-0.5 rounded font-mono text-muted-foreground">
                      {space.value}
                    </code>
                    <p className="text-xs text-muted-foreground">{space.usage}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Border Radii */}
          <div className="card-elevated">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-5 h-5 rounded-lg border-2 border-primary" />
              <h4 className="font-semibold text-foreground">Border Radii</h4>
            </div>
            <div className="space-y-3">
              {designTokens.radii.map((radius) => (
                <div key={radius.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-8 h-8 bg-primary/20 border border-primary/40"
                      style={{ borderRadius: radius.value }}
                    />
                    <span className="text-sm text-foreground">{radius.name}</span>
                  </div>
                  <div className="text-right">
                    <code className="text-xs bg-secondary px-2 py-0.5 rounded font-mono text-muted-foreground">
                      {radius.value}
                    </code>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
