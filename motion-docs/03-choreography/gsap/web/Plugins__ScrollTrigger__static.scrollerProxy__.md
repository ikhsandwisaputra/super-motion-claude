---
source: https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.scrollerProxy()
title: "ScrollTrigger.scrollerProxy"
fetched: 2026-10-28
---

# ScrollTrigger.scrollerProxy

### ScrollTrigger.scrollerProxy( scroller:String | Element, vars:Object )

Allows you to hijack the `scrollTop` and/or `scrollLeft` getters/setters for a particular scroller element so that you can implement things like smooth scrolling or other custom effects.

#### Parameters

* #### **scroller**: String | Element

  Selector text or the Element that is the scroller to be proxied, like `"body"` or `".container"`

* #### **vars**: Object

  An object containing scrollTop and/or scrollLeft functions that serve as proxied getters/setters, like: `{scrollTop: function(value) {...}, scrollLeft: function(value) {...}}`. It can also contain a method for getBoundingClientRect(), scrollWidth(), scrollHeight() as well as an optional pinType: "fixed" | "transform"

### Details[​](#details "Direct link to Details")

Allows you to hijack the `scrollTop` and/or `scrollLeft` getters/setters for a particular scroller element so that you can implement things like smooth scrolling or other custom effects.

GSAP's own [ScrollSmoother](/docs/v3/Plugins/ScrollSmoother/.md) is a smooth-scrolling plugin built **on top** of ScrollTrigger, so it is totally integrated and super easy to use. It uses native scroll technology to avoid most of the accessibility issues that plague other smooth-scrolling libraries. If you would like to use a 3rd party library you may need to make use of scrollerProxy(). We don't support other libraries but as a courtesy we've included some demos below with popular libraries.

## How does it work?[​](#how-does-it-work "Direct link to How does it work?")

Typically ScrollTrigger directly gets/sets the scroll position via the regular properties/methods on that scroller element, but you can provide your own getter/setter functions instead in order to deliver customized experiences, like:

```
// 3rd party library setup:
const bodyScrollBar = Scrollbar.init(document.body, {
  damping: 0.1,
  delegateTo: document,
});

// Tell ScrollTrigger to use these proxy getter/setter methods for the "body" element:
ScrollTrigger.scrollerProxy(document.body, {
  scrollTop(value) {
    if (arguments.length) {
      bodyScrollBar.scrollTop = value; // setter
    }
    return bodyScrollBar.scrollTop; // getter
  },
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
});

// when the smooth scroller updates, tell ScrollTrigger to update() too:
bodyScrollBar.addListener(ScrollTrigger.update);
```

Basically you're saying *"Hey ScrollTrigger, whenever you want to get or set the scrollTop or getBoundingClientRect() on this element, use these methods instead"* and then you do whatever you want inside those methods.

walkthrough

## Special properties[​](#special-properties "Direct link to Special properties")

