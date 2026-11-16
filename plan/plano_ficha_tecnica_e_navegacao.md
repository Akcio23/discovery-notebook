# Plano de Implementação: Navegação Integrada às Seções, Ficha Técnica Minimalista (Sem Cards) e Desbloqueio Condicional do Modelo Vencedor

Este documento descreve o plano de refatoração de UI/UX e arquitetura de estado do **Discovery Notebook** para atender às três diretrizes solicitadas:

1. **Remoção do componente `<footer>` e posicionamento dos botões de navegação de capítulo (voltar/avançar) imediatamente abaixo do conteúdo de cada seção.**
2. **Redesign completo do Modal de Informações do Notebook (`NotebookDetailModal` & `NotebookDetailView`) em formato de Ficha Técnica real, mais *clear*, sem múltiplos cards/caixas internas e com informações diretas.**
3. **Exibição condicional da seção "Modelo Vencedor" (`recomendacao`) exclusivamente após o questionário ter sido respondido.**

---

## 1. Remoção do Footer Global e Navegação Abaixo do Conteúdo de Cada Seção

### 1.1. Diagnóstico do Estado Atual
- Em `src/App.jsx`, existia um elemento `<footer>` fixado no final da viewport contendo os botões de capítulo anterior/próximo e créditos editoriais (`Discovery Notebook · Novembro de 2026`).
- Isso afastava os botões de ação do final real do conteúdo de cada capítulo e criava uma barra estrutural extra no rodapé.

### 1.2. Alterações Planejadas
- **`src/App.jsx`**:
  - Remover integralmente o bloco `<footer>...</footer>`.
  - Passar os controles de navegação de capítulo (`prevSectionObj`, `nextSectionObj`, `prevSection`, `nextSection`, `goToSection`, `totalSections`, `activeSection`) para o container de cada seção.
- **`src/components/layout/SectionContainer.jsx`**:
  - Renderizar uma barra de navegação de capítulo (`chapterNav`) **imediatamente abaixo de `{children}`** (dentro do mesmo container `max-w-7xl px-8` de cada seção).
  - Controles limpos:
    - **Esquerda**: Botão para voltar ao capítulo anterior (`← 0X Nome do Capítulo`), quando existir capítulo anterior.
    - **Direita**: Botão para avançar ao próximo capítulo (`Próximo: Nome do Capítulo (0X) →`), quando existir próximo capítulo disponível, ou `Voltar ao Início (01)` no último capítulo.

---

## 2. Redesign do Modal de Notebook como Ficha Técnica Real (Clear, Sem Cards)

### 2.1. Diagnóstico do Estado Atual
- O componente `src/components/notebooks/NotebookDetailView.jsx` dentro de `src/components/modals/NotebookDetailModal.jsx` utilizava mais de **11 caixas/cards com bordas individuais**:
  - Múltiplas *pills* em caixas no topo (`#07 no Ranking`, badge, upgrade badge).
  - Um card fechado à direita para os preços.
  - Um card inteiro para o aviso de variante.
  - 6 cards separados em grid (`border border-[#212121] p-4`) para cada especificação técnica (`Processador`, `Placa de Vídeo`, `Memória RAM`, `Armazenamento SSD`, `Tela`, `Peso`).
  - 3 cards separados para a análise de desempenho (`Edição de Vídeo 4K`, `Modelagem & Render 3D`, `Ponto de Atenção`).
  - 1 card extra para motivos de compatibilidade.

### 2.2. Novo Design: Ficha Técnica Direta e Limpa (Zero Cards Internos)
O modal passa a ter a estrutura visual de uma **Ficha Técnica Editorial (Datasheet)** estruturada apenas por alinhamento tipográfico e linhas divisórias horizontais sutis (`divide-y divide-[#181818]` / `border-b border-[#1c1c1c]`):

1. **Cabeçalho Direto no Modal (`NotebookDetailModal.jsx` & `BaseModal.jsx`)**:
   - Metadados enxutos em uma única linha monoespaçada no topo:
     `FICHA TÉCNICA · RANKING #07 · SUSTENTAÇÃO TÉRMICA DE MESA` (e `· COMPATIBILIDADE X%` quando o quiz foi respondido).
   - Título limpo com o nome e SKU e descrição direta abaixo.
2. **Faixa Comercial e de Preço em Linha (Sem Card)**:
   - Uma linha horizontal limpa na base do cabeçalho dividida em colunas diretas sem caixas ao redor:
     - **Preço de Fábrica (`16 GB` ou `32 GB`)**: `R$ 7.600 – R$ 8.400`
     - **Cenário com 32 GB**: `R$ 7.975 – R$ 8.775` (indicando `+R$ 800 upgrade` ou `32 GB de fábrica`)
     - **Arquitetura de RAM**: Texto direto (`16 GB Fábrica · Upgrade 32 GB` / `32 GB de Fábrica`)
     - **Canais Oficiais**: `Dell Oficial / KaBuM! / Magalu`
3. **Aviso de Variante Inline (Quando Aplicável)**:
   - Substituição do card grande por uma linha direta com filete lateral âmbar (`border-l-2 border-[#f99c00] pl-3.5 py-0.5`), exibindo a recomendação de tela sem criar mais um card.
