# Plano de Implementação: Refatoração dos 5 Capítulos (Viewport Única / Zero Scroll)

Este documento descreve o plano de engenharia e UI/UX para refatorar os **5 capítulos** do **Discovery Notebook**, garantindo que **cada capítulo caiba integralmente em uma única tela (`100vh`) sem necessidade de rolagem vertical (Zero Scroll)**, aprofundando o minimalismo visual e utilizando modais sob demanda para detalhes densos e para o questionário interativo.

---

## 1. Arquitetura Global de Viewport Única (`src/App.jsx` & `src/components/layout/SectionContainer.jsx`)

Para que todos os capítulos caibam em uma única tela sem scroll em resoluções desktop padrão (`1366x768` e `1920x1080`):

1. **Shell Principal de Altura Fixa (`src/App.jsx`)**:
   - Alterar o container raiz de `min-h-screen` para `h-screen overflow-hidden flex flex-col justify-between bg-[#090909]` em telas desktop (`lg:h-screen lg:overflow-hidden`), mantendo `overflow-y-auto` apenas como *fallback* seguro em telas móveis muito pequenas.
   - Compactar a barra de navegação inferior entre capítulos e unificá-la ao rodapé em uma única barra inferior enxuta (`h-14`), liberando ~110px de altura útil para o conteúdo central.
2. **Container de Capítulo Compacto (`src/components/layout/SectionContainer.jsx`)**:
   - Reduzir os espaçamentos verticais excessivos (`py-12 lg:py-16` e `mb-12 pb-8`) para um layout de *slide* (`py-4 lg:py-6`, cabeçalho com `mb-5 pb-4`).
   - Remover a linha divisória inferior do cabeçalho quando solicitado (ex.: Capítulo 1 sem bordas) através de uma prop `borderless={true}`.
   - Tipografia de cabeçalho mais concisa: título em `text-2xl sm:text-3xl` e subtítulo enxuto em 1 linha (`line-clamp-1` ou `max-w-3xl text-xs sm:text-sm`).

---

## 2. Refatoração Capítulo a Capítulo

### Capítulo 01 — Overview Executivo (`src/components/sections/ProblemSection.jsx`)

**Objetivo:** Caber 100% em uma tela sem scroll, **remover todas as linhas nas bordas (`border`)**, deixar **tudo com um fundo só (`#090909`)** e **resumir as informações** para entregar apenas um *overview* rápido ao usuário.

#### Mudanças Planejadas:
1. **Fundo Único & Zero Bordas Estruturais**:
   - Remover os contornos `border border-[#212121]` e divisórias internas (`border-t`, `h-8 w-[1px]`) da faixa de escopo e dos cards de estratégia.
   - Toda a tela utilizará o fundo contínuo `#090909`, diferenciando blocos apenas por **tipografia, alinhamento espacial (grid) e hierarquia de cores** (`text-white`, `text-[#858585]`, `text-[#00d294]`, `text-[#f99c00]`).
2. **Síntese Editorial (Apenas Overview)**:
   - **Cabeçalho Resumido**:
     - Título curto: *"Panorama do Mercado até R$ 10.000"*
     - Resumo de 1 frase: *"Para editar em 4K e modelar em 3D sem gargalos, 32 GB de RAM são indispensáveis. Existem apenas 2 caminhos viáveis no Brasil."*
   - **Indicadores-Chave em Linha (KPIs sem borda)**:
     - 3 métricas limpas lado a lado usando fonte `Geist Mono`:
       1. `ALVO PRIMÁRIO`: **Edição 4K (Premiere / Resolve)**
       2. `ALVO SECUNDÁRIO`: **3D & Render (Blender / RTX)**
       3. `TETO DE ORÇAMENTO`: **R$ 10.000 (Garantia Brasil)**
   - **As 2 Estratégias Resumidas (Sem caixas/bordas)**:
     - Duas colunas limpas sobre o mesmo fundo `#090909`:
       - **01 · 32 GB de Fábrica (3 modelos | R$ 7.200 – R$ 10.600)**: Resumo de 1 linha (*"Prontos para uso imediato sem abrir o notebook"*). Link sutil `Ver detalhes →` que abre o `StrategyDetailModal`.
       - **02 · Upgrade +16 GB DDR5 (6 modelos | +R$ 800 médios)**: Resumo de 1 linha (*"Compra de modelo 16 GB com RTX 4060 Plena + pente extra mantendo a garantia"*). Link sutil `Ver detalhes →` que abre o `StrategyDetailModal`.

