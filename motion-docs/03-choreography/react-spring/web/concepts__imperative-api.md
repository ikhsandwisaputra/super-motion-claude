---
source: https://www.react-spring.dev/docs/concepts/imperative-api
title: "Imperative API | React Spring"
fetched: 2026-10-28
---

# [Imperative API](https://www.react-spring.dev/docs/concepts/imperative-api#imperative-api)

The imperative API enables you to update your animations without requiring a react-render to occur. This is useful
for animations that are not tied to a component's lifecycle, such as animations that are triggered by user input.

In essence, it is simply a `SpringRef` with the hook's `Controller` attached to it. You can additionally add more `Controller`s
to the `SpringRef` to create a multi-controller animation, similar to that of the `useChain` hook.

## [Comparison](https://www.react-spring.dev/docs/concepts/imperative-api#comparison)

What we can see from the below comparisons, is that using the `api` object either returned from your `useSpring` hook,
or generated via `useSpringRef` and passed to the hook, means your components do not re-render when the animation runs.

[Open Sandbox](https://codesandbox.io/api/v1/sandboxes/define?undefined&environment=create-react-app "Open in CodeSandbox")

###

```tsx
import { useState } from 'react'

import { useSpring, useSpringRef, animated } from '@react-spring/web'

const ApiComponent = () => {

const api = useSpringRef()

const springs = useSpring({

ref: api,

from: { x: 0 },

})

const handleClick = () => {

api.start({

to: {

x: springs.x.get() === 100 ? 0 : 100,

},

})

}

return (

<div className="flex-container">

<animated.div
        onClick={handleClick}
        style={{
          width: 80,
          height: 80,
          background: '#ff6d6d',
          borderRadius: 8,
          ...springs,
        }}
      />

<span>Render ID – {Math.random()}</span>

</div>

)

}

const StateComponent = () => {

const [forward, setForward] = useState(false)

const springs = useSpring({

x: forward ? 100 : 0,

})

const handleClick = () => {

setForward(s => !s)

}

return (

<div className="flex-container">

<animated.div
        onClick={handleClick}
        style={{
          width: 80,
          height: 80,
          background: '#ff6d6d',
          borderRadius: 8,
          ...springs,
        }}
      />

<span>Render ID – {Math.random()}</span>

</div>

)

}

export default function MyComponent() {

return (

<div className="flex-container--column">

<ApiComponent />

<StateComponent />

</div>

)

}
```

This way of working with react-spring lets you handle updates quicker and more effectively such as the position of the user's mouse.
It is the recommended approach for working with this library.

Warning

When using a `SpringRef` or `api` return from a hook, any updates to the hook's configuration object are treated as `updates` and therefore
will not trigger the animation to run. You must call `.start()` to trigger the animation, thus flushing the update queue.

## [Methods](https://www.react-spring.dev/docs/concepts/imperative-api#methods)

The entire list of methods & properties are visible [here](https://www.react-spring.dev/docs/advanced/spring-ref). It's API signature is similar to both the [`Controller`](https://www.react-spring.dev/docs/advanced/controller)
and [`SpringValue`](https://www.react-spring.dev/docs/advanced/spring-value) class methods. This is done to create a single unified language across the library.

The most important methods you'll most likely use are [`start`](https://www.react-spring.dev/docs/advanced/spring-ref#start) and [`set`](https://www.react-spring.dev/docs/advanced/spring-ref#set).
However, if you are opting to use the `Controller` class manually as opposed to using our hooks/components, then you would have to manually
handle the lifecycle of adding/removing Controllers.

## [Upgrading from v8](https://www.react-spring.dev/docs/concepts/imperative-api#upgrading-from-v8)

If you're upgrading from v8 of `react-spring`, then welcome! The imperative API is a new feature that has been added to v9. You're probably more
used to an api signature like this:

```ts
const [styles, set, stop] = useSpring(() => ({ x: 0 }))

set({

x: 1,

})
```

This was okay for at the time, but as Controllers have become more powerful, it became clear that we needed a way a more scalable way to add methods
to the signature without extending the array too far.

The new api signature is like this:

```ts
const [styles, api] = useSpring(() => ({ x: 0 }))

api.start({

x: 1,

})
```

Note

We've used `start` in the above example demonstrating migration, this is because `set` acts like:

```ts
api.start({

x: 1,

immediate: true,

})
```
