# Frosted Team Bio Reveal

Een profielkaart waarbij het beeld op desktop subtiel zoomt en verzacht, een donkere gradient verschijnt en de biografie van onder naar boven in beeld veert. Naam en functie blijven altijd zichtbaar onder de afbeelding.

## Gedrag

- Beeldzoom: `1` naar `1.05`.
- Subtiele blur: `0` naar `1.4px`.
- Gradient: transparant tot 53%, onderaan maximaal 40% zwart.
- Biografie: `124px` omhoog met gelijktijdige opacity-reveal.
- Duur: `500ms` met een zachte springcurve.
- Alleen actief op apparaten met een echte hoverpointer.
- Toetsenbordfocus activeert hetzelfde effect.
- Op mobiel blijven alleen afbeelding, naam en functie zichtbaar.

## Gebruik

Kopieer de HTML-structuur uit `HTML-TEMPLATE.html` en laad:

```html
<link rel="stylesheet" href="frosted-team-bio-reveal.css" />
```

Er is geen JavaScript nodig. Open `demo.html` om het effect zelfstandig te bekijken.

## Instellingen

```css
.frosted-team-card {
  --team-image-scale: 1.05;
  --team-image-blur: 1.4px;
  --team-reveal-duration: 500ms;
  --team-reveal-ease: cubic-bezier(.22, 1.06, .36, 1);
}
```
