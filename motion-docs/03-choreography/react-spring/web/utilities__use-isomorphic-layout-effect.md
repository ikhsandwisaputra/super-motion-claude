---
source: https://www.react-spring.dev/docs/utilities/use-isomorphic-layout-effect
title: "useIsomorphicLayout | React Spring"
fetched: 2026-10-28
---

# [useIsomorphicLayoutEffect](https://www.react-spring.dev/docs/utilities/use-isomorphic-layout-effect#useisomorphiclayouteffect)

## [Usage](https://www.react-spring.dev/docs/utilities/use-isomorphic-layout-effect#usage)

```tsx
import { animated, useSpring, useIsomorphicLayoutEffect } from '@react-spring/web'

const MyComponent = ({position}) => {

const [springs, api] = useSpring(() => {

y: 0,

x: 0,

}, [])

useIsomorphicLayoutEffect(() => {

api.start({

from: {

x: 0,

y: 0,

},

to: {

x: position.x,

y: position.y,

}

})

},[position])

return <animated.div style={springs} />

}
```

## [Why do we need this?](https://www.react-spring.dev/docs/utilities/use-isomorphic-layout-effect#why-do-we-need-this)

When we want to perform side-effects caused by rendering a component we need to
use [`useEffect`](https://reactjs.org/docs/hooks-reference.html#useeffect) or [`useLayoutEffect`](https://reactjs.org/docs/hooks-reference.html#uselayouteffect).
Now, the latter, `useLayoutEffect` in our opinion, is better for animations because it renders
"before the browser has a chance to paint", therefore if you want to prepare a node e.g. a div
for animation before actually animating it, it's probably better to ensure no paint happens, otherwise
you might get a sort of UI tear where the item suddenly jumps to a new position.

Neither of the above effect hooks run on the server, however, `useLayoutEffect` causes react warnings
when server-side rendering your pages (if you're using nextjs for example). So it encourages you
to move the code to `useEffect`. However, as we described above this isn't best for animations.

## [What does it do?](https://www.react-spring.dev/docs/utilities/use-isomorphic-layout-effect#what-does-it-do)

This is where our `useIsomorphicLayoutEffect` utility hook comes in. By performing a simple (yet robust) check,
the hook correctly returns `useEffect` for server-side environments and `useLayoutEffect` for client-side
environments, thus the best of both worlds in this case.

## [Typescript](https://www.react-spring.dev/docs/utilities/use-isomorphic-layout-effect#typescript)

The type signature will be identical to the signatures of `useEffect` and `useLayoutEffect` installed in
your project, but just to save you time, it's here below:

```ts
function useIsomorphicLayoutEffect(effect: () => (void | () => void), deps?: ReadonlyArray<unknown>)
```
