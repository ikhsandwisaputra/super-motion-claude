---
source: https://gsap.com/docs/v3/Plugins/MorphSVGPlugin
title: "MorphSVG"
fetched: 2026-10-28
---

# MorphSVG

Quick Start

#### CDN Link

Copy

```
gsap.registerPlugin(MorphSVGPlugin) 
```

#### Minimal usage

```
gsap.to("#circle", { duration: 1, morphSVG: "#lightning" });
```

Detailed walkthrough

[YouTube video player](https://www.youtube.com/embed/Uxa9sdaeyKM)

## Description[​](#description "Direct link to Description")

MorphSVG morphs an SVG `<path>` by animating the data inside the `d` attribute. For example, you can morph a diamond into a lightning bolt with a single line of code:

```
gsap.to("#diamond", { duration: 1, morphSVG: "#lightning" });
```

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/vEGpawb)

```
<svg id="svg-stage" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
  <path id="diamond" fill="url(#grad)" d="M50,1l49,49L50,99L1,50L50,1z" />
  <path id="lightning" fill="transparent" d="M47.1,0.8 73.3,0.8 61.9,37.2 77.1,37.2 30.7,99.4 45.8,51.9 29,51.9z" />
</svg>














<svg id="gradient" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
  <defs>
    <linearGradient id="grad" x1="0" y1="0" x2="99" y2="99" gradientUnits="userSpaceOnUse">
      <stop offset="0.2" stop-color="rgb(255, 135, 9)" />
      <stop offset="0.7" stop-color="rgb(247, 189, 248)" />
    </linearGradient>
  </defs>
</svg>
```

```
body {
  margin:0;
  padding:0;
  width:100%;
  height:100vh;
  display:flex;
  align-items:center;
  justify-content:center;
  background: #0e100f;
  overflow: hidden;
}

.container {
  position: relative;
  width: 90vw;
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 9px;
}

#svg-stage {
  width:60%;
  max-height:60vh;
  max-width:500px;
  overflow:visible;
}

#gradient {
  height: 0;
}
```

```
gsap.to("#diamond", {
  morphSVG: "#lightning",
  duration: 2,
  ease: "expo.inOut",
  repeat: -1,
  yoyo: true
});
```

Plugins[MorphSVGPlugin](/docs/v3/Plugins/MorphSVGPlugin.md)

How does it work?

In this example, MorphSVG finds the path with the ID of "diamond" and the path with the ID of "lightning" and automatically figures out how to add enough points to the diamond to get a super smooth morph. It rips through all that ugly path data, converts everything to cubic beziers, and dynamically subdivides them when necessary, adding anchor points so that the beginning and ending quantities match (but visually it looks identical). It's all done seamlessly under the hood.

## Features[​](#features "Direct link to Features")

Feature Highlights

* Morph `<path>` data **even if the number (and type) of points don't match** between the start and end shapes!
* **Perfect shape fidelity**. Most other morphing tools use a lossy approximation of your artwork that falls apart in complex shapes, or they require matching point quantities in the start/end shapes. MorphSVG is both **super flexible** and **super accurate**.
* **Natural point mapping** that avoids strange twisting in other libraries caused by misaligned artwork point sequencing.
* Optionally **draw the resulting shape to a `<canvas>`** (see [`MorphSVGPlugin.defaultRender`](/docs/v3/Plugins/MorphSVGPlugin/static.defaultRender.md)).

**read more...**

* Morph a `<polyline>` or `<polygon>` to a different set of points.
* Turn primitive elements like `<circle>`, `<rect>`, `<ellipse>`, `<polygon>`, `<polyline>`, and `<line>` into the equivalent `<path>` with [`MorphSVGPlugin.convertToPath()`](/docs/v3/Plugins/MorphSVGPlugin/static.convertToPath.md) so you can then morph it.
* Not happy with the morph? There are plenty of **configuration options** to improve it, like setting `smooth: true` or `curveMode: true` or defining a `shapeIndex` or using a `rotational` type.
* Morph to raw path data (like `"M490.1,280.649c0,44.459-36.041,80..."`) or to a particular `<path>` element (using selector text like `"#diamond"` or even a direct reference to the element like `diamondEl`), making workflow easy.

## Simple Examples[​](#simple-examples "Direct link to Simple Examples")

In its simplest form, you can just morph to another element or raw path data directly:

```
// selector string (grabs the data from the corresponding element's "d" attribute)
gsap.to("#diamond", { morphSVG: "#lightning" });

// an SVG element
const endShape = document.getElementById("lightning");
gsap.to("#diamond", { morphSVG: endShape });

// raw path data (string)
gsap.to("#diamond", { morphSVG: "M47.1,0.8 73.3,0.8 61.9,37.2 77.1,37.2 30.7,99.4 45.8,51.9 29,51.9z" });

// points for polygon or polyline elements:
gsap.to("#polygon", { morphSVG: "240,220 240,70 70,70 70,220" });
```

note

If the shape you pass in is a `<circle>`, `<rect>`, `<ellipse>`, `<polygon>`, `<polyline>`, or `<line>`, MorphSVG will internally create path data from those shapes.

## Configuration[​](#configuration "Direct link to Configuration")

To configure the morph, use the object `{...}` syntax instead. `shape` is the only required property:

```
gsap.to("#diamond", {
	duration: 1,
	ease: "power2.inOut",
	morphSVG: {
		shape: "#lightning",
		smooth: { points: 80, redraw: true }
	}
});
```

Here are the various configuration options:

