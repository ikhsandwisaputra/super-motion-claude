---
source: https://docs.lottiefiles.com/en/creator/07_animation/time-stretch.md
title: ""
fetched: 2026-10-28
---

# Time Stretch
Time Stretch changes the duration of a nested scene by stretching or compressing its entire timeline. The stretch factor is a percentage of the original duration. `100%` is the original length, values above `100%` make the scene longer, and values below `100%` make it shorter. Every keyframe inside the scene is rescaled proportionally, so the timing relationships between them stay intact.

Unlike retiming individual keyframes, Time Stretch operates on the whole nested scene at once, which is useful when you need a composition to fit a specific duration without re-animating it.

## When to Use Time Stretch

<List type="bullet">
  <ListItem>Fit a nested scene into a longer or shorter time slot</ListItem>
  <ListItem>Slow down or speed up an entire animation uniformly</ListItem>
  <ListItem>Match the pacing of a scene to the rest of your project</ListItem>
</List>

## Applying Time Stretch

Time Stretch is available in the **Time Stretch** section of the Properties panel.

1. Select a nested scene in the canvas or timeline. You can find the **Time Stretch** section in the Properties panel.
2. Enter a **Stretch Factor** and press **Enter**. The change applies to the scene's track immediately.

By default, the scene stretches from its **Layer In-point**. The start of the scene stays fixed, and the timeline extends or contracts from the end.

## Time Stretch Settings

<Image src="https://assets.docs.lottiefiles.com/static/1bff90c9f3-640.webp" alt="Time Stretch section and its settings dialog" caption="The Time Stretch section and its settings dialog" zoom variant="default" srcSet="https://assets.docs.lottiefiles.com/static/1bff90c9f3-640.webp 640w, https://assets.docs.lottiefiles.com/static/1bff90c9f3-1024.webp 1024w, https://assets.docs.lottiefiles.com/static/1bff90c9f3-1920.webp 1920w" width="2220" height="1248" loading="lazy" data-blur="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAECAYAAACzzX7wAAAACXBIWXMAACE4AAAhOAFFljFgAAAAdklEQVR4nGWNSQrCMAAA8w0RitCDt6KomISAXRTbmu49xAUvLcX/f2CkePQ8w4ywbuSUtaizxWQN5WOifn2onhPWDYjiPhIcDcuVj+evUXHOziToS8nMxM0N7HWIt9mykBIZpRzCKzptfsKcifIOWfQo9/5bfAEKtTtWZ/RN9QAAAABJRU5ErkJggg==" />

Click the settings button next to the Stretch Factor to open the settings dialog. It shows the selected scene's **Duration** and lets you change the **Hold in Place** anchor, which is the point that stays fixed while the rest of the timeline stretches.

### Hold in Place

<List type="bullet">
  <ListItem>
    **Layer In-point** (default): keeps the start of the scene fixed; the timeline extends or contracts from the end.
  </ListItem>

  <ListItem>**Current Frame**: keeps the playhead's current frame fixed; the timeline stretches around it.</ListItem>

  <ListItem>
    **Layer Out-point**: keeps the end of the scene fixed; the timeline extends or contracts from the start.
  </ListItem>
</List>
