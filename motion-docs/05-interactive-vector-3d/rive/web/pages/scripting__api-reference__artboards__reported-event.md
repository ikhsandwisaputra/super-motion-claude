---
source: https://rive.app/docs/scripting/api-reference/artboards/reported-event
title: "ReportedEvent"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# ReportedEvent

Represents a reported Rive event.

## Fields

### `delaySeconds`

How long ago the event fired, in seconds: the time from its keyframe
to where the reporting animation's advance ended. 0 for an event
fired by a state or a listener rather than a keyframe.

```lua theme={null}
local event = context:asReportedEvent()
if event then
  print(event.delaySeconds)
end
```
