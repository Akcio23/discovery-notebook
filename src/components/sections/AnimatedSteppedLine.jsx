import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCw, Sparkles } from 'lucide-react';

/**
 * AnimatedSteppedLine
 * Linha arquitetônica animada em degrau (stepped line) que conecta visualmente
 * a Estratégia 01 (Chave na Mão) e a Estratégia 02 (Upgrade).
 *
 * Trajetória (Desktop):
 * 1. Linha horizontal superior sobre a Estratégia 01
 * 2. Curva quadrática suave de 90° descendo pelo vão central entre as duas colunas
 * 3. Curva quadrática suave de 90° virando à direita abaixo da Estratégia 02
 * 4. Linha horizontal inferior sob a Estratégia 02
 *
 * Animação:
 * - Traçado contínuo do início (0%) até o fim (100%) via Framer Motion pathLength
 * - Feixe de luz e brilho neon nos extremos
 * - Responsivo e adaptável (ajuste dinâmico via ResizeObserver)
 * - Botão discreto para reiniciar o replay da animação sob demanda
 */
export function AnimatedSteppedLine({
  className = '',
  duration = 1.8,
  showControls = true
}) {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState(null);
  const [animKey, setAnimKey] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleReplay = useCallback(() => {
    setIsCompleted(false);
    setAnimKey((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const parent = containerRef.current?.parentElement;
    if (!parent) return;

    const measure = () => {
      const width = parent.clientWidth;
      const height = parent.clientHeight;
      if (width === 0 || height === 0) return;

      const isDesktop = width >= 1024;
      const cornerRadius = 14;

      if (isDesktop) {
        // Modo 2 colunas: Linha no topo da Coluna 1, desce no meio exato e segue no rodapé da Coluna 2
        const yTop = 8;
        const yBottom = height - 8;
        const midX = width / 2;
        const xStart = 0;
        const xEnd = width;

        const path = `M ${xStart} ${yTop} L ${midX - cornerRadius} ${yTop} Q ${midX} ${yTop} ${midX} ${yTop + cornerRadius} L ${midX} ${yBottom - cornerRadius} Q ${midX} ${yBottom} ${midX + cornerRadius} ${yBottom} L ${xEnd} ${yBottom}`;

        setDimensions({
          width,
          height,
          path,
          isDesktop: true,
          start: { x: xStart, y: yTop },
          midTop: { x: midX, y: yTop },
          midBottom: { x: midX, y: yBottom },
          end: { x: xEnd, y: yBottom }
        });
      } else {
        // Modo mobile/tablet (empilhado): contorna entre os 2 cards de forma harmônica
        const yTop = 6;
        const yBottom = height - 6;
        const midY = height / 2;
        const r = 12;

        const path = `M 0 ${yTop} L ${width - r} ${yTop} Q ${width} ${yTop} ${width} ${yTop + r} L ${width} ${midY - r} Q ${width} ${midY} ${width - r} ${midY} L ${r} ${midY} Q 0 ${midY} 0 ${midY + r} L 0 ${yBottom - r} Q 0 ${yBottom} ${r} ${yBottom} L ${width} ${yBottom}`;

        setDimensions({
          width,
          height,
          path,
          isDesktop: false,
          start: { x: 0, y: yTop },
          end: { x: width, y: yBottom }
        });
      }
    };

    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(parent);
    window.addEventListener('resize', measure);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none absolute inset-0 z-0 overflow-visible ${className}`}
    >
      {/* Botão sutil de replay da animação para apresentações/demonstrações */}
      {showControls && (
        <div className="pointer-events-auto absolute -top-8 right-0 z-20 flex items-center gap-2">
          <button
            type="button"
            onClick={handleReplay}
            title="Repetir animação do traçado da linha"
            className="group inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-[#0d0d0d]/80 px-2.5 py-1 text-[11px] font-mono text-[#8f8f8f] backdrop-blur-md transition-all hover:border-white/30 hover:bg-[#161616] hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
          >
            <RotateCw className="h-3 w-3 transition-transform duration-500 group-hover:rotate-180 text-[#3080ff]" />
            {isCompleted && (
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#00d294] shadow-[0_0_6px_#00d294]" />
            )}
          </button>
        </div>
      )}

      {dimensions && (
        <svg
          key={animKey}
          className="h-full w-full overflow-visible"
          viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Gradiente luminoso: verde mint da Estratégia 1 -> branco puro no centro -> âmbar da Estratégia 2 */}
            <linearGradient
              id="steppedLineGrad"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#00d294" stopOpacity="0.9" />
              <stop offset="25%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="70%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="100%" stopColor="#f99c00" stopOpacity="0.95" />
            </linearGradient>

            {/* Brilho neon sutil (glow) */}
            <filter
              id="lineGlowFilter"
              x="-15%"
              y="-15%"
              width="130%"
              height="130%"
            >
              <feDropShadow
                dx="0"
                dy="0"
                stdDeviation="3"
                floodColor="#ffffff"
                floodOpacity="0.6"
              />
              <feDropShadow
                dx="0"
                dy="0"
                stdDeviation="8"
                floodColor="#3080ff"
                floodOpacity="0.3"
              />
            </filter>
          </defs>

          {/* 1. Guia tracejada estrutural com opacidade baixa no fundo */}
          <path
            d={dimensions.path}
            stroke="rgba(255, 255, 255, 0.07)"
            strokeWidth={1.5}
            strokeDasharray="4 4"
            fill="none"
          />

          {/* 2. Feixe de brilho aura difuso animado */}
          <motion.path
            d={dimensions.path}
            fill="none"
            stroke="url(#steppedLineGrad)"
            strokeWidth={4}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={0.35}
            filter="url(#lineGlowFilter)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration,
              ease: [0.16, 1, 0.3, 1]
            }}
          />

          {/* 3. Linha principal nítida e contínua desenhada do início ao fim */}
          <motion.path
            d={dimensions.path}
            fill="none"
            stroke="url(#steppedLineGrad)"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              pathLength: {
                duration,
                ease: [0.16, 1, 0.3, 1]
              },
              opacity: { duration: 0.15 }
            }}
            onAnimationComplete={() => setIsCompleted(true)}
          />

          {/* 4. Ponto terminal de início (Estratégia 01 - Mint #00d294) */}
          <g>
            <motion.circle
              cx={dimensions.start.x + 3}
              cy={dimensions.start.y}
              r={3}
              fill="#00d294"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.05 }}
            />
            <motion.circle
              cx={dimensions.start.x + 3}
              cy={dimensions.start.y}
              r={7}
              stroke="#00d294"
              strokeWidth={1}
              fill="none"
              initial={{ scale: 0.4, opacity: 0.8 }}
              animate={{ scale: 1.6, opacity: 0 }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: 'easeOut'
              }}
            />
          </g>

          {/* 5. Ponto terminal de chegada (Estratégia 02 - Âmbar #f99c00) */}
          <g>
            <motion.circle
              cx={dimensions.end.x - 3}
              cy={dimensions.end.y}
              r={3.5}
              fill="#f99c00"
              initial={{ scale: 0, opacity: 0 }}
              animate={
                isCompleted
                  ? { scale: [1, 1.3, 1], opacity: 1 }
                  : { scale: 0, opacity: 0 }
              }
              transition={{ duration: 0.4 }}
            />
            {isCompleted && (
              <motion.circle
                cx={dimensions.end.x - 3}
                cy={dimensions.end.y}
                r={8}
                stroke="#f99c00"
                strokeWidth={1}
                fill="none"
                initial={{ scale: 0.5, opacity: 0.9 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  ease: 'easeOut'
                }}
              />
            )}
          </g>
        </svg>
      )}
    </div>
  );
}
