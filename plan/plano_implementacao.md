# Plano de Implementação: Guia Interativo de Notebooks para Edição de Vídeo (Até R$ 10.000)

Este documento descreve o plano arquitetural e técnico consolidado para a construção de uma aplicação web desktop em formato de apresentação interativa, baseada exclusivamente nos dados de `data/pesquisa_notebooks.md` e na identidade visual editorial de `https://polar.sh/company`.

---

## 0. Stack Tecnológica e Justificativa de Bibliotecas

- **React 19 + JavaScript (ES6+ / JSX) + Vite 6**: Stack base solicitada para desenvolvimento rápido em módulos ES nativos sem sobrecarga de tipagem estática.
- **Tailwind CSS v4 (`@tailwindcss/vite`)**: Permite mapear diretamente os design tokens extraídos do CSS da Polar (`--color-polar-*`, tipografia e espaçamentos) em classes utilitárias de rápida manutenção.
- **Framer Motion (`motion`)**: Viabiliza transições suaves entre seções, animações de entrada das 6 perguntas do questionário (`AnimatePresence`) e barras de progresso fluidas.
- **Radix UI Primitives (`@radix-ui/react-tabs`, `@radix-ui/react-dialog`, `@radix-ui/react-radio-group`)**: Fornece componentes acessíveis sem estilo prévio (base do `shadcn/ui`) com suporte nativo a foco e navegação por teclado (setas, `Tab`, `Enter`, `Esc`).
- **Lucide React (`lucide-react`)**: Conjunto de ícones minimalistas de traço fino (`1.5px`) utilizado na própria interface da Polar para indicadores técnicos (CPU, GPU, RAM, tela, peso e setas).
- **clsx + tailwind-merge**: Utilitários leves para composição condicional de classes CSS nos estados ativos/selecionados de cards e botões.

---

## 1. Estrutura de Pastas do Projeto

```text
discorvery-notebook/
├── data/
│   └── pesquisa_notebooks.md            # Fonte única da verdade (original)
├── plan/
│   └── plano_implementacao.md           # Este documento de plano de implementação
├── public/
│   ├── fonts/                           # Fontes locais (Inter Display, Geist Mono)
│   └── assets/
│       ├── inspiration/                 # Arte generativa/abstrata estilo Polar Flow
│       └── notebooks/                   # Silhuetas/wireframes técnicos dos chassis
├── src/
│   ├── data/
│   │   ├── notebooks.json               # Os 10 modelos estruturados a partir da pesquisa
│   │   ├── marketDiagnosis.json         # Dados do diagnóstico (32 GB fábrica vs. upgrade)
│   │   └── questions.js                 # Definição das 6 perguntas, opções e pesos
│   ├── components/
│   │   ├── layout/
│   │   │   ├── TopNav.jsx               # Barra superior fixa c/ âncoras de seções e atalho "Outros Modelos"
│   │   │   ├── SectionContainer.jsx     # Wrapper desktop (1280px+, min-h-screen, rolagem fluida)
│   │   │   └── SectionProgress.jsx      # Indicador de progresso da apresentação na barra/lateral
│   │   ├── sections/
│   │   │   ├── ProblemSection.jsx       # Seção 1: Situação-problema e diagnóstico do mercado BR
│   │   │   ├── ModelsOverviewSection.jsx# Seção 2: Análise resumida dos 10 modelos e destaques
│   │   │   ├── InspirationSection.jsx   # Seção 3: Hero visual minimalista inspirado na Polar
│   │   │   ├── QuizSection.jsx          # Seção 4: Questionário interativo (6 perguntas, 1 por tela)
│   │   │   └── ResultsAndCatalogSection.jsx # Seções 5 e 6: Aba "Recomendação" e Aba "Outros Modelos"
│   │   ├── quiz/
│   │   │   ├── QuizProgressBar.jsx      # Barra de progresso contínua + contador 01/06 em Geist Mono
│   │   │   └── QuestionCard.jsx         # Card de pergunta com opções selecionáveis por clique/teclado
│   │   └── notebooks/
│   │       ├── NotebookSummaryCard.jsx  # Card enxuto usado na Seção 2
│   │       ├── NotebookDetailView.jsx   # Visão completa (specs, preço, upgrade 32GB, alertas, prós/contras)
│   │       ├── VariantWarningBanner.jsx # Alerta discreto para modelos com dupla variante na pesquisa
│   │       └── UpgradeBadge.jsx         # Tag indicando "32 GB de Fábrica" vs "Estratégia de Upgrade (+R$ 800)"
│   ├── utils/
│   │   ├── recommendationEngine.js      # Motor de cálculo de pontuação (6 perguntas), desempate e match reasons
│   │   └── cn.js                        # Helper clsx + tailwind-merge
│   ├── hooks/
│   │   └── usePresentationNav.js        # Controle de navegação fluida por âncoras e atalhos de teclado
│   ├── App.jsx                          # Estado global da sessão (seção ativa, respostas, aba ativa)
│   ├── main.jsx                         # Ponto de entrada React
│   └── index.css                        # Import do Tailwind e variáveis CSS Polar (--color-polar-*)
├── index.html
├── package.json
└── vite.config.js
```

