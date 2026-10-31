---
source: https://www.react-spring.dev/docs/advanced/spring-value
title: "SpringValue | React Spring"
fetched: 2026-10-28
---

# [SpringValue](https://www.react-spring.dev/docs/advanced/spring-value#springvalue)

The very driving force of `react-spring`. It's a class that can be used to create a single
value that can be animated.

## [Usage](https://www.react-spring.dev/docs/advanced/spring-value#usage)

Basic usage, the `SpringValue` class you initialise can be used just like our [`imperative api`](https://www.react-spring.dev/docs/concepts/imperative-api).
Meanwhile you pass the `SpringValue` to your `animated` component. Any type is valid, but only certain types are actually animated.
Types that cannot be animated are basically immediate: true animations. Such types include:
a `boolean`, a display string like `"none"`, etc.

```tsx
import { Component, createRef } from 'react'

import { SpringValue, animated } from '@react-spring/web'

class AnimatedComponent extends Component {

isShowing = createRef(false)

springOpacity = new SpringValue(0)

toggle = () => {

this.springOpacity.start(isShowing ? 0 : 1)

this.isShowing = !this.isShowing

}

render() {

return (

<>

<button onClick={this.toggle}>click</button>

<animated.div style={{ opacity: this.springOpacity }}>

I will fade

</animated.div>

</>

)

}

}
```

## [Properties](https://www.react-spring.dev/docs/advanced/spring-value#properties)

| Prop | Type | Default |
| --- | --- | --- |
| `animation` | `Animation` | `Animation` |
| `defaultProps` | `SpringConfig` | `{}` |
| `goal` | `any` | – |
| `hasAnimated` | `boolean` | `false` |
| `idle` | `boolean` | – |
| `isAnimating` | `boolean` | `false` |
| `isDelayed` | `boolean` | `false` |
| `isPaused` | `boolean` | `false` |
| `key` | `string | undefined` | `undefined` |
| `queue` | `SpringUpdate[]` | `[]` |
| `velocity` | `number | number[]` | – |

## [Methods](https://www.react-spring.dev/docs/advanced/spring-value#methods)

### [Advance](https://www.react-spring.dev/docs/advanced/spring-value#advance)

Advance the current animation by a number of milliseconds.

```ts
advance(dt: number): void;
```

### [Finish](https://www.react-spring.dev/docs/advanced/spring-value#finish)

Skip to the end of the current animation.

```ts
finish(): this;
```

### [Pause](https://www.react-spring.dev/docs/advanced/spring-value#pause)

Freeze the active animation in time, as well as any updates merged before `resume` is called.

```ts
pause(): void;
```

### [Reset](https://www.react-spring.dev/docs/advanced/spring-value#reset)

Restart the animation.

```ts
reset(): void;
```

### [Resume](https://www.react-spring.dev/docs/advanced/spring-value#resume)

Resume the animation if paused.

```ts
resume(): void;
```

### [Set](https://www.react-spring.dev/docs/advanced/spring-value#set)

Set the current value, while stopping the current animation.

```ts
set(value: T | FluidValue<T>): this;
```

### [Start](https://www.react-spring.dev/docs/advanced/spring-value#start)

Update this value's animation using the queue of pending props, and unpause the current
animation (if one is frozen). When arguments are passed, a new animation is created, and
the queued animations are left alone.

```ts
start(): AsyncResult<this>;

start(props: SpringUpdate<T>): AsyncResult<this>;

start(to: T, props?: SpringProps<T>): AsyncResult<this>;
```

### [Stop](https://www.react-spring.dev/docs/advanced/spring-value#stop)

Stop the current animation, and cancel any delayed updates. Pass `true` to call `onRest`
with `cancelled: true`.

```ts
stop(cancel?: boolean): this
```

### [Update](https://www.react-spring.dev/docs/advanced/spring-value#update)

Push props into the pending queue.

```ts
update(props: SpringUpdate<T>): this;
```

## [TS Glossary](https://www.react-spring.dev/docs/advanced/spring-value#ts-glossary)

* [`Animation`](https://www.react-spring.dev/docs/typescript#animation)
* [`SpringUpdate`](https://www.react-spring.dev/docs/typescript#springupdate)
