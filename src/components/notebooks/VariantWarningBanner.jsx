import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { cn } from '../../utils/cn';

export function VariantWarningBanner({ warning, compact = false, className }) {
  if (!warning) return null;

  return (
    <div
      role="note"
      aria-label="Aviso de variante na pesquisa"
      className={cn(
        'flex items-start gap-3 rounded-md border border-[#f99c00]/35 bg-transparent text-[#d9d9d9]',
        compact ? 'p-3 text-xs' : 'p-4 text-xs leading-relaxed',
        className
      )}
    >
      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[#f99c00] stroke-[1.75]" />
      <div>
        <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#f99c00] block mb-0.5">
          Aviso de Variante na Pesquisa
        </span>
        <p className="text-[#c9c9c9]">{warning}</p>
      </div>
    </div>
  );
}
