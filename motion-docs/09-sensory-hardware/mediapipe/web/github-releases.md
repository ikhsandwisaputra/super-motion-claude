---
source: https://github.com/google-ai-edge/mediapipe/releases
title: "MediaPipe GitHub releases (v0.10.26 - v1.2.0)"
fetched: 2026-10-28
---

# MediaPipe releases (raw notes, newest first)

Note: npm @mediapipe/tasks-vision versions track these tags (1.0.0 = 2026-07-28, 1.1.0 = 2026-10-06, 1.2.0 = 2026-10-27).

## v1.2.0 (2026-10-28) - MediaPipe v1.1.1

### Bazel changes

- Bump MediaPipe version to 1.2.0
- Support Web Worker platform detection and Flutter Web telemetry overrides.
- Rollback due to breakage in gmscore.build.
- Fix GPU memory leaks when releasing AHWB-backed SSBOs and pooled textures.
- Fix nullptr exception in ImageToTensorCalculator
- Add support for F16 formats in ImageFrame
- Fix MediaPipe Tasks telemetry fields and audio_classifier.h license.
- Prevent possible lock-order-inversion deadlocks when locking input tensors in InferenceRunnerLiteRt
- Expose the remaining MlDriftDelegateOptions in InferenceCalculatorOptions
- Run face blendshapes on CPU when using the GPU delegate.
- Optimize Parakeet ASR streaming latency and decoder/runtime performance.
- Replace status_macros.h includes with absl/status/status_macros.h in mediapipe/framework
- Replace status_macros.h includes with absl/status/status_macros.h in mediapipe/calculators
- Replace status_macros.h includes with absl/status/status_macros.h in remaining mediapipe tasks, modules, and utilities
- Upgrade OpenCV to 4.10
- Enable F16 cv::Mat support in OpenCV conversions. OpenCV 4 was enabled in a previous CL.
- Update SPM files for 1.2.0

### MediaPipe Tasks update
This section should highlight the changes that are done specifically for any platform and don't propagate to
other platforms.

#### Android
- Add MediaPipe Tasks Android Kotlin TextToSpeech SDK and JNI bridge.
- Add LiteRT service support to InteractiveSegmenter on Android.
- Return topK distinct documents from SemanticRetriever when results are chunked.

#### iOS
- Open source the MediaPipe text proofreader and summarizer tasks.
- Add Apple Privacy Manifest (`PrivacyInfo.xcprivacy`) to MediaPipe Tasks iOS Swift Package Manager package.

### MediaPipe Dependencies

- Update WASM files for 1.2.0 release
- Update genai wasm

## v1.1.1 (2026-10-14) - MediaPipe v1.1.1

### Bazel changes

- Bump MediaPipe version to 1.1.1
- Add per-domain C libraries for Flutter SDK
- Fix GPU interactive segmentation on macOS.
- Add Flutter and Flutter Web host environments to MediaPipe Tasks C API.
- Add C API for intercepting Abseil logs in MediaPipe Tasks.
- mediapipe: Migrate to use new LiteRT GetOptions<T>() API
- Migrate remaining NPU option callers to GetOptions<T>()
- Update WASM and SPM files for 1.1..1 release

### MediaPipe Tasks update
This section should highlight the changes that are done specifically for any platform and don't propagate to
other platforms.

#### Android
- Enable LiteRT delegate for Interactive Segmenter on Android.

#### Javascript
- Update Retrieval SDK's code snippets

### MediaPipe Dependencies
- Upgrade LiteRT dependency to v2.3.0 in MediaPipe WORKSPACE

## v1.1.0 (2026-10-07) - MediaPipe v1.1.0

### Build and Bazel changes
- Remove the dependency on internal Bazel Apple rules `resources.bzl` in `mediapipe/metal.bzl`, using the metal rule provided by Bazel Apple rules.
- Add Python 3.13 and 3.14 support to the MediaPipe Bazel build.
- Upgrade LiteRT dependency to v2.2.0 in MediaPipe `WORKSPACE`.
- Move up declaration of `kissfft` in build configuration.
- Fix `xla llvm` download URL by using `mediapipe-assets` mirror.
- Fix Windows build.
- Remove obsolete `unistd.h` header imports.
- Configure MediaPipe for vendor/no-JNI Android builds.

