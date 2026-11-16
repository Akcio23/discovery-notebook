import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '../../utils/cn';

const headerVariants = {
  hidden: { opacity: 0, y: 10, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] }
  }
};

const contentVariants = {
  hidden: { opacity: 0, y: 14, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.42, delay: 0.06, ease: [0.22, 1, 0.36, 1] }
  }
};

export function SectionContainer({
  id,
  indexLabel,
  eyebrow,
  title,
  subtitle,
  children,
  className,
  headerRight,
  borderless = false,
  chapterNav
}) {
  return (
    <section
      id={id}
      className={cn(
        'relative w-full pt-14 pb-12 sm:pt-16 lg:pt-20 xl:pt-24 lg:pb-16 xl:pb-20 flex flex-col justify-start',
        className
      )}
    >
      <div className="mx-auto w-full max-w-7xl px-8">
        {(indexLabel || eyebrow || title) && (
          <motion.div
            variants={headerVariants}
            initial="hidden"
            animate="visible"
            className={cn(
              'relative flex flex-col justify-between gap-4 lg:flex-row lg:items-end',
              borderless
                ? 'mb-6 pb-1'
                : 'mb-6 border-b border-[#1c1c1c] pb-4'
            )}
          >
            {/* Feixe de Scan Futurista na Linha Divisória do Header (Oculto no modo sem bordas) */}
            {!borderless && (
              <motion.span
                aria-hidden="true"
                initial={{ scaleX: 0, opacity: 0.95, originX: 0 }}
                animate={{ scaleX: 1, opacity: 0 }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                className="pointer-events-none absolute bottom-[-1px] left-0 right-0 h-[2px] bg-gradient-to-r from-[#3080ff] via-white to-transparent shadow-[0_0_12px_#3080ff]"
              />
            )}

            <div className="max-w-3xl">
              {(indexLabel || eyebrow) && (
                <div className="mb-2 flex items-center gap-2">
                  {indexLabel && (
                    <span
                      className={cn(
                        'inline-flex items-center font-mono text-xs font-medium text-[#3080ff]',
                        borderless
                          ? 'px-0 py-0'
                          : 'rounded-sm border border-[#3080ff]/40 bg-[#3080ff]/10 px-2 py-0.5'
                      )}
                    >
                      {indexLabel}
                    </span>
                  )}
                  {indexLabel && eyebrow && (
                    <span className="text-[#292929]">/</span>
                  )}
                  {eyebrow && (
                    <span className="font-mono text-[11px] uppercase tracking-widest text-[#858585]">
                      {eyebrow}
                    </span>
                  )}
                </div>
              )}
              {title && (
                <h2 className="text-2xl font-medium tracking-tight text-white sm:text-3xl lg:text-[32px] lg:leading-[1.15]">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="mt-1.5 max-w-2xl text-xs leading-relaxed text-[#9e9e9e] sm:text-sm">
                  {subtitle}
                </p>
              )}
            </div>
            {headerRight && <div className="shrink-0">{headerRight}</div>}
          </motion.div>
        )}

        <motion.div
          variants={contentVariants}
          initial="hidden"
          animate="visible"
        >
          {children}

          {/* Controles de Navegação entre Capítulos Abaixo do Conteúdo da Seção */}
          {chapterNav && (
            <div
              className={cn(
                'mt-8 flex flex-wrap items-center justify-between gap-4 pt-5',
                borderless ? '' : 'border-t border-[#181818]'
              )}
            >
              <div>
                {chapterNav.prevSectionObj ? (
                  <button
                    type="button"
                    onClick={chapterNav.onPrev}
                    className={cn(
                      'group inline-flex items-center gap-2.5 rounded px-3.5 py-2 text-xs font-medium text-[#c9c9c9] transition-all hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white',
                      borderless
                        ? 'bg-white/[0.05] hover:bg-white/[0.1]'
                        : 'border border-[#212121] bg-transparent hover:border-white'
                    )}
                  >
                    <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
                    <span className="font-mono text-[11px] text-[#757575]">
                      {chapterNav.prevSectionObj.index}
                    </span>
                    <span>{chapterNav.prevSectionObj.label}</span>
                  </button>
                ) : (
                  <span className="font-mono text-xs text-[#757575]">
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                {chapterNav.nextSectionObj ? (
                  <button
                    type="button"
                    onClick={chapterNav.onNext}
                    className="group inline-flex items-center gap-2.5 rounded bg-white px-4 py-2 text-xs font-semibold text-[#090909] transition-all hover:bg-[#d9d9d9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    <span>Próximo: {chapterNav.nextSectionObj.label}</span>
                    {chapterNav.nextSectionObj.index && (
                      <span className="font-mono text-[11px] text-[#757575]">
                        ({chapterNav.nextSectionObj.index})
                      </span>
                    )}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </button>
                ) : chapterNav.showBackToStart ? (
                  <button
                    type="button"
                    onClick={chapterNav.onGoToStart}
                    className="inline-flex items-center gap-2 rounded border border-[#292929] bg-transparent px-4 py-2 text-xs font-medium text-white transition-colors hover:border-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    <span>Voltar ao Início (01)</span>
                  </button>
                ) : (
                  <span className="font-mono text-xs text-[#757575]">
                    Responda ao questionário acima para desbloquear o Modelo Vencedor
                  </span>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
