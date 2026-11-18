import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import {
  getDictionary,
  isValidLocale,
  mediaItems,
  talkTopics,
  articleItems,
} from './src/content/index.ts';

const cssContent = fs.readFileSync(path.join(process.cwd(), 'src/app/globals.css'), 'utf8');

function renderShell(dict, bodyHtml) {
  const { locale, nav, footer, contact } = dict;
  const targetLocale = locale === 'pt' ? 'en' : 'pt';
  const year = new Date().getFullYear();

  return `<!DOCTYPE html>
<html lang="${locale === 'pt' ? 'pt-BR' : 'en'}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${dict.meta.title}</title>
  <meta name="description" content="${dict.meta.description}" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400;1,500&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --font-playfair: 'Playfair Display';
      --font-jakarta: 'Plus Jakarta Sans';
    }
    ${cssContent}
  </style>
</head>
<body>
  <div data-locale="${locale}">
    <header class="site-header">
      <div class="container header-grid">
        <a href="/${locale}" class="brand-signature">
          <span class="brand-title">Bia Carone</span>
          <span class="brand-sub">${locale === 'pt' ? 'Psicóloga Clínica' : 'Clinical Psychologist'}</span>
        </a>
        <nav class="header-nav" aria-label="${locale === 'pt' ? 'Navegação principal' : 'Main navigation'}">
          <ul class="header-nav-list">
            <li><a href="/${locale}#sobre" class="header-nav-link">${nav.about}</a></li>
            <li><a href="/${locale}#atendimento" class="header-nav-link">${nav.services}</a></li>
            <li><a href="/${locale}/midia" class="header-nav-link">${nav.media}</a></li>
            <li><a href="/${locale}/textos" class="header-nav-link">${nav.articles}</a></li>
            <li><a href="/${locale}#contato" class="header-nav-link">${nav.contact}</a></li>
          </ul>
        </nav>
        <div class="header-actions">
          <div class="header-lang-switch">
            <a href="/pt" class="${locale === 'pt' ? 'active' : ''}">PT</a>
            <span class="header-lang-divider">|</span>
            <a href="/en" class="${locale === 'en' ? 'active' : ''}">EN</a>
          </div>
          <a href="/${locale}#contato" class="header-pill-btn">
            <span>${nav.bookCta}</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </header>
    <main>${bodyHtml}</main>
    <footer class="site-footer-editorial">
      <div class="container">
        <div class="footer-top-row">
          <div class="footer-huge-name">Bia Carone</div>
          <div class="footer-nav-row">
            <a href="/${locale}/midia" class="header-nav-link">${nav.media}</a>
            <a href="/${locale}/textos" class="header-nav-link">${nav.articles}</a>
            <a href="#instagram-bia-carone" class="header-nav-link">${contact.instagramLabel}</a>
            <a href="#youtube-bia-carone" class="header-nav-link">${contact.youtubeLabel}</a>
          </div>
        </div>
        <div class="footer-bottom-grid">
          <div style="display:flex;flex-direction:column;gap:0.85rem">
            <p class="lead-prose" style="font-size:1.25rem;color:var(--color-primary)">${footer.tagline}</p>
            <p style="font-size:0.9rem;font-weight:500;color:var(--text-primary)">${footer.crpLabel}</p>
            <p class="footer-legal-copy">${footer.ethicsDisclaimer}</p>
          </div>
          <div style="display:flex;flex-direction:column;gap:0.5rem;align-items:flex-start">
            <p style="font-size:0.84rem;color:var(--text-light)">© ${year} Bia Carone. ${footer.rights}</p>
            <p style="font-size:0.78rem;color:var(--text-light);letter-spacing:0.04em">${locale === 'pt' ? 'Design editorial autoral · Fotografia e identidade protegidas' : 'Authorial editorial design · Photography and identity protected'}</p>
          </div>
        </div>
      </div>
    </footer>
  </div>
  <script>
    // Tab switching dos formatos de atendimento
    document.querySelectorAll('.service-modality-row-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var target = btn.getAttribute('data-modality');
        document.querySelectorAll('.service-modality-row-btn').forEach(function(b) {
          b.setAttribute('aria-selected', 'false');
        });
        btn.setAttribute('aria-selected', 'true');
        document.querySelectorAll('.service-details-editorial-panel').forEach(function(panel) {
          panel.style.display = panel.getAttribute('data-panel') === target ? 'block' : 'none';
        });
      });
    });

    // Transição Líquida Orgânica vinculada ao Scroll
    (function initLiquidTransition() {
      var waveFill = document.getElementById('liquidWaveFill');
      var waveRibbon = document.getElementById('liquidWaveRibbon');
      var pinkGlow = document.getElementById('liquidWavePinkGlow');
      var scrollIndicator = document.querySelector('.hero-scroll-indicator');
      if (!waveFill) return;

      function lerp(a, b, t) { return a + (b - a) * t; }
      function easeInOutQuad(t) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; }

      function computeWavePath(p) {
        var t = easeInOutQuad(Math.max(0, Math.min(1, p)));
        var fluidLag = Math.sin(p * Math.PI) * 6;
        var y0 = lerp(55, 42, t) + fluidLag * 0.4;
        var cp1x = 250, cp1y = lerp(38, 24, t) + fluidLag * 0.6;
        var cp2x = 450, cp2y = lerp(48, 36, t) + fluidLag * 0.8;
        var valleyX = 650, valleyY = lerp(82, 72, t) + fluidLag;
        var cp3x = 800, cp3y = lerp(102, 92, t) + fluidLag * 0.7;
        var cp4x = 900, cp4y = lerp(28, 14, t) - fluidLag * 0.5;
        var endX = 1000, endY = lerp(42, 30, t);
        return 'M 0,' + y0.toFixed(1) + ' C ' + cp1x + ',' + cp1y.toFixed(1) + ' ' + cp2x + ',' + cp2y.toFixed(1) + ' ' + valleyX + ',' + valleyY.toFixed(1) + ' C ' + cp3x + ',' + cp3y.toFixed(1) + ' ' + cp4x + ',' + cp4y.toFixed(1) + ' ' + endX + ',' + endY.toFixed(1) + ' L 1000,120 L 0,120 Z';
      }

      var prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) {
        waveFill.setAttribute('d', computeWavePath(1));
        return;
      }

      var currentP = 0;
      var targetP = 0;
      var animId = null;
      var isTicking = false;

      function calculateProgress() {
        var aboutElem = document.getElementById('sobre');
        if (!aboutElem) return 0;
        var rect = aboutElem.getBoundingClientRect();
        var vh = window.innerHeight || 800;
        var startY = vh;
        var endY = vh * 0.25;
        var dist = startY - endY;
        if (dist <= 0) return 0;
        var rawP = (startY - rect.top) / dist;
        return Math.min(Math.max(rawP, 0), 1);
      }

      function render(p) {
        waveFill.setAttribute('d', computeWavePath(p));
        if (scrollIndicator) {
          scrollIndicator.style.opacity = Math.max(0, 1 - p * 2.5).toString();
        }
      }

      function update() {
        var diff = targetP - currentP;
        if (Math.abs(diff) > 0.001) {
          currentP += diff * 0.12;
          render(currentP);
          animId = requestAnimationFrame(update);
        } else {
          currentP = targetP;
          render(currentP);
          isTicking = false;
          animId = null;
        }
      }

      function onScrollOrResize() {
        targetP = calculateProgress();
        if (!isTicking) {
          isTicking = true;
          animId = requestAnimationFrame(update);
        }
      }

      window.addEventListener('scroll', onScrollOrResize, { passive: true });
      window.addEventListener('resize', onScrollOrResize, { passive: true });
      onScrollOrResize();
    })();
  </script>
</body>
</html>`;
}

