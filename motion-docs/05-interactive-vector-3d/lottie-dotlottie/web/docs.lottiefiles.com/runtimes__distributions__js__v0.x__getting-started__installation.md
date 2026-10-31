---
source: https://docs.lottiefiles.com/en/runtimes/distributions/js/v0.x/getting-started/installation.md
title: ""
fetched: 2026-10-28
---

# Install the dotLottie web player
Add @lottiefiles/dotlottie-web to your project with npm, yarn, or pnpm, or load the player directly from a CDN without a build step.

To render Lottie animations in your web project, add the `@lottiefiles/dotlottie-web` package with your package manager, or load it from a CDN if you don't use a build step.

## Install with a package manager

If your project uses a bundler (Webpack, Vite, Parcel, and similar), install the package:

<PackageInstall pkg="@lottiefiles/dotlottie-web" />

Then import the player in your JavaScript or TypeScript files:

```javascript
import { DotLottie } from "@lottiefiles/dotlottie-web";
```

## Load from a CDN

If you don't have a build system, or you want to prototype quickly, import the player directly from a CDN inside a module script:

```html
<script type="module">
  import { DotLottie } from "https://cdn.jsdelivr.net/npm/@lottiefiles/dotlottie-web/+esm";

  // You can now use new DotLottie(...)
</script>
```

## Using a framework?

If you work with React, Vue, Svelte, or Web Components, use the dedicated wrapper package for your framework instead of the core player. The [Quick Start Guide](/en/runtimes/overview/quick-start) links to the installation instructions for each wrapper.

## Next steps

- Follow the [first animation tutorial](/en/runtimes/distributions/js/v0.x/getting-started/basic-usage) to get an animation playing
- Browse the [API Reference](/en/runtimes/distributions/js/v0.x/api/reference) for all configuration options
