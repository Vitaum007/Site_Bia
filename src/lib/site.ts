import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { isValidLocale, locales, type Locale } from '@/content';

/** URL pública do site. Defina NEXT_PUBLIC_SITE_URL no ambiente de produção quando o domínio estiver confirmado. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://biacarone.com.br').replace(/\/$/, '');

const OG_LOCALE: Record<Locale, string> = { pt: 'pt_BR', en: 'en_US' };

/** Converte o segmento [lang] em Locale; qualquer outro valor vira 404 (evita páginas duplicadas como /fr). */
export function resolveLocale(lang: string): Locale {
  if (!isValidLocale(lang)) notFound();
  return lang;
}

/**
 * Metadados de uma página localizada: título, descrição, URL canônica, alternâncias de idioma e Open Graph.
 * `path` é o caminho após o idioma ('' para a home, '/midia' para a página de mídia).
 */
export function pageMetadata(locale: Locale, path: string, title: string, description: string): Metadata {
  const languages = Object.fromEntries(
    locales.map((l) => [l === 'pt' ? 'pt-BR' : 'en', `/${l}${path}`]),
  );

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}${path}`,
      languages: { ...languages, 'x-default': `/pt${path}` },
    },
    openGraph: {
      type: 'website',
      siteName: 'Bia Carone',
      title,
      description,
      url: `/${locale}${path}`,
      locale: OG_LOCALE[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => OG_LOCALE[l]),
      images: [
        {
          url: '/images/bia-hero.jpg',
          width: 2000,
          height: 2000,
          alt: 'Bia Carone',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/bia-hero.jpg'],
    },
  };
}
