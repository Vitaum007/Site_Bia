import type { ArticleItem } from './types.ts';

export const articleItems: ArticleItem[] = [
  {
    slug: 'escuta-na-adolescencia',
    readingTime: {
      pt: 'Leitura de 4 min',
      en: '4 min read',
    },
    theme: {
      pt: 'Adolescência & Família',
      en: 'Adolescence & Family',
    },
    title: {
      pt: 'O que o silêncio do adolescente tenta comunicar dentro de casa',
      en: 'What an adolescent’s silence is trying to communicate at home',
    },
    excerpt: {
      pt: '[Placeholder de Texto Autoral] Uma reflexão sobre como diferenciar o recolhimento natural do amadurecimento de sinais que pedem acolhimento clínico e orientação parental.',
      en: '[Essay Placeholder] A reflection on distinguishing the natural privacy of growing up from signs that call for clinical care and parent guidance.',
    },
    body: {
      pt: [
        '[Placeholder — Parágrafo 1] Este espaço foi desenhado para receber textos pontuais da Bia Carone sem a pressão de um blog com datas rígidas. O layout valoriza a leitura calma e a tipografia editorial.',
        '[Placeholder — Parágrafo 2] Na clínica com adolescentes e pais, uma das dúvidas mais frequentes é saber quando intervir e quando sustentar a presença silenciosa.',
        '[Placeholder — Parágrafo 3] Quando o conteúdo final for enviado, basta substituir os parágrafos deste arquivo em src/content/articles.ts.',
      ],
      en: [
        '[Placeholder — Paragraph 1] This space is designed to hold occasional essays by Bia Carone without the pressure of a dated blog feed. The layout prioritizes calm reading and editorial typography.',
        '[Placeholder — Paragraph 2] In clinical work with adolescents and parents, one of the most common questions is knowing when to step in and when to offer steady presence.',
        '[Placeholder — Paragraph 3] Once the final copy is ready, simply replace the paragraphs in src/content/articles.ts.',
      ],
    },
    featured: true,
  },
  {
    slug: 'terapia-em-dois-idiomas',
    readingTime: {
      pt: 'Leitura de 3 min',
      en: '3 min read',
    },
    theme: {
      pt: 'Clínica Bilíngue',
      en: 'Bilingual Practice',
    },
    title: {
      pt: 'Habitar dois idiomas: como a língua materna e o inglês atravessam a terapia',
      en: 'Living between two languages: how mother tongue and English shape therapy',
    },
    excerpt: {
      pt: '[Placeholder de Texto Autoral] Notas sobre o atendimento clínico em português e inglês e as nuances emocionais de quem vive, trabalha ou estuda entre culturas diferentes.',
      en: '[Essay Placeholder] Notes on clinical practice in English and Portuguese and the emotional nuances of living, working, or studying across cultures.',
    },
    body: {
      pt: [
        '[Placeholder — Parágrafo 1] Expressar afetos, memórias e conflitos em outro idioma transforma a maneira como nos escutamos na clínica.',
        '[Placeholder — Parágrafo 2] Este segundo artigo estrutural demonstra como o hub de textos se comporta com múltiplas publicações em português e inglês.',
      ],
      en: [
        '[Placeholder — Paragraph 1] Expressing memories, affects, and conflicts in a second language reshapes how we hear ourselves in therapy.',
        '[Placeholder — Paragraph 2] This second structural essay demonstrates how the essays hub behaves across both Portuguese and English routes.',
      ],
    },
    featured: true,
  },
];
