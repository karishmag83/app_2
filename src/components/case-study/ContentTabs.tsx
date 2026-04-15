import { useState } from 'react';
import type { ReactNode } from 'react';

interface Tab {
  id: string;
  label: string;
  content: ReactNode;
}

interface ContentTabsProps {
  tabs: Tab[];
}

export const ContentTabs = ({ tabs }: ContentTabsProps) => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id);

  return (
    <div className="space-y-6">
      {/* Tab list */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-muted/50 rounded-xl">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`tab-trigger flex-1 min-w-[100px] ${activeTab === tab.id ? '[data-state="active"]' : ''}`}
            data-state={activeTab === tab.id ? 'active' : 'inactive'}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="animate-fade-in" key={activeTab}>
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  );
};
