---
source: https://docs.lottiefiles.com/en/runtimes/distributions/js/v0.x/core-concepts/playback-control.md
title: ""
fetched: 2026-10-28
---

# Control playback
Play, pause, and stop dotLottie animations, adjust speed and looping, navigate frames and segments, and react to playback events.

Every playback capability of the web player is a method or property on the `DotLottie` instance. This guide covers the common tasks; the [API Reference](/en/runtimes/distributions/js/v0.x/api/reference#playback-control) lists every method.

## Play, pause, and stop

[CodePen↗](https://codepen.io/lottiefiles/embed/dyrRKwg?default-tab=result)

```javascript
// Start or resume playback
dotLottie.play();

// Pause at current position
dotLottie.pause();

// Stop and return to first frame
dotLottie.stop();
```

To check the current state, read `isPlaying`, `isPaused`, or `isStopped`:

```javascript
console.log(dotLottie.isPlaying);
console.log(dotLottie.isPaused);
console.log(dotLottie.isStopped);
```

## Adjust playback speed

```javascript
// Set playback speed (1 is normal speed)
dotLottie.setSpeed(2); // Play at 2x speed

// Get current speed
console.log(dotLottie.speed);
```

## Configure looping

```javascript
// Enable/disable looping
dotLottie.setLoop(true);

// Check loop status
console.log(dotLottie.loop);

// Get loop count
console.log(dotLottie.loopCount);
```

## Set the playback mode

Choose forward, reverse, or bouncing playback:

```javascript
dotLottie.setMode("forward"); // Normal playback
dotLottie.setMode("reverse"); // Reverse playback
dotLottie.setMode("bounce"); // Play forward then reverse
dotLottie.setMode("bounce-reverse"); // Play reverse then forward

// Get current mode
console.log(dotLottie.mode);
```

## Freeze and unfreeze rendering

If you need to pause rendering updates without changing the playback state — for example, while the animation is offscreen — freeze the animation loop:

```javascript
// Freeze the animation loop (pauses rendering updates)
dotLottie.freeze();

// Unfreeze the animation loop (resumes rendering updates)
dotLottie.unfreeze();

// Check if animation loop is frozen
console.log(dotLottie.isFrozen);
```

## Navigate to a specific frame

```javascript
// Go to specific frame
dotLottie.setFrame(42);

// Get current frame
console.log(dotLottie.currentFrame);

// Get total frames
console.log(dotLottie.totalFrames);
```

## Play a segment

To play only a range of frames, set a segment:

```javascript
// Play frames 10 through 50
dotLottie.setSegment(10, 50);

// Get current segment
console.log(dotLottie.segment); // Returns [startFrame, endFrame]
```

## Play a marker

If the animation defines named markers, play the segment a marker covers:

```javascript
// Play a specific marker segment
dotLottie.setMarker("intro");

// Get current marker
console.log(dotLottie.marker);
```

## React to playback events

Register listeners for the events you care about:

```javascript
// Playback events
dotLottie.addEventListener("play", () => {
  console.log("Animation started playing");
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

// Frame updates
dotLottie.addEventListener("frame", (frameNo) => {
  console.log("Current frame:", frameNo);
});

// Loop completion
dotLottie.addEventListener("loop", (loopCount) => {
  console.log("Loop completed:", loopCount);
});

// Listen for freeze/unfreeze events
dotLottie.addEventListener("freeze", () => {
  console.log("Animation frozen");
});
dotLottie.addEventListener("unfreeze", () => {
  console.log("Animation unfrozen");
});
```

## Read playback information

```javascript
// Get animation duration in milliseconds
console.log(dotLottie.duration);

// Get current direction (1 for forward, -1 for reverse)
console.log(dotLottie.direction);
```

## Related

- [Load animations](/en/runtimes/distributions/js/v0.x/core-concepts/loading-animations) before controlling them
- [Use state machines](/en/runtimes/distributions/js/v0.x/state-machines) to drive playback from user input
- [API Reference](/en/runtimes/distributions/js/v0.x/api/reference#methods) for all methods, properties, and events
