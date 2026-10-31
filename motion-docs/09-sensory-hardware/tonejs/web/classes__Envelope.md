---
source: https://tonejs.github.io/docs/15.1.22/classes/Envelope.html
title: "Envelope | Tone.js"
fetched: 2026-10-28
---

* Preparing search index...
* The search index is not available

[Tone.js](https://tonejs.github.io/docs/15.1.22/index.html)

* [Tone.js](https://tonejs.github.io/docs/15.1.22/modules.html)
* [Envelope](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html)

# Class Envelope

Envelope is an [ADSR](https://en.wikipedia.org/wiki/Synthesizer#ADSR_envelope)
envelope generator. Envelope outputs a signal which
can be connected to an AudioParam or Tone.Signal.

```
          /\
         /  \
        /    \
       /      \
      /        \___________
     /                     \
    /                       \
   /                         \
  /                           \
```

#### Example

```ts
return Tone.Offline(() => {
    const env = new Tone.Envelope({
        attack: 0.1,
        decay: 0.2,
        sustain: 0.5,
        release: 0.8,
    }).toDestination();
    env.triggerAttackRelease(0.5);
}, 1.5, 1);
```

#### Hierarchy ([view full](https://tonejs.github.io/docs/15.1.22/hierarchy.html#Envelope))

* [ToneAudioNode](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioNode.html)<[EnvelopeOptions](https://tonejs.github.io/docs/15.1.22/interfaces/EnvelopeOptions.html)>
  + Envelope
    - [AmplitudeEnvelope](https://tonejs.github.io/docs/15.1.22/classes/AmplitudeEnvelope.html)
    - [FrequencyEnvelope](https://tonejs.github.io/docs/15.1.22/classes/FrequencyEnvelope.html)

##### Index

### Constructors

[constructor](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#constructor)

### Properties

[attack](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#attack)
[context](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#context)
[debug](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#debug)
[decay](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#decay)
[input](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#input)
[name](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#name)
[output](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#output)
[release](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#release)
[sustain](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#sustain)
[version](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#version)

### Accessors

[attackCurve](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#attackCurve)
[blockTime](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#blockTime)
[channelCount](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#channelCount)
[channelCountMode](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#channelCountMode)
[channelInterpretation](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#channelInterpretation)
[decayCurve](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#decayCurve)
[disposed](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#disposed)
[numberOfInputs](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#numberOfInputs)
[numberOfOutputs](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#numberOfOutputs)
[releaseCurve](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#releaseCurve)
[sampleTime](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#sampleTime)
[value](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#value)

### Methods

[asArray](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#asArray)
[cancel](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#cancel)
[chain](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#chain)
[connect](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#connect)
[disconnect](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#disconnect)
[dispose](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#dispose)
[fan](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#fan)
[get](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#get)
[getValueAtTime](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#getValueAtTime)
[immediate](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#immediate)
[now](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#now)
[set](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#set)
[toDestination](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#toDestination)
[toFrequency](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#toFrequency)
[toMaster](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#toMaster)
[toSeconds](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#toSeconds)
[toString](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#toString)
[toTicks](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#toTicks)
[triggerAttack](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#triggerAttack)
[triggerAttackRelease](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#triggerAttackRelease)
[triggerRelease](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#triggerRelease)
[getDefaults](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#getDefaults)

## Constructors

### constructor

* new Envelope(attack?, decay?, sustain?, release?): [Envelope](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html)
* #### Parameters

  + `Optional` attack: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

    The amount of time it takes for the envelope to go from
    0 to it's maximum value.
  + `Optional` decay: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

    The period of time after the attack that it takes for the envelope
    to fall to the sustain value. Value must be greater than 0.
  + `Optional` sustain: number

    The percent of the maximum value that the envelope rests at until
    the release is triggered.
  + `Optional` release: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

    The amount of time after the release is triggered it takes to reach 0.
    Value must be greater than 0.

  #### Returns [Envelope](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html)
* new Envelope(options?): [Envelope](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html)
* #### Parameters

  + `Optional` options: Partial<[EnvelopeOptions](https://tonejs.github.io/docs/15.1.22/interfaces/EnvelopeOptions.html)>

  #### Returns [Envelope](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html)

## Properties

### attack

attack: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

When triggerAttack is called, the attack time is the amount of
time it takes for the envelope to reach it's maximum value.

```
          /\
         /X \
        /XX  \
       /XXX   \
      /XXXX    \___________
     /XXXXX                \
    /XXXXXX                 \
   /XXXXXXX                  \
  /XXXXXXXX                   \
```

#### Min

0

#### Max

2

### `Readonly` context

context: [BaseContext](https://tonejs.github.io/docs/15.1.22/classes/BaseContext.html)

The context belonging to the node.

### debug

debug: boolean = false

Set this debug flag to log all events that happen in this class.

### decay

decay: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

After the attack portion of the envelope, the value will fall
over the duration of the decay time to it's sustain value.

```
          /\
         / X\
        /  XX\
       /   XXX\
      /    XXXX\___________
     /     XXXXX           \
    /      XXXXX            \
   /       XXXXX             \
  /        XXXXX              \
```

#### Min

0

#### Max

2

### input

input: undefined | [InputNode](https://tonejs.github.io/docs/15.1.22/types/InputNode.html) = undefined

Envelope has no input

### `Readonly` name

name: string = "Envelope"

The name of the class

### output

output: [OutputNode](https://tonejs.github.io/docs/15.1.22/types/OutputNode.html) = ...

The output signal of the envelope

### release

release: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

After triggerRelease is called, the envelope's
value will fall to it's miminum value over the
duration of the release time.

```
          /\
         /  \
        /    \
       /      \
      /        \___________
     /                    X\
    /                     XX\
   /                      XXX\
  /                       XXXX\
```

#### Min

0

#### Max

5

### sustain

sustain: number

The sustain value is the value
which the envelope rests at after triggerAttack is
called, but before triggerRelease is invoked.

```
          /\
         /  \
        /    \
       /      \
      /        \___________
     /          XXXXXXXXXXX\
    /           XXXXXXXXXXX \
   /            XXXXXXXXXXX  \
  /             XXXXXXXXXXX   \
```

### `Static` version

version: string = version

The version number semver

## Accessors

### attackCurve

* get attackCurve(): [EnvelopeCurve](https://tonejs.github.io/docs/15.1.22/types/EnvelopeCurve.html)
* The shape of the attack.
  Can be any of these strings:

  + "linear"
  + "exponential"
  + "sine"
  + "cosine"
  + "bounce"
  + "ripple"
  + "step"

  Can also be an array which describes the curve. Values
  in the array are evenly subdivided and linearly
  interpolated over the duration of the attack.

  #### Returns [EnvelopeCurve](https://tonejs.github.io/docs/15.1.22/types/EnvelopeCurve.html)

  #### Example

  ```ts
  return Tone.Offline(() => {
      const env = new Tone.Envelope(0.4).toDestination();
      env.attackCurve = "linear";
      env.triggerAttack();
  }, 1, 1);
  ```
* set attackCurve(curve): void
* #### Parameters

  + curve: [EnvelopeCurve](https://tonejs.github.io/docs/15.1.22/types/EnvelopeCurve.html)

  #### Returns void

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

### decayCurve

* get decayCurve(): [EnvelopeCurve](https://tonejs.github.io/docs/15.1.22/types/EnvelopeCurve.html)
* The shape of the decay either "linear" or "exponential"

  #### Returns [EnvelopeCurve](https://tonejs.github.io/docs/15.1.22/types/EnvelopeCurve.html)

  #### Example

  ```ts
  return Tone.Offline(() => {
      const env = new Tone.Envelope({
          sustain: 0.1,
          decay: 0.5
      }).toDestination();
      env.decayCurve = "linear";
      env.triggerAttack();
  }, 1, 1);
  ```
* set decayCurve(curve): void
* #### Parameters

  + curve: [EnvelopeCurve](https://tonejs.github.io/docs/15.1.22/types/EnvelopeCurve.html)

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

### releaseCurve

* get releaseCurve(): [EnvelopeCurve](https://tonejs.github.io/docs/15.1.22/types/EnvelopeCurve.html)
* The shape of the release. See the attack curve types.

  #### Returns [EnvelopeCurve](https://tonejs.github.io/docs/15.1.22/types/EnvelopeCurve.html)

  #### Example

  ```ts
  return Tone.Offline(() => {
      const env = new Tone.Envelope({
          release: 0.8
      }).toDestination();
      env.triggerAttack();
      // release curve could also be defined by an array
      env.releaseCurve = [1, 0.3, 0.4, 0.2, 0.7, 0];
      env.triggerRelease(0.2);
  }, 1, 1);
  ```
* set releaseCurve(curve): void
* #### Parameters

  + curve: [EnvelopeCurve](https://tonejs.github.io/docs/15.1.22/types/EnvelopeCurve.html)

  #### Returns void

### sampleTime

* get sampleTime(): number
* The duration in seconds of one sample.

  #### Returns number

### value

* get value(): number
* Read the current value of the envelope. Useful for
  synchronizing visual output to the envelope.

  #### Returns number

## Methods

### asArray

* asArray(length?): Promise<Float32Array>
* Render the envelope curve to an array of the given length.
  Good for visualizing the envelope curve. Rescales the duration of the
  envelope to fit the length.

  #### Parameters

  + length: number = 1024

  #### Returns Promise<Float32Array>

### cancel

* cancel(after?): this
* Cancels all scheduled envelope changes after the given time.

  #### Parameters

  + `Optional` after: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

  #### Returns this

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

* connect(destination, outputNumber?, inputNumber?): this
* Connect the envelope to a destination node.

  #### Parameters

  + destination: [InputNode](https://tonejs.github.io/docs/15.1.22/types/InputNode.html)
  + outputNumber: number = 0
  + inputNumber: number = 0

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
* Dispose and disconnect

  #### Returns this

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

* get(): [EnvelopeOptions](https://tonejs.github.io/docs/15.1.22/interfaces/EnvelopeOptions.html)
* Get the object's attributes.

  #### Returns [EnvelopeOptions](https://tonejs.github.io/docs/15.1.22/interfaces/EnvelopeOptions.html)

  #### Example

  ```ts
  const osc = new Tone.Oscillator();
  console.log(osc.get());
  ```

### getValueAtTime

* getValueAtTime(time): number
* Get the scheduled value at the given time. This will
  return the unconverted (raw) value.

  #### Parameters

  + time: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

  #### Returns number

  #### Example

  ```ts
  const env = new Tone.Envelope(0.5, 1, 0.4, 2);
  env.triggerAttackRelease(2);
  setInterval(() => console.log(env.getValueAtTime(Tone.now())), 100);
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

  + props: RecursivePartial<[EnvelopeOptions](https://tonejs.github.io/docs/15.1.22/interfaces/EnvelopeOptions.html)>

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

  [toDestination](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#toDestination)

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

* triggerAttack(time?, velocity?): this
* Trigger the attack/decay portion of the ADSR envelope.

  #### Parameters

  + `Optional` time: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

    When the attack should start.
  + velocity: number = 1

    The velocity of the envelope scales the vales.
    number between 0-1

  #### Returns this

  #### Example

  ```ts
  const env = new Tone.AmplitudeEnvelope().toDestination();
  const osc = new Tone.Oscillator().connect(env).start();
  // trigger the attack 0.5 seconds from now with a velocity of 0.2
  env.triggerAttack("+0.5", 0.2);
  ```

### triggerAttackRelease

* triggerAttackRelease(duration, time?, velocity?): this
* triggerAttackRelease is shorthand for triggerAttack, then waiting
  some duration, then triggerRelease.

  #### Parameters

  + duration: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

    The duration of the sustain.
  + `Optional` time: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

    When the attack should be triggered.
  + velocity: number = 1

    The velocity of the envelope.

  #### Returns this

  #### Example

  ```ts
  const env = new Tone.AmplitudeEnvelope().toDestination();
  const osc = new Tone.Oscillator().connect(env).start();
  // trigger the release 0.5 seconds after the attack
  env.triggerAttackRelease(0.5);
  ```

### triggerRelease

* triggerRelease(time?): this
* Triggers the release of the envelope.

  #### Parameters

  + `Optional` time: [Unit](https://tonejs.github.io/docs/15.1.22/modules/Unit.html).[Time](https://tonejs.github.io/docs/15.1.22/types/Unit.Time.html)

    When the release portion of the envelope should start.

  #### Returns this

  #### Example

  ```ts
  const env = new Tone.AmplitudeEnvelope().toDestination();
  const osc = new Tone.Oscillator({
      type: "sawtooth"
  }).connect(env).start();
  env.triggerAttack();
  // trigger the release half a second after the attack
  env.triggerRelease("+0.5");
  ```

### `Static` getDefaults

* getDefaults(): [EnvelopeOptions](https://tonejs.github.io/docs/15.1.22/interfaces/EnvelopeOptions.html)
* #### Returns [EnvelopeOptions](https://tonejs.github.io/docs/15.1.22/interfaces/EnvelopeOptions.html)

### Settings

#### Member Visibility

#### Theme

OSLightDark

### On This Page

[constructor](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#constructor)[attack](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#attack)[context](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#context)[debug](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#debug)[decay](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#decay)[input](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#input)[name](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#name)[output](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#output)[release](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#release)[sustain](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#sustain)[version](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#version)[attackCurve](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#attackCurve)[blockTime](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#blockTime)[channelCount](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#channelCount)[channelCountMode](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#channelCountMode)[channelInterpretation](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#channelInterpretation)[decayCurve](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#decayCurve)[disposed](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#disposed)[numberOfInputs](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#numberOfInputs)[numberOfOutputs](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#numberOfOutputs)[releaseCurve](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#releaseCurve)[sampleTime](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#sampleTime)[value](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#value)[asArray](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#asArray)[cancel](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#cancel)[chain](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#chain)[connect](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#connect)[disconnect](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#disconnect)[dispose](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#dispose)[fan](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#fan)[get](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#get)[getValueAtTime](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#getValueAtTime)[immediate](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#immediate)[now](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#now)[set](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#set)[toDestination](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#toDestination)[toFrequency](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#toFrequency)[toMaster](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#toMaster)[toSeconds](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#toSeconds)[toString](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#toString)[toTicks](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#toTicks)[triggerAttack](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#triggerAttack)[triggerAttackRelease](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#triggerAttackRelease)[triggerRelease](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#triggerRelease)[getDefaults](https://tonejs.github.io/docs/15.1.22/classes/Envelope.html#getDefaults)
