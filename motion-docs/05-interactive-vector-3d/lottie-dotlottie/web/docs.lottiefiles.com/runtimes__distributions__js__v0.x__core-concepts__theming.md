---
source: https://docs.lottiefiles.com/en/runtimes/distributions/js/v0.x/core-concepts/theming.md
title: ""
fetched: 2026-10-28
---

# Apply themes at runtime
Load and switch themes packaged in .lottie files, apply custom theme data, and sync animation colors with the user's system theme.

Themes let you restyle an animation at runtime — colors, styles, whole light/dark variants — without modifying the animation file. Themes are packaged inside the `.lottie` file and applied by ID, or supplied as raw theme data.

## Apply a theme

[CodePen↗](https://codepen.io/lottiefiles/embed/BaEzEeq?default-tab=)

Set the initial theme when constructing the player:

```javascript
const dotLottie = new DotLottie({
  canvas: document.querySelector("#canvas"),
  src: "themed-animation.lottie",
  themeId: "dark-mode",
  autoplay: true,
});
```

Or switch themes after initialization:

```javascript
// Load theme by ID
dotLottie.setTheme("light-mode");

// Load theme from data
dotLottie.setThemeData(themeData);

// Reset to default theme
dotLottie.resetTheme();
```

To check which theme is active, read `activeThemeId`:

```javascript
// Get current theme ID
console.log(dotLottie.activeThemeId);
```

## Build a theme switcher

Apply themes after the animation has loaded, and handle the case where a theme fails to apply — `setTheme` returns `false` on failure, so you can fall back to a default:

```javascript
const dotLottie = new DotLottie({
  canvas: document.querySelector("#canvas"),
  src: "themed.lottie",
  autoplay: true,
});

// Create theme switcher
dotLottie.addEventListener("load", () => {
  const themes = ["light", "dark", "custom"];

  themes.forEach((themeId) => {
    const button = document.createElement("button");
    button.textContent = themeId;
    button.onclick = () => dotLottie.setTheme(themeId);
    document.body.appendChild(button);
  });
});
```

## Sync with the system theme

Follow the user's `prefers-color-scheme` setting and switch whenever it changes:

```javascript
const dotLottie = new DotLottie({
  canvas: document.querySelector("#canvas"),
  src: "themed.lottie",
  autoplay: true,
});

// Sync with system theme
const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

function updateTheme(e) {
  dotLottie.setTheme(e.matches ? "dark" : "light");
}

mediaQuery.addListener(updateTheme);
updateTheme(mediaQuery);
```

## Apply custom theme data

If the theme isn't packaged in the file, pass theme data directly as a string:

```javascript
const dotLottie = new DotLottie({
  canvas: document.querySelector("#canvas"),
  src: "themed.lottie",
  autoplay: true,
});

// Apply custom theme data
const customTheme = {
  // Theme data structure
  colors: {
    primary: "#FF0000",
    secondary: "#00FF00",
  },
  // ... other theme properties
};

dotLottie.setThemeData(JSON.stringify(customTheme));
```

Keep theme data small and minimize how often you switch — every switch restyles the animation. If you only need to change individual properties rather than whole themes, use [slots](/en/runtimes/distributions/js/v0.x/core-concepts/slots) instead.

## Create themes

To author themes for your dotLottie animations, visit [dotlottie.io↗](https://dotlottie.io) or use the [Lottie Creator↗](https://lottiefiles.com/lottie-creator) tool.

## Related

- [Override properties with slots](/en/runtimes/distributions/js/v0.x/core-concepts/slots) for per-property runtime overrides
- [How the web player works](/en/runtimes/distributions/js/v0.x/core-concepts) — how themes and slots relate
- [API Reference](/en/runtimes/distributions/js/v0.x/api/reference#animation-loading--themes) for the theme methods
