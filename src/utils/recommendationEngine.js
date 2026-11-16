import notebooks from '../data/notebooks.json';
import { QUESTIONS, WEIGHT_MATRIX } from '../data/questions';

/**
 * Calcula a pontuação de cada modelo com base nas 6 respostas do usuário,
 * aplica os 4 critérios determinísticos de desempate e gera os motivos personalizados.
 */
export function calculateRecommendations(answers = {}) {
  const answeredKeys = Object.keys(answers).filter((k) => Boolean(answers[k]));
  const isComplete = answeredKeys.length === QUESTIONS.length;

  // Máximo teórico possível para normalizar percentual de compatibilidade
  const maxPossiblePerModel = {};
  for (const nb of notebooks) {
    const weights = WEIGHT_MATRIX[nb.id];
    let maxScore = 0;
    for (const q of QUESTIONS) {
      const qWeights = weights?.[q.id] || {};
      const maxForQ = Math.max(...Object.values(qWeights), 0);
      maxScore += maxForQ;
    }
    maxPossiblePerModel[nb.id] = maxScore || 155;
  }

  const scoredModels = notebooks.map((notebook) => {
    const modelWeights = WEIGHT_MATRIX[notebook.id] || {};
    let totalScore = 0;
    const breakdown = {};

    for (const q of QUESTIONS) {
      const chosenOption = answers[q.id];
      const weight = chosenOption ? (modelWeights[q.id]?.[chosenOption] ?? 0) : 0;
      breakdown[q.id] = weight;
      totalScore += weight;
    }

    const maxScore = maxPossiblePerModel[notebook.id] || 155;
    const matchPercentage =
      answeredKeys.length > 0 ? Math.min(99, Math.round((totalScore / maxScore) * 100)) : null;

    const matchReasons = buildMatchReasons(notebook, answers, breakdown);

    return {
      ...notebook,
      score: totalScore,
      matchPercentage,
      breakdown,
      matchReasons
    };
  });

  // Ordenação com os 4 critérios de desempate determinísticos do plano (Seção 4.3)
  const rankedModels = [...scoredModels].sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }

    // 1º Critério (Eliminatório de Orçamento): Se Q1:B ou Q1:C (não ultrapassar R$ 10 mil),
    // o Dell Inspiron 16 Plus (que chega a R$ 10.600) perde o desempate.
    if (answers.budget === 'budget_mid' || answers.budget === 'budget_low') {
      if (a.pricing.exceeds10kLimit !== b.pricing.exceeds10kLimit) {
        return a.pricing.exceeds10kLimit ? 1 : -1;
      }
    }

    // 2º Critério (Filtro de Peso - Q6): Se Q6:A (peso prioritário < 2 kg), vence o menor peso em kg.
    if (answers.weight_consideration === 'weight_strict') {
      if (a.specs.weightKg !== b.specs.weightKg) {
        return a.specs.weightKg - b.specs.weightKg;
      }
    }

    // 3º Critério (Aderência à Estratégia de RAM - Q3): Maior nota isolada na Pergunta 3 (upgrade_policy).
    const aQ3 = a.breakdown.upgrade_policy ?? 0;
    const bQ3 = b.breakdown.upgrade_policy ?? 0;
    if (bQ3 !== aQ3) {
      return bQ3 - aQ3;
    }

    // 4º Critério (Ranking Oficial da Pesquisa): Menor rank (1 a 10).
    return a.rank - b.rank;
  });

  return {
    isComplete,
    answeredCount: answeredKeys.length,
    totalQuestions: QUESTIONS.length,
    winner: rankedModels[0],
    runnerUp: rankedModels[1],
    thirdPlace: rankedModels[2],
    rankedModels
  };
}

