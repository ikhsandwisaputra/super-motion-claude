---
source: https://rive.app/docs/editor/text/text-overview
title: "Text"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Text

Create and format text, control sizing and overflow, and convert text to shapes.

[YouTube video player](https://www.youtube.com/embed/nykDEo6XqXY)

## Creating text

Press `T` or select the **Text Tool** from the toolbar.

* **Click** anywhere on the artboard to create text that automatically sizes to its content.
* **Click and drag** to create a text box with a defined width.

Double-click text to edit its content.

## Text properties

Select text to view its properties in the Inspector. In addition to standard properties such as position, rotation, and origin, you can control how text sizes, wraps, aligns, and handles overflow.

### Align origin to baseline

Enable **Align Origin to Baseline** to align the text's origin to its baseline.

![Toggle Align Origin to Baseline](https://mintcdn.com/rive/g5z7fLISgEIptZ4-/images/editor/design/text/align-origin-to-baseline.gif?s=cc9c507311e2560d0303a9702ce87f89)

### Sizing

Use the sizing options to control how the bounds of the text respond to its content.

* **Auto Width**: The width and height adjust to fit the text.
* **Auto Height**: The width remains fixed while the height adjusts to fit the text.
* **Fixed Size**: The width and height remain fixed.

![Three text elements with each of the different size options](https://mintcdn.com/rive/g5z7fLISgEIptZ4-/images/editor/design/text/text-sizing-types.png?fit=max\&auto=format\&n=g5z7fLISgEIptZ4-\&q=85\&s=fc4f822587291c990eeb39c560010f44)

### Overflow

Overflow controls what happens when the sizing is fixed and the text exceeds its available bounds.

* **Visible**: Displays text beyond the bounds.
* **Hidden**: Hides lines that don't fit within the bounds. Partial lines aren't displayed.
* **Clipped**: Clips text at the bounds, including partial lines.
* **Ellipsis**: Truncates overflowing text with an ellipsis.
* **Fit**: Adjusts the text to fit within the available bounds.
* **Fit Font Size**: Adjusts the font size to fit the text within the available bounds.

![Text elements showing the various overflow options](https://mintcdn.com/rive/g5z7fLISgEIptZ4-/images/editor/design/text/overflow-options.png?fit=max\&auto=format\&n=g5z7fLISgEIptZ4-\&q=85\&s=0e316ef85fdee566f5f47386df6349f1)

### Wrapping

Use **Wrap** to allow text to move to a new line when it reaches the available width. Use **No Wrap** to keep text on a single line.

See how disabling wrap works differently with the various overflow options:

![Toggle wrap with text elements with the various overflow options](https://mintcdn.com/rive/g5z7fLISgEIptZ4-/images/editor/design/text/wrap-options.gif?s=381d1704e3ac1823f4b13897e75e7066)

### Alignment

Use horizontal and vertical alignment to control how text is positioned within its available bounds.

> [!NOTE]
>
> The available alignment options depend on the sizing mode:
>
> * **Auto Width**: Alignment has no effect because the text bounds automatically fit the content.
> * **Auto Height**: Vertical alignment has no effect because the height automatically fits the content.
>
>   ![Text elements showing horizontal and vertical alignment options](https://mintcdn.com/rive/g5z7fLISgEIptZ4-/images/editor/design/text/text-alignment.png?fit=max\&auto=format\&n=g5z7fLISgEIptZ4-\&q=85\&s=2fe9dab21283f4b9c00d883b2edf91c3)

### Paragraph spacing

Use **Paragraph Spacing** to control the amount of space between paragraphs.

### Trim

Use **Trim** to adjust the vertical bounds of text.

* **None**
* **Cap**
* **Ex**

![Text Trim Options](https://mintcdn.com/rive/g5z7fLISgEIptZ4-/images/editor/design/text/trim-options.png?fit=max\&auto=format\&n=g5z7fLISgEIptZ4-\&q=85\&s=e838a3d83d24565d3b1ad08f23a26099)

### Bounds

Choose how the text bounds are calculated.

* **None**
* **Alphabetic**
* **Text**

Text bounds determine how the bounds of the text are calculated relative to the font's metrics.

![Text with Bounds option set to none, text, and alphabetic](https://mintcdn.com/rive/g5z7fLISgEIptZ4-/images/editor/design/text/text-bounds-options.png?fit=max\&auto=format\&n=g5z7fLISgEIptZ4-\&q=85\&s=fa2927f640ea1770d41d4f0411f2e249)

## Flatten to shape

Use **Flatten to Shape** to convert text into vector shapes. Once flattened, the resulting shapes can be edited like other vector geometry but can no longer be edited as text.

> [!NOTE]
>
> Flattening text can create a significant amount of geometry. If you're flattening text to reduce the size of an embedded font, consider keeping the text as text and including only the [used glyphs](/docs/editor/text/fonts#export-options) instead.
