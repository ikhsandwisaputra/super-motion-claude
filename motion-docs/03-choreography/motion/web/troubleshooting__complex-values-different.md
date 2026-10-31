---
source: https://motion.dev/troubleshooting/complex-values-different
title: "Complex values are too different (Warning) | Motion Troubleshooting"
fetched: 2026-10-28
---

* Â·WARNING
* Â·WARNING
* Â·WARNING
* Â·WARNING
* Â·WARNING
* Â·WARNING
* Â·WARNING
* Â·WARNING

>[Troubleshooting](https://motion.dev/troubleshooting)/WARNING

# Complex values are too different

* Â·WARNING
* Â·WARNING
* Â·WARNING
* Â·WARNING
* Â·WARNING
* Â·WARNING
* Â·WARNING
* Â·WARNING

>You've received the following message

```
Complex values '${origin}' and '${target}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.
```

You're attempting to mix two different strings, and receiving this warning.

## Explanation

A complex string is a string that can contain multiple numbers or colors.

* `0`: A number
* `"#fff"`: A color
* `"0px"`: A pixel unit number
* `"0px 100px"`: A complex string

Motion supports animating between any two complex strings, but they both must contain the same number of numbers, colors, and CSS variables in each.

The caveat is with numbers, where Motion is able to animate from fewer numbers to more numbers:

```
â "0px" -> "0px 100px 0px 100px"
```

Here, it will use the initial keyframe as the initial value for all the new numbers. In the future it might be that the opposite is also supported. If this is something you'd like to see, please [open a feature request](https://github.com/motiondivision/motion).

## Solution

The solution here is to ensure each string contains the same number of numbers, colors and CSS variables. For example:

```
ð« "0px 100px 0px 100px" -> "0px"
â "0px 100px 0px 100px" -> "0px 0px 0px 0px"

ð« "blur(0px)" <-> "blur(10px) hue-rotate(20deg)"
â "blur(0px) hue-rotate(0deg)" <-> "blur(10px) hue-rotate(20deg)"
```
