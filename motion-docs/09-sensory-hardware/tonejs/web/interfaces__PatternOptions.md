---
source: https://tonejs.github.io/docs/15.1.22/interfaces/PatternOptions.html
title: "PatternOptions | Tone.js"
fetched: 2026-10-28
---

* Preparing search index...
* The search index is not available

[Tone.js](https://tonejs.github.io/docs/15.1.22/index.html)

* [Tone.js](https://tonejs.github.io/docs/15.1.22/modules.html)
* [PatternOptions](https://tonejs.github.io/docs/15.1.22/interfaces/PatternOptions.html)

# Interface PatternOptions<ValueType>

interface PatternOptions<[ValueType](https://tonejs.github.io/docs/15.1.22/interfaces/PatternOptions.html#ValueType)> {
    [callback](https://tonejs.github.io/docs/15.1.22/interfaces/PatternOptions.html#callback): ((time, value?) => void);
    [context](https://tonejs.github.io/docs/15.1.22/interfaces/PatternOptions.html#context): [BaseContext](https://tonejs.github.io/docs/15.1.22/classes/BaseContext.html);
    [humanize](https://tonejs.github.io/docs/15.1.22/interfaces/PatternOptions.html#humanize): boolean | [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html);
    [interval](https://tonejs.github.io/docs/15.1.22/interfaces/PatternOptions.html#interval): [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html);
    [iterations](https://tonejs.github.io/docs/15.1.22/interfaces/PatternOptions.html#iterations): number;
    [mute](https://tonejs.github.io/docs/15.1.22/interfaces/PatternOptions.html#mute): boolean;
    [pattern](https://tonejs.github.io/docs/15.1.22/interfaces/PatternOptions.html#pattern): PatternName;
    [playbackRate](https://tonejs.github.io/docs/15.1.22/interfaces/PatternOptions.html#playbackRate): number;
    [probability](https://tonejs.github.io/docs/15.1.22/interfaces/PatternOptions.html#probability): number;
    [values](https://tonejs.github.io/docs/15.1.22/interfaces/PatternOptions.html#values): [ValueType](https://tonejs.github.io/docs/15.1.22/interfaces/PatternOptions.html#ValueType)[];
}

#### Type Parameters

* ValueType

#### Hierarchy ([view full](https://tonejs.github.io/docs/15.1.22/hierarchy.html#PatternOptions))

* [LoopOptions](https://tonejs.github.io/docs/15.1.22/interfaces/LoopOptions.html)
  + PatternOptions

##### Index

### Properties

[callback](https://tonejs.github.io/docs/15.1.22/interfaces/PatternOptions.html#callback)
[context](https://tonejs.github.io/docs/15.1.22/interfaces/PatternOptions.html#context)
[humanize](https://tonejs.github.io/docs/15.1.22/interfaces/PatternOptions.html#humanize)
[interval](https://tonejs.github.io/docs/15.1.22/interfaces/PatternOptions.html#interval)
[iterations](https://tonejs.github.io/docs/15.1.22/interfaces/PatternOptions.html#iterations)
[mute](https://tonejs.github.io/docs/15.1.22/interfaces/PatternOptions.html#mute)
[pattern](https://tonejs.github.io/docs/15.1.22/interfaces/PatternOptions.html#pattern)
[playbackRate](https://tonejs.github.io/docs/15.1.22/interfaces/PatternOptions.html#playbackRate)
[probability](https://tonejs.github.io/docs/15.1.22/interfaces/PatternOptions.html#probability)
[values](https://tonejs.github.io/docs/15.1.22/interfaces/PatternOptions.html#values)

## Properties

### callback

callback: ((time, value?) => void)

#### Type declaration

* + (time, value?): void
  + #### Parameters

    - time: number
    - `Optional` value: [ValueType](https://tonejs.github.io/docs/15.1.22/interfaces/PatternOptions.html#ValueType)

    #### Returns void

### context

context: [BaseContext](https://tonejs.github.io/docs/15.1.22/classes/BaseContext.html)

### humanize

humanize: boolean | [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

### interval

interval: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

### iterations

iterations: number

### mute

mute: boolean

### pattern

pattern: PatternName

### playbackRate

playbackRate: number

### probability

probability: number

### values

values: [ValueType](https://tonejs.github.io/docs/15.1.22/interfaces/PatternOptions.html#ValueType)[]

### Settings

#### Member Visibility

#### Theme

OSLightDark

### On This Page

[callback](https://tonejs.github.io/docs/15.1.22/interfaces/PatternOptions.html#callback)[context](https://tonejs.github.io/docs/15.1.22/interfaces/PatternOptions.html#context)[humanize](https://tonejs.github.io/docs/15.1.22/interfaces/PatternOptions.html#humanize)[interval](https://tonejs.github.io/docs/15.1.22/interfaces/PatternOptions.html#interval)[iterations](https://tonejs.github.io/docs/15.1.22/interfaces/PatternOptions.html#iterations)[mute](https://tonejs.github.io/docs/15.1.22/interfaces/PatternOptions.html#mute)[pattern](https://tonejs.github.io/docs/15.1.22/interfaces/PatternOptions.html#pattern)[playbackRate](https://tonejs.github.io/docs/15.1.22/interfaces/PatternOptions.html#playbackRate)[probability](https://tonejs.github.io/docs/15.1.22/interfaces/PatternOptions.html#probability)[values](https://tonejs.github.io/docs/15.1.22/interfaces/PatternOptions.html#values)
