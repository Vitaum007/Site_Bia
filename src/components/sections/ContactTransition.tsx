'use client';

import { useEffect } from 'react';

/*
 * Color Morphing entre "Na mídia" e "Vamos conversar".
 *
 * Este componente não desenha nada: só lê a posição real da seção de contato na janela e escreve duas
 * variáveis CSS, reversíveis e ligadas à rolagem nativa:
 *   --morph-p     (no .overlap-stack)       0..1  mistura do fundo, do off-white ao azul claro
 *   --contact-p   (na seção de contato)     0..1  entrada coordenada do conteúdo
 * A CSS faz o resto (color-mix). Sem JavaScript ou com movimento reduzido, as variáveis não existem e valem
 * os padrões: mídia off-white e contato já azul, sem transição.
 */

// A mistura vai de 0 (contato a MORPH_START_VH da janela abaixo) a 1 (topo do contato a MORPH_END_VH)
const MORPH_START_VH = 1.3;
const MORPH_END_VH = 0.25;

function clamp01(v: number): number {
  return Math.min(Math.max(v, 0), 1);
}

export function ContactTransition() {
  useEffect(() => {
    const section = document.getElementById('contato');
    const stack = section?.closest<HTMLElement>('.overlap-stack');
    if (!section || !stack) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let rafId: number | null = null;
    let lastMorph = -1;
    let lastReveal = -1;

    const render = () => {
      rafId = null;
      const vh = window.innerHeight || 800;
      const rect = section.getBoundingClientRect();

      const morph = clamp01(
        (vh * MORPH_START_VH - rect.top) / (vh * (MORPH_START_VH - MORPH_END_VH)),
      );
      if (morph !== lastMorph) {
        lastMorph = morph;
        stack.style.setProperty('--morph-p', morph.toFixed(3));
      }

      // Conteúdo: do topo da seção na base da janela até ocupar a janela (ou o pé dela, se for mais baixa)
      const reveal = clamp01((vh - rect.top) / Math.min(vh * 0.7, rect.height));
      if (reveal !== lastReveal) {
        lastReveal = reveal;
        if (reveal >= 1) section.style.removeProperty('--contact-p');
        else section.style.setProperty('--contact-p', reveal.toFixed(3));
      }
    };

    const schedule = () => {
      if (rafId === null) rafId = requestAnimationFrame(render);
    };
    const onResize = () => {
      lastMorph = -1;
      lastReveal = -1;
      schedule();
    };

    render();
    const ro = new ResizeObserver(onResize);
    ro.observe(section);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    window.addEventListener('load', onResize);

    return () => {
      ro.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('load', onResize);
      if (rafId !== null) cancelAnimationFrame(rafId);
      stack.style.removeProperty('--morph-p');
      section.style.removeProperty('--contact-p');
    };
  }, []);

  return null;
}
