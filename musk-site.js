(() => {
  const header = document.querySelector('[data-header]');
  const menuButton = document.querySelector('[data-menu-button]');
  const mobilePanel = document.querySelector('[data-mobile-panel]');
  let previousY = window.scrollY;

  const closeMenu = () => {
    if (!header || !menuButton || !mobilePanel) return;
    header.classList.remove('menu-open');
    menuButton.setAttribute('aria-expanded', 'false');
    mobilePanel.setAttribute('aria-hidden', 'true');
    mobilePanel.inert = true;
    document.body.style.overflow = '';
  };

  const updateHeader = () => {
    if (!header) return;
    const y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 16);
    if (!header.classList.contains('menu-open')) {
      header.classList.toggle('is-hidden', y > 180 && y > previousY + 1);
      if (y < 180 || y < previousY - 4) header.classList.remove('is-hidden');
    }
    previousY = y;
  };

  menuButton?.addEventListener('click', () => {
    const open = !header.classList.contains('menu-open');
    header.classList.toggle('menu-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    mobilePanel.setAttribute('aria-hidden', String(!open));
    mobilePanel.inert = !open;
    document.body.style.overflow = open ? 'hidden' : '';
  });
  mobilePanel?.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  window.addEventListener('scroll', updateHeader, { passive: true });
  window.addEventListener('resize', () => { if (innerWidth >= 810) closeMenu(); });
  updateHeader();

  document.querySelectorAll('[data-faq-row]').forEach(row => {
    const button = row.querySelector('button');
    button?.addEventListener('click', () => {
      const willOpen = !row.classList.contains('is-open');
      document.querySelectorAll('[data-faq-row].is-open').forEach(item => {
        item.classList.remove('is-open');
        item.querySelector('button')?.setAttribute('aria-expanded', 'false');
      });
      row.classList.toggle('is-open', willOpen);
      button.setAttribute('aria-expanded', String(willOpen));
    });
  });

  const parallaxItems = [...document.querySelectorAll('[data-soft-parallax]')];
  if (parallaxItems.length && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let ticking = false;
    const render = () => {
      parallaxItems.forEach(item => {
        const rect = item.getBoundingClientRect();
        const progress = (rect.top + rect.height / 2 - innerHeight / 2) / innerHeight;
        item.style.transform = `translate3d(0, ${Math.max(-42, Math.min(42, progress * -55))}px, 0)`;
      });
      ticking = false;
    };
    addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(render); } }, { passive: true });
    render();
  }
})();
