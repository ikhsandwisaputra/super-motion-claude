---
source: https://rive.app/docs/scripting/debugging/debug-panel
title: "Debug Panel"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Debug Panel

The Debug Panel lets you inspect script output and detect issues
in your code.

![Viewport](https://mintcdn.com/rive/lfH6hCbIPfPtbKx4/images/editor/interface/debug-panel.png?fit=max\&auto=format\&n=lfH6hCbIPfPtbKx4\&q=85\&s=0c70c9639bd670ee27bf4c4bc7abe567)

## Toolbar

Switch between [Console](#console) and [Problems](#problems) using the tabs to the left of the panel. Use the icons at the right end of the panel to open and close the panel and toggle fullscreen mode. Additional options to copy and clear the console show up when the Console tab is active.

## Console

The Console shows all log output and runtime errors from your scripts during playback.

You can use the standard [Luau print()](https://create.roblox.com/docs/reference/engine/globals/LuaGlobals#print) function to log information, variable values, and messages.

```lua theme={null}
print("Rive is so cool!")
print("Elapsed time:", seconds)
```

![Debug panel toolbar](https://mintcdn.com/rive/XM7ZDF5UNIomvhbR/images/scripting/debugging/console-print.png?fit=max\&auto=format\&n=XM7ZDF5UNIomvhbR\&q=85\&s=c6d0a2c6895cfc1e66209ee57fe113e7)

## Problems

The Problems tab lists problems detected *before* the script runs such as type mismatches, syntax errors, or missing data bindings.

The tab badge shows the number of issues found across your scripts.

Clicking a problem will jump directly to the affected line of code.
You can also hover any underlined code in the editor to see an explanation or suggested fix.

![Problems panel](https://mintcdn.com/rive/PNFYxEcCteEOymSI/images/scripting/debugging/problems-panel.png?fit=max\&auto=format\&n=PNFYxEcCteEOymSI\&q=85\&s=99015303248a0e296b08d516264375c7)
