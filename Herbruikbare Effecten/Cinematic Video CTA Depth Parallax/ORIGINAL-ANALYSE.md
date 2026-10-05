# Analyse van de referentie

## Gemeten desktopwaarden

Bij een viewport van `1519 × 900px`:

- kaart: `1359 × 481px`, vanaf `x: 80px`
- kaartpadding: `80px 64px 32px`
- afronding: `32px`
- achtergrond: `#141414`
- video: `733.9 × 481px`, rechts uitgelijnd
- videobreedte: ongeveer `54%` van de kaart
- kop: `64/68px`, letterafstand `-2.56px`
- socialbalk: `49px` hoog, links en rechts `64px`

De video gebruikt `object-fit: cover` en een verticaal masker:

```css
mask-image: linear-gradient(0deg, #000 70%, transparent 100%);
```

Hierdoor verdwijnt de bovenzijde van het beeld zacht in de zwarte kaart.

## Tablet en mobiel

| Viewport | Kaart | Padding | Video |
| --- | --- | --- | --- |
| `1105px` | `1049 × 417px` | `64px 40px 24px` | rechts, volledige hoogte |
| `768px` | `728 × 589px` | `32px 24px` | onderaan, `330px` hoog |
| `390px` | `350 × 637px` | `32px 24px` | onderaan, `330px` hoog |

Vanaf circa `810px` verandert de compositie van links/rechts naar tekst boven en
video onder. De kop wordt `44/48px` en gecentreerd. Op zeer smalle schermen toont
de socialbalk alleen iconen.

## Beweging

In de gemeten referentie hadden kaart, tekst en video geen afzonderlijke CSS
transform. Voor deze reproductie is de gevraagde dieptewerking bewust toegevoegd:

- tekst desktop: van `+34px` naar `-34px`
- video desktop: van `-18px` naar `+18px`
- tekst mobiel: van `+12px` naar `-12px`
- video mobiel: van `-16px` naar `+16px`

De beweging wordt berekend over de volledige passage van de kaart door de
viewport. Tekst en video krijgen verschillende interpolatiesnelheden (`.18` en
`.16`) zodat ze niet mechanisch gekoppeld aanvoelen.

## Videogedrag

Een `IntersectionObserver` start de gedempte loop zodra minstens 8% van de kaart
zichtbaar is en pauzeert hem buiten beeld. Dit bespaart verwerking op lange
pagina's. Een poster voorkomt een lege kaart voordat de video geladen is.
