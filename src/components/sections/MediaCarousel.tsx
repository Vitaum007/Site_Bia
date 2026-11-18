'use client';

import { useMemo, useRef } from 'react';
import type { Locale, MediaItem } from '@/content/types.ts';
import { MediaCarouselCard } from './MediaCarouselCard';
import { MediaCarouselControls } from './MediaCarouselControls';
import { useCarouselController, usePerView, useReducedMotion } from './useMediaCarousel';

interface MediaCarouselProps {
  items: MediaItem[];
  locale: Locale;
  categoryLabels: Record<MediaItem['category'], string>;
}

const SWIPE_MIN_PX = 48;

function getPausedBy(flags: {
  hovering: boolean;
  focusing: boolean;
  hasActive: boolean;
  hasPlaying: boolean;
  docVisible: boolean;
  reducedMotion: boolean;
  animating: boolean;
}): string | undefined {
  return (
    [
      flags.hovering && 'hover',
      flags.focusing && 'focus',
      flags.hasActive && 'card',
      flags.hasPlaying && 'playing',
      !flags.docVisible && 'hidden',
      flags.reducedMotion && 'reduced-motion',
      flags.animating && 'animating',
    ]
      .filter(Boolean)
      .join(' ') || undefined
  );
}

export function MediaCarousel({ items, locale, categoryLabels }: MediaCarouselProps) {
  const perView = usePerView();
  const reducedMotion = useReducedMotion();
  const pt = locale === 'pt';
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const lastPointerType = useRef<string>('mouse');

  const pages = useMemo(() => {
    const result: MediaItem[][] = [];
    for (let i = 0; i < items.length; i += perView) result.push(items.slice(i, i + perView));
    return result;
  }, [items, perView]);
  const pageCount = pages.length;

  const ctrl = useCarouselController(pageCount, perView, reducedMotion);

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      ctrl.next();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      ctrl.prev();
    }
  };

  const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) >= SWIPE_MIN_PX && Math.abs(dx) > Math.abs(dy) * 1.2) {
      if (dx < 0) ctrl.next();
      else ctrl.prev();
    }
  };

  const pausedBy = getPausedBy({
    hovering: ctrl.hovering,
    focusing: ctrl.focusing,
    hasActive: ctrl.activeId !== null,
    hasPlaying: ctrl.playingId !== null,
    docVisible: ctrl.docVisible,
    reducedMotion,
    animating: ctrl.incoming !== null,
  });

  return (
    <div
      className="carousel-container"
      role="group"
      aria-roledescription="carousel"
      aria-label={pt ? 'Vídeos e participações' : 'Videos and appearances'}
      style={{ '--per': perView } as React.CSSProperties}
      data-autoplay={ctrl.autoplayActive ? 'on' : 'off'}
      data-paused-by={pausedBy}
      onMouseEnter={() => ctrl.setHovering(true)}
      onMouseLeave={() => ctrl.setHovering(false)}
      onFocus={(e) => (e.target as HTMLElement).matches(':focus-visible') && ctrl.setFocusing(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget as Node | null) && ctrl.setFocusing(false)}
      onKeyDown={onKeyDown}
    >
      <div
        className="carousel-viewport"
        ref={ctrl.viewportRef}
        onPointerDown={(e) => {
          lastPointerType.current = e.pointerType;
          if (e.pointerType !== 'mouse') touchStart.current = { x: e.clientX, y: e.clientY };
        }}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (touchStart.current = null)}
      >
        <div className="carousel-stage" aria-live={ctrl.autoplayActive || ctrl.incoming !== null ? 'off' : 'polite'}>
          {pages.map((pageItems, pageIndex) => {
            const visible = pageIndex === ctrl.current || pageIndex === ctrl.incoming;
            return (
              <div
                key={pageIndex}
                ref={(el) => {
                  ctrl.pageRefs.current[pageIndex] = el;
                }}
                className="carousel-page"
                role="group"
                aria-roledescription="slide"
                aria-label={`${pageIndex + 1} / ${pageCount}`}
                aria-hidden={visible ? undefined : true}
                data-has-active={pageItems.some((item) => item.id === ctrl.activeId) || undefined}
                style={{ visibility: visible ? 'visible' : 'hidden' }}
              >
                {pageItems.map((item, itemIndex) => {
                  const isPlaying = ctrl.playingId === item.id;
                  return (
                    <MediaCarouselCard
                      key={item.id}
                      item={item}
                      locale={locale}
                      categoryLabel={categoryLabels[item.category]}
                      variant={(pageIndex * perView + itemIndex) % 3}
                      visible={visible}
                      isActive={ctrl.activeId === item.id}
                      isPlaying={isPlaying}
                      showPreview={ctrl.previewId === item.id && !isPlaying && !reducedMotion && visible}
                      lastPointerType={lastPointerType}
                      onActivate={ctrl.activate}
                      onDeactivate={ctrl.deactivate}
                      onPlay={ctrl.setPlayingId}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      <MediaCarouselControls
        pt={pt}
        pageCount={pageCount}
        current={ctrl.current}
        onPrev={ctrl.prev}
        onNext={ctrl.next}
        onGoTo={ctrl.goTo}
      />
    </div>
  );
}
