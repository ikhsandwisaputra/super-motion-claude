---
source: https://motion.dev/docs/react-ticker
title: "Ticker"
fetched: 2026-10-28
---

# Ticker

Motion+ (paid). Not included in the free motion package. Install Motion UI: https://motion.dev/docs/react-motion-ui-installation. Import: `import { Ticker } from "motion-plus/react"`. Infinitely-scrolling ticker and marquee effects, driven by time, drag, or scroll.

The `Ticker` component for React creates performant, flexible, and fully accessible ticker and marquee animations. It's perfect for showcasing logos, photos, testimonials, news headlines, and more.

`Ticker`'s simple API makes these infinitely-scrolling animations easy to build.

```
<Ticker items={items} />
```

Live example: https://examples.motion.dev/react/ticker-y-axis

It intelligently clones only the minimum number of items needed to create a seamless loop, ensuring optimal performance. Because it's powered by Motion, you can take full manual control with a [motion value](https://motion.dev/docs/react-motion-value) to create scroll-driven or draggable effects.

Live example: https://examples.motion.dev/react/ticker-scroll

`Ticker` is exclusive to [Motion+](https://motion.dev/plus) members. Motion+ is a one-time payment, lifetime membership that unlocks Motion UI, premium examples and access to a private Discord community.

## Features

`Ticker` is a production-ready component built with performance and accessibility at its core.

- **Lightweight: **Just `+2.1kb` on top of Motion for React.

- **Accessible: **Automatic support for "reduced motion" and intelligent keyboard focus-trapping means your site is inclusive for all users.

- **Flexible: **Animate horizontally or vertically. Control the animation with velocity, scroll position, or drag gestures.

- **Performant: **Creates the absolute minimum number of cloned elements required to fill the viewport. [Read more about Motion+ Ticker's unique renderer.](https://motion.dev/magazine/building-the-ultimate-ticker) More efficient and maintainable than hand-rolled CSS tickers.

- **Full-width overflow:** Easily create tickers that are contained within your layout but visually extend to the edges of the viewport.

- **RTL-compatible: **Automatically adapts to RTL layouts.

## Install

First, [install Motion UI](https://motion.dev/docs/react-motion-ui-installation) in your project. You need to be a [Motion+ member](https://motion.dev/plus) to generate an access token.

## Usage

`Ticker` accepts on mandatory prop, `items`. This is a list of valid React nodes (which can be components, strings or numbers):

```
const items = [
  <span>One</span>,
  <span>Two</span>,
  <span>Three</span>
]

return <Ticker items={items} />
```

### Direction

By default, tickers will scroll horizontally, but via the `axis` prop we can lay out and animate items on the `"y"` axis too.

```
<Ticker items={items} axis="y" />
```

Live example: https://examples.motion.dev/react/ticker-y-axis

### Adjust speed

Setting the `velocity` prop (in pixels per second) will change the speed and direction of the ticker animation.

```
<Ticker items={items} velocity={100} />
```

Flipping this to a negative value will reverse the direction of the ticker.

```
<Ticker items={items} velocity={-100} />
```

Whereas setting it to `0` will stop all motion.

```
<Ticker items={items} velocity={0} />
```

The rest of this page is for Motion+ members: https://motion.dev/docs/react-ticker
