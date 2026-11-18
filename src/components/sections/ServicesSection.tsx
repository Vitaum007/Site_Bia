'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import type { SessionModalityId, SiteDictionary } from '@/content/types.ts';

interface ServicesSectionProps {
  dict: SiteDictionary;
}

const TILT_MAX_DEG = 9;

/*
 * Card com inclinação 3D que segue o mouse (inspirado no exemplo de react-spring/use-gesture):
 * a posição do ponteiro vira as variáveis --rx/--ry e o CSS cuida da suavização e da escala.
 * Sem estado do React nem bibliotecas; toque e movimento reduzido não inclinam.
 */
function StepCard({ index, title, description }: { index: number; title: string; description: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || event.pointerType !== 'mouse') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty('--rx', `${(-py * TILT_MAX_DEG).toFixed(2)}deg`);
    el.style.setProperty('--ry', `${(px * TILT_MAX_DEG).toFixed(2)}deg`);
  };

  const reset = () => {
    ref.current?.style.removeProperty('--rx');
    ref.current?.style.removeProperty('--ry');
  };

  return (
    <div
      ref={ref}
      className="step-card-editorial"
      data-tone={index}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
    >
      <span className="step-number">0{index + 1}.</span>
      <h4 className="step-title">{title}</h4>
      <p className="step-desc">{description}</p>
    </div>
  );
}

// Clipe de papel decorativo, fora da árvore de acessibilidade
function PaperClip({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 24 44" aria-hidden="true" focusable="false">
      <path d="M9 18v18a4 4 0 0 0 8 0V10a6 6 0 0 0-12 0v26a8 8 0 0 0 16 0V16" />
    </svg>
  );
}

function TeenTherapyBlock({ heading, paragraphs }: { heading: string; paragraphs: string[] }) {
  return (
    <div className="teen-therapy-block">
      <div className="teen-therapy-illustration" aria-hidden="true">
        <svg viewBox="0 0 130 150" fill="none" xmlns="http://www.w3.org/2000/svg" focusable="false">
          <circle cx="42" cy="30" r="16" stroke="var(--color-primary)" strokeWidth="2" opacity="0.5" />
          <path d="M42 46 C26 50, 16 66, 18 92 L66 92 C68 66, 58 50, 42 46Z" stroke="var(--color-primary)" strokeWidth="2" fill="var(--color-primary)" fillOpacity="0.06" opacity="0.5" />
          <circle cx="82" cy="40" r="13" stroke="var(--color-primary)" strokeWidth="1.8" opacity="0.4" />
          <path d="M82 53 C70 56, 62 68, 64 92 L100 92 C102 68, 94 56, 82 53Z" stroke="var(--color-primary)" strokeWidth="1.8" fill="var(--color-primary)" fillOpacity="0.04" opacity="0.4" />
          <path d="M55 65 Q68 58, 72 65" stroke="var(--color-rose-deep, #A06A87)" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.4" strokeDasharray="3 4" />
        </svg>
      </div>
      <div className="teen-therapy-content">
        <h3 className="teen-therapy-heading">{heading}</h3>
        {paragraphs.map((p, i) => (
          <p key={i} className="teen-therapy-text">{p}</p>
        ))}
      </div>
    </div>
  );
}

