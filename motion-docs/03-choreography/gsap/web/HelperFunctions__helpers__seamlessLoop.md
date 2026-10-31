---
source: https://gsap.com/docs/v3/HelperFunctions/helpers/seamlessLoop
title: "Seamlessly loop elements along the x-axis"
fetched: 2026-10-28
---

# Seamlessly loop elements along the x-axis

Like a slider or news ticker, where elements go off one side and then eventually come back around from the other side. This helper function does all the hard work for you, returning a timeline with some special methods/properties added that allow you to go to the next/previous element, or jump to a particular one (based on its index in the Array). It's even responsive because it uses xPercent for the animations, so if your elements change width based on screen size, it doesn't break everything.

```
/*
This helper function makes a group of elements animate along the x-axis in a seamless, responsive loop.

Features:
- Uses xPercent so that even if the widths change (like if the window gets resized), it should still work in most cases.
- When each item animates to the left or right enough, it will loop back to the other side
- Optionally pass in a config object with values like "speed" (default: 1, which travels at roughly 100 pixels per second), paused (boolean),  repeat, reversed, and paddingRight.
- The returned timeline will have the following methods added to it:
- next() - animates to the next element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
- previous() - animates to the previous element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
- toIndex() - pass in a zero-based index value of the element that it should animate to, and optionally pass in a vars object to control duration, easing, etc. Always goes in the shortest direction
- current() - returns the current index (if an animation is in-progress, it reflects the final index)
- times - an Array of the times on the timeline where each element hits the "starting" spot. There's also a label added accordingly, so "label1" is when the 2nd element reaches the start.
*/
function horizontalLoop(items, config) {
  items = gsap.utils.toArray(items);
  config = config || {};
  let tl = gsap.timeline({
      repeat: config.repeat,
      paused: config.paused,
      defaults: { ease: "none" },
      onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100),
    }),
    length = items.length,
    startX = items[0].offsetLeft,
    times = [],
    widths = [],
    xPercents = [],
    curIndex = 0,
    pixelsPerSecond = (config.speed || 1) * 100,
    snap = config.snap === false ? (v) => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
    totalWidth,
    curX,
    distanceToStart,
    distanceToLoop,
    item,
    i;
  gsap.set(items, {
    // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
    xPercent: (i, el) => {
      let w = (widths[i] = parseFloat(gsap.getProperty(el, "width", "px")));
      xPercents[i] = snap(
        (parseFloat(gsap.getProperty(el, "x", "px")) / w) * 100 +
          gsap.getProperty(el, "xPercent")
      );
      return xPercents[i];
    },
  });
  gsap.set(items, { x: 0 });
  totalWidth =
    items[length - 1].offsetLeft +
    (xPercents[length - 1] / 100) * widths[length - 1] -
    startX +
    items[length - 1].offsetWidth *
      gsap.getProperty(items[length - 1], "scaleX") +
    (parseFloat(config.paddingRight) || 0);
  for (i = 0; i < length; i++) {
    item = items[i];
    curX = (xPercents[i] / 100) * widths[i];
    distanceToStart = item.offsetLeft + curX - startX;
    distanceToLoop =
      distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
    tl.to(
      item,
      {
        xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
        duration: distanceToLoop / pixelsPerSecond,
      },
      0
    )
      .fromTo(
        item,
        {
          xPercent: snap(
            ((curX - distanceToLoop + totalWidth) / widths[i]) * 100
          ),
        },
        {
          xPercent: xPercents[i],
          duration:
            (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
          immediateRender: false,
        },
        distanceToLoop / pixelsPerSecond
      )
      .add("label" + i, distanceToStart / pixelsPerSecond);
    times[i] = distanceToStart / pixelsPerSecond;
  }
  function toIndex(index, vars) {
    vars = vars || {};
    Math.abs(index - curIndex) > length / 2 &&
      (index += index > curIndex ? -length : length); // always go in the shortest direction
    let newIndex = gsap.utils.wrap(0, length, index),
      time = times[newIndex];
    if (time > tl.time() !== index > curIndex) {
      // if we're wrapping the timeline's playhead, make the proper adjustments
      vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
      time += tl.duration() * (index > curIndex ? 1 : -1);
    }
    curIndex = newIndex;
    vars.overwrite = true;
    return tl.tweenTo(time, vars);
  }
  tl.next = (vars) => toIndex(curIndex + 1, vars);
  tl.previous = (vars) => toIndex(curIndex - 1, vars);
  tl.current = () => curIndex;
  tl.toIndex = (index, vars) => toIndex(index, vars);
  tl.times = times;
  tl.progress(1, true).progress(0, true); // pre-render for performance
  if (config.reversed) {
    tl.vars.onReverseComplete();
    tl.reverse();
  }
  return tl;
}
```

## Usage[​](#usage "Direct link to Usage")