### Framework and core calculator improvements
- Bump MediaPipe version to 1.1.0.
- Add MediaPipe Universal Embedder, Semantic Retriever, and LiteRT-LM integration across C++, C, Python, and Android/Maven APIs.
- MediaPipe Decision: Add EmbeddingGemma 1 & 2 decision backend with multimodal state and option support.
- Implement core `TaskPart` and `EmbeddingProvider` interface.
- Refactor `TextPart`, `AudioPart`, and `ImagePart` into `tasks.core` and unify duplicates.
- Refactor `TextEmbedder` and `ImageEmbedder` to use executor abstractions (`TextEmbedderExecutor`, `ImageEmbedderExecutor`).
- Add `HasFile`, `GetBundleManifest`, and `GetBundleId` helpers to `ModelAssetBundleResources`.
- Add `noexcept` to move ctor/operator and add `swap` to `Packet`.
- Add method to create an empty packet in Java API.
- Use `ABSL_ASSIGN_OR_RETURN` and `ABSL_RETURN_IF_ERROR` in MediaPipe.
- Rename `GeckoPreprocessorCalculator` to `SentencePiecePreprocessorCalculator`.
- Add option to ignore missing `encoded_media_bytes` in `UnpackMediaSequenceCalculator`.
- Add LiteRT-LM based C++ Audio Embedder.
- C API for MediaPipe AudioEmbedder.
- Select the MediaPipe OpenGL device by Vulkan device UUID.
- Replace LiteRT delegate with `use_litert` option in MediaPipe `BaseOptions`.
- Expose LiteRT and NPU delegate options to MediaPipe Tasks.
- Only use public LiteRT API in LiteRT inference calculator.
- Support passing `LiteRtSystemHandles` to Environment in LiteRT Inference Calculator.
- Add support for specifying a signature key for LiteRT inference.
- Retain `MTLCommandQueue` directly instead of `DrishtiMetalHelper` in `InferenceRunnerLiteRt`.
- Use runtime layout for rank-0 LiteRT model outputs in `InferenceRunnerLiteRt`.
- Check GPU service availability in `TensorsToDetectionsCalculator`.
- Improve MediaPipe Metal GPU delegate error messages for unsupported configurations.
- Allow size mismatched tensors for GPU execution.
- Fix race condition in `GpuResources`.
- Fix deprecated `CreateSourceTexture` usage in desktop GPU example.

### MediaPipe Tasks update
This section highlights the changes that are done specifically for each platform and don't propagate to other platforms.

#### Android
- Add plumbing needed for zero-copy `AHardwareBuffer` (AHWB) output from the GPU.
- Fix OpenGL ES and `AHardwareBuffer` synchronization when converting between write and read views.
- Wrap VC effects AHWB graph input as `AHardwareBuffer` (`kRGBA32`).
- Raise `MediaPipeException` instead of crashing in `surface_output_jni` on Android EGL surface creation failure.
- Fix crash in `PathToResourceAsFile` when `TEST_SRCDIR` is not set on Android.
- Made AppSearch vector store optional for SemanticRetriever Android SDK.
- Add Semantic Retriever Java API by prebuilding SQLite dependencies.
- Support in-memory audio and image representations in MediaPipe Tasks Android.
- Support multi-part multimodal embedding and vector store serialization in MediaPipe Tasks Android.
- Ensure that JNI methods are exported for Android Tasks.
- Remove legacy `LITERT` delegate flag from Android API.

#### iOS
- Update Swift Package Manager (SPM) manifest for MediaPipe Tasks iOS 1.1.0.
- Add iOS Retrieval SPM package (`MediaPipeTasksRetrieval`).
- Add missing `MPPAudioRecord.h` to `MediaPipeTasksRetrieval` XCFramework headers.
- Exclude MediaPipe C API (`_Mp*`) symbols from the iOS symbol rename map.
- Add `inference_calculator_litert` dependencies to iOS Tasks targets.
- Return standard `NSError` instead of crashing when universal embedder model path is invalid.
- Support in-memory audio and image representations in MediaPipe Tasks iOS.
- Support multi-part multimodal embedding and vector store serialization in MediaPipe Tasks iOS.