function renderHome(dict) {
  const { locale, hero, about, services, mediaSection, articlesSection, contact } = dict;
  const featuredMedia = mediaItems.filter((m) => m.featured);
  const primaryMedia = featuredMedia[0];
  const secondaryMedia = featuredMedia.slice(1, 4);
  const featuredArticles = articleItems.filter((a) => a.featured);

  return `
  <section id="inicio" class="hero-editorial">
    <div class="hero-tint" aria-hidden="true"></div>
    <div class="hero-photo">
      <img src="/images/bia-hero-crop.png" alt="${locale === 'pt' ? 'Retrato de Bia Carone, psicóloga clínica' : 'Portrait of Bia Carone, clinical psychologist'}" width="784" height="608" />
    </div>
    <div class="container">
      <div class="hero-main-col">
        <div class="hero-intro-label">
          <span class="editorial-tag">${locale === 'pt' ? 'PSICOTERAPIA CLÍNICA' : 'CLINICAL PSYCHOTHERAPY'}</span>
          <span class="hero-eyebrow-line" aria-hidden="true"></span>
        </div>
        <h1 class="display-hero-title">
          ${locale === 'pt' ? 'Escuta clínica<br />com <em>presença</em>,<br />clareza e<br />profundidade.' : 'Clinical listening<br />grounded in <em>clarity</em>,<br />warmth and<br />depth.'}
        </h1>
        <p class="hero-lead">${hero.subtitle}</p>
        <div class="hero-actions-group">
          <a href="/${locale}#contato" class="btn-pill-primary"><span>${hero.primaryCta}</span><span aria-hidden="true">→</span></a>
          <a href="/${locale}/midia" class="btn-pill-secondary"><span>${hero.secondaryCta}</span><span aria-hidden="true">→</span></a>
        </div>
      </div>
    </div>
    <div class="hero-signature">
      <span class="hero-signature-name">Bia Carone</span>
      <span class="hero-signature-role">${locale === 'pt' ? 'Psicóloga Clínica · CRP 06/XXXXX' : 'Clinical Psychologist · CRP 06/XXXXX'}</span>
    </div>

    <a href="/${locale}#sobre" class="hero-scroll-indicator" aria-label="${locale === 'pt' ? 'Rolar para a próxima seção' : 'Scroll to next section'}">
      <span>${locale === 'pt' ? 'DESCUBRA MAIS' : 'DISCOVER MORE'}</span>
      <span class="hero-scroll-arrow" aria-hidden="true">↓</span>
    </a>

    <svg id="liquidWaveSvg" class="hero-curve" viewBox="0 0 1000 120" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <path id="liquidWaveFill" class="hero-curve-fill" d="M 0,55.0 C 250,38.0 450,48.0 650,82.0 C 800,102.0 900,28.0 1000,42.0 L 1000,120 L 0,120 Z"></path>
    </svg>
  </section>

  <section id="sobre" class="about-editorial-section">
    <div class="container">
      <div class="about-editorial-grid">
        <div class="about-editorial-left">
          <div class="about-tag-row">
            <span class="editorial-tag">${locale === 'pt' ? 'SOBRE MIM' : 'ABOUT ME'}</span>
            <span class="about-tag-line" aria-hidden="true"></span>
          </div>
          <h2 class="section-editorial-title about-title-light">
            ${locale === 'pt' ? 'Minha história e<br />trajetória clínica' : 'My story and<br />clinical journey'}
          </h2>
        </div>
        <div class="about-editorial-right">
          <p class="about-editorial-narrative">
            ${locale === 'pt'
              ? 'A minha jornada na psicologia clínica é guiada pelo compromisso de oferecer um <strong>espaço seguro e acolhedor para o autoconhecimento</strong>. Ao longo dos anos, desenvolvi uma prática que dialoga de forma sensível tanto com adolescentes e suas famílias quanto com adultos que enfrentam momentos de transição e busca por clareza.'
              : 'My journey in clinical psychology is guided by the commitment to offer a <strong>safe and welcoming space for self-discovery</strong>. Over the years, I have developed a practice that dialogues sensitively both with adolescents and their families, as well as adults navigating moments of transition and seeking clarity.'}
          </p>
          <div style="margin-top:1.75rem">
            <a href="/${locale}#atendimento" class="text-action-link text-action-link-light">
              <span>${locale === 'pt' ? 'Conheça o formato das sessões' : 'Learn about session formats'}</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
        <div class="about-nav-indicator" aria-hidden="true">
          <span class="nav-dot-active"></span>
          <span class="nav-line"></span>
          <span class="nav-dot"></span>
          <span class="nav-dot"></span>
          <span class="nav-dot"></span>
        </div>
      </div>

      <div class="about-pillars-dark">
        ${about.pillars
          .map(
            (p, idx) => `
          <div class="editorial-pillar-col">
            <span class="pillar-index">0${idx + 1}.</span>
            <h3 class="pillar-title">${p.title}</h3>
            <p class="pillar-desc">${p.description}</p>
          </div>`
          )
          .join('')}
      </div>
    </div>
  </section>

  <section id="atendimento" class="services-editorial-section">
    <div class="container">
      <div class="services-editorial-head">
        <div>
          <span class="editorial-tag">${locale === 'pt' ? 'Modalidades Clínicas' : 'Clinical Modalities'}</span>
          <h2 class="section-editorial-title">${services.heading}</h2>
        </div>
        <p class="body-editorial" style="font-size:1.12rem">${services.intro}</p>
      </div>
      <div class="services-editorial-interactive">
        <div class="services-modalities-list" role="tablist">
          ${services.modalities
            .map(
              (m, i) => `
            <button type="button" role="tab" aria-selected="${i === 0 ? 'true' : 'false'}" class="service-modality-row-btn" data-modality="${m.id}">
              <span class="service-modality-row-freq">${m.frequencyLabel}</span>
              <span class="service-modality-row-title">${m.title}</span>
            </button>`
            )
            .join('')}
        </div>
        ${services.modalities
          .map(
            (m, i) => `
          <div class="service-details-editorial-panel" data-panel="${m.id}" style="${i === 0 ? '' : 'display:none'}">
            <div class="service-details-badge">
              <span>${m.formatDetails}</span>
            </div>
            <div>
              <h3 style="font-size:2rem;margin-bottom:0.75rem;color:var(--color-primary)">${m.title}</h3>
              <p class="body-editorial" style="font-size:1.05rem;color:var(--text-primary)">${m.summary}</p>
            </div>
            <ul class="service-ideal-list">
              ${m.idealFor.map((item) => `<li class="service-ideal-item"><span class="service-ideal-bullet" aria-hidden="true">—</span><span>${item}</span></li>`).join('')}
            </ul>
            <div style="padding-top:1rem;border-top:1px solid var(--border-hairline)">
              <a href="/${locale}#contato" class="btn-editorial-primary">
                <span>${m.ctaLabel}</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>`
          )
          .join('')}
      </div>
      <div class="service-steps-editorial">
        <div>
          <span class="editorial-tag editorial-tag-rose">${locale === 'pt' ? 'Primeiro Contato' : 'First Step'}</span>
          <h3 style="font-size:1.8rem;margin-top:0.5rem;color:var(--color-primary)">${services.processHeading}</h3>
          <p style="margin-top:1.25rem;font-size:0.82rem;color:var(--text-light);max-width:32ch">${services.ethicsNote}</p>
        </div>
        <div class="steps-timeline">
          ${services.processSteps
            .map(
              (s, index) => `
            <div class="step-card-editorial">
              <span class="step-number">0${index + 1}.</span>
              <h4 style="font-size:1.15rem;color:var(--text-primary)">${s.title}</h4>
              <p class="body-editorial" style="font-size:0.92rem;line-height:1.6">${s.description}</p>
            </div>`
            )
            .join('')}
        </div>
      </div>
    </div>
  </section>

  <section id="midia" class="media-archive-section">
    <div class="container">
      <div class="media-archive-header">
        <div>
          <span class="editorial-tag">${locale === 'pt' ? 'Comunicação Pública & Imprensa' : 'Public Media & Press'}</span>
          <h2 class="section-editorial-title" style="margin-top:0.4rem">${mediaSection.heading}</h2>
          <p class="body-editorial" style="max-width:52ch;margin-top:0.5rem">${mediaSection.intro}</p>
        </div>
        <div>
          <a href="/${locale}/midia" class="btn-editorial-outline">
            <span>${mediaSection.viewAllCta}</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
      <div class="media-archive-grid">
        <article class="media-feature-article">
          <div style="display:flex;flex-direction:column;gap:1.25rem">
            <div style="display:flex;align-items:center;gap:0.75rem">
              <span class="editorial-tag editorial-tag-rose">${mediaSection.categoryLabels[primaryMedia.category]}</span>
              <span style="font-size:0.82rem;color:var(--text-light)">·</span>
              <span style="font-size:0.85rem;color:var(--text-muted);font-weight:500">${primaryMedia.outlet}</span>
            </div>
            <h3 style="font-size:clamp(1.8rem, 2.8vw, 2.5rem);line-height:1.18">${primaryMedia.title[locale]}</h3>
            <p class="body-editorial" style="font-size:1.05rem;line-height:1.7">${primaryMedia.description[locale]}</p>
          </div>
          <div>
            <a href="/${locale}/midia" class="text-action-link">
              <span>${locale === 'pt' ? 'Acessar registro e detalhes' : 'View record & details'}</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </article>
        <div class="media-secondary-index">
          <span class="editorial-tag" style="margin-bottom:0.75rem;color:var(--text-light)">${locale === 'pt' ? 'Arquivo Recente' : 'Recent Index'}</span>
          ${secondaryMedia
            .map(
              (item) => `
            <article class="media-index-entry">
              <div style="display:flex;align-items:center;gap:0.5rem">
                <span class="media-entry-meta">${mediaSection.categoryLabels[item.category]}</span>
                <span style="font-size:0.75rem;color:var(--text-light)">·</span>
                <span style="font-size:0.82rem;color:var(--text-muted)">${item.outlet}</span>
              </div>
              <h4 class="media-entry-title">${item.title[locale]}</h4>
              <p class="body-editorial" style="font-size:0.9rem;line-height:1.55">${item.description[locale]}</p>
            </article>`
            )
            .join('')}
        </div>
      </div>
    </div>
  </section>

  <section id="textos" class="articles-editorial-section">
    <div class="container">
      <div style="display:flex;justify-content:space-between;align-items:flex-end;gap:2rem;flex-wrap:wrap">
        <div>
          <span class="editorial-tag">${locale === 'pt' ? 'Escrita & Ensaios' : 'Writings & Essays'}</span>
          <h2 class="section-editorial-title" style="margin-top:0.4rem">${articlesSection.heading}</h2>
          <p class="body-editorial" style="max-width:48ch;margin-top:0.5rem">${articlesSection.intro}</p>
        </div>
        <div>
          <a href="/${locale}/textos" class="btn-editorial-outline">
            <span>${articlesSection.viewAllCta}</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
      <div class="articles-editorial-row">
        ${featuredArticles
          .map(
            (a) => `
          <article class="article-editorial-entry">
            <div style="display:flex;flex-direction:column;gap:0.85rem">
              <span class="editorial-tag editorial-tag-rose">${a.theme[locale]} · ${a.readingTime[locale]}</span>
              <h3 class="article-title-editorial"><a href="/${locale}/textos/${a.slug}">${a.title[locale]}</a></h3>
              <p class="body-editorial">${a.excerpt[locale]}</p>
            </div>
            <div>
              <a href="/${locale}/textos/${a.slug}" class="text-action-link">
                <span>${articlesSection.readArticleCta}</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </article>`
          )
          .join('')}
      </div>
    </div>
  </section>

  <section id="contato" class="contact-editorial-section">
    <div class="container">
      <div class="contact-editorial-layout">
        <div>
          <span class="editorial-tag">${locale === 'pt' ? 'Canais de Contato' : 'Get in Touch'}</span>
          <h2 class="section-editorial-title" style="margin-top:0.4rem;margin-bottom:1.5rem">${contact.heading}</h2>
          <p class="body-editorial" style="font-size:1.12rem;max-width:44ch">${contact.intro}</p>
          <div style="margin-top:2.5rem;display:flex;flex-direction:column;gap:0.65rem">
            <span class="editorial-tag" style="color:var(--text-light)">${contact.socialHeading}</span>
            <div style="display:flex;gap:1.75rem;flex-wrap:wrap">
              <a href="#instagram-bia-carone" class="text-action-link"><span>${contact.instagramLabel}</span><span aria-hidden="true">↗</span></a>
              <a href="#youtube-bia-carone" class="text-action-link"><span>${contact.youtubeLabel}</span><span aria-hidden="true">↗</span></a>
            </div>
          </div>
        </div>
        <div class="contact-channels-editorial">
          <div class="contact-channel-block">
            <span class="editorial-tag">${locale === 'pt' ? 'Atendimento Clínico' : 'Clinical Practice'}</span>
            <h3 class="contact-channel-title">${contact.clinicalCard.title}</h3>
            <p class="body-editorial" style="font-size:0.98rem">${contact.clinicalCard.description}</p>
            <p style="font-size:0.84rem;color:var(--color-primary);font-weight:500">${contact.clinicalCard.languagesNote}</p>
            <div style="margin-top:0.5rem">
              <a href="${contact.clinicalCard.whatsappHref}" class="btn-editorial-primary"><span>${contact.clinicalCard.ctaLabel}</span><span aria-hidden="true">→</span></a>
            </div>
          </div>
          <div class="contact-channel-block media-channel">
            <span class="editorial-tag editorial-tag-rose">${locale === 'pt' ? 'Imprensa & Institucional' : 'Press & Keynotes'}</span>
            <h3 class="contact-channel-title">${contact.mediaCard.title}</h3>
            <p class="body-editorial" style="font-size:0.98rem">${contact.mediaCard.description}</p>
            <p style="font-size:0.84rem;color:var(--color-rose-deep);font-weight:500">${contact.mediaCard.topicsNote}</p>
            <div style="margin-top:0.5rem">
              <a href="${contact.mediaCard.emailHref}" class="btn-editorial-outline"><span>${contact.mediaCard.ctaLabel}</span><span aria-hidden="true">→</span></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <script>
    document.querySelectorAll('[data-modality]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-modality');
        document.querySelectorAll('[data-modality]').forEach((b) => {
          b.setAttribute('aria-selected', b === btn ? 'true' : 'false');
        });
        document.querySelectorAll('[data-panel]').forEach((p) => {
          p.style.display = p.getAttribute('data-panel') === target ? '' : 'none';
        });
      });
    });
  </script>`;
}

