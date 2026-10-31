---
source: https://rive.app/docs/runtimes/flutter/caching-a-rive-file
title: "Caching a Rive File"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Caching a Rive File

Under most circumstances a `.riv` file should load quickly and managing the `RiveFile` yourself is not necessary. But if you intend to use the same `.riv` file in multiple parts of your application, or even on the same screen, it might be advantageous to load the file once and keep it in memory.

## Example usage

In Flutter, you are responsible for managing the lifecycle of a Rive file. You can create a `File` object directly, or use the `FileLoader` convenience class with `RiveWidgetBuilder`. In both cases, you must call `dispose()` on the object when it's no longer needed to free up memory.

```dart theme={null}
import 'package:flutter/material.dart';
import 'package:rive/rive.dart';

class CachedPage extends StatefulWidget {
    const CachedPage({super.key});

    @override
    State<CachedPage> createState() => _CachedPageState();
}

class _CachedPageState extends State<CachedPage> {
    var _isRivLoaded = false;

    // This is where our cached file will go.
    late File _riveFile;

    @override
    void initState() {
        super.initState();

        // Once initialized, build the layout by updating _isRivLoaded.
        _initRive().whenComplete(
            () => setState(() {
                _isRivLoaded = true;
            }),
        );
    }

    Future<void> _initRive() async {
        // Retrieve the Rive file from assets.
        _riveFile = (await File.asset(
            "assets/rewards_demo.riv",
            riveFactory: Factory.rive,
        ))!;
    }

    @override
    void dispose() {
        _riveFile.dispose();
        super.dispose();
    }

    @override
    Widget build(BuildContext context) {
        if (_isRivLoaded) {
            // Both widgets can use the same Rive file because we cached it as state.
            final widget1 = RiveWidget(controller: RiveWidgetController(_riveFile));
            final widget2 = RiveWidget(controller: RiveWidgetController(_riveFile));

            return Scaffold(
                body: Row(
                    children: [
                        Expanded(child: widget1),
                        Expanded(child: widget2),
                    ],
                ),
            );
        } else {
            return CircularProgressIndicator();
        }
    }
}
```

> [!TIP]
>
> To optimize memory usage, reuse the same `File` object across multiple `RiveWidget` instances if they use the same `.riv` file. This ensures the file is loaded only once and shared in memory.

> [!WARNING]
>
> After a `File` is disposed, it cannot be used again. To use the same `.riv` file, create a new `File` object.

#### Managing state

How you keep the Rive `File` alive and share it with widgets depends on your state management approach. For global access, load the file in `main` or during app startup, and expose it using a package like [Provider](https://pub.dev/packages/provider). If the file is only needed in a specific part of your app, consider loading the file only when required.

#### Memory

Managing the file yourself gives you fine-grained control over memory usage, especially when the same Rive file is used in multiple places or simultaneously in several widgets. Use [Flutter DevTools memory tooling](https://docs.flutter.dev/tools/devtools/memory#memory-view-guide) to monitor and optimize memory if needed.

#### Network assets

To load a Rive file from the Internet, use `File.url('YOUR:URL')`. For network assets, cache the file in memory to avoid repeated downloads and unnecessary decoding of the file.