#### Javascript
- Add retrieval to MediaPipe Tasks for Web (`UniversalEmbedder`, `SemanticRetriever`).
- Export public APIs for Web `SemanticRetriever`.
- Make the `DecisionMaker` web API usable from the minified `decision_js` bundle.
- Refactor task name discovery in MediaPipe Web Tasks.
- Expose per-landmark presence scores on the Web Tasks API.
- Enable GPU usage for `UniversalEmbedder` on Web.
- Prevent overlapping WASM embedding calls.
- Disable LiteRT-LM extensive logging for `UniversalEmbedder` on Web.
- Add stats logging to Web Tasks.
- Add unit tests for `ImageFrame` and `YUVImage` conversions.
- Add missing `await` calls to `UniversalEmbedder` example in web retrieval documentation.

#### Python
- Python API for MediaPipe `AudioEmbedder`.
- Add `cosine_similarity` utility method to `UniversalEmbedder`.
- Cast all Python types to their explicit C type assignment for ABI stability.
- Add `cache_dir` option and default to `:nocache`.
- Add Semantic Retriever Python API with bundled SQLite vector store.

### Bug fixes
- Fix `HolisticLandmarker` crash when face detections are missing.
- Fix `HolisticLandmarker` `Any` Builder return type and empty packet `MediaPipeExceptions`.
- Re-add `ImageEmbedder.close()` method.
- Fix `numpy_view()` SIGABRT on non-contiguous `float32` masks.
- Fix wrist connection in `HAND_PALM_CONNECTIONS`.
- Fix landmark drift in `LandmarksSmoothingCalculator` (OneEuroFilter) when stream resolution dynamically changes between preview and still capture.
- Correct parameter names in core calculators.
- Fix WAV decoder calculations in `audio_decoder_calculator_test`.

### MediaPipe Dependencies
- Upgrade LiteRT dependency to v2.2.0 in `WORKSPACE`.
- Update WASM asset binaries for 1.1.0 release.

## v1.0.0 (2026-07-28) - MediaPipe v1.0.0

### Build changes
- Remove MacOS prebuilts
- Replace ITUIOSTestUtil with ITUTestRunEnvironment in iOS tests.

### Bazel changes
- Migrate Apple rules dependencies to MODULE.bazel.
### Framework and core calculator improvements
- Add Gecko support to MediaPipe Text Embedder Task
- Store wgpu::Instance in WebGpuService.
- Supporting builds with DRISHTI_DISABLE_GL_COMPUTE define.
- Bump MediaPipe version to 0.10.36.
- - Abseil (com_google_absl): Updated from (2023-10-18) to (2025-01-14).
- Add Gecko support to TextEmbedder C API.
- Use standardized enum constants for Running Mode
- Report Mat type in debug logging.
- Add AddAudioHeaderCalculator
- Remove run_llm_inference.sh
- Add webgpu::Instance to WebGpuDeviceAttachmentManager.
- Fix MediaPipe nightly build failure and cleanup Bzlmod warnings.
- Fix null pointer access in Tensor::GetOpenGlTexture2dReadView() for AHWB backed Tensor.
- Adds SpectrogramFloatCalculator and InverseSpectrogramFloatCalculator to support float precision.
- Add support for Embedding Gemma models in TextEmbedder.
- Make wgpu::Instance a member of WebGpuAsyncFuture.
- Enforce namespacing conventions for MediaPipe Tasks C and Python APIs.
- Add methods to create and access Matrix packets using Direct ByteBuffers.
- Ensure AhwbGpuResources destructor cleans up OpenGL/EGL resources and forces AHWB usage completion.
- Update MediaPipe Python build Dockerfiles.
- Update base options and host environment.
- Introducing extra base options and corresponding conversion/get functions.
- Improve error message for option_value problems
- Support models with empty tags
- Add empty image checks to ScaleImageCalculator.
- Add gpu_postprocessing option for TensorsToSegmentationCalculator.
- Add text chunking utility
- Expand LiteRtService to support system runtime on Android.
- Add `vImageExtractChannelAndConvertToFloat` function.
- Compile with OpenCV 5's features
- Add documentation for LiteRT Inference Calculator accelerators
- Fix data race accessing GlContext::profiling_helper_
- Add a "prefer_ahwb" flag to MemoryManager
- Add Builder v2 and v3 APIs to change the node name
- Add verbose debug logging for buffer pooling
- Updates the manylinux Dockerfile and related build scripts to fix the
- Re-format GraphRunner
- Add EXIF orientation support to MpImageCreateFromFile and the Python Task API

