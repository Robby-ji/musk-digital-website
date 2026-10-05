(() => {
  const section = document.querySelector('[data-reel-showcase]');
  const toggle = section?.querySelector('[data-reel-toggle]');
  const main = section?.querySelector('[data-reel-main]');
  const reflection = section?.querySelector('[data-reel-reflection]');
  if (!section || !toggle || !main || !reflection) return;

  let userPaused = false;

  const syncReflection = () => {
    if (!Number.isFinite(main.currentTime)) return;
    if (Math.abs(reflection.currentTime - main.currentTime) > .08) {
      reflection.currentTime = main.currentTime;
    }
    reflection.playbackRate = main.playbackRate;
  };

  const playBoth = async () => {
    if (userPaused) return;
    syncReflection();
    await Promise.allSettled([main.play(), reflection.play()]);
    toggle.setAttribute('aria-label', 'Pause showreel');
  };

  const pauseBoth = () => {
    main.pause();
    reflection.pause();
    toggle.setAttribute('aria-label', 'Play showreel');
  };

  const togglePlayback = () => {
    if (main.paused) {
      userPaused = false;
      playBoth();
    } else {
      userPaused = true;
      pauseBoth();
    }
  };

  toggle.addEventListener('click', togglePlayback);
  toggle.addEventListener('keydown', event => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    togglePlayback();
  });

  main.addEventListener('timeupdate', syncReflection);
  main.addEventListener('seeking', syncReflection);
  main.addEventListener('play', () => {
    if (!userPaused) playBoth();
  });

  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) playBoth();
    else if (!userPaused) pauseBoth();
  }, { threshold: .12 });

  observer.observe(section);
})();
