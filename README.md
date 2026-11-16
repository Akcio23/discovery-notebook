# 💻 Discovery Notebook — Guia Interativo & Motor de Recomendação (Até R$ 10.000)

> **Aplicação web interativa estilo apresentação editorial para desmistificar a compra de notebooks de alta performance no Brasil voltados para edição de vídeo (Premiere / DaVinci) e modelagem 3D (Blender).**

[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.1-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.4-black?logo=framer&logoColor=white)](https://motion.dev/)
[![Radix UI](https://img.shields.io/badge/Radix_UI-Primitives-161618?logo=radix-ui&logoColor=white)](https://www.radix-ui.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## 🎯 Sobre o Projeto

Comprar um notebook para trabalho profissional no Brasil com orçamento teto de **R$ 10.000,00** é um verdadeiro campo minado:
- A esmagadora maioria dos modelos gamer/criador de entrada e intermediários vem configurada de fábrica com apenas **16 GB de RAM**.
- Softwares como **DaVinci Resolve**, **Adobe Premiere** (em timelines 4K) e **Blender** (cenas com texturas pesadas) devoram 16 GB no café da manhã e começam a fazer swap em disco.
- Modelos que já trazem 32 GB de fábrica frequentemente estouram os R$ 10.000 ou sacrificam refrigeração e GPU.

O **Discovery Notebook** nasce como um dossiê técnico interativo e consultivo:
1. **Educa o usuário** sobre o dilema do mercado brasileiro e a *estratégia de upgrade com garantia preservada* (fabricantes como Lenovo, Acer, Dell e Avell autorizam a abertura e upgrade de RAM/SSD sem anular a garantia).
2. **Disponibiliza um questionário inteligente de 6 perguntas** com matriz de pontuação para descobrir o equipamento ideal para o seu perfil.
3. **Apresenta um catálogo completo de 10 modelos analisados a fundo**, com fichas técnicas minuciosas, prós, contras, consumo em Watts (TGP), alertas de painel e links onde encontrar.

---

## ✨ Principais Funcionalidades

### 🧭 1. Navegação de Apresentação (Slides & Capítulos)
- Fluxo de capítulos com barra de navegação superior (`TopNav`), indicadores de progresso numéricos em `Geist Mono` e controle por teclado.
- Transições cinematográficas com **Framer Motion** (deslocamento direcional, blur óptico suave e aceleração cubic-bezier).

### ⚡ 2. Motor de Recomendação Determinístico (6 Perguntas)
Um quiz objetivo onde cada resposta alimenta um cálculo ponderado em tempo real:
- **Q1 (Orçamento Real):** Até R$ 8.000 / Até R$ 9.200 / Até R$ 10.000 cravado.
- **Q2 (Software Principal):** Premiere Pro (foco em QuickSync) / DaVinci Resolve (foco em VRAM e GPU) / Blender & Maya (foco em CUDA/OptiX).
- **Q3 (Resolução de Vídeo):** 1080p padrão / 4K exigente (exige 32 GB e GPU robusta).
- **Q4 (Complexidade 3D):** Modelagem básica / Cenas densas com render pesado.
- **Q5 (Disposição para Upgrade):** Prefere 32 GB de fábrica "chave na mão" vs. Topa fazer upgrade manual para economizar.
- **Q6 (Mobilidade & Peso):** Prioridade em leveza (< 2 kg e bateria) vs. Prioridade em refrigeração bruta de bancada.

### 🏆 3. Pódio & Relatório do Modelo Vencedor
- Destaque dinâmico do notebook nº 1 com **percentual de compatibilidade (%)**.
- **Justificativas personalizadas em linguagem natural** explicando por que aquele notebook foi escolhido para as suas respostas.
- Banners de alerta e recomendações estratégicas de compra (ex: custo adicional do pente de memória DDR5).

### 📊 4. Catálogo dos 10 Modelos com Ficha Técnica Completa
- Grid editorial com badges de status: `32 GB de Fábrica` vs. `Estratégia de Upgrade (+R$ 350-450)`.
- Modal acessível (**Radix Dialog**) contendo especificações detalhadas: CPU (núcleos/threads), GPU (VRAM e TGP em Watts), tela (resolução, taxa de atualização, nits e cobertura de cor sRGB/DCI-P3), peso e slots de expansão.

---

## 💻 Resumo dos 10 Modelos Mapeados

Baseado no dossiê técnico de mercado (Novembro/2026):

| # | Modelo | Processador | GPU & TGP | RAM de Fábrica | Tela & Fidelidade | Preço Médio | Destaque |
|---|---|---|---|---|---|---|---|
| **01** | **Lenovo Legion Slim 5 16** | Core i7-13700H | RTX 4060 (140W) | 16 GB (Up to 64 GB) | 16" WQXGA 165Hz (100% sRGB) | R$ 8.600 – 9.200 | 🥇 **1º Lugar Geral** |
| **02** | **Acer Predator Helios Neo 16** | Core i7-13650HX | RTX 4060 (140W) | 16 GB (Up to 64 GB) | 16" WQXGA 165Hz (100% sRGB, 400 nits) | R$ 8.299 – 8.899 | 🥉 **3º Lugar Geral** |
| **03** | **Lenovo LOQ 15IRX9** | Core i7-14700HX (20c) | RTX 4060 (115W) | 16 GB (Up to 32/64 GB) | 15.6" FHD 144Hz (100% sRGB) | R$ 8.560 – 9.240 | 🚀 **CPU Mais Forte da Lista** |
| **04** | **Avell ION A70 ION** | Core i7-13700H/14650HX | RTX 4060 (140W) | **32 GB DDR5** | 16" WQXGA (100% sRGB) | R$ 9.400 – 9.990 | 🥈 **2º Lugar (Melhor 32GB Nativo)** |
| **05** | **Dell Inspiron 16 Plus** | Core Ultra 7 155H | RTX 4060 (NPU) | **32 GB LPDDR5x (Soldada)**| 16" 2.5K (100% sRGB) | R$ 9.800 – 10.600 | 💼 **Design Corporativo / NPU** |
| **06** | **Avell Storm 450** | Ryzen 7 7735HS | RTX 4050 (105W) | **32 GB DDR5** | 15.6" FHD 165Hz (100% sRGB) | R$ 7.200 – 7.800 | 💡 **Custo-Benefício 32GB** |
| **07** | **Dell G15 5530** | Core i7-13650HX | RTX 4060 (140W) | 16 GB (Up to 64 GB) | 15.6" FHD 165Hz (100% sRGB) | R$ 7.600 – 8.400 | 🛡️ **Tanque Térmico (Alienware)** |
| **08** | **ASUS TUF Gaming A15** | Ryzen 7 7735HS | RTX 4060 (140W) | 16 GB (Up to 64 GB) | 15.6" FHD 144Hz (100% sRGB) | R$ 6.999 – 7.899 | 🔋 **Maior Eficiência Energética** |
| **09** | **Acer Nitro V15** | Core i7-13620H | RTX 4060 (85W) | 16 GB (Up to 32 GB) | 15.6" FHD 165Hz (~65% sRGB) | R$ 6.499 – 7.299 | 💰 **Mais Acessível c/ RTX 4060** |
| **10** | **Apple MacBook Air 15" M3** | Apple M3 (8c CPU / 10c GPU) | Apple 10-Core | 16 GB Unificada (Soldada) | 15.3" Retina (100% DCI-P3, 500 nits) | R$ 9.200 – 9.990 | 🍎 **Bateria (15h+) & Tela DCI-P3** |

---

## 🛠️ Stack Tecnológica

| Camada | Tecnologia | Justificativa |
|---|---|---|
| **Ambiente & Bundler** | [Vite 6](https://vitejs.dev/) | HMR instantâneo e build ultrarrápido baseado em ES Modules nativos. |
| **Linguagem & UI** | [React 19](https://react.dev/) | Sintaxe moderna JSX sem overhead de tipagem pesada no cliente. |
| **Estilização** | [Tailwind CSS v4](https://tailwindcss.com/) | Integração nativa com `@tailwindcss/vite`, temas escuros e tokens modernos. |
| **Animações** | [Framer Motion](https://motion.dev/) | Transições orquestradas, modais fluídos e barras de progresso contínuas. |
| **Componentes Acessíveis**| [Radix UI](https://www.radix-ui.com/) | Primitivos sem estilo (`Dialog`, `Tabs`, `RadioGroup`) com acessibilidade total por teclado. |
| **Ícones** | [Lucide React](https://lucide.dev/) | Ícones minimalistas com traçado uniforme de 1.5px. |
| **Tipografia** | Geist Mono & Inter | Visual tipográfico editorial e numérico de alta precisão. |

---

## 📁 Estrutura de Pastas

```text
discorvery-notebook/
├── data/
│   └── pesquisa_notebooks.md       # Dossiê de pesquisa do mercado brasileiro
├── plan/                           # Planos de arquitetura e refatoração de capítulos
│   ├── plano_implementacao.md
│   ├── plano_ficha_tecnica_e_navegacao.md
│   └── plano_refatoracao_capitulos.md
├── public/                         # Ativos públicos e fontes
├── src/
│   ├── components/
│   │   ├── layout/                 # TopNav, SectionContainer, SectionProgress
│   │   ├── modals/                 # Modais (NotebookDetailModal, BaseModal, etc.)
│   │   ├── notebooks/              # Cards, Badges e visões de notebooks
│   │   ├── quiz/                   # QuestionCard, QuizProgressBar
│   │   └── sections/               # Capítulos: Problem, ModelsOverview, Inspiration, Quiz, Results
│   ├── data/
│   │   ├── notebooks.json          # Banco de dados com os 10 modelos estruturados
│   │   ├── marketDiagnosis.json    # Dados do mercado (garantias e upgrades)
│   │   └── questions.js            # Definição das 6 perguntas e matriz de pesos
│   ├── hooks/
│   │   └── usePresentationNav.js   # Hook de navegação por capítulos e atalhos
│   ├── utils/
│   │   ├── recommendationEngine.js # Algoritmo de cálculo de pontuação e desempate
│   │   └── cn.js                   # Utilitário clsx + tailwind-merge
│   ├── App.jsx                     # Orquestrador do estado global
│   ├── index.css                   # Variáveis de design e diretivas Tailwind v4
│   └── main.jsx                    # Ponto de montagem da aplicação React
├── index.html                      # Documento HTML raiz com metatags e fontes
├── package.json                    # Dependências e scripts do projeto
└── vite.config.js                  # Configuração do Vite com plugins React e Tailwind
```

---

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos
- **Node.js** versão 18.0 ou superior (recomendado: 20+ ou 22 LTS).
- Gerenciador de pacotes **npm**, **pnpm** ou **yarn**.

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/discorvery-notebook.git
   cd discorvery-notebook
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
   Abra no seu navegador o endereço indicado no terminal (normalmente `http://localhost:5173`).

4. **Gerar build de produção:**
   ```bash
   npm run build
   ```

5. **Visualizar o build localmente:**
   ```bash
   npm run preview
   ```

---

## 🧮 Lógica do Motor de Recomendação

O algoritmo em `src/utils/recommendationEngine.js` opera em três etapas:

1. **Pontuação Ponderada:** Cada opção do questionário possui um peso na `WEIGHT_MATRIX` para cada um dos 10 notebooks. A pontuação é somada e normalizada em porcentagem de compatibilidade ($0\%$ a $99\%$).
2. **Critérios de Desempate Determinísticos:** Em caso de empate em pontos:
   - **1º Filtro (Orçamento):** Modelos que ultrapassam R$ 10.000 são rebaixados caso o usuário tenha selecionado opções de orçamento restrito.
   - **2º Filtro (Peso):** Se mobilidade for prioridade, vence o chassi de menor peso em kg.
   - **3º Filtro (GPU & VRAM):** Se edição 4K ou 3D pesado for selecionado, vencem maior TGP e maior quantidade de VRAM.
   - **4º Filtro (Custo de Upgrade):** Vence o modelo com menor custo total estimado (Preço base + RAM adicional).
3. **Geração de Motivos:** O sistema sintetiza dinamicamente as razões da vitória em formato textual humano (ex: *"QuickSync para edição fluida em 4K"*, *"32 GB de RAM de fábrica dentro do seu orçamento"*).

---

## 🤝 Como Contribuir ou Atualizar Modelos

Deseja atualizar os preços dos notebooks ou adicionar novos concorrentes lançados no mercado?
- Edite os modelos em `src/data/notebooks.json`.
- Para ajustar o questionário ou os pesos, modifique `src/data/questions.js`.
- O motor de cálculo recalcula automaticamente os rankings em tempo real!

---

## 📄 Licença

Este projeto está sob a licença [MIT](LICENSE). Sinta-se livre para usar, estudar e adaptar para outros nichos e produtos.