### MediaPipe Tasks update
This section should highlight the changes that are done specifically for any platform and don't propagate to
other platforms.

#### Android
- Revert Java switch statement syntax update
- Introducing utils to convert BaseOptions <-> proto::BaseOptions.
- Release TextSummarizer and summarization_200m model
- Release TextProofreader and proofread_200m model
- Update TextSummarizer to load from file descriptor
#### iOS
- Add Gecko support to iOS Text Embedding API
- Remove iOS and Android LLM Inference Engine from release
- appId/appVersion/osVersion to common utility.
- Makes InteractiveSegmenter a legacy one, in preparation of releasing v2 / new interface.
- Add Documents path fallback for MPPFileInfo.
- Add TextProofreader and TextSummarizer to MediaPipe Tasks iOS.
- Add AudioToolbox framework to MediaPipeTasksCommon podspec.

#### Javascript
- Add Gecko support to MP Text Embedder for Web
- Add a Module.BAZEL to MediaPipe and migrate JS depdendencies to Aspect JS
- Add dummy logging framework
- Add MediaPipe Tasks Privacy Notice
- Add IIFE bundles for web task modules.
- Export InteractiveSegmenter methods for public visibility
- Allow MP Web LLM Inference to load .litertlm files containing web-formatted LLMs
- MP Web LLM Inference: add new experimental 'disableRewinding' flag for testing long-context support
- Cache running mode in VisionTaskRunner.

#### Python
- Add Gecko support to the Python Text Embedder API
- Remove MediaPipe Python GenAI components f
- TextSummarizer Python API OSS
- TextProofreader Python API OSS
- Expose TextSummarizer and TextProofreader in MediaPipe Python Text API.
- Add missing types and enums to the public Python Text API.

### MediaPipe Dependencies
- Do not load text files from GCS

## v0.10.35 (2026-04-28) - MediaPipe v0.10.35

### Framework and core calculator improvements
- Add histogram information to Tensor::DebugString.
- Bump MediaPipe version to 0.10.35.
- Add missing GL memory barrier in TensorsToSegmentationGlBufferConverter.
- Migrate FromImageCalculator to MediaPipe API3 and add test.
- Add api3::Packet::Share function.
- Remove util/analytics references from GitHub build
- Migrate ToImageCalculator to MediaPipe API3 and add tests.
- Fix -Wthread-safety-analysis warning.
- Allow MP Task files to be use in Vite's workers
- Add save-png-by-path test util function.
- Feat: Add configurable policy for handling empty landmarks in smoothing calculators
- #mediapipe Make GPU service optional in ImageToTensorCalculator for iOS.
- Add Host Platform Web and Host System iOS/Android to logging enums

### MediaPipe Tasks update
This section should highlight the changes that are done specifically for any platform and don't propagate to
other platforms.

#### Android
- Allow users to use NPU acceleration with JIT compilation
- Drop unnecessary `tasks/core` deps

#### iOS
- Change MP Tasks CocoaPods types to Framework

#### Javascript
- Remove references to "subgroups-f16"
- Fix broken exports statement in package.json
- Update MP Tasks GenAI README

#### Python
- Small fixes to blockwise int4 compression calculations in LLM converter
- Allow for overriding apply_srq in LLM Converter
- Small blockwise dequant helper for LLM Converter


### MediaPipe Dependencies
- Update Wasm file hashes and URLs in wasm_files.bzl

