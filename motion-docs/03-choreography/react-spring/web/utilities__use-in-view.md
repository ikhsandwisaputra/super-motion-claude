---
source: https://www.react-spring.dev/docs/utilities/use-in-view
title: "useInView | React Spring"
fetched: 2026-10-28
---

# [useInView](https://www.react-spring.dev/docs/utilities/use-in-view#useinview)

A helpful utility hook tracking the visibility of an element in the viewport. Using the native [`IntersectionObserver`](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API),
you can respond either to a `boolean` signifying that the element has "intersected" or instead pass it a function
returning `SpringValues` to animate the element upon `intersection`.

## [Usage](https://www.react-spring.dev/docs/utilities/use-in-view#usage)

### [Passing nothing or an object](https://www.react-spring.dev/docs/utilities/use-in-view#passing-nothing-or-an-object)

Not passing a function as the first argument the hook therefore assumes you're passing arguments to intialize the `IntersectionObserver`.
If you do pass a function, this argument becomes the second expected (see below).

```tsx
import { useInView, animated } from '@react-spring/web'

function MyComponent() {

const [ref, inView] = useInView()

return <animated.div ref={ref}>{inView ? 'Hello World' : null}</animated.div>

}
```

### [Passing a function](https://www.react-spring.dev/docs/utilities/use-in-view#passing-a-function)

Warning

You must use the `to` and `from` prop to define your animation when returning it from the function.
Passing regular props that typically "become" `SpringValues` will not work.

```tsx
import { useInView, animated } from '@react-spring/web'

function MyComponent() {

const [ref, springs] = useInView(

() => ({

from: {

opacity: 0,

y: 100,

},

to: {

opacity: 1,

y: 0,

},

}),

{

rootMargin: '-40% 0%',

}

)

return (

<animated.div ref={ref} style={springs}>

Hello World

</animated.div>

)

}
```

## [References](https://www.react-spring.dev/docs/utilities/use-in-view#references)

### [IntersectionArgs](https://www.react-spring.dev/docs/utilities/use-in-view#intersectionargs)

The below table describes the `IntersectionArgs` object the hook accepts.

| Prop | Type | Default |
| --- | --- | --- |
| `amount` | `"any" | "all" | number | number[]` | `any` |
| `root` | `React.MutableRefObject` | – |
| `rootMargin` | `string` | – |
| `once` | `boolean` | `false` |

### [SpringProps](https://www.react-spring.dev/docs/utilities/use-in-view#springprops)

The reference below describes the return value of the optional function argument.

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
| `config` | `object | function` | `object` |
| `events` | `function` | – |

## [Typescript](https://www.react-spring.dev/docs/utilities/use-in-view#typescript)

```tsx
interface IntersectionArgs

extends Omit<IntersectionObserverInit, 'root' | 'threshold'> {

root?: React.MutableRefObject<HTMLElement>

once?: boolean

amount?: 'any' | 'all' | number | number[]

}

function useInView(

args?: IntersectionArgs

): [ref: RefObject<any>, isInView: boolean]

function useInView<Props extends object>(

props: () => Props & Valid<Props, UseSpringProps<Props>>,

args?: IntersectionArgs

): [ref: RefObject<any>, springs: SpringValues]
```

Where `ConfigObject` is described [above](https://www.react-spring.dev/docs/utilities/use-in-view#reference)

## [Examples](https://www.react-spring.dev/docs/utilities/use-in-view#examples)

* [![Popup Modal](https://www.react-spring.dev/assets/thumbnail-HBJlQXCa.png)

  Popup ModalAnimate on intersections with the viewport

  + useInView
  + useSpring
  + Windows95
  + styled-components](https://codesandbox.io/s/ycouuu)

Can't find what you're looking for? Check out all our [examples!](https://www.react-spring.dev/examples)
