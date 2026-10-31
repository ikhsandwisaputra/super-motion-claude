---
source: https://rive.app/docs/editor/workflows/dependency-graph
title: "Dependencies Graph"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Dependencies Graph

Use the Dependency Graph to visualize relationships between elements in your file

## Show dependencies

To show dependencies, select an item and press **D**. Rive displays arrows connecting the selected item to its parent and child dependencies.

![Filter dependency types](https://mintcdn.com/rive/ez1gAE2L4S7rKEWV/images/workflows/dependencies.png?fit=max\&auto=format\&n=ez1gAE2L4S7rKEWV\&q=85\&s=6aa0fa4d154b3586d5a560ad37b590b4)

Dependency arrows are color coded based on the type of relationship.

For example, if the rotation of `NEW_sticker` is controlled by the rotation of `Icon` through a constraint, Rive shows that dependency with a yellow arrow.

![Filter dependency types](https://mintcdn.com/rive/ez1gAE2L4S7rKEWV/images/workflows/dependencies-colors.png?fit=max\&auto=format\&n=ez1gAE2L4S7rKEWV\&q=85\&s=bfe10d9faf0b6445ea7c03596f625766)

## Filtering

Use the dependency options to filter which relationships are shown. This is helpful when an element has many connections and you only want to focus on specific dependency types.

![Filter dependency types](https://mintcdn.com/rive/ez1gAE2L4S7rKEWV/images/workflows/filter-dependencies.gif?s=9bfd0693363f270903d0e71b15510e4c)
