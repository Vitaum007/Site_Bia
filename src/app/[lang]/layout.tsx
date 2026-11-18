import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { getDictionary, locales } from '@/content';
import { pageMetadata, resolveLocale, SITE_URL } from '@/lib/site';
import { Footer } from '@/components/layout/Footer';
import { LocaleLangSync } from '@/components/layout/LocaleLangSync';
import { Navbar } from '@/components/layout/Navbar';
import { SmoothScroll } from '@/components/layout/SmoothScroll';

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

// Só /pt e /en existem; qualquer outro primeiro segmento responde 404
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = resolveLocale(lang);
  const dict = getDictionary(locale);

  return {
    metadataBase: new URL(SITE_URL),
    ...pageMetadata(locale, '', dict.meta.title, dict.meta.description),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = resolveLocale(lang);
  const dict = getDictionary(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ProfessionalService',
            name: 'Bia Carone — Psicóloga Clínica',
            description: dict.meta.description,
            url: `${SITE_URL}/${locale}`,
            telephone: '+5519999846516',
            email: 'biacarones@gmail.com',
            areaServed: { '@type': 'Country', name: 'BR' },
            serviceType: ['Psychotherapy', 'Clinical Supervision', 'Parental Guidance'],
            availableLanguage: ['Portuguese', 'English'],
            sameAs: ['https://www.instagram.com/biacarone'],
            provider: {
              '@type': 'Person',
              name: 'Bia Carone',
              jobTitle: locale === 'pt' ? 'Psicóloga Clínica' : 'Clinical Psychologist',
            },
          }),
        }}
      />
      <a href="#main" className="skip-link">
        {locale === 'pt' ? 'Pular para o conteúdo' : 'Skip to content'}
      </a>
      <LocaleLangSync locale={locale} />
      <SmoothScroll />
      <div data-locale={locale}>
        <Navbar dict={dict} />
        <main id="main">{children}</main>
        <Footer dict={dict} />
      </div>
    </>
  );
}
