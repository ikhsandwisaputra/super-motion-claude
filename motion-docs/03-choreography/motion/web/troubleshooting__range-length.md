---
source: https://motion.dev/troubleshooting/range-length
title: "Range length mismatch (Error) | Motion Troubleshooting"
fetched: 2026-10-28
---

* Â·ERROR
* Â·ERROR
* Â·ERROR
* Â·ERROR
* Â·ERROR
* Â·ERROR
* Â·ERROR
* Â·ERROR

>[Troubleshooting](https://motion.dev/troubleshooting)/ERROR

# Range length mismatch

* Â·ERROR
* Â·ERROR
* Â·ERROR
* Â·ERROR
* Â·ERROR
* Â·ERROR
* Â·ERROR
* Â·ERROR

>You've received the following message

```
Both input and output ranges must be the same length.
```

You're attempting to map a value from one value range to another, and these ranges are of different lengths.

```
useTransform(
  value,
  [0, 1],
  [0, 50, 100]
)
```

This error originates in an internal function used in many different Motion APIs, like `useTransform`, `transform` and `mapValue`.

## Explanation

When mapping between two keyframe ranges, Motion matches the keyframes from the input range to those in the output range.

When these range lengths are different, it becomes impossible for Motion to know what the user intends when the input value is, in this example, `1`:

```
/**
 * 0 --> 0
 * 1 --> 50
 * ? --> 100
 */
[0, 1]
[0, 50, 100]
```

## Solution

There's no good default behaviour here, which is why Motion throws rather than takes a default position.

One approach could be to map the input range "over" the output range by adding values in-between:

```
/**
 * 0 --> 0
 * 0.5 --> 50
 * 1 --> 100
 */
[0, 0.5, 1]
[0, 50, 100]
```

Alternatively, you could duplicate a value at the end of the input range.

```
/**
 * 0 --> 0
 * 0.9 --> 45
 * 1 --> 100
 */
[0, 1, 1]
[0, 50, 100]
```

This would have a different behaviour, where any value 1 or above would snap to 100, but any value below would output between `0` and `50`.
