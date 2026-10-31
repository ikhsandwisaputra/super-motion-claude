---
source: https://rive.app/docs/runtimes/apple/fonts
title: "Fonts"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Fonts

Loading and replacing fonts dynamically at runtime.

## Swapping font assets at runtime

Fonts can be loaded dynamically at runtime. This allows you to localize your Rive content without increasing the file size of the exported .riv file.

Swapping a font asset replaces all instances of the font.

For more information, see [Loading Assets](/docs/runtimes/apple/loading-assets).

## Fallback fonts

When rendering text, not all glyphs (characters) may be available in the active font. This commonly occurs when:

* Using custom fonts that don’t support all languages or Unicode ranges
* The embedded font is a subset of the font
* User-generated or dynamic text contains unexpected characters

A fallback font is used automatically when the primary font cannot render a specific glyph. These are typically system fonts, which generally provide broad Unicode coverage.

> [!NOTE]
>
> On iOS, font sizes specified for fallback fonts are ignored. Instead, the platform selects system fonts that best match the styling and animation of the text run at runtime.

As of v6.1, on iOS and macOS, various options for fallbacks can be used. The Apple runtime provides helpers for selecting system fonts based on requested styling. Additionally, UIFonts / NSFonts can be used directly.

> [!NOTE]
>
> A default system font of regular weight and width will be used if no fallbacks have been registered.

```swift theme={null}
// Early in your app lifecycle, call something similar to the following:
RiveFont.fallbackFonts = [
    RiveFallbackFontDescriptor(), // Use a default system font
    RiveFallbackFontDescriptor(design: .default, weight: .bold, width: .expanded), // Use a bold, expanded system font
    UIFont(name: "...", size: 20)!
]

// Alternatively, you can supply different fonts based on style at runtime
```

As of v6.4, on iOS and macOS, you can utilize a more dynamic callback-based API for returning various fonts depending on the style of any missing characters, as styled in a text run.

```swift theme={null}
// As with the similar fallbackFonts API, you utilize Rive helper types
// or native UIFont/NSFont types
RiveFont.fallbackFontsCallback = { style in
    switch style.weight {
        case .thin: return [
            RiveFallbackFontDescriptor(weight: .thin),
            UIFont.systemFont(ofSize: 20, weight: .thin)
        ]
        case .bold: return [
            RiveFallbackFontDescriptor(weight: .bold),
            UIFont.systemFont(ofSize: 20, weight: .bold)
        ]
        default: return [
            RiveFallbackFontDescriptor(),
            UIFont.systemFont(ofSize: 20)
        ]
    }
}

// Alternatively, you can use the raw weight to return various fonts as well
RiveFont.fallbackFontsCallback = { style in
    switch style.rawWeight {
        case 100: return [
            RiveFallbackFontDescriptor(weight: .thin),
            UIFont.systemFont(ofSize: 20, weight: .thin)
        ]
        case 700: return [
            RiveFallbackFontDescriptor(weight: .bold),
            UIFont.systemFont(ofSize: 20, weight: .bold)
        ]
        default: return [
            RiveFallbackFontDescriptor(),
            UIFont.systemFont(ofSize: 20)
        ]
    }
}
```
