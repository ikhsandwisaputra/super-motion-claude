---
source: https://gsap.com/docs/v3/GSAP
title: "GSAP"
fetched: 2026-10-28
---

# GSAP

Quick Start

or via a package manager like npm

```
npm install gsap
```

```
import { gsap } from "gsap"
```

#### Minimal usage

```
// This is a Tween
gsap.to(".box", { rotation: 27, x: 100, duration: 1 });

// And this is a Timeline, containing three sequenced tweens
let tl = gsap.timeline();
tl.to("#green", {duration: 1, x: 786})
  .to("#blue", {duration: 2, x: 786})
  .to("#orange", {duration: 1, x: 786})
```

The `gsap` object serves as the access point for most of GSAP's functionality. It's just a generic object with various methods and properties that create and control [Tweens](/docs/v3/GSAP/Tween.md) and [Timelines](/docs/v3/GSAP/Timeline.md), two of the most important concepts to understand.

Quick Overview

For a quick overview of the GSAP object, check out this video from the ["GSAP 3 Express" course](https://courses.snorkl.tv/courses/gsap-3-express?ref=44f484) by Snorkl.tv - one of the best ways to learn the basics.

To get the most out of GSAP, it's crucial that you understand what Tweens and Timelines are:

### What's a Tween?[​](#whats-a-tween "Direct link to What's a Tween?")

A [Tween](/docs/v3/GSAP/Tween.md) is what does all the animation work - think of it like a **high-performance property setter**. You feed in targets (the objects you want to animate), a duration, and any properties you want it to animate and then when the Tween's playhead moves to a new position, figures out what the property values should be at that point applies them accordingly.

#### Common methods for creating a Tween:[​](#common-methods-for-creating-a-tween "Direct link to Common methods for creating a Tween:")

* [gsap.to()](/docs/v3/GSAP/gsap.to\(\).md)
* [gsap.from()](/docs/v3/GSAP/gsap.from\(\).md)
* [gsap.fromTo()](/docs/v3/GSAP/gsap.fromTo\(\).md)

For simple animations (no fancy sequencing), the methods above are all you need! For example:

```
//rotate and move elements with a class of "box" ("x" is a shortcut for a translateX() transform) over the course of 1 second.
gsap.to(".box", { rotation: 27, x: 100, duration: 1 });
```

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/663f83b218082c4181ae23fd42d59cb5)

```
<div class="box gradient-green green"></div>
<div class="box gradient-purple purple"></div>
<div class="box gradient-blue blue"></div>
```

```
/* Global styles come from external css https://codepen.io/GreenSock/pen/xxmzBrw/fcaef74061bb7a76e5263dfc076c363e.css
 */
body {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  justify-content: center;
  min-height: 100vh;
  flex-direction: column;
}
```

```
// target the element with a class of "green" - rotate and move TO 100px to the left over the course of 1 second. 
gsap.to(".green", {rotation: 360, x: 100, duration: 1});

// target the element with a class of "purple" - rotate and move FROM 100px to the left over the course of 1 second. 
gsap.from(".purple", {rotation: -360, x: -100, duration: 1});

// target the element with a class of "blue" - rotate and move FROM 100px to the left, TO 100px to the right over the course of 1 second. 
gsap.fromTo(".blue", {x: -100},{rotation: 360, x: 100, duration: 1});
```

You can do basic sequencing by using the `delay` special property, but Timelines make sequencing and complex choreography much, much easier.

### What's a Timeline?[​](#whats-a-timeline "Direct link to What's a Timeline?")

A [Timeline](/docs/v3/GSAP/Timeline.md) is a **container for Tweens.** It's the ultimate sequencing tool that lets you position animations in time wherever you want and then control the whole sequence easily with methods like [pause()](/docs/v3/GSAP/Timeline/pause\(\).md), [play()](/docs/v3/GSAP/Timeline/play\(\).md), [progress()](/docs/v3/GSAP/Timeline/progress\(\).md), [reverse()](/docs/v3/GSAP/Timeline/reverse\(\).md), [timeScale()](/docs/v3/GSAP/Timeline/timeScale\(\).md), etc.

Create as many Timelines as you want. You can even **nest them** which is fantastic for modularizing your animation code! Every animation (Tween and Timeline) gets placed onto a parent timeline (the [globalTimeline](/docs/v3/GSAP/gsap.globalTimeline\(\)) by default). Moving a Timeline's playhead cascades down through its children so that the playheads stay aligned. A Timeline is purely about grouping things and coordinating time/playheads - it never actually sets properties on targets (Tweens handle that).

0

1

2blueSpin

3

4

Play

```
```

#### Method for creating a Timeline:[​](#method-for-creating-a-timeline "Direct link to Method for creating a Timeline:")

* [gsap.timeline()](/docs/v3/GSAP/gsap.timeline\(\).md)

GSAP's API lets you control virtually anything on-the-fly, such as the playhead position, the [startTime](/docs/v3/GSAP/Tween/startTime\(\).md) of any child, even play/pause/reverse the timeline or alter the timeScale itself.

## Sequencing[​](#sequencing "Direct link to Sequencing")

First, create a Timeline:

```
var tl = gsap.timeline();
```

Then add a tween using one of the convenience methods - [to()](/docs/v3/GSAP/Timeline/to\(\).md), [from()](/docs/v3/GSAP/Timeline/from\(\).md), or [fromTo()](/docs/v3/GSAP/Timeline/fromTo\(\).md):

```
tl.to(".box", { duration: 2, x: 100, opacity: 0.5 });
```

