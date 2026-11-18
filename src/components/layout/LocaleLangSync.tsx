'use client';

import { useEffect } from 'react';
import type { Locale } from '@/content/types.ts';

export function LocaleLangSync({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale === 'pt' ? 'pt-BR' : 'en';
  }, [locale]);

  return null;
}
