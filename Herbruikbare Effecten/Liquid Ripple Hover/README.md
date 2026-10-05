# Liquid Ripple Hover

Een herbruikbaar WebGL-hovereffect dat een afbeelding vervormt met uitdijende waterrimpels onder de cursor. Gebaseerd op de techniek van de Orionix-header: een feedback-hoogteveld, muisgestuurde ripple-stamps en UV-displacement. Zie `ANALYSE.md` voor de technische analyse.

## Gebruik

```html
<link rel="stylesheet" href="pad/naar/liquid-ripple-hover.css" />

<figure class="liquid-ripple-hover" data-liquid-ripple>
  <div data-liquid-ripple-stage>
    <img data-liquid-ripple-source src="image.png" alt="Beschrijving" />
    <canvas data-liquid-ripple-canvas aria-hidden="true"></canvas>
  </div>
</figure>

<script src="pad/naar/liquid-ripple-hover.js"></script>
```

Het buitenste element moet zelf een breedte en hoogte of `aspect-ratio` krijgen. Zonder WebGL of bij `prefers-reduced-motion` blijft automatisch de normale afbeelding zichtbaar.

## Natuurlijke uitloop

Na de laatste muisbeweging stopt de simulatie niet op een vaste tijd. De module
meet de resterende energie in het hoogteveld en verhoogt de demping geleidelijk.
De animatielus sluit pas wanneer de vervorming visueel volledig vlak is. Daardoor
loopt ook een snelle `pointerleave` zacht uit, zonder bevroren eindframe.

Dynamisch toegevoegde elementen kunnen worden gestart met:

```js
LiquidRippleHover.init(element);
```
