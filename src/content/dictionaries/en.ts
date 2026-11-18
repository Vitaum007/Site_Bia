import type { SiteDictionary } from '../types.ts';

export const enDictionary: SiteDictionary = {
  locale: 'en',
  meta: {
    title: 'Bia Carone | Clinical Psychologist, Speaking & Partnerships',
    description:
      'Psychotherapy in English and Portuguese for adolescents, parents, and adults. Television appearances, YouTube channel, and speaking engagements.',
  },
  nav: {
    about: 'About',
    services: 'Therapy',
    media: 'Speaking & Partnerships',
    articles: 'Essays',
    contact: 'Contact',
    bookCta: 'Book a session',
    languageLabel: 'PT',
  },
  hero: {
    title: 'Not everything is in our control. But there is much we can build from what we live through.',
    subtitle:
      'Psychotherapy in English and Portuguese for adolescents, young people, and adults. Speaking engagements and partnerships in emotional health.',
    credentials: 'Bia Carone · Clinical Psychologist',
    primaryCta: 'Book your first session',
    secondaryCta: 'Speaking, TV & partnerships',
    portraitCaption: 'Bia Carone · Clinical Psychologist',
    highlights: [
      {
        label: 'Bilingual practice',
        detail: 'Clinical sessions in English and Portuguese (online)',
      },
      {
        label: 'Adolescents, parents & adults',
        detail: 'Thoughtful care for life transitions, family bonds, and personal growth',
      },
      {
        label: 'Television, YouTube & talks',
        detail: 'Accessible, evidence-informed perspectives for media, schools, and organizations',
      },
    ],
  },
  about: {
    heading: 'My story and clinical journey',
    lead: 'My path in psychology has been shaped by a deep interest in understanding the human being in all its complexity and wholeness.',
    paragraphs: [
      'Over six years of clinical practice, I have built a body of work with adolescents, young people, and adults, considering their physical, psychological, and spiritual dimensions.',
      'My approach integrates Logotherapy, Cognitive-Behavioral Therapy, and the foundations of Common Sense Psychology, bringing together care, reflection, and responsibility toward one\'s own story.',
    ],
    pillars: [
      {
        title: 'Clinical Psychotherapy',
        description:
          'Online sessions in English and Portuguese for adolescents, young people, and adults, focused on emotional development, maturity, and self-understanding. A process that integrates care, reflection, and practical tools for navigating life\'s challenges and building more conscious responses. Includes parent guidance.',
      },
      {
        title: 'Clinical Supervision',
        description:
          'Guidance and support for psychologists in their clinical practice, with space for case discussion, theoretical deepening, and reflection on how sessions are conducted. A process aimed at developing clinical reasoning, confidence, and professional maturity.',
      },
      {
        title: 'Speaking, Media & Partnerships',
        description:
          'Open to invitations for talks, interviews, appearances on programs and communication projects, as well as partnerships with companies and brands.',
      },
    ],
  },
  services: {
    heading: 'Session formats',
    intro:
      'Every therapeutic process has its own characteristics. The formats presented are possibilities that can be adjusted throughout the process. Select a modality below to learn how it works.',
    selectorPrompt: 'Select a format to view details:',
    modalities: [
      {
        id: 'semanal',
        title: 'Weekly sessions',
        frequencyLabel: 'Weekly sessions · 50 to 60 minutes · English or Portuguese',
        summary:
          'Regular sessions to work through emotional, relational, and behavioral issues, deepen self-awareness, and develop resources to navigate life\'s challenges.',
        idealFor: [
          'Issues related to anxiety, relationships, self-esteem, and identity',
          'Moments of transition, conflict, and personal challenges',
          'An ongoing space for reflection, processing, and emotional development',
        ],
        formatDetails: 'Session frequency does not need to be decided before your first contact. In the initial session, we discuss your needs and expectations, and together we determine the most suitable format for your current moment.',
        ctaLabel: 'Book first session',
      },
      {
        id: 'quinzenal',
        title: 'Biweekly sessions',
        frequencyLabel: 'Biweekly sessions · 50 to 60 minutes · English or Portuguese',
        summary:
          'Sessions every two weeks, offering a regular space to reflect on experiences, work through specific issues, and develop new perspectives on everyday challenges.',
        idealFor: [
          'Emotional, relational, and behavioral issues',
          'Moments of reflection and personal development',
          'Needs that can be addressed at this frequency, as determined by clinical assessment',
        ],
        formatDetails: 'Session frequency is defined together, considering each person\'s needs, goals, and context. In the first session, we discuss your needs and assess which format makes the most sense at that moment. This frequency can also be revisited throughout the process as needs evolve.',
        ctaLabel: 'Inquire about availability',
      },
      {
        id: 'pontual',
        title: 'Single sessions & parent guidance',
        frequencyLabel: 'Sessions up to 90 minutes · English or Portuguese',
        summary:
          'Sessions directed at specific needs, dilemmas, or situations that call for a space for listening, reflection, and psychological guidance. An opportunity to better understand an issue, broaden perspectives, and identify possibilities for action.',
        idealFor: [
          'Parent guidance: sessions exclusively for parents or guardians, without the child or adolescent present',
          'A space to understand behaviors, reflect on parenting challenges, and develop resources for issues related to children\'s development',
          'Parent guidance can be provided regardless of whether the child or adolescent is in therapy with me',
        ],
        formatDetails: 'Online sessions · English or Portuguese',
        ctaLabel: 'Request a session',
      },
    ],
    processHeading: 'How to begin',
    processSteps: [
      {
        title: 'First contact',
        description:
          'You share your availability, preferred language (English or Portuguese), and the type of care you are looking for: individual psychotherapy or parental guidance.',
      },
      {
        title: 'First session',
        description:
          'A space to talk about your story, your current moment, and what motivated you to seek therapy. You will also get to know my approach and share your expectations.',
      },
      {
        title: 'Alignment & continuity',
        description:
          'We discuss the next steps, session frequency, fees, and the therapeutic agreement, aligning everything clearly for your ongoing care.',
      },
    ],
    ethicsNote:
      'Practice conducted in strict accordance with the Code of Professional Ethics of the Psychologist (CFP).',
    processClosing:
      'The first session is already part of the therapeutic process: a moment of listening, welcoming, and understanding your story.',
    teenTherapy: {
      heading: 'Therapy with Adolescents',
      paragraphs: [
        'When care is intended for a minor, the beginning of the process also involves the participation of parents or guardians.',
        'In addition to the first contact, initial meetings are held with the guardians and the adolescent, at separate times, so I can learn the history, understand the different perspectives on the search for therapy, and grasp the demands involved.',
        'At this stage, we also discuss how the partnership with the family will work throughout the process, clarifying the roles of guardians and psychologist, the limits of professional confidentiality, and the importance of preserving a space of trust for the adolescent.',
      ],
    },
  },
  mediaSection: {
    heading: 'In the media, TV & YouTube',
    intro:
      'Television segments, press interviews, and video reflections on human behavior, adolescence, and emotional wellbeing.',
    viewAllCta: 'Explore full media archive & Press Kit',
    youtubeCta: 'Visit the YouTube channel',
    categoryLabels: {
      tv: 'Television',
      youtube: 'YouTube',
      podcast: 'Podcast / Interview',
      press: 'Press',
    },
  },
  articlesSection: {
    heading: 'Essays & reflections',
    intro: 'Selected writings on clinical practice, family relationships, adolescence, and adulthood.',
    viewAllCta: 'Read all essays',
    readArticleCta: 'Read full essay',
    backToArticles: 'Back to all essays',
  },
  contact: {
    heading: 'Let’s talk',
    intro:
      'Choose the most suitable contact channel for scheduling, questions about sessions, or professional invitations.',
    clinicalCard: {
      title: 'Psychotherapy, parental guidance & clinical supervision',
      description:
        'To schedule a first session, learn more about the available formats, or discuss clinical supervision.',
      languagesNote: 'Sessions in English and Portuguese · Online',
      ctaLabel: 'Get in touch',
      whatsappHref: 'https://wa.me/5519999846516?text=Hi%2C%20Bia!%20I%E2%80%99d%20like%20to%20know%20more%20about%20your%20psychotherapy%20services.',
    },
    mediaCard: {
      title: 'Invitations & professional projects',
      description:
        'Open to invitations for lectures, interviews, media appearances, communication projects, and partnerships with companies and brands.',
      topicsNote: 'Available for in-person keynotes and live broadcasts',
      ctaLabel: 'Get in touch',
      emailHref: 'mailto:biacarones@gmail.com?subject=Invitation%20-%20Speaking%20or%20Partnership',
    },
    socialHeading: 'Follow along',
    instagramLabel: 'Follow on Instagram',
    youtubeLabel: 'YouTube Channel',
  },
  mediaPage: {
    heading: 'In the media, speaking & YouTube',
    intro:
      'A central hub for television appearances, interviews, video essays, and press kit details for producers and event organizers.',
    tvAndPressHeading: 'Television & press appearances',
    youtubeHeading: 'YouTube channel',
    youtubeDescription:
      'Video reflections recorded for YouTube, unpacking everyday psychological questions with clarity and depth.',
    talksHeading: 'Speaking topics for schools & organizations',
    talksIntro:
      'Keynotes and workshops crafted for schools, parents, organizations, and mental health events.',
    pressKitHeading: 'Press kit & producer information',
    pressKitBio:
      'Bia Carone is a clinical psychologist working with adolescents, parents, and adults in Portuguese and English. She is a frequent guest specialist on television programs and educational events.',
    pressKitCta: 'Contact for press & speaking inquiries',
  },
  footer: {
    tagline: 'Clinical psychology, growth, and meaning in life.',
    crpLabel: 'Bia Carone · Psychologist',
    ethicsDisclaimer:
      'Please note: This website does not provide emergency crisis care. If you are experiencing an acute mental health crisis, please contact your local emergency service immediately.',
    rights: 'All rights reserved.',
  },
};
