'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

const DESKTOP_QUERY = '(min-width: 1100px)';
const TABLET_QUERY = '(min-width: 700px)';
const AUTOPLAY_MS = 5_000;
const TRANSITION_MS = 1000;
const EASING = 'cubic-bezier(0.55, 0, 0.2, 1)';
const PREVIEW_DELAY_MS = 450;

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export function usePerView(): number {
  const [perView, setPerView] = useState(3);

  useEffect(() => {
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const tablet = window.matchMedia(TABLET_QUERY);
    const update = () => setPerView(desktop.matches ? 3 : tablet.matches ? 2 : 1);
    update();
    desktop.addEventListener('change', update);
    tablet.addEventListener('change', update);
    return () => {
      desktop.removeEventListener('change', update);
      tablet.removeEventListener('change', update);
    };
  }, []);

  return perView;
}

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  return reduced;
}

function slidePages(from: HTMLElement, to: HTMLElement, distance: number, direction: 1 | -1): Animation[] {
  const timing: KeyframeAnimationOptions = { duration: TRANSITION_MS, easing: EASING, fill: 'forwards' };
  return [
    from.animate([{ transform: 'translateX(0)' }, { transform: `translateX(${-direction * distance}px)` }], timing),
    to.animate([{ transform: `translateX(${direction * distance}px)` }, { transform: 'translateX(0)' }], timing),
  ];
}

function useCardPreviewState() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [previewId, setPreviewId] = useState<string | null>(null);
  const previewTimer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (previewTimer.current !== null) window.clearTimeout(previewTimer.current);
    },
    [],
  );

  const activate = useCallback((id: string, withPreview = true) => {
    if (previewTimer.current !== null) window.clearTimeout(previewTimer.current);
    previewTimer.current = null;
    setActiveId(id);
    if (!withPreview) return;
    previewTimer.current = window.setTimeout(() => {
      previewTimer.current = null;
      setPreviewId(id);
    }, PREVIEW_DELAY_MS);
  }, []);

  const deactivate = useCallback((id?: string) => {
    if (previewTimer.current !== null) {
      window.clearTimeout(previewTimer.current);
      previewTimer.current = null;
    }
    setActiveId((v) => (id === undefined || v === id ? null : v));
    setPreviewId((v) => (id === undefined || v === id ? null : v));
  }, []);

  useEffect(() => {
    if (activeId === null) return;
    const onDown = (event: PointerEvent) => {
      if (event.pointerType === 'touch' && !(event.target as Element).closest('.video-card.is-active')) {
        deactivate();
      }
    };
    document.addEventListener('pointerdown', onDown);
    return () => document.removeEventListener('pointerdown', onDown);
  }, [activeId, deactivate]);

  return { activeId, previewId, activate, deactivate };
}

