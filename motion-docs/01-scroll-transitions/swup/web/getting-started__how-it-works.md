---
source: https://swup.js.org/getting-started/how-it-works
title: "How It Works — swup"
fetched: 2026-10-28
---

# How It Works

Instead of letting the browser load the next page, swup intercepts link clicks, loads the new
page in the background and smoothly animates between the old and new content.

Read on to learn about key concepts of swup.

## [Containers](https://swup.js.org/getting-started/how-it-works/#containers)

Swup will not replace the whole body on each page load. Instead, it will only replace the actual
[content containers](https://swup.js.org/options/#containers) on your page. By default, swup will only replace a
container with the id `#swup` but you can configure additional containers like headers or navigation
menus.

## [Automatic animation timing](https://swup.js.org/getting-started/how-it-works/#timing)

Swup is built around animations and will wait for CSS animations, JS animations, and native
View Transitions before updating the page with the new content. See
[Defining animations](https://swup.js.org/getting-started/animations/) for details and examples.

## [Browser history](https://swup.js.org/getting-started/how-it-works/#history)

Swup will update and push to the browser history API. The current URL in the browser always reflects
the actual URL of the last requested page. Forward/backward visits will continue to work
as expected. On history visits, the scroll position will be restored as well.

## [Scroll behavior](https://swup.js.org/getting-started/how-it-works/#scrolling)

Swup emulates native browser behavior for scrolling. Between page visits, the scroll position will
be reset to the top. Clicking on an anchor link to the same page will jump to that anchor.

## [Hooks](https://swup.js.org/getting-started/how-it-works/#hooks)

To trigger custom logic or modify swup's behavior, you can register [hook handlers](https://swup.js.org/hooks/).

## [Plugins](https://swup.js.org/getting-started/how-it-works/#plugins)

Swup was designed to be small but modular. Any extended functionality can be added via one of the
many official or third-party [plugins](https://swup.js.org/plugins/).