```
const boxes = gsap.utils.toArray(".box"),
  loop = horizontalLoop(boxes, { paused: true });

// add click listeners so you can click a box to have it move to the first slot
boxes.forEach((box, i) =>
  box.addEventListener("click", () =>
    loop.toIndex(i, { duration: 1, ease: "power1.inOut" })
  )
);

// make the "next" and "previous" buttons call the appropriate methods on the timeline
document
  .querySelector(".next")
  .addEventListener("click", () =>
    loop.next({ duration: 1, ease: "power1.inOut" })
  );
document
  .querySelector(".prev")
  .addEventListener("click", () =>
    loop.previous({ duration: 1, ease: "power1.inOut" })
  );
```

## Simple Demo[​](#simple-demo "Direct link to Simple Demo")

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/ZELPxWW)

```
<div class="button-cont">
  <button class="prev">prev</button>
  <button class="toggle">toggle overflow</button>
  <button class="next">next</button>
</div>

<div class="wrapper">
  <div class="box">
    <div class="box__inner">
      <p>1</p>
    </div>
  </div>
  <div class="box">
    <div class="box__inner">
      <p>2</p>
    </div>
  </div>
  <div class="box">
    <div class="box__inner">
      <p>3</p>
    </div>
  </div>
  <div class="box">
    <div class="box__inner">
      <p>4</p>
    </div>
  </div>
  <div class="box" style="width:350px">
    <div class="box__inner">
      <p>5</p>
    </div>
  </div>
  <div class="box">
    <div class="box__inner">
      <p>6</p>
    </div>
  </div>
  <div class="box">
    <div class="box__inner">
      <p>7</p>
    </div>
  </div>
  <div class="box">
    <div class="box__inner">
      <p>8</p>
    </div>
  </div>
  <div class="box">
    <div class="box__inner">
      <p>9</p>
    </div>
  </div>
  <div class="box">
    <div class="box__inner">
      <p>10</p>
    </div>
  </div>
  <div class="box">
    <div class="box__inner">
      <p>11</p>
    </div>
  </div>
</div>
```

```
* {
  box-sizing: border-box;
}

body {
  font-family: system-ui;
  background: var(--color-just-black);
  color: white;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
}

.button-cont {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 2rem;
  gap: 1rem;
}

.wrapper {
  height: 300px;
  max-height: 50vh;
  width: 70%;
  border-left: dashed 2px var(--color-surface50);
  border-right: dashed 2px var(--color-surface50);
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.carousel {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.box {
  padding: 0.5rem;
  flex-shrink: 0;
  height: 80%;
  width: 20%;
  min-width: 150px;
}

.box__inner {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  font-size: 21px;
  cursor: pointer;
  width: 100%;
  height: 100%;
}

.show-overflow {
  overflow: visible;
}

.box .box__inner {
  background: linear-gradient(var(--color-just-black), var(--color-just-black))
      padding-box,
    var(--gradient) border-box;
  border: 3px solid transparent;
  border-radius: 10px;
}

.box {
  --gradient: var(--gradient-macha);
}

.box:nth-child(3n + 2) {
  --gradient: var(--gradient-summer-fair);
}

.box:nth-child(3n + 1) {
  --gradient: var(--gradient-orange-crush);
}

.box p {
  -webkit-text-fill-color: transparent;
  background: var(--gradient);
  -webkit-background-clip: text;
  background-clip: text;
  font-size: 3rem;
}
```

