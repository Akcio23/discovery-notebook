import React from 'react';
import { BaseModal } from './BaseModal';
import { NotebookDetailView } from '../notebooks/NotebookDetailView';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function NotebookDetailModal({
  notebook,
  open,
  onOpenChange,
  isWinner = false,
  showMatchReasons = false,
  onNavigateModel
}) {
  if (!notebook) return null;

  const rankFormatted = String(notebook.rank).padStart(2, '0');
  const eyebrowParts = [
    'Ficha Técnica',
    `Ranking #${rankFormatted}`,
    notebook.badge
  ];

  if (isWinner) {
    eyebrowParts.push('Modelo Vencedor');
  } else if (
    showMatchReasons &&
    notebook.matchPercentage !== null &&
    notebook.matchPercentage !== undefined
  ) {
    eyebrowParts.push(`${notebook.matchPercentage}% Compatível`);
  }

  return (
    <BaseModal
      open={open}
      onOpenChange={onOpenChange}
      eyebrow={eyebrowParts.join(' · ')}
      title={`${notebook.name} (${notebook.code})`}
      description={notebook.selectionReason}
      maxWidth="max-w-4xl"
      headerActions={
        onNavigateModel && (
          <div className="mr-1.5 flex items-center gap-1">
            <button
              type="button"
              onClick={() => onNavigateModel(-1)}
              title="Modelo anterior"
              className="inline-flex h-8 w-8 items-center justify-center rounded border border-[#242424] bg-transparent text-[#c9c9c9] transition-colors hover:border-white hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <ChevronLeft className="h-4 w-4 stroke-[1.75]" />
            </button>
            <button
              type="button"
              onClick={() => onNavigateModel(1)}
              title="Próximo modelo"
              className="inline-flex h-8 w-8 items-center justify-center rounded border border-[#242424] bg-transparent text-[#c9c9c9] transition-colors hover:border-white hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <ChevronRight className="h-4 w-4 stroke-[1.75]" />
            </button>
          </div>
        )
      }
    >
      <NotebookDetailView
        notebook={notebook}
        isWinner={isWinner}
        showMatchReasons={showMatchReasons}
        inModal={true}
      />
    </BaseModal>
  );
}
