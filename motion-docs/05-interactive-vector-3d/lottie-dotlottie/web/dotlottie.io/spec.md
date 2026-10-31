---
source: https://dotlottie.io/spec/
title: "Specification | dotLottie"
fetched: 2026-10-28
---

# [#](https://dotlottie.io/spec/#specification) Specification

Welcome to the official documentation for the dotLottie Animation Format.

This manual contains formal specification and documentation for the dotLottie file format, offering insights into its structure and features.

The main target audience for this manual are developers that want to create tools within the dotLottie ecosystem as it provides details about its internals.

The dotLottie specification is available in two versions:

v2.0 Latest Â· Recommended

Designed to support more features and capabilities for production workflows.

[Theming](https://dotlottie.io/spec/2.0/#themes)[State machines](https://dotlottie.io/spec/2.0/#state-machines)[Fonts](https://dotlottie.io/spec/2.0/#assets)

[Read the v2.0 spec
â](https://dotlottie.io/spec/2.0/)

v1.0 Widely supported

Features commonly supported across most tools and players.

CompressionMultiple animationsImage assets

[Read the v1.0 spec
â](https://dotlottie.io/spec/1.0/)

Not sure which? Start with **v2.0** â recommended for new projects.

## [#](https://dotlottie.io/spec/#what-s-new-in-v2-0) What's new in v2.0

**Breaking Changes:**

* Updated dotLottie ZIP structure for smaller file size:
  + `animations/` folder is now `a/`
  + `images/` folder is now `i/`
* Removed animation playback controls from `manifest.json`
* Added `initial` property to `manifest.json` to specify the initial animation/state machine to play

**New Features:**

* [Theming support](https://dotlottie.io/spec/2.0/#themes)
* [State machine support](https://dotlottie.io/spec/2.0/#state-machines)

â
[Introduction](https://dotlottie.io/intro/) [Tools](https://dotlottie.io/tools/)
â
