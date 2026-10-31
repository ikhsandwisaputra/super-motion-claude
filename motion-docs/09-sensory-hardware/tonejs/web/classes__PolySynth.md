---
source: https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html
title: "PolySynth | Tone.js"
fetched: 2026-10-28
---

* Preparing search index...
* The search index is not available

[Tone.js](https://tonejs.github.io/docs/15.1.22/index.html)

* [Tone.js](https://tonejs.github.io/docs/15.1.22/modules.html)
* [PolySynth](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html)

# Class PolySynth<Voice>

PolySynth handles voice creation and allocation for any
instruments passed in as the second parameter. PolySynth is
not a synthesizer by itself, it merely manages voices of
one of the other types of synths, allowing any of the
monophonic synthesizers to be polyphonic.

#### Example

```ts
const synth = new Tone.PolySynth().toDestination();
// set the attributes across all the voices using 'set'
synth.set({ detune: -1200 });
// play a chord
synth.triggerAttackRelease(["C4", "E4", "A4"], 1);
```

#### Type Parameters

* Voice extends Monophonic<any> = [Synth](https://tonejs.github.io/docs/15.1.22/classes/Synth.html)

#### Hierarchy

* Instrument<VoiceOptions<[Voice](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#constructor.new_PolySynth.Voice-1)>>
  + PolySynth

##### Index

### Constructors

[constructor](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#constructor)

### Properties

[context](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#context)
[debug](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#debug)
[input](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#input)
[maxPolyphony](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#maxPolyphony)
[name](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#name)
[output](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#output)
[volume](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#volume)
[version](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#version)

### Accessors

[activeVoices](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#activeVoices)
[blockTime](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#blockTime)
[channelCount](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#channelCount)
[channelCountMode](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#channelCountMode)
[channelInterpretation](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#channelInterpretation)
[disposed](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#disposed)
[numberOfInputs](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#numberOfInputs)
[numberOfOutputs](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#numberOfOutputs)
[sampleTime](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#sampleTime)

### Methods

[chain](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#chain)
[connect](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#connect)
[disconnect](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#disconnect)
[dispose](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#dispose)
[fan](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#fan)
[get](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#get)
[immediate](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#immediate)
[now](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#now)
[releaseAll](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#releaseAll)
[set](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#set)
[sync](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#sync)
[toDestination](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#toDestination)
[toFrequency](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#toFrequency)
[toMaster](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#toMaster)
[toSeconds](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#toSeconds)
[toString](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#toString)
[toTicks](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#toTicks)
[triggerAttack](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#triggerAttack)
[triggerAttackRelease](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#triggerAttackRelease)
[triggerRelease](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#triggerRelease)
[unsync](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#unsync)
[getDefaults](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#getDefaults)

## Constructors

### constructor

* new PolySynth<[Voice](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#constructor.new_PolySynth.Voice-1)>(voice?, options?): [PolySynth](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html)<[Voice](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#constructor.new_PolySynth.Voice-1)>
* #### Type Parameters

  + Voice extends Monophonic<any> = [Synth](https://tonejs.github.io/docs/15.1.22/classes/Synth.html)<[SynthOptions](https://tonejs.github.io/docs/15.1.22/interfaces/SynthOptions.html)>

  #### Parameters

  + `Optional` voice: VoiceConstructor<[Voice](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#constructor.new_PolySynth.Voice-1)>

    The constructor of the voices
  + `Optional` options: RecursivePartial<OmitMonophonicOptions<VoiceOptions<[Voice](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#constructor.new_PolySynth.Voice-1)>>>

    The options object to set the synth voice

  #### Returns [PolySynth](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html)<[Voice](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#constructor.new_PolySynth.Voice-1)>
* new PolySynth<[Voice](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#constructor.new_PolySynth-1.Voice-2)>(options?): [PolySynth](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html)<[Voice](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#constructor.new_PolySynth.Voice-1)>
* #### Type Parameters

  + Voice extends Monophonic<any> = [Synth](https://tonejs.github.io/docs/15.1.22/classes/Synth.html)<[SynthOptions](https://tonejs.github.io/docs/15.1.22/interfaces/SynthOptions.html)>

  #### Parameters

  + `Optional` options: Partial<[PolySynthOptions](https://tonejs.github.io/docs/15.1.22/interfaces/PolySynthOptions.html)<[Voice](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#constructor.new_PolySynth.Voice-1)>>

  #### Returns [PolySynth](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html)<[Voice](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#constructor.new_PolySynth.Voice-1)>

## Properties

### `Readonly` context

context: [BaseContext](https://tonejs.github.io/docs/15.1.22/classes/BaseContext.html)

The context belonging to the node.

### debug

debug: boolean = false

Set this debug flag to log all events that happen in this class.

### input

input: undefined

The instrument only has an output

### maxPolyphony

maxPolyphony: number

The polyphony limit.

### `Readonly` name

name: string = "PolySynth"

### output

output: [OutputNode](https://tonejs.github.io/docs/15.1.22/types/OutputNode.html)

### volume

volume: [Param](https://tonejs.github.io/docs/15.1.22/classes/Param.html)<"decibels">

The volume of the output in decibels.

#### Example

```ts
const amSynth = new Tone.AMSynth().toDestination();
amSynth.volume.value = -6;
amSynth.triggerAttackRelease("G#3", 0.2);
```

### `Static` version

version: string = version

The version number semver

## Accessors

### activeVoices

* get activeVoices(): number
* The number of active voices.

  #### Returns number

### blockTime

* get blockTime(): number
* The number of seconds of 1 processing block (128 samples)

  #### Returns number

  #### Example

  ```ts
  console.log(Tone.Destination.blockTime);
  ```

### channelCount

* get channelCount(): number
* channelCount is the number of channels used when up-mixing and down-mixing
  connections to any inputs to the node. The default value is 2 except for
  specific nodes where its value is specially determined.

  #### Returns number
* set channelCount(channelCount): void
* #### Parameters

  + channelCount: number

  #### Returns void

### channelCountMode

* get channelCountMode(): ChannelCountMode
* channelCountMode determines how channels will be counted when up-mixing and
  down-mixing connections to any inputs to the node.
  The default value is "max". This attribute has no effect for nodes with no inputs.

  + "max" - computedNumberOfChannels is the maximum of the number of channels of all connections to an input. In this mode channelCount is ignored.
  + "clamped-max" - computedNumberOfChannels is determined as for "max" and then clamped to a maximum value of the given channelCount.
  + "explicit" - computedNumberOfChannels is the exact value as specified by the channelCount.

  #### Returns ChannelCountMode
* set channelCountMode(channelCountMode): void
* #### Parameters

  + channelCountMode: ChannelCountMode

  #### Returns void

### channelInterpretation

* get channelInterpretation(): ChannelInterpretation
* channelInterpretation determines how individual channels will be treated
  when up-mixing and down-mixing connections to any inputs to the node.
  The default value is "speakers".

  #### Returns ChannelInterpretation
* set channelInterpretation(channelInterpretation): void
* #### Parameters

  + channelInterpretation: ChannelInterpretation

  #### Returns void

### disposed

* get disposed(): boolean
* Indicates if the instance was disposed. 'Disposing' an
  instance means that all of the Web Audio nodes that were
  created for the instance are disconnected and freed for garbage collection.

  #### Returns boolean

### numberOfInputs

* get numberOfInputs(): number
* The number of inputs feeding into the AudioNode.
  For source nodes, this will be 0.

  #### Returns number

  #### Example

  ```ts
  const node = new Tone.Gain();
  console.log(node.numberOfInputs);
  ```

### numberOfOutputs

* get numberOfOutputs(): number
* The number of outputs of the AudioNode.

  #### Returns number

  #### Example

  ```ts
  const node = new Tone.Gain();
  console.log(node.numberOfOutputs);
  ```

### sampleTime

* get sampleTime(): number
* The duration in seconds of one sample.

  #### Returns number

## Methods

### chain

* chain(...nodes): this
* Connect the output of this node to the rest of the nodes in series.

  #### Parameters

  + `Rest` ...nodes: [InputNode](https://tonejs.github.io/docs/15.1.22/types/InputNode.html)[]

  #### Returns this

  #### Example

  ```ts
  const player = new Tone.Player("https://tonejs.github.io/audio/drum-samples/handdrum-loop.mp3");
  player.autostart = true;
  const filter = new Tone.AutoFilter(4).start();
  const distortion = new Tone.Distortion(0.5);
  // connect the player to the filter, distortion and then to the master output
  player.chain(filter, distortion, Tone.Destination);
  ```

### connect

* connect(destination, outputNum?, inputNum?): this
* connect the output of a ToneAudioNode to an AudioParam, AudioNode, or ToneAudioNode

  #### Parameters

  + destination: [InputNode](https://tonejs.github.io/docs/15.1.22/types/InputNode.html)

    The output to connect to
  + outputNum: number = 0

    The output to connect from
  + inputNum: number = 0

    The input to connect to

  #### Returns this

### disconnect

* disconnect(destination?, outputNum?, inputNum?): this
* disconnect the output

  #### Parameters

  + `Optional` destination: [InputNode](https://tonejs.github.io/docs/15.1.22/types/InputNode.html)
  + outputNum: number = 0
  + inputNum: number = 0

  #### Returns this

### dispose

* dispose(): this
* #### Returns this

### fan

* fan(...nodes): this
* connect the output of this node to the rest of the nodes in parallel.

  #### Parameters

  + `Rest` ...nodes: [InputNode](https://tonejs.github.io/docs/15.1.22/types/InputNode.html)[]

  #### Returns this

  #### Example

  ```ts
  const player = new Tone.Player("https://tonejs.github.io/audio/drum-samples/conga-rhythm.mp3");
  player.autostart = true;
  const pitchShift = new Tone.PitchShift(4).toDestination();
  const filter = new Tone.Filter("G5").toDestination();
  // connect a node to the pitch shift and filter in parallel
  player.fan(pitchShift, filter);
  ```

### get

* get(): VoiceOptions<[Voice](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#constructor.new_PolySynth.Voice-1)>
* #### Returns VoiceOptions<[Voice](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#constructor.new_PolySynth.Voice-1)>

### immediate

* immediate(): number
* Return the current time of the Context clock without any lookAhead.

  #### Returns number

  #### Example

  ```ts
  setInterval(() => {
      console.log(Tone.immediate());
  }, 100);
  ```

### now

* now(): number
* Return the current time of the Context clock plus the lookAhead.

  #### Returns number

  #### Example

  ```ts
  setInterval(() => {
      console.log(Tone.now());
  }, 100);
  ```

### releaseAll

* releaseAll(time?): this
* Trigger the release portion of all the currently active voices immediately.
  Useful for silencing the synth.

  #### Parameters

  + `Optional` time: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

  #### Returns this

### set

* set(options): this
* Set a member/attribute of the voices

  #### Parameters

  + options: RecursivePartial<VoiceOptions<[Voice](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#constructor.new_PolySynth.Voice-1)>>

  #### Returns this

  #### Example

  ```ts
  const poly = new Tone.PolySynth().toDestination();
  // set all of the voices using an options object for the synth type
  poly.set({
      envelope: {
          attack: 0.25
      }
  });
  poly.triggerAttackRelease("Bb3", 0.2);
  ```

### sync

* sync(): this
* #### Returns this

### toDestination

* toDestination(): this
* Connect the output to the context's destination node.

  #### Returns this

  #### Example

  ```ts
  const osc = new Tone.Oscillator("C2").start();
  osc.toDestination();
  ```

### toFrequency

* toFrequency(freq): number
* Convert the input to a frequency number

  #### Parameters

  + freq: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Frequency](https://tonejs.github.io/docs/15.1.22/types/Unit.Frequency.html)

  #### Returns number

  #### Example

  ```ts
  const gain = new Tone.Gain();
  console.log(gain.toFrequency("4n"));
  ```

### toMaster

* toMaster(): this
* Connect the output to the context's destination node.

  #### Returns this

  #### See

  [toDestination](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#toDestination)

  #### Deprecated

### toSeconds

* toSeconds(time?): number
* Convert the incoming time to seconds.
  This is calculated against the current TransportClass bpm

  #### Parameters

  + `Optional` time: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

  #### Returns number

  #### Example

  ```ts
  const gain = new Tone.Gain();
  setInterval(() => console.log(gain.toSeconds("4n")), 100);
  // ramp the tempo to 60 bpm over 30 seconds
  Tone.getTransport().bpm.rampTo(60, 30);
  ```

### toString

* toString(): string
* Convert the class to a string

  #### Returns string

  #### Example

  ```ts
  const osc = new Tone.Oscillator();
  console.log(osc.toString());
  ```

### toTicks

* toTicks(time?): number
* Convert the input time into ticks

  #### Parameters

  + `Optional` time: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html) | [TimeClass](https://tonejs.github.io/docs/15.1.22/classes/TimeClass.html)<number, TimeBaseUnit>

  #### Returns number

  #### Example

  ```ts
  const gain = new Tone.Gain();
  console.log(gain.toTicks("4n"));
  ```

### triggerAttack

* triggerAttack(notes, time?, velocity?): this
* Trigger the attack portion of the note

  #### Parameters

  + notes: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Frequency](https://tonejs.github.io/docs/15.1.22/types/Unit.Frequency.html) | [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Frequency](https://tonejs.github.io/docs/15.1.22/types/Unit.Frequency.html)[]

    The notes to play. Accepts a single Frequency or an array of frequencies.
  + `Optional` time: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

    The start time of the note.
  + `Optional` velocity: number

    The velocity of the note.

  #### Returns this

  #### Example

  ```ts
  const synth = new Tone.PolySynth(Tone.FMSynth).toDestination();
  // trigger a chord immediately with a velocity of 0.2
  synth.triggerAttack(["Ab3", "C4", "F5"], Tone.now(), 0.2);
  ```

### triggerAttackRelease

* triggerAttackRelease(notes, duration, time?, velocity?): this
* Trigger the attack and release after the specified duration

  #### Parameters

  + notes: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Frequency](https://tonejs.github.io/docs/15.1.22/types/Unit.Frequency.html) | [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Frequency](https://tonejs.github.io/docs/15.1.22/types/Unit.Frequency.html)[]

    The notes to play. Accepts a single Frequency or an array of frequencies.
  + duration: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html) | [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)[]

    the duration of the note
  + `Optional` time: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

    if no time is given, defaults to now
  + `Optional` velocity: number

    the velocity of the attack (0-1)

  #### Returns this

  #### Example

  ```ts
  const poly = new Tone.PolySynth(Tone.AMSynth).toDestination();
  // can pass in an array of durations as well
  poly.triggerAttackRelease(["Eb3", "G4", "Bb4", "D5"], [4, 3, 2, 1]);
  ```

### triggerRelease

* triggerRelease(notes, time?): this
* Trigger the release of the note. Unlike monophonic instruments,
  a note (or array of notes) needs to be passed in as the first argument.

  #### Parameters

  + notes: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Frequency](https://tonejs.github.io/docs/15.1.22/types/Unit.Frequency.html) | [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Frequency](https://tonejs.github.io/docs/15.1.22/types/Unit.Frequency.html)[]

    The notes to play. Accepts a single Frequency or an array of frequencies.
  + `Optional` time: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

    When the release will be triggered.

  #### Returns this

  #### Example

  ```ts
  const poly = new Tone.PolySynth(Tone.AMSynth).toDestination();
  poly.triggerAttack(["Ab3", "C4", "F5"]);
  // trigger the release of the given notes.
  poly.triggerRelease(["Ab3", "C4"], "+1");
  poly.triggerRelease("F5", "+3");
  ```

### unsync

* unsync(): this
* Unsync the instrument from the Transport

  #### Returns this

### `Static` getDefaults

* getDefaults(): [PolySynthOptions](https://tonejs.github.io/docs/15.1.22/interfaces/PolySynthOptions.html)<[Synth](https://tonejs.github.io/docs/15.1.22/classes/Synth.html)<[SynthOptions](https://tonejs.github.io/docs/15.1.22/interfaces/SynthOptions.html)>>
* #### Returns [PolySynthOptions](https://tonejs.github.io/docs/15.1.22/interfaces/PolySynthOptions.html)<[Synth](https://tonejs.github.io/docs/15.1.22/classes/Synth.html)<[SynthOptions](https://tonejs.github.io/docs/15.1.22/interfaces/SynthOptions.html)>>

### Settings

#### Member Visibility

#### Theme

OSLightDark

### On This Page

[constructor](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#constructor)[context](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#context)[debug](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#debug)[input](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#input)[maxPolyphony](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#maxPolyphony)[name](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#name)[output](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#output)[volume](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#volume)[version](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#version)[activeVoices](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#activeVoices)[blockTime](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#blockTime)[channelCount](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#channelCount)[channelCountMode](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#channelCountMode)[channelInterpretation](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#channelInterpretation)[disposed](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#disposed)[numberOfInputs](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#numberOfInputs)[numberOfOutputs](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#numberOfOutputs)[sampleTime](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#sampleTime)[chain](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#chain)[connect](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#connect)[disconnect](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#disconnect)[dispose](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#dispose)[fan](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#fan)[get](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#get)[immediate](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#immediate)[now](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#now)[releaseAll](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#releaseAll)[set](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#set)[sync](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#sync)[toDestination](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#toDestination)[toFrequency](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#toFrequency)[toMaster](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#toMaster)[toSeconds](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#toSeconds)[toString](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#toString)[toTicks](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#toTicks)[triggerAttack](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#triggerAttack)[triggerAttackRelease](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#triggerAttackRelease)[triggerRelease](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#triggerRelease)[unsync](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#unsync)[getDefaults](https://tonejs.github.io/docs/15.1.22/classes/PolySynth.html#getDefaults)