function buildMatchReasons(notebook, answers, breakdown) {
  const reasons = [];

  // 1. Orçamento
  if (answers.budget === 'budget_high' && breakdown.budget >= 20) {
    reasons.push(
      `Alinhado à sua margem até R$ 10 mil+: faixa de R$ ${notebook.pricing.minBrl.toLocaleString('pt-BR')} a R$ ${notebook.pricing.maxBrl.toLocaleString('pt-BR')}.`
    );
  } else if (answers.budget === 'budget_mid' && breakdown.budget >= 20) {
    reasons.push(
      `Dentro do teto estrito de R$ 10.000 mesmo considerando 32 GB (estimado em R$ ${notebook.pricing.minWith32GbBrl.toLocaleString('pt-BR')} – R$ ${notebook.pricing.maxWith32GbBrl.toLocaleString('pt-BR')}).`
    );
  } else if (answers.budget === 'budget_low' && breakdown.budget >= 25) {
    reasons.push(
      `Excelente folga orçamentária: parte de R$ ${notebook.pricing.minBrl.toLocaleString('pt-BR')}, liberando recursos para periféricos, RAM e SSD.`
    );
  }

  // 2. Tela vs Performance
  if (answers.screen_vs_perf === 'screen_priority' && breakdown.screen_vs_perf >= 25) {
    reasons.push(
      `Painel integrado de alta definição (${notebook.specs.display}) pronto para edição 4K e color grading sem monitor externo.`
    );
  } else if (answers.screen_vs_perf === 'balanced_1080p' && breakdown.screen_vs_perf >= 20) {
    reasons.push(
      `Equilíbrio entre GPU dedicada (${notebook.specs.gpu}) e painel Full HD com ${notebook.specs.displayColorSpace}.`
    );
  } else if (answers.screen_vs_perf === 'perf_external_monitor' && breakdown.screen_vs_perf >= 20) {
    reasons.push(
      `Ideal para bancada com monitor externo: prioriza poder de processamento (${notebook.specs.cpu}) e GPU por real investido.`
    );
  }

  // 3. Estratégia de RAM
  if (answers.upgrade_policy === 'ready_32gb_expandable' && breakdown.upgrade_policy >= 25) {
    reasons.push(
      `Sai de fábrica com 32 GB DDR5 prontos para uso e ainda permite expansão futura até ${notebook.specs.ramMaxGb} GB.`
    );
  } else if (answers.upgrade_policy === 'diy_upgrade' && breakdown.upgrade_policy >= 20) {
    reasons.push(
      `Compatível com a Estratégia de Upgrade (+R$ 800 médios para 32 GB DDR5 em 2 slots) mantendo a garantia nacional.`
    );
  } else if (answers.upgrade_policy === 'soldered_ok' && breakdown.upgrade_policy >= 25) {
    reasons.push(
      `Memória integrada de alta velocidade (${notebook.specs.ramDetails}) em construção fina e durável.`
    );
  }

  // 4. Armazenamento
  if (answers.storage_need === 'internal_1tb' && breakdown.storage_need >= 20) {
    reasons.push(
      `Entrega armazenamento generoso (${notebook.specs.storage}) para guardar projetos 4K e cache no próprio notebook.`
    );
  } else if (answers.storage_need === 'external_or_upgrade' && breakdown.storage_need >= 20) {
    reasons.push(
      `Configuração de ${notebook.specs.storage} otimiza o preço inicial para quem usa mídia externa ou segundo SSD NVMe.`
    );
  }

  // 5. Térmico vs Bateria
  if (answers.thermal_vs_battery === 'heavy_3d_render' && breakdown.thermal_vs_battery >= 20) {
    reasons.push(
      `Arquitetura térmica dimensionada para sustentar a ${notebook.specs.gpu} em renders longos no Blender/Cycles.`
    );
  } else if (answers.thermal_vs_battery === 'mixed_creative' && breakdown.thermal_vs_battery >= 20) {
    reasons.push(
      `Conjunto balanceado para Premiere Pro, DaVinci Resolve e 3D moderado com aceleração de hardware dedicada.`
    );
  } else if (answers.thermal_vs_battery === 'battery_efficiency' && breakdown.thermal_vs_battery >= 20) {
    reasons.push(
      `Alta eficiência energética para trabalhar longe da tomada com fluidez em edição de vídeo.`
    );
  }

  // 6. Peso do Notebook
  if (answers.weight_consideration === 'weight_strict' && breakdown.weight_consideration >= 25) {
    reasons.push(
      `Atende à sua exigência estrita de portabilidade pesando apenas ${notebook.specs.weightKg.toFixed(2).replace('.', ',')} kg.`
    );
  } else if (answers.weight_consideration === 'weight_moderate' && breakdown.weight_consideration >= 20) {
    reasons.push(
      `Peso equilibrado de ${notebook.specs.weightKg.toFixed(2).replace('.', ',')} kg, combinando mobilidade viável e dissipação térmica.`
    );
  } else if (answers.weight_consideration === 'weight_ignore' && breakdown.weight_consideration >= 20) {
    reasons.push(
      `Chassi de ${notebook.specs.weightKg.toFixed(2).replace('.', ',')} kg focado em estabilidade máxima de bancada sem restrições térmicas.`
    );
  }

  if (reasons.length === 0) {
    reasons.push(notebook.selectionReason);
  }

  return reasons;
}
