---
source: https://rive.app/docs/runtimes/web/preloading-wasm
title: "Preloading WASM"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Preloading WASM

Optimize loading Rive animations on page load

When rending a Rive instance, your browser is making a network request to `https://unpkg.com/@rive-app/canvas@x.x.x/rive.wasm` which retrieves a [Web Assembly](https://developer.mozilla.org/en-US/docs/WebAssembly) (WASM) file that contains Rive-specific APIs to build the render loop. [unkpg](https://unpkg.com/) is a global CDN that quickly allows for loading in NPM packages, which in this case includes a WASM file. This allows for a smaller bundle size when pulling in the Rive JS-based runtimes, while only loading in WASM when Rive instances are created.

## Self-hosting Rive WASM

While `unpkg` should provide WASM quickly, you may want to preload and host the WASM file yourself as a static same-origin asset for any of the following reasons:

* Strict control over the origin of the WASM powering the Rive animations, as opposed to relying on a third-party unpkg CDN
* Faster load times for initializing Rive
* Ability to control caching policy of the `rive.wasm` file

A few notes if you do decide to host the WASM file yourself:

1. The `rive.wasm` file version must match the `@rive-app` package version in your package.json — they are built as a pair, and a mismatch can break rendering/functionality at runtime. Put the version in the path or filename (e.g. `https://unpkg.com/@rive-app/webgl2@2.40.1/rive.wasm"`) and update the hosted file in the same change as any dependency bump.
2. The `<link rel="preload">` href and the URL passed to `setWasmUrl()` must be exactly the same, or the preloaded bytes are discarded and the file downloads twice. See example below.
3. Serve the file with the `application/wasm` MIME type — anything else drops you off the streaming-compilation path and onto a slower fallback.
4. If the file is on a different origin than the page (e.g. a CDN subdomain), also send `Access-Control-Allow-Origin` for your page origin.
5. Serve the versioned file with `Cache-Control: public, max-age=31536000, immutable`, and confirm your CDN applies brotli/gzip to .wasm (some only compress text types by default).

## Initializing Rive on page load

If you need Rive to be ready to render your graphics immediately on page load (i.e. hero animations), we recommend preloading both the `rive.wasm` file and the actual `.riv` file to
begin downloading of the necessary resources up front. On the JS side, you can use the `RuntimeLoader` API to begin downloading and compiling the WASM early on before instancing the Rive graphic on the page.
One other optimization is to fetch the `.riv` file and get the bytes as an ArrayBuffer early so you can pass it to the Rive instance.

```html theme={null}
<!-- index.html -->
<!-- Open the connection to the wasm CDN as early as possible -->
<!-- If you are hosting the WASM file yourself, set this to your CDN URL instead -->
<link rel="preconnect" href="https://unpkg.com" crossorigin />

<!-- Preload the exact versioned wasm URL the runtime will request.
     The version MUST match the installed @rive-app package version, or the
     runtime re-fetches the resource -->
<!-- If you are hosting the WASM file yourself, set this to the rive.wasm location on your server -->
<link
  rel="preload"
  as="fetch"
  crossorigin
  href="https://unpkg.com/@rive-app/webgl2@2.40.1/rive.wasm"
/>

<!-- Preload the main hero .riv file too -->
<link rel="preload" as="fetch" crossorigin href="/assets/hero.riv" />
```

```javascript theme={null}
import { Rive, RuntimeLoader } from '@rive-app/canvas';

// (Optional) Only add this if you are hosting the WASM file on your own servers
// const WASM_URL = "https://cdn.example.com/assets/rive-2.40.1.wasm";
// RuntimeLoader.setWasmUrl(WASM_URL);

// Run this API as early as possible on page load to begin compiling the rive.wasm file
RuntimeLoader.awaitInstance().catch(() => {});

const heroFetch = fetch("/assets/hero.riv").then((r) => r.arrayBuffer());

// ... later, when mounting:
async function mountHero(canvas) {
  const riveInstance = new Rive({
    canvas,
    buffer: await heroFetch,
    stateMachine: "State Machine 1",
    autoBind: true,
    autoplay: true,
    // ... other configuration
  });
}
```

## Special thanks

Special thanks to Alex Barashkov for their [original blog post](https://dev.to/alex_barashkov/optimization-techniques-for-rive-animations-in-react-apps-1a8p) that inspired us to add this tip.

[https://dev.to/alex\_barashkov/optimization-techniques-for-rive-animations-in-react-apps-1a8p](https://dev.to/alex_barashkov/optimization-techniques-for-rive-animations-in-react-apps-1a8p)
