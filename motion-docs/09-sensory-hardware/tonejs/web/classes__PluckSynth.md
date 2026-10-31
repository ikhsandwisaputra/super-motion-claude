---
source: https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html
title: "PluckSynth | Tone.js"
fetched: 2026-10-28
---

* Preparing search index...
* The search index is not available

[Tone.js](https://tonejs.github.io/docs/15.1.22/index.html)

* [Tone.js](https://tonejs.github.io/docs/15.1.22/modules.html)
* [PluckSynth](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html)

# Class PluckSynth

Karplus-Strong string synthesis.

#### Example

```ts
const plucky = new Tone.PluckSynth().toDestination();
plucky.triggerAttack("C4", "+0.5");
plucky.triggerAttack("C3", "+1");
plucky.triggerAttack("C2", "+1.5");
plucky.triggerAttack("C1", "+2");
```

#### Hierarchy

* Instrument<[PluckSynthOptions](https://tonejs.github.io/docs/15.1.22/interfaces/PluckSynthOptions.html)>
  + PluckSynth

##### Index

### Constructors

[constructor](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#constructor)

### Properties

[attackNoise](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#attackNoise)
[context](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#context)
[debug](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#debug)
[input](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#input)
[name](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#name)
[output](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#output)
[release](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#release)
[resonance](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#resonance)
[volume](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#volume)
[version](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#version)

### Accessors

[blockTime](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#blockTime)
[channelCount](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#channelCount)
[channelCountMode](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#channelCountMode)
[channelInterpretation](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#channelInterpretation)
[dampening](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#dampening)
[disposed](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#disposed)
[numberOfInputs](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#numberOfInputs)
[numberOfOutputs](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#numberOfOutputs)
[sampleTime](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#sampleTime)

### Methods

[chain](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#chain)
[connect](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#connect)
[disconnect](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#disconnect)
[dispose](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#dispose)
[fan](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#fan)
[get](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#get)
[immediate](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#immediate)
[now](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#now)
[set](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#set)
[sync](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#sync)
[toDestination](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#toDestination)
[toFrequency](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#toFrequency)
[toMaster](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#toMaster)
[toSeconds](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#toSeconds)
[toString](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#toString)
[toTicks](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#toTicks)
[triggerAttack](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#triggerAttack)
[triggerAttackRelease](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#triggerAttackRelease)
[triggerRelease](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#triggerRelease)
[unsync](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#unsync)
[getDefaults](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#getDefaults)

## Constructors

### constructor

* new PluckSynth(options?): [PluckSynth](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html)
* #### Parameters

  + `Optional` options: RecursivePartial<[PluckSynthOptions](https://tonejs.github.io/docs/15.1.22/interfaces/PluckSynthOptions.html)>

  #### Returns [PluckSynth](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html)

## Properties

### attackNoise

attackNoise: number

The amount of noise at the attack.
Nominal range of [0.1, 20]

#### Min

0.1

#### Max

20

### `Readonly` context

context: [BaseContext](https://tonejs.github.io/docs/15.1.22/classes/BaseContext.html)

The context belonging to the node.

### debug

debug: boolean = false

Set this debug flag to log all events that happen in this class.

### input

input: undefined

The instrument only has an output

### `Readonly` name

name: "PluckSynth" = "PluckSynth"

### output

output: [OutputNode](https://tonejs.github.io/docs/15.1.22/types/OutputNode.html)

### release

release: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

The release time which corresponds to a resonance ramp down to 0

### resonance

resonance: number

The amount of resonance of the pluck. Also correlates to the sustain duration.

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

### dampening

* get dampening(): [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Frequency](https://tonejs.github.io/docs/15.1.22/types/Unit.Frequency.html)
* The dampening control. i.e. the lowpass filter frequency of the comb filter

  #### Returns [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Frequency](https://tonejs.github.io/docs/15.1.22/types/Unit.Frequency.html)

  #### Min

  0

  #### Max

  7000
* set dampening(fq): void
* #### Parameters

  + fq: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Frequency](https://tonejs.github.io/docs/15.1.22/types/Unit.Frequency.html)

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

* get(): [PluckSynthOptions](https://tonejs.github.io/docs/15.1.22/interfaces/PluckSynthOptions.html)
* Get the object's attributes.

  #### Returns [PluckSynthOptions](https://tonejs.github.io/docs/15.1.22/interfaces/PluckSynthOptions.html)

  #### Example

  ```ts
  const osc = new Tone.Oscillator();
  console.log(osc.get());
  ```

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

### set

* set(props): this
* Set multiple properties at once with an object.

  #### Parameters

  + props: RecursivePartial<[PluckSynthOptions](https://tonejs.github.io/docs/15.1.22/interfaces/PluckSynthOptions.html)>

  #### Returns this

  #### Example

  ```ts
  const filter = new Tone.Filter().toDestination();
  // set values using an object
  filter.set({
      frequency: "C6",
      type: "highpass"
  });
  const player = new Tone.Player("https://tonejs.github.io/audio/berklee/Analogsynth_octaves_highmid.mp3").connect(filter);
  player.autostart = true;
  ```

### sync

* sync(): this
* Sync the instrument to the Transport. All subsequent calls of
  [triggerAttack](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#triggerAttack) and [triggerRelease](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#triggerRelease) will be scheduled along the transport.

  #### Returns this

  #### Example

  ```ts
  const fmSynth = new Tone.FMSynth().toDestination();
  fmSynth.volume.value = -6;
  fmSynth.sync();
  // schedule 3 notes when the transport first starts
  fmSynth.triggerAttackRelease("C4", "8n", 0);
  fmSynth.triggerAttackRelease("E4", "8n", "8n");
  fmSynth.triggerAttackRelease("G4", "8n", "4n");
  // start the transport to hear the notes
  Tone.Transport.start();
  ```

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

  [toDestination](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#toDestination)

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

* triggerAttack(note, time?): this
* #### Parameters

  + note: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Frequency](https://tonejs.github.io/docs/15.1.22/types/Unit.Frequency.html)
  + `Optional` time: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

  #### Returns this

### triggerAttackRelease

* triggerAttackRelease(note, duration, time?, velocity?): this
* Trigger the attack and then the release after the duration.

  #### Parameters

  + note: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Frequency](https://tonejs.github.io/docs/15.1.22/types/Unit.Frequency.html)

    The note to trigger.
  + duration: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

    How long the note should be held for before
    triggering the release. This value must be greater than 0.
  + `Optional` time: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

    When the note should be triggered.
  + `Optional` velocity: number

    The velocity the note should be triggered at.

  #### Returns this

  #### Example

  ```ts
  const synth = new Tone.Synth().toDestination();
  // trigger "C4" for the duration of an 8th note
  synth.triggerAttackRelease("C4", "8n");
  ```

### triggerRelease

* triggerRelease(time?): this
* Ramp down the [resonance](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#resonance) to 0 over the duration of the release time.

  #### Parameters

  + `Optional` time: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

  #### Returns this

### unsync

* unsync(): this
* Unsync the instrument from the Transport

  #### Returns this

### `Static` getDefaults

* getDefaults(): [PluckSynthOptions](https://tonejs.github.io/docs/15.1.22/interfaces/PluckSynthOptions.html)
* #### Returns [PluckSynthOptions](https://tonejs.github.io/docs/15.1.22/interfaces/PluckSynthOptions.html)

### Settings

#### Member Visibility

#### Theme

OSLightDark

### On This Page

[constructor](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#constructor)[attackNoise](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#attackNoise)[context](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#context)[debug](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#debug)[input](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#input)[name](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#name)[output](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#output)[release](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#release)[resonance](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#resonance)[volume](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#volume)[version](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#version)[blockTime](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#blockTime)[channelCount](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#channelCount)[channelCountMode](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#channelCountMode)[channelInterpretation](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#channelInterpretation)[dampening](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#dampening)[disposed](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#disposed)[numberOfInputs](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#numberOfInputs)[numberOfOutputs](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#numberOfOutputs)[sampleTime](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#sampleTime)[chain](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#chain)[connect](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#connect)[disconnect](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#disconnect)[dispose](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#dispose)[fan](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#fan)[get](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#get)[immediate](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#immediate)[now](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#now)[set](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#set)[sync](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#sync)[toDestination](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#toDestination)[toFrequency](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#toFrequency)[toMaster](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#toMaster)[toSeconds](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#toSeconds)[toString](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#toString)[toTicks](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#toTicks)[triggerAttack](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#triggerAttack)[triggerAttackRelease](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#triggerAttackRelease)[triggerRelease](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#triggerRelease)[unsync](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#unsync)[getDefaults](https://tonejs.github.io/docs/15.1.22/classes/PluckSynth.html#getDefaults)
