# Analyse van het originele scrolleffect

## Techniek

De referentiesite gebruikt Lenis `1.3.23`; het effect komt niet van CSS
`scroll-behavior: smooth`.

Gemeten actieve opties:

```text
lerp: 0.1
smoothWheel: true
wheelMultiplier: 1
touchMultiplier: 1
syncTouch: false
orientation: vertical
gestureOrientation: vertical
infinite: false
overscroll: true
autoResize: true
autoRaf: true
autoToggle: true
```

`lerp: .1` betekent dat de geanimeerde positie ieder frame ongeveer 10% van de
resterende afstand naar de doelpositie aflegt. Daardoor vertraagt de pagina
exponentieel.

## Gemeten wielrespons

Test: startpositie 3000px, één wielimpuls van ongeveer 600px.

| Tijd na impuls | Afgelegde afstand | Voortgang |
|---:|---:|---:|
| 100ms | circa 302px | circa 50% |
| 250ms | circa 479px | circa 80% |
| 500ms | circa 573px | circa 96% |
| 800ms | circa 596px | circa 99% |
| 1200ms | 600px | 100% |

Nieuwe wielimpulsen wijzigen tijdens de animatie de doelpositie. Daardoor voelt
meerdere keren scrollen als het verder aanduwen van een draaiend wiel.

## Responsive gedrag

Desktopmuis en trackpad worden vloeiend gemaakt. `syncTouch: false` laat mobiele
touchscroll grotendeels over aan het platform. Dit voorkomt een onnatuurlijke of
vertragende swipe-ervaring op telefoons.
