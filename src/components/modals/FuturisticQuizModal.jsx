import React, { useEffect, useCallback } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as RadioGroup from '@radix-ui/react-radio-group';
import { AnimatePresence, motion } from 'framer-motion';
import { QUESTIONS } from '../../data/questions';
import { cn } from '../../utils/cn';
import { ArrowLeft, ArrowRight, Check, RotateCcw, Sparkles, X } from 'lucide-react';

export function FuturisticQuizModal({
  open,
  onOpenChange,
  currentIndex,
  onIndexChange,
  answers,
  onAnswerChange,
  onResetAnswers,
  onCompleteQuiz
}) {
  const currentQuestion = QUESTIONS[currentIndex] || QUESTIONS[0];
  const selectedOption = answers[currentQuestion.id];
  const answeredCount = Object.keys(answers).filter((k) => Boolean(answers[k])).length;
  const isQuizComplete = answeredCount === QUESTIONS.length;
  const progressPercent = ((currentIndex + 1) / QUESTIONS.length) * 100;

  const handleNext = useCallback(() => {
    if (currentIndex < QUESTIONS.length - 1) {
      onIndexChange(currentIndex + 1);
    } else if (isQuizComplete) {
      onOpenChange(false);
      onCompleteQuiz?.();
    } else {
      const firstUnansweredIdx = QUESTIONS.findIndex((q) => !answers[q.id]);
      if (firstUnansweredIdx !== -1) {
        onIndexChange(firstUnansweredIdx);
      }
    }
  }, [currentIndex, isQuizComplete, answers, onIndexChange, onOpenChange, onCompleteQuiz]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      onIndexChange(currentIndex - 1);
    }
  }, [currentIndex, onIndexChange]);

  const handleSelectOption = useCallback(
    (optionId) => {
      onAnswerChange(currentQuestion.id, optionId);
    },
    [currentQuestion.id, onAnswerChange]
  );

  // Atalhos de teclado dentro do Modal Futurista (1, 2, 3, Enter, Backspace)
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e) => {
      const tag = document.activeElement?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea' || tag === 'select') return;

      if (e.key === '1' || e.key === '2' || e.key === '3') {
        const optionIndex = parseInt(e.key, 10) - 1;
        const opt = currentQuestion.options[optionIndex];
        if (opt) {
          e.preventDefault();
          onAnswerChange(currentQuestion.id, opt.id);
        }
      } else if (e.key === 'Enter' && selectedOption) {
        if (tag !== 'button') {
          e.preventDefault();
          handleNext();
        }
      } else if (e.key === 'Backspace' && currentIndex > 0) {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    open,
    currentQuestion,
    selectedOption,
    currentIndex,
    onAnswerChange,
    handleNext,
    handlePrev
  ]);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            {/* Backdrop HUD com brilho radial azul e desfoque óptico */}
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 50% 45%, rgba(48, 128, 255, 0.16), rgba(9, 9, 9, 0.92) 70%)'
                }}
              />
            </Dialog.Overlay>

            {/* Janela do Modal com Animação Futurista (Scanline + Scale + Blur + Cantoneiras HUD) */}
            <Dialog.Content asChild>
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.88,
                  y: 28,
                  filter: 'blur(16px)'
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  filter: 'blur(0px)'
                }}
                exit={{
                  opacity: 0,
                  scale: 0.93,
                  y: 16,
                  filter: 'blur(12px)'
                }}
                transition={{
                  duration: 0.44,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="fixed left-1/2 top-1/2 z-50 w-[94vw] max-w-3xl -translate-x-1/2 -translate-y-1/2 rounded-md border border-[#3080ff]/40 bg-[#090909]/95 shadow-[0_0_60px_rgba(48,128,255,0.18)] focus:outline-none overflow-hidden"
              >
                {/* Feixe Laser de Varredura Vertical na Abertura do Modal */}
                <motion.div
                  aria-hidden="true"
                  initial={{ top: '-5%', opacity: 0.95 }}
                  animate={{ top: '105%', opacity: 0 }}
                  transition={{ duration: 0.95, ease: 'easeInOut' }}
                  className="pointer-events-none absolute left-0 right-0 z-30 h-[2px] bg-gradient-to-r from-transparent via-[#3080ff] to-transparent shadow-[0_0_20px_#3080ff]"
                />

                {/* Cantoneiras Técnicas Luminosas (HUD Corners) */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-0 top-0 h-3.5 w-3.5 border-l-2 border-t-2 border-[#3080ff]"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-0 top-0 h-3.5 w-3.5 border-r-2 border-t-2 border-[#3080ff]"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-0 left-0 h-3.5 w-3.5 border-b-2 border-l-2 border-[#3080ff]"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-0 right-0 h-3.5 w-3.5 border-b-2 border-r-2 border-[#3080ff]"
                />

                {/* Cabeçalho de Telemetria do Quiz */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1f1f1f] px-6 py-4">
                  <div className="flex items-center gap-2.5">
       
                    <div>
                      <Dialog.Title className="font-mono text-xs uppercase tracking-widest text-white">
                        PERGUNTAS
                      </Dialog.Title>
    
                    </div>
                  </div>

                  {/* Seletores Rápidos das 6 Etapas + Fechar */}
                  <div className="flex items-center gap-1.5">
                    <div className="hidden sm:flex items-center gap-1 mr-2">
                      {QUESTIONS.map((q, idx) => {
                        const isAnswered = Boolean(answers[q.id]);
                        const isCurrent = idx === currentIndex;
                        return (
                          <button
                            key={q.id}
                            type="button"
                            onClick={() => onIndexChange(idx)}
                            className={cn(
                              'h-6 px-2 rounded font-mono text-[11px] transition-all border',
                              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white',
                              isCurrent
                                ? 'border-white bg-white text-[#090909] font-semibold'
                                : isAnswered
                                ? 'border-[#3080ff]/45 bg-[#3080ff]/10 text-[#3080ff]'
                                : 'border-[#212121] bg-transparent text-[#757575] hover:border-[#3a3a3a] hover:text-white'
                            )}
                          >
                            {q.step}
                          </button>
                        );
                      })}
                    </div>

                    {answeredCount > 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          onResetAnswers();
                          onIndexChange(0);
                        }}
                        title="Reiniciar respostas"
                        className="inline-flex h-7 items-center gap-1 rounded border border-[#212121] bg-transparent px-2.5 text-[11px] text-[#9e9e9e] transition-colors hover:border-white hover:text-white"
                      >
                        <RotateCcw className="h-3 w-3" />
                        <span className="hidden md:inline">Limpar</span>
                      </button>
                    )}

                    <Dialog.Close
                      aria-label="Fechar questionário"
                      className="inline-flex h-7 w-7 items-center justify-center rounded border border-[#292929] bg-transparent text-[#9e9e9e] transition-colors hover:border-white hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                      <X className="h-4 w-4" />
                    </Dialog.Close>
                  </div>
                </div>

                {/* Barra de Progresso Laser Contínua */}
                <div className="relative h-[2px] w-full bg-[#161616] overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#3080ff] to-[#8ec5ff] shadow-[0_0_12px_#3080ff]"
                    initial={false}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                  />
                </div>

                {/* Corpo Compacto da Pergunta (Zero Scroll) */}
                <div className="p-6 sm:p-7">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentQuestion.id}
                      initial={{ opacity: 0, x: 22, filter: 'blur(6px)' }}
                      animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, x: -22, filter: 'blur(6px)' }}
                      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="mb-5">
                        <div className="mb-1.5 flex items-center gap-2">
                          <span className="font-mono text-[11px] font-medium uppercase text-[#3080ff]">
                             DIMENSÃO {currentQuestion.step} · {currentQuestion.category}
                          </span>
                        </div>

                        <h3 className="text-xl font-medium tracking-tight text-white sm:text-2xl">
                          {currentQuestion.question}
                        </h3>
                        <p className="mt-1 text-xs leading-relaxed text-[#858585]">
                          {currentQuestion.subtitle}
                        </p>
                      </div>

                      <RadioGroup.Root
                        value={selectedOption || ''}
                        onValueChange={handleSelectOption}
                        aria-label={currentQuestion.question}
                        className="grid grid-cols-1 gap-2.5"
                      >
                        {currentQuestion.options.map((option) => {
                          const isSelected = selectedOption === option.id;
                          return (
                            <RadioGroup.Item
                              key={option.id}
                              value={option.id}
                              className={cn(
                                'group relative flex w-full cursor-pointer items-center justify-between gap-4 rounded border px-4 py-3.5 text-left transition-all duration-150',
                                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white',
                                isSelected
                                  ? 'border-[#3080ff] bg-[#3080ff]/[0.08] shadow-[0_0_20px_rgba(48,128,255,0.12)]'
                                  : 'border-[#212121] bg-transparent hover:border-[#3a3a3a] hover:bg-white/[0.02]'
                              )}
                            >
                              <div className="flex items-start gap-3.5">
                                <span
                                  className={cn(
                                    'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border font-mono text-[11px] transition-colors',
                                    isSelected
                                      ? 'border-[#3080ff] bg-[#3080ff] text-white font-semibold'
                                      : 'border-[#292929] bg-transparent text-[#757575] group-hover:border-[#757575] group-hover:text-white'
                                  )}
                                >
                                  {isSelected ? (
                                    <Check className="h-3 w-3 stroke-[2.5]" />
                                  ) : (
                                    option.keyHint
                                  )}
                                </span>

                                <div>
                                  <div className="flex flex-wrap items-center gap-2">
                                    <span className="text-sm font-medium text-white">
                                      {option.label}
                                    </span>
                                    <span
                                      className={cn(
                                        'rounded-sm border px-2 py-0.5 font-mono text-[10px] bg-transparent',
                                        isSelected
                                          ? 'border-[#3080ff]/60 text-[#3080ff]'
                                          : 'border-[#212121] text-[#858585]'
                                      )}
                                    >
                                      {option.technicalTag}
                                    </span>
                                  </div>
                                  <p className="mt-0.5 text-xs text-[#858585] line-clamp-1">
                                    {option.description}
                                  </p>
                                </div>
                              </div>
                            </RadioGroup.Item>
                          );
                        })}
                      </RadioGroup.Root>
                    </motion.div>
                  </AnimatePresence>

                  {/* Rodapé de Controle do Modal */}
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[#1c1c1c] pt-4">
                    <span className="font-mono text-[11px] text-[#757575]">
                      Atalhos: <strong className="text-[#c9c9c9]">1–3</strong> selecionam ·{' '}
                      <strong className="text-[#c9c9c9]">Enter</strong> avança
                    </span>

                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={handlePrev}
                        disabled={currentIndex === 0}
                        className="inline-flex items-center gap-1.5 rounded border border-[#292929] bg-transparent px-3.5 py-2 text-xs font-medium text-white transition-colors hover:border-white disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                      >
                        <ArrowLeft className="h-3.5 w-3.5" />
                        <span>Anterior</span>
                      </button>

                      {currentIndex < QUESTIONS.length - 1 ? (
                        <button
                          type="button"
                          onClick={handleNext}
                          className="inline-flex items-center gap-1.5 rounded bg-white px-4 py-2 text-xs font-semibold text-[#090909] transition-colors hover:bg-[#d9d9d9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                        >
                          <span>Próxima Pergunta</span>
                          <ArrowRight className="h-3.5 w-3.5 stroke-[2]" />
                        </button>
                      ) : isQuizComplete ? (
                        <button
                          type="button"
                          onClick={() => {
                            onOpenChange(false);
                            onCompleteQuiz?.();
                          }}
                          className="inline-flex items-center gap-1.5 rounded bg-[#3080ff] px-5 py-2 text-xs font-semibold text-white shadow-[0_0_20px_rgba(48,128,255,0.4)] transition-colors hover:bg-[#3080ff]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                        >
                          <span>Ver Modelo Vencedor</span>
                          <ArrowRight className="h-3.5 w-3.5 stroke-[2]" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={handleNext}
                          disabled={!selectedOption && answeredCount === 0}
                          className="inline-flex items-center gap-1.5 rounded bg-white px-4 py-2 text-xs font-semibold text-[#090909] transition-colors hover:bg-[#d9d9d9] disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                        >
                          <span>
                            {!selectedOption
                              ? 'Selecione uma opção acima'
                              : `Ir para Pendente (${answeredCount}/6)`}
                          </span>
                          <ArrowRight className="h-3.5 w-3.5 stroke-[2]" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
