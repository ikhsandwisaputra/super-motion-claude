---
source: https://tympanus.net/codrops/2019/02/19/svg-filter-effects-creating-texture-with-feturbulence/
title: "SVG Filter Effects: Creating Texture with <feTurbulence> | Codrops"
fetched: 2026-10-28
---

By [Sara Soueidan](https://tympanus.net/codrops/author/sarasoueidan/ "Posts by Sara Soueidan")
in
[Articles](https://tympanus.net/codrops/category/articles/) on
February 19, 2019

# SVG Filter Effects: Creating Texture with <feTurbulence>

Learn how you can use the powerful SVG filter primitive <feTurbulence> to create your own textures and distortion effects.

[feTurbulence](https://tympanus.net/codrops/tag/feturbulence/) [filter](https://tympanus.net/codrops/tag/filter/) [perlin-noise](https://tympanus.net/codrops/tag/perlin-noise/) [svg](https://tympanus.net/codrops/tag/svg/) [texture](https://tympanus.net/codrops/tag/texture/)

![](https://tympanus.net/codrops/wp-content/uploads/2019/02/SVGFilterEffects_feturbulance_featured.jpg?x95600)

`feTurbulence` is one of the most powerful SVG filter primitives. The specification defines this primitive as follows:

> This filter primitive creates an image using the Perlin turbulence function. It allows the synthesis of artificial textures like clouds or marble. […]
> The resulting image will fill the entire filter primitive subregion for this filter primitive.

In other words, the `feTurbulence` filter primitive generates and renders Perlin noise. This kind of noise is useful in simulating several natural phenomena like clouds, fire and smoke, and in generating complex texture like marble or granite. And like `feFlood`, `feTurbulence` **fills the filter region** with new content.

This article is part of a series on SVG Filter effects. Check out the other articles in the series:

* [SVG Filters 101](https://tympanus.net/codrops/2019/01/15/svg-filters-101/)
* [Outline Text with <feMorphology>](https://tympanus.net/codrops/2019/01/22/svg-filter-effects-outline-text-with-femorphology/)
* [Poster Image Effect with <feComponentTransfer>](https://tympanus.net/codrops/2019/01/29/svg-filter-effects-poster-image-effect-with-fecomponenttransfer/)
* [Duotone Images with <feComponentTransfer>](https://tympanus.net/codrops/2019/02/05/svg-filter-effects-duotone-images-with-fecomponenttransfer/)
* [Conforming Text to Surface Texture with <feDisplacementMap>](https://tympanus.net/codrops/2019/02/12/svg-filter-effects-conforming-text-to-surface-texture-with-fedisplacementmap/)
* Creating Texture with <feTurbulence> (this article)
* [SVG Filter Effects: Moving Forward](https://tympanus.net/codrops/2019/02/26/svg-filter-effects-moving-forward/)

In this article, we’re going to go over how we can create noise with `feTurbulence` and how that noise can be used to distort images and text, much like we did with the `feDisplacementMap` texture in [the previous article](https://tympanus.net/codrops/2019/02/12/svg-filter-effects-conforming-text-to-surface-texture-with-fedisplacementmap/). Then, we’re going to see how the generated noise can be used in combination with SVG lighting effects to create a simple rough paper texture.

But first, let’s get an overview of `feTurbulence` and its attributes and see how each one affects the generated noise.

## Creating Turbulence and Fractal Noise with `feTurbulence`

When I set out to write this series, I made the decision to avoid the gnarly technical details behind filter primitives as much as possible. This is why we won’t get into the technical details behind the functions used to generate [Perlin noise](https://en.wikipedia.org/wiki/Perlin_noise).

After reading up on the function underlying noise generation, I found that it didn’t help me at all when I put the primitive into experimentation. After all, we *are* working with a random noise generator here. So, most of the times, you’ll find that generating texture will be a matter of experimenting and tweaking until you get the desired result. With time, it gets a little easier to predict what a texture *might* look like.

I’ve found that playing with `feTurbulence` and tweaking its attributes *visually* was the best way to learn about them and has helped me understand what each of the attributes does. So, we will be taking a visual approach to understanding `feTurbulence`, with a few interactive demos to help.

Now, `feTurbulence` generates noise using the [Perlin Turbulence function](https://en.wikipedia.org/wiki/Perlin_noise). It has 5 main attributes that control the function and therefore the visual result of that function:

* `type`
* `baseFrequency`
* `numOctaves`
* `seed`
* `stitchTiles`

We’ll go over how each of these attributes affects the visual result without going into the technical details of the function. You’ll find that, most of the times, you’ll only need to worry about three of these attributes: `type`, `baseFrequency` and `numOctaves`.

### `baseFrequency`

In order to generate noise, only the `baseFrequency` attribute is required. The `baseFrequency` affects the size (or scale) and the grain of the generated noise.

`baseFrequency`’s effect is best understood when it is visualized and animated. That’s why I created the following live demo. Using the slider, you can change the value of the base frequency used and see how it affects the generated noise in real-time. You’ll notice that as you increase or decrease the value of the `baseFrequency` attribute, the generated pattern **remains intact as it becomes smaller or larger**, respectively, and **looks like it’s zooming in and out of its origin at the top left corner**.

See the Pen feTurbluence: baseFrequency by Sara Soueidan (@SaraSoueidan) on CodePen.

Lower `baseFrequency` values (such as 0.001) generate larger patterns, while higher values (0.5+) produce smaller patterns. The values start from 0 (no frequency == no pattern) and up. Negative values are not allowed. [as Michael Mullany mentions](https://www.creativebloq.com/netmag/how-go-beyond-basics-svg-filters-71412280), “*values in the 0.02 to 0.2 range are useful starting points for most textures.*”

Note that the noise generated does not have a background color. Meaning that, if you remove the white background color on the SVG, you’ll be able to see the dark body’s background through the noise.

The `baseFrequency` attribute also accepts two values. When you provide two values, the first one will be used for the base frequency on the x-axis and the second one will correspond to the y-axis. By providing two different values, you can generate vertical or horizontal noise that can be used to achieve some fantastic effects, as we’re going to see in a following section.

Play with the values of the `baseFrequency` again in this live demo and notice how it changes along the X and Y axes as you give it different values. The demo starts with a nice horizontal noise. The 0.01 x-baseFrequency value is relatively small, which makes the horizontal pattern larger (like it’s stretched out). If you decrease it further (to 0.001, for example), you’ll see the horizontal pattern become more like lines. Try it.

See the Pen feTurbluence: x & y baseFrequency by Sara Soueidan (@SaraSoueidan) on CodePen.

### `type`

As its name suggests, the `type` attribute is used to specify the type of noise generated by `feTurbulence`. There are two types available:

* `turbulence`, which is the default value, and
* `fractalNoise`.

`fractalNoise` generates a more cloudy and smooth pattern and is a suitable base for creating gas-base textures like clouds. `turbulence` generates more lines that simulate ripples and are thus suitable as a base for liquid textures.

![Screen Shot 2019-01-20 at 16.55.25](https://tympanus.net/codrops/wp-content/uploads/2019/01/Screen-Shot-2019-01-20-at-16.55.25.png?x95600)

turbulence type noise on the left, and fractalNoise type on the right.

Change the value of the `type` attribute in the following demo to see how the generated pattern changes:

See the Pen feTurbluence: stitchTiles by Sara Soueidan (@SaraSoueidan) on CodePen.

### `numOctaves`

`numOctaves` is short for the “number of octaves”, which represent the level of detail in a noise.

In music, an octave is the difference in pitch between two notes where one has twice the frequency of the other. So the higher the octaves, the higher the frequency. In `feTurbulence`, the higher the number of octaves, the more detail you can see in the noise it generates. By default, the generated noise has one octave, which means that the default value for the `numOctaves` attribute is 1.

Drag the slider in the following demo to see the effect of increasing the number of octaves on the generated texture:

See the Pen feTurbluence: numOctaves by Sara Soueidan (@SaraSoueidan) on CodePen.

You’ll notice that starting from `numOctaves="5"` the effect of adding more octaves becomes practically unnoticeable.

### `seed`

The `seed`, as [defined in the specification](https://www.w3.org/TR/filter-effects-1/#feTurbulenceElement), is *“the starting number for the pseudo random number generator”*. In other words, it provides a different starting number for the random function used to generated our random noise.

Visually, you’ll see that it affects where and how the “ripple lines” are generated. It is also better understood when you see how it affects the noise generated in two adjacent rectangles.

When the same `seed` is used for the two adjacent rectangles, the function used to generate the noise across the two rectangles is **continuous**, and this will be reflected visually by the continuity of the “ripple lines” across the edges of the two rectangles.

![Group](https://tympanus.net/codrops/wp-content/uploads/2019/01/Group.png?x95600)

The continuity of the function generating the random noise can be seen along the edges of the two rectangles using the same `seed` value.

Play with the value of the `seed` attribute in the following demo, see how it affects the generated noise, and notice how the noise is continuous across the edges of the two rectangles that are using the same `seed` value.

See the Pen feTurbluence: seed by Sara Soueidan (@SaraSoueidan) on CodePen.

### `stitchTiles`

`stitchTiles` can be used to create a stitching effect between “tiles” of noise. The effect of this attribute is very similar to that of the `seed`, meaning that it is most evident when you have two adjacent areas (or “tiles”) of noise.

As the specification mentions, sometimes the result of the noise generation will show clear discontinuities at the tile borders. You can tell the browser to try to smooth the results out so that the two tiles appear to be “stitched” together. (I really like how the attribute and its effect are compared to *stitching*.)

By default, no attempt is made to achieve smooth transitions at the border of tiles which contain a turbulence function because the default value for `stitchTiles` is `noStitch`. If you want to create that stitching effect, you can change the value to `stitch`.

In order to compare the result of `stitchTiles` to that of `seed`, I have applied the same `seed` value to the noise generated in the two rectangles in the following demo. You can already see that the noise appears to be continuous between the two. Switch the `stitchTiles` option “on” (by changing its value to `stitch`) to see how the noise changes to accommodate across the edges.

See the Pen feTurbluence: stitchTiles by Sara Soueidan (@SaraSoueidan) on CodePen.

As I mentioned earlier, the only three attributes you’ll most likely be using are `type`, `baseFrequency` and `numOctaves`. So we’ll be focusing on these three moving forward.

## Using `feTurbulence`-Generated Noise to Distort Content

*This* is where the fun starts. And this is where we start putting the generated noise to use. After all, just filling the filter region with the noise has no use in and of itself.

In the [previous article](https://tympanus.net/codrops/2019/02/12/svg-filter-effects-conforming-text-to-surface-texture-with-fedisplacementmap/) we used `feDisplacementMap` to conform a piece of text to the texture in an external image. And we mentioned that `feDisplacementMap` uses the color information in one image to distort another. The image that is used as a displacement map can be *any* image. This means that it can be an external image or an image generated within SVG, such as a gradient image or a pattern… or a noise texture.

In other words, the noise we generate with `feTurbulence` can as well be used to distort content if it is used with `feDisplacementMap`. In the following demo, we used the output of `feTurbulence` to displace the image with `feDisplacementMap`. I’m using a horizontal noise pattern by providing two different values for the `baseFrequency` attribute similar to what we did earlier.

```
<svg viewBox="0 0 180 100">
    <filter id="noise" x="0%" y="0%" width="100%" height="100%">
        <feTurbulence baseFrequency="0.01 0.4" result="NOISE" numOctaves="2" />
        <feDisplacementMap in="SourceGraphic" in2="NOISE" scale="20" xChannelSelector="R" yChannelSelector="R"></feDisplacementMap>
    </filter>

    <image xlink:href="..." x="0" y="0" width="100%" height="100%" filter="url(#noise)"></image>
</svg>
```

See the Pen feTurbluence as a displacementMap by Sara Soueidan (@SaraSoueidan) on CodePen.

The intensity by which the turbulence distorts the image is specified in the `scale` attribute on `feDisplacementMap`. I’ve used a large value so that the effect looks more dramatic.

Now, going from this simple application, we can open a lot more possibilities when we combine the facts that:

* SVG filters can be applied to HTML content, and
* the values of `baseFrequency` are *numbers* and can thus be animated..

A little less than a couple of years ago, [Adrien Denat](https://tympanus.net/codrops/author/grsmto/) wrote [an article right here on Codrops](https://tympanus.net/codrops/2016/05/11/distorted-button-effects-with-svg-filters/) in which he experimented with a similar effect applied to HTML `button`s. We’re going to break down and recreate the following button click effect:

![b7w](https://tympanus.net/codrops/wp-content/uploads/2019/01/b7w-1.gif?x95600)

We’re going to start by creating the noise texture. We’re going to start with the final state—the state where the button is distorted, and then, once we’ve got that, we’re going to animate the initial state of the button to that distorted state and back on click.

Our aim here is to distort the button horizontally. So we will be using and tweaking the horizontal noise from the previous demo a little bit. Its distortion effect on the image is a little too strong, so I’m going to dial it down first by changing the turbulence value from `0.01 0.4` to `0 0.2`:

```
<filter id='noise' x='0%' y='0%' width='100%' height='100%'>
        <feTurbulence type="turbulence" baseFrequency="0 0.2" result="NOISE" numOctaves="2" />
        <feDisplacementMap in="SourceGraphic" in2="NOISE" scale="30" xChannelSelector="R" yChannelSelector="R"></feDisplacementMap>
</filter>
```

The effect gets a little better, but the button is still distorted more than we’d like it to:

![Screen Shot 2019-01-21 at 10.40.52](https://tympanus.net/codrops/wp-content/uploads/2019/01/Screen-Shot-2019-01-21-at-10.40.52.png?x95600)

We want the distortion to be less dramatic. A useful tip to keep in mind is that **we can dial the effect of the noise down instantly by switching the type of noise from the default `turbulence` to the smoother `fractalNoise`.** As soon we do that, we can see that the distortion effect has also been “smoothed” down:

![Screen Shot 2019-01-21 at 10.44.20](https://tympanus.net/codrops/wp-content/uploads/2019/01/Screen-Shot-2019-01-21-at-10.44.20.png?x95600)

This looks much better.

Now that we’ve got a distortion effect we’re happy with, we will start our demo with a filter that, initially, does practically nothing:

```
<filter id='noise' x='0%' y='0%' width='100%' height='100%'>
        <feTurbulence type="fractalNoise" baseFrequency="0 0.000001" result="NOISE" numOctaves="2" />
        <feDisplacementMap in="SourceGraphic" in2="NOISE" scale="30" xChannelSelector="R" yChannelSelector="R"></feDisplacementMap>
</filter>
```

We’re going to apply that filter to our `button` in CSS:

```
button {
    -webkit-filter: url(#noise);
            filter: url(#noise);
}
```

At this point, the button still looks un-distorted.

Next, we’re going to use (a slightly modified version of) Adrien’s code which uses [GSAP to animate the value inside `feTurbulence`’s `baseFrequency` to `0 0.2` and back on click:](https://greensock.com)

```
var bt = document.querySelectorAll('.button')[0],
	turbVal = { val: 0.000001 },
	turb = document.querySelectorAll('#noise feTurbulence')[0],

	btTl = new TimelineLite({ paused: true, onUpdate: function() {
  turb.setAttribute('baseFrequency', '0 ' + turbVal.val);
} });

btTl.to(turbVal, 0.2, { val: 0.2 })
    .to(turbVal, 0.2, { val: 0.000001 });

bt.addEventListener('click', function() {
  btTl.restart();
});
```

And that’s all there is to it, really. You can play with the live demo here:

[See the Pen feTurbluence on BUTTONs by Sara Soueidan (@SaraSoueidan) on CodePen.](https://greensock.com)

The demo works in Chrome and Firefox at the time of writing of this article. It is buggy in the current version of Safari but the issue is resolved in the next version, as the Safari Tech Preview shows the demo works perfectly. It doesn’t work in MS Edge, though, *but* the button isn’t distorted at all which means that the lack of support does not affect the usability of the button. This is great because **you can still use this effect as an enhancement.**If the effect isn’t supported, the button will simply look and behave like a normal, effect-less button. Adrien’s article includes quite [a few more button distortion effects](https://tympanus.net/Development/DistortedButtonEffects/) that use the same principles we’ve just covered that are definitely worth checking out and breaking down. There are one or two nice tricks to learn from each.

### Squiggly Text using `feTurbulence`

One of my favorite examples of `feTurbulence` in action is Lucas Bebber’s [Squiggly Text](https://codepen.io/lbebber/pen/KwGEQv) effect. In his demo, Lucas is using multiple `feTurbulence` functions:

```
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
    <defs>
        <filter id="squiggly-0">
            <feTurbulence id="turbulence" baseFrequency="0.02" numOctaves="3" result="noise" seed="0" />
            <feDisplacementMap id="displacement" in="SourceGraphic" in2="noise" scale="6" />
        </filter>
        <filter id="squiggly-1">
            <feTurbulence id="turbulence" baseFrequency="0.02" numOctaves="3" result="noise" seed="1" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" />
        </filter>

        <filter id="squiggly-2">
            <feTurbulence id="turbulence" baseFrequency="0.02" numOctaves="3" result="noise" seed="2" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" />
        </filter>
        <filter id="squiggly-3">
            <feTurbulence id="turbulence" baseFrequency="0.02" numOctaves="3" result="noise" seed="3" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" />
        </filter>

        <filter id="squiggly-4">
            <feTurbulence id="turbulence" baseFrequency="0.02" numOctaves="3" result="noise" seed="4" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" />
        </filter>
    </defs>
</svg>
```

..and applying them via CSS to a piece of HTML text using CSS animations, animating from one to another:

```
@keyframes squiggly-anim {
  0% {
    -webkit-filter: url("#squiggly-0");
            filter: url("#squiggly-0");
  }
  25% {
    -webkit-filter: url("#squiggly-1");
            filter: url("#squiggly-1");
  }
  50% {
    -webkit-filter: url("#squiggly-2");
            filter: url("#squiggly-2");
  }
  75% {
    -webkit-filter: url("#squiggly-3");
            filter: url("#squiggly-3");
  }
  100% {
    -webkit-filter: url("#squiggly-4");
            filter: url("#squiggly-4");
  }
}
```

..thus creating the squiggly effect.

Once again, the text used is real, which means that it is searchable, selectable, accessible and editable (using the `contenteditable` attribute). [Check the live demo out](https://codepen.io/lbebber/pen/KwGEQv?editors=1100), but beware that this demo is resource-intensive, so you may want to avoid opening the Codepen on mobile.

![An animated screenshot of Lucas’s squiggly text demo.](https://tympanus.net/codrops/wp-content/uploads/2019/02/b7w.gif?x95600)

---

So, some **useful takeaways** from this section are:

* The noise generated using `feTurbulence` can be used to distort both SVG and HTML content.
* The value of `baseFrequency` can be animated.
* You can dial the amount of distortion down by tweaking the values in `baseFrequency` *and* by smoothing the noise out with the `fractalNoise` type.
* Even though you can animate SVG filters in general, it’s usually recommended to not overdo it because they can be quite resource-intensive. Try to keep the animations limited to smaller areas; the larger the animated area, the more resource-consuming it will be.

`feTurbulence` is rarely—if ever—useful when used alone. It is pretty much always used by (an)other filter primitive(s) to achieve particular effects. In this section, we used it as a displacement map in `feDisplacementMap`. Let’s see what more we can do with it.

## Simulating Natural Texture with `feTurbulence`

Another useful way `feTurbulence`-generated noise can be used is to **simulate natural texture**. If you’ve ever used the noise generation plugins in After Effects, you may have already come across this functionality and examples of doing so.

![Screen Shot 2019-01-21 at 11.09.05](https://tympanus.net/codrops/wp-content/uploads/2019/01/Screen-Shot-2019-01-21-at-11.09.05.png?x95600)

Examples of textures created in After Effects using the Fractal Noise plug-in. [(Source)](https://library.creativecow.net/articles/zwar_chris/fractal_noise.php)

`feTurbulence` generates noise (random values) across each of the R, G, B, and A components. You can tweak the values for each of these components to get different variations of the noise. In order to simulate a texture, we usually need to do exactly that: tweak the R/G/B/A components (canceling out components, saturating others, etc.) to get our desired result. Other times, all we need to do is shed some light on it. Literally.

In this section, we’re going to break down a [rough paper texture effect created by Michael Mullany](https://www.creativebloq.com/netmag/how-go-beyond-basics-svg-filters-71412280). In order to create this texture, we will need to shine a light on a noise texture generated by `feTurbulence` using SVG’s lighting sources.

### Lighting Sources in SVG

SVG conveniently provides a few primitives that can be used to shine a light on objects or images.

There are two filter primitives that are used to specify **the type of light** you want:

* `feDiffuseLighting` which indicates indirect light from an outside source, and is best used for sunlight effects, and
* `feSpecularLighting` which specifies secondary light that bounced from reflective surfaces.

Both primitives shine a light on an object or image by **using the alpha channel of that image as a bump map**. Transparent values remain flat, while opaque values rise to form peaks that are illuminated more prominently.

In other words, a light source filter uses an input’s alpha channel to provide depth information: higher opacity areas are raised toward the viewer and lower opacity areas recede away from the viewer. This means that the alpha value of a pixel in the input is used as the height of that pixel in the z-dimension, and the filter uses that height to calculate a virtual surface, which will reflect a particular amount of light from the light source. (This is pretty powerful stuff!)

Both types of light accept an attribute called `surfaceScale` which is practically a z-index multiplier. If you increase this value, the “slopes” in the surface texture become steeper.

> “Because `feTurbulence` generates an alpha channel full of noisy values from 0 to 1, it produces a nice variable Z terrain that creates highlights when we shine our light on it.” —Michael Mullany

After deciding on the *type* of light you need, you’ll want to choose a light *source*.

There are **three kinds of light sources** in SVG:

1. `feDistantLight`: this represents a distant light source which is arbitrarily far away, and so is specified in terms of its angle from the target. This is the most appropriate way to represent sunlight.
2. `fePointLight`: this represents a point light that emanates from a specific point that is represented as a three-dimensional x/y/z coordinate. This is similar to a light source inside a room or within a scene.
3. `feSpotLight`: this represents a spotlight and which behaves much like a point light, but its beam can be narrowed to a cone, and the light can pivot to other targets.

Each of these three light sources comes with its own attributes that are used to customize the light it generates by specifying the location of the source in the 3D-space. The attributes are outside the scope of this article, but you can learn more about them [in the specification](https://www.w3.org/TR/filter-effects-1/#LightSourceDefinitions).

To create and apply a lighting effect, you need to **nest the light source inside the light type**. So, you start by choosing the *type* of light you want and then picking the *source* you want it to emanate from. And then finally you need to specify the *color* of your light. The `lighting-color` property is used to define the color of the light source for `feDiffuseLighting` and `feSpecularLighting`.

With the basics of lighting sources covered, we’ll now get to our example.

For the rough paper texture, we’ll be using sun-like light. This means that we will use a white diffuse lighting that emanates from a distant source. Translated to code, our light looks like this:

```
<feDiffuseLighting lighting-color="white" surfaceScale="2" in=".." result="..">
    <feDistantLight azimuth="45" elevation="60" />
</feDiffuseLighting>
```

The `azimuth` and `elevation` attributes determine the position of the source of light in 3D space. There’s [an article by Rafael Pons](https://www.photopills.com/articles/understanding-azimuth-and-elevation) that is absolutely fantastic at explaining these two concepts in a simple, easy-to-understand manner, along with beautiful and friendly illustrations to assist with his explanation. I highly recommend checking it out.

Now that we have a light set up, we want to generate our noise that we want to shine this light on. We’ll break the demo down into steps to learn how it’s made.

We gotta start *somewhere*, so we’ll start by generating a random, basic noise as a base for our texture:

```
<feTurbulence baseFrequency='0.04' result='noise' />
```

Our noise looks like this:

![Screen Shot 2019-01-21 at 14.33.33](https://tympanus.net/codrops/wp-content/uploads/2019/01/Screen-Shot-2019-01-21-at-14.33.33.png?x95600)

Next, we’ll shine our light onto it and then take it from there:

```
<feTurbulence baseFrequency='0.04' result='noise' />

<feDiffuseLighting in='noise' lighting-color='white' surfaceScale='2'>
      <feDistantLight azimuth='45' elevation='60' />
</feDiffuseLighting>
```

Shining the light on our noise gives us the following texture:

![Screen Shot 2019-01-21 at 14.35.48](https://tympanus.net/codrops/wp-content/uploads/2019/01/Screen-Shot-2019-01-21-at-14.35.48.png?x95600)

This isn’t the texture result we’re after just yet. The first thing we notice here is the presence of a lot of sharp lines in the texture. We want to get rid of these because a paper surface does not have sharp lines in it. We need to smooth these lines out. We can do that by changing the type of the generated noise to `fractalNoise`:

```
<feTurbulence type="fractalNoise" baseFrequency='0.04' result='noise' />

<feDiffuseLighting in='noise' lighting-color='white' surfaceScale='2'>
      <feDistantLight azimuth='45' elevation='60' />
</feDiffuseLighting>
```

This removes all those sharp lined edges from our texture:

![Screen Shot 2019-01-21 at 14.37.59](https://tympanus.net/codrops/wp-content/uploads/2019/01/Screen-Shot-2019-01-21-at-14.37.59.png?x95600)

We’re now one step closer to our rough paper texture.

The above texture isn’t *rough* enough, though. It lacks the necessary “roughness”. Increasing the amount of tiny detail in it should make it look rougher. To do that, we will increase the value of `numOctaves`. We’ll find that around 5 is a great place to get the level of roughness we need:

```
<feTurbulence type="fractalNoise" baseFrequency='0.04' numOctaves="5" result='noise' />

<feDiffuseLighting in='noise' lighting-color='white' surfaceScale='2'>
      <feDistantLight azimuth='45' elevation='60' />
</feDiffuseLighting>
```

And our paper texture now looks like this:

![Screen Shot 2019-01-21 at 14.40.32](https://tympanus.net/codrops/wp-content/uploads/2019/01/Screen-Shot-2019-01-21-at-14.40.32.png?x95600)

Excellent!

You can play with the live demo here:

See the Pen Rough Paper Texture with SVG Filters by Sara Soueidan (@SaraSoueidan) on CodePen.

The demo works across all major browsers, including MSEdge.

If you want, you can tweak the effect a little further by playing with the source and distance of the light. For example, decreasing the elevation of the light source from 60 to 40 should increase the contrast between the small hills in the texture. The texture would then look more like this:

![Screen Shot 2019-01-21 at 14.42.28](https://tympanus.net/codrops/wp-content/uploads/2019/01/Screen-Shot-2019-01-21-at-14.42.28.png?x95600)

I highly recommend playing with the values of the attributes of the light source and the noise and seeing how they impact the resulting texture.

## Final Words

`feTurbulence` is one of SVG’s most interesting and powerful operations. Combined with other primitives and animated, it is capable of generating some really interesting and appealing effects, textures, and interactions.

I strongly believe that `feTurbulence` is one of those filters that you’d want to experiment with and break other people’s code down to learn more about it. I still find myself guessing how a texture would look like a lot of times. And since there’s so much we can do with only one texture when used by other primitives, there’s an almost countless set of possible effects that you can make with it. I highly encourage you to check out other people’s work and breaking it down to learn more.

Yoksel has been [experimenting with SVG filters on Codepen](https://codepen.io/yoksel/pens/public/) since [my SVG Filters talk](https://www.sarasoueidan.com/blog/svg-filters/) came out a few months ago. So you can find quite a bunch of effects to break down and learn from on her Codepen profile.

![An animated screenshot of one of Yoksel‘s feTurbulence codepen demos.](https://tympanus.net/codrops/wp-content/uploads/2019/02/svg-filters-love.gif?x95600)

One of Yoksel’s latest SVG filter experiments leveraging `feTurbulence`: SVG Filters are ?

I hope that this article has inspired you and opened a new door in your imagination to see what you can do with SVG Filters. In the last article in this series, I’ll be sharing some further resources and tools to help you move forward with SVG filters and to start making your own experiments. Stay tuned.
