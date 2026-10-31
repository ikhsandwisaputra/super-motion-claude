---
source: https://rive.app/docs/runtimes/react/focus
title: "Focus"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Focus

Let users move through your Rive graphic with Tab and arrow keys in the React runtime.

## Overview

A Rive graphic can define focus nodes: elements that can take focus, such as buttons, list items, or menu entries. The React runtime connects those focus nodes to the keyboard, so users can move through your graphic with <kbd>Tab</kbd>, <kbd>Shift</kbd> + <kbd>Tab</kbd>, and the arrow keys, the same way they move through the rest of the page.

Focus nodes and their order are set up in the Rive Editor, and the runtime automatically detects how to traverse them with focus navigation. When the playing state machine has focus nodes, the runtime:

* Allows the `<canvas>` to be focusable, so the graphic becomes a single stop in the page's tab order.
* Listens for keyboard events on the `<canvas>` and routes them to the focus nodes in the graphic.

The runtime itself doesn't draw a visual focus indicator on focused nodes. How a focused node looks, such as a highlight or outline, should be designed in the graphic itself.

If the graphic has no focus nodes, or the user tabs past its last focus node, focus moves on to the next element on the page as usual.

> [!NOTE]
>
> When `shouldDisableRiveListeners` is `true`, Rive won't receive focus from the browser.

## Navigating with the keyboard

| Key | Behavior |
| - | - |
| <kbd>Tab</kbd> | Moves focus to the next focus node. |
| <kbd>Shift</kbd> + <kbd>Tab</kbd> | Moves focus to the previous focus node. |
| <kbd>←</kbd> / <kbd>→</kbd> / <kbd>↑</kbd> / <kbd>↓</kbd> | Moves focus to the nearest focus node in that direction. |

When the Rive graphic handles a key press, the browser's default action for that key is suppressed. Otherwise, the browser handles the key as usual. See [Text and key input](/docs/runtimes/react/text-and-key-input) for how other keys and typed text reach the graphic.

### Entering and leaving the graphic

From the page's point of view, the `<canvas>` is one tab stop. Inside it, the graphic has its own focus order:

* **Tabbing in** - When a user presses <kbd>Tab</kbd> onto the canvas from an earlier element on the page, focus lands on the first focus node. Pressing <kbd>Shift</kbd> + <kbd>Tab</kbd> onto the canvas from a later element lands on the last focus node. If the graphic already has a focused node, focus stays on that node.
* **Clicking in** - Clicking the canvas gives it browser focus. The runtime does not move focus to a node on click, though the graphic's own listeners may. The next <kbd>Tab</kbd> enters the graphic.
* **Tabbing out** - Pressing <kbd>Tab</kbd> on the last focus node, or <kbd>Shift</kbd> + <kbd>Tab</kbd> on the first, releases focus to the next or previous element on the page. A graphic's focus nodes can instead be set to wrap around or stop at the edges, in which case focus stays inside the graphic.
* **Leaving** - When browser focus leaves the canvas for anywhere else on the page (for example, when the user clicks another element), the runtime clears focus inside the graphic. Switching browser tabs or windows does not clear it.

### Directional focus

Once a focus node has focus, the arrow keys move focus to the nearest focus node in the pressed direction, based on where the nodes are positioned on screen. If there is no focus node in that direction, focus stays where it is.

* While a focus node has focus, the arrow keys do not scroll the page.
* Arrow keys pressed with <kbd>Alt</kbd>, <kbd>Ctrl</kbd>, or <kbd>Cmd</kbd> are left to the browser, so shortcuts such as back and forward keep working.
* If the focused node handles the key itself, for example with a keyboard listener, the key goes to that node and focus does not move. This applies to <kbd>Tab</kbd> as well.

## Setting the tab index

When the graphic has focus nodes and the `<canvas>` has no `tabindex` (or its `tabindex` is `-1`), the runtime sets it to `0`, which places the canvas in the page's tab order at its position in the DOM. To use a different value, pass the `tabIndex` parameter, or set the `tabindex` attribute on the `<canvas>` to a value other than `-1`.

For example, pass `tabIndex: -1` to keep the canvas out of the page's tab order. Users then reach the graphic by clicking it (or through `allowFocusInterrupt`, below), and can still use <kbd>Tab</kbd> and the arrow keys once inside.

```jsx highlight={9} theme={null}
import { useRive } from "@rive-app/react-canvas";

export default function Menu() {
  const { RiveComponent } = useRive({
    src: "/menu.riv",
    stateMachine: "State Machine 1",
    autoplay: true,
    autoBind: true,
    tabIndex: -1, // Reachable by click, but skipped when tabbing through the page
  });

  return <RiveComponent />;
}
```

## Allowing Rive to take browser focus

A graphic can move focus on its own. For example, a [state action](/docs/editor/state-machine/states#actions) can focus a node when a state starts. By default, this does not move browser focus: the node can be focused in the graphic, but if the user's browser focus is somewhere else on the page, it stays there.

Rive can pull browser focus to the canvas from anywhere on the page as an opt-in behavior by setting `focusOptions.allowFocusInterrupt` to `true`.

```jsx highlight={9-11} theme={null}
import { useRive } from "@rive-app/react-canvas";

export default function Menu() {
  const { RiveComponent } = useRive({
    src: "/menu.riv",
    stateMachine: "State Machine 1",
    autoplay: true,
    autoBind: true,
    focusOptions: {
      allowFocusInterrupt: true,
    },
  });

  return <RiveComponent />;
}
```

| Option | Type | Description |
| - | - | - |
| `allowFocusInterrupt` | `boolean` | When `true`, the canvas takes browser focus whenever the graphic goes from having no focused node to having one, even if the user's focus is elsewhere on the page. Defaults to `false`. |

> [!WARNING]
>
> Only turn on `allowFocusInterrupt` when your graphic needs it. Moving focus away from what a user is doing can be jarring UX. Users lose their place on the page, the browser may scroll to the canvas, and keyboard and screen reader users can be pulled out of a form field or control mid-task.
>
> This opt-in behavior fits best when the graphic is the primary experience on the page, such as a full-page menu or a game interface.

## Clearing focus

Call `clearFocus()` on the `Rive` instance to remove focus from the focus nodes in the graphic, for example when you dismiss or hide the canvas.

This clears focus inside the graphic only. It does not move browser focus off the `<canvas>`, so if you want focus to land somewhere specific, focus that element yourself. Once focus is cleared, whether by `clearFocus()` or by the graphic itself, the next <kbd>Tab</kbd> leaves the canvas instead of re-entering the graphic.

```jsx highlight={12} theme={null}
import { useRive } from "@rive-app/react-canvas";

export default function Menu({ onClose }) {
  const { rive, RiveComponent } = useRive({
    src: "/menu.riv",
    stateMachine: "State Machine 1",
    autoplay: true,
    autoBind: true,
  });

  const closeMenu = () => {
    rive?.clearFocus();
    onClose();
  };

  return (
    <>
      <RiveComponent />
      <button onClick={closeMenu}>Close menu</button>
    </>
  );
}
```
