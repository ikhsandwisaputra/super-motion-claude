---
source: https://www.react-spring.dev/docs/advanced/async-animations
title: "Async Animations | React Spring"
fetched: 2026-10-28
---

# [Async Animations](https://www.react-spring.dev/docs/advanced/async-animations#async-animations)

Note

This is an advanced guide. If you're new to `react-spring`, you should start with the [getting started](https://www.react-spring.dev/docs/getting-started) page
and become familar with the library before jumping into async animations.

## [Aren't all animations async?](https://www.react-spring.dev/docs/advanced/async-animations#arent-all-animations-async)

Well technically in `react-spring` yes, you could consider animations to be async? The `start` function of a `Controller` is async and therefore
the `imperative api` is too, async. And then your styles are updated asynchronously... But that's not what this guide is referring too.

When we talk about async animations we refer to the ability to perform X amount of transformations with only one call of the APIs and each
animation chunk will finish before the other begins. If you look at the example below, this animation has only a config object, `loop` prop
and a `to` prop.

[Open Sandbox](https://codesandbox.io/api/v1/sandboxes/define?undefined&environment=create-react-app "Open in CodeSandbox")

## [The `to` prop](https://www.react-spring.dev/docs/advanced/async-animations#the-to-prop)

If you've read any of the `component` pages, you'll know we accept a `to` prop, it's typically used as an object,
but alternatively, you can also use an array (chaining the animations) or a function (writing an animation script).

When you consider the options you have as to what you can pass to the `to` prop, you'll begin to understand how complicated
your animations *can* be, it's then a matter of understand what you're trying to achieve and applying the best solution.

## [Chaining animations](https://www.react-spring.dev/docs/advanced/async-animations#chaining-animations)

The array syntax is a middleground between total control of async animations and the simplicity of passing just an `object`.
Just like the `start` method of the imperative api, you don't need to reference every key for each update. Each update will fire
when the previous one has finished.

[Open Sandbox](https://codesandbox.io/api/v1/sandboxes/define?undefined&environment=create-react-app "Open in CodeSandbox")

###

```tsx
import { useSpring, animated } from '@react-spring/web'

export default function MyComponent() {

const springs = useSpring({

from: { background: '#ff6d6d', y: -40, x: 0 },

to: [

{ x: 80, background: '#fff59a' },

{ y: 40, background: '#88DFAB' },

{ x: 0, background: '#569AFF' },

{ y: -40, background: '#ff6d6d' },

],

loop: true,

})

return (

<animated.div
      style={{
        width: 40,
        height: 40,
        borderRadius: 4,
        ...springs,
      }}
    />

)

}
```

## [Writing animation scripts](https://www.react-spring.dev/docs/advanced/async-animations#writing-animation-scripts)

When you need most control of your animation, it's best to write a `script` by providing a `function` to the `to` prop.
The function receives two arguments, the `next` function which accepts an object of updates, again similar to the start
method of the imperative API and a `cancel` function which works the same as the `stop` method of the `imperative API`.

This therefore allows you to cancel scripts at any time meaning you can react to external events & conditions.

For further reading, see [`imperative API`](https://www.react-spring.dev/docs/advanced/spring-ref#stop).

[Open Sandbox](https://codesandbox.io/api/v1/sandboxes/define?undefined&environment=create-react-app "Open in CodeSandbox")

###

```tsx
import { useSpring, animated } from '@react-spring/web'

export default function MyComponent() {

const springs = useSpring({

from: { background: '#ff6d6d', y: -40, x: 0 },

to: async (next, cancel) => {

await next({ x: 80, background: '#fff59a' })

await next({ y: 40, background: '#88DFAB' })

await next({ x: 0, background: '#569AFF' })

await next({ y: -40, background: '#ff6d6d' })

},

loop: true,

})

return (

<animated.div
      style={{
        width: 40,
        height: 40,
        borderRadius: 4,
        ...springs,
      }}
    />

)

}
```
