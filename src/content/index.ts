import { enDictionary } from './dictionaries/en.ts';
import { ptDictionary } from './dictionaries/pt.ts';
import type { Locale, SiteDictionary } from './types.ts';

export const locales: Locale[] = ['pt', 'en'];

export function isValidLocale(value: string): value is Locale {
  return value === 'pt' || value === 'en';
}

export function getDictionary(locale: Locale): SiteDictionary {
  return locale === 'en' ? enDictionary : ptDictionary;
}

export * from './types.ts';
export * from './media.ts';
export * from './articles.ts';
