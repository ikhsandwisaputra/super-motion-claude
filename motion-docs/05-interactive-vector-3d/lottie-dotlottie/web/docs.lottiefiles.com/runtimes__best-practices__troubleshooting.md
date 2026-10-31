---
source: https://docs.lottiefiles.com/en/runtimes/best-practices/troubleshooting.md
title: ""
fetched: 2026-10-28
---

# Troubleshooting
Learn best practices for dotLottie Player. Optimize performance, manage resources, and troubleshoot common animation issues effectively.

# Best Practices & Troubleshooting

This guide provides best practices for using dotLottie players effectively and offers troubleshooting tips for common issues across platforms.

## Best Practices

Following these practices can help prevent common problems and optimize performance.

### 1. Resource Management (Preventing Memory Leaks)

**Why it's important:** Lottie players often manage resources like canvas contexts, animation frame loops, and event listeners. If these are not properly cleaned up when an animation is no longer needed, it can lead to memory leaks and degraded application performance.

- **Core Web Player (`@lottiefiles/dotlottie-web`):**

  - **Always call `destroy()`:** When you are finished with a `DotLottie` instance (e.g., the component unmounts, the element is removed from the DOM), explicitly call its `destroy()` method.
  - **What `destroy()` does:** Releases the WebGL/Canvas context, stops internal animation loops (`requestAnimationFrame`), and removes all event listeners attached via `addEventListener`.

  ```javascript
  // Assuming 'dotLottie' is your player instance
  if (dotLottie) {
    dotLottie.destroy();
    dotLottie = null; // Good practice to clear the reference
    console.log("dotLottie instance destroyed.");
  }
  ```

- **Framework Wrappers (React, Vue, Svelte, Web Components):**
  - **Automatic Cleanup (Usually):** These components are designed to automatically call `destroy()` on the underlying core player instance when the component is unmounted or removed from the DOM.
  - **Manual Refs:** If you obtain a direct reference to the core `DotLottie` instance within a framework component (e.g., using `dotLottieRefCallback` in React/Svelte, or template refs in Vue), the component _should_ still handle cleanup. However, if you manually manage listeners or perform actions outside the component's lifecycle, ensure cleanup happens within the framework's specific mechanisms:
    - **React:** Use the `useEffect` hook's return function for cleanup.
    - **Vue:** Use the `onUnmounted` hook (Composition API) or `beforeDestroy`/`unmounted` lifecycle hooks (Options API).
    - **Svelte:** Use the `onDestroy` lifecycle function.
  - **Consult Framework Docs:** When in doubt, always refer to the specific usage guide for your framework wrapper (e.g., `dotLottie-React-Usage.md`) for details on its lifecycle management.

- **Native Mobile Players (iOS/Android/React Native):**
  - Native platforms have their own memory management (ARC for iOS, GC for Android). Ensure you are not creating strong reference cycles that would prevent player views or controllers from being deallocated.
  - Remove listeners (e.g., `removeStateMachineListeners` on iOS, `removeStateMachineEventListener` on Android) in appropriate lifecycle methods (e.g., `onDisappear`, `onDestroyView`).

### 2. Performance Optimization

- **Frame Interpolation (`useFrameInterpolation` - Web/Mobile):**
  - Defaults to `true` for smoother animation, rendering intermediate frames.
  - Set to `false` to render only original frames. This can boost performance for complex animations or on lower-end devices if minor stuttering is acceptable.
- **Offscreen Freezing (`renderConfig.freezeOnOffscreen` - Web Player Only):**
  - Defaults to `true`. Pauses rendering when the canvas is not visible (improves performance significantly when multiple animations are present but not all visible).
- **Web Workers (`DotLottieWorker` / `use-web-worker` - Web Only):**
  - Offload animation processing from the main thread. Ideal for heavy animations or pages with many animations to keep the UI responsive. See [Web Worker](dotLottie-Web-Worker) documentation.
- **Native Performance:** Refer to iOS/Android specific performance tips if available (e.g., related to view recycling, backgrounding).

### 3. Loading Animations

- **Source (`src` / URL):** Preferred for external or asset-served animations. Ensure URLs are correct and accessible (check for typos, case sensitivity, network issues, CORS).
- **Data (`data` / Embedded):** Useful for bundling animation data (JSON string, ArrayBuffer) within your app/code. Avoids network requests but increases initial load size.
- **Lazy Loading:** For animations below the fold or loaded conditionally, consider loading them only when needed to improve initial page load performance.