## v0.10.33 (2026-03-23) - MediaPipe v0.10.33

### Build changes

- [mediapipe] mark mediapipe/gpu:gl_context incompatible on Windows
- [mediapipe] automatically disable gpu (OpenGL) when building for Windows
- [mediapipe] update visibility of gpu:disable_gpu_flag


### Framework and core calculator improvements
- Add Nearest Neighbor interpolation to WarpAffineCalculator.
- Add a Tensor DebugString() function that formats the tensor numpy-style
- Add a Tensor test util
- Create a C API for Holistic Landmarker
- Remove the CPU-only MediaPipe LLM Inference Engine
- Add an AddMultiStreamCallback version that takes a packet map
- BUILD rule cleanup
- API3 subgraph support
- Adds LogImage for mediapipe::Image
- Add support for FULL_RANGE face detection task
- Ads optional RESET input stream to SpectrogramCalculator
- Simplify TaskRunner initialization by adding an options object
- Plumb the host platform and version for all MP Tasks users.
- MediaPipe: Add ROI validation in ImageToTensorOpenCvConverter

### MediaPipe Tasks update
This section should highlight the changes that are done specifically for any platform and don't propagate to
other platforms.


#### Javascript
- Add tests for full-range face detector model.

#### Python
- Re-adding old sources for Holistic Landmarker
- Re-add Holistic Landmarker to Python
- Small patch in old LLM converter
- Support int2 quantization serialization in MP converter
- Removing temporary flag in MP LLM converter

## v0.10.32 (2026-01-30) - MediaPipe v0.10.32

### Build changes

- Enables ml drift metal delegate as inference calculator backend.
- [mediapipe] support armv7 (32 bit in mediapipe tasks)
- Do not assume canvas is BGRA in RenderToWebGpuCanvas.
- Fix sampling logic in ImageToTensorConverterWebGpu.
- Migrate GlShaderCalculator to API3.
- Migrate gl_shader_calculator_test to use API3 builder.

### Bazel changes

