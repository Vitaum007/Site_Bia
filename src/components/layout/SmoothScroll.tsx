'use client';

import { useEffect } from 'react';

/*
 * Rolagem suavizada única (roda do mouse e âncoras internas), sem biblioteca.
 *
 * Cada "clique" da roda percorre a mesma distância da rolagem nativa (WHEEL_SPEED = 1), mas a posição
 * "persegue" o alvo com suavização (EASE), em um único requestAnimationFrame que só roda enquanto há movimento.
 * Cliques em âncoras da mesma página usam a mesma curva de suavização para manter velocidade consistente.
 * Continuam nativos: trackpad (já tem inércia própria; suavizar de novo deixa a rolagem "presa"), toque,
 * barra de rolagem e teclado. Fica desligado com prefers-reduced-motion e em dispositivos sem mouse.
 * Os efeitos ligados ao scroll seguem funcionando, pois escutam os eventos de rolagem normais.
 */

const WHEEL_SPEED = 1; // 1 = mesma distância da rolagem nativa
const EASE = 0.14; // fração do caminho percorrida por quadro (menor = mais suave e lento)
const TRACKPAD_MAX_DELTA = 50; // em pixels, deltas abaixo disso vêm de trackpad/rolagem fina, não de roda com "cliques"

/** Heurística: trackpads emitem muitos eventos em pixels com deltas pequenos ou fracionários. */
function isTrackpadLike(event: WheelEvent): boolean {
  if (event.deltaMode !== 0) return false; // linhas/páginas: roda tradicional
  const dy = Math.abs(event.deltaY);
  return dy < TRACKPAD_MAX_DELTA || !Number.isInteger(event.deltaY);
}

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

/** O gesto pertence a um elemento que rola por conta própria (ex.: área interna com overflow)? */
function inNestedScroller(start: EventTarget | null, deltaY: number): boolean {
  let el = start instanceof Element ? start : null;
  while (el && el !== document.body && el !== document.documentElement) {
    const { overflowY } = getComputedStyle(el);
    if ((overflowY === 'auto' || overflowY === 'scroll') && el.scrollHeight > el.clientHeight) {
      const atTop = el.scrollTop <= 0;
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
      if ((deltaY < 0 && !atTop) || (deltaY > 0 && !atBottom)) return true;
    }
    el = el.parentElement;
  }
  return false;
}

function isPlainLeftClick(event: MouseEvent): boolean {
  return !event.defaultPrevented && event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
}

function getSamePageHash(href: string): string | null {
  const url = new URL(href, window.location.href);
  if (url.origin !== window.location.origin) return null;
  if (url.pathname !== window.location.pathname) return null;
  return url.hash || null;
}

/** Resolve o elemento de destino para cliques simples em âncoras da mesma página. */
function findSamePageAnchor(event: MouseEvent): { target: HTMLElement; hash: string } | null {
  if (!isPlainLeftClick(event)) return null;
  const link = (event.target as Element | null)?.closest('a[href]');
  if (!(link instanceof HTMLAnchorElement)) return null;
  if (link.target && link.target !== '_self') return null;

  const hash = getSamePageHash(link.href);
  if (!hash) return null;

  let id: string;
  try {
    id = decodeURIComponent(hash.slice(1));
  } catch {
    return null;
  }
  const el = document.getElementById(id);
  return el ? { target: el, hash } : null;
}

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;

    let target = window.scrollY;
    let current = target;
    let animating = false;
    let rafId: number | null = null;

    const maxScroll = () => document.documentElement.scrollHeight - window.innerHeight;

    const stop = () => {
      animating = false;
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = null;
      target = current = window.scrollY;
    };

    const tick = () => {
      const diff = target - current;
      if (Math.abs(diff) < 0.4) {
        current = target;
        window.scrollTo({ top: current, behavior: 'instant' });
        animating = false;
        rafId = null;
        return;
      }
      current += diff * EASE;
      window.scrollTo({ top: current, behavior: 'instant' });
      rafId = requestAnimationFrame(tick);
    };

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.defaultPrevented) return; // zoom do navegador ou evento já tratado
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      if (inNestedScroller(event.target, event.deltaY)) return;
      if (!animating && isTrackpadLike(event)) return; // trackpad: rolagem nativa

      event.preventDefault();
      let dy = event.deltaY;
      if (event.deltaMode === 1) dy *= 16;
      else if (event.deltaMode === 2) dy *= window.innerHeight;

      if (!animating) {
        current = window.scrollY;
        target = current;
      }
      target = clamp(target + dy * WHEEL_SPEED, 0, Math.max(maxScroll(), 0));
      animating = true;
      if (rafId === null) rafId = requestAnimationFrame(tick);
    };

    // Rolagem por outros meios (barra, teclado): sincroniza e deixa o navegador conduzir
    const onScroll = () => {
      if (!animating) target = current = window.scrollY;
    };

    const onAnchorClick = (event: MouseEvent) => {
      const match = findSamePageAnchor(event);
      if (!match) return;

      event.preventDefault();
      if (!animating) current = window.scrollY;
      const scrollMarginTop = parseFloat(getComputedStyle(match.target).scrollMarginTop) || 0;
      const top = match.target.getBoundingClientRect().top + window.scrollY - scrollMarginTop;
      target = clamp(top, 0, Math.max(maxScroll(), 0));
      animating = true;
      if (rafId === null) rafId = requestAnimationFrame(tick);
      if (!match.target.hasAttribute('tabindex')) match.target.setAttribute('tabindex', '-1');
      match.target.focus({ preventScroll: true });
      if (window.location.hash !== match.hash) {
        history.pushState(null, '', match.hash);
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('click', onAnchorClick);
    window.addEventListener('keydown', stop);
    window.addEventListener('pointerdown', stop);

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('click', onAnchorClick);
      window.removeEventListener('keydown', stop);
      window.removeEventListener('pointerdown', stop);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return null;
}
