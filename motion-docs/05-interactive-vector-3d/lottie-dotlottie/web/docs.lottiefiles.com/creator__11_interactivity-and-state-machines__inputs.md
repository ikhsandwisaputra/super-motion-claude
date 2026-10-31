---
source: https://docs.lottiefiles.com/en/creator/11_interactivity-and-state-machines/inputs.md
title: ""
fetched: 2026-10-28
---

# Inputs
Inputs are the variables that power dotLottie state machines. Use them to store interaction state, compare values in guards, and drive data-backed animations.

## Input types

**Boolean** — on/off flags (`isHovered`, `menuOpen`).

<Image src="https://assets.docs.lottiefiles.com/static/bdbf044861-640.webp" alt="Boolean" zoom variant="default" srcSet="https://assets.docs.lottiefiles.com/static/bdbf044861-640.webp 640w, https://assets.docs.lottiefiles.com/static/bdbf044861-1024.webp 1024w, https://assets.docs.lottiefiles.com/static/bdbf044861-1920.webp 1920w" width="2860" height="2008" loading="lazy" data-blur="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAGCAYAAAD+Bd/7AAAACXBIWXMAACxLAAAsSwGlPZapAAAAuklEQVR4nB3MUUvCQADA8fsYURCISGvgg8puMnebelpXqzvTxJuioBsF9RZ+8R563T/q8ffyE8++Qp++MIdP3OaI2X8wrc+NLSsKf/oR/XRKK1LcxDlRdkdnkNCKx/RSjd2+IeTEEMqUUI4Y6oJunBPKjGhssGXdiLndINcV6mXPvfOoxe7fc+d58nUjwijhsh1wfdujO8y56gRctAOCQYLbvSO09aiHJXnxymyxJXtcocyy0a78G75/AbDeVqIwJ2WIAAAAAElFTkSuQmCC" />

**Numeric** — numbers for progress, scores, ratings.
**String** — mode or label values (case-sensitive).
**Event** — one-shot triggers that fire and clear.

Use `$otherInput` in guards or actions when you need to compare against another input’s current value.

## Add inputs

Inputs can be created on the right side panel in State Machines mode.

<Image src="https://assets.docs.lottiefiles.com/static/d9083d2725-640.webp" alt="Input" zoom variant="default" srcSet="https://assets.docs.lottiefiles.com/static/d9083d2725-640.webp 640w, https://assets.docs.lottiefiles.com/static/d9083d2725-1024.webp 1024w, https://assets.docs.lottiefiles.com/static/d9083d2725-1920.webp 1920w" width="2560" height="1240" loading="lazy" data-blur="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAECAYAAACzzX7wAAAACXBIWXMAACxLAAAsSwGlPZapAAAAZ0lEQVR4nGPwiUj+5xuZ8t83KvW/V1jCf0Vt/f9iCir/ReWV/jv4hP5j8ApL/K9lagXGnqEJ/2XVtf7La+r8l1JRByn4j0WB9n8FLd3/0qoaEAUwK/yiUsEKJJTV/ovIKYKxg3fIPwAn5jbBGqWIHQAAAABJRU5ErkJggg==" />

1. Open **Interactivity → Inputs**.
2. Click **+ Add Input**.
3. Choose type (Boolean, Numeric, String, Event).
4. Set the name and initial value (Events don’t store a value).

Name inputs clearly (`isHovered`, `rating`, `currentMode`). Avoid generic names like `value1`.

## Use inputs in transitions and actions

Inputs can be used in the guard conditions on the transitions between each state. They can be updated via actions on states or interactions.

<List type="bullet">
  <ListItem>
    Guards read inputs:

    <List type="bullet">
      <ListItem>
        Boolean: `isHovered = true`
      </ListItem>

      <ListItem>
        Numeric: `progress >= 50`
      </ListItem>

      <ListItem>
        String: `mode = "dark"`
      </ListItem>

      <ListItem>
        Event: guard fires once when the event is posted

        <Image src="https://assets.docs.lottiefiles.com/static/7d4270bd2b-640.webp" alt="Guard Input" zoom variant="default" srcSet="https://assets.docs.lottiefiles.com/static/7d4270bd2b-640.webp 640w, https://assets.docs.lottiefiles.com/static/7d4270bd2b-1024.webp 1024w, https://assets.docs.lottiefiles.com/static/7d4270bd2b-1920.webp 1920w" width="2888" height="1472" loading="lazy" data-blur="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAECAYAAACzzX7wAAAACXBIWXMAACxLAAAsSwGlPZapAAAAa0lEQVR4nDXNSw7CIBgAYW4gUsrPo5QAjbgwJnr/o5mOkcTdLL5klLZy+tLYjoHbK0vMaCtcXUCv/qP0KqQ+qI8X7fnG7Q1t/R+gfmFCJvbBdtxZ0k5sN8KEMsF5sYIJiZArxkekdCSVufgCngkps/g+GfcAAAAASUVORK5CYII=" />
      </ListItem>
    </List>
  </ListItem>

  <ListItem>
    Actions update inputs:

    <List type="bullet">
      <ListItem>
        **SetBoolean / Toggle** for flags
      </ListItem>

      <ListItem>
        **SetNumeric / Increment / Decrement** for counts and progress
      </ListItem>

      <ListItem>
        **SetString** for modes or labels
      </ListItem>

      <ListItem>
        **Fire** for Event inputs

        <Image src="https://assets.docs.lottiefiles.com/static/0202cd40ff-640.webp" alt="Action Input" zoom variant="default" srcSet="https://assets.docs.lottiefiles.com/static/0202cd40ff-640.webp 640w, https://assets.docs.lottiefiles.com/static/0202cd40ff-1024.webp 1024w, https://assets.docs.lottiefiles.com/static/0202cd40ff-1920.webp 1920w" width="2344" height="1320" loading="lazy" data-blur="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAACXBIWXMAACxLAAAsSwGlPZapAAAAcklEQVR4nGPwiUj+7xuZ8t8/Og2OQXyQuE9E8g8GEMc9KPa/rUfQfxv3gP/Wbv5gPkwRA0gHSFBN3+y/qr7pf2lV7f9Wrn7//aPT/3uHJ/0Hm+AWFPPf1iPwv51n8H8b98D/boExCBNgbvCLSvvvh8UNAOAiTcLOqPWzAAAAAElFTkSuQmCC" />
      </ListItem>
    </List>
  </ListItem>
</List>

## Set inputs from your player

Inputs don't just have to be updated via the state machine logic. They can also be updated by the developer in code. This is useful for connecting the state machine to real-world data and events.

```javascript
player.setStateMachineNumericInput("progress", 75);
player.setStateMachineBooleanInput("isActive", true);
player.setStateMachineStringInput("theme", "dark");
player.fireStateMachineEvent("submit");
```

## Tips and Tricks

<List type="bullet">
  <ListItem>
    There are many ways to achieve most outcomes. Try to think of the best way for your specific goal, but don't get
    lost in the possibilities.
  </ListItem>

  <ListItem>
    Booleans can be named as a continuous verb (isHovering, isDragging) to help you understand what they're supposed to
    be measuring later. (e.g. Is it hovering? True/False)
  </ListItem>

  <ListItem>Events can be named on\_\_\_\_ (onLoad, onError) to signify that they fire once at a time.</ListItem>

  <ListItem>
    Naming conventions are just suggestions; ultimately you may find a better option depending on the situation.
  </ListItem>
</List>

**Applies to:** Lottie Creator (Web), dotLottie state machines
