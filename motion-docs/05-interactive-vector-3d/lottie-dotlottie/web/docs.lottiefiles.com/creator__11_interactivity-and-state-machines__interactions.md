---
source: https://docs.lottiefiles.com/en/creator/11_interactivity-and-state-machines/interactions.md
title: ""
fetched: 2026-10-28
---

# Interactions
Interactions connect user events to actions in your state machine. Add clicks, hovers, and pointer moves so layers can drive inputs and transitions.

## Event types

<List type="bullet">
  <ListItem>**Click** – complete click/tap</ListItem>
  <ListItem>**PointerDown / PointerUp** – press and release</ListItem>
  <ListItem>**PointerEnter / PointerExit** – hover start/end</ListItem>
  <ListItem>**PointerMove** – pointer position updates</ListItem>
</List>

Layer requirements: the layer must be visible, unlocked, and have a fill (transparent strokes don’t receive clicks). Use
`layerName` to target a specific layer; leave blank to listen on the whole animation.

## Add an interaction

<Image src="https://assets.docs.lottiefiles.com/static/8dfb999a2e-640.webp" alt="Interaction" caption="Interaction" zoom variant="default" srcSet="https://assets.docs.lottiefiles.com/static/8dfb999a2e-640.webp 640w, https://assets.docs.lottiefiles.com/static/8dfb999a2e-1024.webp 1024w, https://assets.docs.lottiefiles.com/static/8dfb999a2e-1920.webp 1920w" width="2560" height="1440" loading="lazy" data-blur="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAACXBIWXMAACxLAAAsSwGlPZapAAAAkklEQVR4nD3OXQ+BUACA4fM7MEafKlr5aJOQGnOqGReOLov/f9/Va2Zz/1w8Ir/WJJcb5fNFdDijTz2Gus3IdJCq7US4PdI3LNJKsckKNGeO4QVojk+hWsQiyejp5g/kJaYXYvsrdDdAPhpEEKd/EOcVtr/ECSIML6RQDeJ72Mk7Zf1mvT8x0EzGlsvEniFV030AlEtDggOuJAEAAAAASUVORK5CYII=" />

2. Open **Interactions** on the right side panel.
3. Click **+** and pick the event type.
4. Set **layer Name** for layer-specific targeting.
5. Add actions (set/toggle inputs, fire events, etc.).

## Tips and Tricks

<List type="bullet">
  <ListItem>Make sure to use good layer naming practices so the logic is easy to follow.</ListItem>

  <ListItem>
    All layers under the pointer will detect the pointer event, even if they are obscured by other layers.
  </ListItem>
</List>

**Applies to:** Lottie Creator (Web), dotLottie state machines
