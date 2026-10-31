---
source: https://rive.app/docs/runtimes/apple/gpu-canvas
title: "GPU Canvas"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# GPU Canvas

Enable GPU Canvas when creating a Worker in the Apple runtime.

GPU Canvas enables 3D content in the Apple runtime. It is available through the Swift Concurrency API and is configured when creating a `Worker`. The setting applies to every `File` loaded by that worker and every `Rive` object created from those files.

> [!NOTE]
>
> GPU Canvas is required to render 3D content.

## Enabling GPU Canvas

Pass a configuration with `enableGPUCanvas` set to `true` when creating a worker:

```swift theme={null}
let worker = try await Worker(
    configuration: .init(enableGPUCanvas: true)
)
```

The worker's GPU Canvas setting is fixed for its lifetime. Enable it before loading any files that require GPU Canvas or 3D support.

Every `File` created with the worker uses the same setting:

```swift theme={null}
let worker = try await Worker(
    configuration: .init(enableGPUCanvas: true)
)
let file = try await File(
    source: .local("my_file", Bundle.main),
    worker: worker
)
let rive = try await Rive(file: file)
```

No additional configuration is required when creating a `RiveUIView`, `RiveUIViewRepresentable`, or `AsyncRiveUIViewRepresentable`. Each view inherits the GPU Canvas setting from the worker associated with its `Rive` object.

## Default behavior

GPU Canvas is disabled by default. Continue to create a worker without a configuration when your content does not require it:

```swift theme={null}
let worker = try await Worker()
```

## Sharing a GPU Canvas worker

Share a GPU Canvas worker when multiple files or views can use the same worker. An example implementation is shown below.

> [!NOTE]
>
> `AsyncShared` and the `Worker` extensions below are application-level helpers. They are not included with `RiveRuntime`.

```swift AsyncShared.swift theme={null}
/// Lazily creates and caches a value. Failed initialization can be retried.
@MainActor
final class AsyncShared<Value> {
    private let makeValue: @MainActor () async throws -> Value
    private var cachedValue: Value?
    private var loadingTask: Task<Value, Error>?

    init(_ makeValue: @escaping @MainActor () async throws -> Value) {
        self.makeValue = makeValue
    }

    func value() async throws -> Value {
        if let cachedValue {
            return cachedValue
        }

        let task = loadingTask ?? Task {
            defer { loadingTask = nil }
            let value = try await makeValue()
            cachedValue = value
            return value
        }
        loadingTask = task

        return try await task.value
    }
}
```

```swift AsyncShared+Worker.swift theme={null}
import RiveRuntime

extension AsyncShared where Value == Worker {
    convenience init(configuration: Worker.Configuration = .init()) {
        self.init {
            try await Worker(configuration: configuration)
        }
    }
}

extension Worker {
    @MainActor
    private static let sharedWorker = AsyncShared<Worker>()

    @MainActor
    private static let sharedGPUCanvasWorker = AsyncShared<Worker>(
        configuration: .init(enableGPUCanvas: true)
    )

    @MainActor
    static func shared() async throws -> Worker {
        try await sharedWorker.value()
    }

    @MainActor
    static func sharedGPUCanvas() async throws -> Worker {
        try await sharedGPUCanvasWorker.value()
    }
}
```

Use `Worker.sharedGPUCanvas()` when loading files that require GPU Canvas:

```swift theme={null}
let worker = try await Worker.sharedGPUCanvas()
let file = try await File(
    source: .local("my_file", Bundle.main),
    worker: worker
)
let rive = try await Rive(file: file)
```

For a complete setup example, see the [Apple quick start](/docs/runtimes/apple/apple#getting-started).
