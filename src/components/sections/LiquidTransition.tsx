'use client';

import { useEffect, useRef } from 'react';

/*
 * Transição líquida Hero → Sobre.
 *
 * O SVG vive dentro do Hero, ancorado ao seu limite inferior, e ocupa uma altura
 * fixa de LAYER_VH da janela. Seu viewBox vai de 0 a 100 na vertical: o preenchimento
 * (mesmo azul da seção Sobre) cobre tudo que está abaixo da borda ondulada, então
 * ele se funde com a seção seguinte sem emendas. O elemento não participa do fluxo,
 * portanto não altera a altura do documento.
 *
 * A borda acompanha o fim do Hero com uma "vantagem" (LEAD) que cresce com o
 * progresso: ela sobe um pouco mais rápido que a página, mas nunca se distancia
 * do conteúdo da seção seguinte. Assim o azul revela o conteúdo sem deixar vazio.
 *
 * Progresso (0..1): intervalo de rolagem definido pela posição real do fim do Hero
 *   - 0 quando o fim do Hero ainda não entrou na janela (ou scrollY = 0)
 *   - 1 quando o fim do Hero chega a END_VH da altura da janela
 */

const LAYER_VH = 30;
const END_VH = 0.2;

// Quanto a borda fica acima do fim do Hero, em vh, no início e no fim
const LEAD_START_VH = 5;
const LEAD_END_VH = 12;
// Impulso extra no meio da transição: a borda sobe mais rápido que a página e depois assenta
const LEAD_BUMP_VH = 14;

/** Distância (em vh) entre a borda e o fim do Hero para o progresso p. */
function leadVh(p: number): number {
  const q = clamp01(p);
  return (
    LEAD_START_VH +
    (LEAD_END_VH - LEAD_START_VH) * easeInOut(q) +
    LEAD_BUMP_VH * Math.sin(q * Math.PI)
  );
}

// Amplitude vertical da borda (unidades do viewBox, 0..100)
const AMP = 7;
// Pontos da curva: x irregular e deslocamentos assimétricos (determinísticos).
// Em p = 0 os pontos têm estes deslocamentos (positivo = vale); o vale central
// fica sob o indicador "Descubra mais".
const XS = [0, 190, 470, 730, 1000];
const OFFSETS = [0.3, -0.95, 0.8, -0.5, 0.95];
// Cada ponto oscila com sua própria velocidade e sentido conforme a rolagem
// (radianos ao longo da transição inteira), então a crista e o vale "viajam" pela borda.
const SPEEDS = [3.4, -4.6, 5.4, -4.0, 3.0];
// Deslocamento horizontal dos pontos internos, em unidades do viewBox (< metade do menor vão)
const SLIDE = [0, 55, -60, 55, 0];

const PHASES = OFFSETS.map((o) => Math.asin(o));

// Pilares: a revelação começa quando o topo deles está a PILLARS_START da altura da
// janela (a partir do topo) e termina PILLARS_SPAN da altura depois
const PILLARS_START = 0.95;
const PILLARS_SPAN = 0.4;
// Faixa de progresso em que o texto de Sobre recupera sua cor (esquerda → direita)
const TEXT_FROM = 0.05;
const TEXT_TO = 0.85;

function clamp01(v: number): number {
  return Math.min(Math.max(v, 0), 1);
}

function easeInOut(t: number): number {
  return t * t * (3 - 2 * t);
}

/** Caminho da superfície para o progresso p (0..1). Já ondulado em p = 0. */
export function computeWavePath(p: number): string {
  const base = 100 - (leadVh(p) / LAYER_VH) * 100;
  const q = clamp01(p);

  const ys = XS.map((_, i) => base + AMP * Math.sin(PHASES[i] + SPEEDS[i] * q));
  // Em q = 0 o seno vale 0, então o formato inicial não muda
  const xs = XS.map((x, i) => x + SLIDE[i] * Math.sin(SPEEDS[i] * q));

  let d = `M ${xs[0]},${ys[0].toFixed(2)}`;
  for (let i = 0; i < xs.length - 1; i++) {
    const mid = ((xs[i] + xs[i + 1]) / 2).toFixed(1);
    d += ` C ${mid},${ys[i].toFixed(2)} ${mid},${ys[i + 1].toFixed(2)} ${xs[i + 1].toFixed(1)},${ys[i + 1].toFixed(2)}`;
  }
  return `${d} L 1000,101 L 0,101 Z`;
}

