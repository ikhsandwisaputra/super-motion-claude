---
source: https://motion.dev/docs/resolve-elements
title: "resolveElements"
fetched: 2026-10-28
---

# resolveElements

resolveElements() turns a selector, element or list of elements into an array of elements.

`resolveElements` turns a selector, an element or a list of elements into a plain array of elements.

```
const items = resolveElements("li")
```

Motion uses it inside [`animate`](https://motion.dev/docs/animate), [`inView`](https://motion.dev/docs/inview), [`hover`](https://motion.dev/docs/hover) and other functions, which is why they all accept the same kinds of targets. You can use it to write your own functions that work the same way.

## Usage

Import from Motion:

```
import { resolveElements } from "motion"
```

`resolveElements` accepts:

- A CSS selector: `"li"`
- A single element: `document.body`
- A `NodeList`: `document.querySelectorAll("li")`
- An array of elements

It always returns an array:

```
resolveElements("li") // [li, li, li]
resolveElements(document.body) // [body]
```

`null` and `undefined` return an empty array, and `null` entries in a list are removed. So the result of a `querySelector` that found nothing is safe to pass:

```
resolveElements(document.querySelector(".missing")) // []
```

### Scope selectors to an element

By default, selectors search the whole document. To search inside one element, pass a scope as the second argument. A scope is an object with the element as `current`:

```
const list = document.querySelector("ul")

resolveElements("li", { current: list, animations: [] })
```

### Write a function that accepts any target

```
import { resolveElements } from "motion"

function highlight(target) {
  for (const element of resolveElements(target)) {
    element.classList.add("highlight")
  }
}

highlight(".card")
highlight(document.querySelector("#hero"))
```
