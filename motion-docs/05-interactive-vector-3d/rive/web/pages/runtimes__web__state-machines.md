---
source: https://rive.app/docs/runtimes/web/state-machines
title: "State Machine Playback"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# State Machine Playback

Playing a state machine

For more information on designing and building state machines in the Rive editor, please refer to [State Machine Overview](/docs/editor/state-machine).

A Rive state machine is a set of animation states and the transitions between them. At runtime there is limited ability to observe or modify the state directly. This is by design, as this would limit the ability of a designer in Rive to modify the state machine without creating breaking changes. Instead, state machines are indirectly controlled through transitions conditioned on [Data Binding](data-binding) properties.

A designer assigns a default state machine for each artboard in the Rive editor. They may create multiple state machines, each representing a different configuration of states and transitions. When rendering a Rive file and artboard, you may choose which state machine to play. If no state machine is specified, the default state machine for that artboard is used.

## Controlling playback

State machines play by "advancing" over time. This is done once per frame by the amount of time between frames. For example, for a graphic running at 60 frames per second, the state machine would be advanced by approximately 16.67 milliseconds (1/60th of a second) each frame. This advancing evaluates keyframes, transitions, data bindings changes, and ultimately the visible artboard elements to create the illusion of motion over time.

This runtime provides a way to control whether the state machine is playing. When paused or stopped, the state machine does not advance and the last rendered frame remains visible. When playing from pause, the state machine resumes from where it left off, whereas when playing from stop, it restarts from the entry state.

In addition to the paused/stopped state, state machines may also "settle". This is an optimization where the Rive runtime detects that no further changes will occur (for example, if there are no active transitions or animations). While settled the state machine will also stop advancing. This improves performance and energy use by avoiding unnecessary calculations. State machines are unsettled by external actions that change their state, such as user input or data binding changes. You can additionally force a state machine to unsettle by calling play, though it may immediately re-settle if there is no further work to be done.

## Playing State Machines

### Specifying a State Machine

Pass the name of the state machine you want to play with the `stateMachine` parameter.

> [!NOTE]
>
> `stateMachine` was added in `v2.41.0` and replaces the plural `stateMachines` parameter, which is now deprecated. `stateMachine` takes a single non-empty string and always takes priority over `stateMachines` and `animations`. See [Deprecated parameters](/docs/runtimes/web/rive-parameters#deprecated-parameters) for more details.

If you do not pass `stateMachine`, or the deprecated `stateMachines` or `animations` parameters, Rive will currently play the first linear animation it finds on the artboard. In the next major version of the JS runtime (v3), Rive will play the artboard's default state machine when one exists.

### Autoplay the State Machine

To autoplay a state machine immediately after it loads, simply set `autoplay` to `true`.

```js theme={null}
const r = new rive.Rive({
    src: 'https://cdn.rive.app/animations/vehicles.riv',
    canvas: document.getElementById('canvas'),
    autoplay: true,
    stateMachine: 'bumpy',
    onLoad: () => {}
});
```

### Controlling State Machine playback

You can manually play and pause the State Machine using the `play`, `pause`, and `stop` methods.

```js theme={null}
const r = new rive.Rive({
    src: 'https://cdn.rive.app/animations/vehicles.riv',
    canvas: document.getElementById('canvas'),
    stateMachine: 'bumpy',
    onLoad: () => {}
});

const handlePlay = () => {
  r.play()
}

const handlePause = () => {
  r.pause()
}

const handleStop = () => {
  r.stop()
}
```

### reset()

To dispose the current artboard / animation / state machine instances and create fresh ones (optionally changing artboard or `stateMachine`), use **`reset()`**. Pass the same kinds of options you use on the constructor. See [Rive Parameters](/docs/runtimes/web/rive-parameters) for the full **`RiveResetParameters`** fields (`artboard`, `stateMachine`, `autoplay`, `autoBind`).

```js theme={null}
r.reset({
  stateMachine: 'bumpy',
  autoplay: true,
});
```
