import type { SiteDictionary } from '../types.ts';

export const ptDictionary: SiteDictionary = {
  locale: 'pt',
  meta: {
    title: 'Bia Carone | Psicóloga Clínica, Palestras & Parcerias',
    description:
      'Psicoterapia para adolescentes, orientação a pais e adultos em português e inglês. Participações na mídia, canal no YouTube e palestras.',
  },
  nav: {
    about: 'Sobre mim',
    services: 'Atendimento',
    media: 'Palestras e parcerias',
    articles: 'Textos',
    contact: 'Contato',
    bookCta: 'Agende sua sessão',
    languageLabel: 'EN',
  },
  hero: {
    title: 'Nem tudo está sob nosso controle. Mas há muito que podemos construir a partir do que vivemos.',
    subtitle:
      'Psicoterapia em português e inglês para adolescentes, jovens e adultos. Palestras e parcerias em saúde emocional.',
    credentials: 'Bia Carone · Psicóloga Clínica',
    primaryCta: 'Agende sua primeira sessão',
    secondaryCta: 'Palestras, TV e parcerias',
    portraitCaption: 'Bia Carone · Psicóloga Clínica',
    highlights: [
      {
        label: 'Atendimento bilíngue',
        detail: 'Sessões clínicas em português e inglês (online)',
      },
      {
        label: 'Adolescentes, pais e adultos',
        detail: 'Acolhimento ético para fases de transição, vínculos e amadurecimento',
      },
      {
        label: 'Televisão, YouTube e palestras',
        detail: 'Comunicação acessível e fundamentada para imprensa, escolas e eventos',
      },
    ],
  },
  about: {
    heading: 'Minha história e trajetória clínica',
    lead: 'Minha trajetória na psicologia é marcada pelo interesse em compreender o ser humano em sua complexidade e integralidade.',
    paragraphs: [
      'Ao longo de seis anos de atuação clínica, desenvolvi um trabalho com adolescentes, jovens e adultos, considerando suas dimensões corporal, psíquica e espiritual.',
      'Minha prática integra a Logoterapia, a Terapia Cognitivo-Comportamental e os fundamentos da Psicologia do Bom Senso, unindo acolhimento, reflexão e responsabilidade diante da própria história.',
    ],
    pillars: [
      {
        title: 'Psicoterapia Clínica',
        description:
          'Atendimento on-line em português e inglês para adolescentes, jovens e adultos, com foco no desenvolvimento emocional, amadurecimento e compreensão de si e da própria realidade. Um processo que integra acolhimento, reflexão e ferramentas práticas para lidar com os desafios da vida e construir respostas mais conscientes. Inclui orientação parental.',
      },
      {
        title: 'Supervisão Clínica',
        description:
          'Acompanhamento e orientação de psicólogos em sua prática clínica, com espaço para discussão de casos, aprofundamento teórico e reflexão sobre a condução dos atendimentos. Um processo voltado ao desenvolvimento do raciocínio clínico, da segurança e da maturidade profissional.',
      },
      {
        title: 'Palestras, Mídia e Parcerias',
        description:
          'Aberta a convites para palestras, entrevistas, participações em programas e projetos de comunicação, além de parcerias com empresas e marcas.',
      },
    ],
  },
  services: {
    heading: 'Formatos de atendimento',
    intro:
      'Cada processo terapêutico tem suas particularidades. Os formatos apresentados são possibilidades que podem ser ajustadas ao longo do processo. Selecione abaixo a modalidade para entender como funciona.',
    selectorPrompt: 'Escolha o formato para ver os detalhes:',
    modalities: [
      {
        id: 'semanal',
        title: 'Acompanhamento semanal',
        frequencyLabel: 'Encontros semanais · 50 a 60 minutos · Português ou inglês',
        summary:
          'Encontros regulares para trabalhar questões emocionais, relacionais e comportamentais, aprofundar o autoconhecimento e desenvolver recursos para lidar com os desafios da vida.',
        idealFor: [
          'Questões relacionadas à ansiedade, relacionamentos, autoestima e identidade',
          'Momentos de transição, conflitos e desafios pessoais',
          'Espaço contínuo de reflexão, elaboração e desenvolvimento emocional',
        ],
        formatDetails: 'A frequência dos encontros não precisa ser definida antes do primeiro contato. Na sessão inicial, conversamos sobre suas demandas e expectativas e, a partir da avaliação clínica, alinhamos juntos o formato de acompanhamento mais adequado para o seu momento e suas necessidades.',
        ctaLabel: 'Agendar primeira sessão',
      },
      {
        id: 'quinzenal',
        title: 'Acompanhamento quinzenal',
        frequencyLabel: 'Encontros quinzenais · 50 a 60 minutos · Português ou inglês',
        summary:
          'Encontros com frequência quinzenal, oferecendo um espaço regular para refletir sobre experiências, trabalhar questões específicas e desenvolver novas perspectivas diante dos desafios cotidianos.',
        idealFor: [
          'Questões emocionais, relacionais e comportamentais',
          'Momentos de reflexão e desenvolvimento pessoal',
          'Acompanhamento de demandas que podem ser trabalhadas nessa frequência, conforme avaliação clínica',
        ],
        formatDetails: 'A frequência dos atendimentos é definida em conjunto, considerando as necessidades, os objetivos e o contexto de cada pessoa. Na primeira sessão, conversamos sobre suas demandas e avaliamos qual formato pode fazer mais sentido naquele momento. Essa frequência também pode ser revista ao longo do processo, conforme a evolução e as necessidades clínicas.',
        ctaLabel: 'Consultar disponibilidade',
      },
      {
        id: 'pontual',
        title: 'Atendimento pontual e orientação parental',
        frequencyLabel: 'Encontros de até 90 minutos · Português ou inglês',
        summary:
          'Encontros direcionados a demandas específicas, dilemas ou situações que exigem um espaço de escuta, reflexão e orientação psicológica. Uma oportunidade para compreender melhor uma questão, ampliar perspectivas e identificar possibilidades de ação.',
        idealFor: [
          'Orientação parental: encontros destinados exclusivamente aos pais ou responsáveis, sem a presença da criança ou adolescente',
          'Espaço para compreender comportamentos, refletir sobre desafios da parentalidade e desenvolver recursos para lidar com questões relacionadas ao desenvolvimento dos filhos',
          'A orientação parental pode ser realizada independentemente de a criança ou adolescente estar em acompanhamento psicológico comigo',
        ],
        formatDetails: 'Atendimento on-line · Português ou Inglês',
        ctaLabel: 'Solicitar atendimento pontual',
      },
    ],
    processHeading: 'Como começa o atendimento',
    processSteps: [
      {
        title: 'Primeiro contato',
        description:
          'Você compartilha sua disponibilidade, o idioma de preferência (português ou inglês) e o atendimento que procura: psicoterapia individual ou orientação parental.',
      },
      {
        title: 'Primeira sessão',
        description:
          'Um espaço para conversar sobre sua história, seu momento atual e o que motivou a busca por terapia. Você também poderá conhecer minha forma de trabalhar e compartilhar suas expectativas.',
      },
      {
        title: 'Alinhamentos e continuidade',
        description:
          'Conversamos sobre os próximos passos, a frequência dos encontros, os honorários e o contrato terapêutico, alinhando tudo com clareza para o acompanhamento.',
      },
    ],
    ethicsNote:
      'Atendimento realizado em estrita observância ao Código de Ética Profissional do Psicólogo (CFP).',
    processClosing:
      'A primeira sessão já faz parte do processo terapêutico: é um momento de escuta, acolhimento e compreensão da sua história.',
    teenTherapy: {
      heading: 'Terapia com Adolescentes',
      paragraphs: [
        'Quando o atendimento é destinado a um adolescente menor de idade, o início do processo envolve também a participação dos pais ou responsáveis.',
        'Além do primeiro contato, são realizados encontros iniciais com os responsáveis e com o adolescente, em momentos próprios, para que eu possa conhecer a história, compreender as diferentes perspectivas sobre a busca pela terapia e entender as demandas envolvidas.',
        'Nessa etapa, também conversamos sobre como será a parceria com a família ao longo do acompanhamento, esclarecendo o papel dos responsáveis e do psicólogo, os limites do sigilo profissional e a importância de preservar um espaço de confiança para o adolescente.',
      ],
    },
  },
  mediaSection: {
    heading: 'Na mídia, TV e YouTube',
    intro:
      'Participações em programas de televisão, entrevistas para a imprensa e conteúdos em vídeo sobre comportamento, adolescência e saúde mental.',
    viewAllCta: 'Ver todas as participações e Press Kit',
    youtubeCta: 'Conhecer o canal no YouTube',
    categoryLabels: {
      tv: 'Televisão',
      youtube: 'YouTube',
      podcast: 'Podcast / Entrevista',
      press: 'Imprensa',
    },
  },
  articlesSection: {
    heading: 'Textos e reflexões',
    intro:
      'Escritos pontuais sobre clínica, vínculos familiares, adolescência e vida adulta.',
    viewAllCta: 'Ler todos os textos',
    readArticleCta: 'Ler texto completo',
    backToArticles: 'Voltar para todos os textos',
  },
  contact: {
    heading: 'Vamos conversar',
    intro:
      'Escolha o canal de contato mais adequado para agendamentos, dúvidas sobre os atendimentos ou convites profissionais.',
    clinicalCard: {
      title: 'Psicoterapia, orientação parental e supervisão clínica',
      description:
        'Para agendar uma primeira sessão, conhecer melhor as modalidades de atendimento ou conversar sobre supervisão clínica.',
      languagesNote: 'Atendimento em Português e Inglês · Online',
      ctaLabel: 'Entrar em contato',
      whatsappHref: 'https://wa.me/5519999846516?text=Ol%C3%A1%2C%20Bia!%20Gostaria%20de%20saber%20mais%20sobre%20o%20atendimento%20psicol%C3%B3gico.',
    },
    mediaCard: {
      title: 'Convites e projetos profissionais',
      description:
        'Aberta a convites para palestras, entrevistas, participações em programas e projetos de comunicação, além de parcerias com empresas e marcas.',
      topicsNote: 'Disponibilidade para eventos presenciais e transmissões ao vivo',
      ctaLabel: 'Entrar em contato',
      emailHref: 'mailto:biacarones@gmail.com?subject=Convite%20-%20Palestra%20ou%20Parceria',
    },
    socialHeading: 'Acompanhe também nas redes',
    instagramLabel: 'Me siga no Instagram',
    youtubeLabel: 'Canal no YouTube',
  },
  mediaPage: {
    heading: 'Na mídia, palestras e canal no YouTube',
    intro:
      'Central de participações em televisão, entrevistas, vídeos autorais e informações para produtores de imprensa e organizadores de eventos.',
    tvAndPressHeading: 'Participações em televisão e imprensa',
    youtubeHeading: 'Canal no YouTube',
    youtubeDescription:
      'Espaço dedicado aos vídeos e reflexões gravados para o YouTube, aprofundando temas do cotidiano clínico com linguagem direta.',
    talksHeading: 'Temas para palestras, escolas e encontros',
    talksIntro:
      'Palestras e rodas de conversa desenhadas para escolas, famílias, empresas e eventos de saúde emocional.',
    pressKitHeading: 'Informações para imprensa e produtores',
    pressKitBio:
      'Bia Carone é psicóloga clínica com atuação voltada a adolescentes, orientação de pais e adultos em português e inglês. Participa regularmente como especialista convidada em programas de televisão e eventos educativos.',
    pressKitCta: 'Entrar em contato com a assessoria / Bia Carone',
  },
  footer: {
    tagline: 'Psicologia clínica, amadurecimento e sentido de vida.',
    crpLabel: 'Bia Carone · Psicóloga',
    ethicsDisclaimer:
      'Atenção: Este site não oferece atendimento de urgência ou emergência. Em caso de crise emocional aguda, ligue 188 (CVV) ou procure o serviço de saúde mais próximo.',
    rights: 'Todos os direitos reservados.',
  },
};
