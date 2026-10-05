# Reconstructiehandleiding voor mezelf

Gebruik deze handleiding wanneer ik **FAQ Reveal Accordion** op een andere website
opnieuw moet maken.

## 1. Analyseer eerst de referentie

Leg vier situaties vast:

1. de sectie net vóór hij de viewport binnenkomt;
2. ongeveer 50–100 ms na binnenkomst;
3. alle gesloten vragen volledig zichtbaar;
4. een vraag tijdens en na het openen.

Meet de totale sectie, kolommen, rijhoogte, rijafstand, antwoordhoogte, knopdiameter,
rotatie en typografie. Controleer expliciet of slechts één of meerdere vragen open
kunnen blijven.

## 2. Bouw semantische HTML

Gebruik per item een `<article>`, een echte `<button>` en een antwoordregio. Koppel
button en antwoord via `aria-controls` en werk `aria-expanded` bij. Gebruik geen
klikbare gewone `<div>`: native buttons leveren toetsenbordbediening gratis.

## 3. Maak de tweekolomsindeling

Desktop:

```css
.faq-reveal__shell {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  padding: 80px 72px;
}
```

Zet label en titel links. Plaats rechts een verticale flexlijst met 24 px gap.
Onder 810 px wordt dit één kolom met de titel boven de lijst.

## 4. Reproduceer de exacte rijgeometrie

Een gesloten item bestaat uit:

- vraagregel van 36 px;
- 23 px padding onderaan;
- border van 1 px.

Totaal: 60 px. Het antwoord voegt 64 px toe, waardoor de open rij 124 px wordt.
Maak de vraagregel een grid van `24px 1fr 36px` voor nummer, tekst en pijl.

## 5. Laat ieder onderdeel zelf onthullen

Observeer titel en iedere vraag afzonderlijk met `IntersectionObserver`. Begin bij
opacity `0` en translateY `24px`. Voeg bij intersectie éénmalig `is-visible` toe en
stop daarna met observeren. Zo is de animatie gekoppeld aan de echte scrollpositie
en niet aan een willekeurige globale vertraging.

## 6. Animeer de accordion zonder vaste JS-hoogtes

Gebruik een CSS-grid wrapper:

```css
.faq-answer-grid { grid-template-rows: 0fr; }
.faq-item.is-open .faq-answer-grid { grid-template-rows: 1fr; }
.faq-answer { min-height: 0; overflow: hidden; }
```

Dit animeert ook correct wanneer een andere antwoordtekst meer regels bevat. Draai
tegelijkertijd de pijl 180 graden met dezelfde springachtige easing.

## 7. Bouw de antwoordreveal

Splits de antwoordtekst eerst in woorden en whitespace. Maak voor ieder woord een
wrapper met `white-space: nowrap`. Splits daarna alleen de tekens binnen dat woord.
Geef ieder teken een oplopende index via een CSS-variable.

Start tekens met opacity `0` en translateY `8px`. Openen gebruikt een basisvertraging
van ongeveer 70 ms plus circa 2 ms per teken. Op die manier ontstaat de Framer-achtige
golf zonder dat leestekens of letters afzonderlijk naar een nieuwe regel springen.

## 8. Interactie en toegankelijkheid

- Laat meerdere items onafhankelijk open en dicht gaan.
- Werk `aria-expanded` bij bij iedere klik.
- Voeg een duidelijke `:focus-visible` stijl toe.
- Controleer Enter en spatie op een echte button.
- Gebruik geen click handler op de gehele documentsectie.
- Schakel overgangen uit bij `prefers-reduced-motion`.

## 9. Controlelijst

- Gesloten rij is exact 60 px.
- Geopende rij is bij een antwoord van twee regels exact 124 px.
- Pijl is 36 px en roteert 180 graden.
- Alleen zichtbare rijen worden onthuld.
- Tekst springt niet tijdens het openen.
- Woorden en leestekens breken correct af.
- Meerdere antwoorden kunnen tegelijk open zijn.
- Desktop, tablet en mobiel zijn getest op localhost.