You **MUST** have either a `scrollTop` or `scrollLeft` getter/setter (or both); the rest may or may not be helpful (they're optional):

| Property              | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| scrollTop             | Function - A method that can serve as a getter AND setter; if it receives an argument, it should be treated as a setter. Otherwise, it should be treated as a getter, returning the current scrollTop value.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| scrollLeft            | Function - A method that can serve as a getter AND setter; if it receives an argument, it should be treated as a setter. Otherwise, it should be treated as a getter, returning the current scrollLeft value.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| fixedMarkers          | Boolean - If `true`, it treat the markers as if they're position: fixed. This is only helpful if you're integrating with a smooth scrolling library that results in markers being placed inside an element that's being translated. If you notice your markers moving when they shouldn't, try setting this to `true`. *(added in 3.7.0)*                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| getBoundingClientRect | Function - A method that returns an object with `top`, `left`, `width`, and `height` properties indicating the bounding rect of the proxied scroller. It is most often `{top: 0, left: 0, width: window.innerWidth, height: window.innerHeight}`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| scrollWidth           | Function - A method that can serve as a getter AND setter; if it receives an argument, it should be treated as a setter. Otherwise, it should be treated as a getter, returning the current scrollWidth value.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| scrollHeight          | Function - A method that can serve as a getter AND setter; if it receives an argument, it should be treated as a setter. Otherwise, it should be treated as a getter, returning the current scrollHeight value.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| pinType               | "fixed" \| "transform" - Determines the manner in which elements get pinned when they're associated with this proxied scroller (if the ScrollTrigger has a `pin` defined). By default, only the `<body>` uses `position: "fixed"` for pinning and in all other cases, transform offsets are used. Why? Because if the any ancestor element has a transform applied (even `transform: translate(0, 0)`), it creates a new context and `position: "fixed"` doesn't behave the way you'd expect. It's a browser thing, not a ScrollTrigger thing. `pinType` lets you force ScrollTrigger to use a specific pinning technique for the proxied scroller. If you notice jittery pins, try setting `pinType: "fixed"` (jitter is usually caused by the fact that the browser handles scrolling of the main page on a different thread, thus transforms that are applied via JS aren't in sync). If pins don't seem to be sticking at all, try setting `pinType: "transform"`. |

GreenSock doesn't recommend or endorse any particular smooth scrolling library - the demos below are based on various forums posts.

## Demo ([Locomotive Scroll](https://github.com/locomotivemtl/locomotive-scroll))[​](#demo-locomotive-scroll "Direct link to demo-locomotive-scroll")

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/1dc38ca14811bc76e25c4b8c686b653d)

```
<div class="smooth-scroll">
  <section class="description panel blue">
    <div><h1>Locomotive Scroll + ScrollTrigger</h1>
      <p>Demonstrates how ScrollTrigger can be used with a smooth scrolling library like Locomotive Scroll, including scrubbing and pinning.</p>
      <div class="scroll-down">Scroll down<div class="arrow"></div></div>
    </div>
  </section>


  <section class="panel red">
    <p><span class="line line-1"></span>This line's animation will begin when it enters the viewport and finish when its top edge hits the top of the viewport, staying perfectly in sync with the scrollbar because it has <code>scrub:&nbsp;true</code></p>
  </section>


  <section class="panel orange">
    <p><span class="line line-2"></span>This orange panel gets pinned when its top edge hits the top of the viewport, then the line's animation is linked with the scroll position until it has traveled 100% of the viewport's height (<code>end: "+=100%"</code>), then the orange panel is unpinned and normal scrolling resumes. Padding is added automatically to push the rest of the content down so that it catches up with the scroll when it unpins. You can set <code>pinSpacing: false</code> to prevent that if you prefer.</p>
  </section>


  <section class="panel purple">
    <p><span class="line line-3"></span>This panel gets pinned in a similar way, and has a more involved animation that's wrapped in a timeline, fading the background color and animating the transforms of the paragraph in addition to the line, all synced with the scroll position perfectly.</p>
  </section>


  <section class="panel gray">
    DONE!
  </section>
  
  
</div>
```

```
.panel {
  height: 100vh;
  color: var(--color-surface-white)!important;
}
.line {
  width: 100%;
  max-width: 800px;
  height: 8px;
  margin: 0 0 10px 0;
  position: relative;
  display: block;
  background-color: rgba(255,255,255,1);
}

/* by default, ScrollTrigger sets overflow to auto so that the scrollbar is factored in particularly when pinning so that the pinned elements' sizes are correct, but with LocomotiveScroll we want to force that to be hidden because it does its own [fake] scrollbar */
.smooth-scroll {
  overflow-y: hidden !important;
}


.orange {
  background-color: var(--color-orangey)
}

.purple {
  background-color: purple
}
```

```
gsap.registerPlugin(ScrollTrigger);

// --- SETUP START ---
// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".smooth-scroll"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".smooth-scroll", {
  scrollTop(value) {
    // console.log("testing 1")
    return arguments.length
      ? locoScroll.scrollTo(value, { duration: 0, disableLerp: true })
      : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    // console.log("testing 2")
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight
    };
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".smooth-scroll").style.transform
    ? "transform"
    : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
ScrollTrigger.defaults({ scroller: ".smooth-scroll" });
// --- SETUP END ---

// --- RED PANEL ---
gsap.from(".line-1", {
  scrollTrigger: {
    trigger: ".line-1",
    scrub: true,
    start: "top bottom",
    end: "top top",
    onUpdate() {
      console.log("Update");
    }
  },
  scaleX: 0,
  transformOrigin: "left center",
  ease: "none"
});

// --- ORANGE PANEL ---
gsap.from(".line-2", {
  scrollTrigger: {
    trigger: ".orange",
    scrub: true,
    pin: true,
    start: "top top",
    end: "+=100%",
    onUpdate() {
      console.log("Update");
    }
  },
  scaleX: 0,
  transformOrigin: "left center",
  ease: "none"
});

// --- PURPLE/GREEN PANEL ---

let createTl = gsap.timeline();

createTl.from(".purple p", { scale: 0.3, rotation: 45, autoAlpha: 0, ease: "power2" })
  .from(
    ".line-3",
    { scaleX: 0, transformOrigin: "left center", ease: "none" },
    0
  )
  .to(".purple", { backgroundColor: "#28a92b" }, 0);

ScrollTrigger.create({
  animation: createTl,
  trigger: ".purple",
  scrub: true,
  pin: true,
  start: "top top",
  end: "+=100%",
  onUpdate() {
    console.log("Update");
  }
});

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();
```

Plugins[ScrollTrigger](/docs/v3/Plugins/ScrollTrigger/.md)

## Demo ([smooth-scrollbar](https://github.com/idiotWu/smooth-scrollbar))[​](#demo-smooth-scrollbar "Direct link to demo-smooth-scrollbar")

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/oNLqgBm)

