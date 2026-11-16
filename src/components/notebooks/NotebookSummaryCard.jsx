import React from 'react';
import { cn } from '../../utils/cn';
import { ArrowUpRight } from 'lucide-react';

export function NotebookSummaryCard({
  notebook,
  onSelect,
  isSelected = false
}) {
  const rankFormatted = String(notebook.rank).padStart(2, '0');
  const hasUpgrade = notebook.pricing.upgradeCostEstimateBrl > 0;

  return (
    <div
      onClick={() => onSelect?.(notebook)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect?.(notebook);
        }
      }}
      className={cn(
        'group relative flex cursor-pointer flex-col justify-between rounded-md border bg-transparent p-7 text-left transition-all duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#090909]',
        isSelected
          ? 'border-[#3080ff] bg-white/[0.02]'
          : 'border-[#212121] hover:border-[#3a3a3a] hover:bg-white/[0.015]'
      )}
    >
      <div>
        {/* Topo Minimalista: Índice + Badge */}
        <div className="mb-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-xs font-medium text-[#757575]">
              #{rankFormatted}
            </span>
            <span className="text-[#292929]">·</span>
            <span className="font-mono text-xs text-[#858585]">
              {notebook.code}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {notebook.matchPercentage !== null && notebook.matchPercentage !== undefined && (
              <span className="rounded border border-[#00d294]/35 bg-transparent px-2 py-0.5 font-mono text-[11px] font-medium text-[#00d294]">
                {notebook.matchPercentage}% match
              </span>
            )}
            <span
              className={cn(
                'rounded px-2.5 py-0.5 text-[11px] font-medium border bg-transparent',
                notebook.rank === 1
                  ? 'border-[#3080ff]/45 text-[#3080ff]'
                  : 'border-[#292929] text-[#9e9e9e]'
              )}
            >
              {notebook.badge}
            </span>
          </div>
        </div>

        {/* Nome & Resumo Curto */}
        <h3 className="text-xl font-medium tracking-tight text-white">
          {notebook.name}
        </h3>
        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[#9e9e9e]">
          {notebook.selectionReason}
        </p>

        {/* 3 Tags Técnicas Essenciais em Geist Mono (Sem background sólido) */}
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="rounded-sm border border-[#212121] bg-transparent px-2.5 py-1 font-mono text-[11px] text-[#c9c9c9]">
            {notebook.specs.gpu}
          </span>
          <span className="rounded-sm border border-[#212121] bg-transparent px-2.5 py-1 font-mono text-[11px] text-[#c9c9c9]">
            {notebook.specs.ramFactoryGb} GB RAM
            {hasUpgrade ? ' (+Upgrade 32GB)' : ''}
          </span>
          <span className="rounded-sm border border-[#212121] bg-transparent px-2.5 py-1 font-mono text-[11px] text-[#858585]">
            {notebook.specs.displayResolutionClass} ·{' '}
            {notebook.specs.weightKg.toFixed(2).replace('.', ',')} kg
          </span>
        </div>
      </div>

      {/* Rodapé Limpo: Preço Base + Gatilho do Modal */}
      <div className="mt-7 flex items-end justify-between gap-4 border-t border-[#1c1c1c] pt-4">
        <div>
          <span className="block font-mono text-[10px] uppercase tracking-wider text-[#757575]">
            Faixa de Preço
          </span>
          <span className="font-mono text-sm font-medium text-white">
            R$ {notebook.pricing.minBrl.toLocaleString('pt-BR')} – R${' '}
            {notebook.pricing.maxBrl.toLocaleString('pt-BR')}
          </span>
        </div>

        <span className="inline-flex items-center gap-1.5 font-mono text-xs text-[#9e9e9e] transition-colors group-hover:text-white">
          <span>Ver detalhes</span>
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </div>
  );
}
