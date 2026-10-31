---
source: https://motion.dev/docs/react-carousel
title: "Carousel"
fetched: 2026-10-28
---

# Carousel

Motion+ (paid). Not included in the free motion package. Install Motion UI: https://motion.dev/docs/react-motion-ui-installation. Import: `import { Carousel } from "motion-plus/react"`. A performant, accessible, and infinitely scrollable carousel for React.

The Carousel component creates performant, accessible and fully-featured carousels in React. It's designed to be flexible and easy to use, supporting pointer, wheel and keyboard navigation out the box.

Live example: https://examples.motion.dev/react/carousel

It allows you to go beyond the traditional limitations of CSS-only approaches, with support for infinitely-scrolling carousels and without limitations on styling.

### Features

- **Lightweight:** Just `+5.5kb` on top of [the ](https://motion.dev/docs/react-motion-component)`motion`[ component](https://motion.dev/docs/react-motion-component).

- **Accessible:** Automatic ARIA labels, respects reduced motion, RTL layouts, and all major input methods.

- **Performant:** Built on the same [unique rendering](https://motion.dev/magazine/building-the-ultimate-ticker) used by the [Ticker](https://motion.dev/docs/react-ticker) component that achieves infinite scrolling with while minimising or eliminating item cloning.

- **Customisable:** Provides functions and state to easily create custom controls and pagination.

## Install

First, [install Motion UI](https://motion.dev/docs/react-motion-ui-installation) in your project. You need to be a [Motion+ member](https://motion.dev/plus) to generate an access token.

## Usage

### Import

Import the `Carousel` component from "motion-plus/react"\`:

```
import { Carousel } from "motion-plus/react"
```

`Carousel` accepts a single mandatory prop, `items`. This is a list of valid React nodes (which can be components, strings or numbers):

```
const items = [
  <span>One</span>,
  <span>Two</span>,
  <span>Three</span>
]

return <Carousel items={items} />
```

Live example: https://examples.motion.dev/react/carousel-coverflow

### Direction

By default, carousels will scroll horizontally. Setting the `axis` prop to `y`, we can make them vertical.

```
<Carousel items={items} axis="y" />
```

Live example: https://examples.motion.dev/react/carousel-vertical

### Layout

Items are laid out via flexbox. Passing `gap` and `align` will adjust the spacing and off-axis alignment of them items.

```
<Carousel items={items} gap={0} align="start" />
```

### Overflow

By setting `overflow` to `true`, items will visually extend out from the container to the edges of the viewport.

```
<Carousel items={items} overflow />
```

This makes it straightforward to place a `Carousel` within a document flow but still extend the ticker effect across the full viewport.

Live example: https://examples.motion.dev/react/carousel-pagination-arrows

The rest of this page is for Motion+ members: https://motion.dev/docs/react-carousel
