(() => {
  const section = document.querySelector('[data-works-index]');
  if (!section) return;

  const cards = [...section.querySelectorAll('[data-work-card]')];
  const search = section.querySelector('[data-work-search]');
  const filter = section.querySelector('[data-work-filter]');
  const empty = section.querySelector('[data-works-empty]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let frame = 0;

  const normalize = value => value.toLowerCase().trim();

  const applyFilters = () => {
    const query = normalize(search.value);
    const category = filter.value;
    let visible = 0;

    cards.forEach(card => {
      const matchesText = !query || normalize(card.textContent).includes(query);
      const matchesCategory = category === 'all' || card.dataset.categories.split(' ').includes(category);
      const show = matchesText && matchesCategory;
      card.classList.toggle('is-filtered', !show);
      if (show) visible += 1;
    });

    empty.hidden = visible !== 0;
  };

  const updateParallax = () => {
    frame = 0;
    if (reduceMotion.matches) return;

    cards.forEach(card => {
      if (card.classList.contains('is-filtered')) return;
      const media = card.querySelector('[data-work-media]');
      const image = media.querySelector('img');
      const rect = media.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));
      const range = rect.height * .095;
      image.style.setProperty('--works-parallax', `${(-range + progress * range * 2).toFixed(2)}px`);
    });
  };

  const requestParallax = () => {
    if (!frame) frame = requestAnimationFrame(updateParallax);
  };

  search.addEventListener('input', applyFilters);
  filter.addEventListener('change', applyFilters);
  section.querySelector('[data-works-filters]').addEventListener('submit', event => event.preventDefault());
  window.addEventListener('scroll', requestParallax, { passive: true });
  window.addEventListener('resize', requestParallax);
  reduceMotion.addEventListener?.('change', requestParallax);
  updateParallax();
})();