## Troubleshooting Common Issues

Here are steps to diagnose frequently encountered problems:

### A. Animation Not Loading

1. **Check the Source Path/URL:**
   - **Typos & Case Sensitivity:** Double-check the file name or URL. Paths can be case-sensitive on some systems.
   - **Relative Paths:** Ensure relative paths are correct based on where your code/assets are served.
   - **Accessibility:** Open the URL directly in your browser. Does it load? Do you get a 404 Not Found?
   - **File Content:** Is the file actually a valid `.lottie` or `.json` file? Try opening it in a text editor or validating the JSON.
2. **Network Issues (Browser DevTools - Network Tab):**
   - **Status Code:** Look for the request for your animation file. Is the status `200 OK`? Or is it `404 Not Found`, `403 Forbidden`, `500 Internal Server Error`?
   - **CORS Errors:** If loading from a different domain than your webpage, check the Console tab for Cross-Origin Resource Sharing (CORS) errors. The server hosting the animation needs to send the correct `Access-Control-Allow-Origin` header.
3. **Listen for Errors (Crucial!):** The player provides specific error events/callbacks.
   - **Core Web Player:**
     ```javascript
     dotLottie.addEventListener("loadError", (errorEvent) => {
       console.error("dotLottie Load Error:", errorEvent.error);
       // Display a fallback or error message to the user
     });
     ```
   - **Framework Components:** Check the specific framework docs for `onError` props or similar event handling. The underlying `loadError` event might also be accessible via refs.
   - **Mobile Players:** Check for `onError` callbacks or specific error handling mechanisms documented in the iOS/Android/RN guides.
   - **Examine the Error:** The error object often provides details like "Failed to fetch", "Invalid JSON", "Network error", which points to the root cause.
4. **Check Browser/App Console:** Look for any related JavaScript errors (e.g., incorrect initialization, invalid parameters) or native logs.

### B. Animation Not Playing / Incorrect Playback

1. **Wait for Load:** **Crucially, ensure the animation is fully loaded _before_ attempting to control playback (e.g., calling `play()`).**
   - Use the `load` event (`dotLottie.addEventListener('load', ...)`), `onLoad` prop/callback, or check the `isLoaded` property.
2. **`autoplay` Prop:** If expecting automatic playback, ensure the `autoplay` prop/attribute/parameter is correctly set to `true`.
3. **Manual `play()` Call:** If triggering manually:
   - Is the `play()` method actually being called when expected (e.g., inside the `load` event handler, after a button click)?
   - Do you have a valid reference to the player instance when calling `play()`?
   - Is the animation perhaps already playing, paused, or stopped? Check `isPlaying`, `isPaused`.
4. **Check Console:** Look for runtime errors that might prevent your `play()` call or other logic from executing.
5. **Looping:** If the animation plays once but doesn't repeat, ensure the `loop` property/attribute is set to `true`.
6. **Segments/Markers:** If using `setSegment` or `setMarker`, ensure the frame numbers or marker names are valid for the loaded animation.
7. **State Machines:** If using interactivity, ensure the state machine is loaded, started, and in a state that allows the expected playback. Check for conflicting state definitions.

### C. Performance Problems (Lagging, High CPU/Memory)

1. **Toggle Frame Interpolation:** Try setting `useFrameInterpolation` to `false`.
2. **Enable Offscreen Freezing (Web):** Ensure `renderConfig.freezeOnOffscreen` is `true` (default).
3. **Use Web Workers (Web):** If available and appropriate for your use case, try `DotLottieWorker` or `use-web-worker`.
4. **Test Simpler Animation:** Load a basic, known-good animation. If it performs well, the issue might be the complexity or structure of your specific animation file.
5. **Check Resource Management:** Ensure you are calling `destroy()` (or relying on framework cleanup) correctly to prevent leaks from multiple unused instances.
6. **Profile:** Use browser/platform-specific profiling tools (e.g., Chrome DevTools Performance tab, Xcode Instruments, Android Studio Profiler) to identify bottlenecks.

## Getting Help

If you're still stuck after following these steps:

- Consult the specific documentation page for the player/feature you are using.
- Check the relevant GitHub Repository Issues section (e.g., [dotlottie-web Issues↗](https://github.com/LottieFiles/dotlottie-web/issues), or the specific repo for React/Vue/iOS/Android etc.) to see if others have encountered similar problems.
- Consider asking the community (provide details about your setup, the player version, the issue, error messages, and what you've tried).
