(() => {
  const prefetched = new Set();

  const prefetch = link => {
    if (!link || link.target === '_blank' || link.hasAttribute('download')) return;

    const destination = new URL(link.href, location.href);
    if (!['http:', 'https:'].includes(destination.protocol)) return;
    if (destination.origin !== location.origin) return;
    if (`${destination.pathname}${destination.search}` === `${location.pathname}${location.search}`) return;

    destination.hash = '';
    if (prefetched.has(destination.href)) return;
    prefetched.add(destination.href);

    const hint = document.createElement('link');
    hint.rel = 'prefetch';
    hint.as = 'document';
    hint.href = destination.href;
    document.head.appendChild(hint);
  };

  document.querySelectorAll('a[data-page-link]').forEach(prefetch);
  document.addEventListener('pointerover', event => prefetch(event.target.closest('a[href]')), { passive: true });
  document.addEventListener('focusin', event => prefetch(event.target.closest('a[href]')));
})();
