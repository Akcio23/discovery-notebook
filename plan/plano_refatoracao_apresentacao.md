# Plano de Implementação: Refatoração da Apresentação (Modo Seção Única & Estética Clear/Futurista)

Este documento descreve o plano técnico e visual para refatorar a apresentação do **Discovery Notebook**, abandonando o formato de *Landing Page* de rolagem contínua e adotando uma arquitetura de **Apresentação Guiada (uma seção exibida por vez)**, estética **Clear (sem backgrounds sólidos nos cards)**, **bordas mais técnicas/quadradas** e **transições futuristas** entre as seções.

---

## 1. Resumo das 5 Diretrizes da Refatoração

1. **Fim da Landing Page (Exibição de 1 Seção por Vez)**:
   - A aplicação deixará de empilhar as 5 seções verticalmente na mesma página. Apenas a seção ativa será renderizada na tela por vez, funcionando como um *deck* interativo de alta precisão.
2. **Barra de Progresso Superior Global**:
   - Criação de uma barra de progresso contínua no topo da interface (`TopNav`), que avança proporcionalmente (`20%` → `40%` → `60%` → `80%` → `100%`) conforme o usuário percorre as 5 seções.
3. **Estética "Clear" (Remoção de Backgrounds dos Cards com Exceção do Hero da Imagem de Referência)**:
   - Remoção dos preenchimentos sólidos (`bg-[#111111]`, `bg-[#141414]`, `bg-[#181818]`) dos cards de conteúdo, deixando-os com fundo transparente (`bg-transparent`) estruturados apenas por linhas de borda finas (`border-[#212121]`) sobre o canvas `#090909`.
   - **Exceção preservada (conforme imagem de referência)**: O painel Hero da Seção 03 (`InspirationSection`) mantém sua composição original com o fundo de feixes luminosos SVG (*Polar Flow*), malha geométrica (`#polarGrid`), *glow* azulado, *pill* superior da equação `edicao_4k = fn(...)`, CTA branco de alto contraste e rodapé dividido em 4 colunas por linhas contínuas.
4. **Bordas Mais Quadradas (Não Completamente Retas)**:
   - Substituição dos raios exagerados (`rounded-2xl`, `rounded-xl`, `rounded-full`) por raios técnicos discretos (`rounded-md` de `6px` para cards/containers e `rounded` de `4px` para botões, filtros e tags).
5. **Animação Futurista na Transição entre Seções**:
   - Transição direcional utilizando `Framer Motion` combinando *desfoque óptico dinâmico* (`backdrop/filter blur`), *micro-escala* (`0.98` → `1`), *deslocamento no eixo X/Y*, *stagger* de elementos internos e um *feixe luminoso de scan* (`#3080ff`) no topo da seção ao alternar de tela.

---

## 2. Arquitetura de Navegação: De Landing Page para Seção Única

### 2.1. Refatoração do Hook `src/hooks/usePresentationNav.js`
- **Remoção do `IntersectionObserver` e `scrollIntoView`**: Como não haverá mais rolagem entre seções empilhadas, a navegação passa a ser controlada por estado de índice (`activeIndex` de `0` a `4`) e direção da transição (`direction`: `+1` ao avançar, `-1` ao retroceder).
- **Novos métodos exportados pelo hook**:
  - `activeSection`: ID da seção atual (`'contexto'`, `'modelos'`, `'filosofia'`, `'questionario'`, `'recomendacao'`).
  - `activeIndex`: Índice numérico atual (`0` a `4`).
  - `totalSections`: Total de seções (`5`).
  - `progressPercentage`: Progresso calculado (`((activeIndex + 1) / totalSections) * 100`).
  - `direction`: Direção do último movimento (`1` ou `-1`) para orientar a animação futurista do `AnimatePresence`.
  - `goToSection(sectionId)`: Calcula a direção comparando o índice de destino com o atual, atualiza `activeSection` e executa `window.scrollTo({ top: 0, behavior: 'instant' })`.
  - `nextSection()` e `prevSection()`: Avança ou retorna uma seção com segurança de limites.

