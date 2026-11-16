# Plano de Implementação: Seção 04 Clean — Modelo de Recomendação e Funcionamento do Algoritmo

Este documento descreve o plano para refatorar a **Seção 04 (`src/components/sections/QuizSection.jsx`)**, removendo o painel com o resumo das 6 perguntas e substituindo-o por uma apresentação **clean, direta e editorial** sobre o **modelo matemático utilizado** e **como o algoritmo funciona** para calcular o notebook vencedor.

---

## 1. Diagnóstico do Estado Atual (`src/components/sections/QuizSection.jsx`)

- **Problema Atual**: A tela da Seção 04 exibe um grid de 6 cards (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`) listando todas as 6 perguntas, tags de status (`Respondida`) e textos truncados (`line-clamp-1`) das perguntas e respostas.
- **Impacto Visual**: Gera excesso de caixas/bordas repetitivas e duplica informações que já pertencem exclusivamente ao `FuturisticQuizModal`.
- **Objetivo da Mudança**: Eliminar completamente o resumo das perguntas da página e apresentar uma explicação enxuta, elegante e técnica sobre **qual modelo de decisão é utilizado** e **como ele processa as respostas** para desbloquear o Modelo Vencedor.

---

## 2. Nova Estrutura Visual e de Conteúdo (Clean & Zero Cards Pesados)

A Seção 04 passará a ter um layout limpo sobre o fundo `#090909`, apoiado apenas em hierarquia tipográfica (`Inter` + `Geist Mono`) e linhas divisórias sutis (`border-[#181818]`), dividido em duas partes enxutas:

### 2.1. Bloco Superior: Sobre o Modelo Utilizado
Uma introdução curta e direta explicando a arquitetura do motor (`src/utils/recommendationEngine.js`):

- **Identificação Técnica (`Geist Mono`)**:
  `MODELO UTILIZADO · MATRIZ DE DECISÃO PONDERADA (MCDA)`
- **Descrição Curta**:
  > O recomendador utiliza um modelo determinístico de **Pontuação Ponderada Multi-Critério (MCDA)**. Em vez de filtros binários que descartam bons equipamentos por um único detalhe, o algoritmo cruza suas prioridades no modal contra a matriz técnica dos **10 notebooks da pesquisa**, atribuindo pesos de **0 a 30 pontos** por dimensão e normalizando a taxa de compatibilidade (`0% a 99%`).
- **Fórmula Síntese Discreta (`Geist Mono`)**:
  `Score(Modelo) = Σ Peso(Modelo, Resposta[1..6]) → Ranking + 4 Regras de Desempate`

### 2.2. Bloco Inferior: Como Funciona (3 Etapas em Linha)
Três colunas limpas (sem caixas fechadas, separadas apenas por espaçamento ou fio sutil) descrevendo o funcionamento passo a passo:

1. **01 · Calibração de Pesos no Modal**
   - Você define suas prioridades no modal interativo (orçamento, tela vs. GPU, RAM de fábrica vs. upgrade, armazenamento, regime térmico e peso).
2. **02 · Pontuação na Matriz `10 × 6`**
   - O motor soma a aderência de cada notebook às suas escolhas considerando TGP real da GPU (75W a 140W), cobertura de cor e custo estimado com 32 GB.
3. **03 · Desempate Determinístico**
   - Empates técnicos são resolvidos em cascata por 4 critérios objetivos: respeito ao teto de R$ 10.000, prioridade de peso (`< 2,0 kg`), estratégia de RAM e ranking oficial.

### 2.3. Rodapé de Status da Calibração + Gatilho do Modal
- Mantém no cabeçalho (ou em uma faixa limpa integrada) o status discreto de calibração (`0/6` a `6/6 parâmetros calibrados`) e o botão principal para abrir o **`FuturisticQuizModal`** (*"Iniciar Calibração no Modal"* / *"Revisar Respostas no Modal"*), além do botão *"Reiniciar"* quando houver respostas preenchidas.
- O modal (`FuturisticQuizModal.jsx`) permanece como o único lugar onde as 6 perguntas são exibidas e respondidas.

---

## 3. Arquivos a Serem Modificados

| Arquivo | Ação | Descrição da Alteração |
| :--- | :--- | :--- |
| `src/components/sections/QuizSection.jsx` | Modificar | Remover o `QUESTIONS.map(...)` (grid de 6 cards de perguntas) e implementar o layout *clean* com a descrição do modelo MCDA utilizado, a fórmula síntese e as 3 etapas de funcionamento do algoritmo. |

---

## 4. Critérios de Aceite

1. **Zero Resumo de Perguntas na Página**: Nenhum enunciado das 6 perguntas ou resposta individual deve ser listado fora do modal na Seção 04.
2. **Explicação Clara e Clean do Modelo**: O usuário entende em poucos segundos qual é o modelo utilizado (Matriz Ponderada MCDA + Desempate Determinístico) e como ele funciona em 3 passos simples.
3. **Estética Minimalista**: Sem grade de cards repetitivos; uso de tipografia limpa, detalhes em `Geist Mono` e total harmonia com o restante da apresentação em viewport única (`Zero Scroll`).
4. **Fluxo do Modal Preservado**: O clique no botão principal continua abrindo o `FuturisticQuizModal` normalmente e desbloqueando a seção `05 · Modelo Vencedor` ao completar as 6 respostas.
