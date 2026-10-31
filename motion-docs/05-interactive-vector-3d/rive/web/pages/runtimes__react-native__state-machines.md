---
source: https://rive.app/docs/runtimes/react-native/state-machines
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

**New Runtime (Recommended)**

By default, `RiveView` automatically uses the default artboard and state machine [configured in the Editor](/docs/editor/fundamentals/artboards#default-state-machine). In most cases, you only need to provide the `file` prop.

For programmatic control, you can optionally specify `artboardName` and `stateMachineName` props to use a different artboard or state machine.

> [!NOTE]
>
> In `0.5.0` and later, `RiveView` always plays a state machine. If the artboard has no default state machine, set `stateMachineName`; direct timeline animation playback is not supported.

```ts theme={null}
export default function PlaybackExample() {
  const { riveFile } = useRiveFile(require('./assets/my_file.riv'));

  return (
    <View style={styles.container}>
      <View style={styles.riveContainer}>
        {riveFile ? <RiveView file={riveFile} style={styles.rive} /> : null}
      </View>
    </View>
  );
}
```

#### Controlling State Machine Playback

For more control, you can manage playback and set the **artboard**/**state machine** combination:

**autoPlay** `boolean` (default: true)

Automatically start playing the state machine.

**artboardName** `String`

The name of the artboard to display.

*If not set, the default artboard will be used, as configured in the Editor.*

**stateMachineName** `String`

The name of the state machine to play.

*If not set, the default state machine will be used, as configured in the Editor.*

And manage `play` and `pause` on the Rive view reference.

> [!NOTE]
>
> `reset()` is deprecated and does nothing in `0.5.0` and later. To restart a state machine from its initial state, remount the `RiveView`, for example by changing its `key`.

```javascript theme={null}
import { Fit, RiveView, useRive, useRiveFile } from '@rive-app/react-native';

export default function PlaybackExample() {
  const { riveViewRef, setHybridRef } = useRive();
  const { riveFile } = useRiveFile(
    'https://cdn.rive.app/animations/vehicles.riv'
  );

  const play = () => {
    riveViewRef?.play();
  };

  const pause = () => {
    riveViewRef?.pause();
  };

  return (
    <View style={styles.container}>
      <View style={styles.riveContainer}>
        {riveFile ? (
          <RiveView
            file={riveFile}
            hybridRef={setHybridRef}
            autoPlay={false}
            artboardName="Truck" // specify the artboard to play
            stateMachineName="bumpy" // specify the state machine to play
            style={styles.rive}
          />
        ) : null}
      </View>
      <Button onPress={play} title="Play" />
      <Button onPress={pause} title="Pause" />
    </View>
  );
}
```

**Legacy Runtime**

#### Autoplay the State Machine

To auto-play a state machine by default, simply set `autoPlay` to `true`.

```jsx theme={null}
  <Rive
    resourceName={'vehicles'}
    autoplay={true}
    stateMachineName="bumpy"
  />
```

#### Controlling State Machine Playback

You can manually play and pause the State Machine using the `play` and `pause` methods.

```jsx theme={null}
import Rive, { RiveRef } from 'rive-react-native'

export default function App() {
  const riveRef = React.useRef<RiveRef>(null);

  const handlePlayPress = () => {
    riveRef?.current?.play();
  };

  const handlePausePress = () => {
    riveRef?.current?.pause();
  };

  return (
    <View>
      <Rive
        resourceName="truck_v7"
        stateMachineName="bumpy"
        ref={riveRef}
      />
      <Button onPress={handlePlayPress} title="play">
      <Button onPress={handlePausePress} title="pause">
    </View>
  );
}
```
