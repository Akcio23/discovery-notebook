import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { Check } from 'lucide-react';

export function TopNav({
  sections,
  activeSection,
  activeIndex = 0,
  totalSections = 4,
  progressPercentage = 25,
  onNavigate,
  onOpenCatalog,
  onOpenRecommendation,
  isQuizCompleted = false
}) {
  const isChapterOne = activeSection === 'contexto';

  return (
    <header className="shrink-0 z-40 bg-[#090909]/95 backdrop-blur-md">
      <div className="mx-auto flex h-30 max-w-7xl items-center justify-between px-8">
        {/* Identidade Editorial */}
        <button
          type="button"
          onClick={() => onNavigate('contexto')}
          className="group flex items-center gap-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#090909] rounded px-1 py-1"
        >
          <div className="flex flex-col">
            <span className="text-sm font-medium tracking-tight text-white">
              Discovery Notebook
            </span>
          </div>
        </button>

        {/* Navegação de Etapas da Apresentação */}
        <nav
          aria-label="Capítulos da apresentação"
          className="hidden xl:flex items-center gap-5"
        >
          {sections.map((section, idx) => {
            const isActive = activeSection === section.id;
            const isCompleted = idx < activeIndex;
            return (
              <button
                key={section.id}
                type="button"
                onClick={() => onNavigate(section.id)}
                className={cn(
                  'group relative flex items-center gap-2 rounded px-3 py-1.5 text-xs font-medium transition-all',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#090909]',
                  isChapterOne
                    ? isActive
                      ? 'bg-white/[0.06] text-white'
                      : 'bg-transparent text-[#757575] hover:text-white'
                    : isActive
                    ? 'border border-white/70 bg-white/[0.04] text-white'
                    : isCompleted
                    ? 'border border-[#212121] bg-transparent text-[#c9c9c9] hover:border-[#3a3a3a] hover:text-white'
                    : 'border border-transparent bg-transparent text-[#757575] hover:border-[#212121] hover:text-[#c9c9c9]'
                )}
              >
                <span
                  className={cn(
                    'inline-flex items-center justify-center font-mono text-[11px]',
                    isActive
                      ? 'text-[#3080ff] font-semibold'
                      : isCompleted
                      ? 'text-[#00d294]'
                      : 'text-[#757575] group-hover:text-[#9e9e9e]'
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-3 w-3 stroke-[2.2]" />
                  ) : (
                    section.index
                  )}
                </span>
                <span>{section.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Atalhos Rápidos */}
        <div className="flex items-center gap-2">
          {isQuizCompleted && (
            <button
              type="button"
              onClick={onOpenRecommendation}
              className={cn(
                'flex items-center gap-2 rounded px-3 py-1.5 text-xs font-medium transition-all',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#090909]',
                isChapterOne
                  ? 'bg-white/[0.05] text-[#c9c9c9] hover:bg-white/[0.1] hover:text-white'
                  : activeSection === 'recomendacao'
                  ? 'border border-[#3080ff] bg-[#3080ff]/10 text-white'
                  : 'border border-[#212121] bg-transparent text-[#c9c9c9] hover:border-[#3a3a3a] hover:text-white'
              )}
            >
              <span>Vencedor</span>
            </button>
          )}

          <button
            type="button"
            onClick={onOpenCatalog}
            className={cn(
              'flex items-center gap-2 rounded px-3.5 py-1.5 text-xs font-medium transition-all',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#090909]',
              'bg-white text-[#090909] hover:bg-[#d9d9d9]'
            )}
          >
            <span>Modelos (10)</span>
          </button>
        </div>
      </div>

      {/* Barra de Progresso Superior da Apresentação (Oculta linha divisória no Cap 1) */}
      <div
        role="progressbar"
        aria-valuenow={Math.round(progressPercentage)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Progresso da apresentação: Capítulo ${activeIndex + 1} de ${totalSections}`}
        className={cn(
          'relative h-[2px] w-full overflow-hidden',
          isChapterOne ? 'bg-[#090909]' : 'bg-[#161616]'
        )}
      >
        <motion.div
          className="relative h-full bg-gradient-to-r from-[#3080ff]/80 via-[#3080ff] to-[#8ec5ff] shadow-[0_0_12px_rgba(48,128,255,0.85)]"
          initial={false}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="absolute right-0 top-0 h-full w-6 bg-gradient-to-r from-transparent to-white opacity-90" />
        </motion.div>
      </div>
    </header>
  );
}
