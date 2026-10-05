# Analyse originele Orionix-teamkaart

De desktopkaart meet in de geanalyseerde viewport ongeveer `416 × 612px`. Het beeldframe is `416 × 520px`, met 4px witte rand en een binnenbeeld van `408 × 512px`.

Tijdens hover:

- schaalt het beeld ongeveer 5%;
- verschijnt een gradient die onderaan eindigt op circa 40% zwart;
- beweegt de biografie ongeveer 124px omhoog;
- gaat de biografie van opacity 0 naar 1;
- duurt de volledige overgang 500ms;
- gebruikt de animatie een licht verende curve met een kleine overshoot.

De originele bron rapporteert geen blijvende CSS-`blur()` op de afbeelding. De waargenomen verzachting komt hoofdzakelijk door schaal, interpolatie en de donkere gradient. Deze herbruikbare variant voegt bewust slechts `1.4px` blur toe om de door de gebruiker gewenste uitstraling te versterken.

Op de mobiele variant blijft de biografie verborgen en zijn naam en functie onder het beeld zichtbaar. Er wordt geen cursorafhankelijke hover verwacht.
