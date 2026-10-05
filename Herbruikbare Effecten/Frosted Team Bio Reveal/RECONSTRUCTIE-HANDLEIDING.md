# Reconstructiehandleiding

1. Bouw een vaste kaart met een beeldframe en een apart identiteitsblok.
2. Geef het beeldframe 4px padding, een witte achtergrond en `overflow: hidden`.
3. Plaats afbeelding, gradient en biografie absoluut in dezelfde geclipte binnenlaag.
4. Laat de afbeelding tijdens hover naar schaal `1.05` bewegen en voeg hooguit een subtiele blur toe.
5. Fade de onderste gradient van transparant naar maximaal 40% zwart.
6. Start de biografie onder het beeld met `translateY(124px)` en opacity 0.
7. Animeer beeld, gradient en tekst in 500ms met een licht verende easing.
8. Activeer het effect alleen voor fine-pointer hover en toetsenbordfocus.
9. Verberg de hoverbiografie op mobiel en respecteer `prefers-reduced-motion`.
