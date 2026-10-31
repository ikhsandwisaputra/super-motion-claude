---
source: https://rive.app/docs/scripting/api-reference/promise/promise
title: "Promise"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Promise

A value that will be available in the future.
Use `andThen` to register callbacks, or `await` inside `async` to
suspend until the value is ready.
Supports cancellation: call `cancel()` to abort pending work and
propagate cancellation to chained promises.

## Fields

### `andThen`

Register a callback for when the promise fulfills.
The handler may return a value that becomes the next promise's result.

## Constructors

### `new`

```lua theme={null}
new(executor: (resolve:(value: T) ->(), reject:(error: any) ->(), onCancel:(hook:() ->()) ->()) ->()) -> Promise<T>
```

Create a new promise with an executor function.
The executor receives resolve, reject, and onCancel callbacks.

### `resolve`

```lua theme={null}
resolve(value: T?) -> Promise<T>
```

Create an already-resolved promise. Resolves with nil if no value given.

### `reject`

```lua theme={null}
reject(error: any?) -> Promise<T>
```

Create an already-rejected promise. Error can be any Lua value.
Rejects with "rejected" if no argument is provided.

### `all`

```lua theme={null}
all(promises: {Promise<T>}) -> Promise<{T}>
```

Wait for all promises to resolve; rejects if any rejects.
On rejection, the remaining promises that nothing else waits on are
cancelled.

## Methods

### `catch`

```lua theme={null}
catch(onRejected: (error: any) -> any) -> any
```

Register a callback for when the promise rejects.
Errors can be any Lua value (string, table, number, etc.).

### `finally`

```lua theme={null}
finally(onFinally: () ->()) -> Promise<T>
```

Register a callback that runs whether the promise fulfills or rejects.

### `cancel`

```lua theme={null}
cancel() -> Promise<T>
```

Cancel this promise. Fires the onCancel hook (if registered),
propagates cancellation down to chained promises, and propagates
up to the parent if all its consumers are cancelled.
No-op if the promise is already settled.

### `onCancel`

```lua theme={null}
onCancel(hook: () ->()) -> Promise<T>
```

Register a cancellation hook that fires when cancel() is called.
Used to clean up in-flight work (e.g. abort a network request).
Replaces any hook registered before.

### `getStatus`

```lua theme={null}
getStatus() -> string
```

Returns the current state: "Pending", "Fulfilled", "Rejected", or "Cancelled".
