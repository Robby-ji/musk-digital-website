/* Staggered Word Reveal — splitst tekst automatisch en animeert ieder woord. */
(function () {
  const selector = '[data-staggered-word-reveal]';

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

    requestAnimationFrame(() => {
      element.classList.add('is-word-reveal-ready');
    });
  }

  function initAll(root = document) {
    root.querySelectorAll(selector).forEach(init);
  }

  window.StaggeredWordReveal = { init, initAll };
  initAll();
})();
