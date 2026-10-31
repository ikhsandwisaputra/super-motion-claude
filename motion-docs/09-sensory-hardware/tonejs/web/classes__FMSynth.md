---
source: https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html
title: "FMSynth | Tone.js"
fetched: 2026-10-28
---

* Preparing search index...
* The search index is not available

[Tone.js](https://tonejs.github.io/docs/15.1.22/index.html)

* [Tone.js](https://tonejs.github.io/docs/15.1.22/modules.html)
* [FMSynth](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html)

# Class FMSynth

FMSynth is composed of two Tone.Synths where one Tone.Synth modulates
the frequency of a second Tone.Synth. A lot of spectral content
can be explored using the modulationIndex parameter. Read more about
frequency modulation synthesis on Sound On Sound: [Part 1](https://web.archive.org/web/20160403123704/http://www.soundonsound.com/sos/apr00/articles/synthsecrets.htm), [Part 2](https://web.archive.org/web/20160403115835/http://www.soundonsound.com/sos/may00/articles/synth.htm).

#### Example

```ts
const fmSynth = new Tone.FMSynth().toDestination();
fmSynth.triggerAttackRelease("C5", "4n");
```

#### Hierarchy

* ModulationSynth<[FMSynthOptions](https://tonejs.github.io/docs/15.1.22/interfaces/FMSynthOptions.html)>
  + FMSynth

##### Index

### Constructors

[constructor](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#constructor)

### Properties

[context](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#context)
[debug](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#debug)
[detune](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#detune)
[envelope](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#envelope)
[frequency](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#frequency)
[harmonicity](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#harmonicity)
[input](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#input)
[modulation](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#modulation)
[modulationEnvelope](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#modulationEnvelope)
[modulationIndex](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#modulationIndex)
[name](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#name)
[onsilence](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#onsilence)
[oscillator](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#oscillator)
[output](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#output)
[portamento](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#portamento)
[volume](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#volume)
[version](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#version)

### Accessors

[blockTime](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#blockTime)
[channelCount](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#channelCount)
[channelCountMode](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#channelCountMode)
[channelInterpretation](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#channelInterpretation)
[disposed](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#disposed)
[numberOfInputs](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#numberOfInputs)
[numberOfOutputs](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#numberOfOutputs)
[sampleTime](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#sampleTime)

### Methods

[chain](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#chain)
[connect](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#connect)
[disconnect](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#disconnect)
[dispose](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#dispose)
[fan](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#fan)
[get](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#get)
[getLevelAtTime](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#getLevelAtTime)
[immediate](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#immediate)
[now](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#now)
[set](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#set)
[setNote](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#setNote)
[sync](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#sync)
[toDestination](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#toDestination)
[toFrequency](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#toFrequency)
[toMaster](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#toMaster)
[toSeconds](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#toSeconds)
[toString](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#toString)
[toTicks](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#toTicks)
[triggerAttack](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#triggerAttack)
[triggerAttackRelease](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#triggerAttackRelease)
[triggerRelease](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#triggerRelease)
[unsync](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#unsync)
[getDefaults](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#getDefaults)

## Constructors

### constructor

* new FMSynth(options?): [FMSynth](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html)
* #### Parameters

  + `Optional` options: RecursivePartial<[FMSynthOptions](https://tonejs.github.io/docs/15.1.22/interfaces/FMSynthOptions.html)>

  #### Returns [FMSynth](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html)

## Properties

### `Readonly` context

context: [BaseContext](https://tonejs.github.io/docs/15.1.22/classes/BaseContext.html)

The context belonging to the node.

### debug

debug: boolean = false

Set this debug flag to log all events that happen in this class.

### `Readonly` detune

detune: [Signal](https://tonejs.github.io/docs/15.1.22/classes/Signal.html)<"cents">

The detune in cents

### `Readonly` envelope

envelope: [AmplitudeEnvelope](https://tonejs.github.io/docs/15.1.22/classes/AmplitudeEnvelope.html)

The carrier's envelope

### `Readonly` frequency

frequency: [Signal](https://tonejs.github.io/docs/15.1.22/classes/Signal.html)<"frequency">

The frequency control

### `Readonly` harmonicity

harmonicity: [Multiply](https://tonejs.github.io/docs/15.1.22/classes/Multiply.html)<"number">

Harmonicity is the ratio between the two voices. A harmonicity of
1 is no change. Harmonicity = 2 means a change of an octave.

#### Example

```ts
const amSynth = new Tone.AMSynth().toDestination();
// pitch the modulator an octave below oscillator
amSynth.harmonicity.value = 0.5;
amSynth.triggerAttackRelease("C5", "4n");
```

### input

input: undefined

The instrument only has an output

### `Readonly` modulation

modulation: [OmniOscillator](https://tonejs.github.io/docs/15.1.22/classes/OmniOscillator.html)<any>

The modulator's oscillator which is applied to the amplitude of the oscillator

### `Readonly` modulationEnvelope

modulationEnvelope: [AmplitudeEnvelope](https://tonejs.github.io/docs/15.1.22/classes/AmplitudeEnvelope.html)

The modulator's envelope

### `Readonly` modulationIndex

modulationIndex: [Multiply](https://tonejs.github.io/docs/15.1.22/classes/Multiply.html)<"number">

The modulation index which essentially the depth or amount of the modulation. It is the
ratio of the frequency of the modulating signal (mf) to the amplitude of the
modulating signal (ma) -- as in ma/mf.

### `Readonly` name

name: string = "FMSynth"

### onsilence

onsilence: onSilenceCallback

Invoked when the release has finished and the output is silent.

### `Readonly` oscillator

oscillator: [OmniOscillator](https://tonejs.github.io/docs/15.1.22/classes/OmniOscillator.html)<any>

The carrier's oscillator

### output

output: [OutputNode](https://tonejs.github.io/docs/15.1.22/types/OutputNode.html)

### portamento

portamento: number

The glide time between notes.

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

* get(): [FMSynthOptions](https://tonejs.github.io/docs/15.1.22/interfaces/FMSynthOptions.html)
* Get the object's attributes.

  #### Returns [FMSynthOptions](https://tonejs.github.io/docs/15.1.22/interfaces/FMSynthOptions.html)

  #### Example

  ```ts
  const osc = new Tone.Oscillator();
  console.log(osc.get());
  ```

### getLevelAtTime

* getLevelAtTime(time): number
* #### Parameters

  + time: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

  #### Returns number

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

  + props: RecursivePartial<[FMSynthOptions](https://tonejs.github.io/docs/15.1.22/interfaces/FMSynthOptions.html)>

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

### setNote

* setNote(note, time?): this
* Set the note at the given time. If no time is given, the note
  will set immediately.

  #### Parameters

  + note: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Frequency](https://tonejs.github.io/docs/15.1.22/types/Unit.Frequency.html) | [FrequencyClass](https://tonejs.github.io/docs/15.1.22/classes/FrequencyClass.html)<number>

    The note to change to.
  + `Optional` time: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

    The time when the note should be set.

  #### Returns this

  #### Example

  ```ts
  const synth = new Tone.Synth().toDestination();
  synth.triggerAttack("C4");
  // change to F#6 in one quarter note from now.
  synth.setNote("F#6", "+4n");
  ```

### sync

* sync(): this
* Sync the instrument to the Transport. All subsequent calls of
  [triggerAttack](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#triggerAttack) and [triggerRelease](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#triggerRelease) will be scheduled along the transport.

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

  [toDestination](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#toDestination)

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

* triggerAttack(note, time?, velocity?): this
* Trigger the attack of the note optionally with a given velocity.

  #### Parameters

  + note: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Frequency](https://tonejs.github.io/docs/15.1.22/types/Unit.Frequency.html) | [FrequencyClass](https://tonejs.github.io/docs/15.1.22/classes/FrequencyClass.html)<number>

    The note to trigger.
  + `Optional` time: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

    When the note should start.
  + velocity: number = 1

    The velocity determines how "loud" the note will be.

  #### Returns this

  #### Example

  ```ts
  const synth = new Tone.Synth().toDestination();
  // trigger the note a half second from now at half velocity
  synth.triggerAttack("C4", "+0.5", 0.5);
  ```

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
* Trigger the release portion of the envelope.

  #### Parameters

  + `Optional` time: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

    If no time is given, the release happens immediately.

  #### Returns this

  #### Example

  ```ts
  const synth = new Tone.Synth().toDestination();
  synth.triggerAttack("C4");
  // trigger the release a second from now
  synth.triggerRelease("+1");
  ```

### unsync

* unsync(): this
* Unsync the instrument from the Transport

  #### Returns this

### `Static` getDefaults

* getDefaults(): [FMSynthOptions](https://tonejs.github.io/docs/15.1.22/interfaces/FMSynthOptions.html)
* #### Returns [FMSynthOptions](https://tonejs.github.io/docs/15.1.22/interfaces/FMSynthOptions.html)

### Settings

#### Member Visibility

#### Theme

OSLightDark

### On This Page

[constructor](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#constructor)[context](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#context)[debug](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#debug)[detune](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#detune)[envelope](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#envelope)[frequency](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#frequency)[harmonicity](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#harmonicity)[input](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#input)[modulation](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#modulation)[modulationEnvelope](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#modulationEnvelope)[modulationIndex](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#modulationIndex)[name](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#name)[onsilence](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#onsilence)[oscillator](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#oscillator)[output](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#output)[portamento](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#portamento)[volume](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#volume)[version](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#version)[blockTime](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#blockTime)[channelCount](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#channelCount)[channelCountMode](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#channelCountMode)[channelInterpretation](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#channelInterpretation)[disposed](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#disposed)[numberOfInputs](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#numberOfInputs)[numberOfOutputs](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#numberOfOutputs)[sampleTime](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#sampleTime)[chain](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#chain)[connect](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#connect)[disconnect](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#disconnect)[dispose](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#dispose)[fan](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#fan)[get](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#get)[getLevelAtTime](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#getLevelAtTime)[immediate](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#immediate)[now](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#now)[set](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#set)[setNote](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#setNote)[sync](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#sync)[toDestination](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#toDestination)[toFrequency](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#toFrequency)[toMaster](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#toMaster)[toSeconds](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#toSeconds)[toString](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#toString)[toTicks](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#toTicks)[triggerAttack](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#triggerAttack)[triggerAttackRelease](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#triggerAttackRelease)[triggerRelease](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#triggerRelease)[unsync](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#unsync)[getDefaults](https://tonejs.github.io/docs/15.1.22/classes/FMSynth.html#getDefaults)
