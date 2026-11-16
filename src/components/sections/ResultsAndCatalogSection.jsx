import React from 'react';
import { SectionContainer } from '../layout/SectionContainer';
import { UpgradeBadge } from '../notebooks/UpgradeBadge';
import { cn } from '../../utils/cn';
import { ArrowUpRight, SlidersHorizontal } from 'lucide-react';

export function ResultsAndCatalogSection({
  recommendation,
  onInspectNotebook,
  onGoToQuiz,
  chapterNav
}) {
  const { winner, runnerUp, thirdPlace, answeredCount, totalQuestions } =
    recommendation;

  const winnerRankFormatted = String(winner.rank).padStart(2, '0');
  const winnerHasUpgrade = winner.pricing.upgradeCostEstimateBrl > 0;
  const similarOptions = [
    { label: '2ª Opção Semelhante', model: runnerUp },
    { label: '3ª Opção Semelhante', model: thirdPlace }
  ].filter((item) => Boolean(item.model));

  return (
    <SectionContainer
      id="recomendacao"
      title="Modelo Vencedor"
      subtitle="Destaque principal acompanhado de duas alternativas próximas. Clique em qualquer modelo para abrir a ficha técnica completa em modal."
      chapterNav={chapterNav}
      headerRight={
        <button
          type="button"
          onClick={onGoToQuiz}
          className="inline-flex items-center gap-2 rounded border border-[#292929] bg-transparent px-4 py-2 text-xs font-medium text-white transition-colors hover:border-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />
          <span>
            {answeredCount === 0
              ? 'Personalizar no Quiz (0/6)'
              : `Ajustar Respostas (${answeredCount}/${totalQuestions})`}
          </span>
        </button>
      }
    >
      <div className="space-y-5">
        {/* BLOCO PRINCIPAL: O MODELO VENCEDOR */}
        <div className="rounded-md border border-[#3080ff]/50 bg-transparent p-6 sm:p-7">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-2xl space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded border border-[#3080ff]/50 bg-[#3080ff]/10 px-2.5 py-0.5 font-mono text-xs font-medium text-[#3080ff]">
                  Modelo Vencedor · #{winnerRankFormatted}
                </span>
                {winner.matchPercentage !== null && (
                  <span className="rounded border border-[#00d294]/45 bg-transparent px-2.5 py-0.5 font-mono text-xs font-medium text-[#00d294]">
                    {winner.matchPercentage}% Compatível
                  </span>
                )}
                <span className="rounded border border-[#292929] bg-transparent px-2.5 py-0.5 text-xs text-[#c9c9c9]">
                  {winner.badge}
                </span>
              </div>

              <h3 className="text-2xl font-medium tracking-tight text-white sm:text-3xl">
                {winner.name}{' '}
                <span className="font-mono text-base font-normal text-[#757575]">
                  ({winner.code})
                </span>
              </h3>

              <p className="text-xs leading-relaxed text-[#9e9e9e] sm:text-sm line-clamp-2">
                {winner.selectionReason}
              </p>

              {/* Resumo de Hardware em 1 linha */}
              <div className="flex flex-wrap items-center gap-2 pt-0.5">
                <span className="rounded-sm border border-[#212121] bg-transparent px-2.5 py-1 font-mono text-[11px] text-[#d9d9d9]">
                  {winner.specs.cpu}
                </span>
                <span className="rounded-sm border border-[#212121] bg-transparent px-2.5 py-1 font-mono text-[11px] text-[#d9d9d9]">
                  {winner.specs.gpu}
                </span>
                <span className="rounded-sm border border-[#212121] bg-transparent px-2.5 py-1 font-mono text-[11px] text-[#d9d9d9]">
                  {winner.specs.displayResolutionClass} ·{' '}
                  {winner.specs.weightKg.toFixed(2).replace('.', ',')} kg
                </span>
                <UpgradeBadge notebook={winner} size="sm" />
              </div>
            </div>

            {/* Quadro de Preço + Abertura do Modal do Vencedor */}
            <div className="flex shrink-0 flex-col justify-between rounded-md border border-[#212121] bg-transparent p-5 lg:min-w-[300px]">
              <div>
                <span className="block font-mono text-[10px] uppercase tracking-wider text-[#757575]">
                  Preço de Fábrica ({winner.specs.ramFactoryGb} GB)
                </span>
                <span className="mt-0.5 block font-mono text-lg font-semibold text-white">
                  R$ {winner.pricing.minBrl.toLocaleString('pt-BR')} – R${' '}
                  {winner.pricing.maxBrl.toLocaleString('pt-BR')}
                </span>

                <span className="mt-2 block font-mono text-[10px] uppercase tracking-wider text-[#858585]">
                  {winnerHasUpgrade
                    ? 'Estimado com 32 GB (+R$ 800)'
                    : 'Orçamento Total com 32 GB'}
                </span>
                <span
                  className={cn(
                    'mt-0.5 block font-mono text-xs font-medium',
                    winnerHasUpgrade ? 'text-[#f99c00]' : 'text-[#00d294]'
                  )}
                >
                  R$ {winner.pricing.minWith32GbBrl.toLocaleString('pt-BR')} – R${' '}
                  {winner.pricing.maxWith32GbBrl.toLocaleString('pt-BR')}
                </span>
              </div>

              <button
                type="button"
                onClick={() => onInspectNotebook(winner)}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded bg-white px-4 py-2.5 text-xs font-semibold text-[#090909] transition-colors hover:bg-[#d9d9d9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span>Ver Ficha Técnica Completa</span>
                <ArrowUpRight className="h-3.5 w-3.5 stroke-[2]" />
              </button>
            </div>
          </div>
        </div>

        {/* BLOCO INFERIOR: DUAS OPÇÕES SEMELHANTES (ULTRA-MINIMALISTAS) */}
        <div>
          <span className="mb-2.5 block font-mono text-[11px] uppercase tracking-widest text-[#757575]">
            Duas Opções Semelhantes
          </span>

          <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
            {similarOptions.map(({ label, model }) => (
              <button
                key={model.id}
                type="button"
                onClick={() => onInspectNotebook(model)}
                className="group flex items-center justify-between gap-4 rounded-md border border-[#212121] bg-transparent px-5 py-3.5 text-left transition-all hover:border-[#3a3a3a] hover:bg-white/[0.015] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#858585]">
                      {label}
                    </span>
                    {model.matchPercentage !== null &&
                      model.matchPercentage !== undefined && (
                        <span className="font-mono text-[10px] text-[#00d294]">
                          · {model.matchPercentage}% match
                        </span>
                      )}
                  </div>
                  <h4 className="mt-0.5 truncate text-sm font-medium text-white group-hover:text-white">
                    {model.name}
                  </h4>
                </div>

                <div className="flex shrink-0 items-center gap-3">
                  <span className="font-mono text-xs font-medium text-[#00d294]">
                    R$ {model.pricing.minBrl.toLocaleString('pt-BR')} – R${' '}
                    {model.pricing.maxBrl.toLocaleString('pt-BR')}
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-[#757575] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
