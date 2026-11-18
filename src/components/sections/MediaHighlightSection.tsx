import Link from 'next/link';
import { mediaItems } from '@/content/media.ts';
import type { SiteDictionary } from '@/content/types.ts';
import { MediaCarousel } from './MediaCarousel';

interface MediaHighlightSectionProps {
  dict: SiteDictionary;
}

const HANDLE = '@biacarone';

export function MediaHighlightSection({ dict }: MediaHighlightSectionProps) {
  const { locale, mediaSection } = dict;
  const featured = mediaItems.filter((item) => item.featured);

  return (
    <section id="midia" className="media-archive-section media-showcase">
      {/* Linhas orgânicas em rosa, como na seção "Sobre mim": decorativas, fora da árvore de acessibilidade */}
      <svg className="media-lines" viewBox="0 0 1024 640" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
        <path d="M -10,120 C 90,70 190,60 290,110 C 390,160 470,150 560,96" />
        <path d="M 1034,430 C 940,500 840,520 740,486 C 650,456 590,470 520,540" />
      </svg>

      <div className="media-side-handle media-side-handle--left" aria-hidden="true">
        <span>{HANDLE}</span>
        <span>{HANDLE}</span>
        <span>{HANDLE}</span>
      </div>
      <div className="media-side-handle media-side-handle--right" aria-hidden="true">
        <span>{HANDLE}</span>
        <span>{HANDLE}</span>
        <span>{HANDLE}</span>
      </div>

      <div className="container">
        <div className="media-archive-header">
          <div>
            <span className="mp-tag-row"><span className="editorial-tag editorial-tag-rose">
              {locale === 'pt' ? 'Comunicação Pública & Imprensa' : 'Public Media & Press'}
            </span><span className="mp-tag-line" aria-hidden="true" /></span>
            <h2 className="section-editorial-title" style={{ marginTop: '0.4rem' }}>
              {mediaSection.heading}
            </h2>
            <p className="body-editorial" style={{ maxWidth: '52ch', marginTop: '0.5rem' }}>
              {mediaSection.intro}
            </p>
          </div>

          <div>
            <Link href={`/${locale}/midia`} className="btn-editorial-outline">
              <span>{mediaSection.viewAllCta}</span>
            </Link>
          </div>
        </div>

        <MediaCarousel items={featured} locale={locale} categoryLabels={mediaSection.categoryLabels} />
      </div>
    </section>
  );
}
