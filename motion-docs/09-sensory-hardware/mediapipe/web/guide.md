---
source: https://ai.google.dev/edge/mediapipe/solutions/guide
title: "MediaPipe Solutions guide  |  Google AI Edge  |  Google for Developers"
fetched: 2026-10-28
---

* [Home](https://developers.google.com/)
* [Products](https://developers.google.com/products)
* [Google AI Edge](https://developers.google.com/edge)
* [MediaPipe](https://developers.google.com/edge/mediapipe/solutions/guide)

# MediaPipe Solutions guide Stay organized with collections Save and categorize content based on your preferences.

MediaPipe Solutions provides a suite of libraries and tools for you to quickly
apply artificial intelligence (AI) and machine learning (ML) techniques in your
applications. You can plug these solutions into your applications immediately,
customize them to your needs, and use them across multiple development
platforms. MediaPipe Solutions is part of the MediaPipe [open source
project](https://github.com/google-ai-edge/mediapipe), so you can further
customize the solutions code to meet your application needs. The MediaPipe
Solutions suite includes the following:

![MediaPipe
Solutions, Studio, and Model Maker](https://developers.google.com/static/edge/mediapipe/images/solutions/overview-diagram.svg)

These libraries and resources provide the core functionality for each MediaPipe
Solution:

* **MediaPipe Tasks**: Cross-platform APIs and libraries for deploying
  solutions. [Learn more](https://developers.google.com/edge/mediapipe/solutions/tasks)
* **MediaPipe Models**: Pre-trained, ready-to-run models for use with each
  solution.

These tools let you customize and evaluate solutions:

* **MediaPipe Model Maker**: Customize models for solutions with your data.
  [Learn more](https://developers.google.com/edge/mediapipe/solutions/model_maker)
* **MediaPipe Studio**: Visualize, evaluate, and benchmark solutions in your
  browser. [Learn more](https://developers.google.com/edge/mediapipe/solutions/studio)

## Available solutions

MediaPipe Solutions are available across multiple platforms. Each solution
includes one or more models, and you can customize models for some solutions as
well. The following list shows what solutions are available for each supported
platform and if you can use Model Maker to customize the model:

| Solution | Android | Web | Python | iOS | Customize model |
| --- | --- | --- | --- | --- | --- |
| [Audio classification](https://developers.google.com/edge/mediapipe/solutions/audio/audio_classifier) | filled circle | filled circle | filled circle | filled circle |  |
| [Decision maker](https://developers.google.com/edge/mediapipe/solutions/decision/decision_maker) | filled circle | filled circle | filled circle | filled circle |  |
| [Face detection](https://developers.google.com/edge/mediapipe/solutions/vision/face_detector) | filled circle | filled circle | filled circle | filled circle |  |
| [Face landmark detection](https://developers.google.com/edge/mediapipe/solutions/vision/face_landmarker) | filled circle | filled circle | filled circle | filled circle |  |
| [Gesture recognition](https://developers.google.com/edge/mediapipe/solutions/vision/gesture_recognizer) | filled circle | filled circle | filled circle | filled circle | filled circle |
| [Hand landmark detection](https://developers.google.com/edge/mediapipe/solutions/vision/hand_landmarker) | filled circle | filled circle | filled circle | filled circle |  |
| [Holistic landmark detection](https://developers.google.com/edge/mediapipe/solutions/vision/holistic_landmarker) | filled circle | filled circle | filled circle | filled circle |  |
| [Image classification](https://developers.google.com/edge/mediapipe/solutions/vision/image_classifier) | filled circle | filled circle | filled circle | filled circle | filled circle |
| [Image embedding](https://developers.google.com/edge/mediapipe/solutions/vision/image_embedder) | filled circle | filled circle | filled circle | filled circle |  |
| [Image segmentation](https://developers.google.com/edge/mediapipe/solutions/vision/image_segmenter) | filled circle | filled circle | filled circle | filled circle |  |
| [Interactive segmentation](https://developers.google.com/edge/mediapipe/solutions/vision/interactive_segmenter) | filled circle | filled circle | filled circle | filled circle |  |
| [Language detection](https://developers.google.com/edge/mediapipe/solutions/text/language_detector) | filled circle | filled circle | filled circle | filled circle |  |
| [LLM Inference API](https://developers.google.com/edge/mediapipe/solutions/genai/llm_inference) |  | filled circle |  |  | filled circle |
| [Object detection](https://developers.google.com/edge/mediapipe/solutions/vision/object_detector) | filled circle | filled circle | filled circle | filled circle | filled circle |
| [Pose landmark detection](https://developers.google.com/edge/mediapipe/solutions/vision/pose_landmarker) | filled circle | filled circle | filled circle | filled circle |  |
| [Semantic retriever](https://developers.google.com/edge/mediapipe/solutions/retrieval/semantic_retriever) | filled circle | filled circle | filled circle | filled circle |  |
| [Text classification](https://developers.google.com/edge/mediapipe/solutions/text/text_classifier) | filled circle | filled circle | filled circle | filled circle | filled circle |
| [Text embedding](https://developers.google.com/edge/mediapipe/solutions/text/text_embedder) | filled circle | filled circle | filled circle | filled circle |  |
| [Text proofreading](https://developers.google.com/edge/mediapipe/solutions/text/text_proofreader) | filled circle |  | filled circle | filled circle |  |
| [Text summarization](https://developers.google.com/edge/mediapipe/solutions/text/text_summarizer) | filled circle |  | filled circle | filled circle |  |
| [Universal embedding](https://developers.google.com/edge/mediapipe/solutions/retrieval/universal_embedder) | filled circle | filled circle | filled circle | filled circle |  |

## Get started

You can get started with MediaPipe Solutions by selecting any of the tasks
listed in the left navigation tree, including:

* [audio](https://developers.google.com/edge/mediapipe/solutions/audio/audio_classifier)
* [decision](https://developers.google.com/edge/mediapipe/solutions/decision/decision_maker)
* [genai](https://developers.google.com/edge/mediapipe/solutions/genai/llm_inference)
* [retrieval](https://developers.google.com/edge/mediapipe/solutions/retrieval/semantic_retriever)
* [text](https://developers.google.com/edge/mediapipe/solutions/text/text_classifier)
* [vision](https://developers.google.com/edge/mediapipe/solutions/vision/object_detector)

If you need help setting up a development environment for use with MediaPipe
Tasks, follow our setup guides for:

* [Android](https://developers.google.com/edge/mediapipe/solutions/setup_android)
* [iOS](https://developers.google.com/edge/mediapipe/solutions/setup_ios)
* [Python](https://developers.google.com/edge/mediapipe/solutions/setup_python)
* [Web apps](https://developers.google.com/edge/mediapipe/solutions/setup_web)

## Legacy solutions

We have ended support for the MediaPipe Legacy Solutions listed here as of March
1, 2023. All other MediaPipe Legacy Solutions will be upgraded to a new
MediaPipe Solution. See the table in this section for details. The [MediaPipe
code repository](https://github.com/google-ai-edge/mediapipe) and prebuilt
binaries for all MediaPipe Legacy Solutions will continue to be provided on an
as-is basis.

| Legacy Solution | Status | New MediaPipe Solution |
| --- | --- | --- |
| Face Detection ([info](https://github.com/google/mediapipe/blob/master/docs/solutions/face_detection.md)) | [Upgraded](https://developers.google.com/edge/mediapipe/solutions/vision/face_detector) | [Face detection](https://developers.google.com/edge/mediapipe/solutions/vision/face_detector) |
| Face Mesh ([info](https://github.com/google/mediapipe/blob/master/docs/solutions/face_mesh.md)) | [Upgraded](https://developers.google.com/edge/mediapipe/solutions/vision/face_landmarker) | [Face landmark detection](https://developers.google.com/edge/mediapipe/solutions/vision/face_landmarker) |
| Iris ([info](https://github.com/google/mediapipe/blob/master/docs/solutions/iris.md)) | [Upgraded](https://developers.google.com/edge/mediapipe/solutions/vision/face_landmarker) | [Face landmark detection](https://developers.google.com/edge/mediapipe/solutions/vision/face_landmarker) |
| Hands ([info](https://github.com/google/mediapipe/blob/master/docs/solutions/hands.md)) | [Upgraded](https://developers.google.com/edge/mediapipe/solutions/vision/hand_landmarker) | [Hand landmark detection](https://developers.google.com/edge/mediapipe/solutions/vision/hand_landmarker) |
| Pose ([info](https://github.com/google/mediapipe/blob/master/docs/solutions/pose.md)) | [Upgraded](https://developers.google.com/edge/mediapipe/solutions/vision/pose_landmarker) | [Pose landmark detection](https://developers.google.com/edge/mediapipe/solutions/vision/pose_landmarker) |
| Holistic ([info](https://github.com/google/mediapipe/blob/master/docs/solutions/holistic.md)) | [Upgraded](https://developers.google.com/edge/mediapipe/solutions/vision/holistic_landmarker) | [Holistic landmark detection](https://developers.google.com/edge/mediapipe/solutions/vision/holistic_landmarker) |
| Selfie segmentation ([info](https://github.com/google/mediapipe/blob/master/docs/solutions/selfie_segmentation.md)) | [Upgraded](https://developers.google.com/edge/mediapipe/solutions/vision/image_segmenter) | [Image segmentation](https://developers.google.com/edge/mediapipe/solutions/vision/image_segmenter) |
| Hair segmentation ([info](https://github.com/google/mediapipe/blob/master/docs/solutions/hair_segmentation.md)) | [Upgraded](https://developers.google.com/edge/mediapipe/solutions/vision/image_segmenter) | [Image segmentation](https://developers.google.com/edge/mediapipe/solutions/vision/image_segmenter) |
| Object detection ([info](https://github.com/google/mediapipe/blob/master/docs/solutions/object_detection.md)) | [Upgraded](https://developers.google.com/edge/mediapipe/solutions/vision/object_detector) | [Object detection](https://developers.google.com/edge/mediapipe/solutions/vision/object_detector) |
| Box tracking ([info](https://github.com/google/mediapipe/blob/master/docs/solutions/box_tracking.md)) | Support ended |  |
| Instant motion tracking ([info](https://github.com/google/mediapipe/blob/master/docs/solutions/instant_motion_tracking.md)) | Support ended |  |
| Objectron ([info](https://github.com/google/mediapipe/blob/master/docs/solutions/objectron.md)) | Support ended |  |
| KNIFT ([info](https://github.com/google/mediapipe/blob/master/docs/solutions/knift.md)) | Support ended |  |
| AutoFlip ([info](https://github.com/google/mediapipe/blob/master/docs/solutions/autoflip.md)) | Support ended |  |
| MediaSequence ([info](https://github.com/google/mediapipe/blob/master/docs/solutions/media_sequence.md)) | Support ended |  |
| YouTube 8M ([info](https://github.com/google/mediapipe/blob/master/docs/solutions/youtube_8m.md)) | Support ended |  |
