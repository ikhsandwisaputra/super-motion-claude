---
source: https://www.react-spring.dev/docs/advanced/spring-ref
title: "SpringRef | React Spring"
fetched: 2026-10-28
---

# [SpringRef](https://www.react-spring.dev/docs/advanced/spring-ref#springref)

Our imperative API. You can initialise it via function call, or for better practice use the hook `useSpringRef`.
For more contextual information for this function and why it's so important, see [here](https://www.react-spring.dev/docs/concepts/imperative-api).

## [Usage](https://www.react-spring.dev/docs/advanced/spring-ref#usage)

### [Hook](https://www.react-spring.dev/docs/advanced/spring-ref#hook)

```ts
import { animated, useSpring, useSpringRef } from '@react-spring/web'

function MyComponent() {

const api = useSpringRef()

const props = useSpring({

ref: api,

from: { opacity: 0 },

to: { opacity: 1 },

})

return <animated.div style={props}>Hello World</animated.div>

}
```

### [Function call](https://www.react-spring.dev/docs/advanced/spring-ref#function-call)

```ts
import { Component, createRef } from 'react'

import { Controller, animated, SpringRef } from '@react-spring/web'

class AnimatedComponent extends Component {

isShowing = createRef(false)

api = SpringRef()

animations = new Controller({ opacity: 0, ref: this.api })

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

## [Properties](https://www.react-spring.dev/docs/advanced/spring-ref#properties)

| Prop | Type | Default |
| --- | --- | --- |
| `current` | `Controller[]` | `[]` |

## [Methods](https://www.react-spring.dev/docs/advanced/spring-ref#methods)

### [Add](https://www.react-spring.dev/docs/advanced/spring-ref#add)

Add a controller to this ref.

```ts
add(ctrl: Controller<State>): void
```

### [Delete](https://www.react-spring.dev/docs/advanced/spring-ref#delete)

Remove a controller from this ref.

```ts
delete(ctrl: Controller<State>): void
```

### [Pause](https://www.react-spring.dev/docs/advanced/spring-ref#pause)

Pause some or all animations by passing `SpringValue` keys.

```ts
pause(): this

pause(keys: OneOrMore<string>): this

pause(keys?: OneOrMore<string>): this
```

### [Resume](https://www.react-spring.dev/docs/advanced/spring-ref#resume)

Resume some or all animations by passing `SpringValue` keys.

```ts
resume(): this

resume(keys: OneOrMore<string>): this

resume(keys?: OneOrMore<string>): this
```

### [Set](https://www.react-spring.dev/docs/advanced/spring-ref#set)

Update the state of each controller without animating. Accepts either a partial state object or a
function that returns a partial state object.

```ts
set(values: Partial<State>): void

set(values: (index: number, ctrl: Controller<State>) => Partial<State>): void
```

### [Start](https://www.react-spring.dev/docs/advanced/spring-ref#start)

Start the queued animations of each controller. Alternatively pass a `ControllerUpdate` object to
update the state of each controller before starting the animations. Or pass a function to edit the
`ControllerUpdate` depending on the specific `Controller`.

```ts
start(): AsyncResult<Controller<State>>[]

start(props: ControllerUpdate<State>): AsyncResult<Controller<State>>[]

start(props: ControllerUpdateFn<State>): AsyncResult<Controller<State>>[]

start(

props?: ControllerUpdate<State> | ControllerUpdateFn<State>

): AsyncResult<Controller<State>>[]
```

### [Stop](https://www.react-spring.dev/docs/advanced/spring-ref#stop)

Stop some or all of the animations by passing `SpringValue` keys. Additionall, cancel those animations
by passing a `boolean` as the first argument and the `keys` as the second.

```ts
stop(): this

stop(keys: OneOrMore<string>): this

stop(cancel: boolean): this

stop(cancel: boolean, keys: OneOrMore<string>): this

stop(keys?: OneOrMore<string>): this

stop(cancel: boolean, keys?: OneOrMore<string>): this
```

### [Update](https://www.react-spring.dev/docs/advanced/spring-ref#update)

Add the same props to each controller's update queue. Or alternatively generate separate props for each
controller's update queue with a function.

```ts
update(props: ControllerUpdate<State>): this

update(props: ControllerUpdateFn<State>): this

update(props: ControllerUpdate<State> | ControllerUpdateFn<State>): this
```
