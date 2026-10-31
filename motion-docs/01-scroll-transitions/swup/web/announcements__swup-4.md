---
source: https://swup.js.org/announcements/swup-4
title: "Announcing swup 4 — swup"
fetched: 2026-10-28
---

# Announcing swup 4

The swup team is excited to announce swup 4 🎉

## [What is swup?](https://swup.js.org/announcements/swup-4/#what-is-swup)

[Swup](https://swup.js.org/) is a versatile and extensible **page transition library** for server-rendered websites.
It manages the complete page load lifecycle and smoothly animates between the current and next
page. In addition, it offers many other quality-of-life improvements like **caching**, **smart preloading**,
native **browser history** and enhanced **accessibility**.

Make your site feel like a snappy single-page app — without any of the complexity.

## [What’s new in this release](https://swup.js.org/announcements/swup-4/#what-s-new-in-this-release)

* [Official Astro integration](https://swup.js.org/announcements/swup-4/#astro-integration)
* [Native View Transition support](https://swup.js.org/announcements/swup-4/#view-transitions)
* [Built-in scroll support](https://swup.js.org/announcements/swup-4/#scroll-support)
* [Local animation scope](https://swup.js.org/announcements/swup-4/#local-animation-scope)
* [Hook system for easier customization](https://swup.js.org/announcements/swup-4/#hook-system)
* [Visit info in all callbacks](https://swup.js.org/announcements/swup-4/#visit-object)
* [Cache pruning strategies](https://swup.js.org/announcements/swup-4/#cache-pruning)
* [Fragment Plugin for dynamic container replacement](https://swup.js.org/announcements/swup-4/#fragment-plugin)
* [Parallel Plugin for combined in/out animation](https://swup.js.org/announcements/swup-4/#parallel-plugin)
* [Easier customization of official themes](https://swup.js.org/announcements/swup-4/#themes)

## [Upgrading](https://swup.js.org/announcements/swup-4/#upgrading)

Some of these new features are breaking changes and will require modifications to your project.
Please review this [migration guide](https://swup.js.org/getting-started/upgrading) for details.

## [Official Astro integration](https://swup.js.org/announcements/swup-4/#astro-integration)

[Astro](https://astro.build/) and swup are a great fit for multi-page apps. Where Astro manages the
rendering of your site, swup takes over on the client side to provide animated page transitions,
caching and smart preloading to make everything feel smooth and snappy. This has of course always
been available for you to set up manually.

Now there is an [official Astro integration for swup](https://github.com/swup/astro) for getting
started quickly. It comes with fade animations, sane default options, and the most handy plugins
for performance and accessibility out-of-the-box. Astro's bundling and module loading ensures we're
not hurting performance by only loading swup once the page has finished rendering.

## [Features](https://swup.js.org/announcements/swup-4/#features)

### [Native View Transition support](https://swup.js.org/announcements/swup-4/#view-transitions)

The new [View Transitions](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API)
browser API provides a native and performant mechanism for managing the visual transition of
elements from one state to another. This is great for page transition animations.

Use swup's new `native` option to start defining your page transitions as native View Transitions.
In addition, swup still supports CSS animations and JS animations. Learn more about
[supported animation methods](https://swup.js.org/getting-started/animations/).

```
const swup = new Swup({ native: true });
```

```
const swup = new Swup({ native: true });
```

```
html.is-changing .transition-fade {
  view-transition-name: main;
}

::view-transition-old(main) {
  animation: fade 0.5s ease-in-out both;
}

::view-transition-new(main) {
  animation: fade 0.5s ease-in-out both reverse;
}

@keyframes fade {
  from { opacity: 1; }
  to { opacity: 0; }
}
```

```
html.is-changing .transition-fade {
  view-transition-name: main;
}

::view-transition-old(main) {
  animation: fade 0.5s ease-in-out both;
}

::view-transition-new(main) {
  animation: fade 0.5s ease-in-out both reverse;
}

@keyframes fade {
  from { opacity: 1; }
  to { opacity: 0; }
}
```

### [Built-in scroll support](https://swup.js.org/announcements/swup-4/#scroll-support)

Swup 4 will correctly reset the scroll position after each navigation, as well as scroll to `#anchor`
links on the same page. The scroll plugin is no longer required for recreating basic browser
behavior. If you need animated scrolling, custom scroll offsets, and other advanced customization,
feel free to keep using the [Scroll Plugin](https://swup.js.org/plugins/scroll-plugin/).

### [Local animation scope](https://swup.js.org/announcements/swup-4/#local-animation-scope)

Swup 4 allows customizing which elements the [animation classes](https://swup.js.org/getting-started/how-it-works/#animation-classes)
are added to. The default and recommended way is still adding them globally on the `html` tag.
However, there is a new [animationScope](https://swup.js.org/options/#animation-scope) option to add the classes on
the content containers themselves instead.

```
const swup = new Swup({ animationScope: 'containers' });
```

```
const swup = new Swup({ animationScope: 'containers' });
```

```
<main id="swup" class="is-animating is-leaving">Content</main>
```

```
<main id="swup" class="is-animating is-leaving">Content</main>
```

### [Hook system for easier customization](https://swup.js.org/announcements/swup-4/#hook-system)

Swup 4 comes with a new hook system that allows more customization and replaces the previous events
implementation. Hook handlers can pause transitions by returning a Promise and they receive a
visit object to customize transitions. See [Hooks](https://swup.js.org/hooks/) for details and examples.

Pausing execution is as easy as returning a `Promise` or `await`ing a custom function:

```
swup.hooks.on('visit:start', async () => {
  // Delay the start of the page transition until a Promise resolves
  await myCustomFunction();
});
```

```
swup.hooks.on('visit:start', async () => {
  // Delay the start of the page transition until a Promise resolves
  await myCustomFunction();
});
```

Hooks can be run once:

```
swup.hooks.once('page:view', () => {
  // Execute on next page view, then remove the handler
});
```

```
swup.hooks.once('page:view', () => {
  // Execute on next page view, then remove the handler
});
```

Or before the internal handler:

```
swup.hooks.before('content:replace', () => {
  // Execute before swup replaces the content
});
```

```
swup.hooks.before('content:replace', () => {
  // Execute before swup replaces the content
});
```

### [Visit object](https://swup.js.org/announcements/swup-4/#visit-object)

Along with a new hook system, Swup 4 introduces a visit object that holds information
about the current page visit, such as the previous and next URL, the containers to replace, the
element and event that triggered the visit, etc. It's available to all hook handlers as their
first argument. By manipulating the visit object, you can control how swup will transition to
the new page. See [Visit](https://swup.js.org/visit/) for details and examples.

Access the current and next url from a hook:

```
swup.hooks.on('visit:start', (visit) => {
  console.log('Going from', visit.to.url, 'to', visit.from.url);
});
```

```
swup.hooks.on('visit:start', (visit) => {
  console.log('Going from', visit.to.url, 'to', visit.from.url);
});
```

Access the link element and click event that triggered the current visit:

```
swup.hooks.on('visit:start', (visit) => {
  console.log('Link', visit.trigger.el, 'clicked in event', visit.trigger.event);
});
```

```
swup.hooks.on('visit:start', (visit) => {
  console.log('Link', visit.trigger.el, 'clicked in event', visit.trigger.event);
});
```

Disable animations on the current visit:

```
swup.hooks.on('visit:start', (visit) => {
  visit.animation.animate = false;
});
```

```
swup.hooks.on('visit:start', (visit) => {
  visit.animation.animate = false;
});
```

Change which containers will be replaced on the current visit:

```
swup.hooks.on('visit:start', (visit) => {
  visit.containers = ['#sidebar'];
});
```

```
swup.hooks.on('visit:start', (visit) => {
  visit.containers = ['#sidebar'];
});
```

Check if the current visit was triggered by the backward/forward button of the browser.

```
swup.hooks.on('visit:start', (visit) => {
  if (visit.history.popstate) {
    console.log('History visit');
  }
});
```

```
swup.hooks.on('visit:start', (visit) => {
  if (visit.history.popstate) {
    console.log('History visit');
  }
});
```

### [Cache pruning strategies](https://swup.js.org/announcements/swup-4/#cache-pruning)

Swup's built-in cache is simple enough to not require regular cache pruning. For projects that do
have special requirements, we now offer hooks and methods for implementing custom cache pruning
strategies. See [cache pruning](https://swup.js.org/api/cache/#cache-pruning) for details and examples.

## [Plugins](https://swup.js.org/announcements/swup-4/#plugins)

All official [plugins](https://swup.js.org/plugins/) have been updated for compatibility with swup 4. Notable new
features include:

* The [Forms Plugin](https://swup.js.org/plugins/forms-plugin/) now supports [submitting forms inline](https://swup.js.org/plugins/forms-plugin/#inline-forms) without full page navigations
* The [JS Plugin](https://swup.js.org/plugins/js-plugin/) now has [first-class Promise support](https://swup.js.org/plugins/js-plugin/#promises-and-async-await) for easier timing

Additionally, we're happy to present two advanced new plugins that were made possible by some of the
architectural changes to swup introduced in the new version.

### [Fragment Plugin](https://swup.js.org/announcements/swup-4/#fragment-plugin)

The new [Fragment Plugin](https://swup.js.org/plugins/fragment-plugin/) allows selectively updating dynamic fragments
instead of the main content containers, based on custom rules. Animating only the parts of the page
that have actually changed is a great way of communicating context and improving orientation.
Imagine the two scenarios below:

* a filter UI that live-updates a list of results on every interaction
* a detail overlay that pushes on top of the currently open content

Both of these require updating only a small page fragment instead of doing a full page transition.
Head over to the [plugin readme](https://swup.js.org/plugins/fragment-plugin/) to learn more about enabling fragment
visits in these scenarios.

[](https://github.com/swup/fragment-plugin/assets/869813/ecaf15d7-ec72-43e8-898a-64f61330c6f5)

### [Parallel Plugin](https://swup.js.org/announcements/swup-4/#parallel-plugin)

The new [Parallel Plugin](https://swup.js.org/plugins/parallel-plugin/) enables a feature requested by many users:
running out and in animation at the same time, i.e. in parallel. To do this, the plugin will
keep the previous container around for the duration of the transition. Complex layouts like overlays,
stacks and side-by-side slideshows are now much easier to implement. Head over to the
[plugin readme](https://swup.js.org/plugins/parallel-plugin/) for more information and example code.

[](https://github.com/swup/parallel-plugin/assets/22225348/aff0a235-d9aa-472b-9967-1e9fa0e67313)

## [Easier customization of official themes](https://swup.js.org/announcements/swup-4/#themes)

All official [themes](https://swup.js.org/themes/) have been updated to use CSS custom properties. That should make it
much easier to customize their built-in animations to fit your website. For example, for overwriting
the transition duration and the offset of the [Slide Theme](https://swup.js.org/themes/slide-theme/):

```
body {
  --swup-slide-theme-translate: 20px;
  --swup-slide-theme-duration-slide: 0.2s;
}
```

```
body {
  --swup-slide-theme-translate: 20px;
  --swup-slide-theme-duration-slide: 0.2s;
}
```