- [mediapipe] verion bump to 0.10.27
- Dawn has completed these changes, so the old paths are no longer used.
- Integrate tiny Juno inpainting graph into GenAiProcessor
- Readme for API3
- Add Resources::ResolveId to enable placeholder resource ids usage.
- Web LLM: a few more small edits for Gemma3n
- Include headers from global namespace
- Add comment to Eigen version in WORKSPACE to remind about synchronization with TensorFlow's Eigen dependency
- Migrating VisibilityCopyCalculator to API3.
- Update from Bazel v6.5.0 to v7.4.1, Protobuf v3.19.1 to v5.28.3. Other packages also update the version within WORKSPACE.
- Fix for weight cache on Windows.
- Create Selfie Segmentation Demo App for LiteRT NPU.
- Add Any support for API3
- Adding AudioBuffer support to web LLM Inference API to handle more audio input types for MM models
- Provide API3 interface for PassThroughCalculator using newly added Any type.
- Migrate MergeCalculator to API3 and newly introduced Any type.
- pybind11 version and py_proto_library macro update.
- Add test for PacketResamplerCalculator with a very short video.
- Initial version of sync function runner for API3
- Fix function runner error reporting.
- [mediapipe] version bump
- Migrate CombinedPredictionCalculator to API3
- Clean up CombinedPredictionCalculator
- Currently, wrapping a TextureFrame in a media-pipe Packet assumes the texture is 8-bit RGBA. This patch allows specifying other texture formats to support common color formats like RGBA16F for HDR content.
- Support timestamp bound updates in function runner.
- Migrate TensorsToSegmentationCalculator to MediaPipe API3.
- Add OneOf support for API3.
- Provide ineference calculator API3 interface.
- Migrate LandmarksToMatrixCalculator to API3
- Update MediaPipe OSS to C++20.
- Add a flag to use `fp16` activations in tests.
- Migrate HandednessToMatrixCalculator to API3.
- Update `xnnpack` version.
- Use the new `xnn_reduce_mean_squared` reduction for the RMSNorm.
- Migrate ImageToTensorCalculator to API3.
- Consistently use MutexLock instead of manual locking/unlocking
- Add ImageProcessingOptions to FaceDetector C API
- Enable node names as compile time strings in OSS.
- Migrate API3 nodes to use compile time string names.
- Fall back to producer context in gpu_buffer.GetReadView<GlTextureView>
- Document api3 GetOrDie / VisitOrDie
- Update log for missing InferenceCalculatorXnnpack registration.
- Add NodeName for non-generic calculator context.
- Add `ImageProcessingOptions` support to FaceLandmarker C API.
- Migrate FaceLandmarker C API to use MediaPipe Image
- Update CombinedPredictionCalculator test to new Runner
- Fix comment about when things die.
- Migrate WebGpuShaderCalculator to MediaPipe API3.
- Proto changes for Tiny Gemma on ml_drift
- Enable API3 FunctionRunner for WEB
- Bump MediaPipe version to 0.10.29.
- Add CompareAndSaveImageOutputDynamic to compare to a dynamic golden instead of a file.
- Bump MediaPipe version to 0.10.30.
- Improve error message of graph validation, to include node calculator name
- Refactor Hand Landmarker C API to use new MP Image
- Add ExternalGlTextureSyncMode to require efficient synchronization.
- Add an option to get a Packet for API3 OneOf input.
- Migrate GpuBufferToImageFrameCalculator to API3.
- Add support to pass a single visitor in VisitOrDie for OneOf inputs.
- Add VisitAsPacketOrDie for OneOf inputs.
- Add MediaPipe Tasks C API for AudioClassifier.
- Ensure correct type of #api3 Packet.
- Support fractional frame rates in MediaPipe video processing.
- Add `ImageProcessingOptions` support to Object Detector C API.
- Add `ImageProcessingOptions` support to MediaPipe PoseLandmarker C API.
- Update object detector to apply ImageFrame C API
- Update pose landmarker to apply ImageFrame C API
- Migrate HandAssociationCalculator to MediaPipe API3.
- Adding ImageProcesingOptions to image_classifier C API.
- Adding ImageProcesingOptions to gesture_recognizer C API.
- Migrate GestureRecognizer (C API) to MpImagePtr
- Migrate ImageFrameToGpuBufferCalculator to API3
- Set default thread_num to  LiteRT::CPU delegate
- Qualify Packet and MakePacket while in mediapipe::api3 namespace to avoid future collisions with api3::Packet / api3::MakePacket
- Remove redundant empty parentheses from lambdas in MediaPipe API3.
- Migrate ImageClassifier (C API) to MpImagePtr.
- Update HandAssociationCalculatorTest to new Runner
- Add `ImageProcessingOptions` support to Image Segmenter C API
- Migrate TensorsToSegmentationCalculator to API3
- Extend lifetime of Image data when MpImage is constructed from an existing MediaPipe Image
- Allow GetData() calls for contiginuous images
- Migrate ImageSegmenter C API to MpImagePtr
- Add GetLabels() to the ImageSegmenter C API
- Generalize UnpackMediaSequenceCalculator's support for encoded media streams.
- Clean up unused variables
- Get rid of _with_options in favor of optional param (C & Python API)
- Migrate Python ImageSegmenter to C API
- Refactor Image Embedder C API to use MpImage
- Simplify FunctionRunner template types.
- Simplify setting options in `HandAssociationCalculatorTest`
- Update MediaPipe C API vision task result callbacks to use `MpStatus`.
- Offer attachments functionality from WebGPU service.
- Enable creation of WebGPU service from explicitly provided wgpu::Device.
- Remove unnecessary checks.
- Enables RGBA input with RGB output.
- Modify the Has{} generic function to check across the different value kinds of
- Refactor TextClassifier C API to use MpStatus.
- Update C API for TextEmbedder to use MpStatus
- Update C API for LanguageDetector to return MpStatus
- Add ImageProcessingOptions support to the MediaPipe ImageEmbedder C API.
- Add ImageProcessingOptions to InteractiveSegmenter C API and migrate to MpImage
- Fix counting pixels with different colors for image comparison tests
- Remove redundant `has_confidence_masks` field from `ImageSegmenterResult`.
- Migrate ImageClassifier C API to use MpStatus.
- Refactor Face Detector C API to use `MpStatus`.
- Update ImageSegmenter C API to return MP Status
- Add support for XNNPACK's SLOW_CONSISTENT_ARITHMETIC flag
- Update ImageEmbedder C API to return MP Status
- Update InteractiveSegmenter C API to return MP Status
- Get rid of _with_options in favor of optional param (C)
- Refactor Gesture Recognizer C API to use MpStatus.
- Update ObjectDetector C API to return MpStatus
- Update HandLandmarker C API to return MP Status
- Update PoseLandmarker C API to return MpStatus
- Fix libmediapipe.so compilation on Windows
- Remove no longer used Image types
- Add side packets support for FunctionRunner.
- Fix documentation.
- Update bot assignees in bot_config.yml.
- Added new R8 mode for GlShaderCalculator
- Add visibility declarations for Windows
- Centralize WebGPU header includes
- Web Solutions: patch for importScripts error with modules in workers
- Small cleanups in MP Task C++ segmentation graphs and ModelTaskGraph
- Update AudioClassifier to retain error messages
- Retain error messages in the Metadata API
- Retain error messages in Language Detector
- Update GestureRecognizer to retain error messages
- Update FaceLandmarker C API to use new naming and return type convention
- Retain error messages in TextEmbedder
- Retain error messages in HandLandmarker
- Retain error messages in ImageEmbedder
- Retain Error Messages in Object Detector
- Small cleanup of scheduler_queue
- Refactor ImageClassifier C API to return error messages.
- Allow empty Tensors in InferenceCalculator
- Update ImageSegmenter to retain error messages
- Retain error messages for PoseLandmarker
- Retain error messages in MpImage
- Allow packing of input streams into empty SequenceExample.
- Retain error messages in Interactive Segmenter
- Replace custom test macros with EXPECT_EQ/ASSERT_EQ
- Add MpErrorFree to avoid missing function on Windows
- Bump MP version to 0.10.31
- Add Kotlin support to MediaPipe OSS repo
- Prepare for functiongemma with MP web LLM API
- Add experimental mapSync support in GetTexture2dData.
- Fail with error at empty decoded image in OpenCVEncodedImageToImageFrameCalculator. Empty decoded image can happen if decoding fails.
- Support option dependencies in mediapipe proto rules
- Fix logging large one-dimensional vertical data
- Adds GPU output support for category masks (copy only, result listener zero-copy case is not addressed yet)
- Add wgpu::ExternalTexture support

