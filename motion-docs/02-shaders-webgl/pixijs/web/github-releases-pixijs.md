---
source: https://github.com/pixijs/pixijs/releases
title: "pixijs/pixijs releases (latest 30)"
fetched: 2026-10-28
---


# v8.22.0 — 2026-10-01

## 💾 Download

Installation:
```bash
npm install pixi.js@8.22.0
```

Development Build:
- https://cdn.jsdelivr.net/npm/pixi.js@8.22.0/dist/pixi.js
- https://cdn.jsdelivr.net/npm/pixi.js@8.22.0/dist/pixi.mjs

Production Build:
- https://cdn.jsdelivr.net/npm/pixi.js@8.22.0/dist/pixi.min.js
- https://cdn.jsdelivr.net/npm/pixi.js@8.22.0/dist/pixi.min.mjs

Documentation:
- https://pixijs.download/v8.22.0/docs/index.html

## Changed
https://github.com/pixijs/pixijs/compare/v8.21.0...v8.22.0

### 🚨 Behavior Change
* fix: tab cannot activate the accessibility layer on a fresh page by @synath in https://github.com/pixijs/pixijs/pull/12220
  * Pressing Tab now activates the accessibility layer on a fresh page when `activateOnTab` is left at its default of `true`. This restores the documented default, which regressed in v8.14.0. To keep Tab from activating it:
  ```ts
  await app.init({ accessibilityOptions: { activateOnTab: false } });
  ```
* fix: apply accessibleText to button and recycled accessible elements by @synath in https://github.com/pixijs/pixijs/pull/12221
  * `accessibleText` now applies to the default `button` type and to accessible elements recycled from the pool.

### 🎁 Added
* feat: add a federated contextmenu event by @Zyie in https://github.com/pixijs/pixijs/pull/12250
  * Containers now receive `contextmenu` and `contextmenucapture` events, also available as the `oncontextmenu` handler property. The event is a `FederatedPointerEvent` that PixiJS hit-tests and propagates like `pointerdown`, and `eventFeatures.click` gates it.
  ```ts
  sprite.eventMode = 'static';
  sprite.on('contextmenu', (event) =>
  {
      event.preventDefault(); // keeps the browser menu closed
      openMenuAt(event.global);
  });
  ```
* feat: sRGB view formats and transient MSAA colour on WebGPU by @GoodBoyDigital in https://github.com/pixijs/pixijs/pull/12225
  * New `transient` renderer option (WebGPU, with `antialias`) discards the canvas's multisample depth/stencil buffer at the end of each pass, and its color buffer too on GPUs that aren't tile-based. 
  ```ts
  await app.init({ preference: 'webgpu', antialias: true, transient: true });
  ```
* feat: 3D textures, storage textures and 3D mipmaps by @GoodBoyDigital in https://github.com/pixijs/pixijs/pull/12248
* feat: partial uploads for BufferImageSource via update(start, end) by @GoodBoyDigital in https://github.com/pixijs/pixijs/pull/12227

### 🐛 Fixed
* fix: integer texture formats on WebGL and WebGPU by @GoodBoyDigital in https://github.com/pixijs/pixijs/pull/12230
* fix: nested filters crash after renderer resize by @Zyie in https://github.com/pixijs/pixijs/pull/12257
* fix: indexed loops instead of for...in on every draw by @GoodBoyDigital in https://github.com/pixijs/pixijs/pull/12229
* fix: declare accessibilityOptions on the public renderer options by @synath in https://github.com/pixijs/pixijs/pull/12222
* fix: array uniform sync over-reads and overlaps matrix elements by @GoodBoyDigital in https://github.com/pixijs/pixijs/pull/12228
* fix: blend filter backdrop when every parent filter is skipped by @Zyie in https://github.com/pixijs/pixijs/pull/12263
* fix: don't warn about unread attributes that already have a format by @Zyie in https://github.com/pixijs/pixijs/pull/12267

### 🧹 Chores
* chore: clarify web font family naming by @Hugohong258 in https://github.com/pixijs/pixijs/pull/12216
* chore: correct TilingSprite texture, width and height defaults by @ZainnQureshii in https://github.com/pixijs/pixijs/pull/12269

## New Contributors
* @synath made their first contribution in https://github.com/pixijs/pixijs/pull/12220
* @ZainnQureshii made their first contribution in https://github.com/pixijs/pixijs/pull/12269


# v8.21.0 — 2026-09-17

## 💾 Download

Installation:
```bash
npm install pixi.js@8.21.0
```

Development Build:
- https://cdn.jsdelivr.net/npm/pixi.js@8.21.0/dist/pixi.js
- https://cdn.jsdelivr.net/npm/pixi.js@8.21.0/dist/pixi.mjs

Production Build:
- https://cdn.jsdelivr.net/npm/pixi.js@8.21.0/dist/pixi.min.js
- https://cdn.jsdelivr.net/npm/pixi.js@8.21.0/dist/pixi.min.mjs

Documentation:
- https://pixijs.download/v8.21.0/docs/index.html

## Changed
https://github.com/pixijs/pixijs/compare/v8.20.1...v8.21.0

### 🚨 Behavior Change
* fix: decompose mirrored matrix into rotation and negative scale by @cpruijsen in https://github.com/pixijs/pixijs/pull/12200
  * `Matrix.decompose()` and `setFromMatrix()` (plus `reparentChild()`, `reparentChildAt()` and `replaceChild()`) now turn a mirrored matrix into a real `rotation`, zero `skew` and a negative `scale.x`. Previously they returned `rotation = 0` with a nonzero `skew`. Rendering is identical; only the values you read back change. The flip always lands on `scale.x`, so a `scale(1, -1)` matrix now gives `scale (-1, 1)` with `rotation = -π`. Re-check any flip detection or tweens that start from decomposed values.
  ```ts
  import { Container, Matrix } from 'pixi.js';

  const container = new Container();

  container.setFromMatrix(new Matrix().rotate(Math.PI / 6).scale(-1, 1));

  // before: rotation 0, skew { x: ~0.524, y: ~2.618 }, scale { x: 1, y: 1 }
  // after:  rotation ~-0.524, skew { x: 0, y: 0 }, scale { x: -1, y: 1 }
  ```

