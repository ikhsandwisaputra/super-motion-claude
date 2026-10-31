---
source: https://docs.lottiefiles.com/en/creator/11_interactivity-and-state-machines/beginner-guide-making-an-interactive-button.md
title: ""
fetched: 2026-10-28
---

# Beginner Guide: Making an Interactive Button
A **State Machine** is like a traffic controller for your animations: it decides _what happens next_ based on user input or conditions. Let’s build one together, step by step, using a **button hover + click** as our running example.

<DotLottiePlayer src="https://lottie.host/75b15a99-b46b-4434-9faa-e0c862f09263/7TKhIJ9daB.lottie" autoplay loop stateMachineId="StateMachine1" width={100} height={100} />

You can remix the file for this example here: [https://lottie.link/interbutton](https://lottie.link/interbutton)

## 🎨 Step 1: Prepare Your Animation

Before we even touch State Machines, we need an animation to work with.

<Image src="https://assets.docs.lottiefiles.com/static/735b68fe17-640.webp" alt="Step 1 — button and segments" caption="Step 1 — button and segments" zoom variant="default" srcSet="https://assets.docs.lottiefiles.com/static/735b68fe17-640.webp 640w, https://assets.docs.lottiefiles.com/static/735b68fe17-1024.webp 1024w, https://assets.docs.lottiefiles.com/static/735b68fe17-1920.webp 1920w" width="3456" height="2166" loading="lazy" data-blur="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAj0lEQVR4nAXBQQ6CMBRAwW41GlFEaGmTj1LENkBQo8aFx9CFG+9/B/KcURI6ktyw1Q6795RVTe6Eda6xcUDZJpDsCrQRev3mXH5JU8N8ucI2EbV1gmkC9XDjYj485Ee6McwWS4q9R+mqJvNHythjxeMOLdoJSaYpKo9yxzBZ3yJtRxVH5DTQjne6+4twfU5/lAA4EwbsNhQAAAAASUVORK5CYII=" />

1. **Draw the button.**
2. **Add keyframes** for the different interactions:
   - One area for **hovering**.
   - Another for **pressing/clicking**.
3. **Add segments** that cover those keyframe areas.
   - Hit ▶️ Play to preview what happens in each segment.
   - Rename them something clear, like **Idle**, **Hover**, and **Click**.

In our example, Idle covers frames 0-90, Hover covers 90-179, and Click covers 180-299.

<Image src="https://assets.docs.lottiefiles.com/static/c77acdfac3-640.webp" alt="Step 1 — Idle, Hover, and Click segments" caption="Step 1 — Idle, Hover, and Click segments" zoom variant="default" srcSet="https://assets.docs.lottiefiles.com/static/c77acdfac3-640.webp 640w, https://assets.docs.lottiefiles.com/static/c77acdfac3-1024.webp 1024w, https://assets.docs.lottiefiles.com/static/c77acdfac3-1920.webp 1920w" width="3272" height="1840" loading="lazy" data-blur="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAECAYAAACzzX7wAAAACXBIWXMAACxLAAAsSwGlPZapAAAAc0lEQVR4nGPwiUj65xeV+t/BJ/S/gbXzfz1Lx//OfhH/QWLe4Ul/GbzDk/77Raf9t/EI/K9l5vBf09Thv4N3KFiBT0TSf7AC/+i0/9Zu/v+VNA3/q2gZIxSEQxT8Aymw8Aj4L2lu9V/awvq/nQ9IQRrYCgBnCTv4ktwkbgAAAABJRU5ErkJggg==" />

👉 At this point, you should have a button with labeled segments that look like mini “clips” of behavior.

## 🟢 Step 2: Add States

1. Open the **State Machines tab**.

<Image src="https://assets.docs.lottiefiles.com/static/7382ae37de-640.webp" alt="Step 2 — State Machines tab" caption="Step 2 — State Machines tab" zoom variant="default" srcSet="https://assets.docs.lottiefiles.com/static/7382ae37de-640.webp 640w, https://assets.docs.lottiefiles.com/static/7382ae37de-1024.webp 1024w, https://assets.docs.lottiefiles.com/static/7382ae37de-1920.webp 1920w" width="3136" height="1632" loading="lazy" data-blur="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAECAYAAACzzX7wAAAACXBIWXMAACxLAAAsSwGlPZapAAAAYklEQVR4nD1NWwqAIBD0CCm2roasaGRUP3X/szmRUR/DMMM8VFy2JusB7QKGkTsbnqDJP7qptJ+Q7fpNLwUxV1ieekFxqeBcoZ0Hy4wgM2yIPWgoQFEqjVL+Jl+Qh3kurWs3thopzWvLrqUAAAAASUVORK5CYII=" />

1. At the bottom-left, you’ll see your named segments.
2. Drag them onto the **State Machine canvas** (where your Timeline used to be).

Now, each segment is its own **State**.

- Example: Drag in **Idle**, **Hover**, and **Click**.
- These are the building blocks of your logic.

<Image src="https://assets.docs.lottiefiles.com/static/a8a29bb6d7-640.webp" alt="Step 2 — segments on the state canvas" caption="Step 2 — segments on the state canvas" zoom variant="default" srcSet="https://assets.docs.lottiefiles.com/static/a8a29bb6d7-640.webp 640w, https://assets.docs.lottiefiles.com/static/a8a29bb6d7-1024.webp 1024w, https://assets.docs.lottiefiles.com/static/a8a29bb6d7-1920.webp 1920w" width="2560" height="1440" loading="lazy" data-blur="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAACXBIWXMAACxLAAAsSwGlPZapAAAAkUlEQVR4nFXKPQuCQACA4fsNkQqeXF5+9WGlFG0N0WDZ0RToUpFGTf1/nN6gprZneISpG/bnG6Z+sN4WyDDB9kO8eEpZNZ2IshVqMsdPc3Sa4wYJfaUJZjmmbhFekCB1jNQjZDTG9gOswfDrY9Ug3KLAORkcY/AWS2yl/8Ph8qS4vjDtm2yzo+cpLP8XyurefQCAL0A+8KFHIwAAAABJRU5ErkJggg==" />

## 🗝️ Step 3: Define Inputs (Your Variables)

Inputs are the “knobs and switches” that tell your State Machine what’s happening. Let’s make some:

1. Create an input named “Hovering”.
2. Make sure it is set to “Boolean”.
3. Make another Boolean input named “Clicking”.

It is also common to name booleans “is\_\_\_\_” such as “isHovering” or “isClicking”. That way the true/false nature of the boolean is clearer.

<Image src="https://assets.docs.lottiefiles.com/static/c58ee6ee55-640.webp" alt="Step 3 — Boolean inputs Hovering and Clicking" caption="Step 3 — Boolean inputs Hovering and Clicking" zoom variant="default" srcSet="https://assets.docs.lottiefiles.com/static/c58ee6ee55-640.webp 640w, https://assets.docs.lottiefiles.com/static/c58ee6ee55-1024.webp 1024w, https://assets.docs.lottiefiles.com/static/c58ee6ee55-1920.webp 1920w" width="2560" height="1440" loading="lazy" data-blur="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAACXBIWXMAACxLAAAsSwGlPZapAAAAkUlEQVR4nD3KuwqCUACA4fMQNamY0jlm3i94K3IqyAaHIJcWJRx6/8XpDwoavu0T7fXO8dLTnHuC8oTthWhyh648umFahIoKnLjEiWtkWOAkNSqpkVFB9xgRblyh/AzppWzDnI2fYAcZlp/+glUcMMsGI68w9hFr0/7SpMttmBDxcyR4zSTzG9W0rHTzH7phXD6kDUCFwZc+CQAAAABJRU5ErkJggg==" />

## 🖱️ Step 4: Create Interactions (User Actions)

Interactions update your Inputs based on what the user does.

For our button:

- When the **mouse enters** the button area → set `Hovering = true`.
- When the **mouse leaves** → set `Hovering = false`.
- When the **mouse clicks** → set `Clicking = true`.
- When the **mouse releases the click** → set `Clicking = false`.

Let’s set that up now:

1. Create a new Interaction.
2. Select ‘PointerEnter’ as the User Action, and select your button layer as the Target Layer.
3. Add a new Action and select “Set Input”.
4. Choose “Hovering” as the input, and set it to ‘true’.

<Image src="https://assets.docs.lottiefiles.com/static/6c8cb47577-640.webp" alt="Step 4 — PointerEnter interaction and Set Input action" caption="Step 4 — PointerEnter interaction and Set Input action" zoom variant="default" srcSet="https://assets.docs.lottiefiles.com/static/6c8cb47577-640.webp 640w, https://assets.docs.lottiefiles.com/static/6c8cb47577-1024.webp 1024w, https://assets.docs.lottiefiles.com/static/6c8cb47577-1920.webp 1920w" width="2888" height="1472" loading="lazy" data-blur="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAECAYAAACzzX7wAAAACXBIWXMAACxLAAAsSwGlPZapAAAAY0lEQVR4nDWNUQ6DMAxDewMoS2iqZFBpE/Cx+58O8aZO48eWLes55bleoxqDFCZzHhbkudK7Ue1MPWQ1pAbP98H62hHze0DqIr7Q9g8WDYkVbxtag0ELKatdP8qf1H0qft+cX1DgKLONQJUuAAAAAElFTkSuQmCC" />

Now when the mouse pointer enters the button’s layer area, the Hovering input will switch to true.

1. Create three more Interactions:
   1. PointerExit, set Hovering to false
   2. PointerDown, set Clicking to true
   3. PointerUp, set Clicking to false

And with that, your Interactions and Inputs are all set!

## 🔗 Step 5: Connect States with Transitions

Now it’s time to wire everything together.

- Each state has:
  - **Green side** = Input
  - **Red side** = Output

1. Drag a wire from one state’s output to another’s input.

In our case, we will want to draw a transition from Idle to Hover and then Hover to Click. But we also cannot forget the return journey of Click to Hover and then Hover to Idle.

<Image src="https://assets.docs.lottiefiles.com/static/886e54c2dd-640.webp" alt="Step 5 — transitions between states" caption="Step 5 — transitions between states" zoom variant="default" srcSet="https://assets.docs.lottiefiles.com/static/886e54c2dd-640.webp 640w, https://assets.docs.lottiefiles.com/static/886e54c2dd-1024.webp 1024w, https://assets.docs.lottiefiles.com/static/886e54c2dd-1920.webp 1920w" width="2888" height="1472" loading="lazy" data-blur="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAECAYAAACzzX7wAAAACXBIWXMAACxLAAAsSwGlPZapAAAAaklEQVR4nCWNWwrCQBDA9gS21dlXd9sdLVWqIt7/bGJk6kcgH4G43qdvJ5EuJHJbiKVxkEDvk/FxJpInsq7o9mS6bozLDSnzHrnBJ46p4ksjn1fa/YU+3kjVf2ALE9ucciXOF0JVhjjuix9+9il02uqLnwAAAABJRU5ErkJggg==" />

1. Set up Conditions for your Transitions.

<Image src="https://assets.docs.lottiefiles.com/static/4f5fbb7dc5-640.webp" alt="Step 5 — transition conditions" caption="Step 5 — transition conditions" zoom variant="default" srcSet="https://assets.docs.lottiefiles.com/static/4f5fbb7dc5-640.webp 640w, https://assets.docs.lottiefiles.com/static/4f5fbb7dc5-1024.webp 1024w, https://assets.docs.lottiefiles.com/static/4f5fbb7dc5-1920.webp 1920w" width="2888" height="1472" loading="lazy" data-blur="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAECAYAAACzzX7wAAAACXBIWXMAACxLAAAsSwGlPZapAAAAY0lEQVR4nD3NXQ5AMBAEYCfw1yq7ZUkVaYIX97+ZGFHhaV6+mUkKQ1eqDEruQDJCU4u8apDp+skzKQyhFgc7TGDn0YcV7BeQmyOMQFuJTcUCCRv8fsBO4QfXN/lgxV2E5Xt13opjKY6ns3ALAAAAAElFTkSuQmCC" />

- From **Idle → Hover**: only allow if `Hovering = true`.
- From **Hover → Click**: only allow if `Clicking = true`.
- From **Click → Hover**: only allow if `Clicking = false`.
- From **Hover → Idle**: only allow if `Hovering = false`.

👉 This way, your button feels **responsive and natural**:

- Hover over it → it lights up.
- Click it → it plays the click animation.
- Move away → it resets back to Idle.

## 🎉 Recap

By following these steps, you’ve built a simple but powerful State Machine:

1. 🎨 **Prepare segments** (Idle, Hover, Click).
2. 🟢 **Add states** to the canvas.
3. 🗝️ **Define inputs** (Hovering, Clicking, etc.).
4. 🖱️ **Set interactions** (mouse enters, clicks, leaves).
5. 🔗 **Wire transitions** with conditions.

You’ve now got a button that _thinks for itself_!
