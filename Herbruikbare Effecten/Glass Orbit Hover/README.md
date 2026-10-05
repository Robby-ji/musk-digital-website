# Glass Orbit Hover

Een herbruikbaar, dependency-free hovereffect met 3D-tilt, beeldparallax en een cursor-volgende lichtreflectie.

## Gebruik

Laad de twee bestanden:

```html
<link rel="stylesheet" href="pad/naar/glass-orbit-hover.css" />
<script src="pad/naar/glass-orbit-hover.js"></script>
```

Gebruik deze structuur:

```html
<figure class="glass-orbit-hover" data-glass-orbit>
  <div data-glass-orbit-stage>
    <img data-glass-orbit-layer src="image.png" alt="Beschrijving" />
    <span data-glass-orbit-shine aria-hidden="true"></span>
  </div>
</figure>
```

De afmetingen en positionering van het buitenste element bepaal je zelf. Optionele variabelen:

```css
.mijn-afbeelding {
  --glass-orbit-radius: 24px;
  --glass-orbit-accent: 255, 0, 0;
}
```

Dynamisch toegevoegde elementen kunnen worden gestart met:

```js
GlassOrbitHover.init(element);
```

## Opgeslagen naam

**Glass Orbit Hover**