function renderMediaPage(dict) {
  const { locale, mediaPage, mediaSection, contact } = dict;
  const tvAndPress = mediaItems.filter((i) => i.category !== 'youtube');
  const youtube = mediaItems.filter((i) => i.category === 'youtube');

  return `
  <div style="padding-top:clamp(2rem, 5vw, 4rem)">
    <section style="padding-bottom:clamp(3rem, 6vw, 5rem);border-bottom:1px solid var(--border-hairline)">
      <div class="container" style="max-width:780px;display:flex;flex-direction:column;gap:1.25rem">
        <span class="editorial-tag">${locale === 'pt' ? 'Arquivo Profissional' : 'Professional Archive'}</span>
        <h1 class="display-hero-title" style="font-size:clamp(2.5rem, 5vw, 4.25rem)">${mediaPage.heading}</h1>
        <p class="lead-prose" style="color:var(--color-primary)">${mediaPage.intro}</p>
      </div>
    </section>

    <section style="padding-block:var(--section-space)">
      <div class="container">
        <div style="margin-bottom:3rem">
          <span class="editorial-tag editorial-tag-rose">${locale === 'pt' ? 'Transmissões & Entrevistas' : 'Broadcasts & Press'}</span>
          <h2 class="section-editorial-title" style="margin-top:0.4rem">${mediaPage.tvAndPressHeading}</h2>
        </div>
        <div style="display:flex;flex-direction:column;border-top:1px solid var(--border-subtle)">
          ${tvAndPress
            .map(
              (item) => `
            <article style="padding-block:2.25rem;border-bottom:1px solid var(--border-hairline);display:grid;grid-template-columns:0.35fr 0.65fr;gap:2rem;align-items:baseline">
              <div>
                <span class="editorial-tag">${mediaSection.categoryLabels[item.category]}</span>
                <p style="margin-top:0.35rem;font-weight:600;color:var(--color-primary)">${item.outlet}</p>
              </div>
              <div style="display:flex;flex-direction:column;gap:0.75rem">
                <h3 style="font-size:1.65rem;line-height:1.25">${item.title[locale]}</h3>
                <p class="body-editorial">${item.description[locale]}</p>
                <div>
                  <a href="${item.url}" class="text-action-link"><span>${locale === 'pt' ? 'Acessar registro original' : 'View original segment'}</span><span aria-hidden="true">↗</span></a>
                </div>
              </div>
            </article>`
            )
            .join('')}
        </div>
      </div>
    </section>

    <section style="padding-block:var(--section-space);background-color:var(--bg-elevated);border-top:1px solid var(--border-hairline);border-bottom:1px solid var(--border-hairline)">
      <div class="container">
        <div style="display:flex;justify-content:space-between;align-items:flex-end;gap:2rem;flex-wrap:wrap;margin-bottom:3.5rem">
          <div>
            <span class="editorial-tag">${locale === 'pt' ? 'Produção Audiovisual' : 'Audiovisual Content'}</span>
            <h2 class="section-editorial-title" style="margin-top:0.4rem">${mediaPage.youtubeHeading}</h2>
            <p class="body-editorial" style="max-width:52ch;margin-top:0.5rem">${mediaPage.youtubeDescription}</p>
          </div>
          <a href="#youtube-bia-carone" class="btn-editorial-primary"><span>${mediaSection.youtubeCta}</span><span aria-hidden="true">↗</span></a>
        </div>
        <div class="articles-editorial-row" style="margin-top:0">
          ${youtube
            .map(
              (v) => `
            <article class="article-editorial-entry">
              <div style="display:flex;flex-direction:column;gap:0.75rem">
                <span class="editorial-tag editorial-tag-rose">${v.outlet}</span>
                <h3 class="article-title-editorial">${v.title[locale]}</h3>
                <p class="body-editorial">${v.description[locale]}</p>
              </div>
              <div>
                <a href="${v.url}" class="text-action-link"><span>${locale === 'pt' ? 'Assistir reflexão' : 'Watch video'}</span><span aria-hidden="true">↗</span></a>
              </div>
            </article>`
            )
            .join('')}
        </div>
      </div>
    </section>

    <section style="padding-block:var(--section-space)">
      <div class="container">
        <div style="margin-bottom:3.5rem">
          <span class="editorial-tag">${locale === 'pt' ? 'Encontros & Escolas' : 'Keynotes & Education'}</span>
          <h2 class="section-editorial-title" style="margin-top:0.4rem">${mediaPage.talksHeading}</h2>
          <p class="body-editorial" style="max-width:52ch;margin-top:0.5rem">${mediaPage.talksIntro}</p>
        </div>
        <div class="articles-editorial-row" style="margin-top:0">
          ${talkTopics
            .map(
              (t) => `
            <article class="article-editorial-entry">
              <div style="display:flex;flex-direction:column;gap:0.75rem">
                <span class="editorial-tag editorial-tag-rose">${t.audience[locale]}</span>
                <h3 class="article-title-editorial">${t.title[locale]}</h3>
                <p class="body-editorial">${t.description[locale]}</p>
              </div>
            </article>`
            )
            .join('')}
        </div>
        <div style="margin-top:5rem;padding:clamp(2.5rem, 5vw, 4rem);background-color:#FAF8F5;border:1px solid var(--border-subtle);border-left:3px solid var(--color-primary);display:flex;flex-direction:column;gap:1.5rem">
          <span class="editorial-tag">${locale === 'pt' ? 'Assessoria & Imprensa' : 'Press Office & Media Kit'}</span>
          <h2 style="font-size:2rem;color:var(--color-primary)">${mediaPage.pressKitHeading}</h2>
          <p class="body-editorial" style="font-size:1.08rem;line-height:1.75;max-width:68ch">${mediaPage.pressKitBio}</p>
          <div style="margin-top:0.5rem">
            <a href="${contact.mediaCard.emailHref}" class="btn-editorial-primary"><span>${mediaPage.pressKitCta}</span><span aria-hidden="true">→</span></a>
          </div>
        </div>
      </div>
    </section>
  </div>`;
}

