# Reconstructiehandleiding

Gebruik dit stappenplan wanneer ik dit effect later opnieuw moet bouwen.

## 1. Maak twee identieke tekstlagen

Plaats dezelfde tekst tweemaal in exact hetzelfde raster. Gebruik bij voorkeur
een SVG met een `foreignObject`, omdat de tekst daardoor responsief schaalt zonder
dat de basis- en effectlaag uit elkaar lopen.

## 2. Bouw de rustige basis

Geef de onderste laag een neutraal grijs (`#a4a4a4`) en ongeveer `15%` opacity.
Deze laag blijft altijd zichtbaar en voorkomt dat het woord tijdens de passage
verdwijnt.

## 3. Maak de donkere effectlaag

Gebruik voor de bovenste laag `#141414`. Zet daar een horizontaal masker op met:

- transparantie buiten de bewegende zone;
- ongeveer `.1` dekking bij de zachte randen;
- maximaal `.4` dekking in het centrum;
- de piek rond `50.3248%`.

Gebruik nooit volledig zwart/`1` als piek voor deze stijl. Dat maakt de passage
hard en verandert het in een opvallende spotlight.

## 4. Maak het masker breder dan het woord

Zet `mask-size` en `-webkit-mask-size` op `200% 100%`. Begin op
`mask-position: 100% 0` en eindig op `0% 0`. Hierdoor loopt het zachte centrum
van de linker- naar de rechterzijde.

## 5. Animeer heen en terug

Gebruik één keyframe bij `0%` en één bij `100%`. Voeg geen tussenpauzes toe.
Gebruik vervolgens:

```css
animation: wordmark-luminance-drift 8.5s
  cubic-bezier(.45, 0, .55, 1) infinite alternate;
```

`alternate` voorkomt een zichtbare reset. De symmetrische easing vertraagt alleen
genoeg om de richting zacht om te keren.

## 6. Controleer de uitkomst

Controleer minimaal drie momenten:

1. De zachte zone staat links.
2. De zone bevindt zich rond het midden.
3. De zone staat rechts en beweegt daarna terug.

Let erop dat de letters nergens volledig zwart worden, de beweging niet afhankelijk
is van scroll en er geen lange stilstand bij de uiteinden ontstaat.

## 7. Afstemmen op een nieuw woord

Pas bij een ander woord eerst de SVG-verhouding aan. Stel daarna lettergrootte en
letterafstand af. Verander pas als laatste de maskergrootte; typografische afwijkingen
moeten niet met een agressiever masker worden verborgen.
