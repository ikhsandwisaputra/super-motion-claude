---
source: https://docs.lottiefiles.com/en/runtimes.md
title: ""
fetched: 2026-10-28
---

# dotLottie Players
High-performance Lottie players for web, mobile, and desktop platforms

## Key Features Across All Players

<List type="check">
  <ListItem>**Consistent Rendering** - Powered by ThorVG for identical output everywhere</ListItem>
  <ListItem>**Full Format Support** - Both Lottie JSON and .lottie formats</ListItem>
  <ListItem>**Advanced Features** - State machines, theming, multi-animation support</ListItem>
  <ListItem>**Hardware Acceleration** - GPU-optimized for smooth 60fps animations</ListItem>
  <ListItem>**Production Ready** - Used by thousands of apps in production</ListItem>
  <ListItem>**Open Source** - MIT licensed, community-driven development</ListItem>
</List>

## Distributions

<Grid columns="2">
  <Feature title="React" icon="ph:atom-duotone" href="/en/runtimes/distributions/react/v0.x">
    Official React component for dotLottie animations with hooks support and TypeScript types.
  </Feature>

  <Feature title="JavaScript" icon="ph:code-duotone" href="/en/runtimes/distributions/js/v0.x">
    Vanilla JavaScript player for framework-agnostic integration in any web project.
  </Feature>

  <Feature title="Vue" icon="ph:triangle-duotone" href="/en/runtimes/distributions/vue/v0.x">
    Native Vue component with Composition API support for reactive animation control.
  </Feature>

  <Feature title="Svelte" icon="ph:package-duotone" href="/en/runtimes/distributions/svelte/v0.x">
    Lightweight Svelte component with full reactivity and minimal bundle size.
  </Feature>

  <Feature title="Web Component" icon="ph:browser-duotone" href="/en/runtimes/distributions/web-component/v0.x">
    Standard Web Component for use in any framework or vanilla HTML/CSS/JS.
  </Feature>

  <Feature title="React Native" icon="ph:device-mobile-duotone" href="/en/runtimes/distributions/react-native/v0.x">
    Cross-platform component for iOS and Android React Native applications.
  </Feature>

  <Feature title="Flutter" icon="ph:device-mobile-duotone" href="/en/runtimes/distributions/flutter/v0.x">
    Cross-platform component for iOS, Android and Web Flutter applications.
  </Feature>

  <Feature title="Android" icon="ph:android-logo-duotone" href="/en/runtimes/distributions/android/v0.x">
    Native Android library with Kotlin support for high-performance mobile animations.
  </Feature>

  <Feature title="iOS" icon="ph:apple-logo-duotone" href="/en/runtimes/distributions/ios/v0.x">
    Native iOS framework with Swift support for seamless integration in Apple apps.
  </Feature>

  <Feature title="Native (C/C++)" icon="ph:file-c-duotone" href="/en/runtimes/distributions/native/v0.x">
    The C API of the Rust core, built from source for any supported architecture.
  </Feature>
</Grid>

## Player Comparison

<Callout type="info" title="Need help choosing?">
  All players share the same core features. Choose based on your framework/platform, not feature set.
</Callout>

### Web Players

| Feature                | React | Vue  | Svelte | JavaScript | Web Component |
| ---------------------- | ----- | ---- | ------ | ---------- | ------------- |
| Bundle Size (min+gzip) | 45KB  | 42KB | 38KB   | 35KB       | 37KB          |
| Framework Integration  | ✓     | ✓    | ✓      | N/A        | Universal     |
| TypeScript Support     | ✓     | ✓    | ✓      | ✓          | ✓             |
| State Machines         | ✓     | ✓    | ✓      | ✓          | ✓             |
| Dynamic Theming        | ✓     | ✓    | ✓      | ✓          | ✓             |
| Web Worker Support     | ✓     | ✓    | ✓      | ✓          | ✓             |
| SSR Compatible         | ✓     | ✓    | ✓      | ✓          | ⚠️            |

### Mobile Players

| Feature            | React Native | iOS | Android | Flutter |
| ------------------ | ------------ | --- | ------- | ------- |
| Native Performance | ✓            | ✓   | ✓       | ✓       |
| State Machines     | ✓            | ✓   | ✓       | ✓       |
| Dynamic Theming    | ✓            | ✓   | ✓       | ✓       |
| Multi-Animation    | ✓            | ✓   | ✓       | ✓       |
| Gesture Support    | ✓            | ✓   | ✓       | ✓       |

⚠️ = Requires client-side hydration
