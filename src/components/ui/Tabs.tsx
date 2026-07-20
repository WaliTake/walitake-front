'use client';

import type { ReactNode } from 'react';

interface Tab {
  id: string;
  label: string;
  icon?: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (id: string) => void;
  children?: ReactNode;
}

export function Tabs({ tabs, activeTab, onChange }: TabsProps) {
  return (
    <div
      className="flex gap-1 p-1 bg-[#F1F8E9] rounded-xl"
      role="tablist"
      aria-label="Navegación de pestañas"
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          role="tab"
          id={`tab-${tab.id}`}
          aria-selected={activeTab === tab.id}
          aria-controls={`panel-${tab.id}`}
          onClick={() => onChange(tab.id)}
          className={[
            'flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 flex-1 justify-center',
            activeTab === tab.id
              ? 'bg-white text-[#2E7D32] shadow-sm'
              : 'text-[#616161] hover:text-[#212121] hover:bg-white/60',
          ].join(' ')}
        >
          {tab.icon}
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
}
