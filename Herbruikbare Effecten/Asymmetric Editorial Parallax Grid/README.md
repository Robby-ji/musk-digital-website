# Asymmetric Editorial Parallax Grid

Een herbruikbare Featured Work-sectie waarin projecten op desktop bewust buiten
een strak raster worden verdeeld. De beelden bewegen tijdens het scrollen binnen
hun kader en iedere kaart onthult beeld, titel, beschrijving en tags gefaseerd.

## Bestanden

- `asymmetric-editorial-parallax-grid.css` — layout, styling en reveals
- `asymmetric-editorial-parallax-grid.js` — viewportreveal en parallaxberekening
- `HTML-TEMPLATE.html` — complete markup met zes projecten
- `ORIGINAL-ANALYSE.md` — desktop- en mobiele metingen
- `RECONSTRUCTIE-HANDLEIDING.md` — mijn stappenplan voor herbouw
- `NAAM.txt` — vaste effectnaam

## Benodigde assets

De huidige template verwijst naar de zes afbeeldingen in `assets/featured/`.
Fraunces Variable wordt gebruikt voor koppen en Inter voor de overige tekst.

## Installatie

```html
<link rel="stylesheet" href="pad/asymmetric-editorial-parallax-grid.css">
<script src="pad/asymmetric-editorial-parallax-grid.js"></script>
```

Kopieer daarna `HTML-TEMPLATE.html`. Behoud de volgende hooks:

- `data-editorial-grid`
- `data-editorial-header`
- `data-editorial-card`
- `data-editorial-media`

## Belangrijkste instellingen

- Desktophoogte: `4590px`
- Smalle kaart: `32.75%`
- Brede kaart: `41.16%`
- Beeldverhouding: `.8`
- Beeldoverscan: `40%`
- Parallaxrange: `±19%` van de kaderhoogte
- Mobiele breakpoint: `809.98px`
- Mobiele kaartafstand: `42px`

Verander bij andere aantallen projecten ook de desktopcoördinaten en sectiehoogte.
