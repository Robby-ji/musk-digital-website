(() => {
  const section = document.querySelector('[data-orbit-services]');
  if (!section) return;

  const steps = [...section.querySelectorAll('[data-service-step]')];
  const numbers = [...section.querySelectorAll('[data-service-number]')];
  const art = [...section.querySelectorAll('[data-service-art]')];
  const wheel = section.querySelector('[data-service-wheel]');
  let active = 0;
  let frame = 0;

  const setActive = index => {
    const next = Math.max(0, Math.min(steps.length - 1, index));
    if (next === active && section.dataset.ready) return;
    active = next;
    section.dataset.ready = 'true';
    steps.forEach((item, i) => item.classList.toggle('is-active', i === active));
    numbers.forEach((item, i) => item.classList.toggle('is-active', i === active));
    art.forEach((item, i) => item.classList.toggle('is-active', i === active));
  };

  const update = () => {
    frame = 0;
    if (window.innerWidth < 810) {
      const center = window.innerHeight * .5;
      const closest = steps.reduce((best, item, index) => {
        const rect = item.getBoundingClientRect();
        const distance = Math.abs(rect.top + rect.height * .42 - center);
        return distance < best.distance ? { index, distance } : best;
      }, { index: 0, distance: Infinity });
      setActive(closest.index);
      return;
    }

    const rect = section.getBoundingClientRect();
    const naturalTop = rect.top + window.scrollY + 80;
    const stepHeight = Math.max(1, window.innerHeight - 87);
    const progress = Math.max(0, Math.min(4, (window.scrollY - naturalTop) / stepHeight));
    const index = Math.max(0, Math.min(4, Math.round(progress)));
    setActive(index);
    wheel.style.setProperty('--wheel-rotation', `${progress * -30}deg`);
  };

  const requestUpdate = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };

  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);
  update();
})();
