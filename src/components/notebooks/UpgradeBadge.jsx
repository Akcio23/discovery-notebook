import React from 'react';
import { cn } from '../../utils/cn';
import { CheckCircle2, Wrench, Lock } from 'lucide-react';

export function UpgradeBadge({ notebook, size = 'sm' }) {
  const { ramFactoryGb, ramExpandable } = notebook.specs;

  if (ramFactoryGb === 32 && ramExpandable) {
    return (
      <span
        className={cn(
          'inline-flex items-center gap-1.5 rounded border border-[#00d294]/35 bg-transparent font-mono font-medium text-[#00d294]',
          size === 'sm' ? 'px-2.5 py-0.5 text-[11px]' : 'px-3 py-1 text-xs'
        )}
      >
        <CheckCircle2 className="h-3 w-3 stroke-[1.75]" />
        <span>32 GB de Fábrica · Expansível 64 GB</span>
      </span>
    );
  }

  if (ramFactoryGb === 32 && !ramExpandable) {
    return (
      <span
        className={cn(
          'inline-flex items-center gap-1.5 rounded border border-[#3080ff]/35 bg-transparent font-mono font-medium text-[#3080ff]',
          size === 'sm' ? 'px-2.5 py-0.5 text-[11px]' : 'px-3 py-1 text-xs'
        )}
      >
        <CheckCircle2 className="h-3 w-3 stroke-[1.75]" />
        <span>32 GB de Fábrica (LPDDR5x Soldada)</span>
      </span>
    );
  }

  if (ramFactoryGb === 16 && ramExpandable) {
    return (
      <span
        className={cn(
          'inline-flex items-center gap-1.5 rounded border border-[#f99c00]/35 bg-transparent font-mono font-medium text-[#f99c00]',
          size === 'sm' ? 'px-2.5 py-0.5 text-[11px]' : 'px-3 py-1 text-xs'
        )}
      >
        <Wrench className="h-3 w-3 stroke-[1.75]" />
        <span>16 GB Fábrica · Upgrade 32 GB (+R$ 800)</span>
      </span>
    );
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded border border-[#292929] bg-transparent font-mono font-medium text-[#9e9e9e]',
        size === 'sm' ? 'px-2.5 py-0.5 text-[11px]' : 'px-3 py-1 text-xs'
      )}
    >
      <Lock className="h-3 w-3 stroke-[1.75]" />
      <span>16 GB Memória Unificada (Soldada)</span>
    </span>
  );
}
