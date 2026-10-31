---
source: https://swup.js.org/plugins/progress-plugin
title: "Progress Bar Plugin — swup"
fetched: 2026-10-28
---

[v3.2.0](https://github.com/swup/progress-plugin)

# Progress Bar Plugin

A [swup](https://swup.js.org) plugin for displaying a progress bar.

Shows a loading indicator for requests taking longer than ~300ms.

## [Installation](https://swup.js.org/plugins/progress-plugin/#installation)

Install the plugin from npm and import it into your bundle.

```
npm install @swup/progress-plugin
```

```
npm install @swup/progress-plugin
```

```
import SwupProgressPlugin from '@swup/progress-plugin';
```

```
import SwupProgressPlugin from '@swup/progress-plugin';
```

Or include the minified production file from a CDN:

```
<script src="https://unpkg.com/@swup/progress-plugin@3"></script>
```

```
<script src="https://unpkg.com/@swup/progress-plugin@3"></script>
```

## [Usage](https://swup.js.org/plugins/progress-plugin/#usage)

To run this plugin, include an instance in the swup options.

```
const swup = new Swup({
  plugins: [new SwupProgressPlugin()]
});
```

```
const swup = new Swup({
  plugins: [new SwupProgressPlugin()]
});
```

## [Styling](https://swup.js.org/plugins/progress-plugin/#styling)

The progress bar has a class name of `swup-progress-bar` you can use for styling.

```
.swup-progress-bar {
  height: 4px;
  background-color: blue;
}
```

```
.swup-progress-bar {
  height: 4px;
  background-color: blue;
}
```

## [Options](https://swup.js.org/plugins/progress-plugin/#options)

```
{
  className: 'swup-progress-bar',
  transition: 300,
  delay: 300,
  initialValue: 0.25,
  finishAnimation: true
}
```

```
{
  className: 'swup-progress-bar',
  transition: 300,
  delay: 300,
  initialValue: 0.25,
  finishAnimation: true
}
```

### [className](https://swup.js.org/plugins/progress-plugin/#classname)

Class name to use for the container div.

### [transition](https://swup.js.org/plugins/progress-plugin/#transition)

Length of the CSS transition between loading states, in milliseconds.

### [delay](https://swup.js.org/plugins/progress-plugin/#delay)

How long to wait before showing the progress bar, in milliseconds.

Set to `0` to always display the progress bar, even on fast requests.

### [initialValue](https://swup.js.org/plugins/progress-plugin/#initialvalue)

To create a slightly more "realistic" appearance, the progress bar will start
out at a random position beteen 0 and the value of this option. Set to `0` to
always start from the left.

### [finishAnimation](https://swup.js.org/plugins/progress-plugin/#finishanimation)

Whether the progress bar will complete the transition to 100% before hiding.
