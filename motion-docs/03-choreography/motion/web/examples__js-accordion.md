---
source: https://motion.dev/examples/js-accordion
title: "Accordion example & tutorial for JavaScript | Motion"
fetched: 2026-10-28
---

# Accordion

An example of an accordion component using Motion. Animate accordion content using height: auto and accessible markup. Uses focus events and shared layout animations for keyboard accessibility.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)18 Feb 2025

:   JavaScript

:   [MotionScoreB](https://score.motion.dev/methodology "This example has a MotionScore of B, an S-to-F grade based on its animation render cost. Learn how grades work.")

[Open fullscreen](https://examples.motion.dev/js/accordion)

## Source code

```
<div class="accordion">
    <section>
        <h3>
            <button
                id="item1-button"
                aria-expanded="false"
                aria-controls="item1"
                class="big"
            >
                <span>What is Motion+?</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <path d="m6 9 6 6 6-6" />
                </svg>
                <div class="focus-ring"></div>
            </button>
        </h3>
        <div
            id="item1"
            aria-labelledby="item1-button"
            class="accordion-content"
        >
            <div>
                <p class="small">
                    Motion+ is a one-time fee, lifetime access membership that
                    unlocks the source code for all Motion examples, early
                    access features, premium components, and an exclusive
                    Discord community.
                </p>
            </div>
        </div>
        <hr />
    </section>
    <section>
        <h3>
            <button
                id="item2-button"
                aria-expanded="false"
                aria-controls="item2"
                class="big"
            >
                <span>What does "lifetime access" mean?</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <path d="m6 9 6 6 6-6" />
                </svg>
                <div class="focus-ring"></div>
            </button>
        </h3>
        <div
            id="item2"
            aria-labelledby="item2-button"
            class="accordion-content"
        >
            <div>
                <p class="small">
                    Just that! No one needs another subscription in their life.
                </p>
                <p class="small">
                    Lifetime access means you'll receive all updates to Motion+
                    as they're released.
                </p>
            </div>
        </div>
        <hr />
    </section>
    <section>
        <h3>
            <button
                id="item3-button"
                aria-expanded="false"
                aria-controls="item3"
                class="big"
            >
                <span>How does the team package work?</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <path d="m6 9 6 6 6-6" />
                </svg>
                <div class="focus-ring"></div>
            </button>
        </h3>
        <div
            id="item3"
            aria-labelledby="item3-button"
            class="accordion-content"
        >
            <div>
                <p class="small">
                    After purchase, you can nominate up to 10 team members to
                    join Motion+.
                </p>
            </div>
        </div>
        <hr />
    </section>
</div>

<script type="module">
    import { animate, press } from "motion"

    // Animation configurations
    const transition = { duration: 0.3 }

    press(".accordion section button", (button) => () => {
        const item = button.closest(".accordion section")
        const content = item.querySelector(".accordion-content")
        const contentInner = content.querySelector("div")
        const chevron = button.querySelector("svg")
        const focusRing = button.querySelector(".focus-ring")

        let isOpen = button.dataset.isOpen === "true"

        isOpen = !isOpen
        button.dataset.isOpen = isOpen
        button.setAttribute("aria-expanded", isOpen)

        animate(
            content,
            isOpen
                ? {
                      height: "auto",
                      maskImage:
                          "linear-gradient(to bottom, black 100%, transparent 100%)",
                  }
                : {
                      height: 0,
                      maskImage:
                          "linear-gradient(to bottom, black 50%, transparent 100%)",
                  },
            transition
        )
        animate(
            contentInner,
            isOpen
                ? {
                      filter: "blur(0px)",
                      opacity: 1,
                  }
                : {
                      filter: "blur(2px)",
                      opacity: 0,
                  },
            { duration: 0.3 }
        )
        animate(chevron, { rotate: isOpen ? 180 : 0 }, transition)
    })
</script>

<style>
    .accordion {
        display: flex;
        flex-direction: column;
        margin: 20px;
        background: var(--layer);
        border: 1px solid var(--border);
        border-radius: 10px;
        min-width: 300px;
        max-width: 500px;
    }

    .accordion section {
        padding: 20px;
        position: relative;
    }

    .accordion h3 {
        margin: 0;
        display: flex;
    }

    .accordion hr {
        margin: 0;
        border: 0;
        border-bottom: 1px solid var(--border);
        position: absolute;
        bottom: 0;
        left: 20px;
        right: 20px;
        z-index: 0;
    }

    .accordion section:last-child hr {
        display: none;
    }

    .accordion h3 button {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex: 1;
        position: relative;
        background: none;
        border: none;
        padding: 0;
        color: inherit;
        cursor: pointer;
    }

    .accordion h3 span,
    .accordion h3 svg {
        text-align: left;
        z-index: 1;
        position: relative;
    }

    .accordion .focus-ring {
        position: absolute;
        inset: -10px;
        background: var(--hue-4-transparent);
        border-radius: 5px;
        z-index: 0;
        display: none;
    }

    .accordion-content {
        overflow: hidden;
        height: 0;
    }

    .accordion-content > div {
        padding: 20px 0 0;
        opacity: 0;
    }

    .accordion-content p {
        line-height: 1.5;
        padding: 0;
        margin: 0;
    }

    .accordion-content p + p {
        margin-top: 1em;
    }
</style>
```

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/js-accordion#tutorial)

Difficulty

### Introduction

The Accordion example shows how to build a fully accessible accordion component with smooth animations. It uses the [`press`](https://motion.dev/docs/press) event handler from Motion to detect button clicks and the [`animate`](https://motion.dev/docs/animate) function to create smooth height transitions, content fade effects, and chevron rotations.

One of the most challenging aspects of building accordions is animating to `height: auto`. While browsers now support this via [`interpolate-size: allow-keywords`](https://developer.mozilla.org/en-US/docs/Web/CSS/interpolate-size), browser support is still limited. Motion makes this easy by automatically calculating the final height and creating smooth animations that work across all browsers.

### Get started

Let's start with the basic HTML structure for an accordion. We'll create three sections, each containing a button header and collapsible content area:

```
<div class="accordion">
    <section>
        <h3>
            <button
                id="item1-button"
                aria-expanded="false"
                aria-controls="item1"
                class="big"
            >
                <span>Question 1</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <path d="m6 9 6 6 6-6" />
                </svg>
                <div class="focus-ring"></div>
            </button>
        </h3>
        <div
            id="item1"
            aria-labelledby="item1-button"
            class="accordion-content"
        >
            <div>
                <p class="small">Answer 1</p>
            </div>
        </div>
        <hr />
    </section>
    <section>
        <h3>
            <button
                id="item2-button"
                aria-expanded="false"
                aria-controls="item2"
                class="big"
            >
                <span>Question 2</span>
                <!-- Copy SVG from above -->
                <div class="focus-ring"></div>
            </button>
        </h3>
        <div
            id="item2"
            aria-labelledby="item2-button"
            class="accordion-content"
        >
            <div>
                <p class="small">Answer 2</p>
            </div>
        </div>
        <hr />
    </section>
    <section>
        <h3>
            <button
                id="item3-button"
                aria-expanded="false"
                aria-controls="item3"
                class="big"
            >
                <span>Question 3</span>
                <!-- Copy SVG from above -->
                <div class="focus-ring"></div>
            </button>
        </h3>
        <div
            id="item3"
            aria-labelledby="item3-button"
            class="accordion-content"
        >
            <div>
                <p class="small">Answer 3</p>
            </div>
        </div>
        <hr />
    </section>
</div>

<style>
    /** Copy styles from example source code */
</style>
```

The markup follows accessibility best practices. Each button has `aria-expanded` to indicate whether the content is visible, and `aria-controls` to link it to the content area. The content uses `aria-labelledby` to reference its button.

Note that the `.accordion-content` starts with `height: 0` and `opacity: 0` on the inner `div`, hiding the content by default.

### Related examples

* [![Modal dialog animation example](https://images.motion.dev/examples/previews/vue/modal/v-f1fc27d6fbab/poster.webp)[](https://images.motion.dev/examples/previews/vue/modal/v-f1fc27d6fbab/preview.mp4)Modal dialog](https://motion.dev/examples/vue-modal)
* [![Family-style dialog animation example](https://images.motion.dev/examples/previews/vue/family-dialog/v-7a8e7e42c381/poster.webp)[](https://images.motion.dev/examples/previews/vue/family-dialog/v-7a8e7e42c381/preview.mp4)Family-style dialog](https://motion.dev/examples/vue-family-dialog)
* [![Family-style dialog animation example](https://images.motion.dev/examples/previews/js/family-dialog/v-032ee437e7b9/poster.webp)[](https://images.motion.dev/examples/previews/js/family-dialog/v-032ee437e7b9/preview.mp4)Family-style dialog](https://motion.dev/examples/js-family-dialog)

### Latest in JavaScript

* [![Apple Watch Home Screen animation example](https://images.motion.dev/examples/js/apple-watch-home-screen.png)Apple Watch Home Screen](https://motion.dev/examples/js-apple-watch-home-screen)
* [![Card stack animation example](https://images.motion.dev/examples/js/card-stack.png)Card stack](https://motion.dev/examples/js-card-stack)
* [![Drag animation example](https://images.motion.dev/examples/js/drag.png)Drag](https://motion.dev/examples/js-drag)
* [![Drag: Constraints animation example](https://images.motion.dev/examples/js/drag-constraints.png)Drag: Constraints](https://motion.dev/examples/js-drag-constraints)
