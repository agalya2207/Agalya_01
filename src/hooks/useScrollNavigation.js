import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * Global scroll navigation hook.
 * Moves between ordered top‑level routes on wheel gestures, respecting
 * internal scrollable elements (e.g., tab panels, carousel). Handles a
 * debounce lock to prevent multiple hops per gesture.
 */
export default function useScrollNavigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const [lock, setLock] = useState(false);

  // Ordered list of public routes – update when adding new sections.
  const orderedPaths = ['/', '/about', '/projects', '/contact'];

  // Determine if an element can still scroll vertically in the wheel direction.
  const canScroll = (el, deltaY) => {
    if (!el) return false;
    if (el.scrollHeight <= el.clientHeight) return false; // No overflow
    if (deltaY > 0) {
      // scrolling down
      return el.scrollTop + el.clientHeight < el.scrollHeight - 1;
    }
    if (deltaY < 0) {
      // scrolling up
      return el.scrollTop > 0;
    }
    return false;
  };

  useEffect(() => {
    const handleWheel = (e) => {
      if (lock) return;

      const currentIdx = orderedPaths.indexOf(location.pathname);
      if (currentIdx === -1) return; // not a tracked section

      // Walk up the DOM tree to see if any ancestor can still scroll.
      let node = e.target;
      while (node && node !== document.body) {
        if (canScroll(node, e.deltaY)) return; // allow internal scroll
        node = node.parentElement;
      }

      const navigateTo = (path) => {
        // clear any existing hash to avoid duplicate fragments
        window.history.replaceState(null, '', path);
        navigate(path, { replace: true });
      };

      if (e.deltaY > 40 && currentIdx < orderedPaths.length - 1) {
        setLock(true);
        navigateTo(orderedPaths[currentIdx + 1]);
      } else if (e.deltaY < -40 && currentIdx > 0) {
        setLock(true);
        navigateTo(orderedPaths[currentIdx - 1]);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [location.pathname, navigate, lock]);

  // Release lock after a short time so quick successive scrolls work.
  useEffect(() => {
    if (!lock) return;
    const timer = setTimeout(() => setLock(false), 800);
    return () => clearTimeout(timer);
  }, [lock]);
}
