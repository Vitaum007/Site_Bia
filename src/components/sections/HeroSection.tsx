import Image from 'next/image';
import Link from 'next/link';
import type { SiteDictionary } from '@/content/types.ts';
import { LiquidTransition } from './LiquidTransition';

interface HeroSectionProps {
  dict: SiteDictionary;
}

export function HeroSection({ dict }: HeroSectionProps) {
  const { locale, hero } = dict;

  return (
    <section id="inicio" className="hero-editorial">
      <div className="hero-tint" aria-hidden="true" />

      <div className="hero-photo">
        <Image
          src="/images/bia-hero.jpg"
          alt={locale === 'pt' ? 'Retrato de Bia Carone, psicóloga clínica' : 'Portrait of Bia Carone, clinical psychologist'}
          width={2000}
          height={2000}
          sizes="(max-width: 900px) 100vw, min(60vw, 880px)"
          priority
        />
      </div>

      <div className="container">
        <div className="hero-main-col">
          <div className="hero-intro-label">
            <span className="editorial-tag">
              {locale === 'pt' ? 'PSICOTERAPIA CLÍNICA' : 'CLINICAL PSYCHOTHERAPY'}
            </span>
            <span className="hero-eyebrow-line" aria-hidden="true" />
          </div>

          <h1 className="display-hero-title">
            {locale === 'pt' ? (
              <>
                Nem tudo está sob<br />
                nosso <em>controle</em>.<br />
                Mas há muito que<br />
                podemos construir.
              </>
            ) : (
              <>
                Not everything is<br />
                in our <em>control</em>.<br />
                But there is much<br />
                we can build.
              </>
            )}
          </h1>

          <p className="hero-lead">{hero.subtitle}</p>

          <div className="hero-actions-group">
            <Link href={`/${locale}#contato`} className="btn-pill-primary">
              <span>{hero.primaryCta}</span>
              <span aria-hidden="true">→</span>
            </Link>
            <Link href={`/${locale}/midia`} className="btn-pill-secondary">
              <span>{hero.secondaryCta}</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Identificação de Bia Carone sobre o retrato */}
      <div className="hero-signature">
        <span className="hero-signature-name">Bia Carone</span>
        <span className="hero-signature-role">
          {locale === 'pt' ? 'Psicóloga Clínica' : 'Clinical Psychologist'}
        </span>
      </div>

      {/* Indicador de rolagem centralizado */}
      <a
        href={`/${locale}#sobre`}
        className="hero-scroll-indicator"
        aria-label={locale === 'pt' ? 'Rolar para a próxima seção' : 'Scroll to next section'}
      >
        <span>{locale === 'pt' ? 'DESCUBRA MAIS' : 'DISCOVER MORE'}</span>
        <span className="hero-scroll-arrow" aria-hidden="true">↓</span>
      </a>

      {/* Transição visual orgânica líquida sincronizada com o scroll */}
      <LiquidTransition />
    </section>
  );
}
