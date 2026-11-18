import Link from 'next/link';
import type { SiteDictionary } from '@/content/types.ts';

interface AboutSectionProps {
  dict: SiteDictionary;
}

export function AboutSection({ dict }: AboutSectionProps) {
  const { locale, about } = dict;

  return (
    <section id="sobre" className="about-editorial-section">

      {/* Linhas orgânicas em rosa: são desenhadas junto com a revelação do texto */}
      <svg
        className="about-lines"
        viewBox="0 30 1024 640"
        preserveAspectRatio="xMidYMin slice"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          {/* A linha da direita passa do azul para o fundo claro: o rosa fica mais profundo ao descer */}
          <linearGradient id="about-line-tail" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0.7" stopColor="#E3B7CE" />
            <stop offset="0.9" stopColor="#C98CAE" />
          </linearGradient>
        </defs>
        <path pathLength="1" d="M 528,-8 C 470,118 438,232 300,278 C 170,322 36,262 -10,186" />
        <path pathLength="1" d="M -10,392 C 60,300 150,248 262,262" />
        <path
          className="about-line-tail"
          pathLength="1"
          d="M 1034,150 C 1002,236 944,300 842,330 C 742,360 652,392 620,472 C 602,522 596,574 576,632"
        />
        <path pathLength="1" d="M 1034,288 C 972,330 884,350 806,376 C 726,402 672,430 650,486" />
      </svg>

      <div className="container">
        <div className="about-editorial-grid">
          <div className="about-editorial-left">
            <div className="about-tag-row">
              <span className="editorial-tag reveal-text reveal-text--tag">
                {locale === 'pt' ? 'SOBRE MIM' : 'ABOUT ME'}
              </span>
              <span className="about-tag-line" aria-hidden="true" />
            </div>
            <h2 className="section-editorial-title about-title-light reveal-text reveal-text--title">
              {locale === 'pt' ? (
                <>
                  Minha história e<br />
                  trajetória clínica
                </>
              ) : (
                <>
                  My story and<br />
                  clinical journey
                </>
              )}
            </h2>
          </div>

          <div className="about-editorial-right">
            {about.paragraphs.map((p, i) => (
              <p key={i} className="about-editorial-narrative reveal-text reveal-text--body">
                {p}
              </p>
            ))}
            <div style={{ marginTop: '1.75rem' }}>
              <Link href={`/${locale}#atendimento`} className="text-action-link text-action-link-light reveal-text reveal-text--link">
                <span>{locale === 'pt' ? 'Conheça minhas áreas de atuação' : 'Learn about my areas of practice'}</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          {/* Indicador de navegação lateral à direita (conforme referência visual) */}
          <div className="about-nav-indicator" aria-hidden="true">
            <span className="nav-dot-active" />
            <span className="nav-line" />
            <span className="nav-dot" />
            <span className="nav-dot" />
            <span className="nav-dot" />
          </div>
        </div>

        {/* Pilares clínicos integrados com refinamento editorial sobre o fundo escuro */}
        <div className="about-pillars-dark">
          {about.pillars.map((pillar, index) => (
            <div key={pillar.title} className="editorial-pillar-col">
              <span className="pillar-index reveal-text reveal-text--pillar-index">0{index + 1}.</span>
              <h3 className="pillar-title reveal-text reveal-text--pillar-title">{pillar.title}</h3>
              <p className="pillar-desc reveal-text reveal-text--pillar-desc">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
