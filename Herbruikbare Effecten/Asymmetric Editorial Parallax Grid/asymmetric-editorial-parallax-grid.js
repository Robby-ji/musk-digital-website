(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const clamp = value => Math.max(0, Math.min(1, value));

  document.querySelectorAll('[data-editorial-grid]').forEach(section => {
    const header = section.querySelector('[data-editorial-header]');
    const cards = [...section.querySelectorAll('[data-editorial-card]')];
    let frame = 0;

    const update = () => {
      frame = 0;
      if (reduceMotion.matches) return;

      cards.forEach(card => {
        const media = card.querySelector('[data-editorial-media]');
        const image = media?.querySelector('img');
        if (!media || !image) return;

        const rect = media.getBoundingClientRect();
        const progress = clamp((innerHeight - rect.top) / (innerHeight + rect.height));
        const range = rect.height * .19;
        image.style.setProperty('--parallax-y', `${(-range + progress * range * 2).toFixed(2)}px`);
      });
    };

    const requestUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: .08, rootMargin: '0px 0px -6% 0px' });

    if (header) observer.observe(header);
    cards.forEach(card => observer.observe(card));
    addEventListener('scroll', requestUpdate, { passive: true });
    addEventListener('resize', requestUpdate);
    update();
  });
})();
