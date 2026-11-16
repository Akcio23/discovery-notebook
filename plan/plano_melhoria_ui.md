# Plano de Implementação: Refinamento Minimalista de UI/UX

Este documento detalha o plano de refatoração da interface do **Discovery Notebook** com foco em três diretrizes centrais:
1. **Aumento do distanciamento e respiro entre seções** para facilitar a leitura fluida.
2. **Design mais minimalista com uso de Modais (`@radix-ui/react-dialog`)** para exibir detalhes profundos sob demanda (*Progressive Disclosure*), reduzindo a densidade de informação simultânea na tela.
3. **Moderação no uso de emojis e ícones decorativos**, preservando uma estética editorial limpa inspirada na Polar (`polar.sh`).

---

## 1. Diagnóstico do Estado Anterior

1. **Espaçamento Comprimido:**
   - O `SectionContainer.jsx` utilizava `py-24` (96px) e `mb-12` no cabeçalho, com bordas rígidas de ponta a ponta. Como todas as seções possuíam grids densos, o final de uma seção ficava muito próximo ao início da próxima.
2. **Excesso de Informação Simultânea na Tela:**
   - **Seção 01 (`ProblemSection`)**: Exibia 3 cards de escopo + 2 cards extensos de estratégia contendo descrição longa, caixa de garantia, lista de *highlights*, preços e tags de modelos ao mesmo tempo.
   - **Seção 02 (`ModelsOverviewSection`)**: Renderizava um bloco duplo ("Top 3 Geral" + "Campeões de Custo-Benefício") acima de um grid com 10 cards detalhados (`NotebookSummaryCard`), gerando duplicação de informação.
   - **Seção 05 (`ResultsAndCatalogSection`)**: Renderizava a ficha técnica inteira (`NotebookDetailView`) diretamente na página, além de um layout Mestre-Detalhe espremido na aba de catálogo.
3. **Uso Excessivo de Emojis e Ícones:**
   - Emojis repetidos em `notebooks.json` e `marketDiagnosis.json` (`🥇`, `🥈`, `🥉`, `💡`) combinados com dezenas de ícones repetidos em listas de especificações e botões secundários.

---

## 2. Pilar 1: Distanciamento e Respiro Editorial entre Seções

- **`src/components/layout/SectionContainer.jsx`**:
  - Ampliar o espaçamento vertical de `py-24` para **`py-36 lg:py-48`** (`144px` a `192px` em cima e embaixo de cada seção).
  - Aumentar a margem inferior do cabeçalho da seção de `mb-12 pb-8` para **`mb-16 pb-10`**.
  - Aumentar o espaçamento entre colunas e linhas dos grids internos (`gap-8` a `gap-10`).

---

## 3. Pilar 2: Minimalismo e Arquitetura de Modais (`@radix-ui/react-dialog`)

Criação do diretório `src/components/modals/` para isolar o conteúdo denso em modais acessíveis com *backdrop blur* (`bg-black/80 backdrop-blur-md`) e suporte a teclado (`Esc`):

1. **`src/components/modals/BaseModal.jsx`**:
   - Estrutura base com `@radix-ui/react-dialog`, cabeçalho fixo com título/subtítulo, botão de fechar e área de rolagem interna suave.
2. **`src/components/modals/NotebookDetailModal.jsx`**:
   - Encapsula o `NotebookDetailView` completo (especificações técnicas detalhadas, comparativo de preço de fábrica vs. upgrade para 32 GB, alertas de variantes e análise em 3 pilares: Edição de Vídeo, Modelagem 3D e Ponto Fraco).
   - Permite inspecionar qualquer notebook a partir de qualquer seção sem tirar o usuário do ponto de leitura atual.
3. **`src/components/modals/StrategyDetailModal.jsx`**:
   - Exibe os detalhes aprofundados das duas estratégias de compra da pesquisa (*32 GB de Fábrica* vs. *Estratégia de Upgrade +16 GB*), incluindo a política oficial de garantia no Brasil, *highlights* completos e atalhos para inspecionar os modelos daquela estratégia.

### Simplificação das Seções na Página Principal:
- **Seção 01 (`ProblemSection`)**:
  - Os 3 cards superiores de escopo são substituídos por uma barra editorial minimalista de 1 linha.
  - Os 2 cards de estratégia exibem apenas o resumo executivo, a faixa de investimento e o botão **"Ver detalhes e regras de garantia"** (que abre o `StrategyDetailModal`).
- **Seção 02 (`ModelsOverviewSection`)**:
  - Remoção do painel superior redundante (Pódio + Campeões), mantendo a seleção unificada através das *pills* de filtro rápido.
  - Simplificação do `NotebookSummaryCard` para mostrar apenas ranking, nome, resumo enxuto, 3 tags técnicas em linha (`GPU`, `RAM`, `Peso`), preço base e botão **"Ver detalhes"** (que abre imediatamente o `NotebookDetailModal`).
- **Seção 03 (`InspirationSection`)**:
  - Enxugamento textual dos 4 pilares inferiores da equação de hardware para leitura rápida.
- **Seção 04 (`QuizSection` & `QuestionCard`)**:
  - Layout mais limpo nas opções de resposta, priorizando o rótulo principal e a tag técnica.
- **Seção 05 (`ResultsAndCatalogSection`)**:
  - Na aba **Sua Recomendação**: exibe um Card Executivo do Modelo Vencedor com resumo de compatibilidade, principais motivos do *match* e botão de destaque **"Abrir Ficha Técnica Completa"**, mantendo a página leve.
  - Na aba **Catálogo Completo**: exibe um grid limpo dos 10 modelos onde clicar em qualquer card abre o `NotebookDetailModal`.

---

## 4. Pilar 3: Moderação no Uso de Emojis e Ícones

1. **Dados (`src/data/notebooks.json` e `src/data/marketDiagnosis.json`)**:
   - Remoção dos emojis repetitivos (`🥈`, `🥉`, `💡`) nas tags de modelos, preservando apenas `🥇` exclusivamente no 1º Lugar Geral (`Lenovo Legion Slim 5 16`) como ponto focal único.
2. **Interface (`TopNav`, `NotebookSummaryCard`, Botões)**:
   - Remoção dos 4 ícones repetidos em cada card do grid de 10 modelos (reduzindo 40 ícones simultâneos na Seção 02 para tipografia `Geist Mono` limpa).
   - Limpeza de ícones ornamentais redundantes em botões secundários e cabeçalhos.