---

## 2. Lista de Componentes React e Responsabilidades

| Componente | Responsabilidade |
| :--- | :--- |
| `App.jsx` | Gerencia o estado global: seção em foco na rolagem, respostas do quiz (`answers` para as 6 perguntas), modelo vencedor calculado e aba ativa na visão final (`"result"` ou `"catalog"`), permitindo abrir "Outros modelos" a qualquer momento. |
| `TopNav.jsx` | Cabeçalho fixo minimalista (estilo Polar) com links de rolagem suave para cada seção (`01` a `05`) e botão pill sempre visível **"Explorar os 10 Modelos"** (leva direto à aba "Outros modelos"). |
| `SectionContainer.jsx` | Padroniza a geometria desktop (`min-w-[1280px]`, container centralizado `max-w-7xl` / `1280px`, `min-h-screen`), garantindo rolagem vertical fluida com âncoras por seção. |
| `ProblemSection.jsx` | **Seção 1:** Apresenta o dilema de comprar um notebook para Premiere/DaVinci/Blender até R$ 10.000 no Brasil, contrastando as duas estratégias da pesquisa: *32 GB de fábrica* vs. *Compra de 16 GB + Upgrade mantendo garantia*. |
| `ModelsOverviewSection.jsx` | **Seção 2:** Exibe os 10 modelos pesquisados em grid editorial enumerado (`01` a `10`), destacando o motivo de seleção de cada um, os 3 primeiros colocados gerais e os 2 campeões de custo-benefício. |
| `InspirationSection.jsx` | **Seção 3:** Seção visual de respiro/manifesto técnico (`edicao_4k = fn(GPU_TGP, RAM_32GB, sRGB_100)`) com estética inspirada em `polar.sh/company`, preparando a transição para o diagnóstico individual. |
| `QuizSection.jsx` | **Seção 4:** Controla o fluxo das **6 perguntas** (uma por tela), gerenciando avanço/retorno, atalhos numéricos (`1`–`3`) e disparo do cálculo ao responder a 6ª pergunta. |
| `QuizProgressBar.jsx` | Exibe o passo atual (`01 / 06` em fonte monoespaçada) e uma barra horizontal contínua animada via Framer Motion. |
| `QuestionCard.jsx` | Renderiza o enunciado da pergunta, subtítulo técnico explicativo e cartões de resposta estilo `RadioGroup` com feedback visual imediato. |
| `ResultsAndCatalogSection.jsx` | **Seções 5 e 6 integradas em Tabs:** Contém o chaveador de abas **"Sua Recomendação (Vencedor)"** e **"Outros Modelos (Catálogo Completo)"**, permitindo alternância sem perder o resultado do quiz. |
| `NotebookDetailView.jsx` | Renderiza a ficha técnica completa de um notebook (CPU, GPU + TGP, RAM + expansibilidade, SSD, tela + cobertura de cor, peso, preço de fábrica + preço estimado com 32 GB, lojas, alertas de variante, análise de Edição de Vídeo, Modelagem 3D, Ponto Fraco e lista de motivos de compatibilidade com o usuário). |
| `VariantWarningBanner.jsx` | Exibe aviso visual discreto quando o modelo possui múltiplas variantes de hardware na tabela original (ex.: Dell Inspiron 16 Plus RTX 4050 vs 4060; Dell G15 tela 120Hz vs 165Hz; Predator Neo 16 512GB vs 1TB). |
| `NotebookSummaryCard.jsx` | Card compacto utilizado na Seção 2 e na barra lateral de seleção da aba "Outros Modelos". |

