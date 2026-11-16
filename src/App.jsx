import React, { useState, useMemo, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePresentationNav } from './hooks/usePresentationNav';
import { calculateRecommendations } from './utils/recommendationEngine';
import { TopNav } from './components/layout/TopNav';
import { ProblemSection } from './components/sections/ProblemSection';
import { ModelsOverviewSection } from './components/sections/ModelsOverviewSection';
import { InspirationSection } from './components/sections/InspirationSection';
import { QuizSection } from './components/sections/QuizSection';
import { ResultsAndCatalogSection } from './components/sections/ResultsAndCatalogSection';
import { NotebookDetailModal } from './components/modals/NotebookDetailModal';

// Variantes de Transição Futurista entre Capítulos (Deslocamento Direcional + Blur Óptico + Escala)
const sectionTransitionVariants = {
  enter: (direction) => ({
    opacity: 0,
    x: direction > 0 ? 52 : -52,
    scale: 0.985,
    filter: 'blur(10px)'
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.42,
      ease: [0.22, 1, 0.36, 1]
    }
  },
  exit: (direction) => ({
    opacity: 0,
    x: direction > 0 ? -52 : 52,
    scale: 0.985,
    filter: 'blur(8px)',
    transition: {
      duration: 0.25,
      ease: [0.4, 0, 1, 1]
    }
  })
};

export default function App() {
  // Respostas das 6 perguntas do questionário
  const [answers, setAnswers] = useState({});

  // Notebook atualmente aberto no Modal de Ficha Técnica Completa (null = modal fechado)
  const [modalNotebookId, setModalNotebookId] = useState(null);

  // Cálculo em tempo real da recomendação e ranking dos 10 modelos
  const recommendation = useMemo(
    () => calculateRecommendations(answers),
    [answers]
  );

  // A seção "Modelo Vencedor" só é desbloqueada após o questionário ser respondido
  const isQuizCompleted = recommendation.isComplete;

  const {
    activeSection,
    activeIndex,
    totalSections,
    progressPercentage,
    direction,
    prevSectionObj,
    nextSectionObj,
    goToSection,
    nextSection,
    prevSection,
    sections
  } = usePresentationNav(isQuizCompleted);

  // Busca o objeto atualizado do notebook (com score e matchReasons) para exibir no Modal
  const activeModalNotebook = useMemo(() => {
    if (!modalNotebookId) return null;
    return (
      recommendation.rankedModels.find((nb) => nb.id === modalNotebookId) ||
      null
    );
  }, [modalNotebookId, recommendation.rankedModels]);

  const handleAnswerChange = useCallback((questionId, optionId) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId
    }));
  }, []);

  const handleResetAnswers = useCallback(() => {
    setAnswers({});
  }, []);

  const handleCompleteQuiz = useCallback(() => {
    goToSection('recomendacao');
  }, [goToSection]);

  const handleOpenCatalog = useCallback(() => {
    goToSection('modelos');
  }, [goToSection]);

  const handleOpenRecommendation = useCallback(() => {
    if (isQuizCompleted) {
      goToSection('recomendacao');
    }
  }, [goToSection, isQuizCompleted]);

  // Abre o modal de detalhes de qualquer notebook mantendo o usuário no capítulo atual
  const handleInspectNotebook = useCallback((notebook) => {
    if (notebook?.id) {
      setModalNotebookId(notebook.id);
    }
  }, []);

  // Permite navegar entre os modelos anterior/próximo diretamente dentro do Modal
  const handleNavigateModalModel = useCallback(
    (directionDelta) => {
      if (!modalNotebookId) return;
      const list = recommendation.rankedModels;
      const currentIdx = list.findIndex((nb) => nb.id === modalNotebookId);
      if (currentIdx === -1) return;
      const nextIdx = (currentIdx + directionDelta + list.length) % list.length;
      setModalNotebookId(list[nextIdx].id);
    },
    [modalNotebookId, recommendation.rankedModels]
  );

  // Objeto de navegação entre capítulos exibido abaixo do conteúdo de cada seção
  const chapterNav = useMemo(
    () => ({
      prevSectionObj,
      nextSectionObj,
      onPrev: prevSection,
      onNext: nextSection,
      onGoToStart: () => goToSection('contexto'),
      totalSections,
      showBackToStart: activeSection === 'recomendacao'
    }),
    [
      prevSectionObj,
      nextSectionObj,
      prevSection,
      nextSection,
      goToSection,
      totalSections,
      activeSection
    ]
  );

  // Renderiza apenas o capítulo ativo
  const renderCurrentSection = () => {
    switch (activeSection) {
      case 'contexto':
        return (
          <ProblemSection
            onStartQuiz={() => goToSection('questionario')}
            onExploreModels={() => goToSection('modelos')}
            onInspectNotebook={handleInspectNotebook}
            chapterNav={chapterNav}
          />
        );
      case 'modelos':
        return (
          <ModelsOverviewSection
            onInspectNotebook={handleInspectNotebook}
            chapterNav={chapterNav}
          />
        );
      case 'filosofia':
        return (
          <InspirationSection
            onProceedToQuiz={() => goToSection('questionario')}
            chapterNav={chapterNav}
          />
        );
      case 'questionario':
        return (
          <QuizSection
            answers={answers}
            onAnswerChange={handleAnswerChange}
            onResetAnswers={handleResetAnswers}
            onCompleteQuiz={handleCompleteQuiz}
            chapterNav={chapterNav}
          />
        );
      case 'recomendacao':
        if (!isQuizCompleted) return null;
        return (
          <ResultsAndCatalogSection
            recommendation={recommendation}
            onInspectNotebook={handleInspectNotebook}
            onGoToQuiz={() => goToSection('questionario')}
            chapterNav={chapterNav}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#090909] text-[#d9d9d9] selection:bg-[#3080ff]/30 selection:text-white overflow-x-hidden">
      {/* Barra Superior Compacta com Progresso */}
      <TopNav
        sections={sections}
        activeSection={activeSection}
        activeIndex={activeIndex}
        totalSections={totalSections}
        progressPercentage={progressPercentage}
        onNavigate={goToSection}
        onOpenCatalog={handleOpenCatalog}
        onOpenRecommendation={handleOpenRecommendation}
        isQuizCompleted={isQuizCompleted}
      />

      {/* Área Central: Exibe 1 Capítulo por Vez com os Botões de Navegação Abaixo do Conteúdo */}
      <main className="relative flex-1 flex flex-col justify-start">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeSection}
            custom={direction}
            variants={sectionTransitionVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full"
          >
            {renderCurrentSection()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Modal Global de Ficha Técnica Direta do Notebook */}
      <NotebookDetailModal
        notebook={activeModalNotebook}
        open={Boolean(activeModalNotebook)}
        onOpenChange={(isOpen) => {
          if (!isOpen) setModalNotebookId(null);
        }}
        isWinner={
          isQuizCompleted &&
          activeModalNotebook?.id === recommendation.winner?.id
        }
        showMatchReasons={isQuizCompleted}
        onNavigateModel={handleNavigateModalModel}
      />
    </div>
  );
}