### 2.2. Refatoração de `src/App.jsx`
- **Renderização Condicional Exclusiva**:
  - Em vez de renderizar `<ProblemSection />`, `<ModelsOverviewSection />`, `<InspirationSection />`, `<QuizSection />` e `<ResultsAndCatalogSection />` simultaneamente no `<main>`, será criada uma função/mapa `renderActiveSection()` envolvida por `<AnimatePresence mode="wait" custom={direction}>`.
- **Barra de Navegação de Rodapé da Seção (Step Controls)**:
  - Adição de um controle minimalista na base da visualização ("`← Seção Anterior`" e "`Próxima Seção: [Nome] →`") para permitir avançar linearmente pela apresentação sem precisar subir o mouse até o `TopNav`.
- **Remoção do `SectionProgress.jsx` lateral**:
  - O indicador de pontos na lateral direita será descontinuado, pois todo o feedback de progresso passará a residir na nova **Barra de Progresso Superior**.

---

## 3. Barra de Progresso Superior (`src/components/layout/TopNav.jsx`)

1. **Trilho de Progresso no Topo/Base do Header Fixo**:
   - Na base do `TopNav` (`border-b border-[#181818]`), será adicionada uma barra de progresso de largura total (`w-full h-[2px] bg-[#141414] overflow-hidden`).
   - O preenchimento interno será um `<motion.div>` animado com `animate={{ width: `${progressPercentage}%` }}` e transição suave (`cubic-bezier(0.22, 1, 0.36, 1)`).
   - **Estética Futurista da Barra**:
     - Gradiente linear `bg-gradient-to-r from-[#3080ff]/60 via-[#3080ff] to-white` com um ponto de brilho na extremidade direita (`shadow-[0_0_12px_#3080ff]`).
2. **Indicador de Etapas no Header**:
   - Os botões numerados (`01` a `05`) no `TopNav` indicarão três estados visuais:
     - **Concluída (`idx < activeIndex`)**: Índice em azul/verde sutil (`text-[#3080ff]`) e texto claro, indicando que a etapa já foi percorrida.
     - **Ativa (`idx === activeIndex`)**: Borda ativa (`border-[#292929]`), indicador luminoso e texto branco.
     - **Pendente (`idx > activeIndex`)**: Texto em tom neutro (`text-[#757575]`).
   - Em telas menores (onde a lista de seções colapsa), exibição do contador `ETAPA 0X / 05`.

---

## 4. Remoção dos Backgrounds dos Cards (Estética Clear) & Exceções

A diretriz central é eliminar os blocos cinza-escuros (`bg-[#111111]`, `bg-[#141414]`, `bg-[#181818]`) que criam peso visual, adotando **transparência (`bg-transparent`) delimitada apenas por bordas técnicas (`border-[#212121]`)**.

### 4.1. Onde o Background SERÁ REMOVIDO (`bg-transparent`)
| Componente / Arquivo | Estado Atual | Novo Estado ("Clear") |
| :--- | :--- | :--- |
| **`ProblemSection.jsx`** (Faixa de Escopo e 2 Cards de Estratégia) | `bg-[#111111]/60` e `bg-[#111111] hover:bg-[#141414]` | `bg-transparent` com `border-[#212121] hover:border-[#3a3a3a] hover:bg-white/[0.015]` |
| **`NotebookSummaryCard.jsx`** (Cards dos 10 Modelos + Tags internas) | Card `bg-[#111111]`, tags `bg-[#090909]` e badges `bg-[#181818]` | Card `bg-transparent`, tags `bg-transparent border-[#212121]` e hover sutil na borda (`hover:border-[#3a3a3a]`) |
| **`QuizProgressBar.jsx` & `QuestionCard.jsx`** | Containers `bg-[#111111]`, opções `bg-[#090909]` / `bg-[#181818]` | Containers `bg-transparent border-[#212121]`; opções `bg-transparent` e opção selecionada com `border-white bg-white/[0.03]` |
| **`ResultsAndCatalogSection.jsx`** (Barra de abas, Card Vencedor, Quadro de Preço, Motivos de Match) | `bg-[#111111]` e sub-blocos `bg-[#090909]` | `bg-transparent` com divisórias e contornos `border-[#212121]` (destaque do vencedor feito via borda `border-[#3080ff]/50`) |
| **`NotebookDetailView.jsx` & `StrategyDetailModal.jsx`** | Múltiplas caixas internas com `bg-[#111111]` | Sub-cards de especificações, preços e análises com `bg-transparent border-[#212121]` |

