# Analyse van Gravity Stars

Bron: het MIT-gelicenseerde **Gravity Stars**-component van Edu Calvo op 21st.dev.

De originele demo gebruikt:

- `count={240}`;
- `connectDistance={120}`;
- `tint={0.65}`;
- een full-viewport canvas op een bijna zwarte, koelblauwe achtergrond;
- sterren met verschillende helderheden en een zachte glow;
- zeer dunne verbindingen tussen nabije deeltjes;
- rustige autonome drift en twinkle;
- een zachte cursorzwaartekracht met een lichte draaibeweging.

De visuele hiërarchie is bewust rustig: het grootste deel van de lijnen is bijna onzichtbaar, een kleiner deel van de sterren gloeit sterk en de tekst blijft scherp boven het canvas staan.

Responsive wordt de dichtheid verlaagd in plaats van de sterren simpelweg kleiner te maken. Touchgebruik krijgt geen cursorzwaartekracht, zodat scrollen niet wordt verstoord.
