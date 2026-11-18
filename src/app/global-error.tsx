'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { logError } from '@/lib/logger';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    logError(error);
  }, [error]);

  return (
    <html lang="pt-BR">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#EFEBE8',
          color: '#282828',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          padding: '2rem',
        }}
      >
        <main style={{ maxWidth: '36rem', marginInline: 'auto' }}>
          <p
            style={{
              fontSize: '0.75rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              fontWeight: 600,
              color: '#A06A87',
              marginBottom: '0.75rem',
            }}
          >
            Erro inesperado
          </p>
          <h1
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 400,
              lineHeight: 1.1,
              color: '#334B89',
              margin: '0 0 1rem',
            }}
          >
            Algo não saiu como esperado
          </h1>
          <p style={{ color: '#605D59', lineHeight: 1.7, marginBottom: '1.5rem' }}>
            Tente recarregar a página ou voltar para o início.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={reset}
              style={{
                background: 'none',
                border: 'none',
                borderBottom: '1px solid rgba(51, 75, 137, 0.35)',
                color: '#334B89',
                fontWeight: 600,
                fontSize: '0.9rem',
                paddingBottom: '2px',
                cursor: 'pointer',
              }}
            >
              Tentar novamente
            </button>
            <Link
              href="/pt"
              style={{
                color: '#334B89',
                textDecoration: 'none',
                borderBottom: '1px solid rgba(51, 75, 137, 0.35)',
                fontWeight: 600,
                fontSize: '0.9rem',
                paddingBottom: '2px',
              }}
            >
              Voltar para o início →
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
