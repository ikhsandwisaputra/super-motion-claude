---
source: https://www.edoardolunardi.dev/blog/building-drag-in-react-without-a-library
title: "Building Drag in React with useDraggable, without a library | Edoardo Lunardi"
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

[`E`Email](https://www.edoardolunardi.dev/cdn-cgi/l/email-protection#b2dad7dededdf2d7d6ddd3c0d6dddec7dcd3c0d6db9cd6d7c4 "hello@edoardolunardi.dev (press E)")

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
* [Building Drag in React with useDraggable, without a library](https://www.edoardolunardi.dev/blog)
* [Building an Endless Drag Grid in React, without WebGL](https://www.edoardolunardi.dev/blog/building-an-endless-drag-grid-in-react-without-webgl)
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

# Building Drag in React with useDraggable, without a library

[Author]Edoardo Lunardi

[Published]23 Aug 2025

[Reading time]4 min

[Excerpt]

A tiny React hook that makes any element draggable with Pointer Events, no library, no dependencies, smooth and simple.

A lightweight hook that turns any element into a draggable node. It uses Pointer Events, updates a transform on the target node, and keeps React out of the hot path. For simple dragging, we do not need a timeline engine. It runs in the DOM, no canvas, no WebGL.

## We probably don't need a library here

GSAP and Framer Motion are both great choices for complex choreography. Dragging a box across the screen is a simpler problem. Pointer Events give us native input, `setPointerCapture` provides reliable control, and a single `transform` update gives smooth motion. Less code, fewer bytes, fewer surprises.

![Reaction still of a man in a fedora looking sceptically at another man in a dim room](https://cdn.sanity.io/images/60rvi1lj/production/1727f59eff6df558223a591335027743fb611fef-480x204.gif?w=480&h=204&max-h=3840&max-w=3840&q=85&auto=format)

## The hook API

```
function useDraggable({
  disabled = false,
  onDragStart,
  onDrag,
  onDragEnd,
}: {
  disabled?: boolean;
  onDragStart?: (event: PointerEvent) => void;
  onDrag?: (event: PointerEvent, position: { x: number; y: number }) => void;
  onDragEnd?: (event: PointerEvent, position: { x: number; y: number }) => void;
}) {
  // ...
  return {
    triggerRef: setTriggerElement,
    nodeRef: setNodeElement,
    isDragging: dragState.isDragging,
    position,
    reset,
  };
}
```

Two refs come back. `triggerRef` is the handle we grab. `nodeRef` is the element that moves. We can point both at the same element for a simple case, or we can have a small handle that drags a larger node.

Event flow:`pointerdown` → `setPointerCapture` → `pointermove` → `transform` update → `pointerup` → `releasePointerCapture`.

### Step 1: Start the drag and capture the pointer

On pointer down, the hook records the cursor position, marks the drag as active, and captures the pointer. Pointer capture keeps events routed to the same element even if the cursor leaves it.

```
const handlePointerDown = React.useCallback((event: PointerEvent) => {
  if (disabled || !nodeElement) return;

  event.preventDefault();
  event.stopPropagation();

  setDragState({
    isDragging: true,
    dragOffset: { x: event.clientX, y: event.clientY },
    initialPosition: position,
  });

  hasDragged.current = false;

  const target = event.target as HTMLElement;
  target.setPointerCapture(event.pointerId);
  onDragStart?.(event);
}, [disabled, nodeElement, position, onDragStart]);
```

### Step 2: Track movement with Pointer Events

Pointer move gives a delta. Add the delta to the initial position, then update local state and call the optional `onDrag` callback.

```
const deltaX = event.clientX - dragState.dragOffset.x;
const deltaY = event.clientY - dragState.dragOffset.y;

const newPosition = {
  x: dragState.initialPosition.x + deltaX,
  y: dragState.initialPosition.y + deltaY,
};

hasDragged.current = true;
setPosition(newPosition);
onDrag?.(event, newPosition);
```

### Step 3: End the drag and release the pointer

On up or cancel, the hook clears the drag flag and releases capture. The final position is sent through `onDragEnd`.

```
setDragState(prev => ({ ...prev, isDragging: false }));
const target = event.target as HTMLElement;
target.releasePointerCapture(event.pointerId);
onDragEnd?.(event, position);
```

### Step 4: Apply movement without extra renders

The hook reads the current computed `transform` once, then appends a translate. This keeps any existing transforms intact.

```
if (!initialTransform.current) {
  const cs = window.getComputedStyle(nodeElement);
  initialTransform.current = cs.transform !== "none" ? cs.transform : "";
}

const dragTransform = `translate(${position.x}px, ${position.y}px)`;
const finalTransform = initialTransform.current
  ? `${initialTransform.current} ${dragTransform}`
  : dragTransform;

nodeElement.style.transform = finalTransform;
```

### Step 5: Style hints for smoothness

The hook sets `will-change: transform` on the node while mounted. It also sets `touch-action: none` on the trigger for more reliable touch input. Cursor switches between grab and grabbing while active.

```
nodeElement.style.willChange = "transform";
triggerElement.style.touchAction = "none";
triggerElement.style.cursor = dragState.isDragging ? "grabbing" : "grab";
```

### Step 6: Block click after a drag

Dragging often fires a click on release. The hook tracks a `hasDragged` flag and cancels the click in the capture phase when needed.

```
const handleClick = (event: Event) => {
  if (hasDragged.current) {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
  }
};
```

### Reset

Need to snap the node back to the start? Call `reset`. The hook clears state and restores the original transform.

```
reset();
```

## Usage

We can drag a window, a card, or any absolutely positioned element. Use a small handle for better touch targets.

```
const { triggerRef, nodeRef, reset, isDragging } = useDraggable({
  onDragStart: () => console.log("drag started"),
});

return (
  <div ref={nodeRef} className="window">
    <div ref={triggerRef} className="titlebar">
      {isDragging ? "Dragging" : "Drag me"}
    </div>
    <button onClick={reset}>Reset</button>
  </div>
);
```

### Quick checklist

* Use `pointerdown`, `pointermove`, `pointerup`, not mouse only events.
* Capture the pointer for reliable input during a drag.
* Write the transform on the node, not on parent layout properties.
* Keep React state out of the hot path, use it only to publish position or UI state.
* Provide a reset if your UI needs it.

### Gotchas

* If the node already has a transform, do not overwrite it. Append a translate instead.
* Avoid layout properties like `left` and `top` during a drag, transforms are cheaper in practice.
* If the trigger and the node are the same element, set both refs on it. If not, assign them separately.

## Full Example

useDraggable

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
```

```
import * as React from "react";
import { createRoot } from "react-dom/client";

type Position = { x: number; y: number };

function useDraggable({
  disabled = false,
  onDragStart,
  onDrag,
  onDragEnd,
}: {
  disabled?: boolean;
  onDragStart?: (event: PointerEvent) => void;
  onDrag?: (event: PointerEvent, position: Position) => void;
  onDragEnd?: (event: PointerEvent, position: Position) => void;
}) {
  const [triggerElement, setTriggerElement] = React.useState<HTMLElement | null>(null);
  const [nodeElement, setNodeElement] = React.useState<HTMLElement | null>(null);
  const [position, setPosition] = React.useState<Position>({ x: 0, y: 0 });

  const [dragState, setDragState] = React.useState({
    isDragging: false,
    dragOffset: { x: 0, y: 0 },
    initialPosition: { x: 0, y: 0 },
  });

  const hasDragged = React.useRef(false);
  const initialTransform = React.useRef("");

  const handlePointerDown = React.useCallback(
    (event: PointerEvent) => {
      if (disabled || !nodeElement) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      setDragState({
        isDragging: true,
        dragOffset: { x: event.clientX, y: event.clientY },
        initialPosition: position,
      });

      hasDragged.current = false;

      const target = event.target as HTMLElement;
      target.setPointerCapture(event.pointerId);
      onDragStart?.(event);
    },
    [disabled, nodeElement, position, onDragStart]
  );

  const handlePointerMove = React.useCallback(
    (event: PointerEvent) => {
      if (!dragState.isDragging || !nodeElement) {
        return;
      }

      const deltaX = event.clientX - dragState.dragOffset.x;
      const deltaY = event.clientY - dragState.dragOffset.y;

      const newPosition = {
        x: dragState.initialPosition.x + deltaX,
        y: dragState.initialPosition.y + deltaY,
      };

      hasDragged.current = true;

      setPosition(newPosition);
      onDrag?.(event, newPosition);
    },
    [dragState.isDragging, dragState.dragOffset, dragState.initialPosition, nodeElement, onDrag]
  );

  const handlePointerUp = React.useCallback(
    (event: PointerEvent) => {
      event.stopPropagation();

      if (!dragState.isDragging) {
        return;
      }

      setDragState((prev) => ({ ...prev, isDragging: false }));

      const target = event.target as HTMLElement;
      target.releasePointerCapture(event.pointerId);
      onDragEnd?.(event, position);
    },
    [dragState.isDragging, position, onDragEnd]
  );

  const reset = React.useCallback(() => {
    setPosition({ x: 0, y: 0 });
    setDragState({
      isDragging: false,
      dragOffset: { x: 0, y: 0 },
      initialPosition: { x: 0, y: 0 },
    });

    if (nodeElement) {
      nodeElement.style.transform = initialTransform.current || "";
    }
  }, [nodeElement]);

  React.useEffect(() => {
    if (!triggerElement) {
      return;
    }

    const handleClick = (event: Event) => {
      if (hasDragged.current) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
      }
    };

    triggerElement.addEventListener("pointerdown", handlePointerDown);
    triggerElement.addEventListener("click", handleClick, true);

    return () => {
      triggerElement.removeEventListener("pointerdown", handlePointerDown);
      triggerElement.removeEventListener("click", handleClick, true);
    };
  }, [triggerElement, handlePointerDown]);

  React.useEffect(() => {
    if (!dragState.isDragging) {
      return;
    }

    document.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerup", handlePointerUp);
    document.addEventListener("pointercancel", handlePointerUp);

    return () => {
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerup", handlePointerUp);
      document.removeEventListener("pointercancel", handlePointerUp);
    };
  }, [dragState.isDragging, handlePointerMove, handlePointerUp]);

  React.useEffect(() => {
    if (!nodeElement) {
      return;
    }

    if (!initialTransform.current) {
      const computedStyle = window.getComputedStyle(nodeElement);
      initialTransform.current = computedStyle.transform !== "none" ? computedStyle.transform : "";
    }

    const dragTransform = `translate(${position.x}px, ${position.y}px)`;

    nodeElement.style.transform = initialTransform.current
      ? `${initialTransform.current} ${dragTransform}`
      : dragTransform;
  }, [nodeElement, position]);

  React.useEffect(() => {
    if (!nodeElement) {
      return;
    }

    const originalWillChange = nodeElement.style.willChange;
    nodeElement.style.willChange = "transform";

    return () => {
      nodeElement.style.willChange = originalWillChange;
    };
  }, [nodeElement]);

  React.useEffect(() => {
    if (!triggerElement) {
      return;
    }

    const originalCursor = triggerElement.style.cursor;
    const originalTouchAction = triggerElement.style.touchAction;

    triggerElement.style.touchAction = "none";

    if (!disabled) {
      triggerElement.style.cursor = dragState.isDragging ? "grabbing" : "grab";
    }

    return () => {
      triggerElement.style.cursor = originalCursor;
      triggerElement.style.touchAction = originalTouchAction;
    };
  }, [triggerElement, disabled, dragState.isDragging]);

  return {
    triggerRef: setTriggerElement,
    nodeRef: setNodeElement,
    isDragging: dragState.isDragging,
    position,
    reset,
  };
}

let zCounter = 1;

function Card({
  title,
  leftPct = 0,
  topPct = 0,
  w = 200,
  h = 130,
}: {
  title: string;
  leftPct?: number;
  topPct?: number;
  w?: number;
  h?: number;
}) {
  const [zIndex, setZIndex] = React.useState(1);

  const { triggerRef, nodeRef, isDragging, reset } = useDraggable({
    onDragStart: () => {
      zCounter += 1;
      setZIndex(zCounter);
    },
  });

  return (
    <div
      ref={nodeRef}
      style={{
        position: "absolute",
        left: `${leftPct}%`,
        top: `${topPct}%`,
        width: w,
        height: h,
        background: "white",
        color: "#111",
        border: "1px solid #e5e7eb",
        borderRadius: 8,
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        overflow: "hidden",
        userSelect: "none",
        zIndex,
      }}
    >
      <div
        ref={triggerRef}
        style={{
          height: 36,
          padding: "0 10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#f3f4f6",
          fontSize: 14,
          cursor: "grab",
        }}
      >
        <span>{title}</span>
        <span style={{ fontSize: 12, opacity: 0.7 }}>{isDragging ? "dragging" : "drag"}</span>
      </div>

      <div style={{ padding: 12, fontSize: 14 }}>
        <button
          onClick={reset}
          style={{
            padding: "6px 10px",
            border: "1px solid #e5e7eb",
            borderRadius: 6,
            background: "white",
            color: "#111",
            cursor: "pointer",
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <main
      style={{
        height: "100%",
        padding: 24,
        position: "relative",
        overflow: "hidden",
        background: "#0b0f17",
      }}
    >
      <Card title="Card A" leftPct={4} topPct={10} />
      <Card title="Card B" leftPct={20} topPct={30} />
      <Card title="Card C" leftPct={36} topPct={50} />
    </main>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
```

import \* as React from "react";
import { createRoot } from "react-dom/client";
type Position = { x: number; y: number };
function useDraggable({
disabled = false,
onDragStart,
onDrag,
onDragEnd,
}: {
disabled?: boolean;
onDragStart?: (event: PointerEvent) => void;
onDrag?: (event: PointerEvent, position: Position) => void;
onDragEnd?: (event: PointerEvent, position: Position) => void;
}) {
const [triggerElement, setTriggerElement] = React.useState<HTMLElement | null>(null);
const [nodeElement, setNodeElement] = React.useState<HTMLElement | null>(null);
const [position, setPosition] = React.useState<Position>({ x: 0, y: 0 });
const [dragState, setDragState] = React.useState({
isDragging: false,
dragOffset: { x: 0, y: 0 },
initialPosition: { x: 0, y: 0 },
});
const hasDragged = React.useRef(false);
const initialTransform = React.useRef("");
const handlePointerDown = React.useCallback(
(event: PointerEvent) => {
if (disabled || !nodeElement) {
return;
}
event.preventDefault();
event.stopPropagation();
setDragState({
isDragging: true,
dragOffset: { x: event.clientX, y: event.clientY },
initialPosition: position,
});
hasDragged.current = false;
const target = event.target as HTMLElement;
target.setPointerCapture(event.pointerId);
onDragStart?.(event);
},
[disabled, nodeElement, position, onDragStart]
);
const handlePointerMove = React.useCallback(
(event: PointerEvent) => {
if (!dragState.isDragging || !nodeElement) {
return;
}
const deltaX = event.clientX - dragState.dragOffset.x;
const deltaY = event.clientY - dragState.dragOffset.y;
const newPosition = {
x: dragState.initialPosition.x + deltaX,
y: dragState.initialPosition.y + deltaY,
};
hasDragged.current = true;
setPosition(newPosition);
onDrag?.(event, newPosition);
},
[dragState.isDragging, dragState.dragOffset, dragState.initialPosition, nodeElement, onDrag]
);
const handlePointerUp = React.useCallback(
(event: PointerEvent) => {
event.stopPropagation();
if (!dragState.isDragging) {
return;
}
setDragState((prev) => ({ ...prev, isDragging: false }));
const target = event.target as HTMLElement;
target.releasePointerCapture(event.pointerId);
onDragEnd?.(event, position);
},
[dragState.isDragging, position, onDragEnd]
);
const reset = React.useCallback(() => {
setPosition({ x: 0, y: 0 });
setDragState({
isDragging: false,
dragOffset: { x: 0, y: 0 },
initialPosition: { x: 0, y: 0 },
});
if (nodeElement) {
nodeElement.style.transform = initialTransform.current || "";
}
}, [nodeElement]);
React.useEffect(() => {
if (!triggerElement) {
return;
}
const handleClick = (event: Event) => {
if (hasDragged.current) {
event.preventDefault();
event.stopPropagation();
event.stopImmediatePropagation();
}
};
triggerElement.addEventListener("pointerdown", handlePointerDown);
triggerElement.addEventListener("click", handleClick, true);
return () => {
triggerElement.removeEventListener("pointerdown", handlePointerDown);
triggerElement.removeEventListener("click", handleClick, true);
};
}, [triggerElement, handlePointerDown]);
React.useEffect(() => {
if (!dragState.isDragging) {
return;
}
document.addEventListener("pointermove", handlePointerMove);
document.addEventListener("pointerup", handlePointerUp);
document.addEventListener("pointercancel", handlePointerUp);
return () => {
document.removeEventListener("pointermove", handlePointerMove);
document.removeEventListener("pointerup", handlePointerUp);
document.removeEventListener("pointercancel", handlePointerUp);
};
}, [dragState.isDragging, handlePointerMove, handlePointerUp]);
React.useEffect(() => {
if (!nodeElement) {
return;
}
if (!initialTransform.current) {
const computedStyle = window.getComputedStyle(nodeElement);
initialTransform.current = computedStyle.transform !== "none" ? computedStyle.transform : "";
}
const dragTransform = `translate(${position.x}px, ${position.y}px)`;
nodeElement.style.transform = initialTransform.current
? `${initialTransform.current} ${dragTransform}`
: dragTransform;
}, [nodeElement, position]);
React.useEffect(() => {
if (!nodeElement) {
return;
}
const originalWillChange = nodeElement.style.willChange;
nodeElement.style.willChange = "transform";
return () => {
nodeElement.style.willChange = originalWillChange;
};
}, [nodeElement]);
React.useEffect(() => {
if (!triggerElement) {
return;
}
const originalCursor = triggerElement.style.cursor;
const originalTouchAction = triggerElement.style.touchAction;
triggerElement.style.touchAction = "none";
if (!disabled) {
triggerElement.style.cursor = dragState.isDragging ? "grabbing" : "grab";
}
return () => {
triggerElement.style.cursor = originalCursor;
triggerElement.style.touchAction = originalTouchAction;
};
}, [triggerElement, disabled, dragState.isDragging]);
return {
triggerRef: setTriggerElement,
nodeRef: setNodeElement,
isDragging: dragState.isDragging,
position,
reset,
};
}
let zCounter = 1;
function Card({
title,
leftPct = 0,
topPct = 0,
w = 200,
h = 130,
}: {
title: string;
leftPct?: number;
topPct?: number;
w?: number;
h?: number;
}) {
const [zIndex, setZIndex] = React.useState(1);
const { triggerRef, nodeRef, isDragging, reset } = useDraggable({
onDragStart: () => {
zCounter += 1;
setZIndex(zCounter);
},
});
return (
<div
ref={nodeRef}
style={{
position: "absolute",
left: `${leftPct}%`,
top: `${topPct}%`,
width: w,
height: h,
background: "white",
color: "#111",
border: "1px solid #e5e7eb",
borderRadius: 8,
boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
overflow: "hidden",
userSelect: "none",
zIndex,
}}
>
<div
ref={triggerRef}
style={{
height: 36,
padding: "0 10px",
display: "flex",
alignItems: "center",
justifyContent: "space-between",
background: "#f3f4f6",
fontSize: 14,
cursor: "grab",
}}
>
<span>{title}</span>
<span style={{ fontSize: 12, opacity: 0.7 }}>{isDragging ? "dragging" : "drag"}</span>
</div>
<div style={{ padding: 12, fontSize: 14 }}>
<button
onClick={reset}
style={{
padding: "6px 10px",
border: "1px solid #e5e7eb",
borderRadius: 6,
background: "white",
color: "#111",
cursor: "pointer",
}}
>
Reset
</button>
</div>
</div>
);
}
function App() {
return (
<main
style={{
height: "100%",
padding: 24,
position: "relative",
overflow: "hidden",
background: "#0b0f17",
}}
>
<Card title="Card A" leftPct={4} topPct={10} />
<Card title="Card B" leftPct={20} topPct={30} />
<Card title="Card C" leftPct={36} topPct={50} />
</main>
);
}
createRoot(document.getElementById("root")!).render(<App />);

Runs when you scroll here

## Conclusion

We can get draggable behavior with a small hook, a few Pointer Events, and one transform. Keeping it simple saves bytes and avoids complexity. Heavy tools should be reserved for animation work that truly needs them.

## Build Notes

Notes on content architecture, frontend systems, and the tools I use in real client work.

No spam. Unsubscribe anytime.

*Enjoyed the read? You can follow me on [LinkedIn](https://www.linkedin.com/in/edoardolunardi/), [X](https://x.com/edo_lunardi) or [Instagram](https://www.instagram.com/edo.tsx/) so you don’t miss future articles.*
