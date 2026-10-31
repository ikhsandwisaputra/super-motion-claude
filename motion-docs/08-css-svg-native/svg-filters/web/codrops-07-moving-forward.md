---
source: https://tympanus.net/codrops/2019/02/26/svg-filter-effects-moving-forward/
title: "SVG Filter Effects: Moving Forward | Codrops"
fetched: 2026-10-28
---

By [Sara Soueidan](https://tympanus.net/codrops/author/sarasoueidan/ "Posts by Sara Soueidan")
in
[Articles](https://tympanus.net/codrops/category/articles/) on
February 26, 2019

# SVG Filter Effects: Moving Forward

In this last article of our SVG Filter Effects series, we share a list of useful resources to learn more about SVG Filters.

[filter](https://tympanus.net/codrops/tag/filter/) [svg](https://tympanus.net/codrops/tag/svg/)

![](https://tympanus.net/codrops/wp-content/uploads/2019/02/SVGFilterEffectLearning_featured.jpg?x95600)

Over the course of six weeks, we published six articles that covered a variety of SVG Filter effects and the filter primitives used to create them:

1. [SVG Filters 101](https://tympanus.net/codrops/2019/01/15/svg-filters-101/)— in which we covered the basics for getting started with SVG filters.
2. In the second article, [Outline Text with <feMorphology>](https://tympanus.net/codrops/2019/01/22/svg-filter-effects-outline-text-with-femorphology/), we learned about `feMorphology` and how it can be used to shrink and expand content. We saw how we can use it co create text outlines and paint-like image effects.
3. The third article, [Poster Image Effect with <feComponentTransfer>](https://tympanus.net/codrops/2019/01/29/svg-filter-effects-poster-image-effect-with-fecomponenttransfer/) was our first step into the world of `feComponentTransfer`. We learned how we can use it to create poster image effects.
4. In the fourth article, [Duotone Images with <feComponentTransfer>](https://tympanus.net/codrops/2019/02/05/svg-filter-effects-duotone-images-with-fecomponenttransfer/) we dug further into `feComponentTransfer`. We learned how to use it to recreate Photoshop’s duotone effects by creating gradient maps and applying them to images.
5. In the fifth article, [Conforming Text to Surface Texture with <feDisplacementMap>](https://tympanus.net/codrops/2019/02/12/svg-filter-effects-conforming-text-to-surface-texture-with-fedisplacementmap/) we recreated another Photoshop-grade effect and learned how to conform text to surface texture. We saw how the steps to recreate Photoshop effects are very similar in SVG.
6. And in the sixth article, [Creating Texture with <feTurbulence>](https://tympanus.net/codrops/2019/02/19/svg-filter-effects-creating-texture-with-feturbulence/) we learned how to generate our own textures using SVG’s `feTurbulence` primitive. We learned how to use it to distort HTML and SVG content, as well as simulate natural texture by combining it with SVG’s lighting effects. All pretty powerful stuff.

Even though we covered a lot of areas, I can confidently say that **we barely scratched the surface of what’s possible with SVG Filters**. In this short follow-up article, I want to share some of my favorite resources to learn more about SVG Filters.

## Moving Forward: SVG Filter Learning Resources and Experiments

* To get an even broader idea of the incredible possibilities that SVG Filters bring to the Web, I highly recommend checking out [Lucas Bebber’s Codepen profile](https://codepen.io/lbebber/pens/popular/2/). Lucas is the guy who created [the famous Gooey Effect](https://codepen.io/lbebber/pen/LELBEo) using SVG Filters. His experiments include even more impressive effects that are guaranteed to inspire you and get you excited about the possibilities that SVG brings to the Web.

  See the Pen Gooey Menu by Lucas Bebber (@lbebber) on CodePen.

  See the Pen CSS Text filling with water by Lucas Bebber (@lbebber) on CodePen.
* [Michael Mullany](https://twitter.com/mmullany) was my go-to resource for learning when I took my first dive into the world of SVG filters. I learned a lot from his [writing](https://www.creativebloq.com/netmag/how-go-beyond-basics-svg-filters-71412280), his contributions to the [Web Platform Docs](https://webplatform.github.io/docs/svg/)’ SVG Filters entries, and [his Codepen experiments](https://codepen.io/mullany/) which are literally an SVG Filters gold mine! Check out this Stranger Things logo recreated entirely with SVG Filters:

  See the Pen Stranger Things Logo in SVG (Filters) by Michael Mullany (@mullany) on CodePen.
* [David Dailey has a fantastic introduction to SVG Filters](http://srufaculty.sru.edu/david.dailey/svg/SVGOpen2010/filters2.htm#S4) in which he shows a wide range of possible effects that he created with `feTurbulence`, including but not limited to heavy cloud and bokeh-like effects.

  ![Screen Shot 2019-01-21 at 15.00.18](https://tympanus.net/codrops/wp-content/uploads/2019/01/Screen-Shot-2019-01-21-at-15.00.18.png?x95600)

  The results of adjusting the results of `feTurbulence` with other filter primitives. Adjusting and saturating colors with `feColorMatrix`, as well as sharpening with `feConvolveMatrix` are examples of things you can do with generated noise.
* [Dirk Weber](https://twitter.com/DirkWeber) also created some of the best SVG Filter effects that I personally learned a lot from. He shared his experiments in [an article on Smashing Magazine](https://www.smashingmagazine.com/2015/05/why-the-svg-filter-is-awesome/) more than three years ago! He shares a variety of text effects created using SVG filters. You’ll find examples of grunge texture, protruding and 3D text, water splash effects (uses `feTurbulence`), and many more. Dirk uses two filter primitives in his experiments that we didn’t touch on in this series:
  + `feTile` which is a utility primitive which fills a target rectangle with a repeated, tiled pattern of an input image. [Yoksel](https://twitter.com/yoksel_en) also has  [a great example](https://codepen.io/yoksel/pen/KbmyMQ)  created using a series of operations including `feTile` that is worth exploring.
  + and `feConvolveMatrix` which is one of the more complex and also more powerful primitives. It applies a matrix convolution filter effect. A convolution combines pixels in the input image with neighboring pixels to produce a resulting image. A wide variety of imaging operations can be achieved through convolutions, including blurring, edge detection, sharpening, embossing, and beveling. I haven’t personally experimented with this primitive just yet, but I know other people who have.![Group](https://tympanus.net/codrops/wp-content/uploads/2019/01/Group-1.png?x95600)

  Some of the text effects that Dirk Weber covers in his article o n Smashing Magazine.
* Yoksel’s [SVG experiments on Codepen](https://codepen.io/yoksel/pens/public/) are also a great resource to learn from. She even created [this fantastic visual SVG Filters tool](https://yoksel.github.io/svg-filters/#/) which you can use to create effects and copy-paste the generated code to use in your own projects.

  ![Screen Shot 2019-01-21 at 15.17.07](https://tympanus.net/codrops/wp-content/uploads/2019/01/Screen-Shot-2019-01-21-at-15.17.07.png?x95600)

  The visual SVG Filters editor by Yoksel.
* And last but not least, you can find all there is to know about elements, properties and attributes of SVG Filters in [The SVG Filters Specification](https://www.w3.org/TR/filter-effects-1/#intro).

## Why SVG Filters?

SVG is currently a *lot* more powerful than CSS when it comes to creating graphical effects on the web. And there are several reasons why creating visual effects on the web is better than importing them as images from graphics editors like Photoshop and Illustrator:

* In the days and age of the responsive web, we are no longer dealing with one image. For every image we use on the web, we should be providing responsive versions of that image optimized for different user contexts and performance. This means that if you create an image and then decide to change something about the effect in it, you’re going to have to change the effect in multiple images, which will easily turn into a maintenance nightmare. Creating effects in the browser, on the other hand, means they are resolution-independent and easier to edit.
* The ability to apply filter effects on the web helps to maintain the semantic structure of the document, instead of resorting to images which—aside from generally being a fixed resolution—tend to obscure the original semantics of the elements they replace. This is especially true for effects applied to text. When effects are applied to real text on the web, that text is going to be searchable, selectable and accessible.
* Effects created on the web are easier to edit, change, and update without having to jump between the graphics editor and the code editor or browser.
* And last but not least, effects created on the web can be animated and interacted with. This is one of their most important points of strength.

## Final Words

Thank you for joining me on this SVG Filters journey over the last few weeks. I hope this series has inspired you to start experimenting with SVG Filters and using them more when and where appropriate. There are many effects that you can create that would definitely be filed as experimental. But there are also many practical applications for filters in the wild as well. My hope is that this series has given you a glimpse of what’s possible and that it encourages you to unleash your imagination and to start creating your own practical use cases.

Finally, I hope you enjoyed this series and found it useful. Thank you for reading. =)
