---
source: https://docs.lottiefiles.com/en/runtimes/distributions/js/v0.x/getting-started/examples.md
title: ""
fetched: 2026-10-28
---

# Web player examples
Copy-paste recipes for the dotLottie web player - playback buttons, animation switching, theming, state machines, layout, and event handling.

Each recipe below is a self-contained snippet for a common task. Adapt the `src` URLs and element selectors to your project. For every available option and method, see the [API Reference](/en/runtimes/distributions/js/v0.x/api/reference).

## Add play, pause, and stop buttons

Wire the player's playback methods to buttons on the page:

```html
<canvas id="animation"></canvas>
<div>
  <button onclick="play()">Play</button>
  <button onclick="pause()">Pause</button>
  <button onclick="stop()">Stop</button>
</div>

<script type="module">
  import { DotLottie } from "@lottiefiles/dotlottie-web";

  const dotLottie = new DotLottie({
    canvas: document.querySelector("#animation"),
    src: "https://lottie.host/animation.lottie",
    autoplay: false,
  });

  window.play = () => dotLottie.play();
  window.pause = () => dotLottie.pause();
  window.stop = () => dotLottie.stop();
</script>
```

## Switch between animations in a .lottie file

Read the manifest after the `load` event, then load any animation by its ID:

```javascript
const dotLottie = new DotLottie({
  canvas: document.querySelector("#animation"),
  src: "animations.lottie",
  autoplay: true,
});

// Once loaded, you can switch between animations
dotLottie.addEventListener("load", () => {
  // Get available animations
  const animations = dotLottie.manifest.animations;

  // Load a specific animation
  dotLottie.loadAnimation(animations[0].id);
});
```

## Switch themes at runtime

Apply a theme packaged in the `.lottie` file by ID, and reset to the default when needed:

```javascript
const dotLottie = new DotLottie({
  canvas: document.querySelector("#animation"),
  src: "themed-animation.lottie",
  autoplay: true,
});

// Switch themes
function setTheme(isDark) {
  if (isDark) {
    dotLottie.setTheme("dark-theme");
  } else {
    dotLottie.setTheme("light-theme");
  }
}

// Reset to default theme
function resetTheme() {
  dotLottie.resetTheme();
}
```

## Drive an interactive animation with a state machine

Load a state machine from the `.lottie` file, start it, and post events to trigger transitions:

```javascript
const dotLottie = new DotLottie({
  canvas: document.querySelector("#animation"),
  src: "interactive.lottie",
  autoplay: true,
});

// Initialize state machine
dotLottie.stateMachineLoad("button-states");
dotLottie.stateMachineStart();

// Trigger state changes with named event inputs
function handleHover() {
  dotLottie.stateMachineFireEvent("hover");
}

function handleClick() {
  dotLottie.stateMachineFireEvent("click");
}
```

## Control how the animation fits the canvas

Set the layout at construction time or change it dynamically:

```javascript
const dotLottie = new DotLottie({
  canvas: document.querySelector("#animation"),
  src: "animation.lottie",
  autoplay: true,
  layout: {
    fit: "contain",
    align: [0.5, 0.5],
  },
});

// Change layout dynamically
function updateLayout(fit) {
  dotLottie.setLayout({
    fit: fit,
    align: [0.5, 0.5],
  });
}
```

## Configure rendering for performance

Match the device pixel ratio, freeze offscreen animations, and resize automatically:

```javascript
const dotLottie = new DotLottie({
  canvas: document.querySelector("#animation"),
  src: "animation.lottie",
  autoplay: true,
  renderConfig: {
    devicePixelRatio: window.devicePixelRatio,
    freezeOnOffscreen: true,
    autoResize: true,
  },
});
```

## Respond to player events

Listen for loading, playback, and frame events on the instance:

```javascript
const dotLottie = new DotLottie({
  canvas: document.querySelector("#animation"),
  src: "animation.lottie",
});

// Loading events
dotLottie.addEventListener("load", () => {
  console.log("Animation loaded");
});

dotLottie.addEventListener("loadError", (error) => {
  console.error("Loading failed:", error);
});

// Playback events
dotLottie.addEventListener("play", () => {
  console.log("Animation playing");
});

dotLottie.addEventListener("pause", () => {
  console.log("Animation paused");
});

dotLottie.addEventListener("stop", () => {
  console.log("Animation stopped");
});

dotLottie.addEventListener("complete", () => {
  console.log("Animation completed");
});

// Frame events
dotLottie.addEventListener("frame", (frameNo) => {
  console.log("Current frame:", frameNo);
});

dotLottie.addEventListener("loop", (count) => {
  console.log("Loop count:", count);
});
```

## Make an animation responsive

Let the canvas follow its container width and enable automatic resizing:

```html
<div style="width: 100%; max-width: 600px;">
  <canvas id="responsive-animation" style="width: 100%; height: auto;"></canvas>
</div>

<script type="module">
  import { DotLottie } from "@lottiefiles/dotlottie-web";

  const dotLottie = new DotLottie({
    canvas: document.querySelector("#responsive-animation"),
    src: "animation.lottie",
    autoplay: true,
    renderConfig: {
      autoResize: true,
    },
  });

  // Handle manual resize if needed
  window.addEventListener("resize", () => {
    dotLottie.resize();
  });
</script>
```

## Related

- [State machine recipes](/en/runtimes/distributions/js/v0.x/state-machines/examples) for interactive animations
- [Optimize performance](/en/runtimes/distributions/js/v0.x/advanced/performance) for pages with many or complex animations
- [API Reference](/en/runtimes/distributions/js/v0.x/api/reference#methods) for the complete method list
