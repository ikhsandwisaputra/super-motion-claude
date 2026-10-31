---
source: https://www.react-spring.dev/docs/utilities/use-scroll
title: "useScroll | React Spring"
fetched: 2026-10-28
---

# [useScroll](https://www.react-spring.dev/docs/utilities/use-scroll#usescroll)

A small utility abstraction around our signature [`useSpring`](https://www.react-spring.dev/docs/components/use-spring) hook. It's a great way to
create a scroll-linked animation. With either the raw value of distance or a 0-1 progress value. You can either use the
scroll values of the whole document, or just a specific element.

## [Usage](https://www.react-spring.dev/docs/utilities/use-scroll#usage)

The example below will start off with an `opacity` of `0` but when the user scrolls to the bottom of the page it will have
reached an `opacity` of `1`.

```tsx
import { useScroll, animated } from '@react-spring/web'

function MyComponent() {

const { scrollYProgress } = useScroll()

return (

<animated.div style={{ opacity: scrollYProgress }}>

Hello World

</animated.div>

)

}
```

## [Reference](https://www.react-spring.dev/docs/utilities/use-scroll#reference)

| Prop | Type | Default |
| --- | --- | --- |
| `container` | `React.MutableRefObject<HTMLElement>` | – |
| `delay` | `number | function` | – |
| `immediate` | `boolean | function` | – |
| `reset` | `boolean` | – |
| `reverse` | `boolean` | – |
| `pause` | `boolean` | – |
| `ref` | `SpringRef` | – |
| `config` | `object | function` | `object` |
| `events` | `function` | – |

## [Typescript](https://www.react-spring.dev/docs/utilities/use-scroll#typescript)

```tsx
function useScroll(configuration: ConfigObject): SpringValues
```

Where `ConfigObject` is described [above](https://www.react-spring.dev/docs/utilities/use-scroll#reference)

## [Examples](https://www.react-spring.dev/docs/utilities/use-scroll#examples)

* [![Scrolling Wave](https://www.react-spring.dev/assets/thumbnail-CO6a97Je.png)

  Scrolling WaveReact to scroll progress and values to create exciting landing pages

  + useScroll
  + interpolation
  + useSpring
  + events](https://codesandbox.io/s/b07dmz)

Can't find what you're looking for? Check out all our [examples!](https://www.react-spring.dev/examples)
