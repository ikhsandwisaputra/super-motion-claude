---
source: https://www.react-spring.dev/docs/components/use-spring
title: "useSpring | React Spring"
fetched: 2026-10-28
---

# [useSpring](https://www.react-spring.dev/docs/components/use-spring#usespring)

Our flagship hook. Applicable to most use-cases. If you want to orchestrate many of these hooks, consider using [`useSprings`](https://www.react-spring.dev/docs/components/use-springs).

## [Usage](https://www.react-spring.dev/docs/components/use-spring#usage)

Whether you're using a function or not, it's all about passing a config object to the hook.

### [With a function & deps](https://www.react-spring.dev/docs/components/use-spring#with-a-function--deps)

```jsx
import { useSpring, animated } from '@react-spring/web'

function MyComponent() {

const [props, api] = useSpring(

() => ({

from: { opacity: 0 },

to: { opacity: 1 },

}),

[]

)

return <animated.div style={props}>Hello World</animated.div>

}
```

### [With a config object](https://www.react-spring.dev/docs/components/use-spring#with-a-config-object)

```jsx
import { useSpring, animated } from '@react-spring/web'

function MyComponent() {

const props = useSpring({

from: { opacity: 0 },

to: { opacity: 1 },

})

return <animated.div style={props}>Hello World</animated.div>

}
```

## [Reference](https://www.react-spring.dev/docs/components/use-spring#reference)

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

## [Typescript](https://www.react-spring.dev/docs/components/use-spring#typescript)

```tsx
function useSpring(configuration: ConfigObject): SpringValues

function useSpring(

configurationFn: () => ConfigObject,

deps?: any[]

): [springs: SpringValues, api: SpringRef]
```

Where `ConfigObject` is described [above](https://www.react-spring.dev/docs/components/use-spring#reference)

### [TS Glossary](https://www.react-spring.dev/docs/components/use-spring#ts-glossary)

* [`SpringValues`](https://www.react-spring.dev/docs/typescript#springvalues)

## [Examples](https://www.react-spring.dev/docs/components/use-spring#examples)

* [![Animating Auto](https://www.react-spring.dev/assets/thumbnail-DB6TQNSA.png)

  Animating AutoAnimating widths with react-spring, use-measure and interpolation

  + useSpring
  + useMeasure
  + auto
  + width
  + interpolation](https://codesandbox.io/s/ucvbf)
* [![Card](https://www.react-spring.dev/assets/thumbnail-B6Rk8wVD.png)

  CardAnimating images on a card with react-spring and use-gesture.

  + useSpring
  + interpolation
  + useGesture
  + scrolling
  + cards](https://codesandbox.io/s/pf74x)
* [![Chaining Transition and a Spring](https://www.react-spring.dev/assets/thumbnail-CVbbM9GG.png)

  Chaining Transition and a SpringOrchestrating a useTransition and useSpring hook with the useChain hook.

  + useTransition
  + useSpring
  + useChain
  + SpringRef](https://codesandbox.io/s/q6ffu)
* [![CSS Gradients](https://www.react-spring.dev/assets/thumbnail-C5_A_-xZ.png)

  CSS GradientsUse interpolations & easings to create the CSS gradients you've been seeing all over the web.

  + useSpring
  + interpolation
  + leva
  + css
  + gradients](https://codesandbox.io/s/xg8jhi)
* [![CSS Keyframes](https://www.react-spring.dev/assets/thumbnail-CT0Ar5KR.png)

  CSS KeyframesSimulating CSS keyframes with interpolations

  + useSpring
  + interpolation
  + css
  + keyframes](https://codesandbox.io/s/9c5jx)
* [![Exit Before Enter](https://www.react-spring.dev/assets/thumbnail-BEFhfBxr.png)

  Exit Before EnterShowcasing the exitBeforeEnter prop and animated clip-paths to give a wipe effect

  + useTransition
  + useSpring
  + exitBeforeEnter
  + paths
  + SpringRef](https://codesandbox.io/s/exkei)
* [![Flip Card](https://www.react-spring.dev/assets/thumbnail-CgXwgXfs.png)

  Flip CardUsing interpolations & CSS 3D create a flip card effect

  + css
  + 3D
  + useSpring
  + interpolation](https://codesandbox.io/s/cju2d)
* [![Floating Button](https://www.react-spring.dev/assets/thumbnail-DSlcxb-d.png)

  Floating ButtonA small floating button like Facebook's desktop messenger built with radix & stitches

  + use-gesture
  + useSpring
  + useSprings
  + interpolation
  + stitches
  + radix-ui](https://codesandbox.io/s/dqxvqu)
* [![Popup Modal](https://www.react-spring.dev/assets/thumbnail-HBJlQXCa.png)

  Popup ModalAnimate on intersections with the viewport

  + useInView
  + useSpring
  + Windows95
  + styled-components](https://codesandbox.io/s/ycouuu)
* [![Native Slide](https://www.react-spring.dev/assets/thumbnail-H9cUA4hY.png)

  Native SlideA native-esque slider component animated with useSpring and useDrag

  + useSpring
  + useDrag
  + native
  + interpolation](https://codesandbox.io/s/3filx)
* [![Noise](https://www.react-spring.dev/assets/thumbnail-Jaz9xVbM.png)

  NoiseCreate noise with just a small image and useSpring

  + useSpring
  + easing
  + steps
  + interpolation](https://codesandbox.io/s/ggyzkv)
* [![Rocket decay](https://www.react-spring.dev/assets/thumbnail-B4sCK_i8.png)

  Rocket decayCreate intertia with the velocity and decay config options combined with interpolation

  + velocity
  + intertia
  + decay
  + interpolation
  + useSpring
  + useDrag](https://codesandbox.io/s/ko4c6)
* [![Svg Filter](https://www.react-spring.dev/assets/thumbnail-CBf-Isgr.png)

  Svg FilterAnimating SVG filter nodes to distort a path

  + useSpring
  + svg
  + filters
  + path](https://codesandbox.io/s/mvxd3)
* [![Tree List](https://www.react-spring.dev/assets/thumbnail-BeGwt6ql.png)

  Tree ListAnimated tree styled menu list

  + useSpring
  + useMeasure
  + tree
  + menu
  + list](https://codesandbox.io/s/nlzui)

Can't find what you're looking for? Check out all our [examples!](https://www.react-spring.dev/examples)
