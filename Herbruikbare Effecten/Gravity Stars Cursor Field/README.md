# Gravity Stars Cursor Field

Een canvasachtergrond met langzaam drijvende, twinkelende sterren. Nabije sterren worden met dunne lijnen verbonden en reageren op de cursor alsof daar een zachte zwaartekrachtbron aanwezig is.

## Gebruik

```html
<link rel="stylesheet" href="gravity-stars-cursor-field.css" />

<section class="gravity-stars-field"
         data-gravity-stars
         data-count="240"
         data-connect-distance="120"
         data-tint="0.65"
         data-gravity-radius="380"
         data-gravity-strength="0.22"
         data-pointer-response="0.36"
         data-max-offset="140">
  <canvas class="gravity-stars-field__canvas"
          data-gravity-stars-canvas
          aria-hidden="true"></canvas>
  <div class="gravity-stars-field__content">
    <!-- Eigen content -->
  </div>
</section>

<script src="gravity-stars-cursor-field.js"></script>
```

## Instellingen

- `data-count`: maximaal aantal sterren op desktop. Standaard `240`.
- `data-connect-distance`: maximale afstand voor constellatielijnen. Standaard `120` px.
- `data-tint`: intensiteit van sterren en lijnen tussen `0` en `1`. Standaard `0.65`.
- `data-gravity-radius`: radius van de cursorinvloed. Standaard `380` px.
- `data-gravity-strength`: snelheid waarmee sterren naar de cursor versnellen. Standaard `0.22`.
- `data-pointer-response`: hoe direct het zwaartepunt de cursor volgt, tussen `0.05` en `1`. Standaard `0.36`.
- `data-max-offset`: maximale verplaatsing van een ster vanaf zijn rustpositie. Standaard `140` px.

## Techniek

- Dependency-free Canvas 2D.
- Device pixel ratio is begrensd op 2 voor scherpe maar beheerste rendering.
- Deeltjesaantal schaalt automatisch terug op kleinere schermen.
- De animatie pauzeert buiten het viewport en wanneer het tabblad niet rendert.
- Op touchapparaten blijft het veld autonoom bewegen zonder cursorinteractie.
- `prefers-reduced-motion` toont één statisch frame.
- Meerdere velden op dezelfde pagina worden ondersteund.
