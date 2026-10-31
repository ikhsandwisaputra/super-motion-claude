---
source: https://gsap.com/docs/v3/Plugins/ScrollSmoother/static.create()
title: "ScrollSmoother.create"
fetched: 2026-10-28
---

# ScrollSmoother.create

### ScrollSmoother.create( ) ;

### Details[​](#details "Direct link to Details")

Creates (and returns) a new ScrollSmoother instance. There can only be one, of course, at any given time because it's controlling the scroll of the root page. If a ScrollSmoother instance already exists, its [kill()](/docs/v3/Plugins/ScrollSmoother/kill\(\).md) method will be called before creating the new one in the `ScrollSmoother.create()` call. If you want to get a reference to the ScrollSmoother that was already created, use the [ScrollSmoother.get()](/docs/v3/Plugins/ScrollSmoother/static.get\(\).md) method.

## Setup[​](#setup "Direct link to Setup")

Your HTML content should reside in a single `content` element (usually a`<div>`but it doesn't really matter) - that's what gets moved around when the user scrolls. That `content` element is wrapped in a `wrapper` element that serves as the viewport. The actual scrollbar remains on the `<body>`, so your setup would look like:

```
<body>
  <div id="smooth-wrapper">
    <div id="smooth-content">
      <!--- ALL YOUR CONTENT HERE --->
    </div>
  </div>
</body>
```

Under the hood, everything flows through [ScrollTrigger](/docs/v3/Plugins/ScrollTrigger/.md) which watches the page's native scroll position and then ScrollSmoother applies transforms to the `content` to gradually catch up with that scroll position. So if you suddenly drag the native scrollbar 500px, ScrollSmoother will gradually move the content to that spot using inline CSS transforms (`matrix3d()`) on the `content`. Since ScrollSmoother is built on top of ScrollTrigger, don't forget to register them both:

```
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
```

## Usage & special properties[​](#usage--special-properties "Direct link to Usage & special properties")

The configuration object can have any of the following optional properties:

## Speed (parallax)[​](#speed-parallax "Direct link to Speed (parallax)")

When you set `effects: true`, ScrollSmoother finds all elements that have a `data-speed` attribute and applies a parallax effect accordingly so that they move at the designated speed. For example:

```
<div data-speed="0.5"></div> <!-- half-speed of scroll -->
<div data-speed="2"></div> <!-- double-speed of scroll -->
<div data-speed="1"></div> <!-- normal speed of scroll -->
<div data-speed="auto"></div> <!-- auto-calculated based on how far it can move inside its container -->
```

### "auto" speed[​](#auto-speed "Direct link to \"auto\" speed")

When you set the speed to `"auto"`, it will calculate how far it can move inside its **parent container** in the direction of the largest gap (up or down). So it's perfect for parallax effects - just make the child larger than its parent, align it where you want it (typically its top edge at the top of the container, or the bottom edge at the bottom of the container) and let ScrollSmoother do its magic. Obviously set `overflow: hidden` on the parent so it clips the child.

### clamp() speed effects[​](#clamp-speed-effects "Direct link to clamp() speed effects")

Have you ever had an element that you natively placed toward the very top of your page but when you apply a `data-speed`, it starts out shifted from its native position? That's because by default, speed effects cause elements to reach their "native" position when **centered vertically** in the viewport, so they'll likely start out offset. Starting in version 3.12, you can wrap your speed value in `"clamp()"` to make them start out in their native position if they're "above the fold" (inside the viewport when scrolled to the very top). Under the hood, `data-speed` effects are driven by ScrollTrigger instances, so this a way to employ ScrollTrigger's clamp() feature that prevents the start/end values from "leaking" outside the page bounds (never less than 0 and never more than the maximum scroll position). For example:

```
<div data-speed="clamp(0.5)"></div> <!-- clamped half-speed -->
```

Walkthrough

You can also use the [effects()](/docs/v3/Plugins/ScrollSmoother/effects\(\).md) method to dynamically apply speed or lag effects to targets (including function-based ones). *Note: effects **should not be nested**.*

```
let scroller = ScrollSmoother.create({...});
scroller.effects(".box", {speed: 0.5, lag: 0.1});
```

Keep in mind that the elements will hit their "natural" position in the **CENTER** of the viewport. Here's a visual demo:

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/NPpwNXB)

