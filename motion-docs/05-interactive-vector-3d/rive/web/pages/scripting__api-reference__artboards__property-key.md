---
source: https://rive.app/docs/scripting/api-reference/artboards/property-key
title: "PropertyKey"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# PropertyKey

What a custom property is read by. Get one from `artboard:propertyKey`
once, in `init`, and keep it: resolving a name scans the file's name
table, reading by key does not.
