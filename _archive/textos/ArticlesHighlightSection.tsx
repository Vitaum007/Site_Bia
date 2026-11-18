import Link from 'next/link';
import { articleItems } from '@/content/articles.ts';
import type { SiteDictionary } from '@/content/types.ts';

interface ArticlesHighlightSectionProps {
  dict: SiteDictionary;
}

export function ArticlesHighlightSection({ dict }: ArticlesHighlightSectionProps) {
  const { locale, articlesSection } = dict;
  const featuredArticles = articleItems.filter((item) => item.featured);

  return (
    <section id="textos" className="articles-editorial-section">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '2rem', flexWrap: 'wrap' }}>
          <div>
            <span className="editorial-tag">
              {locale === 'pt' ? 'Escrita & Ensaios' : 'Writings & Essays'}
            </span>
            <h2 className="section-editorial-title" style={{ marginTop: '0.4rem' }}>
              {articlesSection.heading}
            </h2>
            <p className="body-editorial" style={{ maxWidth: '48ch', marginTop: '0.5rem' }}>
              {articlesSection.intro}
            </p>
          </div>

          <div>
            <Link href={`/${locale}/textos`} className="btn-editorial-outline">
              <span>{articlesSection.viewAllCta}</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <div className="articles-editorial-row">
          {featuredArticles.map((article) => (
            <article key={article.slug} className="article-editorial-entry">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <span className="editorial-tag editorial-tag-rose">
                  {article.theme[locale]} · {article.readingTime[locale]}
                </span>
                <h3 className="article-title-editorial">
                  <Link href={`/${locale}/textos/${article.slug}`}>
                    {article.title[locale]}
                  </Link>
                </h3>
                <p className="body-editorial">
                  {article.excerpt[locale]}
                </p>
              </div>

              <div>
                <Link href={`/${locale}/textos/${article.slug}`} className="text-action-link">
                  <span>{articlesSection.readArticleCta}</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