```
const wrapper = document.querySelector(".wrapper");
const boxes = gsap.utils.toArray(".box");


const loop = horizontalLoop(boxes, {paused: true});

boxes.forEach((box, i) => box.addEventListener("click", () => loop.toIndex(i, {duration: 0.8, ease: "power1.inOut"})));

document.querySelector(".toggle").addEventListener("click", () => wrapper.classList.toggle("show-overflow"));
document.querySelector(".next").addEventListener("click", () => loop.next({duration: 0.4, ease: "power1.inOut"}));
document.querySelector(".prev").addEventListener("click", () => loop.previous({duration: 0.4, ease: "power1.inOut"}));


/*
This helper function makes a group of elements animate along the x-axis in a seamless, responsive loop.

Features:
 - Uses xPercent so that even if the widths change (like if the window gets resized), it should still work in most cases.
 - When each item animates to the left or right enough, it will loop back to the other side
 - Optionally pass in a config object with values like "speed" (default: 1, which travels at roughly 100 pixels per second), paused (boolean),  repeat, reversed, and paddingRight.
 - The returned timeline will have the following methods added to it:
   - next() - animates to the next element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
   - previous() - animates to the previous element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
   - toIndex() - pass in a zero-based index value of the element that it should animate to, and optionally pass in a vars object to control duration, easing, etc. Always goes in the shortest direction
   - current() - returns the current index (if an animation is in-progress, it reflects the final index)
   - times - an Array of the times on the timeline where each element hits the "starting" spot. There's also a label added accordingly, so "label1" is when the 2nd element reaches the start.
 */
function horizontalLoop(items, config) {
	items = gsap.utils.toArray(items);
	config = config || {};
	let tl = gsap.timeline({repeat: config.repeat, paused: config.paused, defaults: {ease: "none"}, onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100)}),
		length = items.length,
		startX = items[0].offsetLeft,
		times = [],
		widths = [],
		xPercents = [],
		curIndex = 0,
		pixelsPerSecond = (config.speed || 1) * 100,
		snap = config.snap === false ? v => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
		totalWidth, curX, distanceToStart, distanceToLoop, item, i;
	gsap.set(items, { // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
		xPercent: (i, el) => {
			let w = widths[i] = parseFloat(gsap.getProperty(el, "width", "px"));
			xPercents[i] = snap(parseFloat(gsap.getProperty(el, "x", "px")) / w * 100 + gsap.getProperty(el, "xPercent"));
			return xPercents[i];
		}
	});
	gsap.set(items, {x: 0});
	totalWidth = items[length-1].offsetLeft + xPercents[length-1] / 100 * widths[length-1] - startX + items[length-1].offsetWidth * gsap.getProperty(items[length-1], "scaleX") + (parseFloat(config.paddingRight) || 0);
	for (i = 0; i < length; i++) {
		item = items[i];
		curX = xPercents[i] / 100 * widths[i];
		distanceToStart = item.offsetLeft + curX - startX;
		distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
		tl.to(item, {xPercent: snap((curX - distanceToLoop) / widths[i] * 100), duration: distanceToLoop / pixelsPerSecond}, 0)
		  .fromTo(item, {xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100)}, {xPercent: xPercents[i], duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond, immediateRender: false}, distanceToLoop / pixelsPerSecond)
		  .add("label" + i, distanceToStart / pixelsPerSecond);
		times[i] = distanceToStart / pixelsPerSecond;
	}
	function toIndex(index, vars) {
		vars = vars || {};
		(Math.abs(index - curIndex) > length / 2) && (index += index > curIndex ? -length : length); // always go in the shortest direction
		let newIndex = gsap.utils.wrap(0, length, index),
			time = times[newIndex];
		if (time > tl.time() !== index > curIndex) { // if we're wrapping the timeline's playhead, make the proper adjustments
			vars.modifiers = {time: gsap.utils.wrap(0, tl.duration())};
			time += tl.duration() * (index > curIndex ? 1 : -1);
		}
		curIndex = newIndex;
		vars.overwrite = true;
		return tl.tweenTo(time, vars);
	}
	tl.next = vars => toIndex(curIndex+1, vars);
	tl.previous = vars => toIndex(curIndex-1, vars);
	tl.current = () => curIndex;
	tl.toIndex = (index, vars) => toIndex(index, vars);
	tl.times = times;
  tl.progress(1, true).progress(0, true); // pre-render for performance
  if (config.reversed) {
    tl.vars.onReverseComplete();
    tl.reverse();
  }
	return tl;
}
```

## Demo with Draggable[​](#demo-with-draggable "Direct link to Demo with Draggable")

#### (with "center: true" and onChange features)[​](#with-center-true-and-onchange-features "Direct link to (with \"center: true\" and onChange features)")

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/gOvvJee)

```
<div class="button-cont">
  <button class="prev">prev</button>
  <button class="toggle">toggle overflow</button>
  <button class="next">next</button>
</div>

<div class="wrapper">
  <div class="box">
    <div class="box__inner">
      <p>1</p>
    </div>
  </div>
  <div class="box">
    <div class="box__inner">
      <p>2</p>
    </div>
  </div>
  <div class="box">
    <div class="box__inner">
      <p>3</p>
    </div>
  </div>
  <div class="box">
    <div class="box__inner">
      <p>4</p>
    </div>
  </div>
  <div class="box" style="width:350px">
    <div class="box__inner">
      <p>5</p>
    </div>
  </div>
  <div class="box">
    <div class="box__inner">
      <p>6</p>
    </div>
  </div>
  <div class="box">
    <div class="box__inner">
      <p>7</p>
    </div>
  </div>
  <div class="box">
    <div class="box__inner">
      <p>8</p>
    </div>
  </div>
  <div class="box">
    <div class="box__inner">
      <p>9</p>
    </div>
  </div>
  <div class="box">
    <div class="box__inner">
      <p>10</p>
    </div>
  </div>
  <div class="box">
    <div class="box__inner">
      <p>11</p>
    </div>
  </div>
</div>
```

