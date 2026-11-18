import Link from 'next/link';
import { articleItems, getDictionary, isValidLocale } from '@/content/index.ts';

export default async function ArticlesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = isValidLocale(lang) ? lang : 'pt';
  const dict = getDictionary(locale);
  const { articlesSection } = dict;

  return (
    <div style={{ paddingTop: 'clamp(2rem, 5vw, 4rem)', paddingBottom: 'var(--section-space)' }}>
      <div className="container">
        <div style={{ maxWidth: '780px', display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: 'clamp(3.5rem, 7vw, 6rem)' }}>
          <span className="editorial-tag">
            {locale === 'pt' ? 'Escritos & Leituras' : 'Essays & Perspectives'}
          </span>
          <h1 className="display-hero-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.25rem)' }}>
            {articlesSection.heading}
          </h1>
          <p className="lead-prose" style={{ color: 'var(--color-primary)' }}>
            {articlesSection.intro}
          </p>
        </div>

        <div className="articles-editorial-row" style={{ marginTop: 0 }}>
          {articleItems.map((article) => (
            <article key={article.slug} className="article-editorial-entry">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                <span className="editorial-tag editorial-tag-rose">
                  {article.theme[locale]} · {article.readingTime[locale]}
                </span>
                <h2 className="article-title-editorial">
                  <Link href={`/${locale}/textos/${article.slug}`}>
                    {article.title[locale]}
                  </Link>
                </h2>
                <p className="body-editorial">
                  {article.excerpt[locale]}
                </p>
              </div>

              <div>
                <Link href={`/${locale}/textos/${article.slug}`} className="btn-editorial-outline">
                  <span>{articlesSection.readArticleCta}</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
