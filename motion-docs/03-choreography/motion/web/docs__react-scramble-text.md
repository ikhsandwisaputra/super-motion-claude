---
source: https://motion.dev/docs/react-scramble-text
title: "ScrambleText"
fetched: 2026-10-28
---

# ScrambleText

Motion+ (paid). Not included in the free motion package. Install Motion UI: https://motion.dev/docs/react-motion-ui-installation. Import: `import { ScrambleText } from "motion-plus/react"`. A scramble text animation component for React, with stagger and renderless control.

`ScrambleText` is a 1kb React component for creating scramble text animations.

Live example: https://examples.motion.dev/react/scramble-text-stagger-center

Unlike most scramble text implementations, `ScrambleText` uses Motion for React's [motion value](https://motion.dev/docs/motion-value) rendering to avoid React re-renders.

```
<ScrambleText>{text}</ScrambleText>
```

`ScrambleText` is exclusive to [Motion+](https://motion.dev/plus) members. Motion+ is a one-time payment, lifetime membership that unlocks Motion UI, premium examples and access to a private Discord community.

## Features

- **Stagger:** Use Motion's `stagger` function for both `delay` and `duration` to create letter-by-letter reveal effects.

- **Performant:** Renders via Motion's high-performance animation loop, skipping React re-renders.

- **Playback control:** Toggle the `active` prop to start/stop scrambling, perfect for hover effects or scroll-triggered animations.

- **Customisable characters:** Use the default alphanumeric set, or provide custom characters (including emoji).

## Install

First, [install Motion UI](https://motion.dev/docs/react-motion-ui-installation) in your project. You need to be a [Motion+ member](https://motion.dev/plus) to generate an access token.

## Usage

By passing a string as the `ScrambleText` child, it will animate that text in character by character.

```
<ScrambleText>Hello world!</ScrambleText>
```

Live example: https://examples.motion.dev/react/scramble-text

### Stagger

Use Motion's `stagger()` function to reveal characters one by one:

```
import { stagger } from "motion"
import { ScrambleText } from "motion-plus/react"

// Start scrambling at the same time, reveal after 1
// second, with a 0.05 delay between each character/
<ScrambleText duration={stagger(0.05, { startDelay: 1 })} >
  Hello world!
</ScrambleText>
```

#### Delay

Stagger when each character starts scrambling by passing `stagger` to `delay`:

```
// Chars start scrambling one-by-one, all reveal after 1s of scrambling
<ScrambleText delay={stagger(0.1)} duration={1}>
  Hello world!
</ScrambleText>
```

#### Direction

Use `stagger`'s `from` option for controlling the direction of stagger:

```
<ScrambleText
  delay={stagger(0.05, { from: "center" })}
  duration={0.5}
>
  Hello world!
</ScrambleText>
```

Live example: https://examples.motion.dev/react/scramble-text-stagger-center

The rest of this page is for Motion+ members: https://motion.dev/docs/react-scramble-text
