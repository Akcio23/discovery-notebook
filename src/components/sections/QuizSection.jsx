import React, { useState } from 'react';
import { QUESTIONS } from '../../data/questions';
import { SectionContainer } from '../layout/SectionContainer';
import { FuturisticQuizModal } from '../modals/FuturisticQuizModal';
import { RotateCcw, Sparkles } from 'lucide-react';

export function QuizSection({
  answers,
  onAnswerChange,
  onResetAnswers,
  onCompleteQuiz,
  chapterNav
}) {
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const answeredCount = Object.keys(answers).filter((k) => Boolean(answers[k])).length;
  const totalQuestions = QUESTIONS.length;
  const isComplete = answeredCount === totalQuestions;

  const handleOpenQuizAt = (idx = 0) => {
    setCurrentIndex(idx);
    setIsQuizModalOpen(true);
  };

  const handleOpenNextPending = () => {
    const firstPendingIdx = QUESTIONS.findIndex((q) => !answers[q.id]);
    handleOpenQuizAt(firstPendingIdx !== -1 ? firstPendingIdx : 0);
  };

  return (
    <SectionContainer
      id="questionario"
      title="Calibre o Algoritmo para o Seu Fluxo"
      subtitle="Responda às perguntas no modal para processar sua recomendação personalizada e desbloquear o Modelo Vencedor."
      chapterNav={chapterNav}
      headerRight={
        <div className="flex items-center gap-2.5">
          {answeredCount > 0 && (
            <button
              type="button"
              onClick={() => {
                onResetAnswers();
                setCurrentIndex(0);
              }}
              className="inline-flex items-center gap-1.5 rounded border border-[#212121] bg-transparent px-3.5 py-2 text-xs text-[#9e9e9e] transition-colors hover:border-[#3a3a3a] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <RotateCcw className="h-3.5 w-3.5 stroke-[1.5]" />
              <span>Reiniciar ({answeredCount}/6)</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleOpenNextPending}
            className="inline-flex items-center gap-2 rounded bg-[#3080ff] px-5 py-2.5 text-xs font-semibold text-white shadow-[0_0_24px_rgba(48,128,255,0.35)] transition-all hover:bg-[#3080ff]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
         
            <span>
              {answeredCount === 0
                ? 'Responder Questionário'
                : !isComplete
                ? `Continuar Questionário (${answeredCount}/6)`
                : 'Revisar Respostas'}
            </span>
          </button>
        </div>
      }
    >
      {/* Visão Geral Clean do Modelo Utilizado e Como Funciona */}
      <div className="space-y-9">
        {/* Bloco 1: O Modelo Utilizado */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <span className="font-mono text-[11px] font-medium uppercase tracking-widest text-[#3080ff]">
              Modelo Utilizado · Matriz Ponderada Multi-Critério (MCDA)
            </span>
            <h3 className="mt-2 text-xl font-medium tracking-tight text-white sm:text-2xl">
              Pontuação contínua por afinidade técnica em vez de filtros excludentes
            </h3>
            <p className="mt-2.5 text-xs leading-relaxed text-[#9e9e9e] sm:text-sm">
              Filtros tradicionais descartam ótimos notebooks por um único detalhe isolado. Nosso motor avalia simultaneamente os{' '}
              <strong className="font-medium text-white">10 modelos da pesquisa</strong> atribuindo pesos graduais de{' '}
              <strong className="font-medium text-white">0 a 30 pontos</strong> em cada dimensão do seu fluxo de trabalho, normalizando a compatibilidade final de{' '}
              <span className="font-mono text-[#d9d9d9]">0% a 99%</span>.
            </p>
          </div>

          <div className="lg:col-span-5 lg:border-l lg:border-[#1c1c1c] lg:pl-8">
            <span className="block font-mono text-[10px] uppercase tracking-widest text-[#757575]">
              Equação de Pontuação & Normalização
            </span>
            <div className="mt-2 font-mono text-xs sm:text-sm text-white">
              Score(M) = Σ W(M, R₁..₆)
            </div>
            <p className="mt-1.5 text-xs leading-relaxed text-[#858585]">
              Cada resposta calibra os pesos de hardware real (TGP da GPU em Watts, espaço de cor sRGB/DCI-P3, custo efetivo com 32 GB e peso físico).
            </p>
            <div className="mt-3 flex items-center gap-2 font-mono text-[11px]">
              <span className="text-[#757575]">Status da calibração:</span>
              <span className={isComplete ? 'text-[#00d294]' : 'text-[#3080ff]'}>
                {isComplete
                  ? '6/6 parâmetros calibrados · Vencedor desbloqueado'
                  : `${answeredCount}/6 parâmetros calibrados`}
              </span>
            </div>
          </div>
        </div>

        {/* Bloco 2: Como Funciona (3 Etapas em Linha, Clean e Sem Caixas) */}
        <div className="grid grid-cols-1 gap-8 border-t border-[#181818] pt-8 sm:grid-cols-3">
          <div>
            <span className="font-mono text-[11px] font-medium uppercase tracking-wider text-[#3080ff]">
              01 · Calibração de Prioridades
            </span>
            <h4 className="mt-1.5 text-base font-medium text-white">
              Coleta de 6 Variáveis no Modal
            </h4>
            <p className="mt-1 text-xs leading-relaxed text-[#858585]">
              No modal interativo, você define seu teto financeiro, prioridade entre tela nativa ou GPU bruta, preferência por 32 GB de fábrica ou upgrade e rotina de mobilidade.
            </p>
          </div>

          <div>
            <span className="font-mono text-[11px] font-medium uppercase tracking-wider text-[#3080ff]">
              02 · Cruzamento na Matriz 10 × 6
            </span>
            <h4 className="mt-1.5 text-base font-medium text-white">
              Cálculo de Aderência em Tempo Real
            </h4>
            <p className="mt-1 text-xs leading-relaxed text-[#858585]">
              O algoritmo cruza suas escolhas contra a ficha técnica dos 10 notebooks, recompensando configurações alinhadas e penalizando gargalos para o seu uso em 4K e 3D.
            </p>
          </div>

          <div>
            <span className="font-mono text-[11px] font-medium uppercase tracking-wider text-[#3080ff]">
              03 · Desempate Determinístico
            </span>
            <h4 className="mt-1.5 text-base font-medium text-white">
              4 Regras de Decisão em Cascata
            </h4>
            <p className="mt-1 text-xs leading-relaxed text-[#858585]">
              Se dois modelos empatarem na nota, o desempate aplica em ordem estrita: limite de R$ 10.000, filtro de peso (&lt; 2,0 kg), aderência à estratégia de RAM e ranking oficial.
            </p>
          </div>
        </div>
      </div>

      {/* Modal do Questionário com Animação Futurista */}
      <FuturisticQuizModal
        open={isQuizModalOpen}
        onOpenChange={setIsQuizModalOpen}
        currentIndex={currentIndex}
        onIndexChange={setCurrentIndex}
        answers={answers}
        onAnswerChange={onAnswerChange}
        onResetAnswers={onResetAnswers}
        onCompleteQuiz={onCompleteQuiz}
      />
    </SectionContainer>
  );
}
