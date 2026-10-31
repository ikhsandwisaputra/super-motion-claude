---
source: https://www.react-spring.dev/docs/components/use-chain
title: "useChain | React Spring"
fetched: 2026-10-28
---

# [useChain](https://www.react-spring.dev/docs/components/use-chain#usechain)

`useChain` is used to orchestrate animation hooks in sequence with one another.
This is best used when you specifically want to orchestrate different types of
animation hook e.g. [`useSpring`](https://www.react-spring.dev/docs/components/use-spring) & [`useTransition`](https://www.react-spring.dev/docs/components/use-transition)
in sequence as opposed to multiple `useSpring` hooks where you *could* either use
[`useSprings`](https://www.react-spring.dev/docs/components/use-springs) or create an [async animation](https://www.react-spring.dev/docs/advanced/async-animations).

## [Usage](https://www.react-spring.dev/docs/components/use-chain#usage)

This will first run the `useSpring` hook and then the `useTransition` hook when the component has mounted and the `useSpring` has come to rest.

```jsx
import {

useTransition,

useSpring,

useChain,

animated,

useSpringRef,

} from '@react-spring/web'

const data = ['hi', 'there!']

function MyComponent() {

const springRef = useSpringRef()

const springs = useSpring({

ref: springRef,

from: { size: '20%' },

to: { size: '50%' },

})

const transRef = useSpringRef()

const transitions = useTransition(data, {

ref: transRef,

from: { scale: 0 },

enter: { scale: 1 },

leave: { scale: 0 },

})

useChain([springRef, transRef])

return (

<animated.div
      style={{
        height: springs.size,
        width: springs.size,
        background: 'blue',
      }}
    >

{transitions((style, item) => (

<animated.div
          style={{
            width: '120px',
            height: '120px',
            background: 'green',
            ...style,
          }}
        >

{item}

</animated.div>

))}

</animated.div>

)

}
```

## [Timesteps Explained](https://www.react-spring.dev/docs/components/use-chain#timesteps-explained)

Using the previous as an example we can see that the transition is ran *after* the `useSpring`
hook has come to rest. This is the default behaviour of the `useChain` hook.

However, they may be some instances where you want to define how long before the next spring
is triggered. That's where timesteps come in.

Take this usage of `useChain`:

```jsx
useChain([springRef, transRef], [0, 1], 1000)
```

We've added two additional arguments to the hooks, the first is a number array of timesteps
(numbers must be in the range 0-1) that should model to the index of your `SpringRef`s and
the second is a the timeframe (defaulting to 1000ms).

The way to think about the timesteps & timeframe is that the timestep of the hooks,
multiplied by the timeframe is the delay you apply to your animations:

```jsx
const refs = [springRef, transRef]

const timesteps = [0, 1]

const timeframe = 1000

refs.forEach((ref, index) => {

/**

* for the first ref this would be 0 because 0 * 1000 = 0

* for the second ref this would be 1000 because 1 * 1000 = 1000

*/

const time = timesteps[index] * timeframe

// the delay is then applied to the animation.

ref.delay = time

})
```

So therefore *if* you wanted your transition to come in after 400ms you could do this:

```tsx
useChain([springRef, transRef], [0, 0.4])
```

Note, we omitted the `timeframe` argument here because it has a default of `1000`.

## [Reference](https://www.react-spring.dev/docs/components/use-chain#reference)

This hook does not have a configuration object or take additional props.

## [Typescript](https://www.react-spring.dev/docs/components/use-chain#typescript)

```tsx
function useChain(refs: ReadonlyArray<SpringRef>): void

function useChain(refs: ReadonlyArray<SpringRef>, timeSteps: number[]): void

function useChain(

refs: ReadonlyArray<SpringRef>,

timeSteps: number[],

timeFrame: number

): void
```

## [Examples](https://www.react-spring.dev/docs/components/use-chain#examples)

* [![Chaining Transition and a Spring](https://www.react-spring.dev/assets/thumbnail-CVbbM9GG.png)

  Chaining Transition and a SpringOrchestrating a useTransition and useSpring hook with the useChain hook.

  + useTransition
  + useSpring
  + useChain
  + SpringRef](https://codesandbox.io/s/q6ffu)
* [![Smile Grid](https://www.react-spring.dev/assets/thumbnail-BgCssH-q.png)

  Smile GridAn animated SVG grid with a smiley face inside!

  + useTrail
  + useChain
  + useSprings
  + useSpringRef
  + svg](https://codesandbox.io/s/uqpn4f)

Can't find what you're looking for? Check out all our [examples!](https://www.react-spring.dev/examples)