---

## 3. Modelagem dos Dados dos Notebooks (`src/data/notebooks.json`)

### 3.1. Esquema JSON de cada modelo (Com Decisões Consolidadas)
Todos os campos derivam estritamente de `data/pesquisa_notebooks.md`, incluindo o cálculo do preço estimado com 32 GB (+R$ 800 médios para os modelos de 16 GB expansíveis) e avisos de variantes:

```json
{
  "id": "lenovo-legion-slim-5",
  "rank": 1,
  "name": "Lenovo Legion Slim 5 16",
  "code": "83D6",
  "badge": "1º Lugar Geral",
  "selectionReason": "Conjunto mais completo e equilibrado para criadores com tela 16:10 WQXGA 100% sRGB e refrigeração silenciosa.",
  "specs": {
    "cpu": "Intel Core i7-13700H (13ª Geração)",
    "gpu": "RTX 4060 8 GB GDDR6 (140W)",
    "gpuVramGb": 8,
    "gpuTgpWatts": 140,
    "ramFactoryGb": 16,
    "ramDetails": "16 GB DDR5 (Expansível até 64 GB, 2 slots)",
    "ramExpandable": true,
    "ramMaxGb": 64,
    "storage": "1 TB NVMe PCIe Gen4",
    "storageMinGb": 1000,
    "display": "16\" WQXGA (2560x1600), 165Hz, 100% sRGB, 350 nits",
    "displayResolutionClass": "QHD+",
    "displayColorSpace": "100% sRGB",
    "displayHighFidelity": true,
    "weightKg": 2.40
  },
  "pricing": {
    "minBrl": 8600,
    "maxBrl": 9200,
    "upgradeCostEstimateBrl": 375,
    "minWith32GbBrl": 8950,
    "maxWith32GbBrl": 9575,
    "exceeds10kLimit": false,
    "stores": ["Lenovo Store", "Amazon BR"]
  },
  "variantWarning": null,
  "analysis": {
    "videoEditing": "Excelente tela 16:10 QHD com 100% sRGB e área vertical extra para timelines de 4K no Premiere e DaVinci; QuickSync da Intel garante decodificação fluida de codecs H.264/H.265.",
    "modeling3d": "RTX 4060 a 140W com 8 GB VRAM entrega renderização veloz em Cycles (OptiX) no Blender; sistema de refrigeração Legion Coldfront 5.0 sustenta renders longos sem throttling.",
    "weakness": "Vem com 16 GB de fábrica; exige upgrade com mais um módulo de 16 GB DDR5 (orçamento total fica em aprox. R$ 9.100)."
  },
  "profileTags": ["upgrade-friendly", "high-res-screen", "full-tgp-4060", "1tb-factory", "balanced-weight"]
}
```

