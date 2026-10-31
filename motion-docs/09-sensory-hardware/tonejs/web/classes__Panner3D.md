---
source: https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html
title: "Panner3D | Tone.js"
fetched: 2026-10-28
---

* Preparing search index...
* The search index is not available

[Tone.js](https://tonejs.github.io/docs/15.1.22/index.html)

* [Tone.js](https://tonejs.github.io/docs/15.1.22/modules.html)
* [Panner3D](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html)

# Class Panner3D

A spatialized panner node which supports equalpower or HRTF panning.

#### Hierarchy ([view full](https://tonejs.github.io/docs/15.1.22/hierarchy.html#Panner3D))

* [ToneAudioNode](https://tonejs.github.io/docs/15.1.22/classes/ToneAudioNode.html)<[Panner3DOptions](https://tonejs.github.io/docs/15.1.22/interfaces/Panner3DOptions.html)>
  + Panner3D

##### Index

### Constructors

[constructor](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#constructor)

### Properties

[context](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#context)
[debug](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#debug)
[input](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#input)
[name](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#name)
[orientationX](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#orientationX)
[orientationY](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#orientationY)
[orientationZ](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#orientationZ)
[output](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#output)
[positionX](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#positionX)
[positionY](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#positionY)
[positionZ](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#positionZ)
[version](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#version)

### Accessors

[blockTime](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#blockTime)
[channelCount](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#channelCount)
[channelCountMode](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#channelCountMode)
[channelInterpretation](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#channelInterpretation)
[coneInnerAngle](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#coneInnerAngle)
[coneOuterAngle](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#coneOuterAngle)
[coneOuterGain](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#coneOuterGain)
[disposed](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#disposed)
[distanceModel](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#distanceModel)
[maxDistance](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#maxDistance)
[numberOfInputs](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#numberOfInputs)
[numberOfOutputs](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#numberOfOutputs)
[panningModel](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#panningModel)
[refDistance](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#refDistance)
[rolloffFactor](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#rolloffFactor)
[sampleTime](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#sampleTime)

### Methods

[chain](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#chain)
[connect](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#connect)
[disconnect](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#disconnect)
[dispose](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#dispose)
[fan](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#fan)
[get](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#get)
[immediate](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#immediate)
[now](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#now)
[set](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#set)
[setOrientation](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#setOrientation)
[setPosition](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#setPosition)
[toDestination](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#toDestination)
[toFrequency](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#toFrequency)
[toMaster](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#toMaster)
[toSeconds](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#toSeconds)
[toString](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#toString)
[toTicks](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#toTicks)
[getDefaults](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#getDefaults)

## Constructors

### constructor

* new Panner3D(positionX, positionY, positionZ): [Panner3D](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html)
* #### Parameters

  + positionX: number

    The initial x position.
  + positionY: number

    The initial y position.
  + positionZ: number

    The initial z position.

  #### Returns [Panner3D](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html)
* new Panner3D(options?): [Panner3D](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html)
* #### Parameters

  + `Optional` options: Partial<[Panner3DOptions](https://tonejs.github.io/docs/15.1.22/interfaces/Panner3DOptions.html)>

  #### Returns [Panner3D](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html)

## Properties

### `Readonly` context

context: [BaseContext](https://tonejs.github.io/docs/15.1.22/classes/BaseContext.html)

The context belonging to the node.

### debug

debug: boolean = false

Set this debug flag to log all events that happen in this class.

### `Readonly` input

input: PannerNode

The input node or nodes. If the object is a source,
it does not have any input and this.input is undefined.

### `Readonly` name

name: string = "Panner3D"

The name of the class

### `Readonly` orientationX

orientationX: [Param](https://tonejs.github.io/docs/15.1.22/classes/Param.html)<"number">

### `Readonly` orientationY

orientationY: [Param](https://tonejs.github.io/docs/15.1.22/classes/Param.html)<"number">

### `Readonly` orientationZ

orientationZ: [Param](https://tonejs.github.io/docs/15.1.22/classes/Param.html)<"number">

### `Readonly` output

output: PannerNode

The output nodes. If the object is a sink,
it does not have any output and this.output is undefined.

### `Readonly` positionX

positionX: [Param](https://tonejs.github.io/docs/15.1.22/classes/Param.html)<"number">

### `Readonly` positionY

positionY: [Param](https://tonejs.github.io/docs/15.1.22/classes/Param.html)<"number">

### `Readonly` positionZ

positionZ: [Param](https://tonejs.github.io/docs/15.1.22/classes/Param.html)<"number">

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

### coneInnerAngle

* get coneInnerAngle(): number
* The angle, in degrees, inside of which there will be no volume reduction

  #### Returns number
* set coneInnerAngle(val): void
* #### Parameters

  + val: number

  #### Returns void

### coneOuterAngle

* get coneOuterAngle(): number
* The angle, in degrees, outside of which the volume will be reduced
  to a constant value of coneOuterGain

  #### Returns number
* set coneOuterAngle(val): void
* #### Parameters

  + val: number

  #### Returns void

### coneOuterGain

* get coneOuterGain(): number
* The gain outside of the coneOuterAngle

  #### Returns number
* set coneOuterGain(val): void
* #### Parameters

  + val: number

  #### Returns void

### disposed

* get disposed(): boolean
* Indicates if the instance was disposed. 'Disposing' an
  instance means that all of the Web Audio nodes that were
  created for the instance are disconnected and freed for garbage collection.

  #### Returns boolean

### distanceModel

* get distanceModel(): DistanceModelType
* The distance model used by, "linear", "inverse", or "exponential".

  #### Returns DistanceModelType
* set distanceModel(val): void
* #### Parameters

  + val: DistanceModelType

  #### Returns void

### maxDistance

* get maxDistance(): number
* The maximum distance between source and listener,
  after which the volume will not be reduced any further.

  #### Returns number
* set maxDistance(val): void
* #### Parameters

  + val: number

  #### Returns void

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

### panningModel

* get panningModel(): PanningModelType
* The panning model. Either "equalpower" or "HRTF".

  #### Returns PanningModelType
* set panningModel(val): void
* #### Parameters

  + val: PanningModelType

  #### Returns void

### refDistance

* get refDistance(): number
* A reference distance for reducing volume as source move further from the listener

  #### Returns number
* set refDistance(val): void
* #### Parameters

  + val: number

  #### Returns void

### rolloffFactor

* get rolloffFactor(): number
* Describes how quickly the volume is reduced as source moves away from listener.

  #### Returns number
* set rolloffFactor(val): void
* #### Parameters

  + val: number

  #### Returns void

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

* get(): [Panner3DOptions](https://tonejs.github.io/docs/15.1.22/interfaces/Panner3DOptions.html)
* Get the object's attributes.

  #### Returns [Panner3DOptions](https://tonejs.github.io/docs/15.1.22/interfaces/Panner3DOptions.html)

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

  + props: RecursivePartial<[Panner3DOptions](https://tonejs.github.io/docs/15.1.22/interfaces/Panner3DOptions.html)>

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

### setOrientation

* setOrientation(x, y, z): this
* Sets the orientation of the source in 3d space.

  #### Parameters

  + x: number
  + y: number
  + z: number

  #### Returns this

### setPosition

* setPosition(x, y, z): this
* Sets the position of the source in 3d space.

  #### Parameters

  + x: number
  + y: number
  + z: number

  #### Returns this

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

  [toDestination](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#toDestination)

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

### `Static` getDefaults

* getDefaults(): [Panner3DOptions](https://tonejs.github.io/docs/15.1.22/interfaces/Panner3DOptions.html)
* #### Returns [Panner3DOptions](https://tonejs.github.io/docs/15.1.22/interfaces/Panner3DOptions.html)

### Settings

#### Member Visibility

#### Theme

OSLightDark

### On This Page

[constructor](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#constructor)[context](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#context)[debug](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#debug)[input](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#input)[name](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#name)[orientationX](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#orientationX)[orientationY](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#orientationY)[orientationZ](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#orientationZ)[output](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#output)[positionX](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#positionX)[positionY](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#positionY)[positionZ](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#positionZ)[version](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#version)[blockTime](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#blockTime)[channelCount](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#channelCount)[channelCountMode](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#channelCountMode)[channelInterpretation](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#channelInterpretation)[coneInnerAngle](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#coneInnerAngle)[coneOuterAngle](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#coneOuterAngle)[coneOuterGain](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#coneOuterGain)[disposed](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#disposed)[distanceModel](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#distanceModel)[maxDistance](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#maxDistance)[numberOfInputs](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#numberOfInputs)[numberOfOutputs](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#numberOfOutputs)[panningModel](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#panningModel)[refDistance](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#refDistance)[rolloffFactor](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#rolloffFactor)[sampleTime](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#sampleTime)[chain](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#chain)[connect](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#connect)[disconnect](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#disconnect)[dispose](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#dispose)[fan](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#fan)[get](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#get)[immediate](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#immediate)[now](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#now)[set](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#set)[setOrientation](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#setOrientation)[setPosition](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#setPosition)[toDestination](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#toDestination)[toFrequency](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#toFrequency)[toMaster](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#toMaster)[toSeconds](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#toSeconds)[toString](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#toString)[toTicks](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#toTicks)[getDefaults](https://tonejs.github.io/docs/15.1.22/classes/Panner3D.html#getDefaults)
