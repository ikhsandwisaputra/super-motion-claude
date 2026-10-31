---
source: https://motion.dev/magazine/when-browsers-throttle-requestanimationframe
title: "When browsers throttle requestAnimationFrame | Motion Magazine"
fetched: 2026-10-28
---

>[Magazine](https://motion.dev/magazine)/Feature

# When browsers throttle requestAnimationFrame

In specific situations Safari and Firefox may throttle requestAnimationFrame. Hereâs why your JavaScript animations are janky.

![](https://images.motion.dev/magazine/ulZPf8sPx65JUasbGmCjltf6uEU.png)[Matt Perry](https://motion.dev/@matt)1 Oct 2020

`requestAnimationFrame` (rAF) is a browser API that allows the execution of code before the next available frame on the device display.

```
requestAnimationFrame(timestamp => {
  // Do stuff
})
```

Most JavaScript animation libraries use this API to change the visual properties of DOM elements, 3D models, or canvas contexts to create motion on the web.

However, it isn't a guarantee that this method *will* run before every frame. A browser might choose to run `requestAnimationFrame` at lower intervals, and this leads to jerky animations.

Look at these two boxes:

If your browser *doesn't* fall into one of the situations we'll explore in this post, the top box will be animating smoothly at 60fps. The second box is artificially running at half the framerate of the top box. You can see how obvious the effect of halving the framerate is for the smoothness of animations.

Because the situations in which a browser might choose to throttle `requestAnimationFrame` aren't always obvious or consistent, debugging these animations can be a mind-bending experience.

If you're on this page, you might well have arrived via Google, trying to understand why your JavaScript animation is janky. I imagine you sat there, as I once was, with two identical iPhones side by side, running the same JavaScript animation, one at the expected 60fps and one at a jerky 30fps.

You're not going crazy. Your browser is. Let's take a look at when and why browsers throttle `requestAnimationFrame`.

## iOS throttles rAF in low-power mode

Discovering this was a real test of sanity. Debugging animations on an old website, I noticed all the animations were janky on my phone.

Suspecting garbage collection or other source of low-performing animations, I tried to debug on my MacBook. Nothing unusual about memory consumption. I set CPU throttling to maximum. Still 60fps.

I put my phone next to my partner's, same OS, same make and model. 60fps on hers, unmistakably 30 on mine.

I started to suspect the paint job. But then I spotted this on my screen:

![](https://images.motion.dev/cdn-cgi/image/width=300,quality=85,format=auto/magazine/P4J5VBLXEgHquB9Ot8eXbnqvo.png)

Toggling low-power mode on and off had an immediate effect on the smoothness of the animations. I found [a Webkit issue](https://bugs.webkit.org/show_bug.cgi?id=168837) that confirmed iOS throttles `requestAnimationFrame` in low-power mode, along with [all CSS animations](https://bugs.webkit.org/show_bug.cgi?id=169138).

It's a clever battery-saving trick, and one of an infinite array of examples why developing against mobile browsers is such a dreadful, soul-crushing experience.

iOS app developers are given the [ability and responsibility](https://developer.apple.com/library/archive/documentation/Performance/Conceptual/EnergyGuide-iOS/LowPowerMode.html) to respond to low-power mode. Yet Webkit's characteristic obstinence is the reason why Battery Status API is now [deprecated](https://developer.mozilla.org/en-US/docs/Web/API/Battery_Status_API).

## Safari throttles rAF in cross-origin iframes

The example at the top of the frame is running in a cross-origin iframe. "Cross origin" essentially means that iframe is serving content from a different domain from that of this site.

If you're using Safari, you may have noticed that not even the first box was running very smoothly. Go back and click or tap inside the iframe. The animation should start running as expected.

The [Webkit ticket](https://bugs.webkit.org/show_bug.cgi?id=170534) doesn't provide a reason for this behaviour. To speculate, iframes are commonly used for advertising. Adverts are liberal with your CPU cycles, often using quite overt attention-stealing animations.

So the throttling is an attempt to prevent adverts from draining your battery. The framerate is uncapped on click/tap (but *not* mouse/touchstart ð) because that's considered a sign of intent that the content is acceptable by the user.

In an age of ad-blockers this solution feels like the wrong approach. Preferably, iOS would take a more aggressive stance against adverts by default, then revert this change.

Make the web less shit, not more shit.

## Firefox obliterates JavaScript time accuracy for privacy features

I was first made aware of this via a ticket about [laggy animations in Firefox](https://github.com/framer/motion/issues/441). Firefox users across browsers and devices were all reporting the same issue, but I couldn't replicate it myself on any operating system.

It turns out that Firefox has an anti-tracking privacy setting called `resistFingerprinting` that, if enabled, [reduces JavaScript time accuracy to 100ms](https://bugzilla.mozilla.org/show_bug.cgi?id=1394735#c1).

[This Bugzilla ticket](https://bugzilla.mozilla.org/show_bug.cgi?id=1440863) details the ramifications of Mozilla lowering the accuracy of `performance.now()` to just 2ms(!). That's considered low enough to cause havoc in game calculations, so 100ms is certainly low enough to wreck animations.

The previous cases of throttling we've seen only halved framerate. 100ms is enough to swallow six whole frames of animation! Callbacks provided to `requestAnimationFrame` receive the timestamp of the latest frame, and in animation libraries this is used to calculate the correct visual output. If the timestamp isn't accurate, the animations will be a visual manifestation of that.

Luckily there is a potential fix. The MDN (RIP) page for `performance.now()` says that serving content with the following headers will allow your page to access high resolution timers:

```
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
```

High resolution timers === smooth animation.

## Conclusion

`requestAnimationFrame` is just that - a request. It's to the browser's discretion whether that request is granted, and as we've seen, there are a variety of situations where it might not.

It's a trade off. By degrading the quality of the experience for users, browsers can improve their battery life, or hide them from advertising companies.

The quality of the web experience is currently at an all-time low, so in my opinion it's a shame to see anything making it even worse.

For the sanity of the developers having to work with these browsers, the very least I could ask is that, when enforced, these throttling techniques were flagged in the Performance tab. It would give us sharable and repeatable reproduction steps for ourselves and users to follow when they encounter this bizarre behaviour, as the next optimisation is always around the corner...
