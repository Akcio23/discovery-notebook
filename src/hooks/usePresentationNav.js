import { useState, useCallback, useMemo, useEffect } from 'react';

export const ALL_SECTIONS = [
  { id: 'contexto', label: 'Overview' },
  { id: 'modelos', label: 'Os 10 Modelos' },
  { id: 'filosofia', label: 'Equação Técnica' },
  { id: 'questionario', label: 'Questionário' },
  { id: 'recomendacao', label: 'Modelo Vencedor' }
];

export function usePresentationNav(isQuizCompleted = false) {
  const [navState, setNavState] = useState({
    activeIndex: 0,
    direction: 1
  });

  // A seção "Modelo Vencedor" só existe na navegação após o questionário ser respondido
  const sections = useMemo(() => {
    if (isQuizCompleted) {
      return ALL_SECTIONS;
    }
    return ALL_SECTIONS.filter((s) => s.id !== 'recomendacao');
  }, [isQuizCompleted]);

  // Se o usuário estava na seção "Modelo Vencedor" e reiniciou o questionário, volta para "Questionário"
  useEffect(() => {
    if (!isQuizCompleted && navState.activeIndex >= sections.length) {
      setNavState({
        activeIndex: sections.length - 1,
        direction: -1
      });
    }
  }, [isQuizCompleted, navState.activeIndex, sections.length]);

  const safeIndex = Math.min(navState.activeIndex, sections.length - 1);
  const { direction } = navState;
  const activeSection = sections[safeIndex]?.id || 'contexto';
  const totalSections = sections.length;
  const progressPercentage = ((safeIndex + 1) / totalSections) * 100;

  const prevSectionObj = safeIndex > 0 ? sections[safeIndex - 1] : null;
  const nextSectionObj =
    safeIndex < totalSections - 1 ? sections[safeIndex + 1] : null;

  const goToSection = useCallback(
    (sectionId) => {
      if (sectionId === 'recomendacao' && !isQuizCompleted) {
        return;
      }
      const targetIdx = ALL_SECTIONS.findIndex((s) => s.id === sectionId);
      if (targetIdx === -1) return;

      setNavState((prev) => {
        if (prev.activeIndex === targetIdx) return prev;
        const newDirection = targetIdx > prev.activeIndex ? 1 : -1;
        return {
          activeIndex: targetIdx,
          direction: newDirection
        };
      });

      window.scrollTo({ top: 0, behavior: 'instant' });
    },
    [isQuizCompleted]
  );

  const nextSection = useCallback(() => {
    setNavState((prev) => {
      if (prev.activeIndex >= sections.length - 1) return prev;
      return {
        activeIndex: prev.activeIndex + 1,
        direction: 1
      };
    });
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [sections.length]);

  const prevSection = useCallback(() => {
    setNavState((prev) => {
      if (prev.activeIndex <= 0) return prev;
      return {
        activeIndex: prev.activeIndex - 1,
        direction: -1
      };
    });
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return {
    activeSection,
    activeIndex: safeIndex,
    totalSections,
    progressPercentage,
    direction,
    prevSectionObj,
    nextSectionObj,
    goToSection,
    scrollToSection: goToSection,
    nextSection,
    prevSection,
    sections
  };
}
