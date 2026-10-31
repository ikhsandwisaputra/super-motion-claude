---
source: https://rive.app/docs/runtimes/android/logging
title: "Logging"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Logging

This Rive runtime includes logging capabilities to help with debugging. These logs are *only* for debugging purposes; nothing is sent over the network, and no personally identifiable information (PII) is logged.

The table below showcases the runtimes that support logging.

**Compose**

The new runtime includes a fine-grained, flexible logging system that allows you to capture logs at various levels (debug, info, warning, error) and redirect them to your preferred logging framework or sink. This is done by implementing the `RiveLog.Logger` interface and assigning the global `RiveLog.logger` property.

The library ships with a default implementation that logs to Android Logcat. Enable it with the following:

```kotlin theme={null}
RiveLog.logger = RiveLog.LogcatLogger()
```

**Legacy**

Fine-grained Logging is not supported in the legacy runtime. We may consider retrofitting more logging capabilities to the legacy runtime in the future, especially if doing so would illuminate a potential source for bugs.
