---
source: https://docs.lottiefiles.com/en/runtimes/overview/features.md
title: ""
fetched: 2026-10-28
---

# Features and Capabilities
Explore the rich features of dotLottie Player. Including animation loading, playback control, layout options, multi-animation support, and theming.

# Features & Capabilities

dotLottie Player provides a rich set of features for working with animations across all supported platforms. Here's a comprehensive overview of what you can do with our players.

## Core Features

### Animation Loading

- Support for both `.lottie` and `.json` animation files
- Load animations from URLs or local assets
- Load animations from raw data or JSON strings
- Dynamic loading and switching of animations

### Playback Control

- Basic controls: play, pause, stop
- Speed control with customizable playback rates
- Loop control and loop count tracking
- Frame-by-frame navigation
- Segment playback for partial animation
- Multiple playback modes:
  - Forward
  - Reverse
  - Bounce
  - Bounce-reverse

### Layout & Rendering

- Flexible layout options with different fit modes:
  - Contain
  - Cover
  - Fill
  - Fit-width
  - Fit-height
  - None
- Customizable alignment
- Background color support
- Frame interpolation for smooth playback
- Hardware-accelerated rendering

## Advanced Features

### Multi-Animation Support

- Load multiple animations in a single `.lottie` file
- Switch between animations dynamically
- Manage animation collections efficiently

### Theming System

- Runtime theme switching
- Support for multiple themes per animation
- Dynamic color and style updates
- Theme data management

### State Machines

> ⚠️ Note: State machine support is currently in early development. Features and APIs may vary by platform.

- Built-in state machine support for interactive animations
  - Web platforms: Full state machine implementation
    - Event-driven animation control
    - Complex state management
    - Transition and guard system
    - Context variables
  - Mobile platforms: Platform-specific implementations
    - Native interaction patterns
    - Platform-optimized event handling
- Common capabilities across platforms:
  - State-based animation control
  - Event-driven transitions
  - Playback state management

### Performance Optimization

- Web Worker support for improved performance
- Frame interpolation control
- Configurable render settings
- Automatic performance optimization

## Platform-Specific Features

### Web

- Web Worker support for offloading rendering
- Framework-specific components
- TypeScript support
- Modern bundler compatibility

### Mobile

- Native platform rendering
- Platform-specific optimization
- Native gesture support
- Background playback control

## Framework Integration

Each framework integration maintains these core features while providing framework-specific benefits:

### React

- React component lifecycle integration
- React-specific event handling
- Hook-based control API
- TypeScript support

### Vue

- Vue component lifecycle integration
- Vue-specific event handling
- Reactive property support
- Vue 3 composition API support

### Svelte

- Svelte component lifecycle integration
- Svelte-specific event handling
- Reactive property support

### Web Components

- Framework-agnostic implementation
- Custom element registration
- Shadow DOM encapsulation
- Standard web component lifecycle

## Next Steps

- Follow our [Quick Start Guide](/en/runtimes/overview/quick-start) to begin implementation
- Explore detailed [Web Player](/en/runtimes/distributions/js/v0.x) documentation
- Check out platform-specific examples in the documentation
