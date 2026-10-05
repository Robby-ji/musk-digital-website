# Cinematic Reel Reflection Marquee

Een herbruikbare showreelsectie met drie gekoppelde lagen:

1. Een rustige, oneindige Fraunces-ticker.
2. Een afgeronde 16:9-video vóór de tekst.
3. Een tweede videolaag die als vervaagde spiegeling onder het beeld verschijnt.

## Bestanden

- `cinematic-reel-reflection-marquee.css` — layout, ticker en reflectie
- `cinematic-reel-reflection-marquee.js` — afspelen, pauzeren en videosynchronisatie
- `HTML-TEMPLATE.html` — minimale herbruikbare markup
- `ORIGINAL-ANALYSE.md` — gemeten waarden van de Orionix-referentie
- `RECONSTRUCTIE-HANDLEIDING.md` — stappenplan voor een nieuwe implementatie
- `NAAM.txt` — vaste effectnaam

## Benodigde assets

De huidige demo gebruikt:

- `assets/reel/orionix-showreel.mp4`
- `assets/reel/orionix-showreel-poster.png`
- `assets/services/paper-texture.png`
- Fraunces Variable

Gebruik voor een nieuw project een lokale H.264 MP4 en een poster met dezelfde
16:9-verhouding. Vul in beide `<video>`-elementen exact dezelfde bron in.

## Installatie

```html
<link rel="stylesheet" href="pad/cinematic-reel-reflection-marquee.css">
<script src="pad/cinematic-reel-reflection-marquee.js"></script>
```

Kopieer vervolgens `HTML-TEMPLATE.html`. Behoud deze hooks:

- `data-cinematic-reel`
- `data-reel-toggle`
- `data-reel-main`
- `data-reel-reflection`

## Aanpassen

- Wijzig `--reel-width` voor een ander desktopformaat.
- Wijzig `--ticker-duration` alleen samen met de tekstlengte.
- Houd de pieksnelheid rond 25 px per seconde.
- Gebruik geen gewone zware box-shadow; de tweede video vormt de schaduw.
- De breakpointomslag staat op `809.98px`.
