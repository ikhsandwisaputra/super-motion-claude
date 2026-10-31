---
source: https://gsap.com/resources/st-mistakes
title: "ScrollTrigger tips & mistakes"
fetched: 2026-10-28
---

# ScrollTrigger tips & mistakes

Are you guilty of any of the most common mistakes people make in their ScrollTrigger code?

Debugging tip

In many cases, the issue isn't directly related to ScrollTrigger, so it's helpful to get things working *without* ScrollTrigger/any scroll effects and then, once everything else is working, hook things up to ScrollTrigger.

## Nesting ScrollTriggers inside multiple timeline tweens[​](#nesting-scrolltriggers-inside-multiple-timeline-tweens "Direct link to Nesting ScrollTriggers inside multiple timeline tweens")

A **very** common mistake is applying ScrollTrigger to multiple tweens that are nested **inside** a timeline. Logic-wise, that can't work. When you nest an animation in a timeline, that means the playhead of the parent timeline is what controls the playhead of the child animations (they all must be synchronized otherwise it wouldn't make any sense). When you add a ScrollTrigger with scrub, you're basically saying *"I want the playhead of this animation to be controlled by the scrollbar position"*...you can't have both. For example, what if the parent timeline is playing **forward** but the user also is scrolling **backwards**? See the problem? It can't go forward and backward at the same time, and you wouldn't want the playhead to get out of sync with the parent timeline's. Or what if the parent timeline is paused but the user is scrolling?

So **definitely** avoid putting ScrollTriggers on nested animations. Instead, either keep those tweens independent (don't nest them in a timeline) -OR- just apply a single ScrollTrigger to the parent timeline itself to hook the entire animation as a whole to the scroll position.

## Creating to() logic issues[​](#creating-to-logic-issues "Direct link to Creating to() logic issues")

If you want to animate the same properties of the same element in multiple ScrollTriggers, it 's common to create logic issues like this:

```
gsap.to("h1", {
  x: 100,
  scrollTrigger: {
    trigger: "h1",
    start: "top bottom",
    end: "center center",
    scrub: true,
  },
});

gsap.to("h1", {
  x: 200,
  scrollTrigger: {
    trigger: "h1",
    start: "center center",
    end: "bottom top",
    scrub: true,
  },
});
```

Did you catch the mistake? You might think that it will animate the x value to 100 and then directly to 200 when the second ScrollTrigger starts. However if you scroll through the page you 'll see that it animates to 100 then jumps *back* to 0 (the starting x value) then animates to 200. This is because the starting values of ScrollTriggers are cached when the ScrollTrigger is **created**.

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/LYNzrxp)

```
<h2>Scroll down</h2>
<div class="box pink"></div>
<div class="outline"></div>
```

```
body {
  height: 300vh;
}

h1, h2 {
  margin-bottom: 100vh;
}
h2 {
  text-align: center;
}

.box, .outline {
  position: fixed;
  top: calc(50% - 40px);
  left: calc(50% - 40px);
}

.outline {
  width: 80px;
  height: 80px;
  transform: translate(-1px, -1px);
  outline: dashed 2px var(--color-surface-white)
}
```

```
gsap.to('.box', {
  x: 300, 
  scrollTrigger: {
    start: 100,
    end: 300,
    scrub: true
  }
});

gsap.to('.box', {
  x: -300, 
  scrollTrigger: {
    start: 400,
    end: 800,
    scrub: true
  }
});
```

