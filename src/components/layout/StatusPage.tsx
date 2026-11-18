'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface StatusPageProps {
  variant: 'not-found' | 'error';
  onReset?: () => void;
}

function EmptyBoxIllustration() {
  return (
    <svg
      className="status-illustration"
      viewBox="0 0 220 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Sombra suave sob a caixa */}
      <ellipse cx="110" cy="144" rx="68" ry="16" fill="#E3B7CE" fillOpacity="0.28" />

      {/* Borboleta rosa e trilha pontilhada */}
      <path
        d="M126 88C136 74 148 70 144 58C140 48 124 54 126 62C128 70 144 64 134 46C128 36 122 31 118 28"
        stroke="#334B89"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeDasharray="2.5 3.5"
        opacity="0.7"
      />
      <g transform="translate(108 14) rotate(-18)">
        <path
          d="M9 11C4 6 0 9 2 14C4 18 8 15 9 12Z"
          fill="#E3B7CE"
          fillOpacity="0.55"
          stroke="#A06A87"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <path
          d="M9 11C14 6 18 9 16 14C14 18 10 15 9 12Z"
          fill="#E3B7CE"
          fillOpacity="0.55"
          stroke="#A06A87"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <path d="M9 8V15" stroke="#A06A87" strokeWidth="1.2" strokeLinecap="round" />
      </g>

      {/* Interior da caixa aberta */}
      <polygon points="56,78 112,64 164,82 110,98" fill="#D8D2DF" fillOpacity="0.55" />
      <polygon points="56,78 112,64 110,98" fill="#C9C4D6" fillOpacity="0.45" />

      {/* Face frontal esquerda */}
      <polygon
        points="56,78 110,98 110,148 56,128"
        fill="#F7F5F2"
        stroke="#334B89"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Face lateral direita */}
      <polygon
        points="110,98 164,82 164,132 110,148"
        fill="#EFEBE8"
        stroke="#334B89"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Borda superior da caixa */}
      <polyline
        points="56,78 112,64 164,82"
        stroke="#334B89"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="112" y1="64" x2="112" y2="97" stroke="#334B89" strokeWidth="1" strokeOpacity="0.35" />

      {/* Expressão simpática/triste na frente da caixa */}
      <path d="M68 101C70 98 73 98 75 99" stroke="#334B89" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M90 106C92 105 95 106 96 109" stroke="#334B89" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="72" cy="108" r="2.6" fill="#334B89" />
      <circle cx="71.2" cy="107.2" r="0.8" fill="#F7F5F2" />
      <circle cx="92" cy="114" r="2.6" fill="#334B89" />
      <circle cx="91.2" cy="113.2" r="0.8" fill="#F7F5F2" />
      <path
        d="M72 124C78 119 86 121 91 128"
        stroke="#334B89"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

const STATUS_COPY = {
  'not-found': {
    pt: {
      tag: null,
      title: 'Página não encontrada',
      desc: 'Parece que essa página se perdeu por aqui. Que tal voltar para a página inicial e continuar navegando?',
      home: 'Voltar para o início',
      retry: 'Tentar novamente',
    },
    en: {
      tag: null,
      title: 'Page not found',
      desc: 'It looks like this page got lost along the way. How about returning to the home page and continuing your visit?',
      home: 'Back to home',
      retry: 'Try again',
    },
  },
  error: {
    pt: {
      tag: 'Erro inesperado',
      title: 'Algo não saiu como esperado',
      desc: 'Você pode tentar carregar esta página novamente ou voltar para a página inicial.',
      home: 'Voltar para o início',
      retry: 'Tentar novamente',
    },
    en: {
      tag: 'Unexpected error',
      title: 'Something went wrong',
      desc: 'You can try loading this page again or return to the home page.',
      home: 'Back to home',
      retry: 'Try again',
    },
  },
} as const;

export function StatusPage({ variant, onReset }: StatusPageProps) {
  const pathname = usePathname();
  const locale = pathname === '/en' || pathname?.startsWith('/en/') ? 'en' : 'pt';
  const copy = STATUS_COPY[variant][locale];

  return (
    <section className="status-page">
      {/* Linhas orgânicas rosadas nos cantos, remetendo ao Key Visual */}
      <svg className="status-corner status-corner-tl" viewBox="0 0 240 200" fill="none" aria-hidden="true">
        <path
          d="M190 -10C165 95 95 155 -10 175"
          stroke="#E3B7CE"
          strokeWidth="1.5"
          strokeOpacity="0.75"
        />
      </svg>
      <svg className="status-corner status-corner-br" viewBox="0 0 260 220" fill="none" aria-hidden="true">
        <path
          d="M15 230C60 120 145 65 270 40"
          stroke="#E3B7CE"
          strokeWidth="1.5"
          strokeOpacity="0.75"
        />
        <path
          d="M65 230C105 145 175 100 270 82"
          stroke="#E3B7CE"
          strokeWidth="1.3"
          strokeOpacity="0.55"
        />
      </svg>

      <div className="container">
        <div className="status-page-inner">
          <EmptyBoxIllustration />

          {copy.tag === null ? (
            <p className="status-code" aria-hidden="true">
              404
            </p>
          ) : (
            <span className="editorial-tag editorial-tag-rose">{copy.tag}</span>
          )}

          <h1 className="status-page-title">{copy.title}</h1>
          <p className="status-page-desc">{copy.desc}</p>

          <div className="status-page-actions">
            {onReset && (
              <button type="button" onClick={onReset} className="status-pill-btn status-pill-btn-outline">
                {copy.retry}
              </button>
            )}
            <Link href={`/${locale}`} className="status-pill-btn">
              <span>{copy.home}</span>
              <span className="status-pill-arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
