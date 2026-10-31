---
source: https://motion.dev/docs/react-animate-number
title: "AnimateNumber"
fetched: 2026-10-28
---

# AnimateNumber

Motion+ (paid). Not included in the free motion package. Install Motion UI: https://motion.dev/docs/react-motion-ui-installation. Import: `import { AnimateNumber } from "motion-plus/react"`. Number ticker and countdown animations for React.

`AnimateNumber` is a lightweight (2.5kb) React component for creating beautiful number animations with Motion. It's perfect for counters, dynamic pricing, countdowns, and more.

```
<AnimateNumber>{count}</AnimateNumber>
```

Built on top of Motion's powerful layout animations, `AnimateNumber` allows you to leverage all of Motion's existing transition settings, like `spring` and `tween`, to create fluid and engaging effects.

`AnimateNumber` is exclusive to [Motion+](https://motion.dev/plus) members. Motion+ is a one-time payment, lifetime membership that unlocks Motion UI, premium examples and access to a private Discord community.

Live example: https://examples.motion.dev/react/number-counter

## Features

- **Built on Motion: **Leverages Motion's robust animation engine, allowing you to use familiar `transition` props like `spring`, `duration`, and `ease`.

- **Lightweight:** Adds only 2.5kb on top of Motion.

- **Advanced formatting:** Uses the built-in `Intl.NumberFormat` for powerful, locale-aware number formatting (e.g., currency, compact notation).

- **Customisable: **Provides distinct CSS classes for each part of the number (prefix, integer, fraction, suffix) for full styling control.

## Install

First, [install Motion UI](https://motion.dev/docs/react-motion-ui-installation) in your project. You need to be a [Motion+ member](https://motion.dev/plus) to generate an access token.

## Usage

`AnimateNumber` accepts a single child, a number.

```
<AnimateNumber>300</AnimateNumber>
```

When this number changes, it'll animate to its latest value.

```
import { AnimateNumber } from "motion-plus/react"

function Counter() {
  const [count, setCount] = useState(0)

  return (
    <>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <AnimateNumber>{count}</AnimateNumber>
    </>
  )
}
```

### Customise animation

The `transition` prop accepts Motion for React's [transition options](https://motion.dev/docs/react-transitions).

```
<AnimateNumber transition={{ type: "spring" }}>
```

`transition` accepts value-specific transition settings, so it's possible to set specific transitions for `layout`, `y` and `opacity`:

```
<AnimateNumber transition={{
  layout: { duration: 0.3 },
  opacity: { ease: "linear" },
  y: { type: "spring", visualDuration: 0.4, bounce: 0.2 }
}}>
```

The rest of this page is for Motion+ members: https://motion.dev/docs/react-animate-number
