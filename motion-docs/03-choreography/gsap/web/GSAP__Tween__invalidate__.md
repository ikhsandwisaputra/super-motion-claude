---
source: https://gsap.com/docs/v3/GSAP/Tween/invalidate()
title: "invalidate"
fetched: 2026-10-28
---

# invalidate

### invalidate( ) : self

\[override] Flushes any internally-recorded starting/ending values which can be useful if you want to restart an animation without reverting to any previously recorded starting values.

### Returns : self[​](#returns--self "Direct link to Returns : self")

self (makes chaining easier)

### Details[​](#details "Direct link to Details")

Clears any initialization data (like recorded starting/ending values) which can be useful if, for example, you want to restart a tween without reverting to any previously recorded starting values. When you `invalidate()` an animation, it will be re-initialized the next time it renders and its `vars` object will be re-parsed. The timing of the animation (duration, startTime, delay) will not be affected.

For example, let's say `element.x` is 0 and then you `gsap.to(element, {duration: 2, x: "+=100"})`, it will animate from 0 to 100 over the course of 2 seconds. If you `restart()` that tween, it'll do exactly the same (animate from 0 to 100).

But let's say after that tween runs once, you'd like to flush the starting/ending values that were recorded internally so that x animates to 100 more than where it is **NOW** (which in this example would be 100). If we now call `invalidate()` on that tween, it'll re-parse the starting/ending values on the next render, thus causing it to animate `x` from 100 to 200.

When you invalidate a timeline, it automatically invalidates all of its children.

Note: if you just want to invalidate() a tween each time it repeats, you can use the `repeatRefresh: true` special property.

Invalidate

[YouTube video player](https://www.youtube.com/embed/p1MAs-P_APk)

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/1f6532a0c9a0bd0363834f078c7f9c71)

```
<div class="box green"></div>
<div class="nav">
    <button id="restart">play again</button>

    <button id="invalidate">invalidate and play again</button>
```

```
/* Global styles come from external css https://codepen.io/GreenSock/pen/JGaKdQ*/

body{display:flex;align-items:center;justify-content:center;min-height:100vh;flex-direction: column; gap: 2rem}

button {
  display:inline;
}
```

```
var t = gsap.to(".green", {duration: 1, x: "+=100"});

document.querySelector("#restart").addEventListener("click", function() {
  t.restart();
});

document.querySelector("#invalidate").addEventListener("click", function() {
  t.invalidate();
  t.restart();
});
```
