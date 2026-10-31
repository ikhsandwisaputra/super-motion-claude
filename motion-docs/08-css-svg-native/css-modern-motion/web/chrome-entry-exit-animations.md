---
source: https://developer.chrome.com/blog/entry-exit-animations
title: "Four new CSS features for smooth entry and exit animations  |  Blog  |  Chrome for Developers"
fetched: 2026-10-28
---

* [Chrome for Developers](https://developer.chrome.com/)
* [Blog](https://developer.chrome.com/blog)

# Four new CSS features for smooth entry and exit animations Stay organized with collections Save and categorize content based on your preferences.

![Una Kravets](https://web.dev/images/authors/unakravets.jpg)

Una Kravets

![Joey Arhar](https://web.dev/images/authors/jarhar.jpg)

Joey Arhar

Motion is a core part of any digital experience, guiding your user from one interaction to the next. But there are a few gaps in smooth animations on the web platform. These include the ability to easily animate entry and exit animations, and smoothly animate to and from the top layer for dismissible elements such as dialogs and popovers.

To fill these gaps, Chrome 116 and 117 includes four new web platform features, which enable smooth animations and transitions for discrete properties.

These four new features include:

* The ability to animate `display` and `content-visibility` on a keyframe timeline (From Chrome 116).
* The `transition-behavior` property with the `allow-discrete` keyword to enable transitions of discrete properties like `display` (From Chrome 117).
* The `@starting-style` rule to animate entry effects from `display: none` and into the top-layer (From Chrome 117).
* The `overlay` property to control top-layer behavior during an animation (From Chrome 117).

## Display animations in keyframes

From Chrome 116, you can use `display` and `content-visibility` in keyframe rules. These will then swap at the time the keyframe occurs. No additional new values are required to support this:

```
.card {
  animation: fade-out 0.5s forwards;
}

@keyframes fade-out {
  100% {
    opacity: 0;
    display: none;
  }
}
```

[  ](/static/blog/entry-exit-animations/video/1.mp4)

The preceding example animates the opacity to 0 over the 0.5s duration and then set display to none. Additionally, the `forwards` keyword ensures that the animation remains at its end state, so that the element it is applied to remains `display: none` and `opacity: 0`.

This is a simple example that mimics what you can do with a transition (see demo in [transition section](https://developer.chrome.com/blog/entry-exit-animations#transitioning-discrete-animations)). Transitions, however, are unable to create more complex animations, such as the following example:

```
.card {
  animation: spin-and-delete 1s ease-in forwards;
}

@keyframes spin-and-delete {
  0% {
    transform: rotateY(0);
    filter: hue-rotate(0);
  }
  80% {
    transform: rotateY(360deg);
    filter: hue-rotate(180deg);
    opacity: 1;
  }
  100% {
    opacity: 0;
    display: none;
  }
}
```

The `spin-and-delete` animation is an exit animation. First, the card will spin on the y-axis, run through a hue-rotation, and then at `80%` through the timeline, transitions its opacity from 1 to 0. Finally, the card swaps from `display: block` to `display: none`.

For these exit animations, instead of applying them directly to an element, you can set up a trigger for the animations. For example by attaching an event listener to a button that triggers a class to apply the animation, like so:

```
.spin-out {
   animation: spin-and-delete 1s ease-in forwards;
}
```

```
document.querySelector('.delete-btn').addEventListener('click', () => {
 document.querySelector('.card').classList.add('spin-out');
})
```

[  ](/static/blog/entry-exit-animations/video/2.mp4)

The example above now has an end-state of `display:none`. There are many cases where you’ll want to take it further and remove the DOM node with a timeout to allow for the animation to finish first.

## Transitioning discrete properties

Properties that animate discretely don't trigger transitions events by default. To enable this, set the transition behavior mode to `allow-discrete`.

### The `transition-behavior` property

The `transition-behavior` property specifies whether transitions will be started or not for discrete properties. It accepts two values: `normal` and `allow-discrete`, with the initial value being `normal`.

* `normal`: Transitions will not be started for discrete properties, only for interpolable properties.
* `allow-discrete`: Transitions will be started for discrete properties as well as interpolable properties.

To enable `allow-discrete` mode for a specific property, include it in the `transition` shorthand:

```
.card {
  transition: opacity 0.25s, display 0.25s allow-discrete; /* Enable allow-discrete for the display property */
}

.card.fade-out {
  opacity: 0;
  display: none;
}
```

[  ](/static/blog/entry-exit-animations/video/3.mp4)

Note: This transition demo shows a different technique than the first animation demo but visually looks similar.

When transitioning multiple discrete properties, you must set `allow-discrete` for each transitioning property. For example:

```
.card {
  transition: opacity 0.5s, display 0.5s allow-discrete, overlay 0.5s allow-discrete;
}
```

Alternatively, to set the behavior for all transitioning properties, declare `transition-behavior: allow-discrete` after the `transition` declaration. This is often the easiest approach.

```
.card {
  transition: opacity 0.5s, display 0.5s, overlay 0.5s;
  transition-behavior: allow-discrete; /* Note: be sure to write this after the shorthand */
}
```

### The `@starting-style` rule for entry animations

So far, this article has covered exit animations, to create entry animations you need to use the `@starting-style` rule.

Use `@starting-style` to apply a style that the browser can look up before the element is open on the page. This is the “before-open” state (where you are animating in from).

```
/*  0. IS-OPEN STATE   */
/*  The state at which the element is open + transition logic */
.item {
  height: 3rem;
  display: grid;
  overflow: hidden;
  transition: opacity 0.5s, transform 0.5s, height 0.5s, display 0.5s allow-discrete;
}

/*  1. BEFORE-OPEN STATE   */
/*  Starting point for the transition */
@starting-style {
  .item {
    opacity: 0;
    height: 0;
  }
}

/*  2. EXITING STATE   */
/*  While it is deleting, before DOM removal in JS, apply this
    transformation for height, opacity, and a transform which
    skews the element and moves it to the left before setting
    it to display: none */
.is-deleting {
  opacity: 0;
  height: 0;
  display: none;
  transform: skewX(50deg) translateX(-25vw);
}
```

Now you have both an entry and exit state for these TODO list items:

[  ](/static/blog/entry-exit-animations/video/4.mp4)

## Animating elements to and from the top-layer

To animate elements to and from the top-layer, specify the `@starting-style` on the “open” state to tell the browser where to animate in from. For a dialog, the open state is defined with the `[open]` attribute. For a popover, use the `:popover-open` pseudo class.

A simple example of a dialog could look like this:

```
/*   0. IS-OPEN STATE   */
dialog[open] {
  translate: 0 0;
}

/*   1. BEFORE-OPEN STATE   */
@starting-style {
  dialog[open] {
    translate: 0 100vh;
  }
}

/*   2. EXIT STATE   */
dialog {
  transition: translate 0.7s ease-out, overlay 0.7s ease-out allow-discrete, display 0.7s ease-out allow-discrete;
  translate: 0 100vh;
}
```

[  ](/static/blog/entry-exit-animations/video/5.mp4)

In the next example, the entry and exit effects are different. Enter by animating up from the bottom of the viewport, exit the effect to the top of the viewport. It is also written with nested CSS for more visual encapsulation.

When animating a popover, use the `:popover-open` pseudo class instead of the `open` attribute used previously.

```
.settings-popover {
  &:popover-open {
    /*  0. IS-OPEN STATE  */
    /*  state when popover is open, BOTH:
        what we're transitioning *in* to
        and transitioning *out* from */
    transform: translateY(0);
    opacity: 1;

    /*  1. BEFORE-OPEN STATE  */
    /*  Initial state for what we're animating *in* from,
        in this case: goes from lower (y + 20px) to center  */
    @starting-style {
      transform: translateY(20px);
      opacity: 0;
    }
  }

  /*  2. EXIT STATE  */
  /*  Initial state for what we're animating *out* to ,
      in this case: goes from center to (y - 50px) higher */
  transform: translateY(-50px);
  opacity: 0;

  /*  Enumerate transitioning properties,
      including display and allow-discrete mode */
  transition: transform 0.5s, opacity 0.5s, display 0.5s allow-discrete;
}
```

[  ](/static/blog/entry-exit-animations/video/6.mp4)

### `overlay` property

Finally, to fade out a `popover` or `dialog` from the top layer, add the `overlay` property to your list of transitions. `popover` and `dialog` escape ancestor clips and transforms, and also put the content in the top layer. If you don't transition `overlay`, your element will immediately go back to being clipped, transformed, and covered up, and you won't see the transition happen.

```
[open] {
  transition: opacity 1s, display 1s allow-discrete;
}
```

[  ](/static/blog/entry-exit-animations/video/7.mp4)

Instead, include `overlay` in the transition or animation to animate `overlay` along with the rest of the features and ensure it stays in the top layer when animating. This will look much smoother.

```
[open] {
  transition: opacity 1s, display 1s allow-discrete, overlay 1s allow-discrete;
}
```

[  ](/static/blog/entry-exit-animations/video/8.mp4)

Additionally, when you have multiple elements open in the top-layer, overlay helps you control the smooth transition in and out of the top layer. You can see the difference in [this simple example](https://jsfiddle.net/jarhar/r6a5bvnt/). If you are not applying `overlay` to the second popover when transitioning it out, it will first move out of the top layer, jumping behind the other popover, before starting the transition. This isn’t a very smooth effect.

## A note on view transitions

If you are making DOM changes, such as adding and removing elements from the DOM, another great solution for smooth animations is [view transitions](https://developer.chrome.com/docs/web-platform/view-transitions). Here are two of the above examples built using view transitions.

In this first demo, instead of setting up `@starting-style` and other CSS transforms, view transitions will handle the transition. The view transition is set up like so:

First, in CSS, give each card an individual `view-transition-name`.

```
.card-1 {
  view-transition-name: card-1;
}

.card-2 {
  view-transition-name: card-2;
}

/* etc. */
```

Then, in JavaScript, wrap the DOM mutation (in this case, removing the card), in a view transition.

```
deleteBtn.addEventListener('click', () => {
  // Check for browser support
  if (document.startViewTransition) {
    document.startViewTransition(() => {
      // DOM mutation
      card.remove();
    });
  }
  // Alternative if no browser support
  else {
    card.remove();
  }
})
```

Now, the browser can handle the fade out and morph of each card to its new position.

[  ](/static/blog/entry-exit-animations/video/9.mp4)

Another example of where this can be handy is with the add/remove list items demo. In this case, you'll need to remember to add a unique `view-transition-name` for each card created.

[  ](/static/blog/entry-exit-animations/video/10.mp4)

## Conclusion

These new platform features bring us one step closer to smooth entry and exit animations on the web platform. To learn more, check out these links:

* [Introducing the popover API](https://developer.chrome.com/blog/introducing-popover-api)
* [css-transitions-2 spec](https://drafts.csswg.org/css-transitions-2/#defining-before-change-style-the-starting-style-rule)
* [css-position-4 spec](https://drafts.csswg.org/css-position-4/#overlay)