Do that as many times as you want. Notice we're calling `.to()` **on the timeline instance** (the variable `tl` in this case), not the `gsap` object. This creates a tween and immediately puts it into that particular Timeline. `gsap.to()`, on the other hand, creates a standalone tween. By default, the animations will be sequenced one-after-the-other. You can even use method chaining to simplify your code like this:

```
//sequenced one-after-the-other
tl.to(".box1", { duration: 2, x: 100 }) //notice that there's no semicolon!
  .to(".box2", { duration: 1, y: 200 })
  .to(".box3", { duration: 3, rotation: 360 });
```

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/d0b24f699d5bee2305cb8223de580a62)

```
<div class="box box1 green"></div>
<div class="box box2 orange"></div>
<div class="box box3 purple"></div>
```

```
/* Global styles come from external css https://codepen.io/GreenSock/pen/xxmzBrw */

body {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 100vh;
  gap: 1rem;
}

.box {
  display: block;
}

.pink {
  background-color: pink;
}
```

```
var tl = gsap.timeline({delay: 1, repeat: -1, yoyo: true});
//sequenced one-after-the-other
tl.to(".box1", {duration: 1, rotation: -360})
  .to(".box2", {duration: 2, x: -100, ease: 'elastic.out'})
  .to(".box3", {duration: 2, rotation: 360, x: 100, ease: 'expo.out'});
```

info

The whole GSAP platform is object-oriented and you could create individual tween instances with [gsap.to()](/docs/v3/GSAP/gsap.to\(\).md), for example, and then [timeline.add()](/docs/v3/GSAP/Timeline/add\(\).md) each one but it's just easier to call .to(), .from(), or .fromTo() directly on the Timeline instance to do the same thing in fewer steps.

## Positioning[​](#positioning "Direct link to Positioning")

Define **exactly** where you want your animations to be placed into the timeline by using the optional [position parameter](/resources/position-parameter.md). A number indicates an absolute time (in seconds), or a string with a `"+="` or `"-="` prefix indicates an offset relative to the END of the timeline. For example, `"+=2"` would be 2 seconds after the end, creating a 2-second gap. `"-=2"` would create a 2-second overlap.

0

1

2blueSpin

3

4

Play

```
```

### Labels[​](#labels "Direct link to Labels")

Use labels to mark certain spots on the timeline so that you can place animations there or navigate there during playback.

0

1

2blueSpin

3

4

Play

```
```

```
//add a label at exactly 3 seconds
tl.addLabel("step2", 3)

//then later, we can seek() to that spot:
tl.seek("step2");
```

## Control methods[​](#control-methods "Direct link to Control methods")

[Tween](/docs/v3/GSAP/Tween.md) and [Timeline](/docs/v3/GSAP/Timeline.md) both extend an Animation class that exposes a myriad of useful methods and properties. Here are some of the most frequently used:

```
pause()
play()
progress()
restart()
resume()
reverse()
seek()
time()
duration()
timeScale()
kill()
```

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/OJLgdyg)

```
<div class="container">
  <div class="flair flair--25"></div>
  <div class="nav light">
  <button id="play">play()</button>
  <button id="pause">pause()</button>
  <button id="resume">resume()</button>
  <button id="reverse">reverse()</button>
  <button id="restart">restart()</button>
</div>
</div>
```

```
@font-face {
  font-display: block;
  font-family: Fraktion Mono;
  font-style: normal;
  font-weight: 400;
  src: url(/fonts/Fraktion/PPFraktionMono-Bold.woff) format("woff");
}

:root {
  --dark: #0e100f;
  --light: #fffce1;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 100vh;
  margin: 0;
  background-color: var(--dark);
}

.flair {
  width: 100px;
  height: 100px;
  margin: 0 auto;
  background-size: contain;
  background-repeat: no-repeat;
  will-change: transform;
}

.flair--25 {
  background-image: url("/demo-assets/flair-25.webp");
}

.nav.light {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-top: 2rem;
  background-color: transparent;
}
button {
  margin: 0.25rem;
  padding: 10px 20px;
  background: transparent;
  border: 1px solid rgba(255, 252, 225, 0.2);
  border-radius: 99px;
  color: #bbbaa6;
  font-family: Fraktion Mono, monospace;
  font-size: 0.85rem;
  line-height: 1;
  text-transform: none;
  cursor: pointer;
  transition: color 0.2s, border-color 0.2s;
}

button:hover {
  color: #fffce1;
  border-color: rgba(255, 252, 225, 0.6);
}
```

```
let nav = document.querySelector('.nav')

let tween = gsap.to(".flair", {
  duration: 2, 
  x: () => nav.offsetWidth, // animate by the px width of the nav
  xPercent: -100, // offset by the width of the box
  rotation: 360, 
  ease: "none", 
  paused: true
});

// click handlers for controlling the tween instance...
document.querySelector("#play").onclick = () => tween.play();
document.querySelector("#pause").onclick = () => tween.pause();
document.querySelector("#resume").onclick = () => tween.resume();
document.querySelector("#reverse").onclick = () => tween.reverse();
document.querySelector("#restart").onclick = () => tween.restart();
```

Reference the Tween or Timeline instance with a variable, and then control it whenever you want:

```
//you only need to create a variable if you want to control it later...
var tween = gsap.to(...);
var tl = gsap.timeline(); //"tl" short for timeline
tl.to(...).to(...); //add animations.

//now we can control them...
tween.pause();
tween.timeScale(2); //double speed
tl.seek(3); //jump to 3 seconds in
tl.progress(0.5); //halfway through
...
```