```
* {
  box-sizing: border-box;
}

body {
  font-family: system-ui;
  background: var(--color-just-black);
  color: white;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
}

.button-cont {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 2rem;
  gap: 1rem;
}

.wrapper {
  height: 300px;
  max-height: 50vh;
  width: 70%;
  border-left: dashed 2px var(--color-surface50);
  border-right: dashed 2px var(--color-surface50);
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.carousel {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.box {
  padding: 0.5rem;
  flex-shrink: 0;
  height: 80%;
  width: 20%;
  min-width: 150px;
}

.box__inner {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  font-size: 21px;
  cursor: pointer;
  width: 100%;
  height: 100%;
}

.show-overflow {
  overflow: visible;
}

.box .box__inner {
  background: linear-gradient(var(--color-just-black), var(--color-just-black))
      padding-box,
    var(--gradient) border-box;
  border: 3px solid transparent;
  border-radius: 10px;
}

.box {
  --gradient: var(--gradient-macha);
}

.box:nth-child(3n + 2) {
  --gradient: var(--gradient-summer-fair);
}

.box:nth-child(3n + 1) {
  --gradient: var(--gradient-orange-crush);
}

.box p {
  -webkit-text-fill-color: transparent;
  background: var(--gradient);
  -webkit-background-clip: text;
  background-clip: text;
  font-size: 3rem;
}
```

