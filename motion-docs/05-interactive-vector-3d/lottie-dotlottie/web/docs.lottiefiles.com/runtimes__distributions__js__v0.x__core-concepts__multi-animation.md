---
source: https://docs.lottiefiles.com/en/runtimes/distributions/js/v0.x/core-concepts/multi-animation.md
title: ""
fetched: 2026-10-28
---

# Work with multi-animation files
Load .lottie files that contain several animations, read the manifest, switch animations by ID, and play animations in sequence.

A single `.lottie` file can package several animations. To switch between them at runtime, load the file, read its manifest, and call `loadAnimation()` with the ID you want.

## Load a multi-animation file

[CodePen↗](https://codepen.io/lottiefiles/embed/wvOxdRa?default-tab=result)

```javascript
const dotLottie = new DotLottie({
  canvas: document.querySelector("#canvas"),
  src: "multi-animations.lottie",
  autoplay: true,
});
```

To start on a specific animation instead of the first one, pass its ID as `animationId` in the constructor. See the [configuration reference](/en/runtimes/distributions/js/v0.x/api/reference#configuration).

## List the available animations

The manifest describes every animation in the file. Wait for the `load` event before reading it:

```javascript
dotLottie.addEventListener("load", () => {
  // Get list of all animations
  const animations = dotLottie.manifest.animations;

  // Log animation details
  animations.forEach((animation) => {
    console.log("Animation ID:", animation.id);
  });
});
```

## Switch to another animation

Load a specific animation by its ID:

```javascript
// Load animation by ID
dotLottie.loadAnimation("animation-id");
```

Check that the ID exists in the manifest before loading it, and keep track of the currently active animation (`dotLottie.activeAnimationId`) if your UI needs it.

## Build an animation switcher

Generate one control per animation from the manifest:

```javascript
const dotLottie = new DotLottie({
  canvas: document.querySelector("#canvas"),
  src: "animations.lottie",
  autoplay: true,
});

dotLottie.addEventListener("load", () => {
  const animations = dotLottie.manifest.animations;

  // Create buttons for each animation
  animations.forEach((animation) => {
    const button = document.createElement("button");
    button.textContent = animation.id;
    button.onclick = () => dotLottie.loadAnimation(animation.id);
    document.body.appendChild(button);
  });
});
```

Avoid rapid switching — each switch loads a new animation into the renderer.

## Play animations in sequence

Advance to the next animation whenever the current one completes:

```javascript
const dotLottie = new DotLottie({
  canvas: document.querySelector("#canvas"),
  src: "animations.lottie",
  autoplay: true,
});

let currentIndex = 0;
const playNextAnimation = () => {
  const animations = dotLottie.manifest.animations;
  if (currentIndex >= animations.length) {
    currentIndex = 0;
  }
  dotLottie.loadAnimation(animations[currentIndex].id);
  currentIndex++;
};

dotLottie.addEventListener("complete", playNextAnimation);
```

## Handle loading events

Each switch triggers a fresh load, so handle both success and failure:

```javascript
// Listen for animation loading
dotLottie.addEventListener("load", () => {
  console.log("Animation loaded");
});

// Handle loading errors
dotLottie.addEventListener("loadError", (error) => {
  console.error("Failed to load animation:", error);
});
```

Remove event listeners you no longer need with `removeEventListener()`.

## Related

- [How the web player works](/en/runtimes/distributions/js/v0.x/core-concepts) — the .lottie format and the manifest
- [Load animations](/en/runtimes/distributions/js/v0.x/core-concepts/loading-animations) for the other loading methods
- [API Reference](/en/runtimes/distributions/js/v0.x/api/reference#manifest-object) for the manifest object structure
