---
source: https://ai.google.dev/edge/mediapipe/solutions/vision/holistic_landmarker
title: "Holistic landmark detection guide  |  Google AI Edge  |  Google for Developers"
fetched: 2026-10-28
---

* [Home](https://developers.google.com/)
* [Products](https://developers.google.com/products)
* [Google AI Edge](https://developers.google.com/edge)
* [MediaPipe](https://developers.google.com/edge/mediapipe/solutions/guide)

# Holistic landmark detection guide Stay organized with collections Save and categorize content based on your preferences.

![Holistic Landmarker task](https://developers.google.com/static/mediapipe/images/solutions/examples/pose_detector.png)

The MediaPipe Holistic Landmarker task lets you combine components of the face, hand, and pose
landmarkers to detect a total of 553 human body landmarks in real-time. You can
use this task to analyze full-body gestures, poses, and actions across a
continuous stream of images or video.

The task outputs a combination of normalized landmarks, world landmarks,
blendshapes (optional), and segmentation masks (optional).

[Try it!arrow\_forward](https://google-ai-edge.github.io/mediapipe-samples-web/#/vision/holistic_landmarker)

## Get Started

Start using this task by following one of the implementation guides for your
target platform:

| Platform | Code Example | Guide |
| --- | --- | --- |
| Android | [Code example](https://github.com/google-ai-edge/mediapipe-samples/tree/main/examples/holistic_landmarker/android) | [Guide](https://developers.google.com/edge/mediapipe/solutions/vision/holistic_landmarker/android) |
| iOS | [Code example](https://github.com/google-ai-edge/mediapipe-samples/tree/main/examples/holistic_landmarker/ios) | [Guide](https://developers.google.com/edge/mediapipe/solutions/vision/holistic_landmarker/ios) |
| Python | [Colab](https://github.com/google-ai-edge/mediapipe-samples/tree/main/examples/holistic_landmarker/python) | [Guide](https://developers.google.com/edge/mediapipe/solutions/vision/holistic_landmarker/python) |
| Web | [Code example](https://github.com/google-ai-edge/mediapipe-samples-web/blob/main/src/tasks/holistic-landmarker.ts) | [Guide](https://developers.google.com/edge/mediapipe/solutions/vision/holistic_landmarker/web_js) |

## Task details

This section describes the capabilities, inputs, outputs, and configuration
options of this task.

### Features

* **Input image processing** - Processing includes image rotation, resizing,
  normalization, and color space conversion.
* **Score thresholds** - Filter results based on prediction and confidence
  scores.
* **Optional outputs** - Optional output of face blendshapes and pose
  segmentation masks.

| Task inputs | Task outputs |
| --- | --- |
| The Holistic Landmarker accepts an input of one of the following data types:   * Still images  * Decoded video frames  * Live video feed | The Holistic Landmarker outputs the following results:   * Face landmarks in normalized image coordinates (478 landmarks)  * Pose landmarks in normalized image coordinates and 3D world coordinates (33   landmarks)  * Left hand landmarks in normalized image coordinates and 3D world coordinates   (21 landmarks)  * Right hand landmarks in normalized image coordinates and 3D world   coordinates (21 landmarks)  * Optional: Face blendshapes scores  * Optional: A segmentation mask for the pose region |

### Configuration options

This task has the following configuration options:

| Option Name | Description | Value Range | Default Value |
| --- | --- | --- | --- |
| `running_mode` | Sets the running mode for the task. There are three modes:    IMAGE: The mode for single image inputs.    VIDEO: The mode for decoded frames of a video.    LIVE\_STREAM: The mode for a livestream of input data, such as from a camera. | {`IMAGE, VIDEO, LIVE_STREAM`} | `IMAGE` |
| `min_face_detection_confidence` | The minimum confidence score for face detection to be considered successful. | `Float [0.0, 1.0]` | `0.5` |
| `min_face_suppression_threshold` | The minimum non-maximum-suppression threshold for face detection to be considered overlapped. | `Float [0.0, 1.0]` | `0.3` |
| `min_face_presence_confidence` | The minimum confidence score of face presence score in the face landmark detection. | `Float [0.0, 1.0]` | `0.5` |
| `min_pose_detection_confidence` | The minimum confidence score for pose detection to be considered successful. | `Float [0.0, 1.0]` | `0.5` |
| `min_pose_suppression_threshold` | The minimum threshold for pose suppression score in the pose detection. | `Float [0.0, 1.0]` | `0.3` |
| `min_pose_presence_confidence` | The minimum confidence score of pose presence score in the pose landmark detection. | `Float [0.0, 1.0]` | `0.5` |
| `min_hand_landmarks_confidence` | The minimum confidence score of hand presence score in the hand landmarks detection. | `Float [0.0, 1.0]` | `0.5` |
| `output_face_blendshapes` | Whether to output face blendshapes classification, which can be used to animate a 3D model. | `Boolean` | `false` |
| `output_pose_segmentation_masks` | Whether to output segmentation masks for the human pose. | `Boolean` | `false` |

## Models

The Holistic Landmarker uses a series of packaged models to perform holistic landmarks
detection. These models include face detection, face mesh/landmarks, pose
detection, pose landmarker, palm detection, and hand landmark models.

The following models are packaged together into a downloadable model bundle:

* **Pose detection and landmark model**: tracks 33 body pose coordinates.
* **Face detection and mesh model**: detects and tracks 478 3D face mesh
  landmarks, including 10 iris landmarks with optional 52 blendshape
  coefficients.
* **Palm detection and hand landmark model**: tracks 21 knuckle coordinates
  per hand.

| Model bundle | Data type | Model Cards | Versions |
| --- | --- | --- | --- |
| [Holistic landmarker](https://storage.googleapis.com/mediapipe-models/holistic_landmarker/holistic_landmarker/float16/latest/holistic_landmarker.task) | float 16 | [BlazePose](https://storage.googleapis.com/mediapipe-assets/Model%20Card%20BlazePose%20GHUM%203D.pdf)  [FaceMesh-V2](https://storage.googleapis.com/mediapipe-assets/Model%20Card%20MediaPipe%20Face%20Mesh%20V2.pdf)  [HandLandmarker](https://storage.googleapis.com/mediapipe-assets/Model%20Card%20Hand%20Tracking%20(Lite_Full)%20with%20Fairness%20Oct%202021.pdf) | [Latest](https://storage.googleapis.com/mediapipe-models/holistic_landmarker/holistic_landmarker/float16/latest/holistic_landmarker.task) |

## Landmark Coordinates

The Holistic Landmarker outputs a total of 553 landmarks that represent the full body:

* **Pose landmarks**: 33 landmarks representing key body coordinate points
  (same as the [Pose Landmarker](https://developers.google.com/edge/mediapipe/solutions/vision/pose_landmarker/index)).
* **Face landmarks**: 478 landmarks representing the facial structure
  including 10 iris landmarks (same as the [Face
  Landmarker](https://developers.google.com/edge/mediapipe/solutions/vision/face_landmarker/index)).
* **Hand landmarks**: 21 landmarks per hand (42 total) representing knuckle
  coordinates (same as the [Hand Landmarker](https://developers.google.com/edge/mediapipe/solutions/vision/hand_landmarker/index)).
