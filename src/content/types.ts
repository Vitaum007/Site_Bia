export type Locale = 'pt' | 'en';

export type SessionModalityId = 'pontual' | 'quinzenal' | 'semanal';

export interface SessionModality {
  id: SessionModalityId;
  title: string;
  frequencyLabel: string;
  summary: string;
  idealFor: string[];
  formatDetails: string;
  ctaLabel: string;
}

export interface MediaItem {
  id: string;
  category: 'tv' | 'youtube' | 'podcast' | 'press';
  outlet: string;
  /** Capa do vídeo (caminho em /public ou URL). Sem ela, a vitrine mostra uma capa em azul. */
  thumbnail?: string;
  /** Vídeo curto (mp4 em /public) usado só como prévia silenciosa ao passar o mouse. Opcional. */
  previewVideo?: string;
  title: {
    pt: string;
    en: string;
  };
  description: {
    pt: string;
    en: string;
  };
  url: string;
  featured: boolean;
}

export interface TalkTopic {
  id: string;
  title: {
    pt: string;
    en: string;
  };
  audience: {
    pt: string;
    en: string;
  };
  description: {
    pt: string;
    en: string;
  };
}

export interface ArticleItem {
  slug: string;
  readingTime: {
    pt: string;
    en: string;
  };
  theme: {
    pt: string;
    en: string;
  };
  title: {
    pt: string;
    en: string;
  };
  excerpt: {
    pt: string;
    en: string;
  };
  body: {
    pt: string[];
    en: string[];
  };
  featured: boolean;
}

export interface SiteDictionary {
  locale: Locale;
  meta: {
    title: string;
    description: string;
  };
  nav: {
    about: string;
    services: string;
    media: string;
    articles: string;
    contact: string;
    bookCta: string;
    languageLabel: string;
  };
  hero: {
    title: string;
    subtitle: string;
    credentials: string;
    primaryCta: string;
    secondaryCta: string;
    portraitCaption: string;
    highlights: {
      label: string;
      detail: string;
    }[];
  };
  about: {
    heading: string;
    lead: string;
    paragraphs: string[];
    pillars: {
      title: string;
      description: string;
    }[];
  };
  services: {
    heading: string;
    intro: string;
    selectorPrompt: string;
    modalities: SessionModality[];
    processHeading: string;
    processSteps: {
      title: string;
      description: string;
    }[];
    ethicsNote: string;
    processClosing: string;
    teenTherapy: {
      heading: string;
      paragraphs: string[];
    };
  };
  mediaSection: {
    heading: string;
    intro: string;
    viewAllCta: string;
    youtubeCta: string;
    categoryLabels: Record<MediaItem['category'], string>;
  };
  articlesSection: {
    heading: string;
    intro: string;
    viewAllCta: string;
    readArticleCta: string;
    backToArticles: string;
  };
  contact: {
    heading: string;
    intro: string;
    clinicalCard: {
      title: string;
      description: string;
      languagesNote: string;
      ctaLabel: string;
      whatsappHref: string;
    };
    mediaCard: {
      title: string;
      description: string;
      topicsNote: string;
      ctaLabel: string;
      emailHref: string;
    };
    socialHeading: string;
    instagramLabel: string;
    youtubeLabel: string;
  };
  mediaPage: {
    heading: string;
    intro: string;
    tvAndPressHeading: string;
    youtubeHeading: string;
    youtubeDescription: string;
    talksHeading: string;
    talksIntro: string;
    pressKitHeading: string;
    pressKitBio: string;
    pressKitCta: string;
  };
  footer: {
    tagline: string;
    crpLabel: string;
    ethicsDisclaimer: string;
    rights: string;
  };
}
