import type { MetadataRoute } from 'next';
import { locales } from '@/content';
import { SITE_URL } from '@/lib/site';

// Páginas públicas, sem o prefixo de idioma
const PATHS = ['', '/midia'];
const LAST_MODIFIED = new Date('2026-11-01');

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.flatMap((path) =>
    locales.map((locale) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly' as const,
      priority: path === '' ? 1 : 0.7,
      alternates: {
        languages: {
          ...Object.fromEntries(
            locales.map((l) => [l === 'pt' ? 'pt-BR' : 'en', `${SITE_URL}/${l}${path}`]),
          ),
          'x-default': `${SITE_URL}/pt${path}`,
        },
      },
    })),
  );
}
