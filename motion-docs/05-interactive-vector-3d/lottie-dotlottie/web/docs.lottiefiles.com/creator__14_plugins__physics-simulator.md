---
source: https://docs.lottiefiles.com/en/creator/14_plugins/physics-simulator.md
title: ""
fetched: 2026-10-28
---

# Physics Simulator
<Image src="https://assets.docs.lottiefiles.com/static/80619cccb4-640.webp" alt="Physics Simulator plugin" caption="Physics Simulator plugin" zoom variant="default" srcSet="https://assets.docs.lottiefiles.com/static/80619cccb4-640.webp 640w, https://assets.docs.lottiefiles.com/static/80619cccb4-1024.webp 1024w, https://assets.docs.lottiefiles.com/static/80619cccb4-1920.webp 1920w" width="3000" height="1878" loading="lazy" data-blur="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAACXBIWXMAACE4AAAhOAFFljFgAAAAlElEQVR4nB3OSwqCUABA0beEIjM1Q7M0NXrmS2xiPywqg6Qf0v4XciMHd3QnRxzrL7FaE8hVW7TMidOcMMn4P7G9POhqOp1en55uYowc3CDEdD321RuxvT4xLJuJn2C7Ppbj4UvFJM043D6I4lwzMG1ORYNheWjWkHE4xx5P2VUvRHlvCBYpkVTMpGo92aZE5kVr+AG9vj5fa1DTDAAAAABJRU5ErkJggg==" />

Physics Simulator applies real-world physics to your layers — gravity, bounce, friction, and collisions — and generates the keyframes for you. Use it to create realistic motion without manually tweaking curves.

## What it helps you do

<List type="bullet">
  <ListItem>Generate natural fall, bounce, and collision motion automatically</ListItem>
  <ListItem>Skip hours of manual keyframing for physics-based animations</ListItem>
  <ListItem>Produce editable keyframes you can refine in the timeline</ListItem>
</List>

## How it works

1. Open the **Physics Simulator** plugin from the left sidebar
2. Configure global properties for the simulation (gravity, duration, boundaries)
3. Select one or more bodies on the canvas to edit their body properties (mass, friction, bounciness)
4. Run the simulation to preview the motion
5. Insert the result at the playhead to generate keyframes on the selected bodies

## Global properties

Global properties apply to the entire simulation.

<List type="bullet">
  <ListItem>**Edge boundaries** — confine bodies inside the canvas frame so they collide with the edges</ListItem>

  <ListItem>
    **Wireframe mode** — render bodies as outlines while previewing, to make the simulation easier to read
  </ListItem>

  <ListItem>**Duration** — length of the simulation</ListItem>

  <ListItem>
    **Gravity (x-g, y-g)** — direction and strength of gravitational pull on the horizontal and vertical axes
  </ListItem>

  <ListItem>**Insert at playhead** — place the generated keyframes starting at the current playhead position</ListItem>
  <ListItem>**Keyframe reduction** — simplify the output by removing redundant keyframes</ListItem>
</List>

## Body properties

Select one or more bodies on the canvas to edit their individual properties.

<List type="bullet">
  <ListItem>**Mass** — how heavy the body is; affects how it reacts to forces and collisions</ListItem>
  <ListItem>**Initial force** — starting push applied to the body when the simulation begins</ListItem>
  <ListItem>**Friction** — resistance when the body slides against another surface</ListItem>
  <ListItem>**Air friction** — resistance from the air that slows motion over time</ListItem>

  <ListItem>
    **Bounciness** — how much energy is preserved when the body collides with another body or boundary
  </ListItem>

  <ListItem>**Destroy on collision** — remove the body from the simulation when it collides with another</ListItem>
</List>

## Example use cases

<List type="bullet">
  <ListItem>A ball that falls, bounces, and settles on the floor</ListItem>
  <ListItem>Confetti or particles scattering across the scene</ListItem>
  <ListItem>Objects tumbling against obstacles with realistic deflection</ListItem>
  <ListItem>Stacked elements collapsing under gravity</ListItem>
</List>
