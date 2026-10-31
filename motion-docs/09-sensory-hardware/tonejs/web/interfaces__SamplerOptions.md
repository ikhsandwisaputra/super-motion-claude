---
source: https://tonejs.github.io/docs/15.1.22/interfaces/SamplerOptions.html
title: "SamplerOptions | Tone.js"
fetched: 2026-10-28
---

* Preparing search index...
* The search index is not available

[Tone.js](https://tonejs.github.io/docs/15.1.22/index.html)

* [Tone.js](https://tonejs.github.io/docs/15.1.22/modules.html)
* [SamplerOptions](https://tonejs.github.io/docs/15.1.22/interfaces/SamplerOptions.html)

# Interface SamplerOptions

interface SamplerOptions {
    [attack](https://tonejs.github.io/docs/15.1.22/interfaces/SamplerOptions.html#attack): [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html);
    [baseUrl](https://tonejs.github.io/docs/15.1.22/interfaces/SamplerOptions.html#baseUrl): string;
    [context](https://tonejs.github.io/docs/15.1.22/interfaces/SamplerOptions.html#context): [BaseContext](https://tonejs.github.io/docs/15.1.22/classes/BaseContext.html);
    [curve](https://tonejs.github.io/docs/15.1.22/interfaces/SamplerOptions.html#curve): OneShotSourceCurve;
    [onerror](https://tonejs.github.io/docs/15.1.22/interfaces/SamplerOptions.html#onerror): ((error) => void);
    [onload](https://tonejs.github.io/docs/15.1.22/interfaces/SamplerOptions.html#onload): (() => void);
    [release](https://tonejs.github.io/docs/15.1.22/interfaces/SamplerOptions.html#release): [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html);
    [urls](https://tonejs.github.io/docs/15.1.22/interfaces/SamplerOptions.html#urls): SamplesMap;
    [volume](https://tonejs.github.io/docs/15.1.22/interfaces/SamplerOptions.html#volume): number;
}

#### Hierarchy

* InstrumentOptions
  + SamplerOptions

##### Index

### Properties

[attack](https://tonejs.github.io/docs/15.1.22/interfaces/SamplerOptions.html#attack)
[baseUrl](https://tonejs.github.io/docs/15.1.22/interfaces/SamplerOptions.html#baseUrl)
[context](https://tonejs.github.io/docs/15.1.22/interfaces/SamplerOptions.html#context)
[curve](https://tonejs.github.io/docs/15.1.22/interfaces/SamplerOptions.html#curve)
[onerror](https://tonejs.github.io/docs/15.1.22/interfaces/SamplerOptions.html#onerror)
[onload](https://tonejs.github.io/docs/15.1.22/interfaces/SamplerOptions.html#onload)
[release](https://tonejs.github.io/docs/15.1.22/interfaces/SamplerOptions.html#release)
[urls](https://tonejs.github.io/docs/15.1.22/interfaces/SamplerOptions.html#urls)
[volume](https://tonejs.github.io/docs/15.1.22/interfaces/SamplerOptions.html#volume)

## Properties

### attack

attack: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

### baseUrl

baseUrl: string

### context

context: [BaseContext](https://tonejs.github.io/docs/15.1.22/classes/BaseContext.html)

### curve

curve: OneShotSourceCurve

### onerror

onerror: ((error) => void)

#### Type declaration

* + (error): void
  + #### Parameters

    - error: Error

    #### Returns void

### onload

onload: (() => void)

#### Type declaration

* + (): void
  + #### Returns void

### release

release: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

### urls

urls: SamplesMap

### volume

volume: number

### Settings

#### Member Visibility

#### Theme

OSLightDark

### On This Page

[attack](https://tonejs.github.io/docs/15.1.22/interfaces/SamplerOptions.html#attack)[baseUrl](https://tonejs.github.io/docs/15.1.22/interfaces/SamplerOptions.html#baseUrl)[context](https://tonejs.github.io/docs/15.1.22/interfaces/SamplerOptions.html#context)[curve](https://tonejs.github.io/docs/15.1.22/interfaces/SamplerOptions.html#curve)[onerror](https://tonejs.github.io/docs/15.1.22/interfaces/SamplerOptions.html#onerror)[onload](https://tonejs.github.io/docs/15.1.22/interfaces/SamplerOptions.html#onload)[release](https://tonejs.github.io/docs/15.1.22/interfaces/SamplerOptions.html#release)[urls](https://tonejs.github.io/docs/15.1.22/interfaces/SamplerOptions.html#urls)[volume](https://tonejs.github.io/docs/15.1.22/interfaces/SamplerOptions.html#volume)
