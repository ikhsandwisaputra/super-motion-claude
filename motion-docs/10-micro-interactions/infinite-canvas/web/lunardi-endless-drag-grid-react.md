---
source: https://www.edoardolunardi.dev/blog/building-an-endless-drag-grid-in-react-without-webgl
title: "Building an Endless Drag Grid in React, without WebGL | Edoardo Lunardi"
fetched: 2026-10-28
---

Edoardo Lunardi

* Home
* Works
* Blog
* Lab
* Awards

Open Menu

Notes

Publications

[![Portrait of Edoardo Lunardi in a black turtleneck against a green background](https://cdn.sanity.io/images/60rvi1lj/production/db451abc27a16f698305dcb56ec920d5a9dc08c8-1566x1566.jpg?w=16&h=16&max-h=3840&max-w=3840&q=85&fit=crop&auto=format)

Edoardo Lunardi](https://www.edoardolunardi.dev/)

[`E`Email](https://www.edoardolunardi.dev/cdn-cgi/l/email-protection#b4dcd1d8d8dbf4d1d0dbd5c6d0dbd8c1dad5c6d0dd9ad0d1c2 "hello@edoardolunardi.dev (press E)")

Available

--:--

[VIE]

[22]

Notes

* [A video resolution ladder in Sanity, with a custom field and Cloudflare R2](https://www.edoardolunardi.dev/blog/video-resolution-ladder-in-sanity-with-a-custom-field-and-cloudflare-r2)
* [The Content Architecture IV: Content Primitives](https://www.edoardolunardi.dev/blog/the-content-architecture-content-primitives)
* [The Content Architecture III: Page Composition](https://www.edoardolunardi.dev/blog/the-content-architecture-page-composition)
* [The Content Architecture II: Content Models](https://www.edoardolunardi.dev/blog/the-content-architecture-content-models)
* [The Content Architecture I: CMS Structure](https://www.edoardolunardi.dev/blog/the-content-architecture-cms-structure)
* [Do You Really Need a Site Builder to Edit Your Website?](https://www.edoardolunardi.dev/blog/do-you-really-need-a-site-builder-to-edit-your-website)
* [Building Infinite Scroll in React, without a library](https://www.edoardolunardi.dev/blog/building-infinite-scroll-in-react-without-a-library)
* [Building Smooth Scroll in 2025 with Lenis](https://www.edoardolunardi.dev/blog/building-smooth-scroll-in-2025-with-lenis)
* [Safari 26 and the Strange Case of Fixed Overlays](https://www.edoardolunardi.dev/blog/safari-26-and-the-strange-case-of-fixed-overlays)
* [Modern image lazy loading, with a CSS background placeholder](https://www.edoardolunardi.dev/blog/modern-image-lazy-loading-with-a-css-background-placeholder)
* [Building Drag in React with useDraggable, without a library](https://www.edoardolunardi.dev/blog/building-drag-in-react-without-a-library)
* [Building an Endless Drag Grid in React, without WebGL](https://www.edoardolunardi.dev/blog)
* [Writing cleaner React with a tiny utility](https://www.edoardolunardi.dev/blog/writing-cleaner-react-with-a-tiny-utility)
* [Hold the Line](https://www.edoardolunardi.dev/blog/hold-the-line)

Publications

* [Multilingual Sanity Without Weeks of Plumbing: Translate a Whole Site in One Click](https://www.contentarchitecture.dev/blog/multilingual-sanity-translate-with-ai)
* [Beyond the Luminance Ramp: A Shape-Aware ASCII Renderer in Three.js](https://tympanus.net/codrops/2026/09/04/beyond-the-luminance-ramp-a-shape-aware-ascii-renderer-in-three-js/)
* [From Years of Client Work to a Next.js + Sanity Starter Kit](https://tympanus.net/codrops/2026/07/02/from-years-of-client-work-to-a-next-js-sanity-starter-kit/)
* [Your Site Is Invisible to AI Agents (and Your CMS Can Fix It)](https://www.contentarchitecture.dev/blog/serve-content-to-ai-agents-llms-txt-markdown-sanity)
* [Stale Sanity Content in Next.js: The Two Caches and How to Fix Them](https://www.contentarchitecture.dev/blog/stale-sanity-content-nextjs-caching-revalidation)
* [Where Engineering Meets Craft: Edoardo Lunardi’s Obsession with the Details](https://tympanus.net/codrops/2026/04/02/where-engineering-meets-craft-edoardo-lunardis-obsession-with-the-details/)
* [An interview with Edoardo Lunardi](https://okaydev.co/articles/edoardo-lunardi)
* [[Codrops] Infinite Canvas: Building a Seamless, Pan-Anywhere Image Space](https://tympanus.net/codrops/2026/01/07/infinite-canvas-building-a-seamless-pan-anywhere-image-space/)

A collection of stray thoughts, sharp takes, broken drafts, and useful bits. No structure, no promises, no theme. Sometimes code, sometimes not. Just things worth recording.

# Building an Endless Drag Grid in React, without WebGL

[Author]Edoardo Lunardi

[Published]15 Aug 2025

[Reading time]7 min

[Excerpt]

An endless pannable canvas in React: a deterministic scatter layout, modular wrapping, and one RAF loop. No WebGL, no animation library.

A canvas that never ends, panning in every direction, and not a single line of WebGL. It runs in the DOM with React, plain transforms, and one requestAnimationFrame loop. Every item mounts once and stays mounted for the life of the page: what moves is a camera, and each item hops to whichever copy of the layout sits closest to it.

An earlier take on this spawned tiles ahead of the drag and unmounted the ones that fell behind. This one does the opposite: nothing mounts or unmounts once the page is up, and the endlessness comes from modular arithmetic on a transform.

## How it works

Every item is scattered once onto a fixed-size tile, one item per cell so nothing overlaps. A camera is driven from drag, wheel and keys by a single RAF loop, and on every frame each item snaps to the tile period nearest the camera, so the field repeats seamlessly in all directions. The tile is sized so that one copy of each item always covers the viewport, which is what keeps the wrap teleport off-screen.

* **Deterministic layout**: an integer-only hash, so the server and every client engine place items identically.
* **One item per cell**: cells are disjoint regions, so scattering inside a cell can never produce an overlap.
* **Modular wrap**: each item's offset is `round((camera - centre) / tilePeriod)`, its nearest copy.
* **Refs, not state**: the camera and the wrap offsets live in refs. React renders the layout once, the loop moves it.

### Step 1: a layout the server and the client agree on

The layout is computed during render, so it has to come out identical on the server and on the client or hydration tears. `Math.random` cannot do that. A small integer hash can: every operation stays in 32-bit integer space, which behaves the same in Node and in every browser engine.

```
// Integer-only hash to a unit float, so the server and every client engine agree on the layout.
function seededRandom(seed: number) {
  let t = Math.imul(seed ^ 0x9e3779b9, 0x85ebca6b);
  t ^= t >>> 13;
  t = Math.imul(t, 0xc2b2ae35);
  t ^= t >>> 16;

  return (t >>> 0) / 4294967296;
}
```

With mixed aspect ratios, giving every item the same area rather than the same width keeps the field calm: a wide item gets wider and shorter, a tall one taller and narrower, and no single item dominates.

```
// same area for every item, original aspect kept: wide items get wider+shorter, tall ones taller+narrower
const sized = items.map((item) => {
  const scale = Math.sqrt(item.aspectRatio || 1);

  return { item, width: ITEM_SIZE * scale, height: ITEM_SIZE / scale };
});
```

### Step 2: sizing the tile so the seam never shows

A repeating field has a seam: the moment an item teleports a whole tile period to follow the camera. It stays invisible as long as it happens off-screen, which means the tile has to be at least as large as the viewport, plus the largest item, plus a margin. That lower bound is the whole trick, and it is why the tile is measured rather than picked.

```
const columns = Math.max(MIN_COLUMNS, Math.ceil(Math.sqrt(sized.length)));
const rows = Math.max(1, Math.ceil(sized.length / columns));

// Cells big enough for the largest item plus padding, and a tile at least as large as the viewport,
// so a single copy of each item always covers the screen and the wrap happens out of frame.
const cellMinWidth = maxItemWidth + CELL_PADDING;
const cellMinHeight = maxItemHeight + CELL_PADDING;
const seamWidth = viewportWidth + maxExtent + SEAM_MARGIN;
const seamHeight = viewportHeight + maxExtent + SEAM_MARGIN;
const tileWidth = Math.max(columns * cellMinWidth, seamWidth);
const tileHeight = Math.max(rows * cellMinHeight, seamHeight);
const cellWidth = tileWidth / columns;
const cellHeight = tileHeight / rows;
```

Go below that bound and the repeat becomes visible; stay above it and every wrap happens outside the frame. If you add zoom later, the viewport terms become `viewport / minZoom`, since zooming out is what grows the visible content area.

### Step 3: one item per cell, so nothing can overlap

The tile is now a grid of cells, each one large enough to hold the biggest item plus padding. Each item is scattered anywhere inside its own cell, inset from every edge. Because the cells are disjoint, that inset is a guarantee rather than a hope: two neighbouring items always stay at least twice the gap apart, whatever the random offsets come out to.

```
// Scatter the item anywhere inside its cell, inset by ITEM_GAP from every edge. Because the cells
// are disjoint, this guarantees no two items overlap (they stay >= 2x gap apart).
const slackX = Math.max(0, cellWidth - width - 2 * ITEM_GAP);
const slackY = Math.max(0, cellHeight - height - 2 * ITEM_GAP);
const originX = column * cellWidth + ITEM_GAP + slackX * seededRandom(index * 31 + 2) - tileWidth / 2;
const originY = row * cellHeight + ITEM_GAP + slackY * seededRandom(index * 31 + 3) - tileHeight / 2;
```

Cells can also be ordered from the centre outward. If the items arrive in a meaningful order, assigning item `i` to the `i`-th closest cell puts the first ones in the middle of the field and pushes the last ones out to the edges.

```
const centerColumn = (columns - 1) / 2;
const centerRow = (rows - 1) / 2;
const cells = Array.from({ length: columns * rows }, (_, i) => i).sort(
  (a, b) =>
    Math.hypot((a % columns) - centerColumn, Math.floor(a / columns) - centerRow) -
    Math.hypot((b % columns) - centerColumn, Math.floor(b / columns) - centerRow)
);
```

### Step 4: wrapping instead of spawning

This is the part that replaces a grow-and-prune loop. Each item keeps its static position inside the tile as plain `left` and `top`. The only thing the frame loop writes is which copy of the tile that item currently belongs to.

```
for (let i = 0; i < placed.length; i++) {
  const element = itemRefs.current[i];
  const item = placed[i];

  if (!element || !item) {
    continue;
  }

  const kx = Math.round((cam.x - item.centerX) / tileWidth);
  const ky = Math.round((cam.y - item.centerY) / tileHeight);
  const wrap = wrapsRef.current[i];

  if (!wrap || wrap.kx !== kx || wrap.ky !== ky) {
    wrapsRef.current[i] = { kx, ky };
    element.style.transform = `translate3d(${kx * tileWidth}px, ${ky * tileHeight}px, 0)`;
  }
}
```

`Math.round` picks the nearest copy, so every item is always the one closest to the camera. The result is cached per item and the transform is written only when the period actually changes, which for most items is a handful of times across a long pan. No element is ever created or destroyed.

### Step 5: one loop, a lerped camera

Pointer moves never touch the camera directly. They write to a target, and the camera eases toward it each frame, which is what makes the drag feel smoothed rather than rigid. Because the target advances 1:1 with the pointer, the release settles exactly at the panned distance: no fling past the point where the pointer lifted.

```
cam.x = Math.abs(target.x - cam.x) < LERP_THRESHOLD ? target.x : cam.x + (target.x - cam.x) * factor;
cam.y = Math.abs(target.y - cam.y) < LERP_THRESHOLD ? target.y : cam.y + (target.y - cam.y) * factor;

// only touch the DOM when the camera actually moved, so an idle loop costs no style work
if (cam.x !== applied.x || cam.y !== applied.y) {
  field.style.transform = `translate3d(${-cam.x}px, ${-cam.y}px, 0)`;
  // ... wrap each item, then cache what was applied
}
```

That last guard matters more than it looks. An idle loop still runs, but it compares two numbers and returns, so a canvas nobody is touching costs no style recalculation at all.

### Step 6: drag, wheel, keys

* A move has to clear a small `DRAG_THRESHOLD` before it counts as a pan, so a tap still activates whatever sits under it, and the click that ends a pan is swallowed in the capture phase.
* Pointer events plus `setPointerCapture` keep the pan alive when the pointer leaves the surface, and cover mouse, touch and pen with one code path.
* Scrolling over the surface pans it instead of scrolling the page, and the deltas are normalised for `deltaMode`, since a mouse reports pixels while some devices report lines or pages.

```
const handleWheel = (event: WheelEvent) => {
  // Wheel listeners are passive by default, so this only cancels with { passive: false } below.
  event.preventDefault();

  // a mouse reports pixels, some devices report lines or pages
  const multiplier = event.deltaMode === 1 ? LINE_HEIGHT : event.deltaMode === 2 ? view.height : 1;

  target.x += event.deltaX * multiplier;
  target.y += event.deltaY * multiplier;
};

root.addEventListener("wheel", handleWheel, { passive: false });
```

* Arrow keys mark a key as held instead of stepping the camera. The loop integrates a velocity, so opposing and adjacent keys combine into diagonals and OS key-repeat stops mattering.

```
const dirX = (held.has("ArrowRight") ? 1 : 0) - (held.has("ArrowLeft") ? 1 : 0);
const dirY = (held.has("ArrowDown") ? 1 : 0) - (held.has("ArrowUp") ? 1 : 0);
const magnitude = Math.hypot(dirX, dirY);

// unit vector, so holding two keys is not faster than holding one
const desiredX = magnitude > 0 ? (dirX / magnitude) * ARROW_PAN_SPEED : 0;
const desiredY = magnitude > 0 ? (dirY / magnitude) * ARROW_PAN_SPEED : 0;

// fast attack while a key is held so the pan feels connected, slow release so it glides to rest
const smoothing = magnitude > 0 ? ARROW_PAN_ATTACK : ARROW_PAN_RELEASE;

keyVelocity.x += (desiredX - keyVelocity.x) * smoothing;
keyVelocity.y += (desiredY - keyVelocity.y) * smoothing;
```

The asymmetry is deliberate: a fast attack keeps the press feeling connected, a slow release lets it glide to rest like a trackpad fling instead of stopping dead.

### Keyboard and reduced motion

* The pan surface itself is focusable, so the canvas can be moved without a pointer (WCAG 2.1.1), with a screen-reader hint that spells out how to pan.
* Tab walks whatever is focusable inside the field. The region is `overflow-clip`, so the browser cannot scroll a focused element into view itself: a `focusin` handler recentres the camera on it instead.
* Under `prefers-reduced-motion`, the lerp collapses to an instant set, so the camera tracks input with no easing.

### Performance notes

* The mounted item count is fixed by the content, not by how far you have panned.
* Nothing mounts or unmounts during a gesture, so React never reconciles mid-drag.
* One transform on the field, one per item, all `translate3d`.
* Per-item transforms are written only when that item's tile period changes, never once per frame.

## Full Example

The endless grid, runnable

```
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
74
75
76
77
78
79
80
81
82
83
84
85
86
87
88
89
90
91
92
93
94
95
96
97
98
99
100
101
102
103
104
105
106
107
108
109
110
111
112
113
114
115
116
117
118
119
120
121
122
123
124
125
126
127
128
129
130
131
132
133
134
135
136
137
138
139
140
141
142
143
144
145
146
147
148
149
150
151
152
153
154
155
156
157
158
159
160
161
162
163
164
165
166
167
168
169
170
171
172
173
174
175
176
177
178
179
180
181
182
183
184
185
186
187
188
189
190
191
192
193
194
195
196
197
198
199
200
201
202
203
204
205
206
207
208
209
210
211
212
213
214
215
216
217
218
219
220
221
222
223
224
225
226
227
228
229
230
231
232
233
234
235
236
237
238
239
240
241
242
243
244
245
246
247
248
249
250
251
252
253
254
255
256
257
258
259
260
261
262
263
264
265
266
267
268
269
270
271
272
273
274
275
276
277
278
279
280
281
282
283
284
285
286
287
288
289
290
291
292
293
294
295
296
297
298
299
300
301
302
303
304
305
306
307
308
309
310
311
312
313
314
315
316
317
318
319
320
321
322
323
324
325
326
327
328
329
330
331
332
333
334
335
336
337
338
339
340
341
342
343
344
345
346
347
348
349
350
351
352
353
354
355
356
357
358
359
360
361
362
363
364
365
366
367
368
369
370
371
372
373
374
375
376
377
378
379
380
381
382
383
384
385
386
387
388
389
390
391
392
393
394
395
396
397
398
399
400
401
```

```
import * as React from "react";
import { createRoot } from "react-dom/client";

// Tile geometry. Everything below feeds the seam bound, nothing here is hand-picked.
const ITEM_SIZE = 104; // reference side: every item has the same area (ITEM_SIZE²)
const CELL_PADDING = 72; // extra room per cell beyond the largest item
const ITEM_GAP = 12; // min inset from the cell edge, so neighbours stay >= 2x this apart
const SEAM_MARGIN = 48;
const MIN_COLUMNS = 3;

const LERP_FACTOR = 0.12; // lower = smoother
const LERP_THRESHOLD = 0.01;
const DRAG_THRESHOLD = 4;
const LINE_HEIGHT = 100 / 6; // wheel deltaMode 1 (lines)
const ARROW_PAN_SPEED = 14; // content px per frame while an arrow key is held
const ARROW_PAN_ATTACK = 0.22; // ramp toward full speed on press
const ARROW_PAN_RELEASE = 0.09; // ease-out toward rest on release
const ARROW_PAN_MIN_VELOCITY = 0.1;

const ARROW_KEYS = new Set(["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"]);
const REDUCED_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

type Item = { key: string; label: string; aspectRatio: number; hue: number };

type PlacedItem = Item & {
  originX: number;
  originY: number;
  width: number;
  height: number;
  centerX: number;
  centerY: number;
};

const ITEMS: Item[] = Array.from({ length: 14 }, (_, index) => ({
  key: `item-${index}`,
  label: String(index + 1).padStart(2, "0"),
  aspectRatio: [1, 1.5, 0.75, 1.25, 1, 0.8, 1.6][index % 7],
  hue: (index * 47) % 360,
}));

// Integer-only hash to a unit float, so the layout comes out identical in Node and in every browser
// engine and a server-rendered field survives hydration.
function seededRandom(seed: number) {
  let t = Math.imul(seed ^ 0x9e3779b9, 0x85ebca6b);
  t ^= t >>> 13;
  t = Math.imul(t, 0xc2b2ae35);
  t ^= t >>> 16;

  return (t >>> 0) / 4294967296;
}

function buildLayout(items: Item[], viewportWidth: number, viewportHeight: number) {
  // Same area for every item, original aspect kept: a wide item gets wider and shorter, a tall one
  // taller and narrower, so no single item dominates the field.
  const sized = items.map((item) => {
    const scale = Math.sqrt(item.aspectRatio || 1);

    return { item, width: ITEM_SIZE * scale, height: ITEM_SIZE / scale };
  });

  const columns = Math.max(MIN_COLUMNS, Math.ceil(Math.sqrt(sized.length)));
  const rows = Math.max(1, Math.ceil(sized.length / columns));

  const maxItemWidth = sized.reduce((max, s) => Math.max(max, s.width), 0);
  const maxItemHeight = sized.reduce((max, s) => Math.max(max, s.height), 0);
  const maxExtent = Math.max(maxItemWidth, maxItemHeight);

  // Cells hold the biggest item plus padding, and the tile is at least viewport + largest item +
  // margin on each axis. That lower bound is what keeps every wrap teleport off-screen.
  const tileWidth = Math.max(columns * (maxItemWidth + CELL_PADDING), viewportWidth + maxExtent + SEAM_MARGIN);
  const tileHeight = Math.max(rows * (maxItemHeight + CELL_PADDING), viewportHeight + maxExtent + SEAM_MARGIN);
  const cellWidth = tileWidth / columns;
  const cellHeight = tileHeight / rows;

  // Order cells from the centre outward, so item i lands in the i-th closest cell: the first items
  // sit in the middle of the field and the last ones are pushed out to the edges.
  const centerColumn = (columns - 1) / 2;
  const centerRow = (rows - 1) / 2;
  const cells = Array.from({ length: columns * rows }, (_, i) => i).sort(
    (a, b) =>
      Math.hypot((a % columns) - centerColumn, Math.floor(a / columns) - centerRow) -
      Math.hypot((b % columns) - centerColumn, Math.floor(b / columns) - centerRow)
  );

  const placed = sized.map(({ item, width, height }, index): PlacedItem => {
    const cell = cells[index] ?? index;
    const column = cell % columns;
    const row = Math.floor(cell / columns);

    // Scatter inside the cell, inset by ITEM_GAP from every edge. The cells are disjoint, so that
    // inset is a guarantee: two items always stay at least 2x the gap apart.
    const slackX = Math.max(0, cellWidth - width - 2 * ITEM_GAP);
    const slackY = Math.max(0, cellHeight - height - 2 * ITEM_GAP);
    const originX = column * cellWidth + ITEM_GAP + slackX * seededRandom(index * 31 + 2) - tileWidth / 2;
    const originY = row * cellHeight + ITEM_GAP + slackY * seededRandom(index * 31 + 3) - tileHeight / 2;

    return { ...item, originX, originY, width, height, centerX: originX + width / 2, centerY: originY + height / 2 };
  });

  return { placed, tileWidth, tileHeight };
}

function InfiniteGrid({ items }: { items: Item[] }) {
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const fieldRef = React.useRef<HTMLDivElement | null>(null);
  const itemRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const wrapsRef = React.useRef<({ kx: number; ky: number } | undefined)[]>([]);
  const targetRef = React.useRef({ x: 0, y: 0 });
  const camRef = React.useRef({ x: 0, y: 0 });
  const lastAppliedRef = React.useRef({ x: Number.NaN, y: Number.NaN });
  const dragRef = React.useRef({ id: null as number | null, startX: 0, startY: 0, lastX: 0, lastY: 0, panning: false });
  const heldKeysRef = React.useRef(new Set<string>());
  const keyVelocityRef = React.useRef({ x: 0, y: 0 });
  const [viewport, setViewport] = React.useState({ width: 0, height: 0 });

  const layout = React.useMemo(() => buildLayout(items, viewport.width, viewport.height), [items, viewport]);

  React.useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;

      setViewport((prev) => (prev.width === width && prev.height === height ? prev : { width, height }));
    });

    observer.observe(root);

    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    const { placed, tileWidth, tileHeight } = layout;

    if (tileWidth === 0 || tileHeight === 0) {
      return;
    }

    // A new tile makes every cached wrap offset stale. Resetting here rather than in its own effect
    // is what orders it after the previous loop has been cancelled, so no frame can refill the cache
    // from the old tile and leave the items stranded on it.
    wrapsRef.current = [];
    lastAppliedRef.current = { x: Number.NaN, y: Number.NaN };

    let frame = requestAnimationFrame(function animate() {
      frame = requestAnimationFrame(animate);

      const field = fieldRef.current;

      if (!field) {
        return;
      }

      const target = targetRef.current;
      const cam = camRef.current;
      const held = heldKeysRef.current;
      const velocity = keyVelocityRef.current;

      // Held arrows drive a velocity rather than one step per keydown, so opposing and adjacent keys
      // combine into diagonals and OS key-repeat stops mattering.
      if (held.size > 0 || velocity.x !== 0 || velocity.y !== 0) {
        const dirX = (held.has("ArrowRight") ? 1 : 0) - (held.has("ArrowLeft") ? 1 : 0);
        const dirY = (held.has("ArrowDown") ? 1 : 0) - (held.has("ArrowUp") ? 1 : 0);
        const magnitude = Math.hypot(dirX, dirY);
        const desiredX = magnitude > 0 ? (dirX / magnitude) * ARROW_PAN_SPEED : 0;
        const desiredY = magnitude > 0 ? (dirY / magnitude) * ARROW_PAN_SPEED : 0;
        // fast attack while a key is held, slow release so it glides to rest instead of stopping dead
        const smoothing = magnitude > 0 ? ARROW_PAN_ATTACK : ARROW_PAN_RELEASE;

        velocity.x += (desiredX - velocity.x) * smoothing;
        velocity.y += (desiredY - velocity.y) * smoothing;

        if (desiredX === 0 && Math.abs(velocity.x) < ARROW_PAN_MIN_VELOCITY) {
          velocity.x = 0;
        }

        if (desiredY === 0 && Math.abs(velocity.y) < ARROW_PAN_MIN_VELOCITY) {
          velocity.y = 0;
        }

        target.x += velocity.x;
        target.y += velocity.y;
        cam.x += velocity.x;
        cam.y += velocity.y;
      }

      // The pointer writes to the target; the camera eases toward it, which is the whole of the feel.
      const factor = REDUCED_MOTION ? 1 : LERP_FACTOR;

      cam.x = Math.abs(target.x - cam.x) < LERP_THRESHOLD ? target.x : cam.x + (target.x - cam.x) * factor;
      cam.y = Math.abs(target.y - cam.y) < LERP_THRESHOLD ? target.y : cam.y + (target.y - cam.y) * factor;

      const applied = lastAppliedRef.current;

      // An idle loop compares two numbers and returns, so a canvas nobody is touching costs no style work.
      if (applied.x === cam.x && applied.y === cam.y) {
        return;
      }

      applied.x = cam.x;
      applied.y = cam.y;
      field.style.transform = `translate3d(${-cam.x}px, ${-cam.y}px, 0)`;

      for (let i = 0; i < placed.length; i++) {
        const element = itemRefs.current[i];
        const item = placed[i];

        if (!element || !item) {
          continue;
        }

        // Math.round picks the copy of the tile nearest the camera, and the transform is written only
        // when that copy changes: a handful of times across a long pan, never once per frame.
        const kx = Math.round((cam.x - item.centerX) / tileWidth);
        const ky = Math.round((cam.y - item.centerY) / tileHeight);
        const wrap = wrapsRef.current[i];

        if (!wrap || wrap.kx !== kx || wrap.ky !== ky) {
          wrapsRef.current[i] = { kx, ky };
          element.style.transform = `translate3d(${kx * tileWidth}px, ${ky * tileHeight}px, 0)`;
        }
      }
    });

    return () => cancelAnimationFrame(frame);
  }, [layout]);

  React.useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    const onPointerDown = (event: PointerEvent) => {
      // left click (0) or touch/pen contact (-1)
      if (event.button !== 0 && event.button !== -1) {
        return;
      }

      const drag = dragRef.current;

      drag.id = event.pointerId;
      drag.startX = event.clientX;
      drag.startY = event.clientY;
      drag.lastX = event.clientX;
      drag.lastY = event.clientY;
      drag.panning = false;

      // keeps the pan alive when the pointer leaves the surface, for mouse, touch and pen alike
      (event.target as HTMLElement).setPointerCapture?.(event.pointerId);
    };

    const onPointerMove = (event: PointerEvent) => {
      const drag = dragRef.current;

      if (drag.id !== event.pointerId) {
        return;
      }

      // A move has to clear a small threshold before it counts as a pan, so a tap still activates
      // whatever sits under it.
      if (!drag.panning) {
        const moved =
          Math.abs(event.clientX - drag.startX) > DRAG_THRESHOLD || Math.abs(event.clientY - drag.startY) > DRAG_THRESHOLD;

        if (!moved) {
          return;
        }

        drag.panning = true;
        root.style.cursor = "grabbing";
      }

      // The target advances 1:1 with the pointer, so the release settles exactly at the panned
      // distance: smoothed, but with no fling past where the pointer lifted.
      targetRef.current.x -= event.clientX - drag.lastX;
      targetRef.current.y -= event.clientY - drag.lastY;
      drag.lastX = event.clientX;
      drag.lastY = event.clientY;
    };

    const onPointerEnd = (event: PointerEvent) => {
      const drag = dragRef.current;

      if (drag.id !== event.pointerId) {
        return;
      }

      drag.id = null;
      drag.panning = false;
      root.style.removeProperty("cursor");
    };

    const onWheel = (event: WheelEvent) => {
      // Wheel listeners are passive by default, so this only cancels with { passive: false } below.
      // Scrolling over the canvas pans it instead of scrolling the page.
      event.preventDefault();

      // a mouse reports pixels, some devices report lines or pages
      const multiplier = event.deltaMode === 1 ? LINE_HEIGHT : event.deltaMode === 2 ? root.clientHeight : 1;

      targetRef.current.x += event.deltaX * multiplier;
      targetRef.current.y += event.deltaY * multiplier;
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (!ARROW_KEYS.has(event.key)) {
        return;
      }

      event.preventDefault();
      heldKeysRef.current.add(event.key);
    };

    // release on window: a key can lift after focus has left the canvas, and a held arrow must never stick
    const onKeyUp = (event: KeyboardEvent) => heldKeysRef.current.delete(event.key);
    const onBlur = () => heldKeysRef.current.clear();
    const preventNativeDrag = (event: Event) => event.preventDefault();

    root.addEventListener("pointerdown", onPointerDown);
    root.addEventListener("wheel", onWheel, { passive: false });
    root.addEventListener("keydown", onKeyDown);
    root.addEventListener("dragstart", preventNativeDrag);
    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerup", onPointerEnd);
    document.addEventListener("pointercancel", onPointerEnd);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("blur", onBlur);

    return () => {
      root.removeEventListener("pointerdown", onPointerDown);
      root.removeEventListener("wheel", onWheel);
      root.removeEventListener("keydown", onKeyDown);
      root.removeEventListener("dragstart", preventNativeDrag);
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerup", onPointerEnd);
      document.removeEventListener("pointercancel", onPointerEnd);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("blur", onBlur);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      tabIndex={0}
      aria-label="Endless canvas. Drag, scroll or use the arrow keys to pan."
      style={{
        position: "relative",
        height: "100%",
        overflow: "clip",
        cursor: "grab",
        touchAction: "none",
        userSelect: "none",
        outlineOffset: -2,
      }}
    >
      <div ref={fieldRef} style={{ position: "absolute", left: "50%", top: "50%", willChange: "transform" }}>
        {layout.placed.map((item, index) => (
          <div
            key={item.key}
            ref={(element) => {
              itemRefs.current[index] = element;
            }}
            style={{
              position: "absolute",
              left: item.originX,
              top: item.originY,
              width: item.width,
              height: item.height,
              display: "grid",
              placeItems: "center",
              borderRadius: 10,
              background: `linear-gradient(150deg, hsl(${item.hue} 72% 62%), hsl(${item.hue + 24} 68% 48%))`,
              color: "#fff",
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              fontSize: 15,
              willChange: "transform",
            }}
          >
            {item.label}
          </div>
        ))}
      </div>

      <p
        aria-hidden
        style={{ position: "absolute", right: 12, bottom: 10, margin: 0, fontSize: 12, opacity: 0.5 }}
      >
        drag or scroll to pan · arrow keys too
      </p>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(<InfiniteGrid items={ITEMS} />);
```

import \* as React from "react";
import { createRoot } from "react-dom/client";
// Tile geometry. Everything below feeds the seam bound, nothing here is hand-picked.
const ITEM\_SIZE = 104; // reference side: every item has the same area (ITEM\_SIZE²)
const CELL\_PADDING = 72; // extra room per cell beyond the largest item
const ITEM\_GAP = 12; // min inset from the cell edge, so neighbours stay >= 2x this apart
const SEAM\_MARGIN = 48;
const MIN\_COLUMNS = 3;
const LERP\_FACTOR = 0.12; // lower = smoother
const LERP\_THRESHOLD = 0.01;
const DRAG\_THRESHOLD = 4;
const LINE\_HEIGHT = 100 / 6; // wheel deltaMode 1 (lines)
const ARROW\_PAN\_SPEED = 14; // content px per frame while an arrow key is held
const ARROW\_PAN\_ATTACK = 0.22; // ramp toward full speed on press
const ARROW\_PAN\_RELEASE = 0.09; // ease-out toward rest on release
const ARROW\_PAN\_MIN\_VELOCITY = 0.1;
const ARROW\_KEYS = new Set(["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"]);
const REDUCED\_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
type Item = { key: string; label: string; aspectRatio: number; hue: number };
type PlacedItem = Item & {
originX: number;
originY: number;
width: number;
height: number;
centerX: number;
centerY: number;
};
const ITEMS: Item[] = Array.from({ length: 14 }, (\_, index) => ({
key: `item-${index}`,
label: String(index + 1).padStart(2, "0"),
aspectRatio: [1, 1.5, 0.75, 1.25, 1, 0.8, 1.6][index % 7],
hue: (index \* 47) % 360,
}));
// Integer-only hash to a unit float, so the layout comes out identical in Node and in every browser
// engine and a server-rendered field survives hydration.
function seededRandom(seed: number) {
let t = Math.imul(seed ^ 0x9e3779b9, 0x85ebca6b);
t ^= t >>> 13;
t = Math.imul(t, 0xc2b2ae35);
t ^= t >>> 16;
return (t >>> 0) / 4294967296;
}
function buildLayout(items: Item[], viewportWidth: number, viewportHeight: number) {
// Same area for every item, original aspect kept: a wide item gets wider and shorter, a tall one
// taller and narrower, so no single item dominates the field.
const sized = items.map((item) => {
const scale = Math.sqrt(item.aspectRatio || 1);
return { item, width: ITEM\_SIZE \* scale, height: ITEM\_SIZE / scale };
});
const columns = Math.max(MIN\_COLUMNS, Math.ceil(Math.sqrt(sized.length)));
const rows = Math.max(1, Math.ceil(sized.length / columns));
const maxItemWidth = sized.reduce((max, s) => Math.max(max, s.width), 0);
const maxItemHeight = sized.reduce((max, s) => Math.max(max, s.height), 0);
const maxExtent = Math.max(maxItemWidth, maxItemHeight);
// Cells hold the biggest item plus padding, and the tile is at least viewport + largest item +
// margin on each axis. That lower bound is what keeps every wrap teleport off-screen.
const tileWidth = Math.max(columns \* (maxItemWidth + CELL\_PADDING), viewportWidth + maxExtent + SEAM\_MARGIN);
const tileHeight = Math.max(rows \* (maxItemHeight + CELL\_PADDING), viewportHeight + maxExtent + SEAM\_MARGIN);
const cellWidth = tileWidth / columns;
const cellHeight = tileHeight / rows;
// Order cells from the centre outward, so item i lands in the i-th closest cell: the first items
// sit in the middle of the field and the last ones are pushed out to the edges.
const centerColumn = (columns - 1) / 2;
const centerRow = (rows - 1) / 2;
const cells = Array.from({ length: columns \* rows }, (\_, i) => i).sort(
(a, b) =>
Math.hypot((a % columns) - centerColumn, Math.floor(a / columns) - centerRow) -
Math.hypot((b % columns) - centerColumn, Math.floor(b / columns) - centerRow)
);
const placed = sized.map(({ item, width, height }, index): PlacedItem => {
const cell = cells[index] ?? index;
const column = cell % columns;
const row = Math.floor(cell / columns);
// Scatter inside the cell, inset by ITEM\_GAP from every edge. The cells are disjoint, so that
// inset is a guarantee: two items always stay at least 2x the gap apart.
const slackX = Math.max(0, cellWidth - width - 2 \* ITEM\_GAP);
const slackY = Math.max(0, cellHeight - height - 2 \* ITEM\_GAP);
const originX = column \* cellWidth + ITEM\_GAP + slackX \* seededRandom(index \* 31 + 2) - tileWidth / 2;
const originY = row \* cellHeight + ITEM\_GAP + slackY \* seededRandom(index \* 31 + 3) - tileHeight / 2;
return { ...item, originX, originY, width, height, centerX: originX + width / 2, centerY: originY + height / 2 };
});
return { placed, tileWidth, tileHeight };
}
function InfiniteGrid({ items }: { items: Item[] }) {
const rootRef = React.useRef<HTMLDivElement | null>(null);
const fieldRef = React.useRef<HTMLDivElement | null>(null);
const itemRefs = React.useRef<(HTMLDivElement | null)[]>([]);
const wrapsRef = React.useRef<({ kx: number; ky: number } | undefined)[]>([]);
const targetRef = React.useRef({ x: 0, y: 0 });
const camRef = React.useRef({ x: 0, y: 0 });
const lastAppliedRef = React.useRef({ x: Number.NaN, y: Number.NaN });
const dragRef = React.useRef({ id: null as number | null, startX: 0, startY: 0, lastX: 0, lastY: 0, panning: false });
const heldKeysRef = React.useRef(new Set<string>());
const keyVelocityRef = React.useRef({ x: 0, y: 0 });
const [viewport, setViewport] = React.useState({ width: 0, height: 0 });
const layout = React.useMemo(() => buildLayout(items, viewport.width, viewport.height), [items, viewport]);
React.useEffect(() => {
const root = rootRef.current;
if (!root) {
return;
}
const observer = new ResizeObserver(([entry]) => {
const { width, height } = entry.contentRect;
setViewport((prev) => (prev.width === width && prev.height === height ? prev : { width, height }));
});
observer.observe(root);
return () => observer.disconnect();
}, []);
React.useEffect(() => {
const { placed, tileWidth, tileHeight } = layout;
if (tileWidth === 0 || tileHeight === 0) {
return;
}
// A new tile makes every cached wrap offset stale. Resetting here rather than in its own effect
// is what orders it after the previous loop has been cancelled, so no frame can refill the cache
// from the old tile and leave the items stranded on it.
wrapsRef.current = [];
lastAppliedRef.current = { x: Number.NaN, y: Number.NaN };
let frame = requestAnimationFrame(function animate() {
frame = requestAnimationFrame(animate);
const field = fieldRef.current;
if (!field) {
return;
}
const target = targetRef.current;
const cam = camRef.current;
const held = heldKeysRef.current;
const velocity = keyVelocityRef.current;
// Held arrows drive a velocity rather than one step per keydown, so opposing and adjacent keys
// combine into diagonals and OS key-repeat stops mattering.
if (held.size > 0 || velocity.x !== 0 || velocity.y !== 0) {
const dirX = (held.has("ArrowRight") ? 1 : 0) - (held.has("ArrowLeft") ? 1 : 0);
const dirY = (held.has("ArrowDown") ? 1 : 0) - (held.has("ArrowUp") ? 1 : 0);
const magnitude = Math.hypot(dirX, dirY);
const desiredX = magnitude > 0 ? (dirX / magnitude) \* ARROW\_PAN\_SPEED : 0;
const desiredY = magnitude > 0 ? (dirY / magnitude) \* ARROW\_PAN\_SPEED : 0;
// fast attack while a key is held, slow release so it glides to rest instead of stopping dead
const smoothing = magnitude > 0 ? ARROW\_PAN\_ATTACK : ARROW\_PAN\_RELEASE;
velocity.x += (desiredX - velocity.x) \* smoothing;
velocity.y += (desiredY - velocity.y) \* smoothing;
if (desiredX === 0 && Math.abs(velocity.x) < ARROW\_PAN\_MIN\_VELOCITY) {
velocity.x = 0;
}
if (desiredY === 0 && Math.abs(velocity.y) < ARROW\_PAN\_MIN\_VELOCITY) {
velocity.y = 0;
}
target.x += velocity.x;
target.y += velocity.y;
cam.x += velocity.x;
cam.y += velocity.y;
}
// The pointer writes to the target; the camera eases toward it, which is the whole of the feel.
const factor = REDUCED\_MOTION ? 1 : LERP\_FACTOR;
cam.x = Math.abs(target.x - cam.x) < LERP\_THRESHOLD ? target.x : cam.x + (target.x - cam.x) \* factor;
cam.y = Math.abs(target.y - cam.y) < LERP\_THRESHOLD ? target.y : cam.y + (target.y - cam.y) \* factor;
const applied = lastAppliedRef.current;
// An idle loop compares two numbers and returns, so a canvas nobody is touching costs no style work.
if (applied.x === cam.x && applied.y === cam.y) {
return;
}
applied.x = cam.x;
applied.y = cam.y;
field.style.transform = `translate3d(${-cam.x}px, ${-cam.y}px, 0)`;
for (let i = 0; i < placed.length; i++) {
const element = itemRefs.current[i];
const item = placed[i];
if (!element || !item) {
continue;
}
// Math.round picks the copy of the tile nearest the camera, and the transform is written only
// when that copy changes: a handful of times across a long pan, never once per frame.
const kx = Math.round((cam.x - item.centerX) / tileWidth);
const ky = Math.round((cam.y - item.centerY) / tileHeight);
const wrap = wrapsRef.current[i];
if (!wrap || wrap.kx !== kx || wrap.ky !== ky) {
wrapsRef.current[i] = { kx, ky };
element.style.transform = `translate3d(${kx \* tileWidth}px, ${ky \* tileHeight}px, 0)`;
}
}
});
return () => cancelAnimationFrame(frame);
}, [layout]);
React.useEffect(() => {
const root = rootRef.current;
if (!root) {
return;
}
const onPointerDown = (event: PointerEvent) => {
// left click (0) or touch/pen contact (-1)
if (event.button !== 0 && event.button !== -1) {
return;
}
const drag = dragRef.current;
drag.id = event.pointerId;
drag.startX = event.clientX;
drag.startY = event.clientY;
drag.lastX = event.clientX;
drag.lastY = event.clientY;
drag.panning = false;
// keeps the pan alive when the pointer leaves the surface, for mouse, touch and pen alike
(event.target as HTMLElement).setPointerCapture?.(event.pointerId);
};
const onPointerMove = (event: PointerEvent) => {
const drag = dragRef.current;
if (drag.id !== event.pointerId) {
return;
}
// A move has to clear a small threshold before it counts as a pan, so a tap still activates
// whatever sits under it.
if (!drag.panning) {
const moved =
Math.abs(event.clientX - drag.startX) > DRAG\_THRESHOLD || Math.abs(event.clientY - drag.startY) > DRAG\_THRESHOLD;
if (!moved) {
return;
}
drag.panning = true;
root.style.cursor = "grabbing";
}
// The target advances 1:1 with the pointer, so the release settles exactly at the panned
// distance: smoothed, but with no fling past where the pointer lifted.
targetRef.current.x -= event.clientX - drag.lastX;
targetRef.current.y -= event.clientY - drag.lastY;
drag.lastX = event.clientX;
drag.lastY = event.clientY;
};
const onPointerEnd = (event: PointerEvent) => {
const drag = dragRef.current;
if (drag.id !== event.pointerId) {
return;
}
drag.id = null;
drag.panning = false;
root.style.removeProperty("cursor");
};
const onWheel = (event: WheelEvent) => {
// Wheel listeners are passive by default, so this only cancels with { passive: false } below.
// Scrolling over the canvas pans it instead of scrolling the page.
event.preventDefault();
// a mouse reports pixels, some devices report lines or pages
const multiplier = event.deltaMode === 1 ? LINE\_HEIGHT : event.deltaMode === 2 ? root.clientHeight : 1;
targetRef.current.x += event.deltaX \* multiplier;
targetRef.current.y += event.deltaY \* multiplier;
};
const onKeyDown = (event: KeyboardEvent) => {
if (!ARROW\_KEYS.has(event.key)) {
return;
}
event.preventDefault();
heldKeysRef.current.add(event.key);
};
// release on window: a key can lift after focus has left the canvas, and a held arrow must never stick
const onKeyUp = (event: KeyboardEvent) => heldKeysRef.current.delete(event.key);
const onBlur = () => heldKeysRef.current.clear();
const preventNativeDrag = (event: Event) => event.preventDefault();
root.addEventListener("pointerdown", onPointerDown);
root.addEventListener("wheel", onWheel, { passive: false });
root.addEventListener("keydown", onKeyDown);
root.addEventListener("dragstart", preventNativeDrag);
document.addEventListener("pointermove", onPointerMove);
document.addEventListener("pointerup", onPointerEnd);
document.addEventListener("pointercancel", onPointerEnd);
window.addEventListener("keyup", onKeyUp);
window.addEventListener("blur", onBlur);
return () => {
root.removeEventListener("pointerdown", onPointerDown);
root.removeEventListener("wheel", onWheel);
root.removeEventListener("keydown", onKeyDown);
root.removeEventListener("dragstart", preventNativeDrag);
document.removeEventListener("pointermove", onPointerMove);
document.removeEventListener("pointerup", onPointerEnd);
document.removeEventListener("pointercancel", onPointerEnd);
window.removeEventListener("keyup", onKeyUp);
window.removeEventListener("blur", onBlur);
};
}, []);
return (
<div
ref={rootRef}
tabIndex={0}
aria-label="Endless canvas. Drag, scroll or use the arrow keys to pan."
style={{
position: "relative",
height: "100%",
overflow: "clip",
cursor: "grab",
touchAction: "none",
userSelect: "none",
outlineOffset: -2,
}}
>
<div ref={fieldRef} style={{ position: "absolute", left: "50%", top: "50%", willChange: "transform" }}>
{layout.placed.map((item, index) => (
<div
key={item.key}
ref={(element) => {
itemRefs.current[index] = element;
}}
style={{
position: "absolute",
left: item.originX,
top: item.originY,
width: item.width,
height: item.height,
display: "grid",
placeItems: "center",
borderRadius: 10,
background: `linear-gradient(150deg, hsl(${item.hue} 72% 62%), hsl(${item.hue + 24} 68% 48%))`,
color: "#fff",
fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
fontSize: 15,
willChange: "transform",
}}
>
{item.label}
</div>
))}
</div>
<p
aria-hidden
style={{ position: "absolute", right: 12, bottom: 10, margin: 0, fontSize: 12, opacity: 0.5 }}
>
drag or scroll to pan · arrow keys too
</p>
</div>
);
}
createRoot(document.getElementById("root")!).render(<InfiniteGrid items={ITEMS} />);

Runs when you scroll here

## Conclusion

Nothing spawns, nothing gets pruned, and there is no animation library: a deterministic scatter, one RAF loop, and a transform that wraps to the nearest copy of itself. The endless part is arithmetic; the smooth part is a single lerp.

## Build Notes

Notes on content architecture, frontend systems, and the tools I use in real client work.

No spam. Unsubscribe anytime.

*Enjoyed the read? You can follow me on [LinkedIn](https://www.linkedin.com/in/edoardolunardi/), [X](https://x.com/edo_lunardi) or [Instagram](https://www.instagram.com/edo.tsx/) so you don’t miss future articles.*
