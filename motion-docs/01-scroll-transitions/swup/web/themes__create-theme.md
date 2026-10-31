---
source: https://swup.js.org/themes/create-theme
title: "Create a theme 🎉 — swup"
fetched: 2026-10-28
---

# Create a theme 🎉

Anyone can create and publish swup themes. To create a new theme, install the [swup CLI](https://swup.js.org/cli/)
and let it create one from a template. Or head over directly to the
[theme template repo](https://github.com/swup/theme-template) and follow the instructions there.

## [Tips](https://swup.js.org/themes/create-theme/#tips)

* Check out existing themes before creating one.
* If you think your new theme should be an official swup theme and live under the `@swup/*` npm namespace, get in touch at [gmarcuk@gmail.com](mailto:gmarcuk@gmail.com).

## [Developing themes](https://swup.js.org/themes/create-theme/#developing-themes)

### [Accessing swup](https://swup.js.org/themes/create-theme/#accessing-swup)

The swup instance is automatically assigned to the plugin instance and can be accessed as
`this.swup` in the `mount` and `unmount` methods.

### [Animation selector](https://swup.js.org/themes/create-theme/#animation-selector)

Swup themes automatically set the `animationSelector` option to `[class*="swup-transition-"]` to prevent bugs related to other libraries using the same classes. Use `swup-transition-*` for your theme classes.

### [Bundled styles](https://swup.js.org/themes/create-theme/#bundled-styles)

Use `.css` files to manage your styles. Import the styles directly into the JS bundle and
apply it with `this.applyStyles(css)`;

### [Customization](https://swup.js.org/themes/create-theme/#customization)

The recommended way to make themes configurable is by using CSS custom properties that can be
overridden by the users of the theme. Namespace them with the theme name to avoid collisions.

```
html {
  --swup-custom-theme-duration: .6s;
  --swup-custom-theme-color: red;
}
```

```
html {
  --swup-custom-theme-duration: .6s;
  --swup-custom-theme-color: red;
}
```

Another way of configuring themes is by passing in an options object into the constructor, as is
usual for plugins.

### [Helpers](https://swup.js.org/themes/create-theme/#helpers)

Themes have a few special helper methods:

* `applyStyles` to prepend a style tag with defined content in the head tag.
* `addClassName` to add the `swup-transition-[name]` classname to an element.
* `applyHTML` to append a `div` element with defined HTML content.

### [Cleaning up](https://swup.js.org/themes/create-theme/#cleaning-up)

Themes need to clean up after themselves in the `umount` method: cancel any event listeners, undo
any DOM changes, etc.

### [Logging](https://swup.js.org/themes/create-theme/#logging)

Use swup's `log` method to output any relevant information. By default this method doesn't do
anything. It will starting outputting information only if installed alongside the
[debug plugin](https://swup.js.org/plugins/debug-plugin/).
