---
source: https://docs.lottiefiles.com/en/runtimes/distributions/web-component/v0.x/examples.md
title: ""
fetched: 2026-10-28
---

# Examples
Control the dotlottie-wc element with JavaScript — access the core DotLottie instance, wire up playback controls, and handle player events.

Use these recipes to go beyond declarative attributes and drive the `<dotlottie-wc>` element from JavaScript. Each example is self-contained; replace the `src` value with your own animation URL.

## Access the core DotLottie instance

To control the player programmatically — play, pause, seek, or listen to events — access the underlying `DotLottie` instance through the element's `.dotLottie` property. The instance is available **after** the animation has loaded, so wait for the element's `load` event before using it:

```html
<dotlottie-wc id="player" src="https://lottie.host/your-animation-id.lottie" autoplay loop></dotlottie-wc>

<script>
  const player = document.getElementById("player");

  player.addEventListener("load", () => {
    const dotLottie = player.dotLottie;
    if (dotLottie) {
      console.log("Total frames:", dotLottie.totalFrames);
    }
  });
</script>
```

Once you have the instance, the full core player API is available — see the [JS API reference](/en/runtimes/distributions/js/v0.x/api/reference) for every property, method, and event.

## Add playback controls

To wire play, pause, and stop buttons to the player, store the core instance when the element loads, then call its [playback methods](/en/runtimes/distributions/js/v0.x/api/reference#playback-control) from the button handlers. Keep the buttons disabled until the instance is ready:

```html
<dotlottie-wc
  id="player-control-example"
  src="https://lottie.host/your-animation-id.lottie"
  style="width: 300px; height: 300px; display: block; margin: 0 auto;"
></dotlottie-wc>
<div style="text-align: center; margin-top: 10px;">
  <button id="playButton" disabled>Play</button>
  <button id="pauseButton" disabled>Pause</button>
  <button id="stopButton" disabled>Stop</button>
</div>

<script>
  const playerElement = document.getElementById("player-control-example");
  const playButton = document.getElementById("playButton");
  const pauseButton = document.getElementById("pauseButton");
  const stopButton = document.getElementById("stopButton");
  let dotLottie = null; // Holds the core instance

  // Wait for the component to load the animation
  playerElement.addEventListener("load", () => {
    dotLottie = playerElement.dotLottie;

    if (!dotLottie) {
      console.error("Failed to get dotLottie instance after load!");
      return;
    }

    // Enable buttons now that the instance is ready
    playButton.disabled = false;
    pauseButton.disabled = false;
    stopButton.disabled = false;
  });

  playerElement.addEventListener("error", (e) => {
    console.error("Player encountered an error:", e);
    playButton.disabled = true;
    pauseButton.disabled = true;
    stopButton.disabled = true;
  });

  // Button click handlers
  playButton.addEventListener("click", () => dotLottie && dotLottie.play());
  pauseButton.addEventListener("click", () => dotLottie && dotLottie.pause());
  stopButton.addEventListener("click", () => dotLottie && dotLottie.stop());
</script>
```

If you need finer control — seeking with `setFrame()`, changing `setSpeed()`, or playing a segment — the same pattern applies: call the method on the stored instance.

## Handle player events

To react to playback state — for analytics, syncing UI, or chaining animations — add listeners on the core instance for events such as `load`, `play`, `pause`, `complete`, `loop`, `stop`, and `loadError`:

```html
<dotlottie-wc
  id="player-event-example"
  src="https://lottie.host/your-animation-id.lottie"
  autoplay
  loop
  style="width: 200px; height: 200px; display: block; margin: 10px auto;"
></dotlottie-wc>
<div id="eventLog" style="border: 1px solid #eee; padding: 10px; height: 100px; overflow-y: scroll;">Event log:</div>

<script>
  const playerEventElement = document.getElementById("player-event-example");
  const eventLog = document.getElementById("eventLog");

  function logEvent(message) {
    const entry = document.createElement("p");
    entry.textContent = `${new Date().toLocaleTimeString()}: ${message}`;
    eventLog.appendChild(entry);
    eventLog.scrollTop = eventLog.scrollHeight; // Scroll to bottom
  }

  // Wait for the element's load event so the instance is ready
  playerEventElement.addEventListener("load", () => {
    const dotLottie = playerEventElement.dotLottie;

    if (!dotLottie) {
      logEvent("dotLottie instance not found after load.");
      return;
    }

    dotLottie.addEventListener("load", () => logEvent("Animation loaded"));
    dotLottie.addEventListener("play", () => logEvent("Playback started"));
    dotLottie.addEventListener("pause", () => logEvent("Playback paused"));
    dotLottie.addEventListener("complete", () => logEvent("Playback completed"));
    dotLottie.addEventListener("loop", () => logEvent("Animation looped"));
    dotLottie.addEventListener("stop", () => logEvent("Playback stopped"));
    dotLottie.addEventListener("loadError", (event) => logEvent(`Error loading animation: ${event}`));

    logEvent(`Listeners attached. Initial state: isPlaying=${dotLottie.isPlaying}`);
  });
</script>
```

If your page adds and removes players dynamically, remove your listeners with `removeEventListener` before detaching the element. For the full event list and payloads, see [Events](/en/runtimes/distributions/js/v0.x/api/reference#events) in the core player reference.

## Related

- [Getting started](/en/runtimes/distributions/web-component/v0.x) — render your first animation with `<dotlottie-wc>`.
- [Attributes and properties](/en/runtimes/distributions/web-component/v0.x/attributes-reference) — all declarative configuration options.
- [JS API reference](/en/runtimes/distributions/js/v0.x/api/reference) — the complete core player API behind `.dotLottie`.
