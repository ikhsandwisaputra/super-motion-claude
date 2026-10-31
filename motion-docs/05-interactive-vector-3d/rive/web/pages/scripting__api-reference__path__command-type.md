---
source: https://rive.app/docs/scripting/api-reference/path/command-type
title: "CommandType"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# CommandType

Describes the type of drawing command stored in a [PathCommand](/docs/scripting/api-reference/path/path-command).

For more information on the following command types, see [Path](/docs/scripting/api-reference/path/path).

* `none` – Placeholder command with no effect. You should not normally see this.
* `moveTo`
* `lineTo`
* `cubicTo`
* `quadTo`
* `close`

```lua highlight={5} theme={null}
local path = Path.new()
path:moveTo(Vector.xy(0, 0))
path:lineTo(Vector.xy(10, 0))

for i, command in ipairs(path) do
  print(i, command.type)
end
-- 1 moveTo
-- 2 lineTo
```
