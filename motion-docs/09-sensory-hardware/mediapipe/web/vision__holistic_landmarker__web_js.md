---
source: https://ai.google.dev/edge/mediapipe/solutions/vision/holistic_landmarker/web_js
title: "Holistic landmark detection guide for Web  |  Google AI Edge  |  Google for Developers"
fetched: 2026-10-28
---

* [Home](https://developers.google.com/)
* [Products](https://developers.google.com/products)
* [Google AI Edge](https://developers.google.com/edge)
* [MediaPipe](https://developers.google.com/edge/mediapipe/solutions/guide)

# Holistic landmark detection guide for Web Stay organized with collections Save and categorize content based on your preferences.

The MediaPipe Holistic Landmarker task lets you combine components of the face, hand, and pose
landmarkers to detect human body landmarks in images or video. This task outputs
holistic landmarks in normalized image coordinates and 3D world coordinates.

These instructions show you how to use the Holistic Landmarker for web and JavaScript
apps. For more information about the capabilities, models, and configuration
options of this task, see the [Overview](https://developers.google.com/edge/mediapipe/solutions/vision/holistic_landmarker/index).

## Code example

The example code for Holistic Landmarker provides a complete implementation of this
task in JavaScript for your reference. This code helps you test this task and
get
started on building your own holistic landmarker app. You can view, run, and
edit the Holistic Landmarker
[example](https://stackblitz.com/github/google-ai-edge/mediapipe-samples-web/?file=src%2Ftasks%2Fholistic-landmarker.ts)
using just your web browser.

## Setup

This section describes key steps for setting up your development environment
specifically to use Holistic Landmarker. For general information on
setting up your web and JavaScript development environment, including
platform version requirements, see the
[Setup guide for web](https://developers.google.com/mediapipe/solutions/setup_web).

### JavaScript packages

Holistic Landmarker code is available through the MediaPipe `@mediapipe/tasks-vision`
[NPM](https://www.npmjs.com/search?q=%40mediapipe) package. You can
find and download these libraries by following the instructions in the platform
[Setup guide](https://developers.google.com/mediapipe/solutions/setup_web#downloads).

You can install the required packages through NPM
using the following command:

```
npm install @mediapipe/tasks-vision
```

If you want to import the task code via a content delivery network (CDN)
service, add the following code in the <head> tag in your HTML file:

```
<!-- You can replace JSDeliver with another CDN if you prefer -->
<head>
  <script src="https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/vision_bundle.mjs"
    crossorigin="anonymous"></script>
</head>
```

### Model

The MediaPipe Holistic Landmarker task requires a trained model bundle that is compatible with
this
task. For more information on available trained models for Holistic Landmarker, see
the task overview [Models section](https://developers.google.com/edge/mediapipe/solutions/vision/holistic_landmarker/index#models).

Select and download a model, and then store it within your project directory:

```
<dev-project-root>/app/shared/models/
```

## Create the task

Use one of the Holistic Landmarker `createFrom...()` functions to
prepare the task for running inferences. Use the `createFromModelPath()`
function with a relative or absolute path to the trained model file.
If your model is already loaded into memory, you can use the
`createFromModelBuffer()` method.

The code example below demonstrates using the `createFromOptions()` function to
set up the task. The `createFromOptions()` function allows you to customize the
Holistic Landmarker with configuration options. For more information on configuration
options, see [Configuration options](https://developers.google.com/edge/mediapipe/solutions/vision/holistic_landmarker/web_js#configuration_options).

The following code demonstrates how to build and configure the task with custom
options:

```
const vision = await FilesetResolver.forVisionTasks(
  // path/to/wasm/root
  "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
);
const holisticLandmarker = await HolisticLandmarker.createFromOptions(
    vision,
    {
      baseOptions: {
        modelAssetPath: "path/to/model"
      },
      minFaceDetectionConfidence: 0.5,
      minPoseDetectionConfidence: 0.5,
      minHandLandmarksConfidence: 0.5,
      runningMode: runningMode
    });
```

### Configuration options

This task has the following configuration options for Web and JavaScript
applications:

| Option Name | Description | Value Range | Default Value |
| --- | --- | --- | --- |
| `runningMode` | Sets the running mode for the task. There are two modes:    IMAGE: The mode for single image inputs.    VIDEO: The mode for decoded frames of a video or on a livestream of input data, such as from a camera. | {`IMAGE, VIDEO`} | `IMAGE` |
| `minFaceDetectionConfidence` | The minimum confidence score for the face detection to be considered successful. | `Float [0.0, 1.0]` | `0.5` |
| `minFaceSuppressionThreshold` | The minimum non-maximum-suppression threshold for face detection to be considered overlapped. | `Float [0.0, 1.0]` | `0.3` |
| `minFacePresenceConfidence` | The minimum confidence score of face presence score in the face landmarks detection. | `Float [0.0, 1.0]` | `0.5` |
| `minPoseDetectionConfidence` | The minimum confidence score for the pose detection to be considered successful. | `Float [0.0, 1.0]` | `0.5` |
| `minPoseSuppressionThreshold` | The minimum non-maximum-suppression threshold for pose detection to be considered overlapped. | `Float [0.0, 1.0]` | `0.3` |
| `minPosePresenceConfidence` | The minimum confidence score of pose presence score in the pose landmarks detection. | `Float [0.0, 1.0]` | `0.5` |
| `minHandLandmarksConfidence` | The minimum confidence score of hand presence score in the hand landmarks detection. | `Float [0.0, 1.0]` | `0.5` |
| `outputFaceBlendshapes` | Whether to output face blendshapes classification. Face blendshapes are used for rendering the 3D face model. | `Boolean` | `false` |
| `outputPoseSegmentationMasks` | Whether to output segmentation masks for the human pose. | `Boolean` | `false` |

## Prepare data

Holistic Landmarker can detect holistic landmarks in images in any format supported by
the
host browser. The task also handles data input preprocessing, including
resizing, rotation and value normalization. To detect landmarks in videos,
you can use the API to quickly process one frame at a time, using the timestamp
of the frame to determine when the landmarks occur within the video.

## Run the task

The Holistic Landmarker uses the `detect()` (with running mode `IMAGE`) and
`detectForVideo()` (with running mode `VIDEO`) methods to trigger
inferences. The task processes the data, attempts to detect landmarks, and
then reports the results.

The following code demonstrates how to execute the processing:

### Image

```
const image = document.getElementById("image") as HTMLImageElement;
const result = holisticLandmarker.detect(image);
```

### Video

```
await holisticLandmarker.setOptions({ runningMode: "VIDEO" });

let lastVideoTime = -1;
function renderLoop(): void {
  const video = document.getElementById("video") as HTMLVideoElement;
  if (video.currentTime !== lastVideoTime) {
    const result = holisticLandmarker.detectForVideo(video, video.currentTime);
    lastVideoTime = video.currentTime;
  }
  requestAnimationFrame(renderLoop);
}
```
