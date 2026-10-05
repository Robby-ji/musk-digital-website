# Reconstructiehandleiding

1. Gebruik een absoluut canvas achter de normale HTML-content.
2. Genereer maximaal 240 sterren met verschillende straal, alpha, twinklefase en zeer lage driftsnelheid.
3. Verbind alleen sterren binnen 120 px; laat de lijnalpha richting de grensafstand naar nul lopen.
4. Geef ongeveer een kwart van de sterren een grotere straal en canvas-shadow glow.
5. Ease de werkelijke cursorpositie, zodat het zwaartepunt niet schokkerig verplaatst.
6. Geef sterren binnen ongeveer 340 px een afstandsafhankelijke aantrekkingskracht en een kleine tangentiële kracht.
7. Voeg demping en een veer naar de autonome baan toe, zodat de sterren na mouseleave rustig terugkeren.
8. Schaal het deeltjesaantal met het canvasoppervlak en beperk de pixel ratio tot 2.
9. Pauzeer buiten beeld en teken bij reduced motion slechts één statisch frame.
10. Plaats tekst in een aparte laag boven het canvas; laat het canvas zelf geen pointer-events ontvangen.
