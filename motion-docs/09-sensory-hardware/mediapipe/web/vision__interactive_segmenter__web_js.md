---
source: https://ai.google.dev/edge/mediapipe/solutions/vision/interactive_segmenter/web_js
title: "Interactive image segmentation guide for web  |  Google AI Edge  |  Google for Developers"
fetched: 2026-10-28
---

* [Home](https://developers.google.com/)
* [Products](https://developers.google.com/products)
* [Google AI Edge](https://developers.google.com/edge)
* [MediaPipe](https://developers.google.com/edge/mediapipe/solutions/guide)

# Interactive image segmentation guide for web Stay organized with collections Save and categorize content based on your preferences.

The MediaPipe Interactive Image Segmenter task takes strokes indicating a location in an image,
estimates the boundaries of an object at that location, and returns the
segmentation for the object as image data. These instructions show you how to
use the Interactive Image Segmenter for Node and web apps. For more information about the
capabilities, models, and configuration options of this task, see the
[Overview](https://developers.google.com/edge/mediapipe/solutions/vision/interactive_segmenter/index).

## Code example

The example code for Interactive Image Segmenter provides a complete implementation of this
task in JavaScript for your reference. This code helps you test this task and
get started on building your own interactive image segmentation app. You can
view, run, and edit the Interactive Image Segmenter
[example](https://stackblitz.com/github/google-ai-edge/mediapipe-samples-web/?file=src%2Ftasks%2Finteractive-segmenter.ts)
using just your web browser.

## Setup

This section describes key steps for setting up your development environment and
code projects specifically to use Interactive Image Segmenter. For general information on
setting up your development environment for using MediaPipe tasks, including
platform version requirements, see the
[Setup guide for web](https://developers.google.com/mediapipe/solutions/setup_web).

### JavaScript packages

Interactive Image Segmenter code is available through the MediaPipe `@mediapipe/tasks-vision`
[NPM](https://www.npmjs.com/package/@mediapipe/tasks-vision) package. You can
find and download these libraries from links provided in the platform
[Setup guide](https://developers.google.com/mediapipe/solutions/setup_web#downloads).

You can install the required packages with the following code for local staging
using the following command:

```
npm install --save @mediapipe/tasks-vision
```

If you want to import the task code using a content delivery network (CDN)
service, add the following code in the `<head>` tag in your HTML file:

```
<head>
  <script src="https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/vision_bundle.mjs"
    crossorigin="anonymous"></script>
</head>
```

### Model

The MediaPipe Interactive Image Segmenter task requires a trained model that is compatible with this
task. For more information on available trained models for Interactive Image Segmenter, see
the task overview [Models section](https://developers.google.com/edge/mediapipe/solutions/vision/interactive_segmenter/index#models).

Select and download a model, and then store it within your project directory:

```
<dev-project-root>/app/shared/models/
```

## Create the task

Use one of the Interactive Image Segmenter `createFrom...()` functions to prepare the task for
running inferences. Use the `createFromModelPath()` function with a relative or
absolute path to the trained model file. If your model is already loaded into
memory, you can use the `createFromModelBuffer()` method.

The following code example demonstrates using the `createFromOptions()` function
to set up the task. The `createFromOptions` function lets you customize the
Interactive Image Segmenter with configuration options. For more information on configuration
options, see [Configuration options](https://developers.google.com/edge/mediapipe/solutions/vision/interactive_segmenter/web_js#configuration_options).

The following code demonstrates how to build and configure the task with custom
options:

```
async function createSegmenter() {
  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
  );

  interactiveSegmenter = await InteractiveSegmenter.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath:
        "https://storage.googleapis.com/mediapipe-models/interactive_segmenter_v2/magic_touch/int8/latest/interactive_segmentation.task"
    },
  });
}
createSegmenter();
```

### Configuration options

This task has no task-specific configuration options. It only supports the
`BaseOptions` configuration common to all tasks, which lets you specify:

* **Model asset path**: The location of the pre-trained task model within your
  project.
* **Delegate**: The processing hardware for running the task (such as CPU or
  GPU).

## Prepare data

Interactive Image Segmenter can segment objects in images in any format supported by the host
browser. The task also handles data input preprocessing, including resizing,
rotation and value normalization.

Calls to the Interactive Image Segmenter `setImage()` and `segment()` methods run
synchronously and block the user interface thread. You can prevent this by
implementing web workers to run them on another thread.

## Run the task

The Interactive Image Segmenter uses the `setImage()` and `segment()` methods to trigger
inferences. The Interactive Image Segmenter returns the detected segment as a single `MPMask`
when you run the task.

The following code demonstrates how to execute processing with the task model:

```
const image = document.getElementById("image") as HTMLImageElement;
interactiveSegmenter.setImage(image);

const mask = interactiveSegmenter.segment([
  {
    brushMode: BrushMode.POSITIVE,
    point: [
      {
        x: event.offsetX / event.target.width,
        y: event.offsetY / event.target.height
      }
    ],
    isCompleted: true
  }
]);
```

For a more complete implementation of running an Interactive Image Segmenter task, see the
[example](https://github.com/google-ai-edge/mediapipe-samples-web/blob/main/src/workers/interactive-segmenter.worker.ts).

## Handle and display results

Upon running inference, the Interactive Image Segmenter task returns segment image data. The
content of the output is a confidence mask.

The following sections further explain the output data from this task:

### Confidence mask

The output for the interactive segmenter is a single-channel confidence mask
containing float values between `[0.0, 1.0]` for each pixel of the image, with
dimensions matching the input image. Higher values indicate a higher confidence
that the image pixel is part of the object located at the area of interest.

The Interactive Image Segmenter example code demonstrates how to display the segmentation
results returned from the task, see the
[example](https://github.com/google-ai-edge/mediapipe-samples-web/blob/main/src/tasks/interactive-segmenter.ts)
for details.
