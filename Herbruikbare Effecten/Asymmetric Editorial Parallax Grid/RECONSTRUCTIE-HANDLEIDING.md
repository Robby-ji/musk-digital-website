# Reconstructiehandleiding

Gebruik dit stappenplan wanneer ik het effect later opnieuw moet bouwen.

## 1. Ontwerp eerst het vrije ritme

Maak geen CSS-grid met gelijke rijen. Teken eerst zes ankerpunten over een hoge
relatieve sectie. Wissel smalle en brede kaarten af en laat de verticale intervallen
variëren. Houd voldoende negatieve ruimte rond de introductiekop.

## 2. Gebruik twee kaartbreedtes

Gebruik ongeveer `32.75%` en `41.16%` van de binnencontainer. Combineer links,
rechts en tussenposities. Daardoor voelt de compositie willekeurig, terwijl alle
posities reproduceerbaar blijven.

## 3. Bouw beeldkaders met overscan

Gebruik een zichtbaar kader met `overflow: hidden`, verhouding `.8`, 24px radius
en 4px witte binnenrand. Plaats het eigenlijke beeld op `top: -20%` en
`height: 140%`. Dit levert genoeg reserve voor de volledige parallax.

## 4. Bereken parallax per kaart

Bereken voor ieder kader:

```text
progress = (viewporthoogte - kader.top) / (viewporthoogte + kader.hoogte)
shift = mix(-kaderhoogte × .19, +kaderhoogte × .19, progress)
```

Clamp de progress tussen 0 en 1 en schrijf de uitkomst naar een CSS-variable.
Werk via één `requestAnimationFrame`, niet via een afzonderlijke scrollhandler per
kaart.

## 5. Onthul inhoud gefaseerd

Laat bij viewportbinnenkomst eerst het beeld omhoogkomen. Laat daarna titel,
beschrijving en tags met ongeveer 70ms tussenruimte volgen. Observeer iedere kaart
apart en stop de observer na de eerste reveal.

## 6. Maak de kop regelgestuurd

Plaats iedere desktopregel in een verborgen wrapper. Animeer de binnenste regel
van `translateY(112%)` naar nul en stagger de regels met circa 80ms.

## 7. Schakel mobiel over naar een flow

Onder 810px worden alle kaarten `position: relative` in een flexkolom. Gebruik op
telefoon 12px zijmarge, op tablet 24px en tussen kaarten 42px. Laat de parallax
actief, maar verwijder alle desktopcoördinaten.

## 8. Controlelijst

- Geen twee opeenvolgende desktopkaarten staan strak onder elkaar.
- Beelden tonen bij de uiterste parallaxstand geen lege randen.
- Reveal wordt slechts één keer gestart.
- Mobiel heeft geen horizontale overflow.
- `prefers-reduced-motion` schakelt de beeldverplaatsing uit.