---

### Capítulo 02 — Lista Compacta de Modelos (`src/components/sections/ModelsOverviewSection.jsx`)

**Objetivo:** Nova apresentação em lista/grid denso com **mais cards por linha**, exibindo **apenas o nome e o preço de cada notebook**, cabendo todos os 10 modelos na mesma tela sem scroll. Ao clicar em qualquer item, abre-se o `NotebookDetailModal` com todos os dados.

#### Mudanças Planejadas:
1. **Mais Cards por Linha (Grid de Alta Densidade)**:
   - Alterar o grid de `md:grid-cols-2` para **`grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5`** (2 linhas de 5 cards em desktop = 10 modelos visíveis instantaneamente) ou lista multi-coluna compacta (`gap-3`).
2. **Card Minimalista Exclusivo (Nome + Preço)**:
   - Criar uma variante compacta (ou refatorar o card da Seção 02) exibindo **exclusivamente**:
     - Índice discreto no topo (`#01` a `#10`) + ícone sutil de seta (`↗`) no hover.
     - **Nome do Notebook** (`notebook.name`, ex.: *Lenovo Legion Slim 5 16*).
     - **Preço** (`R$ 7.699 – R$ 9.200` em `Geist Mono`).
   - Remover do card desta seção: descrição longa, código SKU, tags de GPU/RAM/Peso e rodapé duplo.
3. **Consulta Completa via Modal**:
   - O clique em qualquer um dos 10 cards aciona imediatamente `onInspectNotebook(notebook)`, abrindo o `NotebookDetailModal` com todas as especificações, análise de vídeo 4K/3D, alerta de variantes e comparativo de upgrade.
4. **Barra de Filtro Enxuta**:
   - Manter os filtros rápidos em tamanho compacto (`py-1 px-3 text-[11px]`) na mesma linha do cabeçalho para economizar altura vertical.

---

### Capítulo 03 — Filosofia e Equação Técnica em 1 Tela (`src/components/sections/InspirationSection.jsx`)

**Objetivo:** Rever e enxugar as informações para que **tudo caiba em apenas uma tela sem precisar de scroll**, preservando a identidade visual Polar Flow.

#### Mudanças Planejadas:
1. **Unificação do Cabeçalho ao Painel Principal**:
   - Atualmente, o Capítulo 03 possui um cabeçalho grande no `SectionContainer` **mais** um grande painel Hero com `min-h-[360px]` **mais** uma grade inferior de 4 colunas, totalizando ~780px de altura (o que gera scroll).
   - **Solução**: Compactar o cabeçalho superior e reduzir a altura do container visual Polar Flow de `aspect-[21/9] min-h-[360px]` para uma altura controlada (`h-[220px] lg:h-[250px]`, padding `p-6 sm:p-8`).
2. **Síntese Textual dos 4 Pilares Técnicos**:
   - Manter a faixa inferior de 4 colunas integrada ao painel, mas com padding reduzido (`p-4` em vez de `p-6`) e textos de 1 linha direta:
     - **01 · GPU TGP**: *75W vs 140W definem o tempo real de render no Blender.*
     - **02 · RAM 32 GB**: *Essencial para timeline 4K fluida sem swap de disco.*
     - **03 · TELA 100% sRGB**: *Fidelidade de cor nativa vs. uso de monitor externo.*
     - **04 · PESO (1,5 a 2,8 kg)**: *Equilíbrio entre mochila diária e dissipação térmica.*

