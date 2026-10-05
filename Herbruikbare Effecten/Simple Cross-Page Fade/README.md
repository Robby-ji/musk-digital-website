# Simple Cross-Page Fade

Een eenvoudige en stabiele fade tussen losse HTML-pagina's. De oude pagina fadet uit en de nieuwe pagina fadet in. Er worden geen transforms, masks, iframes, handmatige navigaties of animatievergrendelingen gebruikt.

## Gedrag

- Fade-out: `500ms ease-in`.
- Fade-in: `500ms ease-out`.
- Eén native cross-document View Transition.
- Iedere bestemming wordt maar één keer geladen en weergegeven.
- `prefers-reduced-motion` schakelt de overgang vrijwel volledig uit.

## Installatie

Kopieer de map naar je project en laad op iedere deelnemende pagina dezelfde CSS:

```html
<link rel="stylesheet" href="simple-cross-page-fade.css" />
```

Laad onderaan de pagina optioneel de kleine prefetch-helper:

```html
<script src="simple-cross-page-fade.js"></script>
```

Normale interne links hebben geen extra JavaScript nodig:

```html
<a href="works/">Works</a>
```

Serveer de site via HTTP(S), omdat cross-document View Transitions niet via `file://` werken.

## Instellingen

Pas deze variabelen in je eigen stylesheet aan:

```css
:root {
  --page-fade-duration: 500ms;
  --page-fade-exit-ease: ease-in;
  --page-fade-enter-ease: ease-out;
}
```

De JavaScript-helper is optioneel. Hij prefetcht interne pagina's bij hover of toetsenbordfocus, maar onderschept de klik en navigatie nooit.

## Bestanden

- `simple-cross-page-fade.css`: het complete overgangseffect.
- `simple-cross-page-fade.js`: optionele prefetch-helper.
- `HTML-TEMPLATE.html`: minimale installatie.
- `RECONSTRUCTIE-HANDLEIDING.md`: stappen om het effect opnieuw op te bouwen.
- `ORIGINAL-ANALYSE.md`: reden achter de vereenvoudigde uitvoering.
