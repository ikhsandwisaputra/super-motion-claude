---
source: https://rive.app/docs/editor/interface-overview/debug-panel
title: "Debug Panel"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Debug Panel

Inspect logs, problems, AI changes, tests, and audio while working in Rive.

The Debug Panel shows output and diagnostic information while you work in Rive. Use it to inspect console logs, find problems, review AI Agent changes, run tests, and preview audio.

![Viewport](https://mintcdn.com/rive/lfH6hCbIPfPtbKx4/images/editor/interface/debug-panel.png?fit=max\&auto=format\&n=lfH6hCbIPfPtbKx4\&q=85\&s=0c70c9639bd670ee27bf4c4bc7abe567)

## Tabs

The Debug Panel is organized into tabs.

* **Console** - view script logs, runtime errors, and State Machine activity.
* **Problems** - view code issues, broken bindings, validation warnings, and other problems in the file.
* **Changes** - review pending changes from the AI Agent.
* **Testing** - run [test scripts](/docs/scripting/debugging/unit-testing).
* **Audio** - [preview audio assets](/docs/editor/assets/audio#previewing-sounds) and [create clips](/docs/editor/assets/audio#creating-clips).

### Console

The Console shows output from scripts and State Machines.

Use the sidebar in the Console tab to switch between the script console and the State Machine console.

Use the Console options to clear the console, clear the console when playback starts, or copy console output.

#### Script Console

The script console shows output from scripts, including `print()` messages and runtime errors.

See [Script Console](/docs/scripting/debugging/debug-panel#console) for more information.

#### State Machine Console

The State Machine console shows State Machine activity during playback, such as entering a state or taking a transition.

![Viewport](https://mintcdn.com/rive/lfH6hCbIPfPtbKx4/images/editor/interface/debug-panel-state-machine-console.png?fit=max\&auto=format\&n=lfH6hCbIPfPtbKx4\&q=85\&s=5a7a07421586da8c1417eaf2fa173e74)

### Problems

The Problems tab lists issues found in the file. These can include code problems, broken data bindings, validation warnings, or problematic State Machine setup.

Errors are indicated by a red dot, while warnings are yellow.

Use the Problems options to filter problems, show or hide warnings, and include non-script validation.

Click a problem to open the affected code line, binding, State Machine item, or related editor location.

<video />

See [Script Problems](/docs/editor/interface-overview/debug-panel#problems) for handling script-related problems.

### Changes

The Changes tab shows pending changes from the AI Agent.

Use this tab to review changes before applying them to your file.
