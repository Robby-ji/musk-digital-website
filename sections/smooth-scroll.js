(() => {
  if (typeof window.Lenis !== 'function') return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let lenis = null;

  const createLenis = () => {
    if (reduceMotion.matches || lenis) return;

    lenis = new window.Lenis({
      lerp: .1,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1,
      syncTouch: false,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      infinite: false,
      overscroll: true,
      autoResize: true,
      autoRaf: true,
      autoToggle: true
    });

    window.lenis = lenis;
  };

  const destroyLenis = () => {
    lenis?.destroy();
    lenis = null;
    delete window.lenis;
  };

  document.addEventListener('click', event => {
    if (!lenis) return;

    const link = event.target.closest('a[href^="#"]');
    if (!link) return;

    const hash = link.getAttribute('href');
    const target = hash === '#top' ? document.documentElement : document.querySelector(hash);
    if (!target) return;

    event.preventDefault();
    lenis.scrollTo(target);
    history.pushState(null, '', hash);
  });

  reduceMotion.addEventListener?.('change', event => {
    if (event.matches) destroyLenis();
    else createLenis();
  });

  createLenis();
})();
