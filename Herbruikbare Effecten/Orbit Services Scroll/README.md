# Orbit Services Scroll

Een herbruikbare, scrollgestuurde dienstensectie met drie gekoppelde onderdelen:

1. Een sticky nummerboog die tijdens het scrollen draait.
2. Een middenkolom met opeenvolgende tekstblokken en staggered reveals.
3. Een sticky illustratiestapel die per dienst crossfadet en schaalt.

## Bestanden

- `orbit-services-scroll.css` — layout, cirkel, typografie, animaties en responsive gedrag
- `orbit-services-scroll.js` — scrollprogressie, actieve dienst en synchronisatie
- `HTML-TEMPLATE.html` — minimale herbruikbare markup
- `RECONSTRUCTIE-HANDLEIDING.md` — stappenplan om het effect opnieuw op te bouwen
- `ORIGINAL-ANALYSIS.md` — metingen van de Orionix-referentie
- `NAAM.txt` — vaste naam van het effect

## Benodigde assets

De huidige implementatie gebruikt:

- `assets/services/service-01.png` tot en met `service-05.png`
- `assets/services/paper-texture.png`
- Inter voor lopende tekst
- Fraunces Variable voor de grote koppen en nummers

## Installatie

Plaats de HTML uit `HTML-TEMPLATE.html` op de gewenste positie en laad daarna:

```html
<link rel="stylesheet" href="pad/naar/orbit-services-scroll.css">
<script src="pad/naar/orbit-services-scroll.js"></script>
```

Behoud de `data-orbit-services`, `data-service-step`, `data-service-number`,
`data-service-art` en `data-service-wheel` attributen. De JavaScriptlogica gebruikt
deze hooks en is niet afhankelijk van de zichtbare teksten.

## Aanpassen

- Verander teksten en tags direct in iedere `.service-step`.
- Vervang de vijf afbeeldingen in de `.service-art` elementen.
- Houd aantallen van steps, nummers en illustraties gelijk.
- Pas `--step-height` aan voor een sneller of langzamer scrollritme.
- Pas de hoekstap van `30` graden zowel in de HTML (`--angle`) als JavaScript aan.

Op mobiel verdwijnt de nummerboog en wordt iedere dienst een zelfstandig verticaal
blok met een eigen illustratie.
