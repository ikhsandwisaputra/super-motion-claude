---
source: https://docs.lottiefiles.com/en/format.md
title: ""
fetched: 2026-10-28
---

# File Format
Quick comparison and guidance on Lottie formats

# File Format

LottieFiles supports two file formats for working with Lottie animations: the original **Lottie JSON** format and the modern **dotLottie** (`.lottie`) container format.

## Lottie JSON

Lottie JSON is the original format invented by Hernan Torrisi via his Bodymovin plugin for Adobe After Effects. It is a plain JSON file that describes an animation's elements and motion, with support for image assets and expressions.

- **Extension**: `.json`
- **MIME type**: `application/json`
- **Strengths**: Universal support, human-readable, easy to inspect

The Lottie JSON format is supported by virtually every Lottie player and tool, making it the most portable choice.

## dotLottie

dotLottie (`.lottie`) is a modern container format that packages one or more Lottie JSON animations along with their assets, themes, and state machines into a single compressed file. It is a ZIP archive identified by the `.lottie` file extension.

- **Extension**: `.lottie`
- **MIME type**: `application/zip+dotlottie`
- **Strengths**: Smaller file size, multi-animation support, theming, interactivity

## Format Comparison

| Feature                  | Lottie JSON       | dotLottie (.lottie)    |
| ------------------------ | ----------------- | ---------------------- |
| File type                | Plain JSON        | ZIP archive            |
| Multiple animations      | No                | Yes                    |
| Bundled image assets     | As Data URIs only | Extracted into `i/`    |
| Compression              | No                | Yes (Deflate)          |
| Theming                  | No                | Yes                    |
| Interactivity            | No                | Yes (state machines)   |
| Human readable           | Yes               | No (binary ZIP)        |
| Universal player support | Yes               | dotLottie players only |

## When to Use Each Format

**Use Lottie JSON when:**

- You need maximum player compatibility
- You are working with a tool or platform that doesn't yet support dotLottie
- You want to inspect or edit the animation file directly

**Use dotLottie when:**

- You want smaller file sizes (especially with image assets)
- You need to bundle multiple animations in one file
- You want to use theming or state machine interactivity
- You are using a dotLottie-compatible player

## Converting Between Formats

You can convert Lottie JSON files to dotLottie using:

- The [dotlottie-io](https://github.com/LottieFiles/dotlottie-io) library
- The [dotlottie-js](https://github.com/LottieFiles/dotlottie-js) SDK (to be deprecated in favor of dotlottie-io)
- The [LottieFiles platform](https://lottiefiles.com)

## Learn More

- [dotLottie Format](/en/format/dotlottie/structure) — Overview of the `.lottie` container
- [Lottie JSON Format](/en/format/lottie-json/specification) — Overview of the JSON format