To work around this either use set `immediateRender: false` (like [this demo](https://codepen.io/GreenSock/pen/KKzoVGd?editors=0010) shows) or use .fromTo()s for the later tweens (like [this demo](https://codepen.io/GreenSock/pen/LYNzrXb) shows) or set a ScrollTrigger on a timeline and put the tweens in that timelines instead (like [this demo](https://codepen.io/GreenSock/pen/jOqGKXJ) shows).

## Using one ScrollTrigger or animation for multiple "sections"[​](#using-one-scrolltrigger-or-animation-for-multiple-sections "Direct link to Using one ScrollTrigger or animation for multiple \"sections\"")

If you want to apply the same effect to multiple sections/elements so that they animate when they come into view, for example, it's common for people to try to use a single tween which targets all the elements but that ends up animating them all at once. For example:

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/Yzqrjwe)

```
<h2>Scroll down</h2>

<div class="box"></div>

<div class="box"></div>

<div class="box"></div>
```

```
@font-face {
  font-display: block;
  font-family: Mori;
  font-style: normal;
  font-weight: 400;
  src: url(/fonts/Mori/PPMori-Regular.woff) format("woff");
}

:root {
  --dark: #0e100f;
  --surface75: #bbbaa6;
  --color-scroll-gradient: linear-gradient(317.42deg, #ffe9fe 10.4%, #ff96f9 83.03%);
}

body {
  margin: 0;
  padding: 0 20px;
  background-color: var(--dark);
  color: var(--surface75);
  font-family: Mori, sans-serif;
  font-weight: 400;
}

h2,
.box {
  margin-bottom: 100vh;
}

h2 {
  text-align: center;
  font-size: 2rem;
  font-weight: 400;
  -webkit-text-fill-color: transparent;
  background: var(--color-scroll-gradient);
  -webkit-background-clip: text;
  background-clip: text;
}

.box {
  width: 100px;
  height: 100px;
  border-radius: 12px;
  background: var(--color-scroll-gradient), url("/demo-assets/noise.webp");
  background-blend-mode: color-dodge;
  will-change: transform;
}
```

```
const boxes = gsap.utils.toArray('.box');
boxes.forEach(box => {
  gsap.to('.box', { // this will animate ALL boxes
    x: 300,
    scrollTrigger: {
      trigger: '.box',  // this will use the first box as the trigger
      scrub: true
    }
  })
});
```

Since each of the elements would get triggered at a different scroll position, and of course their animations would be distinct, just do a simple loop instead, like this:

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/QWNqBvL)

```
<h2>Scroll down</h2>

<div class="box"></div>

<div class="box"></div>

<div class="box"></div>
```

```
@font-face {
  font-display: block;
  font-family: Mori;
  font-style: normal;
  font-weight: 400;
  src: url(/fonts/Mori/PPMori-Regular.woff) format("woff");
}

:root {
  --dark: #0e100f;
  --surface75: #bbbaa6;
  --color-scroll-gradient: linear-gradient(317.42deg, #ffe9fe 10.4%, #ff96f9 83.03%);
}

body {
  margin: 0;
  padding: 0 20px;
  background-color: var(--dark);
  color: var(--surface75);
  font-family: Mori, sans-serif;
  font-weight: 400;
}

h2,
.box {
  margin-bottom: 100vh;
}

h2 {
  text-align: center;
  font-size: 2rem;
  font-weight: 400;
  -webkit-text-fill-color: transparent;
  background: var(--color-scroll-gradient);
  -webkit-background-clip: text;
  background-clip: text;
}

.box {
  width: 100px;
  height: 100px;
  border-radius: 12px;
  background: var(--color-scroll-gradient), url("/demo-assets/noise.webp");
  background-blend-mode: color-dodge;
  will-change: transform;
}
```

```
const boxes = gsap.utils.toArray('.box');
boxes.forEach(box => {
  gsap.to(box, { 
    x: 300,
    scrollTrigger: {
      trigger: box,
      scrub: true
    }
  })
});
```

## Forgetting to use function-based start/end values for things that are dependent on viewport sizing[​](#forgetting-to-use-function-based-startend-values-for-things-that-are-dependent-on-viewport-sizing "Direct link to Forgetting to use function-based start/end values for things that are dependent on viewport sizing")

For example, let's say you've got a start or end value that references the height of an element which may change if/when the viewport resizes. ScrollTrigger will refresh() automatically when the viewport resizes, but if you hard-coded your value when the ScrollTrigger was created that won't get updated...unless you use a function-based value.

```
end: `+=${elem.offsetHeight}`; // won't be updated on refresh

end: () => `+=${elem.offsetHeight}`; // will be updated
```

Additionally, if you want the *animation* values to update, make sure the ones you want to update are function-based values and set `invalidateOnRefresh: true` in the ScrollTrigger.

