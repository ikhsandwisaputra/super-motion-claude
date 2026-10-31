---
source: https://docs.lottiefiles.com/en/runtimes/distributions/js/v0.x/getting-started/basic-usage.md
title: ""
fetched: 2026-10-28
---

# Render your first animation
Follow this tutorial to render and play your first Lottie animation in a plain HTML file with the dotLottie web player, using nothing but a browser.

In this tutorial, we will render a playing, looping Lottie animation in a plain HTML file using the dotLottie web player. All we need is a text editor and a web browser — no installation and no build tools.

## Step 1: Create an HTML file with a canvas

The player draws animations onto an HTML `<canvas>` element, so we start by creating a page that contains one.

Create a file named `example.html` and add the following:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>dotLottie Web Basic Example</title>
    <style>
      /* Optional: Add some basic styling */
      body {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin: 0;
      }
      canvas {
        border: 1px solid lightgray;
      }
    </style>
  </head>
  <body>
    <!-- 1. The Canvas Element -->
    <canvas id="dotlottie-canvas" style="width: 300px; height: 300px;"></canvas>
  </body>
</html>
```

Save the file and open it in your browser. You should see an empty 300 × 300 pixel box with a light gray border in the center of the page. That box is the canvas our animation will render into.

## Step 2: Import the player and create an instance

Now we add a script that imports the `DotLottie` class from the CDN and points it at our canvas and an animation file.

Add this script just before the closing `</body>` tag, below the canvas:

```html
<!-- 2. The Script -->
<script type="module">
  // Import the player from the CDN
  import { DotLottie } from "https://cdn.jsdelivr.net/npm/@lottiefiles/dotlottie-web/+esm";

  // Get a reference to the canvas
  const canvasElement = document.getElementById("dotlottie-canvas");

  // Create a new DotLottie instance
  new DotLottie({
    autoplay: true, // Play automatically
    loop: true, // Loop indefinitely
    canvas: canvasElement, // The canvas element to render on
    src: "https://lottie.host/4db68bbd-31f6-4cd8-84eb-189de081159a/IGmMCqhzpt.lottie", // Path/URL to your Lottie file
  });
</script>
```

Notice the four options we pass to `new DotLottie()`: the `canvas` to draw on, the `src` URL of the animation, and `autoplay` and `loop` to make it play continuously.

## Step 3: Watch it play

Save the file and reload the page in your browser.

You should now see the Lottie animation playing and looping inside the canvas. That's the whole setup — one canvas element and one `DotLottie` instance.

Try changing `loop` to `false` and reloading: the animation now plays once and stops on its final frame. Set it back to `true` when you're done.

## What you've accomplished

You have rendered a Lottie animation in the browser with the dotLottie web player: you created a canvas, constructed a player instance, and configured it to autoplay and loop. Every other feature of the player — playback methods, events, theming, state machines — builds on this same instance.

## Next steps

- [Install the player with a package manager](/en/runtimes/distributions/js/v0.x/getting-started/installation) to use it in a bundled project
- [Control playback](/en/runtimes/distributions/js/v0.x/core-concepts/playback-control) with `play()`, `pause()`, and events
- [Load animations](/en/runtimes/distributions/js/v0.x/core-concepts/loading-animations) from data or multi-animation files
- Browse [common recipes](/en/runtimes/distributions/js/v0.x/getting-started/examples) and the [API Reference](/en/runtimes/distributions/js/v0.x/api/reference)
