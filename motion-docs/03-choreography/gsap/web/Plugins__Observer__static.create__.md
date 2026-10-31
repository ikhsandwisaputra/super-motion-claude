---
source: https://gsap.com/docs/v3/Plugins/Observer/static.create()
title: "Observer.create"
fetched: 2026-10-28
---

# Observer.create

### Observer.create( vars:Object ) : Observer

Creates a new Observer instance according to the configuration details provided.

#### Parameters

* #### **vars**: Object

  A configuration object with whatever settings and callbacks you want, like `type`, `onChange`, `onUp`, `onDown`, `debounce`, etc.

### Details[​](#details "Direct link to Details")

Creates a new Observer instance according to the configuration details provided (all of which are optional). For example:

```
Observer.create({
  target: window, // can be any element (selector text is fine)
  type: "wheel,touch", // comma-delimited list of what to listen for ("wheel,touch,scroll,pointer")
  onUp: () => previous(),
  onDown: () => next(),
});
```

## Demo[​](#demo "Direct link to Demo")

Notice there's no actual scrolling in the demo below but you can use your mouse wheel (or swipe on touch devices) to initiate movement so it "feels" like a scroll:

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/XWzRraJ)

```
<!--
Sections animate in and out on scroll. Scroll up or down and the sections will wrap around after hitting the start or end. Uses GSAP for the animations.
-->

<header>
  <div>Animated Sections</div>
  <div><a href="https://codepen.io/BrianCross/pen/PoWapLP">Original Inspiration</a></div>
</header>
<section class="first">
  <div class="outer">
    <div class="inner">
      <div class="bg one">
        <h2 class="section-heading">Scroll down</h2>
      </div>
    </div>
  </div>

</section>
<section class="second">
  <div class="outer">
    <div class="inner">
      <div class="bg">
        <h2 class="section-heading">Animated with GSAP</h2>
      </div>
    </div>
  </div>
</section>
<section class="third">
  <div class="outer">
    <div class="inner">
      <div class="bg">
        <h2 class="section-heading">GreenSock</h2>
      </div>
    </div>
  </div>
</section>
<section class="fourth">
  <div class="outer">
    <div class="inner">
      <div class="bg">
        <h2 class="section-heading">Animation platform</h2>
      </div>
    </div>
  </div>
</section>
<section class="fifth">
  <div class="outer">
    <div class="inner">
      <div class="bg">
        <h2 class="section-heading">Keep scrolling</h2>
      </div>
    </div>
  </div>
</section>
```

```
* {
  box-sizing: border-box;
  user-select: none;
}

a {
  color: var(--color-surface-white);
  text-decoration: none;
}

body {
  margin: 0;
  padding: 0;
  height: 100vh;
  color: var(--light);
  text-transform: uppercase;
}

h2 {
  font-size: clamp(1rem, 6vw, 10rem);
  font-weight: 600;
  line-height: 1.2;
  text-align: center;
  margin-right: -0.5em;
  width: 90vw;
  max-width: 1200px;
  text-transform: none;
}

header {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5%;
  width: 100%;
  z-index: 3;
  height: 7em;
  font-size: clamp(0.66rem, 2vw, 1rem);
  letter-spacing: 0.5em;
}

section {
  height: 100%;
  width: 100%;
  top: 0;
  position: fixed;
  visibility: hidden;
}
section .outer,
section .inner {
  width: 100%;
  height: 100%;
  overflow-y: hidden;
}
section .bg {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  background-size: cover;
  background-position: center;
}
section .bg h2 {
  z-index: 999;
}
section .bg .clip-text {
  overflow: hidden;
}

.first .bg {
  background-image: linear-gradient(180deg, rgba(0, 0, 0, 0.6) 50%, rgba(0, 0, 0, 0.1) 100%), url("/demo-assets/site-landscape-1.jpg");
}

.second .bg {
  background-image: linear-gradient(180deg, rgba(0, 0, 0, 0.6) 50%, rgba(0, 0, 0, 0.1) 100%), url("/demo-assets/site-landscape-2.jpg");
}

.third .bg {
  background-image: linear-gradient(180deg, rgba(0, 0, 0, 0.6) 50%, rgba(0, 0, 0, 0.1) 100%), url("/demo-assets/site-landscape-3.jpg");
}

.fourth .bg {
  background-image: linear-gradient(180deg, rgba(0, 0, 0, 0.6) 50%, rgba(0, 0, 0, 0.1) 100%), url("/demo-assets/site-landscape-4.jpg");
}

.fifth .bg {
  background-image: linear-gradient(180deg, rgba(0, 0, 0, 0.6) 50%, rgba(0, 0, 0, 0.1) 100%), url("/demo-assets/site-landscape-5.jpg");
  background-position: 50% 45%;
}

h2 * {
  will-change: transform;
}
```