### 🎁 Added
* feat: support TypeScript 5, 6, and 7 by @creativoma @Zyie in https://github.com/pixijs/pixijs/pull/12157
  * PixiJS types now compile on TypeScript 6 and 7 as well as 5. TypeScript 5 needs no changes; PixiJS still adds `@webgpu/types` for you. On TypeScript 6 and 7, which include WebGPU types built in, remove `@webgpu/types` from `compilerOptions.types` and use `@types/web` in place of the `"dom"` lib, since some releases leave out parts such as `GPUTextureUsage`. See the new [TypeScript guide](https://pixijs.com/8.x/guides/concepts/typescript).
  ```bash
  npm install --save-dev @types/web
  ```
  ```json
  {
    "compilerOptions": {
      "lib": ["esnext"],
      "types": ["@types/web"]
    }
  }
  ```
* feat: add renderer loader extensions for lazy backend imports by @Zyie in https://github.com/pixijs/pixijs/pull/12175
  * New `ExtensionType.WebGLLoader`, `ExtensionType.WebGPULoader` and `ExtensionType.CanvasLoader` extensions register an async `load()` hook that the matching renderer awaits during `init()`, before it creates its systems and pipes. Plugins can `import()` backend-only code this way, so each backend stays in its own chunk and only the active one loads. Loaders are deduplicated by `name` and are skipped when `skipExtensionImports` is `true`.
  ```ts
  import { Application, extensions, ExtensionType } from 'pixi.js';

  extensions.add(
      {
          extension: { type: ExtensionType.WebGLLoader, name: 'my-plugin' },
          load: () => import('./gl/register'),
      },
      {
          extension: { type: ExtensionType.WebGPULoader, name: 'my-plugin' },
          load: () => import('./gpu/register'),
      },
  );

  const app = new Application();
  await app.init({ preference: 'webgpu' }); // only the WebGPU loader runs
  ```
* feat: add Geometry.indexCount for drawing a prefix of a shared index buffer by @GoodBoyDigital in https://github.com/pixijs/pixijs/pull/12182
  * `Geometry` gains an `indexCount` property (also a constructor option), the index-buffer counterpart to `instanceCount`. Several geometries can share one index buffer while each draws only its first N indices. Changing it never re-uploads anything. The default `0` draws the whole buffer, and an explicit `size` on the draw call still takes precedence.
  ```ts
  import { Buffer, BufferUsage, Geometry } from 'pixi.js';

  const maxQuads = 1000;
  const indices = new Uint32Array(maxQuads * 6);

  for (let i = 0, v = 0; i < indices.length; i += 6, v += 4)
  {
      indices.set([v, v + 1, v + 2, v, v + 2, v + 3], i);
  }

  const sharedIndices = new Buffer({ data: indices, usage: BufferUsage.INDEX | BufferUsage.COPY_DST });

  const geometry = new Geometry({
      attributes: { aPosition: new Float32Array(maxQuads * 8) },
      indexBuffer: sharedIndices,
      indexCount: 10 * 6, // draw only the first 10 quads
  });

  geometry.indexCount = 25 * 6; // grow later without a re-upload
  ```
* feat: replace frontFaceInverted with isFrontFaceInverted(target, flipY) by @GoodBoyDigital in https://github.com/pixijs/pixijs/pull/12206
  * `renderer.renderTarget.isFrontFaceInverted()` replaces the `frontFaceInverted` getter, which is now deprecated. Pass a target and `flipY` to get the winding for a target before you bind it, so 3D pipelines can pick a projection first. `flipY` defaults to `false`, matching `bind()`.
  ```ts
  import { RenderTexture } from 'pixi.js';

  // before (deprecated)
  const invertedNow = renderer.renderTarget.frontFaceInverted;

  // after: the currently bound target
  const inverted = renderer.renderTarget.isFrontFaceInverted();

  // after: a target that isn't bound yet, as if bound with flipY: true
  const target = renderer.renderTarget.getRenderTarget(RenderTexture.create({ width: 512, height: 512 }));
  const willInvert = renderer.renderTarget.isFrontFaceInverted(target, true);
  ```
* feat: cap pooled textures to the screen size and take pool requests as options by @GoodBoyDigital in https://github.com/pixijs/pixijs/pull/12198
  * `TexturePool` and `CanvasPool` now size pooled textures to the screen instead of always rounding up to a power of two, which saves a lot of GPU memory on fullscreen filters (a 1170x2532 phone used to get 2048x4096 textures). Requests larger than every screen still round up to a power of two. `getOptimalTexture()` and `createTexture()` now take a `TexturePoolRequest` object with per-request `format` and `scaleMode`; the positional signatures still work but are deprecated.
  ```ts
  import { TexturePool } from 'pixi.js';

  // before (deprecated)
  const legacy = TexturePool.getOptimalTexture(800, 600, 2, true);

  // after
  const texture = TexturePool.getOptimalTexture({
      width: 800,
      height: 600,
      resolution: 2,
      antialias: true,
      scaleMode: 'nearest',
  });

  TexturePool.returnTexture(texture);
  ```
* feat: stamp render bundles with baked pipeline state by @GoodBoyDigital in https://github.com/pixijs/pixijs/pull/12158

### 🐛 Fixed
* fix: restore the WebGPU renderer after a device loss by @Zyie in https://github.com/pixijs/pixijs/pull/12173
* fix: release cached GPU render targets on RenderTarget destroy by @Zyie in https://github.com/pixijs/pixijs/pull/12192
* fix: preserve UBO offsets in unsafe-eval polyfill by @darkdi in https://github.com/pixijs/pixijs/pull/12154
* fix: svg radial gradients render as a linear gradient by @creativoma in https://github.com/pixijs/pixijs/pull/12156
* fix: detach from shared TextStyle on destroy (#12049) by @qiao-coding in https://github.com/pixijs/pixijs/pull/12159
* fix: regenerate Text/HTMLText textures after WebGL context loss by @Zyie in https://github.com/pixijs/pixijs/pull/12170
* fix: render Text, HTMLText and Graphics with a second renderer by @Zyie in https://github.com/pixijs/pixijs/pull/12172
* fix: BatcherPipe leak on RenderGroup destroy by @laino in https://github.com/pixijs/pixijs/pull/12030
* fix: release VAOs and buffer listeners when a Geometry is destroyed by @Zyie in https://github.com/pixijs/pixijs/pull/12190
* fix: make the GC resource sweep safe under re-entrant unload listeners by @Zyie in https://github.com/pixijs/pixijs/pull/12191
* fix: sweep idle WebGPU bind groups with the renderer GC by @Zyie in https://github.com/pixijs/pixijs/pull/12193
* fix: keep per-target stencil state on the backend render target by @Zyie in https://github.com/pixijs/pixijs/pull/12194
* fix: clamp blur samples to the input frame by @ICOM725 in https://github.com/pixijs/pixijs/pull/12188
* fix: don't inherit autoGenerateMipmaps on WebGPU MSAA textures by @zenblender in https://github.com/pixijs/pixijs/pull/12197
* fix: render nine-slice center in canvas when borders cover the texture by @ShiKirill in https://github.com/pixijs/pixijs/pull/12126
* fix: handle strokes wider than the shape in Ellipse.strokeContains by @MaxFreedomPollard in https://github.com/pixijs/pixijs/pull/12185
* fix: preserve translucent colors in untinted canvas tiling sprites by @ICOM725 in https://github.com/pixijs/pixijs/pull/12189
* fix: ignore inactive graphics batches when creating bind groups by @iketiunn in https://github.com/pixijs/pixijs/pull/12184
* fix: don't destroy the shared GpuProgram on WebGPU renderer destroy by @Zyie in https://github.com/pixijs/pixijs/pull/12203
* fix: update the WebGPU front face when a reused pass changes flipY by @Zyie in https://github.com/pixijs/pixijs/pull/12207

### 🧹 Chores
* chore: bump @xmldom/xmldom to 0.8.15 by @Zyie in https://github.com/pixijs/pixijs/pull/12162
* chore: remove write-only _touched field from BindResource and implementors by @santichausis in https://github.com/pixijs/pixijs/pull/12199
* chore: update Assets texture-loading examples for v8 by @Hugohong258 in https://github.com/pixijs/pixijs/pull/12196
* chore: fix Shader uniform resource example by @Hugohong258 in https://github.com/pixijs/pixijs/pull/12202
* chore: update docs and skills for v8.20+ changes by @Zyie in https://github.com/pixijs/pixijs/pull/12204

## New Contributors
* @darkdi made their first contribution in https://github.com/pixijs/pixijs/pull/12154
* @qiao-coding made their first contribution in https://github.com/pixijs/pixijs/pull/12159
* @cpruijsen made their first contribution in https://github.com/pixijs/pixijs/pull/12200
* @ICOM725 made their first contribution in https://github.com/pixijs/pixijs/pull/12188
* @Hugohong258 made their first contribution in https://github.com/pixijs/pixijs/pull/12196
* @zenblender made their first contribution in https://github.com/pixijs/pixijs/pull/12197
* @MaxFreedomPollard made their first contribution in https://github.com/pixijs/pixijs/pull/12185
* @iketiunn made their first contribution in https://github.com/pixijs/pixijs/pull/12184


# v8.20.1 — 2026-08-26

## 💾 Download

Installation:
```bash
npm install pixi.js@8.20.1
```

Development Build:
- https://cdn.jsdelivr.net/npm/pixi.js@8.20.1/dist/pixi.js
- https://cdn.jsdelivr.net/npm/pixi.js@8.20.1/dist/pixi.mjs

Production Build:
- https://cdn.jsdelivr.net/npm/pixi.js@8.20.1/dist/pixi.min.js
- https://cdn.jsdelivr.net/npm/pixi.js@8.20.1/dist/pixi.min.mjs

Documentation:
- https://pixijs.download/v8.20.1/docs/index.html

## Changed
https://github.com/pixijs/pixijs/compare/v8.20.0...v8.20.1

### 🐛 Fixed
* fix: preserve UBO offsets in unsafe-eval polyfill by @darkdi in https://github.com/pixijs/pixijs/pull/12154
* fix: svg radial gradients render as a linear gradient by @creativoma in https://github.com/pixijs/pixijs/pull/12156
* fix: detach from shared `TextStyle` on destroy by @qiao-coding in https://github.com/pixijs/pixijs/pull/12159

### 🧹 Chores
* chore: bump `@xmldom/xmldom` to 0.8.15 by @Zyie in https://github.com/pixijs/pixijs/pull/12162
  * Removes the `npm warn deprecated @xmldom/xmldom@0.8.14` warning printed when installing `pixi.js`.
 
## New Contributors
* @darkdi made their first contribution in https://github.com/pixijs/pixijs/pull/12154
* @qiao-coding made their first contribution in https://github.com/pixijs/pixijs/pull/12159

**Full Changelog**: https://github.com/pixijs/pixijs/compare/v8.20.0...v8.20.1


# v8.20.0 — 2026-08-20

## 💾 Download

Installation:
```bash
npm install pixi.js@8.20.0
```

Development Build:
- https://cdn.jsdelivr.net/npm/pixi.js@8.20.0/dist/pixi.js
- https://cdn.jsdelivr.net/npm/pixi.js@8.20.0/dist/pixi.mjs

Production Build:
- https://cdn.jsdelivr.net/npm/pixi.js@8.20.0/dist/pixi.min.js
- https://cdn.jsdelivr.net/npm/pixi.js@8.20.0/dist/pixi.min.mjs

Documentation:
- https://pixijs.download/v8.20.0/docs/index.html

## Changed
https://github.com/pixijs/pixijs/compare/v8.19.0...v8.20.0

### 🚨 Behavior Change
* feat: WGSL shader overrides, depth-stencil formats, partial buffer updates & view caching by @Zyie in https://github.com/pixijs/pixijs/pull/12089
  * `StructsAndGroups.isUniform` is replaced by `accessMode`, which also describes storage buffers. This one fails quietly; the old property reads `undefined` rather than throwing.
  ```ts
  // before
  if (group.isUniform) { /* ... */ }

  // after
  if (group.accessMode === 'uniform') { /* ... */ }
  ```
* fix: apply render group world color and alpha to ParticleContainer by @TheOnlyJason in https://github.com/pixijs/pixijs/pull/12132
  * `ParticleContainer` ignored the tint and alpha of any ancestor render group, staying fully opaque while everything else faded. Particles now inherit both, so scenes with a `ParticleContainer` under a tinted or faded render group will look different. Remove any manual compensation you added.
* fix: WebGPU ignores clockwiseFrontFace by @koteelok in https://github.com/pixijs/pixijs/pull/12139
  * `State.clockwiseFrontFace` reached the WebGPU pipeline as a cull mode rather than a winding, so `@builtin(front_facing)` in WGSL reported the opposite of `gl_FrontFacing` in GLSL. Which triangles survive culling is unchanged, but WGSL shaders branching on `front_facing` with `clockwiseFrontFace: true` now take the other branch; revert any workaround that inverted it.
* fix: align Polygon.strokeContains with the drawn stroke by @Jaybhade in https://github.com/pixijs/pixijs/pull/12137
  * `strokeContains` split the stroke width on the squared width and ignored winding order, so at the default `alignment: 0.5` the hit area was ~41% wider than the drawn line, and at alignment 0 or 1 it sat on the opposite side of the edge. Hit testing now matches what's drawn.
  ```ts
  const graphics = new Graphics()
      .poly([0, 0, 100, 0, 100, 100, 0, 100], true)
      .stroke({ width: 20, alignment: 0 });

  graphics.containsPoint({ x: -10, y: 50 }); // now true, inside the drawn stroke
  graphics.containsPoint({ x: 10, y: 50 });  // now false, nothing is drawn there
  ```
* fix: Rectangle containsRect edge containment by @cyphercodes in https://github.com/pixijs/pixijs/pull/12083
  * `containsRect` tested the right and bottom edges with a strict `<`, so identical rectangles reported `false`. Identical rects, and any rect flush against the container's right or bottom edge, now return `true`. Code using it as a strict-interior test, or branching on `false` to mean "partially outside", now takes the other branch.

### 🎁 Added
* feat: WGSL shader overrides, depth-stencil formats, partial buffer updates & view caching by @Zyie in https://github.com/pixijs/pixijs/pull/12089
* feat: geometry vertexCount, WebGPU render bundles, depth-only targets & Safari WGSL fallback by @Zyie in https://github.com/pixijs/pixijs/pull/12090
* feat: WebGPU-first RenderTarget attachment architecture & TextureView depth sampling by @Zyie in https://github.com/pixijs/pixijs/pull/12091
* feat: copyDepthTexture for render targets (WebGPU/WebGL2) by @Zyie in https://github.com/pixijs/pixijs/pull/12092
* feat: add opt-in flipY render-orientation toggle by @GoodBoyDigital in https://github.com/pixijs/pixijs/pull/12098
  * `RenderOptions.flipY` inverts a render's Y orientation, flipping the projection and the winding/cull inversion together. That lets you capture a scene into a texture in screen orientation, which is what 3D geometry UVs expect, without a per-material flip at sample time and with back-face culling still correct. Absent or `false` is a no-op on both backends.
  ```ts
  import { Sprite, Texture, TextureSource } from 'pixi.js';

  const texture = new Texture({ source: new TextureSource({ width: 256, height: 256 }) });

  renderer.render({ container: mesh, target: texture, clear: true, flipY: true });

  const sprite = new Sprite(texture);
  ```
* feat: copy depth into textures and expose resolved front-face orientation by @GoodBoyDigital in https://github.com/pixijs/pixijs/pull/12103
* feat(rendering): object-form bind/push and capturable bind state by @GoodBoyDigital in https://github.com/pixijs/pixijs/pull/12104
* feat: export GPU shader layout helpers for advanced users by @GoodBoyDigital in https://github.com/pixijs/pixijs/pull/12143
* feat(rendering): object-form bind/push and capturable bind state by @GoodBoyDigital in https://github.com/pixijs/pixijs/pull/12104
* feat: geometry vertexCount, WebGPU render bundles, depth-only targets & Safari WGSL fallback by @Zyie in https://github.com/pixijs/pixijs/pull/12090

### 🐛 Fixed
* fix: stop Geometry.destroy from double-freeing the index buffer by @GoodBoyDigital in https://github.com/pixijs/pixijs/pull/12144
* fix: support chrome 150+ HTML-in-Canvas upload signatures by @Zyie in https://github.com/pixijs/pixijs/pull/12077
* fix: harden WebGPU render targets, bind groups & pipeline/texture caching by @Zyie in https://github.com/pixijs/pixijs/pull/12093
* fix: prevent double-destroy of render targets on teardown by @Zyie in https://github.com/pixijs/pixijs/pull/12095
* fix: add persistentDeviceId to FederatedPointerEvent by @ShiKirill in https://github.com/pixijs/pixijs/pull/12102
* fix: release mask bindings when pooled AlphaMaskEffect returns to the pool by @shell362 in https://github.com/pixijs/pixijs/pull/12131
* fix: WebGPU sibling sprite masks rendering with each other's mask matrix by @GoodBoyDigital in https://github.com/pixijs/pixijs/pull/12149
* fix: account for frame origin and rotation in graphics texture fills by @Zyie in https://github.com/pixijs/pixijs/pull/12123
* fix: handle missing base in bitmap font parsers by @Zyie in https://github.com/pixijs/pixijs/pull/12121
* fix: use the correct vertex for the first edge in Triangle.strokeContains by @spokodev in https://github.com/pixijs/pixijs/pull/12105
* fix: copy radius in RoundedRectangle.copyFrom by @spokodev in https://github.com/pixijs/pixijs/pull/12129
* fix: unregister GraphicsContext listeners on destroy by @Srinu520 in https://github.com/pixijs/pixijs/pull/12140
* fix: rebuild cached bind groups when the GC unloads uniform buffers by @GoodBoyDigital in https://github.com/pixijs/pixijs/pull/12147
* fix: substitute Texture.EMPTY when a mask texture is destroyed while still in use by @GoodBoyDigital in https://github.com/pixijs/pixijs/pull/12148
* fix: prevent duplicate onRender registrations from same-parent reorders by @Zyie in https://github.com/pixijs/pixijs/pull/12120

### 🧹 Chores
* chore: tidy cube/mip handling in GPU & GL texture systems by @Zyie in https://github.com/pixijs/pixijs/pull/12088
* fix: make GCSystem lazy-hash-replacement tests independent of real elapsed time by @santichausis in https://github.com/pixijs/pixijs/pull/12124
* fix: raise pixelMatch threshold for html-text-stroke-anchor-tagged visual test by @santichausis in https://github.com/pixijs/pixijs/pull/12138
* fix: stop publish-branch job from poisoning the node_modules cache by @Zyie in https://github.com/pixijs/pixijs/pull/12152
* chore: remove dead https://pixijs.io/customize link in v7 migration guide by @sanjibani in https://github.com/pixijs/pixijs/pull/12094
* chore: export html-source module from docs index by @Zyie

## New Contributors
* @ShiKirill made their first contribution in https://github.com/pixijs/pixijs/pull/12102
* @sanjibani made their first contribution in https://github.com/pixijs/pixijs/pull/12094
* @cyphercodes made their first contribution in https://github.com/pixijs/pixijs/pull/12083
* @spokodev made their first contribution in https://github.com/pixijs/pixijs/pull/12105
* @Jaybhade made their first contribution in https://github.com/pixijs/pixijs/pull/12137
* @Srinu520 made their first contribution in https://github.com/pixijs/pixijs/pull/12140
* @santichausis made their first contribution in https://github.com/pixijs/pixijs/pull/12124
* @shell362 made their first contribution in https://github.com/pixijs/pixijs/pull/12131
* @TheOnlyJason made their first contribution in https://github.com/pixijs/pixijs/pull/12132

**Full Changelog**: https://github.com/pixijs/pixijs/compare/v8.19.0...v8.20.0


# v8.19.0 — 2026-06-04

## 💾 Download

Installation:
```bash
npm install pixi.js@8.19.0
```

Development Build:
- https://cdn.jsdelivr.net/npm/pixi.js@8.19.0/dist/pixi.js
- https://cdn.jsdelivr.net/npm/pixi.js@8.19.0/dist/pixi.mjs

Production Build:
- https://cdn.jsdelivr.net/npm/pixi.js@8.19.0/dist/pixi.min.js
- https://cdn.jsdelivr.net/npm/pixi.js@8.19.0/dist/pixi.min.mjs

Documentation:
- https://pixijs.download/v8.19.0/docs/index.html

## Changed
https://github.com/pixijs/pixijs/compare/v8.18.1...v8.19.0

### 🚨 Behavior Change
* fix: Container.updateTransform honors zero scale (#12044) by @Zyie in https://github.com/pixijs/pixijs/pull/12046
  * `Container.updateTransform({ scaleX: 0, scaleY: 0 })` previously coerced a zero scale to `1` (the code used `opts.scaleX || 1`), so passing `0` left the container at full size. It now applies zero scale literally, matching `scale.set(0, 0)`. If you relied on `updateTransform` ignoring a zero scale, stop passing `0` when you mean full scale.
  ```ts
  const container = new Container();
  container.updateTransform({ scaleX: 0, scaleY: 0 });
  // before: scale coerced to (1, 1) — container stayed full-size
  // after:  scale applied as (0, 0) — container hidden, matching scale.set(0, 0)
  ```
* fix: particle container inherit blend mode by @DmitriyGolub in https://github.com/pixijs/pixijs/pull/11978
  * `ParticleContainer` now respects the blend mode inherited from its ancestors. Previously the render pipe read the container's own local `blendMode` instead of the resolved `groupBlendMode`, so setting e.g. `stage.blendMode = 'add'` had no effect on particles. Particles nested under a parent with a non-default blend mode will now render differently (e.g. additive brightening) where they were silently ignored before. A `blendMode` set directly on the `ParticleContainer` is unchanged.
* fix: FillPattern tiling and radial gradient sizing by @Zyie in https://github.com/pixijs/pixijs/pull/12037
  * `FillPattern` gains a `textureSpace` option (`'global' | 'local'`), while fixing several long-standing pattern/gradient sizing bugs. `textureSpace` defaults to `'global'`, so patterns now tile continuously across adjacent shapes instead of remapping per shape; `setTransform(matrix)` now applies the matrix you pass directly (it previously inverted and rescaled it by the texture size); and `textureSpace: 'local'` radial gradients now scale to the gradient's outer radius. Existing pattern fills and local radial gradients can render differently. 
  
    If you hand-compensated for the old `setTransform` behavior (pre-inverting or scaling by texture size), remove that compensation. The legacy positional `new FillPattern(texture, repetition)` form still works.
  ```ts
  import { Assets, FillPattern, Graphics } from 'pixi.js';

  const texture = await Assets.load('pattern.png');

  // new options-object constructor with explicit textureSpace
  const pattern = new FillPattern({ texture, repetition: 'repeat', textureSpace: 'local' });

  const g = new Graphics().rect(0, 0, 200, 100).fill({ fill: pattern });
  ```

### 🎁 Added
* feat: add HTML-in-Canvas texture support by @Zyie in https://github.com/pixijs/pixijs/pull/12053
  * A new opt-in `pixi.js/html-source` subpath renders live DOM elements into PixiJS textures while the element stays fully interactive in the browser (inputs editable, links clickable, CSS animations running). Use `HTMLSource` for a live element or `ElementImageSource` for an immutable snapshot. The element must be a direct child of the Pixi canvas. Importing the subpath also registers a lowest-priority `Texture.from` fallback for generic HTML elements, so it cannot affect apps that don't import it.
  ```ts
  import { Application, Sprite } from 'pixi.js';
  import { HTMLSource } from 'pixi.js/html-source';

  const app = new Application();
  await app.init({ resizeTo: window });
  document.body.appendChild(app.canvas);

  const form = document.createElement('form');
  form.innerHTML = '<input value="still editable" />';
  app.canvas.appendChild(form); // must be a direct child of the Pixi canvas

  const sprite = Sprite.from(new HTMLSource({ resource: form, autoUpdate: true }));
  app.stage.addChild(sprite); // live DOM mirrored to the GPU; the form stays interactive
  ```
* feat: implement transientAttachment for MSAA RenderTextures for WebGPU by @GoodBoyDigital in https://github.com/pixijs/pixijs/pull/12050
  * Texture sources gain an opt-in `transient` flag so the WebGPU backend can discard the MSAA buffer at the end of a render pass (`storeOp: 'discard'`) instead of writing it back to memory, and keep MSAA contents in tile memory on TBDR mobile GPUs where `GPUTextureUsage.TRANSIENT_ATTACHMENT` is available. This cuts memory bandwidth for single-pass MSAA render targets. Only set it on antialiased textures that follow a single-pass-then-discard pattern; a later `loadOp: 'load'` on a transient attachment yields undefined contents. Default is `false`, so existing code is unaffected. A WebGPU-only `renderer.device.extensions.transientAttachment` probe reports device support.

### 🐛 Fixed
* fix: BitmapText trailing glyph after glyph-less word-break char by @Zyie in https://github.com/pixijs/pixijs/pull/12035
* fix: SplitText crash when text begins with whitespace (#12040) by @Zyie in https://github.com/pixijs/pixijs/pull/12041
* fix: TilingSprite tileRotation shears pattern on non-square sprites by @Zyie in https://github.com/pixijs/pixijs/pull/12062
* fix: canvas renderer does not round anchor offset when roundPixels is enabled by @Clonex in https://github.com/pixijs/pixijs/pull/12051
* fix: pass renderer's maxBatchableTextures to non-default batchers by @SerG-Y in https://github.com/pixijs/pixijs/pull/12029
* fix: handle null from getShaderSource/getShaderInfoLog on lost context (#12032) by @Zyie in https://github.com/pixijs/pixijs/pull/12042
* fix: GCSystem unload resources before nulling hash entry by @Zyie in https://github.com/pixijs/pixijs/pull/12038

### 🧹 Chores
* chore: bundle pixijs-skills and add sync workflow by @Zyie in https://github.com/pixijs/pixijs/pull/12045
  * Ships 25 PixiJS v8 AI agent skills under `skills/` in the published npm package, available at `node_modules/pixi.js/skills/` after install.
* chore: document blend mode resolution inheritance by @MFei8ht in https://github.com/pixijs/pixijs/pull/12067
* chore: restrict postMessage origin in playground for better security by @RinZ27 in https://github.com/pixijs/pixijs/pull/12055
* chore: bump @xmldom/xmldom from ^0.8.12 to ^0.8.13 by @Copilot in https://github.com/pixijs/pixijs/pull/12025
* chore: bump parse-svg-path by @bigtimebuddy in https://github.com/pixijs/pixijs/pull/12071
* chore: standardize graphics test naming and expand visual coverage by @Zyie in https://github.com/pixijs/pixijs/pull/12036
* chore: stabilize HTMLText visual tests against CI flakiness by @Zyie in https://github.com/pixijs/pixijs/pull/12039
* chore: pin node to 24.15.0 and update GitHub Actions by @Zyie in https://github.com/pixijs/pixijs/pull/12070
* chore: add missing path pattern to CODEOWNERS by @Copilot in https://github.com/pixijs/pixijs/pull/12027

## New Contributors
* @RinZ27 made their first contribution in https://github.com/pixijs/pixijs/pull/12055
* @MFei8ht made their first contribution in https://github.com/pixijs/pixijs/pull/12067
* @Clonex made their first contribution in https://github.com/pixijs/pixijs/pull/12051

**Full Changelog**: https://github.com/pixijs/pixijs/compare/v8.18.1...v8.19.0


# v8.18.1 — 2026-04-14

## 💾 Download

Installation:
```bash
npm install pixi.js@8.18.1
```

Development Build:
- https://cdn.jsdelivr.net/npm/pixi.js@8.18.1/dist/pixi.js
- https://cdn.jsdelivr.net/npm/pixi.js@8.18.1/dist/pixi.mjs

Production Build:
- https://cdn.jsdelivr.net/npm/pixi.js@8.18.1/dist/pixi.min.js
- https://cdn.jsdelivr.net/npm/pixi.js@8.18.1/dist/pixi.min.mjs

Documentation:
- https://pixijs.download/v8.18.1/docs/index.html

## Changed
https://github.com/pixijs/pixijs/compare/v8.18.0...v8.18.1

### 🐛 Fixed
* fix: prevent error when using `Application.domContainerRoot` in Node.js by @UlyssesZh in https://github.com/pixijs/pixijs/pull/12017


# v8.18.0 — 2026-04-14

## 💾 Download

Installation:
```bash
npm install pixi.js@8.18.0
```

Development Build:
- https://cdn.jsdelivr.net/npm/pixi.js@8.18.0/dist/pixi.js
- https://cdn.jsdelivr.net/npm/pixi.js@8.18.0/dist/pixi.mjs

Production Build:
- https://cdn.jsdelivr.net/npm/pixi.js@8.18.0/dist/pixi.min.js
- https://cdn.jsdelivr.net/npm/pixi.js@8.18.0/dist/pixi.min.mjs

Documentation:
- https://pixijs.download/v8.18.0/docs/index.html

## Changed
https://github.com/pixijs/pixijs/compare/v8.17.1...v8.18.0

### 🚨 Behavior Change
* fix: `text.width` and word wrap returning incorrect values by @Zyie in https://github.com/pixijs/pixijs/pull/12007
  * `Text`/`HTMLText`/`BitmapText` with `wordWrap: true` and non-left `align` (`center`/`right`/`justify`) now return the true rendered width from `text.width` instead of reporting `wordWrapWidth`. If you relied on `text.width === wordWrapWidth` for layout, use `wordWrapWidth` directly or wrap the text in a sized container.
  ```ts
  const text = new Text({
      text: 'hello',
      style: { wordWrap: true, wordWrapWidth: 800, align: 'center' },
  });
  // before: text.width === 800
  // after:  text.width reflects the rendered string width
  ```

### 🎁 Added
* feat: add `graphicsContextToSvg()` for Graphics → SVG export by @GoodBoyDigital in https://github.com/pixijs/pixijs/pull/11989
  * Adds `graphicsContextToSvg(source, precision?)`, a pure function that serializes a `Graphics` or `GraphicsContext` to a self-contained SVG string. Supports rects, circles, ellipses, rounded rects, polygons, bezier/quadratic/arc paths, strokes, holes (via `fill-rule="evenodd"`), and linear/radial gradients.
  ```ts
  import { Graphics, graphicsContextToSvg } from 'pixi.js';

  const g = new Graphics()
      .rect(0, 0, 100, 50)
      .fill({ color: 0xff0000 })
      .circle(150, 25, 25)
      .stroke({ color: 0x0000ff, width: 4 });

  const svgString = graphicsContextToSvg(g, 2);
  await navigator.clipboard.writeText(svgString);
  ```
* feat: add mask channel selection for sprite masks by @Zyie in https://github.com/pixijs/pixijs/pull/11987
  * `setMask()` gains a `channel` option (`'red' | 'alpha'`) to pick which texture channel drives visibility, matching how design tools like Figma apply PNG masks. Default remains `'red'`.
  ```ts
  import { Assets, Sprite } from 'pixi.js';

  const photo = new Sprite(await Assets.load('photo.png'));
  const maskSprite = new Sprite(await Assets.load('mask-alpha.png'));

  photo.setMask({
      mask: maskSprite,
      channel: 'alpha',
  });
  ```
* feat: allow `preference` to accept an array of renderer types by @Zyie in https://github.com/pixijs/pixijs/pull/11963
  * `autoDetectRenderer` and `Application.init` now accept an array of renderer names for `preference`, letting you restrict the fallback chain (e.g. disable WebGPU entirely) rather than only reorder it. A new `RendererPreference` type is exported.
  ```ts
  import { Application, autoDetectRenderer } from 'pixi.js';

  const renderer = await autoDetectRenderer({
      preference: ['webgl', 'canvas'],
  });

  const app = new Application();
  await app.init({ preference: ['webgl', 'canvas'] });
  ```
* feat: provide a getter to the domElement via `app.domContainerRoot` by @carlos22 in https://github.com/pixijs/pixijs/pull/11974
  * `Application` exposes a read-only `domContainerRoot` getter returning the `HTMLDivElement` that wraps all `DOMContainer` elements, so apps can add CSS classes, inline styles, or customize the DOM overlay root.
  ```ts
  import { Application } from 'pixi.js';

  const app = new Application();
  await app.init({ resizeTo: window });

  app.domContainerRoot.classList.add('pixi-dom-layer');
  app.domContainerRoot.style.pointerEvents = 'auto';
  ```
* feat: add `width` option to `MeshRope` by @mehmetcanakbay in https://github.com/pixijs/pixijs/pull/11990
  * `MeshRope` now accepts an explicit `width` for rope thickness, decoupling it from the texture's height. Omitting `width` preserves the previous `texture.height` default.
  ```ts
  import { MeshRope, Point, Texture } from 'pixi.js';

  const points = [new Point(0, 0), new Point(100, 50), new Point(200, 0)];

  const rope = new MeshRope({
      texture: Texture.from('snake.png'),
      points,
      width: 40,
  });
  ```
* feat: add a default anchor to texture generation by @ksv90 in https://github.com/pixijs/pixijs/pull/12011
  * `renderer.generateTexture()` accepts a `defaultAnchor` option that's forwarded onto the produced `Texture`. `RenderTexture.create()` also gains a `textureOptions` parameter to pass through fields like `defaultAnchor` to the underlying `Texture`.
  ```ts
  import { Graphics, Sprite } from 'pixi.js';

  const shape = new Graphics().circle(0, 0, 50).fill(0xff3366);

  const texture = app.renderer.generateTexture({
      target: shape,
      defaultAnchor: { x: 0.5, y: 0.5 },
  });

  const sprite = new Sprite(texture);
  sprite.position.set(200, 200); // centered by default
  ```

### 🐛 Fixed
* fix: stroke-only Graphics masks now render correctly on Canvas renderer by @DmitriyGolub in https://github.com/pixijs/pixijs/pull/11979
* fix: skip `_applyMipRange` for single-mip textures (iOS 18.0–18.1) by @GoodBoyDigital in https://github.com/pixijs/pixijs/pull/11985
* fix: stale `TextureMatrix` when pooled textures reuse the same reference by @GoodBoyDigital in https://github.com/pixijs/pixijs/pull/11997
* fix: unhandled actions in `GraphicsPath.transform()` switch statement by @Zyie in https://github.com/pixijs/pixijs/pull/11996
* fix(VideoSource): avoid play/mediaReady recursion before video dimensions (#11133) by @satoren in https://github.com/pixijs/pixijs/pull/12009
* fix: `text.width` and word wrap returning incorrect values by @Zyie in https://github.com/pixijs/pixijs/pull/12007
* fix: handle literal `<` characters in `parseTaggedText` by @glennflanagan in https://github.com/pixijs/pixijs/pull/11972
* fix: move `CanvasFilterSystem` to the filters module by @Zyie in https://github.com/pixijs/pixijs/pull/12014
* fix: `SplitText` baseline mismatch when `tagStyles` used with `lineHeight` by @Zyie in https://github.com/pixijs/pixijs/pull/12008
* fix: `TilingSprite.tilePosition` divided by resolution when using Canvas renderer by @Zyie in https://github.com/pixijs/pixijs/pull/11957
* fix: move `CanvasFilterSystem` to filters module by @Zyie in https://github.com/pixijs/pixijs/pull/12014
* fix(VideoSource): avoid play/mediaReady recursion before video dimensions by @satoren in https://github.com/pixijs/pixijs/pull/12009

### 🧹 Chores
* chore: bump `@xmldom/xmldom` to 0.8.12 by @Zyie in https://github.com/pixijs/pixijs/pull/12016

## New Contributors
* @mehmetcanakbay made their first contribution in https://github.com/pixijs/pixijs/pull/11990
* @DmitriyGolub made their first contribution in https://github.com/pixijs/pixijs/pull/11979
* @carlos22 made their first contribution in https://github.com/pixijs/pixijs/pull/11974
* @satoren made their first contribution in https://github.com/pixijs/pixijs/pull/12009
* @ksv90 made their first contribution in https://github.com/pixijs/pixijs/pull/12011
* @glennflanagan made their first contribution in https://github.com/pixijs/pixijs/pull/11972


# v8.17.1 — 2026-03-16

## 💾 Download

Installation:
```bash
npm install pixi.js@8.17.1
```

Development Build:
- https://cdn.jsdelivr.net/npm/pixi.js@8.17.1/dist/pixi.js
- https://cdn.jsdelivr.net/npm/pixi.js@8.17.1/dist/pixi.mjs

Production Build:
- https://cdn.jsdelivr.net/npm/pixi.js@8.17.1/dist/pixi.min.js
- https://cdn.jsdelivr.net/npm/pixi.js@8.17.1/dist/pixi.min.mjs

Documentation:
- https://pixijs.download/v8.17.1/docs/index.html

## Changed
https://github.com/pixijs/pixijs/compare/v8.17.0...v8.17.1

### 🐛 Fixed
* fix: compressed textures ignoring resolution from URL (e.g. `@0.75x`) by @Zyie in https://github.com/pixijs/pixijs/pull/11960
* fix: center-align text correctly when words exceed wordWrapWidth by @Zyie in https://github.com/pixijs/pixijs/pull/11966

### 🧹 Chores
* chore: fix BitmapFont char keys from char codes to character strings by @Zyie in https://github.com/pixijs/pixijs/pull/11967
* fix: add secrets: inherit to publish-switch workflow for S3 docs upload by @Zyie in https://github.com/pixijs/pixijs/pull/11962


# v8.17.0 — 2026-03-09

## 💾 Download

Installation:
```bash
npm install pixi.js@8.17.0
```

Development Build:
- https://cdn.jsdelivr.net/npm/pixi.js@8.17.0/dist/pixi.js
- https://cdn.jsdelivr.net/npm/pixi.js@8.17.0/dist/pixi.mjs

Production Build:
- https://cdn.jsdelivr.net/npm/pixi.js@8.17.0/dist/pixi.min.js
- https://cdn.jsdelivr.net/npm/pixi.js@8.17.0/dist/pixi.min.mjs

Documentation:
- https://pixijs.download/v8.17.0/docs/index.html

## Changed
https://github.com/pixijs/pixijs/compare/v8.16.0...v8.17.0

### 🚨 Behavior Change
- `BlurFilter` now uses an optimized halving strength scheme by default, which changes visual output compared to previous versions. Set `legacy: true` to restore the old behavior.
  ```ts
  new BlurFilter({ legacy: true });
  // or globally:
  BlurFilter.defaultOptions.legacy = true;
  ```
- Text with `align: 'justify'` now uses `wordWrapWidth` for width calculation instead of `maxLineWidth`, matching CSS behavior. The last line is no longer stretched.
- `breakWords: true` in `HTMLText` now correctly uses CSS `word-break: break-word` instead of `break-all` to match behavior of other text renderers.

### 🎁 Added
* feat: add tagged text support to canvasTextSplit by @Zyie in https://github.com/pixijs/pixijs/pull/11949
  * `SplitText` now supports `tagStyles`, so styled runs (e.g. `<red>Hello</red> <blue>World</blue>`) are correctly split into per-character `Text` objects with individual styles preserved.
* feat: Improves text rendering and layout handling by @Zyie in https://github.com/pixijs/pixijs/pull/11947
  * Bitmap text now supports `whiteSpace` modes (`normal`, `pre`, `nowrap`, `pre-line`, `pre-wrap`) with proper space/newline collapsing
  * Bitmap text word wrap supports break-after characters (hyphens, en-dash, em-dash, soft hyphen)
  * Canvas text and split text now render `align: 'justify'` by distributing extra word spacing
  * Dynamic bitmap fonts scale drop shadow `blur` and `distance` proportionally to font size
  * Bitmap font `xAdvance` now uses true advance width from `measureText()` instead of bounding-box width
  * Kerning values correctly scaled by `fontScale` in dynamic bitmap fonts
* feat: add visibleChanged event to container by @ikigai-bjorn-s in https://github.com/pixijs/pixijs/pull/11940
  ```ts
  container.on('visibleChanged', (visible) => {
      console.log('Visibility changed to:', visible);
  });
  ```
* feat: Add function for removing aliases from resolver by @Sertion in https://github.com/pixijs/pixijs/pull/11921

### 🐛 Fixed
* fix: prevent filter corruption with TexturePool mipmap separation by @vkarponen in https://github.com/pixijs/pixijs/pull/11865
* fix: blur by reducing strength on each pass by @Zyie in https://github.com/pixijs/pixijs/pull/11909
* fix: Reduce work done by the blur shader by @Sertion in https://github.com/pixijs/pixijs/pull/11917
* fix: Correctly handle offset in ColorMatrixFilter by @Sertion in https://github.com/pixijs/pixijs/pull/11925
* fix: Apply global filter offset to ParticleContainer rendering by @GoodBoyDigital in https://github.com/pixijs/pixijs/pull/11882
* fix: respect texture trim offset in NineSliceSprite by @shtse8 in https://github.com/pixijs/pixijs/pull/11919
* fix: return valid empty bounds from empty Graphics by @GoodBoyDigital in https://github.com/pixijs/pixijs/pull/11908
* fix: Graphics getLocalBounds returns stale data between operations in same frame by @GoodBoyDigital in https://github.com/pixijs/pixijs/pull/11886
* fix: Graphics bounds account for miter joins at sharp angles by @GoodBoyDigital in https://github.com/pixijs/pixijs/pull/11884
* fix: BindGroup crash when resource destroyed in batched group by @GoodBoyDigital in https://github.com/pixijs/pixijs/pull/11876
* fix: remove listener from old resource in BindGroup.setResource by @GoodBoyDigital in https://github.com/pixijs/pixijs/pull/11901
* fix: removeAllListeners() on Renderer.destroy() by @taye in https://github.com/pixijs/pixijs/pull/11951
* fix: correct minFPS/maxFPS mutual clamping in Ticker by @Zyie in https://github.com/pixijs/pixijs/pull/11952
* fix: invalidate cached source in color.setAlpha() to prevent stale alpha reuse by @darthvader58 in https://github.com/pixijs/pixijs/pull/11924
* fix: emit removed event when using addChildAt by @aSipz in https://github.com/pixijs/pixijs/pull/11912
* fix: guard against missing characters and kerning data in bitmap text by @stargazer-2697 in https://github.com/pixijs/pixijs/pull/11907
* fix: copy modifier keys from TouchEvent to normalized touch objects by @kaigritun in https://github.com/pixijs/pixijs/pull/11906
* fix: use quotes when loading a Web font to support old versions of Chrome by @adngdb in https://github.com/pixijs/pixijs/pull/11902
* fix: move DOMPipe registration to init.ts to fix Web Worker support by @Zyie in https://github.com/pixijs/pixijs/pull/11953
* fix: clarify BackgroundLoader cache behavior in documentation by @imuday984 in https://github.com/pixijs/pixijs/pull/11935

### 🧹 Chores
* chore: Add PixiJS development playground by @GoodBoyDigital in https://github.com/pixijs/pixijs/pull/11878
* chore: overhaul documentation system with TypeDoc plugins, examples, and guides by @Zyie in https://github.com/pixijs/pixijs/pull/11905
* chore: consolidate build and test scripts by @Zyie in https://github.com/pixijs/pixijs/pull/11910
* chore: expand build, test, and API documentation by @Zyie in https://github.com/pixijs/pixijs/pull/11956
* chore: combine visual test diff output into single labeled image by @Zyie in https://github.com/pixijs/pixijs/pull/11954
* chore: add ESLint rule enforcing ~/ imports in test and scene files by @Zyie in https://github.com/pixijs/pixijs/pull/11899
* chore: reorganizes visual scene tests into logical subdirectories by @Zyie in https://github.com/pixijs/pixijs/pull/11872
* chore: Improve test server setup by dynamically allocating port by @Zyie in https://github.com/pixijs/pixijs/pull/11874
* chore: increase HTMLText visual test wait from 250ms to 350ms by @Zyie in https://github.com/pixijs/pixijs/pull/11891
* chore: remove tsc-silent dependency by @Zyie
* docs: document filters + RenderLayer limitation by @GoodBoyDigital in https://github.com/pixijs/pixijs/pull/11883

## New Contributors
* @adngdb made their first contribution in https://github.com/pixijs/pixijs/pull/11902
* @kaigritun made their first contribution in https://github.com/pixijs/pixijs/pull/11906
* @darthvader58 made their first contribution in https://github.com/pixijs/pixijs/pull/11924
* @Sertion made their first contribution in https://github.com/pixijs/pixijs/pull/11925
* @shtse8 made their first contribution in https://github.com/pixijs/pixijs/pull/11919
* @aSipz made their first contribution in https://github.com/pixijs/pixijs/pull/11912
* @ikigai-bjorn-s made their first contribution in https://github.com/pixijs/pixijs/pull/11940
* @vkarponen made their first contribution in https://github.com/pixijs/pixijs/pull/11865
* @imuday984 made their first contribution in https://github.com/pixijs/pixijs/pull/11935
* @taye made their first contribution in https://github.com/pixijs/pixijs/pull/11951


# v8.16.0 — 2026-02-03

## 💾  Download

Installation:
```bash
npm install pixi.js@8.16.0
```

Development Build:
- https://cdn.jsdelivr.net/npm/pixi.js@8.16.0/dist/pixi.js
- https://cdn.jsdelivr.net/npm/pixi.js@8.16.0/dist/pixi.mjs

Production Build:
- https://cdn.jsdelivr.net/npm/pixi.js@8.16.0/dist/pixi.min.js
- https://cdn.jsdelivr.net/npm/pixi.js@8.16.0/dist/pixi.min.mjs

Documentation:
- https://pixijs.download/v8.16.0/docs/index.html

## Changed
https://github.com/pixijs/pixijs/compare/v8.15.0...v8.16.0

### 🚨 Behavior Change
- `SplitText` now more accurately splits `Text` across a wider range of `TextStyle` configurations. This may result in slight changes to character positioning.
- Using `SplitText.from` from an existing `Text` now correctly transfers the source anchor to the new instance by mapping the anchor to pivot coordinates. This changes layout and positioning compared to previous behavior.
- `SplitBitmapText` now correctly defaults to a `white` fill, matching the behavior of `BitmapText`.
- `HTMLText` now correctly respects `breakWords` and no longer cuts off words that exceed `wordWrapWidth`.
- `HTMLText` now respects the alpha value of its fill and stroke.
- `Text` now correctly aligns when using `align: 'right'` or `align: 'center'`, resulting in a small positional adjustment.
- `Container.cullArea` is now correctly interpreted in the container’s local coordinate space and transformed to global coordinates before culling checks.
  ```ts
  // cullArea is defined in local space and transformed during culling
  container.cullArea = new Rectangle(0, 0, 100, 100);
  ```

* `graphics.texture(texture, 0x000000)` will now correctly apply a black tint
### 🎁 Added
* feat: Canvas renderer by @krzys @Zyie in https://github.com/pixijs/pixijs/pull/11815
  * Note: This feature is experimental, please let us know if you run into any issues.
  ```ts
   await app.init({
        preference: 'canvas'
    });
   ``` 
* feat: tagged text by @Zyie in https://github.com/pixijs/pixijs/pull/11827
  * Note: Currently only works for `Text`/`HTMLText`, `BitmapText` support coming soon
  ```ts
   const text = new Text({
    text: '<bold>Important:</bold> This is <highlight>highlighted</highlight> text',
    style: {
        fontFamily: 'Arial',
        fontSize: 28,
        fill: 'white',
        tagStyles: {
            bold: { fontWeight: 'bold', fill: 'yellow' },
            highlight: { fill: 'cyan', fontSize: 32 }
        }
    }
   });
   ```  
* feat: improve stability of SplitText by @Zyie in https://github.com/pixijs/pixijs/pull/11858
  * SplitText now fully mirrors Text behavior and regenerates automatically when its TextStyle changes via `text.styleChanged()`
  ```ts
  splitText.style.fontSize = 32
  splitText.styleChanged()
  ``` 
* feat: external texture support by @astralarya @GoodBoyDigital in https://github.com/pixijs/pixijs/pull/11846 https://github.com/pixijs/pixijs/pull/11861 
* feat: add parseSync to spritesheet by @jimhigson in https://github.com/pixijs/pixijs/pull/11794
* feat: improved Pool typing for pool.get() method by @unstoppablecarl in https://github.com/pixijs/pixijs/pull/11799
* feat: add cube texture by @GoodBoyDigital in https://github.com/pixijs/pixijs/pull/11800
*  by @GoodBoyDigital in 
* feat: Implement mip level rendering support in the rendering system by @GoodBoyDigital in https://github.com/pixijs/pixijs/pull/11801
* feat: render to array layer by @GoodBoyDigital in https://github.com/pixijs/pixijs/pull/11803

### 🐛 Fixed
* fix: Improve HTML text measurement accuracy and add comprehensive test scenes by @Zyie in https://github.com/pixijs/pixijs/pull/11862
* fix: project container.cullArea from local to global coordinate space before doing cull check by @jujurocket in https://github.com/pixijs/pixijs/pull/11598
* fix: use vColor instead of localUniforms.uColor in WebGPU MSDF shader by @Riphal in https://github.com/pixijs/pixijs/pull/11848
* fix: preserve VAO cache in GlGeometrySystem by @GoodBoyDigital in https://github.com/pixijs/pixijs/pull/11863
* fix: GC system to ensure render groups are marked as dirty by @Zyie in https://github.com/pixijs/pixijs/pull/11842
* fix: SplitBitmapText requires "fill: 'white'" by @GiorgiMaziashvili in https://github.com/pixijs/pixijs/pull/11721
* fix: preserve generic type parameters in WGSL struct reflection by @stargazer-2697 in https://github.com/pixijs/pixijs/pull/11855
* fix: improve extractAttributesFromGpuProgram to support struct-based inputs by @GoodBoyDigital in https://github.com/pixijs/pixijs/pull/11796
* fix: improves tree-shaking by optimizing module imports by @Zyie in https://github.com/pixijs/pixijs/pull/11833
* fix: disambiguate falsey tint with black uint by @bigtimebuddy in https://github.com/pixijs/pixijs/pull/11831
* fix: BitmapFontManager getFont emitting TextStyle update event by @subhu339 in https://github.com/pixijs/pixijs/pull/11835
* fix: allow custom parsers to override src in Resolver (#11828) by @GoodBoyDigital in https://github.com/pixijs/pixijs/pull/11849
* fix: recognise WGSL vertex attributes followed by closing parenthesis by @stargazer-2697 in https://github.com/pixijs/pixijs/pull/11854
* fix: Video Loader Not Catching Load Errors by @stargazer-2697 in https://github.com/pixijs/pixijs/pull/11856

### 🧹 Chores
* chore: add visual tests for text rendering features by @Zyie in https://github.com/pixijs/pixijs/pull/11825
* chore: Upgrades dependencies by @Zyie in https://github.com/pixijs/pixijs/pull/11806
* chore: guide to use envinfo to get environment information by @Typed SIGTERM in https://github.com/pixijs/pixijs/pull/11859
* chore: optimize fastCopy with waterfall typed array selection by @GoodBoyDigital in https://github.com/pixijs/pixijs/pull/11798
* chore: use texImage2D instead of texSubImage2D for video in Safari by @GoodBoyDigital in https://github.com/pixijs/pixijs/pull/11867

## New Contributors
* @subhu339 made their first contribution in https://github.com/pixijs/pixijs/pull/11835
* @stargazer-2697 made their first contribution in https://github.com/pixijs/pixijs/pull/11854
* @GiorgiMaziashvili made their first contribution in https://github.com/pixijs/pixijs/pull/11721
* @Riphal made their first contribution in https://github.com/pixijs/pixijs/pull/11848
* @jujurocket made their first contribution in https://github.com/pixijs/pixijs/pull/11598
* @krzys made their first contribution in https://github.com/pixijs/pixijs/pull/11815


# v8.15.0 — 2026-01-05

## 💾  Download

Installation:
```bash
npm install pixi.js@8.15.0
```

Development Build:
- https://cdn.jsdelivr.net/npm/pixi.js@8.15.0/dist/pixi.js
- https://cdn.jsdelivr.net/npm/pixi.js@8.15.0/dist/pixi.mjs

Production Build:
- https://cdn.jsdelivr.net/npm/pixi.js@8.15.0/dist/pixi.min.js
- https://cdn.jsdelivr.net/npm/pixi.js@8.15.0/dist/pixi.min.mjs

Documentation:
- https://pixijs.download/v8.15.0/docs/index.html

## Changed
https://github.com/pixijs/pixijs/compare/v8.14.3...v8.15.0

### 🎁 Added
* feat: add unified GC by @Zyie in https://github.com/pixijs/pixijs/pull/11786
  * Deprecated `TextureGCSystem`/`RenderableGCSystem` in favor of `GCSystem`.
	```ts
	// old 
	app.init({
	    textureGCActive: true,
	    textureGCMaxIdle: 60000,
	    textureGCCheckCountMax: 30000,
	    renderableGCActive: true,
	    renderableGCMaxUnusedTime: 60000,
	    renderableGCFrequency: 30000,
	});
	
	// new
	app.init({
	  gcActive: true,
	  gcMaxUnusedTime: 60000,
	  gcFrequency: 30000,
	});
	``` 
  * feat: Adds auto-GC option to view containers by @Zyie in https://github.com/pixijs/pixijs/pull/11810
    * Disable automatic garbage collection for a node.
		```ts
		new Sprite({
		    autoGarbageCollect: false,
		});
		``` 
* feat: add unload method to reset GPU data by @Zyie in https://github.com/pixijs/pixijs/pull/11762
  * You can now manually unload a node by calling its `unload` method. This releases any GPU resources associated with the node. The node can still be used afterward—it will be re-created automatically when needed.

	```ts
	sprite.unload();
	text.unload();
	mesh.unload(); 
	```
  * feat: move GPU context storage to GraphicsContext._gpuData by @Zyie in https://github.com/pixijs/pixijs/pull/11763
  * feat: move GPU data to Geometry._gpuData by @Zyie in https://github.com/pixijs/pixijs/pull/11772
  * feat: move GPUData to TextureSource by @Zyie in https://github.com/pixijs/pixijs/pull/11774
  * feat: move GL/GPU buffer storage to Buffer._gpuData and manage buffers list by @Zyie in https://github.com/pixijs/pixijs/pull/11775
  * feat: add descriptive names GCManagedHash  by @Zyie in https://github.com/pixijs/pixijs/pull/11811
  * feat: update text GPU lifecycle and resolution updates by @Zyie in https://github.com/pixijs/pixijs/pull/11781
* feat: ParticleContainer type improvements by @unstoppablecarl in https://github.com/pixijs/pixijs/pull/11708
* feat: allow RenderTexture.create to accept dynamic option by @seanzhaoxiaoxiao in https://github.com/pixijs/pixijs/pull/11767

### 🐛 Fixed
* fix: SVGParser.ts Allow negative values for Polygon(s)/polyline(s) by @Raukie in https://github.com/pixijs/pixijs/pull/11771
* fix: prevent double returning of batches to pool by @GoodBoyDigital in https://github.com/pixijs/pixijs/pull/11780
* fix: Add error handling for message processing in KTX worker by @zardoy in https://github.com/pixijs/pixijs/pull/11768
* fix: RenderTexture ignoring format setting (WebGL) by @laino in https://github.com/pixijs/pixijs/pull/11777
* fix: Add Multiple Render Targets (MRT) support by @GoodBoyDigital in https://github.com/pixijs/pixijs/pull/11792
* fix: correct viewport Y calculation for root render targets by @GoodBoyDigital in https://github.com/pixijs/pixijs/pull/11797
* fix: garbage collection for bitmap text by @Zyie in https://github.com/pixijs/pixijs/pull/11809

### 🧹 Chores
* chore: Improve JSDoc documentation across modules by @Zyie in https://github.com/pixijs/pixijs/pull/11812
* chore: refactors CI workflows for trusted publishing by @Zyie in https://github.com/pixijs/pixijs/pull/11820

## New Contributors
* @Raukie made their first contribution in https://github.com/pixijs/pixijs/pull/11771
* @seanzhaoxiaoxiao made their first contribution in https://github.com/pixijs/pixijs/pull/11767
* @zardoy made their first contribution in https://github.com/pixijs/pixijs/pull/11768


# v8.15.0-rc — 2025-12-08

## 💾  Download

Installation:
```bash
npm install pixi.js@8.15.0-rc
```

Development Build:
- https://cdn.jsdelivr.net/npm/pixi.js@8.15.0-rc/dist/pixi.js
- https://cdn.jsdelivr.net/npm/pixi.js@8.15.0-rc/dist/pixi.mjs

Production Build:
- https://cdn.jsdelivr.net/npm/pixi.js@8.15.0-rc/dist/pixi.min.js
- https://cdn.jsdelivr.net/npm/pixi.js@8.15.0-rc/dist/pixi.min.mjs

Documentation:
- https://pixijs.download/v8.15.0-rc/docs/index.html

## Changed

https://github.com/pixijs/pixijs/compare/v8.14.3...v8.15.0-rc

### 🎁 Added
* feat: allow RenderTexture.create to accept dynamic option by @seanzhaoxiaoxiao in https://github.com/pixijs/pixijs/pull/11767
* feat: add unload method to reset GPU data by @Zyie in https://github.com/pixijs/pixijs/pull/11762
* feat: add unified GC by @Zyie in https://github.com/pixijs/pixijs/pull/11786
	* feat: move GPU context storage to GraphicsContext._gpuData by @Zyie in https://github.com/pixijs/pixijs/pull/11763
	* feat: move GPU data to Geometry._gpuData by @Zyie in https://github.com/pixijs/pixijs/pull/11772
	* feat: move GPUData to TextureSource by @Zyie in https://github.com/pixijs/pixijs/pull/11774
	* feat: move GL/GPU buffer storage to Buffer._gpuData and manage buffers list by @Zyie in https://github.com/pixijs/pixijs/pull/11775
	* feat: update text GPU lifecycle and resolution updates by @Zyie in https://github.com/pixijs/pixijs/pull/11781
* feat: ParticleContainer type improvements by @unstoppablecarl in https://github.com/pixijs/pixijs/pull/11708

### 🐛 Fixed
* fix: SVGParser.ts Allow negative values for Polygon(s)/polyline(s) by @Raukie in https://github.com/pixijs/pixijs/pull/11771
* fix: prevent double returning of batches to pool by @GoodBoyDigital in https://github.com/pixijs/pixijs/pull/11780
* fix: Add error handling for message processing in KTX worker by @zardoy in https://github.com/pixijs/pixijs/pull/11768
* fix: RenderTexture ignoring format setting (WebGL) by @laino in https://github.com/pixijs/pixijs/pull/11777
* fix: Add Multiple Render Targets (MRT) support by @GoodBoyDigital in https://github.com/pixijs/pixijs/pull/11792

## New Contributors
* @Raukie made their first contribution in https://github.com/pixijs/pixijs/pull/11771
* @seanzhaoxiaoxiao made their first contribution in https://github.com/pixijs/pixijs/pull/11767
* @zardoy made their first contribution in https://github.com/pixijs/pixijs/pull/11768


# v8.14.3 — 2025-11-20

## 💾  Download

Installation:
```bash
npm install pixi.js@8.14.3
```

Development Build:
- https://cdn.jsdelivr.net/npm/pixi.js@8.14.3/dist/pixi.js
- https://cdn.jsdelivr.net/npm/pixi.js@8.14.3/dist/pixi.mjs

Production Build:
- https://cdn.jsdelivr.net/npm/pixi.js@8.14.3/dist/pixi.min.js
- https://cdn.jsdelivr.net/npm/pixi.js@8.14.3/dist/pixi.min.mjs

Documentation:
- https://pixijs.download/v8.14.3/docs/index.html

## Changed
https://github.com/pixijs/pixijs/compare/v8.14.2...v8.14.3

### 🐛 Fixed
* fix: Only create stage Container on init if it doesn't exist by @lunarraid in https://github.com/pixijs/pixijs/pull/11766


# v8.14.2 — 2025-11-18

## 💾  Download

Installation:
```bash
npm install pixi.js@8.14.2
```

Development Build:
- https://cdn.jsdelivr.net/npm/pixi.js@8.14.2/dist/pixi.js
- https://cdn.jsdelivr.net/npm/pixi.js@8.14.2/dist/pixi.mjs

Production Build:
- https://cdn.jsdelivr.net/npm/pixi.js@8.14.2/dist/pixi.min.js
- https://cdn.jsdelivr.net/npm/pixi.js@8.14.2/dist/pixi.min.mjs

Documentation:
- https://pixijs.download/v8.14.2/docs/index.html

## Changed
https://github.com/pixijs/pixijs/compare/v8.14.1...v8.14.2

### 🐛 Fixed
* fix: graphics memory leak and cleanup by @Zyie in https://github.com/pixijs/pixijs/pull/11753
* fix: typo in Application example: replace '-' with '=' in asset loading by @Aryaman1792 in https://github.com/pixijs/pixijs/pull/11750
* fix: parse resolution and format from URLs in object sources in assets resolver by @stereopasa in https://github.com/pixijs/pixijs/pull/11747
* fix: track item count in Pool class and add related tests by @Zyie in https://github.com/pixijs/pixijs/pull/11760
* fix: bitmanFontXMLParser should recognize xml fonts with versions by @rafalaidlaw in https://github.com/pixijs/pixijs/pull/11761
* fix: Remove automatically added 'resize' event listener from TextureSource on Texture destroy() by @Romans-I-XVI in https://github.com/pixijs/pixijs/pull/11764
* fix: resolve a typescript annoyance with Container.filters by @jimhigson in https://github.com/pixijs/pixijs/pull/11757
* fix: enable proper application reinitialization by @Zyie in https://github.com/pixijs/pixijs/pull/11759
* fix: correct uBackTexture binding for filters with blendRequired by @GoodBoyDigital in https://github.com/pixijs/pixijs/pull/11754

### 🧹 Chores
* chore: add mention of uBackTexture to Filter docs (otherwise undocumented) by @jimhigson in https://github.com/pixijs/pixijs/pull/11756

## New Contributors
* @Aryaman1792 made their first contribution in https://github.com/pixijs/pixijs/pull/11750
* @stereopasa made their first contribution in https://github.com/pixijs/pixijs/pull/11747
* @rafalaidlaw made their first contribution in https://github.com/pixijs/pixijs/pull/11761
* @Romans-I-XVI made their first contribution in https://github.com/pixijs/pixijs/pull/11764


# v8.14.1 — 2025-11-10

## 💾  Download

Installation:
```bash
npm install pixi.js@8.14.1
```

Development Build:
- https://cdn.jsdelivr.net/npm/pixi.js@8.14.1/dist/pixi.js
- https://cdn.jsdelivr.net/npm/pixi.js@8.14.1/dist/pixi.mjs

Production Build:
- https://cdn.jsdelivr.net/npm/pixi.js@8.14.1/dist/pixi.min.js
- https://cdn.jsdelivr.net/npm/pixi.js@8.14.1/dist/pixi.min.mjs

Documentation:
- https://pixijs.download/v8.14.1/docs/index.html

## Changed
https://github.com/pixijs/pixijs/compare/v8.14.0...v8.14.1

### 🐛 Fixed
* fix: bytesPerRow calculation for BufferImageSource in WebGPU by @koteelok in https://github.com/pixijs/pixijs/pull/11718
* fix: Guards mask reset from null reference by @Zyie in https://github.com/pixijs/pixijs/pull/11719
* fix: Prevents errors during worker manager reset by @Zyie in https://github.com/pixijs/pixijs/pull/11720

### 🧹 Chores
* chore: move transcoders off pixijs.download by @bigtimebuddy in https://github.com/pixijs/pixijs/pull/11730
* chore: cleanup using optional chaining by @bigtimebuddy in https://github.com/pixijs/pixijs/pull/11713


# v8.14.0 — 2025-10-06

## 💾  Download

Installation:
```bash
npm install pixi.js@8.14.0
```

Development Build:
- https://cdn.jsdelivr.net/npm/pixi.js@8.14.0/dist/pixi.js
- https://cdn.jsdelivr.net/npm/pixi.js@8.14.0/dist/pixi.mjs

Production Build:
- https://cdn.jsdelivr.net/npm/pixi.js@8.14.0/dist/pixi.min.js
- https://cdn.jsdelivr.net/npm/pixi.js@8.14.0/dist/pixi.min.mjs

Documentation:
- https://pixijs.download/v8.14.0/docs/index.html

## Changed
https://github.com/pixijs/pixi.js/compare/v8.13.2...v8.14.0

### 🎁 Added
* feat: add asset loading strategies by @Zyie in https://github.com/pixijs/pixijs/pull/11693
  * Three new loading strategies have been introduced: `throw`, `skip`, and `retry`
    * `throw`: The default strategy and matches the behavior of previous versions. With this strategy enabled any asset that fails to load will throw an error and the promise will reject.
    * `skip`: If any asset fails to load not error is thrown and the loader continues to load other assets
    * `retry`: Allow for multiple attempts at loading an asset before an error is thrown. The number of attempts and the delay between attempts are configurable
  ```ts
  const options: LoadOptions = {
    strategy: 'retry',
    retryCount: 5, // Retry up to 5 times
  };
  await Assets.load('unstable-asset.png', options);
  ```
  ```ts
  await Assets.init({
      basePath,
      loadOptions: { strategy: 'skip', onError: (error, asset) => console.log(error, asset.url) },
  });

  Assets.addBundle('testBundle', [
      { alias: 'bunny', src: 'textures/bunny_no_img.png' },
      { alias: 'bunny2', src: 'textures/bunny.png' },
  ]);

  // only bunny2 is defined and did not throw an error
  const assets = await Assets.loadBundle('testBundle');
  ```
* feat: Adds progress size to asset loading by @Zyie in https://github.com/pixijs/pixijs/pull/11699
  * You can provide `progressSize` when loading assets to get a more accurate loading percentage. If no size is provide the default value is 1. 
  ```ts
  const assets = [
      {
          src: [
              {
                  src: 'textures/texture.webp',
                  progressSize: 900,
              },
          ],
          alias: ['bunny-array', 'bunny-array2'],
      },
      {
          src: 'textures/bunny.png',
          progressSize: 100,
      }
  ];
  const res = await Assets.load(assets, progressMock);
  ```
* feat: added rotate to Point math-extras by @unstoppablecarl in https://github.com/pixijs/pixijs/pull/11704
  ```ts
    // Basic point rotation
    const point = new Point(10, 20);
    const degrees = 45
    const radians = degrees * (Math.PI / 180)
    const result = point.rotate(radians);
    console.log(result); // {x: -7.071067811865474, y: 21.213203435596427}
  
    // Using output point for efficiency
    const output = new Point(10, 20);
    point.rotate(90 * (Math.PI / 180), output);
    console.log(result); // {x: -7.071067811865474, y: 21.213203435596427}
  ```
* feat: add change guards to TextStyle setters to prevent redundant updates by @mayakwd in https://github.com/pixijs/pixijs/pull/11677

### 🐛 Fixed
* fix: incorrect accessibility div when recycled from the pool (#11679) by @brentmc in https://github.com/pixijs/pixijs/pull/11680
* fix: use updated childrenRenderablesToUpdate index in validateRenderables by @davidetan in https://github.com/pixijs/pixijs/pull/11688
* fix: modify conditional to skip draw call when instanceCount < 1 by @jaburwock in https://github.com/pixijs/pixijs/pull/11639
* fix: respect filter enabled state by @mayakwd in https://github.com/pixijs/pixijs/pull/11674
* fix: ensure `updateTextBounds` is called regardless of style and resolution change by @mayakwd in https://github.com/pixijs/pixijs/pull/11676
* fix: Allow IRenderLayer as part of the ContainerOptions children array by @albinkong in https://github.com/pixijs/pixijs/pull/11687
* fix: removes accessibility system event listeners correctly by @Zyie in https://github.com/pixijs/pixijs/pull/11700

### 🧹 Chores
* chore: fix outdated `textureSourceOptions` doc example by @Caden-Hornyak in https://github.com/pixijs/pixijs/pull/11686

## New Contributors
* @Caden-Hornyak made their first contribution in https://github.com/pixijs/pixijs/pull/11686
* @jaburwock made their first contribution in https://github.com/pixijs/pixijs/pull/11639
* @unstoppablecarl made their first contribution in https://github.com/pixijs/pixijs/pull/11704


# v8.13.2 — 2025-09-10

## 💾  Download

Installation:
```bash
npm install pixi.js@8.13.2
```

Development Build:
- https://cdn.jsdelivr.net/npm/pixi.js@8.13.2/dist/pixi.js
- https://cdn.jsdelivr.net/npm/pixi.js@8.13.2/dist/pixi.mjs

Production Build:
- https://cdn.jsdelivr.net/npm/pixi.js@8.13.2/dist/pixi.min.js
- https://cdn.jsdelivr.net/npm/pixi.js@8.13.2/dist/pixi.min.mjs

Documentation:
- https://pixijs.download/v8.13.2/docs/index.html

## Changed
https://github.com/pixijs/pixi.js/compare/v8.13.1...v8.13.2

### 🐛 Fixed
* fix: application destroy for graphics by @Zyie in https://github.com/pixijs/pixijs/pull/11659
* fix: recalculate the boundaries of `GraphicsContext` regardless of rendering `dirty` state by @mayakwd in https://github.com/pixijs/pixijs/pull/11671
* fix: destroy of prepared but not rendered text should not throw an error by @mayakwd in https://github.com/pixijs/pixijs/pull/11672


# v8.13.1 — 2025-09-03

## 💾  Download

Installation:
```bash
npm install pixi.js@8.13.1
```

Development Build:
- https://cdn.jsdelivr.net/npm/pixi.js@8.13.1/dist/pixi.js
- https://cdn.jsdelivr.net/npm/pixi.js@8.13.1/dist/pixi.mjs

Production Build:
- https://cdn.jsdelivr.net/npm/pixi.js@8.13.1/dist/pixi.min.js
- https://cdn.jsdelivr.net/npm/pixi.js@8.13.1/dist/pixi.min.mjs

Documentation:
- https://pixijs.download/v8.13.1/docs/index.html

## Changed
https://github.com/pixijs/pixi.js/compare/v8.13.0...v8.13.1

### 🐛 Fixed
* fix: text texture incorrectly released when destroyed by @Zyie in https://github.com/pixijs/pixijs/pull/11658
* fix: fix accessibility debug div tabIndex label (#11654) by @brentmc in https://github.com/pixijs/pixijs/pull/11655

## New Contributors
* @brentmc made their first contribution in https://github.com/pixijs/pixijs/pull/11655


# v8.13.0 — 2025-09-02

## 💾  Download

Installation:
```bash
npm install pixi.js@8.13.0
```

Development Build:
- https://cdn.jsdelivr.net/npm/pixi.js@8.13.0/dist/pixi.js
- https://cdn.jsdelivr.net/npm/pixi.js@8.13.0/dist/pixi.mjs

Production Build:
- https://cdn.jsdelivr.net/npm/pixi.js@8.13.0/dist/pixi.min.js
- https://cdn.jsdelivr.net/npm/pixi.js@8.13.0/dist/pixi.min.mjs

Documentation:
- https://pixijs.download/v8.13.0/docs/index.html

## Changed
https://github.com/pixijs/pixi.js/compare/v8.12.0...v8.13.0

### 🎁 Added
* feat: support svg fill rule subpath rendering by @creativoma in https://github.com/pixijs/pixijs/pull/11604
* feat: simplified caching for text by @Zyie in https://github.com/pixijs/pixijs/pull/11505
  * Text that shares the same `TextStyle` will now share the same texture
  ```ts
  const textStyle = new PIXI.TextStyle({ fontSize: 24, fontFamily: "Verdana", fill: 0xffffff });
  const COUNT = 25000; 

  for (let i = 0; i < COUNT; i++) {
      const bunny = new Text({ text: 'hello', style: textStyle });

      bunny.x = (i % 100) * 105;
      bunny.y = Math.floor(i / 100) * 25;
      container.addChild(bunny);
  }
  ```
* feat: add LRU cache for text measuring by @Zyie in https://github.com/pixijs/pixijs/pull/11644
* feat: suppression and colorization options for deprecation message by @mayakwd in https://github.com/pixijs/pixijs/pull/11617
  ```ts
  import { deprecation } from 'pixi.js';
  // Supresses deprecation warnings
  deprecation.quiet = true;
  // Removes color formatting from deprecation messages
  deprecation.noColor = true;
  ```

### 🐛 Fixed
* fix: destroy texture during ViewSystem cleanup to prevent resource leaks by @mayakwd in https://github.com/pixijs/pixijs/pull/11614
* fix: stage visible false no effect by @creativoma in https://github.com/pixijs/pixijs/pull/11615
* fix: reset bounds dirty flag in GraphicsContext to prevent recalculations on each access by @mayakwd in https://github.com/pixijs/pixijs/pull/11616
* fix: improve error message for array uniform syntax by @creativoma in https://github.com/pixijs/pixijs/pull/11602
* fix: Fix incompatible `parent` type on `IFederatedContainer` by @Mysak0CZ in https://github.com/pixijs/pixijs/pull/11603
* fix: handle uniform buffer bindings check in WebGL1 gracefully (#11458) by @mayakwd in https://github.com/pixijs/pixijs/pull/11608
* fix: avoid using createObjectURL by @UlyssesZh in https://github.com/pixijs/pixijs/pull/11599
* fix: take in account uRound inside particles shader (webgpu) by @steel97 in https://github.com/pixijs/pixijs/pull/11624
* fix: `onRender` type should include `null` by @bee1an in https://github.com/pixijs/pixijs/pull/11627
* fix: Advanced blending modes within render groups, cached as texture render groups by @mayakwd in https://github.com/pixijs/pixijs/pull/11607
* fix:  ignore empty renderable bounds (#11589) by @mayakwd in https://github.com/pixijs/pixijs/pull/11611
* fix: preserve HTMLText texture until the new texture generation completes by @mayakwd in https://github.com/pixijs/pixijs/pull/11621
* fix: applying nextLine to BitmapTextLayout so it renders newlines properly by @dusanradivojevic in https://github.com/pixijs/pixijs/pull/11605
* fix: allow canvas source options for gif asset by @bigtimebuddy in https://github.com/pixijs/pixijs/pull/11635
* fix: fix multiple memory leaks in Text by @Tianj0o in https://github.com/pixijs/pixijs/pull/11619
* fix: svg edges trimmed decimal resolutions by @creativoma in https://github.com/pixijs/pixijs/pull/11632
* fix: make text filters immutable by @Zyie in https://github.com/pixijs/pixijs/pull/11645
* fix: cast index type to number as it required by setVertexBuffer by @katmai7 in https://github.com/pixijs/pixijs/pull/11650
* fix: restore `buildGeometryFromPath` functionality by @mayakwd in https://github.com/pixijs/pixijs/pull/11623
* fix: supports husky to run without PATH by @bigtimebuddy in https://github.com/pixijs/pixijs/pull/11638
* fix: unsafe-eval particle update polyfill by @westarne in https://github.com/pixijs/pixijs/pull/11643
* fix: memory leaks in renderer systems by @Zyie in https://github.com/pixijs/pixijs/pull/11581

### 🧹 Chores
* chore: add favicon to docs by @bigtimebuddy in https://github.com/pixijs/pixijs/pull/11637
* chore: conditionally disable StackBlitz publish workflow on non-origin repositories by @mayakwd in https://github.com/pixijs/pixijs/pull/11618
* chore: add lint rule to prevent using `document` and `Image` by @UlyssesZh in https://github.com/pixijs/pixijs/pull/11600
* chore: add time units documentation to Ticker class by @creativoma in https://github.com/pixijs/pixijs/pull/11601

## New Contributors
* @creativoma made their first contribution in https://github.com/pixijs/pixijs/pull/11615
* @UlyssesZh made their first contribution in https://github.com/pixijs/pixijs/pull/11600
* @steel97 made their first contribution in https://github.com/pixijs/pixijs/pull/11624
* @bee1an made their first contribution in https://github.com/pixijs/pixijs/pull/11627
* @dusanradivojevic made their first contribution in https://github.com/pixijs/pixijs/pull/11605
* @westarne made their first contribution in https://github.com/pixijs/pixijs/pull/11643

**Full Changelog**: https://github.com/pixijs/pixijs/compare/v8.12.0...v8.13.0


# v8.12.0 — 2025-08-05

## 💾  Download

Installation:
```bash
npm install pixi.js@8.12.0
```

Development Build:
- https://cdn.jsdelivr.net/npm/pixi.js@8.12.0/dist/pixi.js
- https://cdn.jsdelivr.net/npm/pixi.js@8.12.0/dist/pixi.mjs

Production Build:
- https://cdn.jsdelivr.net/npm/pixi.js@8.12.0/dist/pixi.min.js
- https://cdn.jsdelivr.net/npm/pixi.js@8.12.0/dist/pixi.min.mjs

Documentation:
- https://pixijs.download/v8.12.0/docs/index.html

## Changed
https://github.com/pixijs/pixi.js/compare/v8.11.0...v8.12.0

### 🚨 Behavior Change 🚨
- `lineHeight` is now correctly calculated for `BitmapText`. This change may result in some text elements changing position slightly. See #11531.

### 🎁 Added
* feat: support scaleMode for cacheAsTexture options by @mayakwd in https://github.com/pixijs/pixijs/pull/11578
  ```ts
  container.cacheAsTexture({
    scaleMode: 'nearest',
  });
  ``` 
* feat: Adds max anisotropy passthrough property by @Zyie in https://github.com/pixijs/pixijs/pull/11588
  ```ts
  texture.source.maxAnisotropy = 16;
  ```
* feat: use DomAdapter for new Image by @Zyie in https://github.com/pixijs/pixijs/pull/11565
  ```ts
  const image = DomAdapter.get().createImage();
  image.src = 'path/to/image.svg';
  ```
* feat: allow sharing device and adaptor with other engine by @littleboarx in https://github.com/pixijs/pixijs/pull/11435
  ```ts
  const adapter = await navigator.gpu.requestAdapter();
  const device = await adapter.requestDevice();

  const app = new Application();
  await app.init({ gpu: { adapter, device } });
  ```
* feat: Refactors asset parser configuration by @Zyie in https://github.com/pixijs/pixijs/pull/11557
  ```ts
  // Old way
  await Assets.load({ src: 'path/to/asset', data: { loadParser: 'loadJson' } });
  // New way
  await Assets.load({ src: 'path/to/asset', data: { parser: 'json' } });

  // Name changes
  // 'loadJson' -> 'json'
  // 'loadSvg' -> 'svg'
  // 'loadTxt' -> 'text'
  // 'loadVideo' -> 'video'
  // 'loadWebFont' -> 'web-font'
  // 'loadBitmapFont' -> 'bitmap-font'
  // 'spritesheetLoader' -> 'spritesheet'
  // 'loadTextures' -> 'texture'
  // 'loadBasis' -> 'basis'
  // 'loadDds' -> 'dds'
  // 'loadKtx2' -> 'ktx2'
  // 'loadKtx' -> 'ktx'
  ```
* feat: add WorkerManager.reset by @Zyie in https://github.com/pixijs/pixijs/pull/11562
  ```ts
  app.destroy(true, true); // Destroy the app
  WorkerManager.reset(); // Reset the worker pool
  ```
### 🐛 Fixed
* fix: Add missing createCanvas calls by @bigtimebuddy in https://github.com/pixijs/pixijs/pull/11553
* fix: Boost classes in the docs search results by @bigtimebuddy in https://github.com/pixijs/pixijs/pull/11555
* fix: video texture loading with no extension by @Zyie in https://github.com/pixijs/pixijs/pull/11546
* fix: fillGradientStop logic in TextStyle by @Zyie in https://github.com/pixijs/pixijs/pull/11549
* fix: resource leak in Graphics and fills by @Zyie in https://github.com/pixijs/pixijs/pull/11543
* fix: AnimatedSprite destroy method by @Zyie in https://github.com/pixijs/pixijs/pull/11544
* fix: text fill and stroke with padding by @Zyie in https://github.com/pixijs/pixijs/pull/11524
* fix: HTMLText incorrectly handling font weights by @Zyie in https://github.com/pixijs/pixijs/pull/11520
* fix: HTML text rendering with broken tags by @Zyie in https://github.com/pixijs/pixijs/pull/11521
* fix: progress tracking for asset bundles by @Zyie in https://github.com/pixijs/pixijs/pull/11558
* fix: earcut triangulation issues by @Zyie in https://github.com/pixijs/pixijs/pull/11559
* fix: allow for culler plugin to update transforms by @Zyie in https://github.com/pixijs/pixijs/pull/11548
* fix: text fill documentation by @Zyie in https://github.com/pixijs/pixijs/pull/11561
* fix: DOMContainer scaling if canvas width/height is percentage by @Zyie in https://github.com/pixijs/pixijs/pull/11539
* fix: MeshPipe.addRenderable does not set the current geometry parameters by @midiusRed in https://github.com/pixijs/pixijs/pull/11534
* fix: `Text` and `BitmapText` that doesn't render it's new value on some condition by @privatestefans in https://github.com/pixijs/pixijs/pull/11547
* fix: Container.parent type not being nullable and possibly undefined by @ch1ll0ut1 in https://github.com/pixijs/pixijs/pull/11567
* fix: masking turns off when the mask texture is out of the viewport bounds by @mayakwd in https://github.com/pixijs/pixijs/pull/11569
* fix: BitmapFont's texture frame handling for rotated spritesheet regions by @privatestefans in https://github.com/pixijs/pixijs/pull/11525
* fix: incorrect trim mask rendering by @littleboarx in https://github.com/pixijs/pixijs/pull/11529
* fix: origin calculation to ensure it scales from origin point by @Zyie in https://github.com/pixijs/pixijs/pull/11538
* fix: loading unsupported video formats by @Zyie in https://github.com/pixijs/pixijs/pull/11541
* fix: trimmed text rendereing with non default resolution by @mayakwd in https://github.com/pixijs/pixijs/pull/11570
* fix: Align `GetGlobalMixin` implementation with documentation by @albinkong in https://github.com/pixijs/pixijs/pull/11574
* fix: accessibility scaling issues by @Zyie in https://github.com/pixijs/pixijs/pull/11579
* fix: Remove deprecation version constants by @albinkong in https://github.com/pixijs/pixijs/pull/11582
* fix: Installed bitmap text showing wrong fill by @Zyie in https://github.com/pixijs/pixijs/pull/11523
* fix: `lineHeight` calculation for multi-line layout for `BitmapText` by @privatestefans in https://github.com/pixijs/pixijs/pull/11531
* fix: minor typos in comments and docs, add missing @params and @returns by @afarber in https://github.com/pixijs/pixijs/pull/11590

### 🧹 Chores
* chore: add code owners and support newer node versions by @Zyie in https://github.com/pixijs/pixijs/pull/11572
* chore: Increases timeout for HTMLText test by @Zyie in https://github.com/pixijs/pixijs/pull/11580
* chore: adds needs reproduction automation by @Zyie in https://github.com/pixijs/pixijs/pull/11552
* chore: Enables StackBlitz integration by @Zyie in https://github.com/pixijs/pixijs/pull/11571
* chore: update issue templates by @Zyie in https://github.com/pixijs/pixijs/pull/11563
* chore: Fix missing constructors by @bigtimebuddy in https://github.com/pixijs/pixijs/pull/11583
* chore: fix Assets docs typos by @bigtimebuddy in https://github.com/pixijs/pixijs/pull/11586 

## New Contributors
* @privatestefans made their first contribution in https://github.com/pixijs/pixijs/pull/11547
* @ch1ll0ut1 made their first contribution in https://github.com/pixijs/pixijs/pull/11567
* @mayakwd made their first contribution in https://github.com/pixijs/pixijs/pull/11569
* @littleboarx made their first contribution in https://github.com/pixijs/pixijs/pull/11529
* @albinkong made their first contribution in https://github.com/pixijs/pixijs/pull/11574
* @afarber made their first contribution in https://github.com/pixijs/pixijs/pull/11590


# v8.11.0 — 2025-07-03

## 💾  Download

Installation:
```bash
npm install pixi.js@8.11.0
```

Development Build:
- https://cdn.jsdelivr.net/npm/pixi.js@8.11.0/dist/pixi.js
- https://cdn.jsdelivr.net/npm/pixi.js@8.11.0/dist/pixi.mjs

Production Build:
- https://cdn.jsdelivr.net/npm/pixi.js@8.11.0/dist/pixi.min.js
- https://cdn.jsdelivr.net/npm/pixi.js@8.11.0/dist/pixi.min.mjs

Documentation:
- https://pixijs.download/v8.11.0/docs/index.html

## Changed
https://github.com/pixijs/pixi.js/compare/v8.10.2...v8.11.0

### 🚨 Behavior Change 🚨
In this release, we've corrected how `textStyle.padding` interacts with text positioning when `anchor` values are set. Previously, padding could incorrectly offset the position of text objects. With this fix, text objects now behave consistently but you may notice some text elements appear slightly repositioned as a result. This is expected and reflects the intended, more predictable layout.

### 🎁 Added
* feat: adds text splitting functionality by @Zyie in https://github.com/pixijs/pixijs/pull/11496
* feat: Implements replaceChild method for Container by @Zyie in https://github.com/pixijs/pixijs/pull/11506
* feat: Adds origin point for container transformations by @Zyie in https://github.com/pixijs/pixijs/pull/11501
* feat: break words for bitmap text by @iamDecode in https://github.com/pixijs/pixijs/pull/11502
 
### 🐛 Fixed
* fix: text bounds calculation to account for anchor and padding by @GoodBoyDigital in https://github.com/pixijs/pixijs/pull/11483
* fix: dynamic bitmap font shadow applied twice by @Zyie in https://github.com/pixijs/pixijs/pull/11504
* fix: reset transform when returning canvas to CanvasPool by @BOTDan in https://github.com/pixijs/pixijs/pull/11460
* fix: TextMetrics tokenize didn't handle CRLF line ending by @maliut in https://github.com/pixijs/pixijs/pull/11469
* fix: remove special number casing for particle tint by @bigtimebuddy in https://github.com/pixijs/pixijs/pull/11484
* fix: polygon x/y returning incorrect value by @Zyie in https://github.com/pixijs/pixijs/pull/11457
* fix: warn if transparent background is set after opaque init by @Ashish050488 in https://github.com/pixijs/pixijs/pull/11514
 
### 🧹 Chores
* chore: update typedoc and minor doc fixes by @Zyie in https://github.com/pixijs/pixijs/pull/11512

## New Contributors
* @BOTDan made their first contribution in https://github.com/pixijs/pixijs/pull/11460
* @iamDecode made their first contribution in https://github.com/pixijs/pixijs/pull/11502
* @Ashish050488 made their first contribution in https://github.com/pixijs/pixijs/pull/11514


# v8.10.2 — 2025-06-24

## 💾  Download

Installation:
```bash
npm install pixi.js@8.10.2
```

Development Build:
- https://cdn.jsdelivr.net/npm/pixi.js@8.10.2/dist/pixi.js
- https://cdn.jsdelivr.net/npm/pixi.js@8.10.2/dist/pixi.mjs

Production Build:
- https://cdn.jsdelivr.net/npm/pixi.js@8.10.2/dist/pixi.min.js
- https://cdn.jsdelivr.net/npm/pixi.js@8.10.2/dist/pixi.min.mjs

Documentation:
- https://pixijs.download/v8.10.2/docs/index.html

## Changed
https://github.com/pixijs/pixi.js/compare/v8.10.1...v8.10.2

### 🐛 Fixed
* fix: Fix type error on DOMContainer in strict codebases by @Mysak0CZ in https://github.com/pixijs/pixijs/pull/11479
* fix: filter offset by @GoodBoyDigital in https://github.com/pixijs/pixijs/pull/11482
### 🧹 Chores
* chore: add GitHub Sponsors to FUNDING.yml by @tddyco in https://github.com/pixijs/pixijs/pull/11404


# v8.10.1 — 2025-06-05

## 💾  Download

Installation:
```bash
npm install pixi.js@8.10.1
```

Development Build:
- https://cdn.jsdelivr.net/npm/pixi.js@8.10.1/dist/pixi.js
- https://cdn.jsdelivr.net/npm/pixi.js@8.10.1/dist/pixi.mjs

Production Build:
- https://cdn.jsdelivr.net/npm/pixi.js@8.10.1/dist/pixi.min.js
- https://cdn.jsdelivr.net/npm/pixi.js@8.10.1/dist/pixi.min.mjs

Documentation:
- https://pixijs.download/v8.10.1/docs/index.html

## Changed
https://github.com/pixijs/pixi.js/compare/v8.10.0...v8.10.1

### 🐛 Fixed
* fix: earcut export by @Zyie in https://github.com/pixijs/pixijs/pull/11464


# v8.10.0 — 2025-06-03

## 💾  Download

Installation:
```bash
npm install pixi.js@8.10.0
```

Development Build:
- https://cdn.jsdelivr.net/npm/pixi.js@8.10.0/dist/pixi.js
- https://cdn.jsdelivr.net/npm/pixi.js@8.10.0/dist/pixi.mjs

Production Build:
- https://cdn.jsdelivr.net/npm/pixi.js@8.10.0/dist/pixi.min.js
- https://cdn.jsdelivr.net/npm/pixi.js@8.10.0/dist/pixi.min.mjs

Documentation:
- https://pixijs.download/v8.10.0/docs/index.html

## Changed
https://github.com/pixijs/pixi.js/compare/v8.9.2...v8.10.0

### 🚨 Behavior Change 🚨
With this release we have fixed the `ParticleContainer.removeParticles(startIndex, endIndex)` logic to correctly set the `endIndex` to `this.particleChildren.length` by default. This now matches the behavior of `container.removeChildren()`

### 🎁 Added
* feat: support trimmed text by @GoodBoyDigital in https://github.com/pixijs/pixijs/pull/11456
  * Text can now be trimmed! 
   ```ts
   const text2 = new Text({
       text: 'TRIM',
       style: {
           trim: true, // New API
       },
   }); 
  ```
  ![image](https://github.com/user-attachments/assets/b9e46968-4fb0-4b85-8cc7-92e865b088a6)
* feat: textStyle filters by @GoodBoyDigital in https://github.com/pixijs/pixijs/pull/11282
  * Filters can now be baked into a Text on creation. When setting filters this way, the filter is actually baked into the texture at creation time, rather than having to be calculated at run time, eliminating the runtime cost.
  ```ts
  const blurFilter = new BlurFilter();

  const text = new Text({
      text: 'HI',
      style: {
          fontSize: 100,
          fill: 'white',
          filters: [blurFilter], // add some filters to the style
      }
  });
  ``` 
* feat: support textureStyle options on text rendering by @GoodBoyDigital in https://github.com/pixijs/pixijs/pull/11403
  * Text, HTMLText, and BitmapText now all support customising how the texture is generated by passing in the `textureStyle` object 
  ```ts
  const text = new Text({
      text: 'Hello Pixi!',
      style: {...},
      textureStyle: {
          scaleMode: 'nearest',
      }
  });
  ```  
* feat: spritesheet option cachePrefix by @F-star in https://github.com/pixijs/pixijs/pull/11237
* feat: add a limits system to WebGL and WebGPU renderers by @GoodBoyDigital in https://github.com/pixijs/pixijs/pull/11417
* feat: allow for autocomplete on cursor strings by @Zyie in https://github.com/pixijs/pixijs/pull/11438
* feat: The build (ShapeBuilder) method should report its success by @midiusRed in https://github.com/pixijs/pixijs/pull/11283
* feat: update Earcut to v3.0.0 by @LukeAbby in https://github.com/pixijs/pixijs/pull/11214
* 
### 🐛 Fixed
* fix: ObservablePoint toString by @Zyie in https://github.com/pixijs/pixijs/pull/11430
* fix: HTMLTextStyle clone and css overrides assignment by @Zyie in https://github.com/pixijs/pixijs/pull/11442
* fix: iOS issue loading video when autoplay is false and preload is true. by @jgelens in https://github.com/pixijs/pixijs/pull/11451
* fix: letter spacing support getter by @GoodBoyDigital in https://github.com/pixijs/pixijs/pull/11429
* fix: bitmap text emoji render by @rnike in https://github.com/pixijs/pixijs/pull/11275
* fix: Inverse stencil mask should not modify stencil buffer during normal draws by @Mysak0CZ in https://github.com/pixijs/pixijs/pull/11352
* fix: default values on removeParticles logic by @PaulKokhanov1 in https://github.com/pixijs/pixijs/pull/11374
* fix: Dom Container on scaled canvas by @GoodBoyDigital in https://github.com/pixijs/pixijs/pull/11400
* fix: dynamic bitmap font rendering by @GoodBoyDigital in https://github.com/pixijs/pixijs/pull/11416
* fix: events firing PointerEvent when not supported by @midiusRed in https://github.com/pixijs/pixijs/pull/11217
 
### 🧹 Chores
* chore: add funding link to npm package by @tddyco in https://github.com/pixijs/pixijs/pull/11405
* chore: update links in README by @tddyco in https://github.com/pixijs/pixijs/pull/11406
* chore: Improve handling of HTMLImageElement in texture uploads by @GoodBoyDigital in https://github.com/pixijs/pixijs/pull/11343
* chore: simplify text systems by @GoodBoyDigital in https://github.com/pixijs/pixijs/pull/11345
* chore: remove renderable hashes by @GoodBoyDigital in https://github.com/pixijs/pixijs/pull/11346
* chore: Update BitmapFont.ts doc for 8.x by @JonDegn in https://github.com/pixijs/pixijs/pull/11420
* chore: documentation overhaul with typedoc by @Zyie in https://github.com/pixijs/pixijs/pull/11423
* chore: add standard/advanced tags to documentation by @Zyie in https://github.com/pixijs/pixijs/pull/11448
* chore: improve api doc comments by @Zyie in https://github.com/pixijs/pixijs/pull/11455

## New Contributors
* @tddyco made their first contribution in https://github.com/pixijs/pixijs/pull/11405
* @Mysak0CZ made their first contribution in https://github.com/pixijs/pixijs/pull/11352
* @PaulKokhanov1 made their first contribution in https://github.com/pixijs/pixijs/pull/11374
* @JonDegn made their first contribution in https://github.com/pixijs/pixijs/pull/11420
* @jgelens made their first contribution in https://github.com/pixijs/pixijs/pull/11451


# v8.9.2 — 2025-04-29

## 💾  Download

Installation:
```bash
npm install pixi.js@8.9.2
```

Development Build:
- https://cdn.jsdelivr.net/npm/pixi.js@8.9.2/dist/pixi.js
- https://cdn.jsdelivr.net/npm/pixi.js@8.9.2/dist/pixi.mjs

Production Build:
- https://cdn.jsdelivr.net/npm/pixi.js@8.9.2/dist/pixi.min.js
- https://cdn.jsdelivr.net/npm/pixi.js@8.9.2/dist/pixi.min.mjs

Documentation:
- https://pixijs.download/v8.9.2/docs/index.html

## Changed
https://github.com/pixijs/pixi.js/compare/8.9.1...v8.9.2

### 🐛 Fixed
* fix: render layer detachment when destroying. by @GoodBoyDigital in https://github.com/pixijs/pixijs/pull/11384
* fix: documentation regarding anchor values in spritesheet by @SanjoSolutions in https://github.com/pixijs/pixijs/pull/11363
* fix: gradient issue with non 0,0 shapes in graphics by @GoodBoyDigital in https://github.com/pixijs/pixijs/pull/11383

## New Contributors
* @SanjoSolutions made their first contribution in https://github.com/pixijs/pixijs/pull/11363


# v8.9.1 — 2025-03-27

## 💾  Download

Development Build:
- https://pixijs.download/v8.9.1/pixi.js
- https://pixijs.download/v8.9.1/pixi.mjs

Production Build:
- https://pixijs.download/v8.9.1/pixi.min.js
- https://pixijs.download/v8.9.1/pixi.min.mjs

Documentation:
- https://pixijs.download/v8.9.1/docs/index.html

## Changed
https://github.com/pixijs/pixi.js/compare/v8.9.0...v8.9.1

### 🐛 Fixed
* fix: bad aliased imports by @bigtimebuddy in https://github.com/pixijs/pixijs/pull/11355
* fix: reset premultiply alpha state on resetState call and update WebGL settings by @GoodBoyDigital in https://github.com/pixijs/pixijs/pull/11342
* fix: state culling was flipped when rendering to a texture by @GoodBoyDigital in https://github.com/pixijs/pixijs/pull/11356


# v8.9.0 — 2025-03-20

## 💾  Download

Development Build:
- https://pixijs.download/v8.9.0/pixi.js
- https://pixijs.download/v8.9.0/pixi.mjs

Production Build:
- https://pixijs.download/v8.9.0/pixi.min.js
- https://pixijs.download/v8.9.0/pixi.min.mjs

Documentation:
- https://pixijs.download/v8.9.0/docs/index.html

## Changed
https://github.com/pixijs/pixi.js/compare/v8.8.1...v8.9.0


### 🎁 Added
* feat: DOMContainer by @GoodBoyDigital in https://github.com/pixijs/pixijs/pull/11340
  * Experimental support for integrating DOM elements within the PixiJS scene graph, allowing HTML elements to be positioned and transformed alongside other PixiJS objects.
```ts
import 'pixi.js/dom'
import { DOMContainer } from 'pixi.js';

// Create a DOM element
const element = document.createElement('div');
element.innerHTML = 'Hello World!';
	
// Create a DOM container
const domContainer = new DOMContainer({ element });
	
// Add it to your scene
app.stage.addChild(domContainer);
	
// Position and transform like any other DisplayObject
domContainer.x = 100;
domContainer.y = 100;
domContainer.rotation = 0.5;
domContainer.anchor.set(0.5);
```

### 🐛 Fixed
* fix: Ignore autoDensity for OffscreenCanvas by @bigtimebuddy in https://github.com/pixijs/pixijs/pull/11313
* fix: Restore gl extensions state on context restore by @ddenisyuk in https://github.com/pixijs/pixijs/pull/11299
* fix: don't use alias for `PointData` import by @kosmotema in https://github.com/pixijs/pixijs/pull/11308

## New Contributors
* @kosmotema made their first contribution in https://github.com/pixijs/pixijs/pull/11308


# v7.4.3 — 2025-03-06

## What's Changed
* Fix: incorrect cache warning check by @Zyie in https://github.com/pixijs/pixijs/pull/10430
* Apply #8679 to 7.x branch by @kfyh in https://github.com/pixijs/pixijs/pull/11022
* add missing properties to v7 FederatedPointerEvent by @ericente in https://github.com/pixijs/pixijs/pull/11192

## New Contributors
* @kfyh made their first contribution in https://github.com/pixijs/pixijs/pull/11022

**Full Changelog**: https://github.com/pixijs/pixijs/compare/v7.4.2...v7.4.3


# v8.8.1 — 2025-02-26

## 💾  Download

Development Build:
- https://pixijs.download/v8.8.1/pixi.js
- https://pixijs.download/v8.8.1/pixi.mjs

Production Build:
- https://pixijs.download/v8.8.1/pixi.min.js
- https://pixijs.download/v8.8.1/pixi.min.mjs

Documentation:
- https://pixijs.download/v8.8.1/docs/index.html

## Changed
https://github.com/pixijs/pixi.js/compare/v8.8.0...v8.8.1

### 🐛 Fixed
* fix: gif loader base64 path matching by @MechaKnightz in https://github.com/pixijs/pixijs/pull/11285
* fix: Don't bundle GIF dependencies by @bigtimebuddy in https://github.com/pixijs/pixijs/pull/11298

## New Contributors
* @MechaKnightz made their first contribution in https://github.com/pixijs/pixijs/pull/11285


# v8.8.0 — 2025-02-11

## 💾  Download

Development Build:
- https://pixijs.download/v8.8.0/pixi.js
- https://pixijs.download/v8.8.0/pixi.mjs

Production Build:
- https://pixijs.download/v8.8.0/pixi.min.js
- https://pixijs.download/v8.8.0/pixi.min.mjs

Documentation:
- https://pixijs.download/v8.8.0/docs/index.html

## Changed
https://github.com/pixijs/pixi.js/compare/v8.7.3...v8.8.0

### 🚨 Behavior Change 🚨
Since 8.0.0 PixiJS has been incorrectly applying gradients and graphics fill textures. Instead of using normalized "local space" coordinates (0–1), gradients were using "global space" values in pixels. This was an unintended change that made working with gradients/texture fills much harder. In this release, we have changed the default behavior back to "local space" to match v7.

For anyone who needs the old behavior, you can change the default options globally or you can control it individually as all APIs now accept a `textureSpace` property that can be set to `"global"`. For example:
```ts
FillGradient.defaultLinearOptions.textureSpace = 'global'
FillGradient.defaultRadialOptions.textureSpace = 'global'
// or individually
new FillGraident(0, 0, 100, 100, 'global')

GraphicsContext.defaultFillStyle.textureSpace = 'global'
GraphicsContext.defaultStrokeStyle.textureSpace = 'global'
// or individually
new Graphics().fill({ texture, textureSpace: 'global' })
new Graphics().stroke({ texture, textureSpace: 'global' })
```

### 🚨 Behavior Change 🚨
Since version 8.0.0, TilingSprite has returned negative values for `tilingSprite.bounds.width` and `tilingSprite.bounds.height`. This has been corrected in this release, and these properties now return positive values. If your code relies on bounds, you may need to adjust it accordingly.

### 🎁 Added
* feat: svg and textureSpace update by @GoodBoyDigital in https://github.com/pixijs/pixijs/pull/11074
* feat: add configurable props to `AnimatedSpriteOptions` by @trezy in https://github.com/pixijs/pixijs/pull/11241
* feat: add anchor to nine slice sprite by @GoodBoyDigital in https://github.com/pixijs/pixijs/pull/11233
* feat: enhance how gradients are applied to text objects by @GoodBoyDigital in https://github.com/pixijs/pixijs/pull/11075
* feat: support SVG non-zero fills by @GoodBoyDigital in https://github.com/pixijs/pixijs/pull/11080
* feat: allow for graphics.fill(texture) by @GoodBoyDigital in https://github.com/pixijs/pixijs/pull/11152
* feat: add `autoPlay` to `AnimatedSprite` by @trezy in https://github.com/pixijs/pixijs/pull/11243
* feat: add returnTexture for CanvasTextSystem by @GoodBoyDigital in https://github.com/pixijs/pixijs/pull/11269
* feat: add mixins for leaf nodes by @Zyie in https://github.com/pixijs/pixijs/pull/11253

### 🐛 Fixed
* fix: texture space incorrectly set to global by @Zyie in https://github.com/pixijs/pixijs/pull/11246
* fix: texture update bug on mesh by @GoodBoyDigital in https://github.com/pixijs/pixijs/pull/11259
* fix: multiview rendering by @GoodBoyDigital in https://github.com/pixijs/pixijs/pull/11260
* fix: mask resetState bug by @GoodBoyDigital in https://github.com/pixijs/pixijs/pull/11261
* fix: measure bug in render layer by @GoodBoyDigital in https://github.com/pixijs/pixijs/pull/11262
* fix: tiling sprite and nine slice sprite bounds being negative by @Zyie in https://github.com/pixijs/pixijs/pull/11267
* fix: graphics prepare bug by @GoodBoyDigital in https://github.com/pixijs/pixijs/pull/11258
* fix: increase didViewChangeTick on removeChildren call by @dapi303 in https://github.com/pixijs/pixijs/pull/11245
* fix: texture options set for spritesheet aren't propagating to multipacked spritesheets by @sam007mac in https://github.com/pixijs/pixijs/pull/11270
