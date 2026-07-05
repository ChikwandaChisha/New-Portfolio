import { useEffect, useState } from 'react';

/**
 * Minimal client-side route derived from the URL hash.
 *
 * Only hashes that start with `#/` are treated as app routes, so this never
 * collides with the in-page section anchors (`#about`, `#projects`, …) that the
 * nav uses for smooth-scrolling. Hash routing also needs no server config, which
 * keeps deep links refresh-safe on any static host (e.g. GitHub Pages).
 */
export type Route = { name: 'home' } | { name: 'project'; slug: string };

function parse(hash: string): Route {
  const match = hash.match(/^#\/project\/([\w-]+)/);
  if (match) return { name: 'project', slug: match[1] };
  return { name: 'home' };
}

export function useHashRoute(): Route {
  const [route, setRoute] = useState<Route>(() => parse(window.location.hash));

  useEffect(() => {
    const onChange = () => setRoute(parse(window.location.hash));
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  return route;
}
