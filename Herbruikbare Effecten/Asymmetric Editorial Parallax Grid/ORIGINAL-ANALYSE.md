# Analyse van de Orionix Featured Work-referentie

## Sectie en kop

- Desktopsectie: ongeveer `4590px` hoog
- Binnenmarge desktop: `64px`
- Kopbreedte: `520px`
- Kop: Fraunces `56/60px`, letterafstand `-2.24px`
- Mobiele kop: `44/48px`, letterafstand `-1.76px`
- De drie kopregels worden afzonderlijk van onder naar boven onthuld.

## Vrije desktopverdeling

De zes kaarten staan niet in kolommen. Gemeten relatieve posities vanaf de
bovenkant van de sectie:

| Kaart | Breedte | Horizontaal | Bovenkant |
|---|---:|---:|---:|
| 1 | smal | rechts | `304px` |
| 2 | breed | links | `805px` |
| 3 | smal | `50.44%` | `1561px` |
| 4 | breed | `8.4%` | `2472px` |
| 5 | smal | rechts | `3168px` |
| 6 | smal | links | `3779px` |

Smalle kaarten zijn circa `450px` breed; brede kaarten circa `566px` bij een
viewport van 1519px. Deze verspringing creëert het redactionele ritme.

## Kaarten

- Afbeeldingskader: verhouding `.8` (breedte / hoogte)
- Radius: `24px`
- Binnenrand: `4px` wit
- Ruimte tussen beeld en tekst: `24px`
- Titel: Fraunces `32/36px`
- Beschrijving: Inter `16/24px`, kleur `#656565`
- Tags: `32px` hoog met 100px radius en een zachte vierlaagse schaduw

## Parallax

De originele reconstructiemeting gaf een beweging van ongeveer `±14.8%` van de
kaderhoogte. Voor de gewenste duidelijkere uitvoering is dit versterkt naar
`±19%`, met `40%` verticale overscan. De voortgang is gekoppeld aan de positie van
ieder afzonderlijk beeldkader in de viewport.

## Responsive

Onder `810px` verdwijnt de vrije positionering:

- alle kaarten worden één verticale reeks;
- op 390px zijn kaarten `366px` breed;
- beeldformaat op 390px: ongeveer `366 × 457.5px`;
- kaartafstand: `42px`;
- eerste kaart begint ongeveer `400px` onder de sectiestart;
- projectvolgorde blijft ongewijzigd;
- parallax blijft actief.
