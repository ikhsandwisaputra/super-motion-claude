---
source: https://tympanus.net/codrops/2015/03/10/creative-gooey-effects/
title: "Creative Gooey Effects | Codrops"
fetched: 2026-10-28
---

By [Lucas Bebber](https://tympanus.net/codrops/author/lucasbebber/ "Posts by Lucas Bebber")
in
[Playground](https://tympanus.net/codrops/category/playground/) on
March 10, 2015

# Creative Gooey Effects

A set of examples that use a gooey SVG filter for creating a variety of different effects for all kinds of website components.

[filter](https://tympanus.net/codrops/tag/filter/) [gooey](https://tympanus.net/codrops/tag/gooey/) [menu](https://tympanus.net/codrops/tag/menu/) [svg](https://tympanus.net/codrops/tag/svg/)

[![](https://tympanus.net/codrops/wp-content/uploads/2015/03/CreativeGooeyEffects1.jpg?x95600)](http://tympanus.net/Development/CreativeGooeyEffects/ "Creative Gooey Effects Demo")

[Demo](http://tympanus.net/Development/CreativeGooeyEffects/)
[Code](https://github.com/codrops/CreativeGooeyEffects)

Today we are going to show how to use SVG Filters to apply a gooey-like effect to HTML elements. We’ll first cover some basics of the technique and then we’ll demonstrate several creative use cases for common website elements, like menus, apps, selections, paginations and more.

Please note that this effect is experimental and is only supported by modern browsers.

Let’s first dive into SVG Filters and understand how to apply them.

## SVG Filters

With [SVG Filters](http://www.w3.org/TR/SVG/filters.html) we can modify a given source graphic with an operation (or more) and create an altered result. Every filter element in SVG contains a set of *filter primitives* that do some kind of graphical operation. The available SVG filter primitives are the following:

* feBlend
* feColorMatrix
* feComponentTransfer
* feComposite
* feConvolveMatrix
* feDiffuseLighting
* feDisplacementMap
* feFlood
* feGaussianBlur
* feImage
* feMerge
* feMorphology
* feOffset
* feSpecularLighting
* feTile
* feTurbulence
* feDistantLight
* fePointLight
* feSpotLight

![CreativeGooeyEffects_Filter](http://tympanus.net/codrops/wp-content/uploads/2015/03/CreativeGooeyEffects_Filter.png?x95600)

When applying a filter, we can use the result of the operation as an input to another filter, creating an inifinite range of possibilities for effects. That’s what makes filters really powerful.

A common example for a SVG filter is the blur effect with **<feGaussianBlur>**:

```
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="600" height="400">
	<defs>
		<filter id="blur" x="0" y="0">
			<feGaussianBlur in="SourceGraphic" stdDeviation="5" />
		</filter>
	</defs>
	<rect x="50" y="50" width="500" height="300" fill="#8d81ac" filter="url(#blur)" />
</svg>
```

The result looks as follows:

![CreativeGooeyEffects_Blur](http://tympanus.net/codrops/wp-content/uploads/2015/03/CreativeGooeyEffects_Blur.png?x95600)

The `in` attribute defines the input for the given filter primitive. Here we can use one of the following keywords:

* SourceGraphic
* SourceAlpha
* BackgroundImage
* BackgroundAlpha
* FillPaint
* StrokePaint

We can also use a string here which references a previous `result` attribute. The `result` attribute gives us the possibility to make the result of a filter operation available as input to another filter using `in`. For our Gooey examples we will be using this.

A more complex example that shows how multiple filter primitives can be used in combination to achieve one desired effect is the drop shadow:

```
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="600" height="400">
  <defs>
	<filter id="dropshadow" x="0" y="0" width="200%" height="200%">
		<feOffset result="offsetResult" in="SourceAlpha" dx="20" dy="20" />
		<feGaussianBlur result="blurResult" in="offsetResult" stdDeviation="5" />
		<feBlend in="SourceGraphic" in2="blurResult" mode="normal" />
	</filter>
  </defs>
  <rect width="500" height="300" fill="#8d81ac" filter="url(#dropshadow)" />
</svg>
```

The result looks as follows:

![CreativeGooeyEffects_DropShadow](http://tympanus.net/codrops/wp-content/uploads/2015/03/CreativeGooeyEffects_DropShadow.png?x95600)

The concept here is that we first offset the element and then blur that offset “copy”. With the blend primitive, we simply set the original element on top of the blurred result. Using `in="SourceAlpha"`, which is the alpha channel of the source graphic, actually makes the blurred result black. If we’d, for example, use `in="SourceGraphic"`, the “shadow” would have the color of the source element.

*Tiny break:* Want to get website inspiration? **[Check out our Webzibition](https://tympanus.net/codrops/news/) and see whats trending.**

### SVG Filters for HTML

Applying SVG Filters to HTML elements is pretty straightforward. First, we define our filter somewhere in the HTML and then we can use it in our stylesheet as follows:

```
.filterClass {
	-webkit-filter: url("#goo");
	filter: url("../index.html#goo");
}
```

The reason why we define the path differently for the non-webkit property is Firefox and the way it references the filter. Being a relative path, if we’d only use #goo, it would refer to it’s stylesheet instead of the HTML it is used in and there no filter will be found. Using inline styles or referencing to it the way we do it, solves that problem. We can also add filter effects with JavaScript:

```
function setFilter(value){
	$effectContainer.css({
		webkitFilter: value,
		filter: value,
	});
}
```

Where *value* would be something like ‘url(#goo)’.

Support for SVG Filters on HTML elements is currently [pretty good](http://caniuse.com/#feat=svg-html).

The following are some great resources for learning more about and experimenting with SVG Filters:

* [Applying SVG effects to HTML content](https://developer.mozilla.org/en-US/docs/Applying_SVG_effects_to_HTML_content)
* [Hands On: SVG Filter Effects](http://ie.microsoft.com/testdrive/graphics/hands-on-css3/hands-on_svg-filter-effects.htm)
* [Cross-browser filters with CSS and SVG](http://www.broken-links.com/2013/11/20/cross-browser-filters-css-svg/)
* [Smarter SVG filters](https://docs.webplatform.org/wiki/svg/tutorials/smarter_svg_filters)
* [How to go beyond the basics with SVG filters](http://www.creativebloq.com/netmag/how-go-beyond-basics-svg-filters-71412280)

## Applying the Gooey Filter

Let’s take a look at one of the demos to see how it works in practice:

[![GooeyEffectMenu](http://tympanus.net/codrops/wp-content/uploads/2015/03/GooeyEffectMenu.gif?x95600)](http://tympanus.net/Tutorials/CreativeGooeyEffects/menu.html)

The markup for this example looks as follows:

```
<div class="menu">
	<div class="menu-wrapper">
		<ul class="menu-items">
			<li class="menu-item">
				<button class="menu-item-button">
					<i class="menu-item-icon icon icon-reply"></i>
				</button>
				<div class="menu-item-bounce"></div>
			</li>
			<li class="menu-item">
				<button class="menu-item-button">
					<i class="menu-item-icon icon icon-box"></i>
				</button>
				<div class="menu-item-bounce"></div>
			</li>
			<li class="menu-item">
				<button class="menu-item-button">
					<i class="menu-item-icon icon icon-trash"></i>
				</button>
				<div class="menu-item-bounce"></div>
			</li>
		</ul>
		<button class="menu-toggle-button">
			<i class="fa fa-plus menu-toggle-icon"></i>
		</button>
	</div>
</div>
```

We also define the filter inside an SVG object which we will place in our HTML:

```
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <defs>
    <filter id="goo">
      <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
      <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
      <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
    </filter>
  </defs>
</svg>
```

Next, we use the `filter` CSS property like described before in order to apply the filter to the container of the elements we want to stick together:

```
.menu {
	/* other styles */

	-webkit-filter: url("#goo");
	filter: url("../menu.html#goo");
}
```

Now, let’s break down the filter. The first operation done by the filter is to blur the object, through the `feGaussianBlur` filter.

![article-step1-blur](http://tympanus.net/codrops/wp-content/uploads/2015/03/article-step1-blur.gif?x95600)

The next operation is a `feColorMatrix` filter. It is used in this case to increase the contrast of the alpha channel, which, combined with the blur, creates that blob effect:

![article-step2-contrast](http://tympanus.net/codrops/wp-content/uploads/2015/03/article-step2-contrast.gif?x95600)

Learn more about how to apply a color matrix [here](https://docs.webplatform.org/wiki/svg/elements/feColorMatrix).

Finally, to make the contents visible, we draw the original graphics of the object over the effect we just made, using it as a mask as well. To achieve that, we use the `feComposite` filter with the `atop` operator:

![article-step3-content](http://tympanus.net/codrops/wp-content/uploads/2015/03/article-step3-content.gif?x95600)

And we’re done! Please be aware that this filter can be quite resource intensive, so you should refrain from applying it to large areas.

## Examples

The following demos will show some creative ways of using Gooey effects on all kinds of components:

* [Chat Application](http://tympanus.net/Development/CreativeGooeyEffects/index.html)
* [Menu](http://tympanus.net/Development/CreativeGooeyEffects/menu.html)
* [Pagination](http://tympanus.net/Development/CreativeGooeyEffects/pagination.html)
* [Element Selection](http://tympanus.net/Development/CreativeGooeyEffects/select.html)
* [Loader](http://tympanus.net/Development/CreativeGooeyEffects/send.html)
* [Share Button](http://tympanus.net/Development/CreativeGooeyEffects/share.html)
* [Music Visualizer](http://tympanus.net/Development/CreativeGooeyEffects/player.html)

We hope you find these examples inspiring!
