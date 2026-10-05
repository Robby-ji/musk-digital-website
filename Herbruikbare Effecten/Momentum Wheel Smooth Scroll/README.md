# Momentum Wheel Smooth Scroll

Een herbruikbaar globaal scrolleffect op basis van Lenis 1.3.23. Iedere
wielimpuls wordt geïnterpoleerd, waardoor de pagina nog ongeveer 1,2 seconde
zacht doorbeweegt. Mobiele touchscroll blijft native.

## Bestanden

- `momentum-wheel-smooth-scroll.js` — initialisatie, ankerlinks en reduced motion
- `momentum-wheel-smooth-scroll.css` — minimale Lenis-layoutregels
- `HTML-TEMPLATE.html` — laadvolgorde voor een nieuwe site
- `ORIGINAL-ANALYSE.md` — gemeten gedrag en configuratie
- `RECONSTRUCTIE-HANDLEIDING.md` — stappenplan voor hergebruik en afstelling
- `NAAM.txt` — vaste effectnaam

## Afhankelijkheid

Dit effect gebruikt exact Lenis `1.3.23`. Installeer het via npm of laad de vaste
CDN-versie uit `HTML-TEMPLATE.html`. In dit project staat een lokale kopie in:

```text
assets/vendor/lenis/
```

## Gebruik

Laad eerst Lenis, daarna de effectcode:

```html
<link rel="stylesheet" href="lenis.css">
<link rel="stylesheet" href="momentum-wheel-smooth-scroll.css">

<script src="lenis.min.js"></script>
<script src="momentum-wheel-smooth-scroll.js"></script>
```

Er is geen speciale sectiemarkup nodig. Het effect werkt op de gehele pagina.

## Standaardkarakter

- `lerp: .1`
- `smoothWheel: true`
- `wheelMultiplier: 1`
- `syncTouch: false`
- volledige uitloop na ongeveer `1.2s`

Verlaag `lerp` voor een zwaardere, langere uitloop. Verhoog `lerp` voor een
directere reactie.
