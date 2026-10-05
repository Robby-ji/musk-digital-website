# Reconstructiehandleiding

Gebruik deze stappen wanneer ik dit scrolleffect opnieuw moet toepassen.

## 1. Zet de dependency vast

Gebruik exact dezelfde Lenis-versie. Een zwevende `latest`-URL kan later ander
scrollgedrag opleveren. Gebruik daarom `1.3.23` of test een upgrade opnieuw.

## 2. Laad in de juiste volgorde

Laad eerst `lenis.css`, daarna eventuele site-CSS. Laad bij de scripts eerst
`lenis.min.js` en daarna de initialisatie. Scrollafhankelijke parallaxmodules mogen
na de initialisatie komen.

## 3. Gebruik lerp in plaats van duration

Stel `lerp: .1` in en laat `duration` weg. Hiermee wordt de resterende afstand per
frame geïnterpoleerd en ontstaat de karakteristieke exponentiële uitloop.

## 4. Houd desktop en touch verschillend

Gebruik `smoothWheel: true` en `syncTouch: false`. De muis krijgt momentum, maar
een mobiele swipe behoudt de native respons en toegankelijkheid.

## 5. Voorkom conflicten

Zet voor `html.lenis` CSS `scroll-behavior` op `auto !important`. Anders kunnen
Lenis en browser-smooth-scroll gelijktijdig op ankerlinks reageren.

## 6. Koppel ankerlinks

Onderschep interne links alleen wanneer Lenis actief is. Zoek het doel en gebruik
`lenis.scrollTo(target)`. Laat ontbrekende doelen en externe links ongemoeid.

## 7. Respecteer reduced motion

Maak geen Lenis-instantie wanneer `prefers-reduced-motion: reduce` actief is.
Vernietig een bestaande instantie als de instelling tijdens de sessie verandert.

## 8. Meet de uitloop

Test met één wielimpuls van 600px. De pagina hoort na ongeveer 100ms halverwege te
zijn, na 500ms rond 96% en na ongeveer 1,2s volledig stil te staan. Controleer ook
of parallax- en sticky-elementen tijdens de uitloop blijven bijwerken.

## 9. Afstellen

- `lerp .07` — zwaarder en langer.
- `lerp .1` — referentiegedrag.
- `lerp .14` — sneller en directer.
- `wheelMultiplier` verandert afstand, niet de fundamentele easing.
