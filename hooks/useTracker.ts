import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export function useTracker() {
  const pathname = usePathname();
  const startTime = useRef<number>(0);

  useEffect(() => {
    startTime.current = Date.now();
    // Track page view
    trackEvent('page_view', { path: pathname });

    // Track scroll depth
    const handleScroll = () => {
      const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
      if (scrollPercent === 50 || scrollPercent === 90) {
        trackEvent('scroll_depth', { depth: scrollPercent, path: pathname });
      }
    };
    
    // Throttle scroll event to avoid spam
    let timeout: NodeJS.Timeout;
    const throttledScroll = () => {
      if (timeout) return;
      timeout = setTimeout(() => {
        handleScroll();
        timeout = undefined as unknown as NodeJS.Timeout;
      }, 1000);
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledScroll);
      // Track time on page when unmounting/leaving
      const timeSpent = Math.round((Date.now() - startTime.current) / 1000);
      trackEvent('time_on_page', { seconds: timeSpent, path: pathname });
    };
  }, [pathname]);
}

export const trackEvent = async (eventName: string, data: Record<string, unknown> = {}) => {
  try {
    await fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event: eventName, data, timestamp: new Date().toISOString() }),
    });
  } catch (error) {
    console.error('Failed to track event:', error);
  }
};
