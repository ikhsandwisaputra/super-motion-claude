---
source: https://rive.app/docs/runtimes/react/preloading-wasm
title: "Preloading WASM"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Preloading WASM

When rending a Rive instance, your browser is making a network request to `https://unpkg.com/@rive-app/canvas@x.x.x/rive.wasm` which retrieves a [Web Assembly](https://developer.mozilla.org/en-US/docs/WebAssembly) (WASM) file that contains Rive-specific APIs to build the render loop. [unkpg](https://unpkg.com/) is a global CDN that quickly allows for loading in NPM packages, which in this case includes a WASM file. This allows for a smaller bundle size when pulling in the Rive JS-based runtimes, while only loading in WASM when Rive instances are created.

## Self-hosting Rive WASM

While `unpkg` should provide WASM quickly, you may want to preload and host the WASM file yourself as a static same-origin asset for any of the following reasons:

* Strict control over the origin of the WASM powering the Rive animations, as opposed to relying on a third-party unpkg CDN
* Faster load times for initializing Rive
* Ability to control caching policy of the `rive.wasm` file

The React runtimes are thin wrappers around their JavaScript counterparts and load the same WASM file from the same location.

## Initializing Rive on page load

If you need Rive to be ready to render your graphics immediately on page load (i.e. hero animations), we recommend preloading both the `rive.wasm` file and the .riv file so the browser begins downloading the necessary resources up front. On the JS side, you can use the RuntimeLoader API to begin downloading and compiling the WASM early, before the Rive component mounts.

By default, the React runtime fetches `rive.wasm` from unpkg at the `@rive-app/canvas` version it pins — you don't need to call `RuntimeLoader.setWasmUrl()` for this.

> [!NOTE]
>
> Matching the WASM version in React: the `@rive-app/react-canvas` version is not the same as the underlying `@rive-app/canvas` version it wraps. The `rive.wasm` must match the canvas version. To find it, open your installed React runtime's [package.json on GitHub](https://github.com/rive-app/rive-react/blob/v4.33.0/package.json#L38)
> and read the `@rive-app/canvas` dependency — e.g. `rive-react@v4.33.0` pins `@rive-app/canvas@2.41.0`. Swap the tag in that URL to match the version you have installed.

To preload it, just point a `<link rel="preload">` at that same URL (see the version note above for finding the version):

```html theme={null}
<!-- index.html (or main app entry point) -->
<!-- Open the connection to the wasm CDN as early as possible -->
<link rel="preconnect" href="https://unpkg.com" crossorigin />

<!-- If hosting the WASM file yourself, point this to the appropriate location rive.wasm lives in your CDN  -->
<link
  rel="preload"
  as="fetch"
  crossorigin
  href="https://unpkg.com/@rive-app/canvas@4.33.0/rive.wasm"
/>

<!-- Preload the main hero .riv file too -->
<link rel="preload" as="fetch" crossorigin href="/assets/hero.riv" />
```

Then in your React app, begin the process to compile the WASM file as early as possible.

```jsx theme={null}
import {useRive, RuntimeLoader} from '@rive-app/react-canvas';

// (Optional) Only add this if you serve rive.wasm from your own CDN and are not using unpkg.
// This should match the URL you preload
// RuntimeLoader.setWasmUrl("https://cdn.example.com/assets/rive-2.41.0.wasm");

if (typeof window !== 'undefined') {
  RuntimeLoader.awaitInstance().catch(() => {});
}

export default function Hero() {
  const { RiveComponent } = useRive({
    src: '/assets/hero.riv',
    stateMachine: 'State Machine 1',
    autoplay: true,
    autoBind: true,
  });

  return <RiveComponent style={{ width: 400, height: 400 }} />;
}
```

Alternatively, if you'd rather let your bundler self-host and version-match the WASM file alongside your app build, you can import it. Because `@rive-app/canvas` is only a transitive
dependency of the React runtime, this import resolves under npm/yarn (which hoist it) but fails under pnpm unless you add `@rive-app/canvas` to your own package.json at the matching version.

```js theme={null}
import riveWASMResource from '@rive-app/canvas/rive.wasm'; // Vite: append ?url
import {RuntimeLoader} from '@rive-app/react-canvas';
RuntimeLoader.setWasmUrl(riveWASMResource);
```

The import emits rive.wasm as a separate hashed file, not inlined into your JS bundle.

## Special thanks

Special thanks to Alex Barashkov for their [original blog post](https://dev.to/alex_barashkov/optimization-techniques-for-rive-animations-in-react-apps-1a8p) that inspired us to add this tip.

[https://dev.to/alex\_barashkov/optimization-techniques-for-rive-animations-in-react-apps-1a8p](https://dev.to/alex_barashkov/optimization-techniques-for-rive-animations-in-react-apps-1a8p)
