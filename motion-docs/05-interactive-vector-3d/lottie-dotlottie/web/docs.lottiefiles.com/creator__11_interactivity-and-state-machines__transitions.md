---
source: https://docs.lottiefiles.com/en/creator/11_interactivity-and-state-machines/transitions.md
title: ""
fetched: 2026-10-28
---

# Transitions
Transitions connect states and allow movement between them. Transitions contain guard conditions to prevent movement at the wrong time.

## Transition settings

Transitions are shown as lines connecting exactly two states, from one state's exit node to its entry node. Clicking the transition line will open its settings menu.

<Image src="https://assets.docs.lottiefiles.com/static/7d4270bd2b-640.webp" alt="Guard Input" zoom variant="default" srcSet="https://assets.docs.lottiefiles.com/static/7d4270bd2b-640.webp 640w, https://assets.docs.lottiefiles.com/static/7d4270bd2b-1024.webp 1024w, https://assets.docs.lottiefiles.com/static/7d4270bd2b-1920.webp 1920w" width="2888" height="1472" loading="lazy" data-blur="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAECAYAAACzzX7wAAAACXBIWXMAACxLAAAsSwGlPZapAAAAa0lEQVR4nDXNSw7CIBgAYW4gUsrPo5QAjbgwJnr/o5mOkcTdLL5klLZy+tLYjoHbK0vMaCtcXUCv/qP0KqQ+qI8X7fnG7Q1t/R+gfmFCJvbBdtxZ0k5sN8KEMsF5sYIJiZArxkekdCSVufgCngkps/g+GfcAAAAASUVORK5CYII=" />

Each transition can be set to either immediate or tweened.

<List type="bullet">
  <ListItem>
    **Immediate** — the transition happens right away, jumping from whatever the exit properties of the previous state
    were directly into the beginning properties of the next state.
  </ListItem>

  <ListItem>
    **Tweened** — the transition happens gradually, slowly transitioning the exit properties of the previous state into
    the beginning properties of the next state within a set amount of time.
  </ListItem>
</List>

## Building transitions

1. In the state graph, drag from the source state to the target to create a link.
2. Select the link and add guards.
3. Choose **Immediate** or **Tweened** timing; set duration/easing for Tweened (0.2–0.3s works well for UI).

## Best practices

<List type="bullet">
  <ListItem>Test rapid clicks/hover in Interactivity Mode to catch race conditions.</ListItem>
</List>
