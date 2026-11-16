import React from 'react';
import { cn } from '../../utils/cn';

export function SectionProgress({ sections, activeSection, onNavigate }) {
  return (
    <aside
      aria-label="Indicador lateral de progresso da apresentação"
      className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 xl:flex flex-col gap-2.5"
    >
      {sections.map((section) => {
        const isActive = activeSection === section.id;
        return (
          <button
            key={section.id}
            type="button"
            onClick={() => onNavigate(section.id)}
            title={`${section.index}. ${section.label}`}
            className="group flex items-center justify-end gap-2 py-1 focus-visible:outline-none"
          >
            <span
              className={cn(
                'font-mono text-[10px] uppercase tracking-wider transition-all duration-200',
                isActive
                  ? 'opacity-100 text-white'
                  : 'opacity-0 -translate-x-1 text-[#858585] group-hover:opacity-100 group-hover:translate-x-0'
              )}
            >
              {section.index}
            </span>
            <span
              className={cn(
                'block rounded-full transition-all duration-300',
                isActive
                  ? 'h-6 w-1.5 bg-white'
                  : 'h-2 w-1.5 bg-[#292929] group-hover:bg-[#757575]'
              )}
            />
          </button>
        );
      })}
    </aside>
  );
}
