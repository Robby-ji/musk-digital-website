# Analyse originele Orionix Works-hover

De projectkaart zelf verandert niet van formaat. Een buitenste thumbnailframe blijft op zijn plaats en knipt de inhoud af. Binnen dat frame wordt een aparte beeldlaag tijdens hover van schaal `1` naar ongeveer `1.10` gebracht.

Gemeten desktopverloop:

- circa `100ms`: schaal `1.037`;
- circa `250ms`: schaal `1.093`;
- circa `500ms`: zeer lichte overshoot rond `1.101`;
- circa `800ms`: stabiel op `1.10`.

Bij mouseleave verloopt dezelfde beweging omgekeerd, inclusief een bijna onzichtbare undershoot voordat schaal `1` wordt bereikt. Op de telefoonvariant gebruikt het origineel geen muis-hover; daar blijft alleen het scroll/parallaxgedrag actief.
