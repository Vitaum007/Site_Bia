import type { Metadata } from 'next';
import { getDictionary, mediaItems, talkTopics } from '@/content';
import { TalksSection } from '@/components/sections/TalksSection';
import { pageMetadata, resolveLocale } from '@/lib/site';

const isExternal = (url: string) => /^https?:\/\//.test(url);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = resolveLocale(lang);
  const { mediaPage } = getDictionary(locale);
  return pageMetadata(locale, '/midia', `${mediaPage.heading} | Bia Carone`, mediaPage.intro);
}

function OrganicLines({ className }: { className: string }) {
  return (
    <svg className={`mp-lines ${className}`} viewBox="0 0 600 420" preserveAspectRatio="xMaxYMin slice" aria-hidden="true" focusable="false">
      <path d="M 640,20 C 560,120 500,200 380,226 C 270,250 180,214 120,150" />
      <path d="M 640,150 C 580,210 500,250 430,290 C 370,324 340,370 330,440" />
    </svg>
  );
}
export default async function MediaPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = resolveLocale(lang);
  const dict = getDictionary(locale);
  const { mediaPage, mediaSection, contact } = dict;
  const pt = locale === 'pt';

  const tvAndPressItems = mediaItems.filter(
    (item) => item.category === 'tv' || item.category === 'press' || item.category === 'podcast'
  );
  const youtubeItems = mediaItems.filter((item) => item.category === 'youtube');

  const jumpLinks = [
    { href: '#tv-imprensa', label: pt ? 'TV e imprensa' : 'TV & press' },
    { href: '#youtube', label: 'YouTube' },
    { href: '#palestras', label: pt ? 'Palestras' : 'Talks' },
    { href: '#press-kit', label: 'Press kit' },
  ];

  return (
    <div className="mp-page">
      {/* Abertura */}
      <section className="mp-hero">
        <OrganicLines className="mp-lines--hero" />
        <div className="container">
          <span className="mp-tag-row"><span className="editorial-tag mp-eyebrow">{pt ? 'Arquivo profissional' : 'Professional archive'}</span><span className="mp-tag-line" aria-hidden="true" /></span>
          <h1 className="mp-title">{mediaPage.heading}</h1>
          <p className="mp-lead">{mediaPage.intro}</p>
          <nav className="mp-jump" aria-label={pt ? 'Nesta página' : 'On this page'}>
            {jumpLinks.map((link) => (
              <a key={link.href} href={link.href} className="mp-jump-link">
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* Televisão, imprensa e podcast */}
      <section id="tv-imprensa" className="mp-section">
        <div className="container">
          <header className="mp-head">
            <span className="mp-tag-row"><span className="editorial-tag mp-eyebrow">{pt ? 'Transmissões e entrevistas' : 'Broadcasts & press'}</span><span className="mp-tag-line" aria-hidden="true" /></span>
            <h2 className="mp-h2">{mediaPage.tvAndPressHeading}</h2>
          </header>

          <div className="mp-grid mp-grid--two">
            {tvAndPressItems.map((item, index) => (
              <article key={item.id} className="mp-card" data-tone={index % 3}>
                <span className="mp-card-eyebrow">{mediaSection.categoryLabels[item.category]}</span>
                <p className="mp-card-outlet">{item.outlet}</p>
                <h3 className="mp-card-title">{item.title[locale]}</h3>
                <p className="mp-card-text">{item.description[locale]}</p>
                <a
                  href={item.url}
                  className="mp-link"
                  {...(isExternal(item.url) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  <span>{pt ? 'Acessar registro original' : 'View original segment'}</span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Canal no YouTube */}
      <section id="youtube" className="mp-section mp-section--rose">
        <div className="container">
          <header className="mp-head">
            <span className="mp-tag-row"><span className="editorial-tag mp-eyebrow">{pt ? 'Produção audiovisual' : 'Audiovisual content'}</span><span className="mp-tag-line" aria-hidden="true" /></span>
            <h2 className="mp-h2">{mediaPage.youtubeHeading}</h2>
            <p className="mp-intro">{mediaPage.youtubeDescription}</p>
          </header>

          <div className="mp-grid mp-grid--three">
            {youtubeItems.map((video) => (
              <article key={video.id} className="mp-card mp-card--video">                <span className="mp-card-eyebrow">{video.outlet}</span>
                <h3 className="mp-card-title">{video.title[locale]}</h3>
                <p className="mp-card-text">{video.description[locale]}</p>
                <a
                  href={video.url}
                  className="mp-link"
                  {...(isExternal(video.url) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  <span>{pt ? 'Assistir vídeo' : 'Watch video'}</span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Palestras e parcerias */}
      <TalksSection
        locale={locale}
        mediaPage={mediaPage}
        emailHref={contact.mediaCard.emailHref}
        topics={talkTopics}
      />

      {/* Press kit */}
      <section id="press-kit" className="mp-section mp-section--tight">
        <div className="container">
          <div className="mp-presskit">
            <OrganicLines className="mp-lines--kit" />
            <span className="mp-tag-row"><span className="editorial-tag mp-presskit-eyebrow">{pt ? 'Assessoria e imprensa' : 'Press office & media kit'}</span><span className="mp-tag-line" aria-hidden="true" /></span>
            <h2 className="mp-presskit-title">{mediaPage.pressKitHeading}</h2>
            <p className="mp-presskit-bio">{mediaPage.pressKitBio}</p>
            <a href={contact.mediaCard.emailHref} className="btn-editorial-primary mp-presskit-action">
              <span>{mediaPage.pressKitCta}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
