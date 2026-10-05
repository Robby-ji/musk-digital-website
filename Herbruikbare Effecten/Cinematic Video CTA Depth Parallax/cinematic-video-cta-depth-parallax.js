(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const clamp = value => Math.max(0, Math.min(1, value));
  const mix = (from, to, progress) => from + (to - from) * progress;

  document.querySelectorAll('[data-cinematic-cta]').forEach(section => {
    const card = section.querySelector('[data-cinematic-cta-card]');
    const video = section.querySelector('[data-cinematic-cta-video]');
    if (!card || !video) return;

    let frame = 0;
    let currentCopy = 0;
    let currentVideo = 0;

    const number = (name, fallback) => {
      const value = Number.parseFloat(card.dataset[name]);
      return Number.isFinite(value) ? value : fallback;
    };

    const update = () => {
      frame = 0;

      if (reduceMotion.matches) {
        card.style.setProperty('--cta-copy-y', '0px');
        card.style.setProperty('--cta-video-y', '0px');
        return;
      }

      const rect = card.getBoundingClientRect();
      const progress = clamp((window.innerHeight - rect.top) / (window.innerHeight + rect.height));
      const compact = window.innerWidth < 810;
      const copyRange = compact ? number('mobileCopyRange', 12) : number('copyRange', 34);
      const videoRange = compact ? number('mobileVideoRange', 16) : number('videoRange', 18);
      const targetCopy = mix(copyRange, -copyRange, progress);
      const targetVideo = mix(-videoRange, videoRange, progress);

      currentCopy += (targetCopy - currentCopy) * .18;
      currentVideo += (targetVideo - currentVideo) * .16;
      card.style.setProperty('--cta-copy-y', `${currentCopy.toFixed(2)}px`);
      card.style.setProperty('--cta-video-y', `${currentVideo.toFixed(2)}px`);

      if (Math.abs(targetCopy - currentCopy) > .08 || Math.abs(targetVideo - currentVideo) > .08) {
        frame = requestAnimationFrame(update);
      }
    };

    const requestUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const revealObserver = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      card.classList.add('is-visible');
      revealObserver.disconnect();
    }, { threshold: .18 });

    const videoObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !reduceMotion.matches) video.play().catch(() => {});
        else video.pause();
      });
    }, { threshold: .08 });

    revealObserver.observe(card);
    videoObserver.observe(card);
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    reduceMotion.addEventListener?.('change', requestUpdate);
    requestUpdate();
  });
})();
