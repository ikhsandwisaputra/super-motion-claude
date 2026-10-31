---
source: https://rive.app/docs/runtimes/react/best-practices
title: "Best Practices"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Best Practices

Performance and usage considerations for Rive in React.

> **[General Rive best practices](/docs/getting-started/best-practices)**
>
> Design-time and runtime guidance that applies across platforms.

## Avoiding unnecessary rerenders

When using useRive, keep the hook and its returned `<RiveComponent />` together in a dedicated wrapper component.

Rive creates an instance when the component mounts, and that instance is tied to the underlying `<canvas>` element. If React repeatedly unmounts or recreates that canvas, the animation may restart, disappear, or fail to display as expected.

```jsx theme={null}
function RiveAnimation() {
  const { RiveComponent } = useRive({
    src: '/animation.riv',
    stateMachine: 'State Machine 1',
  });

  return <RiveComponent />;
}
```
