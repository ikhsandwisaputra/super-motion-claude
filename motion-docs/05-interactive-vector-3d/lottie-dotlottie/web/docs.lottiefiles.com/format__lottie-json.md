---
source: https://docs.lottiefiles.com/en/format/lottie-json.md
title: ""
fetched: 2026-10-28
---

# Lottie JSON
Overview of the Lottie JSON animation format

# Lottie JSON

Lottie JSON is the original Lottie animation format. It represents animations as a plain JSON file describing vector graphics and their motion over time, with support for image assets and After Effects expressions.

- **Extension**: `.json`
- **MIME type**: `application/json`

## Background

The Lottie format was created by Hernan Torrisi via his Bodymovin plugin for Adobe After Effects. The plugin walks through an After Effects composition and transforms the animation into a JSON structure. Airbnb engineers subsequently built iOS and Android renderers (naming them "Lottie"), and the format saw rapid adoption across the industry.

## Capabilities

A Lottie JSON file supports:

- Vector shapes (paths, ellipses, rectangles, stars)
- Raster image assets (embedded as Data URIs or referenced by path)
- Text layers with custom fonts
- Masks and mattes
- Effects and After Effects expressions
- Pre-compositions (nested animations)

## Limitations vs dotLottie

| Limitation                       | Resolution                                   |
| -------------------------------- | -------------------------------------------- |
| Single animation per file        | Use dotLottie for multi-animation bundles    |
| No built-in compression          | Use dotLottie for smaller file sizes         |
| Image assets stored as Data URIs | dotLottie extracts assets into `i/`          |
| No theming or interactivity      | Use dotLottie with themes and state machines |

## Learn More

- [Lottie JSON Specification](/format/lottie-json/specification) — Complete technical specification for the format
- [dotLottie Format](/format/dotlottie) — The modern container format built on top of Lottie JSON
- [Official Lottie Docs](https://lottiefiles.github.io/lottie-docs/) — Community specification
