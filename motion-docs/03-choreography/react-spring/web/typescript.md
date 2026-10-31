---
source: https://www.react-spring.dev/docs/typescript
title: "Typescript | React Spring"
fetched: 2026-10-28
---

# [Typescript Glossary](https://www.react-spring.dev/docs/typescript#typescript-glossary)

## [Animation](https://www.react-spring.dev/docs/typescript#animation)

An animation being executed by the frameloop. Normally found attached to a [`SpringValue`](https://www.react-spring.dev/docs/advanced/spring-value).

```ts
class Animation<T = any> {

changed: boolean

values: readonly AnimatedValue[]

toValues: readonly number[] | null

fromValues: readonly number[]

to: T | FluidValue<T>

from: T | FluidValue<T>

config: AnimationConfig

immediate: boolean

}
```

## [AnimationProps](https://www.react-spring.dev/docs/typescript#animationprops)

Most of the reserved animation props, except `to`, `from`, `loop`, and the event props.

```ts
interface AnimationProps<T = any> {

config?: SpringConfig | ((key: StringKeys<T>) => SpringConfig)

delay?: number | ((key: StringKeys<T>) => number)

immediate?: MatchProp<T>

cancel?: MatchProp<T>

pause?: MatchProp<T>

reset?: MatchProp<T>

reverse?: boolean

default?: boolean | SpringProps<T>

}
```

## [ControllerUpdate](https://www.react-spring.dev/docs/typescript#controllerupdate)

A value that any `SpringValue` or `Controller` can animate to.

```ts
export declare type ControllerUpdate<
  State extends Lookup = Lookup,
  Item = undefined,
> = unknown & ToProps<State> & ControllerProps<State, Item>
```

## [Lookup](https://www.react-spring.dev/docs/typescript#lookup)

`Lookup` is typically inferred, so you probably won't need to use it.
It's primarily used to infer the animatable properties from our hooks, e.g. `opacity`

```ts
interface Lookup<T = any> {

[key: string]: T

}
```

## [OneOrMore](https://www.react-spring.dev/docs/typescript#oneormore)

```ts
export type OneOrMore<T> = T | readonly T[]
```

## [SpringUpdate](https://www.react-spring.dev/docs/typescript#springupdate)

The props of a `useSpring` call or its async `update` function. The `T` parameter can
be a set of animated values (as an object type) or a primitive type for a single
animated value.

```ts
type SpringUpdate<T = any> = ToProps<T> & SpringProps<T>

type SpringsUpdate<State extends Lookup = UnknownProps> =

| OneOrMore<ControllerUpdate<State>>

| ((index: number, ctrl: Controller<State>) => ControllerUpdate<State> | null)
```

## [SpringValues](https://www.react-spring.dev/docs/typescript#springvalues)

`SpringValues` is contextual to the values you pass to your hook e.g. `opacity`.
It's type signature is quite complicated, so it's easier to show how you use it.

```ts
type MySpringValues = SpringValues<{

opacity: number

y: string

}>
```

### [Passing animated styles to a child component](https://www.react-spring.dev/docs/typescript#passing-animated-styles-to-a-child-component)

`SpringValues` is **not** `React.CSSProperties`. Each entry is a `SpringValue`
instance, not the underlying primitive — so a prop typed as `CSSProperties` will
reject them. Type the receiving prop as `SpringValues` instead:

```tsx
import { animated, SpringValues, useTransition } from '@react-spring/web'

const Item = ({ styles }: { styles: SpringValues<{ opacity: number }> }) => (

<animated.div style={styles}>Hello</animated.div>

)
```

### [Widening literal values](https://www.react-spring.dev/docs/typescript#widening-literal-values)

`useSpring` infers each value's type from your config. A ternary like
`showMenu ? 'all' : 'none'` widens to `string`, which doesn't satisfy a literal
union such as `CSSProperties['pointerEvents']`. Narrow the value at the call
site:

```tsx
const styles = useSpring({

opacity: showMenu ? 1 : 0,

pointerEvents: showMenu ? ('all' as const) : ('none' as const),

})
```

## [TransitionState](https://www.react-spring.dev/docs/typescript#transitionstate)

`TransitionState` is the internal state attached to a particular `Item`
(a single datum from the data array you pass).

```ts
interface TransitionState<Item = any, State extends Lookup = Lookup> {

key: any

item: Item

ctrl: Controller<State>

phase: TransitionPhase

expired?: boolean

expirationId?: number

}
```

## [UnknownProps](https://www.react-spring.dev/docs/typescript#unknownprops)

Intersected with other object types to allow for unknown properties.

```ts
export interface UnknownProps extends Lookup<unknown> {}
```
