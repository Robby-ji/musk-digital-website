(() => {
  const headings = [...document.querySelectorAll('main h1, main h2, main h3')];
  if (!headings.length) return;

  document.documentElement.classList.add('home-heading-effects-ready');

  const splitIntoWords = heading => {
    const accessibleText = heading.textContent.replace(/\s+/g, ' ').trim();
    const walker = document.createTreeWalker(heading, NodeFilter.SHOW_TEXT);
    const textNodes = [];

    while (walker.nextNode()) textNodes.push(walker.currentNode);

    let wordIndex = 0;
    textNodes.forEach(node => {
      const fragment = document.createDocumentFragment();

      node.textContent.split(/(\s+)/).forEach(part => {
        if (!part) return;
        if (/^\s+$/.test(part)) {
          fragment.append(part);
          return;
        }

        const word = document.createElement('span');
        word.className = 'home-heading-word';
        word.style.setProperty('--heading-word', wordIndex++);
        word.textContent = part;
        fragment.append(word);
      });

      node.replaceWith(fragment);
    });

    heading.classList.add('home-heading-reveal');
    if (!heading.hasAttribute('aria-label')) heading.setAttribute('aria-label', accessibleText);
  };

  headings.forEach(splitIntoWords);

  const show = heading => heading.classList.add('is-heading-visible');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (reduceMotion.matches || !('IntersectionObserver' in window)) {
    headings.forEach(show);
    return;
  }

  const heroHeading = document.querySelector('.hero h1');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      show(entry.target);
      observer.unobserve(entry.target);
    });
  }, {
    threshold: .12,
    rootMargin: '0px 0px -10% 0px'
  });

  headings.forEach(heading => {
    if (heading !== heroHeading) observer.observe(heading);
  });

  requestAnimationFrame(() => requestAnimationFrame(() => {
    if (heroHeading) show(heroHeading);
  }));
})();
