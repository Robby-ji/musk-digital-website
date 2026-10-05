/* Staggered Word Reveal — splitst tekst automatisch en animeert ieder woord. */
(function () {
  const selector = '[data-staggered-word-reveal]';

  const pageTransitionReady = new Promise(resolve => {
    if (!('onpagereveal' in window)) {
      resolve();
      return;
    }

    let resolved = false;
    const finish = () => {
      if (resolved) return;
      resolved = true;
      resolve();
    };

    window.addEventListener('pagereveal', event => {
      if (event.viewTransition) event.viewTransition.finished.then(finish, finish);
      else finish();
    }, { once: true });

    setTimeout(finish, 900);
  });

  function splitWords(element) {
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    let node;

    while ((node = walker.nextNode())) {
      if (node.nodeValue.trim()) textNodes.push(node);
    }

    let wordIndex = 0;

    textNodes.forEach(textNode => {
      const fragment = document.createDocumentFragment();

      textNode.nodeValue.split(/(\s+)/).forEach(part => {
        if (!part) return;
        if (/^\s+$/.test(part)) {
          fragment.appendChild(document.createTextNode(part));
          return;
        }

        const word = document.createElement('span');
        word.className = 'staggered-word-reveal__word';
        word.style.setProperty('--word-reveal-index', wordIndex++);
        word.textContent = part;
        fragment.appendChild(word);
      });

      textNode.replaceWith(fragment);
    });
  }

  function init(element) {
    if (!element || element.dataset.staggeredWordRevealReady === 'true') return;

    element.dataset.staggeredWordRevealReady = 'true';
    element.classList.add('staggered-word-reveal');
    splitWords(element);

    let revealStarted = false;
    const startReveal = () => {
      if (revealStarted) return;
      revealStarted = true;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          element.classList.add('is-word-reveal-ready');
        });
      });
    };

    let fontReady = Promise.resolve();

    if (document.fonts && document.fonts.load) {
      const style = getComputedStyle(element);
      const fontRequest = `${style.fontWeight} 1em ${style.fontFamily}`;
      const fontLoaded = document.fonts.load(fontRequest, element.textContent).catch(() => {});
      const fontTimeout = new Promise(resolve => setTimeout(resolve, 900));
      fontReady = Promise.race([fontLoaded, fontTimeout]);
    }

    Promise.all([fontReady, pageTransitionReady]).then(startReveal);
  }

  function initAll(root = document) {
    root.querySelectorAll(selector).forEach(init);
  }

  window.StaggeredWordReveal = { init, initAll };
  initAll();
})();
