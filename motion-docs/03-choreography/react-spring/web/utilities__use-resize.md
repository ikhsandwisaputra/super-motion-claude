---
source: https://www.react-spring.dev/docs/utilities/use-resize
title: "useResize | React Spring"
fetched: 2026-10-28
---

# [useResize](https://www.react-spring.dev/docs/utilities/use-resize#useresize)

A small abstraction around the [`useSpring`](https://www.react-spring.dev/docs/components/use-spring) hook. It returns a `SpringValues`
object with the `width` and `height` of the element it's attached to & doesn't necessarily have to be attached
to the window, by passing a `container` you can observe that element's size instead.

## [Usage](https://www.react-spring.dev/docs/utilities/use-resize#usage)

```tsx
import { useResize, animated } from '@react-spring/web'

function MyComponent() {

const { width, height } = useResize()

return <animated.div style={{ width, height }}>Hello World</animated.div>

}
```

## [Reference](https://www.react-spring.dev/docs/utilities/use-resize#reference)

| Prop | Type | Default |
| --- | --- | --- |
| `container` | `React.MutableRefObject<HTMLElement | null | undefined>` | – |
| `delay` | `number | function` | – |
| `immediate` | `boolean | function` | – |
| `reset` | `boolean` | – |
| `reverse` | `boolean` | – |
| `pause` | `boolean` | – |
| `ref` | `SpringRef` | – |
| `config` | `object | function` | `object` |
| `events` | `function` | – |

## [Typescript](https://www.react-spring.dev/docs/utilities/use-resize#typescript)

```tsx
function useResize(configuration: ConfigObject): SpringValues
```

Where `ConfigObject` is described [above](https://www.react-spring.dev/docs/utilities/use-resize#reference)