---

### Capítulo 04 — Gatilho Limpo + Questionário em Modal Futurista (`src/components/sections/QuizSection.jsx` & `src/components/modals/FuturisticQuizModal.jsx`)

**Objetivo:** Evitar qualquer necessidade de scroll para responder ao questionário, movendo a experiência de perguntas para **um Modal com animação futurista ao ser aberto**, enquanto a tela do Capítulo 04 funciona como uma central limpa de lançamento e status do diagnóstico.

#### Mudanças Planejadas:
1. **Tela Principal do Capítulo 04 (Zero Scroll)**:
   - Exibe uma visão geral limpa e centralizada do Diagnóstico Interativo:
     - Contador visual das 6 dimensões avaliadas (Orçamento, Uso Principal, Tela, Mobilidade, Upgrade de RAM e Armazenamento) em uma grade compacta de status (mostrando quais perguntas já foram respondidas ou estão pendentes).
     - Botão principal de destaque no centro: **"Iniciar Questionário Interativo (6 Perguntas)"** (ou *"Continuar Questionário"* / *"Revisar Respostas"* caso já iniciado), além de atalho para **"Ver Recomendação Atual"**.
2. **Novo Componente: `src/components/modals/FuturisticQuizModal.jsx`**:
   - Ao clicar para responder (ou ao acionar o quiz a partir de qualquer capítulo), abre-se um **Modal Futurista dedicado** sem qualquer scroll na página de fundo.
   - **Animação Futurista de Abertura (`Framer Motion`)**:
     - **Backdrop HUD**: Escurecimento com `backdrop-blur-xl` e malha técnica sutil ao fundo.
     - **Coreografia de Entrada do Modal**:
       - Expansão óptica com efeito de *scanline laser* horizontal (`#3080ff` → `white`) percorrendo o modal de cima a baixo na abertura.
       - Transição combinando escala (`scale: 0.92 -> 1`), abertura de corte (`clipPath` ou `filter: blur(12px) -> blur(0px)`) e cantoneiras técnicas luminosas (*HUD corners*) nos 4 cantos do modal.
     - **Transição Interna entre as 6 Perguntas**:
       - Barra de telemetria compacta no topo (`01/06` a `06/06`), opções enxutas com atalhos de teclado (`1`, `2`, `3`, `Enter`, `Backspace`) e avanço automático opcional ou via botão.
     - Ao concluir a 6ª pergunta no modal, o modal fecha com animação de confirmação e leva o usuário diretamente para o **Capítulo 05 (Modelo Vencedor)**.

---

### Capítulo 05 — Foco Exclusivo no Modelo Vencedor + 2 Semelhantes Minimalistas (`src/components/sections/ResultsAndCatalogSection.jsx`)

**Objetivo:** Alterar o conteúdo do capítulo para apresentar **apenas o Modelo Vencedor** em destaque e **duas opções semelhantes de forma bem minimalista**, eliminando abas complexas e listas longas que geravam scroll.

#### Mudanças Planejadas:
1. **Remoção do Sistema de Abas ("Catálogo Completo") da Seção 05**:
   - Como o Capítulo 02 agora já cumpre o papel de exibir todos os 10 modelos em uma única tela sem scroll, a aba "Catálogo Completo (10)" no Capítulo 05 torna-se redundante e será removida.
   - O Capítulo 05 passa a ser 100% focado no **Veredito Final**.
2. **Bloco Principal: O Modelo Vencedor (`winner`) Compacto**:
   - Card executivo dimensionado para caber confortavelmente na metade superior da tela:
     - Badge de compatibilidade (`#01 Recomendado` + `% Compatível` se o quiz foi respondido).
     - Nome do modelo vencedor, faixa de preço (fábrica vs. com 32 GB) e resumo direto de 3 especificações-chave (`CPU`, `GPU`, `Tela/Peso`).
     - Até 3 motivos curtos em linha explicando por que ele venceu.
     - Botão primário **"Abrir Ficha Técnica Completa"** (abre o `NotebookDetailModal`) e botão secundário **"Refazer Questionário"** (abre o `FuturisticQuizModal`).
