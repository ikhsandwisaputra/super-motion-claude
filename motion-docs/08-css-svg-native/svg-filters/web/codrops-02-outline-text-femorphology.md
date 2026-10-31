---
source: https://tympanus.net/codrops/2019/01/22/svg-filter-effects-outline-text-with-femorphology/
title: "SVG Filter Effects: Outline Text with <feMorphology> | Codrops"
fetched: 2026-10-28
---

By [Sara Soueidan](https://tympanus.net/codrops/author/sarasoueidan/ "Posts by Sara Soueidan")
in
[Articles](https://tympanus.net/codrops/category/articles/) on
January 22, 2019

# SVG Filter Effects: Outline Text with <feMorphology>

In this second part of our SVG Filter series you’ll learn all about the feMorphology filter, how it works and how you can use it to create interesting effects.

[feMorphology](https://tympanus.net/codrops/tag/femorphology/) [filter](https://tympanus.net/codrops/tag/filter/) [outline](https://tympanus.net/codrops/tag/outline/) [svg](https://tympanus.net/codrops/tag/svg/) [typography](https://tympanus.net/codrops/tag/typography/)

![](https://tympanus.net/codrops/wp-content/uploads/2019/01/SVGFilterEffects_Morphology_featured-1.jpg?x95600)

Last week, in the [first post](https://tympanus.net/codrops/2019/01/15/svg-filters-101/) of this series on SVG filter effects, we covered the basics of SVG filters—how to create them and how to use them. We also covered a few of the most frequently used filter operations (a.k.a. filter primitives). We will be reusing a little of what we covered in the first post in this article. So, unless you’re already familiar with those, I recommend taking a few minutes to read that article before moving forward with this one.

This article is part of a series on SVG Filter effects. Check out the other articles in the series:

* [SVG Filters 101](https://tympanus.net/codrops/2019/01/15/svg-filters-101/)
* Outline Text with <feMorphology> (this article)
* [Poster Image Effect with <feComponentTransfer>](https://tympanus.net/codrops/2019/01/29/svg-filter-effects-poster-image-effect-with-fecomponenttransfer/)
* [Duotone Images with <feComponentTransfer>](https://tympanus.net/codrops/2019/02/05/svg-filter-effects-duotone-images-with-fecomponenttransfer/)
* [Conforming Text to Surface Texture with <feDisplacementMap>](https://tympanus.net/codrops/2019/02/12/svg-filter-effects-conforming-text-to-surface-texture-with-fedisplacementmap/)
* [Creating Texture with <feTurbulence>](https://tympanus.net/codrops/2019/02/19/svg-filter-effects-creating-texture-with-feturbulence/)
* [SVG Filter Effects: Moving Forward](https://tympanus.net/codrops/2019/02/26/svg-filter-effects-moving-forward/)

`<feMorphology>` is one of my favorite SVG filter operations. It is one of the simplest operations, too, and the results of applying it to different elements are predictable most of the time.

## What is Morphing?

To morph means to transform or alter the form or the shape of an object.

The morphology filter operates on the form of an object. It provides two predefined shape transformations: erosion (a.k.a thinning, or shrinking) and dilation (a.k.a. thickening, or expanding). In other words, the `feMorphology` primitive can be used to shrink or expand elements.

Technically speaking, both these operations operate on a pixel level, expanding a pixel into its neighboring pixels (dilate) or crumbling the neighboring pixels at the edges of the pixel being operated on (erode), while still maintaining strokes around the edge of that pixel. The amount by which a pixel is dilated, or the number of neighboring pixels used to “stretch” or “expand” a pixel upon, is determined by a radius parameter.

```
<feMorphology
    in=".." result=".."
    operator="dilate || erode" radius="">
</feMorphology>
```

You can think of the morphing radius as the radius of a circle or ellipse; any neighboring pixels that lie within the circle determined by this radius and starting at the input pixel then counts as a neighboring pixel and will be used in the dilation or erosion effect.

In reality, though, the radius actually defines the size of a kernel known as the *structuring element* and which looks more like a matrix. For now, it’s enough to think about it in terms of a small rectangle whose width and height are determined in pixels specified in the radius attribute.

![Effect of erosion using a 3x3 structuring element (kernel).](https://tympanus.net/codrops/wp-content/uploads/2019/01/Screen-Shot-2019-01-08-at-11.02.15.png?x95600)

To use the filter we don’t need to get into the nerdy details of what morphing does on a pixel level. Suffice it to know that you can provide one or two radius values to `feMorphology` that will determine the amount by which your element will be shrunk or expanded. If you provide two numbers in the `radius` attribute, the first one will correspond to the x-radius and the second one will determine the y-radius.

## Morphing Images

When the `feMorphology` operation is applied to images, it results in two, usually predictable, results:

* The image size (dimensions) get smaller if the `erode` operator is used, and larger if the `dilate` operator is used.
* With either operator, the image looks like it’s been painted with a large painting brush, with not a lot of fine detail in it.

So, assuming we want to apply the morphing effect to an image, our code would look as simple as this:

```
<svg width="450" height="300" viewBox="0 0 450 300">
    <filter id="erode">
        <feMorphology operator="erode" radius="3"></feMorphology>
    </filter>
    <image xlink:href="..." width="90%" height="90%" x="10" y="10" filter="url(#erode)"></image>
</svg>
```

In this snippet, we are eroding (shrinking) the (pixels in the) image by 3 pixels. The following image shows the result of this code. Notice how the size of the image is slightly smaller on the right:

![The result (on the right) of applying the erode morphing effect to the image on the left.](https://tympanus.net/codrops/wp-content/uploads/2019/01/Screen-Shot-2019-01-08-at-12.06.29.png?x95600)

The result (on the right) of applying the erode morphing effect to the image on the left.

Now, if we keep the same morph radius and change the operator from `erode` to `dilate`, the effect looks similar, but also distinctively different:

![The result (on the right) of applying the dilate morph operation to the image on the left.](https://tympanus.net/codrops/wp-content/uploads/2019/01/Screen-Shot-2019-01-08-at-12.07.04.png?x95600)

The result (on the right) of applying the dilate morph operation to the image on the left.

In both cases, the image looks like an abstract painted version of itself, and its overall size changes as its pixels expand or shrink.

But in addition to the these results, probably the first thing you’ll notice is the difference in colors resulting from each of these two effects: `erode` produces an image that has more dark pixels, whereas `dilate` produces a light output. This is due to the fact that:

* `erode` (the default value) sets each pixel to its darkest or most transparent neighbor, respectively for each of the R, G, B, and A channels, and
* `dilate` sets each channel of each pixel to match the brightest or least transparent value from its neighbors, for each channel respectively.

All this technicality aside, applying `feMorphology` to images will almost always have the same result: a shrunken or expanded low-detail paint-like version of the image with either dark or light main strokes.

See the Pen feMorphology on an image by Sara Soueidan (@SaraSoueidan) on CodePen.

When applied to single-color elements, however, such as text, `feMorphology` only shrinks or expands the element—no noticeable pixel color changes happen because we only have one color to work with anyway…

## Adding Colored Outline to Text with `feMorphology`

We can currently add an outline to text in SVG using the `stroke` attribute on that text.

```
<!-- Adding an outline to SVG text using strokes -->
<text font-size="80px" dx="100" dy="200" font-weight="700" stroke="deepPink" stroke-width="3px">Stroked Text</text>
```

By adding a stroke, the stroke is usually centered at the edges of the text so that half of its thickness overlaps with the text itself, making the text thinner, even when it’s not supposed to. Instead of reducing the thickness of the text to add an outline, we should be able to expand (or *dilate*) the text so that the thickness of the outline or stroke is *added* to that of the text. We can do that using `feMorphology`.

Unless otherwise styled, text usually comes in one color. So, applied to text, `feMorphology` allows us to shrink or thicken that text. Once the text is thickened using `feMorphology`, it can be used as input to other filter primitives which then allow us to create text outlines the way they are meant to be created.

Before we dig into how to do that, here is an image showing the difference between text with a stroke outline and an outline added using `feMorphology`.

![Screen Shot 2019-01-08 at 13.39.46](https://tympanus.net/codrops/wp-content/uploads/2019/01/Screen-Shot-2019-01-08-at-13.39.46.png?x95600)

Notice how the stroked text in the middle has become thinner after adding the stroke outline, compared to the text dilated using `feMorphology`.

So, let’s create a colored piece of text with an outline. We’ll take it step by step. This is the result we will be aiming for:

![Screen Shot 2019-01-08 at 18.06.37](https://tympanus.net/codrops/wp-content/uploads/2019/01/Screen-Shot-2019-01-08-at-18.06.37.png?x95600)

So we’ll start with an SVG containing our text and a filter that starts with a simple dilation operation. The amount you dilate the text by depends on the thickness of the outline that you want.

```
<svg width="900" height="200" viewBox="100 0 900 200">
    <filter id="outline">
        <feMorphology in="SourceAlpha" result="DILATED" operator="dilate" radius="4"></feMorphology>
    </filter>

    <!-- DILATED TEXT -->
    <text font-size="85px" dx="125" dy="130" font-weight="700" filter="url(#outline)">upgrade yourself</text>
</svg>
```

The above code will get the alpha channel of the text—which is just a black version of the text—and will thicken it by 4px. The result of the code at this point looks like this:

![Screen Shot 2019-01-08 at 18.10.25](https://tympanus.net/codrops/wp-content/uploads/2019/01/Screen-Shot-2019-01-08-at-18.10.25.png?x95600)

..compared to the original text which has a dark navy blue fill color:

![Screen Shot 2019-01-08 at 18.11.13](https://tympanus.net/codrops/wp-content/uploads/2019/01/Screen-Shot-2019-01-08-at-18.11.13.png?x95600)

In order to create the outline effect, we will **layer the original text on top of the dilated text**, which will leave only the edges of the dilated text (the additional 4px) visible *behind* the original text, thus making them look like an outline. Overlaying the text on top of its outline (the dilated text) will be achieved using `feMerge`. We covered `feMerge` in [the previous article](https://tympanus.net/codrops/2019/01/15/svg-filters-101/).

Another thing we want to do before we position the outline behind the text is to colorize this outline. Also similar to what we did in the previous article, we will flood the filter region area with the color we want, and then composite the color layer with the dilated text layer (our outline) using the `in` operator. As a result, only the parts of the flood color that intersect with the dilated text will be rendered and the color will be blended with that text, thus colorizing it. Finally, we will merge the resulting colored outline with the original text to get the result we want. Our code now looks like this:

```
<svg width="900" height="200" viewBox="100 0 900 200">
    <filter id="outline">
        <feMorphology in="SourceAlpha" result="DILATED" operator="dilate" radius="4"></feMorphology>

        <feFlood flood-color="#32DFEC" flood-opacity="1" result="PINK"></feFlood>
        <feComposite in="PINK" in2="DILATED" operator="in" result="OUTLINE"></feComposite>

        <feMerge>
            <feMergeNode in="OUTLINE" />
            <feMergeNode in="SourceGraphic" />
        </feMerge>
    </filter>

    <!-- DILATED TEXT -->
    <text font-size="85px" dx="125" dy="130" font-weight="700" filter="url(#outline)">upgrade yourself</text>
</svg>
```

Creating a filter effect in SVG is a matter of thinking of the final result in terms of smaller operations, and using the result of one operation as input to another, and finally merging any layers we have created to achieve the final result.

The following is a live demo of the above code:

See the Pen Colored Text Outline with feMorphology by Sara Soueidan (@SaraSoueidan) on CodePen.

The fill color of the text can be specified either in your CSS or on the `text` element using the `fill` attribute. The color of the outline can be tweaked in the `flood-color` attribute of the `feFlood` primitive.

## Knocking the Text Out

In addition to adding an outline to text by dilating its alpha channel and layering it behind the text, we can create outline-only text, a.k.a. knockout text, meaning that the inside of the text will be “carved out” so you can see the background behind it through the outline. An example of such effect might look like the text in the following GIF, which shows a background changing color, and how that background can be seen within our text. This is the demo we will be creating in this section:

![bird-GIF-svg](https://tympanus.net/codrops/wp-content/uploads/2019/01/bird-GIF-svg.gif?x95600)

This effect is easier to create, and the code required to make it is noticeably shorter. The main difference here is that instead of layering the source text on top of the dilated text, **we will *use* that source text to cut out the inner parts of the dilated text**. This means that only the added thickness of the dilated text will remain, while the inside will be removed, thus giving us our outline.

We can do that by compositing the source text with the dilated text. Our source text will go on top, and the dilated text will be its backdrop. Using the `out` composite operator, only the parts of the backdrop that do *not* overlap with the source layer will be rendered, which in our case means that only our outline will be rendered.

```
<svg width="900" height="450" viewBox="0 0 900 450">
    <filter id="outliner">

        <!-- Start by grabbing the alpha channel of the text and dilating it-->
        <feMorphology operator="dilate" radius="8" in="SourceAlpha" result="THICKNESS" />

         <!-- Next, grab the original text (SourceGraphic) and use it to cut out the inside of the dilated text -->
        <feComposite operator="out" in="THICKNESS" in2="SourceGraphic"></feComposite>
    </filter>

    <text dx="100" dy="300" filter="url(#outliner)" letter-spacing="10px">SVG Rocks</text>
</svg>
```

Using a nice font face, our demo now looks like this:

![Screen Shot 2019-01-08 at 18.33.21](https://tympanus.net/codrops/wp-content/uploads/2019/01/Screen-Shot-2019-01-08-at-18.33.21.png?x95600)

Cool. Now, what if you want to change the color of the outline? You’d have to use the `feFlood` primitive again and composite the Flood color with the outline. And then every time you want to change the color of the outline, you’d have to do the same over and over again. This is, admittedly, too tedious. Fortunately, there is a simpler way.

If instead of grabbing and dilating the alpha channel of the text (which is black by default) you grab the source text itself (which could have any fill color!) and dilate it, and then use the text again to carve out the inside of the dilated text, you end up with an outline that comes from *the source text itself*. This means that the color of that outline will always be the same as the color of the source text. And since we can define the fill color of the source text in CSS, this means that you have an outline text that is separated from its styles. (Yay separation of concerns!) You can then apply the filter to any piece of text, and change the color of that text in the CSS any time you need to, without having to tweak the filter’s code. Our improved code now looks like this:

```
<svg width="900" height="450" viewBox="0 0 900 450">
    <filter id="outliner">

        <!-- Start by grabbing the source graphic (the text) and dilating it-->
        <feMorphology operator="dilate" radius="8" in="SourceGraphic" result="THICKNESS" />

         <!-- Then use the text (the SourceGraphic) again to cut out the inside of the dilated text -->
        <feComposite operator="out" in="THICKNESS" in2="SourceGraphic"></feComposite>
    </filter>

    <text dx="100" dy="300" filter="url(#outliner)" letter-spacing="10px">SVG Rocks</text>
</svg>
```

In our style sheet, we can choose the outline color as well as the SVG background color. You can also choose to have an image behind the text inside the SVG. I’m using CSS animations in the code below to animate the color of the background, for no reason other than it being cool.

```
svg text {
    font-family: 'Bangers', cursive;
    font-size: 150px;
    letter-spacing: 13px;
    fill: #000; /* This fill color determines the color of the outline */
}

svg {
    background-color: gold;
    animation: colorsssss 2s linear infinite;
    animation-delay: 3s;
}

@keyframes colorsssss {
    50% {
        background-color: deepPink;
    }
}
```

The above SVG filter is reusable across SVG **as well as HTML**. If you want to apply it to an HTML element, you can do that using the `filter` property; just place the filter in your HTML and “call” it in your CSS:

```
h2 {
    filter: url(#outliner);

    /* You can change the color of the outline here by changing the color of the heading */
    color: deepPink;
}
```

And our finished demo that includes an HTML heading with the filter applied to it:

See the Pen (Text) Outlines (Only) by Sara Soueidan (@SaraSoueidan) on CodePen.

My favorite thing about this filter recipe is that it can be used as a visual enhancement. If a browser does not support SVG filters, or if it does not support CSS filters, *or* it does not support applying SVG filters to HTML elements, the user will get the original text without the outline/knockout effect applied to it. Oh, and the cherry on top of the cake? Both the SVG and the HTML text will be fully accessible, searchable and selectable. Yay progressive enhancement! Yay SVG!

## Final Words

Using just two filter operations in SVG, you can apply an outlined text effect to your SVG or HTML text content. Place this filter in your HTML and use and reuse it as often as you need.

In the next article in this series, we will have a look at the `<feComponentTransfer>`, one of my favorite filter primitives, and see how it works and what effects we can create with it. Stay tuned.
