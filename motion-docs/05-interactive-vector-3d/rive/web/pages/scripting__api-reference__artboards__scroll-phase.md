---
source: https://rive.app/docs/scripting/api-reference/artboards/scroll-phase
title: "ScrollPhase"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# ScrollPhase

Where a [ScrollEvent](/docs/scripting/api-reference/artboards/scroll-event) sits within its gesture. A mouse wheel only ever
reports `update`.

* `begin`: fingers started a trackpad gesture
* `update`: the gesture moved, or a wheel turned
* `end`: the fingers lifted; hosts whose platform sends its own momentum
  never report it
* `momentum`: platform generated travel after the fingers lifted
* `inertiaCancel`: fingers landed during momentum to stop it; carries no
  delta
