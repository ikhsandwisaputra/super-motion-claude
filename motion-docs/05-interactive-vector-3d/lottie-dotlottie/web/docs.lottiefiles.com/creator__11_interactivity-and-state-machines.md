---
source: https://docs.lottiefiles.com/en/creator/11_interactivity-and-state-machines.md
title: ""
fetched: 2026-10-28
---

# Interactivity & State Machines
Build interactive animations without code by using dotLottie state machines in Lottie Creator.

<Vimeo url="https://vimeo.com/1119664530" />

### Check out the YouTube tutorial series for State Machines here:

[https://lottie.link/playlist](https://lottie.link/playlist)

### 🧠 What’s a state machine?

A state machine is a way to describe how something changes over time based on certain conditions.

It’s like a flowchart: “If this happens → go there.”

Instead of one long animation that always plays the same way, a state machine lets you break it up into pieces (called "states") and control how and when they change.

### 🎮 Example 1: A Button

Let’s say you have an animated button.

- State 1: Normal
- State 2: Hover
- State 3: Pressed

With a state machine, you can say:

- If the mouse enters → switch to Hover state
- If the user clicks → switch to Pressed state
- If they release the click → go back to Hover
- If they move the mouse away → go back to Normal

<Image src="https://assets.docs.lottiefiles.com/static/30973f6d9e-640.webp" alt="Flow 1" caption="Flow" zoom variant="default" srcSet="https://assets.docs.lottiefiles.com/static/30973f6d9e-640.webp 640w, https://assets.docs.lottiefiles.com/static/30973f6d9e-1024.webp 1024w, https://assets.docs.lottiefiles.com/static/30973f6d9e-1920.webp 1920w" width="3368" height="1894" loading="lazy" data-blur="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAECAYAAACzzX7wAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAeElEQVR4nGPwDk/67+wb9d8rLPG/a2DMf9fA6P+eoYn/Hfwj/3uHJ/1jCIhN/98yd/7/qLS8/+XNE/+Xt0z8H5de+H/6pMX/A2My/kMUzJkHVlDWNAGM49IK/k+btOh/UEz6fwbv8OT/zr6RSFbE/PcMg1oRkfQfANfYRbCywuILAAAAAElFTkSuQmCC" />

So now the button feels interactive — not just animated.

### 🚦 Example 2: A Traffic Light

- State 1: Green
- State 2: Yellow
- State 3: Red

The rules might be:

- Wait 4 seconds → switch to Yellow
- Wait 1 second → switch to Red
- Wait 5 seconds → go back to Green

<Image src="https://assets.docs.lottiefiles.com/static/7f3f350ff1-640.webp" alt="Flow 2" caption="Flow" zoom variant="default" srcSet="https://assets.docs.lottiefiles.com/static/7f3f350ff1-640.webp 640w, https://assets.docs.lottiefiles.com/static/7f3f350ff1-1024.webp 1024w, https://assets.docs.lottiefiles.com/static/7f3f350ff1-1920.webp 1920w" width="3368" height="1894" loading="lazy" data-blur="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAECAYAAACzzX7wAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAdUlEQVR4nFWNwQqCMABA92mBnhqYepjhVpGrdYr8AKGN2d0iJOpfe2Gduj4e7wlZWZLMIKuGtNyQFmvmastsoSf2FrlxxOdAZg50/ky4ROrdiXG4UxiHyFeO/nVF2SM+Bnwf0PuWx22knITfQiNV883/LZaWD7cBRTx0BiGxAAAAAElFTkSuQmCC" />

The light changes based on time — that’s an “input” to the machine.

### 🧩 Why it matters

With state machines in Lottie, you can:

- React to clicks, hovers, or other user actions
- Branch your animations based on conditions
- Build things like UI prototypes, onboarding flows, or interactive stories — all without code

Instead of animations just playing, now they listen, respond, and feel alive.

## User Interface

State Machines Mode can be accessed with a toggle near the top right of the screen. It contains a number of tools for creating and testing state machines.

<Image src="https://assets.docs.lottiefiles.com/static/3b6eabbabf-640.webp" alt="State Machines Mode" caption="State Machines Mode" zoom variant="default" srcSet="https://assets.docs.lottiefiles.com/static/3b6eabbabf-640.webp 640w, https://assets.docs.lottiefiles.com/static/3b6eabbabf-1024.webp 1024w, https://assets.docs.lottiefiles.com/static/3b6eabbabf-1920.webp 1920w" width="3840" height="2160" loading="lazy" data-blur="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAo0lEQVR4nCXKvQ7BUACA0Yv4SZqK/mjvpcKlRYhINKKRDtLBYLCQiMHsETyAwcMYrd7D4ll8hp75iNkqJZzFuHqCHK+J5gnTOGGeZmwPl58olqvovuZxu3I/KyYjiShWcDtdsv0JIUoV1smS7+fJ670gzYaIQg2lwzxYvsJoOBi2hekr6rbEtByUjvLQHoxpNCW2DPCCHl7QxfZbWH6Lze74+wMoJT0m61D/EAAAAABJRU5ErkJggg==" />

**Inputs** and **Interactions** can be created and managed in the right side panel.

<Image src="https://assets.docs.lottiefiles.com/static/8dfb999a2e-640.webp" alt="Interactions" caption="Interactions" zoom variant="default" srcSet="https://assets.docs.lottiefiles.com/static/8dfb999a2e-640.webp 640w, https://assets.docs.lottiefiles.com/static/8dfb999a2e-1024.webp 1024w, https://assets.docs.lottiefiles.com/static/8dfb999a2e-1920.webp 1920w" width="2560" height="1440" loading="lazy" data-blur="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAACXBIWXMAACxLAAAsSwGlPZapAAAAkklEQVR4nD3OXQ+BUACA4fM7MEafKlr5aJOQGnOqGReOLov/f9/Va2Zz/1w8Ir/WJJcb5fNFdDijTz2Gus3IdJCq7US4PdI3LNJKsckKNGeO4QVojk+hWsQiyejp5g/kJaYXYvsrdDdAPhpEEKd/EOcVtr/ECSIML6RQDeJ72Mk7Zf1mvT8x0EzGlsvEniFV030AlEtDggOuJAEAAAAASUVORK5CYII=" />

**States** can be created and managed in the bottom left side panel. Drag and drop to create a state.

<Image src="https://assets.docs.lottiefiles.com/static/a14c17ade5-640.webp" alt="States Side Bar" caption="States Side Bar" zoom variant="default" srcSet="https://assets.docs.lottiefiles.com/static/a14c17ade5-640.webp 640w, https://assets.docs.lottiefiles.com/static/a14c17ade5-1024.webp 1024w, https://assets.docs.lottiefiles.com/static/a14c17ade5-1920.webp 1920w" width="2344" height="1320" loading="lazy" data-blur="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAACXBIWXMAACxLAAAsSwGlPZapAAAAk0lEQVR4nCXMuwqCAABAUX8gfOCzHCzTaEgIQoyKzCRLM200HAP7/8nthrgfjpBWDVHy4Jy/CeM7p1tJGGek9YdX8+2FfVoydX1m/hrFspE0k4miEl1y6vaHcMwq3GCHG4SYzhJZMxFVg/21oGo7hENW4W8jFpsBeEiqMYKkGIcB6HMP012h2g6ybiFqw/Ckbrv+D/oeQA6Un8wxAAAAAElFTkSuQmCC" />

The **Canvas** is where state machines can be modeled visually.

<Image src="https://assets.docs.lottiefiles.com/static/2c10018dfc-640.webp" alt="Canvas" caption="Canvas" zoom variant="default" srcSet="https://assets.docs.lottiefiles.com/static/2c10018dfc-640.webp 640w, https://assets.docs.lottiefiles.com/static/2c10018dfc-1024.webp 1024w, https://assets.docs.lottiefiles.com/static/2c10018dfc-1920.webp 1920w" width="2888" height="1472" loading="lazy" data-blur="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAECAYAAACzzX7wAAAACXBIWXMAACxLAAAsSwGlPZapAAAAZklEQVR4nB2MWw6FIBBD2QF4ZR4wMIrmuv8FGmvwo0lPc9IQszwxM2IWZHOsalhLA1Wf2x0WLtA+QLVD/ABXB/cd2gYSCT6BbQOZw44Lpe3Q7UQffyRShET6zPsJPzEsUr/MnkjvF11yKOB8mD+wAAAAAElFTkSuQmCC" />

The **Floating Panel** can be used to play the state machine. It is also where Prompt to Sttate Machines, our state machine-creating AI, can be accessed.

<Image src="https://assets.docs.lottiefiles.com/static/214ca85f4b-640.webp" alt="Floating Panel" caption="Floating Panel" zoom variant="default" srcSet="https://assets.docs.lottiefiles.com/static/214ca85f4b-640.webp 640w, https://assets.docs.lottiefiles.com/static/214ca85f4b-1024.webp 1024w, https://assets.docs.lottiefiles.com/static/214ca85f4b-1920.webp 1920w" width="2400" height="1200" loading="lazy" data-blur="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAECAYAAACzzX7wAAAACXBIWXMAACxLAAAsSwGlPZapAAAAbklEQVR4nGPwDk/66xOR/N8nPAmMvcIS/3uD2BHJIPovg09E0n+/qNT/Dt4h/01tnf5rGZn/N3Pw+O8XnQZWyADS5ReV9t/WPeC/jonlfwsnr/+uAdH/fSNTwKYwwKwAGe0ZmgCWAJkItjYi+S8A8+A+fFlnKYQAAAAASUVORK5CYII=" />

## How state machines work

<List type="bullet">
  <ListItem>**States:** Named playback configurations (timeline segments, speed, direction).</ListItem>
  <ListItem>**Inputs:** Variables that store values (Boolean, Numeric, String, Event).</ListItem>
  <ListItem>**Transitions:** Rules that move between states, optionally with guards and tweening.</ListItem>
  <ListItem>**Interactions:** User events (click, hover) that trigger actions.</ListItem>
  <ListItem>**Actions:** Operations that change inputs, control playback, or fire events.</ListItem>
</List>

State machines let you design hover effects, clickable UI, data-driven visuals, and multi-step flows directly in the
editor.

## Related articles

<Grid columns="4">
  <Card title="States" href="/en/creator/11_interactivity-and-state-machines/states" variant="interactive" />

  <Card title="Inputs" href="/en/creator/11_interactivity-and-state-machines/inputs" variant="interactive" />

  <Card title="Transitions" href="/en/creator/11_interactivity-and-state-machines/transitions" variant="interactive" />

  <Card title="Interactions" href="/en/creator/11_interactivity-and-state-machines/interactions" variant="interactive" />
</Grid>

**Applies to:** Lottie Creator (Web), dotLottie state machines
