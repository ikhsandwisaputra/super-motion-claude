---
source: https://docs.lottiefiles.com/en/runtimes/distributions/js/v0.x/advanced.md
title: ""
fetched: 2026-10-28
---

# Advanced Features
Advanced dotLottie web player techniques - offload rendering to a Web Worker, render on the GPU, and tune render configuration for maximum performance.

Guides for getting the most out of the web player in demanding scenarios.

## Web Worker rendering

Offload animation rendering to a dedicated Web Worker to free the main thread.

[Render animations in a web worker →](/en/runtimes/distributions/js/v0.x/advanced/web-worker)

## GPU rendering

Hand rasterization to the GPU with the WebGL2 or WebGPU backend, and fall back cleanly when neither is available.

[Render on the GPU with WebGL or WebGPU →](/en/runtimes/distributions/js/v0.x/advanced/gpu-rendering)

## Performance optimization

Preload the WASM engine, tune render configuration, manage memory, and lazy-load animations.

[Optimize performance →](/en/runtimes/distributions/js/v0.x/advanced/performance)
