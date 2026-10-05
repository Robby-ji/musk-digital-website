# Orionix FAQ — originele metingen

Gemeten op de publieke Orionix-pagina met een desktopviewport van 1529 px breed.

- Totale gesloten sectiehoogte: 684 px
- Buitenmarge: 8 px
- Horizontale binnenruimte: 72 px
- Bovenruimte: 80 px
- Grid: twee gelijke kolommen met 12 px tussenruimte
- Linker headerbreedte: 520 px
- FAQ-label: circa 63 × 28 px
- Titel: Fraunces, 56 px met 60 px regelhoogte
- Gesloten rij: 60 px
- Verticale ruimte tussen rijen: 24 px
- Geopende rij: 124 px
- Vraagregel: 36 px
- Geopende antwoordzone: 64 px
- Nummer: Fraunces 30/36 px met ongeveer 30% dekking
- Vraag en antwoord: Inter 16/24 px
- Ronde pijlknop: 36 × 36 px
- Open pijlrotatie: 180 graden

## Scroll-entry

Elke accordionrij start onafhankelijk met:

- opacity `0`;
- translateY `24px`.

Wanneer een rij de viewport binnenkomt, beweegt hij in circa 750 ms naar opacity `1`
en translateY `0`. Hierdoor verschijnen alleen de werkelijk zichtbare regels. De
zesde vraag blijft bijvoorbeeld verborgen wanneer hij nog onder de viewport staat.

## Openen

De originele component laat meerdere vragen tegelijk openstaan. De rij groeit van
60 naar 124 px, de pijl draait 180 graden en het antwoord wordt per teken zichtbaar.
Framer groepeert de tekens per woord; daarom doet deze reproductie hetzelfde.

De referentie gebruikt voor alle zes vragen dezelfde voorbeeldantwoordtekst:

> Orionix offers digital-first branding, brand strategy, website development, UI/UX design, and social media marketing to help brands build strong digital experiences.
