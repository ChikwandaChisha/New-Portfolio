// Don't set `scroll-behavior: smooth` on html/body — it re-animates every
// per-frame scrollTo below and fights this.

function easeInOutCubic(t: number): number {
    return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function smoothScrollTo(selector: string, duration = 1000, offset = 0) {
    const element = document.querySelector(selector);
    if (!element) return;

    const start = window.scrollY;
    const elementRect = element.getBoundingClientRect();
    const target = start + elementRect.top - offset;
    const distance = target - start;

    // Honor reduced-motion: jump straight there.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        window.scrollTo(0, target);
        return;
    }

    let startTime: number | null = null;

    function step(timestamp: number) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeInOutCubic(progress);

        window.scrollTo(0, start + distance * easedProgress);

        if (progress < 1) {
            requestAnimationFrame(step);
        }
    }

    requestAnimationFrame(step);
}

/**
 * Scroll to an in-page section by its `#id`. If the section isn't in the DOM
 * (e.g. we're on a project detail route), navigate home first and stash the
 * target so the home view can complete the scroll once it mounts.
 */
export function goToSection(href: string, duration = 800, offset = 72) {
    if (document.querySelector(href)) {
        smoothScrollTo(href, duration, offset);
        return;
    }
    sessionStorage.setItem('pendingScroll', href);
    if (window.location.hash) {
        window.location.hash = '';
    } else {
        window.dispatchEvent(new HashChangeEvent('hashchange'));
    }
}
