---
source: https://rive.app/docs/scripting/api-reference/testing/expectation
title: "Expectation"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Expectation

Represents an expectation used within a test case. Each method performs an
assertion comparing the supplied value to the expected one.

## Fields

### `never`

Returns an [Expectation](/docs/scripting/api-reference/testing/expectation) that negates the subsequent assertion.

```lua theme={null}
expect(5).never.is(3)
expect(5).never.greaterThan(10)
```

## Methods

### `is`

```lua theme={null}
is(any) -> ()
```

Asserts that the value equals the expected value.

```lua theme={null}
expect(5).is(5)
expect("hello").is("hello")
```

### `greaterThan`

```lua theme={null}
greaterThan(any) -> ()
```

Asserts that the value is greater than the expected value.

```lua theme={null}
expect(10).greaterThan(5)
```

### `lessThan`

```lua theme={null}
lessThan(any) -> ()
```

Asserts that the value is less than the expected value.

```lua theme={null}
expect(3).lessThan(10)
```

### `greaterThanOrEqual`

```lua theme={null}
greaterThanOrEqual(any) -> ()
```

Asserts that the value is greater than or equal to the expected value.

```lua theme={null}
expect(5).greaterThanOrEqual(5)
expect(6).greaterThanOrEqual(5)
```

### `lessThanOrEqual`

```lua theme={null}
lessThanOrEqual(any) -> ()
```

Asserts that the value is less than or equal to the expected value.

```lua theme={null}
expect(5).lessThanOrEqual(5)
expect(4).lessThanOrEqual(5)
```
