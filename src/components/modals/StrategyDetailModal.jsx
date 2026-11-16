import React from 'react';
import { BaseModal } from './BaseModal';
import notebooks from '../../data/notebooks.json';
import { ArrowUpRight } from 'lucide-react';

export function StrategyDetailModal({
  strategy,
  open,
  onOpenChange,
  onInspectNotebook
}) {
  if (!strategy) return null;

  const isUpgrade = strategy.id === 'upgrade-strategy';

  // Filtra os notebooks reais correspondentes a esta estratégia
  const relatedNotebooks = notebooks.filter((nb) =>
    isUpgrade
      ? nb.profileTags.includes('upgrade-friendly')
      : nb.profileTags.includes('factory-32gb')
  );

  return (
    <BaseModal
      open={open}
      onOpenChange={onOpenChange}
      eyebrow={strategy.tag}
      title={strategy.title}
      description={strategy.subtitle}
      maxWidth="max-w-3xl"
    >
      <div className="space-y-7">
        {/* Contexto completo da estratégia */}
        <div>
          <h4 className="mb-2 font-mono text-xs uppercase tracking-wider text-[#757575]">
            Visão Detalhada
          </h4>
          <p className="text-sm leading-relaxed text-[#d9d9d9]">
            {strategy.description}
          </p>
        </div>

        {/* Faixa de Investimento Clear */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-md border border-[#212121] bg-transparent p-5">
          <div>
            <span className="block font-mono text-[10px] uppercase tracking-wider text-[#757575]">
              Faixa de Investimento Praticada no Brasil
            </span>
            <span className="mt-1 block font-mono text-base font-medium text-white">
              {strategy.priceRange}
            </span>
          </div>
          <span className="rounded border border-[#292929] bg-transparent px-3 py-1 font-mono text-xs text-[#c9c9c9]">
            {strategy.modelsCount} modelos mapeados
          </span>
        </div>

        {/* Política de Garantia Oficial */}
        {strategy.warrantyPolicy && (
          <div className="rounded-md border border-[#00d294]/35 bg-transparent p-5">
            <span className="mb-1.5 block font-mono text-xs font-semibold uppercase tracking-wider text-[#00d294]">
              Política de Garantia Oficial no Brasil
            </span>
            <p className="text-xs leading-relaxed text-[#d9d9d9]">
              {strategy.warrantyPolicy}
            </p>
          </div>
        )}

        {/* Destaques Técnicos Clear */}
        <div>
          <h4 className="mb-3 font-mono text-xs uppercase tracking-wider text-[#757575]">
            Pontos-Chave da Estratégia
          </h4>
          <ul className="space-y-2.5">
            {strategy.highlights.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 rounded border border-[#212121] bg-transparent p-4 text-xs leading-relaxed text-[#d9d9d9]"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-sm bg-[#3080ff]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Lista Interativa dos Modelos desta Estratégia */}
        <div>
          <h4 className="mb-3 font-mono text-xs uppercase tracking-wider text-[#757575]">
            Modelos Incluídos nesta Estratégia ({relatedNotebooks.length})
          </h4>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {relatedNotebooks.map((nb) => (
              <button
                key={nb.id}
                type="button"
                onClick={() => {
                  onOpenChange(false);
                  onInspectNotebook?.(nb);
                }}
                className="group flex items-center justify-between rounded border border-[#212121] bg-transparent p-3.5 text-left transition-colors hover:border-white"
              >
                <div>
                  <span className="font-mono text-[11px] text-[#757575]">
                    #{String(nb.rank).padStart(2, '0')}
                  </span>
                  <span className="ml-2 text-xs font-medium text-white">
                    {nb.name}
                  </span>
                  <span className="mt-0.5 block font-mono text-[11px] text-[#858585]">
                    R$ {nb.pricing.minBrl.toLocaleString('pt-BR')} · {nb.specs.gpu}
                  </span>
                </div>
                <ArrowUpRight className="h-3.5 w-3.5 text-[#757575] transition-colors group-hover:text-white" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </BaseModal>
  );
}
