---
source: https://www.react-spring.dev/docs/advanced/events
title: "Events | React Spring"
fetched: 2026-10-28
---

# [Events](https://www.react-spring.dev/docs/advanced/events#events)

There are a handful of events you can use to react to the state of animation at certain points in time.

## [Keys vs Springs](https://www.react-spring.dev/docs/advanced/events#keys-vs-springs)

Every event function can either be a function on it's own or be an object to which it's keys correlate
to the keys of the spring:

```jsx
useSpring(

() => ({

x: 0,

y: 0,

// onStart is called when the animation of the spring starts

onStart: () => console.log('the spring has started'),

}),

[]

)

useSpring(

() => ({

x: 0,

y: 0,

onStart: {

// onStart is called for each key when the animation starts

x: () => console.log('x key has started'),

y: () => console.log('y key has started'),

},

}),

[]

)
```

The latter form can be useful if for example you have different configs for different keys.
Or you want to do different events based on different keys, e.g. you want to imperatively
update an objects rotation based on the x key.

## [onStart](https://www.react-spring.dev/docs/advanced/events#onstart)

Called when the animation begins.

Warning

`onStart` is called after the first animation tick, this value is therefore considered dirty.

```ts
type OnStart = (

result: AnimationResult,

spring: Controller | SpringValue,

item?: Item

) => void
```

## [onChange](https://www.react-spring.dev/docs/advanced/events#onchange)

Called on every frame.

```ts
type OnChange = (

result: AnimationResult,

spring: Controller | SpringValue,

item?: Item

) => void
```

## [onRest](https://www.react-spring.dev/docs/advanced/events#onrest)

Called when the animation comes to a stand-still.

```ts
type OnRest = (

result: AnimationResult,

spring: Controller | SpringValue,

item?: Item

) => void
```

## [onPause](https://www.react-spring.dev/docs/advanced/events#onpause)

Called when the animation is paused.

```ts
type OnPause = (

result: AnimationResult,

spring: Controller | SpringValue,

item?: Item

) => void
```

## [onResume](https://www.react-spring.dev/docs/advanced/events#onresume)

Called when the animation is resumed.

```ts
type OnResume = (

result: AnimationResult,

spring: Controller | SpringValue,

item?: Item

) => void
```

## [onResolve](https://www.react-spring.dev/docs/advanced/events#onresolve)

Called when the promise for the update is resolved.

```ts
type OnResolve = (

result: AnimationResult,

spring: Controller | SpringValue,

item?: Item

) => void
```

## [onProps](https://www.react-spring.dev/docs/advanced/events#onprops)

Called after an animation is updated by new props, even if the animation remains idle.

```ts
type OnProps = (

props: {[key: string]: any}

spring: SpringValue,

) => void
```

## [onDestroyed](https://www.react-spring.dev/docs/advanced/events#ondestroyed)

Called after a transition item is unmounted.

```ts
type OnDestroyed = (

item: Item

key: string | number

) => void
```

## [Typescript](https://www.react-spring.dev/docs/advanced/events#typescript)

```ts
interface AnimationResult {

// Type inference will solve this for you.

value: SpringValue | { [keyof SpringValues]: number} | number

finished: boolean

cancelled: boolean

}
```

### [A note on `Item`](https://www.react-spring.dev/docs/advanced/events#a-note-on-item)

The `Item` argument is only present when using the relevant events within the [`useTransition`](https://www.react-spring.dev/docs/components/use-transition) hook.
