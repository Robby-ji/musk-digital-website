(() => {
  const section = document.querySelector('[data-featured-work]');
  if (!section) return;

  const header = section.querySelector('[data-featured-header]');
  const projects = [...section.querySelectorAll('[data-featured-project]')];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let frame = 0;

  const clamp = value => Math.max(0, Math.min(1, value));

  const updateParallax = () => {
    frame = 0;
    if (reduceMotion.matches) return;

    projects.forEach(project => {
      const media = project.querySelector('[data-featured-media]');
      const image = media?.querySelector('img');
      if (!media || !image) return;

      const rect = media.getBoundingClientRect();
      const progress = clamp((window.innerHeight - rect.top) / (window.innerHeight + rect.height));
      const range = rect.height * .19;
      const shift = -range + progress * range * 2;
      image.style.setProperty('--parallax-y', `${shift.toFixed(2)}px`);
    });
  };

  const requestParallax = () => {
    if (!frame) frame = requestAnimationFrame(updateParallax);
  };

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: .08, rootMargin: '0px 0px -6% 0px' });

  if (header) revealObserver.observe(header);
  projects.forEach(project => revealObserver.observe(project));

  window.addEventListener('scroll', requestParallax, { passive: true });
  window.addEventListener('resize', requestParallax);
  reduceMotion.addEventListener?.('change', requestParallax);
  updateParallax();
})();
