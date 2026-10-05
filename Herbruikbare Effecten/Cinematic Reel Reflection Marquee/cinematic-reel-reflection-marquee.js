(() => {
  document.querySelectorAll('[data-cinematic-reel]').forEach(section => {
    const toggle = section.querySelector('[data-reel-toggle]');
    const main = section.querySelector('[data-reel-main]');
    const reflection = section.querySelector('[data-reel-reflection]');
    if (!toggle || !main || !reflection) return;

    let userPaused = false;

    const sync = () => {
      if (!Number.isFinite(main.currentTime)) return;
      if (Math.abs(reflection.currentTime - main.currentTime) > .08) {
        reflection.currentTime = main.currentTime;
      }
      reflection.playbackRate = main.playbackRate;
    };

    const play = async () => {
      if (userPaused) return;
      sync();
      await Promise.allSettled([main.play(), reflection.play()]);
      toggle.setAttribute('aria-label', 'Pause showreel');
    };

    const pause = () => {
      main.pause();
      reflection.pause();
      toggle.setAttribute('aria-label', 'Play showreel');
    };

    const togglePlayback = () => {
      if (main.paused) {
        userPaused = false;
        play();
      } else {
        userPaused = true;
        pause();
      }
    };

    toggle.addEventListener('click', togglePlayback);
    toggle.addEventListener('keydown', event => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      togglePlayback();
    });

    main.addEventListener('timeupdate', sync);
    main.addEventListener('seeking', sync);

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) play();
      else if (!userPaused) pause();
    }, { threshold: .12 });

    observer.observe(section);
  });
})();
