import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

export function QuizProgressBar({
  currentIndex,
  totalQuestions,
  questions,
  answers,
  onSelectStep
}) {
  const progressPercent = ((currentIndex + 1) / totalQuestions) * 100;
  const currentStepFormatted = String(currentIndex + 1).padStart(2, '0');
  const totalFormatted = String(totalQuestions).padStart(2, '0');

  return (
    <div className="mb-8 rounded-md border border-[#212121] bg-transparent p-6">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm font-semibold text-white">
            {currentStepFormatted}{' '}
            <span className="text-[#757575]">/ {totalFormatted}</span>
          </span>
          <span className="h-4 w-[1px] bg-[#212121]" />
          <span className="font-mono text-xs uppercase tracking-wider text-[#9e9e9e]">
            {questions[currentIndex]?.category}
          </span>
        </div>

        {/* Navegação rápida entre os 6 passos */}
        <div className="flex items-center gap-1.5">
          {questions.map((q, idx) => {
            const isAnswered = Boolean(answers[q.id]);
            const isCurrent = idx === currentIndex;
            return (
              <button
                key={q.id}
                type="button"
                onClick={() => onSelectStep(idx)}
                className={cn(
                  'h-7 px-2.5 rounded font-mono text-xs transition-all border',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#090909]',
                  isCurrent
                    ? 'border-white bg-white text-[#090909] font-semibold'
                    : isAnswered
                    ? 'border-[#3080ff]/45 bg-transparent text-[#3080ff]'
                    : 'border-[#212121] bg-transparent text-[#757575] hover:border-[#3a3a3a] hover:text-[#c9c9c9]'
                )}
              >
                {q.step}
              </button>
            );
          })}
        </div>
      </div>

      {/* Barra contínua animada */}
      <div className="relative h-1.5 w-full overflow-hidden rounded-sm bg-[#161616]">
        <motion.div
          className="h-full rounded-sm bg-[#3080ff] shadow-[0_0_10px_rgba(48,128,255,0.65)]"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
