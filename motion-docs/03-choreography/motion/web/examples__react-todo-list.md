---
source: https://motion.dev/examples/react-todo-list
title: "To-do list example & tutorial for React | Motion"
fetched: 2026-10-28
---

# To-do list

A draggable to-do list with animated checkboxes and strikethrough effects using Motion for React's Reorder component.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)9 Jan 2026

:   React

:   [MotionScoreB](https://score.motion.dev/methodology "This example has a MotionScore of B, an S-to-F grade based on its animation render cost. Learn how grades work.")

:   [Motion+](https://motion.dev/plus)

[Open fullscreen](https://examples.motion.dev/react/todo-list)

## Source code

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/react-todo-list#tutorial)

Difficulty

### Introduction

The To-do list example demonstrates how to create an interactive to-do list with Motion for React's [`Reorder`](https://motion.dev/docs/react-reorder) component.

Items can be freely reordered, but when a task is checked off, it animates with a strikethrough effect before moving to the bottom of the list.

In this tutorial, we'll learn to use:

* [`Reorder.Group`](https://motion.dev/docs/react-reorder) and `Reorder.Item` for drag-to-reorder functionality
* [`motion` components](https://motion.dev/docs/react-motion-component) for animated strikethrough and opacity effects
* [`useMotionValue`](https://motion.dev/docs/react-motion-value) and [`animate`](https://motion.dev/docs/animate) for animated drag shadows

### Get started

Let's begin by setting up the basic structure and data model for our to-do list. Each item stores its own color so it stays consistent when reordered:

```
"use client"

import { useState } from "react"

interface TodoItem {
    id: number
    text: string
    completed: boolean
    color: string
}

const COLORS = [
    "#ff0088",
    "#dd00ee",
    "#9911ff",
    "#1e75f7",
    "#0cdcf7",
    "#8df0cc",
]

const initialTodos: TodoItem[] = [
    {
        id: 0,
        text: "Review project proposal",
        completed: false,
        color: COLORS[0],
    },
    { id: 1, text: "Update documentation", completed: false, color: COLORS[1] },
    {
        id: 2,
        text: "Schedule team meeting",
        completed: false,
        color: COLORS[2],
    },
    // ... more items - take from source code
]

export default function TodoList() {
    const [todos, setTodos] = useState(initialTodos)

    return (
        <div className="todo-container">
            <ul className="todo-list">
                {todos.map((todo) => (
                    <li key={todo.id} className="todo-item">
                        <span>{todo.text}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

// Take styles from example source code.
```

The container has a fixed height with `overflow: auto` to demonstrate the Reorder component's autoscroll feature when dragging items beyond the visible area.

### Related examples

* [![Card stack animation example](https://images.motion.dev/examples/js/card-stack.png)Card stack](https://motion.dev/examples/js-card-stack)
* [![Reorder grid animation example](https://images.motion.dev/examples/previews/vue/reorder-grid/v-223b30f1f488/poster.webp)[](https://images.motion.dev/examples/previews/vue/reorder-grid/v-223b30f1f488/preview.mp4)Reorder grid](https://motion.dev/examples/vue-reorder-grid)
* [![Multidimensional reorder animation example](https://images.motion.dev/examples/previews/react/reorder-grid/v-6218a2888c89/poster.webp)[](https://images.motion.dev/examples/previews/react/reorder-grid/v-6218a2888c89/preview.mp4)Multidimensional reorder](https://motion.dev/examples/react-reorder-grid)

### Latest in React

* [![AnimateSuspense: Loading comments animation example](https://images.motion.dev/examples/react/animate-suspense.png)AnimateSuspense: Loading comments](https://motion.dev/examples/react-animate-suspense)
* [![AnimateSuspense: Skeleton crossfade animation example](https://images.motion.dev/examples/react/animate-suspense-pop-layout.png)AnimateSuspense: Skeleton crossfade](https://motion.dev/examples/react-animate-suspense-pop-layout)
* [![AnimateSuspense: Wait for exit animation example](https://images.motion.dev/examples/react/animate-suspense-wait.png)AnimateSuspense: Wait for exit](https://motion.dev/examples/react-animate-suspense-wait)
* [![Gallery: Depth of field animation example](https://images.motion.dev/examples/react/gallery-depth-of-field.png)Gallery: Depth of field](https://motion.dev/examples/react-gallery-depth-of-field)
