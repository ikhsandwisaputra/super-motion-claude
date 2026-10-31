---
source: https://www.react-spring.dev/docs/advanced/config
title: "Spring Configs | React Spring"
fetched: 2026-10-28
---

# [Spring Configs](https://www.react-spring.dev/docs/advanced/config#spring-configs)

Part of a component's `configuration` argument, the `config` prop is an object
with many properties that can be used to customize & fine tune your animations.
It directly controls how your springs behave and can customized on a spring by
spring basis (e.g. `opacity` and `scale` could be different for one `useSpring` hook).

## [Usage](https://www.react-spring.dev/docs/advanced/config#usage)

### [Basic Usage](https://www.react-spring.dev/docs/advanced/config#basic-usage)

Your most typical usage of the `config` prop is to edit the mass, friction and tension properties.

```jsx
import { useSpring, animated } from '@react-spring/web'

const MyComponent = () => {

const [springs, api] = useSpring(

() => ({

y: 0,

config: {

mass: 5,

friction: 120,

tension: 120,

},

}),

[]

)

return <animated.div style={springs} />

}
```

### [Config per SpringValue](https://www.react-spring.dev/docs/advanced/config#config-per-springvalue)

The `config` prop can also be a function where the argument is the key of the
spring value, this is great if you want one spring to control many elements or
have properties behave in different ways like a smooth opacity change but a
bouncy scale.

```jsx
import { useSpring, animated } from '@react-spring/web'

const MyComponent = () => {

const [springs, api] = useSpring(

() => ({

backgroundColor: '#00ff00',

y: 0,

config: key => {

if (key === 'y') {

return {

mass: 5,

friction: 120,

tension: 120,

}

}

return {}

},

}),

[]

)

return <animated.div style={springs} />

}
```

Returning an empty object will enforce the default config options:
`{ mass: 1, tension: 170, friction: 26 }`.

### [Partial Updates](https://www.react-spring.dev/docs/advanced/config#partial-updates)

When using the spring `api` you can partially update your configs.
These partial configs are merged with the original config for each
call of the api.

```jsx
import { useSpring, animated } from '@react-spring/web'

const MyComponent = () => {

const [springs, api] = useSpring(

() => ({

y: 0,

config: {

mass: 5,

friction: 120,

tension: 120,

},

}),

[]

)

const handleClick = () => {

api.start({

y: 20,

config: {

friction: 10,

},

})

}

return <animated.div onClick={handleClick} style={springs} />

}
```

### [Presets](https://www.react-spring.dev/docs/advanced/config#presets)

Additionally to being able to configure your own spring, we export a
small selection of presets enclosed in the `config` named export.

```jsx
import { config } from '@react-spring/web'
```

The presets are:

default –
:   `{ tension: 170, friction: 26 }`

gentle –
:   `{ tension: 120, friction: 14 }`

wobbly –
:   `{ tension: 180, friction: 12 }`

stiff –
:   `{ tension: 210, friction: 20 }`

slow –
:   `{ tension: 280, friction: 60 }`

molasses –
:   `{ tension: 280, friction: 120 }`

## [Config Visualizer](https://www.react-spring.dev/docs/advanced/config#config-visualizer)

[Open Sandbox](https://codesandbox.io/api/v1/sandboxes/define?undefined&environment=create-react-app "Open in CodeSandbox")

## [Easings](https://www.react-spring.dev/docs/advanced/config#easings)

Easings can **only** be used in conjunction with the `duration` property.

### [Why Springs?](https://www.react-spring.dev/docs/advanced/config#why-springs)

We think of animation in terms of time and curves, but that causes most of the struggle we face
when trying to make elements on the screen move naturally, because nothing in the real world
moves like that. Springs don’t have a defined curve or a set duration.

As Andy Matuschak (ex Apple UI-Kit developer) expressed – “Animation APIs parameterized by duration
and curve are fundamentally opposed to continuous, fluid interactivity.”

### [Available generic easings](https://www.react-spring.dev/docs/advanced/config#available-generic-easings)

All the following easings are part of the `easings` object imported like so:

```jsx
import { easings } from '@react-spring/web'
```

|
|  |
| `easeInBack` | `easeOutBack` | `easeInOutBack` |
| `easeInBounce` | `easeOutBounce` | `easeOutBounce` |
| `easeInCirc` | `easeOutCirc` | `easeOutCirc` |
| `easeInCubic` | `easeOutCubic` | `easeOutCubic` |
| `easeInElastic` | `easeOutElastic` | `easeOutElastic` |
| `easeInExpo` | `easeOutExpo` | `easeOutExpo` |
| `easeInQuad` | `easeOutQuad` | `easeOutQuad` |
| `easeInQuart` | `easeOutQuart` | `easeOutQuart` |
| `easeInQuint` | `easeOutQuint` | `easeOutQuint` |
| `easeInSine` | `easeOutSine` | `easeOutSine` |

### [Steps easing](https://www.react-spring.dev/docs/advanced/config#steps-easing)

This unique easing function returns the standard `EasingFunction` a `config` object expects. Its still part
of the `easings` object but you need to set it up before passing.

```jsx
import { easings } from '@react-spring/web'

const MyComponent = () => {

const [springs, api] = useSpring(

() => ({

y: 0,

config: {

easing: easings.steps(5),

},

}),

[]

)

return <animated.div style={springs} />

}
```

It can also take a `Direction` as a second argument, which can be either `start` or `end`. The signature
for the function is shown below:

```ts
export function steps(

steps: number,

direction: Direction = 'end'

): EasingFunction
```

## [Reference](https://www.react-spring.dev/docs/advanced/config#reference)

| Prop | Type | Default |
| --- | --- | --- |
| `mass` | `number` | `1` |
| `tension` | `number` | `170` |
| `friction` | `number` | `26` |
| `bounce` | `number` | – |
| `clamp` | `boolean` | `false` |
| `precision` | `number` | `0.01` |
| `round` | `boolean` | – |
| `frequency` | `number` | – |
| `damping` | `number` | `1` |
| `velocity` | `number` | `0` |
| `restVelocity` | `number` | – |
| `decay` | `number | boolean` | `false` |
| `duration` | `number` | – |
| `easing` | `function` | `t => t` |
| `progress` | `number` | `0` |

## [Pitfalls](https://www.react-spring.dev/docs/advanced/config#pitfalls)

### [My animation jumps at the end.](https://www.react-spring.dev/docs/advanced/config#my-animation-jumps-at-the-end)

In some instances such as animating `threejs` the items can feel as if they skip the
last couple of frames. This is because the precision prop has a default value of `0.01`.
Try editing this value to be `0.0001` to resolve this.

### [My animation is bouncing and I just want it to stop.](https://www.react-spring.dev/docs/advanced/config#my-animation-is-bouncing-and-i-just-want-it-to-stop)

Sometimes you want a snapping feel so you create a sharp spring. When you animate the spring
the animation bounces around, this is because of the physics. An easy solution to this is to
set `clamp` to true. Your spring will stop animating at the point it hit's it's goal value.
