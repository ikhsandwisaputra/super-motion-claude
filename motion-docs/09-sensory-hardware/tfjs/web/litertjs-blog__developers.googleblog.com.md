---
source: https://developers.googleblog.com/en/litertjs-googles-high-performance-web-ai-inference/
title: "LiteRT.js, Google's high performance Web AI Inference\n            \n            \n            - Google Developers Blog"
fetched: 2026-10-28
---

[![Google for Developers](https://storage.googleapis.com/gweb-developer-goog-blog-cms-assets/site/20260817-205152/images/g-dev.svg)](https://developers.google.com/)

# LiteRT.js, Google's high performance Web AI Inference

JULY 9, 2026

[Ping Yu](https://developers.googleblog.com/en/search/?author=Ping+Yu)
Staff Software Engineer

[Marko Ristić](https://developers.googleblog.com/en/search/?author=Marko+Risti%C4%87)
Software Engineer

[Matthew Soulanille](https://developers.googleblog.com/en/search/?author=Matthew+Soulanille)
Software Engineer

[Chintan Parikh](https://developers.googleblog.com/en/search/?author=Chintan+Parikh)
Sr. Product Manager

* [Facebook](https://www.facebook.com/sharer/sharer.php?u={url} "Share on Facebook")
* [Twitter](https://twitter.com/intent/tweet?text={url} "Share on Twitter")
* [LinkedIn](https://www.linkedin.com/shareArticle?url={url}&mini=true "Share on LinkedIn")
* [Mail](mailto:name@example.com?subject=Check%20out%20this%20site&body=Check%20out%20{url} "Send via Email")

![banner3](https://storage.googleapis.com/gweb-developer-goog-blog-assets/images/banner3.original.png)

We are excited to announce [LiteRT.js](https://developers.google.com/edge/litert/web), a JavaScript binding of LiteRT for running AI directly inside the web browser. By bringing the trusted on-device inference library [LiteRT](https://ai.google.dev/edge/litert) to the web, web developers can now run ML and AI models with maximum performance entirely locally. This means enhanced user privacy, zero server costs, and ultra-low latency for real-time experiences. For developers with existing .tflite models, LiteRT.js makes deployment to mobile and desktop web browsers smoother than ever, serving as a powerful evolution from TensorFlow.js for executing .tflite models.

While prior web AI solutions like TensorFlow.js relied on less performant JavaScript-based kernels, we are now making our native, cross-platform runtime with all its optimizations directly available to web developers through WebAssembly. LiteRT.js unlocks impressive performance by running your .tflite models directly in the browser leveraging the state-of-the-art hardware acceleration of LiteRT, including [XNNPACK](https://github.com/google/XNNPACK) for CPU, [ML Drift](https://developers.googleblog.com/litert-maximum-performance-simplified/#:~:text=MLDrift%3A%20Best%20GPU%20Acceleration%20Yet) for GPU, and the upcoming WebNN for NPUs.

Our initial release provides all the tools needed to get started, including the new [LiteRT.js npm package](https://www.npmjs.com/package/@litertjs/core) and a [collection of demos](https://codepen.io/collection/PoJBoq) showcasing real-world implementation.

[![

Sorry, your browser doesn't support playback for this video

](https://storage.googleapis.com/gweb-developer-goog-blog-assets/original_videos/wagtailvideo-yy4ia8s0_thumb.jpg)](https://storage.googleapis.com/gweb-developer-goog-blog-assets/original_videos/demo-jason-vectorsearch_2.mp4)
[Vector search right in the browser, powered by LiteRT.js and EmbeddingGemma. Try it here.](https://codepen.io/jasonmayes/pen/JoKMBmq)

## **How LiteRT.js benefits web developers**

With LiteRT.js, web developers can integrate models into their apps written in JavaScript or TypeScript to handle complex tasks like text generation, object detection, and audio processing entirely client-side. As LiteRT.js shares a unified cross-platform stack with LiteRT, your web applications automatically benefit from the latest performance upgrades, quantization improvements, and hardware optimizations developed for Android, iOS, and desktop.

By leveraging LiteRT's lowering flow and runtime, you get simple conversion of models from a variety of Python ML frameworks and native hardware acceleration across all major accelerators (CPU / GPU / NPU). To help you unlock these AI capabilities easily, here are the main highlights of LiteRT.js:

**1.PyTorch conversion & tailored quantization**

With [LiteRT Torch](https://github.com/google-ai-edge/ai-edge-torch), PyTorch models can be converted in a single step, making them instantly ready to leverage advanced browser-based hardware acceleration. Get started today by following the [LiteRT Torch guide](https://github.com/google-ai-edge/ai-edge-torch/blob/main/docs/pytorch_converter/getting_started.ipynb).

For further optimization, [AI Edge Quantizer](https://github.com/google-ai-edge/ai-edge-quantizer) allows you to configure tailored quantization schemes across different model layers. This achieves substantial size reductions and performance gains while preserving overall model quality. Explore the [quantization colab](https://github.com/google-ai-edge/ai-edge-quantizer/blob/main/colabs/selective_quantization_isnet.ipynb) to see this in action.

**2.Native hardware acceleration across CPU, GPU, and NPU**

LiteRT.js enables high-performance AI inference for a diverse variety of hardware backends.

* **CPU**: utilizes [**XNNPACK**](https://github.com/google/XNNPACK), Google's highly optimized library for on-device CPU acceleration, providing robust multi-thread support and a relaxed SIMD build for enhanced performance.
* **GPU**: powered by [**ML Drift**](https://developers.googleblog.com/litert-maximum-performance-simplified/#:~:text=MLDrift%3A%20Best%20GPU%20Acceleration%20Yet), Google's leading solution for on-device GPU acceleration. LiteRT.js leverages WebGPU to enable state-of-the-art GPU acceleration on the web.
* **NPU**: harnesses the emerging [**WebNN API**](https://webmachinelearning.github.io/webnn/) (currently experimental in Chrome and Edge) to target dedicated NPUs for power-efficient, ultra low-latency inference.

Ready to accelerate your web applications? Dive into the [LiteRT.js documentation](https://developers.google.com/edge/litert/web/get_started) to get started.

![diagram1](https://storage.googleapis.com/gweb-developer-goog-blog-assets/images/diagram1_uua0KLc.original.png)

LiteRT.js Architecture Overview

## **Performance and real-world impact**

To demonstrate the real-world impact of the unified runtime and hardware-accelerated backends, we evaluated LiteRT.js against existing web solutions. Across classical computer vision and audio processing models, LiteRT.js delivers significant speedups—outperforming other web runtimes by up to 3x across both CPU and GPU inference.

![Data image 1600x900](https://storage.googleapis.com/gweb-developer-goog-blog-assets/images/Data_image_1600x900.original.png)

Note: Performance benchmarks conducted on a 2024 Apple MacBook Pro with M4 Apple Silicon in a controlled browser environment. Individual user performance may vary based on local GPU capabilities, thermal throttling, and browser driver optimization.

To ground these claims in real-world efficiency, we benchmarked popular AI models using LiteRT.js across three distinct web execution backends: **CPU (via XNNPACK)**, **WebGPU**, and **WebNN (via Apple CoreML).** For demanding real-time applications like object tracking, audio transcription, or image manipulation, leveraging the GPU or NPU via WebGPU or WebNN delivers 5-60x speedup compared to standard CPU execution, ensuring lower latency without compromising performance.

![Classical model perf (1)](https://storage.googleapis.com/gweb-developer-goog-blog-assets/images/Classical_model_perf_1.original.png)

Note: Performance benchmarks conducted on a 2024 Apple MacBook Pro with M4 Apple Silicon in a controlled browser environment. Individual user performance may vary based on local GPU capabilities, thermal throttling, and browser driver optimization.

## **See it in action**

To see LiteRT.js in action, explore our live implementations. LiteRT.js demo source code is available on the [LiteRT GitHub repository](https://github.com/google-ai-edge/LiteRT/tree/main/litert/js) and via [Ultralytics](https://github.com/ultralytics/ultralytics).

### **LiteRT Ultralytics YOLO integration**

Ultralytics is an artificial intelligence company that specializes in building computer vision tools and models. It is best known as the creator of the YOLO (You Only Look Once) framework, family of real-time object detection and image segmentation models.

We are excited to share [official LiteRT export](https://docs.ultralytics.com/integrations/litert) support built directly into the Ultralytics Python package. Easily deploy [Ultralytics YOLO](https://www.ultralytics.com/yolo/yolo26?utm_source=googlelitert&utm_medium=referral&utm_campaign=blog&utm_content=yolo26) models across mobile, edge, and browsers—and go from compilation to runtime in just a few lines of code.

[![

Sorry, your browser doesn't support playback for this video

](https://storage.googleapis.com/gweb-developer-goog-blog-assets/original_videos/wagtailvideo-ubu1jv9__thumb.jpg)](https://storage.googleapis.com/gweb-developer-goog-blog-assets/original_videos/Soccer.mp4)

Demo: YOLO26, family of real-time vision models

### **Depth Estimation**

[Depth Anything - monocular depth estimation](https://goo.gle/depth3d) showcases how to transform a standard webcam feed into an interactive 3D point cloud in real-time. Powered by LiteRT.js via WebGPU, it uses the Depth-Anything-V2 model to instantly calculate depth data and map video pixels into a responsive 3D space.

[![

Sorry, your browser doesn't support playback for this video

](https://storage.googleapis.com/gweb-developer-goog-blog-assets/original_videos/wagtailvideo-rb0mrtrd_thumb.jpg)](https://storage.googleapis.com/gweb-developer-goog-blog-assets/original_videos/depth.mp4)

Demo: Monocular depth estimation using DepthAnything and WebGPU.

### **Image Upscaling**

Upscale images by 4x in the browser using the [Real-ESRGAN](https://github.com/xinntao/Real-ESRGAN) model with LiteRT.js, which works by upscaling 128x128 pixel patches to 512x512 which are then reassembled into the final image.

[![

Sorry, your browser doesn't support playback for this video

](https://storage.googleapis.com/gweb-developer-goog-blog-assets/original_videos/wagtailvideo-q6s862bu_thumb.jpg)](https://storage.googleapis.com/gweb-developer-goog-blog-assets/original_videos/dog_upscale.mp4)
[Demo: An image of a dog is placed in an image upscaler webpage, where it is upscaled to 4x its size. Image credit](https://en.wikipedia.org/wiki/Dog#/media/File:Brooks_Chase_Ranger_of_Jolly_Dogs_Jack_Russell.jpg)

## **Get started with LiteRT.js**

Integrating LiteRT.js into your development workflow is straightforward, whether you’re launching a fresh implementation or migrating an existing application to our high-performance runtime. LiteRT.js abstracts the complexities of hardware-level optimization, enabling you to deliver responsive, privacy-focused experiences without the overhead of manual platform tuning.

The following snippet highlights the streamlined process for initializing, compiling, and running a `.tflite` model with GPU acceleration. Using clean, modern JavaScript, you can load your model, feed input tensors, and capture high-speed inference results in real-time. For more detailed instructions, demos, and guidance, please refer to our documentation [here](https://developers.google.com/edge/litert/web/get_started).

```javascript
import { loadLiteRt, loadAndCompile, Tensor } from '@litertjs/core';

await loadLiteRt('path/to/wasm/directory/');

const model = await loadAndCompile('path/to/your/model.tflite',{ accelerator: webgpu });

const inputTypedArray = new Float32Array(1 * 3 * 244 * 244);

const inputTensor = new Tensor(inputTypedArray, [1, 3, 244, 244]);

const results = await model.run(inputTensor);

// results is a Tensor stored on GPU. To move it to CPU & convert to a typedArray we use
const resultArray = (await results[0].moveTo('wasm')).toTypedArray();
```

JavaScript

Copied

## **What’s next**

We are committed to continually expanding LiteRT.js performance, model coverage, and developer tooling. Looking ahead, our development roadmap centers on advancing WebNN integration for native NPU performance and delivering highly optimized support for on-device generative AI.

* **Models:** Find pretrained .tflite models on [Kaggle](https://www.kaggle.com/models?framework=tfLite) or [LiteRT Hugging Face Community](https://huggingface.co/collections/litert-community/web-classical-models)**.**
* **Start building:** Explore the [LiteRT.js Documentation](https://ai.google.dev/edge/litert/web).
* **Get the package:** Download [@litertjs/core on npm](https://www.npmjs.com/package/@litertjs/core).
* **Contribute:** Share your feedback, report bugs, or contribute on our [GitHub issues page](https://github.com/google-ai-edge/LiteRT/issues).
* **LLM support:** [LiteRT-LM.js,](https://github.com/google-ai-edge/LiteRT-LM) adds browser support for LLMs via our [JavaScript API](https://ai.google.dev/edge/litert-lm/js).
* **TensorFlow.js users**: See [here](https://developers.google.com/edge/litert/web#tensorflowjs) for how to leverage LiteRT.js for model inference in existing TensorFlow.js pipelines.

## Acknowledgements

Ultralytics, for providing YOLO26 media and performance data. Jason Mayes for LiteRT.js demos.

posted in:

* [Web](https://developers.googleblog.com/en/search/?technology_categories=Web)
* [AI](https://developers.googleblog.com/en/search/?technology_categories=AI)
* [Announcements](https://developers.googleblog.com/en/search/?content_type_categories=Announcements)
* [Learn](https://developers.googleblog.com/en/search/?content_type_categories=Learn)
* [Influence](https://developers.googleblog.com/en/search/?tag=Influence)
* [WebAI](https://developers.googleblog.com/en/search/?tag=WebAI)

Previous

Next

Related Posts

[![Preview, edit, and collaborate on markdown (.md) files natively in Google Docs and Drive](https://storage.googleapis.com/gweb-developer-goog-blog-assets/images/image_11_a479DBi.2e16d0ba.fill-800x400.png)

Web
Announcements

Preview, edit, and collaborate on markdown (.md) files natively in Google Docs and Drive

OCT. 26, 2026](https://developers.googleblog.com/en/preview-edit-and-collaborate-on-markdown-md-files-natively-in-google-docs-and-drive/)
[![Fast, reliable A2UI, with swappable inference formats](https://storage.googleapis.com/gweb-developer-goog-blog-assets/images/00-header-1600x900_1.2e16d0ba.fill-800x400.png)

Mobile
Web
Tutorials
How-To Guides

Fast, reliable A2UI, with swappable inference formats

OCT. 27, 2026](https://developers.googleblog.com/en/fast-reliable-a2ui/)
[![Building Conversational Commerce with Multi-Agent Swarms on GCP: A Working Prototype](https://storage.googleapis.com/gweb-developer-goog-blog-assets/images/cui_banner_light_1600x900_17912945.2e16d0ba.fill-800x400.jpg)

Mobile
Web
How-To Guides
Problem-Solving

Building Conversational Commerce with Multi-Agent Swarms on GCP: A Working Prototype

OCT. 27, 2026](https://developers.googleblog.com/en/building-conversational-commerce-with-multi-agent-swarms-on-gcp-a-working-prototype/)
