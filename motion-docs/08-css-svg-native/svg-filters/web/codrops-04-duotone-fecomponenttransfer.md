---
source: https://tympanus.net/codrops/2019/02/05/svg-filter-effects-duotone-images-with-fecomponenttransfer/
title: "SVG Filter Effects: Duotone Images with <feComponentTransfer> | Codrops"
fetched: 2026-10-28
---

By [Sara Soueidan](https://tympanus.net/codrops/author/sarasoueidan/ "Posts by Sara Soueidan")
in
[Articles](https://tympanus.net/codrops/category/articles/) on
February 5, 2019

# SVG Filter Effects: Duotone Images with <feComponentTransfer>

This fourth article in our SVG Filter series will show you how to use feComponentTransfer to create a duotone filter effect.

[duotone](https://tympanus.net/codrops/tag/duotone/) [filter](https://tympanus.net/codrops/tag/filter/) [photoshop](https://tympanus.net/codrops/tag/photoshop/) [svg](https://tympanus.net/codrops/tag/svg/) [typography](https://tympanus.net/codrops/tag/typography/)

![](https://tympanus.net/codrops/wp-content/uploads/2019/01/SVGFilterEffects_feComponent2_featured.png?x95600)

In [the previous article](https://tympanus.net/codrops/2019/01/29/svg-filter-effects-poster-image-effect-with-fecomponenttransfer/) in this series I introduced you to the `<feComponentTransfer>`, and we used it to limit the number of colors in an image to create a poster effect. In this article, we will take a look at how it can be used to create a Photoshop-like duotone effect. We’ll also learn how to use it to control the intensity and contrast of an image’s colors.

This article is part of a series on SVG Filter effects. Check out the other articles in the series:

* [SVG Filters 101](https://tympanus.net/codrops/2019/01/15/svg-filters-101/)
* [Outline Text with <feMorphology>](https://tympanus.net/codrops/2019/01/22/svg-filter-effects-outline-text-with-femorphology/)
* [Poster Image Effect with <feComponentTransfer>](https://tympanus.net/codrops/2019/01/29/svg-filter-effects-poster-image-effect-with-fecomponenttransfer/)
* Duotone Images with <feComponentTransfer> (this article)
* [Conforming Text to Surface Texture with <feDisplacementMap>](https://tympanus.net/codrops/2019/02/12/svg-filter-effects-conforming-text-to-surface-texture-with-fedisplacementmap/)
* [Creating Texture with <feTurbulence>](https://tympanus.net/codrops/2019/02/19/svg-filter-effects-creating-texture-with-feturbulence/)
* [SVG Filter Effects: Moving Forward](https://tympanus.net/codrops/2019/02/26/svg-filter-effects-moving-forward/)

## A Quick Recap

To quickly recap, the `feComponentTransfer` primitive allows you to modify each of the R, G, B and A *components* present in a pixel. In other words, `feComponentTransfer` allows the independent manipulation of each color channel, as well as the alpha channel, in the input element.

The RGBA components are modified by running different kinds of *functions* on these components. To do that, each component has its own element. These component elements are nested within `feComponentTransfer`. The RGBA component elements are: `feFuncR`, `feFuncG`, `feFuncB`, and `feFuncA`.

The `type` attribute is used on a component element to define the type of function you want to use to modify this component. There are currently five available function types: `identity`, `table`, `discrete`, `linear`, and `gamma`. These function types are used to modify the RGBA components (the colors and alpha channel) of a source graphic. We mentioned that you can modify one or more component at a time and that you can modify channels independently, applying a different function to each component element.

```
<feComponentTransfer>
    <!-- The RED component -->
    <feFuncR type="identity | table | discrete | linear | gamma"></feFuncR>

    <!-- The GREEN component -->
    <feFuncG type="identity | table | discrete | linear | gamma"></feFuncG>

    <!-- The BLUE component -->
    <feFuncB type="identity | table | discrete | linear | gamma"></feFuncB>

    <!-- The ALPHA component -->
    <feFuncA type="identity | table | discrete | linear | gamma"></feFuncA>
</feComponentTransfer>">
```

In the previous article, we demystified the `discrete` function and saw how it can be used to posterize images. In this article, we will start by using the `table` function to create a duotone effect similar to what you can create in Photoshop.

## Creating a Duotone Effect in Photoshop

I’m not a designer, and I don’t know my way around graphics editors like Photoshop. When I wanted to create a duotone effect in SVG, I looked for the way to create this effect in graphics editor first to see if I can replicate it using the filter operations available in SVG. As it turns out, the steps to create duotone images in SVG turned out to be same as those used in Photoshop.

The following video is a sped-up version of [this tutorial](https://www.youtube.com/watch?v=3SKii_OLrHs) I found on YouTube.

[<https://tympanus.net/codrops/wp-content/uploads/2019/01/duotone-photoshop-2230.mp4>](https://tympanus.net/codrops/wp-content/uploads/2019/01/duotone-photoshop-2230.mp4?_=1)

In the video, the designer creates the duotone effect following these steps:

1. Desaturate the image, making it grayscale.
2. Map the grayscale range into a new range that, instead of having black and white on either end, it has two different colors that you want to use in the duotone effect. In other words, you will need to create and use a *gradient map* that the grayscale is mapped to.

Let’s see how these steps can be replicated in SVG.

## Creating a Duotone Effect in SVG

To recreate this effect in SVG, we will need to desaturate the image first. This is possible using the `<feColorMatrix>` filter primitive.

Then, we need to be able to create and provide a gradient map for the browser to map the new grayscale image to.

### Converting an image to grayscale using `feColorMatrix`

Using `feColorMatrix` you can provide a color matrix that specifies the amount of red, green, and blue in your image. By providing equal amounts of these three components, we are creating a matrix that converts our image into a grayscale version of itself:

```
<svg viewBox="0 0 266 400">
    <filter id="duotone">

        <feColorMatrix type="matrix" values=".33 .33 .33 0 0
                .33 .33 .33 0 0
                .33 .33 .33 0 0
                 0   0   0  1 0">
        </feColorMatrix>

        <!-- ... -->
    </filter>
    <image xlink:href="..." width="100%" x="0" y="0" height="100%"
        filter="url(#duotone)"></image>
</svg>
```

In the following image, the image on the right is the result of applying the above filter to the image on the left:

![Screen Shot 2019-01-12 at 18.50.21](https://tympanus.net/codrops/wp-content/uploads/2019/01/Screen-Shot-2019-01-12-at-18.50.21.png?x95600)

The result (on the right) of converting the image on the left to grayscale using the `feColorMatrix` filter operation.

You can learn all about `feColorMatrix` and how to use it in [this article](https://alistapart.com/article/finessing-fecolormatrix) by Una Kravets.

Now that our image is essentially made of a gray gradient, we need to create a duotone gradient map to map the gray gradient to.

### Creating a Gradient Map using the `table` component transfer function

In SVG, to create the gradient map, we can use `feComponentTransfer` primitive with the type `table`.

In [the previous article](https://tympanus.net/codrops/2019/01/29/svg-filter-effects-poster-image-effect-with-fecomponenttransfer/), we saw how you can map the colors in an image to a list of colors that you provide in the `tableValues` attribute using the `discrete` function. The browser used our list of tableValues to generate ranges that are then used to map the colors to the values we provided.

When using the `table` function, we will also provide color values in the `tableValues` attribute. Once again, the browser will use the values we provide to map the colors in the image to them. *How* the browser will map the colors, though, is different. Instead of mapping color ranges to discrete color values, it will create a color *range* from the values we provide and then map the input range to this new range.

Suppose we want to use the following two colors for our duotone effect:

![Screen Shot 2019-01-12 at 19.05.26](https://tympanus.net/codrops/wp-content/uploads/2019/01/Screen-Shot-2019-01-12-at-19.05.26.png?x95600)

These two colors will be used to create a gradient map:

![Screen Shot 2019-01-12 at 19.11.46](https://tympanus.net/codrops/wp-content/uploads/2019/01/Screen-Shot-2019-01-12-at-19.11.46.png?x95600)

..that we are going to map our grayscale map to.

![IMG_4149](https://tympanus.net/codrops/wp-content/uploads/2019/01/IMG_4149.png?x95600)

In order to use these colors in `feComponentTransfer`, we need to get the values of the R, G, and B channels of each color. Since `tableValues` are provided in fractions, we’ll need to convert the RGB values to fractions. Color values are usually in the range [0, 255]. To convert these values to fractions, we need to divide them by 255.

For example, the pink color has the following RGB values:

```
R: 254
G: 32
B: 141
```

Converted to fractions, these values are now equal to:

```
R: 254/255 = .996078431
G: 32/255  = .125490196
B: 141/255 = .552941176
```

Similarly, the yellow color values resolve to:

```
R: .984313725
G: .941176471
B: .478431373
```

Now that we have our color values handy, it’s time to create our gradient map. We mentioned earlier that when we provide values to `tableValues` with the `table` function in use, the browser will use the tableValues to create a range. So we start by providing the RGB values of the two colors as values for the RGB component elements:

```
<feComponentTransfer color-interpolation-filters="sRGB">
    <feFuncR type="table" tableValues=".996078431  .984313725"></feFuncR>
    <feFuncG type="table" tableValues=".125490196  .941176471"></feFuncG>
    <feFuncB type="table" tableValues=".552941176  .478431373"></feFuncB>
</feComponentTransfer>
```

![Screen Shot 2019-01-12 at 19.26.35](https://tympanus.net/codrops/wp-content/uploads/2019/01/Screen-Shot-2019-01-12-at-19.26.35.png?x95600)

We saw in the previous article that when using the `discrete` function, the browser creates *n* ranges for *n* values in `tableValues`. When we use the `table` function, the browser creates *n-1* ranges for *n* values; and since we provided *two* tableValues for each component, this means that we will get *one* range ([pink, yellow]) for each.

Now `feComponentTransfer` will do its thing: The browser will go over each and every pixel in the source image. For each pixel, it will get the value of the Red, Green, and Blue components. Since our image is grayscale, the R/G/B values will be in the range [0, 1] = [black, white] (0 being fully black, 1 being fully white, and shades of gray in between). Then, the value of each component will be mapped to the new range we provided in `tableValues`. So:

* The red component value will be mapped to the range [.996078431, .984313725]
* The blue component value will be mapped to the range [.125490196, .941176471]
* The green component value will be mapped to the range [.552941176, .478431373]

So by the time the browser goes over all the pixels in the image, you will have replaced all RGB values in the grayscale gradient with the RGB values of the duotone gradient map. As a result, the image becomes duotone.

![Screen Shot 2019-01-12 at 19.40.07](https://tympanus.net/codrops/wp-content/uploads/2019/01/Screen-Shot-2019-01-12-at-19.40.07.png?x95600)

The result (on the right) of mapping the grayscale image (left) to our gradient map.

Our full code now looks like this:

```
<svg viewBox="0 0 266 400">
    <filter id="duotone">
        <!-- Grab the SourceGraphic (implicit) and convert it to grayscale -->
        <feColorMatrix type="matrix" values=".33 .33 .33 0 0
              .33 .33 .33 0 0
              .33 .33 .33 0 0
              0 0 0 1 0">
        </feColorMatrix>

        <!-- Map the grayscale result to the gradient map provided in tableValues -->
        <feComponentTransfer color-interpolation-filters="sRGB">
            <feFuncR type="table" tableValues=".996078431  .984313725"></feFuncR>
            <feFuncG type="table" tableValues=".125490196  .941176471"></feFuncG>
            <feFuncB type="table" tableValues=".552941176  .478431373"></feFuncB>
        </feComponentTransfer>
    </filter>

    <image xlink:href=".." width="100%" x="0" y="0" height="100%"
           filter="url(#duotone)"></image>
</svg>
```

And you can play with the live demo here:

See the Pen Duotone Image effect by Sara Soueidan (@SaraSoueidan) on CodePen.

You can take this further and instead of providing only two color values for the gradient map you can provide three color values in `tableValues`, creating a gradient map that has three colors instead of two.

## Controling color contrast and intensity with the `gamma` transfer function

Using the `gamma` component transfer function we are able to perform gamma correction on our source graphic. Gamma correction is the function of controlling an image’s luminance levels.

The `gamma` function has three attributes that allow you to control the gamma correction function that will be used to control the luminance: `amplitude`, `exponent` and `offset`. Combined, they make up the following transfer function:

```
C' = amplitude * pow(C, exponent) + offset
```

`gamma` can be used to control the overall contrast in an image. Increasing the exponent makes the darker areas darker while increasing the amplitude makes the lighter areas shine more. And this, in turn, increases the overall contrast of the image. The offset is used to increase the intensity of each component, and also affects the overall image: both highlights and dark areas.

Tweaking the contrast and dark and light areas of an image can sometimes be useful if you’re not getting the amount of “shine” that you’d like to see in an image.

For example, if I apply the duotone filter from the previous section to the following image, the result is not as “lively” as I’d want it to be:

![Screen Shot 2019-01-14 at 18.50.04](https://tympanus.net/codrops/wp-content/uploads/2019/01/Screen-Shot-2019-01-14-at-18.50.04.png?x95600)

The duotone image on the right looks a little pale and the colors slightly washed out. I want to add some contrast to it to make it look more lively. By increasing the `amplitude` and the `exponent` a little bit:

```
<feComponentTransfer color-interpolation-filters="sRGB">
      <feFuncR type="gamma" exponent="1.5" amplitude="1.3" offset="0"></feFuncR>
      <feFuncG type="gamma" exponent="1.5" amplitude="1.3" offset="0"></feFuncG>
      <feFuncB type="gamma" exponent="1.5" amplitude="1.3" offset="0"></feFuncB>
</feComponentTransfer>
```

I am able to make the light areas shine more and the darker areas look more intense:

![Screen Shot 2019-01-14 at 18.56.11](https://tympanus.net/codrops/wp-content/uploads/2019/01/Screen-Shot-2019-01-14-at-18.56.11.png?x95600)

Of course, this is just an example. You may prefer the paler version of the image, especially that it might look better with text on top. I think gamma correction is most useful in controlling the contrast of black-and-white images. If I apply the same gamma correction operation to the grayscale version of the image, I get a more favorable version:

![Screen Shot 2019-01-14 at 19.08.34](https://tympanus.net/codrops/wp-content/uploads/2019/01/Screen-Shot-2019-01-14-at-19.08.34.png?x95600)

Of course, you may want to do the opposite: instead of increasing contrast, you may want to lighten the dark areas a bit, in which case you’d decrease the `amplitude` and/or `exponent` values instead of increasing them. The default value for both the `amplitude` and `exponent` is 1. The default `offset` value is 0.

Play with the `gamma` function values in the following live demo to get a better feel of how it affects the brightness and contrast of an image:

See the Pen Duotone Image effect with Contrast Tweak by Sara Soueidan (@SaraSoueidan) on CodePen.

## The SVG Gradient Map Tool

[Yoksel](https://twitter.com/yoksel_en) has been playing with SVG Filters for a while and has recently created [a fantastic visual tool](https://yoksel.github.io/svg-gradient-map/#/) that allows you to upload an image and apply different duotone and even tritone effects, and that generates the SVG filter code for you ready to copy-paste anywhere you need it. It is a great tool to play with to learn more about `feComponentTransfer`.

![Screen Shot 2019-01-14 at 19.13.12](https://tympanus.net/codrops/wp-content/uploads/2019/01/Screen-Shot-2019-01-14-at-19.13.12.png?x95600)

The SVG Gradient Map Filter tool by Yoksel.

The tool even allows you to tweak the grayscale effect created using `feColorMatrix`. In our code, we used equal amounts of the R, G, and B channels to get a grayscale effect. This is one way to make an image grayscale. But there are other ways, too. For example, you could create a grayscale effect *per channel*, which would result in a different grayscale result for each:

![b7w](https://tympanus.net/codrops/wp-content/uploads/2019/01/b7w.gif?x95600)

I recommend playing with the tool a little bit and checking how your choice of effect changes the underlying code, as this is one of the best ways to learn more about SVG filters.

## Final Words

The `feComponentTransfer` primitive gives us a lot of control over the color and alpha components of images and enables us to create Photoshop-grade effects in the comfort of our code editors.

In the next article in this series, we will look at a couple more primitives that allow us to replicate yet another Photoshop effect using almost exactly the same steps as those you’d take in Photoshop, showing once again how SVG can bring the power of graphic editors into the Web platform. We’ll learn how to blend text with both the color *and* the texture of a background image, to create some eye-catching results. Stay tuned.