## Start animation mid-viewport, but reset it offscreen[​](#start-animation-mid-viewport-but-reset-it-offscreen "Direct link to Start animation mid-viewport, but reset it offscreen")

For example try scrolling down then back up in this demo:

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/BaKwPre)

```
<h2>Scroll down</h2>

<div class="box"></div>

<div class="box"></div>

<div class="box"></div>
```

```
@font-face {
  font-display: block;
  font-family: Mori;
  font-style: normal;
  font-weight: 400;
  src: url(/fonts/Mori/PPMori-Regular.woff) format("woff");
}

:root {
  --dark: #0e100f;
  --surface75: #bbbaa6;
  --color-scroll-gradient: linear-gradient(317.42deg, #ffe9fe 10.4%, #ff96f9 83.03%);
}

body {
  margin: 0;
  padding: 0 20px;
  background-color: var(--dark);
  color: var(--surface75);
  font-family: Mori, sans-serif;
  font-weight: 400;
}

h2,
.box {
  margin-bottom: 100vh;
}

h2 {
  text-align: center;
  font-size: 2rem;
  font-weight: 400;
  -webkit-text-fill-color: transparent;
  background: var(--color-scroll-gradient);
  -webkit-background-clip: text;
  background-clip: text;
}

.box {
  width: 100px;
  height: 100px;
  border-radius: 12px;
  background: var(--color-scroll-gradient), url("/demo-assets/noise.webp");
  background-blend-mode: color-dodge;
  will-change: transform;
}
```

```
const boxes = gsap.utils.toArray('.box');
boxes.forEach(box => {
  gsap.to(box, { 
    x: 300,
    scrollTrigger: {
      trigger: box,
      start: "center 70%",
      toggleActions: "play none none reset"
    }
  })
});
```

Notice that we want the animation to start mid-screen, but when scrolling backwards we want it to reset at a completely different place (when the element goes offscreen). The solution is to use two ScrollTriggers - one for the playing and one for the resetting once the element is off screen.

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/XWdeBYR)

```
<h2>Scroll down</h2>

<div class="box"></div>

<div class="box"></div>

<div class="box"></div>
```

```
@font-face {
  font-display: block;
  font-family: Mori;
  font-style: normal;
  font-weight: 400;
  src: url(/fonts/Mori/PPMori-Regular.woff) format("woff");
}

:root {
  --dark: #0e100f;
  --surface75: #bbbaa6;
  --color-scroll-gradient: linear-gradient(317.42deg, #ffe9fe 10.4%, #ff96f9 83.03%);
}

body {
  margin: 0;
  padding: 0 20px;
  background-color: var(--dark);
  color: var(--surface75);
  font-family: Mori, sans-serif;
  font-weight: 400;
}

h2,
.box {
  margin-bottom: 100vh;
}

h2 {
  text-align: center;
  font-size: 2rem;
  font-weight: 400;
  -webkit-text-fill-color: transparent;
  background: var(--color-scroll-gradient);
  -webkit-background-clip: text;
  background-clip: text;
}

.box {
  width: 100px;
  height: 100px;
  border-radius: 12px;
  background: var(--color-scroll-gradient), url("/demo-assets/noise.webp");
  background-blend-mode: color-dodge;
  will-change: transform;
}
```

```
const boxes = gsap.utils.toArray('.box');
boxes.forEach(box => {
  const anim = gsap.to(box, { x: 300, paused: true });
  
  ScrollTrigger.create({
    trigger: box,
    start: "center 70%",
    onEnter: () => anim.play()
  });
  
  ScrollTrigger.create({
    trigger: box,
    start: "top bottom",
    onLeaveBack: () => anim.pause(0)
  });
});
```

Plugins[ScrollTrigger](/docs/v3/Plugins/ScrollTrigger/.md)

## Creating ScrollTriggers out of order[​](#creating-scrolltriggers-out-of-order "Direct link to Creating ScrollTriggers out of order")

If you have any ScrollTriggers that pin elements (with the default pinSpacing: true) then the order in which the ScrollTriggers are created is important. This is because any ScrollTriggers *after* the ScrollTrigger with pinning need to compensate for the extra distance that the pinning adds. You can see an example of how this sort of thing might happen in the pen below. Notice that the third box's animation runs before it's actually in the viewport.

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/bGebzaK)

