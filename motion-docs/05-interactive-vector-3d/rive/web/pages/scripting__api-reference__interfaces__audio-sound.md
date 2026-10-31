---
source: https://rive.app/docs/scripting/api-reference/interfaces/audio-sound
title: "AudioSound"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# AudioSound

A playback instance returned by `Audio:play*`, with controls for transport and volume.

## Fields

### `volume`

volume of the sound.

```lua highlight={4} theme={null}
function update(self: AudioScript)
  -- updates the volume for AudioSound playback when the input is changed
  if self.soundInstance then
    self.soundInstance.volume = self.volumeNumber / 100
  end
end
```

## Methods

### `stop`

```lua theme={null}
stop(fadeToStopTime: number?) -> ()
```

Stops the audio, fading out over `fadeToStopTime` PCM frames. Omit it
to stop at once. A sound that has not started yet stops at once
whatever the fade.

```lua highlight={3} theme={null}
function stopSound(self: AudioScript)
  if self.soundInstance then
    self.soundInstance:stop()
  end
end
```

### `seek`

```lua theme={null}
seek(seconds: number) -> boolean
```

Seeks the audio to a specific time in seconds. Returns false when the
sound was disposed or the seek failed.

```lua theme={null}
if self.soundInstance then
  self.soundInstance:seek(self.seekSeconds)
end
```

### `seekFrame`

```lua theme={null}
seekFrame(frame: number) -> boolean
```

Seeks the audio to a specific time in PCM frames. Returns false when
the sound was disposed or the seek failed.

```lua theme={null}
if self.soundInstance then
  self.soundInstance:seekFrame(self.seekFrameNumber)
end
```

### `completed`

```lua theme={null}
completed() -> boolean
```

Whether the sound has completed playing.

```lua highlight={3} theme={null}
function advance(self: AudioScript, seconds: number): boolean
  if self.soundInstance then
    self.isCompleted = self.soundInstance:completed()      -- whether playback has finished
  end
  return true
end
```

### `time`

```lua theme={null}
time() -> number
```

Current sound time in seconds.

```lua highlight={3} theme={null}
function advance(self: AudioScript, seconds: number): boolean
  if self.soundInstance then
    self.currentTime = self.soundInstance:time()           -- current playback time in seconds
  end
  return true
end
```

### `timeFrame`

```lua theme={null}
timeFrame() -> number
```

Current sound time in PCM frames.

```lua highlight={3} theme={null}
function advance(self: AudioScript, seconds: number): boolean
  if self.soundInstance then
    self.currentTimeFrame = self.soundInstance:timeFrame() -- current playback time in PCM frames
  end
  return true
end
```

### `pause`

```lua theme={null}
pause() -> ()
```

pauses the audio.

```lua highlight={3} theme={null}
function pauseSound(self: AudioScript)
  if self.soundInstance then
    self.soundInstance:pause()
  end
end
```

### `resume`

```lua theme={null}
resume() -> ()
```

resumes the audio from its current position.

```lua highlight={3} theme={null}
function resumeSound(self: AudioScript)
  if self.soundInstance then
    self.soundInstance:resume()
  end
end
```

### `play`

```lua theme={null}
play() -> ()
```

plays the audio.

```lua highlight={3} theme={null}
function playSound(self: AudioScript)
  if self.soundInstance then
    self.soundInstance:play()
  end
end
```
