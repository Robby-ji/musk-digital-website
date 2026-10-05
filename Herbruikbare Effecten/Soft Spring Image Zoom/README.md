# Soft Spring Image Zoom

Een rustige, licht verende beeldzoom voor projectkaarten. Alleen de afbeelding schaalt; het afgeronde frame, de schaduw en de tekst blijven stilstaan.

## Gemeten gedrag van het origineel

- Ruststand: schaal `1`.
- Hoverstand: schaal `1.10`.
- De zoom stabiliseert na ongeveer `700–800ms`.
- Een kleine overshoot maakt de beweging zacht en organisch.
- Bij mouseleave veert het beeld in ongeveer dezelfde tijd terug.
- De mobiele/coarse-pointervariant gebruikt geen hoverzoom.

## Gebruik

```html
<link rel="stylesheet" href="soft-spring-image-zoom.css" />

<a class="soft-spring-image-zoom" href="project.html">
  <img src="project.jpg" alt="Projectnaam" />
</a>
```

Het frame moet een vaste maat of `aspect-ratio` hebben. De meegeleverde klasse verzorgt `overflow: hidden`, zodat het ingezoomde beeld binnen de afgeronde vorm blijft.

## Instellingen

```css
.soft-spring-image-zoom {
  --image-hover-scale: 1.1;
  --image-hover-duration: 720ms;
  --image-hover-ease: cubic-bezier(.22, 1.18, .36, 1);
}
```

De losse CSS-property `scale` is bewust gebruikt. Daardoor kan een bestaande `transform` voor parallax of positionering actief blijven zonder conflict.
