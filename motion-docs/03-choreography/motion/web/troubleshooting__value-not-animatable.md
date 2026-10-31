---
source: https://motion.dev/troubleshooting/value-not-animatable
title: "Value not animatable (Warning) | Motion Troubleshooting"
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

# Value not animatable

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
You are trying to animate ${name} from "${originKeyframe}" to "${targetKeyframe}". "${invalidKeyframe}" is not an animatable value.
```

You're trying to animate a value between one or more keyframes and you're receiving this message. That means one of the keyframes is not animatable.

```
animate(
  element,
  { transform: ["translateX()", "translateX(100px)"] }
)
```

## Explanation

For a value to be animatable, it must contain at least one number or color. Exceptions are given to values like `"none"` and `"transparent"`.

If neither keyframe is animatable, Motion performs an instant transition without throwing an error. For instance, "animating" between `display: "none"` and `display: "flex"` is expected.

If one of the keyframes is animatable, and the other isn't, it shows this warning to ensure the user is aware as this instant animation is probably unexpected.

## Solution

If this instant animation is expected, then ignore the warning. It will not show in production.

If it is not expected, then the solution depends on the source of the invalid value.

### Named color

Named colors like `"red"` are not supported, as every named color is extra weight added to the bundlesize.

Convert colors like `"red"` to their RGBA/Hex/HSLA equivalent.

### Invalid origin value

If the origin value is not animatable, then the most likely reason is Motion has had to read this value from the DOM using `window.getComputedStyle()` and received a value that the user was not intending, as the computed value can be different in format to the way it was originally defined in CSS.

The solution depends on the way we're animating this value.

#### `<motion.div />`

With the `<motion />` [component](https://motion.dev/docs/react-motion-component), initial values can be set using the `initial` or `style` props. Then Motion can read this value directly as defined, without using `window.getComputedStyle()`. This is also better for performance.

```
<motion.div
  animate={{ transform: "translateX(100px)" }}
  style={{ transform: "none" }}
/>
```

#### `animate()`

With the `animate()` [function](https://motion.dev/docs/animate), there's not currently a helper function for setting an initial keyframe but it is possible to define multiple keyframes using an array.

For the first animation you can explicitly set the initial keyframe:

```
animate(element, { transform: ["none", "translateX(100px)"] })
```
