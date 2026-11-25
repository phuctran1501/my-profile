import { useEffect, useRef, useState } from 'react';

interface OpticalLensProps {
  hidden?: boolean;
}

export function OpticalLens({ hidden = false }: OpticalLensProps) {
  const lensRef = useRef<HTMLDivElement | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [visible, setVisible] = useState(false);
  const [suppressed, setSuppressed] = useState(false);

  useEffect(() => {
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    if (isCoarse) return;

    const target = { x: -120, y: -120 };
    const current = { x: -120, y: -120 };
    let isExp = false;
    let isSupp = false;
    let rafId: number | null = null;

    const tick = () => {
      const prevX = current.x;
      current.x += (target.x - current.x) * 0.24;
      current.y += (target.y - current.y) * 0.24;

      const dx = Math.abs(target.x - current.x);
      const dy = Math.abs(target.y - current.y);
      const speed = Math.min(0.45, Math.abs(current.x - prevX) * 0.02);
      const radius = isExp ? 48 : 7;

      if (lensRef.current) {
        lensRef.current.style.transform = `translate3d(${(current.x - radius).toFixed(1)}px, ${(
          current.y - radius
        ).toFixed(1)}px, 0) scale(${(1 + speed).toFixed(2)}, ${(1 - speed * 0.35).toFixed(2)})`;
      }

      if (dx > 0.15 || dy > 0.15) {
        rafId = requestAnimationFrame(tick);
      } else {
        rafId = null;
      }
    };

    const wake = () => {
      if (rafId === null) rafId = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      setVisible(true);

      const el = e.target as HTMLElement | null;
      const hitNoLens = Boolean(el?.closest('[data-no-lens]'));
      if (hitNoLens !== isSupp) {
        isSupp = hitNoLens;
        setSuppressed(hitNoLens);
      }

      const hit = !hitNoLens && Boolean(el?.closest('[data-lens]'));
      if (hit !== isExp) {
        isExp = hit;
        setExpanded(hit);
      }
      wake();
    };

    const onLeave = () => setVisible(false);

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={lensRef}
      aria-hidden="true"
      className={`optical-lens ${expanded ? 'is-expanded' : ''}`}
      style={{ opacity: visible && !hidden && !suppressed ? 1 : 0 }}
    />
  );
}
