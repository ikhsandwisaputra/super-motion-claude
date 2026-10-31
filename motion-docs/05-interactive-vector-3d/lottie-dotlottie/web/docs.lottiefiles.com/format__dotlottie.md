---
source: https://docs.lottiefiles.com/en/format/dotlottie.md
title: ""
fetched: 2026-10-28
---

# .lottie Format
Overview of the dotLottie container format

# .lottie Format

dotLottie is an open-source file format that aggregates one or more Lottie animations and their associated resources into a single compressed file, with support for theming and interactivity.

- **Extension**: `.lottie`
- **MIME type**: `application/zip+dotlottie`
- **Container**: ZIP archive with Deflate compression

## Why dotLottie?

dotLottie was introduced to solve several challenges that arise when working with Lottie animations at scale:

### Identity

Changing the file extension from `.json` to `.lottie` removes ambiguity and makes it easier for designers and developers to identify animation files. The format also includes a `manifest.json` for metadata, which enables OS-level tools to preview and search animations.

### Compression

Lottie animations that reference image assets have historically stored them as Base64-encoded Data URIs inside the JSON, significantly increasing file size. dotLottie archives all assets using ZIP Deflate compression, dramatically reducing file size compared to inlined Data URIs.

### Bundling

Storing, distributing, and consuming a Lottie animation together with its dependent assets is difficult when they are separate files. dotLottie packages animations and assets together, making distribution simpler and more reliable.

### Multi-animation

A single `.lottie` file can contain multiple animations. Animations are decompressed on demand, conserving CPU resources. This is particularly useful for UI kits, icon sets, or state-based animations.

### Theming

Bundle multiple themes within a single `.lottie` file to customize animations at runtime — switching between light/dark modes, brand colors, or any other property variation without modifying the underlying animation.

### Interactivity

Embed state machine definitions inside your `.lottie` file to create interactive animations that respond to user events such as hover, click, or custom triggers — all without writing animation logic in application code.

## File Structure

```
my-animation.lottie (ZIP archive)
├── manifest.json       # Required: metadata and configuration
├── a/                  # Required: Lottie JSON animations
│   └── animation.json
├── i/                  # Optional: image assets
├── t/                  # Optional: theme files
├── s/                  # Optional: state machine files
└── f/                  # Optional: font assets
```

## Learn More

- [Why dotLottie](/format/dotlottie/why-dotlottie) — Detailed comparison with Lottie JSON
- [Format Structure](/format/dotlottie/structure) — Manifest properties and file organization
- [Format Specification](/format/dotlottie/specification) — Complete technical specification
- [Theming](/format/dotlottie/interactivity/theming) — Dynamic theming with slot-based rules
- [State Machines](/format/dotlottie/interactivity/state-machines) — Interactive animations
