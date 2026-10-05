# Orionix services — measured behavior

Measured from the public Orionix page at a 1674 × 774 desktop viewport.

- Section height: 3595 px
- Inner vertical padding: 80 px top and bottom
- Five service wraps: 687 px each (`viewport height - 87 px`)
- Progress column: 229 px wide, sticky at viewport top
- Initial number wheel: 800 × 800 px, partly outside the left edge
- Active marker: 18 px halo with a 10 px red center
- Text column: 540 px wide
- Illustration column: 229 px wide and sticky
- Active illustration: 600 × 600 px, centered on the right edge of its column
- Illustration transition: opacity plus scale from .8 to 1 over roughly .75 s
- Heading reveal: split by line/word, 12–18 px upward motion with blur removal
- Tags reveal after the description with a short stagger

The five public 1360 × 1360 service illustrations are stored locally in
`assets/services/service-01.png` through `service-05.png`.

The subtle paper layer in `assets/services/paper-texture.png` was generated with
OpenAI ImageGen using this prompt:

> Create a seamless, extremely subtle off-white warm studio-paper texture for a premium minimalist web design background. Almost pure white (#f8f7f5), very fine monochromatic film grain and faint cloudy tonal variation only, no objects, no vignette, no text, no borders, no visible pattern repetition, evenly lit, understated and clean. Square tile, high resolution.
