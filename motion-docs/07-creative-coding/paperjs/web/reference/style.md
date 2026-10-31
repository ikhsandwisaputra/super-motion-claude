---
source: https://paperjs.org/reference/style/
title: "Paper.js — Style"
fetched: 2026-10-28
---

# Style

Style is used for changing the visual styles of items contained within a Paper.js project and is returned by [item.style](https://paperjs.org/reference/item#style) and [project.currentStyle](https://paperjs.org/reference/project#currentstyle).

All properties of Style are also reflected directly in [Item](https://paperjs.org/reference/item), i.e.: [item.fillColor](https://paperjs.org/reference/item#fillcolor).

Styles set on a [Group](https://paperjs.org/reference/group) or [Layer](https://paperjs.org/reference/layer) are applied to the children that it contains at that moment. Items added to it later do not receive them.

To set multiple style properties in one go, you can pass an object to [item.style](https://paperjs.org/reference/item#style). This is a convenient way to define a style once and apply it to a series of items:

#### Example:Styling paths

Run

#### Example:Styling text items

Run

#### Example:Styling groups

Run

## Properties

[**view**](https://paperjs.org/reference/style/#view)

The view that this style belongs to.

Read only.

#### Type:

* [View](https://paperjs.org/reference/view)

### Stroke Style

[**strokeColor**](https://paperjs.org/reference/style/#strokecolor)

The color of the stroke.

#### Type:

* [Color](https://paperjs.org/reference/color)⟋null

#### Example:Setting the stroke color of a path:

Run

[**strokeWidth**](https://paperjs.org/reference/style/#strokewidth)

The width of the stroke.

#### Default:

* 1

#### Type:

* Number

#### Example:Setting an item's stroke width:

Run

[**strokeCap**](https://paperjs.org/reference/style/#strokecap)

The shape to be used at the beginning and end of open [Path](https://paperjs.org/reference/path) items, when they have a stroke.

#### Values:

* 'round', 'square', 'butt'

#### Default:

* 'butt'

#### Type:

* String

#### Example:A look at the different stroke caps:

Run

[**strokeJoin**](https://paperjs.org/reference/style/#strokejoin)

The shape to be used at the segments and corners of [Path](https://paperjs.org/reference/path) items when they have a stroke.

#### Values:

* 'miter', 'round', 'bevel'

#### Default:

* 'miter'

#### Type:

* String

#### Example:A look at the different stroke joins:

Run

[**strokeScaling**](https://paperjs.org/reference/style/#strokescaling)

Specifies whether the stroke is to be drawn taking the current affine transformation into account (the default behavior), or whether it should appear as a non-scaling stroke. On text, non-scaling strokes are exact for uniform scaling only, as the glyphs are always stroked through the transformation.

#### Default:

* true

#### Type:

* Boolean

[**dashOffset**](https://paperjs.org/reference/style/#dashoffset)

The dash offset of the stroke.

#### Default:

* 0

#### Type:

* Number

[**dashArray**](https://paperjs.org/reference/style/#dasharray)

Specifies an array containing the dash and gap lengths of the stroke.

#### Default:

* []

#### Type:

* Array of Numbers

#### Example:

Run

[**miterLimit**](https://paperjs.org/reference/style/#miterlimit)

The miter limit of the stroke. When two line segments meet at a sharp angle and miter joins have been specified for [strokeJoin](https://paperjs.org/reference/style#strokejoin), it is possible for the miter to extend far beyond the [strokeWidth](https://paperjs.org/reference/style#strokewidth) of the path. The miterLimit imposes a limit on the ratio of the miter length to the [strokeWidth](https://paperjs.org/reference/style#strokewidth).

#### Default:

* 10

#### Type:

* Number

[**paintOrder**](https://paperjs.org/reference/style/#paintorder)

The order in which the fill and the stroke are painted, as in SVG’s `paint-order`, named after what is painted first: `'fill'` paints the fill first, `'stroke'` paints the stroke first, so the fill covers its inner half.

#### Values:

* 'fill', 'stroke'

#### Default:

* 'fill'

#### Type:

* String

#### Example:

Run

### Fill Style

[**fillColor**](https://paperjs.org/reference/style/#fillcolor)

The fill color.

#### Type:

* [Color](https://paperjs.org/reference/color)⟋null

#### Example:Setting the fill color of a path to red:

Run

[**fillRule**](https://paperjs.org/reference/style/#fillrule)

The fill-rule with which the shape gets filled. Please note that only modern browsers support fill-rules other than `'nonzero'`.

#### Values:

* 'nonzero', 'evenodd'

#### Default:

* 'nonzero'

#### Type:

* String

### Shadow Style

[**shadowColor**](https://paperjs.org/reference/style/#shadowcolor)

The shadow color.

#### Type:

* [Color](https://paperjs.org/reference/color)⟋null

#### Example:Creating a circle with a black shadow:

Run

[**shadowBlur**](https://paperjs.org/reference/style/#shadowblur)

The shadow’s blur radius.

#### Default:

* 0

#### Type:

* Number

[**shadowOffset**](https://paperjs.org/reference/style/#shadowoffset)

The shadow’s offset.

#### Default:

* 0

#### Type:

* [Point](https://paperjs.org/reference/point)

### Selection Style

[**selectedColor**](https://paperjs.org/reference/style/#selectedcolor)

The color the item is highlighted with when selected. If the item does not specify its own color, the color defined by its layer is used instead.

#### Type:

* [Color](https://paperjs.org/reference/color)⟋null

### Character Style

[**fontFamily**](https://paperjs.org/reference/style/#fontfamily)

The font-family to be used in text content.

#### Default:

* 'sans-serif'

#### Type:

* String

[**fontWeight**](https://paperjs.org/reference/style/#fontweight)

The font-weight to be used in text content.

#### Default:

* 'normal'

#### Type:

* String⟋Number

[**fontSize**](https://paperjs.org/reference/style/#fontsize)

The font size of text content, as a number in pixels, or as a string with optional units `'px'`, `'pt'` and `'em'`.

#### Default:

* 10

#### Type:

* Number⟋String

[**lineHeight**](https://paperjs.org/reference/style/#lineheight)

The line height of text content: the distance from one line’s baseline to the next. Automatic, as `'auto'` (1.2) or another factor of the letters’ font size, each line moving down by its largest letters’; or fixed, as a length with units as the font size takes them (`'18px'`, `'12pt'`).

#### Default:

* 'auto'

#### Type:

* Number⟋String

[**letterTracking**](https://paperjs.org/reference/style/#lettertracking)

The letter tracking of text content: the space added after each letter, along the line, in thousandths of an em, as in Adobe Illustrator and InDesign. A tracking of 100 adds a tenth of the font size. Also `tracking`, its former name.

#### Default:

* 0

#### Type:

* Number

[**letterKerning**](https://paperjs.org/reference/style/#letterkerning)

The letter kerning of text content: the space added after a letter, along the line, in thousandths of an em, in place of the font’s own kerning pair; `null` for the font’s kerning.

#### Default:

* null

#### Type:

* Number

[**fontStyle**](https://paperjs.org/reference/style/#fontstyle)

The font style of text content, as in CSS: upright or slanted. Together with the [fontWeight](https://paperjs.org/reference/style#fontweight), it says what a font’s style name says, e.g. `'Bold Italic'`.

#### Values:

* 'normal', 'italic', 'oblique'

#### Default:

* 'normal'

#### Type:

* String

[**fontVariations**](https://paperjs.org/reference/style/#fontvariations)

The settings of a variable font’s axes, by their tags: `{ wght: 600,
wdth: 80 }`. Kept for hosts that lay text out with its fonts; canvas doesn’t draw them.

#### Default:

* null

#### Type:

* Object

[**baselineShift**](https://paperjs.org/reference/style/#baselineshift)

How far the letters move up from the baseline, in pixels.

#### Default:

* 0

#### Type:

* Number

[**baselinePosition**](https://paperjs.org/reference/style/#baselineposition)

Whether the letters are set as superscripts or subscripts: smaller, and above or below the baseline.

#### Values:

* 'normal', 'superscript', 'subscript'

#### Default:

* 'normal'

#### Type:

* String

[**letterScaling**](https://paperjs.org/reference/style/#letterscaling)

How much the letters are scaled, as [item.scaling](https://paperjs.org/reference/item#scaling): one factor for both directions, or a point with the horizontal and vertical ones.

#### Default:

* 1

#### Type:

* Number⟋[Point](https://paperjs.org/reference/point)

[**letterRotation**](https://paperjs.org/reference/style/#letterrotation)

The rotation of each letter about its origin on the baseline, in degrees.

#### Default:

* 0

#### Type:

* Number

[**capitals**](https://paperjs.org/reference/style/#capitals)

Whether the letters are set as capitals, or as small capitals.

#### Values:

* 'normal', 'all', 'small'

#### Default:

* 'normal'

#### Type:

* String

[**underline**](https://paperjs.org/reference/style/#underline)

Whether the letters are underlined.

#### Default:

* false

#### Type:

* Boolean

[**strikethrough**](https://paperjs.org/reference/style/#strikethrough)

Whether the letters are struck through.

#### Default:

* false

#### Type:

* Boolean

[**features**](https://paperjs.org/reference/style/#features)

The OpenType features to turn on (`'dlig'`) or off (`'-liga'`). Kept for hosts that lay text out with its fonts; canvas doesn’t draw them.

#### Default:

* null

#### Type:

* Array of Strings

### Paragraph Style

[**justification**](https://paperjs.org/reference/style/#justification)

The justification of text paragraphs.

#### Values:

* 'left', 'right', 'center', 'start', 'end', 'justify'

#### Default:

* 'left'

#### Type:

* String

[**justifyLast**](https://paperjs.org/reference/style/#justifylast)

How the last line of a justified paragraph is aligned; `'all'` justifies it too.

#### Values:

* 'left', 'right', 'center', 'start', 'end', 'all'

#### Default:

* 'left'

#### Type:

* String

[**justifySpacing**](https://paperjs.org/reference/style/#justifyspacing)

How far justification may change the spacing, each as `[minimum, desired,
maximum]` in percent: `{ word: [80, 100, 133], letter: [0, 0, 0], glyph:
[100, 100, 100] }`; `null` for those. Kept for hosts: canvas text justifies by the word spacing alone.

#### Default:

* null

#### Type:

* Object

[**startIndent**](https://paperjs.org/reference/style/#startindent)

The indent where the paragraph’s lines start: left in left-to-right text, right in right-to-left text.

#### Default:

* 0

#### Type:

* Number

[**endIndent**](https://paperjs.org/reference/style/#endindent)

The indent where the paragraph’s lines end.

#### Default:

* 0

#### Type:

* Number

[**firstLineIndent**](https://paperjs.org/reference/style/#firstlineindent)

The indent of the paragraph’s first line, added to its start indent.

#### Default:

* 0

#### Type:

* Number

[**spaceBefore**](https://paperjs.org/reference/style/#spacebefore)

The space above the paragraph. Between two paragraphs, the larger of this one’s and the space after the one before it is used.

#### Default:

* 0

#### Type:

* Number

[**spaceAfter**](https://paperjs.org/reference/style/#spaceafter)

The space below the paragraph.

#### Default:

* 0

#### Type:

* Number

[**hyphenation**](https://paperjs.org/reference/style/#hyphenation)

Whether words are hyphenated at the ends of lines, and how: `true`, or `{
wordsLongerThan, afterFirst, beforeLast, limit, zone, capitalized }`. Kept for hosts: canvas text breaks only at soft hyphens.

#### Default:

* false

#### Type:

* Boolean⟋Object

[**composer**](https://paperjs.org/reference/style/#composer)

How lines are broken: one line at a time, or all of the paragraph’s lines together, for the most even spacing. Kept for hosts: canvas text breaks one line at a time.

#### Values:

* 'line', 'paragraph'

#### Default:

* 'paragraph'

#### Type:

* String

[**lineWrap**](https://paperjs.org/reference/style/#linewrap)

How the lines of a paragraph in an area are evened out: `'normal'` fills each line as far as it goes, `'balance'` makes them all about as long, and `'pretty'` balances the last four lines when the last one is shorter than a third of the one before. Both keep the paragraph’s number of lines.

#### Values:

* 'normal', 'balance', 'pretty'

#### Default:

* 'normal'

#### Type:

* String

[**tabs**](https://paperjs.org/reference/style/#tabs)

The paragraph’s tab stops: `[{ position, align, leader }]`, with `align` one of `'left'`, `'center'`, `'right'` and `'decimal'`. Kept for hosts: canvas text doesn’t set tabs yet.

#### Default:

* null

#### Type:

* Array of Object objects

[**direction**](https://paperjs.org/reference/style/#direction)

The direction the paragraph’s lines run in, which `'start'` and `'end'` follow, and from which side their pieces are placed; `null` for left to right. Lines that mix directions across styles aren’t reordered by the Unicode bidirectional algorithm: their pieces follow the paragraph’s direction, and canvas orders only the letters within each piece.

#### Values:

* 'ltr', 'rtl'

#### Default:

* null

#### Type:

* String
