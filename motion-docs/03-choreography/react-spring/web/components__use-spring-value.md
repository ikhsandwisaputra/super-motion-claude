---
source: https://www.react-spring.dev/docs/components/use-spring-value
title: "useSpringValue | React Spring"
fetched: 2026-10-28
---

# [useSpringValue](https://www.react-spring.dev/docs/components/use-spring-value#usespringvalue)

Love the imperative API but you need *too many* different springs running in parallel? Then this
hook is for you! It's a simple wrapper around a [`SpringValue`](https://www.react-spring.dev/docs/components/spring-value) and
therefore behaves the same, so you can access it's methods imperatively.

## [Usage](https://www.react-spring.dev/docs/components/use-spring-value#usage)

### [Value only](https://www.react-spring.dev/docs/components/use-spring-value#value-only)

```tsx
import { useSpringValue, animated } from '@react-spring/web'

function MyComponent() {

const opacity = useSpringValue(0)

return <animated.div style={{ opacity }}>Hello World</animated.div>

}
```

### [With configuration](https://www.react-spring.dev/docs/components/use-spring-value#with-configuration)

```tsx
import { useSpringValue, animated } from '@react-spring/web'

function MyComponent() {

const opacity = useSpringValue(0, {

config: {

mass: 2,

friction: 5,

tension: 80,

},

})

return <animated.div style={{ opacity }}>Hello World</animated.div>

}
```

## [Updating](https://www.react-spring.dev/docs/components/use-spring-value#updating)

Warning

Unlike our other hooks, this one **will not** react to updates in the component. This is by design.
You **must** use the methods on the returned `SpringValue` to update said value.

```tsx
import { useSpringValue, animated } from '@react-spring/web'

function MyComponent() {

const opacity = useSpringValue(0, {

config: {

mass: 2,

friction: 5,

tension: 80,

},

})

const handleClick = () => opacity.start(1)

return (

<animated.div onClick={handleClick} style={{ opacity }}>

Hello World

</animated.div>

)

}
```

## [Reference](https://www.react-spring.dev/docs/components/use-spring-value#reference)

| Prop | Type | Default |
| --- | --- | --- |
| `to` | `object | object[] | function` | – |
| `loop` | `boolean | object | function` | – |
| `delay` | `number | function` | – |
| `immediate` | `boolean | function` | – |
| `reset` | `boolean` | – |
| `reverse` | `boolean` | – |
| `pause` | `boolean` | – |
| `cancel` | `boolean | string | string[] | function` | – |
| `config` | `object | function` | `object` |
| `events` | `function` | – |

## [Typescript](https://www.react-spring.dev/docs/components/use-spring-value#typescript)

```tsx
function useSpringValue<T>(value: T): SpringValue<T>

function useSpringValue<T>(value: T, config: ConfigObject): SpringValue<T>
```

Where `ConfigObject` is described [above](https://www.react-spring.dev/docs/components/use-spring-value#reference)

## [Examples](https://www.react-spring.dev/docs/components/use-spring-value#examples)

* [![MacOS Dock](https://www.react-spring.dev/assets/thumbnail-wzA8TsU0.png)

  MacOS DockA MacOS-esque dock created in HTML with all the animations you'd expect!

  + useSpringValue
  + useSpring
  + interpolation
  + useDrag
  + loop](https://codesandbox.io/s/6zchkl)

Can't find what you're looking for? Check out all our [examples!](https://www.react-spring.dev/examples)
