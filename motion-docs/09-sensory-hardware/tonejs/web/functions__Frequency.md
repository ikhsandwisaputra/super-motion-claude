---
source: https://tonejs.github.io/docs/15.1.22/functions/Frequency.html
title: "Frequency | Tone.js"
fetched: 2026-10-28
---

* Preparing search index...
* The search index is not available

[Tone.js](https://tonejs.github.io/docs/15.1.22/index.html)

* [Tone.js](https://tonejs.github.io/docs/15.1.22/modules.html)
* [Frequency](https://tonejs.github.io/docs/15.1.22/functions/Frequency.html)

# Function Frequency

* Frequency(value?, units?): [FrequencyClass](https://tonejs.github.io/docs/15.1.22/classes/FrequencyClass.html)
* Convert a value into a FrequencyClass object.

  #### Parameters

  + `Optional` value: string | number | [TimeObject](https://tonejs.github.io/docs/15.1.22/types/Unit.TimeObject.html) | TimeBaseClass<any, any>
  + `Optional` units: [FrequencyUnit](https://tonejs.github.io/docs/15.1.22/types/FrequencyUnit.html)

  #### Returns [FrequencyClass](https://tonejs.github.io/docs/15.1.22/classes/FrequencyClass.html)

  #### Example

  ```ts
  const midi = Tone.Frequency("C3").toMidi();
  console.log(midi);
  ```

  #### Example

  ```ts
  const hertz = Tone.Frequency(38, "midi").toFrequency();
  console.log(hertz);
  ```

### Settings

#### Member Visibility

#### Theme

OSLightDark
