---
source: https://gsap.com/resources/getting-started/timelines
title: "Timelines"
fetched: 2026-10-28
---

# Timelines

Just like we've just seen with staggers, It's common to animate more than one thing. But what if we need more control over the order and timing of those animations?

A lot of people reach for delays, *and they're not wrong*, delays do give us rudimentary control:

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/eYMWJvP)

```
<div class="box green">no delay</div>
<div class="box purple">delay: 1</div>
<div class="box orange">delay: 2</div>
```

```
/* Global styles come from external css https://codepen.io/GreenSock/pen/gOWxmWG */


body {
  display: flex;
  align-items: center;
  justify-content: space-around;
  min-height: 100vh;
  margin: 0;
  overflow: hidden;
}

.box {
  display: block;
    display: flex;
  align-items: center;
  justify-content: center;
}
```

```
gsap.to(".green", { 
  rotation: 360,
  duration: 1,
});
gsap.to(".purple", { 
  rotation: 360,
  duration: 1,
  delay: 1,
});
gsap.to(".orange", { 
  rotation: 360,
  duration: 1,
  delay: 2,
});
```

But this method of sequencing animations is a little fragile. What happens if we lengthen the duration of the first tween? The second and third tweens have **no awareness** of this change, so now there's an overlap - we'd have to increase all of the delays to keep them synchronized. If you've animated with CSS you will have run into this problem before!

Frustrating? Yep. That's why we created timelines!

## Timelines[​](#timelines "Direct link to Timelines")

info

Timelines are the key to creating easily adjustable, resilient sequences of animations. When you add tweens to a timeline, by default they'll play one-after-another in the order they were added.

0.00

01

```
// create a timeline
let tl = gsap.timeline()

// add the tweens to the timeline - Note we're using tl.to not gsap.to
tl.to(".green", { x: 600, duration: 2 });
tl.to(".purple", { x: 600, duration: 1 });
tl.to(".orange", { x: 600, duration: 1 });
```

But what if we want to add a gap or delay in between some of the tweens? One option would be to add a delay to a tween to offset it 's start time. But this isn't ***hugely*** flexible. What if we want tweens to overlap or start at the same time?

0.00

01

```
let tl = gsap.timeline()

tl.to(".green", { x: 600, duration: 2 });
tl.to(".purple", { x: 600, duration: 1, delay: 1 });
tl.to(".orange", { x: 600, duration: 1 });
```

## Position Parameter[​](#position-parameter "Direct link to Position Parameter")

This handy little parameter is the secret to building gorgeous sequences with precise timing. There are a variety of position parameters that we can use to position tweens pretty much anywhere! Take a look at this timeline...

0.00

01

```
let tl = gsap.timeline()

// start at exactly 1 second into the timeline (absolute)
tl.to(".green", { x: 600, duration: 2 }, 1);

// insert at the start of the previous animation
tl.to(".purple", { x: 600, duration: 1 }, "<");

// insert 1 second after the end of the timeline (a gap)
tl.to(".orange", { x: 600, duration: 1 }, "+=1");
```

The most commonly used position parameters are the following -

1. **Absolute time** (in seconds) measured from the start of the timeline.

   ```
   // insert exactly 3 seconds from the start of the timeline
   tl.to(".class", {x: 100}, 3);
   ```

2. **A Gap**

   ```
   //  1 second after the end of the timeline (usually the previously inserted animation)
   tl.to(".class", {x: 100}, "+=1");
   // beyond the end of the timeline by 50% of the inserting animation's total duration
   tl.to(".class", {x: 100}, "+=50%");
   ```

3. **An Overlap**

   ```
   //  1 second before the end of the timeline (this is usually the previously inserted animation)
   tl.to(".class", {x: 100}, "-=1");

   //  overlap with the end of the timeline by 25% of the inserting animation's total duration
   tl.to(".class", {x: 100}, "-=25%");
   ```

Challenge

Position box **a** 3 seconds into the timeline.

Position box **b** 2 seconds after the end of box **a**.

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/BavNmNm)

```
<div class="demoBody">
<div id="sequence" class="timelineDemo">

     <div class="box green" data-color="#0ae448" id="a">a</div>
    <div class="box purple" data-color="#9d95ff" id="b">b</div>

    <div class="timelineUI">
      <div class="timelineUI-time" id="sequenceTime">0</div>
      <div class="timelineUI-dragger-track">
        <div class="timelineUI-dragger">
          <div></div>
        </div>
      </div>
      <div class="markers">
      </div>

      <div class="timleineUI-row">
        <div class="timelineUI-tween green"></div>
      </div>
      <div class="timleineUI-row">
        <div class="timelineUI-tween purple"></div>
      </div>
    </div>
    <div class="controls">
      <button class="timelineUI-button play">play</button>
    </div>
  </div>
</div>
```