### MediaPipe Tasks update
This section should highlight the changes that are done specifically for any platform and don't propagate to
other platforms.


#### Android

- Allow users to configure NPU delegate
- Remove all references to subgraph reshaping which is enabled by default
- Don't swallow Task exceptions for synchronous use cases
- Update score thresholds for Java classifier/embedder tests
- Restore default .so location
- Add RegionOfInterest Proto to Java Protobuf list
- Don't assume images are RGB
- Allow users to configure the NPU delegate

#### iOS

- Expose preferredBackends
- Add stream cancellation support in swift API.
- Add audio modality support to iOS GenAI inference.
- Use wrapper type for RenderData
- Remove MP AudioEmbedder

#### Javascript
- Web LLM: basic .wav audio support for Gemma 3N
- Web LLM: Small fix to multimodal error message strings
- Add a test case to test empty packet inputs.
- Migrate tasks tests to use common image test util.
- Enables GraphRuntimeInfo feature for Emscripten / web targets
- Web LLM API: cancelProcessing() call for early-exiting during decoding. Will not work until next npm update.
- Fix attachments synchronization for non-WEB use cases.
- Fix for MPMask f32-->u8 conversions not always working consistently on all devices. See https://github.com/google-ai-edge/mediapipe/issues/5862.

#### Python

