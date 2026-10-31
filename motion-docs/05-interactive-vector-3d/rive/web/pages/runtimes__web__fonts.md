---
source: https://rive.app/docs/runtimes/web/fonts
title: "Fonts"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Fonts

Loading and replacing fonts dynamically at runtime.

## Swapping data-bound fonts at runtime

Data bound fonts can be loaded dynamically at runtime. Unlike swapping a font asset, this only changes text bound to that font property, allowing different parts of your Rive file to use different fonts independently.

Data bound fonts do not need to be embedded in the `.riv` file, so you only need to load the fonts your application uses at runtime.

For more information, see [Data Binding](/docs/runtimes/web/data-binding#fonts).

## Swapping font assets at runtime

Fonts can be loaded dynamically at runtime. This allows you to localize your Rive content without increasing the file size of the exported .riv file.

Swapping a font asset replaces all instances of the font.

For more information, see [Loading Assets](/docs/runtimes/web/loading-assets).
\`

## Fallback fonts

When rendering text, not all glyphs (characters) may be available in the active font. This commonly occurs when:

* Using custom fonts that don’t support all languages or Unicode ranges
* The embedded font is a subset of the font
* User-generated or dynamic text contains unexpected characters

A fallback font is used automatically when the primary font cannot render a specific glyph. These are typically system fonts, which generally provide broad Unicode coverage.

> [!NOTE]
>
> For security reasons, browsers do not allow direct access to a user's system fonts. As a result, fallback fonts must be explicitly provided for this runtime.

As of `v2.37.1`, the JS runtime provides an API for supplying fallback fonts. When a glyph cannot be rendered with the default font, Rive will invoke a callback you provide to retrieve a list of decoded fonts to try instead. Importantly, this callback must be registered before Rive begins rendering.

To start, import the `RiveFont` named export from the JS package and call its static method `setFallbackFontCallback()`, passing in your callback. The callback receives the glyph that failed to render (as a Unicode code point) and the font weight, and should return a list of fallback fonts. It may be called multiple times if successive fallback fonts also lack support for the glyph.

```javascript theme={null}
import { RiveFont, decodeFont, Rive } from "@rive-app/webgl2";

const THAI_FALLBACK_FONT_URL =
  "https://raw.githubusercontent.com/google/fonts/main/ofl/notoserifthai/NotoSerifThai%5Bwdth%2Cwght%5D.ttf";

const setFallbackFonts = async () => {
  const notoSerifThai = await fetch(THAI_FALLBACK_FONT_URL).then((res) => res.arrayBuffer());
  const riveThaiDecodedFont = await decodeFont(new Uint8Array(notoSerifThai));

  RiveFont.setFallbackFontCallback((codePoint: number, weight: number) => {
    console.log("fallback font missing glyph: ", codePoint, " + weight: ", weight);
    // For Thai, use Noto Serif Thai font
    if (codePoint >= 0x0E00 && codePoint <= 0x0E7F) {
      return [riveThaiDecodedFont];
    }
    return null;
  });
};

const main = async () => {
  await setFallbackFonts();
  const r = new Rive({
    src: "my.riv",
    autoplay: true,
    stateMachine: "State Machine 1",
    // ...
  });
};
main();
```