```
<div class="scroller">

  <section class="green">
    <div class="heading">ScrollTrigger & Smooth-Scrollbar</div>
    <!-- <div class="text">Section 1</div> -->
  </section>

  <section class="grey">
    <div class="text">Section 2</div>
  </section>

  <section class="red">
    <div class="text">Section 3</div>
  </section>

</div>
```

```
/* GSAP brand: fonts, type sizes, colour vars, buttons and form controls.
   Element selectors only, so a demo's own class-based styles still win. */

/* Fonts */
@font-face {
  font-display: swap;
  font-family: Mori;
  font-weight: 400;
  src: url(/fonts/Mori/PPMori-Regular.woff) format("woff");
}
@font-face {
  font-display: swap;
  font-family: Mori;
  font-weight: 600;
  src: url(/fonts/Mori/PPMori-SemiBold.woff) format("woff");
}
@font-face {
  font-display: swap;
  font-family: "Fraktion Mono";
  font-weight: 400;
  src: url(/fonts/Fraktion/PPFraktionMono-Bold.woff) format("woff");
}

/* Colours */
:root {
  --color-shockingly-green: #0ae448;
  --color-just-black: #0e100f;
  --color-surface-white: #fffce1;
  --color-pink: #fec5fb;
  --color-shockingly-pink: #f100cb;
  --color-orangey: #ff8709;
  --color-lilac: #9d95ff;
  --color-lt-green: #abff84;
  --color-blue: #00bae2;
  --color-grey: #191919;
  --color-surface75: #bbbaa6;
  --color-surface50: #7c7c6f;
  --color-surface25: #42433d;

  --gradient-macha: linear-gradient(114.41deg, var(--color-shockingly-green) 20.74%, var(--color-lt-green) 65.5%);
  --gradient-orange-crush: linear-gradient(111.45deg, var(--color-orangey) 19.42%, #f7bdf8 73.08%);
  --gradient-lipstick: linear-gradient(165.72deg, #f7bdf8 21.15%, #cd237f 81.93%);
  --gradient-purple-haze: linear-gradient(153.58deg, #f7bdf8 32.25%, #2f3cc0 92.68%);
  --gradient-skyfall: linear-gradient(131.77deg, #0a157a 30.82%, #15bfe4 81.82%);
  --gradient-emerald-city: linear-gradient(166.9deg, var(--color-shockingly-green) 53.19%, #0085d0 107.69%);
  --gradient-summer-fair: linear-gradient(144.02deg, var(--color-blue) 4.56%, var(--color-pink) 72.98%);

  /* Short names many demos use */
  --dark: var(--color-just-black);
  --light: var(--color-surface-white);
  --mid: var(--color-surface50);
  --grey: var(--color-grey);
  --gray: var(--color-grey);
  --green: var(--color-shockingly-green);
  --green-light: var(--color-lt-green);
  --blue: var(--color-blue);
  --purple: var(--color-lilac);
  --pink: var(--color-pink);
  --orange: var(--color-orangey);
  --red: #cd237f;

  /* Form controls */
  --field-bg: #1c1d1f;
  --field-border: var(--color-surface25);
  --field-radius: 8px;
  --focus-ring: 0 0 0 3px rgba(10, 228, 72, 0.35);

  accent-color: var(--color-shockingly-green);
  color-scheme: dark;
}

/* Type */
* { box-sizing: border-box; }

body {
  margin: 0;
  background-color: var(--color-just-black);
  color: var(--color-surface75);
  font-family: Mori, system-ui, sans-serif;
  font-size: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
  line-height: 1.45;
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3, h4 {
  margin: 0.5em 0;
  color: var(--color-surface-white);
  font-weight: 400;
  line-height: 1.2;
}
h1 { font-size: clamp(2rem, 1.6rem + 2vw, 2.875rem); }
h2 { font-size: clamp(1.625rem, 1.4rem + 1.2vw, 2.2rem); }
h3 { font-size: clamp(1.375rem, 1.25rem + 0.6vw, 1.75rem); }
h4 { font-size: clamp(1.125rem, 1rem + 0.5vw, 1.4rem); }

a { color: inherit; text-underline-offset: 0.15em; }

code, pre, kbd { font-family: "Fraktion Mono", ui-monospace, Menlo, monospace; }

/* Buttons */
button,
input[type="button"],
input[type="submit"],
input[type="reset"] {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
  min-height: 2.5rem;
  padding: 0 1.25rem;
  border: 2px solid var(--color-surface75);
  border-radius: 99px;
  background: var(--color-just-black);
  color: var(--color-surface75);
  font: 600 0.9rem/1 Mori, system-ui, sans-serif;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s, background-color 0.2s;
}
button:hover,
input[type="button"]:hover,
input[type="submit"]:hover,
input[type="reset"]:hover {
  border-color: var(--color-surface-white);
  color: var(--color-surface-white);
}
button:disabled,
input:disabled { opacity: 0.4; cursor: not-allowed; }

/* Form controls */
label { color: var(--color-surface75); font-size: 0.9rem; }

input[type="text"],
input[type="number"],
input[type="email"],
input[type="search"],
input[type="url"],
input:not([type]),
select,
textarea {
  min-height: 2.5rem;
  padding: 0 0.75rem;
  border: 1px solid var(--field-border);
  border-radius: var(--field-radius);
  background: var(--field-bg);
  color: var(--color-surface-white);
  font: 400 0.9rem/1.2 Mori, system-ui, sans-serif;
  transition: border-color 0.2s, box-shadow 0.2s;
}
textarea { padding: 0.6rem 0.75rem; line-height: 1.45; }
input::placeholder,
textarea::placeholder { color: var(--color-surface50); }

input[type="checkbox"],
input[type="radio"] {
  width: 1.1em;
  height: 1.1em;
  margin: 0 0.4em 0 0;
  vertical-align: -0.15em;
}
input[type="range"] { width: min(100%, 18rem); }

button:focus-visible,
input:focus-visible,
select:focus-visible,
textarea:focus-visible {
  outline: none;
  border-color: var(--color-shockingly-green);
  box-shadow: var(--focus-ring);
}


body { 

  margin: 0;
  padding: 0;
  
  height: 100%;
  width: 100%;
  
  overflow: hidden;
}

.scroller {
  height: 100vh;
}

section {
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
}

section .heading {
  position: relative;
  margin: auto;
  font-size: 2.5em;
}

section .text {
  position: relative;
  margin: auto;
  color: white;
  font-size: 2em;
}

section {
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: var(--color-just-black);
}

/* dashed separator between sections */
section{
  border-top: 2px dashed var(--color-surface-white);
}

.green {
  border: none!important;
}

section .heading {
  position: relative;
  margin: auto;
  font-size: 2.5em;
}

section .text {
  position: relative;
  margin: auto;
  font-size: 2em;
}
```

