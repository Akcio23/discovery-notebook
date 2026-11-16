export const QUESTIONS = [
  {
    id: 'budget',
    step: '01',
    question: 'Qual é a sua margem de investimento total (incluindo eventuais upgrades ou periféricos)?',
    options: [
      {
        id: 'budget_high',
        keyHint: '1',
        label: 'Limite de R$ 10.000 ou leve flexibilização (até R$ 10.600)',
      },
      {
        id: 'budget_mid',
        keyHint: '2',
        label: 'Faixa Topo de Linha dentro do Teto (R$ 8.300 a R$ 9.990)',

      },
      {
        id: 'budget_low',
        keyHint: '3',
        label: 'Custo-Benefício Estratégico (R$ 6.500 a R$ 8.400)',

      }
    ]
  },
  {
    id: 'screen_vs_perf',
    step: '02',
    question:
      'Na sua rotina de edição e 3D, o que tem prioridade: poder bruto de renderização ou fidelidade da tela do próprio notebook?',
    options: [
      {
        id: 'screen_priority',
        keyHint: '1',
        label: 'Qualidade máxima da tela integrada (WQXGA 16:10 / 2.5K / Liquid Retina)',
      },
      {
        id: 'balanced_1080p',
        keyHint: '2',
        label: 'Equilíbrio: GPU dedicada forte + Tela Full HD 100% sRGB',
      },
      {
        id: 'perf_external_monitor',
        keyHint: '3',
        label: 'Força bruta ou economia máxima para usar com Monitor Externo',
      }
    ]
  },
  {
    id: 'upgrade_policy',
    step: '03',
    question: 'Como você prefere lidar com os 32 GB de RAM recomendados para edição 4K e 3D?',
    options: [
      {
        id: 'ready_32gb_expandable',
        keyHint: '1',
        label: '32 GB de fábrica + Expansão futura (até 64 GB)',
      },
      {
        id: 'diy_upgrade',
        keyHint: '2',
        label: 'Estratégia de Upgrade: Comprar 16 GB + instalar pente extra (+R$ 800)',
      },
      {
        id: 'soldered_ok',
        keyHint: '3',
        label: 'Memória soldada de alta velocidade / Chassi fino corporativo',
      }
    ]
  },
  {
    id: 'storage_need',
    step: '04',
    question: 'Em relação ao espaço para arquivos brutos de vídeo (footage 4K) e cache de projetos:',
    options: [
      {
        id: 'internal_1tb',
        keyHint: '1',
        label: 'Preciso de 1 TB NVMe interno já de fábrica',
      },
      {
        id: 'external_or_upgrade',
        keyHint: '2',
        label: '512 GB internos bastam inicialmente (uso SSD externo ou farei upgrade)',
      }
    ]
  },
  {
    id: 'thermal_vs_battery',
    step: '05',
    question: 'Qual é o perfil das suas sessões de renderização e uso fora da tomada?',
    options: [
      {
        id: 'heavy_3d_render',
        keyHint: '1',
        label: 'Renderizações 3D longas (Blender/Cycles) e exportações pesadas na tomada',
      },
      {
        id: 'mixed_creative',
        keyHint: '2',
        label: 'Edição 4K intensa (Premiere/DaVinci) e 3D moderado com equilíbrio',
      },
      {
        id: 'battery_efficiency',
        keyHint: '3',
        label: 'Máxima autonomia de bateria e eficiência longe da tomada',
      }
    ]
  },
  {
    id: 'weight_consideration',
    step: '06',
    category: 'Consideração do Peso do Notebook na Análise',
    question:
      'O peso físico do notebook (que varia de 1,51 kg a 2,81 kg na pesquisa) deve ser considerado um fator decisivo na sua análise?',
    options: [
      {
        id: 'weight_strict',
        keyHint: '1',
        label: 'Sim, é prioritário: preciso de um notebook verdadeiramente leve (1,51 kg a 1,95 kg)',
      },
      {
        id: 'weight_moderate',
        keyHint: '2',
        label: 'Sim, com moderação: aceito peso intermediário (2,10 kg a 2,40 kg)',
      },
      {
        id: 'weight_ignore',
        keyHint: '3',
        label: 'Não considerar o peso: uso fixo em bancada (até 2,81 kg aceitável)',
      }
    ]
  }
];

