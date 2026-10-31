---
source: https://rive.app/docs/runtimes/web/caching-a-rive-file
title: "Caching a Rive File"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Caching a Rive File

Under most circumstances a `.riv` file should load quickly and managing the `RiveFile` yourself is not necessary. But if you intend to use the same `.riv` file in multiple parts of your application, or even on the same screen, it might be advantageous to load the file once and keep it in memory.

## Example usage

The following is a basic example to illustrate how to preload a Rive file, and pass the data to multiple Rive instances.

```javascript theme={null}
const rive = require("@rive-app/canvas");

let riveInstances = [];

function loadRiveFile(src, onSuccess, onError) {
const file = new rive.RiveFile({
    src: src,
    onLoad: () => onSuccess(file),
    onLoadError: onError,
});
// Remember to call init() to trigger the load;
file.init().catch(onError);
}

function setupRiveInstance(loadedRiveFile, canvasId) {
const canvas = document.getElementById(canvasId);
if (!canvas) return;

const riveInstance = new rive.Rive({
    riveFile: loadedRiveFile,
    // Be sure to specify the correct state machine (or animation) name
    stateMachine: "Motion", // Name of the State Machine to play
    canvas: canvas,
    layout: new rive.Layout({
    fit: rive.Fit.FitWidth,
    alignment: rive.Alignment.Center,
    }),
    autoplay: true,
    onLoad: () => {
    // Prevent a blurry canvas by using the device pixel ratio
    riveInstance.resizeDrawingSurfaceToCanvas();
    },
});

riveInstances.push(riveInstance);
}

// Loads the .riv file and initializes multiple Rive instances using the same loaded RiveFile in memory
loadRiveFile(
"clean_the_car.riv",
(file) => {
    setupRiveInstance(file, "rive-canvas-1");
    setupRiveInstance(file, "rive-canvas-2");
    // You could also store a reference to the loaded RiveFile here so you're able to initialize other Rive instances later.
},
(error) => {
    console.error("Failed to load Rive file:", error);
}
);

// Resize the drawing surface for all instances if the window resizes
window.addEventListener(
"resize",
() => {
    riveInstances.forEach((instance) => {
    if (instance) {
        instance.resizeDrawingSurfaceToCanvas();
    }
    });
},
false
);
```

> [!NOTE]
>
> A `RiveFile` created with `enableGPUCanvas: true` can't be shared across Rive instances the way this example shares one — GPU Canvas binds a file to a single `<canvas>`, so the first Rive instance claims it. Construct one `RiveFile` per instance. While sharing the `RiveFile` in this scenario won't fail, the runtime prints a warning and re-imports the file for each additional instance, which means the `RiveFile` you passed in goes unused. See [GPU Canvas](/docs/runtimes/web/gpu-canvas) for more details.
