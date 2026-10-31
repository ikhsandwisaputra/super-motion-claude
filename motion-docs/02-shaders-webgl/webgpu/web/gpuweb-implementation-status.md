---
source: https://github.com/gpuweb/gpuweb/wiki/Implementation-Status
title: "Implementation Status · gpuweb/gpuweb Wiki · GitHub"
fetched: 2026-10-28
---

## Repository navigation

# Implementation Status

[Jump to bottom](https://github.com/gpuweb/gpuweb/wiki/Implementation-Status#wiki-pages-box)

Kai Ninomiya edited this page Oct 2, 2026
·
[121 revisions](https://github.com/gpuweb/gpuweb/wiki/Implementation-Status/_history)

# Implementation Status

**🌐🌐 For general WebGPU information and resources, visit [webgpu.org](https://webgpu.org). 🌐🌐**

**👷👷 Developers are highly recommended to test regularly against pre-release versions in order to catch issues before they reach users! 👷👷**

[Chrome Canary](http://chrome.com/canary) - [Edge Canary](https://www.microsoftedgeinsider.com/en-us/download) - [Firefox Nightly](https://www.firefox.com/en-US/channel/desktop/) - [Safari Technology Preview](https://developer.apple.com/safari/technology-preview/)

### Reporting Implementation Issues (bugs, implementation requests, etc.)

1. Test in the latest pre-release browser version to see if the issue is still present.
2. Search to see if you can find an issue already filed, then file a bug.
   * Chromium/Dawn: [Search bugs](https://issues.chromium.org/savedsearches/6760928), [File a new bug](https://issues.chromium.org/issues/new?noWizard=true&component=1456980)
   * Firefox: [Search/file Firefox bugs](https://bugzilla.mozilla.org/enter_bug.cgi?format=guided&product=Core&component=Graphics%3A+WebGPU), [Search wgpu bugs](https://github.com/gfx-rs/wgpu/issues)
   * Safari: [Search WebKit bugs](https://bugs.webkit.org/buglist.cgi?component=WebGPU&list_id=12728327&product=WebKit&resolution=---), [File a new bug](https://bugs.webkit.org/enter_bug.cgi?product=WebKit&component=WebGPU)

## Chromium (Chrome, Edge, etc.)

| Mac, Windows (x86/x64), ChromeOS | Android | Linux | Windows (ARM64) |
| --- | --- | --- | --- |
| ✅ [113](https://developer.chrome.com/blog/new-in-webgpu-113) | ✅ ARM/Qualcomm/Intel, Android 12+: [121](https://developer.chrome.com/blog/new-in-webgpu-121)  ✅ Imagination, Android 16+: [139](https://chromiumdash.appspot.com/commit/472e65391d0736097e9aa13f0cce7849876abe2a)  👷 Samsung Xclipse, Android 12+: TBD  👷 Others: TBD | ✅ Intel Gen12+: [144](https://developer.chrome.com/blog/new-in-webgpu-144)  ✅ NVIDIA (driver 535.183.01+) Wayland: [147](https://developer.chrome.com/blog/new-in-webgpu-147-148)  👷 Others: Behind a flag Requires launching the browser from the command line with: `--enable-unsafe-webgpu --ozone-platform=x11 --use-angle=vulkan --enable-features=Vulkan,VulkanFromANGLE` (Make sure your graphics drivers are up-to-date! If it still doesn't work, comment on [#5022](https://github.com/gpuweb/gpuweb/issues/5022).) | 👷 Behind a flag Requires `chrome://flags/#enable-unsafe-webgpu` or the `--enable-unsafe-webgpu` command line flag. |

Implementation based on the [Dawn](https://github.com/google/dawn) C++ project.

## Firefox

| Windows | Mac (Apple Silicon) | Mac (other) | Linux | Android |
| --- | --- | --- | --- | --- |
| ✅ [141](https://www.firefox.com/en-US/firefox/141.0/releasenotes/) ([blog post](https://mozillagfx.wordpress.com/2025/07/15/shipping-webgpu-on-windows-in-firefox-141/)) | ✅ [145](https://www.firefox.com/en-US/firefox/145.0/releasenotes/) on macOS 26+ ✅ [147](https://www.firefox.com/en-US/firefox/147.0/releasenotes/) on all macOS versions | 👷 Nightly 1 | 👷 Nightly 1 | 👷 Behind a flag 2 |

* 1 Enabled by default in Nightly, but not Stable/Beta. Mozilla expects to ship on Linux in 2026. Additional Mac platforms are TBD.
* 2 Disabled by default. Use Firefox Beta or Nightly and set the `about:config` setting `gfx.webgpu.ignore-blocklist` to enable. Mozilla expects to do work on Android in 2026.

Implementation based on the [wgpu](https://github.com/gfx-rs/wgpu) Rust project.

## Safari

| macOS | iOS/iPadOS | visionOS |
| --- | --- | --- |
| ✅ 26 | ✅ 26 | ✅ 26 |

In macOS Tahoe 26, iOS 26, iPadOS 26, and visionOS 26, WebGPU is supported and enabled by default.

## Servo

Work [in progress](https://github.com/servo/servo/projects/24), enabled by "dom.webgpu.enabled" pref.

Implementation based on the [wgpu](https://github.com/gfx-rs/wgpu) Rust project.

### Clone this wiki locally
