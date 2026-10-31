---
source: https://docs.lottiefiles.com/en/runtimes/distributions/js/v0.x/core-concepts/loading-animations.md
title: ""
fetched: 2026-10-28
---

# Load animations
Load .lottie and Lottie JSON animations from URLs or raw data, switch animations after initialization, and handle loading errors.

The web player loads animations in both `.lottie` and `.json` formats, from a URL or from data you already have in memory. Use `src` for URLs, `data` for in-memory content, and `load()` to replace the animation later.

## Load from a URL

Pass the file's URL as `src`:

```javascript
const dotLottie = new DotLottie({
  canvas: document.querySelector("#canvas"),
  src: "https://lottie.host/animation.lottie", // or .json file
  autoplay: true,
});
```

## Load from data

If you already have the animation in memory — a Lottie JSON string, a pre-parsed JSON object, or an ArrayBuffer of a `.lottie` file — pass it as `data` instead of `src`:

```javascript
const dotLottie = new DotLottie({
  canvas: document.querySelector("#canvas"),
  data: '{"v":"4.8.0","meta":{"g":"LottieFiles AE..."}',
  autoplay: true,
});
```

## Load a new animation after initialization

[CodePen↗](https://codepen.io/lottiefiles/embed/JjzJZgB?default-tab=result)

Call `load()` on an existing instance to replace the current animation and its configuration:

```javascript
const dotLottie = new DotLottie({
  canvas: document.querySelector("#canvas"),
});

// Load a new animation
dotLottie.load({
  src: "https://lottie.host/new-animation.lottie",
  loop: true,
  autoplay: true,
});
```

The `load()` config also accepts playback options such as `speed`, `mode`, `segment`, `marker`, and `themeId`. See the [configuration reference](/en/runtimes/distributions/js/v0.x/api/reference#configuration) for the full list.

## Load from a multi-animation file

If a `.lottie` file contains several animations, wait for the `load` event, read the manifest, then load an animation by ID:

```javascript
const dotLottie = new DotLottie({
  canvas: document.querySelector("#canvas"),
  src: "multi-animation.lottie",
});

// Once loaded, you can access the manifest
dotLottie.addEventListener("load", () => {
  // Get list of available animations
  const animations = dotLottie.manifest.animations;

  // Load a specific animation by ID
  dotLottie.loadAnimation(animations[0].id);
});
```

For switcher patterns and sequential playback, see [Work with multi-animation files](/en/runtimes/distributions/js/v0.x/core-concepts/multi-animation).

## Handle loading errors

Listen for `loadError` to catch failed loads:

```javascript
dotLottie.addEventListener("loadError", (error) => {
  console.error("Failed to load animation:", error);
});
```

## Check loading state

Use the `isLoaded` property or the `load` event to know when the animation is ready:

```javascript
// Check if animation is loaded
console.log(dotLottie.isLoaded);

// Listen for load completion
dotLottie.addEventListener("load", () => {
  console.log("Animation loaded successfully");
});
```

## Related

- [Control playback](/en/runtimes/distributions/js/v0.x/core-concepts/playback-control) once the animation is loaded
- [How the web player works](/en/runtimes/distributions/js/v0.x/core-concepts) — the .lottie format and the manifest
- [API Reference](/en/runtimes/distributions/js/v0.x/api/reference) for all configuration options
