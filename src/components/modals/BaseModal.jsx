import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn';

export function BaseModal({
  open,
  onOpenChange,
  title,
  eyebrow,
  description,
  headerActions,
  children,
  maxWidth = 'max-w-4xl'
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in duration-200" />
        <Dialog.Content
          className={cn(
            'fixed left-1/2 top-1/2 z-50 w-[94vw] -translate-x-1/2 -translate-y-1/2 rounded-md border border-[#292929] bg-[#090909]/95 backdrop-blur-xl shadow-2xl focus:outline-none',
            'max-h-[88vh] flex flex-col overflow-hidden',
            maxWidth
          )}
        >
          {/* Cabeçalho Fixo do Modal Clear */}
          <div className="flex items-start justify-between gap-4 border-b border-[#212121] bg-transparent px-7 py-5">
            <div>
              {eyebrow && (
                <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-widest text-[#3080ff]">
                  {eyebrow}
                </span>
              )}
              <Dialog.Title className="text-xl font-medium tracking-tight text-white sm:text-2xl">
                {title}
              </Dialog.Title>
              {description && (
                <Dialog.Description className="mt-1 text-xs leading-relaxed text-[#9e9e9e]">
                  {description}
                </Dialog.Description>
              )}
            </div>

            <div className="flex shrink-0 items-center gap-2">
              {headerActions}
              <Dialog.Close
                aria-label="Fechar modal"
                className="inline-flex h-8 w-8 items-center justify-center rounded border border-[#292929] bg-transparent text-[#9e9e9e] transition-colors hover:border-white hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <X className="h-4 w-4 stroke-[1.75]" />
              </Dialog.Close>
            </div>
          </div>

          {/* Corpo com Rolagem Interna Suave */}
          <div className="overflow-y-auto p-7 sm:p-8">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
