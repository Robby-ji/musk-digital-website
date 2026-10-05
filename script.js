const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('.menu-button');
const mobilePanel = document.querySelector('.mobile-panel');
let previousScrollY = window.scrollY;

const updateHeader = () => {
  const currentScrollY = window.scrollY;
  const delta = currentScrollY - previousScrollY;

  header.classList.toggle('is-scrolled', currentScrollY > 12);

  if (!header.classList.contains('menu-open')) {
    if (currentScrollY > 160 && delta >= 0) header.classList.add('is-hidden');
    if (currentScrollY <= 160 || delta < -4) header.classList.remove('is-hidden');
  }

  previousScrollY = currentScrollY;
};

const closeMenu = () => {
  header.classList.remove('menu-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open menu');
  mobilePanel.setAttribute('aria-hidden', 'true');
  mobilePanel.inert = true;
  document.body.style.overflow = '';
};

menuButton.addEventListener('click', () => {
  const open = !header.classList.contains('menu-open');
  header.classList.remove('is-hidden');
  header.classList.toggle('menu-open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  mobilePanel.setAttribute('aria-hidden', String(!open));
  mobilePanel.inert = !open;
  document.body.style.overflow = open ? 'hidden' : '';
});

mobilePanel.addEventListener('click', event => {
  if (event.target.closest('a')) closeMenu();
});

window.addEventListener('scroll', updateHeader, { passive: true });
window.addEventListener('resize', () => {
  if (window.innerWidth >= 810) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeMenu();
});

updateHeader();
