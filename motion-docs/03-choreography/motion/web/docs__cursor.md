---
source: https://motion.dev/docs/cursor
title: "Cursor"
fetched: 2026-10-28
---

# Cursor

Motion+ (paid). Not included in the free motion package. Install Motion UI: https://motion.dev/docs/react-motion-ui-installation. Import: `import { Cursor } from "motion-plus/react"`. Custom cursor and follow-along effects for React.

`Cursor` is a powerful React component for building creative and interactive cursor effects. Effortlessly replace the default browser cursor, create engaging follow-cursor animations, or add magnetic snapping to UI elements.

Built on Motion's [layout animations](https://motion.dev/docs/react-layout-animations), `Cursor` is performant and full customisable with variants, CSS and custom React components.

```
<Cursor />
```

`Cursor` is exclusive to [Motion+](https://motion.dev/plus) members. Motion+ is a one-time payment, lifetime membership that unlocks Motion UI, premium examples and access to a private Discord community.

Live example: https://examples.motion.dev/react/ios-pointer

## Features

- **Two modes: **Easily switch between replacing the default cursor or creating a "follow" cursor effect.

- **State-aware:** Automatically adapts its appearance when hovering over links, buttons, or selectable text, and when pressed.

- **Magnetic:** Make the cursor snap to interactive elements on hover for a tactile feel.

- **Customisable: **Use CSS, Motion variants, and custom React components to create any cursor you can imagine.

- **Accessible:** Can be disabled for users who prefer reduced motion.

## Install

First, [install Motion UI](https://motion.dev/docs/react-motion-ui-installation) in your project. You need to be a [Motion+ member](https://motion.dev/plus) to generate an access token.

## Usage

The `Cursor` component is used for both custom cursor and follow cursor effects:

```
import { Cursor } from "motion-plus/react"
```

When `Cursor` is rendered, a default custom cursor will render on the page, hiding the browser's default cursor.

```
<Cursor />
```

You can remove the cursor and restore the browser cursor at any time by removing the component.

```
{isCursorVisible ? <Cursor /> : null}
```

Live example: https://examples.motion.dev/react/cursor

### Styling

By default, the cursor is a neutral grey color. It's possible to change the cursor's styles using CSS.

```
<Cursor className="my-cursor" style={{ backgroundColor: "red" }} />
```

The rest of this page is for Motion+ members: https://motion.dev/docs/cursor
