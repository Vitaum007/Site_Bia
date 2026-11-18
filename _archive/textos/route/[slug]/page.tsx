import Link from 'next/link';
import { notFound } from 'next/navigation';
import { articleItems, getDictionary, isValidLocale, locales } from '@/content/index.ts';

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    articleItems.map((article) => ({
      lang,
      slug: article.slug,
    }))
  );
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const locale = isValidLocale(lang) ? lang : 'pt';
  const dict = getDictionary(locale);
  const article = articleItems.find((item) => item.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <article style={{ paddingTop: 'clamp(2.5rem, 5vw, 4.5rem)', paddingBottom: 'var(--section-space)' }}>
      <div className="container" style={{ maxWidth: '780px' }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <Link
            href={`/${locale}/textos`}
            className="text-action-link"
          >
            <span aria-hidden="true">←</span>
            <span>{dict.articlesSection.backToArticles}</span>
          </Link>
        </div>

        <header style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '3.5rem' }}>
          <span className="editorial-tag editorial-tag-rose">
            {article.theme[locale]} · {article.readingTime[locale]}
          </span>
          <h1 className="section-editorial-title" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.4rem)', lineHeight: 1.15 }}>
            {article.title[locale]}
          </h1>
          <p className="lead-prose" style={{ color: 'var(--color-primary)', fontSize: '1.25rem' }}>
            {article.excerpt[locale]}
          </p>
        </header>

        <div
          style={{
            borderTop: '1px solid var(--border-hairline)',
            paddingTop: '2.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.75rem',
          }}
        >
          {article.body[locale].map((paragraph, index) => (
            <p key={index} className="body-editorial" style={{ fontSize: '1.12rem', lineHeight: 1.85, color: 'var(--text-primary)' }}>
              {paragraph}
            </p>
          ))}
        </div>

        <div
          style={{
            marginTop: '4rem',
            paddingTop: '2.5rem',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            gap: '2rem',
            flexWrap: 'wrap',
          }}
        >
          <div>
            <h2 style={{ fontSize: '1.5rem', color: 'var(--color-primary)' }}>Bia Carone</h2>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              {dict.hero.credentials}
            </p>
          </div>
          <Link href={`/${locale}#contato`} className="btn-editorial-primary">
            <span>{dict.nav.bookCta}</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
