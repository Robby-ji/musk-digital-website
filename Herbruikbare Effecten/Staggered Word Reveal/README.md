# Staggered Word Reveal

Een herbruikbare intro-animatie waarbij een kop woord voor woord omhoog beweegt en zichtbaar wordt. De woorden worden automatisch door JavaScript opgebouwd; bestaande `<br>`-elementen blijven behouden.

Het effect wacht totdat het lettertype van de kop geladen is en start daarna op een stabiele layout. Hierdoor verandert de regelverdeling niet midden in de animatie. Een korte timeout voorkomt dat de reveal door een ontbrekend font blijft wachten. Wanneer JavaScript niet start, wordt de originele kop na drie seconden automatisch zichtbaar.

## Gebruik

```html
<link rel="stylesheet" href="pad/naar/staggered-word-reveal.css">

<h1 data-staggered-word-reveal>
  Digitale oplossingen<br>die vooruit werken.
</h1>

<script src="pad/naar/staggered-word-reveal.js"></script>
```

## Instellingen

Pas de CSS-variabelen op het element aan:

```css
.mijn-kop {
  --word-reveal-duration: 850ms;
  --word-reveal-delay: 120ms;
  --word-reveal-step: 55ms;
  --word-reveal-distance: 32px;
  --word-reveal-ease: cubic-bezier(.22, 1, .36, 1);
}
```

Het effect initialiseert automatisch. Dynamisch toegevoegde inhoud kan handmatig worden gestart met `StaggeredWordReveal.init(element)` of `StaggeredWordReveal.initAll(container)`.

Bij `prefers-reduced-motion: reduce` blijft alle tekst direct zichtbaar en wordt de animatie uitgeschakeld.
