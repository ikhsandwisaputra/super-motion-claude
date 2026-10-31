---
source: https://swup.js.org/visit
title: "Visit — swup"
fetched: 2026-10-28
---

# Visit

The visit object contains information about the current page visit: the current and new
URL, the element and event that triggered the visit, as well as details about whether this visit
should be animated and which containers should be replaced.

Manipulate the visit object to control how swup will transition to the new page.

## [Accessing the visit object](https://swup.js.org/visit/#accessing-the-visit-object)

The visit object is available in all hook handlers.

```
swup.hooks.on('page:view', (visit) => {
  console.log('New page: ', visit.to.url);
});
```

```
swup.hooks.on('page:view', (visit) => {
  console.log('New page: ', visit.to.url);
});
```

## [Shape of the visit object](https://swup.js.org/visit/#shape-of-the-visit-object)

This is an example visit object for a navigation from `/home` to `/about#anchor`.

```
{
  id: 1042739, /* A unique ID to identify this visit */
  from: {
    url: '/home',
    hash: ''
  },
  to: {
    url: '/about',
    hash: '#anchor',
    html: undefined, /* The HTML string of /about, when it's loaded */,
    document: undefined /* The parsed document of /about, when it's loaded */,
  },
  containers: [
    '#swup'
  ],
  animation: {
    animate: true,
    name: 'fade'
  },
  trigger: {
    el: /* <a> element */,
    event: /* MouseEvent */
  },
  cache: {
    read: true,
    write: true
  },
  history: {
    action: 'push',
    popstate: false,
    direction: undefined
  },
  scroll: {
    reset: true,
    target: '#anchor'
  },
  meta: {}
}
```

```
{
  id: 1042739, /* A unique ID to identify this visit */
  from: {
    url: '/home',
    hash: ''
  },
  to: {
    url: '/about',
    hash: '#anchor',
    html: undefined, /* The HTML string of /about, when it's loaded */,
    document: undefined /* The parsed document of /about, when it's loaded */,
  },
  containers: [
    '#swup'
  ],
  animation: {
    animate: true,
    name: 'fade'
  },
  trigger: {
    el: /* <a> element */,
    event: /* MouseEvent */
  },
  cache: {
    read: true,
    write: true
  },
  history: {
    action: 'push',
    popstate: false,
    direction: undefined
  },
  scroll: {
    reset: true,
    target: '#anchor'
  },
  meta: {}
}
```

## [Use cases](https://swup.js.org/visit/#use-cases)

What can we do by manipulating the visit object? A few examples are listed below.

Note that the most convenient place to hook into is on `visit:start` — all the information about the
current visit is already there, but no requests or animations have started yet.

### [Disable animations](https://swup.js.org/visit/#disable-animations)

The new page will load instantaneously without animations.

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

### [Custom animation](https://swup.js.org/visit/#custom-animation)

Set a custom `.to-{name}` class on the html element to allow targeting via CSS.

```
swup.hooks.on('visit:start', (visit) => {
  visit.animation.name = 'slide';
});
```

```
swup.hooks.on('visit:start', (visit) => {
  visit.animation.name = 'slide';
});
```

### [Disable scroll reset](https://swup.js.org/visit/#disable-scroll-reset)

The current scroll position will be kept after the new page was loaded.

```
swup.hooks.on('visit:start', (visit) => {
  visit.scroll.reset = false;
});
```

```
swup.hooks.on('visit:start', (visit) => {
  visit.scroll.reset = false;
});
```

### [Dynamic containers](https://swup.js.org/visit/#dynamic-containers)

Change which [content containers](https://swup.js.org/options/#containers) will be replaced on the current visit.

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

### [Access trigger element](https://swup.js.org/visit/#access-trigger-element)

Inspect the DOM element that triggered the current visit. Most probably a link element or undefined
if triggered via the API.

```
swup.hooks.on('visit:start', (visit) => {
  console.log('Clicked link', visit.trigger.el); // HTMLAnchorElement
});
```

```
swup.hooks.on('visit:start', (visit) => {
  console.log('Clicked link', visit.trigger.el); // HTMLAnchorElement
});
```

### [Access trigger event](https://swup.js.org/visit/#access-trigger-event)

Inspect the DOM event that triggered the current visit. Most probably a click event or undefined
if triggered via the API.

```
swup.hooks.on('visit:start', (visit) => {
  console.log('Click event', visit.trigger.event); // MouseEvent
});
```

```
swup.hooks.on('visit:start', (visit) => {
  console.log('Click event', visit.trigger.event); // MouseEvent
});
```

### [Identify history visits](https://swup.js.org/visit/#identify-history-visits)

Check if the current visit was triggered by the back/forward button of the browser. The
`popstate` key is a boolean indicating a history visit. The `direction` key holds information
about the direction of travel: `forwards`, `backwards`, or `undefined`.

```
swup.hooks.on('visit:start', (visit) => {
  if (visit.history.popstate) {
    console.log('History visit', visit.history.direction);
  }
});
```

```
swup.hooks.on('visit:start', (visit) => {
  if (visit.history.popstate) {
    console.log('History visit', visit.history.direction);
  }
});
```

### [Replace history entry](https://swup.js.org/visit/#replace-history-entry)

Tell swup to replace the current history entry, instead of creating a new one.

```
swup.hooks.on('visit:start', (visit) => {
  visit.history.action = 'replace';
});
```

```
swup.hooks.on('visit:start', (visit) => {
  visit.history.action = 'replace';
});
```

### [Disable cache](https://swup.js.org/visit/#disable-cache)

Control whether swup will check for existing pages in the cache or save the newly loaded page
to the cache. Overwrites the behavior set in the [cache option](https://swup.js.org/options/#cache).

```
swup.hooks.on('visit:start', (visit) => {
  visit.cache.read = false;
});
```

```
swup.hooks.on('visit:start', (visit) => {
  visit.cache.read = false;
});
```

### [Do something with the incoming document](https://swup.js.org/visit/#do-something-with-the-incoming-document)

As soon as the next page is loaded, you can access the `document` of that page and do something with
it. For example, you could make sure the `lang` attribute is updated on your `<html>` element:

```
swup.hooks.on('content:replace', (visit) => {
  const lang = visit.to.document?.documentElement.getAttribute('lang');
  if (lang) document.documentElement.setAttribute('lang', lang);
});
```

```
swup.hooks.on('content:replace', (visit) => {
  const lang = visit.to.document?.documentElement.getAttribute('lang');
  if (lang) document.documentElement.setAttribute('lang', lang);
});
```

### [Pass along custom metadata](https://swup.js.org/visit/#pass-along-custom-metadata)

Each visit has an empty `meta` object you can use to store arbitrary data with that visit. The data
will now be available in every hook handler along the way.

```
swup.hooks.on('visit:start', (visit) => {
  visit.meta.lorem = 'ipsum';
});

swup.hooks.on('page:view', (visit) => {
  console.log(visit.meta.lorem); // 'ipsum'
});
```

```
swup.hooks.on('visit:start', (visit) => {
  visit.meta.lorem = 'ipsum';
});

swup.hooks.on('page:view', (visit) => {
  console.log(visit.meta.lorem); // 'ipsum'
});
```

When initiating a visit from the navigation API, you can pass in a custom metadata object as well:

```
swup.navigate(url, { meta: { lorem: 'ipsum' } })
```

```
swup.navigate(url, { meta: { lorem: 'ipsum' } })
```
