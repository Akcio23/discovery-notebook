import React, { useState } from 'react';
import marketDiagnosis from '../../data/marketDiagnosis.json';
import { SectionContainer } from '../layout/SectionContainer';
import { StrategyDetailModal } from '../modals/StrategyDetailModal';
import { AnimatedSteppedLine } from './AnimatedSteppedLine';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

export function ProblemSection({
  onStartQuiz,
  onExploreModels,
  onInspectNotebook,
  chapterNav
}) {
  const { metadata, strategies } = marketDiagnosis;
  const [selectedStrategy, setSelectedStrategy] = useState(null);

  return (
    <SectionContainer
      id="contexto"
      borderless
      title="Edição 4K e 3D até R$ 10.000 no Brasil"
      subtitle="Timelines 4K e cenas no Blender exigem 32 GB de RAM. Como o varejo nacional foca em 16 GB, mapeamos os 10 melhores notebooks divididos em 2 caminhos."
      chapterNav={chapterNav}
    >
      {/* 3 Pilares de Escopo Resumidos (Sem bordas, fundo único #090909) */}
      <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div>
          <span className="block font-mono text-[10px] uppercase tracking-widest text-[#757575]">
            Foco Principal
          </span>
          <span className="mt-1 block text-base font-medium text-white">
            Edição 4K Sem Engasgos
          </span>
          <span className="mt-0.5 block text-xs text-[#858585]">
            Premiere Pro, DaVinci Resolve & Final Cut
          </span>
        </div>

        <div>
          <span className="block font-mono text-[10px] uppercase tracking-widest text-[#757575]">
            Foco Secundário
          </span>
          <span className="mt-1 block text-base font-medium text-white">
            Modelagem & Render 3D
          </span>
          <span className="mt-0.5 block text-xs text-[#858585]">
            Blender, Maya & SketchUp (GPU RTX)
          </span>
        </div>

        <div>
          <span className="block font-mono text-[10px] uppercase tracking-widest text-[#757575]">
            Teto Orçamentário
          </span>
          <span className="mt-1 block font-mono text-base font-medium text-[#00d294]">
            Até R$ 10.000,00
          </span>
          <span className="mt-0.5 block text-xs text-[#858585]">
            Lojas oficiais com garantia nacional
          </span>
        </div>
      </div>

      {/* As 2 Estratégias Resumidas com Linha Arquitetônica Animada em Degrau */}
      <div className="relative mt-2 pt-6 pb-6">
        <AnimatedSteppedLine />

        <div className="relative z-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
          {strategies.map((strategy) => {
            const isUpgrade = strategy.id === 'upgrade-strategy';
            const shortSummary = isUpgrade
              ? 'Comprar notebook de 16 GB com RTX 4060 Plena (140W) e adicionar +16 GB DDR5 (~R$ 375) mantendo a garantia oficial.'
              : 'Modelos que já saem de fábrica com 32 GB instalados, prontos para uso imediato sem abrir o equipamento.';

            return (
              <div
                key={strategy.id}
                onClick={() => setSelectedStrategy(strategy)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedStrategy(strategy);
                  }
                }}
                className="group flex cursor-pointer flex-col justify-between rounded-md bg-transparent py-2 transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <div>
                  <div className="mb-2 flex items-center gap-3">
                    <span
                      className={`font-mono text-[11px] font-medium uppercase tracking-wider ${
                        isUpgrade ? 'text-[#f99c00]' : 'text-[#00d294]'
                      }`}
                    >
                      {strategy.tag}
                    </span>
                    <span className="font-mono text-xs text-[#757575]">
                      · {strategy.modelsCount} modelos
                    </span>
                  </div>

                  <h3 className="text-xl font-medium tracking-tight text-white sm:text-2xl">
                    {strategy.title}
                  </h3>
                  <p className="mt-1.5 max-w-xl text-xs leading-relaxed text-[#9e9e9e] sm:text-sm">
                    {shortSummary}
                  </p>
                </div>

                <div className="mt-5 flex items-center gap-6">
                  <div>
                    <span className="block font-mono text-[10px] uppercase tracking-wider text-[#757575]">
                      Investimento
                    </span>
                    <span className="font-mono text-sm font-medium text-white">
                      {strategy.priceRange}
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1 font-mono text-xs text-[#3080ff] transition-colors group-hover:text-white">
                    <span>Ver detalhes</span>
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal de Detalhamento da Estratégia */}
      <StrategyDetailModal
        strategy={selectedStrategy}
        open={Boolean(selectedStrategy)}
        onOpenChange={(isOpen) => {
          if (!isOpen) setSelectedStrategy(null);
        }}
        onInspectNotebook={onInspectNotebook}
      />
    </SectionContainer>
  );
}
