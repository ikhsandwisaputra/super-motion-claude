---
source: https://docs.lottiefiles.com/en/runtimes/distributions.md
title: ""
fetched: 2026-10-28
---

# Distributions
High-performance dotLottie players for web, mobile, and desktop platforms.

# Distributions

dotLottie players are available for every major platform. Each distribution shares the same core capabilities — playback control, theming, slots, and state machines — and follows the same documentation structure.

## Web

| Player                                                    | Package                         | Use when                              |
| --------------------------------------------------------- | ------------------------------- | ------------------------------------- |
| [JavaScript](/en/runtimes/distributions/js)               | `@lottiefiles/dotlottie-web`    | Vanilla JS, no framework              |
| [React](/en/runtimes/distributions/react)                 | `@lottiefiles/dotlottie-react`  | React applications                    |
| [Vue](/en/runtimes/distributions/vue)                     | `@lottiefiles/dotlottie-vue`    | Vue 3 applications                    |
| [Svelte](/en/runtimes/distributions/svelte)               | `@lottiefiles/dotlottie-svelte` | Svelte / SvelteKit applications       |
| [Web Component](/en/runtimes/distributions/web-component) | `@lottiefiles/dotlottie-wc`     | Any HTML page, no build step required |

## Mobile & Desktop

| Player                                                  | Package                               | Use when                                |
| ------------------------------------------------------- | ------------------------------------- | --------------------------------------- |
| [Android](/en/runtimes/distributions/android)           | via Gradle / Maven Central            | Native Android (Jetpack Compose or XML) |
| [iOS](/en/runtimes/distributions/ios)                   | via Swift Package Manager             | Native iOS / macOS (SwiftUI or UIKit)   |
| [Flutter](/en/runtimes/distributions/flutter)           | `dotlottie_flutter`                   | Cross-platform Flutter apps             |
| [React Native](/en/runtimes/distributions/react-native) | `@lottiefiles/dotlottie-react-native` | Cross-platform React Native apps        |

## Native

| Player                                              | Package           | Use when                                                                                               |
| --------------------------------------------------- | ----------------- | ------------------------------------------------------------------------------------------------------ |
| [Native (C/C++)](/en/runtimes/distributions/native) | built from source | No prepackaged player fits — game engines, embedded Linux, desktop apps, or your own language bindings |

The native runtime is the C API of `dotlottie-rs`, the Rust core that every other distribution on this page is built on. You compile it for the architectures you ship and drive it from C or C++.

## Documentation structure

Each distribution organises its pages using the [Diataxis](https://diataxis.fr) framework:

- **Tutorials** — Step-by-step installation and first-animation walkthrough
- **How-to Guides** — Task-oriented instructions for specific goals
- **Explanation** — Conceptual background (state machines, core concepts)
- **Reference** — Complete API, props, and attributes documentation
