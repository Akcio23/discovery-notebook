import React from 'react';
import { cn } from '../../utils/cn';

function getRamStrategyText(notebook) {
  const { ramFactoryGb, ramExpandable } = notebook.specs;
  if (ramFactoryGb === 32 && ramExpandable) {
    return '32 GB de Fábrica · Expansível 64 GB';
  }
  if (ramFactoryGb === 32 && !ramExpandable) {
    return '32 GB de Fábrica (LPDDR5x Soldada)';
  }
  if (ramFactoryGb === 16 && ramExpandable) {
    return '16 GB Fábrica · Upgrade 32 GB (+R$ 800)';
  }
  return '16 GB Memória Unificada (Soldada)';
}

export function NotebookDetailView({
  notebook,
  isWinner = false,
  showMatchReasons = false,
  inModal = false
}) {
  if (!notebook) return null;

  const hasUpgrade = notebook.pricing.upgradeCostEstimateBrl > 0;
  const ramStrategyText = getRamStrategyText(notebook);

  const specsRows = [
    { label: 'Processador', value: notebook.specs.cpu },
    { label: 'Placa de Vídeo (GPU & TGP)', value: notebook.specs.gpu },
    { label: 'Memória RAM', value: notebook.specs.ramDetails },
    { label: 'Armazenamento SSD', value: notebook.specs.storage },
    { label: 'Tela & Espaço de Cor', value: notebook.specs.display },
    {
      label: 'Peso Físico',
      value: `${notebook.specs.weightKg.toFixed(2).replace('.', ',')} kg`
    }
  ];

  const analysisRows = [
    {
      label: 'Edição de Vídeo (4K)',
      color: 'text-[#00d294]',
      value: notebook.analysis.videoEditing
    },
    {
      label: 'Modelagem & Render 3D',
      color: 'text-[#3080ff]',
      value: notebook.analysis.modeling3d
    },
    {
      label: 'Ponto de Atenção',
      color: 'text-[#fb2c36]',
      value: notebook.analysis.weakness
    }
  ];

  return (
    <div
      className={cn(
        inModal ? 'space-y-6' : 'border-t border-[#1c1c1c] pt-6 space-y-6'
      )}
    >
      {/* Faixa Comercial Direta (Sem Cards) */}
      <div className="grid grid-cols-1 gap-5 border-b border-[#1c1c1c] pb-5 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <span className="block font-mono text-[10px] uppercase tracking-wider text-[#757575]">
            Preço de Fábrica ({notebook.specs.ramFactoryGb} GB)
          </span>
          <span className="mt-1 block font-mono text-base font-semibold text-white">
            R$ {notebook.pricing.minBrl.toLocaleString('pt-BR')} – R${' '}
            {notebook.pricing.maxBrl.toLocaleString('pt-BR')}
          </span>
        </div>

        <div>
          <span className="block font-mono text-[10px] uppercase tracking-wider text-[#757575]">
            {hasUpgrade
              ? 'Estimado com 32 GB (+R$ 800)'
              : notebook.specs.ramFactoryGb === 32
                ? 'Orçamento com 32 GB (Fábrica)'
                : 'Orçamento Total (16 GB Unificada)'}
          </span>
          <span
            className={cn(
              'mt-1 block font-mono text-base font-medium',
              hasUpgrade ? 'text-[#f99c00]' : 'text-[#00d294]'
            )}
          >
            R$ {notebook.pricing.minWith32GbBrl.toLocaleString('pt-BR')} – R${' '}
            {notebook.pricing.maxWith32GbBrl.toLocaleString('pt-BR')}
          </span>
          {notebook.pricing.exceeds10kLimit && (
            <span className="mt-0.5 block font-mono text-[10px] text-[#fb2c36]">
              * Até R$ 10.600 fora de promoção
            </span>
          )}
        </div>

        <div>
          <span className="block font-mono text-[10px] uppercase tracking-wider text-[#757575]">
            Estratégia de Memória
          </span>
          <span
            className={cn(
              'mt-1 block font-mono text-xs font-medium',
              hasUpgrade ? 'text-[#f99c00]' : 'text-[#d9d9d9]'
            )}
          >
            {ramStrategyText}
          </span>
        </div>

        <div>
          <span className="block font-mono text-[10px] uppercase tracking-wider text-[#757575]">
            Lojas Oficiais
          </span>
          <span className="mt-1 block font-mono text-xs text-[#c9c9c9]">
            {notebook.pricing.stores.join(' / ')}
          </span>
        </div>
      </div>

      {/* Aviso de Variante Direto em Linha (Sem Card) */}
      {notebook.variantWarning && (
        <div
          role="note"
          aria-label="Aviso de variante na pesquisa"
          className="border-l-2 border-[#f99c00] pl-3.5 py-0.5"
        >
          <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#f99c00]">
            Aviso de Variante:{' '}
          </span>
          <span className="text-xs leading-relaxed text-[#d9d9d9]">
            {notebook.variantWarning}
          </span>
        </div>
      )}

      {/* Ficha Técnica Tabular em Linhas Horizontais (Sem Cards) */}
      <div>
        <h4 className="mb-2 font-mono text-[11px] uppercase tracking-widest text-[#757575]">
          Especificações Técnicas
        </h4>
        <dl className="divide-y divide-[#181818] border-y border-[#181818]">
          {specsRows.map((row) => (
            <div
              key={row.label}
              className="grid grid-cols-1 gap-1 py-2.5 sm:grid-cols-12 sm:items-baseline sm:gap-4"
            >
              <dt className="font-mono text-[11px] uppercase tracking-wider text-[#757575] sm:col-span-4">
                {row.label}
              </dt>
              <dd className="text-sm font-medium text-[#e5e5e5] sm:col-span-8">
                {row.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Análise de Desempenho por Fluxo em Linhas Diretas (Sem Cards) */}
      <div>
        <h4 className="mb-2 font-mono text-[11px] uppercase tracking-widest text-[#757575]">
          Análise de Desempenho por Fluxo
        </h4>
        <dl className="divide-y divide-[#181818] border-y border-[#181818]">
          {analysisRows.map((item) => (
            <div
              key={item.label}
              className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-12 sm:items-baseline sm:gap-4"
            >
              <dt
                className={cn(
                  'font-mono text-[11px] font-medium uppercase tracking-wider sm:col-span-4',
                  item.color
                )}
              >
                {item.label}
              </dt>
              <dd className="text-xs leading-relaxed text-[#d9d9d9] sm:col-span-8">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Motivos de Compatibilidade com o Questionário (Sem Card) */}
      {showMatchReasons &&
        notebook.matchReasons &&
        notebook.matchReasons.length > 0 && (
          <div>
            <h4 className="mb-2 font-mono text-[11px] uppercase tracking-widest text-[#00d294]">
              Compatibilidade com o Seu Questionário
            </h4>
            <ul className="space-y-1.5 border-t border-[#181818] pt-2.5">
              {notebook.matchReasons.map((reason, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-xs leading-relaxed text-[#c9c9c9]"
                >
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#00d294]" />
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
    </div>
  );
}
