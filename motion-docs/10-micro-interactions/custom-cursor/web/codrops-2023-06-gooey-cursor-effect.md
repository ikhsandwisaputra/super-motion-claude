---
source: https://tympanus.net/codrops/2023/06/07/gooey-cursor-effect/
title: "Gooey Cursor Effect | Codrops"
fetched: 2026-10-28
---

By [Manoela Ilic](https://tympanus.net/codrops/author/crnacura/ "Posts by Manoela Ilic")
in
[Playground](https://tympanus.net/codrops/category/playground/) on
June 7, 2023

# Gooey Cursor Effect

A fun gooey cursor background effect with SVG filters and CSS blend modes.

[cursor](https://tympanus.net/codrops/tag/cursor/) [filter](https://tympanus.net/codrops/tag/filter/) [gooey](https://tympanus.net/codrops/tag/gooey/) [GSAP](https://tympanus.net/codrops/tag/gsap/) [Motion Trail](https://tympanus.net/codrops/tag/motion-trail/) [svg](https://tympanus.net/codrops/tag/svg/)

[![Gooey cursor with svg filters and css blend modes](https://tympanus.net/codrops/wp-content/uploads/2023/06/gooeycursor_2.2023-06-07-10_54_11.gif?x95600)](http://tympanus.net/Development/GooeyCursor/ "Gooey Cursor Effect Demo")

[Demo](http://tympanus.net/Development/GooeyCursor/)
[Code](https://github.com/codrops/GooeyCursor/)

The other day I visited [Lorenzo Dal Dasso’s](https://www.lorenzodaldosso.it/) fantastic website and had a lot of fun with the cool cursor effect! Of course I had to try it out and see what crazy stuff I could do with this and after having a peek under the hood, I saw that the wonderful duo [@ETStudio5](https://twitter.com/ETStudio5) who made the site used SVG filters and a CSS blend mode. Off we go, let’s have some fun with variations!

*Edit: [Thomas Aufresne](https://twitter.com/thomAufresne) pointed out that the effect was first made by the Lama Lama team on [their website](https://lamalama.nl/)! Check it out, it’s an amazing design*. *Thanks, Thomas, for letting me know!*

Lucas Bebber experimented a lot with this kind of gooey effect using SVG filters and you can read about it in the article [Creative Gooey Effects](https://tympanus.net/codrops/2015/03/10/creative-gooey-effects/).

## SVG Filter

The idea is simple: create lots of boxes on the page and when we hover with the cursor, show them. Also apply a nice SVG gooey filter to them. The CSS blend mode adds some extra jazz!

```markup
<div class="cursor">
	<div class="cursor__inner">
		<!-- cursor__inner-box elements come here -->
	</div>
	<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
		<defs>
			<filter id="gooey">
			    <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="3.2" />
			    <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -7" result="goo" />
			    <feComposite in="SourceGraphic" in2="goo" operator="atop" />
			</filter>
		</defs>
	</svg>
</div>
```

We dynamically add tiny boxes within a grid layout, depending on how much space is available.

Changing the filter and blend mode creates lovely variations that you can adjust to fit your design.

There’s a little easter egg when you click 🙂

Check out the [example demos](http://tympanus.net/Development/GooeyCursor/) to see some possibilities!

Here’s number one:

[](https://tympanus.net/codrops/wp-content/uploads/2023/06/gooeycursor_2.mp4)

And another one with a different look and feel:

[](https://tympanus.net/codrops/wp-content/uploads/2023/06/gooeycursor_1.mp4)

And another one with a circle effect:

[](https://tympanus.net/codrops/wp-content/uploads/2023/06/gooeycursor_3.mp4)

And another one with a strong shadow:

[](https://tympanus.net/codrops/wp-content/uploads/2023/06/gooeycursor_4.mp4)

I really hope you enjoyed this effect!

P.S. Firefox doesn’t play along nicely, so we just show the box fallback without the filter, not bad either 🙂

If you like these kind of experiments, follow us on [Twitter](https://twitter.com/codrops) and [Instagram](https://www.instagram.com/codropsss/). Thanks for checking by!

Help spreading the word:

> Today we got some gooey cursor effects for you! 🌟🖱️💫
>
> Using SVG filters and CSS blend modes you can create crazy cursor fun:<https://t.co/HRARmpjQ3P>[#frontend](https://twitter.com/hashtag/frontend?src=hash&ref_src=twsrc%5Etfw) [#javascript](https://twitter.com/hashtag/javascript?src=hash&ref_src=twsrc%5Etfw) [#coding](https://twitter.com/hashtag/coding?src=hash&ref_src=twsrc%5Etfw) [#css](https://twitter.com/hashtag/css?src=hash&ref_src=twsrc%5Etfw) [#html](https://twitter.com/hashtag/html?src=hash&ref_src=twsrc%5Etfw) [#demo](https://twitter.com/hashtag/demo?src=hash&ref_src=twsrc%5Etfw) [#inspiration](https://twitter.com/hashtag/inspiration?src=hash&ref_src=twsrc%5Etfw) [#webdesign](https://twitter.com/hashtag/webdesign?src=hash&ref_src=twsrc%5Etfw) [pic.twitter.com/Qo9dL4cZIC](https://t.co/Qo9dL4cZIC)
>
> — Codrops (@codrops) [June 7, 2023](https://twitter.com/codrops/status/1666390789423857664?ref_src=twsrc%5Etfw)
