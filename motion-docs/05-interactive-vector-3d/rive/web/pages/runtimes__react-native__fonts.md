---
source: https://rive.app/docs/runtimes/react-native/fonts
title: "Fonts"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Fonts

Loading and replacing fonts dynamically at runtime.

## Swapping font assets at runtime

Fonts can be loaded dynamically at runtime. This allows you to localize your Rive content without increasing the file size of the exported .riv file.

Swapping a font asset replaces all instances of the font.

For more information, see [Loading Assets](/docs/runtimes/react-native/loading-assets).

## Fallback fonts

When rendering text, not all glyphs (characters) may be available in the active font. This commonly occurs when:

* Using custom fonts that don’t support all languages or Unicode ranges
* The embedded font is a subset of the font
* User-generated or dynamic text contains unexpected characters

A fallback font is used automatically when the primary font cannot render a specific glyph. These are typically system fonts, which generally provide broad Unicode coverage.

> [!NOTE]
>
> On iOS and Android, font sizes specified for fallback fonts are ignored. Instead, the platform selects system fonts that best match the styling and animation of the text run at runtime.

> **[View the full example](https://github.com/rive-app/rive-nitro-react-native/blob/main/example/src/exercisers/FontFallbackExample.tsx)**
>
> See the complete fallback font example used in the React Native sample app.

## Loading fallback fonts

Fallback fonts can come from:

* a bundled native asset
* a remote URL
* a system font by name

```ts theme={null}
import { RiveFonts } from '@rive-app/react-native';

// Bundled native font
const bundled = await RiveFonts.loadFont('kanit_regular.ttf');

// Remote font
const remote = await RiveFonts.loadFont({
    uri: 'https://raw.githubusercontent.com/google/fonts/main/ofl/kanit/Kanit-Regular.ttf',
});

// System font by name
const system = await RiveFonts.loadFont({ name: 'Thonburi' });
```

## Setting fallback fonts

Call RiveFonts.setFallbackFonts() before mounting the Rive view.

```ts theme={null}
await RiveFonts.setFallbackFonts({
    default: [
        bundled,
        remote,
        RiveFonts.systemFallback(),
    ],
});
```

## Clearing fallback fonts

To remove previously configured fallback fonts, call:

```ts theme={null}
await RiveFonts.clearFallbackFonts();
```

This is useful if your app needs to fully reset font configuration before recreating a RiveView.