3. **Bloco Inferior: 2 Opções Semelhantes Ultra-Minimalistas (`runnerUp` e `thirdPlace`)**:
   - Abaixo do vencedor, uma seção discreta intitulada **"Opções Semelhantes"** com apenas 2 cards horizontais super enxutos (1 linha por card em grid de 2 colunas):
     - Exibe apenas: **Posição (`2ª Opção` / `3ª Opção`)**, **Nome do Notebook**, **Faixa de Preço** e ação **`Ver detalhes ↗`** (que abre o `NotebookDetailModal`).
     - Sem parágrafos descritivos, sem blocos de tags múltiplas e sem divisórias pesadas, garantindo que o Capítulo 05 inteiro caiba com folga em uma única tela (`100vh`) sem scroll.

---

## 3. Resumo dos Arquivos a Serem Criados / Modificados

| Arquivo | Ação | Descrição Resumida |
| :--- | :--- | :--- |
| `src/App.jsx` | Modificar | Travar layout em viewport única (`lg:h-screen lg:overflow-hidden`), compactar rodapé/navegação inferior e gerenciar estado global do `FuturisticQuizModal`. |
| `src/components/layout/SectionContainer.jsx` | Modificar | Reduzir paddings verticais para caber em `100vh` sem scroll e suportar modo `borderless` (para o Capítulo 1). |
| `src/components/sections/ProblemSection.jsx` | Modificar | **Capítulo 1**: Remover todas as bordas, unificar fundo `#090909` e resumir textos para apenas o overview executivo. |
| `src/components/sections/ModelsOverviewSection.jsx` | Modificar | **Capítulo 2**: Grid de 5 colunas (2 linhas = 10 modelos na tela) exibindo apenas Nome e Preço; clique abre `NotebookDetailModal`. |
| `src/components/sections/InspirationSection.jsx` | Modificar | **Capítulo 3**: Compactar altura do Hero SVG e sintetizar os 4 pilares para caber 100% em uma tela sem scroll. |
| `src/components/sections/QuizSection.jsx` | Modificar | **Capítulo 4**: Transformar a seção em um painel de visão geral sem scroll que aciona o questionário em modal. |
| `src/components/modals/FuturisticQuizModal.jsx` | Criar | **Modal do Capítulo 4**: Modal com animação futurista (*scanline*, *blur*, cantoneiras HUD e progresso de telemetria) contendo as 6 perguntas. |
| `src/components/sections/ResultsAndCatalogSection.jsx` | Modificar | **Capítulo 5**: Remover aba de catálogo e exibir apenas o Modelo Vencedor + 2 opções semelhantes ultra-minimalistas sem scroll. |

---

## 4. Critérios de Aceite e Validação

1. **Zero Scroll em Todos os 5 Capítulos**: Em uma janela desktop padrão (`1366x768` ou `1920x1080`), nenhuma das 5 seções deve gerar barra de rolagem vertical na página principal.
2. **Capítulo 1 Limpo**: Nenhuma linha de borda nos blocos de conteúdo, fundo único contínuo e leitura rápida em menos de 10 segundos.
3. **Capítulo 2 Denso e Direto**: Todos os 10 notebooks visíveis simultaneamente com apenas Nome e Preço, abrindo o modal completo ao clicar.
4. **Capítulo 3 Compacto**: Arte Polar Flow + 4 pilares visíveis integralmente na mesma tela.
5. **Capítulo 4 com Modal Futurista**: Abertura fluida com animação sci-fi/HUD, atalhos de teclado preservados (`1-3`, `Enter`, `Backspace`) e zero scroll na página.
6. **Capítulo 5 Focado**: Apenas 1 vencedor em destaque + 2 alternativas minimalistas (nome, preço e gatilho de modal).
