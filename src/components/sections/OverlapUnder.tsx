'use client';

import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

/*
 * Camada de baixo de uma sobreposição entre seções.
 *
 * A seção fica `sticky` com o fim dela alinhado ao fim da janela (top = altura da janela − altura da
 * seção). Assim, quando o fim da seção chega ao pé da tela ela para, e a seção seguinte (camada de
 * cima, opaca) sobe por cima dela com a rolagem normal da página. O sticky só vale dentro do
 * `.overlap-stack` que envolve as duas seções, então termina junto com a seguinte.
 */
export function OverlapUnder({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const top = Math.min(0, window.innerHeight - el.offsetHeight);
      el.style.setProperty('--overlap-top', `${top}px`);
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    window.addEventListener('resize', update, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div ref={ref} className={`overlap-under ${className}`.trim()}>
      {children}
    </div>
  );
}