function useDocumentVisibility(): boolean {
  const [docVisible, setDocVisible] = useState(true);
  useEffect(() => {
    const onVisibility = () => setDocVisible(document.visibilityState === 'visible');
    onVisibility();
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);
  return docVisible;
}

function useBreakpointSync(params: {
  perView: number;
  current: number;
  pageCount: number;
  setCurrent: (v: number) => void;
  setPlayingId: (v: string | null) => void;
  deactivate: () => void;
}) {
  const { perView, current, pageCount, setCurrent, setPlayingId, deactivate } = params;
  const prevPerView = useRef(perView);
  useEffect(() => {
    if (prevPerView.current === perView) return;
    const firstIndex = current * prevPerView.current;
    prevPerView.current = perView;
    setCurrent(Math.min(Math.floor(firstIndex / perView), Math.max(pageCount - 1, 0)));
    setPlayingId(null);
    deactivate();
  }, [perView, current, pageCount, setCurrent, setPlayingId, deactivate]);
}

function useCarouselCleanup(
  current: number,
  safetyTimer: React.MutableRefObject<number | null>,
  runningAnimations: React.MutableRefObject<Animation[]>,
) {
  useEffect(
    () => () => {
      if (safetyTimer.current !== null) window.clearTimeout(safetyTimer.current);
      runningAnimations.current.forEach((a) => a.cancel());
    },
    [safetyTimer, runningAnimations],
  );

  useIsomorphicLayoutEffect(() => {
    runningAnimations.current.forEach((a) => a.cancel());
    runningAnimations.current = [];
  }, [current, runningAnimations]);
}

function useCarouselAutoplay(params: {
  autoplayActive: boolean;
  current: number;
  tick: number;
  next: () => void;
}) {
  const { autoplayActive, current, tick, next } = params;
  useEffect(() => {
    if (!autoplayActive) return;
    const timer = window.setTimeout(next, AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [autoplayActive, current, tick, next]);
}

function useCarouselFlags() {
  const [hovering, setHovering] = useState(false);
  const [focusing, setFocusing] = useState(false);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [tick, setTick] = useState(0);
  const docVisible = useDocumentVisibility();
  return { hovering, setHovering, focusing, setFocusing, playingId, setPlayingId, tick, setTick, docVisible };
}

export function useCarouselController(pageCount: number, perView: number, reducedMotion: boolean) {
  const [current, setCurrent] = useState(0);
  const [incoming, setIncoming] = useState<number | null>(null);
  const { hovering, setHovering, focusing, setFocusing, playingId, setPlayingId, tick, setTick, docVisible } =
    useCarouselFlags();
  const { activeId, previewId, activate, deactivate } = useCardPreviewState();

  const viewportRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const animatingRef = useRef(false);
  const runningAnimations = useRef<Animation[]>([]);
  const safetyTimer = useRef<number | null>(null);
  const syncRef = useRef({ current, pageCount, reducedMotion });
  syncRef.current = { current, pageCount, reducedMotion };

  useCarouselCleanup(current, safetyTimer, runningAnimations);
  useBreakpointSync({ perView, current, pageCount, setCurrent, setPlayingId, deactivate });

  useEffect(() => {
    pageRefs.current.length = pageCount;
  }, [pageCount]);

  const goTo = useCallback(
    (target: number, direction: 1 | -1) => {
      const { current: activeIndex, pageCount: total, reducedMotion: reduced } = syncRef.current;
      if (animatingRef.current || target === activeIndex || target < 0 || target >= total) return;
      setTick((v) => v + 1);
      setPlayingId(null);
      deactivate();

      const from = pageRefs.current[activeIndex];
      const to = pageRefs.current[target];
      const viewport = viewportRef.current;
      if (reduced || !from || !to || !viewport || typeof from.animate !== 'function') {
        setCurrent(target);
        return;
      }

      animatingRef.current = true;
      setIncoming(target);
      const animations = slidePages(from, to, viewport.clientWidth, direction);
      runningAnimations.current = animations;

      let done = false;
      const finish = (completed: boolean) => {
        if (done) return;
        done = true;
        window.clearTimeout(safetyTimer.current ?? undefined);
        safetyTimer.current = null;
        animatingRef.current = false;
        setIncoming(null);
        if (completed) setCurrent(target);
      };
      animations[1].finished.then(() => finish(true)).catch(() => finish(false));
      safetyTimer.current = window.setTimeout(() => finish(true), TRANSITION_MS + 250);
    },
    [deactivate, setPlayingId, setTick],
  );

  const next = useCallback(() => {
    const { current: activeIndex, pageCount: total } = syncRef.current;
    if (total > 1) goTo((activeIndex + 1) % total, 1);
  }, [goTo]);

  const prev = useCallback(() => {
    const { current: activeIndex, pageCount: total } = syncRef.current;
    if (total > 1) goTo((activeIndex - 1 + total) % total, -1);
  }, [goTo]);

  const autoplayActive =
    pageCount > 1 && !reducedMotion && !hovering && !focusing && activeId === null && playingId === null && docVisible && incoming === null;

  useCarouselAutoplay({ autoplayActive, current, tick, next });

  return {
    current,
    incoming,
    hovering,
    focusing,
    playingId,
    activeId,
    previewId,
    docVisible,
    autoplayActive,
    viewportRef,
    pageRefs,
    setHovering,
    setFocusing,
    setPlayingId,
    activate,
    deactivate,
    goTo,
    next,
    prev,
  };
}
