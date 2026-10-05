# Soft Luminance Wordmark Drift

Een autonoom typografisch effect voor grote woordmerken. Een zachte donkere
luminantiezone glijdt langzaam van links naar rechts en vervolgens vloeiend terug.
Er zijn geen stilstaande keyframes, harde zwarte vlakken of scrolllisteners.

## Bestanden

- `soft-luminance-wordmark-drift.css` — complete effectcode
- `HTML-TEMPLATE.html` — minimale markup voor hergebruik
- `ORIGINAL-ANALYSE.md` — gemeten eigenschappen van de Orionix-referentie
- `RECONSTRUCTIE-HANDLEIDING.md` — stappenplan om het effect opnieuw te maken
- `NAAM.txt` — vaste naam van het effect

## Installatie

Laad de stylesheet:

```html
<link rel="stylesheet" href="pad/soft-luminance-wordmark-drift.css">
```

Kopieer daarna de markup uit `HTML-TEMPLATE.html`. Vervang beide keren `orionix`
door hetzelfde woord. Beide tekstlagen moeten identiek blijven uitgelijnd.

## Belangrijkste instellingen

```css
--wordmark-drift-duration: 8.5s;
--wordmark-base-opacity: .15;
--wordmark-peak-opacity: .4;
```

- Een langere duur maakt de beweging rustiger.
- Verhoog de piekdekking voorzichtig; boven `.4` wordt het effect snel te zwart.
- `alternate` laat dezelfde beweging zonder sprong teruglopen.
- De component gebruikt geen JavaScript en reageert niet op scroll.

## Typografie aanpassen

De meegeleverde variant gebruikt Fraunces op gewicht 500. Pas voor een ander
woordmerk `font-family`, `font-size`, `letter-spacing` en de SVG-`viewBox` samen
aan. Het SVG-raster voorkomt dat beide lagen tijdens responsive schalen van
elkaar afwijken.