function bindLiquidListeners(
  hero: HTMLElement,
  onResize: () => void,
  schedule: () => void,
  cleanupVars: () => void,
) {
  const ro = new ResizeObserver(onResize);
  ro.observe(hero);
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', onResize, { passive: true });
  window.addEventListener('load', onResize);
  return () => {
    ro.disconnect();
    window.removeEventListener('scroll', schedule);
    window.removeEventListener('resize', onResize);
    window.removeEventListener('load', onResize);
    cleanupVars();
  };
}

function setupLiquidTransition(layer: HTMLDivElement, path: SVGPathElement, hero: HTMLElement) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const about = reducedMotion ? null : document.getElementById('sobre');
  const indicator = hero.querySelector<HTMLElement>('.hero-scroll-indicator');
  const pillars = about?.querySelector<HTMLElement>('.about-pillars-dark') ?? null;

  let rafId: number | null = null;
  let startY = 0;
  let endY = 1;
  let lastP = -1;
  let lastQ = -1;

  const measure = () => {
    const vh = window.innerHeight || 800;
    const heroBottom = hero.getBoundingClientRect().bottom + window.scrollY;
    startY = Math.max(heroBottom - vh, 0);
    endY = Math.max(heroBottom - vh * END_VH, startY + 1);
  };

  const setOrClear = (name: string, value: number, done: boolean) => {
    if (!about) return;
    if (done) about.style.removeProperty(name);
    else about.style.setProperty(name, value.toFixed(3));
  };

  const render = () => {
    rafId = null;
    const vh = window.innerHeight || 800;
    const p = clamp01((window.scrollY - startY) / (endY - startY));

    if (p !== lastP) {
      lastP = p;
      path.setAttribute('d', computeWavePath(p));
      if (indicator) indicator.style.opacity = String(Math.max(0, 1 - p * 3));

      if (about) {
        const t = clamp01((p - TEXT_FROM) / (TEXT_TO - TEXT_FROM));
        setOrClear('--about-text', t, t >= 1);

        if (p >= 1) about.style.removeProperty('--about-shift');
        else {
          const shift = ((LEAD_END_VH - leadVh(p)) / 100) * vh;
          about.style.setProperty('--about-shift', `${shift.toFixed(1)}px`);
        }
      }
    }

    if (pillars) {
      const top = pillars.getBoundingClientRect().top;
      const q = clamp01((vh * PILLARS_START - top) / (vh * PILLARS_SPAN));
      if (q !== lastQ) {
        lastQ = q;
        setOrClear('--pillars-text', q, q >= 1);
      }
    }
  };

  const schedule = () => {
    if (rafId === null) rafId = requestAnimationFrame(render);
  };

  const onResize = () => {
    measure();
    lastP = -1;
    lastQ = -1;
    schedule();
  };

  measure();
  render();

  return bindLiquidListeners(hero, onResize, schedule, () => {
    if (rafId !== null) cancelAnimationFrame(rafId);
    about?.style.removeProperty('--about-shift');
    about?.style.removeProperty('--about-text');
    about?.style.removeProperty('--pillars-text');
  });
}

export function LiquidTransition() {
  const layerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    const path = pathRef.current;
    const hero = layer?.parentElement;
    if (!layer || !path || !hero) return;
    return setupLiquidTransition(layer, path, hero);
  }, []);

  return (
    <div
      ref={layerRef}
      className="liquid-layer"
      style={{ height: `${LAYER_VH}vh` }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 1000 100" preserveAspectRatio="none" focusable="false">
        <defs>
          {/* Variação tonal discreta junto à borda: azul claro se dissolve no azul profundo */}
          <linearGradient id="liquid-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#4F7BB4" />
            <stop offset="0.1" stopColor="#334B89" />
            <stop offset="0.32" stopColor="#1E2D54" />
          </linearGradient>
        </defs>
        <path ref={pathRef} d={computeWavePath(0)} fill="url(#liquid-fill)" />
      </svg>
    </div>
  );
}
