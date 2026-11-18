import type { Locale, SiteDictionary, TalkTopic } from '@/content/types.ts';

interface TalksSectionProps {
  locale: Locale;
  mediaPage: SiteDictionary['mediaPage'];
  emailHref: string;
  topics: TalkTopic[];
}

const PARTNERSHIP_FORMATS = {
  pt: [
    {
      num: '01',
      title: 'Escolas e famílias',
      desc: 'Palestras, encontros de pais e rodas de conversa sobre adolescência, telas, autonomia e escuta.',
    },
    {
      num: '02',
      title: 'Empresas e instituições',
      desc: 'Painéis de bem-estar, saúde emocional no trabalho, prevenção ao esgotamento e qualidade das relações.',
    },
    {
      num: '03',
      title: 'Marcas e comunicação',
      desc: 'Consultoria de conteúdo, campanhas de conscientização, podcasts e entrevistas como especialista.',
    },
  ],
  en: [
    {
      num: '01',
      title: 'Schools & families',
      desc: 'Keynotes, parent gatherings, and conversations on adolescence, screen life, autonomy, and listening.',
    },
    {
      num: '02',
      title: 'Organizations & teams',
      desc: 'Wellbeing panels, emotional health at work, burnout prevention, and healthier boundaries.',
    },
    {
      num: '03',
      title: 'Brands & media',
      desc: 'Editorial collaborations, awareness campaigns, podcasts, and expert interviews.',
    },
  ],
} as const;

export function TalksSection({ locale, mediaPage, emailHref, topics }: TalksSectionProps) {
  const pt = locale === 'pt';
  const formats = PARTNERSHIP_FORMATS[locale];

  return (
    <section id="palestras" className="mp-section talks-section">
      <div className="talks-tint" aria-hidden="true" />
      <div className="container talks-container">
        <div className="talks-layout">
          <div className="talks-aside">
            <header className="talks-head">
              <span className="mp-tag-row">
                <span className="editorial-tag mp-eyebrow">
                  {pt ? 'Encontros e parcerias' : 'Keynotes & partnerships'}
                </span>
                <span className="mp-tag-line" aria-hidden="true" />
              </span>
              <h2 className="mp-h2">{mediaPage.talksHeading}</h2>
              <p className="mp-intro">{mediaPage.talksIntro}</p>
            </header>

            <aside className="talks-invite-card" aria-label={pt ? 'Convites e formatos' : 'Invitations & formats'}>
              <div className="talks-meta-pills">
                <span className="talks-meta-pill">{pt ? 'Presencial e online' : 'In-person & online'}</span>
                <span className="talks-meta-pill">{pt ? 'Português · Inglês' : 'Portuguese · English'}</span>
              </div>
              <p className="talks-invite-copy">
                {pt
                  ? 'Temas adaptados ao contexto da instituição, com espaço aberto para perguntas e diálogo.'
                  : 'Sessions tailored to your institution’s context, with dedicated time for Q&A and open dialogue.'}
              </p>
              <a href={emailHref} className="btn-editorial-primary talks-invite-cta">
                <span>{pt ? 'Convidar para palestra' : 'Invite for a talk'}</span>
              </a>
            </aside>
          </div>

          <div className="talks-cards">
            {topics.map((topic, index) => (
              <article
                key={topic.id}
                className="talks-topic-card"
                data-tone={index % 2 === 0 ? 'primary' : 'rose'}
              >
                <div className="talks-topic-top">
                  <span className="talks-topic-num" aria-hidden="true">
                    0{index + 1}.
                  </span>
                  <span className="talks-audience-pill">{topic.audience[locale]}</span>
                </div>
                <h3 className="talks-topic-title">{topic.title[locale]}</h3>
                <p className="talks-topic-desc">{topic.description[locale]}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="talks-partnerships" aria-label={pt ? 'Frentes de parceria' : 'Partnership formats'}>
          {formats.map((item) => (
            <div key={item.num} className="talks-partnership-col">
              <span className="talks-partnership-num" aria-hidden="true">
                {item.num}
              </span>
              <h3 className="talks-partnership-title">{item.title}</h3>
              <p className="talks-partnership-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
