---
source: https://tonejs.github.io/docs/15.1.22/functions/Time.html
title: "Time | Tone.js"
fetched: 2026-10-28
---

* Preparing search index...
* The search index is not available

[Tone.js](https://tonejs.github.io/docs/15.1.22/index.html)

* [Tone.js](https://tonejs.github.io/docs/15.1.22/modules.html)
* [Time](https://tonejs.github.io/docs/15.1.22/functions/Time.html)

# Function Time

* Time(value?, units?): [TimeClass](https://tonejs.github.io/docs/15.1.22/classes/TimeClass.html)<[Seconds](https://tonejs.github.io/docs/15.1.22/types/Unit.Seconds.html)>
* Create a TimeClass from a time string or number. The time is computed against the
  global Tone.Context. To use a specific context, use [TimeClass](https://tonejs.github.io/docs/15.1.22/classes/TimeClass.html)

  #### Parameters

  + `Optional` value: TimeValue

    A value which represents time
  + `Optional` units: TimeBaseUnit

    The value's units if they can't be inferred by the value.

  #### Returns [TimeClass](https://tonejs.github.io/docs/15.1.22/classes/TimeClass.html)<[Seconds](https://tonejs.github.io/docs/15.1.22/types/Unit.Seconds.html)>

  #### Example

  ```ts
  const time = Tone.Time("4n").toSeconds();
  console.log(time);
  ```

  #### Example

  ```ts
  const note = Tone.Time(1).toNotation();
  console.log(note);
  ```

  #### Example

  ```ts
  const freq = Tone.Time(0.5).toFrequency();
  console.log(freq);
  ```

### Settings

#### Member Visibility

#### Theme

OSLightDark
