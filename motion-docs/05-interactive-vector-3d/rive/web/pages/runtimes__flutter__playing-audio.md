---
source: https://rive.app/docs/runtimes/flutter/playing-audio
title: "Playing Audio"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Playing Audio

Playing Rive audio events

To learn more on how to add audio to your Rive file, see [Audio Events](/docs/editor/events/audio-events).

> [!WARNING]
>
> On the web, most browsers restrict audio from playing until the web page is interacted with. This applies to any audio, not just Rive audio.
>
> The web page needs to receive some interaction (touch/click) before sound is played. This interaction can be anything on the browser and doesn't need to be a Rive specific interaction.

## Embedded assets

Embedded assets require no additional work to play audio.

## Referenced assets

Referenced assets require a little bit more work to play audio. Audio will still automatically play, but the audio file(s) must be loaded when a Rive runtime attempts to play audio.

For more information, see [Loading Assets](/docs/runtimes/flutter/loading-assets).
