---
source: https://gsap.com/docs/v3/HelperFunctions/helpers/anchorsToProgress
title: "Calculate progress values for anchor points along a path"
fetched: 2026-10-28
---

# Calculate progress values for anchor points along a path

Calculate all the progress values for the anchor points on a path so that, for example, you could use DrawSVG to animate point-by-point (requires [MotionPathPlugin](/docs/v3/Plugins/MotionPathPlugin.md)):

```
// returns an array with the progress value (between 0 and 1) for each anchor along the path
function anchorsToProgress(rawPath, resolution) {
  resolution = ~~resolution || 12;
  if (!Array.isArray(rawPath)) {
    rawPath = MotionPathPlugin.getRawPath(rawPath);
  }
  MotionPathPlugin.cacheRawPathMeasurements(rawPath, resolution);
  let progress = [0],
    length,
    s,
    i,
    e,
    segment,
    samples;
  for (s = 0; s < rawPath.length; s++) {
    segment = rawPath[s];
    samples = segment.samples;
    e = segment.length - 6;
    for (i = 0; i < e; i += 6) {
      length = samples[(i / 6 + 1) * resolution - 1];
      progress.push(length / rawPath.totalLength);
    }
  }
  return progress;
}
```

## Demo[​](#demo "Direct link to Demo")

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/mdyxvGX)

```
<h3>anchorsToProgress() GSAP Demo</h3>

<svg id="svg" viewBox="0 0 900 200">
  <defs>
    <linearGradient id="path-gradient" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="900" y2="0">
      <stop offset="0.19" stop-color="#ff8709"/>
      <stop offset="0.73" stop-color="#f7bdf8"/>
    </linearGradient>
  </defs>
</svg>

<div class="nav">
  <button class="previous">previous</button>
  <button class="next">next</button>
</div>
```

```
@font-face {
  font-display: block;
  font-family: Mori;
  font-style: normal;
  font-weight: 400;
  src: url(/fonts/Mori/PPMori-Regular.woff) format("woff");
}

body {
  margin: 0;
  background: #0e100f;
  color: #bbbaa6;
  font-family: Mori, sans-serif;
}

h3 {
  margin: 20px;
  text-align: center;
  color: #fffce1;
  font-weight: 400;
}

svg {
  overflow: visible;
  height: 100%;
  max-width: 100%;
}

circle {
  fill: #fffce1;
}

path {
  stroke-width: 3px;
  stroke: url(#path-gradient);
  fill: none;
}

.nav {
  display: flex;
  justify-content: center;
  align-content: center;
  gap: 1rem;
  padding: 0 0 20px 0;
}

button {
  padding: 10px 20px;
  background: transparent;
  border: 1px solid rgba(255, 252, 225, 0.2);
  border-radius: 99px;
  color: #bbbaa6;
  font-family: inherit;
  font-size: 0.85rem;
  line-height: 1;
  cursor: pointer;
  transition: color 0.2s, border-color 0.2s;
}

button:hover {
  color: #fffce1;
  border-color: rgba(255, 252, 225, 0.6);
}

path {
  stroke-width: 3px;
  stroke: #232323;
  fill: none;
}
```

```
gsap.registerPlugin(MotionPathPlugin, DrawSVGPlugin);

let anchors = [{x:50, y:130}, {x:300, y:10}, {x:500, y:70}, {x:700, y:190}, {x:850, y:100}], // anchor coordinates (feel free to change these if you want)
    rawPath = MotionPathPlugin.arrayToRawPath(anchors, {curviness:0.5}),
    path = buildPath(anchors, rawPath), // builds all the anchors and paths, returns the red SVG path
    progressArray = anchorsToProgress(rawPath), // calculate the progress value associated with each anchor, returned as an array.
    curIndex = 0,
    drawPath = gsap.from(path, { // this is the tween of the red path. We pause it initially and animate its progress.
      ease: "none",
      drawSVG: false,
      paused: true,
      duration: 5
    });

// This function calculates the progress value along the rawPath for each anchor and returns an array accordingly.
// So if the rawPath has 5 anchors, the array that's returned will have 5 progress values, each between 0 and 1.
function anchorsToProgress(rawPath, resolution) {
	resolution = ~~resolution || 12;
	if (!Array.isArray(rawPath)) {
		rawPath = MotionPathPlugin.getRawPath(rawPath);
	}
	MotionPathPlugin.cacheRawPathMeasurements(rawPath, resolution);
	let progress = [0],
		length, s, i, e, segment, samples;
	for (s = 0; s < rawPath.length; s++) {
		segment = rawPath[s];
		samples = segment.samples;
		e = segment.length - 6;
		for (i = 0; i < e; i+=6) {
			length = samples[(i / 6 + 1) * resolution - 1];
			progress.push(length / rawPath.totalLength);
		}
	}
	return progress;
}

// jump to a specific anchor (animate the tween to that progress value)
function goToAnchor(index) {
	curIndex = index;
	gsap.to(drawPath, {
		progress: progressArray[curIndex],
		overwrite: true,
		duration: 2
	});
}

// click as many times and as quickly as you want.
document.querySelector(".next").addEventListener("click", function() {
	if (curIndex < anchors.length - 1) {
		goToAnchor(curIndex + 1);
	}
});
document.querySelector(".previous").addEventListener("click", function() {
	if (curIndex > 0) {
		goToAnchor(curIndex - 1);
	}
});


// -- setup ---
function buildPath(anchors, rawPath) {
  let svg = document.querySelector("#svg"),
      pathTemplate = createSVG("path", svg, {d: MotionPathPlugin.rawPathToString(rawPath)}),
      path = createSVG("path", svg, {d: MotionPathPlugin.rawPathToString(rawPath)}),
      i;
  gsap.set(path, {stroke: "url(#path-gradient)", strokeWidth: 5});
  for (i = 0; i < anchors.length; i++) {
    createSVG("circle", svg, {cx: anchors[i].x, cy: anchors[i].y, r: 5});
  }
  return path;
}

function createSVG (type, container, attributes) {
    var element = document.createElementNS("http://www.w3.org/2000/svg", type),
        reg = /([a-z])([A-Z])/g,
        p;
    for (p in attributes) {
        element.setAttributeNS(null, p.replace(reg, "$1-$2").toLowerCase(), attributes[p]);
    }
    if (typeof(container) === "string") {
        container = document.querySelector(container);
    }
    container.appendChild(element);
    return element;
}

goToAnchor(1);
```

Plugins[MotionPathPlugin](/docs/v3/Plugins/MotionPathPlugin.md)[DrawSVGPlugin](/docs/v3/Plugins/DrawSVGPlugin.md)
