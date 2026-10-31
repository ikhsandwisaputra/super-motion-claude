---
source: https://rive.app/docs/runtimes/cpp/getting-started
title: "Getting Started"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Getting Started

Build rive-cpp and render a .riv file.

This guide walks you through cloning the runtime, compiling it, and getting a
`.riv` file on screen with a real GPU backend.

## Prerequisites

* A recent **clang** or **MSVC** that supports C++17.
* **git** — the build script will clone and bootstrap `premake5` itself.
* Platform SDK for your renderer of choice (Windows SDK for D3D, Xcode for
  Metal, Vulkan SDK for Vulkan, etc).

> [!NOTE]
>
> Rive uses clang [vector
> builtins](https://reviews.llvm.org/D111529). When building with clang, use the
> latest version available — older toolchains may fail to compile the renderer.

## 1. Clone and build the runtime

```bash theme={null}
git clone https://github.com/rive-app/rive-runtime.git
cd rive-runtime/renderer
```

The runtime ships a build helper at `build/build_rive.sh` (with a
PowerShell wrapper `build_rive.ps1` for Windows). It installs the pinned
`premake5` version on first run and dispatches to the right build system
for your platform (gmake2 on macOS/Linux, MSBuild on Windows, etc).

```bash macOS / Linux theme={null}
../build/build_rive.sh release
```

```powershell Windows theme={null}
..\build\build_rive.ps1 release
```

Common variants:

* `build_rive.sh` (no args) — debug build for the host.
* `build_rive.sh release clean` — clean rebuild.
* `build_rive.sh ninja release` — use Ninja instead of make.
* `build_rive.sh ios release` / `build_rive.sh android release` —
  cross-compile.

Build artifacts land in `out/release/` (or `out/debug/`). You'll link
against `librive.a` (or `rive.lib` on Windows), plus the per-backend
renderer libraries like `librive_pls_renderer.a`.

## 2. Add headers to your project

The public include roots are:

```
rive-runtime/include            # rive-cpp core
rive-runtime/renderer/include   # GPU renderer (only if you use rive::gpu)
```

A minimal CMake snippet:

```cmake theme={null}
target_include_directories(my_app PRIVATE
  ${RIVE}/include
  ${RIVE}/renderer/include
)

target_link_libraries(my_app PRIVATE
  rive
  rive_pls_renderer
  # plus your backend, e.g. d3d11, dxgi on Windows
)
```

## 3. Load a `.riv` file

```cpp theme={null}
#include "rive/file.hpp"
#include <fstream>
#include <iterator>
#include <vector>

using namespace rive;

std::vector<uint8_t> readFile(const char* path) {
    std::ifstream in(path, std::ios::binary);
    return {std::istreambuf_iterator<char>(in), {}};
}

// `factory` is a Factory* — usually your RenderContext (which inherits Factory).
auto bytes = readFile("hero.riv");

ImportResult result;
rcp<File> file = File::import(bytes, factory, &result);
if (!file || result != ImportResult::success) {
    // Bad file or unsupported version.
    return;
}
```

## 4. Pick an Artboard and a State Machine

```cpp theme={null}
#include "rive/artboard.hpp"
#include "rive/animation/state_machine_instance.hpp"

std::unique_ptr<ArtboardInstance> artboard = file->artboardDefault();

std::unique_ptr<StateMachineInstance> sm = artboard->defaultStateMachine();
if (!sm && artboard->stateMachineCount() > 0) {
    sm = artboard->stateMachineAt(0);
}
```

## 5. Advance and draw

A render loop has three phases each frame: **advance**, **draw**, **flush**.

```cpp theme={null}
#include "rive/renderer/rive_renderer.hpp"
#include "rive/renderer/render_context.hpp"

void renderFrame(float dt) {
    sm->advanceAndApply(dt);

    RenderContext::FrameDescriptor frame{};
    frame.renderTargetWidth  = windowWidth;
    frame.renderTargetHeight = windowHeight;
    frame.clearColor         = 0xff202020;   // ARGB
    renderContext->beginFrame(frame);

    RiveRenderer renderer(renderContext.get());
    renderer.save();
    renderer.align(Fit::contain,
                   Alignment::center,
                   AABB(0, 0, windowWidth, windowHeight),
                   artboard->bounds());
    sm->draw(&renderer);
    renderer.restore();

    RenderContext::FlushResources flush{};
    flush.renderTarget = renderTarget.get();
    renderContext->flush(flush);
}
```

> [!TIP]
>
> Use a **fixed timestep** for `advanceAndApply` (e.g. 1/120s) and accumulate
> real elapsed time. State machines are deterministic at fixed steps, which
> makes playback reproducible across machines and frame rates. See
> [Rendering Loop](/docs/runtimes/cpp/rendering-loop).

## 6. Forward input

Route pointer events back through the state machine so
listeners and hit-testing work:

```cpp theme={null}
#include "rive/renderer.hpp"

Mat2D align = computeAlignment(Fit::contain,
                               Alignment::center,
                               AABB(0, 0, w, h),
                               artboard->bounds());

Vec2D toArtboard(int x, int y) {
    return align.invertOrIdentity() * Vec2D{(float)x, (float)y};
}

sm->pointerMove(toArtboard(mouseX, mouseY));
sm->pointerDown(toArtboard(mouseX, mouseY));
sm->pointerUp(toArtboard(mouseX, mouseY));
```

## What's next

> **[Renderers](/docs/runtimes/cpp/renderers)**
>
> Wire up your platform's GPU backend.

> **[State Machines](/docs/runtimes/cpp/state-machines)**
>
> Advance state machines, forward pointer events, and react to state changes.