function renderArticlesList(dict) {
  const { locale, articlesSection } = dict;
  return `
  <div style="padding-top:clamp(2rem, 5vw, 4rem);padding-bottom:var(--section-space)">
    <div class="container">
      <div style="max-width:780px;display:flex;flex-direction:column;gap:1.25rem;margin-bottom:clamp(3.5rem, 7vw, 6rem)">
        <span class="editorial-tag">${locale === 'pt' ? 'Escritos & Leituras' : 'Essays & Perspectives'}</span>
        <h1 class="display-hero-title" style="font-size:clamp(2.5rem, 5vw, 4.25rem)">${articlesSection.heading}</h1>
        <p class="lead-prose" style="color:var(--color-primary)">${articlesSection.intro}</p>
      </div>
      <div class="articles-editorial-row" style="margin-top:0">
        ${articleItems
          .map(
            (a) => `
          <article class="article-editorial-entry">
            <div style="display:flex;flex-direction:column;gap:0.9rem">
              <span class="editorial-tag editorial-tag-rose">${a.theme[locale]} · ${a.readingTime[locale]}</span>
              <h2 class="article-title-editorial"><a href="/${locale}/textos/${a.slug}">${a.title[locale]}</a></h2>
              <p class="body-editorial">${a.excerpt[locale]}</p>
            </div>
            <div>
              <a href="/${locale}/textos/${a.slug}" class="btn-editorial-outline"><span>${articlesSection.readArticleCta}</span><span aria-hidden="true">→</span></a>
            </div>
          </article>`
          )
          .join('')}
      </div>
    </div>
  </div>`;
}

