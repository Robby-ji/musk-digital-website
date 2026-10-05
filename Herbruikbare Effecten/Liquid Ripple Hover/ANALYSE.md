# Analyse van het originele effect

De Orionix-header gebruikt een Framer WebGL-shader met de interne naam `Ripple`.

De techniek bestaat uit:

- een feedbackbuffer in `RG16F`-formaat waarin de huidige en vorige golfhoogte worden opgeslagen;
- een discrete golfvergelijking die per frame de vier aangrenzende pixels bemonstert;
- muisposities die als zachte cirkelvormige stamps in het hoogteveld worden geschreven;
- een gradiënt van het hoogteveld die de UV-coördinaten van de afbeelding vervormt;
- afzonderlijke analytische, uitdijende ringen bij klikken;
- een cover-fit correctie zodat de vervorming bij iedere beeldverhouding blijft kloppen.

Waarden uit het origineel:

- Radius: `0.05`
- Displacement: `0.056`
- Strength: `0.15`
- Decay: `0.1`
- Softness: `0.5`
- Click ripple: ingeschakeld

De lokale **Liquid Ripple Hover**-module reproduceert dit gedrag met een lichtgewicht feedback-hoogteveld en een WebGL-fragmentshader. De normale afbeelding blijft als fallback beschikbaar wanneer WebGL of bewegingseffecten zijn uitgeschakeld.

## Uitloop en rustdetectie

Een vaste stoptimer werkt bij een feedbacksimulatie niet goed: de timer kan
aflopen terwijl het hoogteveld nog golfenergie bevat, waardoor het beeld abrupt
bevriest. De verbeterde versie gebruikt daarom twee fasen:

1. Tijdens invoer blijft de demping op `.985`, zodat de golf vrij kan uitbreiden.
2. Vanaf `180ms` zonder invoer loopt de demping over `2800ms` vloeiend naar `.94`.

Iedere frame wordt de hoogste absolute golfwaarde gemeten. Pas onder `.01` wordt
de animatielus gesloten en worden de simulatiebuffers genormaliseerd. Bij het
verlaten van het beeld blijft bovendien minimaal `1600ms` uitloop actief.
