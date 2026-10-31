---
source: https://motion.dev/troubleshooting/reduced-motion-disabled
title: "Reduced Motion enabled (Warning) | Motion Troubleshooting"
fetched: 2026-10-28
---

* Â·WARNING
* Â·WARNING
* Â·WARNING
* Â·WARNING
* Â·WARNING
* Â·WARNING
* Â·WARNING
* Â·WARNING

>[Troubleshooting](https://motion.dev/troubleshooting)/WARNING

# Reduced Motion enabled

* Â·WARNING
* Â·WARNING
* Â·WARNING
* Â·WARNING
* Â·WARNING
* Â·WARNING
* Â·WARNING
* Â·WARNING

>You've received the following message

```
You have Reduced Motion enabled on your device. Animations may not appear as expected.
```

You're attempting to animate `transform` or layout, but you're seeing a warning about Reduced Motion.

## Explanation

Reduced Motion is an OS-level setting that a user must intentionally enable on their device. When enabled, the OS and adhering apps and websites will disable some motion.

If Motion has been set to [comply with the Reduced Motion setting](https://motion.dev/docs/react-accessibility), it will also disable animations in development mode to realistically represent the animations you'll see in production.

## Solution

Using the `process.env.NODE_ENV` variable you can disable Reduced Motion only in development mode. Be aware that the animations you see in production will differ to those you see locally.

```
<MotionConfig reducedMotion={process.env.NODE_ENV === "production" ? "user" : "never"}>
  {children}
</MotionConfig>
```
