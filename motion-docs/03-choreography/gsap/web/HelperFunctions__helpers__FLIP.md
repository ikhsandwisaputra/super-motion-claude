---
source: https://gsap.com/docs/v3/HelperFunctions/helpers/FLIP
title: "Flip"
fetched: 2026-10-28
---

# Flip

If you're shifting things around in the DOM and then you want elements to animate to their new positions, the most full-featured way to handle it is with the [Flip Plugin](/docs/v3/Plugins/Flip/.md), but if you're only doing basic things you can use this helper function (see the comments at the top to learn how to use it):

```
/*
Copy this to your project. Pass in the elements (selector text or NodeList or Array), then a
function/callback that actually performs your DOM changes, and optionally a vars
object that contains any of the following properties to customize the transition:

- duration [Number] - duration (in seconds) of each animation
- stagger [Number | Object | Function] - amount to stagger the starting time of each animation. You may use advanced staggers too (see https://codepen.io/GreenSock/pen/jdawKx)
- ease [Ease] - controls the easing of the animation. Like "power2.inOut", or "elastic", etc.
- onComplete [Function] - a callback function that should be called when all the animation has completed.
- delay [Number] - time (in seconds) that should elapse before any of the animations begin.

This function will return a Timeline containing all the animations.
*/
function flip(elements, changeFunc, vars) {
  elements = gsap.utils.toArray(elements);
  vars = vars || {};
  let tl = gsap.timeline({
      onComplete: vars.onComplete,
      delay: vars.delay || 0,
    }),
    bounds = elements.map((el) => el.getBoundingClientRect()),
    copy = {},
    p;
  elements.forEach((el) => {
    el._flip && el._flip.progress(1);
    el._flip = tl;
  });
  changeFunc();
  for (p in vars) {
    p !== "onComplete" && p !== "delay" && (copy[p] = vars[p]);
  }
  copy.x = (i, element) =>
    "+=" + (bounds[i].left - element.getBoundingClientRect().left);
  copy.y = (i, element) =>
    "+=" + (bounds[i].top - element.getBoundingClientRect().top);
  return tl.from(elements, copy);
}
```

**DEMO**

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/eYJLOdj)

```
<h1>Minimal FLIP Demo</h1>
<div class="containers">
  <div id="container1" class="container">
    <div id="box"></div>
  </div>
  <div id="container2" class="container"></div>
</div>

<button id="button">FLIP</button>
```

```
body {
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  flex-direction: column;
}

h1 {
  font-weight: 400;
}
* {
  position: relative;
}

.containers {
  width: 100%;
  display: flex;
  align-items: space-around;
  justify-content: space-around;
}

.container {
  width: 130px;
  height: 130px;
  outline: 2px dashed var(--color-surface-white);
  z-index: 1;
  border-radius: 5px;
}

#box {
  width: 100%;
  height: 100%;
  border-radius: 5px;
  background: var(--gradient-emerald-city),
    url(/demo-assets/noise.webp);
  background-blend-mode: color-dodge;
}

button {
  margin-top: 30px;
  cursor: pointer;
}

#container1::before,
#container2::before {
  position: absolute;
  text-align: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #999;
}
#container1::before {
  content: "#container1";
}
#container2::before {
  content: "#container2";
}
```

```
var container1 = document.querySelector("#container1");
var container2 = document.querySelector("#container2");
var button = document.querySelector("#button");
var box = document.querySelector("#box");

button.addEventListener("click", onClick);

function onClick() {
  flip([box], swapPosition);
}

function swapPosition() {
  var parent = box.parentElement === container1 ? container2 : container1;
  parent.appendChild(box);
}

function flip(elements, changeFunc, vars) {
  elements = gsap.utils.toArray(elements);
  vars = vars || {};
  let tl = gsap.timeline({onComplete: vars.onComplete, delay: vars.delay || 0}),
      bounds = elements.map(el => el.getBoundingClientRect()),
      copy = {},
      p;
  elements.forEach(el => {
    el._flip && el._flip.progress(1);
    el._flip = tl;
  })
  changeFunc();
  for (p in vars) {
    p !== "onComplete" && p !== "delay" && (copy[p] = vars[p]);
  }
  copy.x = (i, element) => "+=" + (bounds[i].left - element.getBoundingClientRect().left);
  copy.y = (i, element) => "+=" + (bounds[i].top - element.getBoundingClientRect().top);
  return tl.from(elements, copy);
}
```