- Add prompt_prefix/suffix_system params to ModelConfig
- Use the C API for TextEmbedder
- Add lora_alpha support in converter
- Migrate FaceDetector to use the C API.
- Add ctypes structures for Landmark and conversion
- Move CategoryC to Category conversion to Category and add Categories conversion
- Update BoundingBoxC and BoundingBox to avoid circular dependency
- Add `MatrixC` ctypes structure for MediaPipe C API
- Create shared conversion functions that can be used by FaceLandmarker
- Migrate FaceLandmarker to use C API
- Move keypoint conversion to Keypoint
- Move DetectionC to Detection conversion to Detection and add test
- Add Landmark.from_ctypes
- Create Python Audio Data wrapper for C API
- Update HandLandmarker to use the C API
- Refactor Python AudioClassifier to use the MediaPipe Tasks C API.
- Handle an unknown category index in the ctypes Category conversion
- Migrate ObjectDetector to use C API
- Migrate PoseLandmarker to use C API
- Create a dispatch library that forwards all C API calls through a single thread
- Migrate GestureRecognizers (Python) to use C API.
- Migrate ImageClassifier to use C API.
- Update MpStatus conversion to use more specific errors
- Ensure all callbacks are invoked on a valid Python thread
- Update Python tasks to use the new AsyncResultDispatcher
- Improve Python ctypes handling of quantized embeddings.
- Migrate MediaPipe Python ImageEmbedder to use the C API
- Migrate Python InteractiveSegmenter to use the MediaPipe Tasks C API.
- Integrate AsyncResultDispatcher into ImageSegmenter.
- Add __del__ methods to Python tasks
- Make LLM Converter testable by moving logic to a class
- Convert LLM Bundler to a C API
- Removed old base class for TextTasks , old base class for AudioTasks , unused TextRecognizer , HolisticLandmarker from Python (for now) , Protobuf dependencies from MediaPipe Python Package  and also Python Tasks runners.
- Replace _pywrap_flatbuffers based Flatbuffers writer with a ctypes-based C API in metadata.py
- Make TextEmbedderResult and GestureRecognizerResult public
- Restore Python 3.9 compatibility for MediaPipe PIP package and allow file loading in OSS
- Retain error messages in Text Classifier Python API
- Update LLM Converter to retain error messages
- Create Python Pipeline for the new PIP package
- Improve Python Wheel on Mac and Windows
- Create MP Tasks DrawingUtils
- Replace the LLM Bundler Proto dependency with a C API
- Re-add GPU support to Python API


### MediaPipe Dependencies

- Fix OpenCV dependency.
- Update WASM files for 0.10.32 release

## v0.10.26 (2025-07-10) - MediaPipe v0.10.26

### 16kb Page Size Support

- All the latest Android packages from Google Maven are now supporting the Android 16kb page size.
- `0.10.26.1` includes also the support for ARM v7 CPUs (32-bit).

### Bazel changes

- mediapipe task version bump
- Introduce new variant of TFLiteModelLoader::LoadFromPath that allows to specify the mmap mode
- Add DefaultSidePacketCalculator unit test under calculators/core
- Add a test parameter to ignore pixels above diff limit
- - Add MaskOverlayCalculator unit test under calculators/image
- Web LLM: make GetSizeInTokens work for first vision-capable models
- Log invalid format in proto lite mode.
- Needed in order to update Dawn to match the standard webgpu.h, here:
- Migrate InverseMatrixCalculator to API3
- Migrate WarpAffineCalculator to #mediapipe-api3 + introduce GetGenericContext
- Migrate landmark_projection_calculator to API3
- Inference calculator refactoring.
- Adding int32-vector output to constant side-packet calculator
- Switch usages of `ShaderModuleWGSLDescriptor` to `ShaderSourceWGSL`
- [mediapipe] update to Android SDK and NDK 26 -> 28
- Migrate world_landmark_projection_calculator to API3
- Migrate landmarks_refinement_calculator to API3
- [mediapipe] upgrade docker image to use JDK 21
- Cleanup projection calculator from reliance on C++ variable scoping and add a new test case.
- Update std::once_flag/call_once to absl::once_flag/call_once in OSS version

### MediaPipe Tasks update
This section should highlight the changes that are done specifically for any platform and don't propagate to
other platforms.

- Add audio modality support to LLM Inference API.
- [mediapipe] update opencv dependency

