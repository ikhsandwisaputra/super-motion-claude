---
source: https://rive.app/docs/scripting/api-reference/gpu/shader
title: "Shader"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Shader

An opaque compiled shader module. Get one with `context:shader(name)`,
where `name` is the shader asset's name as added in the editor (e.g.
"myEffect" — no ".wgsl" extension). Raw WGSL source strings are not
accepted at runtime.
