---
source: https://web.dev/blog/at-property-baseline
title: "@property: Next-gen CSS variables now with universal browser support  |  Blog  |  web.dev"
fetched: 2026-10-28
---

* [Home](https://web.dev/)
* [Blog](https://web.dev/blog)

# @property: Next-gen CSS variables now with universal browser support Stay organized with collections Save and categorize content based on your preferences.

![Una Kravets](https://web.dev/images/authors/unakravets.jpg)

Una Kravets

Published: July 12, 2024

Get ready for a CSS power-up! The `@property` rule, part of the CSS Houdini umbrella of APIs, is now fully supported across all modern browsers. This game-changing feature unlocks new levels of control and flexibility for CSS custom properties (also known as CSS variables), making your stylesheets smarter and more dynamic.

## The benefits of `@property`

* **Semantic meaning:** Use `@property` to define a type (syntax) for your custom properties. This tells the browser what kind of data your custom property holds (for example, colors, lengths, or numbers), preventing unexpected results and supporting new possibilities like animating gradients.
* **Fallback values:** No more disappearing styles! Use `@property`to set an initial value for a custom property. If an invalid value is assigned later, the browser gracefully uses your defined fallback.
* **Improved error handling:** Enhanced type safety and the ability to set fallbacks open up new opportunities for testing and validation directly within your CSS.

## Create advanced custom properties

To create a "standard" custom property, set a property name prepended by a `--` and give this property a value. The value of these custom properties is parsed as a string by the browser.

The following example shows how a default (string-based) custom property is initialized.

```
:root {
 --myColor: hotpink;
}
```

To gain the benefits of these "advanced custom properties", including semantics beyond a string, register your CSS custom property with `@property`.

In this example the same custom property is initialized with `@property`.

```
@property --myColor {
    syntax: '<color>';
    inherits: false;
    initial-value: hotpink;
  }
```

The custom property initialized with `@property` provides much more detail than just a name and value. It includes the syntax type and sets inheritance to true or false.

The benefit of this approach is that with the standard property, you expect that property to contain a color as a value, and are going to use that color elsewhere in the stylesheet. If someone were to update that property to have a number as a value, any use of the property elsewhere would fail. Using `@property` there is a fallback color defined, along with a `syntax` that declares this property must hold a color value. Should a non-color value be used, the fallback would be used instead.

## Demo: Twinkling gradient background

One of the neat applications of `@property` is the smooth animation of properties that were previously impossible to transition, like gradients, which are perceived as images by the browser. However, if you give variables syntactic meaning via `@property`, these can be used in a gradient statement. Now you are describing an animation between two declared values within the gradient, enabling animation. Take the following example: a card with a subtle background animation that consists of two radial gradients which shift color on different timelines:

Using `@property` to style animate colors in a background gradient.

This can be achieved by setting up your custom property values as colors:

```
@property --card-bg {
  syntax: "<color>";
  inherits: false;
  initial-value: lavender;
}

@property --shine-1 {
  syntax: "<color>";
  inherits: false;
  initial-value: wheat;
}

@property --shine-2 {
  syntax: "<color>";
  inherits: false;
  initial-value: lightpink;
}
```

Then, you access them to create the initial gradient background:

```
.card {
background: radial-gradient(
      300px circle at 55% 60% in oklab,
      var(--shine-2), transparent 100% 100%),
      radial-gradient(farthest-side circle at 75% 30% in oklab,
      var(--shine-1) 0%, var(--card-bg) 100%);
}
```

Additionally, you then update the values in keyframes:

```
@keyframes animate-color-1 {
  to {
    --shine-1: orange;
  }
}

@keyframes animate-color-2 {
  to {
    --shine-2: hotpink;
  }
}
```

And animate each:

```
animation: animate-color-1 8s infinite linear alternate, animate-color-2 1s infinite linear alternate;
```

## Conclusion

CSS registered custom properties are a very powerful feature that extends the CSS language by providing meaning and context to CSS variables. Now, with `@property` landing in baseline, this CSS superpower is growing in strength.

### Additional Reading

* [MDN Web Docs](https://developer.mozilla.org/docs/Web/CSS/CSS_Houdini)
* [@property: giving superpowers to CSS variables](https://web.dev/articles/at-property)