4. **Tabela de Especificações Técnicas (Key-Value Datasheet)**:
   - Substituição dos 6 cards por uma tabela técnica real de linhas horizontais (`divide-y divide-[#181818]`):
     - `Processador` → `Intel Core i7-13650HX (13ª Geração HX)`
     - `Placa de Vídeo (GPU & TGP)` → `RTX 4060 8 GB GDDR6 (140W)`
     - `Memória RAM` → `16 GB DDR5 (Expansível até 64 GB, 2 slots)`
     - `Armazenamento SSD` → `1 TB NVMe PCIe Gen4`
     - `Tela & Espaço de Cor` → `15,6" FHD, 165Hz, 100% sRGB, 300 nits (versão 165Hz)`
     - `Peso Físico` → `2,81 kg`
5. **Análise de Desempenho Direta (Sem Cards)**:
   - Substituição dos 3 cards por linhas/colunas editoriais limpas (sem borda de card), apresentando diretamente:
     - **Edição de Vídeo (4K)**
     - **Modelagem & Render 3D**
     - **Ponto de Atenção**
   - E, quando o questionário tiver sido respondido, uma lista direta de **Compatibilidade com seu Perfil** sem caixa de contorno.

---

## 3. Exibição Condicional da Seção "Modelo Vencedor" Apenas Após o Questionário

### 3.1. Regra de Negócio e Fluxo
- A seção `recomendacao` (**05 · Modelo Vencedor**) **não deve ser exibida nem acessível** enquanto o questionário não tiver sido respondido (`!isQuizCompleted`, onde `isQuizCompleted = recommendation.isComplete`, ou seja, todas as 6 perguntas respondidas).

### 3.2. Alterações por Componente
1. **`src/hooks/usePresentationNav.js`**:
   - Receber o parâmetro booleano `isQuizCompleted`.
   - Filtrar dinamicamente a lista de seções ativas:
     - Enquanto `isQuizCompleted === false`: apenas os 4 capítulos (`01 Overview`, `02 Os 10 Modelos`, `03 Equação Técnica`, `04 Questionário`) existem na navegação.
     - Quando `isQuizCompleted === true`: o capítulo `05 Modelo Vencedor` (`recomendacao`) é desbloqueado e incluído na lista de seções.
   - Garantir propriedade `index` (`'01'` a `'05'`) em todos os objetos de seção.
   - Bloquear chamadas a `goToSection('recomendacao')` caso `isQuizCompleted` seja `false`.
2. **`src/components/layout/TopNav.jsx`**:
   - O item `05 Modelo Vencedor` na barra superior e o botão de atalho rápido `Vencedor` no canto superior direito **só são exibidos quando `isQuizCompleted === true`**.
3. **`src/components/sections/QuizSection.jsx` & `src/components/modals/FuturisticQuizModal.jsx`**:
   - Na tela do Capítulo 04 (`QuizSection`), o botão **"Ver Modelo Vencedor"** e o botão de próximo capítulo (`Próximo: Modelo Vencedor (05)`) só aparecem depois que o questionário estiver respondido (`isQuizCompleted === true`). Enquanto não estiver respondido, o CTA principal convida o usuário a responder/concluir as perguntas restantes.
   - No modal `FuturisticQuizModal`, ao responder todas as 6 perguntas, o botão final libera a transição imediata para a seção `Modelo Vencedor`.
   - Caso o usuário clique em **"Reiniciar / Limpar Respostas"**, `isQuizCompleted` volta para `false`, ocultando novamente a seção `Modelo Vencedor`.

---

## 4. Arquivos Modificados

| Arquivo | Resumo da Alteração |
| :--- | :--- |
| `src/hooks/usePresentationNav.js` | Suporte a `isQuizCompleted` para exibir a seção `recomendacao` somente após o questionário respondido + adição de `index` nas seções. |
| `src/App.jsx` | Remoção do `<footer>`, envio das ações de navegação de capítulo para cada seção e controle de bloqueio/redirecionamento da seção `recomendacao`. |
| `src/components/layout/SectionContainer.jsx` | Inclusão dos botões de voltar/avançar capítulo diretamente abaixo do conteúdo (`children`) de cada seção. |
| `src/components/layout/TopNav.jsx` | Ocultação do botão `Vencedor` e da etapa 05 enquanto o questionário não for respondido. |
| `src/components/sections/ProblemSection.jsx` | Repasse das propriedades de navegação de capítulo abaixo do conteúdo. |
| `src/components/sections/ModelsOverviewSection.jsx` | Repasse das propriedades de navegação de capítulo abaixo do conteúdo. |
| `src/components/sections/InspirationSection.jsx` | Repasse das propriedades de navegação de capítulo abaixo do conteúdo. |
| `src/components/sections/QuizSection.jsx` | Exibição condicional do botão "Ver Modelo Vencedor" apenas quando o questionário estiver respondido + navegação abaixo do conteúdo. |
| `src/components/modals/FuturisticQuizModal.jsx` | Validação de conclusão das 6 perguntas para liberar o botão "Ver Modelo Vencedor". |
| `src/components/modals/NotebookDetailModal.jsx` | Cabeçalho editorial de Ficha Técnica com metadados diretos. |
| `src/components/notebooks/NotebookDetailView.jsx` | Redesign completo no estilo Ficha Técnica *clear* (tabela em linhas horizontais e seções sem cards). |