```
gsap.registerPlugin(ScrollTrigger);

// Setup
const scroller = document.querySelector('.scroller');

const bodyScrollBar = Scrollbar.init(scroller, { damping: 0.1, delegateTo: document, alwaysShowTracks: true });

ScrollTrigger.scrollerProxy(".scroller", {
  scrollTop(value) {
    if (arguments.length) {
      bodyScrollBar.scrollTop = value;
    }
    return bodyScrollBar.scrollTop;
  }
});

bodyScrollBar.addListener(ScrollTrigger.update);

ScrollTrigger.defaults({ scroller: scroller });


// The actual animations and ScrollTriggers
gsap.to('section.grey .text', { 
  rotation: 360,
  scrollTrigger: {
    trigger: "section.grey",
    start: "top top", 
    end: () => "+=" + innerHeight,
    pin: true,
    scrub: true,
    markers: true
  }
});

gsap.from("section.red .text", {
  x: -500,
  opacity: 0,
  scrollTrigger: {
    trigger: "section.red",
    start:"top 50%",     
    toggleActions: "play none none reset",
    // markers:true
  },
});





// Only necessary to correct marker position - not needed in production
if (document.querySelector('.gsap-marker-scroller-start')) {		
  const markers = gsap.utils.toArray('[class *= "gsap-marker"]');	

  bodyScrollBar.addListener(({ offset }) => {  
    gsap.set(markers, { marginTop: -offset.y })
  });
}
```

Plugins[ScrollTrigger](/docs/v3/Plugins/ScrollTrigger/.md)

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/GRovmPr)

