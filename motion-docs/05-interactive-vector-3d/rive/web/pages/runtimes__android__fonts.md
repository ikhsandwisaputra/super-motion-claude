---
source: https://rive.app/docs/runtimes/android/fonts
title: "Fonts"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Fonts

Loading and replacing fonts dynamically at runtime.

## Swapping font assets at runtime

Fonts can be loaded dynamically at runtime. This allows you to localize your Rive content without increasing the file size of the exported .riv file.

Swapping a font asset replaces all instances of the font.

For more information, see [Loading Assets](/docs/runtimes/android/loading-assets).

## Fallback fonts

When rendering text, not all glyphs (characters) may be available in the active font. This commonly occurs when:

* Using custom fonts that don’t support all languages or Unicode ranges
* The embedded font is a subset of the font
* User-generated or dynamic text contains unexpected characters

A fallback font is used automatically when the primary font cannot render a specific glyph. These are typically system fonts, which generally provide broad Unicode coverage.

> [!NOTE]
>
> On Android, font sizes specified for fallback fonts are ignored. Instead, the platform selects system fonts that best match the styling and animation of the text run at runtime.

As of v9.12.0, various options for fallback fonts can be used on Android.

> [!NOTE]
>
> If no fallback fonts are registered, a default system font ("sans-serif") with a regular weight (400, NORMAL) and normal style will be used.

The `Fonts` class provides ways to handle and customize fonts, including retrieving system fonts, defining font options, and finding fallback fonts based on specific characteristics.

### 1. Setting a fallback font

With v9.12.0, the runtime provides a new API to match missing fonts against a specific weight by extending the `FontFallbackStrategy` interface.

This interface contains a single method:

```kotlin theme={null}
fun getFont(weight: Fonts.Weight): List<FontBytes>
```

Implementers need to override this method. The user's implementation must then be set as the current fallback strategy via `FontFallbackStrategy.stylePicker`.

**Example:**

```kotlin theme={null}
class FontFallback : AppCompatActivity(), FontFallbackStrategy {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        // Set the fallback strategy
        FontFallbackStrategy.stylePicker = this
    }

    override fun getFont(weight: Fonts.Weight): List<FontBytes> {
        val desiredWeight = weight.weight
        val fonts = listOf(
            Fonts.FontOpts(
                familyName = "sans-serif",
                weight = Fonts.Weight(weight = desiredWeight) // Find a matching weight font
            ),
            // Non-Latin Unicode fallback
            Fonts.FontOpts("NotoSansThai-Regular.ttf")
        )
        return fonts.mapNotNull {
            // Filter out fonts that cannot be found on the system
            FontHelper.getFallbackFontBytes(it)
        }
    }
}
```

The method returns a list of `FontBytes` (\`ByteArray\`). The runtime attempts to match the character using the fonts in the list in a first-in, first-out (FIFO) order.

Fallback fonts can also be set using `Rive.setFallbackFont()`, with optional font preferences defined in `Fonts.FontOpts`. These fonts are tried only after attempting the ones returned by `FontFallbackStrategy.getFont()`.

### 2. Font.FontOpts - font options

Defines the font characteristics when selecting a fallback font.

* **Parameters**
* `familyName`: Name of the font family (e.g., "Roboto", "NotoSansThai-Regular.ttf"). Defaults to `null`
* `lang`: Optional language specification. Defaults to `null`
* `weight`: Font weight using `Fonts.Weight` (e.g., `Fonts.Weight.NORMAL`, `Fonts.Weight.BOLD`). Default is `Weight.NORMAL`
* `style`: Font style, either `Fonts.Font.STYLE_NORMAL` or `Fonts.Font.STYLE_ITALIC`. Default is `STYLE_NORMAL`
* **Default example**

```kotlin theme={null}
val defaultFontOpts = Fonts.FontOpts.DEFAULT
```

### 3. Retrieving a fallback font

Use `FontHelper.getFallbackFont()` to find a suitable fallback font based on specified options. Returns a `Fonts.Font` object or `null` if no match is found.

**Example:**

```kotlin theme={null}
val fontOpts = Fonts.FontOpts(familyName = "Roboto", weight = Fonts.Weight.BOLD)
val fallbackFont = FontHelper.getFallbackFont(fontOpts)
```

### 4. Getting font file and bytes

* `FontHelper.getFontFile(font: Fonts.Font)`: Retrieves the file for the specified font.
* `FontHelper.getFontBytes(font: Fonts.Font)`: Reads the font file and returns its bytes.

**Example:**

```kotlin theme={null}
val fontFile = FontHelper.getFontFile(fallbackFont)
val fontBytes = FontHelper.getFontBytes(fallbackFont)
```

### 5. Fonts.Weight - font weight

Represents the font weight, allowing values from 0 to 1000.

* **Predefined Weights**
* `Fonts.Weight.NORMAL` (400)
* `Fonts.Weight.BOLD` (700)

**Example:**

```kotlin theme={null}
val normalWeight = Fonts.Weight.NORMAL
val customWeight = Fonts.Weight.fromInt(500)
```

### 6. Fonts.Style - font style

Represents the font style, allowing "normal" and "italic"

* **Predefined Styles**
* `Fonts.Font.STYLE_NORMAL`
* `Fonts.Font.STYLE_ITALIC`

**Example:**

```kotlin theme={null}
val normalStyle = Fonts.Font.STYLE_NORMAL
val italicStyle = Fonts.Font.STYLE_ITALIC
```

### 7. Getting system fonts

* `FontHelper.getSystemFonts()`: Returns a map of all available system font families.

**Example:**

```kotlin theme={null}
val systemFonts = FontHelper.getSystemFonts()
```
