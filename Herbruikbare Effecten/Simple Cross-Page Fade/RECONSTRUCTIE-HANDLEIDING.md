# Reconstructiehandleiding

1. Laad dezelfde transition-CSS op beide pagina's.
2. Activeer `@view-transition { navigation: auto; }`.
3. Animeer uitsluitend de opacity van `::view-transition-old(root)` en `::view-transition-new(root)`.
4. Laat links normale browsernavigatie uitvoeren.
5. Voeg geen iframe, klikvertraging of handmatige `location.assign` toe.
6. Respecteer `prefers-reduced-motion`.