export function ServicesSection({ dict }: ServicesSectionProps) {
  const { locale, services } = dict;
  const [selectedId, setSelectedId] = useState<SessionModalityId>('semanal');

  const activeModality =
    services.modalities.find((m) => m.id === selectedId) ?? services.modalities[0];
  const activeIndex = services.modalities.indexOf(activeModality);

  const onTabKeyDown = (e: React.KeyboardEvent) => {
    const ids = services.modalities.map((m) => m.id);
    const cur = ids.indexOf(selectedId);
    let next = cur;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = (cur + 1) % ids.length;
    else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = (cur - 1 + ids.length) % ids.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = ids.length - 1;
    else return;
    e.preventDefault();
    setSelectedId(ids[next]);
    document.getElementById(`tab-${ids[next]}`)?.focus();
  };

  return (
    <section className="services-editorial-section">
      <div className="container">
        <div className="services-editorial-head services-notebook">
          <PaperClip className="service-clip service-clip--notebook" />
          <div>
            <span className="editorial-tag">
              {locale === 'pt' ? 'Modalidades Clínicas' : 'Clinical Modalities'}
            </span>
            <h2 className="section-editorial-title">{services.heading}</h2>
          </div>
          <p className="body-editorial" style={{ fontSize: '1.12rem' }}>
            {services.intro}
          </p>
        </div>

        <div className="services-editorial-interactive">
          {/* Composição editorial: cards à esquerda, post-it à direita */}
          <div className="services-composition">
            <div
              className="services-modalities-list"
              role="tablist"
              aria-label={services.selectorPrompt}
              onKeyDown={onTabKeyDown}
            >
              {services.modalities.map((modality, index) => {
                const isSelected = modality.id === activeModality.id;
                return (
                  <div key={modality.id} role="presentation" className="service-modality-item">
                    <button
                      type="button"
                      role="tab"
                      id={`tab-${modality.id}`}
                      aria-selected={isSelected}
                      aria-controls={isSelected ? `panel-${modality.id}` : undefined}
                      tabIndex={isSelected ? 0 : -1}
                      data-tone={index}
                      className="service-modality-row-btn"
                      onClick={() => setSelectedId(modality.id)}
                    >
                      <span className="service-modality-row-freq">{modality.frequencyLabel}</span>
                      <span className="service-modality-row-title">{modality.title}</span>
                    </button>
                    {isSelected && <PaperClip className="service-clip service-clip--card" />}
                  </div>
                );
              })}
            </div>

            <aside className="postit" aria-label={locale === 'pt' ? 'Observação importante' : 'Important note'}>
              <div className="postit-tape" aria-hidden="true" />
              <p className="postit-title">
                {locale === 'pt' ? 'Uma observação importante' : 'An important note'}
              </p>
              <p className="postit-subtitle">
                {locale === 'pt' ? 'Não precisa decidir tudo agora.' : 'You don\'t have to decide everything now.'}
              </p>
              <p className="postit-body">
                {locale === 'pt'
                  ? 'A frequência dos encontros não precisa ser definida antes do primeiro contato. Na sessão inicial, conversamos sobre suas demandas e expectativas e, a partir da avaliação clínica, alinhamos juntos o formato de acompanhamento mais adequado para o seu momento e suas necessidades.'
                  : 'Session frequency does not need to be decided before your first contact. In the initial session, we discuss your needs and expectations, and together we determine the most suitable format for your current moment and needs.'}
              </p>
              <p className="postit-signature">
                {locale === 'pt' ? 'Com cuidado, Bia.' : 'With care, Bia.'}
              </p>
            </aside>
          </div>

          <div className="service-details-wrap">
            <PaperClip className="service-clip service-clip--panel" />
            <svg className="service-flourish" viewBox="0 0 52 36" aria-hidden="true" focusable="false">
              <path d="M4 30 C 14 6, 30 4, 36 16 C 40 24, 28 30, 24 22 C 20 14, 34 8, 48 12" />
            </svg>

          <div
            id={`panel-${activeModality.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeModality.id}`}
            data-tone={activeIndex}
            className="service-details-editorial-panel"
          >
            <div>
              <h3 style={{ fontSize: '2rem', marginBottom: '0.75rem', color: 'var(--color-primary)' }}>
                {activeModality.title}
              </h3>
              <p className="body-editorial" style={{ fontSize: '1.05rem', color: 'var(--text-primary)' }}>
                {activeModality.summary}
              </p>
            </div>

            <ul className="service-ideal-list">
              {activeModality.idealFor.map((item, index) => (
                <li key={index} className="service-ideal-item">
                  <span className="service-ideal-bullet" aria-hidden="true">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--border-hairline)' }}>
              <Link href={`/${locale}#contato`} className="btn-editorial-primary">
                <span>{activeModality.ctaLabel}</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          </div>
        </div>

        <div className="service-steps-editorial">
          <div>
            <span className="editorial-tag editorial-tag-rose">
              {locale === 'pt' ? 'Primeiro Contato' : 'First Step'}
            </span>
            <h3 className="steps-heading">{services.processHeading}</h3>
            <p className="steps-ethics">{services.ethicsNote}</p>
            <p className="steps-closing">{services.processClosing}</p>
          </div>

          <div className="steps-timeline">
            {services.processSteps.map((step, index) => (
              <StepCard key={step.title} index={index} title={step.title} description={step.description} />
            ))}
          </div>
        </div>

        <TeenTherapyBlock heading={services.teenTherapy.heading} paragraphs={services.teenTherapy.paragraphs} />
      </div>
    </section>
  );
}
