---
source: https://docs.lottiefiles.com/en/runtimes/distributions/js/v0.x/core-concepts/layout-styling.md
title: ""
fetched: 2026-10-28
---

# Control layout and styling
Configure how dotLottie animations fit and align within the canvas, set background colors, and handle resizing and high-DPI displays.

Use the `layout` configuration to control how an animation scales and aligns inside its canvas, and `renderConfig` to manage resolution and resizing. This guide covers the common tasks; see the [layout reference](/en/runtimes/distributions/js/v0.x/api/reference#layout-configuration) for defaults and accepted values.

## Set the layout

[CodePen↗](https://codepen.io/lottiefiles/embed/LYvZveR?default-tab=result)

The layout object controls how the animation fits and aligns within the canvas:

```javascript
const dotLottie = new DotLottie({
  canvas: document.querySelector("#canvas"),
  src: "animation.lottie",
  layout: {
    fit: "contain",
    align: [0.5, 0.5],
  },
});
```

### Choose a fit mode

Pick the fit mode that matches how the animation should scale:

| Mode         | Description                                    |
| ------------ | ---------------------------------------------- |
| `contain`    | Scale to fit while maintaining aspect ratio    |
| `cover`      | Scale to cover while maintaining aspect ratio  |
| `fill`       | Scale to fill canvas, may distort aspect ratio |
| `fit-width`  | Scale to fit width, maintain aspect ratio      |
| `fit-height` | Scale to fit height, maintain aspect ratio     |
| `none`       | No scaling applied                             |

To change the fit mode later, use `setLayout()`. Spread the existing layout first so you don't drop other properties:

```javascript
// Update fit mode
dotLottie.setLayout({
  ...dotLottie.layout,
  fit: "cover",
});
```

### Align the animation

The `align` property takes an array of two numbers `[x, y]` representing the alignment point:

- `[0, 0]` = top-left
- `[0.5, 0.5]` = center (default)
- `[1, 1]` = bottom-right

```javascript
// Center horizontally, align to bottom
dotLottie.setLayout({
  ...dotLottie.layout,
  align: [0.5, 1],
});
```

## Set a background color

Set the canvas background at construction or dynamically. The value accepts a 6-digit hex color (`"#FF0000"`) or an 8-digit hex color with alpha (`"#FF0000FF"`):

```javascript
// Using constructor
const dotLottie = new DotLottie({
  canvas: document.querySelector("#canvas"),
  src: "animation.lottie",
  backgroundColor: "#000000",
});

// Or dynamically
dotLottie.setBackgroundColor("#000000");
```

## Handle canvas resizing

Set explicit dimensions on the canvas element and use CSS for responsive scaling. When the canvas dimensions change, either call `resize()` yourself or enable `autoResize`:

```javascript
// Manual resize
dotLottie.resize();

// Automatic resize with render config
const dotLottie = new DotLottie({
  canvas: document.querySelector("#canvas"),
  src: "animation.lottie",
  renderConfig: {
    autoResize: true,
  },
});
```

## Render sharply on high-DPI displays

Control the rendering resolution with `devicePixelRatio`:

```javascript
const dotLottie = new DotLottie({
  canvas: document.querySelector("#canvas"),
  src: "animation.lottie",
  renderConfig: {
    devicePixelRatio: window.devicePixelRatio,
  },
});
```

Higher pixel ratios cost more rendering work — see [Optimize performance](/en/runtimes/distributions/js/v0.x/advanced/performance) if you need to balance sharpness against speed.

## Make an animation responsive

Combine a fluid container, a percentage-width canvas, and `autoResize`:

```html
<div style="width: 100%; max-width: 600px;">
  <canvas id="canvas" style="width: 100%; height: auto;"></canvas>
</div>

<script>
  const dotLottie = new DotLottie({
    canvas: document.querySelector("#canvas"),
    src: "animation.lottie",
    renderConfig: {
      autoResize: true,
    },
  });

  // Optional: Handle manual resize if needed
  window.addEventListener("resize", () => {
    dotLottie.resize();
  });
</script>
```

## Related

- [Optimize performance](/en/runtimes/distributions/js/v0.x/advanced/performance) — device pixel ratio, offscreen freezing, and quality settings
- [How the web player works](/en/runtimes/distributions/js/v0.x/core-concepts) — the canvas rendering model
- [API Reference](/en/runtimes/distributions/js/v0.x/api/reference#render-configuration) for all render configuration options
