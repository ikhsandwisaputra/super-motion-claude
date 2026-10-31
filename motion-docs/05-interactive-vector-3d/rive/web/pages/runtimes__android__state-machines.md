---
source: https://rive.app/docs/runtimes/android/state-machines
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

**Compose**

By default, the `Rive` composable will select and create the default state machine specified in the Rive editor. To specify a different state machine, you must first create a `StateMachine` object from an `Artboard`.

### Compose

State machine objects can be created in Compose using the `rememberStateMachine` function, which takes an artboard and name of the state machine.

```kotlin theme={null}
val artboard = rememberArtboard(myRiveFile, "My Artboard")
val stateMachine = rememberStateMachine(artboard, "My State Machine")
```

### Outside of Compose

Alternatively, you can create a state machine outside of Compose contexts. Note that with this approach you are responsible for managing the state machine's lifecycle and must eventually close it with `StateMachine::close()` when no longer needed, or leveraging its [`AutoClosable`](https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-auto-closeable.html) interface with a `use` block.

```kotlin theme={null}
val artboard = Artboard.fromFile(myRiveFile, "My Artboard")
val stateMachine = StateMachine.fromArtboard(artboard, "My State Machine")
...
stateMachine.close()
artboard.close()
```

### Using the State Machine

Once you have a state machine, you can pass it to the `Rive` composable via the `stateMachine` parameter.

By default the Rive composable will play the selected state machine. To toggle the play/pause state, set the `playing` parameter, triggering a re-composition. This is also used to replicate the auto-play behavior of other runtimes - simply set `playing` to false if you need to perform initial setup and set to true once ready.

```kotlin theme={null}
Rive(
  myRiveFile,
  artboard = artboard,
  stateMachine = stateMachine,
  playing = true // Or false to pause
)
```

**Legacy**

By default RiveAnimationView will auto-play the selected state machine.

⚠️ The legacy API allows for playing multiple linear animations and state machines simultaneously. This is discouraged due to complexity and divergence from other runtimes. Prefer to use a single state machine controlling all animation through states and transitions.

### Using XML Layouts

```xml theme={null}
<app.rive.runtime.kotlin.RiveAnimationView
    app:riveResource="@raw/my_rive_file"
    app:riveStateMachine="My State Machine"
    app:riveAutoPlay="true" />
```

### Using Kotlin

```kotlin theme={null}
animationView.setRiveResource(
    R.raw.my_rive_file,
    stateMachineName = "My State Machine",
    autoplay = true
)
```

### Controlling Playback

You can control the state machine's playing state using the same APIs as those for linear animation playback (i.e. `play`, `pause`, and `stop`). When doing so, ensure you set the `isStateMachine` parameter to `true`.

```kotlin theme={null}
animationView.play("My State Machine", isStateMachine = true)
animationView.pause("My State Machine", isStateMachine = true)
animationView.stop("My State Machine", isStateMachine = true)
```