### 4.2. Onde o Background SERÁ MANTIDO (Conforme Imagem de Referência)
1. **Hero Visual da Seção 03 (`src/components/sections/InspirationSection.jsx`)**:
   - Mantém fielmente o visual da imagem enviada:
     - Container com `bg-[#090909]` e arte generativa SVG (`#polarGrid`, `#polarGlow` azulado e feixes curvos `#polarBeamPrimary`).
     - A *pill* superior da fórmula (`edicao_4k = fn(GPU_TGP, RAM_32GB, sRGB_100, PESO_KG)`) mantém fundo escuro translúcido (`bg-[#111111]/90`) e borda fina.
     - O botão CTA principal (**"Iniciar Diagnóstico (6 Perguntas)"**) mantém o fundo branco sólido (`bg-white text-[#090909]`) para contraste focal máximo.
     - O rodapé de 4 colunas (`01 · GPU TGP`, `02 · RAM 32 GB`, `03 · FIDELIDADE 100% SRGB`, `04 · PESO`) mantém a estrutura integrada na base do Hero separada apenas por linhas de grade (`border-t` e `border-r border-[#212121]`).
2. **Botões Primários de Ação (CTAs de Avanço)** e **Overlay do Modal (`BaseModal.jsx`)**:
   - CTAs principais mantêm `bg-white text-[#090909]` (ou `bg-[#3080ff] text-white` na finalização do Quiz).
   - O container flutuante do modal mantém `bg-[#090909]/95 backdrop-blur-xl` para não misturar o texto do modal com a seção ao fundo, mas todos os cards internos do modal ficam `bg-transparent`.

---

## 5. Padronização de Bordas Mais Quadradas (Design System)

Revisão global das classes de `border-radius` do Tailwind CSS em todos os componentes para eliminar o aspecto excessivamente arredondado ("balão/pílula") e adotar um corte mais técnico e arquitetônico:

| Elemento de Interface | Classe Atual | Nova Classe | Raio Equivalente |
| :--- | :--- | :--- | :--- |
| **Containers Principais, Cards de Modelos, Estratégias, Quiz e Modais** | `rounded-2xl` / `rounded-xl` | **`rounded-md`** | `6px` (levemente quadrado, sem quina viva) |
| **Sub-blocos Internos (Specs, Quadro de Preços, Opções do Quiz, Abas)** | `rounded-xl` | **`rounded`** | `4px` |
| **Botões de Ação, Filtros Rápidos e Navegação (`TopNav`)** | `rounded-full` | **`rounded`** ou **`rounded-md`** | `4px` – `6px` |
| **Badges e Tags Técnicas (`GPU`, `RAM`, `Peso`, `% Match`)** | `rounded-full` / `rounded-md` | **`rounded-sm`** ou **`rounded`** | `2px` – `4px` |
| **Exceção da Imagem de Referência (`InspirationSection`)** | `rounded-full` no badge da equação e botão branco do Hero | Mantido no Hero da Seção 03 (ou ajustado suavemente para `rounded-md` no container externo) | Fiel à referência enviada |

---

## 6. Animação Futurista na Transição entre Seções

Para criar uma sensação genuinamente futurista (estilo interface *HUD / Sci-Fi Engenharia*) quando o usuário passa de uma seção para outra, será criado um componente wrapper `SectionTransition.jsx` (ou integrado ao `SectionContainer.jsx`) usando `framer-motion`:

### 6.1. Coreografia da Transição (`AnimatePresence mode="wait"`)
1. **Efeito Óptico Direcional (Motion + Blur + Scale)**:
   - **Variante `enter(direction)`**:
     - `opacity: 0`
     - `x: direction > 0 ? 48 : -48` (desliza no sentido do progresso)
     - `scale: 0.985`
     - `filter: 'blur(10px)'`
   - **Variante `center`**:
     - `opacity: 1`
     - `x: 0`
     - `scale: 1`
     - `filter: 'blur(0px)'`
     - `transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.06 }`
   - **Variante `exit(direction)`**:
     - `opacity: 0`
     - `x: direction > 0 ? -48 : 48`
     - `scale: 0.985`
     - `filter: 'blur(8px)'`
     - `transition: { duration: 0.28, ease: [0.4, 0, 1, 1] }`

