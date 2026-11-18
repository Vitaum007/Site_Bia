import type { SiteDictionary } from '@/content/types.ts';
import { ContactTransition } from './ContactTransition';

interface ContactSectionProps {
  dict: SiteDictionary;
}

/* Estrela em estilo de adesivo (remendo costurado); decorativa, fora da árvore de acessibilidade */
function StarSticker({ className }: { className: string }) {
  return (
    <svg className={`contact-star ${className}`} viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      <path className="star-body" d="M50 5 L63 35 L95 35 L69 55 L79 88 L50 68 L21 88 L31 55 L5 35 L37 35 Z" />
      <path className="star-stitch" d="M50 12 L60 38 L85 38 L65 53 L73 80 L50 64 L27 80 L35 53 L15 38 L40 38 Z" />
    </svg>
  );
}

export function ContactSection({ dict }: ContactSectionProps) {
  const { locale, contact } = dict;
  const pt = locale === 'pt';

  return (
    <section id="contato" className="contact-editorial-section">
      <ContactTransition />
      <div className="container">
        <div className="contact-editorial-layout">
          <div className="contact-intro">
            <StarSticker className="contact-star--md" />

            <span className="editorial-tag contact-eyebrow contact-reveal contact-reveal--title">{pt ? 'Canais de Contato' : 'Get in Touch'}</span>
            <h2 className="contact-title contact-reveal contact-reveal--title">{contact.heading}</h2>
            <p className="contact-lead contact-reveal contact-reveal--text">{contact.intro}</p>

            <div className="contact-social contact-reveal contact-reveal--links">
              <span className="contact-social-heading">{contact.socialHeading}</span>
              <div className="contact-social-links">
                <a href="https://www.instagram.com/biacarone" target="_blank" className="contact-social-link" rel="noopener noreferrer">
                  <span>{contact.instagramLabel}</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </div>

          <div className="contact-cards">
            <article className="contact-card contact-card--clinical contact-reveal contact-reveal--card1">
              <StarSticker className="contact-star--sm" />
              <span className="contact-card-eyebrow">{pt ? 'Atendimento Clínico' : 'Clinical Care'}</span>
              <h3 className="contact-card-title">{contact.clinicalCard.title}</h3>
              <p className="contact-card-text">{contact.clinicalCard.description}</p>
              <p className="contact-card-note">{contact.clinicalCard.languagesNote}</p>
              <a href={contact.clinicalCard.whatsappHref} target="_blank" rel="noopener noreferrer" className="contact-card-action" aria-label={pt ? 'Entrar em contato pelo WhatsApp' : 'Get in touch via WhatsApp'}>
                <span>{contact.clinicalCard.ctaLabel}</span>
                <span className="contact-card-arrow" aria-hidden="true">→</span>
              </a>
            </article>

            <article className="contact-card contact-card--press contact-reveal contact-reveal--card2">
              <StarSticker className="contact-star--lg" />
              <span className="contact-card-eyebrow">{pt ? 'Palestras, Mídia e Parcerias' : 'Speaking, Media & Partnerships'}</span>
              <h3 className="contact-card-title">{contact.mediaCard.title}</h3>
              <p className="contact-card-text">{contact.mediaCard.description}</p>
              <p className="contact-card-note">{contact.mediaCard.topicsNote}</p>
              <a href={contact.mediaCard.emailHref} className="contact-card-action" aria-label={pt ? 'Entrar em contato por e-mail' : 'Get in touch via e-mail'}>
                <span>{contact.mediaCard.ctaLabel}</span>
                <span className="contact-card-arrow" aria-hidden="true">→</span>
              </a>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
