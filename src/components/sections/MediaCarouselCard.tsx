'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import type { Locale, MediaItem } from '@/content/types.ts';

const isExternal = (url: string) => /^https?:\/\//.test(url);

/** Extrai o ID de um link do YouTube (watch, youtu.be, embed, shorts ou live); null se não for YouTube. */
function youtubeId(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/);
  return match ? match[1] : null;
}

/** Monta a URL de embed do YouTube preservando o tempo inicial (`t=` / `start=`), se houver. */
function youtubeEmbedSrc(id: string, url: string): string {
  const match = url.match(/[?&](?:t|start)=(\d+)/);
  const start = match ? `&start=${match[1]}` : '';
  return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0${start}`;
}

/**
 * Prévia silenciosa de um único card (montada só durante o hover):
 * - `previewVideo` (arquivo mp4): <video> mudo, sem pré-carregamento, liberado ao desmontar;
 * - link do YouTube: iframe mudo e sem controles;
 * - sem nenhum dos dois: nada é renderizado e o card mantém a miniatura.
 */
function VideoPreview({ item, youtube }: { item: MediaItem; youtube: string | null }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !item.previewVideo) return;
    video.src = item.previewVideo;
    video.play().catch(() => undefined);
    return () => {
      video.pause();
      video.removeAttribute('src');
      video.load();
    };
  }, [item.previewVideo]);

  const className = `video-preview${ready ? ' is-ready' : ''}`;

  if (item.previewVideo) {
    return (
      <video
        ref={videoRef}
        className={className}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        tabIndex={-1}
        onPlaying={() => setReady(true)}
      />
    );
  }

  if (youtube) {
    return (
      <iframe
        className={className}
        src={`https://www.youtube-nocookie.com/embed/${youtube}?autoplay=1&mute=1&controls=0&disablekb=1&playsinline=1&loop=1&playlist=${youtube}&rel=0&modestbranding=1`}
        title=""
        aria-hidden="true"
        tabIndex={-1}
        allow="autoplay; encrypted-media"
        loading="lazy"
        onLoad={() => setReady(true)}
      />
    );
  }

  return null;
}

function getExternalLinkProps(external: boolean) {
  return external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
}

export interface MediaCarouselCardProps {
  item: MediaItem;
  locale: Locale;
  categoryLabel: string;
  variant: number;
  visible: boolean;
  isActive: boolean;
  isPlaying: boolean;
  showPreview: boolean;
  lastPointerType: React.MutableRefObject<string>;
  onActivate: (id: string, withPreview?: boolean) => void;
  onDeactivate: (id?: string) => void;
  onPlay: (id: string) => void;
}

export function MediaCarouselCard({
  item,
  locale,
  categoryLabel,
  variant,
  visible,
  isActive,
  isPlaying,
  showPreview,
  lastPointerType,
  onActivate,
  onDeactivate,
  onPlay,
}: MediaCarouselCardProps) {
  const pt = locale === 'pt';
  const watch = pt ? 'Assistir' : 'Watch';
  const id = youtubeId(item.url);
  const external = isExternal(item.url);
  const descId = `video-desc-${item.id}`;
  const linkProps = getExternalLinkProps(external);

  const playInline = (event: React.MouseEvent) => {
    if (!id) return;
    event.preventDefault();
    onPlay(item.id);
  };

  return (
    <article
      className={`video-card${isActive ? ' is-active' : ''}`}
      data-variant={variant}
      onPointerEnter={(event) => {
        if (event.pointerType !== 'touch') onActivate(item.id);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType !== 'touch') onDeactivate(item.id);
      }}
      onFocus={(event) => {
        if ((event.target as HTMLElement).matches(':focus-visible')) onActivate(item.id);
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) onDeactivate(item.id);
      }}
      onClickCapture={(event) => {
        if (lastPointerType.current === 'touch' && !isActive && !isPlaying) {
          event.preventDefault();
          event.stopPropagation();
          onActivate(item.id, false);
        }
      }}
    >
      <span className="video-tag">{categoryLabel}</span>

      <div className="video-thumb">
        {isPlaying && id ? (
          <iframe
            className="video-embed"
            src={youtubeEmbedSrc(id, item.url)}
            title={item.title[locale]}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />
        ) : (
          <a
            href={item.url}
            className="video-thumb-link"
            aria-label={`${watch}: ${item.title[locale]}`}
            aria-describedby={descId}
            tabIndex={visible ? 0 : -1}
            onClick={playInline}
            {...linkProps}
          >
            {item.thumbnail ? (
              <Image src={item.thumbnail} alt="" fill sizes="(max-width: 768px) 90vw, 380px" />
            ) : (
              <span className="video-thumb-fallback" aria-hidden="true" />
            )}
            <span className="video-play" aria-hidden="true" />
          </a>
        )}
        {showPreview && <VideoPreview item={item} youtube={id} />}
      </div>

      <h3 className="video-title">{item.title[locale]}</h3>
      <p className="video-outlet">{item.outlet}</p>

      <div className="video-detail" id={descId}>
        <p className="video-detail-text">{item.description[locale]}</p>
        {external && (
          <a
            href={item.url}
            className="video-detail-link"
            tabIndex={visible && isActive ? 0 : -1}
            onClick={playInline}
            {...getExternalLinkProps(true)}
          >
            <span>{pt ? 'Assistir ao vídeo completo' : 'Watch the full video'}</span>
          </a>
        )}
      </div>
    </article>
  );
}
