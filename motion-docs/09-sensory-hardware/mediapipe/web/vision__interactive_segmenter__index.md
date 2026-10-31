---
source: https://ai.google.dev/edge/mediapipe/solutions/vision/interactive_segmenter
title: "Interactive image segmentation task guide  |  Google AI Edge  |  Google for Developers"
fetched: 2026-10-28
---

* [Home](https://developers.google.com/)
* [Products](https://developers.google.com/products)
* [Google AI Edge](https://developers.google.com/edge)
* [MediaPipe](https://developers.google.com/edge/mediapipe/solutions/guide)

# Interactive image segmentation task guide Stay organized with collections Save and categorize content based on your preferences.

![Side by side images that show a photograph of a chair in one image and then
the same image with the chair highlighted to indicate that the model has
detected the chair](https://developers.google.com/static/mediapipe/images/solutions/examples/interactive-segmenter.png)

The MediaPipe Interactive Image Segmenter task lets you divide an image into two regions: a selected
object and everything else. The task is stateful: You first set an image, and
then you can efficiently perform segmentation multiple times by providing
different strokes (points and brush mode) indicating a location in an image. The
task estimates the boundaries of an object at that location, and returns image
data defining the area of the object. You can use this task to interactively
select an object in an image and use the output to apply effects to the image,
such as color overlays highlighting the object or blurring the background around
it. This task operates on image data with a machine learning (ML) model.

[Try
it!arrow\_forward](https://google-ai-edge.github.io/mediapipe-samples-web/#/vision/interactive_segmenter)

## Get Started

Start using this task by following one of these implementation guides for your
target platform. These platform-specific guides walk you through a basic
implementation of this task, including a recommended model, and code example
with recommended configuration options:

| Platform | Code Example | Guide |
| --- | --- | --- |
| Android | [Code example](https://github.com/google-ai-edge/mediapipe-samples/blob/main/examples/interactive_segmentation/android) | [Guide](https://developers.google.com/edge/mediapipe/solutions/vision/interactive_segmenter/android) |
| Python | [Colab](https://colab.research.google.com/github/google-ai-edge/mediapipe-samples/blob/main/examples/interactive_segmentation/python/interactive_segmenter.ipynb) | [Guide](https://developers.google.com/edge/mediapipe/solutions/vision/interactive_segmenter/python) |
| Web | [Code example](https://github.com/google-ai-edge/mediapipe-samples-web/blob/main/src/tasks/interactive-segmenter.ts) | [Guide](https://developers.google.com/edge/mediapipe/solutions/vision/interactive_segmenter/web_js) |

## Task details

This section describes the capabilities, inputs, outputs, and configuration
options of this task.

### Features

* **Input image processing** - Processing includes image rotation, resizing,
  normalization, and color space conversion.

| Task inputs | Task outputs |
| --- | --- |
| * Strokes (points and brush mode) indicating an area of interest in an image * Image file to be processed | Interactive Image Segmenter outputs a segmented mask with pixel values in float32 format. Each pixel value indicates the level of confidence that it is part of the object located at the area of interest. |

### Configuration options

This task has no task-specific configuration options. It only supports the
`BaseOptions` configuration common to all tasks, which lets you specify:

* **Model asset path**: The location of the pre-trained task model within your
  project.
* **Delegate**: The processing hardware for running the task (such as CPU or
  GPU).

## Models

The Interactive Image Segmenter can be used with more than one ML model. Start with the
default, recommended model for your target platform when you start developing
with this task. The other available models typically make trade-offs between
performance, accuracy, resolution, and resource requirements, and in some cases,
include additional features.

### MagicTouch model (recommended)

This model identifies segments given image coordinates for an area of interest.
The model uses a Convolutional Neural Network, similar to a
[MobileNetV3](https://www.kaggle.com/models?query=mobilenet-v3) architecture,
with a customized decoder.

| Model name | Input shape | Quantization type | Model Card | Versions |
| --- | --- | --- | --- | --- |
| [MagicTouch](https://storage.googleapis.com/mediapipe-models/interactive_segmenter_v2/magic_touch/int8/latest/interactive_segmentation.task) | 768 x 768 x 3 | Int8 | [info](https://storage.googleapis.com/mediapipe-assets/Model%20Card%20MagicTouch.pdf) | [Latest](https://storage.googleapis.com/mediapipe-models/interactive_segmenter_v2/magic_touch/int8/latest/interactive_segmentation.task) |

## Task benchmarks

Here are the task benchmarks for the whole pipeline based on the preceding
pre-trained models. The latency result is the average latency on Pixel 10 using
CPU / GPU.

| Model Name | CPU Latency | GPU Latency |
| --- | --- | --- |
| MagicTouch | 208.2ms | 580.6ms |

## Legacy Interactive Segmenter

The legacy `InteractiveSegmenterLegacy` API performed segmentation in a single
step (stateless, one-shot). It required passing both the image and the Region of
Interest (ROI) on every call, causing heavy image features to be re-extracted
for each stroke.

Developers using `InteractiveSegmenterLegacy` are strongly encouraged to migrate
to the stateful `InteractiveSegmenter` API for significantly improved
interactive performance.

### API Comparison

| Feature | Legacy API (`InteractiveSegmenterLegacy`) | New API (`InteractiveSegmenter`) |
| --- | --- | --- |
| **Execution Model** | Stateless (One-Shot) | Stateful (`setImage` + `segment`) |
| **Image Feature Extraction** | Re-extracts heavy image features on *every* stroke | Encodes image features *once* using `setImage`; reuses embeddings across strokes |
| **Workflow** | Pass image + ROI to `segment` on every interaction | Call `setImage(image)` once, then call `segment(roi)` for each stroke |
| **Status** | Legacy / Deprecated | **Recommended** |

### Migration Pathway

To migrate to the Interactive Segmenter API:

1. **Initialize**: Instantiate `InteractiveSegmenter` with chosen options.
2. **Set Image**: Call `setImage(image)` once when loading or changing the
   target image.
3. **Process User Interactions**: Call `segment(regionOfInterest)` repeatedly
   as the user draws strokes or clicks points.
4. **Close**: Call `close()` when finished with the current image session.

For complete platform integration details, consult the platform-specific guides
([Android](https://developers.google.com/edge/mediapipe/solutions/vision/interactive_segmenter/android), [Python](https://developers.google.com/edge/mediapipe/solutions/vision/interactive_segmenter/python), [Web](https://developers.google.com/edge/mediapipe/solutions/vision/interactive_segmenter/web_js)).
