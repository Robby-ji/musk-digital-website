# Reconstructiehandleiding

1. Plaats de afbeelding in een frame met `overflow: hidden` en dezelfde border-radius.
2. Laat het frame, de tekst en de schaduw volledig stilstaan.
3. Schaal uitsluitend de binnenste beeldlaag van `1` naar `1.10`.
4. Gebruik ongeveer `720ms` met `cubic-bezier(.22, 1.18, .36, 1)` voor een subtiele overshoot.
5. Animeer met de losse CSS-property `scale` wanneer dezelfde afbeelding ook een parallax-`transform` gebruikt.
6. Activeer de hover alleen bij `(hover: hover) and (pointer: fine)`.
7. Schakel de beweging uit bij `prefers-reduced-motion`.
