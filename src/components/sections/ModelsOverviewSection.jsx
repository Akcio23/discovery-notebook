import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import notebooks from '../../data/notebooks.json';
import { SectionContainer } from '../layout/SectionContainer';
import { cn } from '../../utils/cn';
import { ArrowUpRight } from 'lucide-react';

const QUICK_FILTERS = [
  { id: 'all', label: 'Todos (10)' },
  { id: 'top3', label: 'Top 3' },
  { id: 'factory-32gb', label: '32 GB Fábrica (3)' },
  { id: 'upgrade-friendly', label: 'Upgrade (6)' },
  { id: 'value-champion', label: 'Custo-Benefício (2)' }
];

const itemVariants = {
  hidden: { opacity: 0, y: 10, filter: 'blur(4px)' },
  visible: (idx) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.28,
      delay: idx * 0.025,
      ease: [0.22, 1, 0.36, 1]
    }
  }),
  exit: {
    opacity: 0,
    y: -6,
    filter: 'blur(4px)',
    transition: { duration: 0.16 }
  }
};

export function ModelsOverviewSection({ onInspectNotebook, chapterNav }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredNotebooks = notebooks.filter((nb) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'top3') return [1, 3, 4].includes(nb.rank);
    return nb.profileTags.includes(activeFilter);
  });

  const splitIndex = Math.ceil(filteredNotebooks.length / 2);
  const leftColumnModels = filteredNotebooks.slice(0, splitIndex);
  const rightColumnModels = filteredNotebooks.slice(splitIndex);

  const renderNotebookRow = (notebook, idx) => {
    const rankFormatted = String(notebook.rank).padStart(2, '0');
    const isPodium = notebook.rank <= 3;

    return (
      <motion.button
        layout
        custom={idx}
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        key={notebook.id}
        type="button"
        onClick={() => onInspectNotebook?.(notebook)}
        className={cn(
          'group relative flex w-full items-center justify-between gap-4 border-b border-[#181818] bg-transparent px-3 py-4 text-left transition-colors duration-200',
          'hover:bg-gradient-to-r hover:from-[#3080ff]/[0.06] hover:via-white/[0.015] hover:to-transparent',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white'
        )}
      >
        {/* Barra lateral luminosa que acende no hover */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-1/2 h-5 w-[2px] -translate-y-1/2 scale-y-50 rounded-full bg-[#3080ff] opacity-0 shadow-[0_0_10px_#3080ff] transition-all duration-200 group-hover:scale-y-100 group-hover:opacity-100"
        />

        {/* Feixe luminoso inferior no hover */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[-1px] left-0 right-0 h-[1px] bg-gradient-to-r from-[#3080ff] via-white/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />

        {/* Esquerda: Índice + Nome do Notebook */}
        <div className="flex min-w-0 items-baseline gap-3.5">
          <span
            className={cn(
              'shrink-0 font-mono text-xs transition-colors duration-200',
              isPodium
                ? 'text-[#3080ff] group-hover:text-white'
                : 'text-[#757575] group-hover:text-[#3080ff]'
            )}
          >
            #{rankFormatted}
          </span>

          <h3 className="truncate text-[15px] font-medium tracking-tight text-[#ededed] transition-all duration-200 group-hover:translate-x-1 group-hover:text-white sm:text-base">
            {notebook.name}
          </h3>
        </div>

        {/* Linha guia pontilhada discreta conectando o modelo ao preço */}
        <span
          aria-hidden="true"
          className="hidden flex-1 border-b border-dashed border-[#181818] transition-colors duration-200 group-hover:border-[#2a2a2a] sm:block"
        />

        {/* Direita: Preço + Seta de Abertura do Modal */}
        <div className="flex shrink-0 items-center gap-3.5">
          <span className="font-mono text-xs font-medium text-[#00d294] transition-all duration-200 group-hover:brightness-110 sm:text-[13px]">
            R$ {notebook.pricing.minBrl.toLocaleString('pt-BR')} – R${' '}
            {notebook.pricing.maxBrl.toLocaleString('pt-BR')}
          </span>

          <ArrowUpRight className="h-3.5 w-3.5 text-[#757575] transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#3080ff]" />
        </div>
      </motion.button>
    );
  };

  return (
    <SectionContainer
      id="modelos"
      title="Os 10 Notebooks da Pesquisa"
      subtitle="Clique em qualquer modelo abaixo para abrir os detalhes da ficha técnica completa e análise 4K/3D."
      chapterNav={chapterNav}
      headerRight={
        <div
          role="tablist"
          aria-label="Filtros rápidos de modelos"
          className="inline-flex flex-wrap items-center gap-1 rounded-md border border-[#1c1c1c] bg-[#0e0e0e]/90 p-1 backdrop-blur-md"
        >
          {QUICK_FILTERS.map((f) => {
            const isActive = activeFilter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveFilter(f.id)}
                className={cn(
                  'relative rounded px-3 py-1.5 text-[11px] font-medium transition-colors duration-200',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white',
                  isActive
                    ? 'text-[#090909]'
                    : 'text-[#8e8e8e] hover:text-white'
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="modelsActiveFilterPill"
                    transition={{
                      type: 'spring',
                      stiffness: 420,
                      damping: 32
                    }}
                    className="absolute inset-0 rounded bg-white shadow-[0_0_16px_rgba(255,255,255,0.22)]"
                  />
                )}
                <span className="relative z-10">{f.label}</span>
              </button>
            );
          })}
        </div>
      }
    >
      {/* Índice Arquitetônico em 2 Colunas (Zero Caixas Pesadas · Padrão Editorial das Demais Páginas) */}
      <div className="relative">
        {/* Linha vertical central sutil visível apenas no desktop quando há 2 colunas */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-1/2 top-0 hidden w-[1px] -translate-x-1/2 bg-gradient-to-b from-[#1f1f1f] via-[#181818] to-transparent lg:block"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-12">
          {/* Coluna Esquerda: 1 a 5 */}
          <div className="flex flex-col">
            <AnimatePresence mode="popLayout">
              {leftColumnModels.map((notebook, idx) =>
                renderNotebookRow(notebook, idx)
              )}
            </AnimatePresence>
          </div>

          {/* Coluna Direita: 6 a 10 */}
          <div className="flex flex-col">
            <AnimatePresence mode="popLayout">
              {rightColumnModels.map((notebook, idx) =>
                renderNotebookRow(notebook, idx + leftColumnModels.length)
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
