---
source: https://rive.app/docs/runtimes/react/state-machines
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

Name the state machine you want to play with the `stateMachine` parameter on `useRive` (or the `stateMachine` prop on the default `<Rive />` component).

#### Autoplay the State Machine

To auto-play a state machine by default, simply set `autoplay` to `true`.

```js theme={null}
export default function Simple() {
  const { RiveComponent } = useRive({
    src: 'https://cdn.rive.app/animations/vehicles.riv',
    stateMachine: "bumpy",
    autoplay: true,
  });

  return <RiveComponent />;
}
```

#### Controlling State Machine playback

You can manually play and pause the state machine using the `play`, `pause`, and `stop` methods.

```js theme={null}
export default function Simple() {
  const { rive, RiveComponent } = useRive({
    src: "https://cdn.rive.app/animations/vehicles.riv",
    stateMachine: "bumpy",
    autoplay: true,
  });

  const handlePlay = useCallback(() => {
    rive?.play();
  }, [rive]);

  const handlePause = useCallback(() => {
    rive?.pause();
  }, [rive]);

  const handleStop = useCallback(() => {
    rive?.stop();
  }, [rive]);

  return (
    <div>
      <RiveComponent />
      <div style={{ marginTop: 12 }}>
        <button onClick={handlePlay}>Play</button>
        <button onClick={handlePause}>Pause</button>
        <button onClick={handleStop}>Stop</button>
      </div>
    </div>
  );
}

```
