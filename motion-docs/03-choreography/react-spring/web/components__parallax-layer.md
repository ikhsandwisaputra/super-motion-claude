---
source: https://www.react-spring.dev/docs/components/parallax-layer
title: "Parallax Layer | React Spring"
fetched: 2026-10-28
---

# [Parallax](https://www.react-spring.dev/docs/components/parallax-layer#parallax)

Used in collaboration with [`Parallax`](https://www.react-spring.dev/docs/components/parallax) to create visual displacements declaratively and simply.

## [Usage](https://www.react-spring.dev/docs/components/parallax-layer#usage)

Note

This component is only available in the `@react-spring/web` package and is therefore only usable in the browser.

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

## [Reference](https://www.react-spring.dev/docs/components/parallax-layer#reference)

All props that can be passed to `HTMLDivElement` can be passed to `Parallax`.

| Prop | Type | Default |
| --- | --- | --- |
| `horizontal` | `boolean` | – |
| `factor` | `number` | `1` |
| `offset` | `number` | `0` |
| `speed` | `number` | `0` |
| `sticky` | `StickyConfig` | – |

## [Ref](https://www.react-spring.dev/docs/components/parallax-layer#ref)

Passing a `ref` to the `ParallaxLayer` component will give you access to the layer state of the `ParallaxLayer` component via `ref.current`:

```tsx
interface IParallaxLayer {

horizontal: boolean

sticky: StickyConfig

isSticky: boolean

setHeight(height: number, immediate?: boolean): void

setPosition(height: number, scrollTop: number, immediate?: boolean): void

}

type StickyConfig = { start?: number; end?: number } | undefined
```

## [Examples](https://www.react-spring.dev/docs/components/parallax-layer#examples)

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
