---
source: https://www.react-spring.dev/docs/components/use-transition
title: "useTransition | React Spring"
fetched: 2026-10-28
---

# [useTransition](https://www.react-spring.dev/docs/components/use-transition#usetransition)

This hook is best suited for animating in & out datasets or items you don't particularly
want to be left in the DOM, e.g. a dialog.

## [Usage](https://www.react-spring.dev/docs/components/use-transition#usage)

`useTransition` depends on an `array` of data. That data can be anything you want, we
use a lot of internals to track each datum including inferring the keys, this is the
first argument. The second is a config object, which is different to
[`useSpring`](https://www.react-spring.dev/docs/components/use-spring) or [`useSprings`](https://www.react-spring.dev/docs/components/use-springs) so take note!

### [With a function & deps](https://www.react-spring.dev/docs/components/use-transition#with-a-function--deps)

```jsx
import { useTransition, animated } from '@react-spring/web'

function MyComponent({ data = [1, 2, 3] }) {

const [transitions, api] = useTransition(data, () => ({

from: { opacity: 0 },

enter: { opacity: 1 },

leave: { opacity: 1 },

}))

return transitions((style, item) => (

<animated.div style={style}>{item}</animated.div>

))

}
```

### [With a config object](https://www.react-spring.dev/docs/components/use-transition#with-a-config-object)

```jsx
import { useTransition, animated } from '@react-spring/web'

function MyComponent({ data = [1, 2, 3] }) {

const transitions = useTransition(data, {

from: { opacity: 0 },

enter: { opacity: 1 },

leave: { opacity: 1 },

})

return transitions((style, item) => (

<animated.div style={style}>{item}</animated.div>

))

}
```

### [Transition function](https://www.react-spring.dev/docs/components/use-transition#transition-function)

The transition function takes a `render` function as an argument. This is how we append `keys`.
From the example above you can see we pass a `style` argument to the function, this `style` object
relates to the state of the animation, e.g. if the animation is `ENTERING` then the we use the
keys from the `enter` property of of your config object. For a deeper dive into the function
signature see the [`Typescript`](https://www.react-spring.dev/docs/components/use-transition#typescript) section.

## [Reference](https://www.react-spring.dev/docs/components/use-transition#reference)

`Item` is defined a lot below, it's automatically inferred from what you pass as the
content of the array you pass as the first argument to the hook. Therefore, if you
passed `[1, 2, 3]` then `Item` would be `number`.

| Prop | Type | Default |
| --- | --- | --- |
| `from` | `object | function` | – |
| `initial` | `object | function` | – |
| `enter` | `object | object[] | function` | – |
| `update` | `object | object[] | function` | – |
| `leave` | `object | object[] | function` | – |
| `keys` | `Array<string | number> | function | null` | – |
| `sort` | `function` | – |
| `trail` | `number` | `0` |
| `reverse` | `boolean` | `false` |
| `exitBeforeEnter` | `boolean` | `false` |
| `expires` | `boolean | number | function` | `true` |
| `ref` | `SpringRef` | – |
| `config` | `object | function` | `object` |
| `events` | `function` | – |

## [Typescript](https://www.react-spring.dev/docs/components/use-transition#typescript)

```tsx
function useTransition<Item extends any>(

data: Item[],

configuration: ConfigObject

): TransitionFn<Item>

function useTransition<Item extends any>(

data: Item[],

configurationFn: () => ConfigObject

deps?: any[]

): [transition: TransitionFn<Item>, api: SpringRef]

type TransitionFn = (

style: SpringValues,

item: Item,

transitionState: TransitionState<Item>,

index: number

) => ReactNode
```

Where `ConfigObject` is described [above](https://www.react-spring.dev/docs/components/use-transition#reference)

### [TS Glossary](https://www.react-spring.dev/docs/components/use-transition#ts-glossary)

* [`SpringValues`](https://www.react-spring.dev/docs/typescript#springvalues)
* [`TransitionState`](https://www.react-spring.dev/docs/typescript#transitionstate)

## [Examples](https://www.react-spring.dev/docs/components/use-transition#examples)

* [![Basic Transition](https://www.react-spring.dev/assets/thumbnail-BTXwXtP3.png)

  Basic TransitionBasic viewport sized transition of cards animating with the imperative API

  + imperative
  + useTransition
  + SpringRef](https://codesandbox.io/s/cisbc)
* [![Chaining Transition and a Spring](https://www.react-spring.dev/assets/thumbnail-CVbbM9GG.png)

  Chaining Transition and a SpringOrchestrating a useTransition and useSpring hook with the useChain hook.

  + useTransition
  + useSpring
  + useChain
  + SpringRef](https://codesandbox.io/s/q6ffu)
* [![Exit Before Enter](https://www.react-spring.dev/assets/thumbnail-BEFhfBxr.png)

  Exit Before EnterShowcasing the exitBeforeEnter prop and animated clip-paths to give a wipe effect

  + useTransition
  + useSpring
  + exitBeforeEnter
  + paths
  + SpringRef](https://codesandbox.io/s/exkei)
* [![Image Fade](https://www.react-spring.dev/assets/thumbnail-CgXwgXfs.png)

  Image FadeSimple image fading illustrating the exitBeforeEnter prop on useTransition

  + image
  + exitBeforeEnter
  + useTransition
  + onRest](https://codesandbox.io/s/1t9hh)
* [![List Reordering](https://www.react-spring.dev/assets/thumbnail-DiacdWFT.png)

  List ReorderingAutomatic list reordering with animation

  + useTransition
  + list](https://codesandbox.io/s/279ct)
* [![Masonry Grid](https://www.react-spring.dev/assets/thumbnail-DgqfK2If.png)

  Masonry GridA pintrest-esque homepage with animations

  + useTransition
  + masonry
  + pintrest](https://codesandbox.io/s/mdovb)
* [![Multistage Transitions](https://www.react-spring.dev/assets/thumbnail-BL2qu4Bp.png)

  Multistage TransitionsAsync animation scripts for entering and leaving using useTransition

  + async
  + scripts
  + useTransition](https://codesandbox.io/s/k467x)
* [![Notification Hub](https://www.react-spring.dev/assets/thumbnail-oDT02qxL.png)

  Notification HubCreating toast notifications with useTransition

  + notifications
  + toast
  + useTransition](https://codesandbox.io/s/v1i1t)

Can't find what you're looking for? Check out all our [examples!](https://www.react-spring.dev/examples)
