---
source: https://docs.lottiefiles.com/en/creator/11_interactivity-and-state-machines/states.md
title: ""
fetched: 2026-10-28
---

# States
States define how your animation plays when the state machine is in a given mode. Link states to timeline segments, set playback options, and add entry/exit actions.

## State types

<Image src="https://assets.docs.lottiefiles.com/static/80e95ebc5b-640.webp" alt="State types" zoom variant="default" srcSet="https://assets.docs.lottiefiles.com/static/80e95ebc5b-640.webp 640w, https://assets.docs.lottiefiles.com/static/80e95ebc5b-1024.webp 1024w, https://assets.docs.lottiefiles.com/static/80e95ebc5b-1920.webp 1920w" width="2400" height="1200" loading="lazy" data-blur="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAECAYAAACzzX7wAAAACXBIWXMAACxLAAAsSwGlPZapAAAANElEQVR4nGPwDk/66xuZ8t8vKhUFg8RAcgwghntw7H8nv7D/Lv5RYOzsFw4WA8kRVkDICgBRXj/NUOrafgAAAABJRU5ErkJggg==" />

**Playback State** – standard state linked to a segment; controls autoplay, loop, speed, direction, entry/exit actions.

<Image src="https://assets.docs.lottiefiles.com/static/8110c6c87f-640.webp" alt="Main Scene state configuration panel" caption="Playback State" zoom variant="default" srcSet="https://assets.docs.lottiefiles.com/static/8110c6c87f-640.webp 640w, https://assets.docs.lottiefiles.com/static/8110c6c87f-1024.webp 1024w, https://assets.docs.lottiefiles.com/static/8110c6c87f-1920.webp 1920w" width="2860" height="2008" loading="lazy" data-blur="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAGCAYAAAD+Bd/7AAAACXBIWXMAACxLAAAsSwGlPZapAAAAq0lEQVR4nFWOzQ7BQAAG9x16qZ+QKqVCKoLQpqi/StrdStpgl/SAred3cO0nmji4zmFmSHi+IzjdQIXEih4xsJfojp3c2TEw/ngTyh+gXOJwfWK2oVC1JpSaBsvxEF0yED9OsQjiwuL4EUq6gXLTxNDdggmZk32SYhkm+KbsHUPF6KCkt2HZHpjI8r/EdB1AbbSgVOvoTdyCkd8kExJeeER/Ooc5sotJyuXrA5ipVu7OSjKwAAAAAElFTkSuQmCC" />

Playback States can also be denoted as Initial or Final.

<List type="bullet">
  <ListItem>**Initial** – the state the machine originally starts in (one per machine).</ListItem>
  <ListItem>**Final (optional)** – terminal state; no outgoing transitions.</ListItem>
</List>

**Global State** – transitions are evaluated from any state; use sparingly for global escape/redirect logic.

<Image src="https://assets.docs.lottiefiles.com/static/f5771e7b87-640.webp" alt="Global State" caption="Global State" zoom variant="default" srcSet="https://assets.docs.lottiefiles.com/static/f5771e7b87-640.webp 640w, https://assets.docs.lottiefiles.com/static/f5771e7b87-1024.webp 1024w, https://assets.docs.lottiefiles.com/static/f5771e7b87-1920.webp 1920w" width="2860" height="1200" loading="lazy" data-blur="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAADCAYAAACuyE5IAAAACXBIWXMAACxLAAAsSwGlPZapAAAAWklEQVR4nGPwiUj65x2e9N8nPOk/iHb0Cf1v7eb338Y9AMT/y+ATkfzfLSjmv1tA5H/vsMT/ynrG/4VlFf7Laej8B8kxwEwAmxKR/N/ZL+K/vXfwfye/cLAJALuoLX2WoVNOAAAAAElFTkSuQmCC" />

Each state has Entry and Exit nodes, represented as green and red dots. These are the connection points to other States.

## Add and configure states

States are the nodal representation of Segments. You can think of them as essentially the same thing. That means in order to create a state, you must create a segment.

1. From Animate Mode, define a segment.
2. Go to State Machines Mode and drag your segment onto the State Canvas. This creates a State.
3. You can rename the State and create multiple instances of the same state.
4. (Optional) Add entry/exit actions to set inputs, fire events, or control playback.
5. Click and drag the entry or exit nodes to connect to other States.

Tip: Use descriptive names (`Default`, `Hover`, `Pressed`, `Error`) so the graph is easy to read.

## Actions

<List type="bullet">
  <ListItem>
    **On complete actions:** run when the state finishes all loops and is ready to transition out. This will run even if
    the conditions for exiting have not yet been met.
  </ListItem>

  <ListItem>
    **On loop complete actions:** run when a loop has completed. If set to loop a number of times, then this action will
    run each time.
  </ListItem>

  <ListItem>
    **Entry actions:** run when the state begins, usually immediately after it has been transitioned into from another
    state (or at the start of the state machine if Initial State).
  </ListItem>

  <ListItem>
    **Exit actions:** run when leaving the state, meaning it will only run when all conditions for transitioning to
    another state have been met. Note: Actions run in order from top to bottom.
  </ListItem>
</List>

## Tips and Tricks

<List type="bullet">
  <ListItem>
    Global State should be used when you want the machine to choose between multiple outcomes in parallel.
  </ListItem>

  <ListItem>States should be properly named to avoid confusion.</ListItem>

  <ListItem>
    In a list of actions on a state, if an action triggers the conditions to transition to another state, then actions
    that are set after it in the list may not run.
  </ListItem>
</List>

**Applies to:** Lottie Creator (Web), dotLottie state machines