```
const wrapper = document.querySelector(".wrapper");

const boxes = gsap.utils.toArray(".box");

let activeElement;
const loop = horizontalLoop(boxes, {
  paused: true, 
  draggable: true, // make it draggable
  center: true, // active element is the one in the center of the container rather than th left edge
  onChange: (element, index) => { // when the active element changes, this function gets called.
    activeElement && activeElement.classList.remove("active");
    element.classList.add("active");
    activeElement = element;
  }
});

boxes.forEach((box, i) => box.addEventListener("click", () => loop.toIndex(i, {duration: 0.8, ease: "power1.inOut"})));

document.querySelector(".toggle").addEventListener("click", () => wrapper.classList.toggle("show-overflow"));
document.querySelector(".next").addEventListener("click", () => loop.next({duration: 0.4, ease: "power1.inOut"}));
document.querySelector(".prev").addEventListener("click", () => loop.previous({duration: 0.4, ease: "power1.inOut"}));




/*
This helper function makes a group of elements animate along the x-axis in a seamless, responsive loop.

Features:
 - Uses xPercent so that even if the widths change (like if the window gets resized), it should still work in most cases.
 - When each item animates to the left or right enough, it will loop back to the other side
 - Optionally pass in a config object with values like draggable: true, center: true, speed (default: 1, which travels at roughly 100 pixels per second), paused (boolean), repeat, reversed, and paddingRight.
 - The returned timeline will have the following methods added to it:
   - next() - animates to the next element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
   - previous() - animates to the previous element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
   - toIndex() - pass in a zero-based index value of the element that it should animate to, and optionally pass in a vars object to control duration, easing, etc. Always goes in the shortest direction
   - current() - returns the current index (if an animation is in-progress, it reflects the final index)
   - times - an Array of the times on the timeline where each element hits the "starting" spot.
 */
function horizontalLoop(items, config) {
  let timeline;
  items = gsap.utils.toArray(items);
  config = config || {};
  gsap.context(() => { // use a context so that if this is called from within another context or a gsap.matchMedia(), we can perform proper cleanup like the "resize" event handler on the window
    let onChange = config.onChange,
      lastIndex = 0,
      tl = gsap.timeline({repeat: config.repeat, onUpdate: onChange && function() {
          let i = tl.closestIndex();
          if (lastIndex !== i) {
            lastIndex = i;
            onChange(items[i], i);
          }
        }, paused: config.paused, defaults: {ease: "none"}, onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100)}),
      length = items.length,
      startX = items[0].offsetLeft,
      times = [],
      widths = [],
      spaceBefore = [],
      xPercents = [],
      curIndex = 0,
      indexIsDirty = false,
      center = config.center,
      pixelsPerSecond = (config.speed || 1) * 100,
      snap = config.snap === false ? v => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
      timeOffset = 0,
      container = center === true ? items[0].parentNode : gsap.utils.toArray(center)[0] || items[0].parentNode,
      totalWidth,
      getTotalWidth = () => items[length-1].offsetLeft + xPercents[length-1] / 100 * widths[length-1] - startX + spaceBefore[0] + items[length-1].offsetWidth * gsap.getProperty(items[length-1], "scaleX") + (parseFloat(config.paddingRight) || 0),
      populateWidths = () => {
        let b1 = container.getBoundingClientRect(), b2;
        items.forEach((el, i) => {
          widths[i] = parseFloat(gsap.getProperty(el, "width", "px"));
          xPercents[i] = snap(parseFloat(gsap.getProperty(el, "x", "px")) / widths[i] * 100 + gsap.getProperty(el, "xPercent"));
          b2 = el.getBoundingClientRect();
          spaceBefore[i] = b2.left - (i ? b1.right : b1.left);
          b1 = b2;
        });
        gsap.set(items, { // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
          xPercent: i => xPercents[i]
        });
        totalWidth = getTotalWidth();
      },
      timeWrap,
      populateOffsets = () => {
        timeOffset = center ? tl.duration() * (container.offsetWidth / 2) / totalWidth : 0;
        center && times.forEach((t, i) => {
          times[i] = timeWrap(tl.labels["label" + i] + tl.duration() * widths[i] / 2 / totalWidth - timeOffset);
        });
      },
      getClosest = (values, value, wrap) => {
        let i = values.length,
          closest = 1e10,
          index = 0, d;
        while (i--) {
          d = Math.abs(values[i] - value);
          if (d > wrap / 2) {
            d = wrap - d;
          }
          if (d < closest) {
            closest = d;
            index = i;
          }
        }
        return index;
      },
      populateTimeline = () => {
        let i, item, curX, distanceToStart, distanceToLoop;
        tl.clear();
        for (i = 0; i < length; i++) {
          item = items[i];
          curX = xPercents[i] / 100 * widths[i];
          distanceToStart = item.offsetLeft + curX - startX + spaceBefore[0];
          distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
          tl.to(item, {xPercent: snap((curX - distanceToLoop) / widths[i] * 100), duration: distanceToLoop / pixelsPerSecond}, 0)
            .fromTo(item, {xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100)}, {xPercent: xPercents[i], duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond, immediateRender: false}, distanceToLoop / pixelsPerSecond)
            .add("label" + i, distanceToStart / pixelsPerSecond);
          times[i] = distanceToStart / pixelsPerSecond;
        }
        timeWrap = gsap.utils.wrap(0, tl.duration());
      },
      refresh = (deep) => {
        let progress = tl.progress();
        tl.progress(0, true);
        populateWidths();
        deep && populateTimeline();
        populateOffsets();
        deep && tl.draggable && tl.paused() ? tl.time(times[curIndex], true) : tl.progress(progress, true);
      },
      onResize = () => refresh(!(tl.draggable && tl.draggable.isDragging)),
      proxy;
    gsap.set(items, {x: 0});
    populateWidths();
    populateTimeline();
    populateOffsets();
    window.addEventListener("resize", onResize);
    function toIndex(index, vars) {
      vars = vars || {};
      (Math.abs(index - curIndex) > length / 2) && (index += index > curIndex ? -length : length); // always go in the shortest direction
      let newIndex = gsap.utils.wrap(0, length, index),
        time = times[newIndex];
      if (time > tl.time() !== index > curIndex && index !== curIndex) { // if we're wrapping the timeline's playhead, make the proper adjustments
        time += tl.duration() * (index > curIndex ? 1 : -1);
      }
      if (time < 0 || time > tl.duration()) {
        vars.modifiers = {time: timeWrap};
      }
      curIndex = newIndex;
      vars.overwrite = true;
      gsap.killTweensOf(proxy);    
      return vars.duration === 0 ? tl.time(timeWrap(time)) : tl.tweenTo(time, vars);
    }
    tl.toIndex = (index, vars) => toIndex(index, vars);
    tl.closestIndex = setCurrent => {
      let index = getClosest(times, tl.time(), tl.duration());
      if (setCurrent) {
        curIndex = index;
        indexIsDirty = false;
      }
      return index;
    };
    tl.current = () => indexIsDirty ? tl.closestIndex(true) : curIndex;
    tl.next = vars => toIndex(tl.current()+1, vars);
    tl.previous = vars => toIndex(tl.current()-1, vars);
    tl.times = times;
    tl.progress(1, true).progress(0, true); // pre-render for performance
    if (config.reversed) {
      tl.vars.onReverseComplete();
      tl.reverse();
    }
    if (config.draggable && typeof(Draggable) === "function") {
      proxy = document.createElement("div")
      let wrap = gsap.utils.wrap(0, 1),
        ratio, startProgress, draggable, dragSnap, lastSnap, wasPlaying,
        align = () => tl.progress(wrap(startProgress + (draggable.startX - draggable.x) * ratio)),
        syncIndex = () => tl.closestIndex(true);
      typeof(InertiaPlugin) === "undefined" && console.warn("InertiaPlugin required for momentum-based scrolling and snapping. https://greensock.com/club");
      draggable = Draggable.create(proxy, {
        trigger: items[0].parentNode,
        type: "x",
        onPressInit() {
          let x = this.x;
          gsap.killTweensOf(tl);
          wasPlaying = !tl.paused();
          tl.pause();
          startProgress = tl.progress();
          refresh();
          ratio = 1 / totalWidth;
          gsap.set(proxy, {x: startProgress / -ratio});
          // fix bug that existed prior to version 3.14.0 that could cause the inertia to jump due to setting the new x position.
          if (+InertiaPlugin.version.split(".")[1] < 14) {
            let tracker = InertiaPlugin.getByTarget(proxy),
                pt = tracker && tracker._props.x;
            pt && (pt.v1 = pt.v2 = startProgress / -ratio); // effectively resets the velocity (only necessary in old versions, before 3.14.0)
          }
        },
        onDrag: align,
        onThrowUpdate: align,
        overshootTolerance: 0,
        inertia: true,
        snap(value) {
          let time = -(value * ratio) * tl.duration(),
            wrappedTime = timeWrap(time),
            snapTime = times[getClosest(times, wrappedTime, tl.duration())],
            dif = snapTime - wrappedTime;
          Math.abs(dif) > tl.duration() / 2 && (dif += dif < 0 ? tl.duration() : -tl.duration());
          lastSnap = (time + dif) / tl.duration() / -ratio;
          return lastSnap;
        },
        onRelease() {
          syncIndex();
          draggable.isThrowing && (indexIsDirty = true);
        },
        onThrowComplete: () => {
          syncIndex();
          wasPlaying && tl.play();
        }
      })[0];
      tl.draggable = draggable;
    }
    tl.closestIndex(true);
    lastIndex = curIndex;
    onChange && onChange(items[curIndex], curIndex);
    timeline = tl;
    return () => window.removeEventListener("resize", onResize); // cleanup
  });
  return timeline;
}
```

