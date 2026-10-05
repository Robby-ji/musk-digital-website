# Reconstructiehandleiding

Gebruik dit stappenplan wanneer ik het effect later opnieuw moet bouwen.

## 1. Bouw de lagen in de juiste volgorde

Maak één relatief gepositioneerde, verborgen sectie. Plaats de ticker op z-index 0
en de mediacontainer op z-index 1. De tekst moet buiten de video zichtbaar blijven,
maar achter het ondoorzichtige videobeeld verdwijnen.

## 2. Maak een werkelijk naadloze ticker

Plaats twee identieke tekstitems in één `width: max-content` flextrack. Animeer de
track lineair tot precies `translateX(-50%)`. Gebruik geen losse resets of opacity-
crossfades. Stem de duur af met:

```text
duur in seconden = breedte van één tekstitem / 25
```

Controleer de berekende breedte in de browser. Voor deze typografie is ongeveer
`123.9s` op desktop en `94.4s` op mobiel nodig.

## 3. Bouw de hoofdvideo

Gebruik een 16:9-container met maximaal `860px` breedte, `32px` radius en een zeer
lichte rand. Gebruik `object-fit: cover`. Vermijd een zware slagschaduw.

## 4. Maak de reflectie met een tweede video

Plaats direct onder de hoofdvideo een verborgen venster van ongeveer `51%` van de
videhoogte. Zet daarin dezelfde video, 8px lager, op 30% opacity en draai deze met
`rotateX(180deg)`. Voeg aan het venster `blur(6px)` en een verticaal maskerverloop
toe. Zo blijft de reflectie inhoudelijk gekoppeld aan ieder videoframe.

## 5. Synchroniseer beide video's

Gebruik de hoofdvideo als klok. Kopieer bij `timeupdate` en `seeking` de tijd naar
de reflectie zodra het verschil groter is dan ongeveer `0.08s`. Start en pauzeer
beide video's samen. Pauzeer buiten de viewport om twee onnodige videodecoders te
voorkomen.

## 6. Maak de bediening toegankelijk

Geef de mediacontainer `role="button"`, `tabindex="0"` en een wisselende aria-label.
Ondersteun muisklik, Enter en spatie voor play/pause.

## 7. Bouw het mobiele alternatief

Onder 810px mag de ticker niet meer achter het videomidden staan. Zet hem erboven,
verlaag de typografie naar 96/100px en geef de video 12px viewportmarge. Bereken de
sectiehoogte vanuit de videobreedte, hoofdvideo en reflectie om overlap met de
volgende sectie te voorkomen.

## 8. Controlelijst

- Ticker beweegt rond 25 px/s.
- De lus heeft geen zichtbare naad.
- Tekst staat desktop achter de video en mobiel erboven.
- Hoofdvideo en reflectie tonen hetzelfde frame.
- Reflectie vervaagt volledig vóór de volgende sectie.
- Geen horizontale overflow op 390px.
- Video kan met toetsenbord worden gepauzeerd.