```
<body id="main-scrollbar">
  
<section class="blank">
  <h1>ScrollTrigger and smooth-scrollbar demo</h1>
  <p>...</p>
</section>

<section class="horizontal">
  <div class="pin-wrap" id="pinThis-0">
    <div class="animation-wrap to-right" id="animateThis-0">
      
      <div class="item">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus, temporibus esse magni illum eos natus ipsum minus? Quis excepturi voluptates atque dolorum minus eligendi! Omnis minima magni recusandae ex dignissimos.</div>
      <div class="item">Eaque ullam illum nobis deleniti mollitia unde, sed, nemo ipsa ratione ex, dicta aliquam voluptates! Odio vitae eum nobis dignissimos sunt ipsum repellendus totam optio distinctio. Laborum suscipit quia aperiam.</div>
      <div class="item">Animi, porro molestias? Reiciendis dolor aspernatur ab quos nulla impedit, dolores ullam hic commodi nobis nam. Dolorem expedita laudantium dignissimos nobis a. Dolorem, unde quidem. Tempora et a quibusdam inventore!</div>
      <div class="item">Labore, unde amet! Alias delectus hic laboriosam et dolorum? Saepe, dicta eaque? Veniam eos blanditiis neque. Officia et nostrum, tempore modi quo praesentium aspernatur vero dolor, ipsa unde perspiciatis minima.</div>
      <div class="item">Quaerat error dolorem aspernatur magni dicta ut consequuntur maxime tempore. Animi odio eos quod culpa nulla consectetur? Aperiam ipsam ducimus delectus reprehenderit unde, non laborum voluptate laboriosam, officiis at ea!</div>
      <div class="item">Rem nobis facere provident magni minima iste commodi aliquam harum? Facere error quos cumque perspiciatis voluptatibus deserunt maiores, fugiat sunt sit ab inventore natus saepe, eveniet alias ipsam placeat voluptas!</div>
      <div class="item">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus, temporibus esse magni illum eos natus ipsum minus? Quis excepturi voluptates atque dolorum minus eligendi! Omnis minima magni recusandae ex dignissimos.</div>
      <div class="item">Magnam eveniet inventore assumenda ullam. At saepe voluptatibus sed dicta reiciendis, excepturi nisi perferendis, accusantium est suscipit tempora dolorum praesentium cupiditate doloribus non? Sint numquam recusandae dolore quis esse ea?</div>
      <div class="item">Temporibus cum dolor minima consequatur esse veritatis enim nemo cupiditate laborum doloribus reiciendis perferendis, quas fugit earum rerum, at beatae alias amet aspernatur dolorem dolore error commodi. Perspiciatis, reiciendis amet!</div>
      <div class="item">Vitae, tenetur beatae error corrupti odit expedita quisquam commodi ea aspernatur aliquid, eveniet reprehenderit sequi, similique maiores praesentium quam! Optio tenetur saepe unde voluptatem minus tempora maxime temporibus ducimus ullam!</div>
 
    </div>
  </div>
</section>
  
  
<section class="blank">
  <h1>Nothing to see here...</h1>
  <p>...</p>
</section>
  
  
  
<section class="horizontal">
  <div class="pin-wrap" id="pinThis-1">
    <div class="animation-wrap to-left" id="animateThis-1">
      <div class="item">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus, temporibus esse magni illum eos natus ipsum minus? Quis excepturi voluptates atque dolorum minus eligendi! Omnis minima magni recusandae ex dignissimos.</div>
      <div class="item">Eaque ullam illum nobis deleniti mollitia unde, sed, nemo ipsa ratione ex, dicta aliquam voluptates! Odio vitae eum nobis dignissimos sunt ipsum repellendus totam optio distinctio. Laborum suscipit quia aperiam.</div>
      <div class="item">Animi, porro molestias? Reiciendis dolor aspernatur ab quos nulla impedit, dolores ullam hic commodi nobis nam. Dolorem expedita laudantium dignissimos nobis a. Dolorem, unde quidem. Tempora et a quibusdam inventore!</div>
      <div class="item">Labore, unde amet! Alias delectus hic laboriosam et dolorum? Saepe, dicta eaque? Veniam eos blanditiis neque. Officia et nostrum, tempore modi quo praesentium aspernatur vero dolor, ipsa unde perspiciatis minima.</div>
      <div class="item">Quaerat error dolorem aspernatur magni dicta ut consequuntur maxime tempore. Animi odio eos quod culpa nulla consectetur? Aperiam ipsam ducimus delectus reprehenderit unde, non laborum voluptate laboriosam, officiis at ea!</div>
      <div class="item">Rem nobis facere provident magni minima iste commodi aliquam harum? Facere error quos cumque perspiciatis voluptatibus deserunt maiores, fugiat sunt sit ab inventore natus saepe, eveniet alias ipsam placeat voluptas!</div>
      <div class="item">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus, temporibus esse magni illum eos natus ipsum minus? Quis excepturi voluptates atque dolorum minus eligendi! Omnis minima magni recusandae ex dignissimos.</div>
      <div class="item">Magnam eveniet inventore assumenda ullam. At saepe voluptatibus sed dicta reiciendis, excepturi nisi perferendis, accusantium est suscipit tempora dolorum praesentium cupiditate doloribus non? Sint numquam recusandae dolore quis esse ea?</div>
      <div class="item">Temporibus cum dolor minima consequatur esse veritatis enim nemo cupiditate laborum doloribus reiciendis perferendis, quas fugit earum rerum, at beatae alias amet aspernatur dolorem dolore error commodi. Perspiciatis, reiciendis amet!</div>
      <div class="item">Vitae, tenetur beatae error corrupti odit expedita quisquam commodi ea aspernatur aliquid, eveniet reprehenderit sequi, similique maiores praesentium quam! Optio tenetur saepe unde voluptatem minus tempora maxime temporibus ducimus ullam!</div>
 
    </div>
  </div>
</section>
  
  
  
  <section class="blank">
  <h1>...little laggy, isn't it?</h1>
  <p>...</p>
</section>
  
  
  
  <section class="horizontal">
  <div class="pin-wrap" id="pinThis-2">
    <div class="animation-wrap to-right" id="animateThis-2">
      <div class="item">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus, temporibus esse magni illum eos natus ipsum minus? Quis excepturi voluptates atque dolorum minus eligendi! Omnis minima magni recusandae ex dignissimos.</div>
      <div class="item">Eaque ullam illum nobis deleniti mollitia unde, sed, nemo ipsa ratione ex, dicta aliquam voluptates! Odio vitae eum nobis dignissimos sunt ipsum repellendus totam optio distinctio. Laborum suscipit quia aperiam.</div>
      <div class="item">Animi, porro molestias? Reiciendis dolor aspernatur ab quos nulla impedit, dolores ullam hic commodi nobis nam. Dolorem expedita laudantium dignissimos nobis a. Dolorem, unde quidem. Tempora et a quibusdam inventore!</div>
      <div class="item">Labore, unde amet! Alias delectus hic laboriosam et dolorum? Saepe, dicta eaque? Veniam eos blanditiis neque. Officia et nostrum, tempore modi quo praesentium aspernatur vero dolor, ipsa unde perspiciatis minima.</div>
      <div class="item">Quaerat error dolorem aspernatur magni dicta ut consequuntur maxime tempore. Animi odio eos quod culpa nulla consectetur? Aperiam ipsam ducimus delectus reprehenderit unde, non laborum voluptate laboriosam, officiis at ea!</div>
      <div class="item">Rem nobis facere provident magni minima iste commodi aliquam harum? Facere error quos cumque perspiciatis voluptatibus deserunt maiores, fugiat sunt sit ab inventore natus saepe, eveniet alias ipsam placeat voluptas!</div>
      <div class="item">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus, temporibus esse magni illum eos natus ipsum minus? Quis excepturi voluptates atque dolorum minus eligendi! Omnis minima magni recusandae ex dignissimos.</div>
      <div class="item">Magnam eveniet inventore assumenda ullam. At saepe voluptatibus sed dicta reiciendis, excepturi nisi perferendis, accusantium est suscipit tempora dolorum praesentium cupiditate doloribus non? Sint numquam recusandae dolore quis esse ea?</div>
      <div class="item">Temporibus cum dolor minima consequatur esse veritatis enim nemo cupiditate laborum doloribus reiciendis perferendis, quas fugit earum rerum, at beatae alias amet aspernatur dolorem dolore error commodi. Perspiciatis, reiciendis amet!</div>
      <div class="item">Vitae, tenetur beatae error corrupti odit expedita quisquam commodi ea aspernatur aliquid, eveniet reprehenderit sequi, similique maiores praesentium quam! Optio tenetur saepe unde voluptatem minus tempora maxime temporibus ducimus ullam!</div>
 
    </div>
  </div>
</section>
  
  
  <section class="blank">
  <h1>...keep scrollin' scrollin' scrollin' scrollin'...</h1>
  <p>...</p>
</section>
  
  
  <section class="horizontal">
  <div class="pin-wrap" id="pinThis-3">
    <div class="animation-wrap to-left" id="animateThis-3">
      <div class="item">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus, temporibus esse magni illum eos natus ipsum minus? Quis excepturi voluptates atque dolorum minus eligendi! Omnis minima magni recusandae ex dignissimos.</div>
      <div class="item">Eaque ullam illum nobis deleniti mollitia unde, sed, nemo ipsa ratione ex, dicta aliquam voluptates! Odio vitae eum nobis dignissimos sunt ipsum repellendus totam optio distinctio. Laborum suscipit quia aperiam.</div>
      <div class="item">Animi, porro molestias? Reiciendis dolor aspernatur ab quos nulla impedit, dolores ullam hic commodi nobis nam. Dolorem expedita laudantium dignissimos nobis a. Dolorem, unde quidem. Tempora et a quibusdam inventore!</div>
      <div class="item">Labore, unde amet! Alias delectus hic laboriosam et dolorum? Saepe, dicta eaque? Veniam eos blanditiis neque. Officia et nostrum, tempore modi quo praesentium aspernatur vero dolor, ipsa unde perspiciatis minima.</div>
      <div class="item">Quaerat error dolorem aspernatur magni dicta ut consequuntur maxime tempore. Animi odio eos quod culpa nulla consectetur? Aperiam ipsam ducimus delectus reprehenderit unde, non laborum voluptate laboriosam, officiis at ea!</div>
      <div class="item">Rem nobis facere provident magni minima iste commodi aliquam harum? Facere error quos cumque perspiciatis voluptatibus deserunt maiores, fugiat sunt sit ab inventore natus saepe, eveniet alias ipsam placeat voluptas!</div>
      <div class="item">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus, temporibus esse magni illum eos natus ipsum minus? Quis excepturi voluptates atque dolorum minus eligendi! Omnis minima magni recusandae ex dignissimos.</div>
      <div class="item">Magnam eveniet inventore assumenda ullam. At saepe voluptatibus sed dicta reiciendis, excepturi nisi perferendis, accusantium est suscipit tempora dolorum praesentium cupiditate doloribus non? Sint numquam recusandae dolore quis esse ea?</div>
      <div class="item">Temporibus cum dolor minima consequatur esse veritatis enim nemo cupiditate laborum doloribus reiciendis perferendis, quas fugit earum rerum, at beatae alias amet aspernatur dolorem dolore error commodi. Perspiciatis, reiciendis amet!</div>
      <div class="item">Vitae, tenetur beatae error corrupti odit expedita quisquam commodi ea aspernatur aliquid, eveniet reprehenderit sequi, similique maiores praesentium quam! Optio tenetur saepe unde voluptatem minus tempora maxime temporibus ducimus ullam!</div>
 
    </div>
  </div>
</section>

  <section class="blank">
  <h1>...lorem ipsum...</h1>
  <p>...</p>
</section>
  
 <section class="horizontal">
  <div class="pin-wrap" id="pinThis-4">
    <div class="animation-wrap to-left" id="animateThis-4">
      <div class="item">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus, temporibus esse magni illum eos natus ipsum minus? Quis excepturi voluptates atque dolorum minus eligendi! Omnis minima magni recusandae ex dignissimos.</div>
      <div class="item">Eaque ullam illum nobis deleniti mollitia unde, sed, nemo ipsa ratione ex, dicta aliquam voluptates! Odio vitae eum nobis dignissimos sunt ipsum repellendus totam optio distinctio. Laborum suscipit quia aperiam.</div>
      <div class="item">Animi, porro molestias? Reiciendis dolor aspernatur ab quos nulla impedit, dolores ullam hic commodi nobis nam. Dolorem expedita laudantium dignissimos nobis a. Dolorem, unde quidem. Tempora et a quibusdam inventore!</div>
      <div class="item">Labore, unde amet! Alias delectus hic laboriosam et dolorum? Saepe, dicta eaque? Veniam eos blanditiis neque. Officia et nostrum, tempore modi quo praesentium aspernatur vero dolor, ipsa unde perspiciatis minima.</div>
      <div class="item">Quaerat error dolorem aspernatur magni dicta ut consequuntur maxime tempore. Animi odio eos quod culpa nulla consectetur? Aperiam ipsam ducimus delectus reprehenderit unde, non laborum voluptate laboriosam, officiis at ea!</div>
      <div class="item">Rem nobis facere provident magni minima iste commodi aliquam harum? Facere error quos cumque perspiciatis voluptatibus deserunt maiores, fugiat sunt sit ab inventore natus saepe, eveniet alias ipsam placeat voluptas!</div>
      <div class="item">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus, temporibus esse magni illum eos natus ipsum minus? Quis excepturi voluptates atque dolorum minus eligendi! Omnis minima magni recusandae ex dignissimos.</div>
      <div class="item">Magnam eveniet inventore assumenda ullam. At saepe voluptatibus sed dicta reiciendis, excepturi nisi perferendis, accusantium est suscipit tempora dolorum praesentium cupiditate doloribus non? Sint numquam recusandae dolore quis esse ea?</div>
      <div class="item">Temporibus cum dolor minima consequatur esse veritatis enim nemo cupiditate laborum doloribus reiciendis perferendis, quas fugit earum rerum, at beatae alias amet aspernatur dolorem dolore error commodi. Perspiciatis, reiciendis amet!</div>
      <div class="item">Vitae, tenetur beatae error corrupti odit expedita quisquam commodi ea aspernatur aliquid, eveniet reprehenderit sequi, similique maiores praesentium quam! Optio tenetur saepe unde voluptatem minus tempora maxime temporibus ducimus ullam!</div>
 
    </div>
  </div>
</section> 
  
  
  

<section class="blank">
  <h1>...what dou you think?</h1>
  <p>...</p>
</section>
  
  
</body>
```

