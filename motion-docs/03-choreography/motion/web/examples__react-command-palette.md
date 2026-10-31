---
source: https://motion.dev/examples/react-command-palette
title: "Command Palette example & tutorial for React | Motion"
fetched: 2026-10-28
---

# Command Palette

A âK-style command palette with spring-animated entrance, filtered search, and keyboard navigation

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)12 Mar 2026

:   React

:   [MotionScoreA](https://score.motion.dev/methodology "This example has a MotionScore of A, an S-to-F grade based on its animation render cost. Learn how grades work.")

:   [Motion+](https://motion.dev/plus)

[Open fullscreen](https://examples.motion.dev/react/command-palette)

## Source code

## Tutorial

Tutorial time
:   [5 min](https://motion.dev/examples/react-command-palette#tutorial)

Difficulty

### What we're building

The Command Palette example shows a âK-style command palette - the kind you'd find in VS Code or Linear. Clicking the search trigger (or imagining a keyboard shortcut) opens a modal dialog where you can filter commands, navigate with the arrow keys, and select an item to close the palette.

The animations lean on several Motion APIs:

* [`AnimatePresence`](https://motion.dev/docs/react-animate-presence) to animate the backdrop and dialog in and out
* The [`animate`](https://motion.dev/docs/react-animation#basic-animations), [`initial`](https://motion.dev/docs/react-animation#basic-animations), and [`exit`](https://motion.dev/docs/react-animate-presence) props on `motion` components for enter/exit transitions
* The [`layout`](https://motion.dev/docs/react-layout-animations) prop to smoothly reflow groups as the filter changes
* The [`layoutId`](https://motion.dev/docs/react-layout-animations#shared-layout-animations) prop for the selection highlight, which animates between items as you navigate

### Get started

Here's the basic shell of the component - the dialog structure with no animations yet.

```
"use client"

import { useState, useRef, useCallback, useEffect, useMemo } from "react"

const COMMANDS = [
    {
        label: "General",
        items: [
            { label: "New File", icon: FileIcon, shortcut: ["â", "N"] },
            { label: "Open File", icon: FolderIcon, shortcut: ["â", "O"] },
            { label: "Save", icon: SaveIcon, shortcut: ["â", "S"] },
        ],
    },
    {
        label: "Editor",
        items: [
            { label: "Format Document", icon: SparkleIcon },
            { label: "Go to Line", icon: HashIcon },
        ],
    },
]

export default function CommandPalette() {
    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState("")
    const [selectedIndex, setSelectedIndex] = useState(0)
    const inputRef = useRef(null)
    const listRef = useRef(null)

    const filtered = useMemo(() => {
        if (!query.trim()) return COMMANDS
        const q = query.toLowerCase()
        return COMMANDS.map((group) => ({
            ...group,
            items: group.items.filter((item) =>
                item.label.toLowerCase().includes(q)
            ),
        })).filter((group) => group.items.length > 0)
    }, [query])

    const flatItems = useMemo(
        () => filtered.flatMap((g) => g.items),
        [filtered]
    )

    const handleOpen = useCallback(() => {
        setOpen(true)
        setQuery("")
        setSelectedIndex(0)
    }, [])

    const handleClose = useCallback(() => setOpen(false), [])

    const handleSelect = useCallback(() => {
        handleClose()
    }, [handleClose])

    const handleKeyDown = useCallback(
        (e) => {
            if (e.key === "ArrowDown") {
                e.preventDefault()
                setSelectedIndex((i) => (i < flatItems.length - 1 ? i + 1 : 0))
            } else if (e.key === "ArrowUp") {
                e.preventDefault()
                setSelectedIndex((i) => (i > 0 ? i - 1 : flatItems.length - 1))
            } else if (e.key === "Enter") {
                e.preventDefault()
                handleSelect()
            } else if (e.key === "Escape") {
                e.preventDefault()
                handleClose()
            }
        },
        [flatItems.length, handleSelect, handleClose]
    )

    useEffect(() => {
        setSelectedIndex(0)
    }, [query])

    useEffect(() => {
        if (!open) return
        const raf = requestAnimationFrame(() => inputRef.current?.focus())
        return () => cancelAnimationFrame(raf)
    }, [open])

    useEffect(() => {
        if (!listRef.current) return
        const selected = listRef.current.querySelector("[data-selected=true]")
        selected?.scrollIntoView({ block: "nearest" })
    }, [selectedIndex])

    let runningIndex = 0

    return (
        <div style={wrapperStyle}>
            <button style={triggerStyle} onClick={handleOpen}>
                <SearchIcon />
                <span style={triggerLabelStyle}>Search commands...</span>
                <kbd style={kbdStyle}>âK</kbd>
            </button>

            {open && (
                <>
                    <div style={backdropStyle} onClick={handleClose} />
                    <div style={dialogStyle} onKeyDown={handleKeyDown}>
                        <div style={inputWrapperStyle}>
                            <SearchIcon />
                            <input
                                ref={inputRef}
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Type a command..."
                                style={inputStyle}
                            />
                            {query && (
                                <button
                                    style={clearButtonStyle}
                                    onClick={() => setQuery("")}
                                >
                                    <CloseIcon />
                                </button>
                            )}
                        </div>

                        <div ref={listRef} style={listStyle}>
                            {filtered.length > 0 ? (
                                filtered.map((group) => {
                                    const groupItems = group.items.map((item) => {
                                        const idx = runningIndex++
                                        return { item, idx }
                                    })
                                    return (
                                        <div key={group.label}>
                                            <div style={groupLabelStyle}>
                                                {group.label}
                                            </div>
                                            {groupItems.map(({ item, idx }) => (
                                                <CommandItem
                                                    key={item.label}
                                                    item={item}
                                                    isSelected={idx === selectedIndex}
                                                    onSelect={handleSelect}
                                                    onHover={() => setSelectedIndex(idx)}
                                                />
                                            ))}
                                        </div>
                                    )
                                })
                            ) : (
                                <div style={emptyStyle}>
                                    No results for "{query}"
                                </div>
                            )}
                        </div>

                        <div style={footerStyle}>
                            <FooterHint keys="ââ">navigate</FooterHint>
                            <FooterHint keys="âµ">select</FooterHint>
                            <FooterHint keys="esc">close</FooterHint>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

function CommandItem({ item, isSelected, onSelect, onHover }) {
    return (
        <div
            data-selected={isSelected}
            style={itemStyle}
            onClick={onSelect}
            onMouseEnter={onHover}
        >
            {isSelected && <div style={highlightStyle} />}
            <span style={iconCellStyle}>
                <item.icon />
            </span>
            <span style={itemLabelStyle}>{item.label}</span>
            {item.shortcut && (
                <span style={shortcutStyle}>
                    {item.shortcut.map((key, i) => (
                        <kbd key={i} style={shortcutKbdStyle}>{key}</kbd>
                    ))}
                </span>
            )}
        </div>
    )
}

function FooterHint({ keys, children }) {
    return (
        <span style={footerHintStyle}>
            <kbd style={footerKbdStyle}>{keys}</kbd> {children}
        </span>
    )
}

// Add your icons and styles here
// (See source code for full icon and style definitions)
```

The state setup is worth understanding before we add any animations:

* `open` controls whether the palette is visible
* `query` is the current search string
* `selectedIndex` tracks which item in the flat list is highlighted

`filtered` uses `useMemo` to re-filter the full `COMMANDS` list whenever `query` changes. Because commands are grouped, we also keep a `flatItems` list that collapses all groups into a single array - this makes `selectedIndex` arithmetic straightforward.

The `runningIndex` variable (declared with `let` just before the return) is reset every render and incremented as we map through grouped items. This gives each `CommandItem` an absolute index that maps to `selectedIndex`.

Three `useEffect` hooks handle side effects: resetting selection when the query changes, auto-focusing the input when the palette opens (using `requestAnimationFrame` to wait until after the DOM is painted), and scrolling the selected item into view when navigation moves the selection off screen.

### Related examples

* [![Command Palette animation example](https://images.motion.dev/examples/previews/vue/command-palette/v-63fd67e87de2/poster.webp)[](https://images.motion.dev/examples/previews/vue/command-palette/v-63fd67e87de2/preview.mp4)Command Palette](https://motion.dev/examples/vue-command-palette)
* [![Context Menu animation example](https://images.motion.dev/examples/previews/vue/context-menu/v-e968164f30f2/poster.webp)[](https://images.motion.dev/examples/previews/vue/context-menu/v-e968164f30f2/preview.mp4)Context Menu](https://motion.dev/examples/vue-context-menu)
* [![Floating Action Button animation example](https://images.motion.dev/examples/previews/vue/floating-action-button/v-76e85b513a0e/poster.webp)[](https://images.motion.dev/examples/previews/vue/floating-action-button/v-76e85b513a0e/preview.mp4)Floating Action Button](https://motion.dev/examples/vue-floating-action-button)

### Latest in React

* [![AnimateSuspense: Loading comments animation example](https://images.motion.dev/examples/react/animate-suspense.png)AnimateSuspense: Loading comments](https://motion.dev/examples/react-animate-suspense)
* [![AnimateSuspense: Skeleton crossfade animation example](https://images.motion.dev/examples/react/animate-suspense-pop-layout.png)AnimateSuspense: Skeleton crossfade](https://motion.dev/examples/react-animate-suspense-pop-layout)
* [![AnimateSuspense: Wait for exit animation example](https://images.motion.dev/examples/react/animate-suspense-wait.png)AnimateSuspense: Wait for exit](https://motion.dev/examples/react-animate-suspense-wait)
* [![Gallery: Depth of field animation example](https://images.motion.dev/examples/react/gallery-depth-of-field.png)Gallery: Depth of field](https://motion.dev/examples/react-gallery-depth-of-field)
