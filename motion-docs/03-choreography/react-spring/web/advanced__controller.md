---
source: https://www.react-spring.dev/docs/advanced/controller
title: "Controller | React Spring"
fetched: 2026-10-28
---

# [Controller](https://www.react-spring.dev/docs/advanced/controller#controller)

Manages [`SpringValue`s](https://www.react-spring.dev/docs/advanced/spring-value) for our spring hooks.

## [Usage](https://www.react-spring.dev/docs/advanced/controller#usage)

Basic usage, the Controller class you initialise can be used as an [`imperative api`](https://www.react-spring.dev/docs/concepts/imperative-api)
to control your `SpringValues`. Meanwhile you pass `Controller.springs` to your `animated` component.

```tsx
import { Component, createRef } from 'react'

import { Controller, animated } from '@react-spring/web'

class AnimatedComponent extends Component {

isShowing = createRef(false)

animations = new Controller({ opacity: 0 })

toggle = () => {

this.animations.start({ opacity: this.isShowing ? 1 : 0 })

this.isShowing = !this.isShowing

}

render() {

return (

<>

<button onClick={this.toggle}>click</button>

<animated.div style={this.animations.springs}>I will fade</animated.div>

</>

)

}

}
```

### [Constructor Arguments](https://www.react-spring.dev/docs/advanced/controller#constructor-arguments)

Below is the arguments that can passed to the constructor of the `Controller` class.

```ts
const ControllerProps = {

ref,

from,

loop,

onStart,

onRest,

onChange,

onPause,

onResume,

onProps,

onResolve,

}
```

## [Properties](https://www.react-spring.dev/docs/advanced/controller#properties)

| Prop | Type | Default |
| --- | --- | --- |
| `idle` | `SpringValues` | `{}` |
| `item` | `any` | – |
| `queue` | `ControllerQueue` | `[]` |
| `ref` | `SpringRef` | – |
| `springs` | `SpringValues` | `{}` |

## [Methods](https://www.react-spring.dev/docs/advanced/controller#methods)

### [Get](https://www.react-spring.dev/docs/advanced/controller#get)

Gets the current values of our springs.

```ts
get(): State & UnknownProps;
```

### [Set](https://www.react-spring.dev/docs/advanced/controller#set)

Set the current values without animating.

```ts
set(values: Partial<State>): void;
```

### [Update](https://www.react-spring.dev/docs/advanced/controller#update)

Push an update onto the queue of each value.

```ts
update(props: ControllerUpdate<State> | Falsy): this;
```

### [Start](https://www.react-spring.dev/docs/advanced/controller#start)

Start the queued animations for every spring, and resolve the returned promise once all queued
animations have finished or been cancelled. When you pass a queue (instead of nothing), that
queue is used instead of the queued animations added with the `update` method, which are left alone.

```ts
start(props?: OneOrMore<ControllerUpdate<State>> | null): AsyncResult<this>;
```

### [Stop](https://www.react-spring.dev/docs/advanced/controller#stop)

Stop all queued animations for every spring at the same time, or alternatively provide a selection
of keys that should be stopped.

```ts
stop(): this;

stop(keys: OneOrMore<string>): this;

stop(cancel: boolean): this;

stop(cancel: boolean, keys: OneOrMore<string>): this;

stop(keys?: OneOrMore<string>): this;

stop(cancel: boolean, keys?: OneOrMore<string>): this;
```

### [Pause](https://www.react-spring.dev/docs/advanced/controller#pause)

Freeze the active animation in time.

```ts
pause(keys?: OneOrMore<string>): this;
```

### [Resume](https://www.react-spring.dev/docs/advanced/controller#resume)

Resume the animation if paused.

```ts
resume(keys?: OneOrMore<string>): this;
```

### [Each](https://www.react-spring.dev/docs/advanced/controller#each)

Call a function once per spring value.

```ts
each(iterator: (spring: SpringValue, key: string) => void): void
```
