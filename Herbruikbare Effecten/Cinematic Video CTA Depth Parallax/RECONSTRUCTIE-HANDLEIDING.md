# Reconstructiehandleiding

Gebruik deze volgorde wanneer ik dit effect opnieuw moet maken.

## 1. Bouw eerst de vaste compositie

Maak één relatief gepositioneerde kaart met `overflow: hidden`, een donkere
achtergrond en een straal van `32px`. Plaats tekst, video en socialbalk als drie
afzonderlijke lagen. Controleer de statische layout voordat beweging wordt
toegevoegd.

## 2. Geef de video overscan

Maak het videobestand ongeveer `64px` hoger dan zijn zichtbare kader. Centreer
de overscan en gebruik `object-fit: cover`. Zonder overscan ontstaan bij de
parallax lege randen.

## 3. Meng video en achtergrond

Gebruik bovenaan het verticale masker uit de analyse. Voeg daarnaast een donkere
horizontale gradient toe tussen tekst en video. Gebruik geen harde scheidslijn.

## 4. Bereken de scrollprogressie

Gebruik:

```js
progress = clamp((innerHeight - card.top) / (innerHeight + card.height));
```

Interpoleer de tekst van positief naar negatief en de video precies andersom.
Schrijf alleen CSS-variabelen; laat CSS de uiteindelijke transforms uitvoeren.

## 5. Maak de beweging zacht

Interpoleer de actuele waarde iedere animatieframe naar het doel. Stop de
animatielus zodra het verschil kleiner is dan ongeveer `.08px`. Zo blijft het
effect soepel zonder permanent onnodig frames te renderen.

## 6. Schaal mobiel terug

Stapel onder `810px` de lagen, centreer de tekst en beperk de ranges tot ongeveer
een derde van desktop. Verberg socialtekst onder `600px`, maar behoud toegankelijke
`aria-labels`.

## 7. Beheer video en toegankelijkheid

- Video altijd `muted`, `loop` en `playsinline`.
- Start en pauzeer via een `IntersectionObserver`.
- Voeg een echt posterbeeld toe.
- Schakel transforms uit bij `prefers-reduced-motion`.
- Laat de CTA en sociallinks echte links blijven.

## 8. Testpunten

Controleer minimaal `1519`, `1105`, `768` en `390px` breedte. Let op horizontale
overflow, tekst-socialoverlap, lege videoranden, afspelen buiten beeld en een
zichtbare maar rustige relatieve beweging.
