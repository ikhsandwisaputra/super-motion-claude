---
source: https://swup.js.org/integrations/alpine
title: "Integrating Alpine.js — swup"
fetched: 2026-10-28
---

# Integrating Alpine.js

Swup works well with [Alpine.js](https://alpinejs.dev/) for managing component
state and automating page lifecycles. Just initialize both libraries and enjoy
automatic initialization of your components:

```
import Swup from 'swup';
import Alpine from 'alpinejs';

const swup = new Swup();
Alpine.start();
```

```
import Swup from 'swup';
import Alpine from 'alpinejs';

const swup = new Swup();
Alpine.start();
```

```
<div id="swup">
  <div x-data="{ name : 'My Component' }" x-init="console.log(name + ' initialized!')">
    My Component
  </div>
</div>
```

```
<div id="swup">
  <div x-data="{ name : 'My Component' }" x-init="console.log(name + ' initialized!')">
    My Component
  </div>
</div>
```

## [Handling swup hooks](https://swup.js.org/integrations/alpine/#handling-swup-hooks)

To register handlers for swup's hooks inside your Alpine components, you need to
prepend `swup` to all hook names. You can access swup's visit object using the
`detail` property on Alpine's `$event` magic. For example, hooking into `page:view`
would look like this:

```
<div x-data x-on:swup:page:view.document="console.log('Visit new page', $event.detail.visit.to.url)">
  My Alpine Component
</div>
```

```
<div x-data x-on:swup:page:view.document="console.log('Visit new page', $event.detail.visit.to.url)">
  My Alpine Component
</div>
```