```
<h2>Scroll down</h2>

<div class="box played"></div>

<div class="box scrubbed"></div>

<div class="box played"></div>
```

```
@font-face {
  font-display: block;
  font-family: Mori;
  font-style: normal;
  font-weight: 400;
  src: url(/fonts/Mori/PPMori-Regular.woff) format("woff");
}

:root {
  --dark: #0e100f;
  --surface75: #bbbaa6;
  --color-scroll-gradient: linear-gradient(317.42deg, #ffe9fe 10.4%, #ff96f9 83.03%);
}

body {
  margin: 0;
  padding: 0 20px;
  background-color: var(--dark);
  color: var(--surface75);
  font-family: Mori, sans-serif;
  font-weight: 400;
}

h2,
.box {
  margin-bottom: 100vh;
}

h2 {
  text-align: center;
  font-size: 2rem;
  font-weight: 400;
  -webkit-text-fill-color: transparent;
  background: var(--color-scroll-gradient);
  -webkit-background-clip: text;
  background-clip: text;
}

.box {
  width: 100px;
  height: 100px;
  border-radius: 12px;
  background: var(--color-scroll-gradient), url("/demo-assets/noise.webp");
  background-blend-mode: color-dodge;
  will-change: transform;
}
```

```
const played = gsap.utils.toArray('.played');
played.forEach(box => {
  gsap.to(box, { 
    x: 300,
    scrollTrigger: {
      trigger: box,
      toggleActions: "play none none reset"
    }
  });
});

const scrubbed = gsap.utils.toArray('.scrubbed');
scrubbed.forEach(box => {
  gsap.to(box, { 
    x: 300,
    scrollTrigger: {
      trigger: box,
      scrub: true,
      pin: true,
    }
  });
});
```

To fix this you can either create the ScrollTriggers in the order in which they are reached when scrolling or use ScrollTrigger's `refreshPriority` property to tell certain ScrollTriggers to calculate their positions sooner (the higher the `refreshPriority` the sooner the positions will be calculated). The demo below creates the ScrollTriggers in their proper order.

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/wvWwNxX)

```
<h2>Scroll down</h2>

<div class="box played"></div>

<div class="box scrubbed"></div>

<div class="box played"></div>
```

```
@font-face {
  font-display: block;
  font-family: Mori;
  font-style: normal;
  font-weight: 400;
  src: url(/fonts/Mori/PPMori-Regular.woff) format("woff");
}

:root {
  --dark: #0e100f;
  --surface75: #bbbaa6;
  --color-scroll-gradient: linear-gradient(317.42deg, #ffe9fe 10.4%, #ff96f9 83.03%);
}

body {
  margin: 0;
  padding: 0 20px;
  background-color: var(--dark);
  color: var(--surface75);
  font-family: Mori, sans-serif;
  font-weight: 400;
}

h2,
.box {
  margin-bottom: 100vh;
}

h2 {
  text-align: center;
  font-size: 2rem;
  font-weight: 400;
  -webkit-text-fill-color: transparent;
  background: var(--color-scroll-gradient);
  -webkit-background-clip: text;
  background-clip: text;
}

.box {
  width: 100px;
  height: 100px;
  border-radius: 12px;
  background: var(--color-scroll-gradient), url("/demo-assets/noise.webp");
  background-blend-mode: color-dodge;
  will-change: transform;
}
```

```
// Create all the ScrollTriggers that are BEFORE the pinned sections
const played = gsap.utils.toArray('.played');
gsap.to(played[0], { 
  x: 300,
  scrollTrigger: {
    trigger: played[0],
    toggleActions: "play none none reset"
  }
});

// The pinned sections
const scrubbed = gsap.utils.toArray('.scrubbed');
scrubbed.forEach(box => {
  gsap.to(box, { 
    x: 300,
    scrollTrigger: {
      trigger: box,
      scrub: true,
      pin: true,
    }
  });
});

// Create all the ScrollTriggers that are AFTER the pinned sections
gsap.to(played[1], { 
  x: 300,
  scrollTrigger: {
    trigger: played[1],
    toggleActions: "play none none reset"
  }
});
```

