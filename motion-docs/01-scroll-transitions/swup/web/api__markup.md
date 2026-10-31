---
source: https://swup.js.org/api/markup
title: "Markup — swup"
fetched: 2026-10-28
---

# Markup

Control swup's behavior using specific DOM attributes on links and other elements.

## [Ignore links](https://swup.js.org/api/markup/#ignore-links)

Swup can be disabled on a per-link basis by annotating a link with `data-no-swup`.

```
<a href="/" data-no-swup>Ignored</a>
```

```
<a href="/" data-no-swup>Ignored</a>
```

Add the attribute to a common container to ignore all links within.

```
<section data-no-swup>
  <a href="/">Ignored</a>
  <a href="/">Ignored</a>
</section>
```

```
<section data-no-swup>
  <a href="/">Ignored</a>
  <a href="/">Ignored</a>
</section>
```

## [Set a custom animation](https://swup.js.org/api/markup/#set-a-custom-animation)

Set a custom animation for a specific link by adding a `data-swup-animation` attribute.

```
<a href="/" data-swup-animation="slide">
```

```
<a href="/" data-swup-animation="slide">
```

This will add a `.to-{animation}` class on the HTML element during the visit you can
use to specify custom transition styles:

```
<html class="is-changing is-animating to-slide">
```

```
<html class="is-changing is-animating to-slide">
```

```
html.is-changing .transition-page {
  /* normal transition styles */
}
html.is-changing.to-slide .transition-page {
  /* slide transition styles */
}
```

```
html.is-changing .transition-page {
  /* normal transition styles */
}
html.is-changing.to-slide .transition-page {
  /* slide transition styles */
}
```

Add the attribute to a common container to set an animation for all links within. Animations defined
on a link take precedence over animations defined on a parent.

```
<section data-swup-animation="slide">
  <a href="/">Slide</a>
  <a href="/">Slide</a>
  <a href="/" data-swup-animation="fade">Fade</a>
</section>
```

```
<section data-swup-animation="slide">
  <a href="/">Slide</a>
  <a href="/">Slide</a>
  <a href="/" data-swup-animation="fade">Fade</a>
</section>
```

## [Persist element state](https://swup.js.org/api/markup/#persist-element-state)

Some elements need to keep their state between page loads, e.g. autoplaying videos, animations or
countdowns. Swup will transfer an element to the next page — preserving its content, data and
event listeners — if it has a `data-swup-persist` attribute and a matching element is found on the
next page. Elements are matched using the unique value of the persist attribute.

```
<video src="/video.mp4" autoplay data-swup-persist="unique-key">
```

```
<video src="/video.mp4" autoplay data-swup-persist="unique-key">
```

While this can also be achieved by having persistent elements outside of any
[containers](https://swup.js.org/options/#containers) replaced by swup, this attribute is meant for
elements inside replaced containers that cannot be moved outside.

## [Replace history entry](https://swup.js.org/api/markup/#replace-history-entry)

Swup will replace the current history entry (instead of creating a new one) by
adding a `data-swup-history` attribute with the value `replace` to a link:

```
<a href="/" data-swup-history="replace">
```

```
<a href="/" data-swup-history="replace">
```

Add the attribute to a common container to set history mode for all links within. Settings defined
on a link take precedence over settings defined on a parent.

```
<section data-swup-history="replace">
  <a href="/">Replace</a>
  <a href="/">Replace</a>
  <a href="/" data-swup-history="push">Push</a>
</section>
```

```
<section data-swup-history="replace">
  <a href="/">Replace</a>
  <a href="/">Replace</a>
  <a href="/" data-swup-history="push">Push</a>
</section>
```
