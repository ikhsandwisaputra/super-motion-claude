---
source: https://www.react-spring.dev/docs/components/use-springs
title: "useSprings | React Spring"
fetched: 2026-10-28
---

# [useSprings](https://www.react-spring.dev/docs/components/use-springs#usesprings)

If you want to orchestrate multiple springs with a unified API, this is probably the best hook for you.

## [Usage](https://www.react-spring.dev/docs/components/use-springs#usage)

`useSprings` differs because we supply the amount of springs we want and then pass our configuration,
whether you're using a function or not.

### [With a function & deps](https://www.react-spring.dev/docs/components/use-springs#with-a-function--deps)

```jsx
import { useSprings, animated } from '@react-spring/web'

function MyComponent() {

const [springs, api] = useSprings(

2,

() => ({

from: { opacity: 0 },

to: { opacity: 1 },

}),

[]

)

return (

<div>

{springs.map(props => (

<animated.div style={props}>Hello World</animated.div>

))}

</div>

)

}
```

### [With a config object](https://www.react-spring.dev/docs/components/use-springs#with-a-config-object)

```jsx
import { useSprings, animated } from '@react-spring/web'

function MyComponent() {

const springs = useSprings(2, {

from: { opacity: 0 },

to: { opacity: 1 },

})

return (

<div>

{springs.map(props => (

<animated.div style={props}>Hello World</animated.div>

))}

</div>

)

}
```

## [Reference](https://www.react-spring.dev/docs/components/use-springs#reference)

| Prop | Type | Default |
| --- | --- | --- |
| `from` | `object` | – |
| `to` | `object | object[] | function` | – |
| `loop` | `boolean | object | function` | – |
| `delay` | `number | function` | – |
| `immediate` | `boolean | function` | – |
| `reset` | `boolean` | – |
| `reverse` | `boolean` | – |
| `pause` | `boolean` | – |
| `cancel` | `boolean | string | string[] | function` | – |
| `ref` | `SpringRef` | – |
| `config` | `object | function` | `object` |
| `events` | `function` | – |

## [Typescript](https://www.react-spring.dev/docs/components/use-springs#typescript)

```tsx
function useSprings(count: number, configuration: ConfigObject): SpringValues[]

function useSprings(

count: number,

configurationFn: (springIndex: number) => ConfigObject,

deps?: any[]

): [springs: SpringValues[], api: SpringRef]
```

Where `ConfigObject` is described [above](https://www.react-spring.dev/docs/components/use-springs#reference)

### [TS Glossary](https://www.react-spring.dev/docs/components/use-springs#ts-glossary)

* [`SpringValues`](https://www.react-spring.dev/docs/typescript#springvalues)

## [Examples](https://www.react-spring.dev/docs/components/use-springs#examples)

* [![Cards Stack](https://www.react-spring.dev/assets/thumbnail-CcOI_jYz.png)

  Cards StackAnimating a stack of cards with @use-gesture/react's useDrag hook, useSprings and interpolation

  + cards
  + use-gesture
  + useDrag
  + useSprings
  + interpolation](https://codesandbox.io/s/to6uf)
* [![Draggable List](https://www.react-spring.dev/assets/thumbnail-DiacdWFT.png)

  Draggable ListUsing @use-gesture/react with react-spring to create a draggable re-orderable list

  + useSprings
  + useDrag
  + interpolation
  + draggable
  + list](https://codesandbox.io/s/zfy9p)
* [![Floating Button](https://www.react-spring.dev/assets/thumbnail-DSlcxb-d.png)

  Floating ButtonA small floating button like Facebook's desktop messenger built with radix & stitches

  + use-gesture
  + useSpring
  + useSprings
  + interpolation
  + stitches
  + radix-ui](https://codesandbox.io/s/dqxvqu)
* [![Smile Grid](https://www.react-spring.dev/assets/thumbnail-BgCssH-q.png)

  Smile GridAn animated SVG grid with a smiley face inside!

  + useTrail
  + useChain
  + useSprings
  + useSpringRef
  + svg](https://codesandbox.io/s/uqpn4f)
* [![Viewpager](https://www.react-spring.dev/assets/thumbnail-p-pcLCKs.png)

  ViewpagerAnimating a viewport sized image carousel with useDrag, useMeasure and useSprings

  + useSprings
  + useDrag
  + useMeasure
  + carousel](https://codesandbox.io/s/8s3kf)

Can't find what you're looking for? Check out all our [examples!](https://www.react-spring.dev/examples)
