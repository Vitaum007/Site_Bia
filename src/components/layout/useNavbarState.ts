'use client';

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';

const TOP_ZONE = 24;
const COLLAPSE_AFTER = 160;
const COLLAPSE_DISTANCE = 90;
const HERO_ZONE = 160;
const SETTLE_MS = 450;
const MOBILE_QUERY = '(max-width: 900px)';

interface ScrollTrack {
  lastY: number;
  anchorY: number;
  dir: number;
  settleUntil: number;
}

function resetTrack(track: ScrollTrack, y: number) {
  track.lastY = track.anchorY = y;
  track.dir = 0;
}

function processScrollStep(
  track: ScrollTrack,
  y: number,
  panelOpen: boolean,
  setCollapsed: (next: boolean) => void,
) {
  if (performance.now() < track.settleUntil) return resetTrack(track, y);
  if (y <= TOP_ZONE) {
    setCollapsed(false);
    return resetTrack(track, y);
  }
  const dy = y - track.lastY;
  if (Math.abs(dy) < 1) return;
  track.lastY = y;
  const nextDir = dy > 0 ? 1 : -1;
  if (nextDir !== track.dir) {
    track.dir = nextDir;
    track.anchorY = y - dy;
  }
  const distance = Math.abs(y - track.anchorY);
  if (track.dir === 1 && y > COLLAPSE_AFTER && distance >= COLLAPSE_DISTANCE && !panelOpen) {
    setCollapsed(true);
  } else if (track.dir === -1 && y <= HERO_ZONE) {
    setCollapsed(false);
  }
}

export function useNavbarState() {
  const [collapsed, setCollapsed] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [rowWidth, setRowWidth] = useState<number | null>(null);

  const gridRef = useRef<HTMLDivElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const track = useRef<ScrollTrack>({ lastY: 0, anchorY: 0, dir: 0, settleUntil: 0 });
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const panelOpenRef = useRef(false);
  panelOpenRef.current = panelOpen;

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const measure = () => {
      const style = getComputedStyle(el);
      const w = el.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
      setRowWidth(Math.round(w));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const t = track.current;
    t.lastY = t.anchorY = window.scrollY;
    const onScroll = () => processScrollStep(t, window.scrollY, panelOpenRef.current, setCollapsed);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const setCollapsedManually = useCallback((next: boolean) => {
    resetTrack(track.current, window.scrollY);
    track.current.settleUntil = performance.now() + SETTLE_MS;
    setPanelOpen(false);
    setCollapsed(next);
  }, []);

  useEffect(() => {
    if (!panelOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPanelOpen(false);
        menuBtnRef.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (!(e.target as Element | null)?.closest('.site-header')) setPanelOpen(false);
    };
    const onFocusOut = (e: FocusEvent) => {
      if (e.relatedTarget instanceof Element && !e.relatedTarget.closest('.site-header')) {
        setPanelOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('pointerdown', onPointer);
    window.addEventListener('focusout', onFocusOut);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('pointerdown', onPointer);
      window.removeEventListener('focusout', onFocusOut);
    };
  }, [panelOpen]);

  useEffect(() => {
    if (!isMobile) setPanelOpen(false);
  }, [isMobile]);

  const onMenuClick = () => {
    if (collapsed) {
      setCollapsedManually(false);
      if (isMobile) setPanelOpen(true);
    } else if (isMobile) {
      setPanelOpen((open) => !open);
    } else {
      setCollapsedManually(true);
    }
  };

  const closePanel = () => {
    setPanelOpen(false);
    menuBtnRef.current?.focus();
  };

  return { collapsed, panelOpen, isMobile, rowWidth, gridRef, menuBtnRef, mounted, onMenuClick, closePanel };
}