export const WEIGHT_MATRIX = {
  'lenovo-legion-slim-5': {
    budget: { budget_high: 15, budget_mid: 25, budget_low: 5 },
    screen_vs_perf: { screen_priority: 25, balanced_1080p: 15, perf_external_monitor: 15 },
    upgrade_policy: { ready_32gb_expandable: 5, diy_upgrade: 25, soldered_ok: 0 },
    storage_need: { internal_1tb: 25, external_or_upgrade: 10 },
    thermal_vs_battery: { heavy_3d_render: 25, mixed_creative: 25, battery_efficiency: 5 },
    weight_consideration: { weight_strict: 5, weight_moderate: 25, weight_ignore: 20 }
  },
  'acer-predator-helios-neo-16': {
    budget: { budget_high: 15, budget_mid: 25, budget_low: 10 },
    screen_vs_perf: { screen_priority: 25, balanced_1080p: 15, perf_external_monitor: 20 },
    upgrade_policy: { ready_32gb_expandable: 5, diy_upgrade: 25, soldered_ok: 0 },
    storage_need: { internal_1tb: 20, external_or_upgrade: 15 },
    thermal_vs_battery: { heavy_3d_render: 25, mixed_creative: 15, battery_efficiency: 0 },
    weight_consideration: { weight_strict: 0, weight_moderate: 5, weight_ignore: 25 }
  },
  'lenovo-loq-15irx9': {
    budget: { budget_high: 10, budget_mid: 25, budget_low: 5 },
    screen_vs_perf: { screen_priority: 5, balanced_1080p: 25, perf_external_monitor: 25 },
    upgrade_policy: { ready_32gb_expandable: 5, diy_upgrade: 25, soldered_ok: 0 },
    storage_need: { internal_1tb: 0, external_or_upgrade: 25 },
    thermal_vs_battery: { heavy_3d_render: 25, mixed_creative: 20, battery_efficiency: 0 },
    weight_consideration: { weight_strict: 5, weight_moderate: 25, weight_ignore: 20 }
  },
  'avell-ion-a70': {
    budget: { budget_high: 25, budget_mid: 25, budget_low: 0 },
    screen_vs_perf: { screen_priority: 25, balanced_1080p: 10, perf_external_monitor: 15 },
    upgrade_policy: { ready_32gb_expandable: 30, diy_upgrade: 5, soldered_ok: 5 },
    storage_need: { internal_1tb: 25, external_or_upgrade: 10 },
    thermal_vs_battery: { heavy_3d_render: 20, mixed_creative: 25, battery_efficiency: 10 },
    weight_consideration: { weight_strict: 30, weight_moderate: 25, weight_ignore: 15 }
  },
  'dell-inspiron-16-plus': {
    budget: { budget_high: 30, budget_mid: 10, budget_low: 0 },
    screen_vs_perf: { screen_priority: 25, balanced_1080p: 10, perf_external_monitor: 5 },
    upgrade_policy: { ready_32gb_expandable: 10, diy_upgrade: 0, soldered_ok: 30 },
    storage_need: { internal_1tb: 25, external_or_upgrade: 10 },
    thermal_vs_battery: { heavy_3d_render: 10, mixed_creative: 25, battery_efficiency: 15 },
    weight_consideration: { weight_strict: 10, weight_moderate: 25, weight_ignore: 15 }
  },
  'avell-storm-450': {
    budget: { budget_high: 5, budget_mid: 10, budget_low: 25 },
    screen_vs_perf: { screen_priority: 5, balanced_1080p: 25, perf_external_monitor: 10 },
    upgrade_policy: { ready_32gb_expandable: 30, diy_upgrade: 5, soldered_ok: 0 },
    storage_need: { internal_1tb: 25, external_or_upgrade: 10 },
    thermal_vs_battery: { heavy_3d_render: 10, mixed_creative: 20, battery_efficiency: 10 },
    weight_consideration: { weight_strict: 15, weight_moderate: 25, weight_ignore: 15 }
  },
  'dell-g15-5530': {
    budget: { budget_high: 5, budget_mid: 15, budget_low: 25 },
    screen_vs_perf: { screen_priority: 5, balanced_1080p: 20, perf_external_monitor: 20 },
    upgrade_policy: { ready_32gb_expandable: 5, diy_upgrade: 25, soldered_ok: 0 },
    storage_need: { internal_1tb: 25, external_or_upgrade: 10 },
    thermal_vs_battery: { heavy_3d_render: 30, mixed_creative: 15, battery_efficiency: 0 },
    weight_consideration: { weight_strict: 0, weight_moderate: 0, weight_ignore: 30 }
  },
  'asus-tuf-gaming-a15': {
    budget: { budget_high: 5, budget_mid: 10, budget_low: 30 },
    screen_vs_perf: { screen_priority: 5, balanced_1080p: 25, perf_external_monitor: 15 },
    upgrade_policy: { ready_32gb_expandable: 5, diy_upgrade: 25, soldered_ok: 0 },
    storage_need: { internal_1tb: 0, external_or_upgrade: 25 },
    thermal_vs_battery: { heavy_3d_render: 20, mixed_creative: 20, battery_efficiency: 20 },
    weight_consideration: { weight_strict: 10, weight_moderate: 25, weight_ignore: 20 }
  },
  'acer-nitro-v15': {
    budget: { budget_high: 0, budget_mid: 5, budget_low: 30 },
    screen_vs_perf: { screen_priority: 0, balanced_1080p: 0, perf_external_monitor: 30 },
    upgrade_policy: { ready_32gb_expandable: 5, diy_upgrade: 25, soldered_ok: 0 },
    storage_need: { internal_1tb: 0, external_or_upgrade: 25 },
    thermal_vs_battery: { heavy_3d_render: 15, mixed_creative: 15, battery_efficiency: 10 },
    weight_consideration: { weight_strict: 15, weight_moderate: 25, weight_ignore: 15 }
  },
  'apple-macbook-air-15-m3': {
    budget: { budget_high: 20, budget_mid: 25, budget_low: 0 },
    screen_vs_perf: { screen_priority: 30, balanced_1080p: 5, perf_external_monitor: 0 },
    upgrade_policy: { ready_32gb_expandable: 0, diy_upgrade: 0, soldered_ok: 30 },
    storage_need: { internal_1tb: 0, external_or_upgrade: 25 },
    thermal_vs_battery: { heavy_3d_render: 0, mixed_creative: 25, battery_efficiency: 30 },
    weight_consideration: { weight_strict: 30, weight_moderate: 20, weight_ignore: 10 }
  }
};
