---
source: https://tympanus.net/codrops/2025/06/11/building-an-infinite-parallax-grid-with-gsap-and-seamless-tiling/
title: "Building an Infinite Parallax Grid with GSAP and Seamless Tiling | Codrops"
fetched: 2026-10-28
---

By [Jorge Toloza](https://tympanus.net/codrops/author/jorgetloza/ "Posts by Jorge Toloza")
in
[Tutorials](https://tympanus.net/codrops/category/tutorials/) on
June 11, 2025

# Building an Infinite Parallax Grid with GSAP and Seamless Tiling

Learn how to create a responsive, infinitely scrolling image grid with parallax motion and staggered text animations using GSAP.

[grid](https://tympanus.net/codrops/tag/grid/) [GSAP](https://tympanus.net/codrops/tag/gsap/) [infinite](https://tympanus.net/codrops/tag/infinite/) [parallax](https://tympanus.net/codrops/tag/parallax/)

[![](https://tympanus.net/codrops/wp-content/uploads/2025/05/featuredInfintieLayersGrid.jpg?x95600)](https://tympanus.net/Tutorials/InfiniteLayersGrid "Building an Infinite Parallax Grid with GSAP and Seamless Tiling Demo")

[Demo](https://tympanus.net/Tutorials/InfiniteLayersGrid)
[Code](https://github.com/JorgeCapillo/infinite-layers-grid)

Hey! [Jorge Toloza](https://jorgetoloza.co) again, Co-Founder and Creative Director at [DDS Studio](https://ddsstudio.co/). In this tutorial, we’re going to build a visually rich, infinitely scrolling grid where images move with a parallax effect based on scroll and drag interactions.

We’ll use GSAP for buttery-smooth animations, add a sprinkle of math to achieve infinite tiling, and bring it all together with dynamic visibility animations and a staggered intro reveal.

Let’s get started!

[](https://tympanus.net/codrops/wp-content/uploads/2025/05/Infinite-Layers-Grid_smaller.mp4)

## Setting Up the HTML Container

To start, we only need a single container to hold all the tiled image elements. Since we’ll be generating and positioning each tile dynamically with JavaScript, there’s no need for any static markup inside. This keeps our HTML clean and scalable as we duplicate tiles for infinite scrolling.

```markup
<div id="images"></div>
```

## Basic Styling for the Grid Items

Now that we have our container, let’s give it the foundational styles it needs to hold and animate a large set of tiles.

We’ll use `absolute` positioning for each tile so we can freely place them anywhere in the grid. The outer container (`#images`) is set to `relative` so that all child `.item` elements are positioned correctly inside it. Each image fills its tile, and we’ll use `will-change: transform` to optimize animation performance.

```css
#images {
  width: 100%;
  height: 100%;
  display: inline-block;
  white-space: nowrap;
  position: relative;
  .item {
    position: absolute;
    top: 0;
    left: 0;
    will-change: transform;
    white-space: normal;
    .item-wrapper {
      will-change: transform;
    }
    .item-image {
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        will-change: transform;
      }
    }
    small {
      width: 100%;
      display: block;
      font-size: 8rem;
      line-height: 1.25;
      margin-top: 12rem;
    }
  }
}
```

## Defining Item Positions with JSON from Figma

To control the visual layout of our grid, we’ll use design data exported directly from **Figma**. This gives us pixel-perfect placement while keeping layout logic separate from our code.

I created a quick layout in Figma using rectangles to represent tile positions and dimensions. Then I exported that data into a JSON file, giving us a simple array of objects containing `x`, `y`, `w`, and `h` values for each tile.

![](https://tympanus.net/codrops/wp-content/uploads/2025/05/image-9-800x522.png?x95600)

```json
[
      {x: 71, y: 58, w: 400, h: 270},
      {x: 211, y: 255, w: 540, h: 360},
      {x: 631, y: 158, w: 400, h: 270},
      {x: 1191, y: 245, w: 260, h: 195},
      {x: 351, y: 687, w: 260, h: 290},
      {x: 751, y: 824, w: 205, h: 154},
      {x: 911, y: 540, w: 260, h: 350},
      {x: 1051, y: 803, w: 400, h: 300},
      {x: 71, y: 922, w: 350, h: 260},
]
```

## Generating an Infinite Grid with JavaScript

With the layout data defined, the next step is to dynamically generate our tile grid in the DOM and enable it to scroll infinitely in both directions.

This involves three main steps:

1. **Compute the scaled tile dimensions** based on the viewport and the original Figma layout’s aspect ratio.
2. **Duplicate the grid in both the X and Y axes** so that as one tile set moves out of view, another seamlessly takes its place.
3. **Store metadata for each tile**, such as its original position and a random easing value, which we’ll use to vary the parallax animation slightly for a more organic effect.

The infinite scroll illusion is achieved by duplicating the entire tile set horizontally and vertically. This 2×2 tiling approach ensures there’s always a full set of tiles ready to slide into view as the user scrolls or drags.

```javascript
onResize() {
  // Get current viewport dimensions
  this.winW = window.innerWidth;
  this.winH = window.innerHeight;

  // Scale tile size to match viewport width while keeping original aspect ratio
  this.tileSize = {
    w: this.winW,
    h: this.winW * (this.originalSize.h / this.originalSize.w),
  };

  // Reset scroll state
  this.scroll.current = { x: 0, y: 0 };
  this.scroll.target = { x: 0, y: 0 };
  this.scroll.last = { x: 0, y: 0 };

  // Clear existing tiles from container
  this.$container.innerHTML = '';

  // Scale item positions and sizes based on new tile size
  const baseItems = this.data.map((d, i) => {
    const scaleX = this.tileSize.w / this.originalSize.w;
    const scaleY = this.tileSize.h / this.originalSize.h;
    const source = this.sources[i % this.sources.length];
    return {
      src: source.src,
      caption: source.caption,
      x: d.x * scaleX,
      y: d.y * scaleY,
      w: d.w * scaleX,
      h: d.h * scaleY,
    };
  });

  this.items = [];

  // Offsets to duplicate the grid in X and Y for seamless looping (2x2 tiling)
  const repsX = [0, this.tileSize.w];
  const repsY = [0, this.tileSize.h];

  baseItems.forEach((base) => {
    repsX.forEach((offsetX) => {
      repsY.forEach((offsetY) => {
        // Create item DOM structure
        const el = document.createElement('div');
        el.classList.add('item');
        el.style.width = `${base.w}px`;

        const wrapper = document.createElement('div');
        wrapper.classList.add('item-wrapper');
        el.appendChild(wrapper);

        const itemImage = document.createElement('div');
        itemImage.classList.add('item-image');
        itemImage.style.width = `${base.w}px`;
        itemImage.style.height = `${base.h}px`;
        wrapper.appendChild(itemImage);

        const img = new Image();
        img.src = `./img/${base.src}`;
        itemImage.appendChild(img);

        const caption = document.createElement('small');
        caption.innerHTML = base.caption;

        // Split caption into lines for staggered animation
        const split = new SplitText(caption, {
          type: 'lines',
          mask: 'lines',
          linesClass: 'line'
        });
        split.lines.forEach((line, i) => {
          line.style.transitionDelay = `${i * 0.15}s`;
          line.parentElement.style.transitionDelay = `${i * 0.15}s`;
        });

        wrapper.appendChild(caption);
        this.$container.appendChild(el);

        // Observe caption visibility for animation triggering
        this.observer.observe(caption);

        // Store item metadata including offset, easing, and bounding box
        this.items.push({
          el,
          container: itemImage,
          wrapper,
          img,
          x: base.x + offsetX,
          y: base.y + offsetY,
          w: base.w,
          h: base.h,
          extraX: 0,
          extraY: 0,
          rect: el.getBoundingClientRect(),
          ease: Math.random() * 0.5 + 0.5, // Random parallax easing for organic movement
        });
      });
    });
  });

  // Double the tile area to account for 2x2 duplication
  this.tileSize.w *= 2;
  this.tileSize.h *= 2;

  // Set initial scroll position slightly off-center for visual balance
  this.scroll.current.x = this.scroll.target.x = this.scroll.last.x = -this.winW * 0.1;
  this.scroll.current.y = this.scroll.target.y = this.scroll.last.y = -this.winH * 0.1;
}
```

### Key Concepts

* **Scaling the layout** ensures that your Figma-defined design adapts to any screen size without distortion.
* **2×2 duplication** ensures seamless continuity when the user scrolls in any direction.
* **Random easing values** create slight variation in tile movement, making the parallax effect feel more natural.
* **`extraX` and `extraY` values** will later be used to shift tiles back into view once they scroll offscreen.
* **[SplitText](https://gsap.com/docs/v3/Plugins/SplitText/) animation** is used to break each caption (`<small>`) into individual lines, enabling line-by-line animation.

## Adding Interactive Scroll and Drag Events

To bring the infinite grid to life, we need to connect it to user input. This includes:

* Scrolling with the mouse wheel or trackpad
* Dragging with a pointer (mouse or touch)
* Smooth motion between input updates using linear interpolation (lerp)

Rather than instantly snapping to new positions, we interpolate between the current and target scroll values, which creates fluid, natural transitions.

### Scroll and Drag Tracking

We capture two types of user interaction:

**1**) **Wheel Events**
Wheel input updates a target scroll position. We multiply the deltas by a damping factor to control sensitivity.

```javascript
onWheel(e) {
  e.preventDefault();
  const factor = 0.4;
  this.scroll.target.x -= e.deltaX * factor;
  this.scroll.target.y -= e.deltaY * factor;
}
```

**2) Pointer Dragging**
On mouse or touch input, we track when the drag starts, then update scroll targets based on the pointer’s movement.

```javascript
onMouseDown(e) {
  e.preventDefault();
  this.isDragging = true;
  document.documentElement.classList.add('dragging');
  this.mouse.press.t = 1;
  this.drag.startX = e.clientX;
  this.drag.startY = e.clientY;
  this.drag.scrollX = this.scroll.target.x;
  this.drag.scrollY = this.scroll.target.y;
}

onMouseUp() {
  this.isDragging = false;
  document.documentElement.classList.remove('dragging');
  this.mouse.press.t = 0;
}

onMouseMove(e) {
  this.mouse.x.t = e.clientX / this.winW;
  this.mouse.y.t = e.clientY / this.winH;

  if (this.isDragging) {
    const dx = e.clientX - this.drag.startX;
    const dy = e.clientY - this.drag.startY;
    this.scroll.target.x = this.drag.scrollX + dx;
    this.scroll.target.y = this.drag.scrollY + dy;
  }
}
```

### Smoothing Motion with Lerp

In the render loop, we interpolate between the current and target scroll values using a lerp function. This creates smooth, decaying motion rather than abrupt changes.

```javascript
render() {
  // Smooth current → target
  this.scroll.current.x += (this.scroll.target.x - this.scroll.current.x) * this.scroll.ease;
  this.scroll.current.y += (this.scroll.target.y - this.scroll.current.y) * this.scroll.ease;

  // Calculate delta for parallax
  const dx = this.scroll.current.x - this.scroll.last.x;
  const dy = this.scroll.current.y - this.scroll.last.y;

  // Update each tile
  this.items.forEach(item => {
    const parX = 5 * dx * item.ease + (this.mouse.x.c - 0.5) * item.rect.width * 0.6;
    const parY = 5 * dy * item.ease + (this.mouse.y.c - 0.5) * item.rect.height * 0.6;

    // Infinite wrapping
    const posX = item.x + this.scroll.current.x + item.extraX + parX;
    if (posX > this.winW)  item.extraX -= this.tileSize.w;
    if (posX + item.rect.width < 0) item.extraX += this.tileSize.w;

    const posY = item.y + this.scroll.current.y + item.extraY + parY;
    if (posY > this.winH)  item.extraY -= this.tileSize.h;
    if (posY + item.rect.height < 0) item.extraY += this.tileSize.h;

    item.el.style.transform = `translate(${posX}px, ${posY}px)`;
  });

  this.scroll.last.x = this.scroll.current.x;
  this.scroll.last.y = this.scroll.current.y;

  requestAnimationFrame(this.render);
}
```

The `scroll.ease` value controls how fast the scroll position catches up to the target—smaller values result in slower, smoother motion.

## Animating Item Visibility with IntersectionObserver

To enhance the visual hierarchy and focus, we’ll highlight only the tiles that are currently within the viewport. This creates a dynamic effect where captions appear and styling changes as tiles enter view.

We’ll use the **IntersectionObserver API** to detect when each tile becomes visible and toggle a CSS class accordingly.

```javascript
this.observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    entry.target.classList.toggle('visible', entry.isIntersecting);
  });
});
// …and after appending each wrapper:
this.observer.observe(wrapper);
```

## Creating an Intro Animation with GSAP

To finish the experience with a strong visual entry, we’ll animate all currently visible tiles from the center of the screen into their natural grid positions. This creates a polished, attention-grabbing introduction and adds a sense of depth and intentionality to the layout.

We’ll use **GSAP** for this animation, utilizing `gsap.set()` to position elements instantly, and `gsap.to()` with staggered timing to animate them into place.

### **Selecting Visible Tiles for Animation**

First, we filter all tile elements to include only those currently visible in the viewport. This avoids animating offscreen elements and keeps the intro lightweight and focused:

```javascript
import gsap from 'gsap';
initIntro() {
  this.introItems = [...this.$container.querySelectorAll('.item-wrapper')].filter((item) => {
    const rect = item.getBoundingClientRect();
    return (
      rect.x > -rect.width &&
      rect.x < window.innerWidth + rect.width &&
      rect.y > -rect.height &&
      rect.y < window.innerHeight + rect.height
    );
  });
  this.introItems.forEach((item) => {
    const rect = item.getBoundingClientRect();
    const x = -rect.x + window.innerWidth * 0.5 - rect.width * 0.5;
    const y = -rect.y + window.innerHeight * 0.5 - rect.height * 0.5;
    gsap.set(item, { x, y });
  });
}
```

### **Animating to Final Positions**

Once the tiles are centered, we animate them outward to their natural positions using a smooth easing curve and staggered timing:

```javascript
intro() {
  gsap.to(this.introItems.reverse(), {
    duration: 2,
    ease: 'expo.inOut',
    x: 0,
    y: 0,
    stagger: 0.05,
  });
}
```

* `x: 0, y: 0` restores the original position set via CSS transforms.
* `expo.inOut` provides a dramatic but smooth easing curve.
* `stagger` creates a cascading effect, enhancing visual rhythm

## **Wrapping Up**

What we’ve built is a scrollable, draggable image grid with a parallax effect, visibility animations, and a smooth GSAP-powered intro. It’s a flexible base you can adapt for creative galleries, interactive backgrounds, or experimental interfaces.
