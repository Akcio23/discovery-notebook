import React from 'react';
import * as RadioGroup from '@radix-ui/react-radio-group';
import { cn } from '../../utils/cn';
import { Check } from 'lucide-react';

export function QuestionCard({ question, selectedOption, onSelectOption }) {
  if (!question) return null;

  return (
    <div className="rounded-md border border-[#212121] bg-transparent p-8 sm:p-10">
      <div className="mb-8">
        <div className="mb-3 flex items-center gap-2.5">
          <span className="font-mono text-xs font-medium text-[#3080ff]">
            PERGUNTA {question.step} / 06
          </span>
          <span className="text-[#292929]">·</span>
          <span className="font-mono text-xs text-[#757575]">
            {question.category}
          </span>
        </div>

        <h3 className="text-2xl font-medium tracking-tight text-white">
          {question.question}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[#858585]">
          {question.subtitle}
        </p>
      </div>

      <RadioGroup.Root
        value={selectedOption || ''}
        onValueChange={onSelectOption}
        aria-label={question.question}
        className="grid grid-cols-1 gap-3.5"
      >
        {question.options.map((option) => {
          const isSelected = selectedOption === option.id;
          return (
            <RadioGroup.Item
              key={option.id}
              value={option.id}
              className={cn(
                'group relative flex w-full cursor-pointer items-center justify-between gap-4 rounded border p-5 text-left transition-all duration-150',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#090909]',
                isSelected
                  ? 'border-white bg-white/[0.03]'
                  : 'border-[#212121] bg-transparent hover:border-[#3a3a3a] hover:bg-white/[0.015]'
              )}
            >
              <div className="flex items-start gap-4">
                <span
                  className={cn(
                    'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded border font-mono text-xs transition-colors',
                    isSelected
                      ? 'border-white bg-white text-[#090909] font-semibold'
                      : 'border-[#292929] bg-transparent text-[#757575] group-hover:border-[#757575] group-hover:text-white'
                  )}
                >
                  {isSelected ? <Check className="h-3.5 w-3.5 stroke-[2.5]" /> : option.keyHint}
                </span>

                <div>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="text-base font-medium text-white">
                      {option.label}
                    </span>
                    <span
                      className={cn(
                        'rounded-sm border px-2 py-0.5 font-mono text-[10px] bg-transparent',
                        isSelected
                          ? 'border-[#3080ff]/50 text-[#3080ff]'
                          : 'border-[#212121] text-[#858585]'
                      )}
                    >
                      {option.technicalTag}
                    </span>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-[#858585] line-clamp-1">
                    {option.description}
                  </p>
                </div>
              </div>
            </RadioGroup.Item>
          );
        })}
      </RadioGroup.Root>
    </div>
  );
}
