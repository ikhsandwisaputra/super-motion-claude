---
source: https://rive.app/docs/editor/text/fonts
title: "Font Assets"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Font Assets

Import and customize fonts.

## Importing fonts

See [Importing Assets](/docs/editor/fundamentals/assets-overview#importing-assets) for information about importing files, including TTF and OTF files.

### Google Fonts

You can add Google Fonts directly from the text style font options. Select a text run, choose a Google Font, and Rive adds the font to the Assets panel automatically.

<video />

## Export options

Font assets include an Include option that controls which glyphs are included when the font is exported.

* **All glyphs**: Include the full font.
* **Glyphs used**: Include only the glyphs used in the file.
* **Custom**: Include a custom set of glyphs.

![Export options](https://mintcdn.com/rive/X8lKv4cR1rHX1pd9/images/editor/assets/export-options.png?fit=max\&auto=format\&n=X8lKv4cR1rHX1pd9\&q=85\&s=a91962216f6168aea6f423815ac95a9d)

> [!NOTE]
>
> Fonts can significantly increase the size of your exported `.riv` file, especially when exporting **All glyphs**. Use **Glyphs used** or **Custom** when you only need a smaller set of characters.

> [!TIP]
>
> To control which glyphs are included, create an artboard that you do not export to the `.riv` file. Add a text run with the exact characters you want to include, then set the font asset’s **Include** option to **Glyphs used**.
>
> For example, if your file only needs numbers, add a text run with `0123456789`. Those glyphs will be included in the exported font.
>
> ![Glyphs used hack](https://mintcdn.com/rive/X8lKv4cR1rHX1pd9/images/editor/assets/glyphs-used-hack.png?fit=max\&auto=format\&n=X8lKv4cR1rHX1pd9\&q=85\&s=429c931d570567f0fcbc7173b44023f8)

### Custom - Export Scripts

When **Include** is set to **Custom**, you can use **Export Scripts** to choose which glyph groups to include, such as Latin, Thai, or other writing systems.

![Export scripts](https://mintcdn.com/rive/X8lKv4cR1rHX1pd9/images/editor/assets/export-scripts.png?fit=max\&auto=format\&n=X8lKv4cR1rHX1pd9\&q=85\&s=73e88dabecd823486a6586238f1c6a60)