```
<div id="smooth-wrapper">
  <div id="smooth-content">
    <div class="box box-ref">ref</div>
    <div class="box box-a" data-speed="0.5">a</div>
    <div class="box box-b" data-speed="0.5">b</div>
    <div class="box box-c" data-speed="0.5">c</div>
    <div class="refline"></div>
  </div>
</div>
<div class="middle"></div>

<h2>
  ref scrolls normally.<br/>
  all divs have position of top:80vh.<br/>
  a, b, and c all have data-speed:0.5<br/>
  Each object will be at it's "native" placement (with it's top edge aligned to the top of the ref element) when it is centered vertically in the viewport</h2>
```

```
* {
  box-sizing: border-box;
}

/* Typography */

@font-face {
  font-display: block;
  font-family: Mori;
  font-style: normal;
  font-weight: 400;
  src: url(/fonts/Mori/PPMori-Regular.woff) format("woff");
}

@font-face {
  font-display: block;
  font-family: Mori;
  font-style: normal;
  font-weight: 600;
  src: url(/fonts/Mori/PPMori-SemiBold.woff) format("woff");
}

@font-face {
  font-display: block;
  font-family: Fraktion Mono;
  font-style: normal;
  font-weight: 400;
  src: url(/fonts/Fraktion/PPFraktionMono-Bold.woff)
    format("woff");
}

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
  --color-grey-dark: #191919;
  --color-surface75: #bbbaa6;
  --color-surface50: #7c7c6f;
  --color-surface25: #42433d;
  --gradient-macha: linear-gradient(
    114.41deg,
    var(--color-shockingly-green) 20.74%,
    var(--color-lt-green) 65.5%
  );
  --gradient-orange-crush: linear-gradient(
    111.45deg,
    var(--color-orangey) 19.42%,
    #f7bdf8 73.08%
  );
  --gradient-lipstick: linear-gradient(
    165.72deg,
    #f7bdf8 21.15%,
    #cd237f 81.93%
  );
  --gradient-purple-haze: linear-gradient(
    153.58deg,
    #f7bdf8 32.25%,
    #2f3cc0 92.68%
  );
  --gradient-skyfall: linear-gradient(
    131.77deg,
    #0a157a 30.82%,
    #15bfe4 81.82%
  );
  --gradient-emerald-city: linear-gradient(
    166.9deg,
    var(--color-shockingly-green) 53.19%,
    #0085d0 107.69%
  );
  --gradient-summer-fair: linear-gradient(
    144.02deg,
    var(--color-blue) 4.56%,
    var(--color-pink) 72.98%
  );
  --color-core-green: #dfffd1;
  --color-core-green-lt: #f3ffee;
  --color-core-gradient: radial-gradient(
    89.08% 84.62% at 16.54% 78.46%,
    #fbfefa 0%,
    #c9f6b4 39.58%,
    #abff84 77.6%,
    #2fee65 100%
  );
  --color-core-button-gradient: linear-gradient(
    114.41deg,
    #0ae448 20.74%,
    #abff84 65.5%
  );
  --color-core-heading-gradient: linear-gradient(
      180deg,
      #d6ffc3 0%,
      rgba(214, 255, 195, 0) 100%
    ),
    #f3ffee;
  --color-core-intro-gradient: linear-gradient(
      144.5deg,
      #e8ffdd 65.09%,
      #7dea7b 122.73%
    ),
    linear-gradient(311.31deg, #7ef89e 36.08%, #e5ffd9 106.98%);
  --color-text-purple: #d2ceff;
  --color-text-purple-lt: #dfdcff;
  --color-text-gradient: radial-gradient(
    129.03% 100% at 120.97% 81.45%,
    #dfdcff 27.08%,
    #a69eff 100%
  );
  --color-svg-tangerine: #ffe3c7;
  --color-svg-tangerine-lt: #fff0e0;
  --color-svg-gradient: radial-gradient(
    70.77% 70.77% at 0% 70.77%,
    #ffd9b0 0%,
    #fd9f3b 80.73%,
    #ff8709 100%
  );
  --color-svg-heading-gradient: linear-gradient(
      180deg,
      #ffbd77 0%,
      rgba(254, 197, 251, 0) 100%
    ),
    #ffe4c7;
  --color-ui-blue: #bef3fe;
  --color-ui-blue-lt: #e1faff;
  --color-ui-blue-codeblk: #f6feff;
  --color-ui-text-gradient: linear-gradient(
    168.89deg,
    #fec5fb -21.3%,
    #00bae2 89.88%
  );
  --color-ui-code-blocktext-gradient: linear-gradient(
    142.91deg,
    #cef6ff 18.75%,
    #a6efff 54.93%
  );
  --color-ui-gradient: radial-gradient(
    78.77% 78.77% at 71.71% 30.77%,
    #f0fcff 0%,
    #9bedff 67.21%,
    #98ecff 76.04%,
    #5be1ff 84.9%,
    #00bae2 94.79%
  );
  --color-ui-gradient-background: linear-gradient(
    137.1deg,
    #ecfcff 27.5%,
    #a6efff 94.09%
  );
  --color-ui-gradient-flip-background: radial-gradient(
    140% 190% at 117.54% 131.12%,
    #f0fcff 0%,
    #9bedff 25.52%,
    #98ecff 42.71%,
    #5be1ff 60.94%,
    #00bae2 94.79%
  );
  --color-scroll-pink: #ffd7fd;
  --color-scroll-pink-lt: #ffe9fe;
  --color-scroll-gradient: linear-gradient(
    317.42deg,
    #ffe9fe 10.4%,
    #ff96f9 83.03%
  );
  --ease-in: cubic-bezier(0.755, 0.05, 0.855, 0.06);
  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
  --ease-in-out: cubic-bezier(0.86, 0, 0.07, 1);
  --ease-out-quart: cubic-bezier(0.175, 0.79, 0.38, 0.905);
  --ease-in-out-quart: cubic-bezier(0.645, 0.045, 0.355, 1);
}

body {
  background-color: var(--color-just-black);
  font-family: "Mori", sans-serif, Arial;
  overscroll-behavior: none;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}


#smooth-content {
  overflow: visible;
  width: 100%;
  /* set a height because the contents are position: absolute, thus natively there's no height */
  height: 4000px;

  background-image:
    linear-gradient(rgba(255,255,255,.07) 2px, transparent 2px),
    linear-gradient(90deg, rgba(255,255,255,.07) 2px, transparent 2px),
    linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px);
  background-size: 100px 100px, 100px 100px, 20px 20px, 20px 20px;
  background-position: -2px -2px, -2px -2px, -1px -1px, -1px -1px;
}

button {
  position: relative; 
}

.box {
  width: 100px;
  height: 100px;
  background: var(--gradient-macha);
  border-radius: 10px;
  position: absolute;
  z-index: 100;
  line-height: 100px;
  font-size: 18px;
  text-align: center;
  will-change: transform;
}
.box-ref {
  top: 80vh;
  left : 100px;
}
.box-a {
  top: 80vh;
  left : 250px;
  height:100px;

}

.box-b {
  left : 400px;
  top: 80vh;
  height:200px
}
.box-c {
  width: 100px;
  height: 400px;
  left : 550px;
  top: 80vh;

}

.middle {
  position:fixed;
  top:50%;
  height:2px;
  width:100%;
  background:red;
  transform:translateY(-50%);
}

.refline {
  position:absolute;
  top:80vh;
  background:var(--color-shockingly-green);
  height:2px;
  width:100%;
  z-index:200;
}

h2 {
  margin:0;
  position:fixed;
  color:var(--color-surface75);
  font-size: 1rem;
  padding:1em;
  font-weight:normal;
  background: var(--color-grey-dark);
  border-radius: 20px;
  max-width: 60ch;
  bottom: 1rem;
  right: 1rem;
}
```