```
/* GSAP brand: timeline demo. Works with the existing HTML and JS; only the CSS changes. */

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

:root {
  --panel: #191919;
  --ink: #fffce1;
  --ink-2: rgba(255, 252, 225, 0.64);
  --ink-3: rgba(255, 252, 225, 0.42);
  --fill: rgba(255, 252, 225, 0.06);
  --dark: #0e100f;

  --gradient-macha: linear-gradient(114.41deg, #0ae448 20.74%, #abff84 65.5%);
  --gradient-purple-haze: linear-gradient(153.58deg, #f7bdf8 32.25%, #2f3cc0 92.68%);
  --gradient-orange-crush: linear-gradient(111.45deg, #ff8709 19.42%, #f7bdf8 73.08%);

  --control: 36px; /* play button */
  --gap: 12px;
}

* {
  box-sizing: border-box;
}

body {
  display: grid;
  align-content: center;
  min-height: 100vh;
  margin: 0;
  padding: 20px;
  overflow: hidden;
  background: var(--panel);
  color: var(--ink-2);
  font: 400 16px/1.45 Mori, system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
}

.demoBody {
  width: 100%;
}

/* Layout: boxes sit over the tracks; the play button and time sit in the left column. */
.timelineDemo {
  display: grid;
  grid-template-columns: var(--control) minmax(0, 1fr);
  column-gap: var(--gap);
  row-gap: 8px;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
}

/* Boxes */
.timelineDemo .box {
  grid-column: 2;
  display: grid;
  place-items: center;
  width: 50px;
  height: 50px;
  border-radius: 10px;
  color: var(--dark);
  font: 600 16px/1 Mori, system-ui, sans-serif;
  will-change: transform;
}
#a { grid-row: 1; }
#b { grid-row: 2; margin-bottom: 12px; }

.box.green,
.timelineUI-tween.green {
  background-image: var(--gradient-macha);
}
.box.purple,
.timelineUI-tween.purple {
  background-image: var(--gradient-purple-haze);
}
.box.orange,
.timelineUI-tween.orange {
  background-image: var(--gradient-orange-crush);
}

/* Timeline */
.timelineUI {
  position: relative;
  grid-column: 2;
  grid-row: 3;
  display: flex;
  flex-direction: column;
}

.timleineUI-row {
  height: 14px;
  margin: 0 0 4px;
  padding: 0;
  border-radius: 99px;
  background: var(--fill);
}

/* Width and margin-left are set by the JS. */
.timelineUI-tween {
  height: 14px;
  border-radius: 99px;
}

/* Time: small, under the play button */
.timelineUI-time {
  position: absolute;
  top: 42px;
  right: calc(100% + var(--gap));
  width: var(--control);
  color: var(--ink-3);
  font: 400 11px/1 "Fraktion Mono", ui-monospace, Menlo, monospace;
  font-variant-numeric: tabular-nums;
  text-align: center;
}

/* Ruler: ticks every second, numbered with a counter (the JS adds one .secondMarker per second) */
.markers {
  order: 3;
  display: flex;
  justify-content: space-between;
  height: 28px;
  margin-top: 4px;
  counter-reset: sec -1;
}

.secondMarker {
  position: relative;
  width: 0;
  height: 5px;
  border-left: 1px solid var(--ink-3);
  counter-increment: sec;
}

.secondMarker::after {
  content: counter(sec);
  position: absolute;
  top: 9px;
  left: 0;
  transform: translateX(-50%);
  color: var(--ink-3);
  font: 400 11px/1 "Fraktion Mono", ui-monospace, Menlo, monospace;
}

/* Playhead: a hairline over the rows. The JS moves .timelineUI-dragger; the inner div is the grab area. */
.timelineUI-dragger-track {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  margin: 0;
  pointer-events: none;
}

.timelineUI-dragger {
  position: absolute;
  top: -4px;
  width: 0;
  height: 40px;
}

.timelineUI-dragger div {
  position: absolute;
  top: 0;
  left: -7px;
  width: 14px;
  height: 100%;
  border-radius: 0;
  background: none;
  cursor: ew-resize;
  pointer-events: auto;
  touch-action: none;
}

.timelineUI-dragger div::before {
  content: none;
}

.timelineUI-dragger div::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 1px;
  height: auto;
  border: 0;
  background: var(--ink);
  opacity: 0.8;
  transform: translateX(-50%);
  transition: width 0.15s, opacity 0.15s;
}

.timelineUI-dragger div:hover::after {
  width: 2px;
  opacity: 1;
}

/* Play button */
.controls {
  grid-column: 1;
  grid-row: 3;
  align-self: start;
  margin: -2px 0 0;
}

.timelineUI-button {
  position: relative;
  width: var(--control);
  height: var(--control);
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: var(--fill);
  color: var(--ink);
  font-size: 0; /* hides the "play" text; the arrow below replaces it */
  cursor: pointer;
  transition: background 0.15s;
}

.timelineUI-button::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 12px;
  height: 12px;
  background: currentColor;
  clip-path: polygon(0 0, 0 100%, 100% 50%);
  transform: translate(-40%, -50%); /* nudged right: a triangle's visual centre sits left of its box centre */
}

.timelineUI-button:hover {
  background: rgba(255, 252, 225, 0.1);
}

.timelineUI-button:focus-visible {
  outline: 2px solid rgba(255, 252, 225, 0.7);
  outline-offset: 2px;
}
```

