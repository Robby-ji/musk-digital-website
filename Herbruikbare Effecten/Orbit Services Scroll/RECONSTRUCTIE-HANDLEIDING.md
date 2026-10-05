# Reconstructiehandleiding voor mezelf

Gebruik deze werkwijze wanneer ik **Orbit Services Scroll** opnieuw moet maken voor
een andere website.

## 1. Eerst het origineel meten

Leg minimaal de volgende toestanden vast:

- begin van de sectie;
- halverwege iedere overgang;
- exact midden van iedere dienst;
- einde van de sectie;
- desktop, tablet en telefoon.

Meet de viewport, totale sectiehoogte, hoogte per stap, sticky offsets, breedtes van
de drie kolommen, diameter en positie van de cirkel, positie van het actieve punt,
illustratiegrootte en typografie. Controleer in de broncode of de tekst natuurlijk
scrolt of absoluut wordt verwisseld. Bij Orionix scrolt de middenkolom natuurlijk;
alleen de linker- en rechterkolom zijn sticky.

## 2. Bouw eerst de scrollgeometrie

Gebruik één sectie met vijf even hoge stappen:

```css
.orbit-services { --step-height: calc(100svh - 87px); }
.orbit-services__shell { padding-block: 80px; }
.service-step { height: var(--step-height); }
```

De totale hoogte ontstaat uit `5 × step-height + 160px`. Maak een grid met een
linkerkolom voor progressie, middenkolom voor tekst en rechterkolom voor beelden.
Zet progressie en illustraties op `position: sticky; top: 0`.

## 3. Maak de nummerboog

- Teken één grote cirkel met een dunne semitransparante border.
- Laat de cirkel gedeeltelijk buiten de linker viewport vallen.
- Plaats alle nummers rond dezelfde cirkel met stappen van 30 graden.
- Houd de rode marker stil op het rechter snijpunt.
- Roteer alleen de wrapper met alle nummers.
- Maak uitsluitend het actieve nummer donker; de rest blijft lichtgrijs.

De scrollprogressie van dienst 0 tot 4 wordt omgerekend naar `0` tot `-120deg`.
Gebruik een continue rotatie voor de boog, maar rond de actieve index af voor tekst
en illustraties.

## 4. Presenteer de tekst

Iedere dienst blijft een echt documentblok van één scrollstap hoog. Centreer de
inhoud verticaal. Splits de heading in afzonderlijke regels met `<span>` elementen.

Starttoestand:

- opacity `0`;
- blur `5–7px`;
- translateY `12–18px`.

Actieve toestand:

- opacity `1`;
- blur `0`;
- translateY `0`;
- tweede titelregel ongeveer `70ms` later;
- beschrijving ongeveer `90ms` later;
- tags met oplopende delays van circa `160ms`, `230ms` en `300ms`.

Gebruik voor beweging een rustige springachtige curve:
`cubic-bezier(.22, 1, .36, 1)`.

## 5. Synchroniseer de illustraties

Stapel alle illustraties absoluut in dezelfde sticky container. Een niet-actieve
illustratie gebruikt opacity `0`, lichte blur en schaal `.8`. De actieve afbeelding
gaat in ongeveer `.75s` naar opacity `1`, blur `0` en schaal `1`.

Positioneer het centrum van een 600 × 600 afbeelding op de rechterrand van de
illustratiekolom. Hierdoor valt een groot deel buiten het scherm, zoals bij de
referentie.

Gebruik transparante vierkante PNG- of WebP-afbeeldingen. Houd licht, schaduw,
camerahoek en grijstinten consistent tussen alle objecten.

## 6. Scrolllogica

Bereken op ieder animation frame:

1. documentpositie van het begin van de sectie plus de bovenpadding;
2. `(scrollY - naturalTop) / stepHeight`;
3. clamp de uitkomst tussen `0` en `aantal - 1`;
4. rond af voor de actieve index;
5. gebruik de niet-afgeronde waarde voor vloeiende wielrotatie.

Gebruik een passieve scrolllistener en `requestAnimationFrame` om layout-thrashing
te voorkomen. Verander alleen classes en één CSS custom property.

## 7. Mobiele versie

Onder 810 px:

- verberg cirkel en sticky illustratiestapel;
- maak iedere dienst een normaal verticaal blok;
- centreer titel, tekst en tags;
- toon de bijbehorende afbeelding onder de tekst;
- behoud de reveal van het dichtst bij het viewportmidden gelegen blok.

## 8. Altijd controleren

- Geen sprong wanneer een nieuwe index actief wordt.
- Cirkel blijft op zijn plaats tot de laatste stap voorbij is.
- Eerste en laatste illustratie worden niet te vroeg afgeknipt.
- Alle aantallen van tekst, nummers en beelden zijn gelijk.
- `prefers-reduced-motion` schakelt lange overgangen uit.
- Links en assets werken vanaf localhost, niet alleen via `file://`.
