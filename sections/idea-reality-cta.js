(() => {
  const section = document.querySelector('[data-idea-reality]');
  if (!section) return;

  const card = section.querySelector('[data-idea-card]');
  const video = section.querySelector('[data-idea-video]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let frame = 0;
  let currentCopy = 0;
  let currentVideo = 0;

  const clamp = value => Math.max(0, Math.min(1, value));
  const mix = (from, to, progress) => from + (to - from) * progress;

  const update = () => {
    frame = 0;
    if (reduceMotion.matches) {
      card.style.setProperty('--copy-parallax', '0px');
      card.style.setProperty('--video-parallax', '0px');
      return;
    }

    const rect = card.getBoundingClientRect();
    const progress = clamp((window.innerHeight - rect.top) / (window.innerHeight + rect.height));
    const compact = window.innerWidth < 810;
    const copyRange = compact ? 12 : 34;
    const videoRange = compact ? 16 : 18;
    const targetCopy = mix(copyRange, -copyRange, progress);
    const targetVideo = mix(-videoRange, videoRange, progress);

    currentCopy += (targetCopy - currentCopy) * .18;
    currentVideo += (targetVideo - currentVideo) * .16;
    card.style.setProperty('--copy-parallax', `${currentCopy.toFixed(2)}px`);
    card.style.setProperty('--video-parallax', `${currentVideo.toFixed(2)}px`);

    if (Math.abs(targetCopy - currentCopy) > .08 || Math.abs(targetVideo - currentVideo) > .08) {
      frame = requestAnimationFrame(update);
    }
  };

  const requestUpdate = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      card.classList.add('is-visible');
      revealObserver.disconnect();
    });
  }, { threshold: .18 });

  const videoObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !reduceMotion.matches) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, { threshold: .08 });

  revealObserver.observe(card);
  videoObserver.observe(card);
  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);
  reduceMotion.addEventListener?.('change', requestUpdate);
  requestUpdate();
})();
