---
source: https://motion.dev/docs/split-text
title: "splitText"
fetched: 2026-10-28
---

# splitText

Motion+ (paid). Not included in the free motion package. Install Motion UI: https://motion.dev/docs/motion-ui-installation. Import: `import { splitText } from "motion-plus"`. splitText() breaks text into characters, words, and lines for granular text animation.

`splitText` is a tiny (+0.7kb) utility that makes it simple to create complex, beautiful split text animations with Motion.

Break down text into individual characters, words, and lines, to create staggered enter or scroll-driven text effects with just a few lines of code. For the full map of techniques, from typewriters to tickers, see the [text animation guide](https://motion.dev/docs/text-animation).

`splitText` is exclusive to [Motion+](https://motion.dev/plus) members. Motion+ is a one-time payment, lifetime membership that unlocks Motion UI, premium examples and access to a private Discord community.

Live example: https://examples.motion.dev/js/split-text

## Features

- **Animate anything: **Split text into characters, words and lines to animate each independently.

- **Lightweight**: Only adds 0.7kb to your project bundle.

- **Simple API:** A clean API leaves your code maintainable.

- **Accessible:** Correctly applies ARIA tags to leave your text readable for all users.

- **Flexible:** Animate with Motion, CSS, or a library of your choice.

## Install

First, [install Motion UI](https://motion.dev/docs/motion-ui-installation) in your project. You need to be a [Motion+ member](https://motion.dev/plus) to generate an access token.

Once installed, `splitText` can be imported via `motion-plus`:

```
import { splitText } from "motion-plus"
```

## Usage

`splitText` accepts a CSS selector or an HTML Element. It replaces the element's text content with `<span>` tags that wrap individual characters, words, and (optionally) lines.

It returns an object containing `chars`, `words`, and `lines` as arrays of elements, so they can be animated right away with Motion's `animate` and `stagger` functions.

```
const { chars } = splitText("h1")

animate(
  chars,
  { opacity: [0, 1], y: [10, 0] },
  { duration: 1, delay: stagger(0.05) }
)
```

The returned arrays are regular elements so you're not limited to animating them with Motion. You could animate them with CSS, or another animation library of your choice. Or, you could attach gesture recognisers to each element individually, for instance with Motion's `hover`[ function](https://motion.dev/docs/hover).

Live example: https://examples.motion.dev/js/split-text-scatter

```
const { words } = splitText("h1")

hover(words, (wordElement) => {
  // Hover logic
})
```

## Techniques & troubleshooting

### Enter animations

To perform enter animations, it might be necessary to set the container to `visibility: hidden` via CSS until we're ready to animate.

```
.container {
  visibility: hidden;
}
```

```
document.querySelector(".container").style.visibility = "visible"

const { words } = splitText(".container")
animate(words, { opacity: [0, 1] })
```

Otherwise we might see a flash of visible text until our JS has loaded.

### Working with custom fonts

If you have custom fonts that download **after** `splitText` is executed, it can be that the text is split incorrectly because the dimensions of the text have changed.

To fix this, we can await the browser's `document.fonts.ready` promise:

Live example: https://examples.motion.dev/js/split-text-wavy

```
document.fonts.ready.then(() => {
  const { words } = splitText(element)

  animate(
    words,
    { y: [-10, 10] },
    { delay: stagger(0.04) }
  )
})
```

The rest of this page is for Motion+ members: https://motion.dev/docs/split-text
