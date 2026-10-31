---
source: https://rive.app/docs/scripting/api-reference/testing/tester
title: "Tester"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Tester

Provides functions for defining test cases and organizing them into groups.

## Methods

### `case`

```lua theme={null}
case(name: string, test: (expect:(value: any) -> Expectation) ->()) -> ()
```

Defines a named test case. The callback receives an `expect` function
used to create expectations on a value.

```lua theme={null}
case("adds two numbers", function(expect)
  local result = 2 + 3
  expect(result).is(5)
end)
```

### `errors`

```lua theme={null}
errors(name: string, test: (expect:(value: any) -> Expectation) ->(), message: string?) -> ()
```

Defines a test case that passes only when the callback raises an
error. With a `message`, the error must also contain it.

```lua theme={null}
errors("rejects a negative size", function(expect)
  buffer.create(-1)
end, "invalid argument")
```

### `group`

```lua theme={null}
group(name: string, test: () ->()) -> ()
```

Groups related test cases under a common name. Nested groups are supported.

```lua theme={null}
group("Math utilities", function()
  case("adds numbers", function(expect)
    expect(2 + 2).is(4)
  end)

  case("multiplies numbers", function(expect)
    expect(3 * 4).is(12)
  end)
end)
```

### `blob`

```lua theme={null}
blob(name: string) -> Blob?
```

Looks up a blob asset in the file by name, or nil when missing.

```lua theme={null}
local data = test.blob("fixtures")
```
