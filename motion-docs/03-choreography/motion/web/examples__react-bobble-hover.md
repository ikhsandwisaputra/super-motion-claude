---
source: https://motion.dev/examples/react-bobble-hover
title: "Bobble hover example & tutorial for React | Motion"
fetched: 2026-10-28
---

# Bobble hover

A 3x3 grid of tiles that bobble with a spring when hovered, with the bounce scaled to how fast the pointer was moving, using Motion for React.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)2 Jun 2026

:   React

:   [MotionScoreS](https://score.motion.dev/methodology "This example has a MotionScore of S, an S-to-F grade based on its animation render cost. Learn how grades work.")

:   [Motion+](https://motion.dev/plus)

[Open fullscreen](https://examples.motion.dev/react/bobble-hover)

## Source code

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/react-bobble-hover#tutorial)

Difficulty

### Introduction

The "Bobble hover" example builds a 3x3 grid of tiles that spring to life as your cursor sweeps across them. The trick is that each tile bobbles in proportion to how fast the pointer was moving when it arrived: drift slowly and you get a gentle nudge, flick across quickly and the tile pops, stretches and tilts before settling back to rest. It's a tactile, physical way to make a grid of images feel alive.

This example uses a handful of Motion APIs to read the pointer and drive the bounce:

* Motion+ [`usePointerPosition`](https://motion.dev/docs/cursor) â tracks the global pointer as a pair of motion values.
* [`useVelocity`](https://motion.dev/docs/react-use-velocity) â derives how fast the pointer is moving on each axis.
* [`useTransform`](https://motion.dev/docs/react-use-transform) â combines the two axes into a single speed value.
* [`useMotionValue`](https://motion.dev/docs/react-motion-value) â holds each tile's `x`, `y`, `rotate` and `scale`.
* [`animate`](https://motion.dev/docs/animate) â springs each value back to rest with an injected velocity, creating the bobble.
* [`motion`](https://motion.dev/docs/react-motion-component) â renders the tiles and exposes the `onHoverStart` gesture.

### Get started

Let's start with the static layout: a centred 3x3 grid of tiles, each filled with a colour from a vivid palette. Each tile is a plain `<div>` for now; we'll upgrade it to a `motion.div` once we start animating.

```
"use client"

const GRID_SIZE = 3
const TILES = GRID_SIZE * GRID_SIZE

// A vivid spread so neighbouring tiles always differ, and bright enough that
// the dark index stays legible on each.
const HUES = [
	"#ffe14d", "#8df0cc", "#ff5da8",
	"#a98bff", "#ff7a59", "#c6f24e",
	"#5fd8f0", "#ffae4d", "#88a8ff",
]

function Tile({ index, hue }) {
	return (
		<div className="tile" style={{ background: hue }}>
			<span className="tile-index">{String(index + 1).padStart(2, "0")}</span>
		</div>
	)
}

export default function BobbleHover() {
	return (
		<>
			<div className="stage">
				<div className="grid">
					{Array.from({ length: TILES }, (_, i) => (
						<Tile key={i} index={i} hue={HUES[i % HUES.length]} />
					))}
				</div>
			</div>
			<Stylesheet />
		</>
	)
}

function Stylesheet() {
	return <style>{/** Copy styles from example source code */}</style>
}
```

This gives us a grid of nine coloured tiles with a small index label in each. Everything from here is about making them react to the pointer.

### Related examples

* [![Cursor: Floating target animation example](https://images.motion.dev/examples/previews/vue/cursor-floating-target/v-f791718fcc6c/poster.webp)[](https://images.motion.dev/examples/previews/vue/cursor-floating-target/v-f791718fcc6c/preview.mp4)Cursor: Floating target](https://motion.dev/examples/vue-cursor-floating-target)
* [![Cursor: Floating target animation example](https://images.motion.dev/examples/previews/react/cursor-floating-target/v-f00eca12d5d7/poster.webp)[](https://images.motion.dev/examples/previews/react/cursor-floating-target/v-f00eca12d5d7/preview.mp4)Cursor: Floating target](https://motion.dev/examples/react-cursor-floating-target)
* [![Magnetic filings animation example](https://images.motion.dev/examples/previews/vue/magnetic-filings/v-d08df510d054/poster.webp)[](https://images.motion.dev/examples/previews/vue/magnetic-filings/v-d08df510d054/preview.mp4)Magnetic filings](https://motion.dev/examples/vue-magnetic-filings)

### Latest in React

* [![AnimateSuspense: Loading comments animation example](https://images.motion.dev/examples/react/animate-suspense.png)AnimateSuspense: Loading comments](https://motion.dev/examples/react-animate-suspense)
* [![AnimateSuspense: Skeleton crossfade animation example](https://images.motion.dev/examples/react/animate-suspense-pop-layout.png)AnimateSuspense: Skeleton crossfade](https://motion.dev/examples/react-animate-suspense-pop-layout)
* [![AnimateSuspense: Wait for exit animation example](https://images.motion.dev/examples/react/animate-suspense-wait.png)AnimateSuspense: Wait for exit](https://motion.dev/examples/react-animate-suspense-wait)
* [![Gallery: Depth of field animation example](https://images.motion.dev/examples/react/gallery-depth-of-field.png)Gallery: Depth of field](https://motion.dev/examples/react-gallery-depth-of-field)
