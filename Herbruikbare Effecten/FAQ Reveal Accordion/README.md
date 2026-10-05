# FAQ Reveal Accordion

Een herbruikbare FAQ-sectie die scroll-reveals combineert met onafhankelijk
openklappende accordionrijen en een letter-voor-letter antwoordanimatie.

## Bestanden

- `faq-reveal-accordion.css` — layout, scroll-reveal, accordion en responsive styling
- `faq-reveal-accordion.js` — interactie, teksttokenisatie en IntersectionObserver
- `HTML-TEMPLATE.html` — minimale markup voor hergebruik
- `RECONSTRUCTIE-HANDLEIDING.md` — mijn volledige stappenplan
- `ORIGINAL-ANALYSE.md` — gemeten eigenschappen van de Orionix-referentie
- `NAAM.txt` — vaste effectnaam

## Gebruik

Laad de bestanden op de pagina:

```html
<link rel="stylesheet" href="pad/faq-reveal-accordion.css">
<script src="pad/faq-reveal-accordion.js"></script>
```

Plaats daarna de markup uit `HTML-TEMPLATE.html`. Deze hooks moeten behouden blijven:

- `data-faq-section`
- `data-faq-header`
- `data-faq-item`
- `.faq-question`
- `.faq-answer p`

Iedere vraag is een echte `<button>` met `aria-expanded` en `aria-controls`. Daardoor
werkt het effect ook met toetsenbord en screenreaders.

## Gedrag

- Titel en label verschijnen bij binnenkomst.
- Iedere rij observeert zijn eigen viewportpositie.
- Vragen mogen onafhankelijk en tegelijk geopend zijn.
- De antwoordtekst wordt automatisch opgesplitst in woorden en tekens.
- Woorden blijven tijdens het animeren intact, zodat leestekens niet los afbreken.
- `prefers-reduced-motion` verwijdert de lange overgangen.