## Loading new content but not refreshing[​](#loading-new-content-but-not-refreshing "Direct link to Loading new content but not refreshing")

All ScrollTriggers get setup as soon as it's reasonably safe to do so, usually once all content is loaded. However if you're loading images that don't have a width or height attribute correctly set or you are loading content dynamically (via AJAX/fetch/etc.) and that content affects the layout of the page you usually need to refresh ScrollTrigger so it updates the positions of the ScrollTriggers. You can do that easily by calling `ScrollTrigger.refresh()` in the callback for your method that is loading the image or new content.

## Why does my "scrub" animation jump on initial load?[​](#why-does-my-scrub-animation-jump-on-initial-load "Direct link to Why does my \"scrub\" animation jump on initial load?")

Most likely the ScrollTrigger 's start value is **before** the starting scroll position. This usually happens when the start is something like `"top bottom"` (the default start value) and the element is at the very top of the page. If you don 't want this to happen simply adjust the `start` value to one that 's after a scroll position of 0.

Another alternative is to use the `clamp()` feature that was introduced in version [3.12](https://gsap.com/blog/3-12/#clamp):

```
ScrollTrigger.create({
  trigger: ".my-element",
  start: "clamp(top bottom)",
  end: "bottom top",
});
```

## When I resize the browser window, the start/end points and markers are off[​](#when-i-resize-the-browser-window-the-startend-points-and-markers-are-off "Direct link to When I resize the browser window, the start/end points and markers are off")

Using `scroll-behavior: smooth;` in your HTML tag can cause this. When ScrollTrigger internally calls the [refresh()](https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.refresh\(\)) method, when the browser window is resized, it sets the scroll position to zero (0) so every element is at it's natural position. The problem is that `scroll-behavior: smooth;` acts like a transition for scrolling, so when you resize your browser ScrollTrigger takes the scroll to 0, but because of the smooth behavior the scroll is not set to 0 immediately, it takes a few milliseconds to get there. Then when ScrollTrigger makes all the calculations the scroll position is not where it should be and therefore the start and end points are not where you expect. In your projects just avoid using `scroll-behavior: smooth;` in your styles in order to avoid this.

Some libraries and packages like Bootstrap 5.x, set `scroll-behavior: smooth;` by default in the `<html>` tag. The solution is to override this with a custom CSS:

```
html {
  scroll-behavior: auto !important;
}
```

## How to make "scrub" animations take longer[​](#how-to-make-scrub-animations-take-longer "Direct link to How to make \"scrub\" animations take longer")

How to make "scrub" animations take longer

The duration of a "scrub" animation will always be forced to fit exactly between the `start` and `end` of the ScrollTrigger position, so increasing the `duration` value won't do anything if the `start` and `end` of the ScrollTrigger stay the same. To make the animation longer, just push the end value down further. For example, instead of end: `"+=300"`, make it `"+=600"` and the animation will take twice as long.

## Navigating back to a page causes ScrollTrigger to break[​](#navigating-back-to-a-page-causes-scrolltrigger-to-break "Direct link to Navigating back to a page causes ScrollTrigger to break")

If you have a single-page application (SPA; i.e. a framework such as React or Vue, a page-transition library like Highway.js, Swup, or Barba.js, or something similar) and you use ScrollTrigger you might run into some issues when you navigate back to a page that you've visited already. Usually this is because SPAs don't automatically destroy and re-create your ScrollTriggers so you need to do that yourself when navigating between pages or components.

To do that, you should kill off any relevant ScrollTriggers in whatever tool you're using's unmount or equivalent callback. Then make sure to re-create any necessary ScrollTriggers in the new component/page's mount or equivalent callback. In some cases when the targets and such still exist but the measurements are incorrect you might just need to call `ScrollTrigger.refresh()`. If you need help in your particular situation, please make [a minimal demo](https://gsap.com/community/topic/9002-read-this-first-how-to-create-a-codepen-demo/) and then create [a new thread](https://gsap.com/community/forum/11-gsap/?auth=1\&do=add) in our forums along with the demo and an explanation of what's going wrong.
