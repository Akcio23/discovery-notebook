import React from 'react';
import { SectionContainer } from '../layout/SectionContainer';
import { ArrowRight } from 'lucide-react';

export function InspirationSection({ onProceedToQuiz, chapterNav }) {
  return (
    <SectionContainer
      id="filosofia"
      title="A Engenharia por Trás de uma Timeline 4K"
      subtitle="Equilíbrio entre potência elétrica da GPU (TGP), RAM de 32 GB, fidelidade de cor e peso."
      chapterNav={chapterNav}
    >
      {/* Hero Visual Compacto (Cabe integralmente em 1 tela sem scroll) */}
      <div className="relative overflow-hidden rounded-md border border-[#212121] bg-[#090909]">
        <div className="relative w-full flex flex-col justify-between p-6 sm:p-8 lg:p-9">
          {/* Arte Generativa SVG de Feixes Luminosos Monocromáticos (Estilo Polar Flow) */}
          <svg
            aria-hidden="true"
            viewBox="0 0 1400 420"
            fill="none"
            preserveAspectRatio="xMidYMid slice"
            className="pointer-events-none absolute inset-0 h-full w-full opacity-90"
          >
            <defs>
              <radialGradient id="polarGlow" cx="65%" cy="45%" r="60%">
                <stop offset="0%" stopColor="#3080ff" stopOpacity="0.24" />
                <stop offset="45%" stopColor="#ffffff" stopOpacity="0.06" />
                <stop offset="100%" stopColor="#090909" stopOpacity="0" />
              </radialGradient>
              <linearGradient
                id="polarBeamPrimary"
                x1="0"
                y1="390"
                x2="1400"
                y2="50"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#212121" stopOpacity="0" />
                <stop offset="35%" stopColor="#ffffff" stopOpacity="0.45" />
                <stop offset="70%" stopColor="#3080ff" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#090909" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="polarBeamSecondary"
                x1="100"
                y1="420"
                x2="1300"
                y2="0"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#181818" stopOpacity="0" />
                <stop offset="50%" stopColor="#d9d9d9" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#181818" stopOpacity="0" />
              </linearGradient>
              <pattern
                id="polarGrid"
                width="48"
                height="48"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 48 0 L 0 0 0 48"
                  fill="none"
                  stroke="#181818"
                  strokeWidth="1"
                />
              </pattern>
            </defs>

            <rect width="1400" height="420" fill="url(#polarGrid)" opacity="0.65" />
            <ellipse cx="900" cy="200" rx="640" ry="220" fill="url(#polarGlow)" />

            {Array.from({ length: 14 }).map((_, idx) => {
              const offset = idx * 14;
              return (
                <path
                  key={idx}
                  d={`M -120 ${380 - offset * 0.6} C ${340 + offset} ${90 + offset * 0.5}, ${820 - offset * 0.5} ${340 - offset * 0.8}, 1520 ${50 + offset * 0.7}`}
                  stroke={
                    idx % 4 === 0
                      ? 'url(#polarBeamPrimary)'
                      : 'url(#polarBeamSecondary)'
                  }
                  strokeWidth={idx === 4 ? '1.6' : '0.9'}
                  opacity={Math.max(0.15, 0.9 - idx * 0.05)}
                />
              );
            })}
          </svg>

          {/* Topo do Hero: Equação em Geist Mono */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
            <span className="inline-flex items-center rounded border border-[#292929] bg-[#111111]/90 px-3.5 py-1 font-mono text-xs text-[#d9d9d9] backdrop-blur-md">
              edicao_4k = fn(GPU_TGP, RAM_32GB, sRGB_100, PESO_KG)
            </span>

            <span className="font-mono text-[11px] uppercase tracking-widest text-[#757575]">
              4 PILARES · 6 VARIÁVEIS NO QUIZ
            </span>
          </div>

          {/* Centro do Hero Enxuto */}
          <div className="relative z-10 mt-6 max-w-2xl">
            <h3 className="text-2xl font-medium tracking-tight text-white sm:text-3xl leading-snug">
              Hardware sem gargalos ocultos para vídeo 4K e 3D.
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-[#c9c9c9] sm:text-sm">
              Duas &ldquo;RTX 4060&rdquo; no mercado variam de 75W a 140W; duas telas Full HD, de 60% a 100% sRGB. Nosso motor cruza potência, RAM de 32 GB, fidelidade de cor e mobilidade para apontar o vencedor.
            </p>
          </div>
        </div>

        {/* Rodapé Minimalista com os 4 Pilares Sintetizados */}
        <div className="grid grid-cols-1 border-t border-[#212121] bg-transparent sm:grid-cols-2 lg:grid-cols-4">
          <div className="border-b border-[#212121] p-4 sm:border-r lg:border-b-0">
            <span className="font-mono text-[11px] font-medium uppercase text-[#3080ff]">
              01 · GPU TGP (75W vs 140W)
            </span>
            <p className="mt-1 text-xs leading-relaxed text-[#9e9e9e]">
              Renders no Blender Cycles escalam direto com a potência sustentada.
            </p>
          </div>

          <div className="border-b border-[#212121] p-4 lg:border-r lg:border-b-0">
            <span className="font-mono text-[11px] font-medium uppercase text-[#00d294]">
              02 · RAM 32 GB (Fábrica vs Upgrade)
            </span>
            <p className="mt-1 text-xs leading-relaxed text-[#9e9e9e]">
              Evita travamentos em 4K; comparamos 32 GB nativos vs. upgrade (+R$ 800).
            </p>
          </div>

          <div className="border-b border-[#212121] p-4 sm:border-r sm:border-b-0">
            <span className="font-mono text-[11px] font-medium uppercase text-[#f99c00]">
              03 · Fidelidade 100% sRGB / P3
            </span>
            <p className="mt-1 text-xs leading-relaxed text-[#9e9e9e]">
              Painéis calibrados para color grading vs. economia com monitor externo.
            </p>
          </div>

          <div className="p-4">
            <span className="font-mono text-[11px] font-medium uppercase text-white">
              04 · Peso (1,51 kg a 2,81 kg)
            </span>
            <p className="mt-1 text-xs leading-relaxed text-[#9e9e9e]">
              Mobilidade leve na mochila vs. refrigeração robusta em bancada fixa.
            </p>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
