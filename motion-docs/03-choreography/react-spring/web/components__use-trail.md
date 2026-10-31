---
source: https://www.react-spring.dev/docs/components/use-trail
title: "useTrail | React Spring"
fetched: 2026-10-28
---

# [useTrail](https://www.react-spring.dev/docs/components/use-trail#usetrail)

`useTrail` has an identical API signature to [`useSprings`](https://www.react-spring.dev/docs/components/use-springs) the
difference is the hook automatically orchestrates the springs to stagger one after the other.

## [Usage](https://www.react-spring.dev/docs/components/use-trail#usage)

### [With a function & deps](https://www.react-spring.dev/docs/components/use-trail#with-a-function--deps)

```jsx
import { useTrail, animated } from '@react-spring/web'

export default function MyComponent() {

const [trails, api] = useTrail(

2,

() => ({

from: { opacity: 0 },

to: { opacity: 1 },

}),

[]

)

return (

<div>

{trails.map(props => (

<animated.div style={props}>Hello World</animated.div>

))}

</div>

)

}
```

### [With a config object](https://www.react-spring.dev/docs/components/use-trail#with-a-config-object)

```jsx
import { useTrail, animated } from '@react-spring/web'

export default function MyComponent() {

const trails = useTrail(2, {

from: { opacity: 0 },

to: { opacity: 1 },

})

return (

<div>

{trails.map(props => (

<animated.div style={props}>Hello World</animated.div>

))}

</div>

)

}
```

## [Reference](https://www.react-spring.dev/docs/components/use-trail#reference)

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

## [Typescript](https://www.react-spring.dev/docs/components/use-trail#typescript)

```tsx
function useTrail(count: number, configuration: ConfigObject): SpringValues[]

function useTrail(

count: number,

configurationFn: (springIndex: number) => ConfigObject,

deps?: any[]

): [springs: SpringValues[], api: SpringRef]
```

Where `ConfigObject` is described [above](https://www.react-spring.dev/docs/components/use-trail#reference)

### [TS Glossary](https://www.react-spring.dev/docs/components/use-trail#ts-glossary)

* [`SpringValues`](https://www.react-spring.dev/docs/typescript#springvalues)

## [Examples](https://www.react-spring.dev/docs/components/use-trail#examples)

* [![Basic Trail](https://www.react-spring.dev/assets/thumbnail-BFUEXVT3.png)

  Basic TrailIntroduction to using the useTrail hook as part of a wrapper component

  + useTrail
  + Basic
  + configuration](https://codesandbox.io/s/yps54)
* [![Goo Blobs](https://www.react-spring.dev/assets/thumbnail-BJteQCHf.png)

  Goo Blobs2D SVG metaballs animated with react-spring

  + useTrail
  + useMeasure
  + svg
  + metaballs
  + filters](https://codesandbox.io/s/o2tp9)
* [![Smile Grid](https://www.react-spring.dev/assets/thumbnail-BgCssH-q.png)

  Smile GridAn animated SVG grid with a smiley face inside!

  + useTrail
  + useChain
  + useSprings
  + useSpringRef
  + svg](https://codesandbox.io/s/uqpn4f)
* [![Wordle](https://www.react-spring.dev/assets/thumbnail-DPkw4ayI.png)

  WordleWordle tiles with useTrail

  + useTrail
  + stitches
  + interpolation](https://codesandbox.io/s/90qj1i)

Can't find what you're looking for? Check out all our [examples!](https://www.react-spring.dev/examples)
