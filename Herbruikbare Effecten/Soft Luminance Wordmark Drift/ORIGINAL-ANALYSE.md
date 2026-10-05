# Analyse van de Orionix-referentie

## Opbouw

Het woordmerk bestaat uit twee exact overlappende tekstlagen:

1. Een permanente lichtgrijze basislaag.
2. Een donkere voorgrondlaag waarop een horizontaal luminantiemasker staat.

De voorgrond is dus geen zwarte tekst die als geheel beweegt. Alleen de dekking
van een smalle zone wordt zichtbaar gemaakt. Daardoor blijft het resultaat zacht.

## Gemeten waarden

- SVG-verhouding: `viewBox="0 0 52.48 12"`
- Lettertype: Fraunces
- Gewicht: `500`
- Lettergrootte in het SVG-raster: `16px`
- Regelhoogte: `12px`
- Letterafstand: `-.48px` (`-.03em`)
- Basiskleur: `#a4a4a4` op `opacity: .15`
- Voorgrondkleur: `#141414`
- Hoogste gemeten maskerdekking: `.4`
- Belangrijke maskerposities: `40.1803%`, `50.3248%` en `60.2704%`

## Bewegingskarakter

Voor de herbruikbare autonome variant is de gemeten visuele stijl vertaald naar:

- `8.5s` per richting;
- `animation-direction: alternate`;
- een symmetrische `cubic-bezier(.45, 0, .55, 1)`;
- geen pauzekeyframes;
- een masker van `200%` breed, zodat het zachte centrum het hele woord aflegt.

De eerdere test met een piekdekking van `1` was zichtbaar te hard. De referentie
blijft rond `.4`; juist dat verschil bepaalt de rustige uitstraling.
