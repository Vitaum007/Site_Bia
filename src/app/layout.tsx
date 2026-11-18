import type { ReactNode } from 'react';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';

const gotham = localFont({
  src: [
    { path: '../../public/fonts/gotham-book.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/gotham-medium.woff2', weight: '500', style: 'normal' },
    { path: '../../public/fonts/gotham-bold.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-gotham',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jakarta',
  display: 'swap',
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={`${gotham.variable} ${playfair.variable} ${jakarta.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
