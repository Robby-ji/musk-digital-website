/* Glass Orbit Hover — reusable, dependency-free interaction. */
(function () {
  const finePointer = window.matchMedia('(pointer: fine)');

  function reset(element) {
    element.style.setProperty('--glass-orbit-tilt-x', '0deg');
    element.style.setProperty('--glass-orbit-tilt-y', '0deg');
    element.style.setProperty('--glass-orbit-image-x', '0px');
    element.style.setProperty('--glass-orbit-image-y', '0px');
    element.style.setProperty('--glass-orbit-glow-x', '50%');
    element.style.setProperty('--glass-orbit-glow-y', '50%');
  }

  function init(element) {
    if (!element || element.dataset.glassOrbitReady === 'true') return;
    element.dataset.glassOrbitReady = 'true';
    let frame;

    element.addEventListener('pointermove', event => {
      if (!finePointer.matches) return;
      if (frame) cancelAnimationFrame(frame);

      frame = requestAnimationFrame(() => {
        const bounds = element.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width;
        const y = (event.clientY - bounds.top) / bounds.height;
        const horizontal = x - .5;
        const vertical = y - .5;

        element.style.setProperty('--glass-orbit-tilt-x', `${vertical * -8}deg`);
        element.style.setProperty('--glass-orbit-tilt-y', `${horizontal * 10}deg`);
        element.style.setProperty('--glass-orbit-image-x', `${horizontal * -12}px`);
        element.style.setProperty('--glass-orbit-image-y', `${vertical * -10}px`);
        element.style.setProperty('--glass-orbit-glow-x', `${x * 100}%`);
        element.style.setProperty('--glass-orbit-glow-y', `${y * 100}%`);
      });
    });

    element.addEventListener('pointerleave', () => {
      if (frame) cancelAnimationFrame(frame);
      reset(element);
    });
  }

  function initAll(root = document) {
    root.querySelectorAll('[data-glass-orbit]').forEach(init);
  }

  window.GlassOrbitHover = { init, initAll };
  initAll();
})();