```
html, body, section.horizontal {
  overflow: hidden;
}

body { 
  font-weight: 300;
  
  margin: 0;
  padding: 0;
}

body#main-scrollbar{
  width: auto;
  height: 100vh;
  overflow: auto;
  margin: 0;
}

h1 {
  margin: 0;
  padding: 50px 0 0 50px;
}

p {
  margin: 0;
  padding: 50px 0 50px 50px;
}

section {
  width: 100%;
  height: 100%;
  position: relative;
}

.blank {
  height: 60vh;
}






section.horizontal {
  overflow-x: hidden;
}

section.horizontal .pin-wrap,
section.horizontal .animation-wrap {
    display: flex;
    position: relative;
    z-index: 1;  
    height: 100vh;
}


section.horizontal .item {
    position: relative;
    padding: 150px 80px;
    flex: 0 0 500px;
    height: calc(100vh - 300px);
    display: flex;
    align-items: center;
    line-height: 1.7;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border-right: 1px solid rgba(0, 0, 0, 0.06);
    background-color: transparent;
}

section.horizontal .item:before {
    position: absolute;
    font-size: 100px;
    opacity: .13;
    font-weight: bold;    
    z-index: -1;
    -webkit-transform: translate(-30px, -50px);
    transform: translate(-30px, -50px);
    line-height: 1;
}




section.horizontal .animation-wrap.to-right {
    counter-reset: item;
    float: left;
}

section.horizontal .animation-wrap.to-left {
    counter-reset: item 11;
    float: right; 
}

section.horizontal .animation-wrap.to-right .item:before {
    counter-increment: item;
    content: counter(item);
}

section.horizontal .animation-wrap.to-left .item:before {
    counter-increment: item -1;
    content: counter(item);
}



section.horizontal .animation-wrap .item:nth-child(2n+2) {
    align-items: flex-start;
}

section.horizontal .animation-wrap .item:nth-child(4n+4) {
    align-items: flex-end;
}
```

