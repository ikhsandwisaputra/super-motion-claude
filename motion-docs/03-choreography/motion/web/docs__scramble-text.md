---
source: https://motion.dev/docs/scramble-text
title: "scrambleText"
fetched: 2026-10-28
---

# scrambleText

Motion+ (paid). Not included in the free motion package. Install Motion UI: https://motion.dev/docs/motion-ui-installation. Import: `import { scrambleText } from "motion-plus"`. scrambleText() animates text by scrambling characters, with stagger and timing controls.

`scrambleText` is a 1kb function that provides scramble text animations for vanilla JavaScript. It works with DOM elements or `MotionValues`.

```
import { scrambleText } from "motion-plus"

scrambleText("#title", { duration: 1 })
```

Live example: https://examples.motion.dev/js/scramble-text

`scrambleText` is exclusive to [Motion+](https://motion.dev/plus) members. Motion+ is a one-time payment, lifetime membership that unlocks Motion UI, premium examples and access to a private Discord community.

## Features

- **Stagger:** Use Motion's `stagger` function for both `delay` and `duration` to create letter-by-letter reveal effects.

- **Playback control:** Returns playback controls to pause, play, hard stop or finish your animations.

- **Customisable characters:** Use the default alphanumeric set, or provide custom characters (including emoji).

## Install

First, [install Motion UI](https://motion.dev/docs/motion-ui-installation) in your project. You need to be a [Motion+ member](https://motion.dev/plus) to generate an access token.

## Usage

Pass an element or CSS selector to scramble its text content:

```
import { scrambleText } from "motion-plus-dom"

// With selector
scrambleText("#title", { duration: 1 })

// With element reference
const element = document.querySelector(".text")
scrambleText(element, { duration: 1 })
```

### With `MotionValue`

Alternatively, you can pass a `MotionValue<string>` to `scrambleText`. It will animate back to the value as read when the animation starts.

```
import { scrambleText } from "motion-plus-dom"
import { motionValue } from "motion"

const text = motionValue("Hello world!")

// Subscribe to changes
text.on("change", (latest) => {
  document.querySelector("#title").textContent = latest
})

scrambleText(text, { duration: 1 })
```

### Stagger

Use Motion's `stagger()` function to reveal characters one by one:

```
import { scrambleText } from "motion-plus-dom"
import { stagger } from "motion"

// Start scrambling at the same time, reveal with stagger
scrambleText(element, {
  duration: stagger(0.05, { startDelay: 1 })
})
```

Live example: https://examples.motion.dev/js/scramble-text-stagger-center

#### Delay stagger

Stagger when each character starts scrambling:

```
// Chars start scrambling one-by-one, all reveal after 1s
scrambleText(element, {
  delay: stagger(0.1),
  duration: 1
})
```

#### Direction

Use stagger's `from` option to control reveal direction:

```
scrambleText(element, {
  delay: stagger(0.05, { from: "center" }),
  duration: 0.5
})
```

The rest of this page is for Motion+ members: https://motion.dev/docs/scramble-text
