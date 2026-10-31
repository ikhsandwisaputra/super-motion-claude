---
source: https://motion.dev/docs/wrap
title: "wrap"
fetched: 2026-10-28
---

# wrap

wrap() constrains a value within a range, ideal for pagination and looping indices.

`wrap` will take a value and wrap it within a limited range.

```
wrap(0, 100, 150) // 50
```

This is useful, for instance when creating next/prev pagination.

```
const index = wrap(0, numItems, currentIndex + 1)
```

Live example: https://examples.motion.dev/react/use-presence-data

## Usage

Import from Motion:

```
import { wrap } from "motion"
```

`wrap` accepts a `min` and `max`, and a value to wrap through that range.

Values within this range will be unaffected:

```
wrap(0, 10, 5) // 5
```

When the provided value is outside the range, it'll be wrapped back around:

```
wrap(0, 10, 11) // 1
wrap(0, 10, -1) // 9
```