```
gsap.registerPlugin(Observer);

let sections = document.querySelectorAll("section"),
  images = document.querySelectorAll(".bg"),
  headings = gsap.utils.toArray(".section-heading"),
  outerWrappers = gsap.utils.toArray(".outer"),
  innerWrappers = gsap.utils.toArray(".inner"),
  splitHeadings = headings.map(heading => new SplitText(heading, { type: "chars,words,lines", linesClass: "clip-text" })),
  currentIndex = -1,
  wrap = gsap.utils.wrap(0, sections.length),
  animating;

gsap.set(outerWrappers, { yPercent: 100 });
gsap.set(innerWrappers, { yPercent: -100 });

function gotoSection(index, direction) {
  index = wrap(index); // make sure it's valid
  animating = true;
  let fromTop = direction === -1,
      dFactor = fromTop ? -1 : 1,
      tl = gsap.timeline({
        defaults: { duration: 1.25, ease: "power1.inOut" },
        onComplete: () => animating = false
      });
  if (currentIndex >= 0) {
    // The first time this function runs, current is -1
    gsap.set(sections[currentIndex], { zIndex: 0 });
    tl.to(images[currentIndex], { yPercent: -15 * dFactor })
      .set(sections[currentIndex], { autoAlpha: 0 });
  }
  gsap.set(sections[index], { autoAlpha: 1, zIndex: 1 });
  tl.fromTo([outerWrappers[index], innerWrappers[index]], { 
      yPercent: i => i ? -100 * dFactor : 100 * dFactor
    }, { 
      yPercent: 0 
    }, 0)
    .fromTo(images[index], { yPercent: 15 * dFactor }, { yPercent: 0 }, 0)
    .fromTo(splitHeadings[index].chars, { 
        autoAlpha: 0, 
        yPercent: 150 * dFactor
    }, {
        autoAlpha: 1,
        yPercent: 0,
        duration: 1,
        ease: "power2",
        stagger: {
          each: 0.02,
          from: "random"
        }
      }, 0.2);

  currentIndex = index;
}

Observer.create({
  type: "wheel,touch,pointer",
  wheelSpeed: -1,
  onDown: () => !animating && gotoSection(currentIndex - 1, -1),
  onUp: () => !animating && gotoSection(currentIndex + 1, 1),
  tolerance: 10,
  preventDefault: true
});

gotoSection(0, 1);

// original: https://codepen.io/BrianCross/pen/PoWapLP
// horizontal version: https://codepen.io/GreenSock/pen/xxWdeMK
```

Plugins[Observer](/docs/v3/Plugins/Observer/.md)[SplitText](/docs/v3/Plugins/SplitText/.md)

## Configuration Properties[​](#configuration-properties "Direct link to Configuration Properties")

The configuration object that is passed to `Observer.create()` can have any of the following optional properties:

| Property    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| axis        | string - when `lockAxis: true` is set, the first drag movement (with type: "pointer" and/or "touch") after each press will set the `axis` property to "x" or "y", depending on which direction the user moved. You can use the `onLockAxis()` callback to know when it gets set.                                                                                                                                                                                                                                                                                                                                                                                |
| capture     | Boolean - if `true`, it will make the touch/pointer-related listeners use the capture phase. Like doing `addEventListener("\[type\]", func, {capture: true})`;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| debounce    | Boolean - by default, Observer will debounce events so that deltas are additive over the course of each requestAnimationFrame() tick in order to maximize performance, but you can disable that with `debounce: false` in which case it will check immediately on every event. The debounce affects all callbacks except `onPress`, `onRelease`, `onHover`, `onHoverEnd`, `onClick`, `onDragStart`, and `onDragEnd` because those aren't delta-related.                                                                                                                                                                                                         |
| dragMinimum | Number - the minimum distance (in pixels) necessary to be considered "dragging". This can help prevent tiny motions especially on touch devices from indicating intent. For example, just pressing down with a finger on a phone may register slight movement of a few pixels even though the user thinks their finger was stationary. dragMinimum only applies to the initial movement after pressing down, but continued dragging thereafter would only be subject to "tolerance" throttling.                                                                                                                                                                 |
| id          | String - an arbitrary string ID which an be used to get the Observer via [Observer.getById()](/docs/v3/Plugins/Observer/static.getById\(\).md).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ignore      | Element \| String \| Array - elements that you'd like the observer to **IGNORE**, so that when a scroll/touch/pointer/mouse event is triggered by one of these elements, it gets ignored completely. It checks the `event.target` to discern if the event should be ignored. You can define `ignore` as an Element reference, selector text like `".ignore-me"`, or an Array of elements (it can be as many as you'd like).                                                                                                                                                                                                                                     |
| lockAxis    | Boolean - if `true`, the Observer will watch the direction of the very first drag move after each press (with type: "pointer" and/or "touch") and lock into that direction until the user releases the pointer/touch. So if the first drag is horizontal, then only the horizontal-related callbacks like `onChangeX()` will fire until the pointer/touch is released. There's even an `onLockAxis()` callback that you can tie into.                                                                                                                                                                                                                           |
| onChange    | Function - function to call when there is movement on **either** the y-axis (vertically) **or** the x-axis (horizontally). It will keep calling the function as long as the movement continues (subject to any tolerance threshold).                                                                                                                                                                                                                                                                                                                                                                                                                            |
| onChangeX   | Function - function to call when there is movement on the x-axis (horizontally). It will keep calling the function as long as the movement continues (subject to any tolerance threshold).                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| onChangeY   | Function - function to call when there is movement on the y-axis (vertically). It will keep calling the function as long as the movement continues (subject to any tolerance threshold).                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| onClick     | Function - function to call when the target is clicked.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| onDown      | Function - function to call when downward motion is detected, meaning the delta values increase (like dragging your finger/mouse DOWNWARD...which makes the `y` coordinate *increase*). If you want to invert only the mouse wheel delta, you can set `wheelSpeed: -1` because it's a multiplier.                                                                                                                                                                                                                                                                                                                                                               |
| onDragStart | Function - function to call when the user presses down on the target and then begins dragging (subject to `dragMinimum`). This only applies to "touch" and/or "pointer" types.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| onDrag      | Function - function to call when the user moves the pointer/touch/mouse **while pressing** on the target element (only applies to "touch" and/or "pointer" types).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| onDragEnd   | Function - function to call when the user stops dragging on the target element (only applies to "touch" and/or "pointer" types).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| onLeft      | Function - function to call when motion is detected toward the left direction.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| onLockAxis  | Function - function to call when the axis gets locked (requires `lockAxis: true`). You can check which axis via the Observer's `axis` property ("x" or "y").                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| onHover     | Function - function to call when the pointer/mouse hovers over the target ("pointerenter"/"mouseenter" event).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| onHoverEnd  | Function - function to call when the pointer/mouse moves off the target ("pointerleave"/"mouseleave" event).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| onMove      | Function - function to call when the user moves the pointer/mouse while hovered over the target element (only applies to "pointer" types). It listens for "pointermove"/"mousemove" events internally. Use `onDrag` if you want it to fire only while pressing and dragging. Note that when you define an onMove, it causes the Observer to measure delta values **while hovering** over the target, consequently triggering the appropriate movement-related callbacks like onUp, onDown, onChange, etc. for any pointer/mouse movement while over the target. Normally the movement-related callbacks are only triggered when the user **presses and drags**. |
| onPress     | Function - function to call when the user presses down on the target element (only applies to "touch" and/or "pointer" types).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| onRelease   | Function - function to call when the touch/pointer is released after the `onPress` was called (only applies to "touch" and/or "pointer" types).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| onRight     | Function - function to call when motion is detected toward the right direction.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| onStop      | Function - function to call when changes have ceased for at least 0.25 seconds (configurable with `onStopDelay`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| onStopDelay | Number - number of seconds to wait after changes have ceased firing before the `onStop` gets called (default: 0.25 seconds).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| onToggleX   | Function - function to call when motion **switches direction** on the x-axis (horizontally).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| onToggleY   | Function - function to call when motion **switches direction** on the y-axis (vertically).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| onUp        | Function - function to call when upward motion is detected, meaning the delta values decrease (like dragging your finger/mouse UPWARD...which makes the `y` coordinate decrease). If you want to invert only the mouse wheel delta, you can set `wheelSpeed: -1` because it's a multiplier.                                                                                                                                                                                                                                                                                                                                                                     |
| onWheel     | Function - function to call when the mouse wheel is used.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| scrollSpeed | Number - a multiplier for scroll delta values. This only applies to type `"scroll"`, meaning when the target dispatches a scroll event which is different than a wheel event. You could set `scrollSpeed: -1` to invert the delta values and have it call `onUp` instead of `onDown` (and vice versa). `scrollSpeed: 0.5` would make the delta values *half* of what they'd normally be. *Note: there's also a separate*`wheelSpeed`*option that only applies to wheel events.*                                                                                                                                                                                 |
| target      | Element \| String - the element whose events should be listened for. By default, it's the main viewport.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| tolerance   | Number - the minimum distance (in pixels) necessary to trigger one of the callbacks like `onUp`, `onDown`, `onChangeY`, etc. So, for example, if the tolerance is 10 but the user only moves 8 pixels, no callback will be fired. Once the distance exceeds the tolerance amount, it fires the callbacks and resets, waiting for that distance to be exceeded again before firing the callback(s).                                                                                                                                                                                                                                                              |
| type        | String - a comma-delimited list of the types of actions you'd like to listen for which can include any (or all) of the following: `"wheel,touch,scroll,pointer"`. "touch" works on any touch devices regardless of browser (iOS/Android may use TouchEvents under the hood whereas Microsoft may use PointerEvents but Observer includes them both in "touch"). "pointer" covers any non-touch pointer/mouse press/drag/swipe movements. "wheel" is for mouse wheel movements, and "scroll" is for scroll events. *Default is* `"wheel,touch,pointer"`                                                                                                          |
| wheelSpeed  | Number - a multiplier for wheel delta values. By default, it merely passes along the wheel event's delta that the browser reports but perhaps it seems faster/slower than when you press/drag with the pointer and you need a way to make them more similar. To make the wheel delta values half of what they normally are, for example, you'd do `wheelSpeed: 0.5`. You could set `wheelSpeed: -1` to invert the delta values and have it call `onUp` instead of `onDown` (and vice versa). *Note: there's also a separate*`scrollSpeed`*option that only applies to scroll events.*                                                                           |

## Callback data[​](#callback-data "Direct link to Callback data")

Each callback is passed the Observer instance itself as the only parameter so that you can easily access data like `self.velocityX`, `self.velocityY`, `self.deltaX`, `self.deltaY`, `self.x`, `self.y`, etc. (see the sidebar to the left for a list of all the available properties) like:

```
Observer.create({
  ...
  onChange: (self) =>  {
    console.log("velocity:", self.velocityX, self.velocityY, "delta:", self.deltaX, self.deltaY, "target element:", self.target, "last event:", self.event);
  }
});
```