Plugins[Draggable](/docs/v3/Plugins/Draggable/.md)[InertiaPlugin](/docs/v3/Plugins/InertiaPlugin/.md)

## Vertical Loop with Draggable[​](#vertical-loop-with-draggable "Direct link to Vertical Loop with Draggable")

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/MWXPgKm)

```
<div class="wrapper">
  <div class="box">
    <div class="box__inner">
      <p>1</p>
    </div>
  </div>
  <div class="box">
    <div class="box__inner">
      <p>2</p>
    </div>
  </div>
  <div class="box">
    <div class="box__inner">
      <p>3</p>
    </div>
  </div>
  <div class="box">
    <div class="box__inner">
      <p>4</p>
    </div>
  </div>
  <div class="box" style="height:250px">
    <div class="box__inner">
      <p>5</p>
    </div>
  </div>
  <div class="box">
    <div class="box__inner">
      <p>6</p>
    </div>
  </div>
  <div class="box">
    <div class="box__inner">
      <p>7</p>
    </div>
  </div>
  <div class="box">
    <div class="box__inner">
      <p>8</p>
    </div>
  </div>
  <div class="box">
    <div class="box__inner">
      <p>9</p>
    </div>
  </div>
  <div class="box">
    <div class="box__inner">
      <p>10</p>
    </div>
  </div>
  <div class="box">
    <div class="box__inner">
      <p>11</p>
    </div>
  </div>
</div>
<div class="button-cont">
  <button class="prev">prev</button>
  <button class="toggle">toggle overflow</button>
  <button class="next">next</button>
</div>
```

```
* {
  box-sizing: border-box;
}

body {
  font-family: system-ui;
  background: var(--color-just-black);
  color: white;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  height: 100vh;
}

.button-cont {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
  margin-bottom: 2rem;
  gap: 1rem;
  z-index:100;
}

.wrapper {
  width: 30%;
  height: 90%;
  border-top: dashed 2px var(--color-surface50);
  border-bottom: dashed 2px var(--color-surface50);
  position: relative;
  display: flex;
  flex-direction:column;
  align-items: center;
  overflow: hidden;
}

.box {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0.5rem;
  flex-shrink: 0;
  height: 20%;
  min-height: 100px;
  width: 80%;
  flex-shrink: 0;
  cursor: pointer;
}

.box__inner {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  font-size: 21px;
  cursor: pointer;
  width: 100%;
  height: 100%;
}

.show-overflow {
  overflow: visible;
}

.box .box__inner {
  background: linear-gradient(var(--color-just-black), var(--color-just-black))
      padding-box,
    var(--gradient) border-box;
  border: 3px solid transparent;
  border-radius: 10px;
}

.box {
  --gradient: var(--gradient-macha);
}

.box:nth-child(3n + 2) {
  --gradient: var(--gradient-summer-fair);
}

.box:nth-child(3n + 1) {
  --gradient: var(--gradient-orange-crush);
}

.box p {
  -webkit-text-fill-color: transparent;
  background: var(--gradient);
  -webkit-background-clip: text;
  background-clip: text;
  font-size: 3rem;
}
```

