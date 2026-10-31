---
source: https://www.react-spring.dev/docs/components/parallax
title: "Parallax | React Spring"
fetched: 2026-10-28
---

# [Parallax](https://www.react-spring.dev/docs/components/parallax#parallax)

Used in collaboration with [`ParallaxLayer`](https://www.react-spring.dev/docs/components/parallax-layer) to create visual displacements declaratively and simply.

## [Usage](https://www.react-spring.dev/docs/components/parallax#usage)

Note

This component is only available in the `@react-spring/web` package and is therefore only usable in the browser.

The `Parallax` component creates a scrollable container in which `ParallaxLayer`s can be placed or `React.Fragment`s whose only
direct `children` are `ParallaxLayer`s. Because `Parallax` is a scrollable container all scroll events are fired from the container
itself therefore, listening for scroll on `window` won't work. However, if you want to attach additional events you *can* use [`ref.current.container`](https://www.react-spring.dev/docs/components/parallax#ref)

```jsx
import { Parallax, ParallaxLayer } from '@react-spring/parallax'

function MyComponent() {

return (

<Parallax pages={1} style={{ top: '0', left: '0' }}>

<ParallaxLayer offset={0} speed={2.5}>

<p>Parallax</p>

</ParallaxLayer>

</Parallax>

)

}
```

## [Reference](https://www.react-spring.dev/docs/components/parallax#reference)

All props that can be passed to `HTMLDivElement` can be passed to `Parallax`.

| Prop | Type | Default |
| --- | --- | --- |
| `pages` | `number` | – |
| `config` | `object | function` | `object` |
| `enabled` | `boolean` | `true` |
| `horizontal` | `boolean` | `false` |
| `innerStyle` | `CSSProperties` | – |

## [Ref](https://www.react-spring.dev/docs/components/parallax#ref)

Passing a `ref` to the `Parallax` component will give you access to the internal state of the `Parallax` component via `ref.current`:

```tsx
interface IParallax {

config: ConfigProp

horizontal: boolean

busy: boolean

space: number

offset: number

current: number

controller: Controller<{ scroll: number }>

layers: Set<IParallaxLayer>

container: React.MutableRefObject<any>

content: React.MutableRefObject<any>

scrollTo(offset: number): void

update(): void

stop(): void

}
```

## [Examples](https://www.react-spring.dev/docs/components/parallax#examples)

Can't find what you're looking for? Check out all our [examples!](https://www.react-spring.dev/examples)

* [![Horizontal Parallax](https://www.react-spring.dev/assets/thumbnail-Y64lJy6p.png)

  Horizontal ParallaxThe real test of a parallax component, horizontal scrolling

  + Parallax
  + horizontal](https://codesandbox.io/s/3zqcj)
* [![Sticky Parallax](https://www.react-spring.dev/assets/thumbnail-BD2Q5Tsi.png)

  Sticky ParallaxShowcasing the sticky prop used with the Parallax component

  + Parallax
  + sticky](https://codesandbox.io/s/3hsg6)
* [![Vertical Parallax](https://www.react-spring.dev/assets/thumbnail-BZlfWGnh.png)

  Vertical ParallaxShowcasing a basic use of vertical parallax

  + Parallax
  + vertical](https://codesandbox.io/s/h1rrv)
