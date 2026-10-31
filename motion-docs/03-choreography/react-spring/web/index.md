---
source: https://www.react-spring.dev/docs
title: "Overview | React Spring"
fetched: 2026-10-28
---

# [Overview](https://www.react-spring.dev/docs#overview)

Welcome to the `react-spring` docs site!

[## Getting Started

Learn about how to use react-spring with step by step explanations](https://www.react-spring.dev/docs/getting-started)

## Guides & Tutorials

Read up on step-by-step tutorials for common use cases exploring our different hooks

[## Examples

Be inspired by exploring all our examples, why not contribute your own?](https://www.react-spring.dev/examples)

## [What is this?](https://www.react-spring.dev/docs#what-is-this)

Our old documentation was lacking in features & clarity. So, based on
community feedback, we've made an endeavor to improve our documentation with a
few key differences:

* We want to explain more of our codebase conceptually e.g what is an `animated`
  component
* All our content will be searchable so no more running around in the dark
* Step-by-step tutorials on how to achieve common use-cases

## [How can I help?](https://www.react-spring.dev/docs#how-can-i-help)

Thank you for being interested in helping! It means a lot — if you want to share
feedback or open a discussion, head over to the
[GitHub Discussions thread](https://github.com/pmndrs/react-spring/discussions/1931).

If you're interested in adding an example to the site then why not check out the specific
[contributing guide](https://github.com/pmndrs/react-spring/tree/main/demo/CONTRIBUTING.md).

# [Breaking changes](https://www.react-spring.dev/docs#breaking-changes)

## [from v9 to v10](https://www.react-spring.dev/docs#from-v9-to-v10)

v10 introduced the move to React 19 and brought a breaking change to the SpringContext API. To add the Spring context provider, you must explicitly use SpringContextProvider.

before:

```tsx
import { SpringContext } from 'react-spring'

...

<SpringContext ...>

...
```

now:

```tsx
import { SpringContextProvider } from 'react-spring'

...

<SpringContextProvider ...>

...
```