```
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// create the smooth scroller FIRST!
let smoother = ScrollSmoother.create({
  smooth: 2,   // seconds it takes to "catch up" to native scroll position
  effects: true // look for data-speed and data-lag attributes on elements and animate accordingly
});
```

Plugins[ScrollSmoother](/docs/v3/Plugins/ScrollSmoother/.md)[ScrollTrigger](/docs/v3/Plugins/ScrollTrigger/.md)

## Lag (the delightful kind)[​](#lag-the-delightful-kind "Direct link to Lag (the delightful kind)")

Think of a "lag" like making the element lazy, allowing it to drift from its normal scroll position, taking a certain amount of time to "catch up". You can assign slightly different lags to elements in close proximity to give them a staggered effect when scrolling that's quite pleasing to the eye. If you set `effects: true` on the ScrollSmoother.create() config, it'll automatically find any elements with the `data-lag` attribute and apply that effect:

```
<div data-lag="0.5"></div> <!-- takes 0.5 seconds to "catch up" -->
<div data-lag="0.8"></div> <!-- takes 0.8 seconds to "catch up" -->
```

You can also use the [effects()](/docs/v3/Plugins/ScrollSmoother/effects\(\).md) method to dynamically apply speed or lag effects to targets (including function-based ones) via JavaScript.

```
let scroller = ScrollSmoother.create({...});
scroller.effects(".box", {lag: 0.5, speed: 1});
```