function renderArticleDetail(dict, article) {
  const { locale, articlesSection, hero } = dict;
  return `
  <article style="padding-top:clamp(2.5rem, 5vw, 4.5rem);padding-bottom:var(--section-space)">
    <div class="container" style="max-width:780px">
      <div style="margin-bottom:2.5rem">
        <a href="/${locale}/textos" class="text-action-link"><span aria-hidden="true">←</span><span>${articlesSection.backToArticles}</span></a>
      </div>
      <header style="display:flex;flex-direction:column;gap:1.25rem;margin-bottom:3.5rem">
        <span class="editorial-tag editorial-tag-rose">${article.theme[locale]} · ${article.readingTime[locale]}</span>
        <h1 class="section-editorial-title" style="font-size:clamp(2.2rem, 4vw, 3.4rem);line-height:1.15">${article.title[locale]}</h1>
        <p class="lead-prose" style="color:var(--color-primary);font-size:1.25rem">${article.excerpt[locale]}</p>
      </header>
      <div style="border-top:1px solid var(--border-hairline);padding-top:2.5rem;display:flex;flex-direction:column;gap:1.75rem">
        ${article.body[locale].map((p) => `<p class="body-editorial" style="font-size:1.12rem;line-height:1.85;color:var(--text-primary)">${p}</p>`).join('')}
      </div>
      <div style="margin-top:4rem;padding-top:2.5rem;border-top:1px solid var(--border-subtle);display:flex;justify-content:space-between;align-items:baseline;gap:2rem;flex-wrap:wrap">
        <div>
          <h2 style="font-size:1.5rem;color:var(--color-primary)">Bia Carone</h2>
          <p style="font-size:0.88rem;color:var(--text-muted)">${hero.credentials}</p>
        </div>
        <a href="/${locale}#contato" class="btn-editorial-primary"><span>${dict.nav.bookCta}</span><span aria-hidden="true">→</span></a>
      </div>
    </div>
  </article>`;
}

