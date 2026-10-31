---
source: https://swup.js.org/hooks
title: "Hooks — swup"
fetched: 2026-10-28
---

# Hooks

Lifecycle hooks allow triggering custom code at each step of the page transition process. Read on to
learn about [registering handlers](https://swup.js.org/hooks/#registering-handlers) or jump straight to the
[list of available hooks](https://swup.js.org/hooks/#list).

## [Registering handlers](https://swup.js.org/hooks/#registering-handlers)

You can register handlers on swup's `hooks` registry. All handlers receive the [visit object](https://swup.js.org/visit/)
with information about the current visit as their first argument.

```
swup.hooks.on('page:view', (visit) => {
  console.log('New page loaded:', visit.to.url);
});
```

```
swup.hooks.on('page:view', (visit) => {
  console.log('New page loaded:', visit.to.url);
});
```

### [Handler options](https://swup.js.org/hooks/#handler-options)

Pass in an options object to customize how a handler is invoked.

#### [once](https://swup.js.org/hooks/#once)

Execute the handler once, then remove it.

```
swup.hooks.on('page:view', () => {}, { once: true });
```

```
swup.hooks.on('page:view', () => {}, { once: true });
```

#### [before](https://swup.js.org/hooks/#before)

Execute the handler before the internal default handler.

```
swup.hooks.on('content:replace', () => {}, { before: true });
```

```
swup.hooks.on('content:replace', () => {}, { before: true });
```

#### [priority](https://swup.js.org/hooks/#priority)

Influence the order in which this handler is run in relation to other handlers for the same hook,
regardless of order of registration. The default priority is `0` — negative values make the handler
execute earlier, positive values make it execute later.

```
// Execute before other handlers
swup.hooks.on('visit:start', () => {}, { priority: -100 });

// Execute after other handlers
swup.hooks.on('visit:start', () => {}, { priority: 100 });
```

```
// Execute before other handlers
swup.hooks.on('visit:start', () => {}, { priority: -100 });

// Execute after other handlers
swup.hooks.on('visit:start', () => {}, { priority: 100 });
```

#### [Shortcuts](https://swup.js.org/hooks/#shortcuts)

There are shortcuts available for common handler options:

```
swup.hooks.once('page:view', () => {}); // once: true
swup.hooks.before('content:replace', () => {}); // before: true
```

```
swup.hooks.once('page:view', () => {}); // once: true
swup.hooks.before('content:replace', () => {}); // before: true
```

## [Pausing execution](https://swup.js.org/hooks/#pausing-execution)

Swup will await Promises returned from handlers, allowing you to pause execution.

```
// Delay the start of the page transition by 1 second
swup.hooks.on('visit:start', () => {
  return new Promise((res) => setTimeout(res, 1000));
});
```

```
// Delay the start of the page transition by 1 second
swup.hooks.on('visit:start', () => {
  return new Promise((res) => setTimeout(res, 1000));
});
```

This means that `async/await` handlers are supported as well:

```
// Wait for a custom function before starting the transition
swup.hooks.on('visit:start', async () => {
  await myCustomFunction();
});
```

```
// Wait for a custom function before starting the transition
swup.hooks.on('visit:start', async () => {
  await myCustomFunction();
});
```

## [Removing handlers](https://swup.js.org/hooks/#removing-handlers)

Remove a previously registered handler by passing in the function to remove.

```
const handler = () => console.log('New page loaded');

// Register a handler
swup.hooks.on('page:view', handler);

// Remove it again later
swup.hooks.off('page:view', handler);
```

```
const handler = () => console.log('New page loaded');

// Register a handler
swup.hooks.on('page:view', handler);

// Remove it again later
swup.hooks.off('page:view', handler);
```

## [List of hooks](https://swup.js.org/hooks/#list)

The following hooks are exposed by swup and can be listened to. Refer to the
[lifecycle diagram](https://swup.js.org/lifecycle/#lifecycle-diagram) for a visual overview of when the most important
hooks are called. Install the [Debug Plugin](https://swup.js.org/plugins/debug-plugin) to log triggered hooks to the
browser console as they are happening.

| Hook name | Description |
| --- | --- |
| [**animation:out:start**](https://swup.js.org/hooks/#animation-out-start) | Current content starts animating out. Class `.is-animating` is added. |
| [**animation:out:await**](https://swup.js.org/hooks/#animation-out-await) | Swup waits for CSS animations to finish before replacing the content. |
| [**animation:out:end**](https://swup.js.org/hooks/#animation-out-end) | Current content finishes animating out. Content is not yet replaced. |
| [**animation:in:start**](https://swup.js.org/hooks/#animation-in-start) | New content starts animating in. Class `.is-animating` is removed. |
| [**animation:in:await**](https://swup.js.org/hooks/#animation-in-await) | Swup waits for CSS animations to finish before finishing the visit. |
| [**animation:in:end**](https://swup.js.org/hooks/#animation-in-end) | New content finishes animating out. |
| [**animation:skip**](https://swup.js.org/hooks/#animation-skip) | Page will load at once without animations, e.g. on history navigation. |
| [**cache:set**](https://swup.js.org/hooks/#cache-set) | Page is saved to the cache. |
| [**cache:clear**](https://swup.js.org/hooks/#cache-clear) | The cache is cleared completely. |
| [**content:replace**](https://swup.js.org/hooks/#content-replace) | The old content of the page is replaced by the new content. |
| [**content:scroll**](https://swup.js.org/hooks/#content-scroll) | The scroll position is reset after replacing the content. |
| [**enable**](https://swup.js.org/hooks/#enable) | Swup instance is created. |
| [**disable**](https://swup.js.org/hooks/#disable) | Swup instance is [disabled](https://swup.js.org/api/methods/#destroy). |
| [**fetch:error**](https://swup.js.org/hooks/#fetch-error) | Fetch request is rejected because of a server error. |
| [**fetch:request**](https://swup.js.org/hooks/#fetch-request) | Fetch request is sent. |
| [**fetch:timeout**](https://swup.js.org/hooks/#fetch-timeout) | Fetch request has timed out. |
| [**history:popstate**](https://swup.js.org/hooks/#history-popstate) | History navigation is started: back/forward button was pressed. |
| [**link:click**](https://swup.js.org/hooks/#link-click) | Link is clicked. |
| [**link:self**](https://swup.js.org/hooks/#link-self) | Link is clicked that leads to the current page. |
| [**link:anchor**](https://swup.js.org/hooks/#link-anchor) | Link is clicked that jumps to an anchor on the current page. |
| [**link:newtab**](https://swup.js.org/hooks/#link-newtab) | Link is clicked that opens to a new tab. |
| [**page:load**](https://swup.js.org/hooks/#page-load) | Page is loaded from cache or via fetch request. |
| [**page:view**](https://swup.js.org/hooks/#page-view) | New content is visible after replacing the content. |
| [**scroll:top**](https://swup.js.org/hooks/#scroll-top) | Scroll to the top of the page. |
| [**scroll:anchor**](https://swup.js.org/hooks/#scroll-anchor) | Scroll to an anchor on the current page. |
| [**visit:start**](https://swup.js.org/hooks/#visit-start) | Visit started: transition to a new page begins. |
| [**visit:end**](https://swup.js.org/hooks/#visit-end) | Visit ended: all content is replaced, animations have finished. |
| [**visit:abort**](https://swup.js.org/hooks/#visit-abort) | Visit aborted: a new link was clicked before the current transition has finished. |

## [Examples](https://swup.js.org/hooks/#examples)

### [Trigger analytics page views](https://swup.js.org/hooks/#trigger-analytics-page-views)

```
swup.hooks.on('page:view', () => {
  ga('set', 'title', document.title);
  ga('set', 'page', window.location.pathname);
  ga('send', 'pageview');
});
```

```
swup.hooks.on('page:view', () => {
  ga('set', 'title', document.title);
  ga('set', 'page', window.location.pathname);
  ga('send', 'pageview');
});
```

### [Initialize new components on the page](https://swup.js.org/hooks/#initialize-new-components-on-the-page)

```
swup.hooks.on('page:view', () => {
  if (document.querySelector('#carousel')) {
    const carousel = new Carousel('#carousel');
  }
});
```

```
swup.hooks.on('page:view', () => {
  if (document.querySelector('#carousel')) {
    const carousel = new Carousel('#carousel');
  }
});
```

### [Display loading indicator during transitions](https://swup.js.org/hooks/#display-loading-indicator-during-transitions)

```
swup.hooks.on('animation:out:start', () => {
  document.querySelector('#loader').hidden = false;
});
swup.hooks.on('animation:in:end', () => {
  document.querySelector('#loader').hidden = true;
});
```

```
swup.hooks.on('animation:out:start', () => {
  document.querySelector('#loader').hidden = false;
});
swup.hooks.on('animation:in:end', () => {
  document.querySelector('#loader').hidden = true;
});
```

## [Set all hook handlers at once](https://swup.js.org/hooks/#set-all-hook-handlers-at-once)

When creating a swup instance, you can register all your hook handlers at once by passing a keyed
object into the instance options.

```
const swup = new Swup({
  hooks: {
    'visit:start': () => console.log('starting visit'),
    'page:load': () => console.log('loaded page'),
    'visit:end': () => console.log('finished visit')
  }
})
```

```
const swup = new Swup({
  hooks: {
    'visit:start': () => console.log('starting visit'),
    'page:load': () => console.log('loaded page'),
    'visit:end': () => console.log('finished visit')
  }
})
```

Hook handler options like `once` or `before` can be set by appending them to the hook name,
separated by a dot: `content:replace.before`, `fetch:error.once`, etc.

```
const swup = new Swup({
  hooks: {
    'visit:start.once': () => console.log('triggers once'),
    'content:replace.before': () => console.log('triggers before hook')
  }
})
```

```
const swup = new Swup({
  hooks: {
    'visit:start.once': () => console.log('triggers once'),
    'content:replace.before': () => console.log('triggers before hook')
  }
})
```

## [DOM events](https://swup.js.org/hooks/#dom-events)

All hooks are also triggered on the `document` with a `swup:` prefix. They receive the hook name
and the visit object inside the detail key of the event.

```
document.addEventListener('swup:page:view', ({ detail: { visit } }) => {
  console.log('Going to', visit.to.url);
});
```

```
document.addEventListener('swup:page:view', ({ detail: { visit } }) => {
  console.log('Going to', visit.to.url);
});
```
