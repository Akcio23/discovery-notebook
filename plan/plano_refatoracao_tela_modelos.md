# Plano de Implementação: Modernização Visual da Tela "Os 10 Notebooks da Pesquisa"

Este documento descreve o plano para refatorar a **Seção 02 (`src/components/sections/ModelsOverviewSection.jsx`)**, mantendo **exatamente as mesmas informações atuais** (índice `#01`–`#10`, nome do modelo, faixa de preço em `R$`, ícone de abertura do modal e os 5 filtros rápidos), mas substituindo a grade de caixas retangulares tradicionais por uma **apresentação editorial moderna, limpa e alinhada ao padrão visual das demais páginas**.

---

## 1. Diagnóstico da Tela Atual (Baseado na Captura de Tela)

1. **Excesso de Caixas Isoladas ("Boxy Grid")**:
   - Enquanto as páginas **01 (Overview)**, **03 (Equação Técnica)** e **04 (Questionário)** utilizam um design arquitetônico limpo sobre o fundo `#090909` (com foco em tipografia, linhas divisórias sutis, feixes luminosos e ausência de caixas repetitivas), a tela **02 (Os 10 Modelos)** ainda exibe 10 blocos quadrados fechados (`border border-[#212121] rounded-md`) com linhas internas (`border-t border-[#181818]`).
2. **Proporção Inadequada para Pouca Informação**:
   - Como cada item exibe apenas **Rank + Nome + Preço**, o formato de card vertical cria espaços vazios desnecessários e força a quebra de linha nos nomes dos notebooks.
3. **Botões de Filtro com Visual Antigo**:
   - Os 5 botões de filtro no topo usam bordas retangulares simples estáticas, sem transição fluida de seleção.
4. **Pequenos Ajustes de Polimento Identificados na Tela**:
   - Correção de digitação no subtítulo atual: *"abrir o os detalhes daficha técnica"* → *"abrir os detalhes da ficha técnica"*.
   - Padronização do cabeçalho com `indexLabel="02"` e `eyebrow` técnico em `Geist Mono`, seguindo o padrão das seções `04` e `05`.
   - Correção do parêntese vazio `()` no botão inferior `Próximo: Equação Técnica () ->`.

---

## 2. Nova Proposta Visual (Mesma Informação, Apresentação Moderna)

A informação exibida continuará **estritamente a mesma** (`#Rank`, `Nome do Notebook`, `Faixa de Preço` e `Ação de abrir modal`), porém organizada em um **Índice Arquitetônico Interativo de Duas Colunas (5 linhas × 2 colunas)** sobre o fundo contínuo `#090909`.

### 2.1. Cabeçalho Alinhado ao Design System + Segmented Control Animado
- **Identificação Superior (`Geist Mono`)**:
  - `02 / CATÁLOGO DE REFERÊNCIA · 10 MODELOS MAPEADOS`
- **Subtítulo Corrigido**:
  - *"Clique em qualquer modelo abaixo para abrir os detalhes da ficha técnica completa e análise 4K/3D."*
- **Filtros Rápidos com Pill Deslizante (`Framer Motion layoutId`)**:
  - Os 5 filtros (`Todos (10)`, `Top 3`, `32 GB Fábrica (3)`, `Upgrade (6)`, `Custo-Benefício (2)`) passam a ficar agrupados em uma trilha minimalista (`bg-[#111111] border border-[#1f1f1f] p-1 rounded-md`), onde o indicador ativo branco desliza suavemente entre as opções com física de mola (`layoutId="modelsFilterActive"`).

### 2.2. Substituição das 10 Caixas por Lista Arquitetônica em 2 Colunas (Zero Caixas Fechadas)
Em vez de 10 caixas retangulares separadas, os modelos serão dispostos em um **grid editorial de 2 colunas no desktop (`grid-cols-1 lg:grid-cols-2 lg:gap-x-12`)**, com 5 modelos de cada lado:

- **Estrutura de Cada Linha (1 Linha Horizontal Limpa por Modelo)**:
  - **Esquerda**:
    - Indicador vertical luminoso de hover (barra fina `#3080ff` que acende ao passar o mouse).
    - Índice em `Geist Mono` (`#01` a `#10`), com destaque sutil para o Top 3.
    - **Nome do Notebook** em linha única (`text-base font-medium text-white`), ganhando leve deslocamento horizontal (`group-hover:translate-x-1`) no hover.
  - **Direita**:
    - **Faixa de Preço** em `Geist Mono` (`R$ 8.600 – R$ 9.200` em `#00d294`), alinhada de forma tabular.
    - Ícone **`ArrowUpRight` (`↗`)** que desliza na diagonal e muda para `#3080ff` / `white` no hover.
- **Divisórias Arquitetônicas Sutis**:
  - Apenas fios horizontais ultrafinos (`border-b border-[#181818]`) separando as linhas sobre o fundo `#090909`, sem bordas laterais fechadas.
  - Ao passar o mouse sobre qualquer modelo, a linha recebe um brilho gradiente sutil (`bg-gradient-to-r from-[#3080ff]/[0.06] via-white/[0.015] to-transparent`) e um feixe inferior luminoso.

### 2.3. Animação de Entrada e Filtragem (`Framer Motion`)
- Transição fluida (`AnimatePresence mode="popLayout"` + `motion.button layout`) ao alternar entre os filtros (`Todos`, `Top 3`, `32 GB Fábrica`, `Upgrade`, `Custo-Benefício`), aplicando o mesmo efeito de *blur + fade* direcional usado na transição entre capítulos.

---

## 3. Arquivos a Serem Modificados

| Arquivo | Ação | Descrição da Alteração |
| :--- | :--- | :--- |
| `src/components/sections/ModelsOverviewSection.jsx` | Modificar | Substituir o grid de 10 caixas fechadas pelo layout editorial de 2 colunas com linhas arquitetônicas interativas, adicionar `indexLabel="02"` / `eyebrow`, corrigir o typo do subtítulo e implementar o filtro segmentado com animação `Framer Motion`. |
| `src/hooks/usePresentationNav.js` | Modificar | Garantir que cada seção em `ALL_SECTIONS` possua a propriedade `index` (`01` a `05`) para eliminar o parêntese vazio `()` nos botões de navegação inferior. |

---

## 4. Critérios de Aceite

1. **Mesmo Escopo de Informação**: Nenhum dado extra desnecessário será adicionado aos itens; permanecem apenas posição (`#01`–`#10`), nome do modelo, faixa de preço e abertura do modal ao clicar, além dos 5 filtros rápidos.
2. **Padrão Visual Unificado com as Outras Páginas**: Eliminação das 10 caixas retangulares isoladas em favor de uma composição aberta sobre o fundo `#090909`, com tipografia `Inter` + `Geist Mono`, linhas divisórias sutis e microinterações luminosas.
3. **Zero Scroll (`100vh`)**: Os 10 modelos divididos em 2 colunas de 5 linhas ocupam menos altura vertical que o grid anterior, cabendo com folga em qualquer tela desktop sem rolagem.
4. **Funcionamento Integral do Modal e Filtros**: Clicar em qualquer modelo continua abrindo imediatamente o `NotebookDetailModal`, e todos os 5 filtros rápidos continuam filtrando a lista com animação suave.