```
console.clear();

const wrapper = document.querySelector(".wrapper");
const boxes = gsap.utils.toArray(".box");

let activeElement;
const loop = verticalLoop(boxes, {
  paused: true, 
  draggable: true, // make it draggable
  center: true, // active element is the one in the center of the container rather than th left edge
  onChange: (element, index) => { // when the active element changes, this function gets called.
    activeElement && activeElement.classList.remove("active");
    element.classList.add("active");
    activeElement = element;
  }
});

boxes.forEach((box, i) => box.addEventListener("click", () => loop.toIndex(i, {duration: 0.8, ease: "power1.inOut"})));

document.querySelector(".toggle").addEventListener("click", () => wrapper.classList.toggle("show-overflow"));
document.querySelector(".next").addEventListener("click", () => loop.next({duration: 0.4, ease: "power1.inOut"}));
document.querySelector(".prev").addEventListener("click", () => loop.previous({duration: 0.4, ease: "power1.inOut"}));




/*
This helper function makes a group of elements animate along the x-axis in a seamless, responsive loop.

Features:
 - Uses yPercent so that even if the heights change (like if the window gets resized), it should still work in most cases.
 - When each item animates to the left or right enough, it will loop back to the other side
 - Optionally pass in a config object with values like draggable: true, center: true, speed (default: 1, which travels at roughly 100 pixels per second), paused (boolean), repeat, reversed, and paddingBottom.
 - The returned timeline will have the following methods added to it:
   - next() - animates to the next element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
   - previous() - animates to the previous element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
   - toIndex() - pass in a zero-based index value of the element that it should animate to, and optionally pass in a vars object to control duration, easing, etc. Always goes in the shortest direction
   - current() - returns the current index (if an animation is in-progress, it reflects the final index)
   - times - an Array of the times on the timeline where each element hits the "starting" spot.
 */
function verticalLoop(items, config) {
  let timeline;
  items = gsap.utils.toArray(items);
  config = config || {};
  gsap.context(() => { // use a context so that if this is called from within another context or a gsap.matchMedia(), we can perform proper cleanup like the "resize" event handler on the window
    let onChange = config.onChange,
      lastIndex = 0,
      tl = gsap.timeline({repeat: config.repeat, onUpdate: onChange && function() {
          let i = tl.closestIndex();
          if (lastIndex !== i) {
            lastIndex = i;
            onChange(items[i], i);
          }
        }, paused: config.paused, defaults: {ease: "none"}, onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100)}),
      length = items.length,
      startY = items[0].offsetTop,
      times = [],
      heights = [],
      spaceBefore = [],
      yPercents = [],
      curIndex = 0,
      indexIsDirty = false,
      center = config.center,
      pixelsPerSecond = (config.speed || 1) * 100,
      snap = config.snap === false ? v => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if height is 20% the first element's height might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
      timeOffset = 0,
      container = center === true ? items[0].parentNode : gsap.utils.toArray(center)[0] || items[0].parentNode,
      totalHeight,
      getTotalHeight = () => items[length-1].offsetTop + yPercents[length-1] / 100 * heights[length-1] - startY + spaceBefore[0] + items[length-1].offsetHeight * gsap.getProperty(items[length-1], "scaleY") + (parseFloat(config.paddingBottom) || 0),
      populateHeights = () => {
        let b1 = container.getBoundingClientRect(), b2;
        items.forEach((el, i) => {
          heights[i] = parseFloat(gsap.getProperty(el, "height", "px"));
          yPercents[i] = snap(parseFloat(gsap.getProperty(el, "y", "px")) / heights[i] * 100 + gsap.getProperty(el, "yPercent"));
          b2 = el.getBoundingClientRect();
          spaceBefore[i] = b2.top - (i ? b1.bottom : b1.top);
          b1 = b2;
        });
        gsap.set(items, { // convert "y" to "yPercent" to make things responsive, and populate the heights/yPercents Arrays to make lookups faster.
          yPercent: i => yPercents[i]
        });
        totalHeight = getTotalHeight();
      },
      timeWrap,
      populateOffsets = () => {
        timeOffset = center ? tl.duration() * (container.offsetHeight / 2) / totalHeight : 0;
        center && times.forEach((t, i) => {
          times[i] = timeWrap(tl.labels["label" + i] + tl.duration() * heights[i] / 2 / totalHeight - timeOffset);
        });
      },
      getClosest = (values, value, wrap) => {
        let i = values.length,
          closest = 1e10,
          index = 0, d;
        while (i--) {
          d = Math.abs(values[i] - value);
          if (d > wrap / 2) {
            d = wrap - d;
          }
          if (d < closest) {
            closest = d;
            index = i;
          }
        }
        return index;
      },
      populateTimeline = () => {
        let i, item, curY, distanceToStart, distanceToLoop;
        tl.clear();
        for (i = 0; i < length; i++) {
          item = items[i];
          curY = yPercents[i] / 100 * heights[i];
          distanceToStart = item.offsetTop + curY - startY + spaceBefore[0];
          distanceToLoop = distanceToStart + heights[i] * gsap.getProperty(item, "scaleY");
          tl.to(item, {yPercent: snap((curY - distanceToLoop) / heights[i] * 100), duration: distanceToLoop / pixelsPerSecond}, 0)
            .fromTo(item, {yPercent: snap((curY - distanceToLoop + totalHeight) / heights[i] * 100)}, {yPercent: yPercents[i], duration: (curY - distanceToLoop + totalHeight - curY) / pixelsPerSecond, immediateRender: false}, distanceToLoop / pixelsPerSecond)
            .add("label" + i, distanceToStart / pixelsPerSecond);
          times[i] = distanceToStart / pixelsPerSecond;
        }
        timeWrap = gsap.utils.wrap(0, tl.duration());
      },
      refresh = (deep) => {
        let progress = tl.progress();
        tl.progress(0, true);
        populateHeights();
        deep && populateTimeline();
        populateOffsets();
        deep && tl.draggable && tl.paused() ? tl.time(times[curIndex], true) : tl.progress(progress, true);
      },
      onResize = () => refresh(!(tl.draggable && tl.draggable.isDragging)),
      proxy;
    gsap.set(items, {y: 0});
    populateHeights();
    populateTimeline();
    populateOffsets();
    window.addEventListener("resize", onResize);
    function toIndex(index, vars) {
      vars = vars || {};
      (Math.abs(index - curIndex) > length / 2) && (index += index > curIndex ? -length : length); // always go in the shortest direction
      let newIndex = gsap.utils.wrap(0, length, index),
        time = times[newIndex];
      if (time > tl.time() !== index > curIndex && index !== curIndex) { // if we're wrapping the timeline's playhead, make the proper adjustments
        time += tl.duration() * (index > curIndex ? 1 : -1);
      }
      if (time < 0 || time > tl.duration()) {
        vars.modifiers = {time: timeWrap};
      }
      curIndex = newIndex;
      vars.overwrite = true;
      gsap.killTweensOf(proxy);    
      return vars.duration === 0 ? tl.time(timeWrap(time)) : tl.tweenTo(time, vars);
    }
    tl.toIndex = (index, vars) => toIndex(index, vars);
    tl.closestIndex = setCurrent => {
      let index = getClosest(times, tl.time(), tl.duration());
      if (setCurrent) {
        curIndex = index;
        indexIsDirty = false;
      }
      return index;
    };
    tl.current = () => indexIsDirty ? tl.closestIndex(true) : curIndex;
    tl.next = vars => toIndex(tl.current()+1, vars);
    tl.previous = vars => toIndex(tl.current()-1, vars);
    tl.times = times;
    tl.progress(1, true).progress(0, true); // pre-render for performance
    if (config.reversed) {
      tl.vars.onReverseComplete();
      tl.reverse();
    }
    if (config.draggable && typeof(Draggable) === "function") {
      proxy = document.createElement("div")
      let wrap = gsap.utils.wrap(0, 1),
        ratio, startProgress, draggable, dragSnap, lastSnap, initChangeY, wasPlaying,
        align = () => tl.progress(wrap(startProgress + (draggable.startY - draggable.y) * ratio)),
        syncIndex = () => tl.closestIndex(true);
      typeof(InertiaPlugin) === "undefined" && console.warn("InertiaPlugin required for momentum-based scrolling and snapping. https://greensock.com/club");
      draggable = Draggable.create(proxy, {
        trigger: items[0].parentNode,
        type: "y",
        onPressInit() {
          let y = this.y;
          gsap.killTweensOf(tl);
          wasPlaying = !tl.paused();
          tl.pause();
          startProgress = tl.progress();
          refresh();
          ratio = 1 / totalHeight;
          initChangeY = (startProgress / -ratio) - y;
          gsap.set(proxy, {y: startProgress / -ratio});
          // fix bug that existed prior to version 3.14.0 that could cause the inertia to jump due to setting the new x position.
          if (+InertiaPlugin.version.split(".")[1] < 14) {
            let tracker = InertiaPlugin.getByTarget(proxy),
                pt = tracker && tracker._props.y;
            pt && (pt.v1 = pt.v2 = startProgress / -ratio); // effectively resets the velocity (only necessary in old versions, before 3.14.0)
          }
        },
        onDrag: align,
        onThrowUpdate: align,
        overshootTolerance: 0,
        inertia: true,
        snap(value) {
          let time = -(value * ratio) * tl.duration(),
            wrappedTime = timeWrap(time),
            snapTime = times[getClosest(times, wrappedTime, tl.duration())],
            dif = snapTime - wrappedTime;
          Math.abs(dif) > tl.duration() / 2 && (dif += dif < 0 ? tl.duration() : -tl.duration());
          lastSnap = (time + dif) / tl.duration() / -ratio;
          return lastSnap;
        },
        onRelease() {
          syncIndex();
          draggable.isThrowing && (indexIsDirty = true);
        },
        onThrowComplete: () => {
          syncIndex();
          wasPlaying && tl.play();
        }
      })[0];
      tl.draggable = draggable;
    }
    tl.closestIndex(true);
    lastIndex = curIndex;
    onChange && onChange(items[curIndex], curIndex);
    timeline = tl;
    return () => window.removeEventListener("resize", onResize); // cleanup
  });
  return timeline;
}
```

Plugins[Draggable](/docs/v3/Plugins/Draggable/.md)[InertiaPlugin](/docs/v3/Plugins/InertiaPlugin/.md)
