---
source: https://rive.app/docs/editor/assets/audio
title: "Audio Assets"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Audio Assets

Import, clip, and configure audio assets in Rive.

## Importing audio

See [Importing Assets](/docs/editor/fundamentals/assets-overview#importing-assets) for information about importing files, including MP3, WAV, and FLAC files.

### Browse sounds

Browse Sounds gives you direct access to a free library of over 3,000 sounds from Soundly.

**Step 1**

In the Assets panel, click **+** and select **Browse Sounds**.

**Step 2**

In the Sounds panel, search or browse for a sound.

**Step 3**

Preview the sound, then click **+** to add it to the Assets panel.

<video />

After adding a sound to the Assets panel, you can use it in an [Audio Event](/docs/editor/events/audio-events) or reference it from a [script](/docs/scripting/getting-started).

## Export options

Audio assets include a **Source** option that controls the audio format used for export.

* **Source**: Use the original imported audio format.
* **WAV**: Export the audio as WAV.
* **FLAC**: Export the audio as FLAC.
* **MP3**: Export the audio as MP3.

## Previewing sounds

You can create a shorter clip from any audio asset.

**Step 1**

Open the **Audio** panel in the **Debug Panel**.

**Step 2**

Select an audio asset in the **Assets** panel.

**Step 3**

Click the play icon.

![Audio asset volume](https://mintcdn.com/rive/En2tHBxv18NOW9Hj/images/editor/assets/preview-audio.png?fit=max\&auto=format\&n=En2tHBxv18NOW9Hj\&q=85\&s=d4c1c969896607d1e7ac271057399829)

## Creating clips

You can create a shorter clip from any audio asset.

**Step 1**

Open the **Audio** panel in the **Debug Panel**.

**Step 2**

Select an audio asset in the **Assets** panel.

**Step 3**

Drag along the waveform to select a portion of the audio and click the play button to preview.

**Step 4**

Click **+** to create a clip.

The new clip will now appear as its own audio asset under the parent audio in the sidebar.

<video />

## Setting asset volume

Select an audio asset or clip to set its **Volume** in the Inspector.

Volume is set on the asset, not on each individual use of the asset. If the same audio asset is used in multiple places, changing its volume affects all of them.

![Audio asset volume](https://mintcdn.com/rive/X8lKv4cR1rHX1pd9/images/editor/assets/audio-asset-volume.png?fit=max\&auto=format\&n=X8lKv4cR1rHX1pd9\&q=85\&s=a9977a09bb6018358d7bee3fba926b55)
