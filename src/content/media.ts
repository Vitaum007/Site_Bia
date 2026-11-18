import type { MediaItem, TalkTopic } from './types.ts';

export const mediaItems: MediaItem[] = [
  {
    id: 'tv-band-mulher',
    category: 'tv',
    outlet: 'Band Mulher · Band Campinas',
    title: {
      pt: 'Entrevista no Band Mulher sobre saúde emocional e comportamento',
      en: 'Band Mulher interview on emotional health and behavior',
    },
    description: {
      pt: 'Participação de Bia Carone no programa Band Mulher (Band Campinas), compartilhando reflexões clínicas sobre saúde mental e relações.',
      en: 'Bia Carone’s appearance on Band Mulher (Band Campinas), sharing clinical insights on mental health and relationships.',
    },
    url: 'https://www.youtube.com/watch?v=IgO4Znn5r9Q',
    featured: true,
  },
  {
    id: 'tv-mulher-com-vestibular',
    category: 'tv',
    outlet: 'Mulher.com · Rede Século 21',
    title: {
      pt: 'Vestibular sem perder a saúde mental: como lidar com a pressão nessa fase?',
      en: 'College entrance exams without losing mental health: handling pressure',
    },
    description: {
      pt: 'Entrevista sobre ansiedade pré-vestibular, mitos do estudo excessivo e técnicas práticas de regulação emocional para jovens.',
      en: 'Interview on pre-exam anxiety, over-studying myths, and practical emotional regulation techniques for youth.',
    },
    url: 'https://www.youtube.com/watch?v=ySZij7wHrw0',
    featured: true,
  },
  {
    id: 'tv-rf-bullying',
    category: 'tv',
    outlet: 'RF Com Você · Rede Família',
    title: {
      pt: 'Bullying: quando a “brincadeira” passa do limite',
      en: 'Bullying: when “just joking” crosses the line',
    },
    description: {
      pt: 'Conversa sobre os impactos emocionais do bullying, sinais de alerta na escola e o papel da família na escuta e no acolhimento.',
      en: 'Discussion on the emotional impact of bullying, warning signs at school, and the family’s role in listening and support.',
    },
    url: 'https://youtu.be/oOjLjxVH4NM',
    featured: true,
  },
  {
    id: 'tv-estudio-camara-era-digital',
    category: 'tv',
    outlet: 'Estúdio Câmara · TV Câmara Campinas',
    title: {
      pt: 'Pais e filhos na era digital: como monitorar sem ultrapassar limites',
      en: 'Parents and children in the digital age: monitoring without overstepping',
    },
    description: {
      pt: 'Debate sobre educação digital parental, construção de confiança, privacidade e limites saudáveis no uso de telas na adolescência.',
      en: 'Discussion on digital parenting, building trust, privacy, and healthy screen boundaries during adolescence.',
    },
    url: 'https://www.youtube.com/watch?v=o8xnLC4AjNg',
    featured: true,
  },
  {
    id: 'tv-ponto-de-vista-coaches-mirins',
    category: 'tv',
    outlet: 'Ponto de Vista · TV',
    title: {
      pt: 'Coaches mirins e pressão precoce na infância e adolescência',
      en: 'Child influencers, “junior coaches,” and early pressure in youth',
    },
    description: {
      pt: 'Análise clínica sobre o fenômeno dos “coaches mirins”, exposição nas redes sociais e os impactos emocionais da adultização precoce.',
      en: 'Clinical perspective on the “junior coach” trend, social media exposure, and the emotional impacts of early adultification.',
    },
    url: 'https://www.youtube.com/watch?v=MmhpzkuP3JE',
    featured: true,
  },
  {
    id: 'tv-globoplay-eptv',
    category: 'tv',
    outlet: 'EPTV · Globoplay',
    title: {
      pt: 'Reportagem especial na EPTV / Globoplay',
      en: 'Special feature on EPTV / Globoplay',
    },
    description: {
      pt: 'Participação de Bia Carone como psicóloga clínica convidada em reportagem exibida na EPTV e disponível no Globoplay.',
      en: 'Bia Carone featured as guest clinical psychologist in an EPTV broadcast segment available on Globoplay.',
    },
    url: 'https://globoplay.globo.com/v/13107221/',
    featured: true,
  },
  {
    id: 'tv-aparicao-6',
    category: 'tv',
    outlet: 'Entrevista na TV',
    title: {
      pt: 'Participação na TV sobre saúde emocional e vínculos familiares',
      en: 'TV appearance on emotional health and family bonds',
    },
    description: {
      pt: 'Entrevista em televisão abordando acolhimento emocional, adolescência e o diálogo no ambiente familiar.',
      en: 'Television interview covering emotional support, adolescence, and family dialogue.',
    },
    url: 'https://www.youtube.com/watch?v=48feBOsoDkA',
    featured: true,
  },
  {
    id: 'tv-aparicao-7',
    category: 'tv',
    outlet: 'Entrevista na TV',
    title: {
      pt: 'Participação na TV sobre psicologia clínica e adolescência',
      en: 'TV appearance on clinical psychology and adolescence',
    },
    description: {
      pt: 'Entrevista em televisão com orientações práticas para pais, educadores e adolescentes.',
      en: 'Television interview offering practical guidance for parents, educators, and adolescents.',
    },
    url: 'https://www.youtube.com/watch?v=ijZj2uNFrTU',
    featured: true,
  },
  {
    id: 'tv-aparicao-live',
    category: 'tv',
    outlet: 'Transmissão ao vivo · TV',
    title: {
      pt: 'Participação ao vivo sobre comportamento e saúde mental',
      en: 'Live broadcast appearance on behavior and mental health',
    },
    description: {
      pt: 'Entrevista ao vivo (iniciando no trecho da participação de Bia Carone) sobre saúde mental e cotidiano.',
      en: 'Live broadcast interview (starting at Bia Carone’s segment) on mental health and everyday life.',
    },
    url: 'https://www.youtube.com/live/3-eL-wY0QAY?si=1niPmaNZfaYmNT_d&t=632',
    featured: true,
  },
  {
    id: 'band-materia-1',
    category: 'press',
    outlet: 'Band',
    title: {
      pt: 'Matéria na Band: [Aguardando link e título da 1ª matéria]',
      en: 'Band Feature: [Awaiting link and title for 1st article]',
    },
    description: {
      pt: 'Espaço reservado para a primeira matéria publicada na Band com participação de Bia Carone.',
      en: 'Slot reserved for the first Band feature article featuring Bia Carone.',
    },
    url: '#link-band-1',
    featured: false,
  },
  {
    id: 'band-materia-2',
    category: 'press',
    outlet: 'Band',
    title: {
      pt: 'Matéria na Band: [Aguardando link e título da 2ª matéria]',
      en: 'Band Feature: [Awaiting link and title for 2nd article]',
    },
    description: {
      pt: 'Espaço reservado para a segunda matéria publicada na Band com participação de Bia Carone.',
      en: 'Slot reserved for the second Band feature article featuring Bia Carone.',
    },
    url: '#link-band-2',
    featured: false,
  },
  {
    id: 'youtube-destaque-1',
    category: 'youtube',
    outlet: 'Canal Bia Carone · YouTube',
    title: {
      pt: 'Como identificar quando um adolescente precisa de espaço ou de escuta clínica',
      en: 'Recognizing when an adolescent needs space versus clinical listening',
    },
    description: {
      pt: 'Espaço para incorporar (embed) ou linkar os vídeos do canal do YouTube da Bia.',
      en: 'Slot to embed or link videos from Bia Carone’s YouTube channel.',
    },
    url: '#link-youtube-1',
    featured: false,
  },
  {
    id: 'youtube-destaque-2',
    category: 'youtube',
    outlet: 'Canal Bia Carone · YouTube',
    title: {
      pt: 'Ansiedade na adolescência: sinais que merecem atenção',
      en: 'Anxiety in adolescence: signs that deserve attention',
    },
    description: {
      pt: 'Espaço para mais um vídeo do canal do YouTube.',
      en: 'Slot for another video from the YouTube channel.',
    },
    url: '#link-youtube-2',
    featured: false,
  },
  {
    id: 'youtube-destaque-3',
    category: 'youtube',
    outlet: 'Canal Bia Carone · YouTube',
    title: {
      pt: 'Como conversar com um adolescente sem transformar tudo em conflito',
      en: 'How to talk with a teenager without turning everything into conflict',
    },
    description: {
      pt: 'Espaço para mais um vídeo do canal do YouTube.',
      en: 'Slot for another video from the YouTube channel.',
    },
    url: '#link-youtube-3',
    featured: false,
  },
];

export const talkTopics: TalkTopic[] = [
  {
    id: 'adolescencia-pais',
    title: {
      pt: 'Adolescência contemporânea: pontes entre pais, escola e filhos',
      en: 'Contemporary adolescence: building bridges between parents, schools, and youth',
    },
    audience: {
      pt: 'Escolas, encontros de famílias e instituições de ensino',
      en: 'Schools, parent associations, and educational institutions',
    },
    description: {
      pt: 'Uma conversa franca e fundamentada sobre desenvolvimento emocional, autonomia, telas e construção de confiança.',
      en: 'A grounded conversation on emotional development, autonomy, screen life, and building trust.',
    },
  },
  {
    id: 'saude-emocional-adultos',
    title: {
      pt: 'Saúde emocional, vínculos e limites na vida adulta',
      en: 'Emotional health, boundaries, and relationships in adulthood',
    },
    audience: {
      pt: 'Empresas, eventos corporativos e painéis de bem-estar',
      en: 'Organizations, corporate events, and wellbeing panels',
    },
    description: {
      pt: 'Reflexões práticas sobre esgotamento, qualidade das relações e amadurecimento emocional.',
      en: 'Practical reflections on burnout, relationship quality, and emotional maturity.',
    },
  },
];
