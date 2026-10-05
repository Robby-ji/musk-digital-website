(() => {
  const section = document.querySelector('[data-faq-section]');
  if (!section) return;

  const header = section.querySelector('[data-faq-header]');
  const items = [...section.querySelectorAll('[data-faq-item]')];

  items.forEach(item => {
    const button = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer p');
    const text = answer.textContent;
    answer.textContent = '';

    let characterIndex = 0;
    text.split(/(\s+)/).forEach(token => {
      if (/^\s+$/.test(token)) {
        answer.append(document.createTextNode(token));
        return;
      }

      const word = document.createElement('span');
      word.className = 'faq-word';
      [...token].forEach(character => {
        const span = document.createElement('span');
        span.className = 'faq-char';
        span.style.setProperty('--char-index', characterIndex++);
        span.textContent = character;
        word.append(span);
      });
      answer.append(word);
    });

    button.addEventListener('click', () => {
      const open = !item.classList.contains('is-open');
      item.classList.toggle('is-open', open);
      button.setAttribute('aria-expanded', String(open));
    });
  });

  if (!('IntersectionObserver' in window)) {
    header.classList.add('is-visible');
    items.forEach(item => item.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: .12, rootMargin: '0px 0px -3% 0px' });

  observer.observe(header);
  items.forEach(item => observer.observe(item));
})();
