---
source: https://tympanus.net/codrops/2019/01/31/custom-cursor-effects/
title: "Custom Cursor Effects | Codrops"
fetched: 2026-10-28
---

By [Stefan Kaltenegger](https://tympanus.net/codrops/author/stefan/ "Posts by Stefan Kaltenegger")
in
[Tutorials](https://tympanus.net/codrops/category/tutorials/) on
January 31, 2019

# Custom Cursor Effects

A collection of five demos and a tutorial on how to create animated custom cursor effects for interactive elements like navigations, galleries and carousels.

[cursor](https://tympanus.net/codrops/tag/cursor/) [GSAP](https://tympanus.net/codrops/tag/gsap/) [hover](https://tympanus.net/codrops/tag/hover/)

[![](https://tympanus.net/codrops/wp-content/uploads/2019/01/CustoCursors_featured.jpg?x95600)](http://tympanus.net/Tutorials/CustomCursors/ "Custom Cursor Effects Demo")

[Demo](http://tympanus.net/Tutorials/CustomCursors/)
[Code](https://github.com/skaltenegger/customcursor)

![](https://tympanus.net/Tutorials/CustomCursors/img/01/01.jpg?x95600)
![](https://tympanus.net/Tutorials/CustomCursors/img/01/02.jpg?x95600)
![](https://tympanus.net/Tutorials/CustomCursors/img/01/03.jpg?x95600)
![](https://tympanus.net/Tutorials/CustomCursors/img/01/04.jpg?x95600)

Custom cursors certainly were a big trend in web development in 2018. In the following tutorial we’ll take a look at how to create a magnetic noisy circle cursor for navigation elements as shown in [Demo 4](https://tympanus.net/Tutorials/CustomCursors/index4.html). We’ll be using [Paper.js](http://paperjs.org) with [Simplex Noise](https://github.com/jwagner/simplex-noise.js).

![The custom cursor effect we’re going to build in this tutorial](https://tympanus.net/codrops/wp-content/uploads/2019/01/cursor.gif?x95600)

The custom cursor effect we’re going to build in this tutorial

## The Cursor Markup

The markup for the cursor will be split up into two elements. A simple <div> for the small white dot and a <Canvas> element to draw the red noisy circle using [Paper.js](http://paperjs.org).

```
<body class="tutorial">
  <main class="page">
    <div class="page__inner">

      <!-- The cursor elements -->
      <div class="cursor cursor--small"></div>
      <canvas class="cursor cursor--canvas" resize></canvas>

    </div>
  </main>
</body>
```

## Basic Colors and Layout

To give our demo some color and layout we’re defining some basic styles.

```
body.tutorial {
  --color-text: #fff;
  --color-bg: #171717;
  --color-link: #ff0000;
  background-color: var(--color-bg);
}
.page {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.page__inner {
  display: flex;
  justify-content: center;
  width: 100%;
}
```

## The Basic Cursor Styles

Basically both cursor elements have a fixed position. To be exactly at the tip of the mouse pointer, we adjust **left** and **top** of the small cursor. The canvas will simply fill the whole viewport.

```
.cursor {
  position: fixed;
  left: 0;
  top: 0;
  pointer-events: none;
}
.cursor--small {
  width: 5px;
  height: 5px;
  left: -2.5px;
  top: -2.5px;
  border-radius: 50%;
  z-index: 11000;
  background: var(--color-text);
}
.cursor--canvas {
  width: 100vw;
  height: 100vh;
  z-index: 12000;
}
```

## The Link Element(s)

For the sake of simplicity we will just take one link element which contains an SVG icon that we can then animate on hover.

```
<nav class="nav">
 <a href="#" class="link">
  <svg class="settings-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
   <g class="settings-icon__group settings-icon__group--1">
     <line class="settings-icon__line" x1="79.69" y1="16.2" x2="79.69" y2="83.8"/>
     <rect class="settings-icon__rect" x="73.59" y="31.88" width="12.19" height="12.19"/>
    </g>
   <g class="settings-icon__group settings-icon__group--2">
     <line class="settings-icon__line" x1="50.41" y1="16.2" x2="50.41" y2="83.8"/>
     <rect class="settings-icon__rect" x="44.31" y="54.33" width="12.19" height="12.19"/>
   </g>
   <g class="settings-icon__group settings-icon__group--3">
     <line class="settings-icon__line" x1="20.31" y1="16.2" x2="20.31" y2="83.8"/>
     <rect class="settings-icon__rect" x="14.22" y="26.97" width="12.19" height="12.19"/>
   </g>
  </svg>
 </a>
 <!-- you can add more links here -->
</nav>
```

## The Navigation and Link Styles

Here we’re defining some styles for the navigation, its items and hover transitions.

```
.nav {
  display: flex;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.link {
  display: flex;
  width: 75px;
  height: 75px;
  margin: 0 5px;
  justify-content: center;
  align-items: center;
}
.settings-icon {
  display: block;
  width: 40px;
  height: 40px;
}
.settings-icon__line {
  stroke: var(--color-text);
  stroke-width: 5px;
  transition: all 0.2s ease 0.05s;
}
.settings-icon__rect {
  stroke: var(--color-text);
  fill: var(--color-bg);
  stroke-width: 5px;
  transition: all 0.2s ease 0.05s;
}
.link:hover .settings-icon__line,
.link:hover .settings-icon__rect {
  stroke: var(--color-link);
  transition: all 0.2s ease 0.05s;
}
.link:hover .settings-icon__group--1 .settings-icon__rect {
  transform: translateY(20px);
}
.link:hover .settings-icon__group--2 .settings-icon__rect {
  transform: translateY(-20px);
}
.link:hover .settings-icon__group--3 .settings-icon__rect {
  transform: translateY(25px);
}
```

![This is what the result should look like by now.](https://tympanus.net/codrops/wp-content/uploads/2019/01/hover-state.gif?x95600)

This is what the result should look like by now.

## Including Paper and SimplexNoise

As mentioned before, we need to include [Paper.js](http://paperjs.org). To animate the noisy circle we need [Simplex Noise](https://github.com/jwagner/simplex-noise.js) in addition to that.

```
<script src="https://cdnjs.cloudflare.com/ajax/libs/paper.js/0.12.0/paper-core.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/simplex-noise/2.4.0/simplex-noise.min.js"></script>
```

## Hiding the System Cursor

Because we’re building our own cursor, we need to make sure to not show the system’s cursor in its normal state and when hovering links.

```
.page, .page a {
 cursor: none;
}
```

## Animating the Small Dot Cursor

In order to have smooth performance we use a requestAnimationFrame()-loop.

```
// set the starting position of the cursor outside of the screen
let clientX = -100;
let clientY = -100;
const innerCursor = document.querySelector(".cursor--small");

const initCursor = () => {
  // add listener to track the current mouse position
  document.addEventListener("mousemove", e => {
    clientX = e.clientX;
    clientY = e.clientY;
  });

  // transform the innerCursor to the current mouse position
  // use requestAnimationFrame() for smooth performance
  const render = () => {
    innerCursor.style.transform = `translate(${clientX}px, ${clientY}px)`;
    // if you are already using TweenMax in your project, you might as well
    // use TweenMax.set() instead
    // TweenMax.set(innerCursor, {
    //   x: clientX,
    //   y: clientY
    // });

    requestAnimationFrame(render);
  };
  requestAnimationFrame(render);
};

initCursor();
```

## Setting up the Circle on Canvas

The following is the basis for the red circle part of the cursor. In order to move the red circle around we’ll use a technique called linear interpolation.

```
let lastX = 0;
let lastY = 0;
let isStuck = false;
let showCursor = false;
let group, stuckX, stuckY, fillOuterCursor;

const initCanvas = () => {
  const canvas = document.querySelector(".cursor--canvas");
  const shapeBounds = {
    width: 75,
    height: 75
  };
  paper.setup(canvas);
  const strokeColor = "rgba(255, 0, 0, 0.5)";
  const strokeWidth = 1;
  const segments = 8;
  const radius = 15;

  // we'll need these later for the noisy circle
  const noiseScale = 150; // speed
  const noiseRange = 4; // range of distortion
  let isNoisy = false; // state

  // the base shape for the noisy circle
  const polygon = new paper.Path.RegularPolygon(
    new paper.Point(0, 0),
    segments,
    radius
  );
  polygon.strokeColor = strokeColor;
  polygon.strokeWidth = strokeWidth;
  polygon.smooth();
  group = new paper.Group([polygon]);
  group.applyMatrix = false;

  const noiseObjects = polygon.segments.map(() => new SimplexNoise());
  let bigCoordinates = [];

  // function for linear interpolation of values
  const lerp = (a, b, n) => {
    return (1 - n) * a + n * b;
  };

  // function to map a value from one range to another range
  const map = (value, in_min, in_max, out_min, out_max) => {
    return (
      ((value - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
    );
  };

  // the draw loop of Paper.js
  // (60fps with requestAnimationFrame under the hood)
  paper.view.onFrame = event => {
    // using linear interpolation, the circle will move 0.2 (20%)
    // of the distance between its current position and the mouse
    // coordinates per Frame
    lastX = lerp(lastX, clientX, 0.2);
    lastY = lerp(lastY, clientY, 0.2);
    group.position = new paper.Point(lastX, lastY);
  }
}

initCanvas();
```

![cursor-move](https://tympanus.net/codrops/wp-content/uploads/2019/01/cursor-move.gif?x95600)

The custom cursor already flying around on the screen.

## Handling the Hover State

```
const initHovers = () => {

  // find the center of the link element and set stuckX and stuckY
  // these are needed to set the position of the noisy circle
  const handleMouseEnter = e => {
    const navItem = e.currentTarget;
    const navItemBox = navItem.getBoundingClientRect();
    stuckX = Math.round(navItemBox.left + navItemBox.width / 2);
    stuckY = Math.round(navItemBox.top + navItemBox.height / 2);
    isStuck = true;
  };

  // reset isStuck on mouseLeave
  const handleMouseLeave = () => {
    isStuck = false;
  };

  // add event listeners to all items
  const linkItems = document.querySelectorAll(".link");
  linkItems.forEach(item => {
    item.addEventListener("mouseenter", handleMouseEnter);
    item.addEventListener("mouseleave", handleMouseLeave);
  });
};

initHovers();
```

## Making the Circle “Magnetic” and “Noisy”

The following snipped is the extended version of the above-mentioned paper.view.onFrame method.

```
// the draw loop of Paper.js
// (60fps with requestAnimationFrame under the hood)
paper.view.onFrame = event => {
  // using linear interpolation, the circle will move 0.2 (20%)
  // of the distance between its current position and the mouse
  // coordinates per Frame
  if (!isStuck) {
    // move circle around normally
    lastX = lerp(lastX, clientX, 0.2);
    lastY = lerp(lastY, clientY, 0.2);
    group.position = new paper.Point(lastX, lastY);
  } else if (isStuck) {
    // fixed position on a nav item
    lastX = lerp(lastX, stuckX, 0.2);
    lastY = lerp(lastY, stuckY, 0.2);
    group.position = new paper.Point(lastX, lastY);
  }

  if (isStuck && polygon.bounds.width < shapeBounds.width) {
    // scale up the shape
    polygon.scale(1.08);
  } else if (!isStuck && polygon.bounds.width > 30) {
    // remove noise
    if (isNoisy) {
      polygon.segments.forEach((segment, i) => {
        segment.point.set(bigCoordinates[i][0], bigCoordinates[i][1]);
      });
      isNoisy = false;
      bigCoordinates = [];
    }
    // scale down the shape
    const scaleDown = 0.92;
    polygon.scale(scaleDown);
  }

  // while stuck and big, apply simplex noise
  if (isStuck && polygon.bounds.width >= shapeBounds.width) {
    isNoisy = true;
    // first get coordinates of large circle
    if (bigCoordinates.length === 0) {
      polygon.segments.forEach((segment, i) => {
        bigCoordinates[i] = [segment.point.x, segment.point.y];
      });
    }

    // loop over all points of the polygon
    polygon.segments.forEach((segment, i) => {

      // get new noise value
      // we divide event.count by noiseScale to get a very smooth value
      const noiseX = noiseObjects[i].noise2D(event.count / noiseScale, 0);
      const noiseY = noiseObjects[i].noise2D(event.count / noiseScale, 1);

      // map the noise value to our defined range
      const distortionX = map(noiseX, -1, 1, -noiseRange, noiseRange);
      const distortionY = map(noiseY, -1, 1, -noiseRange, noiseRange);

      // apply distortion to coordinates
      const newX = bigCoordinates[i][0] + distortionX;
      const newY = bigCoordinates[i][1] + distortionY;

      // set new (noisy) coodrindate of point
      segment.point.set(newX, newY);
    });

  }
  polygon.smooth();
};
```

![hover-perlin](https://tympanus.net/codrops/wp-content/uploads/2019/01/hover-perlin.gif?x95600)

And et voilà, there we have our smooth and noisy circle effect.

## General Remarks

I hope you enjoyed this tutorial and have fun playing around with it in your own projects. Of course this is just a starting point and you can go crazier with animations, shapes, colors etc. If you have any questions, please feel free to [reach out](https://tympanus.net/cdn-cgi/l/email-protection#a0d3d4c5c6c1cee0d3d4cb8ed7cfd2cbd3) or [shoot me a tweet](https://twitter.com/skaltenegger)!

## References and Credits

* Images from [Unsplash.com](https://www.unsplash.com)
* [Paper.js](http://paperjs.org) by Jürg Lehni & Jonathan Puckey
* [Simplex Noise](https://github.com/jwagner/simplex-noise.js) by Jonas Wagner
* [PhotoSwipe](http://www.photoswipe.com) by Dmitry Semenov
* [Swiper](https://idangero.us/swiper/) by [iDangero.us](https://idangero.us/)
* [TweenMax](https://www.greensock.com) by Greensock
* [Lazysizes](https://github.com/aFarkas/lazysizes) by Alexander Farkas
