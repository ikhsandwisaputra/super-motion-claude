---
source: https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.observe()
title: "ScrollTrigger.observe"
fetched: 2026-10-28
---

# ScrollTrigger.observe

### ScrollTrigger.observe( config:Object ) : Observer

Super-flexible, unified way to sense meaningful events across all (touch/mouse/pointer) devices without wrestling with all the implementation details. Trigger simple callbacks like onUp, onDown, onLeft, onRight, onChange, onHover, onDrag, etc. Functionally identical to [Observer.create()](/docs/v3/Plugins/Observer/static.create\(\).md)

#### Parameters

* #### **config**: Object

  A configuration object with properties like target, type, onUp, onDown, etc.

### Returns : Observer[​](#returns--observer "Direct link to Returns : Observer")

An Observer object that has properties like `deltaX`, `deltaY`, etc. See [Observer docs](/docs/v3/Plugins/Observer/.md) for details.

### Details[​](#details "Direct link to Details")

Super-flexible, unified way to sense meaningful events across all (touch/mouse/pointer) devices without wrestling with all the implementation details. Perhaps you want to respond to "scroll-like" user behavior which could be a mouse wheel spin, finger swipe on a touch device, a scrollbar drag, or a pointer press & drag...and of course you need directional data and velocity. No problem!

`ScrollTrigger.observe()` is just a convenient way to access [Observer.create()](/docs/v3/Plugins/Observer/static.create\(\).md). Since [ScrollTrigger.normalizeScroll()](/docs/v3/Plugins/ScrollTrigger/static.normalizeScroll\(\).md) functionality leverages Observer under the hood (thus it's included inside ScrollTrigger anyway), it made sense to expose its functionality so that you can avoid loading Observer as a separate file if you're already using ScrollTrigger in your project. You're welcome. 🙂

Look how easy it is to trigger next()/previous() functions based on when the user swipes up/down or uses their mouse wheel:

```
ScrollTrigger.observe({
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

## Configuration and Usage Details[​](#configuration-and-usage-details "Direct link to Configuration and Usage Details")

Please see the [Observer docs](/docs/v3/Plugins/Observer/.md) for all the nitty-gritty details.
