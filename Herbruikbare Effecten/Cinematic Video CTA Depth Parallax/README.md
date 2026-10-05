# Cinematic Video CTA Depth Parallax

Een herbruikbare, donkere CTA-sectie waarin tekst en video als twee aparte
dieptelagen reageren op de scrollpositie. De tekst beweegt rustig omhoog terwijl
het videobeeld in tegengestelde richting beweegt. Een vaste socialbalk houdt de
compositie stabiel.

## Bestanden

- `cinematic-video-cta-depth-parallax.css` — kaart, maskers, responsive layout en reveal
- `cinematic-video-cta-depth-parallax.js` — parallax, videoplayback en reduced motion
- `HTML-TEMPLATE.html` — complete markup
- `ORIGINAL-ANALYSE.md` — gemeten waarden en gedragsanalyse
- `RECONSTRUCTIE-HANDLEIDING.md` — mijn stappenplan voor toekomstige reproducties
- `NAAM.txt` — vaste effectnaam

## Benodigde assets

Gebruik een lokale H.264 MP4 en een posterbeeld, bij voorkeur in 16:9. De
template verwacht standaard:

```text
assets/cta/cta-video.mp4
assets/cta/cta-poster.jpg
```

De kop gebruikt Fraunces Variable met Georgia als fallback. De interface gebruikt
Inter met Arial als fallback.

## Installatie

```html
<link rel="stylesheet" href="pad/cinematic-video-cta-depth-parallax.css">
<script src="pad/cinematic-video-cta-depth-parallax.js"></script>
```

Kopieer daarna `HTML-TEMPLATE.html`. Behoud deze hooks:

- `data-cinematic-cta`
- `data-cinematic-cta-card`
- `data-cinematic-cta-video`

## Parallax instellen

De desktopafstanden staan als data-attributen op de kaart:

```html
data-copy-range="34"
data-video-range="18"
data-mobile-copy-range="12"
data-mobile-video-range="16"
```

De tekst legt dus 68 px af en de video 36 px in tegengestelde richting. Verhoog
de waarden voorzichtig; te grote afstanden verbreken het masker of laten tekst
tegen de socialbalk lopen.

## Belangrijk gedrag

- Desktopkaart: `481px` hoog en `32px` afgerond.
- Mobiele videolaag: `330px` hoog en onderaan verankerd.
- Video speelt alleen wanneer de kaart zichtbaar is.
- De tekst wordt per regel onthuld.
- `prefers-reduced-motion` schakelt alle parallax uit.
- Meerdere CTA's op één pagina worden ondersteund.
