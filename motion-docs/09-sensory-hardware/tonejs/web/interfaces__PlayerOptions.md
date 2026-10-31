---
source: https://tonejs.github.io/docs/15.1.22/interfaces/PlayerOptions.html
title: "PlayerOptions | Tone.js"
fetched: 2026-10-28
---

* Preparing search index...
* The search index is not available

[Tone.js](https://tonejs.github.io/docs/15.1.22/index.html)

* [Tone.js](https://tonejs.github.io/docs/15.1.22/modules.html)
* [PlayerOptions](https://tonejs.github.io/docs/15.1.22/interfaces/PlayerOptions.html)

# Interface PlayerOptions

interface PlayerOptions {
    [autostart](https://tonejs.github.io/docs/15.1.22/interfaces/PlayerOptions.html#autostart): boolean;
    [context](https://tonejs.github.io/docs/15.1.22/interfaces/PlayerOptions.html#context): [BaseContext](https://tonejs.github.io/docs/15.1.22/classes/BaseContext.html);
    [fadeIn](https://tonejs.github.io/docs/15.1.22/interfaces/PlayerOptions.html#fadeIn): [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html);
    [fadeOut](https://tonejs.github.io/docs/15.1.22/interfaces/PlayerOptions.html#fadeOut): [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html);
    [loop](https://tonejs.github.io/docs/15.1.22/interfaces/PlayerOptions.html#loop): boolean;
    [loopEnd](https://tonejs.github.io/docs/15.1.22/interfaces/PlayerOptions.html#loopEnd): [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html);
    [loopStart](https://tonejs.github.io/docs/15.1.22/interfaces/PlayerOptions.html#loopStart): [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html);
    [mute](https://tonejs.github.io/docs/15.1.22/interfaces/PlayerOptions.html#mute): boolean;
    [onerror](https://tonejs.github.io/docs/15.1.22/interfaces/PlayerOptions.html#onerror): ((error) => void);
    [onload](https://tonejs.github.io/docs/15.1.22/interfaces/PlayerOptions.html#onload): (() => void);
    [onstop](https://tonejs.github.io/docs/15.1.22/interfaces/PlayerOptions.html#onstop): onStopCallback;
    [playbackRate](https://tonejs.github.io/docs/15.1.22/interfaces/PlayerOptions.html#playbackRate): number;
    [reverse](https://tonejs.github.io/docs/15.1.22/interfaces/PlayerOptions.html#reverse): boolean;
    [url](https://tonejs.github.io/docs/15.1.22/interfaces/PlayerOptions.html#url)?: string | AudioBuffer | [ToneAudioBuffer](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioBuffer.html);
    [volume](https://tonejs.github.io/docs/15.1.22/interfaces/PlayerOptions.html#volume): number;
}

#### Hierarchy

* SourceOptions
  + PlayerOptions

##### Index

### Properties

[autostart](https://tonejs.github.io/docs/15.1.22/interfaces/PlayerOptions.html#autostart)
[context](https://tonejs.github.io/docs/15.1.22/interfaces/PlayerOptions.html#context)
[fadeIn](https://tonejs.github.io/docs/15.1.22/interfaces/PlayerOptions.html#fadeIn)
[fadeOut](https://tonejs.github.io/docs/15.1.22/interfaces/PlayerOptions.html#fadeOut)
[loop](https://tonejs.github.io/docs/15.1.22/interfaces/PlayerOptions.html#loop)
[loopEnd](https://tonejs.github.io/docs/15.1.22/interfaces/PlayerOptions.html#loopEnd)
[loopStart](https://tonejs.github.io/docs/15.1.22/interfaces/PlayerOptions.html#loopStart)
[mute](https://tonejs.github.io/docs/15.1.22/interfaces/PlayerOptions.html#mute)
[onerror](https://tonejs.github.io/docs/15.1.22/interfaces/PlayerOptions.html#onerror)
[onload](https://tonejs.github.io/docs/15.1.22/interfaces/PlayerOptions.html#onload)
[onstop](https://tonejs.github.io/docs/15.1.22/interfaces/PlayerOptions.html#onstop)
[playbackRate](https://tonejs.github.io/docs/15.1.22/interfaces/PlayerOptions.html#playbackRate)
[reverse](https://tonejs.github.io/docs/15.1.22/interfaces/PlayerOptions.html#reverse)
[url?](https://tonejs.github.io/docs/15.1.22/interfaces/PlayerOptions.html#url)
[volume](https://tonejs.github.io/docs/15.1.22/interfaces/PlayerOptions.html#volume)

## Properties

### autostart

autostart: boolean

### context

context: [BaseContext](https://tonejs.github.io/docs/15.1.22/classes/BaseContext.html)

### fadeIn

fadeIn: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

### fadeOut

fadeOut: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

### loop

loop: boolean

### loopEnd

loopEnd: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

### loopStart

loopStart: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

### mute

mute: boolean

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

### onstop

onstop: onStopCallback

### playbackRate

playbackRate: number

### reverse

reverse: boolean

### `Optional` url

url?: string | AudioBuffer | [ToneAudioBuffer](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioBuffer.html)

### volume

volume: number

### Settings

#### Member Visibility

#### Theme

OSLightDark

### On This Page

[autostart](https://tonejs.github.io/docs/15.1.22/interfaces/PlayerOptions.html#autostart)[context](https://tonejs.github.io/docs/15.1.22/interfaces/PlayerOptions.html#context)[fadeIn](https://tonejs.github.io/docs/15.1.22/interfaces/PlayerOptions.html#fadeIn)[fadeOut](https://tonejs.github.io/docs/15.1.22/interfaces/PlayerOptions.html#fadeOut)[loop](https://tonejs.github.io/docs/15.1.22/interfaces/PlayerOptions.html#loop)[loopEnd](https://tonejs.github.io/docs/15.1.22/interfaces/PlayerOptions.html#loopEnd)[loopStart](https://tonejs.github.io/docs/15.1.22/interfaces/PlayerOptions.html#loopStart)[mute](https://tonejs.github.io/docs/15.1.22/interfaces/PlayerOptions.html#mute)[onerror](https://tonejs.github.io/docs/15.1.22/interfaces/PlayerOptions.html#onerror)[onload](https://tonejs.github.io/docs/15.1.22/interfaces/PlayerOptions.html#onload)[onstop](https://tonejs.github.io/docs/15.1.22/interfaces/PlayerOptions.html#onstop)[playbackRate](https://tonejs.github.io/docs/15.1.22/interfaces/PlayerOptions.html#playbackRate)[reverse](https://tonejs.github.io/docs/15.1.22/interfaces/PlayerOptions.html#reverse)[url](https://tonejs.github.io/docs/15.1.22/interfaces/PlayerOptions.html#url)[volume](https://tonejs.github.io/docs/15.1.22/interfaces/PlayerOptions.html#volume)
