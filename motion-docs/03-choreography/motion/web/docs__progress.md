---
source: https://motion.dev/docs/progress
title: "progress"
fetched: 2026-10-28
---

# progress

progress() returns how far a value is through a range, as a number from 0 to 1.

`progress` returns how far a value is through a range. `0` is the start of the range and `1` is the end.

```
progress(0, 200, 50) // 0.25
```

It's the opposite of [`mix`](https://motion.dev/docs/mix). `mix` turns progress into a value, and `progress` turns a value into progress.

## Usage

Import from Motion:

```
import { progress } from "motion"
```

`progress` accepts the start of the range, the end of the range, and a value.

```
progress(100, 200, 150) // 0.5
```

The range can run in either direction:

```
progress(200, 100, 150) // 0.5
progress(200, 100, 175) // 0.25
```

### Values outside the range

`progress` doesn't limit its output. A value before the start returns less than `0`, and a value after the end returns more than `1`:

```
progress(0, 100, 150) // 1.5
progress(0, 100, -50) // -0.5
```

To keep the result between `0` and `1`, wrap it in [`clamp`](https://motion.dev/docs/clamp):

```
clamp(0, 1, progress(0, 100, 150)) // 1
```

If the start and end are the same, `progress` returns `1`.

### Map a value to another range

Combine `progress` with `mix` to map a value from one range to another:

```
const opacity = mix(0, 1, progress(0, 500, scrollY))
```

For mapping with several stops, easing or colours, use [`transform`](https://motion.dev/docs/transform).
