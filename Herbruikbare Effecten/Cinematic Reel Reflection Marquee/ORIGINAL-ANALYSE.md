# Analyse van de Orionix-referentie

## Desktop

- Maximale videobreedte: `860px`
- Videoverhouding: `16 / 9` (`860 × 483.75px`)
- Hoekradius: `32px`
- Rand: `1px solid rgba(0, 0, 0, .04)`
- Gewone box-shadow: geen
- Tickerlettergrootte: `128px`
- Regelhoogte: `128px`
- Letterafstand: `-5.12px`
- Tekstkleur: `#a4a4a4`
- Tickeropacity: `.3`
- Gemeten tickersnelheid: ongeveer `25px/s` naar links

De ticker staat verticaal achter het midden van de video. De video heeft z-index 1;
de tekst ligt daarachter op z-index 0 en blijft buiten de videoranden zichtbaar.

## Reflectie

De schaduw is een tweede exemplaar van dezelfde video:

- begint direct onder het hoofdbeeld;
- inhoud start met `8px` tussenruimte;
- hoogte van het zichtbare reflectievenster: circa `51%` van de hoofdvideo;
- tweede video: `opacity: .3`;
- verticale spiegeling: `rotateX(180deg)`;
- blur: `6px`;
- masker: boven sterk zichtbaar, onder volledig transparant;
- bovenste hoeken: `32px`.

## Responsive omslag

Bij `809.98px` en smaller:

- videobreedte wordt `100vw - 24px`;
- er blijft dus exact `12px` marge links en rechts;
- de ticker verhuist van achter de video naar een eigen regel erboven;
- tickerlettergrootte wordt `96px`;
- regelhoogte wordt `100px`;
- letterafstand wordt `-3.84px`;
- de reflectie blijft proportioneel gekoppeld aan de videobreedte.

Gemeten voorbeelden:

- `390px` viewport → video `366 × 205.875px`
- `768px` viewport → video `744 × 418.5px`
- `1105px` en breder → video blijft `860 × 483.75px`

## Gedrag

De ticker is autonoom en niet scrollgestuurd. Twee identieke tekstitems vormen een
naadloze lus. Hoofdvideo en reflectievideo moeten dezelfde afspeelpositie houden.
