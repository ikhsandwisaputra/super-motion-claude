---
source: https://rive.app/docs/runtimes/android/caching-a-rive-file
title: "Caching a Rive File"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Caching a Rive File

Under most circumstances a `.riv` file should load quickly and managing the `RiveFile` yourself is not necessary. But if you intend to use the same `.riv` file in multiple parts of your application, or even on the same screen, it might be advantageous to load the file once and keep it in memory.

## Example usage

To cache a rive file in Android, you can use the Rive `File` class to load and cache the file. That `RiveFile` can then be reused across multiple `RiveAnimationView` instances. Here's a basic example:

```kotlin theme={null}
import app.rive.runtime.kotlin.RiveAnimationView
import app.rive.runtime.kotlin.RiveInitializer
import app.rive.runtime.kotlin.core.File

class MainActivity : ComponentActivity() {
    var riveFile: File? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        // Initialize Rive.
        AppInitializer.getInstance(applicationContext)
            .initializeComponent(RiveInitializer::class.java)

        // Load Rive file from assets and cache.
        application.assets.open("rewards_demo.riv").use { inputStream ->
            val fileBytes = inputStream.readBytes()
            riveFile = File(fileBytes)
        }

        setContent {
            Row {
                // First cached file usage.
                AndroidView(
                    modifier = Modifier.weight(1f),
                    factory = { context ->
                        RiveAnimationView(context).also {
                            it.setRiveFile(
                                file = riveFile!!,
                                stateMachineName = "State Machine 1",
                                autoBind = true,
                            )
                        }
                    }
                )

                // Second cached file usage.
                AndroidView(
                    modifier = Modifier.weight(1f),
                    factory = { context ->
                        RiveAnimationView(context).also {
                            it.setRiveFile(
                                file = riveFile!!,
                                stateMachineName = "State Machine 1",
                                autoBind = true,
                            )
                        }
                    }
                )
            }
        }
    }

    override fun onDestroy() {
        riveFile?.release()
        super.onDestroy()
    }
}
```

Please bear in mind that this is only one way to load the bytes, and your implementation may vary based on your app's architecture. The key point is to create a Rive `File` from the byte array and then set it on the `RiveAnimationView`.

> [!WARNING]
>
> A Rive `File` is reference counted and when created has a reference count of 1. Assigning it to a `RiveAnimationView` will keep an additional reference, but there is still the original reference from its creation. You are responsible for releasing that reference when you are done with the file by calling `File::release`. If you do not release the file, the native memory will remain until the app is closed, even if the Kotlin object is garbage collected.
