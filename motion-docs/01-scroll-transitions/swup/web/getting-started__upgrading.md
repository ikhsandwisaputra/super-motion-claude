---
source: https://swup.js.org/getting-started/upgrading
title: "Upgrading — swup"
fetched: 2026-10-28
---

# Upgrading

Upgrade your project from swup 3 to 4.

If you're upgrading from swup 2, see [Upgrading from swup 2 to 3](https://swup.js.org/getting-started/upgrading-v3/).

## [New features](https://swup.js.org/getting-started/upgrading/#new-features)

Swup 4 introduces new features to become more customizable and enable advanced use cases. Some of the
highlights are a new hook system, a visit object available in hook handlers, and built-in scroll support.
See the [release announcement](https://swup.js.org/announcements/swup-4/) for a full list of everything that's new.

## [Breaking changes](https://swup.js.org/getting-started/upgrading/#breaking-changes)

There are breaking changes in this release that will require modifications to projects using
swup. If you only use swup for simple page transitions, you might not need to touch your code.
However, if you make use of events, custom transitions or overwrite methods on the swup instance,
you might want to take some more time to review these changes below and modify your site where
necessary.

## [Install the latest version](https://swup.js.org/getting-started/upgrading/#install-the-latest-version)

Install the latest version from npm:

```
npm install swup@latest
```

```
npm install swup@latest
```

If you're loading swup from a CDN, update the version constraint:

```
<script src="https://unpkg.com/swup@3"></script>
<script src="https://unpkg.com/swup@4"></script>
```

```
<script src="https://unpkg.com/swup@3"></script>
<script src="https://unpkg.com/swup@4"></script>
```

Repeat this process for any of the plugins you are using.

## [Scroll support](https://swup.js.org/getting-started/upgrading/#scroll-support)

Swup 4 will correctly reset the scroll position after each navigation, as well as scroll to `#anchor`
links on the same page. The Scroll Plugin is no longer required for recreating basic browser
behavior. If you need animated scrolling, custom offsets, and other customization, keep using the
[Scroll Plugin](https://swup.js.org/plugins/scroll-plugin/).

## [New hook system](https://swup.js.org/getting-started/upgrading/#new-hook-system)

Swup 4 comes with a new [hook system](https://swup.js.org/hooks/) that allows more flexibility and replaces the previous events
implementation. Among other features, handlers can now pause execution by returning a Promise, or
replace the internal default handler completely. See [Hooks](https://swup.js.org/hooks/) for details and more examples.

All hook-related functions now live on the `hooks` instance of swup:

```
swup.on('pageView', () => {})
swup.hooks.on('page:view', () => {})
```

```
swup.on('pageView', () => {})
swup.hooks.on('page:view', () => {})
```

```
swup.off('pageView', handler)
swup.hooks.off('page:view', handler)
```

```
swup.off('pageView', handler)
swup.hooks.off('page:view', handler)
```

### [Hook names](https://swup.js.org/getting-started/upgrading/#hook-names)

For easier grouping, hook names are consistently namespaced and in present tense:

* `pageView` → `page:view`
* `clickLink` → `link:click`
* `contentReplaced` → `content:replace`
* `serverError` → `fetch:error`
* etc.

To clarify the lifecycle, the transition hooks have been renamed to visit:

* `transitionStart` → `visit:start`
* `transitionEnd` → `visit:end`

Some hooks were removed entirely:

The old `willReplaceContent` and `contentReplaced` events are superseded by a single `content:replace`
hook. Since swup can now register handlers to run *before* a specific hook, it serves both use cases:

```
// Run right before the content is replaced
swup.on('willReplaceContent', () => {})
swup.hooks.before('content:replace', () => {})
```

```
// Run right before the content is replaced
swup.on('willReplaceContent', () => {})
swup.hooks.before('content:replace', () => {})
```

```
// Run directly after the content was replaced
swup.on('contentReplaced', () => {})
swup.hooks.on('content:replace', () => {})
```

```
// Run directly after the content was replaced
swup.on('contentReplaced', () => {})
swup.hooks.on('content:replace', () => {})
```

The `pageRetrievedFromCache` event has been removed. There is now only a single `page:load` hook
that fires whenever a page was loaded. Check its boolean `cache` parameter to know if the page was
loaded from cache or not.

```
swup.on('pageRetrievedFromCache', () => {});
swup.hooks.on('page:load', (_, { page, cache }) => { /* cache is true or false */ });
```

```
swup.on('pageRetrievedFromCache', () => {});
swup.hooks.on('page:load', (_, { page, cache }) => { /* cache is true or false */ });
```

## [Visit object](https://swup.js.org/getting-started/upgrading/#visit-object)

Along with a new hook system, Swup 4 introduces a [visit object](https://swup.js.org/visit/) that holds
information about the current page visit, like the previous and next URL or the element and event
that triggered the visit. See [Visit](https://swup.js.org/visit/) for details and more examples.

```
// Get the next URL and the link element that was clicked
swup.hooks.on('page:view', (visit) => {
  console.log('New page: ', visit.to.url);
  console.log('Triggered by: ', visit.trigger.el);
});

// Disable animations on the upcoming visit
swup.hooks.on('visit:start', (visit) => {
  visit.animation.animate = false;
});
```

```
// Get the next URL and the link element that was clicked
swup.hooks.on('page:view', (visit) => {
  console.log('New page: ', visit.to.url);
  console.log('Triggered by: ', visit.trigger.el);
});

// Disable animations on the upcoming visit
swup.hooks.on('visit:start', (visit) => {
  visit.animation.animate = false;
});
```

The `visit` object replaces the `transition` object of swup 3.

```
swup.on('transitionStart', () => {
  console.log('Visit to', swup.transition.to);
  console.log('Animation name', swup.transition.custom);
});
swup.hooks.on('visit:start', (visit) => {
  console.log('Visit to', visit.to.url);
  console.log('Animation name', visit.animation.name);
});
```

```
swup.on('transitionStart', () => {
  console.log('Visit to', swup.transition.to);
  console.log('Animation name', swup.transition.custom);
});
swup.hooks.on('visit:start', (visit) => {
  console.log('Visit to', visit.to.url);
  console.log('Animation name', visit.animation.name);
});
```

## [Cache API](https://swup.js.org/getting-started/upgrading/#cache-api)

The cache has been simplified. It no longer requires passing in the title,
containers, or body class of the page. Only the URL and HTML response are required. Please review
the [Cache](https://swup.js.org/api/cache/) docs if you access it directly in your code.

```
swup.cache.cacheUrl({
  url: '/about',
  title: 'About',
  blocks: ['<div id="swup"></div>'],
  originalContent: '<html>...</html>',
  pageClass: 'about',
  responseURL: '/team'
});
swup.cache.set('/about', { url: '/about', html: '<html>...</html>' });
```

```
swup.cache.cacheUrl({
  url: '/about',
  title: 'About',
  blocks: ['<div id="swup"></div>'],
  originalContent: '<html>...</html>',
  pageClass: 'about',
  responseURL: '/team'
});
swup.cache.set('/about', { url: '/about', html: '<html>...</html>' });
```

## [Navigation method](https://swup.js.org/getting-started/upgrading/#navigation-method)

The method `swup.loadPage({ url })` has been renamed to `swup.navigate(url)` for clarity.

```
swup.loadPage({ url: '/about' });
swup.navigate('/about');
```

```
swup.loadPage({ url: '/about' });
swup.navigate('/about');
```

## [Custom animation attribute](https://swup.js.org/getting-started/upgrading/#custom-animation-attribute)

To improve clarity around naming, the attribute for choosing a custom animation is now properly called
`data-swup-animation`.

```
<a href="/about/" data-swup-transition="slide">About</a>
<a href="/about/" data-swup-animation="slide">About</a>
```

```
<a href="/about/" data-swup-transition="slide">About</a>
<a href="/about/" data-swup-animation="slide">About</a>
```

## [Unique container selectors](https://swup.js.org/getting-started/upgrading/#unique-container-selectors)

Swup 4 will only match and replace a single element for each container selector. Previously, each
selector would match as many elements as found on the page. We recommend only using id attributes or
other unique identifiers for container selectors.

```
<div class="section">Navigation</div>
<div class="section">Content</div>
<div id="nav" class="section">Navigation</div>
<div id="content" class="section">Content</div>
```

```
<div class="section">Navigation</div>
<div class="section">Content</div>
<div id="nav" class="section">Navigation</div>
<div id="content" class="section">Content</div>
```

```
const swup = new Swup({
  containers: ['.section']
  containers: ['#nav', '#content']
})
```

```
const swup = new Swup({
  containers: ['.section']
  containers: ['#nav', '#content']
})
```

## [Container attributes](https://swup.js.org/getting-started/upgrading/#container-attributes)

Swup 4 will no longer add `[data-swup]` attributes to containers.

```
<div id="swup" class="transition-page" data-swup="0"></div>
<div id="swup" class="transition-page"></div>
```

```
<div id="swup" class="transition-page" data-swup="0"></div>
<div id="swup" class="transition-page"></div>
```

## [Custom payloads](https://swup.js.org/getting-started/upgrading/#custom-payloads)

Going forward, only complete HTML responses are allowed from the server. Previously, swup supported
sending custom payloads by using the Custom Payload Plugin or overloading the `getPageData` method
directly. This change was done to drastically simplify library complexity and allow more flexibility
for other more common use cases like dynamically setting content containers. If you require custom
payloads, we recommend sticking with swup 3.

```
const swup = new Swup({
  plugins: [new SwupCustomPayloadPlugin()]
  // no longer supported
});
```

```
const swup = new Swup({
  plugins: [new SwupCustomPayloadPlugin()]
  // no longer supported
});
```

```
swup.getPageData = (req) => JSON.parse(req.textContent);
// no longer supported
```

```
swup.getPageData = (req) => JSON.parse(req.textContent);
// no longer supported
```

## [Browser support](https://swup.js.org/getting-started/upgrading/#browser-support)

Swup 4 removes support for CSS vendor prefixes on animation and transition properties. In practical
terms, this won't reduce browser support, but it's probably a good idea to check the compatibility
tables for [transitions](https://caniuse.com/?search=transition) and
[animations](https://caniuse.com/?search=animation). In case you need to support Safari 8 or lower,
you might want to stick with swup 3.

```
.transition-page {
  -webkit-transition: opacity 200ms;
  transition: opacity 200ms;
}
```

```
.transition-page {
  -webkit-transition: opacity 200ms;
  transition: opacity 200ms;
}
```

## [Plugin authors](https://swup.js.org/getting-started/upgrading/#plugin-authors)

### [Hooks](https://swup.js.org/getting-started/upgrading/#hooks)

As mentioned above, switch from events to hooks:

```
this.swup.on('contentReplaced', () => {});
this.swup.hooks.on('content:replace', () => {});
```

```
this.swup.on('contentReplaced', () => {});
this.swup.hooks.on('content:replace', () => {});
```

Creating custom hooks has changed:

```
this.swup._handlers.formSubmit = [];
this.swup.hooks.create('form:submit');
```

```
this.swup._handlers.formSubmit = [];
this.swup.hooks.create('form:submit');
```

As has triggering a hook:

```
this.swup.triggerEvent('formSubmit');
this.swup.hooks.call('form:submit');
```

```
this.swup.triggerEvent('formSubmit');
this.swup.hooks.call('form:submit');
```

If you need wait for all handlers to finish before continuing, `await` the call:

```
this.swup.triggerEvent('formSubmit');
await this.swup.hooks.call('form:submit');
```

```
this.swup.triggerEvent('formSubmit');
await this.swup.hooks.call('form:submit');
```

If you need to replace swup's internal handler for a custom implementation, don't replace the
instance method. Instead, specify that your hook handler should replace the internal one.

```
this.swup.replaceContent = () => { /* custom implementation */ };
this.swup.hooks.replace('content:replace', () => { /* custom implementation */ });
```

```
this.swup.replaceContent = () => { /* custom implementation */ };
this.swup.hooks.replace('content:replace', () => { /* custom implementation */ });
```
