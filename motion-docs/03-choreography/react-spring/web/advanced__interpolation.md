---
source: https://www.react-spring.dev/docs/advanced/interpolation
title: "Interpolation | React Spring"
fetched: 2026-10-28
---

# [Interpolation](https://www.react-spring.dev/docs/advanced/interpolation#interpolation)

## [What is one?](https://www.react-spring.dev/docs/advanced/interpolation#what-is-one)

An interpolation typically is a function that takes a value returns another value. You can even map ranges
of values – numbers are typically required as the input range. So for example, if you want to animate a value
from 0 to 100, you can use an interpolation to map the range 0 to 1 to 0 to 100.

## [Basic Usage](https://www.react-spring.dev/docs/advanced/interpolation#basic-usage)

### [Extending the `SpringValue`](https://www.react-spring.dev/docs/advanced/interpolation#extending-the-springvalue)

The most common use of our interpolation is to convert the value of a `SpringValue` to another value. This is
done by using the `to` method.

```tsx
import { useSpring, animated } from '@react-spring/web'

function MyComponent() {

const props = useSpring({

from: { x: 0 },

to: { x: 360 },

})

return (

<animated.div
      style={{ transform: props.x.to(value => `rotateZ(${value}deg)`) }}
    >

Hello World

</animated.div>

)

}
```

### [Using the `to` function](https://www.react-spring.dev/docs/advanced/interpolation#using-the-to-function)

Similar to the example above, it's also possible to use our `to` function to convert `SpringValue`s.

```tsx
import { useSpring, animated, to } from '@react-spring/web'

function MyComponent() {

const props = useSpring({

from: { x: 0 },

to: { x: 360 },

})

return (

<animated.div
      style={{ transform: to(props.x, value => `rotateZ(${value}deg)`) }}
    >

Hello World

</animated.div>

)

}
```

## [Advanced Usage](https://www.react-spring.dev/docs/advanced/interpolation#advanced-usage)

### [Combining values](https://www.react-spring.dev/docs/advanced/interpolation#combining-values)

A more advanced use of our interpolation is to combine multiple `SpringValue`s. This normally requires the
use of our `to` function to create.

```tsx
import { animated, to, useSpring } from '@react-spring/web'

export default function MyComponent() {

const props = useSpring({

from: { x: 0, y: 0, z: 0 },

to: { x: 1, y: 1, z: 1 },

})

return (

<animated.div
      style={{
        transform: to(
          [props.x, props.y, props.z],
          (x, y, z) => `rotate3d(${x}, ${y}, ${z}, 45deg)`
        ),
      }}
    >

Hello World

</animated.div>

)

}
```

### [Ranges and Outputs](https://www.react-spring.dev/docs/advanced/interpolation#ranges-and-outputs)

The `to` function also accepts a range of input values as the first argument and the output of that range.
Interpolations can be chained, as seen in the example below we change a value `0-1` to `0-360` and then
interpolate it to a rotateZ value.

```tsx
import { useSpring, animated } from '@react-spring/web'

function MyComponent() {

const props = useSpring({

from: { x: 0 },

to: { x: 1 },

})

return (

<animated.div
      style={{
        transform: props.x
          .to([0, 1], [0, 360])
          .to(value => `rotateZ(${value}deg)`),
      }}
    >

Hello World

</animated.div>

)

}
```

## [Config](https://www.react-spring.dev/docs/advanced/interpolation#config)

An interpolation can also take a config object as the second argument if using the `to` function or the first
argument when using the `to` method of a `SpringValue`.

| Prop | Type | Default |
| --- | --- | --- |
| `extrapolateLeft` | `string` | `extend` |
| `extrapolateRight` | `string` | `extend` |
| `extrapolate` | `string` | `extend` |
| `range` | `number[]` | `[0,1]` |
| `output` | `number[]` | – |
| `map` | `function` | `null` |

## [Overriding the global to function](https://www.react-spring.dev/docs/advanced/interpolation#overriding-the-global-to-function)

If you decide to, it is possible to override the global Interpolation factory which is what's called when `to` is used.

```ts
import { Globals } from '@react-spring/web'

Globals.assign({

to: (source, args) => new CustomInterpolation(source, args),

})
```

## [Typescript](https://www.react-spring.dev/docs/advanced/interpolation#typescript)

```ts
function to<Input extends ReadonlyArray<any>, Output>(

parents: Input,

interpolator: (...args: Interpolated<Input>) => Output

): Interpolation<Output>

function to<Input, Output>(

parent: FluidValue<Input> | Input,

interpolator: InterpolatorFn<Input, Output>

): Interpolation<Output>

function to<Out>(

parents: FluidValue[],

config: InterpolatorConfig<Out>

): Interpolation<Animatable<Out>>

function to<Out>(

parents: Array<FluidValue<number>> | FluidValue<number[]>,

range: readonly number[],

output: readonly Constrain<Out, Animatable>[],

extrapolate?: 'identity' | 'clamp' | 'extend'

): Interpolation<Animatable<Out>>
```