```
gsap.registerPlugin(Draggable);

let w = document.querySelector('.timelineUI').offsetWidth - 50

let tl = gsap.timeline({ onUpdate: sequenceUpdateDragger, paused: true });

tl.to("#a", { x: w, duration: 2 })
  .to("#b", { x: w, duration: 1 })





































// IGNORE
let width = document.querySelector('.timelineUI').offsetWidth
gsap.to('.timelineUI-tween', {opacity: 1})
let sequenceTime = document.querySelector("#sequenceTime");
let markerCont = document.querySelector(".markers");
markerCont.innerHTML = '';
let sequenceTrackLength = width;
let sequenceDragger = document.querySelector("#sequence .timelineUI-dragger");
let timelineItems = document.querySelectorAll(".timelineUI-tween");
let children = tl.getChildren();
let time = tl.duration();

for (let i = 0; i < time + 1; i++) {
  markerCont.innerHTML += `<div class="secondMarker"></div>`;
}

function sequenceUpdateDragger() {
  gsap.set(sequenceDragger, {
    x: sequenceTrackLength * tl.progress()
  });
  sequenceTime.textContent = tl.time().toFixed(2);
}

let sequenceDraggable = Draggable.create(sequenceDragger, {
  type: "x",
  bounds: { minX: 0, maxX: sequenceTrackLength },
  trigger: "#sequence .timelineUI-dragger div",
  onDrag: function () {
    tl.progress(this.x / sequenceTrackLength).pause();
  }
})[0];

children.forEach((child, index) => {
	let timelineBar = timelineItems[index];
	let duration = child.duration();
	let startTime = child.startTime();
	let width = (duration / time) * 100;
	let startPosition = (startTime / time) * 100;
	let color = child._targets[0].dataset.color;

	gsap.set(timelineBar, {
		width: `${width}%`,
		marginLeft: `${startPosition}%`,
		backgroundColor: color
	});
});

document.querySelector("#sequence .play").addEventListener("click", function () {
  if (tl.progress() < 1) {
    tl.play();
  } else {
    tl.restart();
  }
});
```

Plugins[Draggable](/docs/v3/Plugins/Draggable/.md)

Deep Dive

Want to know more about the position parameter? [This article](/resources/position-parameter.md) covers it in more detail

## Special Properties[​](#special-properties "Direct link to Special Properties")

Timelines share most of the same special properties that tweens have like `repeat` and `delay` which allow you to control the entire sequence of animations as a whole!

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/NWYjZqQ)

```
<div class="box green"></div>
<div class="box purple"></div>
<div class="box orange"></div>
```

```
/* Global styles come from external css https://codepen.io/GreenSock/pen/gOWxmWG */


body {
  display: flex;
  align-items: center;
  justify-content: space-around;
  min-height: 100vh;
  margin: 0;
  overflow: hidden;
}

.box {
  display: block;
    display: flex;
  align-items: center;
  justify-content: center;
}
```

```
let tl = gsap.timeline({repeat: -1, repeatDelay: 1, yoyo: true})

tl.to(".green", { rotation: 360 });
tl.to(".purple", { rotation: 360 });
tl.to(".orange", { rotation: 360 });
```

## Timeline Defaults[​](#timeline-defaults "Direct link to Timeline Defaults")

tip

If you find yourself typing out a property over and over again, it might be time for `defaults`. Any property added to the defaults object in a timeline will be inherited by all the children that are created with the convenience methods like [to()](/docs/v3/GSAP/Timeline/to\(\).md), [from()](/docs/v3/GSAP/Timeline/from\(\).md), and [fromTo()](/docs/v3/GSAP/Timeline/fromTo\(\).md). This is a great way to keep your code concise.

```
var tl = gsap.timeline({defaults: {duration: 1}});

//no more repetition of duration: 1!
tl.to(".green", {x: 200})
  .to(".purple", {x: 200, scale: 0.2})
  .to(".orange", {x: 200, scale: 2, y: 20});
```
