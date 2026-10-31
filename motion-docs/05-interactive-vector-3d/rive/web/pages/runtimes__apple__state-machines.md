---
source: https://rive.app/docs/runtimes/apple/state-machines
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

**New Runtime**

By default, the state machine of a `Rive` object will automatically play when in use by a `RiveUIView`.

The following sections assumes that you have read through the [Getting an Artboard](/docs/runtimes/apple/artboards#getting-an-artboard) overview.

### Getting a State Machine

Once you have created a `File` and `Artboard`, you can then retrieve information for and create `StateMachine` types.

```swift theme={null}
// Get all state machine names
let stateMachineNames = try await artboard.getStateMachineNames()
// Get the default state machine for the artboard
let defaultStateMachine = try await artboard.createStateMachine()
// Get a state machine by name from the artboard
let stateMachineByName = try await artboard.createStateMachine("StateMachine")
```

Note that these are all async throwing functions marked as `@MainActor`. State machine creation also binds authored main and global view model defaults when available. Binding can throw `StateMachineError`; artboard lookup failures throw `ArtboardError`. To supply instances you retain, use `createStateMachine("StateMachine", binding: instance)` and the optional globals builder described in [Data Binding](/docs/runtimes/apple/data-binding#global-view-models).

An example of when one of these functions will throw is if you call `.createStateMachine(_:)` with a name that is not in the origin `Artboard`, which will throw a `ArtboardError.invalidStateMachine(String)`.

### Using a State Machine

Remember that the Rive configuration for a view is the `Rive` type. In the overview, we show initializing a `Rive` object with just a file. However, you can initialize a `Rive` object with a specific state machine:

```swift theme={null}
let worker = try await Worker()
let file = try await File(source: .local("my_file", Bundle.main), worker: worker)
let artboardByName = try await file.createArtboard("Artboard")
let stateMachine = try await artboardByName.createStateMachine("StateMachine")
let rive = try await Rive(file: file, artboard: artboardByName, stateMachine: stateMachine)
```

**Legacy Runtime**

#### Autoplay the State Machine

By default, RiveViewModel will automatically play the given state machine.

### SwiftUI

```swift theme={null}
var stateChanger = RiveViewModel(
    fileName: "skills",
    stateMachineName: "Designer's Test",
    artboardName: "Banana"
)
```

### UIKit

```swift theme={null}
class StateMachineViewController: UIViewController {
    var viewModel = RiveViewModel(
        fileName: "skills",
        stateMachineName: "Designer's Test",
        artboardName: "Banana"
    )

    override public func loadView() {
        super.loadView()

        guard let stateMachineView = view as? StateMachineView else {
            fatalError("Could not find StateMachineView")
        }

        viewModel.setView(stateMachineView.riveView)
    }
}
```

### Play

If you set autoplay to false you can simply play the active animation or state machine.

```swift theme={null}
simpleVM.play()
```

### Pause/Stop/Reset

Based on certain events in your app you may want to adjust the playback further.

```swift theme={null}
simpleVM.pause()
simpleVM.stop()
simpleVM.reset()
```