### 3.2. Lacunas e Alertas de Variantes Mapeados da Pesquisa
1. **Ausência de benchmarks sintéticos numéricos:** A interface não inventará pontuações de Cinebench/PugetBench; usará os indicadores técnicos reais presentes na pesquisa (núcleos/geração de CPU, VRAM e **TGP em Watts da GPU**: 140W vs 115W vs 105W vs 75-85W vs Integrada).
2. **Avisos de Variantes (`variantWarning`):**
   - *Acer Predator Helios Neo 16 (#2):* Alerta para conferir no varejo se a versão escolhida possui SSD de `512 GB ou 1 TB` e painel `WUXGA ou WQXGA`.
   - *Avell ION A70 ION / A70i (#4):* Alerta de variante de CPU (`i7-13700H ou i7-14650HX`) e TGP (`115W–140W`).
   - *Dell Inspiron 16 Plus (#5):* Alerta de variante de GPU (`RTX 4060 8 GB ou RTX 4050 6 GB`).
   - *Dell G15 5530 (#7):* Alerta crítico da pesquisa: exigir a tela de `165Hz (100% sRGB)`, evitando a versão de `120Hz (45% NTSC / 60% sRGB)`.
3. **Dados de bateria parciais:** Apenas informações textuais presentes na pesquisa serão exibidas (ex.: `60 Wh` no Lenovo LOQ 15IRX9, `15h+` no MacBook Air M3 e eficiência energética do Ryzen 7 no ASUS TUF A15).

---

## 4. Lógica de Recomendação e Questionário (6 Perguntas)

### 4.1. As 6 Perguntas do Questionário Interativo

1. **Orçamento e Estratégia Financeira (`budget`)**
   * *"Qual é a sua margem de investimento total (incluindo eventuais upgrades ou periféricos)?"*
   - **Opção A (`budget_high`):** Posso chegar ao limite de R$ 10.000 ou ultrapassar levemente (até R$ 10.600) por acabamento premium ou 32 GB prontos de fábrica.
   - **Opção B (`budget_mid`):** Quero ficar entre R$ 8.300 e R$ 9.990 para ter o topo de linha estritamente dentro do teto de R$ 10 mil.
   - **Opção C (`budget_low`):** Prefiro gastar entre R$ 6.500 e R$ 8.400 na máquina base para economizar ou investir a diferença em RAM, SSD extra ou monitor externo.

2. **Desempenho Gráfico/CPU vs. Qualidade da Tela Integrada (`screen_vs_perf`)**
   * *"Na sua rotina de edição e 3D, o que tem prioridade: poder bruto de renderização ou fidelidade da tela do próprio notebook?"*
   - **Opção A (`screen_priority`):** Qualidade máxima da tela integrada (alta resolução QHD+/2.5K/Retina e 100% sRGB ou DCI-P3) para editar e fazer color grading sem monitor externo.
   - **Opção B (`balanced_1080p`):** Equilíbrio: GPU dedicada forte + tela Full HD com 100% sRGB confiável.
   - **Opção C (`perf_external_monitor`):** Força bruta ou economia máxima para usar com Monitor Externo (a tela do notebook é secundária).

3. **Capacidade de Upgrade vs. Pronto de Fábrica / Durabilidade (`upgrade_policy`)**
   * *"Como você prefere lidar com os 32 GB de RAM recomendados para edição 4K e 3D?"*
   - **Opção A (`ready_32gb_expandable`):** Quero que já venha com **32 GB de fábrica** e ainda permita expansão futura (até 64 GB).
   - **Opção B (`diy_upgrade`):** Topo comprar com **16 GB de fábrica** e instalar mais um pente DDR5 (+R$ 300 a R$ 450, mantendo a garantia) para ter o melhor conjunto pelo menor preço.
   - **Opção C (`soldered_ok`):** Prefiro um aparelho fino/corporativo com memória **soldada de alta velocidade** (sem upgrades futuros), focado em durabilidade de 5+ anos.

4. **Armazenamento Interno vs. Mídia Externa / Expansão (`storage_need`)**
   * *"Em relação ao espaço para arquivos brutos de vídeo (footage 4K) e cache de projetos:"*
   - **Opção A (`internal_1tb`):** Preciso de **1 TB NVMe interno já de fábrica** para guardar projetos ativos direto no notebook.
   - **Opção B (`external_or_upgrade`):** **512 GB internos bastam** inicialmente, pois uso SSD externo ou pretendo instalar um segundo SSD NVMe com a folga do orçamento.

5. **Regime de Trabalho: Refrigeração Sustentada vs. Autonomia/Eficiência (`thermal_vs_battery`)**
   * *"Qual é o perfil das suas sessões de renderização e uso fora da tomada?"*
   - **Opção A (`heavy_3d_render`):** Renderizações 3D longas (Blender/Cycles) e exportações pesadas na tomada: priorizo refrigeração robusta e GPU RTX 4060 com TGP alto (115W–140W).
   - **Opção B (`mixed_creative`):** Edição 4K intensa (Premiere/DaVinci) e 3D moderado: busco bom equilíbrio térmico, baixo ruído e codificadores dedicados (QuickSync/NVENC/ProRes).
   - **Opção C (`battery_efficiency`):** Priorizo máxima autonomia de bateria (15h+ ou processadores de alta eficiência) para editar longe da tomada, mesmo sem ventoinha para renders 3D longos.

6. **Consideração do Peso do Notebook na Análise (`weight_consideration` — Pergunta Adicionada)**
   * *"O peso físico do notebook (que varia de 1,51 kg a 2,81 kg na pesquisa) deve ser considerado um fator decisivo na sua análise?"*
   - **Opção A (`weight_strict`):** **Sim, é prioritário:** preciso de um notebook verdadeiramente leve (entre **1,51 kg e 1,95 kg**) para carregar na mochila todos os dias sem esforço.
   - **Opção B (`weight_moderate`):** **Sim, com moderação:** aceito um peso intermediário (entre **2,10 kg e 2,40 kg**), evitando apenas os modelos mais pesados e fontes gigantes.
   - **Opção C (`weight_ignore`):** **Não considerar o peso:** o notebook ficará fixo na mesa na maior parte do tempo; modelos pesados (**2,60 kg a 2,81 kg** + fonte grande) são totalmente aceitáveis.

---

### 4.2. Fórmula de Cálculo e Tabela de Pesos (6 Perguntas)

A pontuação total de cada modelo $M$ é a soma dos pesos atribuídos às 6 respostas escolhidas:
$$\text{Score}(M) = \sum_{i=1}^{6} W(M, R_i)$$

| # | Modelo (Peso Real) | Q1:A / B / C (Orçamento) | Q2:A / B / C (Tela vs Perf) | Q3:A / B / C (RAM/Upgrade) | Q4:A / B (SSD Interno) | Q5:A / B / C (Térmico/Bat) | Q6:A (<2kg) / B (2.1-2.4kg) / C (Ignorar Peso) |
| :-: | :--- | :-: | :-: | :-: | :-: | :-: | :-: |
| **1** | **Legion Slim 5 16** (2,40 kg) | 15 / **25** / 5 | **25** / 15 / 15 | 5 / **25** / 0 | **25** / 10 | **25** / **25** / 5 | 5 / **25** / 20 |
| **2** | **Predator Helios Neo 16** (2,60 kg) | 15 / **25** / 10 | **25** / 15 / 20 | 5 / **25** / 0 | **20** / 15 | **25** / 15 / 0 | 0 / 5 / **25** |
| **3** | **Lenovo LOQ 15IRX9** (2,38 kg) | 10 / **25** / 5 | 5 / **25** / **25** | 5 / **25** / 0 | 0 / **25** | **25** / 20 / 0 | 5 / **25** / 20 |
| **4** | **Avell ION A70 / A70i** (1,95 kg) | **25** / **25** / 0 | **25** / 10 / 15 | **30** / 5 / 5 | **25** / 10 | 20 / **25** / 10 | **30** / **25** / 15 |
| **5** | **Dell Inspiron 16 Plus** (2,20 kg) | **30** / 10 / 0 | **25** / 10 / 5 | 10 / 0 / **30** | **25** / 10 | 10 / **25** / 15 | 10 / **25** / 15 |
| **6** | **Avell Storm 450 / A52r** (2,10 kg) | 5 / 10 / **25** | 5 / **25** / 10 | **30** / 5 / 0 | **25** / 10 | 10 / **20** / 10 | 15 / **25** / 15 |
| **7** | **Dell G15 5530** (2,81 kg) | 5 / 15 / **25** | 5 / **20** / **20** | 5 / **25** / 0 | **25** / 10 | **30** / 15 / 0 | 0 / 0 / **30** |
| **8** | **ASUS TUF Gaming A15** (2,20 kg) | 5 / 10 / **30** | 5 / **25** / 15 | 5 / **25** / 0 | 0 / **25** | 20 / **20** / **20** | 10 / **25** / 20 |
| **9** | **Acer Nitro V15** (2,11 kg) | 0 / 5 / **30** | 0 / 0 / **30** | 5 / **25** / 0 | 0 / **25** | 15 / 15 / 10 | 15 / **25** / 15 |
| **10**| **MacBook Air 15" M3** (1,51 kg) | 20 / **25** / 0 | **30** / 5 / 0 | 0 / 0 / **30** | 0 / **25** | 0 / **25** / **30** | **30** / 20 / 10 |

### 4.3. Critério de Desempate Determinístico
Caso dois ou mais modelos empatem na pontuação máxima após as 6 perguntas:
1. **1º Critério (Eliminatório de Orçamento):** Se o usuário escolheu `Q1:B` ou `Q1:C` (não ultrapassar R$ 10 mil), o *Dell Inspiron 16 Plus* (que chega a R$ 10.600) perde o desempate.
2. **2º Critério (Filtro de Peso - Q6):** Se o usuário escolheu `Q6:A` (peso prioritário < 2 kg), vence o modelo de menor peso em kg (`weightKg`).
3. **3º Critério (Aderência à Estratégia de RAM - Q3):** Vence o modelo que obtiver maior nota isolada na Pergunta 3 (`upgrade_policy`).
4. **4º Critério (Ranking Oficial da Pesquisa):** Persiste o modelo melhor posicionado no ranking oficial da pesquisa (`rank` de 1 a 10).

---

## 5. Navegação entre Seções e Alternância Resultado / Outros Modelos

### 5.1. Rolagem Vertical Fluida com Âncoras por Seção (Decisão Consolidada)
- O site adotará **rolagem vertical fluida com âncoras por seção** (`min-h-screen` para cada uma das 5 seções principais), espelhando a experiência editorial de `polar.sh/company` e permitindo leitura confortável das tabelas e fichas técnicas completas sem cortar conteúdo.
- A barra superior fixa (`TopNav`) destaca automaticamente a seção visível via `IntersectionObserver` e permite saltar diretamente para:
  - `01. Contexto & Mercado`
  - `02. Os 10 Modelos`
  - `03. Filosofia de Escolha`
  - `04. Questionário (6 Perguntas)`
  - `05. Recomendação & Catálogo`

### 5.2. Alternância entre "Resultado" (Seção 5) e "Outros Modelos" (Seção 6)
- **Acessível a qualquer momento:** O botão pill **"Outros Modelos (10)"** fica visível permanentemente no canto superior direito da `TopNav`. Clicar nele rola suavemente até a Seção 5 já com a aba **"Outros Modelos"** selecionada.
- **Layout Mestre-Detalhe na Aba "Outros Modelos":**
  - **Coluna Esquerda (360px):** Lista dos 10 notebooks com filtros rápidos (*Todos*, *32 GB de Fábrica*, *Leves até 2,1 kg*, *Custo-Benefício < R$ 8.000*) e ordenação (*Ranking da Pesquisa*, *Menor Preço*, *Menor Peso* ou *Compatibilidade com seu Quiz*).
  - **Coluna Direita (restante dos 1280px):** Exibe o componente `<NotebookDetailView />` completo do modelo selecionado, idêntico em profundidade à visualização do modelo vencedor.

---

## 6. Sistema de Design Extraído da Referência (`https://polar.sh/company`)

### 6.1. Paleta de Cores (Tokens CSS extraídos da Polar)
```css
:root {
  /* Escala Monocromática Polar (Dark Mode Nativo) */
  --color-polar-950: #090909; /* Background principal da página */
  --color-polar-900: #111111; /* Background de cards secundários / seções alternadas */
  --color-polar-800: #181818; /* Superfície de cards interativos e opções do quiz */
  --color-polar-700: #212121; /* Bordas de 1px (hairlines), divisores e hover sutil */
  --color-polar-600: #292929; /* Borda de card ativo / focado */
  --color-polar-500: #757575; /* Texto terciário, índices numerados (01..10) */
  --color-polar-400: #858585; /* Subtítulos discretos */
  --color-polar-300: #9e9e9e; /* Texto secundário / corpo de apoio */
  --color-polar-100: #c9c9c9; /* Texto de especificações técnicas */
  --color-polar-50:  #d9d9d9; /* Texto claro de leitura longa */
  --color-white:     #ffffff; /* Títulos principais e fundo de botões primários */

  /* Cores Semânticas de Apoio (Badges e Alertas) */
  --color-blue-500:    #3080ff; /* Destaque técnico / Badge de Recomendação */
  --color-emerald-400: #00d294; /* Pontos fortes (Edição de Vídeo / 32GB Fábrica) */
  --color-amber-500:   #f99c00; /* Alerta de variante dupla ou upgrade (+R$ 800) */
  --color-red-500:     #fb2c36; /* Ponto fraco / Limitação técnica */
}
```

### 6.2. Tipografia, Cards e Seção de Inspiração
- **Fontes:** `"Inter Display" / "Inter"` para títulos e corpo (`font-weight: 500`, `tracking-tight`) + `"Geist Mono"` (`tabular-nums`) para preços, pesos em kg, TGP em Watts e índices (`01` a `10`).
- **Cards e Botões:** Cards planos `bg-[#111111]` com borda de `1px solid #212121`, `rounded-2xl` e `p-8`. Botões em formato pílula (`rounded-full`) com fundo branco e texto preto no CTA primário.
- **Seção 3 (Inspiração Visual):** Arte generativa em SVG/Canvas de alta resolução (`aspect-[21/9]`) inspirada na imagem abstrata `Polar_Flow` de `polar.sh/company`, com feixes luminosos monocromáticos sobre fundo `#090909` e a equação em estilo código `edicao_4k = fn(GPU_TGP, RAM_32GB, sRGB_100)`.

---

## 7. Acessibilidade Básica (Desktop)

1. **Contraste de Cores (WCAG AA/AAA):** Texto branco (`#FFFFFF`) e cinza claro (`#D9D9D9` / `#9E9E9E`) sobre `#090909` e `#111111`, garantindo relação de contraste superior a **7:1**.
2. **Foco de Teclado Visível (`:focus-visible`):** Anel de foco de alto contraste (`ring-2 ring-white ring-offset-2 ring-offset-[#090909]`) em todos os botões, abas e cartões de opção.
3. **Navegação por Teclado:**
   - No Quiz (6 perguntas): Setas `↑`/`↓` ou teclas `1`, `2`, `3` selecionam a opção; `Enter` avança para a próxima pergunta; `Backspace` retorna à pergunta anterior.
   - Nas Abas (Resultado vs. Outros Modelos): Setas `←`/`→` alternam entre as abas e entre os modelos da lista lateral.

---

## 8. Etapas de Implementação e Estimativa de Esforço

| Etapa | Descrição das Tarefas | Estimativa |
| :--- | :--- | :--- |
| **1. Setup & Design System** | Inicializar projeto Vite + React (JS), configurar Tailwind v4 com os tokens `--color-polar-*`, fontes (`Inter` + `Geist Mono`) e layout base desktop (`1280px`). | **1,0 h** |
| **2. Camada de Dados (JSON)** | Transcrever os 10 notebooks (com preços de fábrica, estimativa +R$ 800 para 32 GB e avisos de variantes) e as 6 perguntas para `notebooks.json` e `questions.js`. | **1,0 h** |
| **3. Motor de Recomendação** | Implementar `recommendationEngine.js` com matriz das 6 perguntas (incluindo peso do notebook), regras de desempate e gerador de justificativas personalizadas. | **1,0 h** |
| **4. Seções 1, 2 e 3 (Apresentação)** | Construir `TopNav`, `ProblemSection` (diagnóstico 16 GB vs 32 GB), `ModelsOverviewSection` (grid `01`–`10` + Top 3) e `InspirationSection` (arte generativa estilo Polar Flow). | **2,0 h** |
| **5. Seção 4 (Questionário de 6 Perguntas)** | Construir `QuizSection`, `QuizProgressBar` (`01/06`) e `QuestionCard` com transições Framer Motion e atalhos de teclado. | **1,5 h** |
| **6. Seções 5 e 6 (Resultado + Outros Modelos)** | Construir `ResultsAndCatalogSection`, `NotebookDetailView` e `VariantWarningBanner` com abas acessíveis a qualquer momento e filtros rápidos. | **2,0 h** |
| **7. Refinamento Visual e Acessibilidade** | Revisão de contraste, estados `:focus-visible`, rolagem suave por âncoras e validação completa contra `data/pesquisa_notebooks.md`. | **0,5 h** |
| **Total Estimado** | **Implementação completa pronta para uso em desktop** | **~9,0 horas** |

---

## 9. Decisões Consolidadas

1. **Modelos com Dupla Especificação na Pesquisa:** Exibição de aviso visual discreto (`VariantWarningBanner`) nos cards do *Acer Predator Helios Neo 16*, *Avell ION A70*, *Dell Inspiron 16 Plus* e *Dell G15 5530* alertando sobre as variantes de GPU, CPU, SSD ou painel listadas na tabela original.
2. **Preço de Fábrica + Preço Estimado com 32 GB:** Nos 7 modelos que saem de fábrica com 16 GB expansíveis, a interface mostrará lado a lado o **Preço de Fábrica** e o **Preço Estimado com Upgrade para 32 GB (+R$ 800 médios)**.
3. **Navegação e Scroll:** Rolagem vertical fluida com seções de altura mínima `100vh` (`min-h-screen`) e barra de navegação fixa no topo com âncoras diretas.
4. **Peso do Notebook no Quiz:** Inclusão da **6ª pergunta** dedicada exclusivamente a definir se o peso físico do equipamento (`1,51 kg` a `2,81 kg`) deve pesar na recomendação final.
