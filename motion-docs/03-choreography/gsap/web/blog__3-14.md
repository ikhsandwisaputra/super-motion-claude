---
source: https://gsap.com/blog/3-14
title: "3.14 Release | GSAP | Docs & Learning"
fetched: 2026-10-28
---

# 3.14 Release

December 8, 2025 Â· 3 min read

[![Jack Doyle](https://gsap.com/img/jack-about.jpg)](https://twitter.com/greensock)

[Jack Doyle](https://twitter.com/greensock)

Founder and Code Connoisseur

[![Cassie Evans](https://gsap.com/img/cassie-about.jpg)](https://twitter.com/cassiecodes)

[Cassie Evans](https://twitter.com/cassiecodes)

Developer Education

## MorphSVG gets a new "smooth" feature[â](https://gsap.com/blog/3-14/#morphsvg-gets-a-new-smooth-feature "Direct link to MorphSVG gets a new \"smooth\" feature")

Usually the default settings deliver **beautiful** morphs, but if you run into a case where it looks a little funky, you can try the new `smooth` feature which adds extra "smoothing" anchor points to the artwork. Think of it like increasing the resolution, inserting points to pull on during the morph.

You can define a specific number of points, like `smooth: 80` would redraw the path using 80 evenly-spaced anchor points (replacing all existing anchor points). Or `smooth: "auto"` would automatically choose a number of points based on the surface area. By default, smoothing the path will **redraw** it which is like tracing it at a certain resolution in order to distribute the anchor points evenly, so it loses some fidelity to the original artwork. You can use the object syntax to set `redraw: false` to avoid this (see details in [the docs](https://gsap.com/docs/v3/Plugins/MorphSVGPlugin)).

#### loading...

MorphSVG's algorithm for adding new anchors has been improved to space them out more evenly, even without enabling `smooth`.

There's also a new `curveMode: true` feature that can be useful in cases where you need to avoid mid-morph kinks. See [the docs](https://gsap.com/docs/v3/Plugins/MorphSVGPlugin#curveMode) for details.

#### loading...

## New demo hub[â](https://gsap.com/blog/3-14/#new-demo-hub "Direct link to New demo hub")

[![blog-svg-tips-full](https://gsap.com/assets/images/demo-hub-spiral-348c6e17b426f871774075db92f20d80.png)](https://demos.gsap.com/)

There are countless amazing GSAP demos out there. Some are safely nestled in the docs, but many more are scattered across the forums, CodePen, and other corners of the web. It can be a bit of a treasure hunt trying to find the one you're after.

To make exploring them easier, weâve started gathering the most popular and useful examples into one place: the new [GSAP Demo Hub](https://demos.gsap.com/). The first 50 demos are up now, and weâll be expanding the collection over the coming months with framework-specific demos and some exciting community contributions.

Browse by plugin, jump into the [Getting Started](https://demos.gsap.com/getting-started/) collection, explore the properties and features used in each example, and log in to like and save the demos you want to revisit.

Have you got a favorite demo bookmarked that we havenât added yet? Want to contribute your own, or canât find the specific pattern you need for a project? Weâd love your help growing the collection, your suggestions make it better for everyone!

[Explore the first collection](https://demos.gsap.com/)

## Lots of minor improvements and fixes[â](https://gsap.com/blog/3-14/#lots-of-minor-improvements-and-fixes "Direct link to Lots of minor improvements and fixes")

See the [full list here](https://github.com/greensock/GSAP/releases/tag/3.14.0).

## Resources[â](https://gsap.com/blog/3-14/#resources "Direct link to Resources")

* [Full release notes on Github](https://github.com/greensock/GSAP/releases/tag/3.14.0)
* [MorphSVG docs](https://gsap.com/docs/v3/Plugins/MorphSVGPlugin/)
* [Full documentation](https://gsap.com/docs/v3/)
* [Getting started with GSAP](https://gsap.com/resources/get-started)
* [Learning resources](https://gsap.com/resources)
* [Community forums](https://gsap.com/community/)