2. **Varredura de Luz (Futuristic Scanline Sweep)**:
   - Ao montar uma nova seção, uma linha horizontal luminosa (`h-[1px] w-full bg-gradient-to-r from-transparent via-[#3080ff] to-transparent`) percorre ou pulsa na borda superior do cabeçalho da seção (`initial={{ scaleX: 0, opacity: 0.9 }} animate={{ scaleX: 1, opacity: 0 }} transition={{ duration: 0.7, ease: 'easeOut' }}`), reforçando a sensação de "carregamento de telemetria".

3. **Entrada em Cascata (*Staggered Reveal*)**:
   - Dentro de cada seção, o cabeçalho (`indexLabel`, `title`, `subtitle`) e o bloco de dados entram com um micro-escalonamento vertical (`y: 14 -> 0`, `opacity: 0 -> 1`), dando a sensação de que os módulos de dados estão sendo projetados na tela em tempo real.

---

## 7. Roteiro Passo a Passo de Execução (Arquivos Impactados)

1. **`src/hooks/usePresentationNav.js`**:
   - Substituir a lógica de scroll/observer pela máquina de estados de apresentação (`activeSection`, `activeIndex`, `direction`, `progressPercentage`, `goToSection`, `nextSection`, `prevSection`).
2. **`src/components/layout/TopNav.jsx`**:
   - Adicionar a **Barra de Progresso Global** animada no topo/base do header.
   - Atualizar o estilo dos botões de seção para bordas `rounded` (`4px`), indicar etapas concluídas vs. etapa atual e remover fundos pesados.
3. **`src/components/layout/SectionContainer.jsx`**:
   - Incorporar as animações futuristas do `framer-motion` (transição com *blur*, *scale*, deslocamento direcional e *scanline* luminosa).
   - Ajustar o padding vertical para o modo de visualização única (`min-h-[calc(100vh-4rem)] py-12 lg:py-16`) e incluir a barra inferior de navegação entre seções (`Anterior` / `Próxima Seção`).
4. **`src/App.jsx`**:
   - Substituir a renderização empilhada por `<AnimatePresence mode="wait" custom={direction}>` exibindo exclusivamente a seção ativa.
   - Remover o `<SectionProgress />` lateral.
5. **Refatoração Visual ("Clear" + Bordas `rounded-md` / `rounded`) nos Componentes**:
   - `src/components/sections/ProblemSection.jsx`: remover `bg-[#111111]` da faixa de escopo e dos cards de estratégia; aplicar `rounded-md`.
   - `src/components/sections/ModelsOverviewSection.jsx` & `src/components/notebooks/NotebookSummaryCard.jsx`: remover `bg-[#111111]` e `bg-[#090909]` dos cards e tags; trocar `rounded-2xl` e `rounded-full` por `rounded-md` e `rounded`.
   - `src/components/sections/InspirationSection.jsx`: preservar o background generativo Polar Flow e a estrutura dos 4 pilares conforme a imagem de referência, ajustando o raio externo para `rounded-md`.
   - `src/components/sections/QuizSection.jsx`, `src/components/quiz/QuizProgressBar.jsx` & `src/components/quiz/QuestionCard.jsx`: remover fundos cinzas dos cards de pergunta e barra de progresso; aplicar bordas `rounded-md` e `rounded`.
   - `src/components/sections/ResultsAndCatalogSection.jsx`: aplicar `bg-transparent` no card executivo do vencedor, quadros de preço e abas; atualizar bordas para `rounded-md` e `rounded`.
   - `src/components/modals/BaseModal.jsx`, `src/components/modals/StrategyDetailModal.jsx` & `src/components/notebooks/NotebookDetailView.jsx`: atualizar o raio do modal para `rounded-md` e tornar todos os sub-cards internos transparentes (`bg-transparent`).
6. **Validação e Build**:
   - Testar a navegação passo a passo entre as 5 seções, verificar a fluidez da barra de progresso superior, inspecionar a abertura de modais em cada etapa e validar com `npm run build`.
