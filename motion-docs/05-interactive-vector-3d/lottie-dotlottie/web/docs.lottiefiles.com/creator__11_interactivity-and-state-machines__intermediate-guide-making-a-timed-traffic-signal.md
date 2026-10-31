---
source: https://docs.lottiefiles.com/en/creator/11_interactivity-and-state-machines/intermediate-guide-making-a-timed-traffic-signal.md
title: ""
fetched: 2026-10-28
---

# Intermediate Guide: Making a Timed Traffic Signal
In this guide we will create a traffic signal state machine to focus on using Numeric inputs as a clock to get a timer effect. The traffic signal will switch between Green, Yellow, and Red depending on the amount of time that has passed.

<DotLottiePlayer src="https://lottie.host/f99bf1c5-1e84-4bb3-9575-5f15461adc54/uiB79FViyn.lottie" autoplay loop stateMachineId="StateMachine1" width={100} height={100} />

You can remix the file for this example here: [https://lottie.link/traffic\\](https://lottie.link/traffic\\)

## 🎨 Step 1: Prepare Your Animation

First, design your traffic light visuals and define the segments that represent each light.

1. Draw your traffic light with three segments:
   - Green light ON
   - Yellow light ON
   - Red light ON
2. Use keyframes to animate the switch between lights (if needed).
3. Add segments for each state using markers.
   - Red: 0-30
   - Green: frames 62-92
   - Yellow: 31-61

<Image src="https://assets.docs.lottiefiles.com/static/c9c4b82f4d-640.webp" alt="Step 1 — Green, Yellow, and Red segments" caption="Step 1 — Green, Yellow, and Red segments" zoom variant="default" srcSet="https://assets.docs.lottiefiles.com/static/c9c4b82f4d-640.webp 640w, https://assets.docs.lottiefiles.com/static/c9c4b82f4d-1024.webp 1024w" width="1255" height="647" loading="lazy" data-blur="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAECAYAAACzzX7wAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAdUlEQVR4nAXBYRNCMACA4X1LijlyTTe7DcOUxKW+9f//1dvziHZ8YLvAIYqJjieSJKXIC5RSSCkR0/rl+fmRX67E54w0K6h0TVlp8lIhumXFb29M41HacqsdjQ+YbsQ0A8L5EW1bhnkjLDvTayfMK66fcP2dP7raK6x9ShDgAAAAAElFTkSuQmCC" />

✅ At this point, you've got three labeled segments—each a snapshot of the traffic light's current state.

You will notice that these frames are very specific, and in fact they are each 30 frames. This is because our animation plays at 30 frames per second, meaning each segment is exactly one second long. This concept will be the foundation of our timer. We can store a value of how many times we have looped a segment to know how many seconds have passed.

## 🟢 Step 2: Add States to the State Machine

1. Open the State Machines tab.
2. Drag each segment (Green, Yellow, Red) onto the State Machine canvas.

Now you've got three state nodes, ready to be connected!

💡 Tip: Set Green as your Initial state (right-click the node → Set as Initial).

<Image src="https://assets.docs.lottiefiles.com/static/6dbb835976-640.webp" alt="Step 2 — Green, Yellow, and Red states on the canvas" caption="Step 2 — Green, Yellow, and Red states on the canvas" zoom variant="default" srcSet="https://assets.docs.lottiefiles.com/static/6dbb835976-640.webp 640w, https://assets.docs.lottiefiles.com/static/6dbb835976-1024.webp 1024w, https://assets.docs.lottiefiles.com/static/6dbb835976-1920.webp 1920w" width="2888" height="1472" loading="lazy" data-blur="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAECAYAAACzzX7wAAAACXBIWXMAACxLAAAsSwGlPZapAAAAYklEQVR4nD2NSQ6AIBAEeQIuMzKAg3tiuOj/v2ZsAwePXalKmznfbzwyLDlwnODThoalbkvuMem8EPZcYe9HkIxoJUJ0Re8iDE8rKC1/RUHBQdG5UFkR3iJYlgoGXcBe/4sPsCEpp4TqaooAAAAASUVORK5CYII=" />

## 🕰️ Step 3: Create Timer Inputs

Our transitions will be based on time delays — so we need one input to act as a timer.

1. Add a Numeric input named elapsedTime.
2. This will represent how many seconds have passed since entering a state.

<Image src="https://assets.docs.lottiefiles.com/static/da97e09377-640.webp" alt="Step 3 — Numeric elapsedTime input" caption="Step 3 — Numeric elapsedTime input" zoom variant="default" srcSet="https://assets.docs.lottiefiles.com/static/da97e09377-640.webp 640w, https://assets.docs.lottiefiles.com/static/da97e09377-1024.webp 1024w, https://assets.docs.lottiefiles.com/static/da97e09377-1920.webp 1920w" width="2560" height="1440" loading="lazy" data-blur="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAACXBIWXMAACxLAAAsSwGlPZapAAAAkElEQVR4nE3MvQqCUABA4fsMkRr5/1cqptTQ1hBJidet4W6SlyBaen+nE9XScLaPI6Qaaa8DvdLsjxfsJMMKE9x1Qaf0JOJqh5dvCMotfl6xiFaYQYyblUilEU6YsvRi/LjATnIMP/pmpzmfu7CahrnsMHuJXe8wvfAPaEQ7PDjfnsj7i/pwYuZ4GMEPdGqc3mdgQAAyN1uWAAAAAElFTkSuQmCC" />

You can update this timer through actions on each state (we'll do that next).

## 🧠 Step 4: Add Entry Actions (Reset Timer)

When each state begins, we want to reset the elapsedTime value to 0.

For each state:

1. Select the state (Green, Yellow, or Red)
2. In Entry Actions, add:
   - Set elapsedTime = 0

<Image src="https://assets.docs.lottiefiles.com/static/207ca7ecc4-640.webp" alt="Step 4 — Entry action: set elapsedTime to 0" caption="Step 4 — Entry action: set elapsedTime to 0" zoom variant="default" srcSet="https://assets.docs.lottiefiles.com/static/207ca7ecc4-640.webp 640w, https://assets.docs.lottiefiles.com/static/207ca7ecc4-1024.webp 1024w, https://assets.docs.lottiefiles.com/static/207ca7ecc4-1920.webp 1920w" width="2860" height="2024" loading="lazy" data-blur="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAGCAYAAAD+Bd/7AAAACXBIWXMAACxLAAAsSwGlPZapAAAAnklEQVR4nE2OywqCUABE/YV2kgkhqWWCXip6EEHkA7s3wRuiqZFp/f8X1ITawsWs5jBzBJbWX5bWaEKTCluHwdodQfYOgvgBoSnC2wth9gZNnlBMG4OhDFGdwrveO8CNcvi8aBdUawlR0TCekz6Qwed5B9grSOoMI82Ax4sOuPwvznEJnawh6yakiQEvyiHQpPr0JTcn1gouDi6CuMQP1d5XkfpsHPUAAAAASUVORK5CYII=" />

This means that when the state begins (we enter the state), it will change elapsedTime to 0 before doing anything else. This ensures the timer starts fresh each time a new light turns on.

## ⚙️ Step 5: Add On Loop Complete Actions (Increment Timer)

After each loop of a state, we want to add one to the elapsedTime.

For each state:

1. Select the state (Green, Yellow, or Red)
2. Set Loop to infinity. This ensures that it will loop over and over.
3. In On loop complete actions, add:
   - Increment elapsedTime + 1.

<Image src="https://assets.docs.lottiefiles.com/static/71d8e42ac2-640.webp" alt="Step 5 — On loop complete: increment elapsedTime" caption="Step 5 — On loop complete: increment elapsedTime" zoom variant="default" srcSet="https://assets.docs.lottiefiles.com/static/71d8e42ac2-640.webp 640w, https://assets.docs.lottiefiles.com/static/71d8e42ac2-1024.webp 1024w, https://assets.docs.lottiefiles.com/static/71d8e42ac2-1920.webp 1920w" width="2860" height="2440" loading="lazy" data-blur="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAHCAYAAAA1WQxeAAAACXBIWXMAACxLAAAsSwGlPZapAAAAqUlEQVR4nE2Pyw6CMBBF+QVXLgwqasRKASFEDcb4WhChspOWHVD+/wuUa4o2cTGZxT05M9dgQnZMSKjJeIPtOcE6irE5XJHyujN0qIEZDTAYmTCJh7So0QMqYLzp99wNMbQWsGiA+7OCwcoWl1zglnNkvIYd7mHaDibE+wHaIGSvJFGMKfFhOdrwu/8oW6RFhZUyLCnGtvsFMiFf/09GpwR0d4SvWhTV+wMOxGY2+QZOlQAAAABJRU5ErkJggg==" />

This means that when the loop completes, the elapsedTime counter will increment by one, corresponding to the number of seconds since entering the state.

## 🔁 Step 6: Create Transitions Between States

Now connect the states in a loop:

1. Drag a wire:
   - Green → Yellow
   - Yellow → Red
   - Red → Green
2. Set transition conditions based on elapsedTime:
   - Green → Yellow: elapsedTime ≥ 4
   - Yellow → Red: elapsedTime ≥ 1
   - Red → Green: elapsedTime ≥ 5

<Image src="https://assets.docs.lottiefiles.com/static/5d43202ab3-640.webp" alt="Step 6 — Transitions with elapsedTime guards" caption="Step 6 — Transitions with elapsedTime guards" zoom variant="default" srcSet="https://assets.docs.lottiefiles.com/static/5d43202ab3-640.webp 640w, https://assets.docs.lottiefiles.com/static/5d43202ab3-1024.webp 1024w, https://assets.docs.lottiefiles.com/static/5d43202ab3-1920.webp 1920w" width="2888" height="1472" loading="lazy" data-blur="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAECAYAAACzzX7wAAAACXBIWXMAACxLAAAsSwGlPZapAAAAZklEQVR4nCWLbQqAIBQEu0FWau/ZUxOiD4TufzhxQ/s3zM4OylA1ssPFAzNtoJiwsMfCAmWoDJNlaJYutET4O8NfGe64W4AeNDAsoJAgZ0Z8XnA6/0DptTawkmBdQDtM1vVx1Gv5AJI5KYBG2H2ZAAAAAElFTkSuQmCC" />

This means:

- Stay on green for 4 seconds
- Yellow for 1 second
- Red for 5 seconds

## ▶️ Step 7: Test the Loop

Head to the Player and toggle the State Machine view.

You should see the traffic light automatically:

- Start on Green
- Switch to Yellow after 4 seconds
- Then to Red after 1
- Back to Green after 5

🌟 You just created a timed animation loop with zero code!

## 🎉 Recap

Here's what you built:

1. 🎨 Defined segments: Green, Yellow, Red
2. 🟢 Dragged them as States
3. 🕰️ Added an elapsedTime input
4. ⚙️ Set entry and update actions
5. 🔗 Connected transitions with time-based conditions

This simple setup can be reused for countdowns, idle animations, and anything that changes based on time.