```
let bodyScrollBar = Scrollbar.init(document.body, { damping: 0.1, delegateTo: document });
 
bodyScrollBar.setPosition(0, 0);
bodyScrollBar.track.xAxis.element.remove();

ScrollTrigger.scrollerProxy(document.body, {
  scrollTop(value) {
    if (arguments.length) {
      bodyScrollBar.scrollTop = value;
    }
    return bodyScrollBar.scrollTop;
  }
});

bodyScrollBar.addListener(ScrollTrigger.update);





const horizontalSections = gsap.utils.toArray('section.horizontal')

horizontalSections.forEach(function (sec, i) {	
  
  var thisPinWrap = sec.querySelector('.pin-wrap');
  var thisAnimWrap = thisPinWrap.querySelector('.animation-wrap');
  
  var getToValue = () => -(thisAnimWrap.scrollWidth - window.innerWidth); 

  gsap.fromTo(thisAnimWrap, { 
    x: () => thisAnimWrap.classList.contains('to-right') ? 0 : getToValue() 
  }, { 
    x: () => thisAnimWrap.classList.contains('to-right') ? getToValue() : 0, 
    ease: "none",
    scrollTrigger: {
      trigger: sec,		
      scroller: document.body, // neccessary setting for smooth-scrollbar on body
      pinType: 'transform', // neccessary setting for smooth-scrollbar on body
      start: "top top",
      end: () => "+=" + thisAnimWrap.scrollWidth,
      pin: thisPinWrap,
      invalidateOnRefresh: true,
      anticipatePin: 1,
      scrub: true,
      //markers: true,
    }
  });

});	






// This part is only necessary if you're using ScrollTrigger's markers:
if (document.querySelector('.gsap-marker-scroller-start')) {		  
  const markers = gsap.utils.toArray('[class *= "gsap-marker"]');	
  bodyScrollBar.addListener(({ offset }) => gsap.set(markers, { marginTop: -offset.y }));
}
// End section necessary only if you're using ScrollTrigger's markers
```

Plugins[ScrollTrigger](/docs/v3/Plugins/ScrollTrigger/.md)

ScrollTrigger.scrollerProxy() was added in GSAP **3.4.0**
