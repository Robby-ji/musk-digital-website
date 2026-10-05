# Simple cross-page fade

De site gebruikt bewust een minimale cross-document View Transition.

- Oude pagina: opacity `1 → 0`, `500ms ease-in`.
- Nieuwe pagina: opacity `0 → 1`, `500ms ease-out`.
- Geen transform, scale, wipe, mask, iframe of handmatige navigatie.
- De browser voert één normale documentnavigatie uit.
- Home en Works prefetchten elkaars HTML alleen als lichte cache-hint.
- Reduced motion verkort de fade tot vrijwel nul.

Implementatie:

- `sections/page-transitions.css`
- `sections/page-transitions.js`

