'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

type Phase = 'idle' | 'loading' | 'completing' | 'fading';

export default function NavigationProgressBar() {
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>('idle');
  const prevPathname = useRef(pathname);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // リンククリック検知 → loading 開始
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as Element).closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      // 外部リンク・ハッシュのみ・javascript: は除外
      if (
        href.startsWith('http') ||
        href.startsWith('//') ||
        href.startsWith('#') ||
        href.startsWith('javascript:') ||
        anchor.target === '_blank'
      ) return;

      // 同一パスへの遷移は除外
      const url = new URL(href, window.location.href);
      if (url.pathname === pathname) return;

      setPhase('loading');
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [pathname]);

  // pathname 変化 → completing → fading → idle
  useEffect(() => {
    if (pathname === prevPathname.current) return;
    prevPathname.current = pathname;

    if (timerRef.current) clearTimeout(timerRef.current);

    setPhase('completing');
    timerRef.current = setTimeout(() => {
      setPhase('fading');
      timerRef.current = setTimeout(() => {
        setPhase('idle');
      }, 300);
    }, 200);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [pathname]);

  if (phase === 'idle') return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        zIndex: 9999,
        pointerEvents: 'none',
        backgroundColor: '#0071e3',
        transformOrigin: 'left center',
        transform:
          phase === 'loading'
            ? 'scaleX(0.6)'
            : phase === 'completing'
            ? 'scaleX(1)'
            : 'scaleX(1)',
        opacity: phase === 'fading' ? 0 : 1,
        transition:
          phase === 'loading'
            ? 'transform 8s cubic-bezier(0.1, 0.05, 0, 1)'
            : phase === 'completing'
            ? 'transform 0.2s ease-out'
            : 'opacity 0.3s ease-out',
      }}
    />
  );
}