* ### Property

  ### Description

  #### curveMode[](#curveMode)

  boolean *(new in 3.14.0)*

  Forces smooth anchors (on curves) to avoid kinks mid-morph by interpolating the angle and length of control point handles instead of their raw x/y coordinates. Normally you do **not** need to enable `curveMode`

  View More details

  In the example below, notice how `curveMode: true` prevents the kink mid-morph. However, `curveMode` can actually cause certain morphs to look slightly worse, especially if anchor points are close together, so it's wise to experiment and determine which look you prefer.

  [MorphSVG: curveMode](https://codepen.io/GreenSock/embed/zxvRmrY?default-tab=result\&editable=true\&theme-id=41164)

* #### map[](#map)

  "size" | "position" | "complexity"

  If the sub-segments inside your path aren't matching up the way you hoped between the start and end shapes, you can use `map` to tell MorphSVG which algorithm to prioritize (see details below)

  View More details

  * `"size"` (the default) - Attempts to match segments based on their overall size. If multiple segments are close in size, it'll use positional data to match them. This mode typically gives the most intuitive morphs.
  * `"position"` - Matches mostly based on position (proximity).
  * `"complexity"` - Matches purely based on the quantity of anchor points. This is the fastest algorithm and it can be used to "trick" things to match up by manually adding anchors in your SVG authoring tool so that the pieces that you want matched up contain the same number of anchors (though that's completely optional).

  ```
  gsap.to("#id", {
    duration: 1,
    morphSVG: { shape: "#otherID", map: "complexity" },
  });
  ```

  #### Notes

  * `map` is completely optional. Typically the default mode works great.
  * If none of the map modes get the segments to match up the way you want, it's probably best to just split your path into multiple paths and morph each one. That way you get total control.

* #### origin[](#origin)

  string

  Sets the origin of rotation. The default is `50% 50%`. The format is either a string of two percentage values, or a string or four values if there are different values for the start and end shapes.

  To set your own origin:

  ```
  gsap.to("#shape1", {
    duration: 2,
    morphSVG: {
      shape: "#shape2",
      type: "rotational",
      origin: "20% 60%", //or "20% 60%,35% 90%" if there are different values for the start and end shapes.
    },
  });
  ```

  sometimes the rotations around a point look odd, In cases like this, it's best to experiment and set your own custom origin to improve things even more. We created a `findMorphOrigin()` utility function to help with this...

  View More details

  `findMorphOrigin()` allows you to simply feed in a start and end shape and then it'll superimpose an origin that you can drag around and see exactly how it affects the morph! In the demo below, go into the JS panel and un-comment the `findMorphOrigin()` line and you'll see exactly how this works. Drag the origin around and watch how it affects things.

  [MorphSVG: fixing type:"rotational" weirdness](https://codepen.io/GreenSock/embed/VqRVgr?default-tab=result\&editable=true\&theme-id=41164)

* #### precision[](#precision)

  number

  By default, MorphSVG will round values in the resulting `d` string to 2 decimal places in order to maximize performance and reduce string length but you can set `precision` to your preferred number of decimal places. For example, `precision: 5` would round to 5 decimal places:

  ```
  gsap.to("#id", { morphSVG: { shape: "#other-id", precision: 5 } });
  ```

* #### precompile[](#precompile)

  Array

  Only for very advanced use cases where you're running into performance issues on the initial render, which is rare.

  Tell MorphSVG to run all of its initial calculations and return an array with the transformed strings, logging them to the console where you can copy and paste them back into your tween. That way, when the tween begins it can just grab all the values directly instead of doing expensive calculations.

  For more information see [precompile](#precompile)

* #### render[](#render)

  function

  Define a render function that'll be called every time the path updates, typically for drawing to `<canvas>`. See [Rendering to canvas](#rendering-to-canvas)

* #### shape[](#shape)

  string | element

  The shape to morph to. You can use selector text like `"#diamond"` or a direct reference to the element like `diamondEl` or even raw path data like `"M490.1,280.649c0,44.459-36.041,80..."`

* #### shapeIndex[](#shapeIndex)

  number

  The `shapeIndex` property controls how the points in the start shape are mapped to the ones in the end shape. Every closed path is drawn from a particular point on the path. For example, if you were drawing a circle with a pencil, you could start anywhere (1 o'clock, 9 o'clock, etc.). So if the starting shape begins its sequence of points in its upper left corner and it's mapped to an end shape whose points begin in the lower right corner (matching first with first, second with second, etc.) will result in the shape crossing over itself (visually inverting halfway through). Think of `shapeIndex` like an offset, so `shapeIndex: 3` would match up the 3rd point from the start shape with the first point in the end shape:

  ```
  gsap.to("#square", {
    duration: 1,
    morphSVG: { shape: "#star", shapeIndex: 3 },
  });
  ```

  For help finding the best `shapeIndex`, see the [findShapeIndex() function](/docs/v3/Plugins/MorphSVGPlugin.md#findshapeindex-utility)

  View More details

  **Notes**

  * `shapeIndex` only works on closed paths.
  * If you supply a negative `shapeIndex` the start path will be completely reversed (which can be quite useful


* #### smooth[](#smooth)

  number | "auto" | object *(new in 3.14.0)*

  Adds extra "smoothing" anchor points to the artwork. Think of it like increasing the resolution, inserting points to pull on during the morph. **Normally this is not necessary**, but if your original artwork has awkwardly-placed anchor points it can help make the morph look more natural.

  You can define a specific number of points, like `smooth: 80` would redraw the path using 80 evenly-spaced anchor points (replacing all existing anchor points). Or `smooth: "auto"` would automatically choose a number of points based on the surface area. By default, smoothing the path will **redraw** it which is like tracing it at a certain resolution in order to distribute the anchor points evenly, so it loses some fidelity to the original artwork. You can use the object syntax to set `redraw: false` to avoid this (see details below). Keep in mind that if you use too many points, it could affect performance.

  View More details

  Use the object `{...}` syntax for more options:

  * `points` (number | "auto") - the number of points to use for redrawing the path. Or if `redraw` is `false`, this is the number of points to **add** to the existing anchor points. `"auto"` (the default) automatically chooses a number based on the surface area of the path.
  * `redraw` (boolean) - By default, the path will be completely redrawn with new fabricated anchor points that are equally-spaced which entails a loss of fidelity to the original path since the original anchors are eliminated to prioritize equal spacing. To maintain **PERFECT fidelity** to the original artwork, set `redraw: false` and it will keep the original anchor points and intersperse the new smoothing points between those as evenly-spaced as possible. Redrawing almost always results in more evenly-spaced anchor points but it sacrifices some level of fidelity (more points delivers more fidelity). `redraw: false` delivers **perfect** fidelity but sacrifices equal spacing.
  * `persist` (boolean) - by default, the redrawn shape will persist at the end of the animation in order to avoid any visual jump back to the original artwork (from the loss in fidelity), but you can set `persist: false` to have it return to the original artwork at the end of the animation, eliminating the extra smoothing points that were added.

  ```
  gsap.to("#diamond", {
    duration: 1,
    morphSVG: {
      shape: "#lightning",
      smooth: {
        points: 40, // add 40 smoothing points
        redraw: false, // perfect shape fidelity, but less even spacing 
        persist: false // remove smoothing points when animation completes
      }
    }
  });
  ```

  [Smooth Morph ](https://codepen.io/GreenSock/embed/EaKLgKZ/61c6551d1a18328828a229d25160e784?default-tab=result\&editable=true\&theme-id=41164)

* #### type[](#type)

  "linear" | "rotational"

  By default, all of the anchors and control points in the shape are interpolated linearly (`type: "linear"`) which is usually great but you can set `type: "rotational"` to make MorphSVG use rotation and length data for interpolation instead which can produce more natural morphs in some cases. It also eliminates kinks that may form in otherwise smooth anchors mid-tween (like `curveMode: true`). To tap into this alternative style of morphing, just set type: "rotational" in the object:

  ```
  gsap.to("#shape1", {
   duration: 2, 
   morphSVG:{
    shape: "#shape2",
    type: "rotational"
   }
  })
  ```

  The concept is best understood visually, so here are some videos and demos...

  View More details

  [YouTube video player](https://www.youtube.com/embed/C-qo_aEAPp8)

  ### Interactive comparison of linear and rotational morphs

  [MorphSVG type:"rotational" for more natural morphs](https://codepen.io/GreenSock/embed/vvjOGq?default-tab=result\&editable=true\&theme-id=41164)

## Tips[​](#tips "Direct link to Tips")

note

MorphSVG also stores the original path data on the target so that you can easily tween back to the original shape. (like `data-original="M490.1,280.649c0,44.459-36.041,80..."`)

### Morph into multiple shapes[​](#morph-into-multiple-shapes "Direct link to Morph into multiple shapes")

Sequencing multiple morphs is a breeze with GSAP. Watch how easy it is to make that diamond morph into various other shapes and back again:

```
tl.to("#diamond", { duration: 1, morphSVG: "#shape2" }, "+=1")
  .to("#diamond", { duration: 1, morphSVG: "#shape3" }, "+=1")
  .to("#diamond", { duration: 1, morphSVG: "#shape4" }, "+=1")
  .to("#diamond", { duration: 1, morphSVG: "#diamond" }, "+=1"); // back to the original
```

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/MWMVKmp)

```
<div class="container">
  <svg id="svg-stage" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
    <defs>
      <linearGradient id="grad" x1="0" y1="0" x2="99" y2="99" gradientUnits="userSpaceOnUse">
        <stop offset="0.2" stop-color="rgb(255, 135, 9)" />
        <stop offset="0.7" stop-color="rgb(247, 189, 248)" />
      </linearGradient>
      <path id="speech" d="M20,1 85,1 85,66 51,98 51,66 20,66z">
        <path id="lightning" d="M47.1,0.8 73.3,0.8 61.9,37.2 77.1,37.2 30.7,99.4 45.8,51.9 29,51.9z" />
        <path id="square" d="M50,1l49,49L50,99L1,50L50,1z" />
        <path id="grid" fill-rule="evenodd" clip-rule="evenodd" d="M2 4H34.1774V35.4113H64.8226V4H97V36.1774H65.5887V66.8226H97V99H64.8226V67.5887H34.1774V99H2V66.8226H33.4113V36.1774H2V4Z" fill="url(#paint0_radial_6460_9690)" />
        <path id="bulb" d="M51.5 19.5033C56.7965 19.5033 61.6464 21.0945 65.6667 23.895C72.1757 28.3504 76.4512 35.8609 76.4512 44.3898C76.4512 51.8366 72.2395 57.5013 68.4107 62.2749C65.1562 66.2848 62.1569 69.6581 62.0931 73.0315C62.0931 74.6864 60.6254 76.1503 58.9024 76.1503C54.1802 76.1503 49.3941 76.1503 44.6719 76.1503C42.8851 76.1503 41.4812 74.6864 41.4812 73.0315C41.1622 69.0217 36.8228 65.2028 32.8664 60.2382C29.548 56.0374 26.5488 51.0092 26.5488 44.3898C26.5488 37.0702 29.7395 30.4508 34.7808 25.9318C39.2477 21.9219 45.1186 19.5033 51.5 19.5033ZM87.4272 62.2113C88.5758 62.8478 89.0225 64.3753 88.3206 65.5846C87.6186 66.794 86.0871 67.1759 84.9384 66.5394C82.1306 64.8845 79.3228 63.2933 76.515 61.6385C77.4722 60.3018 78.3018 58.8379 79.0038 57.374C81.8116 58.9652 84.6194 60.5564 87.4272 62.2113ZM26.5488 61.6385C23.741 63.2933 20.9332 64.8845 18.1254 66.4757C16.9129 67.1759 15.3814 66.7303 14.7432 65.5846C14.0413 64.3753 14.4242 62.8478 15.6366 62.2113C18.4444 60.5564 21.1884 58.9652 23.9962 57.374C24.6982 58.8379 25.5916 60.3018 26.5488 61.6385ZM21.1884 46.8721C17.9339 46.8721 14.7432 46.8721 11.4887 46.8721C10.1486 46.8721 9 45.7264 9 44.3898C9 43.0531 10.1486 41.9075 11.4887 41.9075C14.7432 41.9075 17.9339 41.9075 21.1884 41.9075C21.1246 42.7349 21.1246 43.5623 21.1246 44.3898C21.1246 45.2172 21.1246 46.0446 21.1884 46.8721ZM23.9962 31.4055C21.1884 29.8143 18.4444 28.2231 15.6366 26.6319C14.4242 25.9318 14.0413 24.4042 14.7432 23.1949C15.3814 21.9856 16.9129 21.6037 18.1254 22.3038C20.9332 23.895 23.741 25.4862 26.5488 27.1411C25.5916 28.4777 24.6982 29.9416 23.9962 31.4055ZM34.2065 19.4396C32.6111 16.6391 30.952 13.8386 29.3566 11.0381C28.6547 9.89239 29.1013 8.36483 30.25 7.6647C31.4625 6.96457 32.994 7.41011 33.6959 8.61942C35.2913 11.3563 36.8866 14.1568 38.5458 16.9574C37.0143 17.6575 35.5466 18.4849 34.2065 19.4396ZM49.0113 14.1568C49.0113 10.9108 49.0113 7.6647 49.0113 4.48228C49.0113 3.14567 50.1599 2 51.5638 2C52.9039 2 53.9887 3.14567 53.9887 4.48228C53.9887 7.6647 53.9887 10.9108 53.9887 14.1568C53.223 14.0932 52.3934 14.0295 51.5638 14.0295C50.6704 14.0295 49.8408 14.0932 49.0113 14.1568ZM64.518 16.9574C64.9647 16.1936 65.4114 15.4934 65.7943 14.7297C66.3048 13.9022 66.8153 13.0748 67.262 12.1837C67.964 10.9744 68.6659 9.76509 69.3679 8.55577C70.0698 7.4101 71.5375 6.96457 72.75 7.6647C73.9625 8.36483 74.3454 9.89239 73.7072 11.0381C72.9414 12.311 72.2395 13.584 71.4737 14.857C71.027 15.6207 70.5803 16.3845 70.1336 17.1483C69.6869 17.9121 69.2402 18.6759 68.8574 19.4396C68.0916 18.9304 67.262 18.4213 66.4962 17.9757C65.8581 17.5938 65.1562 17.2756 64.518 16.9574ZM76.515 27.1411C77.1532 26.7592 77.8551 26.3773 78.4932 25.9954C79.259 25.5499 79.961 25.168 80.7267 24.7224C82.1306 23.895 83.5345 23.1312 84.9384 22.3038C86.0871 21.6037 87.6186 21.9856 88.3206 23.1949C89.0225 24.4042 88.5758 25.9318 87.4272 26.6319C86.0233 27.3957 84.6832 28.2231 83.2793 28.9869C82.5135 29.4324 81.7478 29.878 80.9182 30.3235C80.28 30.7054 79.6419 31.0873 79.0038 31.4692C78.6847 30.7054 77.0255 27.8412 76.515 27.1411ZM81.8116 41.9075C85.0661 41.9075 88.3206 41.9075 91.5113 41.9075C92.9152 41.9075 94 42.9895 94 44.3898C94 45.7264 92.9152 46.8721 91.5113 46.8721C88.3206 46.8721 85.0661 46.8721 81.8116 46.8721C81.8754 46.0446 81.9392 45.2172 81.9392 44.3898C81.9392 43.5623 81.8754 42.7349 81.8116 41.9075ZM51.7553 99C54.6269 99 57.1156 96.9633 58.9024 93.7172C54.1802 93.7172 49.3941 93.7172 44.6719 93.7172C46.3949 96.9633 48.9475 99 51.7553 99ZM44.6719 85.7612C49.3941 85.7612 54.1802 85.7612 58.9024 85.7612C60.6892 85.7612 62.0931 87.1614 62.0931 88.8799C62.0931 90.6621 60.6892 91.9987 58.9024 91.9987C54.1802 91.9987 49.3941 91.9987 44.6719 91.9987C42.8851 91.9987 41.4812 90.6621 41.4812 88.8799C41.4812 87.1614 42.8851 85.7612 44.6719 85.7612ZM44.6719 77.8051C49.3941 77.8051 54.1802 77.8051 58.9024 77.8051C60.6892 77.8051 62.0931 79.2054 62.0931 80.9239C62.0931 82.6424 60.6892 84.0426 58.9024 84.0426C54.1802 84.0426 49.3941 84.0426 44.6719 84.0426C42.8851 84.0426 41.4812 82.6424 41.4812 80.9239C41.4812 79.2054 42.8851 77.8051 44.6719 77.8051Z" fill="black" />
        <path id="rocket" d="M53.2635 68.6401C59.776 64.496 66.1405 59.7599 71.3949 54.5058C89.3043 36.5975 91.3025 20.8353 89.4523 15.2112C92.1166 12.5471 94.7808 9.8831 97.445 7.21906C98.185 6.47904 98.185 5.29502 97.445 4.55501C96.7049 3.815 95.5208 3.815 94.7807 4.55501C92.1165 7.21905 89.4523 9.8831 86.7881 12.5471C81.1637 10.6971 65.4005 12.6951 47.4911 30.6034C42.2366 35.8575 37.5003 42.2216 33.356 48.7337C27.3615 47.2537 16.9267 47.2537 9.6741 55.3198C1.38545 64.422 6.26983 73.0801 8.11997 71.3041C9.60009 69.7501 12.1163 60.6479 23.0691 67.678C21.293 71.3781 21.367 73.6721 22.5511 74.7821C24.1052 76.3362 25.6593 77.8902 27.2135 79.4442C28.3976 80.6282 30.6177 80.7762 34.392 78.9262C41.3486 89.8784 32.2459 92.3944 30.7657 93.9484C28.9156 95.7245 37.5743 100.609 46.677 92.3204C54.7436 85.0683 54.7436 74.6341 53.2635 68.6401ZM64.5864 37.4115C61.9222 34.7475 61.9222 30.3074 64.5864 27.6434C67.3246 24.9053 71.6909 24.9053 74.3552 27.6434C77.0934 30.3814 77.0934 34.6735 74.3552 37.4115C71.6909 40.0756 67.3246 40.0756 64.5864 37.4115ZM20.1089 77.0762C20.1089 77.0762 12.7083 78.4082 9.97012 92.0244C23.5872 89.3604 24.9193 81.8863 24.9193 81.8863C23.3652 80.2582 21.737 78.7042 20.1089 77.0762Z" fill="black" />
        <path id="thumb" d="M94 44.0172C94 38.5158 89.5107 34.0458 83.9853 34.0458C83.9853 34.0458 83.2256 34.0458 82.0514 34.0458C76.5261 34.0458 60.917 33.6332 60.986 29.3009C60.986 27.9943 61.0551 26.5501 61.1932 24.9685C61.4004 23.1117 61.7458 21.255 61.8839 19.6733C62.8508 8.25788 58.845 2 55.3916 2C54.5628 2 48.2777 2.41261 48.6921 5.78223C48.8303 7.3639 49.5209 15.341 47.4489 22.149C44.1337 28.2006 33.9809 39.2722 27.834 44.2923C27.6958 43.8109 27.4886 43.2607 27.3505 42.7794C26.9361 41.3352 26.5217 39.8911 26.1073 38.447C24.5878 38.8596 23.1374 39.2722 21.687 39.7536C15.8854 41.404 10.1528 43.1232 4.35121 44.8424C2.90081 45.255 1.4504 45.6676 0 46.0802C0.414401 47.5931 0.828805 49.0372 1.24321 50.4814C5.52535 64.8539 9.73843 79.2263 14.0206 93.6676C14.435 95.1117 14.9184 96.5559 15.3328 98C16.7832 97.5874 18.2336 97.1748 19.7531 96.7622C25.4857 95.043 31.2873 93.3238 37.0198 91.6733C38.5393 91.192 39.9897 90.7794 41.4401 90.3668C41.0257 88.9226 40.6113 87.4097 40.1278 85.9656C39.1609 82.6648 38.194 79.3639 37.227 76.063C38.8156 75.6504 41.3711 75.3066 45.2388 75.3066C47.1036 75.3066 49.2447 75.3754 51.662 75.5817C58.9831 76.2693 65.8898 76.7507 69.7575 77.2321C70.6554 77.3696 71.6914 77.4384 72.7274 77.4384C76.1808 77.4384 79.9794 76.6132 81.0154 73.7249C81.3608 72.8997 81.4989 72.1433 81.637 71.3868C84.745 70.2178 87.1624 67.3983 87.3005 63.8911C87.3696 63.2034 87.3005 62.5845 87.2315 61.9656C89.5797 60.5903 91.2373 58.1146 91.3755 55.2264C91.4445 53.851 91.1683 52.5444 90.6848 51.3754C92.6877 49.5186 94 46.9742 94 44.0172ZM18.4409 92.361C14.1587 77.9885 9.94563 63.5473 5.66348 49.1748C11.4651 47.5244 17.1977 45.8052 22.9993 44.086C27.2123 58.4584 31.4945 72.8997 35.7766 87.2722C29.975 88.9226 24.1734 90.6418 18.4409 92.361Z" fill="black" />
    </defs>

    <path id="morph" fill="url(#grad)" d="M74.6 50.2h-.2v-.4h.2a24.4 24.4 0 1 0-24.4-24.4v.2h-.4v-.2a24.4 24.4 0 1 0-24.4 24.4h.2v.4h-.2a24.4 24.4 0 1 0 24.4 24.4v-.2h.4v.2a24.4 24.4 0 1 0 24.4-24.4z" />
  </svg>
</div>
```

```
body {
  margin:0;
  padding:0;
  width:100%;
  height:100vh;
  display:flex;
  align-items:center;
  justify-content:center;
  background: #0e100f;
  overflow: hidden;
}

.container {
  position: relative;
  width: 90vw;
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 9px;
}

#svg-stage {
  width:60%;
  max-height:60vh;
  max-width:500px;
  overflow:visible;
}
```

```
gsap.registerPlugin(GSDevTools, MorphSVGPlugin);

let tl = gsap
  .timeline({
    defaults: { duration: 2, ease: "expo.inOut" },
    repeat: -1
  })
  .to("#morph", { morphSVG: "#speech" })
  .to("#morph", { morphSVG: "#rocket" })
  .to("#morph", { morphSVG: "#lightning" })
  .to("#morph", { morphSVG: "#thumb" })
  .to("#morph", { morphSVG: "#square" })
  .to("#morph", { morphSVG: "#grid" })
  .to("#morph", { morphSVG: "#bulb" })
  .to("#morph", { morphSVG: "#morph" })

GSDevTools.create({animation: tl, minimal: true});
```

Plugins[MorphSVGPlugin](/docs/v3/Plugins/MorphSVGPlugin.md)[GSDevTools](/docs/v3/Plugins/GSDevTools.md)

### Converting SVG shapes to paths[​](#converting-svg-shapes-to-paths "Direct link to Converting SVG shapes to paths")

Feature runthrough

[YouTube video player](https://www.youtube.com/embed/jcq9kEyJNMM)

Technically it's only feasible to morph `<path>` elements or `<polyline>`/`<polygon>` elements, but what if you want to morph a `<circle>`, `<rect>`, `<ellipse>`, or `<line>`? No problem - just tap into the utility method and have the plugin do the conversion for you:

```
MorphSVGPlugin.convertToPath("#elementID");
```

You can pass in an element or selector text, so you could also have it convert ALL of those elements with one line:

```
MorphSVGPlugin.convertToPath("circle, rect, ellipse, line, polygon, polyline");
```

This literally swaps in a for each one directly in the DOM, and it should look absolutely identical. It'll keep the attributes, like the "id" attribute. So after the conversion, you should be able to target the elements pretty easily, just as you would previously.

```
// an svg <rect> Like this:
<rect id="square" width="100" height="100" fill="red"/>

// becomes
<path id="square" fill="red" d="M100,0 v100 h-100 v-100 h100z"></path>
```

### findShapeIndex() utility[​](#findshapeindex-utility "Direct link to findShapeIndex() utility")

Experimenting with `shapeIndex` can be a bit of a guessing game. To make things easier we have created a stand-alone utility function called `findShapeIndex()` that you can use just during development to find the right number to plug into the final animation. This function provides an interactive user interface to help you visualize where the start point is, change it, and preview the animation.

You can load `findShapeIndex()` from [this download link](https://s3-us-west-2.amazonaws.com/s.cdpn.io/16327/findShapeIndex.js).

Once it's loaded you simply tell it which shapes to use.

```
findShapeIndex("#square", "#star");
```

Or pass in raw data:

```
findShapeIndex(
  "#square",
  "M10 315 L 110 215 A 30 50 0 0 1 162.55 162.45 L 172.55 152.45 A 30 50 -45 0 1 215.1 109.9 L 315 10"
);
```

tip

The best way to get started is to drop your SVG into the pen and alter the IDs to match your svg.

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/763b6533f17a795c3cd957c668c33882)

```
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
   <linearGradient id="grad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
        <stop offset="0.2" stop-color="rgb(255, 135, 9)" />
        <stop offset="0.7" stop-color="rgb(247, 189, 248)" />
      </linearGradient>
  <path class="shape" id="flower" d="M73.8657 3.50781C86.354 3.50781 96.478 13.6348 96.478 26.127C96.478 38.6191 86.3539 48.7461 73.8657 48.7461C72.2258 48.7461 70.6272 48.569 69.0864 48.2373V52.2695C70.6271 51.9379 72.2259 51.7617 73.8657 51.7617C86.354 51.7617 96.478 61.8887 96.478 74.3809C96.478 86.873 86.3539 97 73.8657 97C61.3776 96.9999 51.2544 86.8729 51.2544 74.3809C51.2544 72.8954 51.3991 71.4436 51.6724 70.0381H47.8208C48.0941 71.4436 48.2388 72.8954 48.2388 74.3809C48.2388 86.8729 38.1155 96.9998 25.6274 97C13.1392 97 3.01515 86.873 3.01514 74.3809C3.01514 61.8887 13.1392 51.7617 25.6274 51.7617C27.1763 51.7617 28.6886 51.9181 30.1499 52.2148V48.292C28.6886 48.5888 27.1763 48.7461 25.6274 48.7461C13.1392 48.7461 3.01519 38.6191 3.01514 26.127C3.01514 13.6348 13.1392 3.50781 25.6274 3.50781C38.1155 3.50801 48.2388 13.6349 48.2388 26.127C48.2388 27.6761 48.0832 29.1888 47.7866 30.6504H51.7065C51.41 29.1888 51.2544 27.6761 51.2544 26.127C51.2544 13.6349 61.3776 3.5079 73.8657 3.50781Z" fill="#FF8709" />
  <path id="square" d="M100,96.55 H0 V0 h100 L100,96.55z"/>
</svg>
```

```
html, body {
  margin:0;
  padding:0;
  width:100%;
  height:100vh;
  font-size: 0.7em;
}

body {
  background: #0e100f;
  font-family:Mori, 'sans-serif';
  display:flex;
  align-items:center;
  justify-content:center;
}

svg {
  width:60%;
  max-width:500px;
  max-height: 60vh;
  overflow: visible;
  opacity: 0;
}

button {
  padding:6px;
  font-size:22px;
}

.nav {
   margin:30px;
   font-size:18px;
}
```

```
/*
		For use with GreenSock's MorphSVGPlugin - helps find the best-looking shapeIndex value.

		USAGE:
		findShapeIndex("#yourTarget", "#otherShape", {duration:3, ease:"none", size:10});

		You can pass in either the other shape's selector text, or the full path data, like:

		findShapeIndex("#yourTarget", "M506.066,200L400,306.066L293.934,200L400,93.934L506.066,200z", {duration:3, ease:"none", size:10});

		Tap the up/down arrows (or left/right or "u"/"d") to change the shapeIndex.

		Requires: GSAP 3.0.0 (or later), MorphSVGPlugin

		LAST UPDATED: 2019-11-10
		Copyright 2019, GreenSock Inc.
		@author: Jack Doyle, jack@greensock.com
		*/

function findShapeIndex(target, endShape, vars) {
  vars = vars || {};
  var _doc = document,
      _get = function(e) {
        return _doc.querySelectorAll(e);
      },
      _createSVG = function(type, attributes) {
        var element = _doc.createElementNS("http://www.w3.org/2000/svg", type),
            reg = /([a-z])([A-Z])/g,
            p;
        for (p in attributes) {
          element.setAttributeNS(null, p.replace(reg, "$1-$2").toLowerCase(), attributes[p]);
        }
        return element;
      },
      _numExp = /[-+=\.]*\d+[\.e\-\+]*\d*[e\-\+]*\d*/gi, //finds any numbers, including ones that start with += or -=, negative numbers, and ones in scientific notation like 1e-8.
      _selectorExp = /(^[#\.][a-z]|[a-y][a-z])/gi,
      _parseShape = (shape, forcePath, target) => {
        let isString = typeof(shape) === "string",
            e, type;
        if (!isString || _selectorExp.test(shape) || (shape.match(_numExp) || []).length < 3) {
          e = gsap.utils.toArray(shape)[0];
          if (e) {
            type = (e.nodeName + "").toUpperCase();
            if (forcePath && type !== "PATH") { //if we were passed an element (or selector text for an element) that isn't a path, convert it.
              e = MorphSVGPlugin.convertToPath(e, false);
              type = "PATH";
            }
            shape = e.getAttribute(type === "PATH" ? "d" : "points") || "";
            if (e === target) { //if the shape matches the target element, the user wants to revert to the original which should have been stored in the data-original attribute
              shape = e.getAttributeNS(null, "data-original") || shape;
            }
          } else {
            console.warn("Invalid morph to: " + shape);
            shape = false;
          }
        }
        return shape;
      },
      startDot, endDot, incrementButton, decrementButton,
      _setup = function() {
        var e = _doc.createElement("div"),
            label = _doc.createElement("div"),
            body = _get("body")[0];
        incrementButton = _doc.createElement("div");
        decrementButton = _doc.createElement("div");
        label.setAttribute("id", "shapeIndexLabel");
        startDot = _createSVG("circle", {cx:0, cy:0, r:(vars.startStrokeWidth || 3), fill:vars.startStroke || "red"});
        endDot = _createSVG("circle", {cx:0, cy:0, r:(vars.endStrokeWidth || 3), fill:vars.endStroke || "yellow"});
        gsap.set(e, {padding:"0px", position:"absolute", bottom:0, fontSize:"1.2rem", textAlign:"center", backgroundColor: "var(--grey-dark)", color:"var(--color-surface50)", borderRadius: "99px", left:"50%", xPercent:-50, yPercent:-50, userSelect:"none", fontFamily:"inherit", zIndex: 100});
        gsap.set(label, {display:"inline-block", minWidth:"210px", marginRight:"10px", textAlign:"center", marginLeft:"10px"});
        gsap.set([incrementButton, decrementButton], {display:"inline-block", padding:"0 15px", color:"var(--color-surface50)", height:"50px", lineHeight:"48px", cursor:"pointer"});
        gsap.set(decrementButton, {borderRight:"1px solid var(--color-surface25)"});
        gsap.set(incrementButton, {borderLeft:"1px solid var(--color-surface25)"});
        decrementButton.innerHTML = " - ";
        incrementButton.innerHTML = " + ";
        e.appendChild(decrementButton);
        e.appendChild(label);
        e.appendChild(incrementButton);
        if (body) {
          body.appendChild(e);
        }
        return label;
      },
      label = _get("#shapeIndexLabel")[0] || _setup(),
      index = 0,
      _yoyo = function() {
        shapeTween.reversed(!shapeTween.reversed()).resume();
        dotTween.reversed(!dotTween.reversed()).resume();
      },
      shapeTween,	dotTween, startBezier, endBezier,
      dotProxy = {x:0, y:0},
      _getFirstCoordinates = function(start, end, shapeIndex) {
        startBezier = MorphSVGPlugin.stringToRawPath(start);
        endBezier = MorphSVGPlugin.stringToRawPath(end);

        MorphSVGPlugin.equalizeSegmentQuantity(startBezier, endBezier, shapeIndex);
        return [startBezier[0][0], startBezier[0][1], endBezier[0][0], endBezier[0][1]];
      },
      _startTween = function() {
        var coordinates = _getFirstCoordinates(origStartShape, origEndShape, index);
        dotProxy.x = coordinates[0];
        dotProxy.y = coordinates[1];
        startDot.setAttribute("cx", dotProxy.x);
        startDot.setAttribute("cy", dotProxy.y);
        endDot.setAttribute("cx", coordinates[2]);
        endDot.setAttribute("cy", coordinates[3]);
        shapeTween = gsap.fromTo(target, {morphSVG: origStartShape}, {delay:0.5, duration:vars.duration || 3, morphSVG:{shape:origEndShape, shapeIndex:index}, ease:vars.ease || "none", onComplete:_yoyo, onReverseComplete:_yoyo, overwrite:true});
        dotTween = gsap.to(dotProxy, {delay:0.5, duration:vars.duration || 3, x:coordinates[2], y:coordinates[3], ease:vars.ease || "none", onUpdate:function() {
          startDot.setAttribute("cx", dotProxy.x);
          startDot.setAttribute("cy", dotProxy.y);
        }});
      },
      _refresh = function() {
        label.innerHTML = "shapeIndex: " +  index + (index === autoIndex ? " (auto)" : "");
        shapeTween.seek(0).kill();
        dotTween.seek(0).kill();
        _startTween();
      },
      _increment = function() {
        index = (index + 1) % (maxIndex + 1);
        _refresh();
      },
      _decrement = function() {
        index = (index - 1) % (maxIndex + 1);
        _refresh();
      },
      autoIndex,	maxIndex, endTarget;
  if (typeof(target) === "string") {
    target = gsap.utils.toArray(target)[0];
  }
  if (!target) {
    console.log("ERROR: target not found for findShapeIndex(). Please use a valid target.");
    return;
  } else if (target.nodeName && target.nodeName.toUpperCase() !== "PATH") {
    console.log("ERROR: target of findShapeIndex() must be a path.");
    return;
  } else if (target.push && target[0] && target[0].nodeName) {
    target = target[0];
  }
  if (target.parentNode) {
    target.parentNode.appendChild(endDot);
    target.parentNode.appendChild(startDot);
  }
  if (typeof(endShape) !== "string" || (endShape.match(_numExp) || []).length < 3) {
    endTarget = gsap.utils.toArray(endShape);
    if (endTarget && endTarget[0]) {
      endTarget = endTarget[0];
      gsap.set(endTarget, {display:"block", strokeWidth:vars.endStrokeWidth || 1, stroke:vars.endStroke || "#2c2c2c", fill:vars.endFill || "none", visibility:"visible", opacity:vars.endOpacity || 0.7});
    }
  }
  gsap.set(target, {display:"block", strokeWidth:vars.startStrokeWidth || 1, stroke:vars.startStroke || "#ff8709", fill:vars.startFill || "none", visibility:"visible", opacity:vars.startOpacity || 0.7});
  startBezier = MorphSVGPlugin.stringToRawPath(target.getAttribute("d"));
  endBezier = MorphSVGPlugin.stringToRawPath(_parseShape(endShape, true));
  autoIndex = index = Math.round(MorphSVGPlugin.equalizeSegmentQuantity(startBezier, endBezier, "auto")[0]); //also handles subdividing!
  maxIndex = (startBezier[0].length / 6) | 0;
  gsap.killTweensOf([target, endShape]); //kill other tweens so they don't interfere with our yoyo-ing one.

  const origStartShape = _parseShape(target, true);
  const origEndShape = _parseShape(endShape, true);
  _startTween();
  label.innerHTML = "shapeIndex: " +  index + (index === autoIndex ? " (auto)" : "");
  window.addEventListener("keydown", function(event) {
    var key = event.keyCode;
    if (key === 38 || key === 39 || key === 85) { //right or up arrows (increment)
      _increment();
    } else if (key === 37 || key === 40 || key === 68) { //left or down arrows (decrement)
      _decrement();
    }
  });
  incrementButton.addEventListener("click", _increment);
  decrementButton.addEventListener("click", _decrement);
}
//fouc
gsap.set("svg", {opacity: 1});

gsap.to("#square", {duration: 3, morphSVG:{shape:"#flower", shapeIndex:5}});
//comment out next line to disable findShapeIndex() UI
findShapeIndex("#square", "#flower", {startStroke:'url(#grad)', endStroke:'#2c2c2c'});
```

Plugins[MorphSVGPlugin](/docs/v3/Plugins/MorphSVGPlugin.md)

## Maximizing performance[​](#maximizing-performance "Direct link to Maximizing performance")

### Define a shapeIndex in advance[​](#define-a-shapeindex-in-advance "Direct link to Define a shapeIndex in advance")

Performance tip: define a `shapeIndex` in advance

MorphSVGPlugin's default `shapeIndex: "auto"` does a bunch of calculations to reorganize the points so that they match up in a natural way but if you define a numeric `shapeIndex` (like `shapeIndex: 5`) it skips those calculations. Each segment inside a path needs a `shapeIndex`, so multiple values are passed in an array like `shapeIndex:[5, 1, -8, 2]`. But how would you know what numbers to pass in? The `findShapeIndex()` tool helps for single-segment paths, what about multi-segment paths? It's a pretty complex thing to provide a GUI for.

**read more about shapeIndex...**

Typically the default `"auto"` mode works great but the goal here is to avoid the calculations, so there is a `"log"` value that will act just like `"auto"` but it will also `console.log()` the `shapeIndex` value(s). That way, you can run the tween in the browser once and look in your console and see the numbers that `"auto"` mode would produce. Then it's simply a matter of copying and pasting that value into your tween where `"log"` was previously.

For example:

```
// logs a value like "shapeIndex:[3]"
gsap.to("#id", {
  duration: 1,
  morphSVG: { shape: "#otherID", shapeIndex: "log" },
});
// now you can grab the value from the console and drop it in...
gsap.to("#id", {
  duration: 1,
  morphSVG: { shape: "#otherID", shapeIndex: [3] },
});
```

### Precompile[​](#precompile "Direct link to Precompile")

While precompiling isn't usually necessary, it can really improve performance for very complex morphs. Precompiling involves having MorphSVG run all of its initial calculations and then spit out an array with the transformed strings, logging them to the console where you can copy and paste them back into your tween. That way, when the tween begins it can just grab all the values directly and skip the expensive startup calculations.

**show precompiling example...**

```
// logs a value like precompile:["M0,0 C100,200 120,500 300,145 34,245 560,46","M0,0 C200,300 100,400 230,400 100,456 400,300"]
gsap.to("#id", {
  duration: 1,
  morphSVG: { shape: "#otherID", precompile: "log" },
});
// now you can grab the value from the console and drop it in...
gsap.to("#id", {
  duration: 1,
  morphSVG: {
    shape: "#otherID",
    precompile: [
      "M0,0 C100,200 120,500 300,145 34,245 560,46",
      "M0,0 C200,300 100,400 230,400 100,456 400,300",
    ],
  },
});
```

As an example, here's [a really cool CodePen](https://codepen.io/davatron5000/pen/meNOqK/) by Dave Rupert before it was precompiled. Notice the very first time you click the toggle button, it may seem to jerk a bit because the entire brain is one path with many segments, and it must get matched up with all the letters and figure out the `shapeIndex` for each (which is expensive). By contrast, [here's a fork](https://codepen.io/GreenSock/pen/MKevzM) of that pen that has precompile enabled. You may noticed that it starts more smoothly.

#### Notes[​](#notes "Direct link to Notes")

* `precompile` is only available on `<path>` elements (not `<polyline>`/`<polygon>`). You can easily convert things using `MorphSVGPlugin.convertToPath("polygon, polyline");`

* Precompiling only improves the performance of the first (most expensive) render. If your entire morph is janky throughout the tween, it most likely has nothing to do with GSAP; your SVG may be too complex for the browser to render fast enough. In other words, the bottleneck is probably the browser's graphics rendering routines. Unfortunately, there's nothing GSAP can do about that and you'll need to simplify your SVG artwork and/or reduce the size at which it is displayed.

* The precompiled values are inclusive of `shapeIndex` adjustments. In other words, `shapeIndex` gets baked in.

* In most cases, you probably don't need to precompile; it's intended to be an advanced technique for squeezing every ounce of performance out of a very complex morph.

* If you alter the original start or end shape/artwork, make sure you precompile again so that the values reflect your changes.

### Rendering to canvas[​](#rendering-to-canvas "Direct link to Rendering to canvas")

SVG is fantastic, but sometimes developers prefer a canvas-based animation (often for rendering performance reasons). The MorphSVG plugin allows you to define a `render` function that'll be called every time the path updates.

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/WYWZab)

```
<div class="container">
  <h2>Canvas</h2>
  <canvas></canvas>
</div>

<div class="container">
  <h2>SVG</h2>

<div class="container">
  <svg id="svg-stage" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
    <defs>
      <linearGradient id="grad" x1="0" y1="0" x2="99" y2="99" gradientUnits="userSpaceOnUse">
        <stop offset="0.2" stop-color="rgb(255, 135, 9)" />
        <stop offset="0.7" stop-color="rgb(247, 189, 248)" />
      </linearGradient>
      <path id="shape2" d="M20,1 85,1 85,66 51,98 51,66 20,66z">
        <path id="shape3" d="M47.1,0.8 73.3,0.8 61.9,37.2 77.1,37.2 30.7,99.4 45.8,51.9 29,51.9z" />
        <path id="shape4" d="M50,1l49,49L50,99L1,50L50,1z" />
    </defs>

    <path id="shape1" fill="url(#grad)" d="M74.6 50.2h-.2v-.4h.2a24.4 24.4 0 1 0-24.4-24.4v.2h-.4v-.2a24.4 24.4 0 1 0-24.4 24.4h.2v.4h-.2a24.4 24.4 0 1 0 24.4 24.4v-.2h.4v.2a24.4 24.4 0 1 0 24.4-24.4z" />
  </svg>

</div>
```

```
body {
  width:100%;
  height:100vh;
  margin:0;
  padding:0;
  background:#0e100f;
  display:flex;
  align-items:center;
  justify-content:center;
  flex-wrap: wrap;
  gap:1rem;
}

.container svg, canvas {
  width: 200px;
  height: 200px;  
}

.container {
  display: inline-block;  
  text-align: center;
  visibility: hidden;
}
```

```
let shape    = document.querySelector("#shape1");
let canvas   = document.querySelector("canvas");
let ctx      = canvas.getContext("2d");
let size     = 200;
let viewBox  = {x:0, y:0, width:100, height:100};
let sizeRatio = size / viewBox.width;

const gradient = ctx.createLinearGradient(0, 0, viewBox.width, viewBox.height);
gradient.addColorStop(0.2, "rgb(255, 135, 9)");
gradient.addColorStop(0.7, "rgb(247, 189, 248)");

setDisplay();

gsap.defaults({ease: "power2.inOut"});
gsap.set(".container", { autoAlpha: 1 });

//set a default render function for all morphSVG animations. You can set it on a per-animation basis too, like morphSVG:{shape:"#id", render:yourFunction}
// MorphSVGPlugin.defaultRender = draw;

var tl = gsap.timeline({ repeat: -1, id:"morphing", paused:false,  defaults: { duration: 2, ease: "expo.inOut" }})  
  .to(shape, { morphSVG: {shape: "#shape2", render: draw} })
  .to(shape, { morphSVG: {shape: "#shape3", render: draw} }, "+=0.5")
  .to(shape, { morphSVG: {shape: "#shape4", render: draw} }, "+=0.5")
  .to(shape, { morphSVG: {shape: "#shape1", render: draw} }, "+=0.5")

tl.progress(0.0001); //just to force the first render;
// GSDevTools.create({animation:tl, globalSync:false, paused:true});

document.body.addEventListener("click", function() {
  tl.paused(!tl.paused());
});


function draw(rawPath, target) {
  var l, segment, j, i;
  ctx.clearRect(0, 0, size, size);
  ctx.fillStyle = gradient;
  ctx.fill("evenodd");
  ctx.beginPath();
  for (j = 0; j < rawPath.length; j++) {
    segment = rawPath[j];
    l = segment.length;
    ctx.moveTo(segment[0], segment[1]);
    for (i = 2; i < l; i+=6) {
      ctx.bezierCurveTo(segment[i], segment[i+1], segment[i+2], segment[i+3], segment[i+4], segment[i+5]);
    }
    if (segment.closed) {
      ctx.closePath();
    }
  }
  ctx.fill("evenodd");
}





function setDisplay() {
  var ratio = window.devicePixelRatio || 1;
  canvas.width  = size * ratio;
  canvas.height = size * ratio;
  gsap.set(canvas, { width: size, height: size });
  ratio *= sizeRatio;
  ctx.translate(-viewBox.x * ratio, -viewBox.y * ratio);
  ctx.scale(ratio, ratio);
}
```

Plugins[MorphSVGPlugin](/docs/v3/Plugins/MorphSVGPlugin.md)

**read more about canvas rendering...**

The render function will receive two parameters:

1. **`rawPath`** \[array]: A RawPath is essentially an array containing an array for each contiguous segment with alternating x, y, x, y cubic bezier data. It's like an SVG `<path>` where there's one segment (array) for each `M` command. That segment (array) contains all of the cubic bezier coordinates in alternating x/y format (just like SVG path data) in raw numeric form which is nice because that way you don't have to parse a long string and convert things.

   For example, this SVG `<path>` has two separate segments because there are two `M` commands: `<path d="M0,0 C10,20,15,30,5,18 M0,100 C50,120,80,110,100,100"></path>` So the resulting **RawPath** would be:

   ```
   [
     [0, 0, 10, 20, 15, 30, 5, 18],
     [0, 100, 50, 120, 80, 110, 100, 100],
   ];
   ```

   For simplicity, the example above only has one cubic bezier in each segment, but there could be an unlimited quantity inside each segment. No matter what path commands are in the original`<path>` data string (cubic, quadratic, arc, lines, whatever), the resulting RawPath will **ALWAYS** be cubic beziers.

2. **`target`** \[object]: The target of the tween (usually a `<path>`)

This means you can even render morphs to super high-performance engines like [PixiJS](//pixijs.com/) or anything that'll allow you to draw cubic beziers!

Here's an example of a tween and a render function that'd draw the morphing shape to canvas:

```
let canvas = document.querySelector("canvas"),
  ctx = canvas.getContext("2d"),
  vw = (canvas.width = window.innerWidth),
  vh = (canvas.height = window.innerHeight);
ctx.fillStyle = "#ccc";
gsap.to("#hippo", {
  duration: 2,
  morphSVG: {
    shape: "#circle",
    render: draw,
  },
});
function draw(rawPath, target) {
  let l, segment, j, i;
  ctx.clearRect(0, 0, vw, vh);
  ctx.beginPath();
  for (j = 0; j < rawPath.length; j++) {
    segment = rawPath[j];
    l = segment.length;
    ctx.moveTo(segment[0], segment[1]);
    for (i = 2; i < l; i += 6) {
      ctx.bezierCurveTo(
        segment[i],
        segment[i + 1],
        segment[i + 2],
        segment[i + 3],
        segment[i + 4],
        segment[i + 5]
      );
    }
    if (segment.closed) {
      ctx.closePath();
    }
  }
  ctx.fill("evenodd");
}
```

To set a default render method for all tweens:

```
MorphSVGPlugin.defaultRender = yourFunction;
```

#### updateTarget: false[​](#updatetarget-false "Direct link to updateTarget: false")

By default, MorphSVG will update the original target of the tween (typically an SVG `<path>` element), but if you're only drawing to canvas you can tell MorphSVG to skip updating the target like this:

```
gsap.to("#diamond", {
  duration: 2,
  morphSVG: {
    shape: "#lightning",
    render: draw,
    updateTarget: false,
  },
});
```

To set the default `updateTarget` value for all tweens (so that you don't have to add it to every tween):

```
MorphSVGPlugin.defaultUpdateTarget = false;
```

## **Properties**[​](#properties "Direct link to properties")

|                                                                                                                    |                                                                                                                                                                                   |
| ------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| #### [MorphSVGPlugin.defaultRender](/docs/v3/Plugins/MorphSVGPlugin/static.defaultRender.md) : Function            | Sets the default function that should be called whenever a morphSVG tween updates. This is useful if you're rendering to `<canvas>`.                                              |
| #### [MorphSVGPlugin.defaultType](/docs/v3/Plugins/MorphSVGPlugin/static.defaultType.md) : String                  | Sets the default `"type"` for all MorphSVG animations. The default `type` is `"linear"` but you can change it to `"rotational"`.                                                  |
| #### [MorphSVGPlugin.defaultUpdateTarget](/docs/v3/Plugins/MorphSVGPlugin/static.defaultUpdateTarget.md) : Boolean | Sets the default `updateTarget` value for all MorphSVG animations; if `true`, the original tween target (typically an SVG `<path>` element) itself gets updated during the tween. |

## **Methods**[​](#methods "Direct link to methods")

|                                                                                                                                                  |                                                                                                                                                                                                                                                                                                             |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| #### [MorphSVGPlugin.convertToPath](/docs/v3/Plugins/MorphSVGPlugin/static.convertToPath.md)( shape:\[Element \| String], swap:Boolean ) : Array | Converts SVG shapes like `<circle>`, `<rect>`, `<ellipse>`, or `<line>` into `<path>`                                                                                                                                                                                                                       |
| #### [MorphSVGPlugin.rawPathToString](/docs/v3/Plugins/MorphSVGPlugin/static.rawPathToString.md)( rawPath:Array ) : String                       | Converts a RawPath (array) into a string of path data, like `"M0,0 C100,20 300,50 400,0..."` which is what's typically found in the `d` attribute of a `<path>`.                                                                                                                                            |
| #### [MorphSVGPlugin.stringToRawPath](/docs/v3/Plugins/MorphSVGPlugin/static.stringToRawPath.md)( data:String ) : RawPath                        | Takes a string of path data (like `"M0,0 C100,20 300,50 400,0..."`, what's typically found in the `d` attribute of a `<path>`), parses it, converts it into cubic beziers, and returns it as a RawPath which is just an array containing an array for each segment (each `M` command starts a new segment). |

## **Demos**[​](#demos "Direct link to demos")

Check out the full collection of [How-to demos](https://codepen.io/collection/noQGjq) and our favourite [inspiring community demos](https://codepen.io/collection/naMaNQ) on CodePen.