export function renderRoute(rawUrl) {
  const url = new URL(rawUrl || '/', 'http://localhost');
  const pathname = url.pathname.replace(/\/+$/, '') || '/';

  if (pathname.startsWith('/images/')) {
    const filePath = path.join(process.cwd(), 'public', pathname);
    if (fs.existsSync(filePath)) {
      return { status: 200, file: filePath, contentType: 'image/png' };
    }
  }

  if (pathname === '/') {
    return { status: 302, redirect: '/pt' };
  }

  const segments = pathname.split('/').filter(Boolean);
  const langCandidate = segments[0] || 'pt';
  const locale = isValidLocale(langCandidate) ? langCandidate : 'pt';
  const dict = getDictionary(locale);

  if (segments.length === 1 && isValidLocale(segments[0])) {
    return { status: 200, html: renderShell(dict, renderHome(dict)) };
  }

  if (segments.length === 2 && segments[1] === 'midia') {
    return { status: 200, html: renderShell(dict, renderMediaPage(dict)) };
  }

  if (segments.length === 2 && segments[1] === 'textos') {
    return { status: 200, html: renderShell(dict, renderArticlesList(dict)) };
  }

  if (segments.length === 3 && segments[1] === 'textos') {
    const article = articleItems.find((a) => a.slug === segments[2]);
    if (article) {
      return { status: 200, html: renderShell(dict, renderArticleDetail(dict, article)) };
    }
  }

  return { status: 404 };
}

export function createPreviewServer() {
  return http.createServer((req, res) => {
    const result = renderRoute(req.url || '/');
    if (result.file && result.contentType) {
      res.writeHead(200, { 'Content-Type': result.contentType, 'Cache-Control': 'public, max-age=86400' });
      fs.createReadStream(result.file).pipe(res);
      return;
    }
    if (result.status === 302 && result.redirect) {
      res.writeHead(302, { Location: result.redirect });
      res.end();
      return;
    }
    if (result.status === 200 && result.html) {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(result.html);
      return;
    }
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not found');
  });
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const port = Number(process.env.PORT || 3000);
  const server = createPreviewServer();
  server.listen(port, () => {
    console.log(`Preview server running at http://localhost:${port}/pt`);
  });
}
