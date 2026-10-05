# Musk Digital website

Een complete Nederlandstalige merk- en servicesite voor Musk. De eerdere Orionix-studie en alle daaruit opgebouwde interactie-effecten zijn gebruikt als ontwerpgereedschap, maar de inhoud, informatiearchitectuur, beelden en positionering zijn nu volledig op Musk afgestemd.

## Preview

```bash
python3 -m http.server 3000
```

Open daarna `http://localhost:3000`.

## Pagina's

- `/` — positionering, services, verbonden groeisysteem, proces, scenario's en FAQ
- `/services/` — volledige uitwerking van AI Agents, digitale collega's, websites, software/automatisering, marketing en NFC
- `/works/` — toepassingsscenario's en verbonden digitale oplossingen
- `/about/` — visie, principes en werkwijze met de interactieve Gravity Stars-hero

## Musk design system

- Fraunces Variable voor expressieve koppen; Inter voor navigatie en lopende tekst
- Warm papierwit, bijna zwart en een scherp rood interactieaccent
- Ruime editoriale composities, afgeronde beeldkaders en beheerste diepte
- Herbruikbare basis in `musk-site.css` en `musk-site.js`
- Geoptimaliseerde projectbeelden in `assets/musk/`
- Merkgebonden hero-edit in `assets/musk/hero-musk.webp`

## Ingezette effecten

- **Liquid Ripple Hover** — alleen op het primaire hero-beeld
- **Soft Spring Image Zoom** — inhoudelijke servicebeelden
- **Asymmetric Editorial Parallax** — toepassingsscenario's en cases
- **Gravity Stars Cursor Field** — visie en systeemdenken op About
- **Momentum Wheel Smooth Scroll** — consistente scrolltraagheid
- **Simple Cross-Page Fade** — rustige navigatie tussen pagina's

## Oorspronkelijke effectstudie

## What was matched

- Fixed 96 px desktop header and 88 px phone header
- 1560 px maximum inner width with 72 px desktop gutters
- Inter 14 px navigation with the original spacing
- 106 × 32 brand lockup
- Blurred navigation-dot hover treatment
- Layered blur/slide CTA hover animation and matching shadow stack
- Responsive menu button and full-screen mobile navigation
- Translucent, blurred header after scrolling
- Generated glass-and-red header artwork using the reusable **Liquid Ripple Hover** WebGL effect
- Five-step services section with the original 687 px desktop scroll rhythm
- Sticky circular number progress, active red marker and 30° rotational steps
- Word/line-style text reveals and staggered service pills
- Sticky 3D illustration crossfades from 80% to 100% scale
- Responsive stacked phone treatment
- FAQ reveal section with independently animated accordion rows
- 60 px closed / 124 px expanded FAQ states with character-based answer reveals
- Showreel composition with a 25 px/s Fraunces ticker behind the video
- Mirrored, blurred video reflection instead of a conventional box shadow
- Responsive ticker relocation and edge-to-edge media sizing below 810 px
- Asymmetric six-project Featured Work composition with measured parallax
- Staggered image, title, description and tag reveals with a stacked mobile flow
- Global Lenis 1.3.23 wheel inertia using the original `lerp: .1` configuration
- Cinematic dark CTA with layered text/video parallax and viewport-aware playback
- Dedicated Works page with the measured two-wide/three-column responsive project grid
- Dedicated About page with an interactive gravity-driven constellation hero
- Soft spring image zoom on Works cards, measured at 1.10 scale with touch-safe behavior
- Simple 500 ms cross-page fade with one native document navigation
- Oversized Fraunces footer wordmark with the original fitted SVG proportions
- Subtle autonomous luminance sweep that glides continuously left-to-right and back
- Matching copyright rule, spacing and a fully fitted mobile wordmark

## Services module

The self-contained implementation lives in:

- `Herbruikbare Effecten/Orbit Services Scroll/orbit-services-scroll.css`
- `Herbruikbare Effecten/Orbit Services Scroll/orbit-services-scroll.js`
- `assets/services/`

See `Herbruikbare Effecten/Orbit Services Scroll/README.md` for reuse instructions and measured behavior.

The FAQ implementation lives in
`Herbruikbare Effecten/FAQ Reveal Accordion/`.

The footer wordmark implementation lives in:

- `sections/scroll-gradient-wordmark.css`
- `sections/scroll-gradient-wordmark.js`

The showreel implementation lives in:

- `sections/reel-showcase.css`
- `sections/reel-showcase.js`
- `assets/reel/`

The Featured Work implementation lives in:

- `sections/featured-work.css`
- `sections/featured-work.js`
- `assets/featured/`

The global smooth-scroll implementation lives in:

- `sections/smooth-scroll.js`
- `assets/vendor/lenis/`

The cinematic CTA implementation lives in:

- `sections/idea-reality-cta.css`
- `sections/idea-reality-cta.js`
- `assets/idea-reality/`

The reusable version is saved as **Soft Luminance Wordmark Drift** in
`Herbruikbare Effecten/Soft Luminance Wordmark Drift/`.

The reusable showreel version is saved as **Cinematic Reel Reflection Marquee** in
`Herbruikbare Effecten/Cinematic Reel Reflection Marquee/`.

The reusable Featured Work version is saved as **Asymmetric Editorial Parallax Grid** in
`Herbruikbare Effecten/Asymmetric Editorial Parallax Grid/`.

The reusable global scroll version is saved as **Momentum Wheel Smooth Scroll** in
`Herbruikbare Effecten/Momentum Wheel Smooth Scroll/`.

The reusable video CTA version is saved as **Cinematic Video CTA Depth Parallax** in
`Herbruikbare Effecten/Cinematic Video CTA Depth Parallax/`.

The Works route and its transition implementation live in:

- `works/`
- `sections/page-transitions.css`
- `sections/page-transitions.js`
- `sections/PAGE-TRANSITION-ANALYSIS.md`

The reusable page-transition version is saved as **Simple Cross-Page Fade** in
`Herbruikbare Effecten/Simple Cross-Page Fade/`.

The reusable Works image-hover version is saved as **Soft Spring Image Zoom** in
`Herbruikbare Effecten/Soft Spring Image Zoom/`.

The reusable team-card hover version is saved as **Frosted Team Bio Reveal** in
`Herbruikbare Effecten/Frosted Team Bio Reveal/`.

The reusable interactive canvas version is saved as **Gravity Stars Cursor Field** in
`Herbruikbare Effecten/Gravity Stars Cursor Field/`.
