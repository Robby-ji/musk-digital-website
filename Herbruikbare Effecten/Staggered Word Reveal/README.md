# Staggered Word Reveal

Een herbruikbare intro-animatie waarbij een kop woord voor woord omhoog beweegt en zichtbaar wordt. De woorden worden automatisch door JavaScript opgebouwd; bestaande `<br>`-elementen blijven behouden.

Het effect wacht totdat het lettertype van de kop geladen is en start daarna op een stabiele layout. Bij cross-document View Transitions wacht het daarnaast tot de pagina-overgang is afgerond. Hierdoor verandert de regelverdeling niet midden in de animatie en loopt de reveal niet door de navigatiefade heen. Korte timeouts voorkomen dat de reveal door ontbrekende browserondersteuning of een ontbrekend font blijft wachten. Wanneer JavaScript niet start, wordt de originele kop na drie seconden automatisch zichtbaar.

## Gebruik

```html
<link rel="stylesheet" href="pad/naar/staggered-word-reveal.css">

<h1 data-staggered-word-reveal>
  Digitale oplossingen<br>die vooruit werken.
</h1>

<script src="pad/naar/staggered-word-reveal.js"></script>
```

Laad de stylesheet in `<head>`. Laad het script met `defer` in `<head>` of onderaan `<body>`. De kop heeft alleen `data-staggered-word-reveal` nodig; voeg zelf geen woord-`span`-elementen toe.

## Stabiele startvolgorde

Het effect voorkomt layoutverspringingen met deze vaste volgorde:

1. De kop reserveert direct zijn normale ruimte, maar blijft tijdens de voorbereiding onzichtbaar.
2. JavaScript splitst de tekst zonder de afmetingen van de kop te veranderen.
3. Het daadwerkelijk gebruikte koplettertype wordt afgewacht.
4. Een eventuele cross-document View Transition wordt volledig afgerond.
5. Na twee renderframes start de staggered reveal.

Animeer daarom geen `font-size`, `line-height`, `width`, `margin` of `padding` op de kop of woorden. Het component animeert uitsluitend `opacity` en `transform`.

## View Transitions

Er is geen extra configuratie nodig wanneer een website cross-document View Transitions gebruikt, bijvoorbeeld:

```css
@view-transition {
  navigation: auto;
}
```

Het script luistert naar `pagereveal` en wacht op `event.viewTransition.finished`. In browsers zonder ondersteuning begint het effect normaal na de fontcontrole. Een timeout voorkomt dat de kop verborgen blijft wanneer een browser geen lifecycle-event afgeeft.

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

Zie `RECONSTRUCTIE-HANDLEIDING.md` voor de volledige overdrachtschecklist.
