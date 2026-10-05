# Reconstructiehandleiding

## Benodigde bestanden

- `staggered-word-reveal.css`
- `staggered-word-reveal.js`

Kopieer beide bestanden naar het nieuwe project en laad ze op iedere pagina waarop het effect wordt gebruikt.

## Markup

Plaats `data-staggered-word-reveal` op de volledige kop:

```html
<h1 data-staggered-word-reveal>
  Strategie die werkt.<br>
  Technologie die helpt.
</h1>
```

Behoud gewone tekst in de HTML. Het script maakt de woordelementen automatisch en laat bestaande `<br>`-elementen staan.

## Plaatsing van assets

Laad de CSS in `<head>`, zodat de onbewerkte kop nooit één frame zichtbaar wordt voordat hij is voorbereid. Laad JavaScript met `defer` of onderaan `<body>`.

```html
<link rel="stylesheet" href="/effecten/staggered-word-reveal.css">
<script defer src="/effecten/staggered-word-reveal.js"></script>
```

## Cross-page navigatie

Het effect ondersteunt cross-document View Transitions automatisch. De reveal wacht bij een navigatie tot `pagereveal.viewTransition.finished` is afgerond. Verwijder deze wachtroutine niet wanneer de website `@view-transition { navigation: auto; }` gebruikt; anders kan de nieuwe hero midden in de pagina-fade beginnen en visueel verspringen.

## Layoutregels

- Laat de kop vóór, tijdens en na de reveal dezelfde breedte houden.
- Animeer alleen `opacity` en `transform` van de gegenereerde woorden.
- Verander tijdens de reveal geen `font-size`, `line-height`, `letter-spacing`, marges of padding.
- Zorg dat het hero-lettertype via `@font-face` bereikbaar is voordat de kop wordt gebruikt.
- Gebruik geen handmatige woord-`span`-elementen; de splitter beheert de indexering.

## Controle

Test altijd beide routes:

1. Open of ververs de pagina rechtstreeks.
2. Navigeer vanaf een andere pagina naar dezelfde hero.

De positie, breedte en hoogte van de kop moeten in beide gevallen gelijk blijven. Alleen de woorden mogen omhoog faden.

## Toegankelijkheid

Bij `prefers-reduced-motion: reduce` wordt de tekst direct zichtbaar. Als JavaScript niet initialiseert, toont de CSS-fallback na drie seconden de oorspronkelijke kop.
