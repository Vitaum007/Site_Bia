'use client';

interface MediaCarouselControlsProps {
  pt: boolean;
  pageCount: number;
  current: number;
  onPrev: () => void;
  onNext: () => void;
  onGoTo: (index: number, direction: 1 | -1) => void;
}

export function MediaCarouselControls({
  pt,
  pageCount,
  current,
  onPrev,
  onNext,
  onGoTo,
}: MediaCarouselControlsProps) {
  if (pageCount <= 1) return null;

  return (
    <div className="carousel-controls">
      <button
        type="button"
        className="carousel-btn"
        aria-label={pt ? 'Página anterior' : 'Previous page'}
        onClick={onPrev}
      >
        <span aria-hidden="true">‹</span>
      </button>

      <div className="carousel-dots">
        {Array.from({ length: pageCount }, (_, index) => (
          <button
            key={index}
            type="button"
            className="dot"
            aria-label={pt ? `Ir para a página ${index + 1} de ${pageCount}` : `Go to page ${index + 1} of ${pageCount}`}
            aria-current={index === current ? 'true' : undefined}
            onClick={() => onGoTo(index, index > current ? 1 : -1)}
          />
        ))}
      </div>

      <button
        type="button"
        className="carousel-btn"
        aria-label={pt ? 'Próxima página' : 'Next page'}
        onClick={onNext}
      >
        <span aria-hidden="true">›</span>
      </button>
    </div>
  );
}
