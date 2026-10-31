---
source: https://github.com/processing/p5.js/releases
title: "processing/p5.js GitHub releases"
fetched: 2026-10-28
---

# processing/p5.js — GitHub releases (170 entries, newest first)

## v2.4.0-rc.1 — 2026-10-20 (prerelease)

# Testers Wanted 💚 

p5.js version 2.4 will be ready soon. Help testing it by trying your existing sketches with the new version, or by trying out the upcoming features! This is a **release candidate** (RC), which means it is not yet live on the p5.js Editor. Your help with testing now will help make the release more stable!

**To help with testing, you can use this [starter sketch](https://editor.p5js.org/ksen0/sketches/IAgGDzexy)**.

Or load both p5.js and WebGPU mode by adding these two script tags to your sketch:

```html
<script src="https://cdn.jsdelivr.net/npm/p5@2.4.0-rc.1/lib/p5.js"></script>
<script src="https://cdn.jsdelivr.net/npm/p5@2.4.0-rc.1/lib/p5.webgpu.js"></script>
```

Then load WebGPU mode in `createCanvas` - **note the `async/await`**, this is needed for WebGPU but not WebGL:
```js
async function setup() {
  await createCanvas(400, 400, WEBGPU);
}
```

### Testing this Release

A few features that are planned for 2.4 are still [in progress](https://github.com/orgs/processing/projects/21/views/8). Check the changes below, test with existing sketches or by writing new sketches that use new functionality (like SVG, p5.strands instancing, or multi-material 3D models), and report any issues you find to help prepare this version for release.


# What's New in 2.4

To help with testing, you don't need to test every single thing. It is very helpful to pick something you're familiar with in p5, and dig into it, especially looking for strange behavior in edge cases. You can pick any section or pull request below, and focus your testing on that.

## Patches between 2.3 and 2.4
  
Starting with 2.3.2, we changed the release process. While work on the 2.4 release continued in the main branch, atomic patches made security updates and bugfixes available sooner. **Want to help test? Check the release notes below and ensure everything from prior patches still works as expected.**
  
* [2.3.1](https://github.com/processing/p5.js/releases/tag/v2.3.1) This patch introduces new p5.strands features, improvements to shapes & SVG handling, and bugfixes across WebGL and WebGPU. It also renames the color space previously called HDR to P3 for accuracy.
* [2.3.2](https://github.com/processing/p5.js/releases/tag/v2.3.2) This patch improves 2D paths and adds a loading animation to display when setup() takes a long time.
* [2.3.3](https://github.com/processing/p5.js/releases/tag/v2.3.3) This patch release includes a security hardening measure, a couple of bugfixes, and documentation updates.
* [2.3.4](https://github.com/processing/p5.js/releases/tag/v2.3.4) Bugfixes/CI, fixed TypeScript declarations generation

### New in 2.4: SVG Support

* @VANSH3104 added SVG import/export in #9123. Usage and examples shown [in this playlist](https://www.youtube.com/watch?v=MiUZ5EJc78Y&list=PLfSK1t5BHz4c). p5.js 2.4 will support this out of the box with no additional imports needed.  With thanks to @davepagurek for reviews, and @mingness for project mentorship.

* @Danyccsf also worked on SVG-related bugfixes in #9261 and #9292

### p5.strands API additions in 2.4

p5.strands is a feature in p5.js 2.x for authoring shaders using JavaScript. See: ["Hello Color World"](https://p5js.org/tutorials/hello-color-world-p5-strands/) tutorial and [p5.strands contribution guide](https://p5js.org/contribute/p5.strands/). This feature in active development. New additive features added in this release:

* @aashu2006 added a simplified instancing API for p5.strands. [Read more here](https://processingfoundation.org/blog/drawing-a-forest-in-one-line-a-preview-of-instancing-in-p5strands/) (Starting with #8878 and #8912 which was part of 2.3.1, but with most of the work shipping in 2.4 with #8952). Thanks to @davepagurek and @eupthere for your reviews on this feature!
* @perminder-17 added  transformation matrix support in #8984.

The below sketch shows these features in the `t` variable (a 3D transform that includes rotation and translation), and in the `instances(count).box(18)` line:

<img width="157" height="158" alt="image" src="https://github.com/user-attachments/assets/81dae836-719e-4722-8689-b4ef9734dbe9" />

```js
let myShader;
let count = 10;

function setup() {
  createCanvas(200, 200, WEBGL);
  myShader = buildMaterialShader(placeOnRing);
}

function placeOnRing() {
  worldInputs.begin();
  let angle = instanceIndex * TWO_PI / count + millis()/1000;
  let t = transform3D();
  t = rotateY(t, angle);
  t = translate(t, 65, 0, 0);
  worldInputs.position = transformPoint(t, worldInputs.position);
  worldInputs.normal = transformNormal(t, worldInputs.normal);
  worldInputs.end();
}

function draw() {
  orbitControl();
  background('purple');

  lights();
  directionalLight(255, 255, 255, 0, 1, 0);
  directionalLight(255, 255, 255, 0, -1, 0);
  ambientLight(255, 100, 0);
  
  noStroke();
  fill('pink');
  shader(myShader);
  instances(count).box(18);
}
```

### `loadModel()` in 2.4: Multi-Material Support

<details>
<summary>
@Nixxx19 [added support for multi-material model support](https://nixxx19.hashnode.dev/it-started-with-a-grey-lump). This is not an API change, but a big update in `loadModel()` for `.obj` files with multiple materials. With thanks to @davepagurek for reviews, and @diyaayay for project mentorship.
</summary>

* GSOC 26: multi-material model parts (obj/mtl) by @Nixxx19 in https://github.com/processing/p5.js/pull/8879
* GSOC 26: render multi-material models per part by @Nixxx19 in https://github.com/processing/p5.js/pull/8955
* GSOC 26: multi-material buildGeometry by @Nixxx19 in https://github.com/processing/p5.js/pull/9063
* GSOC 26: multi-material .mtl loading test coverage by @Nixxx19 in https://github.com/processing/p5.js/pull/9065
* GSOC 26: specular, ambient, and shininess texture maps by @Nixxx19 in https://github.com/processing/p5.js/pull/9066
* GSOC 26: custom vertex attributes in multi-material buildGeometry by @Nixxx19 in https://github.com/processing/p5.js/pull/9077
* GSOC 26: normal (bump) map support by @Nixxx19 in https://github.com/processing/p5.js/pull/9067
* GSOC 26: document multi-material and texture map support by @Nixxx19 in https://github.com/processing/p5.js/pull/9068
* GSOC 26: bumpTexture() for height maps by @Nixxx19 in https://github.com/processing/p5.js/pull/9089
* GSOC 26: keep bump map slopes correct at image edges by @Nixxx19 in https://github.com/processing/p5.js/pull/9095
* GSOC 26: multi-material audit, edge cases, and a windows path fix by @Nixxx19 in https://github.com/processing/p5.js/pull/9096
* GSOC 26: apply mtl material state to single-material models by @Nixxx19 in https://github.com/processing/p5.js/pull/9110
* Fix loadModel normalize overload validation by @xsupremeyx in https://github.com/processing/p5.js/pull/9286
</details>

### Significant updates to Friendly Error System (FES) in 2.4

In #9212, @limzykenneth continued the FES rework started in #8887. The FES has been **modularized** and now supports **translation**. Finally, in #9307, @limzykenneth improved performance of FES, so it can be used for longer even as sketches get more complex. 

Translations can be loaded in two ways, from a local file or from CDN. Within the same folder, the p5.js script will look for `${languageCode}.json` for a file matching that name and load it as a translation string JSON, if that file cannot be found, it will then load from the JSDelivr CDN for a version we publish. If that also does not exist, no translation will be loaded and messages will be printed in the language it is written, ie. English.

In #9109, @davepagurek added experimental feature logging, which users will notice when they use SVG and p5.strands API in this release. Thanks to @Vaivaswat2244 for reviewing!

<details>
<summary>Additional FES bugfixes and documentation improvements were added by @harshiltewari2004, @bhabishnu, @aashu2006, and @sneakyfelix</summary>

* Warn via FES when bezierOrder() receives a value other than 2 or 3 by @harshiltewari2004 in https://github.com/processing/p5.js/pull/9136
* fix: add friendly errors for hook lifecycle misuse by @bhabishnu in https://github.com/processing/p5.js/pull/9235
* Fix FES validation for endShape() count-only and OPEN mode forms by @aashu2006 in https://github.com/processing/p5.js/pull/9200
* Update fes_contribution_guide.md by @sneakyfelix in https://github.com/processing/p5.js/pull/9165
</details>

### Vectors and Math

<details>
<summary>In continued stabilization, vector and math operations now behave consistently across dimensions. These contributions by @mawerb @BHARATH0153 @Pranava-Pai-N @Pcmhacker-piro @dontwanttothink were reviewed by @davepagurek and @perminder-17 thank you!</summary>

* Vector lerp() function now takes in generalized dimensions by @mawerb in https://github.com/processing/p5.js/pull/8994
* fix: Vector.equals() asymmetric result when dimensions differ by @BHARATH0153 in https://github.com/processing/p5.js/pull/8999
* Fix: Handled 3X3 Matrix transpose with the custom input matrix by @Pranava-Pai-N in https://github.com/processing/p5.js/pull/9198
* Fix/issue 8924 by @solowiz398 #9009  Updated the setter method for 'x' to check to see if the length of the array is greater than 0. This condition passes for both a 1d vector and n amount of vector
* fix: allow negative divisors in p5.Vector.rem() by @Pcmhacker-piro in https://github.com/processing/p5.js/pull/9170
</details>

### Security and Testing

This minor release includes substantial work on updating dependencies and build system, as well as automated tests including performance test. Additionally, based on feedback from Processing Foundation team, current p5.js maintainers, and active p5.js editor contributors, we have now created and published [an updated Security Policy](https://github.com/processing/p5.js/blob/main/SECURITY.md) that includes a public incident response plan. Thanks to @perminder-17 for stewarding this update in https://github.com/processing/p5.js/pull/9298

<details>
<summary>Build, dependency, and CI updates by @limzykenneth @ulgens @Vaivaswat2244 @AmanUllah687</summary>

* Build tools update by @limzykenneth in https://github.com/processing/p5.js/pull/9062
* Pin GHA dependencies by @ulgens in https://github.com/processing/p5.js/pull/9032
* ci: bump contributors-png workflow to Node 22 by @Vaivaswat2244 in https://github.com/processing/p5.js/pull/9034
* Fix Generate Contributors PNG workflow: convert script to ESM by @Vaivaswat2244 in https://github.com/processing/p5.js/pull/9055
* chore: update contributors.png from .all-contributorsrc by @p5js-bot in https://github.com/processing/p5.js/pull/9076
* chore: use all-contributors-image action for contributors.png by @Vaivaswat2244 in https://github.com/processing/p5.js/pull/9289
* Update node20 builders by @ulgens in https://github.com/processing/p5.js/pull/9036
* Pin and update the Ubuntu versions in CI by @ulgens in https://github.com/processing/p5.js/pull/9201
* Remove bundled p5.sound from complete library zip by @AmanUllah687 in https://github.com/processing/p5.js/pull/9073
* fix: resolve oxlint warnings without removing code by @Vaivaswat2244 in https://github.com/processing/p5.js/pull/9161
</details>

<details>
<summary>Automated testing improvements by @harshiltewari2004 @BhumitSahani @shakeelmohamed @michtesar, @yashgoyal0110 @Danyccsf @Pranava-Pai-N and @Shruti2110-coder</summary>

* Add unit tests for isLooping() default, noLoop() and loop() states by @harshiltewari2004 in https://github.com/processing/p5.js/pull/8981
* Enable MediaElement updatePixels test by @BhumitSahani in https://github.com/processing/p5.js/pull/9264
* Add typography performance tests by @shakeelmohamed in https://github.com/processing/p5.js/pull/8918
* Add typography to model performance tests by @michtesar in https://github.com/processing/p5.js/pull/8993
* visual-report-status-from-vitest by @yashgoyal0110 in https://github.com/processing/p5.js/pull/9115
* fix: pass geometry to freeGeometry in CPU transform benchmark by @Danyccsf in https://github.com/processing/p5.js/pull/9071
* Feat: Added extra argument and test for the save option for text files by @Pranava-Pai-N in https://github.com/processing/p5.js/pull/9142
* Re-enable passing HSLA/HSBA getter tests in p5.Color by @Shruti2110-coder in https://github.com/processing/p5.js/pull/9166
</details>

### Graphics Improvements and Bugfixes

<details>
<summary>p5.strands API & Transpiler by @eupthere @davepagurek @tsumon @harshiltewari2004 @LalitNarayanYadav @bhabishnu @aashu2006</summary>

* Support strands shader variable names including double underscores by @eupthere in https://github.com/processing/p5.js/pull/8923
* Fix p5.strands assignment to property swizzles by @davepagurek in https://github.com/processing/p5.js/pull/9082
* Handle backtick strings as p5.strands uniform names by @davepagurek in https://github.com/processing/p5.js/pull/9112
* Read p5.strands callback params and body from the AST by @tsumon in https://github.com/processing/p5.js/pull/9188
* Strands matrix uniforms by @harshiltewari2004 in https://github.com/processing/p5.js/pull/9204
* Add paletteLerp for p5.strands (closes #8751) by @LalitNarayanYadav in https://github.com/processing/p5.js/pull/8817
* fix(strands): avoid aliasing phi node inputs by @bhabishnu in https://github.com/processing/p5.js/pull/9281
* fix(strands): read loop state by flat key by @bhabishnu in https://github.com/processing/p5.js/pull/9284
* Keep p5.strands transpiler output valid for comma-joined expressions by @harshiltewari2004 in https://github.com/processing/p5.js/pull/9193
* Add webgpu build back to rolldown config by @davepagurek in https://github.com/processing/p5.js/pull/9087
* Webgpu variable length buffer by @davepagurek in https://github.com/processing/p5.js/pull/9086
* Infer storage buffer element type from the typed array passed in by @aashu2006 in https://github.com/processing/p5.js/pull/9083
</details>

<details>
<summary>Rendering & Shading by @Vaivaswat2244 @Srinidhi444 @bhabishnu @skyyash</summary>

* fallback to webgl on webgpu failures by @skyyash in https://github.com/processing/p5.js/pull/9191
* fix: run canvas teardown in Renderer3D.remove() by @Vaivaswat2244 in https://github.com/processing/p5.js/pull/9162
* feat(webgl): add SEGMENTED mode for true flat shading by @Srinidhi444 in https://github.com/processing/p5.js/pull/9288
* feat: introduce KEEP_CONNECTIONS and deprecate FLAT by @Srinidhi444 in https://github.com/processing/p5.js/pull/9271
* fix: preserve vertex attributes with smooth normals by @Srinidhi444 in https://github.com/processing/p5.js/pull/9233
* fix: restore drawing context after set() by @bhabishnu in https://github.com/processing/p5.js/pull/9220
</details>

<details>
<summary>Core & Performance by @frank890417 @NalinDalal @dontwanttothink, with thanks to @davepagurek @limzykenneth @perminder-17 for reviews</summary>

* Fix 2D point() not drawn when |x| >= 256 by @frank890417 in https://github.com/processing/p5.js/pull/9210
* Fixes Large slowdown in p5.Graphics.set() compared to v1.11.x by @NalinDalal in https://github.com/processing/p5.js/pull/9014
* Interpolate colors in the current colorMode or in another specified space by @dontwanttothink in https://github.com/processing/p5.js/pull/9024 
</details>

### Documentation and Bugfixes

<details>
<summary>Stability improvements and bugfixes by @harshiltewari2004 @slash-init @Pcmhacker-piro @skyyash </summary>

* Terminate saveFrames() capture by frame count instead of wall-clock d… by @harshiltewari2004 in https://github.com/processing/p5.js/pull/9012
* fix: stop pending createCapture media streams on remove by @slash-init in https://github.com/processing/p5.js/pull/9254
* fix: revoke Blob URLs created by p5.File by @slash-init in https://github.com/processing/p5.js/pull/9155
* fix: clean up media streams in p5.remove by @slash-init in https://github.com/processing/p5.js/pull/9234
* fix(utilities): do not mutate typed arrays in shuffle() when modify is false by @Pcmhacker-piro in https://github.com/processing/p5.js/pull/9186
* fix(image): fix pixelDensity idempotence and high-DPI canvas resize by @Pcmhacker-piro in https://github.com/processing/p5.js/pull/9167
* fix: clean up instance remove lifecycle hooks by @slash-init in https://github.com/processing/p5.js/pull/9085
* fix: allow createRadio to remove element by @slash-init in https://github.com/processing/p5.js/pull/9154
* Wait for the download click instead of a fixed timeout in saveCanvas … by @harshiltewari2004 in https://github.com/processing/p5.js/pull/9031
* fix early type checks for comparison/logical ops in binaryOpNode by @skyyash in https://github.com/processing/p5.js/pull/9163
</details>

<details>
<summary>Documentation improvements by @skyyash @MarsGray @Goutte @TheNetherWatcher @ksen0</summary>
* Fix typo in library submission instructions by @ksen0 in https://github.com/processing/p5.js/pull/9117
* fix dependency variable typo in explanation by @skyyash in https://github.com/processing/p5.js/pull/9102
* Revise contributor guidelines for new contributors by @ksen0 in https://github.com/processing/p5.js/pull/9090
* Update reference preview branch instructions by @MarsGray in https://github.com/processing/p5.js/pull/9021
* fix broken emoji-key links in readme by @TheNetherWatcher in https://github.com/processing/p5.js/pull/9140
* docs: show a correct approximated value for TAU by @Goutte in https://github.com/processing/p5.js/pull/9275
</details>

# p5.js Library is a Community Effort

## Stewards & Mentors

Every PR is reviewed by at least one maintainer or [steward](https://p5js.org/contribute/steward_guidelines/), most of whom are volunteers. The work in this release was supported by thoughtful comments, reviews, discussions, and mentorship by @davepagurek @diyaayay @eupthere @ksen0 @limzykenneth @mingness @perminder-17 @skyyash @Vaivaswat2244. Additional special thanks to @aashu2006 @Ayush4958 @bhabishnu and @lirenjie95  for your support with reviews!

## Welcome to first-time contributors! 🎉 

* @ulgens made their first contribution in https://github.com/processing/p5.js/pull/9032
* @Danyccsf made their first contribution in https://github.com/processing/p5.js/pull/9071
* @slash-init made their first contribution in https://github.com/processing/p5.js/pull/9085
* @TheNetherWatcher made their first contribution in https://github.com/processing/p5.js/pull/9140
* @yashgoyal0110 made their first contribution in https://github.com/processing/p5.js/pull/9115
* @mawerb made their first contribution in https://github.com/processing/p5.js/pull/8994
* @AmanUllah687 made their first contribution in https://github.com/processing/p5.js/pull/9073
* @sneakyfelix made their first contribution in https://github.com/processing/p5.js/pull/9165
* @Pcmhacker-piro made their first contribution in https://github.com/processing/p5.js/pull/9170
* @Shruti2110-coder made their first contribution in https://github.com/processing/p5.js/pull/9166
* @tsumon made their first contribution in https://github.com/processing/p5.js/pull/9188
* @Pranava-Pai-N made their first contribution in https://github.com/processing/p5.js/pull/9142
* @frank890417 made their first contribution in https://github.com/processing/p5.js/pull/9210
* @bhabishnu made their first contribution in https://github.com/processing/p5.js/pull/9220
* @shakeelmohamed made their first contribution in https://github.com/processing/p5.js/pull/8918
* @michtesar made their first contribution in https://github.com/processing/p5.js/pull/8993
* @Srinidhi444 made their first contribution in https://github.com/processing/p5.js/pull/9233
* @BhumitSahani made their first contribution in https://github.com/processing/p5.js/pull/9264
* @xsupremeyx made their first contribution in https://github.com/processing/p5.js/pull/9286
* @Goutte made their first contribution in https://github.com/processing/p5.js/pull/9275
* @solowiz398 made their first contribution in https://github.com/processing/p5.js/pull/9009

Full Changelog: https://github.com/processing/p5.js/compare/v2.3.0...v2.4.0-rc.1

## v2.3.4 — 2026-09-25

<!-- Release notes generated using configuration in .github/release.yml at v2.3.4 -->

This patch release includes a couple of bugfixes. Use this version by including:

```html
<script src="https://cdn.jsdelivr.net/npm/p5@2.3.4/lib/p5.js"></script>

<!-- Optional for WEBGPU renderer: --> 
<script src="https://cdn.jsdelivr.net/npm/p5@2.3.4/lib/p5.webgpu.js"></script>
```
## What's Changed
* In https://github.com/processing/p5.js/issues/9202 several contributors @haukun @Vaivaswat2244 and @scs0209 investigated a problem with `p5.VERSION`. This was the result of a problem during the previous patch release, and the problem is fixed in `2.3.4`
* In https://github.com/processing/p5.js/pull/9211 @davepagurek fixed a bug that prevented a more helpful FES message when `preload()` was used.
* In https://github.com/processing/p5.js/pull/9215 @limzykenneth enabled CI for the `stable` branch to improve the new release process.
* @Pranava-Pai-N reported and fixed https://github.com/processing/p5.js/issues/9141, with review by @limzykenneth and @perminder-17 
* @Pcmhacker-piro fixed the missing types declarations issue https://github.com/processing/p5.js/issues/9190 reported by @m4lt3

Work continues (in the `main` branch) toward 2.4, but this atomic patch makes bugfixes available sooner, following our recent approach to patch releases.

**Full Changelog**: https://github.com/processing/p5.js/compare/v2.3.3...v2.3.4

## v2.3.3 — 2026-09-07

<!-- Release notes generated using configuration in .github/release.yml at v2.3.3 -->

This patch release includes a security hardening measure, a couple of bugfixes, and documentation updates.
Use this version by including:

```html
<script src="https://cdn.jsdelivr.net/npm/p5@2.3.3/lib/p5.js"></script>

<!-- Optional for WEBGPU renderer: --> 
<script src="https://cdn.jsdelivr.net/npm/p5@2.3.3/lib/p5.webgpu.js"></script>
```

In https://github.com/processing/p5.js/pull/9145 @limzykenneth introduces `MAX_GIF_PIXELS`, a static property that defines how large, in total pixels, a GIF image is allowed to be loaded into a p5 sketch. The default value is 16,000,000. This means an image's width multiplied by its height must not exceed that value. The property can be set higher if needed. This limitation prevents a GIF with a very large canvas from taking up a lot of browser memory ("decompression bomb"). This patch addresses a security vulnerability report by @slash-init, thanks for reporting! Security vulnerabilities can be reported [according to the SECURITY.md policy](https://github.com/processing/p5.js/blob/main/SECURITY.md).

In https://github.com/processing/p5.js/issues/9006 @roymacdonald spotted and patched a typo in quaternion multiplication, adding tests as well. In https://github.com/processing/p5.js/issues/9039 @xdroberto fixed a Friendly Error System (FES) parameter validation bug that @TakagiHitoshi spotted.

Finally, in https://github.com/processing/p5.js/pull/9118 @ksen0 added initial documentation of p5's new Decorators API. This API is mainly aimed at addon authors, but is also used throughout the p5.js library code. In programming, a [decorator](https://en.wikipedia.org/wiki/Decorator_pattern) helps to reduce duplicated code. In p5.js, decorators are applied using `p5.registerDecoration(pattern, decorator)`. They have been supported since [version 2.3.0](https://github.com/processing/p5.js/releases/tag/v2.3.0), and follow [the TC39 proposal](https://github.com/tc39/proposal-decorators) as closely as possible. The new contributor guide is for p5.js code contributors who would like to learn when to use a decorator, and how. 

Work continues (in the `main` branch) toward 2.4, but this atomic patch makes recent security updates and bugfixes available sooner, following our recent approach to patch releases.

🎉 Thanks to all contributors & stewards!

Full Changelog: https://github.com/processing/p5.js/compare/v2.3.2...v2.3.3

## v2.3.2 — 2026-07-30

<!-- Release notes generated using configuration in .github/release.yml at v2.3.2 -->

This patch improves 2D paths and adds a loading animation to display when `setup()` takes a long time. 

@okra-sf reported how using `beginShape/endShape` with many `vertex` calls [created slowdowns](https://github.com/processing/p5.js/issues/8973) in v2 compared to v1. Work in https://github.com/processing/p5.js/pull/9025 on speeding up how paths are drawn included [extensive benchmarking](https://github.com/okra-sf/p5-shape-bench/blob/main/reports/2026-07-28-shape-hot-path.md), and was reviewed by @davepagurek @VANSH3104  and @treerao 

The loading animation was added in https://github.com/processing/p5.js/pull/8997 by @Jextic and @gojoshin as part of the CodeDay program, and reviewed by @limzykenneth and @ksen0 

🎉 Thanks to all contributors & stewards!

**Full Changelog**: https://github.com/processing/p5.js/compare/v2.3.1...v2.3.2

## v2.3.1 — 2026-07-21

<!-- Release notes generated using configuration in .github/release.yml at v2.3.1 -->

## 2.3.1 Hex codes in shaders and continued p5.strands development; `tint()` and other fixes; `HDR` renamed to `P3`

This patch introduces new p5.strands features, improvements to shapes & SVG handling, and bugfixes across WebGL and WebGPU. It also renames the color space previously called HDR to P3 for accuracy.

* Fixes for loading SVG files and bad URLs with `loadImage()`, applying `tint()` to images in 2D mode, [framebuffers](https://p5js.org/tutorials/layered-rendering-with-framebuffers/) with custom pixel densities, `orbitControl()` after swiping outside the canvas, `mouseIsPressed` behavior after clicking DOM elements, and `line()`, `point()`, `triangle()`, `quad()`, `rect()` (including with rounded corners, like in the example below)
* In shaders and p5.strands code, this patch adds `randomGaussian()` and `color()` support inside p5.strands shader code, `instanceIndex` for instanced rendering, `TRIANGLE_FAN` drawing in both WebGL and WebGPU, custom shaders that set `uSampler` via `setUniform()`, hooks that return objects should work, custom shaders should be able to use version directives, and `mouseX` and `width` in instance mode with p5.strands shaders

> [!WARNING]
> This release [renames the color space previously called `HDR` to `P3`](https://github.com/processing/p5.js/pull/8975) for accuracy. If you use `HDR` color space constants in your code, please update them to `P3`. The maintainers felt this correction was important to make now. If you have concerns about backward compatibility, you can share them on the linked pull request discussion.

**You can start using this updated version in this [starter sketch](https://editor.p5js.org/ksen0/sketches/IAgGDzexy)**! Or load both p5.js and WebGPU mode by adding these two script tags to your sketch:

```html
<script src="https://cdn.jsdelivr.net/npm/p5@2.3.1/lib/p5.js"></script>
<script src="https://cdn.jsdelivr.net/npm/p5@2.3.1/lib/p5.webgpu.js"></script>
```

To use WebGPU mode in `createCanvas` note the `async/await`, which is needed for WebGPU but not WebGL:
```js
async function setup() {
  await createCanvas(400, 400, WEBGPU);
}
```

## What's new in p5.strands

`randomGaussian()` is available in p5.strands code - see the static example in the [starter sketch](https://editor.p5js.org/ksen0/sketches/IAgGDzexy) or below, which also shows more p5.js-style, beginner-friendly colors.

* Add p5.strands support for randomGaussian() by @harshiltewari2004 in https://github.com/processing/p5.js/pull/8800
* Replace randomness-related noise usage in strands example by @VikasKSingh05 in https://github.com/processing/p5.js/pull/8824
* feat(strands): add color() support for beginner-friendly color inputs by @LalitNarayanYadav in https://github.com/processing/p5.js/pull/8822
* Add instanceIndex alias for instanceID by @aashu2006 in https://github.com/processing/p5.js/pull/8912
* fix builtin global accessors for instance mode in strands shaders by @aashu2006 in https://github.com/processing/p5.js/pull/8878
* Add p5.strands documentation and examples for color functions by @Yashisinghal285 in https://github.com/processing/p5.js/pull/8965

<img width="394" height="394" alt="Set of rectangles with rounded corners filled with noisy translucent yellow texture on a pink background" src="https://github.com/user-attachments/assets/b4c23243-19a0-45cb-866a-fae63c63f107" />


```js
async function setup() {
  //for normal 2D or WEBGL stuff
  createCanvas(400, 400, WEBGL);

  //for WEBGPU stuff 
  // await createCanvas(400, 400, WEBGPU);
  myShader = buildMaterialShader(myShaderBuilder);
}

function myShaderBuilder(){
  finalColor.begin();
  let coord = finalColor.texCoord;

  // color() and randomGaussian() available in p5.strands
  let c = color('#eeff22');
  finalColor.set([c.r, c.g, c.b, randomGaussian()*0.1 + 0.3]);
  
  finalColor.end();
}

function draw() {
  stroke(255);
  background("#f1678e");
  shader(myShader);
  orbitControl();

  // rect with rounded corners
  rect(-50, -50, 100, 100, 50, 10);
  translate(0,0,50);
  rect(-50, -50, 100, 100, 3);
  translate(0,0,50);
  rect(-50, -50, 100, 100, 0, 20, 30, 20);
  translate(0,0,50);
  rect(-50, -50, 100, 100);
}
```

## Custom shader bugfixes

* Fix WebGL shader version regex by @eupthere in https://github.com/processing/p5.js/pull/8857
* fix: preserve user-set uSampler uniform for custom shaders by @BHARATH0153 in https://github.com/processing/p5.js/pull/8869

## Ongoing work on shapes & SVG

* fix : other shape use the shape class also add new roundrect Primitive by @VANSH3104 in https://github.com/processing/p5.js/pull/8899
* Fix `loadImage` SVG file loading regression by @gfrancine in https://github.com/processing/p5.js/pull/8937

## Other bugfixes

* Fix memory leak on loadImage failure by @gfrancine in #8958
* Fix framebuffer texture size clamping using wrong pixel density by @NalinDalal in #8964
* Fix TRIANGLE_FAN immediate mode support by @davepagurek in #8974
* fix: convert tint to RGBA array in _getTintedImageCanvas by @SarthakRawat-1 in https://github.com/processing/p5.js/pull/8934
* Fix orbitControl() breaking after touch swipe outside canvas. by @perminder-17 in https://github.com/processing/p5.js/pull/8863
* Fix object returns in p5.strands hooks by @davepagurek in https://github.com/processing/p5.js/pull/8950
* fixing-mouseClick by @perminder-17 in https://github.com/processing/p5.js/pull/8917
* Add mat2 uniform support to WebGL setUniform, fixing silent no-op (#8… by @harshiltewari2004 in https://github.com/processing/p5.js/pull/8978

### Other documentation & error messages updates
* Rename HDR to P3 by @limzykenneth in #8975
* Add friendly FES error for dimension mismatch on shared variable assi… by @harshiltewari2004 in https://github.com/processing/p5.js/pull/8823
* Add shader examples to trigonometric functions by @SOUMITRO-SAHA in https://github.com/processing/p5.js/pull/8801
* Mark private methods as private by @ksen0 in https://github.com/processing/p5.js/pull/8854
* note strokeweight isn't scaled in webgl/webgpu by @Nixxx19 in https://github.com/processing/p5.js/pull/8850
* feat: add friendly error for cross-hook property access (#8813) by @BHARATH0153 in https://github.com/processing/p5.js/pull/8862
* Expose dimensions property on Vector by @ksen0 in https://github.com/processing/p5.js/pull/8874
* fix: correct textToContours and textToModel reference documentation (#8623) by @gourijain029-del in https://github.com/processing/p5.js/pull/8626
* Update 2.x top level docs to match main by @ksen0 in https://github.com/processing/p5.js/pull/8892
* Stewards workflow in main by @ksen0 in https://github.com/processing/p5.js/pull/8906
* Add shader examples for math functions by @SOUMITRO-SAHA in https://github.com/processing/p5.js/pull/8802
* Update release workflow to check for prerelease by @ksen0 in https://github.com/processing/p5.js/pull/8956
* docs: add gfrancine as a contributor for code by @allcontributors[bot] in #8959
* docs: add slash-init as a contributor for bug by @allcontributors[bot] in #8967
* docs: add Theresa-Em as a contributor for translation by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8989
* docs: add SihongShen as a contributor for translation by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8988
* docs: add zmuen as a contributor for translation by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8986
* Fixed missing images in unit_testing.md by @MarsGray in https://github.com/processing/p5.js/pull/8995
* docs: add Nwakaego-Ego as a contributor for bug, code, and 2 more by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8977
* docs: add Chiuye as a contributor for translation by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8987
* docs: add XiaoPingArchive as a contributor for translation by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8982
* fix: replace beta.p5js.org links with p5js.org in contributor docs by @Nwakaego-Ego in https://github.com/processing/p5.js/pull/8966

## New Contributors

Welcome to the community! 🎉 

* @VikasKSingh05 made their first contribution in https://github.com/processing/p5.js/pull/8824
* @BHARATH0153 made their first contribution in https://github.com/processing/p5.js/pull/8862
* @gourijain029-del made their first contribution in https://github.com/processing/p5.js/pull/8626
* @SarthakRawat-1 made their first contribution in https://github.com/processing/p5.js/pull/8934
* @gfrancine made their first contribution in https://github.com/processing/p5.js/pull/8937
* @MarsGray made their first contribution in https://github.com/processing/p5.js/pull/8995
* @Yashisinghal285 made their first contribution in https://github.com/processing/p5.js/pull/8965
* @Nwakaego-Ego made their first contribution in https://github.com/processing/p5.js/pull/8966

## Stewards

Stewards who reviewed and commented on PRs in this release - thank you for your effort!

* @perminder-17
* @nbogie 
* @davepagurek 
* @limzykenneth 
* @ksen0 
* @eupthere

## v2.3.1-rc.2 — 2026-07-13 (prerelease)

<!-- Release notes generated using configuration in .github/release.yml at v2.3.1-rc.2 -->

## What's Changed

## Testers Wanted 💚 

p5.js version 2.3.1 is almost ready, help testing it by trying your existing sketches with the new version, or by trying out the upcoming features! This is a **release candidate** (RC), which means it is not yet live on the p5.js Editor. Your help with testing now will help make the release more stable!

**To help with testing, you can use this [starter sketch](https://editor.p5js.org/ksen0/sketches/IAgGDzexy)**!

Or load both p5.js and WebGPU mode by adding these two script tags to your sketch:

```html
<script src="https://cdn.jsdelivr.net/npm/p5@2.3.1-rc.2/lib/p5.js"></script>
<script src="https://cdn.jsdelivr.net/npm/p5@2.3.1-rc.2/lib/p5.webgpu.js"></script>
```

Then load WebGPU mode in `createCanvas` - **note the `async/await`**, this is needed for WebGPU but not WebGL:
```js
async function setup() {
  await createCanvas(400, 400, WEBGPU);
}
```

Some things to test in your sketches: 

* Code updates touched these functions, so please test that they behave as usual / as expected: loading SVG files and bad URLs with `loadImage()`, applying `tint()` to images in 2D mode, [framebuffers](https://p5js.org/tutorials/layered-rendering-with-framebuffers/) with custom pixel densities, `orbitControl()` after swiping outside the canvas, `mouseIsPressed` behavior after clicking DOM elements, and `line()`, `point()`, `triangle()`, `quad()`, `rect()` (including with rounded corners, like in the example below)
* In shaders and p5.strands code there have been feature additions and bugfixes: `randomGaussian()` and `color()` inside p5.strands shader code, `instanceIndex` for instanced rendering, `TRIANGLE_FAN` drawing in both WebGL and WebGPU, custom shaders that set `uSampler` via `setUniform()`, hooks that return objects should work, custom shaders should be able to use version directives, `mouseX` and `width` in instance mode with p5.strands shaders

If anything breaks or looks off, please report it on GitHub!

> [!WARNING]
> This release [renames the color space previously called `HDR` to `P3`](https://github.com/processing/p5.js/pull/8975) for accuracy. If you use `HDR` color space constants in your code, please update them to `P3`. The maintainers felt this correction was important to make now. If you have concerns about backward compatibility, you can share them on the linked pull request discussion.


## What's new

`randomGaussian()` is available in p5.strands code - see the static example in the [starter sketch](https://editor.p5js.org/ksen0/sketches/IAgGDzexy) or below, which also shows more p5.js-style, beginner-friendly colors are also available.

* Add p5.strands support for randomGaussian() by @harshiltewari2004 in https://github.com/processing/p5.js/pull/8800
* Replace randomness-related noise usage in strands example by @VikasKSingh05 in https://github.com/processing/p5.js/pull/8824
* feat(strands): add color() support for beginner-friendly color inputs by @LalitNarayanYadav in https://github.com/processing/p5.js/pull/8822
* Add instanceIndex alias for instanceID by @aashu2006 in https://github.com/processing/p5.js/pull/8912
* fix builtin global accessors for instance mode in strands shaders by @aashu2006 in https://github.com/processing/p5.js/pull/8878

<img width="394" height="394" alt="Set of rectangles with rounded corners filled with noisy translucent yellow texture on a pink background" src="https://github.com/user-attachments/assets/b4c23243-19a0-45cb-866a-fae63c63f107" />


```js
// This sketch uses an unreleased version of p5.js
// github.com/processing/p5.js/releases/tag/v2.3.1-rc.2
// Thanks for testing 💚 

async function setup() {
  //for normal 2D or WEBGL stuff
  createCanvas(400, 400, WEBGL);

  //for WEBGPU stuff 
  // await createCanvas(400, 400, WEBGPGU);
  myShader = buildMaterialShader(myShaderBuilder);
}

function myShaderBuilder(){
  finalColor.begin();
  let coord = finalColor.texCoord;

  // color() and randomGaussian() available in p5.strands
  let c = color('#eeff22');
  finalColor.set([c.r, c.g, c.b, randomGaussian()*0.1 + 0.3]);
  
  finalColor.end();
}

function draw() {
  stroke(255);
  background("#f1678e");
  shader(myShader);
  orbitControl();

  // rect with rounded corners
  rect(-50, -50, 100, 100, 50, 10);
  translate(0,0,50);
  rect(-50, -50, 100, 100, 3);
  translate(0,0,50);
  rect(-50, -50, 100, 100, 0, 20, 30, 20);
  translate(0,0,50);
  rect(-50, -50, 100, 100);
}
```

## Custom shader bugfixes

* Fix WebGL shader version regex by @eupthere in https://github.com/processing/p5.js/pull/8857
* fix: preserve user-set uSampler uniform for custom shaders by @BHARATH0153 in https://github.com/processing/p5.js/pull/8869

## Ongoing work on shapes & SVG

* fix : other shape use the shape class also add new roundrect Primitive by @VANSH3104 in https://github.com/processing/p5.js/pull/8899
* Fix `loadImage` SVG file loading regression by @gfrancine in https://github.com/processing/p5.js/pull/8937

## Other bugfixes

* Fix memory leak on loadImage failure by @gfrancine in #8958
* Fix framebuffer texture size clamping using wrong pixel density by @NalinDalal in #8964
* Fix TRIANGLE_FAN immediate mode support by @davepagurek in #8974
* fix: convert tint to RGBA array in _getTintedImageCanvas by @SarthakRawat-1 in https://github.com/processing/p5.js/pull/8934
* Fix orbitControl() breaking after touch swipe outside canvas. by @perminder-17 in https://github.com/processing/p5.js/pull/8863
* Fix object returns in p5.strands hooks by @davepagurek in https://github.com/processing/p5.js/pull/8950
* fixing-mouseClick by @perminder-17 in https://github.com/processing/p5.js/pull/8917

### What's Changed 🎊
* Rename HDR to P3 by @limzykenneth in #8975
* Add shader examples to trigonometric functions by @SOUMITRO-SAHA in https://github.com/processing/p5.js/pull/8801
* Mark private methods as private by @ksen0 in https://github.com/processing/p5.js/pull/8854
* note strokeweight isn't scaled in webgl/webgpu by @Nixxx19 in https://github.com/processing/p5.js/pull/8850
* feat: add friendly error for cross-hook property access (#8813) by @BHARATH0153 in https://github.com/processing/p5.js/pull/8862
* Expose dimensions property on Vector by @ksen0 in https://github.com/processing/p5.js/pull/8874
* fix: correct textToContours and textToModel reference documentation (#8623) by @gourijain029-del in https://github.com/processing/p5.js/pull/8626
* Update 2.x top level docs to match main by @ksen0 in https://github.com/processing/p5.js/pull/8892
* Stewards workflow in main by @ksen0 in https://github.com/processing/p5.js/pull/8906
* Add shader examples for math functions by @SOUMITRO-SAHA in https://github.com/processing/p5.js/pull/8802
* Add friendly FES error for dimension mismatch on shared variable assi… by @harshiltewari2004 in https://github.com/processing/p5.js/pull/8823
* Update release workflow to check for prerelease by @ksen0 in https://github.com/processing/p5.js/pull/8956
* docs: add gfrancine as a contributor for code by @allcontributors[bot] in #8959
* docs: add slash-init as a contributor for bug by @allcontributors[bot] in #8967

## New Contributors
* @VikasKSingh05 made their first contribution in https://github.com/processing/p5.js/pull/8824
* @BHARATH0153 made their first contribution in https://github.com/processing/p5.js/pull/8862
* @gourijain029-del made their first contribution in https://github.com/processing/p5.js/pull/8626
* @SarthakRawat-1 made their first contribution in https://github.com/processing/p5.js/pull/8934
* @gfrancine made their first contribution in https://github.com/processing/p5.js/pull/8937

**Full Changelog**: https://github.com/processing/p5.js/compare/v2.3.0...v2.3.1-rc.1

## v2.3.1-rc.1 — 2026-06-29 (prerelease)

<!-- Release notes generated using configuration in .github/release.yml at v2.3.1-rc.1 -->

## What's Changed

## Testers Wanted 💚 

This is a **release candidate** (RC), which means it is not yet live on the p5.js Editor. Please help us to improve the stability of the newest version of p5.js by trying out this release candidate, and reporting bugs.

**To help with testing, you can use this [starter sketch](https://editor.p5js.org/ksen0/sketches/IAgGDzexy)**!

Or load both p5.js and WebGPU mode by adding these two script tags to your sketch:

```html
<script src="https://cdn.jsdelivr.net/npm/p5@2.3.1-rc.1/lib/p5.js"></script>
<script src="https://cdn.jsdelivr.net/npm/p5@2.3.1-rc.1/lib/p5.webgpu.js"></script>
```

Then load WebGPU mode in `createCanvas` - **note the `async/await`**, this is needed for WebGPU but not WebGL:
```js
async function setup() {
  await createCanvas(400, 400, WEBGPU);
}
```

## What's new

`random()` is available in p5.strands code - see the "static cube" example in the [starter sketch](https://editor.p5js.org/ksen0/sketches/IAgGDzexy) or below!

More p5.js-style, beginner-friendly colors are also available, as well as initial work for a more p5.js-style instancing API. Besides testing these additions, we welcome suggestions for how to best demonstrate them in the starter sketch for the upcoming patch!

Related pulls:

* Add p5.strands support for randomGaussian() by @harshiltewari2004 in https://github.com/processing/p5.js/pull/8800
* Replace randomness-related noise usage in strands example by @VikasKSingh05 in https://github.com/processing/p5.js/pull/8824
* feat(strands): add color() support for beginner-friendly color inputs by @LalitNarayanYadav in https://github.com/processing/p5.js/pull/8822
* Add instanceIndex alias for instanceID by @aashu2006 in https://github.com/processing/p5.js/pull/8912
* fix builtin global accessors for instance mode in strands shaders by @aashu2006 in https://github.com/processing/p5.js/pull/8878

<img width="397" height="398" alt="image" src="https://github.com/user-attachments/assets/c61f9bef-d280-48be-8e3a-00f96f09e4e1" />

```js
// This sketch uses an unreleased version of p5.js
// github.com/processing/p5.js/releases/tag/v2.3.1-rc.1
// Thanks for testing 💚 

function setup() {
  createCanvas(400, 400, WEBGL);
  myShader = buildMaterialShader(myShaderBuilder);
}

function myShaderBuilder(){
  finalColor.begin();
  let coord = finalColor.texCoord;
  finalColor.set(random(0.8));
  finalColor.end();
}

function draw() {
  stroke(255);
  background("#f1678e");
  shader(myShader);
  orbitControl();
  box(100);
}
```

## Custom shader bugfixes

* Fix WebGL shader version regex by @eupthere in https://github.com/processing/p5.js/pull/8857
* fix: preserve user-set uSampler uniform for custom shaders by @BHARATH0153 in https://github.com/processing/p5.js/pull/8869

## Ongoing work on shapes & SVG

* fix : other shape use the shape class also add new roundrect Primitive by @VANSH3104 in https://github.com/processing/p5.js/pull/8899
* Fix `loadImage` SVG file loading regression by @gfrancine in https://github.com/processing/p5.js/pull/8937

## Other bugfixes

* fix: convert tint to RGBA array in _getTintedImageCanvas by @SarthakRawat-1 in https://github.com/processing/p5.js/pull/8934
* Fix orbitControl() breaking after touch swipe outside canvas. by @perminder-17 in https://github.com/processing/p5.js/pull/8863
* Fix object returns in p5.strands hooks by @davepagurek in https://github.com/processing/p5.js/pull/8950
* fixing-mouseClick by @perminder-17 in https://github.com/processing/p5.js/pull/8917

### What's Changed 🎊
* Add shader examples to trigonometric functions by @SOUMITRO-SAHA in https://github.com/processing/p5.js/pull/8801
* Mark private methods as private by @ksen0 in https://github.com/processing/p5.js/pull/8854
* note strokeweight isn't scaled in webgl/webgpu by @Nixxx19 in https://github.com/processing/p5.js/pull/8850
* feat: add friendly error for cross-hook property access (#8813) by @BHARATH0153 in https://github.com/processing/p5.js/pull/8862
* Expose dimensions property on Vector by @ksen0 in https://github.com/processing/p5.js/pull/8874
* fix: correct textToContours and textToModel reference documentation (#8623) by @gourijain029-del in https://github.com/processing/p5.js/pull/8626
* Update 2.x top level docs to match main by @ksen0 in https://github.com/processing/p5.js/pull/8892
* Stewards workflow in main by @ksen0 in https://github.com/processing/p5.js/pull/8906
* Add shader examples for math functions by @SOUMITRO-SAHA in https://github.com/processing/p5.js/pull/8802
* Add friendly FES error for dimension mismatch on shared variable assi… by @harshiltewari2004 in https://github.com/processing/p5.js/pull/8823
* Update release workflow to check for prerelease by @ksen0 in https://github.com/processing/p5.js/pull/8956

## New Contributors
* @VikasKSingh05 made their first contribution in https://github.com/processing/p5.js/pull/8824
* @BHARATH0153 made their first contribution in https://github.com/processing/p5.js/pull/8862
* @gourijain029-del made their first contribution in https://github.com/processing/p5.js/pull/8626
* @SarthakRawat-1 made their first contribution in https://github.com/processing/p5.js/pull/8934
* @gfrancine made their first contribution in https://github.com/processing/p5.js/pull/8937

**Full Changelog**: https://github.com/processing/p5.js/compare/v2.3.0...v2.3.1-rc.1

## v1.11.14-rc.2 — 2026-06-29

<!-- Release notes generated using configuration in .github/release.yml at v1.11.14-rc.2 -->

## Testers wanted for upcoming p5.js v1 patch!

This is a **release candidate (RC)**, which means it is not yet live on the p5.js Editor. To help test, you can:

1. Download the `p5.js` or `p5.min.js` files below. Please try both; the most noticeable difference is that `p5.min.js` is smaller and will not include Friendly Error Messages (FES)
2. Create a p5 sketch using that version
3. Try to test around the recent changes.

Because p5.js v1 has been feature-frozen for over a year, each patch contains mostly documentation updates. In this upcoming patch, there are 3 non-documentation changes. Please check them out, try to find any side-effects, and report them as bugs!

This patch is planned for release in 3-4 weeks, alongside the [version 2 switch schedule](https://github.com/processing/p5.js/issues/8870).

### Bugfixes - focus testing on:

* Fix WebGL shader version method regex on 1.x branch by @eupthere in https://github.com/processing/p5.js/pull/8858 (see issue https://github.com/processing/p5.js/issues/8856)
* fix(dom/events): ensure mouseReleased fires after DOM interactions by @sidhansu10 in https://github.com/processing/p5.js/pull/8366 (see issue https://github.com/processing/p5.js/issues/8293)
* Fix graphics size error by @yugalkaushik in https://github.com/processing/p5.js/pull/8545 (see issue https://github.com/processing/p5.js/issues/4956)

### Documentation
* docs: add yugalkaushik as a contributor for bug, and code by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8767
* docs: add harshiltewari2004 as a contributor for code by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8780
* chore: update contributors.png from .all-contributorsrc by @p5js-bot in https://github.com/processing/p5.js/pull/8781
* Fix directionalLight example: add missing doubleClicked handler by @rakesh2OO5 in https://github.com/processing/p5.js/pull/8525
* docs: add adrienneg as a contributor for tutorial by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8825
* chore: update contributors.png from .all-contributorsrc by @p5js-bot in https://github.com/processing/p5.js/pull/8827
* Update stewards.yml by @ksen0 in https://github.com/processing/p5.js/pull/8839
* chore: update README table from stewards.yml by @github-actions[bot] in https://github.com/processing/p5.js/pull/8840
* update: stewards.yml by @Vaivaswat2244 in https://github.com/processing/p5.js/pull/8848
* [1.x] Update CI node version to 22 by @limzykenneth in https://github.com/processing/p5.js/pull/8852
* Re-Add RandomGamingDev back as Steward for WebGL by @RandomGamingDev in https://github.com/processing/p5.js/pull/8855
* docs: add eupthere as a contributor for code by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8859
* chore: update contributors.png from .all-contributorsrc by @p5js-bot in https://github.com/processing/p5.js/pull/8860
* Fix description of accumulating `scale` transforms by @joshuahhh in https://github.com/processing/p5.js/pull/8861
* docs: add joshuahhh as a contributor for doc by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8865
* chore: update contributors.png from .all-contributorsrc by @p5js-bot in https://github.com/processing/p5.js/pull/8866
* docs: add BHARATH0153 as a contributor for code by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8867
* chore: update contributors.png from .all-contributorsrc by @p5js-bot in https://github.com/processing/p5.js/pull/8868
* chore: update README table from stewards.yml by @github-actions[bot] in https://github.com/processing/p5.js/pull/8849
* Add WebGPU graphics stewards by @aashu2006 in https://github.com/processing/p5.js/pull/8876
* docs: add nitin-rajpoot as a contributor for code by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8864
* chore: update README table from stewards.yml by @github-actions[bot] in https://github.com/processing/p5.js/pull/8890
* chore: update contributors.png from .all-contributorsrc by @p5js-bot in https://github.com/processing/p5.js/pull/8891
* Update to remove special 2.0 mentions by @ksen0 in https://github.com/processing/p5.js/pull/8895
* docs: add iframe accessible name guidance to style guide by @ksen0 in https://github.com/processing/p5.js/pull/8896
* docs: add mmendieta2 as a contributor for code, and test by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8897
* chore: update contributors.png from .all-contributorsrc by @p5js-bot in https://github.com/processing/p5.js/pull/8898
* Update release workflow to check for prerelease by @ksen0 in https://github.com/processing/p5.js/pull/8957

## New Contributors
* @sidhansu10 made their first contribution in https://github.com/processing/p5.js/pull/8366

**Full Changelog**: https://github.com/processing/p5.js/compare/v1.11.14-rc.0...v1.11.14-rc.2

## v2.3.0 — 2026-05-28

# 2.3.0: New features from the growing p5.strands contributor community 🌱 

<a href=https://editor.p5js.org/ksen0/sketches/yqIwIPxnz><img width="896" height="237" alt="Absract pixel image based on Conway's Game of Life with the text p5.js 2.3 on top" src="https://github.com/user-attachments/assets/03364279-3c96-42bb-b8c1-50ac8c8b1cb3" /></a>

## What's Changed 🎊

Work since 2.2.3 has focused on stabilization and workflow improvements; refactors to p5.Vector based on the recently-added [Decorators API](https://github.com/processing/p5.js/issues/8334); and new [beginner-friendly shader programming API](https://media.ccc.de/v/lgm-2026-110664-beginner-friendly-shader-programming-in-p5-js-v2) features (p5.strands), as well as the [experimental WebGPU renderer](https://beta.p5js.org/contribute/webgpu/).

This release includes work from many contributors, stewards, and testers - including new contributors to p5.strands! welcome, and thanks for all your amazing diligence and creativity 🎉 🎉 🎉 

> [!NOTE]
> This release includes updates in p5.js vectors. Vectors are used in simulations, including many "Nature of Code sketches", like these [Autonomous Agents examples](https://natureofcode.com/autonomous-agents/). When creating empty vectors, always provide parameters: ~`createVector()`~ :x: `createVector(0,0)` ✅  or `createVector(0,0,0)` ✅ . Although the empty constructor was common before p5.js v2, now p5.js supports vectors of different dimensions. Even when vectors are empty, giving `0, 0` parameters makes it clear if it is a 2D or 3D vector. Operations on vectors are only defined on same-dimension vectors: when adding or multiplying vectors together, for example, both should be 2D or both 3D.

## Workflow Improvements

To support testing new contributions, there are now continuous releases on Pull Requests: look for this comment from **p5js-bot** on any Pull Request, and use the CDN link in test sketches to help with review:

<img width="500" alt="GitHub commend with CDN link" src="https://github.com/user-attachments/assets/eb3b7f3e-25d8-415a-a04d-ea830629d731" />

Work is ongoing on [distributing custom builds](https://github.com/processing/p5.js/issues/8003), thanks to @limzykenneth. Please do test [the custom/modular builds tool](https://p5js-custom-build.limzykenneth.com/) (there is also [OpenAPI JSON documentation available](https://p5js-custom-build.limzykenneth.com/openapi.json) plus [GUI API reference](https://p5js-custom-build.limzykenneth.com/scalar)).

<img width="500"  height="339" alt="screenshot of a selector menu to include only some of the modules in p5.js" src="https://github.com/user-attachments/assets/7fb21470-dd3c-46f8-98f0-94e7bbe5e2bb" />

The goal is **smaller import size by providing a custom build**. Work is ongoing for more separation between modules, right now Including all modules makes it a bit larger but you can use custom build. For now, the above tool is for testing, rather than for using in your work directly - we welcome your input!

## p5.strands updates: new features and experimental compute shader support 🎉 

On graphics, we have continued to work on [beginner-friendly shader programming API](https://media.ccc.de/v/lgm-2026-110664-beginner-friendly-shader-programming-in-p5-js-v2) features (p5.strands), as well as the [experimental WebGPU renderer](https://beta.p5js.org/contribute/webgpu/).

The p5.strands code has been refactored and simplified, which will make maintenance and contribution easier in the future, thanks to @davepagurek and @LalitNarayanYadav. Additionally, p5.strands, used with the experimental `WebGPU` renderer, now supports compute shaders, thanks to @davepagurek and @aashu2006.

This minor release includes exciting p5.strands API additions by the growing p5.strands contributor community:

* filter shaders are supported on 2D sketches, thanks to @LalitNarayanYadav 
* `random()` and `randomSeed()` is available in p5.strands code, thanks to @perminder-17 
* `map()` is available in p5.strands code, thanks to @Nixxx19  
* `lerp()` and `instanceID()` are more consistently supported, thanks to @aashu2006
* more helpful error messages, thanks to @kushal1061
* corrected TypeScript typing, thanks to @Kathrina-dev
* simple shader materials can be written much easier, using only `finalColor` hook thanks to @YuktiNandwana

Here is an example `p5.js` sketch using `p5.strands`, with the noise-based texture:

<img width="321" height="305" alt="Cloudy cube against a pink background" src="https://github.com/user-attachments/assets/0830d2f0-e910-4a20-8ddc-b01fd3e5396f" />


```js
let myShader;
function setup() {
  createCanvas(400, 400, WEBGL);
  myShader = buildMaterialShader(myShaderBuilder);
}
function myShaderBuilder(){
  finalColor.begin();
  let coord = finalColor.texCoord;
  finalColor.set(noise(coord.x, coord.y));
  finalColor.end();
}

function draw() {
  stroke(255);
  background("#f1678e");
  shader(myShader);
  orbitControl();
  box(100);
}
```

Finally, p5.strands, used with the experimental `WebGPU` renderer, now supports compute shaders. For example, below is code for a Game of Life simulation, written by @davepagurek. This uses compute shaders (compare the code to the [non-shader example here](https://beta.p5js.org/examples/math-and-physics-game-of-life/).)

```js
// noprotect
// Authored by Dave Pagurek to demonstrate an WebGPU compute shaders

let cells;
let nextCells;
let gameShader;
let displayShader;
let W = 0;
let H = 0;

async function setup() {
  W = 100;
  H = 100;
  await createCanvas(100, 100, WEBGPU);
  pixelDensity(1);

  let initial = new Float32Array(W * H);
  for (let i = 0; i < initial.length; i++) {
    initial[i] = random() > 0.7 ? 1 : 0;
  }
  cells = createStorage(initial);
  nextCells = createStorage(W * H);

  gameShader = buildComputeShader(simulate);
  displayShader = buildFilterShader(display);
}

function simulate() {
  let current = uniformStorage(() => cells);
  let next = uniformStorage(() => nextCells);
  let w = uniformInt(() => W);
  let h = uniformInt(() => H);
  let x = index.x;
  let y = index.y;

  let n = 0;
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (dx != 0 || dy != 0) {
        let nx = (x + dx + w) % w;
        let ny = (y + dy + h) % h;
        n += current[ny * w + nx];
      }
    }
  }

  let alive = current[y * w + x];
  let nextOutput = 0;
  if (alive == 1) {
    if (n == 2 || n == 3) {
      nextOutput = 1;
    }
  } else {
    if (n == 3) {
      nextOutput = 1;
    }
  }
  next[y * w + x] = nextOutput;
}

function display() {
  let data = uniformStorage(() => cells);
  let w = uniformInt(() => W);
  let h = uniformInt(() => H);

  filterColor.begin();
  let x = floor(filterColor.texCoord.x * w);
  let y = floor(filterColor.texCoord.y * h);
  let alive = data[y * w + x];
  filterColor.set([alive, alive, alive, 1]);
  filterColor.end();
}

function draw() {
  compute(gameShader, W, H);
  [nextCells, cells] = [cells, nextCells];
  filter(displayShader);
}
```

### p5.strands and WebGPU
* Fix: restore lerp alias to GLSL mix in p5.strands by @aashu2006 in https://github.com/processing/p5.js/pull/8681
* Ternary support for p5.strands by @davepagurek in https://github.com/processing/p5.js/pull/8638
* Make instanceID() work in both vertex and fragment shaders by @aashu2006 in https://github.com/processing/p5.js/pull/8695
* Make sure we don't transpile uniform callbacks by @davepagurek in https://github.com/processing/p5.js/pull/8709
* Auto-spread large WebGPU compute dispatches by @aashu2006 in https://github.com/processing/p5.js/pull/8696
* WebGPU compute shaders by @davepagurek in https://github.com/processing/p5.js/pull/8531
* Fix: Add filterColor alias support for 2D filter shaders by @LalitNarayanYadav in https://github.com/processing/p5.js/pull/8699
* Fix swizzle assignment for array element properties in compute shaders by @davepagurek in https://github.com/processing/p5.js/pull/8724
* Minor WebGL->WebGPU fixes by @davepagurek in https://github.com/processing/p5.js/pull/8731
* Fix TypeScript typing for filterColor shader hook by @Kathrina-dev in https://github.com/processing/p5.js/pull/8644
* Refactor: Deduplicate BinaryExpression and LogicalExpression transformation logic by @LalitNarayanYadav in https://github.com/processing/p5.js/pull/8741
* feat(webgpu): add read() to p5.StorageBuffer with tests by @aashu2006 in https://github.com/processing/p5.js/pull/8726
* Refactor: Move getNoiseShaderSnippet to strands backend by @LalitNarayanYadav in https://github.com/processing/p5.js/pull/8705
* implementing random function for strands by @perminder-17 in https://github.com/processing/p5.js/pull/8730
* added productive error when loop protection breaks in p5.strands by @kushal1061 in https://github.com/processing/p5.js/pull/8725
* Add StorageBuffer.set(index, value) for single-element GPU updates by @aashu2006 in https://github.com/processing/p5.js/pull/8772
* support map() inside p5.strands shaders by @Nixxx19 in https://github.com/processing/p5.js/pull/8753
* Refactor: Extract shared addCopyingAndReturn helper for control flow transformations by @LalitNarayanYadav in https://github.com/processing/p5.js/pull/8754
* Refactor: Extract replaceIdentifierReferences and remove reliance on `this` in ASTCallbacks by @LalitNarayanYadav in https://github.com/processing/p5.js/pull/8728
* feat(webgl): add texCoord parameter to getFinalColor hook by @YuktiNandwana in https://github.com/processing/p5.js/pull/8706
* Fix/feedback by @davepagurek in https://github.com/processing/p5.js/pull/8704
* Refactor: Extract transpilation passes and callback generation from transpileStrandsToJS by @LalitNarayanYadav in https://github.com/processing/p5.js/pull/8782
* Make sure all p5.strands math operators are converted to strands nodes by @davepagurek in https://github.com/processing/p5.js/pull/8785
* Handle null tint in Renderer3D by @davepagurek in https://github.com/processing/p5.js/pull/8815
* Make line shader hooks use unmultiplied alpha by @davepagurek in https://github.com/processing/p5.js/pull/8787
* Fix #8756: Allow computed array indexing on non-storage vectors by @SOUMITRO-SAHA in https://github.com/processing/p5.js/pull/8768
* Fix p5.strands hook params clashing with user uniform names by @davepagurek in https://github.com/processing/p5.js/pull/8793
* Add shader examples to noise random and millis functions by @SOUMITRO-SAHA in https://github.com/processing/p5.js/pull/8803

###  Workflow and Stabilization
* Continuous release with pkg.pr.new and esm.sh by @limzykenneth in https://github.com/processing/p5.js/pull/8603
* harden github actions by @perminder-17 in https://github.com/processing/p5.js/pull/8650
* Resolves #8278 by @dhowe in https://github.com/processing/p5.js/pull/8328
* Revise p5.js 2.0 Beta Bug Report template by @ksen0 in https://github.com/processing/p5.js/pull/8693
* Add ShapePrimitive support for arcs and ellipses by @VANSH3104 in https://github.com/processing/p5.js/pull/8617
* fix: allow setup() to return Promise<void> for async workflows by @LalitNarayanYadav in https://github.com/processing/p5.js/pull/8700
* fix: gracefully handle mixed-material OBJ models instead of crashing by @Nixxx19 in https://github.com/processing/p5.js/pull/8666
* Use more circular rounding for WebGL rect corners by @davepagurek in https://github.com/processing/p5.js/pull/8743
* Save + restore 2D text canvas context when font is applied in WebGL mode by @davepagurek in https://github.com/processing/p5.js/pull/8747
* Remove canvas style attribute update when changing font weight by @davepagurek in https://github.com/processing/p5.js/pull/8733
* fix: prevent browser freeze when tessellating >50k vertices (dev-2.0) by @Nixxx19 in https://github.com/processing/p5.js/pull/8729
* Fixes for server side usage by @limzykenneth in https://github.com/processing/p5.js/pull/8357
* Make default sketch canvas ID autoincrement by @limzykenneth in https://github.com/processing/p5.js/pull/7836
* Don't use push(...arr) in GeometryBuilder for long vertex arrays by @davepagurek in https://github.com/processing/p5.js/pull/8789
* Fixes for filters on p5.Graphics by @davepagurek in https://github.com/processing/p5.js/pull/8792

### Documentation and Friendly Errors
* Docs: Add pipeline overview for transpileStrandsToJS by @LalitNarayanYadav in https://github.com/processing/p5.js/pull/8755
* Reference example typo fix by @limzykenneth in https://github.com/processing/p5.js/pull/8680
* docs: fix typos and grammar in contributor docs by @Xavrir in https://github.com/processing/p5.js/pull/8654
* lf use min() and max() with Infinity or -Infinity, it throws friendly error by @menacingly-coded in https://github.com/processing/p5.js/pull/8389
* Update vector docs to indicate recommended usage by @ksen0 in https://github.com/processing/p5.js/pull/8783
* remove unused `@requires` from all jsdoc by @nbogie in https://github.com/processing/p5.js/pull/8713
* Update RendererGL comments to reflect current state of pixel functions by @davepagurek in https://github.com/processing/p5.js/pull/8738
* docs: remove broken beginGeometry/endGeometry links from buildGeometry reference by @mitre88 in https://github.com/processing/p5.js/pull/8739
* Fix JSDoc typos: widhts → widths, coordniates → coordinates, coordian… by @harshiltewari2004 in https://github.com/processing/p5.js/pull/8757
* Fix: restrict setHeading() to 2D vectors and add friendly error for others by @reshma045 in https://github.com/processing/p5.js/pull/8255
* States tests and rename by @harshiltewari2004 in https://github.com/processing/p5.js/pull/8778
* Match workflows, top level docs, and stewards to main by @ksen0 in https://github.com/processing/p5.js/pull/8760
* Fixing the refernece for p5.js-website  by @perminder-17 in https://github.com/processing/p5.js/pull/8816
* add initial guide working_with_contributor_documents.md by @nbogie in https://github.com/processing/p5.js/pull/8627
* docs: add iframe accessible name guidance to style guide by @Xavrir in https://github.com/processing/p5.js/pull/8653
* docs: add documentation for mix() method in p5.strands by @Anshumancanrock in https://github.com/processing/p5.js/pull/8463
* adding-missing-doubleClicked-handler by @perminder-17 in https://github.com/processing/p5.js/pull/8799

### Vectors Refactor and Documentation Updates
* Refactor p5.Vector to prioritize smaller dimension in binary operations on mismatched-size vectors by @ksen0 in https://github.com/processing/p5.js/pull/8676
* Correct set() documentation by @ksen0 in https://github.com/processing/p5.js/pull/8838
* Restore FES warnings in createVector via this.constructor._friendlyError by @perminder-17 in https://github.com/processing/p5.js/pull/8829
* Vector mismatch dimension prints warning message by @limzykenneth in https://github.com/processing/p5.js/pull/8821
* p5.Vector perf updates by @davepagurek in https://github.com/processing/p5.js/pull/8809

## New Contributors

* @Xavrir made their first contribution in https://github.com/processing/p5.js/pull/8654
* @YuktiNandwana made their first contribution in https://github.com/processing/p5.js/pull/8706
* @Kathrina-dev made their first contribution in https://github.com/processing/p5.js/pull/8644
* @mitre88 made their first contribution in https://github.com/processing/p5.js/pull/8739
* @kushal1061 made their first contribution in https://github.com/processing/p5.js/pull/8725
* @SOUMITRO-SAHA made their first contribution in https://github.com/processing/p5.js/pull/8768

## Thanks to all contributors and stewards who made this release possible!

**Full Changelog**: https://github.com/processing/p5.js/compare/v2.2.3...v2.3.0

## v2.3.0-rc.6 — 2026-05-26 (prerelease)

<!-- Release notes generated using configuration in .github/release.yml at v2.3.0-rc.5 -->

## Testers Wanted 💚 

This is a **release candidate** (RC), which means it is not yet live on the p5.js Editor. Please help us to improve the stability of the newest version of p5.js by trying out this release candidate, and reporting bugs.

**To help with testing, you can use this [starter sketch](https://editor.p5js.org/ksen0/sketches/cnTFvcqYz)**!

Or load both p5.js and WebGPU mode by adding these two script tags to your sketch:

```html
<script src="https://cdn.jsdelivr.net/npm/p5@2.3.0-rc.6/lib/p5.js"></script>
<script src="https://cdn.jsdelivr.net/npm/p5@2.3.0-rc.6/lib/p5.webgpu.js"></script>
```

Then load WebGPU mode in `createCanvas` - **note the `async/await`**, this is needed for WebGPU but not WebGL:
```js
async function setup() {
  await createCanvas(400, 400, WEBGPU);
}
```

### What's Changed 🎊

Work since 2.2.3 has focused on graphics and stabilization, including on version p5.Vector. In version 1, it was common to use `createVector()` which would create a three-dimensional vector at `(0, 0, 0)`. In version 2, empty vectors should be made with `createVector(0, 0)` or `createVector(0, 0, 0)`, to make clear when it is two or three dimensional. This is because version 2 supports vectors of different dimensions, although usages are still related to graphics and require 3D vectors.

On graphics, we have continued to work on [beginner-friendly shader programming API](https://media.ccc.de/v/lgm-2026-110664-beginner-friendly-shader-programming-in-p5-js-v2) features (p5.strands), as well as the [experimental WebGPU renderer](https://beta.p5js.org/contribute/webgpu/).

This minor release includes exciting additions by the growing p5.strands contributor community:

* filter shaders are supported on 2D sketches, thanks to @LalitNarayanYadav 
* `random()` and `randomSeed()` is available in p5.strands code, thanks to @perminder-17 
* `map()` is available in p5.strands code, thanks to @Nixxx19  
* `lerp()` and `instanceID()` are more consistently supported, thanks to @aashu2006
* more helpful error messages, thanks to @kushal1061
* corrected TypeScript typing, thanks to @Kathrina-dev
* simple shader materials can be written much easier, using only `finalColor` hook thanks to @YuktiNandwana

Here is an example `p5.js` sketch using `p5.strands`, with the noise-based texture:

```js
let myShader;
function setup() {
  createCanvas(400, 400, WEBGL);
  myShader = buildMaterialShader(myShaderBuilder);
}
function myShaderBuilder(){
  finalColor.begin();
  let coord = finalColor.texCoord;
  finalColor.set(noise(coord.x, coord.y));
  finalColor.end();
}

function draw() {
  stroke(255);
  background("#f1678e");
  shader(myShader);
  orbitControl();
  box(100);
}
```

<img width="321" height="305" alt="Cloudy cube against a pink background" src="https://github.com/user-attachments/assets/0830d2f0-e910-4a20-8ddc-b01fd3e5396f" />

The p5.strands code has also been refactored and simplified, which will make maintenance and contribution easier in the future, thanks to @davepagurek and @LalitNarayanYadav! Finally, p5.strands, used with the experimental `WebGPU` renderer, now supports compute shaders, thanks to work by @davepagurek, @aashu2006, and @SOUMITRO-SAHA. For example, below is code for a Game of Life simulation, written by @davepagurek. This uses compute shaders (compare the code to the [non-shader example here\(https://beta.p5js.org/examples/math-and-physics-game-of-life/).)

```js
// noprotect
// Authored by Dave Pagurek to demonstrate using WebGPU compute shaders

let cells;
let nextCells;
let gameShader;
let displayShader;
let W = 0;
let H = 0;

async function setup() {
  W = 100;
  H = 100;
  await createCanvas(100, 100, WEBGPU);
  pixelDensity(1);

  let initial = new Float32Array(W * H);
  for (let i = 0; i < initial.length; i++) {
    initial[i] = random() > 0.7 ? 1 : 0;
  }
  cells = createStorage(initial);
  nextCells = createStorage(W * H);

  gameShader = buildComputeShader(simulate);
  displayShader = buildFilterShader(display);
}

function simulate() {
  let current = uniformStorage(() => cells);
  let next = uniformStorage(() => nextCells);
  let w = uniformInt(() => W);
  let h = uniformInt(() => H);
  let x = index.x;
  let y = index.y;

  let n = 0;
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (dx != 0 || dy != 0) {
        let nx = (x + dx + w) % w;
        let ny = (y + dy + h) % h;
        n += current[ny * w + nx];
      }
    }
  }

  let alive = current[y * w + x];
  let nextOutput = 0;
  if (alive == 1) {
    if (n == 2 || n == 3) {
      nextOutput = 1;
    }
  } else {
    if (n == 3) {
      nextOutput = 1;
    }
  }
  next[y * w + x] = nextOutput;
}

function display() {
  let data = uniformStorage(() => cells);
  let w = uniformInt(() => W);
  let h = uniformInt(() => H);

  filterColor.begin();
  let x = floor(filterColor.texCoord.x * w);
  let y = floor(filterColor.texCoord.y * h);
  let alive = data[y * w + x];
  filterColor.set([alive, alive, alive, 1]);
  filterColor.end();
}

function draw() {
  compute(gameShader, W, H);
  [nextCells, cells] = [cells, nextCells];
  filter(displayShader);
}
```

We've also introduced some workflow improvements to support testing new contributions, including the @p5js-bot - look for this comment on any Pull Request, and use the CDN link in test sketches to help with review:

<img width="400" alt="GitHub commend with CDN link" src="https://github.com/user-attachments/assets/eb3b7f3e-25d8-415a-a04d-ea830629d731" />

### Since RC.1

Since initial release candidate, some refactors and bugfixes have been made to p5.strands: 

* add initial guide working_with_contributor_documents.md by @nbogie in https://github.com/processing/p5.js/pull/8627
* Vector mismatch dimension prints warning message by @limzykenneth in https://github.com/processing/p5.js/pull/8821


Find more detailed commits in [previous RC release notes](https://github.com/processing/p5.js/releases/tag/v2.3.0-rc.1)

**Full Changelog**: https://github.com/processing/p5.js/compare/v2.2.3...v2.3.0-rc.6

## v2.3.0-rc.5 — 2026-05-21 (prerelease)

<!-- Release notes generated using configuration in .github/release.yml at v2.3.0-rc.5 -->

## Testers Wanted 💚 

This is a **release candidate** (RC), which means it is not yet live on the p5.js Editor. Please help us to improve the stability of the newest version of p5.js by trying out this release candidate, and reporting bugs.

**To help with testing, you can use this [starter sketch](https://editor.p5js.org/ksen0/sketches/cnTFvcqYz)**!

Or load both p5.js and WebGPU mode by adding these two script tags to your sketch:

```html
<script src="https://cdn.jsdelivr.net/npm/p5@2.3.0-rc.5/lib/p5.js"></script>
<script src="https://cdn.jsdelivr.net/npm/p5@2.3.0-rc.5/lib/p5.webgpu.js"></script>
```

Then load WebGPU mode in `createCanvas` - **note the `async/await`**, this is needed for WebGPU but not WebGL:
```js
async function setup() {
  await createCanvas(400, 400, WEBGPU);
}
```

### What's Changed 🎊

Work since 2.2.3 has focused on graphics and stabilization, including on version p5.Vector. In version 1, it was common to use `createVector()` which would create a three-dimensional vector at `(0, 0, 0)`. In version 2, empty vectors should be made with `createVector(0, 0)` or `createVector(0, 0, 0)`, to make clear when it is two or three dimensional. This is because version 2 supports vectors of different dimensions, although usages are still related to graphics and require 3D vectors.

On graphics, we have continued to work on [beginner-friendly shader programming API](https://media.ccc.de/v/lgm-2026-110664-beginner-friendly-shader-programming-in-p5-js-v2) features (p5.strands), as well as the [experimental WebGPU renderer](https://beta.p5js.org/contribute/webgpu/).

This minor release includes exciting additions by the growing p5.strands contributor community:

* filter shaders are supported on 2D sketches, thanks to @LalitNarayanYadav 
* `random()` and `randomSeed()` is available in p5.strands code, thanks to @perminder-17 
* `map()` is available in p5.strands code, thanks to @Nixxx19  
* `lerp()` and `instanceID()` are more consistently supported, thanks to @aashu2006
* more helpful error messages, thanks to @kushal1061
* corrected TypeScript typing, thanks to @Kathrina-dev
* simple shader materials can be written much easier, using only `finalColor` hook thanks to @YuktiNandwana

Here is an example `p5.js` sketch using `p5.strands`, with the noise-based texture:

```js
let myShader;
function setup() {
  createCanvas(400, 400, WEBGL);
  myShader = buildMaterialShader(myShaderBuilder);
}
function myShaderBuilder(){
  finalColor.begin();
  let coord = finalColor.texCoord;
  finalColor.set(noise(coord.x, coord.y));
  finalColor.end();
}

function draw() {
  stroke(255);
  background("#f1678e");
  shader(myShader);
  orbitControl();
  box(100);
}
```

<img width="321" height="305" alt="Cloudy cube against a pink background" src="https://github.com/user-attachments/assets/0830d2f0-e910-4a20-8ddc-b01fd3e5396f" />

The p5.strands code has also been refactored and simplified, which will make maintenance and contribution easier in the future, thanks to @davepagurek and @LalitNarayanYadav! Finally, p5.strands, used with the experimental `WebGPU` renderer, now supports compute shaders, thanks to work by @davepagurek, @aashu2006, and @SOUMITRO-SAHA. For example, below is code for a Game of Life simulation, written by @davepagurek. This uses compute shaders (compare the code to the [non-shader example here\(https://beta.p5js.org/examples/math-and-physics-game-of-life/).)

```js
// noprotect
// Authored by Dave Pagurek to demonstrate using WebGPU compute shaders

let cells;
let nextCells;
let gameShader;
let displayShader;
let W = 0;
let H = 0;

async function setup() {
  W = 100;
  H = 100;
  await createCanvas(100, 100, WEBGPU);
  pixelDensity(1);

  let initial = new Float32Array(W * H);
  for (let i = 0; i < initial.length; i++) {
    initial[i] = random() > 0.7 ? 1 : 0;
  }
  cells = createStorage(initial);
  nextCells = createStorage(W * H);

  gameShader = buildComputeShader(simulate);
  displayShader = buildFilterShader(display);
}

function simulate() {
  let current = uniformStorage(() => cells);
  let next = uniformStorage(() => nextCells);
  let w = uniformInt(() => W);
  let h = uniformInt(() => H);
  let x = index.x;
  let y = index.y;

  let n = 0;
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (dx != 0 || dy != 0) {
        let nx = (x + dx + w) % w;
        let ny = (y + dy + h) % h;
        n += current[ny * w + nx];
      }
    }
  }

  let alive = current[y * w + x];
  let nextOutput = 0;
  if (alive == 1) {
    if (n == 2 || n == 3) {
      nextOutput = 1;
    }
  } else {
    if (n == 3) {
      nextOutput = 1;
    }
  }
  next[y * w + x] = nextOutput;
}

function display() {
  let data = uniformStorage(() => cells);
  let w = uniformInt(() => W);
  let h = uniformInt(() => H);

  filterColor.begin();
  let x = floor(filterColor.texCoord.x * w);
  let y = floor(filterColor.texCoord.y * h);
  let alive = data[y * w + x];
  filterColor.set([alive, alive, alive, 1]);
  filterColor.end();
}

function draw() {
  compute(gameShader, W, H);
  [nextCells, cells] = [cells, nextCells];
  filter(displayShader);
}
```

We've also introduced some workflow improvements to support testing new contributions, including the @p5js-bot - look for this comment on any Pull Request, and use the CDN link in test sketches to help with review:

<img width="400" alt="GitHub commend with CDN link" src="https://github.com/user-attachments/assets/eb3b7f3e-25d8-415a-a04d-ea830629d731" />

### Since RC.1

Since initial release candidate, some refactors and bugfixes have been made to p5.strands: 

* p5.Vector perf updates by @davepagurek in https://github.com/processing/p5.js/pull/8809
* Add shader examples to noise random and millis functions by @SOUMITRO-SAHA in https://github.com/processing/p5.js/pull/8803
* Handle null tint in Renderer3D by @davepagurek in https://github.com/processing/p5.js/pull/8815
* Fixing the refernece for p5.js-website  by @perminder-17 in https://github.com/processing/p5.js/pull/8816
* Refactor: Extract transpilation passes and callback generation from transpileStrandsToJS by @LalitNarayanYadav in https://github.com/processing/p5.js/pull/8782
* Make sure all p5.strands math operators are converted to strands nodes by @davepagurek in https://github.com/processing/p5.js/pull/8785
* Make line shader hooks use unmultiplied alpha by @davepagurek in https://github.com/processing/p5.js/pull/8787
* Fix #8756: Allow computed array indexing on non-storage vectors by @SOUMITRO-SAHA in https://github.com/processing/p5.js/pull/8768
* Don't use push(...arr) in GeometryBuilder for long vertex arrays by @davepagurek in https://github.com/processing/p5.js/pull/8789
* Fixes for filters on p5.Graphics by @davepagurek in https://github.com/processing/p5.js/pull/8792
* Fix p5.strands hook params clashing with user uniform names by @davepagurek in https://github.com/processing/p5.js/pull/8793
* docs: add iframe accessible name guidance to style guide by @Xavrir in https://github.com/processing/p5.js/pull/8653
* docs: add documentation for mix() method in p5.strands by @Anshumancanrock in https://github.com/processing/p5.js/pull/8463
* adding-missing-doubleClicked-handler by @perminder-17 in https://github.com/processing/p5.js/pull/8799
* harden github actions by @perminder-17 in https://github.com/processing/p5.js/pull/8650

Find more detailed commits in [previous RC release notes](https://github.com/processing/p5.js/releases/tag/v2.3.0-rc.1)

**Full Changelog**: https://github.com/processing/p5.js/compare/v2.2.3...v2.3.0-rc.5

## v2.3.0-rc.4 — 2026-05-15 (prerelease)

<!-- Release notes generated using configuration in .github/release.yml at v2.3.0-rc.4 -->

## Testers Wanted 💚 

This is a **release candidate** (RC), which means it is not yet live on the p5.js Editor. Please help us to improve the stability of the newest version of p5.js by trying out this release candidate, and reporting bugs.

**To help with testing, you can use this [starter sketch](https://editor.p5js.org/ksen0/sketches/cnTFvcqYz)**!

Or load both p5.js and WebGPU mode by adding these two script tags to your sketch:

```html
<script src="https://cdn.jsdelivr.net/npm/p5@2.3.0-rc.4/lib/p5.js"></script>
<script src="https://cdn.jsdelivr.net/npm/p5@2.3.0-rc.4/lib/p5.webgpu.js"></script>
```

Then load WebGPU mode in `createCanvas` - **note the `async/await`**, this is needed for WebGPU but not WebGL:
```js
async function setup() {
  await createCanvas(400, 400, WEBGPU);
}
```

### What's Changed 🎊

Work since 2.2.3 has focused on graphics and stabilization, including on version p5.Vector. In version 1, it was common to use `createVector()` which would create a three-dimensional vector at `(0, 0, 0)`. In version 2, empty vectors should be made with `createVector(0, 0)` or `createVector(0, 0, 0)`, to make clear when it is two or three dimensional. This is because version 2 supports vectors of different dimensions, although usages are still related to graphics and require 3D vectors.

We've also introduced some workflow improvements to support testing new contributions, including the @p5js-bot - look for this comment on any Pull Request, and use the CDN link in test sketches to help with review:

<img width="400" alt="GitHub commend with CDN link" src="https://github.com/user-attachments/assets/eb3b7f3e-25d8-415a-a04d-ea830629d731" />

On graphics, we have continued to work on [beginner-friendly shader programming API](https://media.ccc.de/v/lgm-2026-110664-beginner-friendly-shader-programming-in-p5-js-v2) features (p5.strands), as well as the [experimental WebGPU renderer](https://beta.p5js.org/contribute/webgpu/).

This minor release includes exciting additions by the growing p5.strands contributor community:

* filter shaders are supported on 2D sketches, thanks to @LalitNarayanYadav 
* `random()` and `randomSeed()` is available in p5.strands code, thanks to @perminder-17 
* `map()` is available in p5.strands code, thanks to @Nixxx19  
* `lerp()` and `instanceID()` are more consistently supported, thanks to @aashu2006
* more helpful error messages, thanks to @kushal1061
* corrected TypeScript typing, thanks to @Kathrina-dev
* simple shader materials can be written much easier, using only `finalColor` hook thanks to @YuktiNandwana

Here is an example `p5.js` sketch using `p5.strands`, with the noise-based texture:

```js
let myShader;
function setup() {
  createCanvas(400, 400, WEBGL);
  myShader = buildMaterialShader(myShaderBuilder);
}
function myShaderBuilder(){
  finalColor.begin();
  let coord = finalColor.texCoord;
  finalColor.set(noise(coord.x, coord.y));
  finalColor.end();
}

function draw() {
  stroke(255);
  background("#f1678e");
  shader(myShader);
  orbitControl();
  box(100);
}
```

<img width="321" height="305" alt="Cloudy cube against a pink background" src="https://github.com/user-attachments/assets/0830d2f0-e910-4a20-8ddc-b01fd3e5396f" />

The p5.strands code has also been refactored and simplified, which will make maintenance and contribution easier in the future, thanks to @davepagurek and @LalitNarayanYadav! Finally, p5.strands, used with the experimental `WebGPU` renderer, now supports compute shaders, thanks to work by @davepagurek, @aashu2006, and @SOUMITRO-SAHA. For example, below is code for a Game of Life simulation, written by @davepagurek. This uses compute shaders (compare the code to the [non-shader example here\(https://beta.p5js.org/examples/math-and-physics-game-of-life/).)

```js
// noprotect
// Authored by Dave Pagurek to demonstrate using WebGPU compute shaders

let cells;
let nextCells;
let gameShader;
let displayShader;
let W = 0;
let H = 0;

async function setup() {
  W = 100;
  H = 100;
  await createCanvas(100, 100, WEBGPU);
  pixelDensity(1);

  let initial = new Float32Array(W * H);
  for (let i = 0; i < initial.length; i++) {
    initial[i] = random() > 0.7 ? 1 : 0;
  }
  cells = createStorage(initial);
  nextCells = createStorage(W * H);

  gameShader = buildComputeShader(simulate);
  displayShader = buildFilterShader(display);
}

function simulate() {
  let current = uniformStorage(() => cells);
  let next = uniformStorage(() => nextCells);
  let w = uniformInt(() => W);
  let h = uniformInt(() => H);
  let x = index.x;
  let y = index.y;

  let n = 0;
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (dx != 0 || dy != 0) {
        let nx = (x + dx + w) % w;
        let ny = (y + dy + h) % h;
        n += current[ny * w + nx];
      }
    }
  }

  let alive = current[y * w + x];
  let nextOutput = 0;
  if (alive == 1) {
    if (n == 2 || n == 3) {
      nextOutput = 1;
    }
  } else {
    if (n == 3) {
      nextOutput = 1;
    }
  }
  next[y * w + x] = nextOutput;
}

function display() {
  let data = uniformStorage(() => cells);
  let w = uniformInt(() => W);
  let h = uniformInt(() => H);

  filterColor.begin();
  let x = floor(filterColor.texCoord.x * w);
  let y = floor(filterColor.texCoord.y * h);
  let alive = data[y * w + x];
  filterColor.set([alive, alive, alive, 1]);
  filterColor.end();
}

function draw() {
  compute(gameShader, W, H);
  [nextCells, cells] = [cells, nextCells];
  filter(displayShader);
}
```

### Since RC.1

Since initial release candidate, some refactors and bugfixes have been made to p5.strands: 

* Refactor: Extract transpilation passes and callback generation from transpileStrandsToJS by @LalitNarayanYadav in https://github.com/processing/p5.js/pull/8782
* Make sure all p5.strands math operators are converted to strands nodes by @davepagurek in https://github.com/processing/p5.js/pull/8785
* Make line shader hooks use unmultiplied alpha by @davepagurek in https://github.com/processing/p5.js/pull/8787
* Fix #8756: Allow computed array indexing on non-storage vectors by @SOUMITRO-SAHA in https://github.com/processing/p5.js/pull/8768
* Don't use push(...arr) in GeometryBuilder for long vertex arrays by @davepagurek in https://github.com/processing/p5.js/pull/8789
* Fixes for filters on p5.Graphics by @davepagurek in https://github.com/processing/p5.js/pull/8792
* Fix p5.strands hook params clashing with user uniform names by @davepagurek in https://github.com/processing/p5.js/pull/8793
* docs: add iframe accessible name guidance to style guide by @Xavrir in https://github.com/processing/p5.js/pull/8653
* docs: add documentation for mix() method in p5.strands by @Anshumancanrock in https://github.com/processing/p5.js/pull/8463
* adding-missing-doubleClicked-handler by @perminder-17 in https://github.com/processing/p5.js/pull/8799
* harden github actions by @perminder-17 in https://github.com/processing/p5.js/pull/8650

Find more detailed commits in [previous RC release notes](https://github.com/processing/p5.js/releases/tag/v2.3.0-rc.1)

**Full Changelog**: https://github.com/processing/p5.js/compare/v2.3.0-rc.3...v2.3.0-rc.4

## v2.3.0-rc.3 — 2026-05-12 (prerelease)

<!-- Release notes generated using configuration in .github/release.yml at v2.3.0-rc.3 -->

## Testers Wanted 💚 

This is a **release candidate** (RC), which means it is not yet live on the p5.js Editor. Please help us to improve the stability of the newest version of p5.js by trying out this release candidate, and reporting bugs.

**To help with testing, you can use this [starter sketch](https://editor.p5js.org/ksen0/sketches/cnTFvcqYz)**!

Or load both p5.js and WebGPU mode by adding these two script tags to your sketch:

```html
<script src="https://cdn.jsdelivr.net/npm/p5@2.3.0-rc.3/lib/p5.js"></script>
<script src="https://cdn.jsdelivr.net/npm/p5@2.3.0-rc.3/lib/p5.webgpu.js"></script>
```

Then load WebGPU mode in `createCanvas` - **note the `async/await`**, this is needed for WebGPU but not WebGL:
```js
async function setup() {
  await createCanvas(400, 400, WEBGPU);
}
```

### What's Changed 🎊

Work since 2.2.3 has focused on graphics and stabilization, including on version p5.Vector. In version 1, it was common to use `createVector()` which would create a three-dimensional vector at `(0, 0, 0)`. In version 2, empty vectors should be made with `createVector(0, 0)` or `createVector(0, 0, 0)`, to make clear when it is two or three dimensional. This is because version 2 supports vectors of different dimensions, although usages are still related to graphics and require 3D vectors.

We've also introduced some workflow improvements to support testing new contributions, including the @p5js-bot - look for this comment on any Pull Request, and use the CDN link in test sketches to help with review:

<img width="400" alt="GitHub commend with CDN link" src="https://github.com/user-attachments/assets/eb3b7f3e-25d8-415a-a04d-ea830629d731" />

On graphics, we have continued to work on [beginner-friendly shader programming API](https://media.ccc.de/v/lgm-2026-110664-beginner-friendly-shader-programming-in-p5-js-v2) features (p5.strands), as well as the [experimental WebGPU renderer](https://beta.p5js.org/contribute/webgpu/).

This minor release includes exciting additions by the growing p5.strands contributor community:

* filter shaders are supported on 2D sketches, thanks to @LalitNarayanYadav 
* `random()` and `randomSeed()` is available in p5.strands code, thanks to @perminder-17 
* `map()` is available in p5.strands code, thanks to @Nixxx19  
* `lerp()` and `instanceID()` are more consistently supported, thanks to @aashu2006
* more helpful error messages, thanks to @kushal1061
* corrected TypeScript typing, thanks to @Kathrina-dev
* simple shader materials can be written much easier, using only `finalColor` hook thanks to @YuktiNandwana

Here is an example `p5.js` sketch using `p5.strands`, with the noise-based texture:

```js
let myShader;
function setup() {
  createCanvas(400, 400, WEBGL);
  myShader = buildMaterialShader(myShaderBuilder);
}
function myShaderBuilder(){
  finalColor.begin();
  let coord = finalColor.texCoord;
  finalColor.set(noise(coord.x, coord.y));
  finalColor.end();
}

function draw() {
  stroke(255);
  background("#f1678e");
  shader(myShader);
  orbitControl();
  box(100);
}
```

<img width="321" height="305" alt="Cloudy cube against a pink background" src="https://github.com/user-attachments/assets/0830d2f0-e910-4a20-8ddc-b01fd3e5396f" />

The p5.strands code has also been refactored and simplified, which will make maintenance and contribution easier in the future, thanks to @davepagurek and @LalitNarayanYadav! Finally, p5.strands, used with the experimental `WebGPU` renderer, now supports compute shaders, thanks to work by @davepagurek, @aashu2006, and @SOUMITRO-SAHA. For example, below is code for a Game of Life simulation, written by @davepagurek. This uses compute shaders (compare the code to the [non-shader example here\(https://beta.p5js.org/examples/math-and-physics-game-of-life/).)

```js
// noprotect
// Authored by Dave Pagurek to demonstrate using WebGPU compute shaders

let cells;
let nextCells;
let gameShader;
let displayShader;
let W = 0;
let H = 0;

async function setup() {
  W = 100;
  H = 100;
  await createCanvas(100, 100, WEBGPU);
  pixelDensity(1);

  let initial = new Float32Array(W * H);
  for (let i = 0; i < initial.length; i++) {
    initial[i] = random() > 0.7 ? 1 : 0;
  }
  cells = createStorage(initial);
  nextCells = createStorage(W * H);

  gameShader = buildComputeShader(simulate);
  displayShader = buildFilterShader(display);
}

function simulate() {
  let current = uniformStorage(() => cells);
  let next = uniformStorage(() => nextCells);
  let w = uniformInt(() => W);
  let h = uniformInt(() => H);
  let x = index.x;
  let y = index.y;

  let n = 0;
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (dx != 0 || dy != 0) {
        let nx = (x + dx + w) % w;
        let ny = (y + dy + h) % h;
        n += current[ny * w + nx];
      }
    }
  }

  let alive = current[y * w + x];
  let nextOutput = 0;
  if (alive == 1) {
    if (n == 2 || n == 3) {
      nextOutput = 1;
    }
  } else {
    if (n == 3) {
      nextOutput = 1;
    }
  }
  next[y * w + x] = nextOutput;
}

function display() {
  let data = uniformStorage(() => cells);
  let w = uniformInt(() => W);
  let h = uniformInt(() => H);

  filterColor.begin();
  let x = floor(filterColor.texCoord.x * w);
  let y = floor(filterColor.texCoord.y * h);
  let alive = data[y * w + x];
  filterColor.set([alive, alive, alive, 1]);
  filterColor.end();
}

function draw() {
  compute(gameShader, W, H);
  [nextCells, cells] = [cells, nextCells];
  filter(displayShader);
}
```

### Since RC.1

Since previous release candidate, some refactors and bugfixes have been made to p5.strands: 
* Refactor: Extract transpilation passes and callback generation from transpileStrandsToJS by @LalitNarayanYadav in https://github.com/processing/p5.js/pull/8782
* Make sure all p5.strands math operators are converted to strands nodes by @davepagurek in https://github.com/processing/p5.js/pull/8785
* Make line shader hooks use unmultiplied alpha by @davepagurek in https://github.com/processing/p5.js/pull/8787
* Fix #8756: Allow computed array indexing on non-storage vectors by @SOUMITRO-SAHA in https://github.com/processing/p5.js/pull/8768

Find more detailed commits in [previous RC release notes](https://github.com/processing/p5.js/releases/tag/v2.3.0-rc.1)

## New Contributors
* @SOUMITRO-SAHA made their first contribution in https://github.com/processing/p5.js/pull/8768

**Full Changelog**: https://github.com/processing/p5.js/compare/v2.3.0-rc.2...v2.3.0-rc.3

## v2.3.0-rc.2 — 2026-05-12 (prerelease)

<!-- Release notes generated using configuration in .github/release.yml at v2.3.0-rc.2 -->

## What's Changed

This is a **release candidate** (RC), which means it is not yet live on the p5.js Editor. Please help us to improve the stability of the newest version of p5.js by trying out this release candidate, and reporting bugs.

**To help with testing, you can use this [starter sketch](https://editor.p5js.org/ksen0/sketches/cnTFvcqYz)**!

Or load both p5.js and WebGPU mode by adding these two script tags to your sketch:

```html
<script src="https://cdn.jsdelivr.net/npm/p5@2.3.0-rc.2/lib/p5.js"></script>
<script src="https://cdn.jsdelivr.net/npm/p5@2.3.0-rc.2/lib/p5.webgpu.js"></script>
```

Then load WebGPU mode in `createCanvas` - **note the `async/await`**, this is needed for WebGPU but not WebGL:
```js
async function setup() {
  await createCanvas(400, 400, WEBGPU);
}
```

### What's Changed 🎊

Work since 2.2.3 has focused on graphics and stabilization, including on version p5.Vector. In version 1, it was common to use `createVector()` which would create a three-dimensional vector at `(0, 0, 0)`. In version 2, empty vectors should be made with `createVector(0, 0)` or `createVector(0, 0, 0)`, to make clear when it is two or three dimensional. This is because version 2 supports vectors of different dimensions, although usages are still related to graphics and require 3D vectors.

We've also introduced some workflow improvements to support testing new contributions, including the @p5js-bot - look for this comment on any Pull Request, and use the CDN link in test sketches to help with review:

<img width="400" alt="GitHub commend with CDN link" src="https://github.com/user-attachments/assets/eb3b7f3e-25d8-415a-a04d-ea830629d731" />

On graphics, we have continued to work on [beginner-friendly shader programming API](https://media.ccc.de/v/lgm-2026-110664-beginner-friendly-shader-programming-in-p5-js-v2) features (p5.strands), as well as the [experimental WebGPU renderer](https://beta.p5js.org/contribute/webgpu/).

This minor release includes exciting additions by the growing p5.strands contributor community:

* filter shaders are supported on 2D sketches, thanks to @LalitNarayanYadav 
* `random()` and `randomSeed()` is available in p5.strands code, thanks to @perminder-17 
* `map()` is available in p5.strands code, thanks to @Nixxx19  
* `lerp()` and `instanceID()` are more consistently supported, thanks to @aashu2006
* more helpful error messages, thanks to @kushal1061
* corrected TypeScript typing, thanks to @Kathrina-dev
* simple shader materials can be written much easier, using only `finalColor` hook thanks to @YuktiNandwana

Here is an example `p5.js` sketch using `p5.strands`, with the noise-based texture:

```js
let myShader;
function setup() {
  createCanvas(400, 400, WEBGL);
  myShader = buildMaterialShader(myShaderBuilder);
}
function myShaderBuilder(){
  finalColor.begin();
  let coord = finalColor.texCoord;
  finalColor.set(noise(coord.x, coord.y));
  finalColor.end();
}

function draw() {
  stroke(255);
  background("#f1678e");
  shader(myShader);
  orbitControl();
  box(100);
}
```

<img width="321" height="305" alt="Cloudy cube against a pink background" src="https://github.com/user-attachments/assets/0830d2f0-e910-4a20-8ddc-b01fd3e5396f" />

The p5.strands code has also been refactored and simplified, which will make maintenance and contribution easier in the future, thanks to @davepagurek and @LalitNarayanYadav! Finally, p5.strands, used with the experimental `WebGPU` renderer, now supports compute shaders, thanks to @davepagurek and @aashu2006. For example, below is code for a Game of Life simulation, written by @davepagurek. This uses compute shaders (compare the code to the [non-shader example here\(https://beta.p5js.org/examples/math-and-physics-game-of-life/).)

```js
// noprotect
// Authored by Dave Pagurek to demonstrate an WebGPU compute shaders

let cells;
let nextCells;
let gameShader;
let displayShader;
let W = 0;
let H = 0;

async function setup() {
  W = 100;
  H = 100;
  await createCanvas(100, 100, WEBGPU);
  pixelDensity(1);

  let initial = new Float32Array(W * H);
  for (let i = 0; i < initial.length; i++) {
    initial[i] = random() > 0.7 ? 1 : 0;
  }
  cells = createStorage(initial);
  nextCells = createStorage(W * H);

  gameShader = buildComputeShader(simulate);
  displayShader = buildFilterShader(display);
}

function simulate() {
  let current = uniformStorage(() => cells);
  let next = uniformStorage(() => nextCells);
  let w = uniformInt(() => W);
  let h = uniformInt(() => H);
  let x = index.x;
  let y = index.y;

  let n = 0;
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (dx != 0 || dy != 0) {
        let nx = (x + dx + w) % w;
        let ny = (y + dy + h) % h;
        n += current[ny * w + nx];
      }
    }
  }

  let alive = current[y * w + x];
  let nextOutput = 0;
  if (alive == 1) {
    if (n == 2 || n == 3) {
      nextOutput = 1;
    }
  } else {
    if (n == 3) {
      nextOutput = 1;
    }
  }
  next[y * w + x] = nextOutput;
}

function display() {
  let data = uniformStorage(() => cells);
  let w = uniformInt(() => W);
  let h = uniformInt(() => H);

  filterColor.begin();
  let x = floor(filterColor.texCoord.x * w);
  let y = floor(filterColor.texCoord.y * h);
  let alive = data[y * w + x];
  filterColor.set([alive, alive, alive, 1]);
  filterColor.end();
}

function draw() {
  compute(gameShader, W, H);
  [nextCells, cells] = [cells, nextCells];
  filter(displayShader);
}
```



### Since RC.1

Since previous release candidate, some refactors and bugfixes have been made to p5.strands: 
* Refactor: Extract transpilation passes and callback generation from transpileStrandsToJS by @LalitNarayanYadav in https://github.com/processing/p5.js/pull/8782
* Make sure all p5.strands math operators are converted to strands nodes by @davepagurek in https://github.com/processing/p5.js/pull/8785
* Make line shader hooks use unmultiplied alpha by @davepagurek in https://github.com/processing/p5.js/pull/8787

Find more detailed commits in [previous RC release notes](https://github.com/processing/p5.js/releases/tag/v2.3.0-rc.1)

**Full Changelog**: https://github.com/processing/p5.js/compare/v2.3.0-rc.1...v2.3.0-rc.2

## v2.3.0-rc.1 — 2026-05-11 (prerelease)

<!-- Release notes generated using configuration in .github/release.yml at v2.3.0-rc.1 -->

## Testers Wanted 💚 

This is a **release candidate** (RC), which means it is not yet live on the p5.js Editor. Please help us to improve the stability of the newest version of p5.js by trying out this release candidate, and reporting bugs.

**To help with testing, you can use this [starter sketch](https://editor.p5js.org/ksen0/sketches/cnTFvcqYz)**!

Or load both p5.js and WebGPU mode by adding these two script tags to your sketch:

```html
<script src="https://cdn.jsdelivr.net/npm/p5@2.3.0-rc.1/lib/p5.js"></script>
<script src="https://cdn.jsdelivr.net/npm/p5@2.3.0-rc.1/lib/p5.webgpu.js"></script>
```

Then load WebGPU mode in `createCanvas` - **note the `async/await`**, this is needed for WebGPU but not WebGL:
```js
async function setup() {
  await createCanvas(400, 400, WEBGPU);
}
```
## What's Changed 🎊

Work since 2.2.3 has focused on graphics and stabilization, including on version p5.Vector. In version 1, it was common to use `createVector()` which would create a three-dimensional vector at `(0, 0, 0)`. In version 2, empty vectors should be made with `createVector(0, 0)` or `createVector(0, 0, 0)`, to make clear when it is two or three dimensional. This is because version 2 supports vectors of different dimensions, although usages are still related to graphics and require 3D vectors.

We've also introduced some workflow improvements to support testing new contributions, including the @p5js-bot - look for this comment on any Pull Request, and use the CDN link in test sketches to help with review:

<img width="400" alt="GitHub commend with CDN link" src="https://github.com/user-attachments/assets/eb3b7f3e-25d8-415a-a04d-ea830629d731" />

On graphics, we have continued to work on [beginner-friendly shader programming API](https://media.ccc.de/v/lgm-2026-110664-beginner-friendly-shader-programming-in-p5-js-v2) features (p5.strands), as well as the [experimental WebGPU renderer](https://beta.p5js.org/contribute/webgpu/).

This minor release includes exciting additions by the growing p5.strands contributor community:

* filter shaders are supported on 2D sketches, thanks to @LalitNarayanYadav 
* `random()` and `randomSeed()` is available in p5.strands code, thanks to @perminder-17 
* `map()` is available in p5.strands code, thanks to @Nixxx19  
* `lerp()` and `instandceID()` are more consistently supported, thanks to @aashu2006
* more helpful error messages, thanks to @kushal1061
* corrected TypeScript typing, thanks to @Kathrina-dev
* simple shader materials can be written much easier, using only `finalColor` hook thanks to @YuktiNandwana

Here is an example `p5.js` sketch using `p5.strands`, with the noise-based texture:

```js
let myShader;
function setup() {
  createCanvas(400, 400, WEBGL);
  myShader = buildMaterialShader(myShaderBuilder);
}
function myShaderBuilder(){
  finalColor.begin();
  let coord = finalColor.texCoord;
  finalColor.set(noise(coord.x, coord.y));
  finalColor.end();
}

function draw() {
  stroke(255);
  background("#f1678e");
  shader(myShader);
  orbitControl();
  box(100);
}
```

<img width="321" height="305" alt="Cloudy cube against a pink background" src="https://github.com/user-attachments/assets/0830d2f0-e910-4a20-8ddc-b01fd3e5396f" />

The p5.strands code has also been refactored and simplified, which will make maintenance and contribution easier in the future, thanks to @davepagurek and @LalitNarayanYadav! Finally, p5.strands, used with the experimental `WebGPU` renderer, now supports compute shaders, thanks to @davepagurek and @aashu2006. For example, below is code for a Game of Life simulation, written by @davepagurek. This uses compute shaders (compare the code to the [non-shader example here\(https://beta.p5js.org/examples/math-and-physics-game-of-life/).)

```js
// noprotect
// Authored by Dave Pagurek to demonstrate an WebGPU compute shaders

let cells;
let nextCells;
let gameShader;
let displayShader;
let W = 0;
let H = 0;

async function setup() {
  W = 100;
  H = 100;
  await createCanvas(100, 100, WEBGPU);
  pixelDensity(1);

  let initial = new Float32Array(W * H);
  for (let i = 0; i < initial.length; i++) {
    initial[i] = random() > 0.7 ? 1 : 0;
  }
  cells = createStorage(initial);
  nextCells = createStorage(W * H);

  gameShader = buildComputeShader(simulate);
  displayShader = buildFilterShader(display);
}

function simulate() {
  let current = uniformStorage(() => cells);
  let next = uniformStorage(() => nextCells);
  let w = uniformInt(() => W);
  let h = uniformInt(() => H);
  let x = index.x;
  let y = index.y;

  let n = 0;
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (dx != 0 || dy != 0) {
        let nx = (x + dx + w) % w;
        let ny = (y + dy + h) % h;
        n += current[ny * w + nx];
      }
    }
  }

  let alive = current[y * w + x];
  let nextOutput = 0;
  if (alive == 1) {
    if (n == 2 || n == 3) {
      nextOutput = 1;
    }
  } else {
    if (n == 3) {
      nextOutput = 1;
    }
  }
  next[y * w + x] = nextOutput;
}

function display() {
  let data = uniformStorage(() => cells);
  let w = uniformInt(() => W);
  let h = uniformInt(() => H);

  filterColor.begin();
  let x = floor(filterColor.texCoord.x * w);
  let y = floor(filterColor.texCoord.y * h);
  let alive = data[y * w + x];
  filterColor.set([alive, alive, alive, 1]);
  filterColor.end();
}

function draw() {
  compute(gameShader, W, H);
  [nextCells, cells] = [cells, nextCells];
  filter(displayShader);
}
```



### p5.strands and WebGPU
* Fix: restore lerp alias to GLSL mix in p5.strands by @aashu2006 in https://github.com/processing/p5.js/pull/8681
* Ternary support for p5.strands by @davepagurek in https://github.com/processing/p5.js/pull/8638
* Make instanceID() work in both vertex and fragment shaders by @aashu2006 in https://github.com/processing/p5.js/pull/8695
* Make sure we don't transpile uniform callbacks by @davepagurek in https://github.com/processing/p5.js/pull/8709
* Auto-spread large WebGPU compute dispatches by @aashu2006 in https://github.com/processing/p5.js/pull/8696
* WebGPU compute shaders by @davepagurek in https://github.com/processing/p5.js/pull/8531
* Fix: Add filterColor alias support for 2D filter shaders by @LalitNarayanYadav in https://github.com/processing/p5.js/pull/8699
* Fix swizzle assignment for array element properties in compute shaders by @davepagurek in https://github.com/processing/p5.js/pull/8724
* Fix swizzle assignment for array element properties in compute shaders by @davepagurek in https://github.com/processing/p5.js/pull/8724
* Minor WebGL->WebGPU fixes by @davepagurek in https://github.com/processing/p5.js/pull/8731
* Fix TypeScript typing for filterColor shader hook by @Kathrina-dev in https://github.com/processing/p5.js/pull/8644
* Refactor: Deduplicate BinaryExpression and LogicalExpression transformation logic by @LalitNarayanYadav in https://github.com/processing/p5.js/pull/8741
* feat(webgpu): add read() to p5.StorageBuffer with tests by @aashu2006 in https://github.com/processing/p5.js/pull/8726
* Refactor: Move getNoiseShaderSnippet to strands backend by @LalitNarayanYadav in https://github.com/processing/p5.js/pull/8705
* implementing random function for strands by @perminder-17 in https://github.com/processing/p5.js/pull/8730
* added productive error when loop protection breaks in p5.strands by @kushal1061 in https://github.com/processing/p5.js/pull/8725
* Add StorageBuffer.set(index, value) for single-element GPU updates by @aashu2006 in https://github.com/processing/p5.js/pull/8772
* support map() inside p5.strands shaders by @Nixxx19 in https://github.com/processing/p5.js/pull/8753
* Refactor: Extract shared addCopyingAndReturn helper for control flow transformations by @LalitNarayanYadav in https://github.com/processing/p5.js/pull/8754
* Refactor: Extract replaceIdentifierReferences and remove reliance on `this` in ASTCallbacks by @LalitNarayanYadav in https://github.com/processing/p5.js/pull/8728
* feat(webgl): add texCoord parameter to getFinalColor hook by @YuktiNandwana in https://github.com/processing/p5.js/pull/8706
* Fix/feedback by @davepagurek in https://github.com/processing/p5.js/pull/8704

###  Workflow and Stabilization
* Continuous release with pkg.pr.new and esm.sh by @limzykenneth in https://github.com/processing/p5.js/pull/8603
* Resolves #8278 by @dhowe in https://github.com/processing/p5.js/pull/8328
* Revise p5.js 2.0 Beta Bug Report template by @ksen0 in https://github.com/processing/p5.js/pull/8693
* Add ShapePrimitive support for arcs and ellipses by @VANSH3104 in https://github.com/processing/p5.js/pull/8617
* fix: allow setup() to return Promise<void> for async workflows by @LalitNarayanYadav in https://github.com/processing/p5.js/pull/8700
* fix: gracefully handle mixed-material OBJ models instead of crashing by @Nixxx19 in https://github.com/processing/p5.js/pull/8666
* Use more circular rounding for WebGL rect corners by @davepagurek in https://github.com/processing/p5.js/pull/8743
* Save + restore 2D text canvas context when font is applied in WebGL mode by @davepagurek in https://github.com/processing/p5.js/pull/8747
* Remove canvas style attribute update when changing font weight by @davepagurek in https://github.com/processing/p5.js/pull/8733
* fix: prevent browser freeze when tessellating >50k vertices (dev-2.0) by @Nixxx19 in https://github.com/processing/p5.js/pull/8729
* Fixes for server side usage by @limzykenneth in https://github.com/processing/p5.js/pull/8357
* Make default sketch canvas ID autoincrement by @limzykenneth in https://github.com/processing/p5.js/pull/7836

### Documentation and Friendly Errors
* Docs: Add pipeline overview for transpileStrandsToJS by @LalitNarayanYadav in https://github.com/processing/p5.js/pull/8755
* Reference example typo fix by @limzykenneth in https://github.com/processing/p5.js/pull/8680
* docs: fix typos and grammar in contributor docs by @Xavrir in https://github.com/processing/p5.js/pull/8654
* lf use min() and max() with Infinity or -Infinity, it throws friendly error by @menacingly-coded in https://github.com/processing/p5.js/pull/8389
* Update vector docs to indicate recommended usage by @ksen0 in https://github.com/processing/p5.js/pull/8783
* remove unused `@requires` from all jsdoc by @nbogie in https://github.com/processing/p5.js/pull/8713
* Update RendererGL comments to reflect current state of pixel functions by @davepagurek in https://github.com/processing/p5.js/pull/8738
* docs: remove broken beginGeometry/endGeometry links from buildGeometry reference by @mitre88 in https://github.com/processing/p5.js/pull/8739
* Fix JSDoc typos: widhts → widths, coordniates → coordinates, coordian… by @harshiltewari2004 in https://github.com/processing/p5.js/pull/8757
* Fix: restrict setHeading() to 2D vectors and add friendly error for others by @reshma045 in https://github.com/processing/p5.js/pull/8255
* States tests and rename by @harshiltewari2004 in https://github.com/processing/p5.js/pull/8778
* Refactor p5.Vector to prioritize smaller dimension in binary operations on mismatched-size vectors by @ksen0 in https://github.com/processing/p5.js/pull/8676

## New Contributors
* @Xavrir made their first contribution in https://github.com/processing/p5.js/pull/8654
* @YuktiNandwana made their first contribution in https://github.com/processing/p5.js/pull/8706
* @Kathrina-dev made their first contribution in https://github.com/processing/p5.js/pull/8644
* @mitre88 made their first contribution in https://github.com/processing/p5.js/pull/8739
* @kushal1061 made their first contribution in https://github.com/processing/p5.js/pull/8725

**Full Changelog**: https://github.com/processing/p5.js/compare/v2.2.3...v2.3.0-rc.1

## v1.11.14-rc.0 — 2026-05-04 (prerelease)

<!-- Release notes generated using configuration in .github/release.yml at v1.11.14-rc.0 -->

## What's Changed

This is a **release candidate** (RC), which means it is not yet live on the p5.js Editor. Please help us to improve the stability of the newest version of p5.js by trying out this release candidate, and reporting bugs. **To test this patch, you can use this [starter sketch](https://editor.p5js.org/ksen0/sketches/6avnoSH8F)**.

```html
<script src="https://cdn.jsdelivr.net/npm/p5@1.11.14-rc.0/lib/p5.js"></script>
```

### Code updates
* fix: prevent browser freeze when tessellating >50k vertices (#8219 ) by @Nixxx19 in https://github.com/processing/p5.js/pull/8555

### Workflow updates
* harden GitHub Actions workflows by @perminder-17 in https://github.com/processing/p5.js/pull/8620
* Add WebGPU label to labeler config by @davepagurek in https://github.com/processing/p5.js/pull/8758

### Documentation updates
* docs: add menacingly-coded as a contributor for code by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8714
* chore: update contributors.png from .all-contributorsrc by @p5js-bot in https://github.com/processing/p5.js/pull/8715
* Adding Korean translation steward by @eupthere in https://github.com/processing/p5.js/pull/8708
* chore: update README table from stewards.yml by @github-actions[bot] in https://github.com/processing/p5.js/pull/8727
* docs: add Kathrina-dev as a contributor for code by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8736
* chore: update contributors.png from .all-contributorsrc by @p5js-bot in https://github.com/processing/p5.js/pull/8737
* Fix JSDoc typos:widhts->widths,coordiante->coordinate by @harshiltewari2004 in https://github.com/processing/p5.js/pull/8748
* docs: fix typo in TAU/TWO_PI constant value by @Jianru-Lin in https://github.com/processing/p5.js/pull/8752
* docs: add Jianru-Lin as a contributor for doc by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8763
* chore: update contributors.png from .all-contributorsrc by @p5js-bot in https://github.com/processing/p5.js/pull/8764
* docs: add kushal1061 as a contributor for code by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8765
* chore: update contributors.png from .all-contributorsrc by @p5js-bot in https://github.com/processing/p5.js/pull/8766

## New Contributors
* @eupthere made their first contribution in https://github.com/processing/p5.js/pull/8708
* @Jianru-Lin made their first contribution in https://github.com/processing/p5.js/pull/8752

**Full Changelog**: https://github.com/processing/p5.js/compare/v1.11.13...v1.11.14-rc.0

## v1.11.13 — 2026-04-08

<!-- Release notes generated using configuration in .github/release.yml at v1.11.13 -->

## What's Changed
This patch addresses the [recent regression in point positioning](https://github.com/processing/p5.js/issues/8701).

### What's Changed 🎊
* Update Node.js version from 20 to 22 in workflow by @ksen0 in https://github.com/processing/p5.js/pull/8686
* Add kitlord to stewards.yml with p5.js-web-editor by @ksen0 in https://github.com/processing/p5.js/pull/8687
* chore: update README table from stewards.yml by @p5js-bot in https://github.com/processing/p5.js/pull/8688
* Revise p5.js 2.0 Bug Report template by @ksen0 in https://github.com/processing/p5.js/pull/8692
* fix point() origin bug and stale per-vertex color leak by @perminder-17 in https://github.com/processing/p5.js/pull/8712


**Full Changelog**: https://github.com/processing/p5.js/compare/v1.11.12...v1.11.13

## v1.11.13-rc.0 — 2026-04-08 (prerelease)

<!-- Release notes generated using configuration in .github/release.yml at v1.11.13-rc.0 -->

## What's Changed
This patch addresses the [recent regression in point positioning](https://github.com/processing/p5.js/issues/8701).

### What's Changed 🎊
* Update Node.js version from 20 to 22 in workflow by @ksen0 in https://github.com/processing/p5.js/pull/8686
* Add kitlord to stewards.yml with p5.js-web-editor by @ksen0 in https://github.com/processing/p5.js/pull/8687
* chore: update README table from stewards.yml by @p5js-bot in https://github.com/processing/p5.js/pull/8688
* Revise p5.js 2.0 Bug Report template by @ksen0 in https://github.com/processing/p5.js/pull/8692
* fix point() origin bug and stale per-vertex color leak by @perminder-17 in https://github.com/processing/p5.js/pull/8712


**Full Changelog**: https://github.com/processing/p5.js/compare/v1.11.12...v1.11.13-rc.0

## v1.11.12 — 2026-03-30

<!-- Release notes generated using configuration in .github/release.yml at v1.11.12 -->

## What's Changed

This p5.js v1 release reflects increasing stability of this version. Most of this patch is documentation updates, with a few bugfixes.

This patch also includes some notable updates in the project as a whole:
* @kitlord, @doradocodes, and @Nwakaego-Ego have been added as stewards on p5.js-web-editor and p5.js-website! @doradocodes has also been added to the maintainers team 🎉 
* With extensive input, @SableRaf has [updated our AGENTS.md file](https://github.com/processing/p5.js/pull/8604)
* Thanks to a [PR](https://github.com/processing/p5.js/pull/8466) by @skyash-dev, the project now has a single, reusable [image that includes all 800+ contributors](https://github.com/processing/p5.js/blob/main/contributors.png). This is now also used on the main [Processing Foundation people page](https://processingfoundation.org/people)

### Bugfixes & FES

* fix: background(image) support in WEBGL by @reshma045 in https://github.com/processing/p5.js/pull/8333
* WebGL: Apply per‑vertex stroke color to POINTS by @yugalkaushik in https://github.com/processing/p5.js/pull/8380
* Suppress stroke warnings during buildGeometry by @skyash-dev in https://github.com/processing/p5.js/pull/8411

### Documentation
* Update CONTRIBUTING.md links and add Discord invitation by @RishiAhuja in https://github.com/processing/p5.js/pull/8190
* Docs: fix typos and anchors by @nivanovvv in https://github.com/processing/p5.js/pull/8216
* docs: add nivanovvv as a contributor for doc by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8217
* Add `AGENTS.md` by @SableRaf in https://github.com/processing/p5.js/pull/8194
* Add title to CONTRIBUTORS.md by @davepagurek in https://github.com/processing/p5.js/pull/8233
* docs: add nbogie as a contributor for bug, and code by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8234
* docs: add SoundOfScooting as a contributor for code, and doc by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8242
* Improve Accessibility Guidance for `describe()` Usage (#8101) by @ksen0 in https://github.com/processing/p5.js/pull/8247
* docs: add VANSH3104 as a contributor for code by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8258
* docs: add menacingly-coded as a contributor for doc by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8292
* docs: add Homaid as a contributor for doc by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8298
* Fix zh-Hans reference link by @nivanovvv in https://github.com/processing/p5.js/pull/8275
* docs: add Itsrajsk as a contributor for code by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8306
* Updated point() examples for visible points in main branch.  by @menacingly-coded in https://github.com/processing/p5.js/pull/8305
* Fix JSDoc return type for p5.Vector.cross by @Geethegreat in https://github.com/processing/p5.js/pull/8336
* docs: add Geethegreat as a contributor for code by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8347
* docs: add Piyushrathoree as a contributor for code by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8350
* docs: add Aayushdev18 as a contributor for code by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8362
* Docs/fix broken links by @skyash-dev in https://github.com/processing/p5.js/pull/8399
* docs: add rakesh2OO5 as a contributor for code by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8403
* docs: add doradocodes as a contributor for review by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8425
* docs: add Nwakaego-Ego as a contributor for review by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8427
* docs: add vietnguyen2358 as a contributor for code by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8432
* feat: add accTitle/accDescr to class diagram in WebGL architecture doc by @coseeian in https://github.com/processing/p5.js/pull/8373
* docs: add shuklaaryan367-byte as a contributor for code by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8433
* Add Nwakaego-Ego and doradocodes to stewards.yml by @ksen0 in https://github.com/processing/p5.js/pull/8460
* chore: update README table from stewards.yml by @ksen0 in https://github.com/processing/p5.js/pull/8461
* docs: add avinxshKD as a contributor for code by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8483
* Add Iron-56 as p5.js-web-editor steward by @kitlord in https://github.com/processing/p5.js/pull/8486
* chore: update README table from stewards.yml by @ksen0 in https://github.com/processing/p5.js/pull/8488
* docs: add aashu2006 as a contributor for doc by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8452
* Remove deprecated, unmaintained vscode extension "npm" from recommendations (main) by @nbogie in https://github.com/processing/p5.js/pull/8498
* Improve WebGL font error message to suggest textFont() usage by @yugalkaushik in https://github.com/processing/p5.js/pull/8494
* Fix WebGL shader and texture memory leak on sketch removal by @Sanchit2662 in https://github.com/processing/p5.js/pull/8418
* docs: add Sanchit2662 as a contributor for code by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8503
* docs: add LuLaValva as a contributor for bug, and code by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8511
* Add support for negative vertex indices in OBJ loader by @avinxshKD in https://github.com/processing/p5.js/pull/8507
* docs: add saurabh24thakur as a contributor for code, and test by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8524
* Fix typo in createCanvas() reference example by @kajal-jotwani in https://github.com/processing/p5.js/pull/8527
* feat: generate contributors PNG for README by @skyash-dev in https://github.com/processing/p5.js/pull/8466
* chore: update contributors.png from .all-contributorsrc by @ksen0 in https://github.com/processing/p5.js/pull/8536
* Added p5.js Web Editor as an area for stewardship by @ksen0 in https://github.com/processing/p5.js/pull/8535
* docs: add imrinahru as a contributor for bug, code, and test by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8561
* chore: update contributors.png from .all-contributorsrc by @ksen0 in https://github.com/processing/p5.js/pull/8562
* Add a link to the v2 guide to contributing to the reference by @nbogie in https://github.com/processing/p5.js/pull/8625
* docs: add skyash-dev as a contributor for code by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8455
* docs: add jjnawaaz as a contributor for doc by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8487
* chore: update contributors.png from .all-contributorsrc by @p5js-bot in https://github.com/processing/p5.js/pull/8632
* Update README by @ksen0 in https://github.com/processing/p5.js/pull/8633
* Add doradocodes to Maintainers team by @ksen0 in https://github.com/processing/p5.js/pull/8634
* chore: update README table from stewards.yml by @p5js-bot in https://github.com/processing/p5.js/pull/8635
* [TESTERS NEEDED] Rewrite AGENTS.md with community-first agent guidelines by @SableRaf in https://github.com/processing/p5.js/pull/8604
* Update Discord invite links in p5.js by @Nitin2332 in https://github.com/processing/p5.js/pull/8658
* Update contributor guidelines for issue usage and labels by @ksen0 in https://github.com/processing/p5.js/pull/8656
* docs: add Nitin2332 as a contributor for code by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8657
* chore: update contributors.png from .all-contributorsrc by @p5js-bot in https://github.com/processing/p5.js/pull/8663
* Docs: fix incorrect colorMode() reference links by @mikhailbond1 in https://github.com/processing/p5.js/pull/8683
* docs: add geeta102 as a contributor for bug, and code by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8684
* chore: update contributors.png from .all-contributorsrc by @p5js-bot in https://github.com/processing/p5.js/pull/8685

## New Contributors
* @RishiAhuja made their first contribution in https://github.com/processing/p5.js/pull/8190
* @nivanovvv made their first contribution in https://github.com/processing/p5.js/pull/8216
* @coseeian made their first contribution in https://github.com/processing/p5.js/pull/8373
* @Sanchit2662 made their first contribution in https://github.com/processing/p5.js/pull/8418
* @kajal-jotwani made their first contribution in https://github.com/processing/p5.js/pull/8527
* @p5js-bot made their first contribution in https://github.com/processing/p5.js/pull/8632
* @mikhailbond1 made their first contribution in https://github.com/processing/p5.js/pull/8683

**Full Changelog**: https://github.com/processing/p5.js/compare/v1.11.11...v1.11.12

## v2.2.3 — 2026-03-23

<!-- Release notes generated using configuration in .github/release.yml at v2.2.3 -->

## What's Changed

This patch contains bugfixes, documentation updates, and improvements in developer experience:

1. A [decorator API](https://github.com/processing/p5.js/issues/8334) for further customisation of p5.js by addons without needing to duplicate or directly modify internal implementation. It is already used internally by FES parameter validation and provides a route towards additional accessibility oriented features. It is based on [this proposal](https://github.com/tc39/proposal-decorators). (@limzykenneth)
2. A [fix](https://github.com/processing/p5.js/pull/8353) enabling p5 global-mode typescript use, such as in [this non-trivial example](https://github.com/nbogie/split-wccc-20251119-p5-ts-global) (@nbogie)
3. Extensive update to the [contributor documentation for testing 2.x p5.js reference locally](https://beta.p5js.org/contribute/contributing_to_the_p5js_reference/) (@nbogie)
4. Bugfixes for [p5.strands](https://beta.p5js.org/contribute/p5strands/) and WebGL (@davepagurek and @aashu2006)
5. Other bugfixes, docs updates, and improvement (@avinxshKD , @codervinitjangir, @imrinahru , @MASTERsj01, @Nitin2332)

### Try it out!

**To use this patch, you can use this [starter sketch](https://editor.p5js.org/ksen0/sketches/EYPB947sw)**!

Or load both p5.js and WebGPU mode by adding these two script tags to your sketch:

```html
<script src="https://cdn.jsdelivr.net/npm/p5@2.2.3/lib/p5.js"></script>
<script src="https://cdn.jsdelivr.net/npm/p5@2.2.3/lib/p5.webgpu.js"></script>
```

Then load WebGPU mode in `createCanvas` - **note the `async/await`**, this is needed for WebGPU but not WebGL:
```js
async function setup() {
  await createCanvas(400, 400, WEBGPU);
}
```

If you take any existing sketch, such as from [the intro to strands tutorial](https://beta.p5js.org/tutorials/intro-to-p5-strands/), you can switch from `WEBGL` to `WEBGPU` (`async/await` will be needed!)

Read more about how the WebGPU-based renderer works and where we plan on taking it [here](https://github.com/processing/p5.js/blob/dev-2.0/contributor_docs/webgpu.md)!


### Developer experience
* Implement public decorator API by @limzykenneth in https://github.com/processing/p5.js/pull/8353
* add `export default p5` at end of global.d.ts by @nbogie in https://github.com/processing/p5.js/pull/8299
* fix: replace raw console.log calls with p5._friendlyError across multiple modules (addresses #8621) by @MASTERsj01 in https://github.com/processing/p5.js/pull/8622
* skip FES checks on internal calls by @avinxshKD in https://github.com/processing/p5.js/pull/8517

### Documentation updates
* fix strands filterColor example by @nbogie in https://github.com/processing/p5.js/pull/8569
* Update contributing_to_the_p5js_reference for p5 v2 by @nbogie in https://github.com/processing/p5.js/pull/8462
* change strands examples to use millis() not uniform by @nbogie in https://github.com/processing/p5.js/pull/8648
* Unescape < and > in inline code in docs by @davepagurek in https://github.com/processing/p5.js/pull/8661
* docs: remove deprecated beginGeometry() and endGeometry() references by @codervinitjangir in https://github.com/processing/p5.js/pull/8642
* Update Discord invite links in p5.js dev-2.0 by @Nitin2332 in https://github.com/processing/p5.js/pull/8659
* Sync 2.0 readme with 1.x by @ksen0 in https://github.com/processing/p5.js/pull/8664

### WebGL and p5.strands bugfixes
* Handle booleans used as temp variables in p5.strands by @davepagurek in https://github.com/processing/p5.js/pull/8548
* Fix usage of perspective() with no args by @davepagurek in https://github.com/processing/p5.js/pull/8564
* Avoid unnecessary texture copies and fix flipped webcams in WebGL by @davepagurek in https://github.com/processing/p5.js/pull/8572
* Handle strands set() calls in branches and loops by @davepagurek in https://github.com/processing/p5.js/pull/8576
* Fix filter() crash on createGraphics(WEBGL) by mirroring strands API … by @aashu2006 in https://github.com/processing/p5.js/pull/8568
* Fix a bug where shared strands variables are detected in the wrong spot by @davepagurek in https://github.com/processing/p5.js/pull/8641

### Other bugfixes
* fix: createGraphics inherits pixelDensity from parent sketch. by @imrinahru in https://github.com/processing/p5.js/pull/8558
* Reset mouseIsPressed on window blur by @avinxshKD in https://github.com/processing/p5.js/pull/8559

## New Contributors
* @imrinahru made their first contribution in https://github.com/processing/p5.js/pull/8558
* @MASTERsj01 made their first contribution in https://github.com/processing/p5.js/pull/8622
* @codervinitjangir made their first contribution in https://github.com/processing/p5.js/pull/8642

## Stewards & testers

Thanks to @nbogie @davepagurek for code review and @aashu2006 and @Jatin24062005 for additional support with testing the release candidates 🎉 

**Full Changelog**: https://github.com/processing/p5.js/compare/v2.2.2...v2.2.3

## v1.11.12-rc.2 — 2026-03-30 (prerelease)

<!-- Release notes generated using configuration in .github/release.yml at v1.11.12-rc.2 -->

## What's Changed
### What's Changed 🎊
* [TESTERS NEEDED] Rewrite AGENTS.md with community-first agent guidelines by @SableRaf in https://github.com/processing/p5.js/pull/8604
* Update Discord invite links in p5.js by @Nitin2332 in https://github.com/processing/p5.js/pull/8658
* Update contributor guidelines for issue usage and labels by @ksen0 in https://github.com/processing/p5.js/pull/8656
* docs: add Nitin2332 as a contributor for code by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8657
* chore: update contributors.png from .all-contributorsrc by @p5js-bot in https://github.com/processing/p5.js/pull/8663


**Full Changelog**: https://github.com/processing/p5.js/compare/v1.11.12-rc.1...v1.11.12-rc.2

## v2.2.3-rc.1 — 2026-03-16 (prerelease)

## What's Changed

This is a **release candidate** (RC), which means it is not yet live on the p5.js Editor. Please help us to improve the stability of the newest version of p5.js by trying out this release candidate, and reporting bugs. **To test this patch, you can use this [starter sketch](https://editor.p5js.org/ksen0/sketches/h0kEgpMA-)**.

```html
<script src="https://cdn.jsdelivr.net/npm/p5@2.2.3-rc.1/lib/p5.js"></script>
<script src="https://cdn.jsdelivr.net/npm/p5@2.2.3-rc.1/lib/p5.webgpu.js"></script>
```

### What's Changed 🎊
* Fix a bug where shared strands variables are detected in the wrong spot by @davepagurek in https://github.com/processing/p5.js/pull/8641
* add `export default p5` at end of global.d.ts by @nbogie in https://github.com/processing/p5.js/pull/8299
* change strands examples to use millis() not uniform by @nbogie in https://github.com/processing/p5.js/pull/8648


**Full Changelog**: https://github.com/processing/p5.js/compare/v2.2.3-rc.0...v2.2.3-rc.1

## v2.2.3-rc.0 — 2026-03-10 (prerelease)

<!-- Release notes generated using configuration in .github/release.yml at v2.2.3-rc.0 -->

## What's Changed

This is a **release candidate** (RC), which means it is not yet live on the p5.js Editor. Please help us to improve the stability of the newest version of p5.js by trying out this release candidate, and reporting bugs. **To test this patch, you can use this [starter sketch](https://editor.p5js.org/ksen0/sketches/CUFnQBQYK)**.

```html
<script src="https://cdn.jsdelivr.net/npm/p5@2.2.3-rc.0/lib/p5.js"></script>
<script src="https://cdn.jsdelivr.net/npm/p5@2.2.3-rc.0/lib/p5.webgpu.js"></script>
```

### What's Changed 🎊
* fix: createGraphics inherits pixelDensity from parent sketch. by @imrinahru in https://github.com/processing/p5.js/pull/8558
* Handle booleans used as temp variables in p5.strands by @davepagurek in https://github.com/processing/p5.js/pull/8548
* Fix usage of perspective() with no args by @davepagurek in https://github.com/processing/p5.js/pull/8564
* Implement public decorator API by @limzykenneth in https://github.com/processing/p5.js/pull/8353
* fix strands filterColor example by @nbogie in https://github.com/processing/p5.js/pull/8569
* Reset mouseIsPressed on window blur by @avinxshKD in https://github.com/processing/p5.js/pull/8559
* Avoid unnecessary texture copies and fix flipped webcams in WebGL by @davepagurek in https://github.com/processing/p5.js/pull/8572
* Handle strands set() calls in branches and loops by @davepagurek in https://github.com/processing/p5.js/pull/8576
* Fix filter() crash on createGraphics(WEBGL) by mirroring strands API … by @aashu2006 in https://github.com/processing/p5.js/pull/8568
* skip FES checks on internal calls by @avinxshKD in https://github.com/processing/p5.js/pull/8517
* Update contributing_to_the_p5js_reference for p5 v2 by @nbogie in https://github.com/processing/p5.js/pull/8462

## New Contributors
* @imrinahru made their first contribution in https://github.com/processing/p5.js/pull/8558

**Full Changelog**: https://github.com/processing/p5.js/compare/v2.2.2...v2.2.3-rc.0

## v1.11.12-rc.1 — 2026-03-10

<!-- Release notes generated using configuration in .github/release.yml at v1.11.12-rc.1 -->

## What's Changed 🎊

The next patch will contain various documentation improvements and WEBGL bugfixes. Highlight: the README now contain a single image of all the contributor icons! This allows both visibility and faster loading.

This is a **release candidate** (RC), which means it is not yet live on the p5.js Editor. Please help us to improve the stability of the newest version of p5.js by trying out this release candidate, and reporting bugs. **To test this patch, you can use this [starter sketch](https://editor.p5js.org/ksen0/sketches/TkR0djkae)**!

```html
<script src="https://cdn.jsdelivr.net/npm/p5@1.11.12-rc.1/lib/p5.js"></script>
```

### Bugfixes (WEBGL)
* fix: background(image) support in WEBGL by @reshma045 in https://github.com/processing/p5.js/pull/8333
* Suppress stroke warnings during buildGeometry by @skyash-dev in https://github.com/processing/p5.js/pull/8411
* Fix WebGL shader and texture memory leak on sketch removal by @Sanchit2662 in https://github.com/processing/p5.js/pull/8418
* Add support for negative vertex indices in OBJ loader by @avinxshKD in https://github.com/processing/p5.js/pull/8507
* WebGL: Apply per‑vertex stroke color to POINTS by @yugalkaushik in https://github.com/processing/p5.js/pull/8380

### Docs and Error Messages
* Update CONTRIBUTING.md links and add Discord invitation by @RishiAhuja in https://github.com/processing/p5.js/pull/8190
* Docs: fix typos and anchors by @nivanovvv in https://github.com/processing/p5.js/pull/8216
* docs: add nivanovvv as a contributor for doc by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8217
* Add `AGENTS.md` by @SableRaf in https://github.com/processing/p5.js/pull/8194
* Add title to CONTRIBUTORS.md by @davepagurek in https://github.com/processing/p5.js/pull/8233
* docs: add nbogie as a contributor for bug, and code by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8234
* docs: add SoundOfScooting as a contributor for code, and doc by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8242
* Improve Accessibility Guidance for `describe()` Usage (#8101) by @ksen0 in https://github.com/processing/p5.js/pull/8247
* docs: add VANSH3104 as a contributor for code by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8258
* docs: add menacingly-coded as a contributor for doc by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8292
* docs: add Homaid as a contributor for doc by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8298
* Fix zh-Hans reference link by @nivanovvv in https://github.com/processing/p5.js/pull/8275
* docs: add Itsrajsk as a contributor for code by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8306
* Updated point() examples for visible points in main branch.  by @menacingly-coded in https://github.com/processing/p5.js/pull/8305
* Fix JSDoc return type for p5.Vector.cross by @Geethegreat in https://github.com/processing/p5.js/pull/8336
* docs: add Geethegreat as a contributor for code by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8347
* docs: add Piyushrathoree as a contributor for code by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8350
* docs: add Aayushdev18 as a contributor for code by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8362
* Docs/fix broken links by @skyash-dev in https://github.com/processing/p5.js/pull/8399
* docs: add rakesh2OO5 as a contributor for code by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8403
* docs: add doradocodes as a contributor for review by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8425
* docs: add Nwakaego-Ego as a contributor for review by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8427
* docs: add vietnguyen2358 as a contributor for code by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8432
* feat: add accTitle/accDescr to class diagram in WebGL architecture doc by @coseeian in https://github.com/processing/p5.js/pull/8373
* docs: add shuklaaryan367-byte as a contributor for code by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8433
* Add Nwakaego-Ego and doradocodes to stewards.yml by @ksen0 in https://github.com/processing/p5.js/pull/8460
* chore: update README table from stewards.yml by @ksen0 in https://github.com/processing/p5.js/pull/8461
* docs: add avinxshKD as a contributor for code by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8483
* Add Iron-56 as p5.js-web-editor steward by @Iron-56 in https://github.com/processing/p5.js/pull/8486
* chore: update README table from stewards.yml by @ksen0 in https://github.com/processing/p5.js/pull/8488
* docs: add aashu2006 as a contributor for doc by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8452
* Remove deprecated, unmaintained vscode extension "npm" from recommendations (main) by @nbogie in https://github.com/processing/p5.js/pull/8498
* Improve WebGL font error message to suggest textFont() usage by @yugalkaushik in https://github.com/processing/p5.js/pull/8494
* docs: add Sanchit2662 as a contributor for code by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8503
* docs: add LuLaValva as a contributor for bug, and code by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8511
* docs: add saurabh24thakur as a contributor for code, and test by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8524
* Fix typo in createCanvas() reference example by @kajal-jotwani in https://github.com/processing/p5.js/pull/8527
* feat: generate contributors PNG for README by @skyash-dev in https://github.com/processing/p5.js/pull/8466
* chore: update contributors.png from .all-contributorsrc by @ksen0 in https://github.com/processing/p5.js/pull/8536
* Added p5.js Web Editor as an area for stewardship by @ksen0 in https://github.com/processing/p5.js/pull/8535
* docs: add imrinahru as a contributor for bug, code, and test by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8561
* chore: update contributors.png from .all-contributorsrc by @ksen0 in https://github.com/processing/p5.js/pull/8562
* Add a link to the v2 guide to contributing to the reference by @nbogie in https://github.com/processing/p5.js/pull/8625
* docs: add skyash-dev as a contributor for code by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8455
* docs: add jjnawaaz as a contributor for doc by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8487
* chore: update contributors.png from .all-contributorsrc by @p5js-bot in https://github.com/processing/p5.js/pull/8632
* Update README by @ksen0 in https://github.com/processing/p5.js/pull/8633
* Add doradocodes to Maintainers team by @ksen0 in https://github.com/processing/p5.js/pull/8634
* chore: update README table from stewards.yml by @p5js-bot in https://github.com/processing/p5.js/pull/8635

## New Contributors
* @RishiAhuja made their first contribution in https://github.com/processing/p5.js/pull/8190
* @nivanovvv made their first contribution in https://github.com/processing/p5.js/pull/8216
* @coseeian made their first contribution in https://github.com/processing/p5.js/pull/8373
* @Sanchit2662 made their first contribution in https://github.com/processing/p5.js/pull/8418
* @kajal-jotwani made their first contribution in https://github.com/processing/p5.js/pull/8527
* @p5js-bot made their first contribution in https://github.com/processing/p5.js/pull/8632

**Full Changelog**: https://github.com/processing/p5.js/compare/v1.11.11...v1.11.12-rc.1

## v2.2.2 — 2026-02-22

<!-- Release notes generated using configuration in .github/release.yml at v2.2.2 -->

## What's Changed

This patch focuses on bugfixes, particularly on WebGPU performance and p5.strands. The goal is that all p5.strands shaders work with both WebGPU and WebGL canvases. This patch also adds `millis()` support inside strands code.

**To use this patch, you can use this [starter sketch](https://editor.p5js.org/ksen0/sketches/GSqWCzDFi)**!

Or load both p5.js and WebGPU mode by adding these two script tags to your sketch:

```html
<script src="https://cdn.jsdelivr.net/npm/p5@2.2.2/lib/p5.js"></script>
<script src="https://cdn.jsdelivr.net/npm/p5@2.2.2/lib/p5.webgpu.js"></script>
```

Then load WebGPU mode in `createCanvas` - **note the `async/await`**, this is needed for WebGPU but not WebGL:
```js
async function setup() {
  await createCanvas(400, 400, WEBGPU);
}
```

If you take any existing sketch, such as from [the intro to strands tutorial](https://beta.p5js.org/tutorials/intro-to-p5-strands/), iyou can switch from `WEBGL` to `WEBGPU` (`async/await` will be needed!)

Read more about how the WebGPU-based renderer works and where we plan on taking it [here](https://github.com/processing/p5.js/blob/dev-2.0/contributor_docs/webgpu.md)!

### `millis()` supported in p5.strands

Here is a sketch (thanks @perminder-17!) showing `millis()` being used inside a strands shader. Previously, `const t = uniformFloat(() => millis());` was needed. This can still be used, but you can instead use `millis()` directly:
```js
// p5.js (WEBGL) sketch showing millis() driving a wavy displacement
let mat;

function setup() {
  createCanvas(600, 400, WEBGL);
  pixelDensity(1);

  mat = baseMaterialShader().modify(() => {
    // displace geometry in world-space based on y + time
    getWorldInputs((inputs) => {
      const wave = sin(inputs.position.y * 0.05 + millis() * 0.004);
      inputs.position += [20, 25, 20] * wave;
      return inputs;
    });
  });
}

function draw() {
  background(15);
  orbitControl();

  // lights so the material shader looks nice
  ambientLight(40);
  directionalLight(255, 255, 255, 0.3, 0.6, -1);

  // apply the modified material shader + draw some geometry
  shader(mat);
  noStroke();

  // some rotation so you can see the displacement depth
  rotateY(frameCount * 0.01);
  rotateX(-0.25);

  // a tall shape so Y-based waves are obvious
  sphere(120, 80, 60);
}
```

### What does p5.strands make possible?

(Special thanks to @davepagurek for creating the sketches! Excerpted from a blog post about 2.2 updates.)

<img width="200" alt="image" src="https://github.com/user-attachments/assets/406f9dec-6589-42dd-adde-5116fed183dd" alt="A cube shape on a green background, created with smaller white cubes each of slightly different size based on their position" />

First, consider [this sketch](https://editor.p5js.org/davepagurek/sketches/s9l80gISI), which uses JavaScript loops to draw a cube of cubes. It is only 40 lines, but if there are many more cubes, it will slow down very much. If it is running smoothly, try changing all the “15” to a higher and higher number, such as “30.” As the scene grows, the sketch performance will suffer very noticeably.

The purpose of shader is to use parallel, GPU-based computation to speed this up. Instead of for loops, here is [a second version](https://editor.p5js.org/davepagurek/sketches/5iSuJWHIN) of the same sketch using GLSL. It is 200 lines of code, and, if you are not familiar with GLSL, may be very difficult to read. Look for the “15” here, too, and try changing it to a larger number, like “30” or beyond. The shader-based animation remains smooth, showing the performance benefits of GPU rendering.

Finally, [the p5.strands version of this sketch](https://editor.p5js.org/davepagurek/sketches/UfP9NTFYQ) combines a more accessible, readable style of JavaScript with the performance of GLSL. 

With the introduction of the WebGPU-based renderer, p5.strands sketches can seamlessly switch between `WEBGL` or `WEBGPU` renderer. [Here](https://editor.p5js.org/ksen0/sketches/zvbSaPsnN) is the same example as above, but using the WebGPU-based renderer. The only changes needed were to use `async/await` with `createCanvas(...)`, and to import both the main library and the [p5.webgpu.js](http://p5.webgpu.js/) add-on:

```js
    <script src="https://cdn.jsdelivr.net/npm/p5@2.2.2/lib/p5.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/p5@2.2.2/lib/p5.webgpu.js"></script>
```

### All Changes

* Refactor global node handling and add millis function by @perminder-17 in https://github.com/processing/p5.js/pull/8530
* 2.0 strands docs: add simple noise() example for buildFilterShader by @nbogie in https://github.com/processing/p5.js/pull/8521
* Sketch verifier: parse using the latest supported ECMAScript version by @dontwanttothink in https://github.com/processing/p5.js/pull/8522
* Add support for negative vertex indices in OBJ loader for 2.x by @avinxshKD in https://github.com/processing/p5.js/pull/8512
* Fix Show actual type in strands hook error messages by @Anshumancanrock in https://github.com/processing/p5.js/pull/8505
* Improve WebGL font error message to suggest textFont() usage by @yugalkaushik in https://github.com/processing/p5.js/pull/8513
* Fix/webgpu crash pixel density by @saurabh24thakur in https://github.com/processing/p5.js/pull/8476
* Fix WebGPU bugs surfaced by the Intro to Strands tutorial by @davepagurek in https://github.com/processing/p5.js/pull/8538
* Fix build*Shader methods in instance mode by forwarding optional scope by @aashu2006 in https://github.com/processing/p5.js/pull/8523
* Fix broken reference links in lerpColor() documentation (p5.js 2.0) by @rakesh2OO5 in https://github.com/processing/p5.js/pull/8518
* Fix WebGPU filter shader parameters being named differently than in WebGL by @davepagurek in https://github.com/processing/p5.js/pull/8546
* Updated readme and contributors for 2.0 branch by @ksen0 in https://github.com/processing/p5.js/pull/8556
* Updated readme and contributors for 2.0 branch (with attribution for image) by @ksen0 in https://github.com/processing/p5.js/pull/8557

## New Contributors

* @dontwanttothink made their first contribution in https://github.com/processing/p5.js/pull/8522
* @Anshumancanrock made their first contribution in https://github.com/processing/p5.js/pull/8505
* @saurabh24thakur made their first contribution in https://github.com/processing/p5.js/pull/8476

## Stewards

Code review and additional support with testing the release candidates by:

* @davepagurek 
* @nbogie 
* @aashu2006


**Full Changelog**: https://github.com/processing/p5.js/compare/v2.2.1...v2.2.2

## v2.2.2-rc.2 — 2026-02-21 (prerelease)

<!-- Release notes generated using configuration in .github/release.yml at v2.2.2-rc.2 -->

## What's Changed


The upcoming patch focuses on bugfixes and documentation, particularly on strands and WebGPU. Specifically, the goal is that **all strands shaders work with both WebGPU and WebGL canvases**. 

This is a **release candidate** (RC), which means it is not yet live on the p5.js Editor. Please help us to improve the stability of the newest version of p5.js by trying out this release candidate, and reporting bugs. You can also share your thoughts or get involved on Discord in the [#webpgu](https://discord.gg/nmS4v2qw4K) or #p5strands channels!

**To test this patch, you can use this [starter sketch](https://editor.p5js.org/ksen0/sketches/MWHIVtZyt)**!

Or load both p5.js and WebGPU mode by adding these two script tags to your sketch:

```html
<script src="https://cdn.jsdelivr.net/npm/p5@2.2.2-rc.2/lib/p5.js"></script>
<script src="https://cdn.jsdelivr.net/npm/p5@2.2.2-rc.2/lib/p5.webgpu.js"></script>
```

Then load WebGPU mode in `createCanvas` - **note the `async/await`**, this is needed for WebGPU but not WebGL:
```js
async function setup() {
  await createCanvas(400, 400, WEBGPU);
}
```

Read more about how it works and where we plan on taking it [here](https://github.com/processing/p5.js/blob/dev-2.0/contributor_docs/webgpu.md)!


### What's Changed 🎊
* Fix WebGPU filter shader parameters being named differently than in WebGL by @davepagurek in https://github.com/processing/p5.js/pull/8546


**Full Changelog**: https://github.com/processing/p5.js/compare/v2.2.2-rc.1...v2.2.2-rc.2

## v2.2.2-rc.1 — 2026-02-19 (prerelease)

<!-- Release notes generated using configuration in .github/release.yml at v2.2.2-rc.1 -->

## What's Changed

The upcoming patch focuses on bugfixes and documentation, particularly on strands and WebGPU. Specifically, the goal is that **all strands shaders work with both WebGPU and WebGL canvases**. 

This is a **release candidate** (RC), which means it is not yet live on the p5.js Editor. Please help us to improve the stability of the newest version of p5.js by trying out this release candidate, and reporting bugs. You can also share your thoughts or get involved on Discord in the [#webpgu](https://discord.gg/nmS4v2qw4K) or #p5strands channels!

**To test this patch, you can use this [starter sketch](https://editor.p5js.org/neill0/sketches/FUKcq8Jzq)**!

Or load both p5.js and WebGPU mode by adding these two script tags to your sketch:

```html
<script src="https://cdn.jsdelivr.net/npm/p5@2.2.2-rc.1/lib/p5.js"></script>
<script src="https://cdn.jsdelivr.net/npm/p5@2.2.2-rc.1/lib/p5.webgpu.js"></script>
```

Then load WebGPU mode in `createCanvas` - **note the `async/await`**, this is needed for WebGPU but not WebGL:
```js
async function setup() {
  await createCanvas(400, 400, WEBGPU);
}
```

Read more about how it works and where we plan on taking it [here](https://github.com/processing/p5.js/blob/dev-2.0/contributor_docs/webgpu.md)!

### What's Changed 🎊
* Fix broken reference links in lerpColor() documentation (p5.js 2.0) by @rakesh2OO5 in https://github.com/processing/p5.js/pull/8518
* Refactor global node handling and add millis function by @perminder-17 in https://github.com/processing/p5.js/pull/8530


**Full Changelog**: https://github.com/processing/p5.js/compare/v2.2.2-rc.0...v2.2.2-rc.1

## v2.2.2-rc.0 — 2026-02-18 (prerelease)

<!-- Release notes generated using configuration in .github/release.yml at v2.2.2-rc.0 -->

## What's Changed

The upcoming patch focuses on bugfixes and documentation, particularly on strands and WebGPU. Specifically, the goal is that **all strands shaders work with both WebGPU and WebGL canvases**. 

This is a **release candidate** (RC), which means it is not yet live on the p5.js Editor. Please help us to improve the stability of the newest version of p5.js by trying out this release candidate, and reporting bugs. You can also share your thoughts or get involved on Discord in the [#webpgu](https://discord.gg/nmS4v2qw4K) or #p5strands channels!

To test this patch, you can load both p5.js and WebGPU mode by adding these two script tags to your sketch:

```html
<script src="https://cdn.jsdelivr.net/npm/p5@2.2.2-rc.0/lib/p5.js"></script>
<script src="https://cdn.jsdelivr.net/npm/p5@2.2.2-rc.0/lib/p5.webgpu.js"></script>
```

Then load WebGPU mode in `createCanvas` - **note the `async/await`**, this is needed for WebGPU but not WebGL:
```js
async function setup() {
  await createCanvas(400, 400, WEBGPU);
}
```

Read more about how it works and where we plan on taking it [here](https://github.com/processing/p5.js/blob/dev-2.0/contributor_docs/webgpu.md)!

### What's Changed 🎊
* 2.0 strands docs: add simple noise() example for buildFilterShader by @nbogie in https://github.com/processing/p5.js/pull/8521
* Sketch verifier: parse using the latest supported ECMAScript version by @dontwanttothink in https://github.com/processing/p5.js/pull/8522
* Add support for negative vertex indices in OBJ loader for 2.x by @avinxshKD in https://github.com/processing/p5.js/pull/8512
* Fix Show actual type in strands hook error messages by @Anshumancanrock in https://github.com/processing/p5.js/pull/8505
* Improve WebGL font error message to suggest textFont() usage by @yugalkaushik in https://github.com/processing/p5.js/pull/8513
* Fix/webgpu crash pixel density by @saurabh24thakur in https://github.com/processing/p5.js/pull/8476
* Fix WebGPU bugs surfaced by the Intro to Strands tutorial by @davepagurek in https://github.com/processing/p5.js/pull/8538
* Fix build*Shader methods in instance mode by forwarding optional scope by @aashu2006 in https://github.com/processing/p5.js/pull/8523

## New Contributors
* @dontwanttothink made their first contribution in https://github.com/processing/p5.js/pull/8522
* @Anshumancanrock made their first contribution in https://github.com/processing/p5.js/pull/8505
* @saurabh24thakur made their first contribution in https://github.com/processing/p5.js/pull/8476

**Full Changelog**: https://github.com/processing/p5.js/compare/v2.2.1...v2.2.2-rc.0

## v2.2.1 — 2026-02-11

<!-- Release notes generated using configuration in .github/release.yml at v2.2.1 -->

## What's Changed

This patch includes documentation, bugfixes, and dependency updates. A [flatter p5.strands API](https://github.com/processing/p5.js/pull/8314) is also included as part of ongoing incremental strands API.

You can get started with the features in this release using these sketches: 
* [p5 2.2.1 starter/demo with p5.strands buildFilterShader](https://editor.p5js.org/neill0/sketches/LO7V38ZUL) - demonstrates a filter shader using p5.strands
* [p5 2.2.1 starter with WEBGPU](https://editor.p5js.org/neill0/sketches/GRupGwnp1) - the WebGPU mode is new in 2.2, and released experimentally for community testing 

The focus of this patch is performance improvements to WebGPU core add-on. You can load both p5.js and WebGPU mode by adding these two script tags to your sketch:

```html
<script src="https://cdn.jsdelivr.net/npm/p5@2.2.1/lib/p5.js"></script>
<script src="https://cdn.jsdelivr.net/npm/p5@2.2.1/lib/p5.webgpu.js"></script>
```

Then load WebGPU mode in `createCanvas`:
```js
async function setup() {
  await createCanvas(400, 400, WEBGPU);
}
```

Read more about how it works and where we plan on taking it [here](https://github.com/processing/p5.js/blob/dev-2.0/contributor_docs/webgpu.md)!


### What's Changed 🎊
* Fix rotation transformations outside of push/pop applying to main canvas in WebGPU by @davepagurek in https://github.com/processing/p5.js/pull/8423
* Make sure getTexture works in vertex shaders by @davepagurek in https://github.com/processing/p5.js/pull/8424
* Performance improvements for colors by @davepagurek in https://github.com/processing/p5.js/pull/8355
* fix textToModel regression for space characters by @skyash-dev in https://github.com/processing/p5.js/pull/8429
* add unit tests for HSB color space by @Piyushrathoree in https://github.com/processing/p5.js/pull/8376
* Experiment: flatter strands API by @davepagurek in https://github.com/processing/p5.js/pull/8314
* Auto return shader hooks by @vietnguyen2358 in https://github.com/processing/p5.js/pull/8384
* Fix `noiseDetail()` in p5.js 2.x so that the `falloff` parameter defaults to `0.5` when omitted. by @shuklaaryan367-byte in https://github.com/processing/p5.js/pull/8417
* Normalize strands noise output range to match JS noise() by @rakesh2OO5 in https://github.com/processing/p5.js/pull/8430
* fix  createColorPicker ignores initial colour arg on chrome by @Piyushrathoree in https://github.com/processing/p5.js/pull/8363
* Add WebGL visual regression tests for transform functions by @aashu2006 in https://github.com/processing/p5.js/pull/8465
* Fix gifs in WebGL mode by @davepagurek in https://github.com/processing/p5.js/pull/8472
* feat(webgl): add global property support for p5.strands by @avinxshKD in https://github.com/processing/p5.js/pull/8211
* Webgpu perf updates by @davepagurek in https://github.com/processing/p5.js/pull/8480
* docs(p5.strands): document smoothstep by @jjnawaaz in https://github.com/processing/p5.js/pull/8459
* gitignore vscode local.code-workspace allowing users project-specific overrides by @nbogie in https://github.com/processing/p5.js/pull/8479
* fix(webgl): normalize nearly identical vertices before tessellation by @avinxshKD in https://github.com/processing/p5.js/pull/8221
* Remove deprecated, unmaintained vscode extension "npm" from recommendations by @nbogie in https://github.com/processing/p5.js/pull/8497
* Use --shallow in doc build to prevent documentation.js from processing GLSL imports by @nbogie in https://github.com/processing/p5.js/pull/8500
* Dependencies updates by @limzykenneth in https://github.com/processing/p5.js/pull/8360
* Add visual regression tests for WebGL 3D primitives by @aashu2006 in https://github.com/processing/p5.js/pull/8485
* Add transform support to bezier shapes in clip() by @VANSH3104 in https://github.com/processing/p5.js/pull/8481
* Fix instance mode usage of uniformFloat() in shader.modify() example by @aashu2006 in https://github.com/processing/p5.js/pull/8470
* More performance updates for WebGPU mode by @davepagurek in https://github.com/processing/p5.js/pull/8502
* More WebGPU optimizations by @davepagurek in https://github.com/processing/p5.js/pull/8510
* fix: use `@chainable` per-overload by @LuLaValva in https://github.com/processing/p5.js/pull/8504
* add getTexture docs and examples for p5.strands by @nbogie in https://github.com/processing/p5.js/pull/8446

## New Contributors
* @vietnguyen2358 made their first contribution in https://github.com/processing/p5.js/pull/8384
* @shuklaaryan367-byte made their first contribution in https://github.com/processing/p5.js/pull/8417
* @rakesh2OO5 made their first contribution in https://github.com/processing/p5.js/pull/8430
* @aashu2006 made their first contribution in https://github.com/processing/p5.js/pull/8465
* @jjnawaaz made their first contribution in https://github.com/processing/p5.js/pull/8459
* @LuLaValva made their first contribution in https://github.com/processing/p5.js/pull/8504

## Stewards

This patch was [stewarded](https://p5js.org/contribute/steward_guidelines/) (through code review, comments, and discussion) by 
@davepagurek  
@limzykenneth
@nbogie
@perminder-17
@ksen0

**Full Changelog**: https://github.com/processing/p5.js/compare/v2.2.0...v2.2.1

## v2.2.1-rc.1 — 2026-02-10 (prerelease)

<!-- Release notes generated using configuration in .github/release.yml at v2.2.1-rc.1 -->

## What's Changed
### What's Changed 🎊
* docs(p5.strands): document smoothstep by @jjnawaaz in https://github.com/processing/p5.js/pull/8459
* gitignore vscode local.code-workspace allowing users project-specific overrides by @nbogie in https://github.com/processing/p5.js/pull/8479
* fix(webgl): normalize nearly identical vertices before tessellation by @avinxshKD in https://github.com/processing/p5.js/pull/8221
* Remove deprecated, unmaintained vscode extension "npm" from recommendations by @nbogie in https://github.com/processing/p5.js/pull/8497
* Use --shallow in doc build to prevent documentation.js from processing GLSL imports by @nbogie in https://github.com/processing/p5.js/pull/8500
* Dependencies updates by @limzykenneth in https://github.com/processing/p5.js/pull/8360
* Add visual regression tests for WebGL 3D primitives by @aashu2006 in https://github.com/processing/p5.js/pull/8485
* Add transform support to bezier shapes in clip() by @VANSH3104 in https://github.com/processing/p5.js/pull/8481
* Fix instance mode usage of uniformFloat() in shader.modify() example by @aashu2006 in https://github.com/processing/p5.js/pull/8470
* More performance updates for WebGPU mode by @davepagurek in https://github.com/processing/p5.js/pull/8502
* More WebGPU optimizations by @davepagurek in https://github.com/processing/p5.js/pull/8510
* fix: use `@chainable` per-overload by @LuLaValva in https://github.com/processing/p5.js/pull/8504
* add getTexture docs and examples for p5.strands by @nbogie in https://github.com/processing/p5.js/pull/8446

## New Contributors
* @jjnawaaz made their first contribution in https://github.com/processing/p5.js/pull/8459
* @LuLaValva made their first contribution in https://github.com/processing/p5.js/pull/8504

**Full Changelog**: https://github.com/processing/p5.js/compare/v2.2.1-rc.0...v2.2.1-rc.1

## v2.2.1-rc.0 — 2026-02-01 (prerelease)

<!-- Release notes generated using configuration in .github/release.yml at v2.2.1-rc.0 -->

## What's Changed

The upcoming patch focuses on bugfixes and documentation, particularly on WebGPU and strands. This is a **release candidate** (RC), which means it is not yet live on the p5.js Editor. Please help us to improve the stability of the newest version of p5.js by trying out this release candidate, and reporting bugs. You can also share your thoughts or get involved on Discord in the [#webpgu](https://discord.gg/nmS4v2qw4K) channel!

To test this patch, you can load both p5.js and WebGPU mode by adding these two script tags to your sketch:

```html
<script src="https://cdn.jsdelivr.net/npm/p5@2.2.1-rc.0/lib/p5.js"></script>
<script src="https://cdn.jsdelivr.net/npm/p5@2.2.1-rc.0/lib/p5.webgpu.js"></script>
```

Then load WebGPU mode in `createCanvas`:
```js
async function setup() {
  await createCanvas(400, 400, WEBGPU);
}
```

Read more about how it works and where we plan on taking it [here](https://github.com/processing/p5.js/blob/dev-2.0/contributor_docs/webgpu.md)!


### What's Changed 🎊
* Fix rotation transformations outside of push/pop applying to main canvas in WebGPU by @davepagurek in https://github.com/processing/p5.js/pull/8423
* Make sure getTexture works in vertex shaders by @davepagurek in https://github.com/processing/p5.js/pull/8424
* Performance improvements for colors by @davepagurek in https://github.com/processing/p5.js/pull/8355
* fix textToModel regression for space characters by @skyash-dev in https://github.com/processing/p5.js/pull/8429
* add unit tests for HSB color space by @Piyushrathoree in https://github.com/processing/p5.js/pull/8376
* Experiment: flatter strands API by @davepagurek in https://github.com/processing/p5.js/pull/8314
* Auto return shader hooks by @vietnguyen2358 in https://github.com/processing/p5.js/pull/8384
* Fix `noiseDetail()` in p5.js 2.x so that the `falloff` parameter defaults to `0.5` when omitted. by @shuklaaryan367-byte in https://github.com/processing/p5.js/pull/8417
* Normalize strands noise output range to match JS noise() by @rakesh2OO5 in https://github.com/processing/p5.js/pull/8430
* fix  createColorPicker ignores initial colour arg on chrome by @Piyushrathoree in https://github.com/processing/p5.js/pull/8363
* Add WebGL visual regression tests for transform functions by @aashu2006 in https://github.com/processing/p5.js/pull/8465
* Fix gifs in WebGL mode by @davepagurek in https://github.com/processing/p5.js/pull/8472
* feat(webgl): add global property support for p5.strands by @avinxshKD in https://github.com/processing/p5.js/pull/8211
* Webgpu perf updates by @davepagurek in https://github.com/processing/p5.js/pull/8480

## New Contributors
* @vietnguyen2358 made their first contribution in https://github.com/processing/p5.js/pull/8384
* @shuklaaryan367-byte made their first contribution in https://github.com/processing/p5.js/pull/8417
* @rakesh2OO5 made their first contribution in https://github.com/processing/p5.js/pull/8430
* @aashu2006 made their first contribution in https://github.com/processing/p5.js/pull/8465
* @avinxshKD made their first contribution in https://github.com/processing/p5.js/pull/8211

**Full Changelog**: https://github.com/processing/p5.js/compare/v2.2.0...v2.2.1-rc.0

## v2.2.0 — 2026-01-14

<!-- Release notes generated using configuration in .github/release.yml at v2.2.0 -->

## 2.2: WebGPU and bugfixes

The `2.2` minor release contains work on WebGPU rendering that has been going on over the past year!  WebGPU mode is included in a core add-on now. This release also contains a number of improvements in documentation and p5.strands bugfixes.

To load both p5.js and WebGPU mode, add these two script tags to your sketch:

```html
<script src="https://cdn.jsdelivr.net/npm/p5@2.2.0/lib/p5.js"></script>
<script src="https://cdn.jsdelivr.net/npm/p5@2.2.0/lib/p5.webgpu.js"></script>
```

Then load WebGPU mode in `createCanvas`:
```js
async function setup() {
  await createCanvas(400, 400, WEBGPU);
}
```

Read more about how it works and where we plan on taking it [here](https://github.com/processing/p5.js/blob/dev-2.0/contributor_docs/webgpu.md)!
You're also welcome to come by the Discord #webgpu channel 🌱 

### What's Changed 🎊
* Ported the stroke shader to WebGPU renderer by @lukeplowden in https://github.com/processing/p5.js/pull/7915
* Framebuffer support on WebGPU renderer by @davepagurek in https://github.com/processing/p5.js/pull/8008
* webgpu ci test by @tychedelia in https://github.com/processing/p5.js/pull/8023
* Add WIP WebGPU mode by @davepagurek in https://github.com/processing/p5.js/pull/8179
* Update release action to omit WebGPU tests, add TS tests by @davepagurek in https://github.com/processing/p5.js/pull/8337
* FES parameter validation decoration use `.apply()` for faster function invocation by @limzykenneth in https://github.com/processing/p5.js/pull/8332
* Add WebGPU built files to npm releases by @davepagurek in https://github.com/processing/p5.js/pull/8338
* Make sure bytes are aligned in p5.Geometry by @davepagurek in https://github.com/processing/p5.js/pull/8340
* Fix WebGPU buffer memory leaks by @davepagurek in https://github.com/processing/p5.js/pull/8342
* Fix JSDoc return type for p5.Vector.cross (2.0) by @Geethegreat in https://github.com/processing/p5.js/pull/8346
* Add support for instanceID() in WebGPU mode by @davepagurek in https://github.com/processing/p5.js/pull/8348
* Fix WebGPU filters in CDN builds using duck typing for nodes (closes … by @Piyushrathoree in https://github.com/processing/p5.js/pull/8349
* Fix Camera.slerp for ortho by cloning projMatrix into uPMatrix when active by @nakednous in https://github.com/processing/p5.js/pull/8351
* fixed the issue with alpha blending - fixing blur remaining by @Piyushrathoree in https://github.com/processing/p5.js/pull/8354
* Support background(image) in WEBGL Renderer3D by @reshma045 in https://github.com/processing/p5.js/pull/8352
* Fix LogicalExpression (&&, ||) handling in p5.strands by @Aayushdev18 in https://github.com/processing/p5.js/pull/8359
* Fix p5.strands filters not working on minified code by @davepagurek in https://github.com/processing/p5.js/pull/8367
* More fixes for minified filters by @davepagurek in https://github.com/processing/p5.js/pull/8372
* Fix transforms in clip() by using shape system for primitives using manual method by @VANSH3104 in https://github.com/processing/p5.js/pull/8236
* Make sure text binds an index buffer by @davepagurek in https://github.com/processing/p5.js/pull/8393
* Fix font measurement with font families containing special characters by @davepagurek in https://github.com/processing/p5.js/pull/8391
* Fix for strands branching by @davepagurek in https://github.com/processing/p5.js/pull/8394
* Fix assignments to properties of `inputs` in branches in p5.strands by @davepagurek in https://github.com/processing/p5.js/pull/8397
* Fix set() to support p5.Graphics objects by @VANSH3104 in https://github.com/processing/p5.js/pull/8326
* Fix type for shuffle() and add type test. by @nbogie in https://github.com/processing/p5.js/pull/8410
* Fix p5.strands parsing of named function callbacks by @davepagurek in https://github.com/processing/p5.js/pull/8414

## New Contributors
* @tychedelia made their first contribution in https://github.com/processing/p5.js/pull/8023
* @Piyushrathoree made their first contribution in https://github.com/processing/p5.js/pull/8349
* @Aayushdev18 made their first contribution in https://github.com/processing/p5.js/pull/8359

**Full Changelog**: https://github.com/processing/p5.js/compare/v2.1.2...v2.2.0

## v2.2.0-rc.6 — 2026-01-13 (prerelease)

## Help test the release candidate

The `2.2` proposed minor release contains the ongoing work on WebGPU rendering! This is a **release candidate** (RC), which means it is not yet live on the p5.js Editor. Please help us to improve the stability of the newest version of p5.js by trying out this release candidate, and reporting bugs. You can also share your thoughts or get involved on Discord in the [#webpgu](https://discord.gg/nmS4v2qw4K) channel! This RC also contains bugfixes in p5.js, including in p5.strands.

## Testing WebGPU mode

WebGPU mode is included in a core add-on now. To load both p5.js and WebGPU mode, add these two script tags to your sketch:

```html
<script src="https://cdn.jsdelivr.net/npm/p5@2.2.0-rc.6/lib/p5.js"></script>
<script src="https://cdn.jsdelivr.net/npm/p5@2.2.0-rc.6/lib/p5.webgpu.js"></script>
```

Then load WebGPU mode in `createCanvas`:
```js
async function setup() {
  await createCanvas(400, 400, WEBGPU);
}
```

Or, feel free to duplicate this project on the p5.js web editor: https://editor.p5js.org/ksen0/sketches/Ger2euN_J

Read more about how it works and where we plan on taking it here: https://github.com/processing/p5.js/blob/dev-2.0/contributor_docs/webgpu.md

<!-- Release notes generated using configuration in .github/release.yml at v2.2.0-rc.6 -->

## What's Changed
* Ported the stroke shader to WebGPU renderer by @lukeplowden in https://github.com/processing/p5.js/pull/7915
* Framebuffer support on WebGPU renderer by @davepagurek in https://github.com/processing/p5.js/pull/8008
* webgpu ci test by @tychedelia in https://github.com/processing/p5.js/pull/8023
* Add WIP WebGPU mode by @davepagurek in https://github.com/processing/p5.js/pull/8179
* Update release action to omit WebGPU tests, add TS tests by @davepagurek in https://github.com/processing/p5.js/pull/8337
* FES parameter validation decoration use `.apply()` for faster function invocation by @limzykenneth in https://github.com/processing/p5.js/pull/8332
* Add WebGPU built files to npm releases by @davepagurek in https://github.com/processing/p5.js/pull/8338
* Make sure bytes are aligned in p5.Geometry by @davepagurek in https://github.com/processing/p5.js/pull/8340
* Fix WebGPU buffer memory leaks by @davepagurek in https://github.com/processing/p5.js/pull/8342
* Fix JSDoc return type for p5.Vector.cross (2.0) by @Geethegreat in https://github.com/processing/p5.js/pull/8346
* Add support for instanceID() in WebGPU mode by @davepagurek in https://github.com/processing/p5.js/pull/8348
* Fix WebGPU filters in CDN builds using duck typing for nodes (closes … by @Piyushrathoree in https://github.com/processing/p5.js/pull/8349
* Fix Camera.slerp for ortho by cloning projMatrix into uPMatrix when active by @nakednous in https://github.com/processing/p5.js/pull/8351
* fixed the issue with alpha blending - fixing blur remaining by @Piyushrathoree in https://github.com/processing/p5.js/pull/8354
* Support background(image) in WEBGL Renderer3D by @reshma045 in https://github.com/processing/p5.js/pull/8352
* Fix LogicalExpression (&&, ||) handling in p5.strands by @Aayushdev18 in https://github.com/processing/p5.js/pull/8359
* Fix p5.strands filters not working on minified code by @davepagurek in https://github.com/processing/p5.js/pull/8367
* More fixes for minified filters by @davepagurek in https://github.com/processing/p5.js/pull/8372
* Fix transforms in clip() by using shape system for primitives using manual method by @VANSH3104 in https://github.com/processing/p5.js/pull/8236
* Make sure text binds an index buffer by @davepagurek in https://github.com/processing/p5.js/pull/8393
* Fix font measurement with font families containing special characters by @davepagurek in https://github.com/processing/p5.js/pull/8391
* Fix for strands branching by @davepagurek in https://github.com/processing/p5.js/pull/8394
* Fix assignments to properties of `inputs` in branches in p5.strands by @davepagurek in https://github.com/processing/p5.js/pull/8397
* Fix set() to support p5.Graphics objects by @VANSH3104 in https://github.com/processing/p5.js/pull/8326
* Fix type for shuffle() and add type test. by @nbogie in https://github.com/processing/p5.js/pull/8410
* Fix p5.strands parsing of named function callbacks by @davepagurek in https://github.com/processing/p5.js/pull/8414

## New Contributors
* @tychedelia made their first contribution in https://github.com/processing/p5.js/pull/8023
* @Piyushrathoree made their first contribution in https://github.com/processing/p5.js/pull/8349
* @Aayushdev18 made their first contribution in https://github.com/processing/p5.js/pull/8359

**Full Changelog**: https://github.com/processing/p5.js/compare/v2.1.2...v2.2.0-rc.6<!-- Release notes generated using configuration in .github/release.yml at v2.2.0-rc.6 -->

## What's Changed
### What's Changed 🎊
* Fix assignments to properties of `inputs` in branches in p5.strands by @davepagurek in https://github.com/processing/p5.js/pull/8397
* Fix set() to support p5.Graphics objects by @VANSH3104 in https://github.com/processing/p5.js/pull/8326
* Fix type for shuffle() and add type test. by @nbogie in https://github.com/processing/p5.js/pull/8410
* Fix p5.strands parsing of named function callbacks by @davepagurek in https://github.com/processing/p5.js/pull/8414


**Full Changelog**: https://github.com/processing/p5.js/compare/v2.2.0-rc.5...v2.2.0-rc.6

## v1.11.12-rc.0 — 2026-01-13

## How to test

Please report any issues you find with this release candidate before it goes live as the next version of 1.x! To help test, you can use the downloads below. In the p5.js Editor, you can upload p5.min.js and use it in the `index.html` page.

## What's Changed

Since 1.11.11, the updates have been documentation and bugfixes.

### What's Changed 🎊
* Update CONTRIBUTING.md links and add Discord invitation by @RishiAhuja in https://github.com/processing/p5.js/pull/8190
* Docs: fix typos and anchors by @nivanovvv in https://github.com/processing/p5.js/pull/8216
* docs: add nivanovvv as a contributor for doc by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8217
* Add `AGENTS.md` by @SableRaf in https://github.com/processing/p5.js/pull/8194
* Add title to CONTRIBUTORS.md by @davepagurek in https://github.com/processing/p5.js/pull/8233
* docs: add nbogie as a contributor for bug, and code by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8234
* docs: add SoundOfScooting as a contributor for code, and doc by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8242
* Improve Accessibility Guidance for `describe()` Usage (#8101) by @ksen0 in https://github.com/processing/p5.js/pull/8247
* docs: add VANSH3104 as a contributor for code by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8258
* docs: add menacingly-coded as a contributor for doc by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8292
* docs: add Homaid as a contributor for doc by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8298
* Fix zh-Hans reference link by @nivanovvv in https://github.com/processing/p5.js/pull/8275
* docs: add Itsrajsk as a contributor for code by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8306
* Updated point() examples for visible points in main branch.  by @menacingly-coded in https://github.com/processing/p5.js/pull/8305
* fix: background(image) support in WEBGL by @reshma045 in https://github.com/processing/p5.js/pull/8333
* Fix JSDoc return type for p5.Vector.cross by @Geethegreat in https://github.com/processing/p5.js/pull/8336
* docs: add Geethegreat as a contributor for code by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8347
* docs: add Piyushrathoree as a contributor for code by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8350
* docs: add Aayushdev18 as a contributor for code by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8362
* WebGL: Apply per‑vertex stroke color to POINTS by @yugalkaushik in https://github.com/processing/p5.js/pull/8380
* Docs/fix broken links by @skyash-dev in https://github.com/processing/p5.js/pull/8399
* docs: add rakesh2OO5 as a contributor for code by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8403

## New Contributors
* @RishiAhuja made their first contribution in https://github.com/processing/p5.js/pull/8190
* @nivanovvv made their first contribution in https://github.com/processing/p5.js/pull/8216
* @yugalkaushik made their first contribution in https://github.com/processing/p5.js/pull/8380
* @skyash-dev made their first contribution in https://github.com/processing/p5.js/pull/8399

**Full Changelog**: https://github.com/processing/p5.js/compare/v1.11.11...v1.11.12-rc.0

## v2.2.0-rc.5 — 2026-01-10 (prerelease)

## Help test the release candidate

The `2.2` proposed minor release contains the ongoing work on WebGPU rendering! This is a **release candidate** (RC), which means it is not yet live on the p5.js Editor. Please help us to improve the stability of the newest version of p5.js by trying out this release candidate, and reporting bugs. You can also share your thoughts or get involved on Discord in the [#webpgu](https://discord.gg/nmS4v2qw4K) channel! This RC also contains bugfixes in p5.js, including in p5.strands.

## Testing WebGPU mode

WebGPU mode is included in a core add-on now. To load both p5.js and WebGPU mode, add these two script tags to your sketch:

```html
<script src="https://cdn.jsdelivr.net/npm/p5@2.2.0-rc.5/lib/p5.js"></script>
<script src="https://cdn.jsdelivr.net/npm/p5@2.2.0-rc.5/lib/p5.webgpu.js"></script>
```

Then load WebGPU mode in `createCanvas`:
```js
async function setup() {
  await createCanvas(400, 400, WEBGPU);
}
```

Or, feel free to duplicate this project on the p5.js web editor: https://editor.p5js.org/ksen0/sketches/Ger2euN_J

Read more about how it works and where we plan on taking it here: https://github.com/processing/p5.js/blob/dev-2.0/contributor_docs/webgpu.md

### What's Changed 🎊
* Ported the stroke shader to WebGPU renderer by @lukeplowden in https://github.com/processing/p5.js/pull/7915
* Framebuffer support on WebGPU renderer by @davepagurek in https://github.com/processing/p5.js/pull/8008
* webgpu ci test by @tychedelia in https://github.com/processing/p5.js/pull/8023
* Add WIP WebGPU mode by @davepagurek in https://github.com/processing/p5.js/pull/8179
* Update release action to omit WebGPU tests, add TS tests by @davepagurek in https://github.com/processing/p5.js/pull/8337
* FES parameter validation decoration use `.apply()` for faster function invocation by @limzykenneth in https://github.com/processing/p5.js/pull/8332
* Add WebGPU built files to npm releases by @davepagurek in https://github.com/processing/p5.js/pull/8338
* Make sure bytes are aligned in p5.Geometry by @davepagurek in https://github.com/processing/p5.js/pull/8340
* Fix WebGPU buffer memory leaks by @davepagurek in https://github.com/processing/p5.js/pull/8342
* Fix JSDoc return type for p5.Vector.cross (2.0) by @Geethegreat in https://github.com/processing/p5.js/pull/8346
* Add support for instanceID() in WebGPU mode by @davepagurek in https://github.com/processing/p5.js/pull/8348
* Fix WebGPU filters in CDN builds using duck typing for nodes (closes … by @Piyushrathoree in https://github.com/processing/p5.js/pull/8349
* Fix Camera.slerp for ortho by cloning projMatrix into uPMatrix when active by @nakednous in https://github.com/processing/p5.js/pull/8351
* fixed the issue with alpha blending - fixing blur remaining by @Piyushrathoree in https://github.com/processing/p5.js/pull/8354
* Support background(image) in WEBGL Renderer3D by @reshma045 in https://github.com/processing/p5.js/pull/8352
* Fix LogicalExpression (&&, ||) handling in p5.strands by @Aayushdev18 in https://github.com/processing/p5.js/pull/8359
* Fix p5.strands filters not working on minified code by @davepagurek in https://github.com/processing/p5.js/pull/8367
* More fixes for minified filters by @davepagurek in https://github.com/processing/p5.js/pull/8372
* Fix transforms in clip() by using shape system for primitives using manual method by @VANSH3104 in https://github.com/processing/p5.js/pull/8236
* Make sure text binds an index buffer by @davepagurek in https://github.com/processing/p5.js/pull/8393
* Fix font measurement with font families containing special characters by @davepagurek in https://github.com/processing/p5.js/pull/8391
* Fix for strands branching by @davepagurek in https://github.com/processing/p5.js/pull/8394

## New Contributors
* @tychedelia made their first contribution in https://github.com/processing/p5.js/pull/8023
* @Piyushrathoree made their first contribution in https://github.com/processing/p5.js/pull/8349
* @Aayushdev18 made their first contribution in https://github.com/processing/p5.js/pull/8359

**Full Changelog**: https://github.com/processing/p5.js/compare/v2.1.2...v2.2.0-rc.5

## v2.2.0-rc.4 — 2026-01-01 (prerelease)

## Help test the release candidate

The `2.2` proposed minor release contains the ongoing work on WebGPU rendering! This is a **release candidate** (RC), which means it is not yet live on the p5.js Editor. Please help us to improve the stability of the newest version of p5.js by trying out this release candidate, and reporting bugs. You can also share your thoughts or get involved on Discord in the [#webpgu](https://discord.gg/nmS4v2qw4K) channel!

## Testing WebGPU mode

WebGPU mode is included in a core add-on now. To load both p5.js and WebGPU mode, add these two script tags to your sketch:

```html
<script src="https://cdn.jsdelivr.net/npm/p5@2.2.0-rc.4/lib/p5.js"></script>
<script src="https://cdn.jsdelivr.net/npm/p5@2.2.0-rc.4/lib/p5.webgpu.js"></script>
```

Then load WebGPU mode in `createCanvas`:
```js
async function setup() {
  await createCanvas(400, 400, WEBGPU);
}
```

Or, feel free to duplicate this project on the p5.js web editor: https://editor.p5js.org/ksen0/sketches/Ger2euN_J

Read more about how it works and where we plan on taking it here: https://github.com/processing/p5.js/blob/dev-2.0/contributor_docs/webgpu.md

### What's Changed 🎊
* Ported the stroke shader to WebGPU renderer by @lukeplowden in https://github.com/processing/p5.js/pull/7915
* Framebuffer support on WebGPU renderer by @davepagurek in https://github.com/processing/p5.js/pull/8008
* webgpu ci test by @tychedelia in https://github.com/processing/p5.js/pull/8023
* Add WIP WebGPU mode by @davepagurek in https://github.com/processing/p5.js/pull/8179
* Update release action to omit WebGPU tests, add TS tests by @davepagurek in https://github.com/processing/p5.js/pull/8337
* FES parameter validation decoration use `.apply()` for faster function invocation by @limzykenneth in https://github.com/processing/p5.js/pull/8332
* Add WebGPU built files to npm releases by @davepagurek in https://github.com/processing/p5.js/pull/8338
* Make sure bytes are aligned in p5.Geometry by @davepagurek in https://github.com/processing/p5.js/pull/8340
* Fix WebGPU buffer memory leaks by @davepagurek in https://github.com/processing/p5.js/pull/8342
* Fix JSDoc return type for p5.Vector.cross (2.0) by @Geethegreat in https://github.com/processing/p5.js/pull/8346
* Add support for instanceID() in WebGPU mode by @davepagurek in https://github.com/processing/p5.js/pull/8348
* Fix WebGPU filters in CDN builds using duck typing for nodes (closes … by @Piyushrathoree in https://github.com/processing/p5.js/pull/8349
* Fix Camera.slerp for ortho by cloning projMatrix into uPMatrix when active by @nakednous in https://github.com/processing/p5.js/pull/8351
* fixed the issue with alpha blending - fixing blur remaining by @Piyushrathoree in https://github.com/processing/p5.js/pull/8354
* Support background(image) in WEBGL Renderer3D by @reshma045 in https://github.com/processing/p5.js/pull/8352
* Fix LogicalExpression (&&, ||) handling in p5.strands by @Aayushdev18 in https://github.com/processing/p5.js/pull/8359
* Fix p5.strands filters not working on minified code by @davepagurek in https://github.com/processing/p5.js/pull/8367
* More fixes for minified filters by @davepagurek in https://github.com/processing/p5.js/pull/8372

## New Contributors
* @tychedelia made their first contribution in https://github.com/processing/p5.js/pull/8023
* @Piyushrathoree made their first contribution in https://github.com/processing/p5.js/pull/8349
* @Aayushdev18 made their first contribution in https://github.com/processing/p5.js/pull/8359

**Full Changelog**: https://github.com/processing/p5.js/compare/v2.1.2...v2.2.0-rc.4

## v2.2.0-rc.3 — 2025-12-22 (prerelease)

## Help test the release candidate

The `2.2` proposed minor release contains the ongoing work on WebGPU rendering! This is a **release candidate** (RC), which means it is not yet live on the p5.js Editor. Please help us to improve the stability of the newest version of p5.js by trying out this release candidate, and reporting bugs. You can also share your thoughts or get involved on Discord in the [#webpgu](https://discord.gg/nmS4v2qw4K) channel!

## Testing WebGPU mode

WebGPU mode is included in a core add-on now. To load both p5.js and WebGPU mode, add these two script tags to your sketch:

```html
<script src="https://cdn.jsdelivr.net/npm/p5@2.2.0-rc.3/lib/p5.js"></script>
<script src="https://cdn.jsdelivr.net/npm/p5@2.2.0-rc.3/lib/p5.webgpu.js"></script>
```

Then load WebGPU mode in `createCanvas`:
```js
async function setup() {
  await createCanvas(400, 400, WEBGPU);
}
```

Or, feel free to duplicate this project on the p5.js web editor: https://editor.p5js.org/ksen0/sketches/Ger2euN_J

Read more about how it works and where we plan on taking it here: https://github.com/processing/p5.js/blob/dev-2.0/contributor_docs/webgpu.md

### What's Changed 🎊
* Ported the stroke shader to WebGPU renderer by @lukeplowden in https://github.com/processing/p5.js/pull/7915
* Framebuffer support on WebGPU renderer by @davepagurek in https://github.com/processing/p5.js/pull/8008
* webgpu ci test by @tychedelia in https://github.com/processing/p5.js/pull/8023
* Add WIP WebGPU mode by @davepagurek in https://github.com/processing/p5.js/pull/8179
* Update release action to omit WebGPU tests, add TS tests by @davepagurek in https://github.com/processing/p5.js/pull/8337
* FES parameter validation decoration use `.apply()` for faster function invocation by @limzykenneth in https://github.com/processing/p5.js/pull/8332
* Add WebGPU built files to npm releases by @davepagurek in https://github.com/processing/p5.js/pull/8338
* Make sure bytes are aligned in p5.Geometry by @davepagurek in https://github.com/processing/p5.js/pull/8340
* Fix WebGPU buffer memory leaks by @davepagurek in https://github.com/processing/p5.js/pull/8342
* Fix JSDoc return type for p5.Vector.cross (2.0) by @Geethegreat in https://github.com/processing/p5.js/pull/8346
* Add support for instanceID() in WebGPU mode by @davepagurek in https://github.com/processing/p5.js/pull/8348
* Fix WebGPU filters in CDN builds using duck typing for nodes (closes … by @Piyushrathoree in https://github.com/processing/p5.js/pull/8349
* Fix Camera.slerp for ortho by cloning projMatrix into uPMatrix when active by @nakednous in https://github.com/processing/p5.js/pull/8351
* fixed the issue with alpha blending - fixing blur remaining by @Piyushrathoree in https://github.com/processing/p5.js/pull/8354

## New Contributors
* @tychedelia made their first contribution in https://github.com/processing/p5.js/pull/8023
* @Piyushrathoree made their first contribution in https://github.com/processing/p5.js/pull/8349

**Full Changelog**: https://github.com/processing/p5.js/compare/v2.1.2...v2.2.0-rc.3

## v2.2.0-rc.2 — 2025-12-17 (prerelease)

## Help test the release candidate

The `2.2` proposed minor release contains the ongoing work on WebGPU rendering! This is a **release candidate** (RC), which means it is not yet live on the p5.js Editor. Please help us to improve the stability of the newest version of p5.js by trying out this release candidate, and reporting bugs. You can also share your thoughts or get involved on Discord in the [#webpgu](https://discord.gg/nmS4v2qw4K) channel!

## Testing WebGPU mode

WebGPU mode is included in a core add-on now. To load both p5.js and WebGPU mode, add these two script tags to your sketch:

```html
<script src="https://cdn.jsdelivr.net/npm/p5@2.2.0-rc.2/lib/p5.js"></script>
<script src="https://cdn.jsdelivr.net/npm/p5@2.2.0-rc.2/lib/p5.webgpu.js"></script>
```

Then load WebGPU mode in `createCanvas`:
```js
async function setup() {
  await createCanvas(400, 400, WEBGPU);
}
```

Or, feel free to duplicate this project on the p5.js web editor: https://editor.p5js.org/davepagurek/sketches/bmEYKK2aw

Read more about how it works and where we plan on taking it here: https://github.com/processing/p5.js/blob/dev-2.0/contributor_docs/webgpu.md

## What's Changed
### What's Changed 🎊
* Ported the stroke shader to WebGPU renderer by @lukeplowden in https://github.com/processing/p5.js/pull/7915
* Framebuffer support on WebGPU renderer by @davepagurek in https://github.com/processing/p5.js/pull/8008
* webgpu ci test by @tychedelia in https://github.com/processing/p5.js/pull/8023
* Add WIP WebGPU mode by @davepagurek in https://github.com/processing/p5.js/pull/8179
* Update release action to omit WebGPU tests, add TS tests by @davepagurek in https://github.com/processing/p5.js/pull/8337
* FES parameter validation decoration use `.apply()` for faster function invocation by @limzykenneth in https://github.com/processing/p5.js/pull/8332
* Add WebGPU built files to npm releases by @davepagurek in https://github.com/processing/p5.js/pull/8338

## New Contributors
* @tychedelia made their first contribution in https://github.com/processing/p5.js/pull/8023

**Full Changelog**: https://github.com/processing/p5.js/compare/v2.1.2...v2.2.0-rc.2

## v2.2.0-rc.1 — 2025-12-17 (prerelease)

<!-- Release notes generated using configuration in .github/release.yml at v2.2.0-rc.1 -->

## Help test the release candidate

* Use this link to load the library: https://cdn.jsdelivr.net/npm/p5@2.2.0-rc.1/lib/p5.js

The `2.2` proposed minor release contains the ongoing work on WebGPU rendering! This is a **release candidate** (RC), which means it is not yet live on the p5.js Editor. Please help us to improve the stability of the newest version of p5.js by trying out this release candidate, and reporting bugs. You can also share your thoughts or get involved on Discord in the [#webpgu](https://discord.gg/nmS4v2qw4K) channel!

### What's Changed 🎊
* Ported the stroke shader to WebGPU renderer by @lukeplowden in https://github.com/processing/p5.js/pull/7915
* Framebuffer support on WebGPU renderer by @davepagurek in https://github.com/processing/p5.js/pull/8008
* webgpu ci test by @tychedelia in https://github.com/processing/p5.js/pull/8023
* Add WIP WebGPU mode by @davepagurek in https://github.com/processing/p5.js/pull/8179
* Update release action to omit WebGPU tests, add TS tests by @davepagurek in https://github.com/processing/p5.js/pull/8337
* FES parameter validation decoration use `.apply()` for faster function invocation by @limzykenneth in https://github.com/processing/p5.js/pull/8332

## New Contributors
* @tychedelia made their first contribution in https://github.com/processing/p5.js/pull/8023

**Full Changelog**: https://github.com/processing/p5.js/compare/v2.1.2...v2.2.0-rc.1

## v2.1.2 — 2025-12-16

<!-- Release notes generated using configuration in .github/release.yml at v2.1.2 -->

## What's Changed

Use this link to load the library: https://cdn.jsdelivr.net/npm/p5@2.1.2/lib/p5.js

This patch includes documentation updates, bugfixes, and improvements on the experimental p5.strands feature.

### What's Changed 🎊
* Add fallback for property tags that don't fully parse by @davepagurek in https://github.com/processing/p5.js/pull/8257
* Fix textToModel face normals for extruded text by @VANSH3104 in https://github.com/processing/p5.js/pull/8091
* Fix string quotes in font loading example by @dhowe in https://github.com/processing/p5.js/pull/8279
* Updated point() examples for visible points. by @menacingly-coded in https://github.com/processing/p5.js/pull/8291
* Add fallback for HTTP HEAD requests by @davepagurek in https://github.com/processing/p5.js/pull/8270
* Improve splineProperties() documentation by @Homaid in https://github.com/processing/p5.js/pull/8265
* Fix to#7984 by @dhowe in https://github.com/processing/p5.js/pull/8014
* Makes sure p5.strands cleans up after an error by @davepagurek in https://github.com/processing/p5.js/pull/8301
* Fix usage of int() typecast in p5.strands by @davepagurek in https://github.com/processing/p5.js/pull/8254
* Text alignment fixes by @davepagurek in https://github.com/processing/p5.js/pull/8317
* Update Spanish steward guidelines for p5.js 2.x by @marioguzzzman in https://github.com/processing/p5.js/pull/8310
* Update Spanish steward guidelines for p5.js 2.0 (remove Grunt referen… by @marioguzzzman in https://github.com/processing/p5.js/pull/8308
* Better visual centering of text by @davepagurek in https://github.com/processing/p5.js/pull/8320
* Make sure camera methods on framebuffers work with push/pop by @davepagurek in https://github.com/processing/p5.js/pull/8322
* Fixes 8323 by @dhowe in https://github.com/processing/p5.js/pull/8324
* Add noiseDetail() support for p5.strands by @hxrshxz in https://github.com/processing/p5.js/pull/8163

## New Contributors
* @Homaid made their first contribution in https://github.com/processing/p5.js/pull/8265
* @marioguzzzman made their first contribution in https://github.com/processing/p5.js/pull/8310

**Full Changelog**: https://github.com/processing/p5.js/compare/v2.1.1...v2.1.2

## v2.1.1 — 2025-11-10

Use this link to load the library: https://cdn.jsdelivr.net/npm/p5@2.1.1/lib/p5.js

### What's new in p5.js 2.1 🌱 

* ...TypeScript integration
* ...p5.strands branching `if/else` and looping `for`
* ...[Addon Events API](https://github.com/processing/p5.js/issues/7946)
* ...[Color contrast checker](https://github.com/processing/p5.js/issues/6971), which you can use like this:

```js
   let bgColor, fg1Color, fg2Color, msg1, msg2;
   function setup() {
     createCanvas(100, 100);
     bgColor = color(0);
     fg1Color = color(100);
     fg2Color = color(220);
  
     if(bgColor.contrast(fg1Color)){
       msg1 = 'good';
     }else{
       msg1 = 'bad';
     }
  
     if(bgColor.contrast(fg2Color)){
       msg2 = 'good';
     }else{
       msg2 = 'bad';
     }
  
     describe('A black canvas with a faint grey word saying "bad" at the top left and a brighter light grey word saying "good" in the middle of the canvas.');
   }
  
   function draw(){
     background(bgColor);
  
     textSize(18);
  
     fill(fg1Color);
     text(msg1, 10, 30);
  
     fill(fg2Color);
     text(msg2, 10, 60);
   }
```

`oneColor.contrast(anotherColor)` checks the contrast between two colors. This method returns a boolean value to indicate if the two color has enough contrast. `true` means that  the colors has enough contrast to be used as background color and body text color. `false` means there is not enough contrast.

   A second argument can be passed to the method, `options` , which defines    the algorithm to be used. The algorithms currently supported are   WCAG 2.1 (`'WCAG21'`) or APCA (`'APCA'`). The default is WCAG 2.1. If a  value of `'all'` is passed to the `options` argument, an object containing   more details is returned. The details object will include the calculated  contrast value of the colors and different passing criteria.

```js
   let bgColor, fgColor, contrast;
   function setup() {
     createCanvas(100, 100);
     bgColor = color(0);
     fgColor = color(200);
     contrast = bgColor.contrast(fgColor, 'all');
  
     describe('A black canvas with four short lines of grey text that respectively says: "WCAG 2.1", "12.55", "APCA", and "-73.30".');
   }
  
   function draw(){
     background(bgColor);
  
     textSize(14);
  
     fill(fgColor);
     text('WCAG 2.1', 10, 25);
     text(nf(contrast.WCAG21.value, 0, 2), 10, 40);
  
     text('APCA', 10, 70);
     text(nf(contrast.APCA.value, 0, 2), 10, 85);
   }
```

   For more details about color contrast, you can check out <a href="https://colorjs.io/docs/contrast">this page from color.js</a>, and the <a href="https://webaim.org/resources/contrastchecker/">WebAIM color contrast checker.</a>
   
### Changes since 2.0 🎊

* fix: add splineVertex to p5.Graphics prototype and fix unit test error by @VANSH3104 in https://github.com/processing/p5.js/pull/7757
* [2.x] Fix ESM export functionality by @limzykenneth in https://github.com/processing/p5.js/pull/7764
* Fixed Error in FES prevents message from being shown, Prevented 'window' properties from being overwritten by @HughJacks in https://github.com/processing/p5.js/pull/7765
* Fix WebGL alpha blending by @davepagurek in https://github.com/processing/p5.js/pull/7769
* [2.0] Fix touch event not updating mouse coordinates by @limzykenneth in https://github.com/processing/p5.js/pull/7772
* Updating foundation-section for async/await by @perminder-17 in https://github.com/processing/p5.js/pull/7721
* fixing keyReleased() function.  by @perminder-17 in https://github.com/processing/p5.js/pull/7758
* Fix corrupted textures when rendering too many WebGL characters by @davepagurek in https://github.com/processing/p5.js/pull/7792
* Improve antialiased framebuffer performance by @davepagurek in https://github.com/processing/p5.js/pull/7794
* Fix FES check for image() not accepting some valid types by @limzykenneth in https://github.com/processing/p5.js/pull/7801
* Publish types on NPM with next release by @limzykenneth in https://github.com/processing/p5.js/pull/7802
* Fix typo in directionalLight reference (dev-2.0 branch) #7743 by @LalitNarayanYadav in https://github.com/processing/p5.js/pull/7778
* Remove dayjs dependency and update date formatting in banner by @error-four-o-four in https://github.com/processing/p5.js/pull/7804
* Rest types by @davepagurek in https://github.com/processing/p5.js/pull/7803
* Updating all the broken refrence examples.  by @perminder-17 in https://github.com/processing/p5.js/pull/7739
* Fixing keyTyped() for dev-2.0 branch  by @perminder-17 in https://github.com/processing/p5.js/pull/7809
* P2HDR docs       by @perminder-17 in https://github.com/processing/p5.js/pull/7728
* Update creating addon libraries contributor docs by @limzykenneth in https://github.com/processing/p5.js/pull/7800
* docs(keyboard): clarify keyIsDown() documentation for key codes and browser compatibility by @dpanshug in https://github.com/processing/p5.js/pull/7812
* Prevent FES from checking nested properties by @IIITM-Jay in https://github.com/processing/p5.js/pull/7824
* update the model params to be correct for 2.0 in docs and FES by @lukeplowden in https://github.com/processing/p5.js/pull/7832
* Model params updated for YUIDocs by @lukeplowden in https://github.com/processing/p5.js/pull/7835
* add instance of video in callback (2.0) by @ksen0 in https://github.com/processing/p5.js/pull/7877
* Add font readiness wait to create() function in p5.Font.js by @sophyphile in https://github.com/processing/p5.js/pull/7882
* Fix typo in createFileInput example by @ksen0 in https://github.com/processing/p5.js/pull/7884
* Create Graphics fixing in dev-2.0 branch.    by @perminder-17 in https://github.com/processing/p5.js/pull/7829
* Alias GLSL's mix function as lerp in p5.strands (#7875) by @LalitNarayanYadav in https://github.com/processing/p5.js/pull/7887
* added documentation to _getBrightness() and _getGreen() function by @FerrinThreatt in https://github.com/processing/p5.js/pull/7908
* Chore/upgrade eslint by @error-four-o-four in https://github.com/processing/p5.js/pull/7853
* Revamped config.yml(branch: dev-2.0) by @shivasankaran18 in https://github.com/processing/p5.js/pull/7776
* Update zod 3 to zod 4 support in p5.js dev-2.0 by @madhav2348 in https://github.com/processing/p5.js/pull/7872
* Updating visual tests docs for 2.x versions by @perminder-17 in https://github.com/processing/p5.js/pull/7827
* Skip adding degenerate faces in textToModel by @davepagurek in https://github.com/processing/p5.js/pull/7951
* Add GLSL-based noise(vec2) function to p5.strands (#7897) by @LalitNarayanYadav in https://github.com/processing/p5.js/pull/7921
* Fix inline anonymous functions causing a parsing error in p5.strands callbacks by @nking07049925 in https://github.com/processing/p5.js/pull/7956
* Fix p5.strands uniform calls, add instance mode construct by @davepagurek in https://github.com/processing/p5.js/pull/7961
* Enhance p5.strands noise() to support noise(x, y) and 4-octave fractal noise by @LalitNarayanYadav in https://github.com/processing/p5.js/pull/7964
* Adding docs for `code` in the refrence. by @perminder-17 in https://github.com/processing/p5.js/pull/7902
* Individual flags to disable part of FES by the user by @limzykenneth in https://github.com/processing/p5.js/pull/7967
* Add minified ESM build output by @nickswalker in https://github.com/processing/p5.js/pull/7973
* Replace fn with direct downloadFile import to fix issue where fn was not found by @acgillette in https://github.com/processing/p5.js/pull/7971
* Documentation fix for swapped parameters in splinePoint and bezierPoint by @shawdm in https://github.com/processing/p5.js/pull/7997
* Update dev-2.0 docs with recently-added contributors and stewards by @ksen0 in https://github.com/processing/p5.js/pull/8000
* Remove incorrect mouseX/mouseY docs regarding WEBGL mode in dev-2.0 branch. by @perminder-17 in https://github.com/processing/p5.js/pull/8006
* Fix MediaElement.copy by @pearmini in https://github.com/processing/p5.js/pull/7980
* Reset millis() after setup by @davepagurek in https://github.com/processing/p5.js/pull/8005
* Fix: Corrected code block in textureMode() in dev2.0 by @harishbit in https://github.com/processing/p5.js/pull/8015
* Merge branch 'loopOptimization' of https://github.com/awood0727/p5.js… by @awood0727 in https://github.com/processing/p5.js/pull/8024
* Update README.md by @perminder-17 in https://github.com/processing/p5.js/pull/8029
* Fixed syntax error at disableFriendleErrors by @Iron-56 in https://github.com/processing/p5.js/pull/8038
* Fix noise() getting overridden; add tests by @davepagurek in https://github.com/processing/p5.js/pull/8036
* A few documentation issues to fix by @perminder-17 in https://github.com/processing/p5.js/pull/8031
* Auto-link / Close Issues for 2.0 PRs (p5.js & p5.js-website) by @NalinDalal in https://github.com/processing/p5.js/pull/8025
* minor-fixing in shape docs by @perminder-17 in https://github.com/processing/p5.js/pull/8066
* Update auto-close-issues.yml by @ksen0 in https://github.com/processing/p5.js/pull/8069
* textWidth ignores leading and trailing spaces  by @Nitin2332 in https://github.com/processing/p5.js/pull/8067
* [WIP] Docs: Add initial draft of Strands documentation (feedback wanted) by @Abhayaj247 in https://github.com/processing/p5.js/pull/7940
* Fix most of the eslint warnings currently generated by @limzykenneth in https://github.com/processing/p5.js/pull/8063
* Addon Events API and User Defined Functions access by @limzykenneth in https://github.com/processing/p5.js/pull/7947
* Adding some examples for shapes. by @perminder-17 in https://github.com/processing/p5.js/pull/8070
* textToContours is broken under textAlign(CENTER,CENTER) and use linebreak by @perminder-17 in https://github.com/processing/p5.js/pull/8083
* reference-fix-2.0 by @Nitin2332 in https://github.com/processing/p5.js/pull/8086
* Include use of relevant maxes in `hue()`, `saturation()`, `brightness()` and `lightness()` by @limzykenneth in https://github.com/processing/p5.js/pull/8062
* Optimize bottlenecks in 2.0 code by @davepagurek in https://github.com/processing/p5.js/pull/8094
* Fix: allow single-arg atan() outside strands; add unit test by @Abhayaj247 in https://github.com/processing/p5.js/pull/8096
* [p5.strands] Significant refactor for p5.strands by @lukeplowden in https://github.com/processing/p5.js/pull/8009
* Update createCamera docs since it no longer sets the active camera by @davepagurek in https://github.com/processing/p5.js/pull/8100
* Use FES internationalization within the minor version by @ksen0 in https://github.com/processing/p5.js/pull/8106
* Comma included in load font by @perminder-17 in https://github.com/processing/p5.js/pull/8084
* typography error message fixes by @Nitin2332 in https://github.com/processing/p5.js/pull/8115
* Re-bind globals when assigned in addons by @davepagurek in https://github.com/processing/p5.js/pull/8099
* fromAngle returns a 2D Vector by @ksen0 in https://github.com/processing/p5.js/pull/8142
* Bugfix: Prevent genType from being inferred as int in GLSL wrappers by @reshma045 in https://github.com/processing/p5.js/pull/7942
* Skip text/gridOutput with a warning in WebGL in 2.0 by @davepagurek in https://github.com/processing/p5.js/pull/8147
* Add 3D noise(vec3) support to p5.strands by @LalitNarayanYadav in https://github.com/processing/p5.js/pull/7978
* fixed the bug of black-frames by @ayushman1210 in https://github.com/processing/p5.js/pull/8132
* Branching and looping for p5.strands by @davepagurek in https://github.com/processing/p5.js/pull/8120
* Refactor typescript type generation by @davepagurek in https://github.com/processing/p5.js/pull/8114
* [dev-2.0] Fix optional and rest parameters in TypeScript class method declarations by @SoundOfScooting in https://github.com/processing/p5.js/pull/7863
* Adding Visual Test Report in Github Actions by @Vaivaswat2244 in https://github.com/processing/p5.js/pull/7653
* Only create FilterRenderer2D lazily by @davepagurek in https://github.com/processing/p5.js/pull/8181
* Add missing color module exports by @limzykenneth in https://github.com/processing/p5.js/pull/8182
* Updated 1.x manual tests by @ksen0 in https://github.com/processing/p5.js/pull/8168
* Fix filters on framebuffers of a different size than the canvas by @davepagurek in https://github.com/processing/p5.js/pull/8193
* Vector toString() consistency fix by @limzykenneth in https://github.com/processing/p5.js/pull/8191
* Add contrast() function to check contrast ratio for two colors by @FerrinThreatt in https://github.com/processing/p5.js/pull/7944
* Fix FES stack frame access for internal errors by @davepagurek in https://github.com/processing/p5.js/pull/8175
* Fix usage of fn in MediaElement.connect by @davepagurek in https://github.com/processing/p5.js/pull/8176
* Fix errors in simplifyThreshold in textToPoints by @davepagurek in https://github.com/processing/p5.js/pull/8178
* Fix bugs in buildGeometry by @davepagurek in https://github.com/processing/p5.js/pull/8185
* Fix generation of UVs in rounded rectangles by @davepagurek in https://github.com/processing/p5.js/pull/8197
* Fix buildGeometry with no faces by @davepagurek in https://github.com/processing/p5.js/pull/8207
* Fix varying variables in p5.strands by @davepagurek in https://github.com/processing/p5.js/pull/8223
* docs: update module usage instructions to remove Grunt and reflect dev-2.0 tooling #7871 by @LalitNarayanYadav in https://github.com/processing/p5.js/pull/7886
* Fix handling of vector arguments to noise() in p5.strands by @davepagurek in https://github.com/processing/p5.js/pull/8227
* Fix missing mouseButton property types by @nbogie in https://github.com/processing/p5.js/pull/8232
* Update preload error in 2.x by @ksen0 in https://github.com/processing/p5.js/pull/8239
* Stabilize behavior of createVector() with zero arguments by @perminder-17 in https://github.com/processing/p5.js/pull/8203
* enhancing noop file to have error handeling.  by @perminder-17 in https://github.com/processing/p5.js/pull/8243
* Improve Accessibility Guidance for `describe()` Usage by @NalinDalal in https://github.com/processing/p5.js/pull/8101
* Removing grunt from contributor guidelines by @perminder-17 in https://github.com/processing/p5.js/pull/8245
* Add `AGENTS.md` [dev-2.0 branch] by @ksen0 in https://github.com/processing/p5.js/pull/8249
* Update high-level project doc in 2.0 branch to match main by @ksen0 in https://github.com/processing/p5.js/pull/8250
* Fix some bugs in p5.strands type aliasing by @davepagurek in https://github.com/processing/p5.js/pull/8251
* Remove console.log when setting up p5.strands by @davepagurek in https://github.com/processing/p5.js/pull/8252

## New Contributors
* @HughJacks made their first contribution in https://github.com/processing/p5.js/pull/7765
* @dpanshug made their first contribution in https://github.com/processing/p5.js/pull/7812
* @sophyphile made their first contribution in https://github.com/processing/p5.js/pull/7882
* @FerrinThreatt made their first contribution in https://github.com/processing/p5.js/pull/7908
* @madhav2348 made their first contribution in https://github.com/processing/p5.js/pull/7872
* @nking07049925 made their first contribution in https://github.com/processing/p5.js/pull/7956
* @nickswalker made their first contribution in https://github.com/processing/p5.js/pull/7973
* @acgillette made their first contribution in https://github.com/processing/p5.js/pull/7971
* @Iron-56 made their first contribution in https://github.com/processing/p5.js/pull/8038
* @Abhayaj247 made their first contribution in https://github.com/processing/p5.js/pull/7940
* @reshma045 made their first contribution in https://github.com/processing/p5.js/pull/7942
* @ayushman1210 made their first contribution in https://github.com/processing/p5.js/pull/8132
* @SoundOfScooting made their first contribution in https://github.com/processing/p5.js/pull/7863

**Full Changelog**: https://github.com/processing/p5.js/compare/v2.0.0...v2.1.1

## v2.1.0 — 2025-11-10

Use this link to load the library: https://cdn.jsdelivr.net/npm/p5@2.1.0/lib/p5.js

### What's new in p5.js 2.1 🌱 

* ...TypeScript integration
* ...p5.strands branching `if/else` and looping `for`
* ...[Addon Events API](https://github.com/processing/p5.js/issues/7946)
* ...[Color contrast checker](https://github.com/processing/p5.js/issues/6971), which you can use like this:

```js
   let bgColor, fg1Color, fg2Color, msg1, msg2;
   function setup() {
     createCanvas(100, 100);
     bgColor = color(0);
     fg1Color = color(100);
     fg2Color = color(220);
  
     if(bgColor.contrast(fg1Color)){
       msg1 = 'good';
     }else{
       msg1 = 'bad';
     }
  
     if(bgColor.contrast(fg2Color)){
       msg2 = 'good';
     }else{
       msg2 = 'bad';
     }
  
     describe('A black canvas with a faint grey word saying "bad" at the top left and a brighter light grey word saying "good" in the middle of the canvas.');
   }
  
   function draw(){
     background(bgColor);
  
     textSize(18);
  
     fill(fg1Color);
     text(msg1, 10, 30);
  
     fill(fg2Color);
     text(msg2, 10, 60);
   }
```

`oneColor.contrast(anotherColor)` checks the contrast between two colors. This method returns a boolean value to indicate if the two color has enough contrast. `true` means that  the colors has enough contrast to be used as background color and body text color. `false` means there is not enough contrast.

   A second argument can be passed to the method, `options` , which defines    the algorithm to be used. The algorithms currently supported are   WCAG 2.1 (`'WCAG21'`) or APCA (`'APCA'`). The default is WCAG 2.1. If a  value of `'all'` is passed to the `options` argument, an object containing   more details is returned. The details object will include the calculated  contrast value of the colors and different passing criteria.

```js
   let bgColor, fgColor, contrast;
   function setup() {
     createCanvas(100, 100);
     bgColor = color(0);
     fgColor = color(200);
     contrast = bgColor.contrast(fgColor, 'all');
  
     describe('A black canvas with four short lines of grey text that respectively says: "WCAG 2.1", "12.55", "APCA", and "-73.30".');
   }
  
   function draw(){
     background(bgColor);
  
     textSize(14);
  
     fill(fgColor);
     text('WCAG 2.1', 10, 25);
     text(nf(contrast.WCAG21.value, 0, 2), 10, 40);
  
     text('APCA', 10, 70);
     text(nf(contrast.APCA.value, 0, 2), 10, 85);
   }
```

   For more details about color contrast, you can check out <a href="https://colorjs.io/docs/contrast">this page from color.js</a>, and the <a href="https://webaim.org/resources/contrastchecker/">WebAIM color contrast checker.</a>
   
### Changes since 2.0 🎊

* fix: add splineVertex to p5.Graphics prototype and fix unit test error by @VANSH3104 in https://github.com/processing/p5.js/pull/7757
* [2.x] Fix ESM export functionality by @limzykenneth in https://github.com/processing/p5.js/pull/7764
* Fixed Error in FES prevents message from being shown, Prevented 'window' properties from being overwritten by @HughJacks in https://github.com/processing/p5.js/pull/7765
* Fix WebGL alpha blending by @davepagurek in https://github.com/processing/p5.js/pull/7769
* [2.0] Fix touch event not updating mouse coordinates by @limzykenneth in https://github.com/processing/p5.js/pull/7772
* Updating foundation-section for async/await by @perminder-17 in https://github.com/processing/p5.js/pull/7721
* fixing keyReleased() function.  by @perminder-17 in https://github.com/processing/p5.js/pull/7758
* Fix corrupted textures when rendering too many WebGL characters by @davepagurek in https://github.com/processing/p5.js/pull/7792
* Improve antialiased framebuffer performance by @davepagurek in https://github.com/processing/p5.js/pull/7794
* Fix FES check for image() not accepting some valid types by @limzykenneth in https://github.com/processing/p5.js/pull/7801
* Publish types on NPM with next release by @limzykenneth in https://github.com/processing/p5.js/pull/7802
* Fix typo in directionalLight reference (dev-2.0 branch) #7743 by @LalitNarayanYadav in https://github.com/processing/p5.js/pull/7778
* Remove dayjs dependency and update date formatting in banner by @error-four-o-four in https://github.com/processing/p5.js/pull/7804
* Rest types by @davepagurek in https://github.com/processing/p5.js/pull/7803
* Updating all the broken refrence examples.  by @perminder-17 in https://github.com/processing/p5.js/pull/7739
* Fixing keyTyped() for dev-2.0 branch  by @perminder-17 in https://github.com/processing/p5.js/pull/7809
* P2HDR docs       by @perminder-17 in https://github.com/processing/p5.js/pull/7728
* Update creating addon libraries contributor docs by @limzykenneth in https://github.com/processing/p5.js/pull/7800
* docs(keyboard): clarify keyIsDown() documentation for key codes and browser compatibility by @dpanshug in https://github.com/processing/p5.js/pull/7812
* Prevent FES from checking nested properties by @IIITM-Jay in https://github.com/processing/p5.js/pull/7824
* update the model params to be correct for 2.0 in docs and FES by @lukeplowden in https://github.com/processing/p5.js/pull/7832
* Model params updated for YUIDocs by @lukeplowden in https://github.com/processing/p5.js/pull/7835
* add instance of video in callback (2.0) by @ksen0 in https://github.com/processing/p5.js/pull/7877
* Add font readiness wait to create() function in p5.Font.js by @sophyphile in https://github.com/processing/p5.js/pull/7882
* Fix typo in createFileInput example by @ksen0 in https://github.com/processing/p5.js/pull/7884
* Create Graphics fixing in dev-2.0 branch.    by @perminder-17 in https://github.com/processing/p5.js/pull/7829
* Alias GLSL's mix function as lerp in p5.strands (#7875) by @LalitNarayanYadav in https://github.com/processing/p5.js/pull/7887
* added documentation to _getBrightness() and _getGreen() function by @FerrinThreatt in https://github.com/processing/p5.js/pull/7908
* Chore/upgrade eslint by @error-four-o-four in https://github.com/processing/p5.js/pull/7853
* Revamped config.yml(branch: dev-2.0) by @shivasankaran18 in https://github.com/processing/p5.js/pull/7776
* Update zod 3 to zod 4 support in p5.js dev-2.0 by @madhav2348 in https://github.com/processing/p5.js/pull/7872
* Updating visual tests docs for 2.x versions by @perminder-17 in https://github.com/processing/p5.js/pull/7827
* Skip adding degenerate faces in textToModel by @davepagurek in https://github.com/processing/p5.js/pull/7951
* Add GLSL-based noise(vec2) function to p5.strands (#7897) by @LalitNarayanYadav in https://github.com/processing/p5.js/pull/7921
* Fix inline anonymous functions causing a parsing error in p5.strands callbacks by @nking07049925 in https://github.com/processing/p5.js/pull/7956
* Fix p5.strands uniform calls, add instance mode construct by @davepagurek in https://github.com/processing/p5.js/pull/7961
* Enhance p5.strands noise() to support noise(x, y) and 4-octave fractal noise by @LalitNarayanYadav in https://github.com/processing/p5.js/pull/7964
* Adding docs for `code` in the refrence. by @perminder-17 in https://github.com/processing/p5.js/pull/7902
* Individual flags to disable part of FES by the user by @limzykenneth in https://github.com/processing/p5.js/pull/7967
* Add minified ESM build output by @nickswalker in https://github.com/processing/p5.js/pull/7973
* Replace fn with direct downloadFile import to fix issue where fn was not found by @acgillette in https://github.com/processing/p5.js/pull/7971
* Documentation fix for swapped parameters in splinePoint and bezierPoint by @shawdm in https://github.com/processing/p5.js/pull/7997
* Update dev-2.0 docs with recently-added contributors and stewards by @ksen0 in https://github.com/processing/p5.js/pull/8000
* Remove incorrect mouseX/mouseY docs regarding WEBGL mode in dev-2.0 branch. by @perminder-17 in https://github.com/processing/p5.js/pull/8006
* Fix MediaElement.copy by @pearmini in https://github.com/processing/p5.js/pull/7980
* Reset millis() after setup by @davepagurek in https://github.com/processing/p5.js/pull/8005
* Fix: Corrected code block in textureMode() in dev2.0 by @harishbit in https://github.com/processing/p5.js/pull/8015
* Merge branch 'loopOptimization' of https://github.com/awood0727/p5.js… by @awood0727 in https://github.com/processing/p5.js/pull/8024
* Update README.md by @perminder-17 in https://github.com/processing/p5.js/pull/8029
* Fixed syntax error at disableFriendleErrors by @Iron-56 in https://github.com/processing/p5.js/pull/8038
* Fix noise() getting overridden; add tests by @davepagurek in https://github.com/processing/p5.js/pull/8036
* A few documentation issues to fix by @perminder-17 in https://github.com/processing/p5.js/pull/8031
* Auto-link / Close Issues for 2.0 PRs (p5.js & p5.js-website) by @NalinDalal in https://github.com/processing/p5.js/pull/8025
* minor-fixing in shape docs by @perminder-17 in https://github.com/processing/p5.js/pull/8066
* Update auto-close-issues.yml by @ksen0 in https://github.com/processing/p5.js/pull/8069
* textWidth ignores leading and trailing spaces  by @Nitin2332 in https://github.com/processing/p5.js/pull/8067
* [WIP] Docs: Add initial draft of Strands documentation (feedback wanted) by @Abhayaj247 in https://github.com/processing/p5.js/pull/7940
* Fix most of the eslint warnings currently generated by @limzykenneth in https://github.com/processing/p5.js/pull/8063
* Addon Events API and User Defined Functions access by @limzykenneth in https://github.com/processing/p5.js/pull/7947
* Adding some examples for shapes. by @perminder-17 in https://github.com/processing/p5.js/pull/8070
* textToContours is broken under textAlign(CENTER,CENTER) and use linebreak by @perminder-17 in https://github.com/processing/p5.js/pull/8083
* reference-fix-2.0 by @Nitin2332 in https://github.com/processing/p5.js/pull/8086
* Include use of relevant maxes in `hue()`, `saturation()`, `brightness()` and `lightness()` by @limzykenneth in https://github.com/processing/p5.js/pull/8062
* Optimize bottlenecks in 2.0 code by @davepagurek in https://github.com/processing/p5.js/pull/8094
* Fix: allow single-arg atan() outside strands; add unit test by @Abhayaj247 in https://github.com/processing/p5.js/pull/8096
* [p5.strands] Significant refactor for p5.strands by @lukeplowden in https://github.com/processing/p5.js/pull/8009
* Update createCamera docs since it no longer sets the active camera by @davepagurek in https://github.com/processing/p5.js/pull/8100
* Use FES internationalization within the minor version by @ksen0 in https://github.com/processing/p5.js/pull/8106
* Comma included in load font by @perminder-17 in https://github.com/processing/p5.js/pull/8084
* typography error message fixes by @Nitin2332 in https://github.com/processing/p5.js/pull/8115
* Re-bind globals when assigned in addons by @davepagurek in https://github.com/processing/p5.js/pull/8099
* fromAngle returns a 2D Vector by @ksen0 in https://github.com/processing/p5.js/pull/8142
* Bugfix: Prevent genType from being inferred as int in GLSL wrappers by @reshma045 in https://github.com/processing/p5.js/pull/7942
* Skip text/gridOutput with a warning in WebGL in 2.0 by @davepagurek in https://github.com/processing/p5.js/pull/8147
* Add 3D noise(vec3) support to p5.strands by @LalitNarayanYadav in https://github.com/processing/p5.js/pull/7978
* fixed the bug of black-frames by @ayushman1210 in https://github.com/processing/p5.js/pull/8132
* Branching and looping for p5.strands by @davepagurek in https://github.com/processing/p5.js/pull/8120
* Refactor typescript type generation by @davepagurek in https://github.com/processing/p5.js/pull/8114
* [dev-2.0] Fix optional and rest parameters in TypeScript class method declarations by @SoundOfScooting in https://github.com/processing/p5.js/pull/7863
* Adding Visual Test Report in Github Actions by @Vaivaswat2244 in https://github.com/processing/p5.js/pull/7653
* Only create FilterRenderer2D lazily by @davepagurek in https://github.com/processing/p5.js/pull/8181
* Add missing color module exports by @limzykenneth in https://github.com/processing/p5.js/pull/8182
* Updated 1.x manual tests by @ksen0 in https://github.com/processing/p5.js/pull/8168
* Fix filters on framebuffers of a different size than the canvas by @davepagurek in https://github.com/processing/p5.js/pull/8193
* Vector toString() consistency fix by @limzykenneth in https://github.com/processing/p5.js/pull/8191
* Add contrast() function to check contrast ratio for two colors by @FerrinThreatt in https://github.com/processing/p5.js/pull/7944
* Fix FES stack frame access for internal errors by @davepagurek in https://github.com/processing/p5.js/pull/8175
* Fix usage of fn in MediaElement.connect by @davepagurek in https://github.com/processing/p5.js/pull/8176
* Fix errors in simplifyThreshold in textToPoints by @davepagurek in https://github.com/processing/p5.js/pull/8178
* Fix bugs in buildGeometry by @davepagurek in https://github.com/processing/p5.js/pull/8185
* Fix generation of UVs in rounded rectangles by @davepagurek in https://github.com/processing/p5.js/pull/8197
* Fix buildGeometry with no faces by @davepagurek in https://github.com/processing/p5.js/pull/8207
* Fix varying variables in p5.strands by @davepagurek in https://github.com/processing/p5.js/pull/8223
* docs: update module usage instructions to remove Grunt and reflect dev-2.0 tooling #7871 by @LalitNarayanYadav in https://github.com/processing/p5.js/pull/7886
* Fix handling of vector arguments to noise() in p5.strands by @davepagurek in https://github.com/processing/p5.js/pull/8227
* Fix missing mouseButton property types by @nbogie in https://github.com/processing/p5.js/pull/8232
* Update preload error in 2.x by @ksen0 in https://github.com/processing/p5.js/pull/8239
* Stabilize behavior of createVector() with zero arguments by @perminder-17 in https://github.com/processing/p5.js/pull/8203
* enhancing noop file to have error handeling.  by @perminder-17 in https://github.com/processing/p5.js/pull/8243
* Improve Accessibility Guidance for `describe()` Usage by @NalinDalal in https://github.com/processing/p5.js/pull/8101
* Removing grunt from contributor guidelines by @perminder-17 in https://github.com/processing/p5.js/pull/8245
* Add `AGENTS.md` [dev-2.0 branch] by @ksen0 in https://github.com/processing/p5.js/pull/8249
* Update high-level project doc in 2.0 branch to match main by @ksen0 in https://github.com/processing/p5.js/pull/8250
* Fix some bugs in p5.strands type aliasing by @davepagurek in https://github.com/processing/p5.js/pull/8251

## New Contributors
* @HughJacks made their first contribution in https://github.com/processing/p5.js/pull/7765
* @dpanshug made their first contribution in https://github.com/processing/p5.js/pull/7812
* @sophyphile made their first contribution in https://github.com/processing/p5.js/pull/7882
* @FerrinThreatt made their first contribution in https://github.com/processing/p5.js/pull/7908
* @madhav2348 made their first contribution in https://github.com/processing/p5.js/pull/7872
* @nking07049925 made their first contribution in https://github.com/processing/p5.js/pull/7956
* @nickswalker made their first contribution in https://github.com/processing/p5.js/pull/7973
* @acgillette made their first contribution in https://github.com/processing/p5.js/pull/7971
* @Iron-56 made their first contribution in https://github.com/processing/p5.js/pull/8038
* @Abhayaj247 made their first contribution in https://github.com/processing/p5.js/pull/7940
* @reshma045 made their first contribution in https://github.com/processing/p5.js/pull/7942
* @ayushman1210 made their first contribution in https://github.com/processing/p5.js/pull/8132
* @SoundOfScooting made their first contribution in https://github.com/processing/p5.js/pull/7863

**Full Changelog**: https://github.com/processing/p5.js/compare/v2.0.0...v2.1.0

## v2.1.0-rc.4 — 2025-11-10 (prerelease)

<!-- Release notes generated using configuration in .github/release.yml at v2.1.0-rc.4 -->

## What's Changed
### What's Changed 🎊
* enhancing noop file to have error handeling.  by @perminder-17 in https://github.com/processing/p5.js/pull/8243
* Improve Accessibility Guidance for `describe()` Usage by @NalinDalal in https://github.com/processing/p5.js/pull/8101
* Removing grunt from contributor guidelines by @perminder-17 in https://github.com/processing/p5.js/pull/8245
* Add `AGENTS.md` [dev-2.0 branch] by @ksen0 in https://github.com/processing/p5.js/pull/8249


**Full Changelog**: https://github.com/processing/p5.js/compare/v2.1.0-rc.3...v2.1.0-rc.4

## v2.1.0-rc.3 — 2025-11-07 (prerelease)

## Help test the release candidate

* Use this link to load the library: https://cdn.jsdelivr.net/npm/p5@2.1.0-rc.3/lib/p5.js

Here are all the updates for the **upcoming [2.1 milestone](https://github.com/processing/p5.js/issues/7937)**. This is a **release candidate** (RC), which means it is not yet live on the p5.js Editor. Please help us to improve the stability of the newest version of p5.js by trying out this release candidate, and reporting bugs. The 2.1.0 minor release is now planned for release on **November ~7~ 10, 2025**. Open tasks related to documentation will also be included, and suggestions to improve the docs are welcome!

### Help testing...

* ...TypeScript integration
* ...p5.strands branching `if/else` and looping `for`
* ...[Addon Events API](https://github.com/processing/p5.js/issues/7946)
* ...[Color contrast checker](https://github.com/processing/p5.js/issues/6971), which you can use like this:

```js
   let bgColor, fg1Color, fg2Color, msg1, msg2;
   function setup() {
     createCanvas(100, 100);
     bgColor = color(0);
     fg1Color = color(100);
     fg2Color = color(220);
  
     if(bgColor.contrast(fg1Color)){
       msg1 = 'good';
     }else{
       msg1 = 'bad';
     }
  
     if(bgColor.contrast(fg2Color)){
       msg2 = 'good';
     }else{
       msg2 = 'bad';
     }
  
     describe('A black canvas with a faint grey word saying "bad" at the top left and a brighter light grey word saying "good" in the middle of the canvas.');
   }
  
   function draw(){
     background(bgColor);
  
     textSize(18);
  
     fill(fg1Color);
     text(msg1, 10, 30);
  
     fill(fg2Color);
     text(msg2, 10, 60);
   }
```

`oneColor.contrast(anotherColor)` checks the contrast between two colors. This method returns a boolean value to indicate if the two color has enough contrast. `true` means that  the colors has enough contrast to be used as background color and body text color. `false` means there is not enough contrast.

   A second argument can be passed to the method, `options` , which defines    the algorithm to be used. The algorithms currently supported are   WCAG 2.1 (`'WCAG21'`) or APCA (`'APCA'`). The default is WCAG 2.1. If a  value of `'all'` is passed to the `options` argument, an object containing   more details is returned. The details object will include the calculated  contrast value of the colors and different passing criteria.

```js
   let bgColor, fgColor, contrast;
   function setup() {
     createCanvas(100, 100);
     bgColor = color(0);
     fgColor = color(200);
     contrast = bgColor.contrast(fgColor, 'all');
  
     describe('A black canvas with four short lines of grey text that respectively says: "WCAG 2.1", "12.55", "APCA", and "-73.30".');
   }
  
   function draw(){
     background(bgColor);
  
     textSize(14);
  
     fill(fgColor);
     text('WCAG 2.1', 10, 25);
     text(nf(contrast.WCAG21.value, 0, 2), 10, 40);
  
     text('APCA', 10, 70);
     text(nf(contrast.APCA.value, 0, 2), 10, 85);
   }
```

   For more details about color contrast, you can check out <a href="https://colorjs.io/docs/contrast">this page from color.js</a>, and the <a href="https://webaim.org/resources/contrastchecker/">WebAIM color contrast checker.</a>
   
## What's Changed

These are updates since the [most recent release candidate](https://github.com/processing/p5.js/releases/tag/v2.1.0-rc.2).

### What's Changed 🎊
* Fix missing mouseButton property types by @nbogie in https://github.com/processing/p5.js/pull/8232
* Update preload error in 2.x by @ksen0 in https://github.com/processing/p5.js/pull/8239
* Stabilize behavior of createVector() with zero arguments by @perminder-17 in https://github.com/processing/p5.js/pull/8203


**Full Changelog**: https://github.com/processing/p5.js/compare/v2.1.0-rc.2...v2.1.0-rc.3

## v2.1.0-rc.2 — 2025-11-04 (prerelease)

## Help test the release candidate

* Copy & edit [this sketch](https://editor.p5js.org/ksen0/sketches/AVFf61Ap8)
* Or use this link to load the library: https://cdn.jsdelivr.net/npm/p5@2.1.0-rc.2/lib/p5.js

Here are all the updates for the **upcoming [2.1 milestone](https://github.com/processing/p5.js/issues/7937)**. This is a **release candidate** (RC), which means it is not yet live on the p5.js Editor. Please help us to improve the stability of the newest version of p5.js by trying out this release candidate, and reporting bugs. The 2.1.0 minor release is now planned for release on ~**November 7, 2025**~, unless there are bugs - then these will be fixed before release, with [the new release candidate available for testing](https://github.com/processing/p5.js/releases/tag/v2.1.0-rc.3) (for at least a week after the last major feature/code update). Open tasks related to documentation will also be included, and suggestions to improve the docs are welcome!

### Help testing...

* ...TypeScript integration
* ...p5.strands branching `if/else` and looping `for`
* ...[Addon Events API](https://github.com/processing/p5.js/issues/7946)
* ...[Color contrast checker](https://github.com/processing/p5.js/issues/6971), which you can use like this:

```js
   let bgColor, fg1Color, fg2Color, msg1, msg2;
   function setup() {
     createCanvas(100, 100);
     bgColor = color(0);
     fg1Color = color(100);
     fg2Color = color(220);
  
     if(bgColor.contrast(fg1Color)){
       msg1 = 'good';
     }else{
       msg1 = 'bad';
     }
  
     if(bgColor.contrast(fg2Color)){
       msg2 = 'good';
     }else{
       msg2 = 'bad';
     }
  
     describe('A black canvas with a faint grey word saying "bad" at the top left and a brighter light grey word saying "good" in the middle of the canvas.');
   }
  
   function draw(){
     background(bgColor);
  
     textSize(18);
  
     fill(fg1Color);
     text(msg1, 10, 30);
  
     fill(fg2Color);
     text(msg2, 10, 60);
   }
```

`oneColor.contrast(anotherColor)` checks the contrast between two colors. This method returns a boolean value to indicate if the two color has enough contrast. `true` means that  the colors has enough contrast to be used as background color and body text color. `false` means there is not enough contrast.

   A second argument can be passed to the method, `options` , which defines    the algorithm to be used. The algorithms currently supported are   WCAG 2.1 (`'WCAG21'`) or APCA (`'APCA'`). The default is WCAG 2.1. If a  value of `'all'` is passed to the `options` argument, an object containing   more details is returned. The details object will include the calculated  contrast value of the colors and different passing criteria.

```js
   let bgColor, fgColor, contrast;
   function setup() {
     createCanvas(100, 100);
     bgColor = color(0);
     fgColor = color(200);
     contrast = bgColor.contrast(fgColor, 'all');
  
     describe('A black canvas with four short lines of grey text that respectively says: "WCAG 2.1", "12.55", "APCA", and "-73.30".');
   }
  
   function draw(){
     background(bgColor);
  
     textSize(14);
  
     fill(fgColor);
     text('WCAG 2.1', 10, 25);
     text(nf(contrast.WCAG21.value, 0, 2), 10, 40);
  
     text('APCA', 10, 70);
     text(nf(contrast.APCA.value, 0, 2), 10, 85);
   }
```

   For more details about color contrast, you can check out <a href="https://colorjs.io/docs/contrast">this page from color.js</a>, and the <a href="https://webaim.org/resources/contrastchecker/">WebAIM color contrast checker.</a>
   
### What's Changed since 2.0 🎊
* fix: add splineVertex to p5.Graphics prototype and fix unit test error by @VANSH3104 in https://github.com/processing/p5.js/pull/7757
* [2.x] Fix ESM export functionality by @limzykenneth in https://github.com/processing/p5.js/pull/7764
* Fixed Error in FES prevents message from being shown, Prevented 'window' properties from being overwritten by @HughJacks in https://github.com/processing/p5.js/pull/7765
* Fix WebGL alpha blending by @davepagurek in https://github.com/processing/p5.js/pull/7769
* [2.0] Fix touch event not updating mouse coordinates by @limzykenneth in https://github.com/processing/p5.js/pull/7772
* Updating foundation-section for async/await by @perminder-17 in https://github.com/processing/p5.js/pull/7721
* fixing keyReleased() function.  by @perminder-17 in https://github.com/processing/p5.js/pull/7758
* Fix corrupted textures when rendering too many WebGL characters by @davepagurek in https://github.com/processing/p5.js/pull/7792
* Improve antialiased framebuffer performance by @davepagurek in https://github.com/processing/p5.js/pull/7794
* Fix FES check for image() not accepting some valid types by @limzykenneth in https://github.com/processing/p5.js/pull/7801
* Publish types on NPM with next release by @limzykenneth in https://github.com/processing/p5.js/pull/7802
* Fix typo in directionalLight reference (dev-2.0 branch) #7743 by @LalitNarayanYadav in https://github.com/processing/p5.js/pull/7778
* Remove dayjs dependency and update date formatting in banner by @error-four-o-four in https://github.com/processing/p5.js/pull/7804
* Rest types by @davepagurek in https://github.com/processing/p5.js/pull/7803
* Updating all the broken refrence examples.  by @perminder-17 in https://github.com/processing/p5.js/pull/7739
* Fixing keyTyped() for dev-2.0 branch  by @perminder-17 in https://github.com/processing/p5.js/pull/7809
* P2HDR docs       by @perminder-17 in https://github.com/processing/p5.js/pull/7728
* Update creating addon libraries contributor docs by @limzykenneth in https://github.com/processing/p5.js/pull/7800
* docs(keyboard): clarify keyIsDown() documentation for key codes and browser compatibility by @dpanshug in https://github.com/processing/p5.js/pull/7812
* Prevent FES from checking nested properties by @IIITM-Jay in https://github.com/processing/p5.js/pull/7824
* update the model params to be correct for 2.0 in docs and FES by @lukeplowden in https://github.com/processing/p5.js/pull/7832
* Model params updated for YUIDocs by @lukeplowden in https://github.com/processing/p5.js/pull/7835
* add instance of video in callback (2.0) by @ksen0 in https://github.com/processing/p5.js/pull/7877
* Add font readiness wait to create() function in p5.Font.js by @sophyphile in https://github.com/processing/p5.js/pull/7882
* Fix typo in createFileInput example by @ksen0 in https://github.com/processing/p5.js/pull/7884
* Create Graphics fixing in dev-2.0 branch.    by @perminder-17 in https://github.com/processing/p5.js/pull/7829
* Alias GLSL's mix function as lerp in p5.strands (#7875) by @LalitNarayanYadav in https://github.com/processing/p5.js/pull/7887
* added documentation to _getBrightness() and _getGreen() function by @FerrinThreatt in https://github.com/processing/p5.js/pull/7908
* Chore/upgrade eslint by @error-four-o-four in https://github.com/processing/p5.js/pull/7853
* Revamped config.yml(branch: dev-2.0) by @shivasankaran18 in https://github.com/processing/p5.js/pull/7776
* Update zod 3 to zod 4 support in p5.js dev-2.0 by @madhav2348 in https://github.com/processing/p5.js/pull/7872
* Updating visual tests docs for 2.x versions by @perminder-17 in https://github.com/processing/p5.js/pull/7827
* Skip adding degenerate faces in textToModel by @davepagurek in https://github.com/processing/p5.js/pull/7951
* Add GLSL-based noise(vec2) function to p5.strands (#7897) by @LalitNarayanYadav in https://github.com/processing/p5.js/pull/7921
* Fix inline anonymous functions causing a parsing error in p5.strands callbacks by @nking07049925 in https://github.com/processing/p5.js/pull/7956
* Fix p5.strands uniform calls, add instance mode construct by @davepagurek in https://github.com/processing/p5.js/pull/7961
* Enhance p5.strands noise() to support noise(x, y) and 4-octave fractal noise by @LalitNarayanYadav in https://github.com/processing/p5.js/pull/7964
* Adding docs for `code` in the refrence. by @perminder-17 in https://github.com/processing/p5.js/pull/7902
* Individual flags to disable part of FES by the user by @limzykenneth in https://github.com/processing/p5.js/pull/7967
* Add minified ESM build output by @nickswalker in https://github.com/processing/p5.js/pull/7973
* Replace fn with direct downloadFile import to fix issue where fn was not found by @acgillette in https://github.com/processing/p5.js/pull/7971
* Documentation fix for swapped parameters in splinePoint and bezierPoint by @shawdm in https://github.com/processing/p5.js/pull/7997
* Update dev-2.0 docs with recently-added contributors and stewards by @ksen0 in https://github.com/processing/p5.js/pull/8000
* Remove incorrect mouseX/mouseY docs regarding WEBGL mode in dev-2.0 branch. by @perminder-17 in https://github.com/processing/p5.js/pull/8006
* Fix MediaElement.copy by @pearmini in https://github.com/processing/p5.js/pull/7980
* Reset millis() after setup by @davepagurek in https://github.com/processing/p5.js/pull/8005
* Fix: Corrected code block in textureMode() in dev2.0 by @harishbit in https://github.com/processing/p5.js/pull/8015
* Merge branch 'loopOptimization' of https://github.com/awood0727/p5.js… by @awood0727 in https://github.com/processing/p5.js/pull/8024
* Update README.md by @perminder-17 in https://github.com/processing/p5.js/pull/8029
* Fixed syntax error at disableFriendleErrors by @Iron-56 in https://github.com/processing/p5.js/pull/8038
* Fix noise() getting overridden; add tests by @davepagurek in https://github.com/processing/p5.js/pull/8036
* A few documentation issues to fix by @perminder-17 in https://github.com/processing/p5.js/pull/8031
* Auto-link / Close Issues for 2.0 PRs (p5.js & p5.js-website) by @NalinDalal in https://github.com/processing/p5.js/pull/8025
* minor-fixing in shape docs by @perminder-17 in https://github.com/processing/p5.js/pull/8066
* Update auto-close-issues.yml by @ksen0 in https://github.com/processing/p5.js/pull/8069
* textWidth ignores leading and trailing spaces  by @Nitin2332 in https://github.com/processing/p5.js/pull/8067
* [WIP] Docs: Add initial draft of Strands documentation (feedback wanted) by @Abhayaj247 in https://github.com/processing/p5.js/pull/7940
* Fix most of the eslint warnings currently generated by @limzykenneth in https://github.com/processing/p5.js/pull/8063
* Addon Events API and User Defined Functions access by @limzykenneth in https://github.com/processing/p5.js/pull/7947
* Adding some examples for shapes. by @perminder-17 in https://github.com/processing/p5.js/pull/8070
* textToContours is broken under textAlign(CENTER,CENTER) and use linebreak by @perminder-17 in https://github.com/processing/p5.js/pull/8083
* reference-fix-2.0 by @Nitin2332 in https://github.com/processing/p5.js/pull/8086
* Include use of relevant maxes in `hue()`, `saturation()`, `brightness()` and `lightness()` by @limzykenneth in https://github.com/processing/p5.js/pull/8062
* Optimize bottlenecks in 2.0 code by @davepagurek in https://github.com/processing/p5.js/pull/8094
* Fix: allow single-arg atan() outside strands; add unit test by @Abhayaj247 in https://github.com/processing/p5.js/pull/8096
* [p5.strands] Significant refactor for p5.strands by @lukeplowden in https://github.com/processing/p5.js/pull/8009
* Update createCamera docs since it no longer sets the active camera by @davepagurek in https://github.com/processing/p5.js/pull/8100
* Use FES internationalization within the minor version by @ksen0 in https://github.com/processing/p5.js/pull/8106
* Comma included in load font by @perminder-17 in https://github.com/processing/p5.js/pull/8084
* typography error message fixes by @Nitin2332 in https://github.com/processing/p5.js/pull/8115
* Re-bind globals when assigned in addons by @davepagurek in https://github.com/processing/p5.js/pull/8099
* fromAngle returns a 2D Vector by @ksen0 in https://github.com/processing/p5.js/pull/8142
* Bugfix: Prevent genType from being inferred as int in GLSL wrappers by @reshma045 in https://github.com/processing/p5.js/pull/7942
* Skip text/gridOutput with a warning in WebGL in 2.0 by @davepagurek in https://github.com/processing/p5.js/pull/8147
* Add 3D noise(vec3) support to p5.strands by @LalitNarayanYadav in https://github.com/processing/p5.js/pull/7978
* fixed the bug of black-frames by @ayushman1210 in https://github.com/processing/p5.js/pull/8132
* Branching and looping for p5.strands by @davepagurek in https://github.com/processing/p5.js/pull/8120
* Refactor typescript type generation by @davepagurek in https://github.com/processing/p5.js/pull/8114
* [dev-2.0] Fix optional and rest parameters in TypeScript class method declarations by @SoundOfScooting in https://github.com/processing/p5.js/pull/7863
* Adding Visual Test Report in Github Actions by @Vaivaswat2244 in https://github.com/processing/p5.js/pull/7653
* Only create FilterRenderer2D lazily by @davepagurek in https://github.com/processing/p5.js/pull/8181
* Add missing color module exports by @limzykenneth in https://github.com/processing/p5.js/pull/8182
* Updated 1.x manual tests by @ksen0 in https://github.com/processing/p5.js/pull/8168
* Fix filters on framebuffers of a different size than the canvas by @davepagurek in https://github.com/processing/p5.js/pull/8193
* Vector toString() consistency fix by @limzykenneth in https://github.com/processing/p5.js/pull/8191
* Add contrast() function to check contrast ratio for two colors by @FerrinThreatt in https://github.com/processing/p5.js/pull/7944
* Fix FES stack frame access for internal errors by @davepagurek in https://github.com/processing/p5.js/pull/8175
* Fix usage of fn in MediaElement.connect by @davepagurek in https://github.com/processing/p5.js/pull/8176
* Fix errors in simplifyThreshold in textToPoints by @davepagurek in https://github.com/processing/p5.js/pull/8178
* Fix bugs in buildGeometry by @davepagurek in https://github.com/processing/p5.js/pull/8185
* Fix generation of UVs in rounded rectangles by @davepagurek in https://github.com/processing/p5.js/pull/8197
* Fix buildGeometry with no faces by @davepagurek in https://github.com/processing/p5.js/pull/8207
* Fix varying variables in p5.strands by @davepagurek in https://github.com/processing/p5.js/pull/8223
* docs: update module usage instructions to remove Grunt and reflect dev-2.0 tooling #7871 by @LalitNarayanYadav in https://github.com/processing/p5.js/pull/7886
* Fix handling of vector arguments to noise() in p5.strands by @davepagurek in https://github.com/processing/p5.js/pull/8227

## New Contributors
* @HughJacks made their first contribution in https://github.com/processing/p5.js/pull/7765
* @dpanshug made their first contribution in https://github.com/processing/p5.js/pull/7812
* @sophyphile made their first contribution in https://github.com/processing/p5.js/pull/7882
* @FerrinThreatt made their first contribution in https://github.com/processing/p5.js/pull/7908
* @madhav2348 made their first contribution in https://github.com/processing/p5.js/pull/7872
* @nking07049925 made their first contribution in https://github.com/processing/p5.js/pull/7956
* @nickswalker made their first contribution in https://github.com/processing/p5.js/pull/7973
* @acgillette made their first contribution in https://github.com/processing/p5.js/pull/7971
* @Iron-56 made their first contribution in https://github.com/processing/p5.js/pull/8038
* @Abhayaj247 made their first contribution in https://github.com/processing/p5.js/pull/7940
* @reshma045 made their first contribution in https://github.com/processing/p5.js/pull/7942
* @ayushman1210 made their first contribution in https://github.com/processing/p5.js/pull/8132
* @SoundOfScooting made their first contribution in https://github.com/processing/p5.js/pull/7863

**Full Changelog**: https://github.com/processing/p5.js/compare/v2.0.0...v2.1.0-rc.2

## v2.1.0-rc.1 — 2025-10-31 (prerelease)

<!-- Release notes generated using configuration in .github/release.yml at v2.1.0-rc.1 -->
## Help test the release candidate

https://cdn.jsdelivr.net/npm/p5@2.1.0-rc.1/lib/p5.js

Here are all the updates for the **upcoming [2.1 milestone](https://github.com/processing/p5.js/issues/7937)**. This is a **release candidate** (RC), which means it is not yet live on the p5.js Editor. Please help us to improve the stability of the newest version of p5.js by trying out this release candidate, and reporting bugs. The 2.1.0 minor release is now planned for release on **November 7, 2025**, unless there are bugs - then these will be fixed before release, with the release candidate available for testing for a week. Open tasks related to documentation will also be included, and suggestions to improve the docs are welcome!

### Help testing...

* ...TypeScript integration
* ...p5.strands branching `if/else` and looping `for`
* ...[Addon Events API](https://github.com/processing/p5.js/issues/7946)
* ...[Color contrast checker](https://github.com/processing/p5.js/issues/6971), which you can use like this:

```js
   let bgColor, fg1Color, fg2Color, msg1, msg2;
   function setup() {
     createCanvas(100, 100);
     bgColor = color(0);
     fg1Color = color(100);
     fg2Color = color(220);
  
     if(bgColor.contrast(fg1Color)){
       msg1 = 'good';
     }else{
       msg1 = 'bad';
     }
  
     if(bgColor.contrast(fg2Color)){
       msg2 = 'good';
     }else{
       msg2 = 'bad';
     }
  
     describe('A black canvas with a faint grey word saying "bad" at the top left and a brighter light grey word saying "good" in the middle of the canvas.');
   }
  
   function draw(){
     background(bgColor);
  
     textSize(18);
  
     fill(fg1Color);
     text(msg1, 10, 30);
  
     fill(fg2Color);
     text(msg2, 10, 60);
   }
```

`oneColor.contrast(anotherColor)` checks the contrast between two colors. This method returns a boolean value to indicate if the two color has enough contrast. `true` means that  the colors has enough contrast to be used as background color and body text color. `false` means there is not enough contrast.

   A second argument can be passed to the method, `options` , which defines    the algorithm to be used. The algorithms currently supported are   WCAG 2.1 (`'WCAG21'`) or APCA (`'APCA'`). The default is WCAG 2.1. If a  value of `'all'` is passed to the `options` argument, an object containing   more details is returned. The details object will include the calculated  contrast value of the colors and different passing criteria.

```js
   let bgColor, fgColor, contrast;
   function setup() {
     createCanvas(100, 100);
     bgColor = color(0);
     fgColor = color(200);
     contrast = bgColor.contrast(fgColor, 'all');
  
     describe('A black canvas with four short lines of grey text that respectively says: "WCAG 2.1", "12.55", "APCA", and "-73.30".');
   }
  
   function draw(){
     background(bgColor);
  
     textSize(14);
  
     fill(fgColor);
     text('WCAG 2.1', 10, 25);
     text(nf(contrast.WCAG21.value, 0, 2), 10, 40);
  
     text('APCA', 10, 70);
     text(nf(contrast.APCA.value, 0, 2), 10, 85);
   }
```

   For more details about color contrast, you can check out <a href="https://colorjs.io/docs/contrast">this page from color.js</a>, and the <a href="https://webaim.org/resources/contrastchecker/">WebAIM color contrast checker.</a>
   
### What's Changed since 2.0 🎊
* fix: add splineVertex to p5.Graphics prototype and fix unit test error by @VANSH3104 in https://github.com/processing/p5.js/pull/7757
* [2.x] Fix ESM export functionality by @limzykenneth in https://github.com/processing/p5.js/pull/7764
* Fixed Error in FES prevents message from being shown, Prevented 'window' properties from being overwritten by @HughJacks in https://github.com/processing/p5.js/pull/7765
* Fix WebGL alpha blending by @davepagurek in https://github.com/processing/p5.js/pull/7769
* [2.0] Fix touch event not updating mouse coordinates by @limzykenneth in https://github.com/processing/p5.js/pull/7772
* Updating foundation-section for async/await by @perminder-17 in https://github.com/processing/p5.js/pull/7721
* fixing keyReleased() function.  by @perminder-17 in https://github.com/processing/p5.js/pull/7758
* Fix corrupted textures when rendering too many WebGL characters by @davepagurek in https://github.com/processing/p5.js/pull/7792
* Improve antialiased framebuffer performance by @davepagurek in https://github.com/processing/p5.js/pull/7794
* Fix FES check for image() not accepting some valid types by @limzykenneth in https://github.com/processing/p5.js/pull/7801
* Publish types on NPM with next release by @limzykenneth in https://github.com/processing/p5.js/pull/7802
* Fix typo in directionalLight reference (dev-2.0 branch) #7743 by @LalitNarayanYadav in https://github.com/processing/p5.js/pull/7778
* Remove dayjs dependency and update date formatting in banner by @error-four-o-four in https://github.com/processing/p5.js/pull/7804
* Rest types by @davepagurek in https://github.com/processing/p5.js/pull/7803
* Updating all the broken refrence examples.  by @perminder-17 in https://github.com/processing/p5.js/pull/7739
* Fixing keyTyped() for dev-2.0 branch  by @perminder-17 in https://github.com/processing/p5.js/pull/7809
* P2HDR docs       by @perminder-17 in https://github.com/processing/p5.js/pull/7728
* Update creating addon libraries contributor docs by @limzykenneth in https://github.com/processing/p5.js/pull/7800
* docs(keyboard): clarify keyIsDown() documentation for key codes and browser compatibility by @dpanshug in https://github.com/processing/p5.js/pull/7812
* Prevent FES from checking nested properties by @IIITM-Jay in https://github.com/processing/p5.js/pull/7824
* update the model params to be correct for 2.0 in docs and FES by @lukeplowden in https://github.com/processing/p5.js/pull/7832
* Model params updated for YUIDocs by @lukeplowden in https://github.com/processing/p5.js/pull/7835
* add instance of video in callback (2.0) by @ksen0 in https://github.com/processing/p5.js/pull/7877
* Add font readiness wait to create() function in p5.Font.js by @sophyphile in https://github.com/processing/p5.js/pull/7882
* Fix typo in createFileInput example by @ksen0 in https://github.com/processing/p5.js/pull/7884
* Create Graphics fixing in dev-2.0 branch.    by @perminder-17 in https://github.com/processing/p5.js/pull/7829
* Alias GLSL's mix function as lerp in p5.strands (#7875) by @LalitNarayanYadav in https://github.com/processing/p5.js/pull/7887
* added documentation to _getBrightness() and _getGreen() function by @FerrinThreatt in https://github.com/processing/p5.js/pull/7908
* Chore/upgrade eslint by @error-four-o-four in https://github.com/processing/p5.js/pull/7853
* Revamped config.yml(branch: dev-2.0) by @shivasankaran18 in https://github.com/processing/p5.js/pull/7776
* Update zod 3 to zod 4 support in p5.js dev-2.0 by @madhav2348 in https://github.com/processing/p5.js/pull/7872
* Updating visual tests docs for 2.x versions by @perminder-17 in https://github.com/processing/p5.js/pull/7827
* Skip adding degenerate faces in textToModel by @davepagurek in https://github.com/processing/p5.js/pull/7951
* Add GLSL-based noise(vec2) function to p5.strands (#7897) by @LalitNarayanYadav in https://github.com/processing/p5.js/pull/7921
* Fix inline anonymous functions causing a parsing error in p5.strands callbacks by @nking07049925 in https://github.com/processing/p5.js/pull/7956
* Fix p5.strands uniform calls, add instance mode construct by @davepagurek in https://github.com/processing/p5.js/pull/7961
* Enhance p5.strands noise() to support noise(x, y) and 4-octave fractal noise by @LalitNarayanYadav in https://github.com/processing/p5.js/pull/7964
* Adding docs for `code` in the refrence. by @perminder-17 in https://github.com/processing/p5.js/pull/7902
* Individual flags to disable part of FES by the user by @limzykenneth in https://github.com/processing/p5.js/pull/7967
* Add minified ESM build output by @nickswalker in https://github.com/processing/p5.js/pull/7973
* Replace fn with direct downloadFile import to fix issue where fn was not found by @acgillette in https://github.com/processing/p5.js/pull/7971
* Documentation fix for swapped parameters in splinePoint and bezierPoint by @shawdm in https://github.com/processing/p5.js/pull/7997
* Update dev-2.0 docs with recently-added contributors and stewards by @ksen0 in https://github.com/processing/p5.js/pull/8000
* Remove incorrect mouseX/mouseY docs regarding WEBGL mode in dev-2.0 branch. by @perminder-17 in https://github.com/processing/p5.js/pull/8006
* Fix MediaElement.copy by @pearmini in https://github.com/processing/p5.js/pull/7980
* Reset millis() after setup by @davepagurek in https://github.com/processing/p5.js/pull/8005
* Fix: Corrected code block in textureMode() in dev2.0 by @harishbit in https://github.com/processing/p5.js/pull/8015
* Merge branch 'loopOptimization' of https://github.com/awood0727/p5.js… by @awood0727 in https://github.com/processing/p5.js/pull/8024
* Update README.md by @perminder-17 in https://github.com/processing/p5.js/pull/8029
* Fixed syntax error at disableFriendleErrors by @Iron-56 in https://github.com/processing/p5.js/pull/8038
* Fix noise() getting overridden; add tests by @davepagurek in https://github.com/processing/p5.js/pull/8036
* A few documentation issues to fix by @perminder-17 in https://github.com/processing/p5.js/pull/8031
* Auto-link / Close Issues for 2.0 PRs (p5.js & p5.js-website) by @NalinDalal in https://github.com/processing/p5.js/pull/8025
* minor-fixing in shape docs by @perminder-17 in https://github.com/processing/p5.js/pull/8066
* Update auto-close-issues.yml by @ksen0 in https://github.com/processing/p5.js/pull/8069
* textWidth ignores leading and trailing spaces  by @Nitin2332 in https://github.com/processing/p5.js/pull/8067
* [WIP] Docs: Add initial draft of Strands documentation (feedback wanted) by @Abhayaj247 in https://github.com/processing/p5.js/pull/7940
* Fix most of the eslint warnings currently generated by @limzykenneth in https://github.com/processing/p5.js/pull/8063
* Addon Events API and User Defined Functions access by @limzykenneth in https://github.com/processing/p5.js/pull/7947
* Adding some examples for shapes. by @perminder-17 in https://github.com/processing/p5.js/pull/8070
* textToContours is broken under textAlign(CENTER,CENTER) and use linebreak by @perminder-17 in https://github.com/processing/p5.js/pull/8083
* reference-fix-2.0 by @Nitin2332 in https://github.com/processing/p5.js/pull/8086
* Include use of relevant maxes in `hue()`, `saturation()`, `brightness()` and `lightness()` by @limzykenneth in https://github.com/processing/p5.js/pull/8062
* Optimize bottlenecks in 2.0 code by @davepagurek in https://github.com/processing/p5.js/pull/8094
* Fix: allow single-arg atan() outside strands; add unit test by @Abhayaj247 in https://github.com/processing/p5.js/pull/8096
* [p5.strands] Significant refactor for p5.strands by @lukeplowden in https://github.com/processing/p5.js/pull/8009
* Update createCamera docs since it no longer sets the active camera by @davepagurek in https://github.com/processing/p5.js/pull/8100
* Use FES internationalization within the minor version by @ksen0 in https://github.com/processing/p5.js/pull/8106
* Comma included in load font by @perminder-17 in https://github.com/processing/p5.js/pull/8084
* typography error message fixes by @Nitin2332 in https://github.com/processing/p5.js/pull/8115
* Re-bind globals when assigned in addons by @davepagurek in https://github.com/processing/p5.js/pull/8099
* fromAngle returns a 2D Vector by @ksen0 in https://github.com/processing/p5.js/pull/8142
* Bugfix: Prevent genType from being inferred as int in GLSL wrappers by @reshma045 in https://github.com/processing/p5.js/pull/7942
* Skip text/gridOutput with a warning in WebGL in 2.0 by @davepagurek in https://github.com/processing/p5.js/pull/8147
* Add 3D noise(vec3) support to p5.strands by @LalitNarayanYadav in https://github.com/processing/p5.js/pull/7978
* fixed the bug of black-frames by @ayushman1210 in https://github.com/processing/p5.js/pull/8132
* Branching and looping for p5.strands by @davepagurek in https://github.com/processing/p5.js/pull/8120
* Refactor typescript type generation by @davepagurek in https://github.com/processing/p5.js/pull/8114
* [dev-2.0] Fix optional and rest parameters in TypeScript class method declarations by @SoundOfScooting in https://github.com/processing/p5.js/pull/7863
* Adding Visual Test Report in Github Actions by @Vaivaswat2244 in https://github.com/processing/p5.js/pull/7653
* Only create FilterRenderer2D lazily by @davepagurek in https://github.com/processing/p5.js/pull/8181
* Add missing color module exports by @limzykenneth in https://github.com/processing/p5.js/pull/8182
* Updated 1.x manual tests by @ksen0 in https://github.com/processing/p5.js/pull/8168
* Fix filters on framebuffers of a different size than the canvas by @davepagurek in https://github.com/processing/p5.js/pull/8193
* Vector toString() consistency fix by @limzykenneth in https://github.com/processing/p5.js/pull/8191
* Add contrast() function to check contrast ratio for two colors by @FerrinThreatt in https://github.com/processing/p5.js/pull/7944

## New Contributors
* @HughJacks made their first contribution in https://github.com/processing/p5.js/pull/7765
* @dpanshug made their first contribution in https://github.com/processing/p5.js/pull/7812
* @sophyphile made their first contribution in https://github.com/processing/p5.js/pull/7882
* @FerrinThreatt made their first contribution in https://github.com/processing/p5.js/pull/7908
* @madhav2348 made their first contribution in https://github.com/processing/p5.js/pull/7872
* @nking07049925 made their first contribution in https://github.com/processing/p5.js/pull/7956
* @nickswalker made their first contribution in https://github.com/processing/p5.js/pull/7973
* @acgillette made their first contribution in https://github.com/processing/p5.js/pull/7971
* @Iron-56 made their first contribution in https://github.com/processing/p5.js/pull/8038
* @Abhayaj247 made their first contribution in https://github.com/processing/p5.js/pull/7940
* @reshma045 made their first contribution in https://github.com/processing/p5.js/pull/7942
* @ayushman1210 made their first contribution in https://github.com/processing/p5.js/pull/8132
* @SoundOfScooting made their first contribution in https://github.com/processing/p5.js/pull/7863

**Full Changelog**: https://github.com/processing/p5.js/compare/v2.0.0...v2.1.0-rc.1

## v2.1.0-rc.0 — 2025-10-20 (prerelease)

<!-- Release notes generated using configuration in .github/release.yml at v2.1.0-rc.0 -->

## Help test the release candidate

https://cdn.jsdelivr.net/npm/p5@2.1.0-rc.0/lib/p5.js

Here are all the updates for the **upcoming [2.1 milestone](https://github.com/processing/p5.js/issues/7937)**. This is a **release candidate** (RC), which means it is not yet live on the p5.js Editor. Please help us to improve the stability of the newest version of p5.js by trying out this release candidate, and reporting bugs. The 2.1.0 minor release is planned for release on ~**October 27, 2025**~, unless there are bugs - then these will be fixed before release.

_EDIT: [New release candidate and date](https://github.com/processing/p5.js/releases/tag/v2.1.0-rc.1)_

### Help testing...

* ...TypeScript integration
* ...p5.strands branching `if/else` and looping `for`
* ...[Addon Events API](https://github.com/processing/p5.js/issues/7946)

### What's Changed 🎊
* [2.x] Fix ESM export functionality by @limzykenneth in https://github.com/processing/p5.js/pull/7764
* Publish types on NPM with next release by @limzykenneth in https://github.com/processing/p5.js/pull/7802
* fix: add splineVertex to p5.Graphics prototype and fix unit test error by @VANSH3104 in https://github.com/processing/p5.js/pull/7757
* Fixed Error in FES prevents message from being shown, Prevented 'window' properties from being overwritten by @HughJacks in https://github.com/processing/p5.js/pull/7765
* Fix WebGL alpha blending by @davepagurek in https://github.com/processing/p5.js/pull/7769
* [2.0] Fix touch event not updating mouse coordinates by @limzykenneth in https://github.com/processing/p5.js/pull/7772
* Updating foundation-section for async/await by @perminder-17 in https://github.com/processing/p5.js/pull/7721
* fixing keyReleased() function.  by @perminder-17 in https://github.com/processing/p5.js/pull/7758
* Fix corrupted textures when rendering too many WebGL characters by @davepagurek in https://github.com/processing/p5.js/pull/7792
* Improve antialiased framebuffer performance by @davepagurek in https://github.com/processing/p5.js/pull/7794
* Fix FES check for image() not accepting some valid types by @limzykenneth in https://github.com/processing/p5.js/pull/7801
* Fix typo in directionalLight reference (dev-2.0 branch) #7743 by @LalitNarayanYadav in https://github.com/processing/p5.js/pull/7778
* Remove dayjs dependency and update date formatting in banner by @error-four-o-four in https://github.com/processing/p5.js/pull/7804
* Rest types by @davepagurek in https://github.com/processing/p5.js/pull/7803
* Updating all the broken refrence examples.  by @perminder-17 in https://github.com/processing/p5.js/pull/7739
* Fixing keyTyped() for dev-2.0 branch  by @perminder-17 in https://github.com/processing/p5.js/pull/7809
* P2HDR docs       by @perminder-17 in https://github.com/processing/p5.js/pull/7728
* Update creating addon libraries contributor docs by @limzykenneth in https://github.com/processing/p5.js/pull/7800
* docs(keyboard): clarify keyIsDown() documentation for key codes and browser compatibility by @dpanshug in https://github.com/processing/p5.js/pull/7812
* Prevent FES from checking nested properties by @IIITM-Jay in https://github.com/processing/p5.js/pull/7824
* update the model params to be correct for 2.0 in docs and FES by @lukeplowden in https://github.com/processing/p5.js/pull/7832
* Model params updated for YUIDocs by @lukeplowden in https://github.com/processing/p5.js/pull/7835
* add instance of video in callback (2.0) by @ksen0 in https://github.com/processing/p5.js/pull/7877
* Add font readiness wait to create() function in p5.Font.js by @sophyphile in https://github.com/processing/p5.js/pull/7882
* Fix typo in createFileInput example by @ksen0 in https://github.com/processing/p5.js/pull/7884
* Create Graphics fixing in dev-2.0 branch.    by @perminder-17 in https://github.com/processing/p5.js/pull/7829
* Alias GLSL's mix function as lerp in p5.strands (#7875) by @LalitNarayanYadav in https://github.com/processing/p5.js/pull/7887
* added documentation to _getBrightness() and _getGreen() function by @FerrinThreatt in https://github.com/processing/p5.js/pull/7908
* Chore/upgrade eslint by @error-four-o-four in https://github.com/processing/p5.js/pull/7853
* Revamped config.yml(branch: dev-2.0) by @shivasankaran18 in https://github.com/processing/p5.js/pull/7776
* Update zod 3 to zod 4 support in p5.js dev-2.0 by @madhav2348 in https://github.com/processing/p5.js/pull/7872
* Updating visual tests docs for 2.x versions by @perminder-17 in https://github.com/processing/p5.js/pull/7827
* Skip adding degenerate faces in textToModel by @davepagurek in https://github.com/processing/p5.js/pull/7951
* Add GLSL-based noise(vec2) function to p5.strands (#7897) by @LalitNarayanYadav in https://github.com/processing/p5.js/pull/7921
* Fix inline anonymous functions causing a parsing error in p5.strands callbacks by @nking07049925 in https://github.com/processing/p5.js/pull/7956
* Fix p5.strands uniform calls, add instance mode construct by @davepagurek in https://github.com/processing/p5.js/pull/7961
* Enhance p5.strands noise() to support noise(x, y) and 4-octave fractal noise by @LalitNarayanYadav in https://github.com/processing/p5.js/pull/7964
* Adding docs for `code` in the refrence. by @perminder-17 in https://github.com/processing/p5.js/pull/7902
* Individual flags to disable part of FES by the user by @limzykenneth in https://github.com/processing/p5.js/pull/7967
* Add minified ESM build output by @nickswalker in https://github.com/processing/p5.js/pull/7973
* Replace fn with direct downloadFile import to fix issue where fn was not found by @acgillette in https://github.com/processing/p5.js/pull/7971
* Documentation fix for swapped parameters in splinePoint and bezierPoint by @shawdm in https://github.com/processing/p5.js/pull/7997
* Update dev-2.0 docs with recently-added contributors and stewards by @ksen0 in https://github.com/processing/p5.js/pull/8000
* Remove incorrect mouseX/mouseY docs regarding WEBGL mode in dev-2.0 branch. by @perminder-17 in https://github.com/processing/p5.js/pull/8006
* Fix MediaElement.copy by @pearmini in https://github.com/processing/p5.js/pull/7980
* Reset millis() after setup by @davepagurek in https://github.com/processing/p5.js/pull/8005
* Fix: Corrected code block in textureMode() in dev2.0 by @harishbit in https://github.com/processing/p5.js/pull/8015
* Merge branch 'loopOptimization' of https://github.com/awood0727/p5.js… by @awood0727 in https://github.com/processing/p5.js/pull/8024
* Update README.md by @perminder-17 in https://github.com/processing/p5.js/pull/8029
* Fixed syntax error at disableFriendleErrors by @Iron-56 in https://github.com/processing/p5.js/pull/8038
* Fix noise() getting overridden; add tests by @davepagurek in https://github.com/processing/p5.js/pull/8036
* A few documentation issues to fix by @perminder-17 in https://github.com/processing/p5.js/pull/8031
* Auto-link / Close Issues for 2.0 PRs (p5.js & p5.js-website) by @NalinDalal in https://github.com/processing/p5.js/pull/8025
* minor-fixing in shape docs by @perminder-17 in https://github.com/processing/p5.js/pull/8066
* Update auto-close-issues.yml by @ksen0 in https://github.com/processing/p5.js/pull/8069
* textWidth ignores leading and trailing spaces  by @Nitin2332 in https://github.com/processing/p5.js/pull/8067
* [WIP] Docs: Add initial draft of Strands documentation (feedback wanted) by @Abhayaj247 in https://github.com/processing/p5.js/pull/7940
* Fix most of the eslint warnings currently generated by @limzykenneth in https://github.com/processing/p5.js/pull/8063
* Addon Events API and User Defined Functions access by @limzykenneth in https://github.com/processing/p5.js/pull/7947
* Adding some examples for shapes. by @perminder-17 in https://github.com/processing/p5.js/pull/8070
* textToContours is broken under textAlign(CENTER,CENTER) and use linebreak by @perminder-17 in https://github.com/processing/p5.js/pull/8083
* reference-fix-2.0 by @Nitin2332 in https://github.com/processing/p5.js/pull/8086
* Include use of relevant maxes in `hue()`, `saturation()`, `brightness()` and `lightness()` by @limzykenneth in https://github.com/processing/p5.js/pull/8062
* Optimize bottlenecks in 2.0 code by @davepagurek in https://github.com/processing/p5.js/pull/8094
* Fix: allow single-arg atan() outside strands; add unit test by @Abhayaj247 in https://github.com/processing/p5.js/pull/8096
* [p5.strands] Significant refactor for p5.strands by @lukeplowden in https://github.com/processing/p5.js/pull/8009
* Update createCamera docs since it no longer sets the active camera by @davepagurek in https://github.com/processing/p5.js/pull/8100
* Use FES internationalization within the minor version by @ksen0 in https://github.com/processing/p5.js/pull/8106
* Comma included in load font by @perminder-17 in https://github.com/processing/p5.js/pull/8084
* typography error message fixes by @Nitin2332 in https://github.com/processing/p5.js/pull/8115
* Re-bind globals when assigned in addons by @davepagurek in https://github.com/processing/p5.js/pull/8099
* fromAngle returns a 2D Vector by @ksen0 in https://github.com/processing/p5.js/pull/8142
* Bugfix: Prevent genType from being inferred as int in GLSL wrappers by @reshma045 in https://github.com/processing/p5.js/pull/7942
* Skip text/gridOutput with a warning in WebGL in 2.0 by @davepagurek in https://github.com/processing/p5.js/pull/8147
* Add 3D noise(vec3) support to p5.strands by @LalitNarayanYadav in https://github.com/processing/p5.js/pull/7978
* fixed the bug of black-frames by @ayushman1210 in https://github.com/processing/p5.js/pull/8132
* Branching and looping for p5.strands by @davepagurek in https://github.com/processing/p5.js/pull/8120
* Refactor typescript type generation by @davepagurek in https://github.com/processing/p5.js/pull/8114
* [dev-2.0] Fix optional and rest parameters in TypeScript class method declarations by @SoundOfScooting in https://github.com/processing/p5.js/pull/7863

## New Contributors
* @HughJacks made their first contribution in https://github.com/processing/p5.js/pull/7765
* @dpanshug made their first contribution in https://github.com/processing/p5.js/pull/7812
* @sophyphile made their first contribution in https://github.com/processing/p5.js/pull/7882
* @FerrinThreatt made their first contribution in https://github.com/processing/p5.js/pull/7908
* @madhav2348 made their first contribution in https://github.com/processing/p5.js/pull/7872
* @nking07049925 made their first contribution in https://github.com/processing/p5.js/pull/7956
* @nickswalker made their first contribution in https://github.com/processing/p5.js/pull/7973
* @acgillette made their first contribution in https://github.com/processing/p5.js/pull/7971
* @Iron-56 made their first contribution in https://github.com/processing/p5.js/pull/8038
* @Abhayaj247 made their first contribution in https://github.com/processing/p5.js/pull/7940
* @reshma045 made their first contribution in https://github.com/processing/p5.js/pull/7942
* @ayushman1210 made their first contribution in https://github.com/processing/p5.js/pull/8132
* @SoundOfScooting made their first contribution in https://github.com/processing/p5.js/pull/7863

**Full Changelog**: https://github.com/processing/p5.js/compare/v2.0.0...v2.1.0-rc.0

## v1.11.11 — 2025-10-20

<!-- Release notes generated using configuration in .github/release.yml at v1.11.11 -->


## How to Use

To use this version, import p5.js from: https://cdn.jsdelivr.net/npm/p5@1.11.11/lib/p5.min.js or [duplicate this sketch](https://editor.p5js.org/ksen0/sketches/MiERoJYJA)

In the p5.js Editor, make sure this is in the `index.html` page:

```html
<script src="https://cdn.jsdelivr.net/npm/p5@1.11.11/lib/p5.min.js"></script>
```

### Problems or Questions?

You can [post an issue on GitHub](https://github.com/processing/p5.js/issues) or [ask on Discord](https://discord.gg/BdWRxMCH)

### Next Release?

Currently, we are focusing on expanding and improving 2.x - therefore, no new features will be added to 1.x. However, the goal is to keep 1.x available as a stable version of p5.js longer-term, so bugfinding, bugfixes and documentation improvements are welcome. Any new release will first have a **release candidate** available for testing, which is available on GitHub, for several weeks beforehand.

### What's Changed 🎊

Because the focus is on p5.js 1.x stability, most of the updates are improvements in documentation, related to development workflow, or bugfixes:

* Replaced redundant else if statement with else statement by @awood0727 in https://github.com/processing/p5.js/pull/8016
* docs: add kangjung as a contributor for translation by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8053
* Fix misspellings in comment by @AlzaAlzaki76 in https://github.com/processing/p5.js/pull/8057
* docs: add AlzaAlzaki76 as a contributor for doc by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8059
* docs: add hana-cho as a contributor for translation by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8054
* Update contributor_guidelines.md by @ksen0 in https://github.com/processing/p5.js/pull/8044
* docs: add eslteacher902010 as a contributor for code by @allcontributors[bot] in https://github.com/processing/p5.js/pull/7954
* Auto-link / Close Issues for 2.0 PRs (p5.js & p5.js-website) by @NalinDalal in https://github.com/processing/p5.js/pull/8064
* docs: add Abhayaj247 as a contributor for doc by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8071
* docs: add Homaid as a contributor for a11y, and code by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8076
* Update contributor_guidelines.md - how and when maintainers and stewards assign tasks by @ksen0 in https://github.com/processing/p5.js/pull/8080
* Reference-fixes by @Nitin2332 in https://github.com/processing/p5.js/pull/8075
* docs: add junseok44 as a contributor for code by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8085
* docs: add tychedelia as a contributor for code by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8087
* Use FES internationalization within the minor version by @ksen0 in https://github.com/processing/p5.js/pull/7878
* Revise security policy and reporting guidelines by @ksen0 in https://github.com/processing/p5.js/pull/8111
* Fix misspellings in docs by @AlzaAlzaki76 in https://github.com/processing/p5.js/pull/8116
* Use correct type for event param of windowResized by @yogan in https://github.com/processing/p5.js/pull/8129
* Global flag and escape char fixes in regular expression by @ksen0 in https://github.com/processing/p5.js/pull/8107
* Fix Broken examples for textOutput() and gridOutput()  by @hxrshxz in https://github.com/processing/p5.js/pull/8125
* Enhance documentation for textOutput and gridOutput methods by @hxrshxz in https://github.com/processing/p5.js/pull/8143
* Add marioguzzzman as Spanish i18n steward by @ksen0 in https://github.com/processing/p5.js/pull/8144
* Throwing friendly error in webgl mode when using gridOutput() and textOutput() by @Somnath-Mishra in https://github.com/processing/p5.js/pull/6491
* docs: add ayushman1210 as a contributor for code by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8161
* chore: update README table from stewards.yml by @ksen0 in https://github.com/processing/p5.js/pull/8145
* fix: (workflow) Invalid action input by @MannuVilasara in https://github.com/processing/p5.js/pull/8136
* docs: add Somnath-Mishra as a contributor for code by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8148
* docs: add reshma045 as a contributor for code by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8146
* docs: add MannuVilasara as a contributor for code by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8165
* Updated 1.x manual tests by @ksen0 in https://github.com/processing/p5.js/pull/8167
* Update radio input manual test by @ksen0 in https://github.com/processing/p5.js/pull/8169

## New Contributors
* @AlzaAlzaki76 made their first contribution in https://github.com/processing/p5.js/pull/8057
* @yogan made their first contribution in https://github.com/processing/p5.js/pull/8129
* @hxrshxz made their first contribution in https://github.com/processing/p5.js/pull/8125
* @Somnath-Mishra made their first contribution in https://github.com/processing/p5.js/pull/6491
* @MannuVilasara made their first contribution in https://github.com/processing/p5.js/pull/8136

**Full Changelog**: https://github.com/processing/p5.js/compare/v1.11.10...v1.11.11

## v1.11.11-rc.1 — 2025-10-20 (prerelease)

<!-- Release notes generated using configuration in .github/release.yml at v1.11.11-rc.1 -->

## How to test

Please report any issues you find with this release candidate before it goes live as the next version of 1.x! To help test, you can use the downloads below. In the p5.js Editor, you can upload p5.min.js and use it in the `index.html` page.

## What's Changed

Below are the changes in [1.11.11-rc.1](https://github.com/processing/p5.js/releases/tag/v1.11.11-rc.1) - primarily documentation, but also addressing some dependency updates and a bugfix.

### What's Changed 🎊
* Revise security policy and reporting guidelines by @ksen0 in https://github.com/processing/p5.js/pull/8111
* Fix misspellings in docs by @AlzaAlzaki76 in https://github.com/processing/p5.js/pull/8116
* Use correct type for event param of windowResized by @yogan in https://github.com/processing/p5.js/pull/8129
* Global flag and escape char fixes in regular expression by @ksen0 in https://github.com/processing/p5.js/pull/8107
* Fix Broken examples for textOutput() and gridOutput()  by @hxrshxz in https://github.com/processing/p5.js/pull/8125
* Enhance documentation for textOutput and gridOutput methods by @hxrshxz in https://github.com/processing/p5.js/pull/8143
* Add marioguzzzman as Spanish i18n steward by @ksen0 in https://github.com/processing/p5.js/pull/8144
* Throwing friendly error in webgl mode when using gridOutput() and textOutput() by @Somnath-Mishra in https://github.com/processing/p5.js/pull/6491
* docs: add ayushman1210 as a contributor for code by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8161
* chore: update README table from stewards.yml by @ksen0 in https://github.com/processing/p5.js/pull/8145
* fix: (workflow) Invalid action input by @MannuVilasara in https://github.com/processing/p5.js/pull/8136
* docs: add Somnath-Mishra as a contributor for code by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8148
* docs: add reshma045 as a contributor for code by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8146
* docs: add MannuVilasara as a contributor for code by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8165

## New Contributors
* @yogan made their first contribution in https://github.com/processing/p5.js/pull/8129
* @hxrshxz made their first contribution in https://github.com/processing/p5.js/pull/8125
* @Somnath-Mishra made their first contribution in https://github.com/processing/p5.js/pull/6491
* @MannuVilasara made their first contribution in https://github.com/processing/p5.js/pull/8136

**Full Changelog**: https://github.com/processing/p5.js/compare/v1.11.11-rc.0...v1.11.11-rc.1

## v1.11.11-rc.0 — 2025-09-24 (prerelease)

<!-- Release notes generated using configuration in .github/release.yml at v1.11.11-rc.0 -->

## How to test

Please report any issues you find with this release candidate before it goes live as the next version of 1.x! To help test, you can use the downloads below. In the p5.js Editor, you can upload p5.min.js and use it in the `index.html` page.

## What's Changed

Below are the changes in [1.11.11-rc](https://github.com/processing/p5.js/releases/tag/v1.11.11-rc.0) - primarily documentation, but also addressing some dependency updates and a bugfix.

### What's Changed 🎊
* Replaced redundant else if statement with else statement by @awood0727 in https://github.com/processing/p5.js/pull/8016
* docs: add kangjung as a contributor for translation by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8053
* Fix misspellings in comment by @AlzaAlzaki76 in https://github.com/processing/p5.js/pull/8057
* docs: add AlzaAlzaki76 as a contributor for doc by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8059
* docs: add hana-cho as a contributor for translation by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8054
* Update contributor_guidelines.md by @ksen0 in https://github.com/processing/p5.js/pull/8044
* docs: add eslteacher902010 as a contributor for code by @allcontributors[bot] in https://github.com/processing/p5.js/pull/7954
* Auto-link / Close Issues for 2.0 PRs (p5.js & p5.js-website) by @NalinDalal in https://github.com/processing/p5.js/pull/8064
* docs: add Abhayaj247 as a contributor for doc by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8071
* docs: add Homaid as a contributor for a11y, and code by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8076
* Update contributor_guidelines.md - how and when maintainers and stewards assign tasks by @ksen0 in https://github.com/processing/p5.js/pull/8080
* Reference-fixes by @Nitin2332 in https://github.com/processing/p5.js/pull/8075
* docs: add junseok44 as a contributor for code by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8085
* docs: add tychedelia as a contributor for code by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8087
* Use FES internationalization within the minor version by @ksen0 in https://github.com/processing/p5.js/pull/7878

## New Contributors
* @AlzaAlzaki76 made their first contribution in https://github.com/processing/p5.js/pull/8057

**Full Changelog**: https://github.com/processing/p5.js/compare/v1.11.10...v1.11.11-rc.0

## v2.0.5 — 2025-09-01

<!-- Release notes generated using configuration in .github/release.yml at v2.0.5 -->

## What's Changed

This patch fixes a regression on `noise()`, and adds many improvements in the documentation of splines and curves. Use this release: https://cdn.jsdelivr.net/npm/p5@2.0.5/lib/p5.min.js

### What's Changed 🎊
* Merge branch 'loopOptimization' of https://github.com/awood0727/p5.js… by @awood0727 in https://github.com/processing/p5.js/pull/8024
* Update README.md by @perminder-17 in https://github.com/processing/p5.js/pull/8029
* Fixed syntax error at disableFriendleErrors by @Iron-56 in https://github.com/processing/p5.js/pull/8038
* Fix noise() getting overridden; add tests by @davepagurek in https://github.com/processing/p5.js/pull/8036
* A few documentation issues to fix by @perminder-17 in https://github.com/processing/p5.js/pull/8031

## New Contributors
* @Iron-56 made their first contribution in https://github.com/processing/p5.js/pull/8038

**Full Changelog**: https://github.com/processing/p5.js/compare/v2.0.4...v2.0.5

## v2.0.5-rc.0 — 2025-08-25 (prerelease)

<!-- Release notes generated using configuration in .github/release.yml at v2.0.5-rc.0 -->


## Help test the release candidate

https://cdn.jsdelivr.net/npm/p5@2.0.5-rc.0/lib/p5.js

Here are all the updates for the **upcoming 2.0.5** release. This is a **release candidate** (RC), which means it is not yet live on the p5.js Editor. Please help us to improve the stability of the newest version of p5.js by trying out this release candidate, and reporting bugs. The 2.0.5 patch is planned for release on **September 1st, 2025**, unless there are bugs - then these will be fixed before release.

### What's Changed 🎊
* Merge branch 'loopOptimization' of https://github.com/awood0727/p5.js… by @awood0727 in https://github.com/processing/p5.js/pull/8024
* Update README.md by @perminder-17 in https://github.com/processing/p5.js/pull/8029
* Fixed syntax error at disableFriendleErrors by @Iron-56 in https://github.com/processing/p5.js/pull/8038
* Fix noise() getting overridden; add tests by @davepagurek in https://github.com/processing/p5.js/pull/8036

## New Contributors
* @Iron-56 made their first contribution in https://github.com/processing/p5.js/pull/8038

**Full Changelog**: https://github.com/processing/p5.js/compare/v2.0.4...v2.0.5-rc.0

## v1.11.10 — 2025-08-23

<!-- Release notes generated using configuration in .github/release.yml at v1.11.10 -->

## How to Use

To use this version, import p5.js from: https://cdn.jsdelivr.net/npm/p5@1.11.10/lib/p5.min.js or [duplicate this sketch](https://editor.p5js.org/ksen0/sketches/YdG9t2JFl)

In the p5.js Editor, make sure this is in the `index.html` page:

```html
<script src="https://cdn.jsdelivr.net/npm/p5@1.11.10/lib/p5.min.js"></script>
```

### Problems or Questions?

You can [post an issue on GitHub](https://github.com/processing/p5.js/issues) or [ask on Discord](https://discord.gg/BdWRxMCH)

### Next Release?

Currently, we are focusing on expanding and improving 2.x - therefore, no new features will be added to 1.x. However, the goal is to keep 1.x available as a stable version of p5.js longer-term, so bugfinding, bugfixes and documentation improvements are welcome. Any new release will first have a **release candidate** available for testing, which is posted on Discord, Instagram, and GitHub, for several weeks beforehand.

### What's Changed 🎊

* Changing URL which comes when user is not in WEBGL mode by @skools-here in https://github.com/processing/p5.js/pull/7976
* docs: add mudit06mah as a contributor for doc by @allcontributors[bot] in https://github.com/processing/p5.js/pull/7982
* docs: add acgillette as a contributor for code by @allcontributors[bot] in https://github.com/processing/p5.js/pull/7990
* Fix parameter documentation for bezierPoint by @shawdm in https://github.com/processing/p5.js/pull/7987
* docs: add shawdm as a contributor for doc by @allcontributors[bot] in https://github.com/processing/p5.js/pull/7991
* Bring 2.0 stroke ordering fixes to 1.x by @davepagurek in https://github.com/processing/p5.js/pull/7996
* docs: add skools-here as a contributor for code by @allcontributors[bot] in https://github.com/processing/p5.js/pull/7977
* Remove incorrect mouseX/mouseY docs regarding WEBGL mode by @ericrav in https://github.com/processing/p5.js/pull/8004
* docs: add ericrav as a contributor for doc by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8007
* Fix: Corrected code block formatting for textureMode() by @harishbit in https://github.com/processing/p5.js/pull/8011
* docs: add abuharish02 as a contributor for doc by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8012
* docs: add vivekbopaliya as a contributor for code, design, and 2 more by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8027
* Update README.md by @ksen0 in https://github.com/processing/p5.js/pull/8028
* Adding korean translation steward.  by @perminder-17 in https://github.com/processing/p5.js/pull/8033
* chore: update README table from stewards.yml by @ksen0 in https://github.com/processing/p5.js/pull/8034
* docs: add Iron-56 as a contributor for bug, and code by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8039
* docs: add MissTipo as a contributor for blog, code, and 4 more by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8045
* mouse offscreen behaviors bugfix by @ksen0 in https://github.com/processing/p5.js/pull/8030

## New Contributors
* @skools-here made their first contribution in https://github.com/processing/p5.js/pull/7976
* @ericrav made their first contribution in https://github.com/processing/p5.js/pull/8004

**Full Changelog**: https://github.com/processing/p5.js/compare/v1.11.9...v1.11.10

## v1.11.10-rc.1 — 2025-08-21 (prerelease)

<!-- Release notes generated using configuration in .github/release.yml at v1.11.10-rc.1 -->

## How to test

Please report any issues you find with this release candidate before it goes live as the next version of 1.x! To help test, you can use the downloads below. In the p5.js Editor, you can upload p5.min.js and use it in the `index.html` page.

## What's Changed

Below are the changes since [1.11.10-rc.0](https://github.com/processing/p5.js/releases/tag/v1.11.10-rc.0) - primarily documentation, but also addressing a regression.

### Bugfix

* mouse offscreen behaviors bugfix by @ksen0 in https://github.com/processing/p5.js/pull/8030

### Documentation
* Fix: Corrected code block formatting for textureMode() by @harishbit in https://github.com/processing/p5.js/pull/8011
* docs: add abuharish02 as a contributor for doc by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8012
* docs: add vivekbopaliya as a contributor for code, design, and 2 more by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8027
* Update README.md by @ksen0 in https://github.com/processing/p5.js/pull/8028
* Adding korean translation steward.  by @perminder-17 in https://github.com/processing/p5.js/pull/8033
* chore: update README table from stewards.yml by @ksen0 in https://github.com/processing/p5.js/pull/8034
* docs: add Iron-56 as a contributor for bug, and code by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8039

**Full Changelog**: https://github.com/processing/p5.js/compare/v1.11.9...v1.11.10-rc.1

## v2.0.4 — 2025-08-05

## What's Changed 🎊

### p5.strands Improvements 🧵 

*p5.strands* is an experimental new feature in in p5.js 2.0 for authoring shaders with JavaScript. You can check out [the tutorials](https://beta.p5js.org/tutorials/) if you're interested in trying it out. If you're interested in diving deeper and contributing, you're welcome to join the discussion in the [the #p5strands channel on our Discord](https://discord.gg/wZEyEvQs), or work on the [open p5.strands issues](https://github.com/processing/p5.js/issues?q=is%3Aissue%20state%3Aopen%20label%3Ap5.strands)

* Alias GLSL's mix function as lerp in p5.strands (#7875) by @LalitNarayanYadav in https://github.com/processing/p5.js/pull/7887
* Add GLSL-based noise(vec2) function to p5.strands (#7897) by @LalitNarayanYadav in https://github.com/processing/p5.js/pull/7921
* Fix inline anonymous functions causing a parsing error in p5.strands callbacks by @nking07049925 in https://github.com/processing/p5.js/pull/7956
* Enhance p5.strands noise() to support noise(x, y) and 4-octave fractal noise by @LalitNarayanYadav in https://github.com/processing/p5.js/pull/7964
* Fix p5.strands uniform calls, add instance mode construct by @davepagurek in https://github.com/processing/p5.js/pull/7961

### Bug Fixes 🐞 
* Add font readiness wait to create() function in p5.Font.js by @sophyphile in https://github.com/processing/p5.js/pull/7882
* Create Graphics fixing in dev-2.0 branch.    by @perminder-17 in https://github.com/processing/p5.js/pull/7829
* Chore/upgrade eslint by @error-four-o-four in https://github.com/processing/p5.js/pull/7853
* Update zod 3 to zod 4 support in p5.js dev-2.0 by @madhav2348 in https://github.com/processing/p5.js/pull/7872
* Skip adding degenerate faces in textToModel by @davepagurek in https://github.com/processing/p5.js/pull/7951
* Individual flags to disable part of FES by the user by @limzykenneth in https://github.com/processing/p5.js/pull/7967
* Add minified ESM build output by @nickswalker in https://github.com/processing/p5.js/pull/7973
* Replace fn with direct downloadFile import to fix issue where fn was not found by @acgillette in https://github.com/processing/p5.js/pull/7971
* Fix MediaElement.copy by @pearmini in https://github.com/processing/p5.js/pull/7980
* Reset millis() after setup by @davepagurek in https://github.com/processing/p5.js/pull/8005
* add instance of video in callback (2.0) by @ksen0 in https://github.com/processing/p5.js/pull/7877

### Documentation  📚
* Remove incorrect mouseX/mouseY docs regarding WEBGL mode in dev-2.0 branch. by @perminder-17 in https://github.com/processing/p5.js/pull/8006
* Update dev-2.0 docs with recently-added contributors and stewards by @ksen0 in https://github.com/processing/p5.js/pull/8000
* Documentation fix for swapped parameters in splinePoint and bezierPoint by @shawdm in https://github.com/processing/p5.js/pull/7997
* Adding docs for `code` in the refrence. by @perminder-17 in https://github.com/processing/p5.js/pull/7902
* added documentation to _getBrightness() and _getGreen() function by @FerrinThreatt in https://github.com/processing/p5.js/pull/7908
* Updating visual tests docs for 2.x versions by @perminder-17 in https://github.com/processing/p5.js/pull/7827
* Revamped config.yml(branch: dev-2.0) by @shivasankaran18 in https://github.com/processing/p5.js/pull/7776
* Fix typo in createFileInput example by @ksen0 in https://github.com/processing/p5.js/pull/7884
* Fix: Corrected code block in textureMode() in dev2.0 by @abuharish02 in https://github.com/processing/p5.js/pull/8015

## New Contributors
* @sophyphile made their first contribution in https://github.com/processing/p5.js/pull/7882
* @FerrinThreatt made their first contribution in https://github.com/processing/p5.js/pull/7908
* @madhav2348 made their first contribution in https://github.com/processing/p5.js/pull/7872
* @nking07049925 made their first contribution in https://github.com/processing/p5.js/pull/7956
* @nickswalker made their first contribution in https://github.com/processing/p5.js/pull/7973
* @acgillette made their first contribution in https://github.com/processing/p5.js/pull/7971

**Full Changelog**: https://github.com/processing/p5.js/compare/v2.0.3...v2.0.4-rc.2

## v2.0.4-rc.2 — 2025-07-31 (prerelease)

<!-- Release notes generated using configuration in .github/release.yml at v2.0.4-rc.2 -->

## Help test the release candidate!

Here are all the updates for the **upcoming 2.0.4** release! This is a **release candidate** (RC), which means it is not yet live on the p5.js Editor. Please help us to improve the stability of the newest version of p5.js by trying out this release candidate, and reporting bugs. The 2.0.4 patch is planned for release on **August 5th, 2025**, unless there are bugs - then these will be fixed before release.

### How to test

You can **[copy this sketch](https://editor.p5js.org/ksen0/sketches/vUygUCc1t)** and make p5.js sketches with it  - using the new [p5.js 2.0 reference](https://beta.p5js.org/) - and then report anything that doesn't work well as a bug! This will help improve the next release 🌱 💚  

You can use the downloads below, or use https://cdn.jsdelivr.net/npm/p5@2.0.4-rc.2/lib/p5.js in your `script` tag. In the p5.js Editor, you can use this URL in the `index.html` page:

<img width="600" alt="Screenshot of p5.js Editor with the index.html open." src="https://github.com/user-attachments/assets/a6800008-0f49-4127-8a1c-4df183bde105" />

## What's Changed 🎊

### p5.strands Improvements 🧵 

*p5.strands* is an experimental new feature in in p5.js 2.0 for authoring shaders with JavaScript. You can check out [the tutorials](https://beta.p5js.org/tutorials/) if you're interested in trying it out. If you're interested in diving deeper and contributing, you're welcome to join the discussion in the [the #p5strands channel on our Discord](https://discord.gg/wZEyEvQs), or work on the [open p5.strands issues](https://github.com/processing/p5.js/issues?q=is%3Aissue%20state%3Aopen%20label%3Ap5.strands)

* Alias GLSL's mix function as lerp in p5.strands (#7875) by @LalitNarayanYadav in https://github.com/processing/p5.js/pull/7887
* Add GLSL-based noise(vec2) function to p5.strands (#7897) by @LalitNarayanYadav in https://github.com/processing/p5.js/pull/7921
* Fix inline anonymous functions causing a parsing error in p5.strands callbacks by @nking07049925 in https://github.com/processing/p5.js/pull/7956
* Enhance p5.strands noise() to support noise(x, y) and 4-octave fractal noise by @LalitNarayanYadav in https://github.com/processing/p5.js/pull/7964
* Fix p5.strands uniform calls, add instance mode construct by @davepagurek in https://github.com/processing/p5.js/pull/7961

### Bug Fixes 🐞 
* Add font readiness wait to create() function in p5.Font.js by @sophyphile in https://github.com/processing/p5.js/pull/7882
* Create Graphics fixing in dev-2.0 branch.    by @perminder-17 in https://github.com/processing/p5.js/pull/7829
* Chore/upgrade eslint by @error-four-o-four in https://github.com/processing/p5.js/pull/7853
* Update zod 3 to zod 4 support in p5.js dev-2.0 by @madhav2348 in https://github.com/processing/p5.js/pull/7872
* Skip adding degenerate faces in textToModel by @davepagurek in https://github.com/processing/p5.js/pull/7951
* Individual flags to disable part of FES by the user by @limzykenneth in https://github.com/processing/p5.js/pull/7967
* Add minified ESM build output by @nickswalker in https://github.com/processing/p5.js/pull/7973
* Replace fn with direct downloadFile import to fix issue where fn was not found by @acgillette in https://github.com/processing/p5.js/pull/7971
* Fix MediaElement.copy by @pearmini in https://github.com/processing/p5.js/pull/7980
* Reset millis() after setup by @davepagurek in https://github.com/processing/p5.js/pull/8005
* add instance of video in callback (2.0) by @ksen0 in https://github.com/processing/p5.js/pull/7877

### Documentation  📚
* Remove incorrect mouseX/mouseY docs regarding WEBGL mode in dev-2.0 branch. by @perminder-17 in https://github.com/processing/p5.js/pull/8006
* Update dev-2.0 docs with recently-added contributors and stewards by @ksen0 in https://github.com/processing/p5.js/pull/8000
* Documentation fix for swapped parameters in splinePoint and bezierPoint by @shawdm in https://github.com/processing/p5.js/pull/7997
* Adding docs for `code` in the refrence. by @perminder-17 in https://github.com/processing/p5.js/pull/7902
* added documentation to _getBrightness() and _getGreen() function by @FerrinThreatt in https://github.com/processing/p5.js/pull/7908
* Updating visual tests docs for 2.x versions by @perminder-17 in https://github.com/processing/p5.js/pull/7827
* Revamped config.yml(branch: dev-2.0) by @shivasankaran18 in https://github.com/processing/p5.js/pull/7776
* Fix typo in createFileInput example by @ksen0 in https://github.com/processing/p5.js/pull/7884

## New Contributors
* @sophyphile made their first contribution in https://github.com/processing/p5.js/pull/7882
* @FerrinThreatt made their first contribution in https://github.com/processing/p5.js/pull/7908
* @madhav2348 made their first contribution in https://github.com/processing/p5.js/pull/7872
* @nking07049925 made their first contribution in https://github.com/processing/p5.js/pull/7956
* @nickswalker made their first contribution in https://github.com/processing/p5.js/pull/7973
* @acgillette made their first contribution in https://github.com/processing/p5.js/pull/7971

**Full Changelog**: https://github.com/processing/p5.js/compare/v2.0.3...v2.0.4-rc.2

## v1.11.10-rc.0 — 2025-07-31 (prerelease)

<!-- Release notes generated using configuration in .github/release.yml at v1.11.10-rc.0 -->

## What's Changed
### What's Changed 🎊
* Changing URL which comes when user is not in WEBGL mode by @skools-here in https://github.com/processing/p5.js/pull/7976
* docs: add mudit06mah as a contributor for doc by @allcontributors[bot] in https://github.com/processing/p5.js/pull/7982
* docs: add acgillette as a contributor for code by @allcontributors[bot] in https://github.com/processing/p5.js/pull/7990
* Fix parameter documentation for bezierPoint by @shawdm in https://github.com/processing/p5.js/pull/7987
* docs: add shawdm as a contributor for doc by @allcontributors[bot] in https://github.com/processing/p5.js/pull/7991
* Bring 2.0 stroke ordering fixes to 1.x by @davepagurek in https://github.com/processing/p5.js/pull/7996
* docs: add skools-here as a contributor for code by @allcontributors[bot] in https://github.com/processing/p5.js/pull/7977
* Remove incorrect mouseX/mouseY docs regarding WEBGL mode by @ericrav in https://github.com/processing/p5.js/pull/8004
* docs: add ericrav as a contributor for doc by @allcontributors[bot] in https://github.com/processing/p5.js/pull/8007

## New Contributors
* @skools-here made their first contribution in https://github.com/processing/p5.js/pull/7976
* @ericrav made their first contribution in https://github.com/processing/p5.js/pull/8004

**Full Changelog**: https://github.com/processing/p5.js/compare/v1.11.9...v1.11.10-rc.0

## v2.0.4-rc.0 — 2025-07-31 (prerelease)

<!-- Release notes generated using configuration in .github/release.yml at v2.0.4-rc.0 -->

## What's Changed
### What's Changed 🎊
* add instance of video in callback (2.0) by @ksen0 in https://github.com/processing/p5.js/pull/7877
* Add font readiness wait to create() function in p5.Font.js by @sophyphile in https://github.com/processing/p5.js/pull/7882
* Fix typo in createFileInput example by @ksen0 in https://github.com/processing/p5.js/pull/7884
* Create Graphics fixing in dev-2.0 branch.    by @perminder-17 in https://github.com/processing/p5.js/pull/7829
* Alias GLSL's mix function as lerp in p5.strands (#7875) by @LalitNarayanYadav in https://github.com/processing/p5.js/pull/7887
* added documentation to _getBrightness() and _getGreen() function by @FerrinThreatt in https://github.com/processing/p5.js/pull/7908
* Chore/upgrade eslint by @error-four-o-four in https://github.com/processing/p5.js/pull/7853
* Revamped config.yml(branch: dev-2.0) by @shivasankaran18 in https://github.com/processing/p5.js/pull/7776
* Update zod 3 to zod 4 support in p5.js dev-2.0 by @madhav2348 in https://github.com/processing/p5.js/pull/7872
* Updating visual tests docs for 2.x versions by @perminder-17 in https://github.com/processing/p5.js/pull/7827
* Skip adding degenerate faces in textToModel by @davepagurek in https://github.com/processing/p5.js/pull/7951
* Add GLSL-based noise(vec2) function to p5.strands (#7897) by @LalitNarayanYadav in https://github.com/processing/p5.js/pull/7921
* Fix inline anonymous functions causing a parsing error in p5.strands callbacks by @nking07049925 in https://github.com/processing/p5.js/pull/7956
* Fix p5.strands uniform calls, add instance mode construct by @davepagurek in https://github.com/processing/p5.js/pull/7961
* Enhance p5.strands noise() to support noise(x, y) and 4-octave fractal noise by @LalitNarayanYadav in https://github.com/processing/p5.js/pull/7964
* Adding docs for `code` in the refrence. by @perminder-17 in https://github.com/processing/p5.js/pull/7902
* Individual flags to disable part of FES by the user by @limzykenneth in https://github.com/processing/p5.js/pull/7967
* Add minified ESM build output by @nickswalker in https://github.com/processing/p5.js/pull/7973
* Replace fn with direct downloadFile import to fix issue where fn was not found by @acgillette in https://github.com/processing/p5.js/pull/7971
* Documentation fix for swapped parameters in splinePoint and bezierPoint by @shawdm in https://github.com/processing/p5.js/pull/7997
* Update dev-2.0 docs with recently-added contributors and stewards by @ksen0 in https://github.com/processing/p5.js/pull/8000

## New Contributors
* @sophyphile made their first contribution in https://github.com/processing/p5.js/pull/7882
* @FerrinThreatt made their first contribution in https://github.com/processing/p5.js/pull/7908
* @madhav2348 made their first contribution in https://github.com/processing/p5.js/pull/7872
* @nking07049925 made their first contribution in https://github.com/processing/p5.js/pull/7956
* @nickswalker made their first contribution in https://github.com/processing/p5.js/pull/7973
* @acgillette made their first contribution in https://github.com/processing/p5.js/pull/7971

**Full Changelog**: https://github.com/processing/p5.js/compare/v2.0.3...v2.0.4-rc.0

## v1.11.9 — 2025-07-18

<!-- Release notes generated using configuration in .github/release.yml at v1.11.9 -->

## What's Changed

This release includes bug-fixes and updates to documentation, including the publication of a revised [stewardship process](https://p5js.org/contribute/steward_guidelines/).

### Bugfix 🐞 
* Fixed loop variable in createFileInput() docs (dom.js) by @andrewmcwhae in https://github.com/processing/p5.js/pull/7422
* Respect p5.disableFriendlyErrors by @quinton-ashley in https://github.com/processing/p5.js/pull/7888
* Remove second call of _updateWindowSize() by @bensgilbert in https://github.com/processing/p5.js/pull/7847

## Documentation 📚 
* docs: add andrewmcwhae as a contributor for doc by @allcontributors[bot] in https://github.com/processing/p5.js/pull/7883
* docs: add bensgilbert as a contributor for code by @allcontributors[bot] in https://github.com/processing/p5.js/pull/7922
* Update stewards.yml by @ksen0 in https://github.com/processing/p5.js/pull/7923
* chore: update README table from stewards.yml by @ksen0 in https://github.com/processing/p5.js/pull/7925
* fix duplicate contributor (trivial) by @bensgilbert in https://github.com/processing/p5.js/pull/7924
* Fix typos in documentation and comments by @leopardracer in https://github.com/processing/p5.js/pull/7926
* docs: add leopardracer as a contributor for doc by @allcontributors[bot] in https://github.com/processing/p5.js/pull/7927
* Docs: Fix typos in documentation by @kilavvy in https://github.com/processing/p5.js/pull/7931
* docs: add kilavvy as a contributor for doc by @allcontributors[bot] in https://github.com/processing/p5.js/pull/7932
* docs: add shivasankaran18 as a contributor for doc by @allcontributors[bot] in https://github.com/processing/p5.js/pull/7943
* Revamped config.yml(branch:main) by @shivasankaran18 in https://github.com/processing/p5.js/pull/7775
* docs: add madhav2348 as a contributor for code by @allcontributors[bot] in https://github.com/processing/p5.js/pull/7948
* docs: add nking07049925 as a contributor for code by @allcontributors[bot] in https://github.com/processing/p5.js/pull/7962
* docs: add LalitNarayanYadav as a contributor for code by @allcontributors[bot] in https://github.com/processing/p5.js/pull/7916
* docs: add FerrinThreatt as a contributor for doc by @allcontributors[bot] in https://github.com/processing/p5.js/pull/7918
* docs: add vtjl10 as a contributor for doc by @allcontributors[bot] in https://github.com/processing/p5.js/pull/7914
* Update stewardship guildelines and process by @ksen0 in https://github.com/processing/p5.js/pull/7867
* Update stewards-update.yml to fix typo and include token by @ksen0 in https://github.com/processing/p5.js/pull/7892
* Added p5.js-website accessibility steward stewards.yml by @ksen0 in https://github.com/processing/p5.js/pull/7893
* Update stewards-update.yml to only make PR with README by @ksen0 in https://github.com/processing/p5.js/pull/7895
* Update README table from stewards.yml by @ksen0 in https://github.com/processing/p5.js/pull/7896
* docs: add atmajaa as a contributor for doc by @allcontributors[bot] in https://github.com/processing/p5.js/pull/7901
* Update labeler.yml to correctly group DevOps lables by @ksen0 in https://github.com/processing/p5.js/pull/7904
* docs: add SonyaCode as a contributor for a11y, blog, and 4 more by @allcontributors[bot] in https://github.com/processing/p5.js/pull/7907
* Correct username in stewards.yml by @IIITM-Jay in https://github.com/processing/p5.js/pull/7912
* Fix Typo in Comments: "trhough" to "through" in textOutput.js by @vtjl10 in https://github.com/processing/p5.js/pull/7911
* chore: update README table from stewards.yml by @ksen0 in https://github.com/processing/p5.js/pull/7913

## New Contributors
* @andrewmcwhae made their first contribution in https://github.com/processing/p5.js/pull/7422
* @vtjl10 made their first contribution in https://github.com/processing/p5.js/pull/7911
* @leopardracer made their first contribution in https://github.com/processing/p5.js/pull/7926
* @kilavvy made their first contribution in https://github.com/processing/p5.js/pull/7931

**Full Changelog**: https://github.com/processing/p5.js/compare/v1.11.8...v1.11.9

## v1.11.8 — 2025-06-05

<!-- Release notes generated using configuration in .github/release.yml at v1.11.8 -->

## What's Changed
### What's Changed 🎊
* Add LalitNarayanYadav for doc by @ksen0 in https://github.com/processing/p5.js/pull/7830
* Reduce contributor avatar image size to 64px for improved performance #7788 by @LalitNarayanYadav in https://github.com/processing/p5.js/pull/7814
* fix: push() ignoring the ColorMode #7402 by @swastikCommits in https://github.com/processing/p5.js/pull/7586
* Revert "fix: push() ignoring the ColorMode #7402" by @ksen0 in https://github.com/processing/p5.js/pull/7848
* Fix typos by @omahs in https://github.com/processing/p5.js/pull/7855
* docs: add dpanshug as a contributor for doc by @ksen0 in https://github.com/processing/p5.js/pull/7864
* added instance of video in callback by @subCode321 in https://github.com/processing/p5.js/pull/7585
* chore: fix typos across codebase by @sukrucildirr in https://github.com/processing/p5.js/pull/7874

## New Contributors
* @subCode321 made their first contribution in https://github.com/processing/p5.js/pull/7585
* @sukrucildirr made their first contribution in https://github.com/processing/p5.js/pull/7874

**Full Changelog**: https://github.com/processing/p5.js/compare/v1.11.7...v1.11.8

## v2.0.3 — 2025-05-30

<!-- Release notes generated using configuration in .github/release.yml at v2.0.3 -->

## What's Changed
### What's Changed 🎊
* docs(keyboard): clarify keyIsDown() documentation for key codes and browser compatibility by @dpanshug in https://github.com/processing/p5.js/pull/7812
* Prevent FES from checking nested properties by @IIITM-Jay in https://github.com/processing/p5.js/pull/7824
* update the model params to be correct for 2.0 in docs and FES by @lukeplowden in https://github.com/processing/p5.js/pull/7832
* Model params updated for YUIDocs by @lukeplowden in https://github.com/processing/p5.js/pull/7835

## New Contributors
* @dpanshug made their first contribution in https://github.com/processing/p5.js/pull/7812

**Full Changelog**: https://github.com/processing/p5.js/compare/v2.0.2...v2.0.3

## v2.0.2 — 2025-05-14

<!-- Release notes generated using configuration in .github/release.yml at v2.0.2 -->

## What's Changed

### Documentation and Tests 

* Fix typo in directionalLight reference (dev-2.0 branch) #7743 by @LalitNarayanYadav in https://github.com/processing/p5.js/pull/7778
* Rest types by @davepagurek in https://github.com/processing/p5.js/pull/7803
* Updating all the broken refrence examples.  by @perminder-17 in https://github.com/processing/p5.js/pull/7739
* P2HDR docs       by @perminder-17 in https://github.com/processing/p5.js/pull/7728
* Update creating addon libraries contributor docs by @limzykenneth in https://github.com/processing/p5.js/pull/7800

### Improvements

* Improve antialiased framebuffer performance by @davepagurek in https://github.com/processing/p5.js/pull/7794
* Remove dayjs dependency and update date formatting in banner by @error-four-o-four in https://github.com/processing/p5.js/pull/7804

### Bugfixes and Test(s) 🐞 💚 

* Fix corrupted textures when rendering too many WebGL characters by @davepagurek in https://github.com/processing/p5.js/pull/7792
* Fix FES check for image() not accepting some valid types by @limzykenneth in https://github.com/processing/p5.js/pull/7801
* Publish types on NPM with next release by @limzykenneth in https://github.com/processing/p5.js/pull/7802
* Fixing keyTyped() for dev-2.0 branch  by @perminder-17 in https://github.com/processing/p5.js/pull/7809

### Full Changelog

https://github.com/processing/p5.js/compare/v2.0.1...v2.0.2

## v1.11.7 — 2025-05-14

<!-- Release notes generated using configuration in .github/release.yml at v1.11.7 -->

## What's Changed
### What's Changed 🎊
* Consistent `movedX` and `movedY` behaviour across zoom levels by @IIITM-Jay in https://github.com/processing/p5.js/pull/7795
* Publish 1.x under r1 tag by @ksen0 in https://github.com/processing/p5.js/pull/7810

## New Contributors
* @IIITM-Jay made their first contribution in https://github.com/processing/p5.js/pull/7795

**Full Changelog**: https://github.com/processing/p5.js/compare/v1.11.6...v1.11.7

## v1.11.6 — 2025-05-14

<!-- Release notes generated using configuration in .github/release.yml at v1.11.6 -->

## What's Changed
### What's Changed 🎊
* "Fix typo in directionalLight reference (main branch)" - #7743 by @LalitNarayanYadav in https://github.com/processing/p5.js/pull/7777
* Fix  _isGlobal flag in ini method by @VANSH3104 in https://github.com/processing/p5.js/pull/7785
* Fix: keyTyped() can now accept the same char consecutively by @AhmedMagedC in https://github.com/processing/p5.js/pull/7808

## New Contributors
* @AhmedMagedC made their first contribution in https://github.com/processing/p5.js/pull/7808

**Full Changelog**: https://github.com/processing/p5.js/compare/v1.11.5...v1.11.6

## v2.0.1 — 2025-04-23

<!-- Release notes generated using configuration in .github/release.yml at v2.0.1 -->

## What's Changed 🎊

### Documentation and Tests 
* Updating foundation-section for async/await by @perminder-17 in https://github.com/processing/p5.js/pull/7721
* fixing keyReleased() function.  by @perminder-17 in https://github.com/processing/p5.js/pull/7758

### Bugfixes 
* [2.x] Fix ESM export functionality by @limzykenneth in https://github.com/processing/p5.js/pull/7764
* Fix WebGL alpha blending by @davepagurek in https://github.com/processing/p5.js/pull/7769
* [2.0] Fix touch event not updating mouse coordinates by @limzykenneth in https://github.com/processing/p5.js/pull/7772
* Fixed Error in FES prevents message from being shown, Prevented 'window' properties from being overwritten by @HughJacks in https://github.com/processing/p5.js/pull/7765

### Bugfix with Test 🐞 💚 
* fix: add splineVertex to p5.Graphics prototype and fix unit test error by @VANSH3104 in https://github.com/processing/p5.js/pull/7757

## New Contributors
* @HughJacks made their first contribution in https://github.com/processing/p5.js/pull/7765

**Full Changelog**: https://github.com/processing/p5.js/compare/v2.0.0...v2.0.1

## v2.0.0 — 2025-04-17

<!-- Release notes generated using configuration in .github/release.yml at v2.0.0 -->

We are releasing p5.js 2.0 to the community for testing and development! Here’s what you need to know.

* For **reference**: p5.js 1.x reference will stay on [https://p5js.org/](https://p5js.org/), and p5.js 2.x documentation will be on [https://beta.p5js.org/](https://beta.p5js.org/)
* In the p5.js Editor: the **default will continue to be 1.x** until at least August 2026 - more information and discussion on timeline can be found on [this Discourse thread](https://discourse.processing.org/t/dev-updates-p5-js-2-0-you-are-here/46130) or [this GitHub thread](https://github.com/processing/p5.js/issues/7488)
* For updating sketches and add-on libraries: check out [the compatibility add-on libraries and guides](https://github.com/processing/p5.js-compatibility)
* For **contribution**: `npm latest` will default to 2.x, but the git branches are still separated with `main` on 1.x and `dev-2.0` on 2.x. We will switch the branches when we have updated all automations (including deploying updated documentation to the website). Want to contribute ideas or implementation? Check the [2.x project board](https://github.com/orgs/processing/projects/21/views/8) for an overview of what still needs discussion, and what’s ready for work!

## Start exploring 🌱 

* Typography: [textToContours()](https://beta.p5js.org/reference/p5.font/texttocontours/), [textToModel()](https://beta.p5js.org/reference/p5.font/texttomodel/) in `WEBGL`, and [textWeight()](https://beta.p5js.org/reference/p5/textweight/) for variable fonts!
* New color modes with [colorMode](https://beta.p5js.org/reference/p5/colormode/)()!
* Authoring shaders with JavaScript using [p5.strands](https://beta.p5js.org/tutorials/intro-to-p5-strands/)!
* Convert 3D screen coordinates to 2D screen coordinates with [worldToScreen](https://beta.p5js.org/reference/p5/worldtoscreen/)!
* [Add-on Library Authoring Guide](https://dev.to/limzykenneth/designing-an-addon-library-system-for-p5js-20-3d4p)

## More details of the changes 🌳 

You can also checkout Dave Pagurek's reflections on [p5.js 2.0 and an open source philosophy](https://www.davepagurek.com/blog/p5-2.0-philosophy/)!

### Typography

* A refactor of the typography system to be smaller, support variable fonts, and have more [precise text measurement](https://beta.p5js.org/reference/p5/textwidth/) by Daniel Howe [@dhowe](https://github.com/dhowe)
* Support for loading fonts via CSS (thanks to [@dhowe](https://github.com/dhowe))
* More ways to draw and manipulate text (thanks to [@davepagurek](https://github.com/davepagurek))
* An approximately 350% performance improvement to textToPoints and 3D text extrusion support (thanks to [@davepagurek](https://github.com/davepagurek))

### Support for more color spaces in `p5.Color` (thanks to @limzykenneth and @dianamgalindo)

p5.js 2.0 now supports more color modes in addition to the existing RGB, HSB, and HSL color modes. Here are the list of new supported color mode and brief description of them:

* `RGBHDR` - High Dynamic Range RGB color defined within the Display P3 color space. You will need to use the HDR canvas described below to draw this color on the canvas accurately.
* `HWB` - Hue, Whiteness, Blackness. This is similar to `HSL` and `HSB` in that you will define a hue angle however instead of saturation and lightness, you will define the percentage of whiteness and blackness. It is the color model of the GUI color picker used by Chrome.
![color-picker](https://github.com/user-attachments/assets/fd110cb4-d327-4424-9380-b85cc760edb7)
* `LAB` - Also called CIE Lab, defines color with Lightness, Alpha, and Beta. The color space is often used in professional color measuring context.
* `LCH` - An easier to use representation of a CIE Lab color with definition of Lightness, Chroma, and Hue instead.
* `OKLAB` - OkLab is a slight adjustment to CIE Lab color space mainly to fix a non-uniformity issue that exist in CIE Lab. This difference is more visible in the example below.
* `OKLCH` - An easier to use representation of an OkLab color with definition of Lightness, Chroma, and Hue instead.

Comparing `HSL`, `LCH`, and `OKLCH` in a [sketch](https://editor.p5js.org/limzykenneth/sketches/l4FtFScH5) below:
![color wheel](https://github.com/user-attachments/assets/5ace0470-bcf9-408f-ae77-35a454137f61)
From left to right are color wheels of `HSL`, `LCH`, and `OKLCH` respectively. Notice the evenness of color distribution between each wheel with OkLCH having the most even distribution. It can be noted that the LCH wheel has a large blue section that is fixed by OkLCH.

To use these new color spaces in p5.js 2.0, the respective constants have been added and the `colorMode()` function can be used with these constants in the same way as `RGB`, `HSL`, and `HSB`.

```js
function setup(){
  createCanvas(200, 200);
}

function draw(){
  colorMode(OKLCH);
  background(220); // Should show a teal colored canvas
}
```

### Support for wide-gamut colors with the `display-p3` mode (thanks to @limzykenneth)

You can now create a 2D canvas that supports HDR colors that will give you a more vibrant sketch and also HDR images. To use a HDR canvas you will need to create it using the `P2DHDR` constant like below:

```js
function setup(){
  createCanvas(400, 400, P2DHDR);
}
```

When a `P2DHDR` canvas is created, the default color mode will be switched to the new `RGBHDR` color mode instead of `RGB`. In practice you can continue to use the same RGB color definition you have always used.

```js
function setup(){
  createCanvas(400, 400, P2DHDR);
}

function draw(){
  background(255, 0, 0);
  fill(100, 255, 0);
  circle(100, 100, 50);
}
```

This example [sketch](https://editor.p5js.org/limzykenneth/sketches/LB2vJFdj4) shows a direct comparison between HDR and non-HDR colors, you should see three bands of red, green, and blue colors with a slightly dimmer red, green, and blue circles within. However, both your browser and your screen will need to support HDR to see the difference. Currently Firefox on desktop does not support HDR canvas so if you do not see a difference, try a different browser such as Safari or Chrome.

You can also now load HDR images and have them be displayed in full HDR in a [HDR canvas](https://editor.p5js.org/limzykenneth/sketches/52J0mtOID). If you see a dark image on the linked sketch, your browser or screen does not support HDR and you should try a different browser/device.

### A new simple lines mode for WebGL (thanks to contributions from @perminder-17)

If you are drawing lots of shapes, and don't need stroke caps or joins, you can use a simple lines mode for increased performance in WebGL. You can activate this mode by calling `linesMode(SIMPLE)` in your sketch.

### Custom shaders for fills, strokes, images (thanks to @Garima3110 and @perminder-17)

You can now create your own shaders for fills, strokes, and images, and have them all applied at once! Use `shader()` to set a fill shader, `strokeShader()` to set a stroke shader, and `imageShader()` to set an image shader. Try using `baseMaterialShader().modify(...)` and `baseStrokeShader().modify(...)` to create custom shaders.

```js
let myFillShader = baseMaterialShader.modify({
  'vec4 getFinalColor': `(vec4 color) {
    return vec4(1., 1., 0., 1.);
  }`
});
let myStrokeShader = baseStrokeShader.modify({
  'vec4 getFinalColor': `(vec4 color) {
    return vec4(1., 0., 1., 1.);
  }`
});
let myImageShader = baseMaterialShader.modify({
  'vec4 getFinalColor': `(vec4 color) {
    return vec4(0., 1., 1., 1.);
  }`
});

shader(myFillShader);
strokeShader(myStrokeShader);
imageShader(myImageShader);

sphere(); // Draws with the custom stroke and image shaders
image(myImg, 0, 0); // Draws with the custom image shader
```


### Updated bezier and curve drawing functions (thanks to @GregStanton)

First off: you can combine multiple types of curves in one `begin/endShape()` block now!

Long cubic and quadratic bezier vertex calls are now split up into their individual control points. Both cubic and quadratic curves are done with `bezierVertex` now, and you can set `bezierOrder()` to change from cubic (order 3) to quadratic (order 2). For WebGL mode, this also means you can also specify texture coordinates per control point, or change the fill, stroke, normal, and more between control points.

<table>
<tr><th>1.x</th><th>2.0</th></tr>
<tr><td>

```js
beginShape();
vertex(10, 10);
vertex(30, 10);

bezierVertex(35, 10, 40, 15, 40, 20);

vertex(40, 30);

quadraticVertex(40, 40, 30, 40);

vertex(10, 40);

endShape(CLOSE);
```

</td><td>

```js
beginShape();
vertex(10, 10);
vertex(30, 10);

// Default cubic
bezierVertex(35, 10);
bezierVertex(40, 15);
bezierVertex(40, 20);

vertex(40, 30);

bezierOrder(2);
bezierVertex(40, 40);
bezierVertex(30, 40);

vertex(10, 40);

endShape(p5.CLOSE);
```

</td></tr>
</table>

We've renamed `curveVertex` to `splineVertex` and have given it more options. By default, it will now go through every `splineVertex`, so you no longer have to double up the first/last point to get it to go through it:

<table>
<tr><th>1.x</th><th>2.0</th></tr>
<tr><td>

```js
beginShape();
curveVertex(10, 10);
curveVertex(10, 10);
curveVertex(15, 40);
curveVertex(40, 35);
curveVertex(25, 15);
curveVertex(15, 25);
curveVertex(15, 25);
endShape();
```

</td><td>

```js
beginShape();

splineVertex(10, 10);
splineVertex(15, 40);
splineVertex(40, 35);
splineVertex(25, 15);
splineVertex(15, 25);

endShape();
```

</td></tr>
</table>

Similarly, `endShape(CLOSE)` (or `endContour(CLOSE)` if you're in a contour) will cause a spline to smoothly loop back on itself so you no longer need to double up any points:

<table>
<tr><th>1.x</th><th>2.0</th></tr>
<tr><td>

```js
beginShape();
curveVertex(15, 25);
curveVertex(10, 10);
curveVertex(15, 40);
curveVertex(40, 35);
curveVertex(25, 15);
curveVertex(15, 25);
curveVertex(10, 10);
curveVertex(15, 40);
endShape();
```

</td><td>

```js
beginShape();

splineVertex(10, 10);
splineVertex(15, 40);
splineVertex(40, 35);
splineVertex(25, 15);
splineVertex(15, 25);


endShape(CLOSE);
```

</td></tr>
</table>


### Async loading (thanks to @limzykenneth)

Rather than having a `preload` function, p5 2.0 has `async setup`!

<table>
<tr><th>1.x</th><th>2.0</th></tr>
<tr><td>

```js
let img;

function preload() {
  img = loadImage('cat.jpg');
}

function setup() {
  createCanvas(200, 200);
}
```

</td><td>

```js
let img;

async function setup() {
  createCanvas(200, 200);
  img = await loadImage('cat.jpg');
}
```

</td></tr>
</table>

🚧 Since this is a breaking change from 1.x to 2.0, you can weight in on the compatibility discussion [here](https://github.com/processing/p5.js/issues/7488)

### Support for loading fonts via CSS (thanks to @dhowe)

In 2D mode, try loading fonts via a a path to a CSS font file, such as a Google Fonts link!

```js
loadFont("https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&display=swap")
loadFont(`@font-face { font-family: "Bricolage Grotesque", serif; font-optical-sizing: auto; font-weight: <weight> font-style: normal; font-variation-settings: "wdth" 100; }`);
loadFont({
    fontFamily: '"Bricolage Grotesque", serif',
    fontOpticalSizing: 'auto',
    fontWeight: '<weight>',
    fontStyle: 'normal',
    fontVariationSettings: '"wdth" 100',
});
loadFont("https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf");
loadFont("path/to/localFont.ttf");
loadFont("system-font-name");
```
### Support for variable font weight (thanks to contributions by @dhowe)

In 2D mode, if you've loaded a variable font, try changing its weight!

```js
var font;

async function setup() {
  createCanvas(100, 100);
  font = await loadFont(
    'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap'
  );
}

function draw() {
  background(255);
  textFont(font);
  textAlign(LEFT, TOP);
  textSize(35);
  textWeight(sin(millis() * 0.002) * 200 + 400);
  text('p5*js', 0, 10);
}
```
  
### More ways to draw and manipulate text (thanks to @davepagurek)

Like how `textToPoints()` gives you points on text, the new `textToContours()` function lets you edit the points on text and then draw them with fills!

```js
createCanvas(100, 100);
const font = await loadFont('myFont.ttf');
background(200);
strokeWeight(2);
textSize(50);
const contours = font.textToContours('p5*js', 0, 50, { sampleFactor: 0.5 });
beginShape();
for (const pts of contours) {
  beginContour();
  for (const pt of pts) {
    vertex(pt.x + 20*sin(pt.y*0.01), pt.y + 20*sin(pt.x*0.01));
  }
  endContour(CLOSE);
}
endShape();
```

In WebGL, you can use `textToModel` to extrude a 3D model out of your text:

```js
createCanvas(100, 100, WEBGL);
const font = await loadFont('myFont.ttf');
background(200);
textSize(50);
const geom = font.textToModel('p5*js', 0, 50, { sampleFactor: 2, extrude: 20 });
orbitControl();
model(geom);
```

### A new pointer event handling system (thanks to @diyaayay)

Instead of having separate methods for mouse and touch, we now use the browser's pointer API to handle both simultaneously. Try defining mouse functions as usual and accessing the global `touches` array to see what pointers are active for multitouch support!

### Custom shader attributes (thanks to @lukeplowden)

If you are using a shader and want custom per-vertex properties in addition to `uniform`s, which are the same across the whole shape, you can now call `vertexProperty(name, value)` before vertices.

```js
const vertSrc = `#version 300 es
 precision mediump float;
 uniform mat4 uModelViewMatrix;
 uniform mat4 uProjectionMatrix;

 in vec3 aPosition;
 in vec2 aOffset;

 void main(){
   vec4 positionVec4 = vec4(aPosition.xyz, 1.0);
   positionVec4.xy += aOffset;
   gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;
 }
`;

const fragSrc = `#version 300 es
 precision mediump float;
 out vec4 outColor;
 void main(){
   outColor = vec4(0.0, 1.0, 1.0, 1.0);
 }
`;

function setup(){
  createCanvas(100, 100, WEBGL);

  // Create and use the custom shader.
  const myShader = createShader(vertSrc, fragSrc);
  shader(myShader);

  describe('A wobbly, cyan circle on a gray background.');
}

function draw(){
  // Set the styles
  background(125);
  noStroke();

  // Draw the circle.
  beginShape();
  for (let i = 0; i < 30; i++){
    const x = 40 * cos(i/30 * TWO_PI);
    const y = 40 * sin(i/30 * TWO_PI);

    // Apply some noise to the coordinates.
    const xOff = 10 * noise(x + millis()/1000) - 5;
    const yOff = 10 * noise(y + millis()/1000) - 5;

    // Apply these noise values to the following vertex.
    vertexProperty('aOffset', [xOff, yOff]);
    vertex(x, y);
  }
  endShape(CLOSE);
}
```

## What's Changed
### What's Changed 🎊
* Addresses issue #7077 by @Garima3110 in https://github.com/processing/p5.js/pull/7102
* Add initial conversion script from Documentation.js to old format by @davepagurek in https://github.com/processing/p5.js/pull/6777
* Standardize all parameter types by @sproutleaf in https://github.com/processing/p5.js/pull/7179
* Modify convert.js and finish standardizing parameters by @sproutleaf in https://github.com/processing/p5.js/pull/7183
* Start developing a new param validator using Zod by @sproutleaf in https://github.com/processing/p5.js/pull/7186
* Update to param validator + test file by @sproutleaf in https://github.com/processing/p5.js/pull/7194
* [p5.js 2.0] Refactor and modular build by @limzykenneth in https://github.com/processing/p5.js/pull/7203
* Fix most WebGL tests by @davepagurek in https://github.com/processing/p5.js/pull/7210
* Get visual tests running in 2.0 by @davepagurek in https://github.com/processing/p5.js/pull/7251
* Small fixes to help get dev-2.0 branch running for other contributors by @lukeplowden in https://github.com/processing/p5.js/pull/7215
* Module syntax conversion by @limzykenneth in https://github.com/processing/p5.js/pull/7257
* More test fixes by @davepagurek in https://github.com/processing/p5.js/pull/7266
* Update param validator and test file by @sproutleaf in https://github.com/processing/p5.js/pull/7268
* Shader hooks for dev-2.0 by @davepagurek in https://github.com/processing/p5.js/pull/7267
* Final changes for parameter validation by @sproutleaf in https://github.com/processing/p5.js/pull/7291
* setAttribute() function for defining custom shader attributes by @lukeplowden in https://github.com/processing/p5.js/pull/7276
* Initial modules refactor by @davepagurek in https://github.com/processing/p5.js/pull/7295
* [p5.js 2.0] WebGL module syntax by @limzykenneth in https://github.com/processing/p5.js/pull/7296
* Add new sketch verifier to FES by @sproutleaf in https://github.com/processing/p5.js/pull/7293
* Make shaders define what they get used for. by @Garima3110 in https://github.com/processing/p5.js/pull/7256
* Shape tests by @davepagurek in https://github.com/processing/p5.js/pull/7323
* Split contents of dom.js among four(4) files by @SilasVM in https://github.com/processing/p5.js/pull/7316
* Solves issue #7059 by @Garima3110 in https://github.com/processing/p5.js/pull/7113
* Add more shape visual tests by @davepagurek in https://github.com/processing/p5.js/pull/7350
* [p5.js 2.0] State machines and renderer refactoring by @limzykenneth in https://github.com/processing/p5.js/pull/7270
* WebGL mode refactor by @davepagurek in https://github.com/processing/p5.js/pull/7355
* 2.0 modules clean up by @limzykenneth in https://github.com/processing/p5.js/pull/7361
* Add custom_shapes.js, which will eventually replace vertex.js by @GregStanton in https://github.com/processing/p5.js/pull/7368
* Fix issues with stroke depth ordering by @davepagurek in https://github.com/processing/p5.js/pull/7369
* [p5.js 2.0] IO refactoring by @limzykenneth in https://github.com/processing/p5.js/pull/7365
* Fix issues with retained mode rendering and image light by @davepagurek in https://github.com/processing/p5.js/pull/7384
* [p5.js 2.0] Fix CSV parsing by @limzykenneth in https://github.com/processing/p5.js/pull/7391
* Adding strokeMode() to access SIMPLE lines.  by @perminder-17 in https://github.com/processing/p5.js/pull/7390
* Event Ordering for touch and mouse events by @diyaayay in https://github.com/processing/p5.js/pull/7378
* [p5.js 2.0] Unit tests fix/conversion by @limzykenneth in https://github.com/processing/p5.js/pull/7393
* Type 2.0 by @dhowe in https://github.com/processing/p5.js/pull/7356
* Refactor 2.0 Typography code to work with WebGL by @davepagurek in https://github.com/processing/p5.js/pull/7417
* Overhaul custom shapes for p5.js 2.0 by @GregStanton in https://github.com/processing/p5.js/pull/7373
* Add tests for font weight + fix Google Font loading by @davepagurek in https://github.com/processing/p5.js/pull/7426
* Add visual tests for textToPoints, addTextToContours by @davepagurek in https://github.com/processing/p5.js/pull/7427
* textToPoints perf improvement by @davepagurek in https://github.com/processing/p5.js/pull/7428
* FilterRenderer2D for a 2d-Build by @perminder-17 in https://github.com/processing/p5.js/pull/7409
* [p5.js 2.0] Color module rewrite by @limzykenneth in https://github.com/processing/p5.js/pull/7406
* [p5.js 2.0] Vector n-dimentional and Matrix Interface by @holomorfo in https://github.com/processing/p5.js/pull/7405
* [dev-2.0] Benchmark setup and sample report for render and batch by @holomorfo in https://github.com/processing/p5.js/pull/7421
* Changed mouse button to object by @diyaayay in https://github.com/processing/p5.js/pull/7404
* Updates to shader hooks for 2.0 by @davepagurek in https://github.com/processing/p5.js/pull/7432
* More typography updates by @davepagurek in https://github.com/processing/p5.js/pull/7434
* Type: implement #7147 and minor refactors by @dhowe in https://github.com/processing/p5.js/pull/7440
* Fix MTL color loading when vertices are shared across different faces by @davepagurek in https://github.com/processing/p5.js/pull/7441
* Fix noErase() breaking in WebGL by @davepagurek in https://github.com/processing/p5.js/pull/7443
* added loadFilterShader function by @Rishab87 in https://github.com/processing/p5.js/pull/7445
* [dev-2.0] WOFF font support by @dhowe in https://github.com/processing/p5.js/pull/7449
* Add 0 check before dividing color by alpha by @davepagurek in https://github.com/processing/p5.js/pull/7478
* Fix usage of model() in buildGeometry() by @davepagurek in https://github.com/processing/p5.js/pull/7479
* Fix WebGL text alignment + add tests by @davepagurek in https://github.com/processing/p5.js/pull/7481
* Implement splineProperty by @davepagurek in https://github.com/processing/p5.js/pull/7471
* Update sketch verifier to check for redefinitions and print friendly messages by @sproutleaf in https://github.com/processing/p5.js/pull/7326
* Fix buildGeometry absorbing the ambient fill color by @davepagurek in https://github.com/processing/p5.js/pull/7489
* Fix closed curves having extra loops by @davepagurek in https://github.com/processing/p5.js/pull/7495
* Fix FES errors, parameter data omitting classes by @davepagurek in https://github.com/processing/p5.js/pull/7497
* Merge main into dev-2.0 by @davepagurek in https://github.com/processing/p5.js/pull/7509
* Minor refactors, cleanup, comments by @dhowe in https://github.com/processing/p5.js/pull/7521
* Text adjustments by @dhowe in https://github.com/processing/p5.js/pull/7523
* Remove wrong rendererGL textWidth function by @seyko1 in https://github.com/processing/p5.js/pull/7524
* Replaced deprecated keyCode functionality and docs with KeyboardEvent.code & KeyboardEvent.key also updates the keyIsDown function to accept alphanumerics as parameters  by @Vaivaswat2244 in https://github.com/processing/p5.js/pull/7472
* Clean up modifier key constants by @davepagurek in https://github.com/processing/p5.js/pull/7526
* Interleave example between other docs by @davepagurek in https://github.com/processing/p5.js/pull/7466
* Add splineProperties by @davepagurek in https://github.com/processing/p5.js/pull/7528
* 2.0 perf updates by @davepagurek in https://github.com/processing/p5.js/pull/7543
* fixed vertex property to take single digits by @Vaivaswat2244 in https://github.com/processing/p5.js/pull/7547
* Add warning when using preload function by @aferriss in https://github.com/processing/p5.js/pull/7542
* Two fixes for #7486 by @dhowe in https://github.com/processing/p5.js/pull/7555
* [p5.js 2.0] Documentation updates by @limzykenneth in https://github.com/processing/p5.js/pull/7558
* Stop future errors when encountering an async error by @davepagurek in https://github.com/processing/p5.js/pull/7563
* Add screenToWorld function mirroring worldToScreen by @bojidar-bg in https://github.com/processing/p5.js/pull/7561
* [p5.js 2.0] Attach p5.Element methods to WebGL canvas by @limzykenneth in https://github.com/processing/p5.js/pull/7567
* [p5.js 2.0] Expose global drawingContext by @limzykenneth in https://github.com/processing/p5.js/pull/7572
* Fix saveCanvas for framebuffers by @davepagurek in https://github.com/processing/p5.js/pull/7576
* Fix: Preserve canvas position when calling noSmooth() in WEBGL by @ImRAJAS-SAMSE in https://github.com/processing/p5.js/pull/7568
* Add back WebGL matrices via getters by @davepagurek in https://github.com/processing/p5.js/pull/7588
* Add filter shader hooks by @davepagurek in https://github.com/processing/p5.js/pull/7582
* [p5.js 2.0] Loading functions fixes by @limzykenneth in https://github.com/processing/p5.js/pull/7594
* Remove old overloads for bezierVertex() and quadraticVertex() by @davepagurek in https://github.com/processing/p5.js/pull/7600
* Fix endShape() to Properly Close Paths and Prevent Shape Merging by @Forchapeatl in https://github.com/processing/p5.js/pull/7601
* Replace p5.Element mouse/touch events with pointer events by @davepagurek in https://github.com/processing/p5.js/pull/7608
* Updated Stencil Test Case to prevent it from disable after every draw by @Vaivaswat2244 in https://github.com/processing/p5.js/pull/7578
* Tried an approch for text case in pixelmatch by @Vaivaswat2244 in https://github.com/processing/p5.js/pull/7552
* Add deprecation info for p5.Table and splitTokens by @davepagurek in https://github.com/processing/p5.js/pull/7624
* Fixes to get the website to build the 2.0 branch by @davepagurek in https://github.com/processing/p5.js/pull/7625
* [p5.js 2.0] Remove typed dict and array functions by @limzykenneth in https://github.com/processing/p5.js/pull/7616
* Typescript declaration files script by @diyaayay in https://github.com/processing/p5.js/pull/7465
* loadFilterShader fixes by @perminder-17 in https://github.com/processing/p5.js/pull/7636
* [p5.js 2.0] Fix p5.Table.getColumn does not work with named columns by @limzykenneth in https://github.com/processing/p5.js/pull/7643
* Convert docs and types scripts to .mjs to fix node errors on some platforms by @davepagurek in https://github.com/processing/p5.js/pull/7644
* fixing getString(), getNum() and get() by @perminder-17 in https://github.com/processing/p5.js/pull/7647
* fixing get() in p5.Table by @perminder-17 in https://github.com/processing/p5.js/pull/7646
* p5.js Shader generation API by @lukeplowden in https://github.com/processing/p5.js/pull/7622
* Minor 2.0 shape changes by @davepagurek in https://github.com/processing/p5.js/pull/7656
* Fix binding of texture() by @davepagurek in https://github.com/processing/p5.js/pull/7668
* [dev-2.0] fix bug in textAscent/Descent by @dhowe in https://github.com/processing/p5.js/pull/7657
* Remove debug logs from the Shader Generator file by @lukeplowden in https://github.com/processing/p5.js/pull/7663
* Rename uv in vertex shader hooks to texCoord for consistency by @davepagurek in https://github.com/processing/p5.js/pull/7669
* Fix debug mode for 2.0 by @davepagurek in https://github.com/processing/p5.js/pull/7672
* Fix default fill color blowing out lighting in WebGL mode by @davepagurek in https://github.com/processing/p5.js/pull/7673
* Updating the docs for `colorMode()`. by @perminder-17 in https://github.com/processing/p5.js/pull/7654
* Added Docs for the new visual tests  by @Vaivaswat2244 in https://github.com/processing/p5.js/pull/7640
* fixing-strokeShader() and some minor fixes in shaderHooks-docs by @perminder-17 in https://github.com/processing/p5.js/pull/7649
* Update examples that use createCamera() to explicitly call setCamera() by @webermayank in https://github.com/processing/p5.js/pull/7607
* Added fontAscent Docs by @perminder-17 in https://github.com/processing/p5.js/pull/7606
* Adding documentation for all text functions by @perminder-17 in https://github.com/processing/p5.js/pull/7658
* Add back docs for existing font methods by @davepagurek in https://github.com/processing/p5.js/pull/7683
* Make sure some new APIs have param types for FES by @davepagurek in https://github.com/processing/p5.js/pull/7684
* Fix a few camera bugs by @davepagurek in https://github.com/processing/p5.js/pull/7688
* [p5.js 2.0] Restore single color value define grayscale color by @limzykenneth in https://github.com/processing/p5.js/pull/7676
* Rename curvePoint/curveTangent to splinePoint/splineTangent by @davepagurek in https://github.com/processing/p5.js/pull/7703
* Text to model docs by @perminder-17 in https://github.com/processing/p5.js/pull/7595
* Updating loadModel function by @perminder-17 in https://github.com/processing/p5.js/pull/7691
* Updating docs for new text functions by @perminder-17 in https://github.com/processing/p5.js/pull/7692
* Adding loadBlob() docs by @perminder-17 in https://github.com/processing/p5.js/pull/7694
* Bug fixes for Shader API by @lukeplowden in https://github.com/processing/p5.js/pull/7675
* Glsl types by @davepagurek in https://github.com/processing/p5.js/pull/7706
* Add support for woff2 via an addon by @davepagurek in https://github.com/processing/p5.js/pull/7693
* Updating Gray-scale in colorMode() by @perminder-17 in https://github.com/processing/p5.js/pull/7690
* fixing-keyboard.js docs by @perminder-17 in https://github.com/processing/p5.js/pull/7689
* Update bezier() to use new bezierVetext by @ksen0 in https://github.com/processing/p5.js/pull/7701
* loadbytes, loadTable and some minor fixes with other modified functions. by @perminder-17 in https://github.com/processing/p5.js/pull/7638
* [dev-2.0] p5.Matrix and p5.Vector docs update by @holomorfo in https://github.com/processing/p5.js/pull/7637
* Update phrasing in dev2 branch for trigonometric f functions by @VANSH3104 in https://github.com/processing/p5.js/pull/7666
* 2.0 beta 6 bug fixes by @davepagurek in https://github.com/processing/p5.js/pull/7709
* 2.0 bug fixes by @davepagurek in https://github.com/processing/p5.js/pull/7713
* Clamp color() to maxes by @davepagurek in https://github.com/processing/p5.js/pull/7715
* Make deprecation in data.json match 1.x by @davepagurek in https://github.com/processing/p5.js/pull/7719
* Start to add pako support by @davepagurek in https://github.com/processing/p5.js/pull/7716
* Fix division by 0 in textToPoints by @davepagurek in https://github.com/processing/p5.js/pull/7723
* [p5.js 2.0] Refactor out reference to fn in p5.Image class by @limzykenneth in https://github.com/processing/p5.js/pull/7720
* Support variable fonts in textToPoints + WebGL rendering by @davepagurek in https://github.com/processing/p5.js/pull/7724
* Set FontFace weight ranges based on Typr info by @davepagurek in https://github.com/processing/p5.js/pull/7727
* Fix incorrect text weight for variable fonts in Safari by @davepagurek in https://github.com/processing/p5.js/pull/7738
* Merge attribution and contributor docs from main to 2.0 by @ksen0 in https://github.com/processing/p5.js/pull/7731
* reorder npm run commands to make p5.js-website update the correct ver… by @lirenjie95 in https://github.com/processing/p5.js/pull/7748
* Fix spline() with z values + initial beginShape colors not updating by @davepagurek in https://github.com/processing/p5.js/pull/7750
* Minimal shape docs by @ksen0 in https://github.com/processing/p5.js/pull/7749

## New Contributors
* @sproutleaf made their first contribution in https://github.com/processing/p5.js/pull/7179
* @lukeplowden made their first contribution in https://github.com/processing/p5.js/pull/7215
* @holomorfo made their first contribution in https://github.com/processing/p5.js/pull/7405
* @seyko1 made their first contribution in https://github.com/processing/p5.js/pull/7524
* @Vaivaswat2244 made their first contribution in https://github.com/processing/p5.js/pull/7472
* @bojidar-bg made their first contribution in https://github.com/processing/p5.js/pull/7561
* @webermayank made their first contribution in https://github.com/processing/p5.js/pull/7607

**Full Changelog**: https://github.com/processing/p5.js/compare/v1.11.5...v2.0.0

## v1.11.5 — 2025-04-17

<!-- Release notes generated using configuration in .github/release.yml at v1.11.5 -->

This release is published on `npm` with the tag `r1`

## What's Changed
### What's Changed 🎊
* reorder npm run commands to make p5.js-website update the correct ver… by @lirenjie95 in https://github.com/processing/p5.js/pull/7747
* Update README.md - 2.0 Info by @ksen0 in https://github.com/processing/p5.js/pull/7751


**Full Changelog**: https://github.com/processing/p5.js/compare/v1.11.4...v1.11.5

## v1.11.4 — 2025-04-16

<!-- Release notes generated using configuration in .github/release.yml at v1.11.4 -->

## What's Changed
### What's Changed 🎊
* docs: add Aaron Welles as a contributor for example by @ksen0 in https://github.com/processing/p5.js/pull/7516
* docs: add example emoji to all example contributors using emoji key by @ksen0 in https://github.com/processing/p5.js/pull/7517
* Fix endShape() to Properly Close Paths and Prevent Shape Merging by @Forchapeatl in https://github.com/processing/p5.js/pull/7583
* Fix camera tilt function to prevent orientation flipping by @Forchapeatl in https://github.com/processing/p5.js/pull/7598
* Fix #7259 TypeError for Offscreen Shapes by @himanshuukholiya in https://github.com/processing/p5.js/pull/7626
* Grammar and Syntax Improvements in p5.js Documentation by @SITADRITA1 in https://github.com/processing/p5.js/pull/7596
* fix typo by @probablynotval in https://github.com/processing/p5.js/pull/7556
* Fix typos in color_namer.js by @pearmini in https://github.com/processing/p5.js/pull/7570
* Fix typos in gridOutput.js by @ChloeYanYan in https://github.com/processing/p5.js/pull/7571
* Fix typos by @omahs in https://github.com/processing/p5.js/pull/7592
* [p5.js - zh(Hans)] translation of missing FES contribution docs by @lirenjie95 in https://github.com/processing/p5.js/pull/7667
* Added Hritvik Bhatia to the contributors list by @HritvikBhatia in https://github.com/processing/p5.js/pull/7645
* Update .all-contributorsrc by @min-kim42 in https://github.com/processing/p5.js/pull/7349
* fix: mouseWheel example fixed while drawing the circle by @swastikCommits in https://github.com/processing/p5.js/pull/7614
* Fix: Update sin(), cos(), and tan() docs to respect angleMode() & cl… by @VANSH3104 in https://github.com/processing/p5.js/pull/7593
* add Chinese translation for documentation_style_guide.md by @lirenjie95 in https://github.com/processing/p5.js/pull/7717
* creating_libraries.md typo by @ffd8 in https://github.com/processing/p5.js/pull/7735
* Contributor unit tests documentation in main by @Vaivaswat2244 in https://github.com/processing/p5.js/pull/7740

## New Contributors
* @himanshuukholiya made their first contribution in https://github.com/processing/p5.js/pull/7626
* @SITADRITA1 made their first contribution in https://github.com/processing/p5.js/pull/7596
* @probablynotval made their first contribution in https://github.com/processing/p5.js/pull/7556
* @ChloeYanYan made their first contribution in https://github.com/processing/p5.js/pull/7571
* @omahs made their first contribution in https://github.com/processing/p5.js/pull/7592
* @HritvikBhatia made their first contribution in https://github.com/processing/p5.js/pull/7645
* @swastikCommits made their first contribution in https://github.com/processing/p5.js/pull/7614

**Full Changelog**: https://github.com/processing/p5.js/compare/v1.11.3...v1.11.4

## v2.0.0-beta.8 — 2025-04-15 (prerelease)

<!-- Release notes generated using configuration in .github/release.yml at dev-2.0 -->

## What's Changed
### What's Changed 🎊
* Start to add pako support by @davepagurek in https://github.com/processing/p5.js/pull/7716
* Fix division by 0 in textToPoints by @davepagurek in https://github.com/processing/p5.js/pull/7723
* [p5.js 2.0] Refactor out reference to fn in p5.Image class by @limzykenneth in https://github.com/processing/p5.js/pull/7720
* Support variable fonts in textToPoints + WebGL rendering by @davepagurek in https://github.com/processing/p5.js/pull/7724
* Set FontFace weight ranges based on Typr info by @davepagurek in https://github.com/processing/p5.js/pull/7727
* Fix incorrect text weight for variable fonts in Safari by @davepagurek in https://github.com/processing/p5.js/pull/7738
* Merge attribution and contributor docs from main to 2.0 by @ksen0 in https://github.com/processing/p5.js/pull/7731


**Full Changelog**: https://github.com/processing/p5.js/compare/v2.0.0-beta.7...v2.0.0-beta.8

## v2.0.0-beta.7 — 2025-04-10 (prerelease)

<!-- Release notes generated using configuration in .github/release.yml at dev-2.0 -->

## What's Changed
### What's Changed 🎊
* 2.0 beta 6 bug fixes by @davepagurek in https://github.com/processing/p5.js/pull/7709
* 2.0 bug fixes by @davepagurek in https://github.com/processing/p5.js/pull/7713
* Clamp color() to maxes by @davepagurek in https://github.com/processing/p5.js/pull/7715
* Make deprecation in data.json match 1.x by @davepagurek in https://github.com/processing/p5.js/pull/7719


**Full Changelog**: https://github.com/processing/p5.js/compare/v2.0.0-beta.6...v2.0.0-beta.7

## v2.0.0-beta.6 — 2025-04-08 (prerelease)

<!-- Release notes generated using configuration in .github/release.yml at dev-2.0 -->

## What's Changed
### What's Changed 🎊
* Minor 2.0 shape changes by @davepagurek in https://github.com/processing/p5.js/pull/7656
* Fix binding of texture() by @davepagurek in https://github.com/processing/p5.js/pull/7668
* [dev-2.0] fix bug in textAscent/Descent by @dhowe in https://github.com/processing/p5.js/pull/7657
* Remove debug logs from the Shader Generator file by @lukeplowden in https://github.com/processing/p5.js/pull/7663
* Rename uv in vertex shader hooks to texCoord for consistency by @davepagurek in https://github.com/processing/p5.js/pull/7669
* Fix debug mode for 2.0 by @davepagurek in https://github.com/processing/p5.js/pull/7672
* Fix default fill color blowing out lighting in WebGL mode by @davepagurek in https://github.com/processing/p5.js/pull/7673
* Updating the docs for `colorMode()`. by @perminder-17 in https://github.com/processing/p5.js/pull/7654
* Added Docs for the new visual tests  by @Vaivaswat2244 in https://github.com/processing/p5.js/pull/7640
* fixing-strokeShader() and some minor fixes in shaderHooks-docs by @perminder-17 in https://github.com/processing/p5.js/pull/7649
* Update examples that use createCamera() to explicitly call setCamera() by @webermayank in https://github.com/processing/p5.js/pull/7607
* Added fontAscent Docs by @perminder-17 in https://github.com/processing/p5.js/pull/7606
* Adding documentation for all text functions by @perminder-17 in https://github.com/processing/p5.js/pull/7658
* Add back docs for existing font methods by @davepagurek in https://github.com/processing/p5.js/pull/7683
* Make sure some new APIs have param types for FES by @davepagurek in https://github.com/processing/p5.js/pull/7684
* Fix a few camera bugs by @davepagurek in https://github.com/processing/p5.js/pull/7688
* [p5.js 2.0] Restore single color value define grayscale color by @limzykenneth in https://github.com/processing/p5.js/pull/7676
* Rename curvePoint/curveTangent to splinePoint/splineTangent by @davepagurek in https://github.com/processing/p5.js/pull/7703
* Text to model docs by @perminder-17 in https://github.com/processing/p5.js/pull/7595
* Updating loadModel function by @perminder-17 in https://github.com/processing/p5.js/pull/7691
* Updating docs for new text functions by @perminder-17 in https://github.com/processing/p5.js/pull/7692
* Adding loadBlob() docs by @perminder-17 in https://github.com/processing/p5.js/pull/7694
* Bug fixes for Shader API by @lukeplowden in https://github.com/processing/p5.js/pull/7675
* Glsl types by @davepagurek in https://github.com/processing/p5.js/pull/7706
* Add support for woff2 via an addon by @davepagurek in https://github.com/processing/p5.js/pull/7693
* Updating Gray-scale in colorMode() by @perminder-17 in https://github.com/processing/p5.js/pull/7690
* fixing-keyboard.js docs by @perminder-17 in https://github.com/processing/p5.js/pull/7689
* Update bezier() to use new bezierVetext by @ksen0 in https://github.com/processing/p5.js/pull/7701
* loadbytes, loadTable and some minor fixes with other modified functions. by @perminder-17 in https://github.com/processing/p5.js/pull/7638
* [dev-2.0] p5.Matrix and p5.Vector docs update by @holomorfo in https://github.com/processing/p5.js/pull/7637
* Update phrasing in dev2 branch for trigonometric f functions by @VANSH3104 in https://github.com/processing/p5.js/pull/7666

## New Contributors
* @webermayank made their first contribution in https://github.com/processing/p5.js/pull/7607

**Full Changelog**: https://github.com/processing/p5.js/compare/v2.0.0-beta.5...v2.0.0-beta.6

## v2.0.0-beta.5 — 2025-03-22 (prerelease)

<!-- Release notes generated using configuration in .github/release.yml at v2.0.0-beta.5 -->

## What's Changed
### What's Changed 🎊
* [p5.js 2.0] Loading functions fixes by @limzykenneth in https://github.com/processing/p5.js/pull/7594
* Remove old overloads for bezierVertex() and quadraticVertex() by @davepagurek in https://github.com/processing/p5.js/pull/7600
* Fix endShape() to Properly Close Paths and Prevent Shape Merging by @Forchapeatl in https://github.com/processing/p5.js/pull/7601
* Replace p5.Element mouse/touch events with pointer events by @davepagurek in https://github.com/processing/p5.js/pull/7608
* Updated Stencil Test Case to prevent it from disable after every draw by @Vaivaswat2244 in https://github.com/processing/p5.js/pull/7578
* Tried an approch for text case in pixelmatch by @Vaivaswat2244 in https://github.com/processing/p5.js/pull/7552
* Add deprecation info for p5.Table and splitTokens by @davepagurek in https://github.com/processing/p5.js/pull/7624
* Fixes to get the website to build the 2.0 branch by @davepagurek in https://github.com/processing/p5.js/pull/7625
* [p5.js 2.0] Remove typed dict and array functions by @limzykenneth in https://github.com/processing/p5.js/pull/7616
* Typescript declaration files script by @diyaayay in https://github.com/processing/p5.js/pull/7465
* loadFilterShader fixes by @perminder-17 in https://github.com/processing/p5.js/pull/7636
* [p5.js 2.0] Fix p5.Table.getColumn does not work with named columns by @limzykenneth in https://github.com/processing/p5.js/pull/7643
* Convert docs and types scripts to .mjs to fix node errors on some platforms by @davepagurek in https://github.com/processing/p5.js/pull/7644
* fixing getString(), getNum() and get() by @perminder-17 in https://github.com/processing/p5.js/pull/7647
* fixing get() in p5.Table by @perminder-17 in https://github.com/processing/p5.js/pull/7646
* p5.js Shader generation API by @lukeplowden in https://github.com/processing/p5.js/pull/7622


**Full Changelog**: https://github.com/processing/p5.js/compare/v2.0.0-beta.4...v2.0.0-beta.5

## v2.0.0-beta.4 — 2025-03-03 (prerelease)

<!-- Release notes generated using configuration in .github/release.yml at v2.0.0-beta.4 -->

The library is available from JSDelivr:

* p5.js - https://cdn.jsdelivr.net/npm/p5@2.0.0-beta.4/lib/p5.js
* p5.min.js - https://cdn.jsdelivr.net/npm/p5@2.0.0-beta.4/lib/p5.min.js

You can duplicate this p5.js web editor project: https://editor.p5js.org/limzykenneth/sketches/FF4krBr6P

You can also import p5 directly from NPM as an ESM module. More documentation on ESM usage to come.

## What's Changed
### What's Changed 🎊
* Fix: Preserve canvas position when calling noSmooth() in WEBGL by @ImRAJAS-SAMSE in https://github.com/processing/p5.js/pull/7568
* Add back WebGL matrices via getters by @davepagurek in https://github.com/processing/p5.js/pull/7588
* Add filter shader hooks by @davepagurek in https://github.com/processing/p5.js/pull/7582


**Full Changelog**: https://github.com/processing/p5.js/compare/v2.0.0-beta.3...v2.0.0-beta.4

## v2.0.0-beta.3 — 2025-02-25 (prerelease)

<!-- Release notes generated using configuration in .github/release.yml at v2.0.0-beta.3 -->

**This release has been pulled as it was published incorrectly on NPM. Please use 2.0.0-beta.4 onwards instead. The release will be kept here for the release notes but the version will be pulled on NPM.**

~~The library is available from JSDelivr:~~

~~* p5.js - https://cdn.jsdelivr.net/npm/p5@2.0.0-beta.3/lib/p5.js~~
~~* p5.min.js - https://cdn.jsdelivr.net/npm/p5@2.0.0-beta.3/lib/p5.min.js~~

~~You can duplicate this p5.js web editor project: https://editor.p5js.org/davepagurek/sketches/RwD_DbVR7~~

~~You can also import p5 directly from NPM as an ESM module. More documentation on ESM usage to come.~~

## What's Changed
### What's Changed 🎊
* Minor refactors, cleanup, comments by @dhowe in https://github.com/processing/p5.js/pull/7521
* Text adjustments by @dhowe in https://github.com/processing/p5.js/pull/7523
* Remove wrong rendererGL textWidth function by @seyko1 in https://github.com/processing/p5.js/pull/7524
* Replaced deprecated keyCode functionality and docs with KeyboardEvent.code & KeyboardEvent.key also updates the keyIsDown function to accept alphanumerics as parameters  by @Vaivaswat2244 in https://github.com/processing/p5.js/pull/7472
* Clean up modifier key constants by @davepagurek in https://github.com/processing/p5.js/pull/7526
* Interleave example between other docs by @davepagurek in https://github.com/processing/p5.js/pull/7466
* Add splineProperties by @davepagurek in https://github.com/processing/p5.js/pull/7528
* 2.0 perf updates by @davepagurek in https://github.com/processing/p5.js/pull/7543
* fixed vertex property to take single digits by @Vaivaswat2244 in https://github.com/processing/p5.js/pull/7547
* Add warning when using preload function by @aferriss in https://github.com/processing/p5.js/pull/7542
* Two fixes for #7486 by @dhowe in https://github.com/processing/p5.js/pull/7555
* [p5.js 2.0] Documentation updates by @limzykenneth in https://github.com/processing/p5.js/pull/7558
* Stop future errors when encountering an async error by @davepagurek in https://github.com/processing/p5.js/pull/7563
* Add screenToWorld function mirroring worldToScreen by @bojidar-bg in https://github.com/processing/p5.js/pull/7561
* [p5.js 2.0] Attach p5.Element methods to WebGL canvas by @limzykenneth in https://github.com/processing/p5.js/pull/7567
* [p5.js 2.0] Expose global drawingContext by @limzykenneth in https://github.com/processing/p5.js/pull/7572
* Fix saveCanvas for framebuffers by @davepagurek in https://github.com/processing/p5.js/pull/7576

## New Contributors
* @seyko1 made their first contribution in https://github.com/processing/p5.js/pull/7524
* @Vaivaswat2244 made their first contribution in https://github.com/processing/p5.js/pull/7472
* @bojidar-bg made their first contribution in https://github.com/processing/p5.js/pull/7561

**Full Changelog**: https://github.com/processing/p5.js/compare/v2.0.0-beta.2...v2.0.0-beta.3

## v2.0.0-beta.2 — 2025-02-02 (prerelease)

<!-- Release notes generated using configuration in .github/release.yml at v2.0.0-beta.2 -->

The library is available from JSDelivr:
- p5.js - https://cdn.jsdelivr.net/npm/p5@2.0.0-beta.2/lib/p5.js
- p5.min.js - https://cdn.jsdelivr.net/npm/p5@2.0.0-beta.2/lib/p5.min.js

You can duplicate this p5.js web editor project: https://editor.p5js.org/davepagurek/sketches/RwD_DbVR7

You can also import `p5` directly from NPM as an ESM module. More documentation on ESM usage to come.

## What's Changed

* Merged main into 2.0
* Fix bug where `pixels` is not available
* Fixed `model()` not working inside `buildGeometry()`
* Fixed WebGL text alignment bugs
* Fixed bugs in closed splines

## What to test

### Async loading (thanks to @limzykenneth)

Rather than having a `preload` function, p5 2.0 has `async setup`!

<table>
<tr><th>1.x</th><th>2.0</th></tr>
<tr><td>

```js
let img;

function preload() {
  img = loadImage('cat.jpg');
}

function setup() {
  createCanvas(200, 200);
}
```

</td><td>

```js
let img;

async function setup() {
  createCanvas(200, 200);
  img = await loadImage('cat.jpg');
}
```

</td></tr>
</table>

🚧 Since this is a breaking change from 1.x to 2.0, you can weight in on the compatibility discussion [here](https://github.com/processing/p5.js/issues/7488)

### Support for loading fonts via CSS (thanks to @dhowe)

In 2D mode, try loading fonts via a a path to a CSS font file, such as a Google Fonts link!

```js
loadFont("https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&display=swap")
loadFont(`@font-face { font-family: "Bricolage Grotesque", serif; font-optical-sizing: auto; font-weight: <weight> font-style: normal; font-variation-settings: "wdth" 100; }`);
loadFont({
    fontFamily: '"Bricolage Grotesque", serif',
    fontOpticalSizing: 'auto',
    fontWeight: '<weight>',
    fontStyle: 'normal',
    fontVariationSettings: '"wdth" 100',
});
loadFont("https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf");
loadFont("path/to/localFont.ttf");
loadFont("system-font-name");
```
### Support for variable font weight (thanks to contributions by @dhowe)

In 2D mode, if you've loaded a variable font, try changing its weight!

```js
var font;

async function setup() {
  createCanvas(100, 100);
  font = await loadFont(
    'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap'
  );
}

function draw() {
  background(255);
  textFont(font);
  textAlign(LEFT, TOP);
  textSize(35);
  textWeight(sin(millis() * 0.002) * 200 + 400);
  text('p5*js', 0, 10);
}
```
  
### More ways to draw and manipulate text (thanks to @davepagurek)

Like how `textToPoints()` gives you points on text, the new `textToContours()` function lets you edit the points on text and then draw them with fills!

```js
createCanvas(100, 100);
const font = await loadFont('myFont.ttf');
background(200);
strokeWeight(2);
textSize(50);
const contours = font.textToContours('p5*js', 0, 50, { sampleFactor: 0.5 });
beginShape();
for (const pts of contours) {
  beginContour();
  for (const pt of pts) {
    vertex(pt.x + 20*sin(pt.y*0.01), pt.y + 20*sin(pt.x*0.01));
  }
  endContour(CLOSE);
}
endShape();
```

In WebGL, you can use `textToModel` to extrude a 3D model out of your text:

```js
createCanvas(100, 100, WEBGL);
const font = await loadFont('myFont.ttf');
background(200);
textSize(50);
const geom = font.textToModel('p5*js', 0, 50, { sampleFactor: 2, extrude: 20 });
orbitControl();
model(geom);
```

### A new pointer event handling system (thanks to @diyaayay)

Instead of having separate methods for mouse and touch, we now use the browser's pointer API to handle both simultaneously. Try defining mouse functions as usual and accessing the global `touches` array to see what pointers are active for multitouch support!

### Custom shader attributes (thanks to @lukeplowden)

If you are using a shader and want custom per-vertex properties in addition to `uniform`s, which are the same across the whole shape, you can now call `vertexProperty(name, value)` before vertices.

```js
const vertSrc = `#version 300 es
 precision mediump float;
 uniform mat4 uModelViewMatrix;
 uniform mat4 uProjectionMatrix;

 in vec3 aPosition;
 in vec2 aOffset;

 void main(){
   vec4 positionVec4 = vec4(aPosition.xyz, 1.0);
   positionVec4.xy += aOffset;
   gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;
 }
`;

const fragSrc = `#version 300 es
 precision mediump float;
 out vec4 outColor;
 void main(){
   outColor = vec4(0.0, 1.0, 1.0, 1.0);
 }
`;

function setup(){
  createCanvas(100, 100, WEBGL);

  // Create and use the custom shader.
  const myShader = createShader(vertSrc, fragSrc);
  shader(myShader);

  describe('A wobbly, cyan circle on a gray background.');
}

function draw(){
  // Set the styles
  background(125);
  noStroke();

  // Draw the circle.
  beginShape();
  for (let i = 0; i < 30; i++){
    const x = 40 * cos(i/30 * TWO_PI);
    const y = 40 * sin(i/30 * TWO_PI);

    // Apply some noise to the coordinates.
    const xOff = 10 * noise(x + millis()/1000) - 5;
    const yOff = 10 * noise(y + millis()/1000) - 5;

    // Apply these noise values to the following vertex.
    vertexProperty('aOffset', [xOff, yOff]);
    vertex(x, y);
  }
  endShape(CLOSE);
}
```

### Updated bezier and curve drawing functions (thanks to @GregStanton)

First off: you can combine multiple types of curves in one `begin/endShape()` block now!

Long cubic and quadratic bezier vertex calls are now split up into their individual control points. Both cubic and quadratic curves are done with `bezierVertex` now, and you can set `bezierOrder()` to change from cubic (order 3) to quadratic (order 2). For WebGL mode, this also means you can also specify texture coordinates per control point, or change the fill, stroke, normal, and more between control points.

<table>
<tr><th>1.x</th><th>2.0</th></tr>
<tr><td>

```js
beginShape();
vertex(10, 10);
vertex(30, 10);

bezierVertex(35, 10, 40, 15, 40, 20);

vertex(40, 30);

quadraticVertex(40, 40, 30, 40);

vertex(10, 40);

endShape(CLOSE);
```

</td><td>

```js
beginShape();
vertex(10, 10);
vertex(30, 10);

// Default cubic
bezierVertex(35, 10);
bezierVertex(40, 15);
bezierVertex(40, 20);

vertex(40, 30);

bezierOrder(2);
bezierVertex(40, 40);
bezierVertex(30, 40);

vertex(10, 40);

endShape(p5.CLOSE);
```

</td></tr>
</table>

We've renamed `curveVertex` to `splineVertex` and have given it more options. By default, it will now go through every `splineVertex`, so you no longer have to double up the first/last point to get it to go through it:

<table>
<tr><th>1.x</th><th>2.0</th></tr>
<tr><td>

```js
beginShape();
curveVertex(10, 10);
curveVertex(10, 10);
curveVertex(15, 40);
curveVertex(40, 35);
curveVertex(25, 15);
curveVertex(15, 25);
curveVertex(15, 25);
endShape();
```

</td><td>

```js
beginShape();

splineVertex(10, 10);
splineVertex(15, 40);
splineVertex(40, 35);
splineVertex(25, 15);
splineVertex(15, 25);

endShape();
```

</td></tr>
</table>

Similarly, `endShape(CLOSE)` (or `endContour(CLOSE)` if you're in a contour) will cause a spline to smoothly loop back on itself so you no longer need to double up any points:

<table>
<tr><th>1.x</th><th>2.0</th></tr>
<tr><td>

```js
beginShape();
curveVertex(15, 25);
curveVertex(10, 10);
curveVertex(15, 40);
curveVertex(40, 35);
curveVertex(25, 15);
curveVertex(15, 25);
curveVertex(10, 10);
curveVertex(15, 40);
endShape();
```

</td><td>

```js
beginShape();

splineVertex(10, 10);
splineVertex(15, 40);
splineVertex(40, 35);
splineVertex(25, 15);
splineVertex(15, 25);


endShape(CLOSE);
```

</td></tr>
</table>

🚧 Since this is a breaking change from 1.x to 2.0, you can weight in on the compatibility discussion [here](https://github.com/processing/p5.js/issues/7488)

### A new simple lines mode for WebGL (thanks to contributions from @perminder-17)

If you are drawing lots of shapes, and don't need stroke caps or joins, you can use a simple lines mode for increased performance in WebGL. You can activate this mode by calling `linesMode(SIMPLE)` in your sketch.

### Custom shaders for fills, strokes, images (thanks to @Garima3110 and @perminder-17)

You can now create your own shaders for fills, strokes, and images, and have them all applied at once! Use `shader()` to set a fill shader, `strokeShader()` to set a stroke shader, and `imageShader()` to set an image shader. Try using `baseMaterialShader().modify(...)` and `baseStrokeShader().modify(...)` to create custom shaders.

```js
let myFillShader = baseMaterialShader.modify({
  'vec4 getFinalColor': `(vec4 color) {
    return vec4(1., 1., 0., 1.);
  }`
});
let myStrokeShader = baseStrokeShader.modify({
  'vec4 getFinalColor': `(vec4 color) {
    return vec4(1., 0., 1., 1.);
  }`
});
let myImageShader = baseMaterialShader.modify({
  'vec4 getFinalColor': `(vec4 color) {
    return vec4(0., 1., 1., 1.);
  }`
});

shader(myFillShader);
strokeShader(myStrokeShader);
imageShader(myImageShader);

sphere(); // Draws with the custom stroke and image shaders
image(myImg, 0, 0); // Draws with the custom image shader
```

### A new public `p5.Matrix` class (thanks to @holomorfo)

*TODO add examples*

### Support for more color spaces in `p5.Color` (thanks to @limzykenneth and @dianamgalindo)

p5.js 2.0 now supports more color modes in addition to the existing RGB, HSB, and HSL color modes. Here are the list of new supported color mode and brief description of them:

* `RGBHDR` - High Dynamic Range RGB color defined within the Display P3 color space. You will need to use the HDR canvas described below to draw this color on the canvas accurately.
* `HWB` - Hue, Whiteness, Blackness. This is similar to `HSL` and `HSB` in that you will define a hue angle however instead of saturation and lightness, you will define the percentage of whiteness and blackness. It is the color model of the GUI color picker used by Chrome.
![color-picker](https://github.com/user-attachments/assets/fd110cb4-d327-4424-9380-b85cc760edb7)
* `LAB` - Also called CIE Lab, defines color with Lightness, Alpha, and Beta. The color space is often used in professional color measuring context.
* `LCH` - An easier to use representation of a CIE Lab color with definition of Lightness, Chroma, and Hue instead.
* `OKLAB` - OkLab is a slight adjustment to CIE Lab color space mainly to fix a non-uniformity issue that exist in CIE Lab. This difference is more visible in the example below.
* `OKLCH` - An easier to use representation of an OkLab color with definition of Lightness, Chroma, and Hue instead.

Comparing `HSL`, `LCH`, and `OKLCH` in a [sketch](https://editor.p5js.org/limzykenneth/sketches/l4FtFScH5) below:
![color wheel](https://github.com/user-attachments/assets/5ace0470-bcf9-408f-ae77-35a454137f61)
From left to right are color wheels of `HSL`, `LCH`, and `OKLCH` respectively. Notice the evenness of color distribution between each wheel with OkLCH having the most even distribution. It can be noted that the LCH wheel has a large blue section that is fixed by OkLCH.

To use these new color spaces in p5.js 2.0, the respective constants have been added and the `colorMode()` function can be used with these constants in the same way as `RGB`, `HSL`, and `HSB`.

```js
function setup(){
  createCanvas(200, 200);
}

function draw(){
  colorMode(OKLCH);
  background(220); // Should show a teal colored canvas
}
```

### Support for wide-gamut colors with the `display-p3` mode (thanks to @limzykenneth)

You can now create a 2D canvas that supports HDR colors that will give you a more vibrant sketch and also HDR images. To use a HDR canvas you will need to create it using the `P2DHDR` constant like below:

```js
function setup(){
  createCanvas(400, 400, P2DHDR);
}
```

When a `P2DHDR` canvas is created, the default color mode will be switched to the new `RGBHDR` color mode instead of `RGB`. In practice you can continue to use the same RGB color definition you have always used.

```js
function setup(){
  createCanvas(400, 400, P2DHDR);
}

function draw(){
  background(255, 0, 0);
  fill(100, 255, 0);
  circle(100, 100, 50);
}
```

This example [sketch](https://editor.p5js.org/limzykenneth/sketches/LB2vJFdj4) shows a direct comparison between HDR and non-HDR colors, you should see three bands of red, green, and blue colors with a slightly dimmer red, green, and blue circles within. However, both your browser and your screen will need to support HDR to see the difference. Currently Firefox on desktop does not support HDR canvas so if you do not see a difference, try a different browser such as Safari or Chrome.

You can also now load HDR images and have them be displayed in full HDR in a [HDR canvas](https://editor.p5js.org/limzykenneth/sketches/52J0mtOID). If you see a dark image on the linked sketch, your browser or screen does not support HDR and you should try a different browser/device.
---

### What's Changed 🎊
* Fix panorama() by @davepagurek in https://github.com/processing/p5.js/pull/7154
* Fix unnecessary console warnings when using smooth() on P2D Graphics objects by @zeesworth in https://github.com/processing/p5.js/pull/7159
* added paletteLerp by @RandomGamingDev in https://github.com/processing/p5.js/pull/6960
* imageLight - panorama shader bug, added @perminder-17 code snippet by @PimTournaye in https://github.com/processing/p5.js/pull/7169
* Tie FES initialization to only run just before p5 init by @limzykenneth in https://github.com/processing/p5.js/pull/7173
* Code block updates in `vertex.js` by @DenisovichDev in https://github.com/processing/p5.js/pull/7174
* Fix incorrect pixel offset in updatePixels() by @Forchapeatl in https://github.com/processing/p5.js/pull/7177
* fix for #7181 by @orrkislev in https://github.com/processing/p5.js/pull/7182
* Fix Camera.eyeX comment by @Psychpsyo in https://github.com/processing/p5.js/pull/7184
* Solves issue #6891 by @Garima3110 in https://github.com/processing/p5.js/pull/7165
* Fix: Added unique group names for radio buttions by @Forchapeatl in https://github.com/processing/p5.js/pull/7162
* add non-code contributions to contrib guidelines readme by @sarahciston in https://github.com/processing/p5.js/pull/6941
* Caps at the beginning of the curve by @diyaayay in https://github.com/processing/p5.js/pull/7201
* Added useLinePerspective to cam copy properties by @TiborUdvari in https://github.com/processing/p5.js/pull/7213
* Update README.md to include an updated get started link by @willallstet in https://github.com/processing/p5.js/pull/7232
* Fix : broken link in contributor_docs/webgl_mode_architecture.md by @ashwanidey in https://github.com/processing/p5.js/pull/7235
* Fix broken links in contributor_docs/steward_guidelines.md by @aleannab in https://github.com/processing/p5.js/pull/7240
* Fix broken link in contributing_to_the_p5js_references.md by @aleannab in https://github.com/processing/p5.js/pull/7242
* Fix : broken link in contributor_docs/webgl_contribution_guide.md by @ashwanidey in https://github.com/processing/p5.js/pull/7239
* Fix Broken README Link by @benpalevsky in https://github.com/processing/p5.js/pull/7216
* Fix clipping bug with ellipses by @jeanetteandrews in https://github.com/processing/p5.js/pull/7249
* Fixed the broken link on p5.js website page for "p5.js Web Accessibility" by @shourysingh07 in https://github.com/processing/p5.js/pull/7254
* Fixed the broken link on p5.js website page for "Our Focus on Access" by @shourysingh07 in https://github.com/processing/p5.js/pull/7255
* Fixed broken links for p5js references by @visheshrwl in https://github.com/processing/p5.js/pull/7253
* fix: added `WEBGL` mode for correct blendMode(SUBTRACT) behavior by @Abhinavcode13 in https://github.com/processing/p5.js/pull/7229
* fix: broken links in lerpColor() by @M0nica in https://github.com/processing/p5.js/pull/7241
* Refactor arc and rect to use canvas methods rather than curves by @ksen0 in https://github.com/processing/p5.js/pull/7205
* Fix broken links in contributor_docs/access.md by @aleannab in https://github.com/processing/p5.js/pull/7243
* Fixed the broken link on p5.js website page for "WebGL Contribution Guide". by @shourysingh07 in https://github.com/processing/p5.js/pull/7263
* Fixed the broken link on p5.js website page for "How to add Friendly Error Messages" by @shourysingh07 in https://github.com/processing/p5.js/pull/7264
* Shader hooks by @davepagurek in https://github.com/processing/p5.js/pull/7149
* Add list support for `lerpColor` like other color functions by @RandomGamingDev in https://github.com/processing/p5.js/pull/6954
* Remove 2.0 built file by @davepagurek in https://github.com/processing/p5.js/pull/7274
* Added textAscent and textDescent functions on Webgl by @Forchapeatl in https://github.com/processing/p5.js/pull/7187
* Line.vert fix for small units by @TiborUdvari in https://github.com/processing/p5.js/pull/7206
* fixed textpoint alignment by @mathewpan2 in https://github.com/processing/p5.js/pull/6967
* Fixed minor error in documentation for p5.Vector.sub() by @jaredberghold in https://github.com/processing/p5.js/pull/7265
* Rename default shader methods to have a base* prefix by @davepagurek in https://github.com/processing/p5.js/pull/7288
* Performance improvements for WebGL shape drawing by @davepagurek in https://github.com/processing/p5.js/pull/7287
* Change Reference Example by @samarsrivastav in https://github.com/processing/p5.js/pull/7280
* Fix example of createModel function. by @shibomb in https://github.com/processing/p5.js/pull/7298
* fix missing example tag in documentation for color's toString method by @ashish1729 in https://github.com/processing/p5.js/pull/7302
* fixed nf to work with negative number by @Akhilbisht798 in https://github.com/processing/p5.js/pull/7054
* textureData updated to fix flipping property for webgl by @MuktiMishra in https://github.com/processing/p5.js/pull/7305
* Fixes language reference and Markdown syntax by @danicruz0415 in https://github.com/processing/p5.js/pull/7314
* fix typo by @asukaminato0721 in https://github.com/processing/p5.js/pull/7322
* Fix ellipseMode(CORNERS) and rectMode(CORNER) by @martinleopold in https://github.com/processing/p5.js/pull/7290
* add usage of dist by @asukaminato0721 in https://github.com/processing/p5.js/pull/7324
* Fix broken links in contributor-doc by @shibomb in https://github.com/processing/p5.js/pull/7320
* Fix broken links in website references by @shibomb in https://github.com/processing/p5.js/pull/7321
* Uses canvas dimensions instead of arbitrary constants for `noise()` and `noiseDetail()` by @RandomGamingDev in https://github.com/processing/p5.js/pull/7330
* mouseY reference first example issue fixed by @shourysingh07 in https://github.com/processing/p5.js/pull/7311
* Docs: "A maximum of 5 directional lights can be active at once." by @blackboxlogic in https://github.com/processing/p5.js/pull/7337
* Switch all-contributor shield styling to match other shields by @SableRaf in https://github.com/processing/p5.js/pull/7347
* Fix a typo (dpeth -> depth) in webgl/p5.Framebuffer.js by @zs-5 in https://github.com/processing/p5.js/pull/7348
* Save/restore textureMode with push/pop by @davepagurek in https://github.com/processing/p5.js/pull/7358
* fix: Correct typo, improve createRadio() method description, and simplify input tag by @Dhanush111 in https://github.com/processing/p5.js/pull/7315
* Update links to point to tutorial page by @muffinista in https://github.com/processing/p5.js/pull/7318
* fix add alpha doc by @asukaminato0721 in https://github.com/processing/p5.js/pull/7362
* Negative dimensions will mirror rect() again by @martinleopold in https://github.com/processing/p5.js/pull/7363
* fixes issue #7366: Adjust Option Orientation in CreateRadio() reference. by @Prajyot05 in https://github.com/processing/p5.js/pull/7367
* Added ability to use setUniform for textures by texture slot rather than by p5.Texture by @RandomGamingDev in https://github.com/processing/p5.js/pull/7395
* The text properly displayed on Mobile. by @mahi6299 in https://github.com/processing/p5.js/pull/7399
* Updated README by @ksen0 in https://github.com/processing/p5.js/pull/7408
* Update p5.Geometry.js by fixed cap color problem by @mahaidong in https://github.com/processing/p5.js/pull/7413
* Added support for other WebGL sampler types by @RandomGamingDev in https://github.com/processing/p5.js/pull/7411
* fixed repeated key presses when a modifier key is held by @Rishab87 in https://github.com/processing/p5.js/pull/7435
* Fix typo in image.js docs by @reidab in https://github.com/processing/p5.js/pull/7462
* Add and adjust alpha parameter description by @FrauBoes in https://github.com/processing/p5.js/pull/7420
* Documentation Update:Webgl -  .lib files not supported by @atmajaa in https://github.com/processing/p5.js/pull/7454
* Add 0 check before dividing color by alpha by @davepagurek in https://github.com/processing/p5.js/pull/7478
* Fix usage of model() in buildGeometry() by @davepagurek in https://github.com/processing/p5.js/pull/7479
* Fix WebGL text alignment + add tests by @davepagurek in https://github.com/processing/p5.js/pull/7481
* Implement splineProperty by @davepagurek in https://github.com/processing/p5.js/pull/7471
* Documentation Foundation Class: remove dupe example and describe color by @philyawj in https://github.com/processing/p5.js/pull/7483
* Fixed typo in p5.Shader.js documentation comment by @ImRAJAS-SAMSE in https://github.com/processing/p5.js/pull/7458
* Update sketch verifier to check for redefinitions and print friendly messages by @sproutleaf in https://github.com/processing/p5.js/pull/7326
* Add angle param clarification to sin(), cos(), and tan() by @thrly in https://github.com/processing/p5.js/pull/7475
* fixed some broken links in markdown files by @lirenjie95 in https://github.com/processing/p5.js/pull/7485
* Fix buildGeometry absorbing the ambient fill color by @davepagurek in https://github.com/processing/p5.js/pull/7489
* Fix closed curves having extra loops by @davepagurek in https://github.com/processing/p5.js/pull/7495
* Fix FES errors, parameter data omitting classes by @davepagurek in https://github.com/processing/p5.js/pull/7497
* Merge main into dev-2.0 by @davepagurek in https://github.com/processing/p5.js/pull/7509

## New Contributors
* @zeesworth made their first contribution in https://github.com/processing/p5.js/pull/7159
* @PimTournaye made their first contribution in https://github.com/processing/p5.js/pull/7169
* @DenisovichDev made their first contribution in https://github.com/processing/p5.js/pull/7174
* @Forchapeatl made their first contribution in https://github.com/processing/p5.js/pull/7177
* @orrkislev made their first contribution in https://github.com/processing/p5.js/pull/7182
* @Psychpsyo made their first contribution in https://github.com/processing/p5.js/pull/7184
* @sarahciston made their first contribution in https://github.com/processing/p5.js/pull/6941
* @TiborUdvari made their first contribution in https://github.com/processing/p5.js/pull/7213
* @willallstet made their first contribution in https://github.com/processing/p5.js/pull/7232
* @ashwanidey made their first contribution in https://github.com/processing/p5.js/pull/7235
* @aleannab made their first contribution in https://github.com/processing/p5.js/pull/7240
* @benpalevsky made their first contribution in https://github.com/processing/p5.js/pull/7216
* @jeanetteandrews made their first contribution in https://github.com/processing/p5.js/pull/7249
* @shourysingh07 made their first contribution in https://github.com/processing/p5.js/pull/7254
* @visheshrwl made their first contribution in https://github.com/processing/p5.js/pull/7253
* @M0nica made their first contribution in https://github.com/processing/p5.js/pull/7241
* @mathewpan2 made their first contribution in https://github.com/processing/p5.js/pull/6967
* @jaredberghold made their first contribution in https://github.com/processing/p5.js/pull/7265
* @samarsrivastav made their first contribution in https://github.com/processing/p5.js/pull/7280
* @Akhilbisht798 made their first contribution in https://github.com/processing/p5.js/pull/7054
* @MuktiMishra made their first contribution in https://github.com/processing/p5.js/pull/7305
* @danicruz0415 made their first contribution in https://github.com/processing/p5.js/pull/7314
* @martinleopold made their first contribution in https://github.com/processing/p5.js/pull/7290
* @blackboxlogic made their first contribution in https://github.com/processing/p5.js/pull/7337
* @zs-5 made their first contribution in https://github.com/processing/p5.js/pull/7348
* @Dhanush111 made their first contribution in https://github.com/processing/p5.js/pull/7315
* @muffinista made their first contribution in https://github.com/processing/p5.js/pull/7318
* @Prajyot05 made their first contribution in https://github.com/processing/p5.js/pull/7367
* @mahi6299 made their first contribution in https://github.com/processing/p5.js/pull/7399
* @mahaidong made their first contribution in https://github.com/processing/p5.js/pull/7413
* @reidab made their first contribution in https://github.com/processing/p5.js/pull/7462
* @FrauBoes made their first contribution in https://github.com/processing/p5.js/pull/7420
* @atmajaa made their first contribution in https://github.com/processing/p5.js/pull/7454
* @philyawj made their first contribution in https://github.com/processing/p5.js/pull/7483
* @ImRAJAS-SAMSE made their first contribution in https://github.com/processing/p5.js/pull/7458
* @thrly made their first contribution in https://github.com/processing/p5.js/pull/7475
* @lirenjie95 made their first contribution in https://github.com/processing/p5.js/pull/7485

**Full Changelog**: https://github.com/processing/p5.js/compare/v2.0.0-beta.1...v2.0.0-beta.2

## v1.11.3 — 2025-01-22

<!-- Release notes generated using configuration in .github/release.yml at v1.11.3 -->

## What's Changed
### What's Changed 🎊
* Added ability to use setUniform for textures by texture slot rather than by p5.Texture by @RandomGamingDev in https://github.com/processing/p5.js/pull/7395
* The text properly displayed on Mobile. by @mahi6299 in https://github.com/processing/p5.js/pull/7399
* Updated README by @ksen0 in https://github.com/processing/p5.js/pull/7408
* Update p5.Geometry.js by fixed cap color problem by @mahaidong in https://github.com/processing/p5.js/pull/7413
* Added support for other WebGL sampler types by @RandomGamingDev in https://github.com/processing/p5.js/pull/7411
* fixed repeated key presses when a modifier key is held by @Rishab87 in https://github.com/processing/p5.js/pull/7435
* Fix typo in image.js docs by @reidab in https://github.com/processing/p5.js/pull/7462
* Add and adjust alpha parameter description by @FrauBoes in https://github.com/processing/p5.js/pull/7420
* Documentation Update:Webgl -  .lib files not supported by @atmajaa in https://github.com/processing/p5.js/pull/7454
* Documentation Foundation Class: remove dupe example and describe color by @philyawj in https://github.com/processing/p5.js/pull/7483
* Fixed typo in p5.Shader.js documentation comment by @ImRAJAS-SAMSE in https://github.com/processing/p5.js/pull/7458
* Add angle param clarification to sin(), cos(), and tan() by @thrly in https://github.com/processing/p5.js/pull/7475
* fixed some broken links in markdown files by @lirenjie95 in https://github.com/processing/p5.js/pull/7485

## New Contributors
* @mahi6299 made their first contribution in https://github.com/processing/p5.js/pull/7399
* @mahaidong made their first contribution in https://github.com/processing/p5.js/pull/7413
* @reidab made their first contribution in https://github.com/processing/p5.js/pull/7462
* @FrauBoes made their first contribution in https://github.com/processing/p5.js/pull/7420
* @atmajaa made their first contribution in https://github.com/processing/p5.js/pull/7454
* @philyawj made their first contribution in https://github.com/processing/p5.js/pull/7483
* @ImRAJAS-SAMSE made their first contribution in https://github.com/processing/p5.js/pull/7458
* @thrly made their first contribution in https://github.com/processing/p5.js/pull/7475
* @lirenjie95 made their first contribution in https://github.com/processing/p5.js/pull/7485

**Full Changelog**: https://github.com/processing/p5.js/compare/v1.11.2...v1.11.3

## v2.0.0-beta.1 — 2025-01-16 (prerelease)

<!-- Release notes generated using configuration in .github/release.yml at v2.0.0-beta.1 -->

## We want your help!

Try testing out the beta and report any bugs you encounter!

- You can fork this web editor project: https://editor.p5js.org/davepagurek/sketches/wiOiYAp6P

- You can also add a script tag to this build that @davepagurek is hosting:

  ```html
  <script src="https://davepagurek.com/stuff/p5/p5-2.0-b1.min.js"></script>
  ```

## What's Changed 🎊

In addition to lots of behind-the-scenes refactoring, here are some new features that we'd love your help testing out!

### Async loading (thanks to @limzykenneth)

Rather than having a `preload` function, p5 2.0 has `async setup`!

<table>
<tr><th>1.x</th><th>2.0</th></tr>
<tr><td>

```js
let img;

function preload() {
  img = loadImage('cat.jpg');
}

function setup() {
  createCanvas(200, 200);
}
```

</td><td>

```js
let img;

async function setup() {
  createCanvas(200, 200);
  img = await loadImage('cat.jpg');
}
```

</td></tr>
</table>

🚧 Since this is a breaking change from 1.x to 2.0, you can weight in on the compatibility discussion [here](https://github.com/processing/p5.js/issues/7488)

### Support for loading fonts via CSS (thanks to @dhowe)

In 2D mode, try loading fonts via a a path to a CSS font file, such as a Google Fonts link!

```js
loadFont("https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&display=swap")
loadFont(`@font-face { font-family: "Bricolage Grotesque", serif; font-optical-sizing: auto; font-weight: <weight> font-style: normal; font-variation-settings: "wdth" 100; }`);
loadFont({
    fontFamily: '"Bricolage Grotesque", serif',
    fontOpticalSizing: 'auto',
    fontWeight: '<weight>',
    fontStyle: 'normal',
    fontVariationSettings: '"wdth" 100',
});
loadFont("https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf");
loadFont("path/to/localFont.ttf");
loadFont("system-font-name");
```
### Support for variable font weight (thanks to contributions by @dhowe)

In 2D mode, if you've loaded a variable font, try changing its weight!

```js
async function setup() {
  createCanvas(100, 100);
  const font = await loadFont(
    'https://fonts.googleapis.com/css2?family=Sniglet:wght@400;800&display=swap'
  );
}

function draw() {
  background(255);
  textFont(font);
  textAlign(LEFT, TOP);
  textSize(35);
  textWeight(sin(millis() * 0.002) * 200 + 400);
  text('p5*js', 0, 10);
}
```
  
### More ways to draw and manipulate text (thanks to @davepagurek)

Like how `textToPoints()` gives you points on text, the new `textToContours()` function lets you edit the points on text and then draw them with fills!

```js
createCanvas(100, 100);
const font = await loadFont('myFont.ttf');
background(200);
strokeWeight(2);
textSize(50);
const contours = font.textToContours('p5*js', 0, 50, { sampleFactor: 0.5 });
beginShape();
for (const pts of contours) {
  beginContour();
  for (const pt of pts) {
    vertex(pt.x + 20*sin(pt.y*0.01), pt.y + 20*sin(pt.x*0.01));
  }
  endContour(CLOSE);
}
endShape();
```

In WebGL, you can use `textToModel` to extrude a 3D model out of your text:

```js
createCanvas(100, 100, WEBGL);
const font = await loadFont('myFont.ttf');
background(200);
textSize(50);
const geom = font.textToModel('p5*js', 0, 50, { sampleFactor: 2, extrude: 20 });
orbitControl();
model(geom);
```

### A new pointer event handling system (thanks to @diyaayay)

Instead of having separate methods for mouse and touch, we now use the browser's pointer API to handle both simultaneously. Try defining mouse functions as usual and accessing the global `touches` array to see what pointers are active for multitouch support!

### Custom shader attributes (thanks to @lukeplowden)

If you are using a shader and want custom per-vertex properties in addition to `uniform`s, which are the same across the whole shape, you can now call `vertexProperty(name, value)` before vertices.

```js
const vertSrc = `#version 300 es
 precision mediump float;
 uniform mat4 uModelViewMatrix;
 uniform mat4 uProjectionMatrix;

 in vec3 aPosition;
 in vec2 aOffset;

 void main(){
   vec4 positionVec4 = vec4(aPosition.xyz, 1.0);
   positionVec4.xy += aOffset;
   gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;
 }
`;

const fragSrc = `#version 300 es
 precision mediump float;
 out vec4 outColor;
 void main(){
   outColor = vec4(0.0, 1.0, 1.0, 1.0);
 }
`;

function setup(){
  createCanvas(100, 100, WEBGL);

  // Create and use the custom shader.
  const myShader = createShader(vertSrc, fragSrc);
  shader(myShader);

  describe('A wobbly, cyan circle on a gray background.');
}

function draw(){
  // Set the styles
  background(125);
  noStroke();

  // Draw the circle.
  beginShape();
  for (let i = 0; i < 30; i++){
    const x = 40 * cos(i/30 * TWO_PI);
    const y = 40 * sin(i/30 * TWO_PI);

    // Apply some noise to the coordinates.
    const xOff = 10 * noise(x + millis()/1000) - 5;
    const yOff = 10 * noise(y + millis()/1000) - 5;

    // Apply these noise values to the following vertex.
    vertexProperty('aOffset', [xOff, yOff]);
    vertex(x, y);
  }
  endShape(CLOSE);
}
```

### Updated bezier and curve drawing functions (thanks to @GregStanton)

First off: you can combine multiple types of curves in one `begin/endShape()` block now!

Long cubic and quadratic bezier vertex calls are now split up into their individual control points. Both cubic and quadratic curves are done with `bezierVertex` now, and you can set `bezierOrder()` to change from cubic (order 3) to quadratic (order 2). For WebGL mode, this also means you can also specify texture coordinates per control point, or change the fill, stroke, normal, and more between control points.

<table>
<tr><th>1.x</th><th>2.0</th></tr>
<tr><td>

```js
beginShape();
vertex(10, 10);
vertex(30, 10);

bezierVertex(35, 10, 40, 15, 40, 20);

vertex(40, 30);

quadraticVertex(40, 40, 30, 40);

vertex(10, 40);

endShape(CLOSE);
```

</td><td>

```js
beginShape();
vertex(10, 10);
vertex(30, 10);

// Default cubic
bezierVertex(35, 10);
bezierVertex(40, 15);
bezierVertex(40, 20);

vertex(40, 30);

bezierOrder(2);
bezierVertex(40, 40);
bezierVertex(30, 40);

vertex(10, 40);

endShape(p5.CLOSE);
```

</td></tr>
</table>

We've renamed `curveVertex` to `splineVertex` and have given it more options. By default, it will now go through every `splineVertex`, so you no longer have to double up the first/last point to get it to go through it:

<table>
<tr><th>1.x</th><th>2.0</th></tr>
<tr><td>

```js
beginShape();
curveVertex(10, 10);
curveVertex(10, 10);
curveVertex(15, 40);
curveVertex(40, 35);
curveVertex(25, 15);
curveVertex(15, 25);
curveVertex(15, 25);
endShape();
```

</td><td>

```js
beginShape();

splineVertex(10, 10);
splineVertex(15, 40);
splineVertex(40, 35);
splineVertex(25, 15);
splineVertex(15, 25);

endShape();
```

</td></tr>
</table>

Similarly, `endShape(CLOSE)` (or `endContour(CLOSE)` if you're in a contour) will cause a spline to smoothly loop back on itself so you no longer need to double up any points:

<table>
<tr><th>1.x</th><th>2.0</th></tr>
<tr><td>

```js
beginShape();
curveVertex(15, 25);
curveVertex(10, 10);
curveVertex(15, 40);
curveVertex(40, 35);
curveVertex(25, 15);
curveVertex(15, 25);
curveVertex(10, 10);
curveVertex(15, 40);
endShape();
```

</td><td>

```js
beginShape();

splineVertex(10, 10);
splineVertex(15, 40);
splineVertex(40, 35);
splineVertex(25, 15);
splineVertex(15, 25);


endShape(CLOSE);
```

</td></tr>
</table>

🚧 Since this is a breaking change from 1.x to 2.0, you can weight in on the compatibility discussion [here](https://github.com/processing/p5.js/issues/7488)

### A new simple lines mode for WebGL (thanks to contributions from @perminder-17)

If you are drawing lots of shapes, and don't need stroke caps or joins, you can use a simple lines mode for increased performance in WebGL. You can activate this mode by calling `linesMode(SIMPLE)` in your sketch.

### Custom shaders for fills, strokes, images (thanks to @Garima3110 and @perminder-17)

You can now create your own shaders for fills, strokes, and images, and have them all applied at once! Use `shader()` to set a fill shader, `strokeShader()` to set a stroke shader, and `imageShader()` to set an image shader. Try using `baseMaterialShader().modify(...)` and `baseStrokeShader().modify(...)` to create custom shaders.

```js
let myFillShader = baseMaterialShader.modify({
  'vec4 getFinalColor': `(vec4 color) {
    return vec4(1., 1., 0., 1.);
  }`
});
let myStrokeShader = baseStrokeShader.modify({
  'vec4 getFinalColor': `(vec4 color) {
    return vec4(1., 0., 1., 1.);
  }`
});
let myImageShader = baseMaterialShader.modify({
  'vec4 getFinalColor': `(vec4 color) {
    return vec4(0., 1., 1., 1.);
  }`
});

shader(myFillShader);
strokeShader(myStrokeShader);
imageShader(myImageShader);

sphere(); // Draws with the custom stroke and image shaders
image(myImg, 0, 0); // Draws with the custom image shader
```

### A new public `p5.Matrix` class (thanks to @holomorfo)

*TODO add examples*

### Support for more color spaces in `p5.Color` (thanks to @limzykenneth and @dianamgalindo)

p5.js 2.0 now supports more color modes in addition to the existing RGB, HSB, and HSL color modes. Here are the list of new supported color mode and brief description of them:

* `RGBHDR` - High Dynamic Range RGB color defined within the Display P3 color space. You will need to use the HDR canvas described below to draw this color on the canvas accurately.
* `HWB` - Hue, Whiteness, Blackness. This is similar to `HSL` and `HSB` in that you will define a hue angle however instead of saturation and lightness, you will define the percentage of whiteness and blackness. It is the color model of the GUI color picker used by Chrome.
![color-picker](https://github.com/user-attachments/assets/fd110cb4-d327-4424-9380-b85cc760edb7)
* `LAB` - Also called CIE Lab, defines color with Lightness, Alpha, and Beta. The color space is often used in professional color measuring context.
* `LCH` - An easier to use representation of a CIE Lab color with definition of Lightness, Chroma, and Hue instead.
* `OKLAB` - OkLab is a slight adjustment to CIE Lab color space mainly to fix a non-uniformity issue that exist in CIE Lab. This difference is more visible in the example below.
* `OKLCH` - An easier to use representation of an OkLab color with definition of Lightness, Chroma, and Hue instead.

Comparing `HSL`, `LCH`, and `OKLCH` in a [sketch](https://editor.p5js.org/limzykenneth/sketches/l4FtFScH5) below:
![color wheel](https://github.com/user-attachments/assets/5ace0470-bcf9-408f-ae77-35a454137f61)
From left to right are color wheels of `HSL`, `LCH`, and `OKLCH` respectively. Notice the evenness of color distribution between each wheel with OkLCH having the most even distribution. It can be noted that the LCH wheel has a large blue section that is fixed by OkLCH.

To use these new color spaces in p5.js 2.0, the respective constants have been added and the `colorMode()` function can be used with these constants in the same way as `RGB`, `HSL`, and `HSB`.

```js
function setup(){
  createCanvas(200, 200);
}

function draw(){
  colorMode(OKLCH);
  background(220); // Should show a teal colored canvas
}
```

### Support for wide-gamut colors with the `display-p3` mode (thanks to @limzykenneth)

You can now create a 2D canvas that supports HDR colors that will give you a more vibrant sketch and also HDR images. To use a HDR canvas you will need to create it using the `P2DHDR` constant like below:

```js
function setup(){
  createCanvas(400, 400, P2DHDR);
}
```

When a `P2DHDR` canvas is created, the default color mode will be switched to the new `RGBHDR` color mode instead of `RGB`. In practice you can continue to use the same RGB color definition you have always used.

```js
function setup(){
  createCanvas(400, 400, P2DHDR);
}

function draw(){
  background(255, 0, 0);
  fill(100, 255, 0);
  circle(100, 100, 50);
}
```

This example [sketch](https://editor.p5js.org/limzykenneth/sketches/LB2vJFdj4) shows a direct comparison between HDR and non-HDR colors, you should see three bands of red, green, and blue colors with a slightly dimmer red, green, and blue circles within. However, both your browser and your screen will need to support HDR to see the difference. Currently Firefox on desktop does not support HDR canvas so if you do not see a difference, try a different browser such as Safari or Chrome.

You can also now load HDR images and have them be displayed in full HDR in a [HDR canvas](https://editor.p5js.org/limzykenneth/sketches/52J0mtOID). If you see a dark image on the linked sketch, your browser or screen does not support HDR and you should try a different browser/device.

### Full List

* modified stroke vertex shader by @JordanSucher in https://github.com/processing/p5.js/pull/7064
* Fix #7049: P5.Graphics.remove() doesn't release all related resources by @iambiancafonseca in https://github.com/processing/p5.js/pull/7060
* Separate Model and View Matrices. by @deveshidwivedi in https://github.com/processing/p5.js/pull/6761
* Switch camera keep transform by @davepagurek in https://github.com/processing/p5.js/pull/7067
* Check the element type before calling `createRadio` from `select()` by @lindapaiste in https://github.com/processing/p5.js/pull/6838
* Use requestAnimationFrame timestamp for less noise in deltaTime by @davepagurek in https://github.com/processing/p5.js/pull/6785
* fix: framebuffer cameras uses the size from main canvas by @Vishal2002 in https://github.com/processing/p5.js/pull/7075
* Fix code snippet formatting in references by @nickmcintyre in https://github.com/processing/p5.js/pull/7089
* Fix more &lt;code&gt;s in reference by @davepagurek in https://github.com/processing/p5.js/pull/7092
* Update clearDepth() example to restore trails by @davepagurek in https://github.com/processing/p5.js/pull/7095
* Changed point class documentation description text by @Chaitanya1672 in https://github.com/processing/p5.js/pull/7096
* Adds geometry to downloadable obj files functionality by @diyaayay in https://github.com/processing/p5.js/pull/6812
* Fix vector reflect() mutating surface normal arg (#7088) by @nbogie in https://github.com/processing/p5.js/pull/7103
* Implemented roll function by @rohanjulka19 in https://github.com/processing/p5.js/pull/7093
* Fix clipped multiline font rendering by @davepagurek in https://github.com/processing/p5.js/pull/7109
* Update: FES Messages in Japanese. by @shibomb in https://github.com/processing/p5.js/pull/7074
* Addresses issue #7077 by @Garima3110 in https://github.com/processing/p5.js/pull/7102
* Corrects the circle() description by @JulioGitLab in https://github.com/processing/p5.js/pull/7110
* Add initial conversion script from Documentation.js to old format by @davepagurek in https://github.com/processing/p5.js/pull/6777
* Fix broken JsDoc comments by @Orasund in https://github.com/processing/p5.js/pull/7114
* Resolves issue #7118 - Update README.md & Changed the path for contributor docs by @ravixalgorithm in https://github.com/processing/p5.js/pull/7119
* fix: Correct default parameters for quad in y-direction by @Abhinavcode13 in https://github.com/processing/p5.js/pull/7129
* Fix 'Learn' and 'Get Started' links in README.md by @NicholasGillen in https://github.com/processing/p5.js/pull/7126
* Fix: corrected variable name to reflect height instead of width by @Abhinavcode13 in https://github.com/processing/p5.js/pull/7132
* Skip out of canvas shapes for gridOutput() table by @limzykenneth in https://github.com/processing/p5.js/pull/7135
* Added window size check upon p5 instantiation by @bensgilbert in https://github.com/processing/p5.js/pull/7134
* Adds `webp` mime type to `saveCanvas`. by @starzonmyarmz in https://github.com/processing/p5.js/pull/7140
* fixed: Broken link to dev_notes.md in the documentation by @Shahmaz0 in https://github.com/processing/p5.js/pull/7117
* "Fix Broken 'Get Started for Developers' Link in README" by @Souvik-Cyclic in https://github.com/processing/p5.js/pull/7151
* Update readme copy by @davepagurek in https://github.com/processing/p5.js/pull/6944
* Standardize all parameter types by @sproutleaf in https://github.com/processing/p5.js/pull/7179
* Modify convert.js and finish standardizing parameters by @sproutleaf in https://github.com/processing/p5.js/pull/7183
* Start developing a new param validator using Zod by @sproutleaf in https://github.com/processing/p5.js/pull/7186
* Update to param validator + test file by @sproutleaf in https://github.com/processing/p5.js/pull/7194
* [p5.js 2.0] Refactor and modular build by @limzykenneth in https://github.com/processing/p5.js/pull/7203
* Fix most WebGL tests by @davepagurek in https://github.com/processing/p5.js/pull/7210
* Get visual tests running in 2.0 by @davepagurek in https://github.com/processing/p5.js/pull/7251
* Small fixes to help get dev-2.0 branch running for other contributors by @lukeplowden in https://github.com/processing/p5.js/pull/7215
* Module syntax conversion by @limzykenneth in https://github.com/processing/p5.js/pull/7257
* More test fixes by @davepagurek in https://github.com/processing/p5.js/pull/7266
* Update param validator and test file by @sproutleaf in https://github.com/processing/p5.js/pull/7268
* Shader hooks for dev-2.0 by @davepagurek in https://github.com/processing/p5.js/pull/7267
* Final changes for parameter validation by @sproutleaf in https://github.com/processing/p5.js/pull/7291
* setAttribute() function for defining custom shader attributes by @lukeplowden in https://github.com/processing/p5.js/pull/7276
* Initial modules refactor by @davepagurek in https://github.com/processing/p5.js/pull/7295
* [p5.js 2.0] WebGL module syntax by @limzykenneth in https://github.com/processing/p5.js/pull/7296
* Add new sketch verifier to FES by @sproutleaf in https://github.com/processing/p5.js/pull/7293
* Make shaders define what they get used for. by @Garima3110 in https://github.com/processing/p5.js/pull/7256
* Shape tests by @davepagurek in https://github.com/processing/p5.js/pull/7323
* Split contents of dom.js among four(4) files by @SilasVM in https://github.com/processing/p5.js/pull/7316
* Solves issue #7059 by @Garima3110 in https://github.com/processing/p5.js/pull/7113
* Add more shape visual tests by @davepagurek in https://github.com/processing/p5.js/pull/7350
* [p5.js 2.0] State machines and renderer refactoring by @limzykenneth in https://github.com/processing/p5.js/pull/7270
* WebGL mode refactor by @davepagurek in https://github.com/processing/p5.js/pull/7355
* 2.0 modules clean up by @limzykenneth in https://github.com/processing/p5.js/pull/7361
* Add custom_shapes.js, which will eventually replace vertex.js by @GregStanton in https://github.com/processing/p5.js/pull/7368
* Fix issues with stroke depth ordering by @davepagurek in https://github.com/processing/p5.js/pull/7369
* [p5.js 2.0] IO refactoring by @limzykenneth in https://github.com/processing/p5.js/pull/7365
* Fix issues with retained mode rendering and image light by @davepagurek in https://github.com/processing/p5.js/pull/7384
* [p5.js 2.0] Fix CSV parsing by @limzykenneth in https://github.com/processing/p5.js/pull/7391
* Adding strokeMode() to access SIMPLE lines.  by @perminder-17 in https://github.com/processing/p5.js/pull/7390
* Event Ordering for touch and mouse events by @diyaayay in https://github.com/processing/p5.js/pull/7378
* [p5.js 2.0] Unit tests fix/conversion by @limzykenneth in https://github.com/processing/p5.js/pull/7393
* Type 2.0 by @dhowe in https://github.com/processing/p5.js/pull/7356
* Refactor 2.0 Typography code to work with WebGL by @davepagurek in https://github.com/processing/p5.js/pull/7417
* Overhaul custom shapes for p5.js 2.0 by @GregStanton in https://github.com/processing/p5.js/pull/7373
* Add tests for font weight + fix Google Font loading by @davepagurek in https://github.com/processing/p5.js/pull/7426
* Add visual tests for textToPoints, addTextToContours by @davepagurek in https://github.com/processing/p5.js/pull/7427
* textToPoints perf improvement by @davepagurek in https://github.com/processing/p5.js/pull/7428
* FilterRenderer2D for a 2d-Build by @perminder-17 in https://github.com/processing/p5.js/pull/7409
* [p5.js 2.0] Color module rewrite by @limzykenneth in https://github.com/processing/p5.js/pull/7406
* [p5.js 2.0] Vector n-dimentional and Matrix Interface by @holomorfo in https://github.com/processing/p5.js/pull/7405
* [dev-2.0] Benchmark setup and sample report for render and batch by @holomorfo in https://github.com/processing/p5.js/pull/7421
* Changed mouse button to object by @diyaayay in https://github.com/processing/p5.js/pull/7404
* Updates to shader hooks for 2.0 by @davepagurek in https://github.com/processing/p5.js/pull/7432
* More typography updates by @davepagurek in https://github.com/processing/p5.js/pull/7434
* Type: implement #7147 and minor refactors by @dhowe in https://github.com/processing/p5.js/pull/7440
* Fix MTL color loading when vertices are shared across different faces by @davepagurek in https://github.com/processing/p5.js/pull/7441
* Fix noErase() breaking in WebGL by @davepagurek in https://github.com/processing/p5.js/pull/7443
* added loadFilterShader function by @Rishab87 in https://github.com/processing/p5.js/pull/7445
* [dev-2.0] WOFF font support by @dhowe in https://github.com/processing/p5.js/pull/7449

## New Contributors
* @JordanSucher made their first contribution in https://github.com/processing/p5.js/pull/7064
* @iambiancafonseca made their first contribution in https://github.com/processing/p5.js/pull/7060
* @Chaitanya1672 made their first contribution in https://github.com/processing/p5.js/pull/7096
* @rohanjulka19 made their first contribution in https://github.com/processing/p5.js/pull/7093
* @Orasund made their first contribution in https://github.com/processing/p5.js/pull/7114
* @ravixalgorithm made their first contribution in https://github.com/processing/p5.js/pull/7119
* @NicholasGillen made their first contribution in https://github.com/processing/p5.js/pull/7126
* @bensgilbert made their first contribution in https://github.com/processing/p5.js/pull/7134
* @starzonmyarmz made their first contribution in https://github.com/processing/p5.js/pull/7140
* @Shahmaz0 made their first contribution in https://github.com/processing/p5.js/pull/7117
* @Souvik-Cyclic made their first contribution in https://github.com/processing/p5.js/pull/7151
* @sproutleaf made their first contribution in https://github.com/processing/p5.js/pull/7179
* @lukeplowden made their first contribution in https://github.com/processing/p5.js/pull/7215
* @holomorfo made their first contribution in https://github.com/processing/p5.js/pull/7405

**Full Changelog**: https://github.com/processing/p5.js/compare/v1.9.4...v2.0.0-beta.1

## v1.11.2 — 2024-11-28

<!-- Release notes generated using configuration in .github/release.yml at v1.11.2 -->

## What's Changed
### What's Changed 🎊
* Switch all-contributor shield styling to match other shields by @SableRaf in https://github.com/processing/p5.js/pull/7347
* Fix a typo (dpeth -> depth) in webgl/p5.Framebuffer.js by @zs-5 in https://github.com/processing/p5.js/pull/7348
* Save/restore textureMode with push/pop by @davepagurek in https://github.com/processing/p5.js/pull/7358
* fix: Correct typo, improve createRadio() method description, and simplify input tag by @Dhanush111 in https://github.com/processing/p5.js/pull/7315
* Update links to point to tutorial page by @muffinista in https://github.com/processing/p5.js/pull/7318
* fix add alpha doc by @asukaminato0721 in https://github.com/processing/p5.js/pull/7362
* Negative dimensions will mirror rect() again by @martinleopold in https://github.com/processing/p5.js/pull/7363
* fixes issue #7366: Adjust Option Orientation in CreateRadio() reference. by @Prajyot05 in https://github.com/processing/p5.js/pull/7367

## New Contributors
* @zs-5 made their first contribution in https://github.com/processing/p5.js/pull/7348
* @Dhanush111 made their first contribution in https://github.com/processing/p5.js/pull/7315
* @muffinista made their first contribution in https://github.com/processing/p5.js/pull/7318
* @Prajyot05 made their first contribution in https://github.com/processing/p5.js/pull/7367

**Full Changelog**: https://github.com/processing/p5.js/compare/v1.11.1...v1.11.2

## v1.11.1 — 2024-10-31

<!-- Release notes generated using configuration in .github/release.yml at v1.11.1 -->

## What's Changed 🎊

### Code 
* fixed nf to work with negative number by @Akhilbisht798 in https://github.com/processing/p5.js/pull/7054
* textureData updated to fix flipping property for webgl by @MuktiMishra in https://github.com/processing/p5.js/pull/7305
* Fix ellipseMode(CORNERS) and rectMode(CORNER) by @martinleopold in https://github.com/processing/p5.js/pull/7290
* add usage of dist by @asukaminato0721 in https://github.com/processing/p5.js/pull/7324
* Uses canvas dimensions instead of arbitrary constants for `noise()` and `noiseDetail()` by @RandomGamingDev in https://github.com/processing/p5.js/pull/7330

### Documentation
* Change Reference Example by @samarsrivastav in https://github.com/processing/p5.js/pull/7280
* Fix example of createModel function. by @shibomb in https://github.com/processing/p5.js/pull/7298
* fix missing example tag in documentation for color's toString method by @ashish1729 in https://github.com/processing/p5.js/pull/7302
* Fixes language reference and Markdown syntax by @danicruz0415 in https://github.com/processing/p5.js/pull/7314
* fix typo by @asukaminato0721 in https://github.com/processing/p5.js/pull/7322
* Fix broken links in contributor-doc by @shibomb in https://github.com/processing/p5.js/pull/7320
* Fix broken links in website references by @shibomb in https://github.com/processing/p5.js/pull/7321
* mouseY reference first example issue fixed by @shourysingh07 in https://github.com/processing/p5.js/pull/7311
* Docs: "A maximum of 5 directional lights can be active at once." by @blackboxlogic in https://github.com/processing/p5.js/pull/7337

## New Contributors 💗
* @samarsrivastav made their first contribution in https://github.com/processing/p5.js/pull/7280
* @Akhilbisht798 made their first contribution in https://github.com/processing/p5.js/pull/7054
* @MuktiMishra made their first contribution in https://github.com/processing/p5.js/pull/7305
* @danicruz0415 made their first contribution in https://github.com/processing/p5.js/pull/7314
* @martinleopold made their first contribution in https://github.com/processing/p5.js/pull/7290
* @blackboxlogic made their first contribution in https://github.com/processing/p5.js/pull/7337

**Full Changelog**: https://github.com/processing/p5.js/compare/v1.11.0...v1.11.1

## v1.11.0 — 2024-09-25

<!-- Release notes generated using configuration in .github/release.yml at v1.11.0 -->

## What's Changed 🎊

### Code 
* Fix unnecessary console warnings when using smooth() on P2D Graphics objects by @zeesworth in https://github.com/processing/p5.js/pull/7159
* added paletteLerp by @RandomGamingDev in https://github.com/processing/p5.js/pull/6960
* imageLight - panorama shader bug, added @perminder-17 code snippet by @PimTournaye in https://github.com/processing/p5.js/pull/7169
* Tie FES initialization to only run just before p5 init by @limzykenneth in https://github.com/processing/p5.js/pull/7173
* Code block updates in `vertex.js` by @DenisovichDev in https://github.com/processing/p5.js/pull/7174
* Fix incorrect pixel offset in updatePixels() by @Forchapeatl in https://github.com/processing/p5.js/pull/7177
* fix for #7181 by @orrkislev in https://github.com/processing/p5.js/pull/7182
* Fix Camera.eyeX comment by @Psychpsyo in https://github.com/processing/p5.js/pull/7184
* Solves issue #6891 by @Garima3110 in https://github.com/processing/p5.js/pull/7165
* Fix: Added unique group names for radio buttions by @Forchapeatl in https://github.com/processing/p5.js/pull/7162
* Caps at the beginning of the curve by @diyaayay in https://github.com/processing/p5.js/pull/7201
* Added useLinePerspective to cam copy properties by @TiborUdvari in https://github.com/processing/p5.js/pull/7213
* Fix clipping bug with ellipses by @jeanetteandrews in https://github.com/processing/p5.js/pull/7249
* Refactor arc and rect to use canvas methods rather than curves by @ksen0 in https://github.com/processing/p5.js/pull/7205
* Shader hooks by @davepagurek in https://github.com/processing/p5.js/pull/7149
* fix: added `WEBGL` mode for correct blendMode(SUBTRACT) behavior by @Abhinavcode13 in https://github.com/processing/p5.js/pull/7229
* Add list support for `lerpColor` like other color functions by @RandomGamingDev in https://github.com/processing/p5.js/pull/6954
* Remove 2.0 built file by @davepagurek in https://github.com/processing/p5.js/pull/7274
* Added textAscent and textDescent functions on Webgl by @Forchapeatl in https://github.com/processing/p5.js/pull/7187
* Line.vert fix for small units by @TiborUdvari in https://github.com/processing/p5.js/pull/7206
* fixed textpoint alignment by @mathewpan2 in https://github.com/processing/p5.js/pull/6967
* Fixed minor error in documentation for p5.Vector.sub() by @jaredberghold in https://github.com/processing/p5.js/pull/7265
* Rename default shader methods to have a base* prefix by @davepagurek in https://github.com/processing/p5.js/pull/7288
* Performance improvements for WebGL shape drawing by @davepagurek in https://github.com/processing/p5.js/pull/7287

### Documentation
* add non-code contributions to contrib guidelines readme by @sarahciston in https://github.com/processing/p5.js/pull/6941
* Update README.md to include an updated get started link by @willallstet in https://github.com/processing/p5.js/pull/7232
* Fix : broken link in contributor_docs/webgl_mode_architecture.md by @ashwanidey in https://github.com/processing/p5.js/pull/7235
* Fix broken links in contributor_docs/steward_guidelines.md by @aleannab in https://github.com/processing/p5.js/pull/7240
* Fix broken link in contributing_to_the_p5js_references.md by @aleannab in https://github.com/processing/p5.js/pull/7242
* Fix : broken link in contributor_docs/webgl_contribution_guide.md by @ashwanidey in https://github.com/processing/p5.js/pull/7239
* Fix Broken README Link by @benpalevsky in https://github.com/processing/p5.js/pull/7216
* Fixed the broken link on p5.js website page for "p5.js Web Accessibility" by @shourysingh07 in https://github.com/processing/p5.js/pull/7254
* Fixed the broken link on p5.js website page for "Our Focus on Access" by @shourysingh07 in https://github.com/processing/p5.js/pull/7255
* Fixed broken links for p5js references by @visheshrwl in https://github.com/processing/p5.js/pull/7253
* fix: broken links in lerpColor() by @M0nica in https://github.com/processing/p5.js/pull/7241
* Fix broken links in contributor_docs/access.md by @aleannab in https://github.com/processing/p5.js/pull/7243
* Fixed the broken link on p5.js website page for "WebGL Contribution Guide". by @shourysingh07 in https://github.com/processing/p5.js/pull/7263
* Fixed the broken link on p5.js website page for "How to add Friendly Error Messages" by @shourysingh07 in https://github.com/processing/p5.js/pull/7264


## New Contributors 💗
Thanks to all the contributors, and big shout out to the first time contributors! 
* @zeesworth made their first contribution in https://github.com/processing/p5.js/pull/7159
* @PimTournaye made their first contribution in https://github.com/processing/p5.js/pull/7169
* @DenisovichDev made their first contribution in https://github.com/processing/p5.js/pull/7174
* @Forchapeatl made their first contribution in https://github.com/processing/p5.js/pull/7177
* @orrkislev made their first contribution in https://github.com/processing/p5.js/pull/7182
* @Psychpsyo made their first contribution in https://github.com/processing/p5.js/pull/7184
* @sarahciston made their first contribution in https://github.com/processing/p5.js/pull/6941
* @TiborUdvari made their first contribution in https://github.com/processing/p5.js/pull/7213
* @willallstet made their first contribution in https://github.com/processing/p5.js/pull/7232
* @ashwanidey made their first contribution in https://github.com/processing/p5.js/pull/7235
* @aleannab made their first contribution in https://github.com/processing/p5.js/pull/7240
* @benpalevsky made their first contribution in https://github.com/processing/p5.js/pull/7216
* @jeanetteandrews made their first contribution in https://github.com/processing/p5.js/pull/7249
* @shourysingh07 made their first contribution in https://github.com/processing/p5.js/pull/7254
* @visheshrwl made their first contribution in https://github.com/processing/p5.js/pull/7253
* @M0nica made their first contribution in https://github.com/processing/p5.js/pull/7241
* @ksen0 made their first contribution in https://github.com/processing/p5.js/pull/7205
* @mathewpan2 made their first contribution in https://github.com/processing/p5.js/pull/6967
* @jaredberghold made their first contribution in https://github.com/processing/p5.js/pull/7265

**Full Changelog**: https://github.com/processing/p5.js/compare/v1.10.0...v1.11.0

## v1.10.0 — 2024-07-31

<!-- Release notes generated using configuration in .github/release.yml at v1.10.0 -->

## What's Changed 🎊

### Code 
* Adds geometry to downloadable obj files functionality by @diyaayay in https://github.com/processing/p5.js/pull/6812
* Implemented roll function by @rohanjulka19 in https://github.com/processing/p5.js/pull/7093
* Added window size check upon p5 instantiation by @Evorage0 in https://github.com/processing/p5.js/pull/7134
* Adds `webp` mime type to `saveCanvas`. by @starzonmyarmz in https://github.com/processing/p5.js/pull/7140
* modified stroke vertex shader by @JordanSucher in https://github.com/processing/p5.js/pull/7064
* Separate Model and View Matrices. by @deveshidwivedi in https://github.com/processing/p5.js/pull/6761
* Switch camera keep transform by @davepagurek in https://github.com/processing/p5.js/pull/7067
* Check the element type before calling `createRadio` from `select()` by @lindapaiste in https://github.com/processing/p5.js/pull/6838
* Use requestAnimationFrame timestamp for less noise in deltaTime by @davepagurek in https://github.com/processing/p5.js/pull/6785
* Update clearDepth() example to restore trails by @davepagurek in https://github.com/processing/p5.js/pull/7095
* Changed point class documentation description text by @Chaitanya1672 in https://github.com/processing/p5.js/pull/7096
* Skip out of canvas shapes for gridOutput() table by @limzykenneth in https://github.com/processing/p5.js/pull/7135
* Fix #7049: P5.Graphics.remove() doesn't release all related resources by @iambiancafonseca in https://github.com/processing/p5.js/pull/7060
* fix: framebuffer cameras uses the size from main canvas by @Vishal2002 in https://github.com/processing/p5.js/pull/7075
* Fix vector reflect() mutating surface normal arg (#7088) by @nbogie in https://github.com/processing/p5.js/pull/7103
* Fix clipped multiline font rendering by @davepagurek in https://github.com/processing/p5.js/pull/7109
* fix: Correct default parameters for quad in y-direction by @Abhinavcode13 in https://github.com/processing/p5.js/pull/7129
* Fix: corrected variable name to reflect height instead of width by @Abhinavcode13 in https://github.com/processing/p5.js/pull/7132
* Fix panorama() by @davepagurek in https://github.com/processing/p5.js/pull/7154

### Documentation
* Fix code snippet formatting in references by @nickmcintyre in https://github.com/processing/p5.js/pull/7089
* Fix more `code` tags in reference by @davepagurek in https://github.com/processing/p5.js/pull/7092
* Update: FES Messages in Japanese. by @shibomb in https://github.com/processing/p5.js/pull/7074
* Corrects the circle() description by @JulioGitLab in https://github.com/processing/p5.js/pull/7110
* Fix broken JsDoc comments by @Orasund in https://github.com/processing/p5.js/pull/7114
* Resolves issue #7118 - Update README.md & Changed the path for contributor docs by @ravixalgorithm in https://github.com/processing/p5.js/pull/7119
* Fix 'Learn' and 'Get Started' links in README.md by @NicholasGillen in https://github.com/processing/p5.js/pull/7126
* fixed: Broken link to dev_notes.md in the documentation by @Shahmaz0 in https://github.com/processing/p5.js/pull/7117
* "Fix Broken 'Get Started for Developers' Link in README" by @Souvik-Cyclic in https://github.com/processing/p5.js/pull/7151
* Update readme copy by @davepagurek in https://github.com/processing/p5.js/pull/6944


## New Contributors 💗
* @JordanSucher made their first contribution in https://github.com/processing/p5.js/pull/7064
* @iambiancafonseca made their first contribution in https://github.com/processing/p5.js/pull/7060
* @Chaitanya1672 made their first contribution in https://github.com/processing/p5.js/pull/7096
* @rohanjulka19 made their first contribution in https://github.com/processing/p5.js/pull/7093
* @shibomb made their first contribution in https://github.com/processing/p5.js/pull/7074
* @Orasund made their first contribution in https://github.com/processing/p5.js/pull/7114
* @ravixalgorithm made their first contribution in https://github.com/processing/p5.js/pull/7119
* @Abhinavcode13 made their first contribution in https://github.com/processing/p5.js/pull/7129
* @NicholasGillen made their first contribution in https://github.com/processing/p5.js/pull/7126
* @Evorage0 made their first contribution in https://github.com/processing/p5.js/pull/7134
* @starzonmyarmz made their first contribution in https://github.com/processing/p5.js/pull/7140
* @Shahmaz0 made their first contribution in https://github.com/processing/p5.js/pull/7117
* @Souvik-Cyclic made their first contribution in https://github.com/processing/p5.js/pull/7151

**Full Changelog**: https://github.com/processing/p5.js/compare/v1.9.4...v1.10.0

## v1.9.4 — 2024-05-22

<!-- Release notes generated using configuration in .github/release.yml at v1.9.4 -->

## What's Changed 🎊
### Code 
* Account for pixel density when masking images by @Papershine in https://github.com/processing/p5.js/pull/6788
* fix clearStorage function to match expected behaviour by @seralichtenhahn in https://github.com/processing/p5.js/pull/7006
* Fix broken test by @davepagurek in https://github.com/processing/p5.js/pull/7010
* textWrap() parameter validation uses FES instead of throwing error by @limzykenneth in https://github.com/processing/p5.js/pull/7009
* fix The constructor of p5.Table by @asukaminato0721 in https://github.com/processing/p5.js/pull/7011
* Fix autoSized for framebuffers by @davepagurek in https://github.com/processing/p5.js/pull/7012
* fix: add the missing index of `attributes` by @IronBlood in https://github.com/processing/p5.js/pull/7027

### Documentation
* Add Japanese Version Contributor Docs by @RuimingShen in https://github.com/processing/p5.js/pull/6979
* Add missing backtick by @aGuyWhoMadeGames in https://github.com/processing/p5.js/pull/6996
* Fix default z value in p5.Camera::camera() docs by @davepagurek in https://github.com/processing/p5.js/pull/7001
* Fix 'p5.Vector.sub()' documentation mistakenly referencing 'add'ing by @bobbykaz in https://github.com/processing/p5.js/pull/7024
* Update structure references by @nickmcintyre in https://github.com/processing/p5.js/pull/7020
* Update more structure references by @nickmcintyre in https://github.com/processing/p5.js/pull/7021
* Fix foundation references by @nickmcintyre in https://github.com/processing/p5.js/pull/7022
* Update array references by @nickmcintyre in https://github.com/processing/p5.js/pull/7032
* Update conversion references by @nickmcintyre in https://github.com/processing/p5.js/pull/7033
* Update storage references by @nickmcintyre in https://github.com/processing/p5.js/pull/7034
* Update string references by @nickmcintyre in https://github.com/processing/p5.js/pull/7037
* Update IO references by @nickmcintyre in https://github.com/processing/p5.js/pull/7038
* Update time & date references by @nickmcintyre in https://github.com/processing/p5.js/pull/7039
* Update p5.XML references by @nickmcintyre in https://github.com/processing/p5.js/pull/7040
* Update rendering references by @nickmcintyre in https://github.com/processing/p5.js/pull/7041
* Fix map example by @PalumboN in https://github.com/processing/p5.js/pull/7036
* Update p5.Graphics references by @nickmcintyre in https://github.com/processing/p5.js/pull/7042
* Update p5.Geometry references by @nickmcintyre in https://github.com/processing/p5.js/pull/7045
* Update documentation_style_guide.md by @lottihill in https://github.com/processing/p5.js/pull/7053
* Patch-CORNER-descr-cx by @JulioGitLab in https://github.com/processing/p5.js/pull/7062
* Fix p5.Graphics.remove() reference by @nickmcintyre in https://github.com/processing/p5.js/pull/7057
* Fix links and typos by @nickmcintyre in https://github.com/processing/p5.js/pull/7058
* Update p5.Framebuffer references by @nickmcintyre in https://github.com/processing/p5.js/pull/7044

## New Contributors 💗
* @RuimingShen made their first contribution in https://github.com/processing/p5.js/pull/6979
* @aGuyWhoMadeGames made their first contribution in https://github.com/processing/p5.js/pull/6996
* @Papershine made their first contribution in https://github.com/processing/p5.js/pull/6788
* @seralichtenhahn made their first contribution in https://github.com/processing/p5.js/pull/7006
* @bobbykaz made their first contribution in https://github.com/processing/p5.js/pull/7024
* @PalumboN made their first contribution in https://github.com/processing/p5.js/pull/7036
* @IronBlood made their first contribution in https://github.com/processing/p5.js/pull/7027
* @lottihill made their first contribution in https://github.com/processing/p5.js/pull/7053
* @JulioGitLab made their first contribution in https://github.com/processing/p5.js/pull/7062

**Full Changelog**: https://github.com/processing/p5.js/compare/v1.9.3...v1.9.4

## v1.9.3 — 2024-04-24

<!-- Release notes generated using configuration in .github/release.yml at v1.9.3 -->

## What's Changed 🎊
### Code 
* Fix vertices with different texture coordinates in imported models getting collapsed by @davepagurek in https://github.com/processing/p5.js/pull/6923
* fixed parameters for normal() method by @kaiserarg in https://github.com/processing/p5.js/pull/6984
* Fix for gif not animating when drawing to p5.graphics by @kaiserarg in https://github.com/processing/p5.js/pull/6935
* add friendly error to createCapture() by @mdb0 in https://github.com/processing/p5.js/pull/6961
* Fix main canvas clipping getting applied to framebuffers by @davepagurek in https://github.com/processing/p5.js/pull/6990

### Documentation
* Contributors docs cleanup by @limzykenneth in https://github.com/processing/p5.js/pull/6906
* Add short descriptions to contributor docs by @davepagurek in https://github.com/processing/p5.js/pull/6866
* Update contributor doc descriptions by @davepagurek in https://github.com/processing/p5.js/pull/6933
* Add doc on adding FES messages by @davepagurek in https://github.com/processing/p5.js/pull/6942

#### Reference
* Update keyboard event referenes by @nickmcintyre in https://github.com/processing/p5.js/pull/6932
* Update touch event references by @nickmcintyre in https://github.com/processing/p5.js/pull/6934
* Fix typo in touchStarted() by @nickmcintyre in https://github.com/processing/p5.js/pull/6938
* Update mouse event references by @nickmcintyre in https://github.com/processing/p5.js/pull/6937
* Update WebGL light references by @nickmcintyre in https://github.com/processing/p5.js/pull/6957
* Update WebGL interaction references by @nickmcintyre in https://github.com/processing/p5.js/pull/6955
* Update WebGL material references by @nickmcintyre in https://github.com/processing/p5.js/pull/6974
* Update p5.Shader references by @nickmcintyre in https://github.com/processing/p5.js/pull/6975
* Update p5.Camera references by @nickmcintyre in https://github.com/processing/p5.js/pull/6976
* Update 3D model references by @nickmcintyre in https://github.com/processing/p5.js/pull/6978
* Update vertex references by @nickmcintyre in https://github.com/processing/p5.js/pull/6981
 * Update curve references by @nickmcintyre in https://github.com/processing/p5.js/pull/6985
* Update constant references by @nickmcintyre in https://github.com/processing/p5.js/pull/6986
* Update foundation references by @nickmcintyre in https://github.com/processing/p5.js/pull/6988
* Update transformation references by @nickmcintyre in https://github.com/processing/p5.js/pull/6991
* Update 3D primitive references by @nickmcintyre in https://github.com/processing/p5.js/pull/6980

#### Translation
* [p5.js - es] Translation of contributor_guidelines.md by @MarianneTeixido in https://github.com/processing/p5.js/pull/6895
* [p5.js KO] Create webgl_contribution_guide.md by @ienground in https://github.com/processing/p5.js/pull/6859
* [p5.js - zh] Update steward_guidelines.md by @Harrycheng233 in https://github.com/processing/p5.js/pull/6879
* [p5.js KO] steward_guidelines.md by @Orwiss in https://github.com/processing/p5.js/pull/6874
* Hindi translation of webgl contribution guide by @ranaaditya in https://github.com/processing/p5.js/pull/6886
* translation: Add `Steward Guidelines` documentation in Hindi by @EshaanAgg in https://github.com/processing/p5.js/pull/6887
* [p5.js KO] Create contributor_guidelines.md by @yunyoungJang in https://github.com/processing/p5.js/pull/6855
* hindi translation - contributing to p5.js reference added by @Surbhi-Pittie in https://github.com/processing/p5.js/pull/6890
* Fix: [p5.js - zh] Added contributor guidelines part 1 + 2 zh translations by @Tmicrd in https://github.com/processing/p5.js/pull/6903
* add: hindi translation of contributor guidelines by @jaiakash in https://github.com/processing/p5.js/pull/6892
* [p5.js KO] Update image path in contributing_to_the_p5.js_reference.md by @wooknick in https://github.com/processing/p5.js/pull/6916
* [p5.js KO] Update steward_guidelines.md by @Orwiss in https://github.com/processing/p5.js/pull/6918
* [p5.js KO]Update contributor_guidelines.md by @yunyoungJang in https://github.com/processing/p5.js/pull/6919
* Update contributing_to_the_p5.js_reference.md by @Harrycheng233 in https://github.com/processing/p5.js/pull/6948
* Update contributor_guidelines.md by @Harrycheng233 in https://github.com/processing/p5.js/pull/6946
* Update steward_guidelines.md by @Harrycheng233 in https://github.com/processing/p5.js/pull/6947
* Update webgl_contribution_guide.md by @Harrycheng233 in https://github.com/processing/p5.js/pull/6949
* [p5.js KO] Translate access.md by @Orwiss in https://github.com/processing/p5.js/pull/6951
* [p5.js HI] `access.md` and line 1 description translation to hindi by @jaiakash in https://github.com/processing/p5.js/pull/6950
* Update p5.Vector.js by @asukaminato0721 in https://github.com/processing/p5.js/pull/6831
* Update access.md by @Harrycheng233 in https://github.com/processing/p5.js/pull/6945

## New Contributors 💗
* @MarianneTeixido made their first contribution in https://github.com/processing/p5.js/pull/6895
* @ienground made their first contribution in https://github.com/processing/p5.js/pull/6859
* @Orwiss made their first contribution in https://github.com/processing/p5.js/pull/6874
* @ranaaditya made their first contribution in https://github.com/processing/p5.js/pull/6886
* @EshaanAgg made their first contribution in https://github.com/processing/p5.js/pull/6887
* @yunyoungJang made their first contribution in https://github.com/processing/p5.js/pull/6855
* @Surbhi-Pittie made their first contribution in https://github.com/processing/p5.js/pull/6890
* @Tmicrd made their first contribution in https://github.com/processing/p5.js/pull/6903
* @jaiakash made their first contribution in https://github.com/processing/p5.js/pull/6892
* @kaiserarg made their first contribution in https://github.com/processing/p5.js/pull/6984
* @mdb0 made their first contribution in https://github.com/processing/p5.js/pull/6961

**Full Changelog**: https://github.com/processing/p5.js/compare/v1.9.2...v1.9.3

## v1.9.2 — 2024-03-19

<!-- Release notes generated using configuration in .github/release.yml at v1.9.2 -->

## What's Changed 🎊
### Code
* Fix for fill artifact in WebGL mode when rendering in LINE mode using beginShape by @RandomGamingDev in https://github.com/processing/p5.js/pull/6827
* Solves issue #4214 by @Garima3110 in https://github.com/processing/p5.js/pull/6734
* Solves issue #6787 by @Garima3110 in https://github.com/processing/p5.js/pull/6809
* Fix usage of default fonts by @davepagurek in https://github.com/processing/p5.js/pull/6861
* Enhancement limit WebGL textures to gl.MAX_TEXTURE_SIZE by @capGoblin in https://github.com/processing/p5.js/pull/6651
* .mtl files support for .obj files to render color in 3D custom geometry by @diyaayay in https://github.com/processing/p5.js/pull/6710

### Documentation
* Nat Decker and Bobby Joe Smith III updated access.md by @natdecker in https://github.com/processing/p5.js/pull/6823
* Update WebGL architecture doc with edits by @davepagurek in https://github.com/processing/p5.js/pull/6791
* Convert FES doc updates + fix things that cause issues in mdx files by @davepagurek in https://github.com/processing/p5.js/pull/6832
* docs(styleguide): add section on chaining by @meezwhite in https://github.com/processing/p5.js/pull/6885

#### Reference
* Update accessibility references by @nickmcintyre in https://github.com/processing/p5.js/pull/6833
* Update environment references by @nickmcintyre in https://github.com/processing/p5.js/pull/6834
* Update color references by @nickmcintyre in https://github.com/processing/p5.js/pull/6835
* Update p5.Color references by @nickmcintyre in https://github.com/processing/p5.js/pull/6837
* Update calculation references by @nickmcintyre in https://github.com/processing/p5.js/pull/6842
* Update noise references by @nickmcintyre in https://github.com/processing/p5.js/pull/6843
* Update random references by @nickmcintyre in https://github.com/processing/p5.js/pull/6844
* Update createVector() reference by @nickmcintyre in https://github.com/processing/p5.js/pull/6846
* Update trigonometry references by @nickmcintyre in https://github.com/processing/p5.js/pull/6845
* Update p5.Element references by @nickmcintyre in https://github.com/processing/p5.js/pull/6849
* Update p5.Vector references by @nickmcintyre in https://github.com/processing/p5.js/pull/6848
* Update typography attribute references by @nickmcintyre in https://github.com/processing/p5.js/pull/6854
* Update p5.Font references by @nickmcintyre in https://github.com/processing/p5.js/pull/6862
* Update image load and display references by @nickmcintyre in https://github.com/processing/p5.js/pull/6864
* Update 2D shape references by @nickmcintyre in https://github.com/processing/p5.js/pull/6840
* Update shape attribute references by @nickmcintyre in https://github.com/processing/p5.js/pull/6841
* Update color references by @nickmcintyre in https://github.com/processing/p5.js/pull/6839
* Update pixels references by @nickmcintyre in https://github.com/processing/p5.js/pull/6865
* Update DOM references by @nickmcintyre in https://github.com/processing/p5.js/pull/6850
* Update image references by @nickmcintyre in https://github.com/processing/p5.js/pull/6863
* Update environment.js by @sphantom-code in https://github.com/processing/p5.js/pull/6877
* Update p5.Image references by @nickmcintyre in https://github.com/processing/p5.js/pull/6867

#### Translation
* [p5.js - es] Translate contributing_to_the_p5.js_reference by @ninioArtillero in https://github.com/processing/p5.js/pull/6871
* [p5.js - zh]Create contributing_to_the_p5.js_reference.md by @asukaminato0721 in https://github.com/processing/p5.js/pull/6869
* [p5.js KO] add korean translation of 'contributing_to_the_p5.js_reference.md by @wooknick in https://github.com/processing/p5.js/pull/6868
* [p5.js - zh] Create webgl_contribution_guide.md by @Harrycheng233 in https://github.com/processing/p5.js/pull/6878
* [p5.js - es] Translation of  contributor_guidelines.md  by @DianaMGalindo in https://github.com/processing/p5.js/pull/6876
* [p5.js - zh] Added contributor guidelines part 1 + 2 zh translations by @douMax in https://github.com/processing/p5.js/pull/6881
* [p5.js - es] Translate steward_guidelines by @ml008008 in https://github.com/processing/p5.js/pull/6873
* [p5.js - es] Translation of steward_guidelines.md by @EmilioOcelotl in https://github.com/processing/p5.js/pull/6894

## New Contributors 💗
* @natdecker made their first contribution in https://github.com/processing/p5.js/pull/6823
* @ninioArtillero made their first contribution in https://github.com/processing/p5.js/pull/6871
* @sphantom-code made their first contribution in https://github.com/processing/p5.js/pull/6877
* @wooknick made their first contribution in https://github.com/processing/p5.js/pull/6868
* @Harrycheng233 made their first contribution in https://github.com/processing/p5.js/pull/6878
* @DianaMGalindo made their first contribution in https://github.com/processing/p5.js/pull/6876
* @douMax made their first contribution in https://github.com/processing/p5.js/pull/6881
* @ml008008 made their first contribution in https://github.com/processing/p5.js/pull/6873
* @EmilioOcelotl made their first contribution in https://github.com/processing/p5.js/pull/6894

**Full Changelog**: https://github.com/processing/p5.js/compare/v1.9.1...v1.9.2

## v1.9.1 — 2024-02-29

<!-- Release notes generated using configuration in .github/release.yml at v1.9.1 -->

## What's Changed 🎊
#### Code
* lights()  and specularMaterial() support on framebuffer block when filter is applied inside the block. by @perminder-17 in https://github.com/processing/p5.js/pull/6596
* Stores the width and height values before any adjustments are made, Solves #6581 by @diyaayay in https://github.com/processing/p5.js/pull/6588
* Image light performance improvements by implementing Framebuffers instead of Graphics. by @perminder-17 in https://github.com/processing/p5.js/pull/6599
* Added additional shader usage documentation related to replacement of default shaders. by @deveshidwivedi in https://github.com/processing/p5.js/pull/6601
* Fix filter shaders when rectMode is applied; add tests by @davepagurek in https://github.com/processing/p5.js/pull/6603
* Fix bug in orbitControl() where scaling with the mouse wheel worked even outside the canvas. by @inaridarkfox4231 in https://github.com/processing/p5.js/pull/6629
* Fix Web Accessibility output not tracking background color changes by @limzykenneth in https://github.com/processing/p5.js/pull/6619
* Fix syntax error re: `new p5.Vector.cross` by @lindapaiste in https://github.com/processing/p5.js/pull/6640
* Add clearDepth() method for feedback effects by @davepagurek in https://github.com/processing/p5.js/pull/6584
* cleanup passing of mat4 arguments by @lindapaiste in https://github.com/processing/p5.js/pull/6633
* Fix bug in ortho() where using it without arguements, drawing failed in some cases, resolved. by @diyaayay in https://github.com/processing/p5.js/pull/6639
* refined the number of samples used in diffused and specular textures by @sudhanshuv1 in https://github.com/processing/p5.js/pull/6613
* Resolves #6612 by @calebfoss in https://github.com/processing/p5.js/pull/6649
* Fixed the shader in the `endShape()` example to make the boxes separated from one another by @RandomGamingDev in https://github.com/processing/p5.js/pull/6656
* bugfix #6653 vertexNormal() is not defined,replaces with normal by @diyaayay in https://github.com/processing/p5.js/pull/6659
* Updated docs for p5.Shader.js by @Garima3110 in https://github.com/processing/p5.js/pull/6672
* fixed the doubleClicked() in offline docs  by @Artimus100 in https://github.com/processing/p5.js/pull/6685
* add missing return type by @asukaminato0721 in https://github.com/processing/p5.js/pull/6682
* make parms optional by @asukaminato0721 in https://github.com/processing/p5.js/pull/6689
* Remove unused grunt task. by @IgnorantSapient in https://github.com/processing/p5.js/pull/6718
* Changed the definition of textBounds() in p5.Font.js by @sudhanshuv1 in https://github.com/processing/p5.js/pull/6673
* Changed width and height by @Hemant2A2 in https://github.com/processing/p5.js/pull/6658
* Create visual test system by @davepagurek in https://github.com/processing/p5.js/pull/6604
* Adding metallic feature in p5.js for both IBL and non-IBL codes. by @perminder-17 in https://github.com/processing/p5.js/pull/6618
* Solves issue #4562 by @Garima3110 in https://github.com/processing/p5.js/pull/6699
* lerpColor in HSL or HSB mode now can loop the color wheel if needed by @Bumblebee00 in https://github.com/processing/p5.js/pull/6708
* Enhanced loadModel() method signature with independent U and V flipping options. by @deveshidwivedi in https://github.com/processing/p5.js/pull/6669
* max and min now evaluates correctly by @iamnithishraja in https://github.com/processing/p5.js/pull/6730
* Add required parameters in _flipPixels function by @mohitbalwani in https://github.com/processing/p5.js/pull/6726
* `OrbitControl()` Compatibility with `imageLight()` by fixing camera. by @perminder-17 in https://github.com/processing/p5.js/pull/6735
* Fix rotation properties being in degrees irrespective of angleMode by @SlightlyEpic in https://github.com/processing/p5.js/pull/6589
* Fixed textfont() to work for multi-word fonts by @ar-rana in https://github.com/processing/p5.js/pull/6667
* Addresses #6485 Refactor ellipse drawing logic in p5.Renderer2D.js by @tuminzee in https://github.com/processing/p5.js/pull/6499
* Add issue form for p5.js 2.0 RFC proposals and make associated updates by @GregStanton in https://github.com/processing/p5.js/pull/6748
* Fix for touchEnded triggers twice among other issues with touchEnded/mouseReleased on mobile by @RandomGamingDev in https://github.com/processing/p5.js/pull/6738
* Fix for touchStarted triggers twice among other issues with touchStarted/mousePressed on mobile by @RandomGamingDev in https://github.com/processing/p5.js/pull/6740
* Update default values in ortho() docs, use default args in example by @davepagurek in https://github.com/processing/p5.js/pull/6758
* Fix filters run on framebuffers with different sizes from the main canvas by @davepagurek in https://github.com/processing/p5.js/pull/6783
* Adds Error message for when there are no screenshots by @diyaayay in https://github.com/processing/p5.js/pull/6773
* Check for per vertex transparency when blending by @davepagurek in https://github.com/processing/p5.js/pull/6541
* Fix mistake in p5.Vector.rotate() documentation by @pie999 in https://github.com/processing/p5.js/pull/6814
* Fixed cursor image issue by @haroon10725 in https://github.com/processing/p5.js/pull/6810
* Added a Method (`panorama(img)`) which adds a sphereMapped Background. by @perminder-17 in https://github.com/processing/p5.js/pull/6808
* Implement mirrored video feature for createCapture (#6441) by @Vishal2002 in https://github.com/processing/p5.js/pull/6703
* Default values of arguments && modernize some code by @asukaminato0721 in https://github.com/processing/p5.js/pull/6807

#### Documentation
* Update WebGL contributor docs by @davepagurek in https://github.com/processing/p5.js/pull/6625
* Fixed example broken by #6216 and added information for new camera default setting by @inaridarkfox4231 in https://github.com/processing/p5.js/pull/6620
* Update contributor_guidelines.md by @skushagra9 in https://github.com/processing/p5.js/pull/6636
* Update contributor_guidelines.md by @skushagra9 in https://github.com/processing/p5.js/pull/6637
* Fix typos in contributor_docs README.md by @jakebeamish in https://github.com/processing/p5.js/pull/6628
* fix documentation typo in src/math/random.js by @clemzio in https://github.com/processing/p5.js/pull/6702
* fixed second example in the reference page for `acos()`  by @sudhanshuv1 in https://github.com/processing/p5.js/pull/6697
* Update contributor_guidelines.md by @RohitPaul0007 in https://github.com/processing/p5.js/pull/6687
* Update the broken link in friendly_error_system.md  by @PracDuckling in https://github.com/processing/p5.js/pull/6692
* fixed spelling in src/accessibility/describe.js by @PoulavBhowmick03 in https://github.com/processing/p5.js/pull/6705
* fixed spelling in src/accessibility/describe.js by @AmreshSrivastava in https://github.com/processing/p5.js/pull/6714
* Update README.md by @codesmith-emmy in https://github.com/processing/p5.js/pull/6753
* fixed the example in the reference page for lightFalloff() by @sudhanshuv1 in https://github.com/processing/p5.js/pull/6790
* Update contributor docs by @davepagurek in https://github.com/processing/p5.js/pull/6811

## New Contributors 💗
* @skushagra9 made their first contribution in https://github.com/processing/p5.js/pull/6636
* @jakebeamish made their first contribution in https://github.com/processing/p5.js/pull/6628
* @lindapaiste made their first contribution in https://github.com/processing/p5.js/pull/6640
* @sudhanshuv1 made their first contribution in https://github.com/processing/p5.js/pull/6613
* @Artimus100 made their first contribution in https://github.com/processing/p5.js/pull/6685
* @clemzio made their first contribution in https://github.com/processing/p5.js/pull/6702
* @RohitPaul0007 made their first contribution in https://github.com/processing/p5.js/pull/6687
* @PracDuckling made their first contribution in https://github.com/processing/p5.js/pull/6692
* @IgnorantSapient made their first contribution in https://github.com/processing/p5.js/pull/6718
* @PoulavBhowmick03 made their first contribution in https://github.com/processing/p5.js/pull/6705
* @AmreshSrivastava made their first contribution in https://github.com/processing/p5.js/pull/6714
* @Hemant2A2 made their first contribution in https://github.com/processing/p5.js/pull/6658
* @Bumblebee00 made their first contribution in https://github.com/processing/p5.js/pull/6708
* @iamnithishraja made their first contribution in https://github.com/processing/p5.js/pull/6730
* @mohitbalwani made their first contribution in https://github.com/processing/p5.js/pull/6726
* @ar-rana made their first contribution in https://github.com/processing/p5.js/pull/6667
* @tuminzee made their first contribution in https://github.com/processing/p5.js/pull/6499
* @GregStanton made their first contribution in https://github.com/processing/p5.js/pull/6748
* @codesmith-emmy made their first contribution in https://github.com/processing/p5.js/pull/6753
* @pie999 made their first contribution in https://github.com/processing/p5.js/pull/6814
* @haroon10725 made their first contribution in https://github.com/processing/p5.js/pull/6810
* @Vishal2002 made their first contribution in https://github.com/processing/p5.js/pull/6703

**Full Changelog**: https://github.com/processing/p5.js/compare/v1.9.0...v1.9.1

## v1.9.1-1 — 2024-01-20 (prerelease)

<!-- Release notes generated using configuration in .github/release.yml at v1.9.1-1 -->

## What's Changed
### What's Changed 🎊
* lights()  and specularMaterial() support on framebuffer block when filter is applied inside the block. by @perminder-17 in https://github.com/processing/p5.js/pull/6596
* Stores the width and height values before any adjustments are made, Solves #6581 by @diyaayay in https://github.com/processing/p5.js/pull/6588
* Image light performance improvements by implementing Framebuffers instead of Graphics. by @perminder-17 in https://github.com/processing/p5.js/pull/6599
* Added additional shader usage documentation related to replacement of default shaders. by @deveshidwivedi in https://github.com/processing/p5.js/pull/6601
* Fix filter shaders when rectMode is applied; add tests by @davepagurek in https://github.com/processing/p5.js/pull/6603
* Update WebGL contributor docs by @davepagurek in https://github.com/processing/p5.js/pull/6625
* Fixed example broken by #6216 and added information for new camera default setting by @inaridarkfox4231 in https://github.com/processing/p5.js/pull/6620
* Fix bug in orbitControl() where scaling with the mouse wheel worked even outside the canvas. by @inaridarkfox4231 in https://github.com/processing/p5.js/pull/6629
* Fix Web Accessibility output not tracking background color changes by @limzykenneth in https://github.com/processing/p5.js/pull/6619
* Update contributor_guidelines.md by @skushagra9 in https://github.com/processing/p5.js/pull/6636
* Update contributor_guidelines.md by @skushagra9 in https://github.com/processing/p5.js/pull/6637
* Fix typos in contributor_docs README.md by @jakebeamish in https://github.com/processing/p5.js/pull/6628
* Fix syntax error re: `new p5.Vector.cross` by @lindapaiste in https://github.com/processing/p5.js/pull/6640
* Add clearDepth() method for feedback effects by @davepagurek in https://github.com/processing/p5.js/pull/6584
* cleanup passing of mat4 arguments by @lindapaiste in https://github.com/processing/p5.js/pull/6633
* Fix bug in ortho() where using it without arguements, drawing failed in some cases, resolved. by @diyaayay in https://github.com/processing/p5.js/pull/6639
* refined the number of samples used in diffused and specular textures by @sudhanshuv1 in https://github.com/processing/p5.js/pull/6613
* Resolves #6612 by @calebfoss in https://github.com/processing/p5.js/pull/6649
* Fixed the shader in the `endShape()` example to make the boxes separated from one another by @RandomGamingDev in https://github.com/processing/p5.js/pull/6656
* bugfix #6653 vertexNormal() is not defined,replaces with normal by @diyaayay in https://github.com/processing/p5.js/pull/6659
* Updated docs for p5.Shader.js by @Garima3110 in https://github.com/processing/p5.js/pull/6672
* fixed the doubleClicked() in offline docs  by @Artimus100 in https://github.com/processing/p5.js/pull/6685
* add missing return type by @asukaminato0721 in https://github.com/processing/p5.js/pull/6682
* fix documentation typo in src/math/random.js by @clemzio in https://github.com/processing/p5.js/pull/6702
* fixed second example in the reference page for `acos()`  by @sudhanshuv1 in https://github.com/processing/p5.js/pull/6697
* make parms optional by @asukaminato0721 in https://github.com/processing/p5.js/pull/6689
* Update contributor_guidelines.md by @RohitPaul0007 in https://github.com/processing/p5.js/pull/6687
* Update the broken link in friendly_error_system.md  by @PracDuckling in https://github.com/processing/p5.js/pull/6692
* Remove unused grunt task. by @IgnorantSapient in https://github.com/processing/p5.js/pull/6718
* fixed spelling in src/accessibility/describe.js by @PoulavBhowmick03 in https://github.com/processing/p5.js/pull/6705
* fixed spelling in src/accessibility/describe.js by @AmreshSrivastava in https://github.com/processing/p5.js/pull/6714
* Changed the definition of textBounds() in p5.Font.js by @sudhanshuv1 in https://github.com/processing/p5.js/pull/6673
* Changed width and height by @Hemant2A2 in https://github.com/processing/p5.js/pull/6658
* Create visual test system by @davepagurek in https://github.com/processing/p5.js/pull/6604
* Adding metallic feature in p5.js for both IBL and non-IBL codes. by @perminder-17 in https://github.com/processing/p5.js/pull/6618
* Solves issue #4562 by @Garima3110 in https://github.com/processing/p5.js/pull/6699
* lerpColor in HSL or HSB mode now can loop the color wheel if needed by @Bumblebee00 in https://github.com/processing/p5.js/pull/6708
* Enhanced loadModel() method signature with independent U and V flipping options. by @deveshidwivedi in https://github.com/processing/p5.js/pull/6669
* max and min now evaluates correctly by @iamnithishraja in https://github.com/processing/p5.js/pull/6730
* Add required parameters in _flipPixels function by @mohitbalwani in https://github.com/processing/p5.js/pull/6726
* `OrbitControl()` Compatibility with `imageLight()` by fixing camera. by @perminder-17 in https://github.com/processing/p5.js/pull/6735

## New Contributors
* @skushagra9 made their first contribution in https://github.com/processing/p5.js/pull/6636
* @jakebeamish made their first contribution in https://github.com/processing/p5.js/pull/6628
* @lindapaiste made their first contribution in https://github.com/processing/p5.js/pull/6640
* @sudhanshuv1 made their first contribution in https://github.com/processing/p5.js/pull/6613
* @Artimus100 made their first contribution in https://github.com/processing/p5.js/pull/6685
* @clemzio made their first contribution in https://github.com/processing/p5.js/pull/6702
* @RohitPaul0007 made their first contribution in https://github.com/processing/p5.js/pull/6687
* @PracDuckling made their first contribution in https://github.com/processing/p5.js/pull/6692
* @IgnorantSapient made their first contribution in https://github.com/processing/p5.js/pull/6718
* @PoulavBhowmick03 made their first contribution in https://github.com/processing/p5.js/pull/6705
* @AmreshSrivastava made their first contribution in https://github.com/processing/p5.js/pull/6714
* @Hemant2A2 made their first contribution in https://github.com/processing/p5.js/pull/6658
* @Bumblebee00 made their first contribution in https://github.com/processing/p5.js/pull/6708
* @iamnithishraja made their first contribution in https://github.com/processing/p5.js/pull/6730
* @mohitbalwani made their first contribution in https://github.com/processing/p5.js/pull/6726

**Full Changelog**: https://github.com/processing/p5.js/compare/v1.9.0...v1.9.1-1

## v1.9.0 — 2023-11-28

<!-- Release notes generated using configuration in .github/release.yml at v1.9.0 -->

## What's Changed
In this release, p5.js added `draggable()` to let you move around elements, added `imageLight()` to get 3D lighting from images, added `computeNormals(SMOOTH)` for custom smooth 3D geometry, and added support for custom filter shaders in 2D mode. We updated a group of p5.js Reference pages as part of 2023 Season of Docs (SoD) program, with a goal to make them more accessible and beginner-friendly. Thanks to the SoD technical writer @nickmcintyre.

### What's Changed 🎊
#### DOM
* Add draggable() feature to p5.Element by @ffd8 in https://github.com/processing/p5.js/pull/6381

#### WebGL
* A fix to the formatting of the documentation for endShape's instancing example by @RandomGamingDev in https://github.com/processing/p5.js/pull/6495
* Add param geometry in freeGeometry function-docs by @capGoblin in https://github.com/processing/p5.js/pull/6500
* Created fix for camera settings getting reset each time resizeCanvas() is called by @RandomGamingDev in https://github.com/processing/p5.js/pull/6216
* Made a new method to return Geometry with no internal colors. by @perminder-17 in https://github.com/processing/p5.js/pull/6498
* fix camera slerp() BUG by @inaridarkfox4231 in https://github.com/processing/p5.js/pull/6509
* Updated documentation for shaders. by @deveshidwivedi in https://github.com/processing/p5.js/pull/6497
* Image Light Feature - GSOC 2023 by @AryanKoundal in https://github.com/processing/p5.js/pull/6255
* Work Product Report | Improving p5.js WebGL/3d functionality by @AryanKoundal in https://github.com/processing/p5.js/pull/6442
* Fix webgl erase. Resolves #6523 by @acamposuribe in https://github.com/processing/p5.js/pull/6524
* Solves issue #6502 by @perminder-17 in https://github.com/processing/p5.js/pull/6503
* Solved the issue with Pan y-axis inverted in frameBuffer. by @perminder-17 in https://github.com/processing/p5.js/pull/6545
* Update computeNormals() to support smooth shading for buildGeometry() outputs by @capGoblin in https://github.com/processing/p5.js/pull/6553
* Added feature to saveCanvas() to support framebuffer by @capGoblin in https://github.com/processing/p5.js/pull/6510
* Fixes incorrect reference to constants in p5.Geometry.js by @diyaayay in https://github.com/processing/p5.js/pull/6577
* Handle premultiplied alpha in filter(OPAQUE) by @davepagurek in https://github.com/processing/p5.js/pull/6529
* Adding framebuffer support for filter() + CreateFilterShader for 2D mode by @perminder-17 in https://github.com/processing/p5.js/pull/6559

#### Documentation
* Edit docs for typography attributes by @nickmcintyre in https://github.com/processing/p5.js/pull/6454
* Edit docs for accessibility by @nickmcintyre in https://github.com/processing/p5.js/pull/6484
* Edit docs for p5.Element by @nickmcintyre in https://github.com/processing/p5.js/pull/6512
* Edit docs for environment by @nickmcintyre in https://github.com/processing/p5.js/pull/6505
* Revise docs for dom functions by @nickmcintyre in https://github.com/processing/p5.js/pull/6534
* Added comments to filter.js by @perminder-17 in https://github.com/processing/p5.js/pull/6547
* Edit docs for dom objects by @nickmcintyre in https://github.com/processing/p5.js/pull/6552
* Fix typo in JSDoc of the createVector method #6569 by @cabbage63 in https://github.com/processing/p5.js/pull/6574
* Solves issue #6519 by @Garima3110 in https://github.com/processing/p5.js/pull/6549

## New Contributors 💗
* @deveshidwivedi made their first contribution in https://github.com/processing/p5.js/pull/6497
* @acamposuribe made their first contribution in https://github.com/processing/p5.js/pull/6524
* @diyaayay made their first contribution in https://github.com/processing/p5.js/pull/6537
* @wackbyte made their first contribution in https://github.com/processing/p5.js/pull/6522
* @cabbage63 made their first contribution in https://github.com/processing/p5.js/pull/6574
* @Jaivignesh-afk made their first contribution in https://github.com/processing/p5.js/pull/6557
* @SlightlyEpic made their first contribution in https://github.com/processing/p5.js/pull/6580
* @tabreturn made their first contribution in https://github.com/processing/p5.js/pull/6594

**Full Changelog**: https://github.com/processing/p5.js/compare/v1.8.0...v1.9.0

## v1.8.0 — 2023-10-25

<!-- Release notes generated using configuration in .github/release.yml at v1.8.0 -->

## What's Changed 🎊

### WebGL

In this release, p5.js added some new WebGL mode tools. Filters now run in shaders for extra speed, and you can now run custom filter shaders, even on 2D canvases. You can now cut holes in shapes with `beginContour()` and apply vector masks with `beginClip()`. You can reuse shapes more efficiently with `buildGeometry()` and instanced rendering. Finally, we have also fixed a number of bugs.  _- Summary written by @davepagurek ✨_

* Add support for beginContour() and endContour() in Webgl mode by @davepagurek in https://github.com/processing/p5.js/pull/6297
* Fix stroke rendering when drawing to framebuffers by @davepagurek in https://github.com/processing/p5.js/pull/6304
* Adds createFilterShader() and custom shader support to the webGL filter() function  by @wong-justin in https://github.com/processing/p5.js/pull/6237
* Fix WebGL text not rendering when rotated 90 degrees by @davepagurek in https://github.com/processing/p5.js/pull/6316
* Fix reading between nested active framebuffers by @davepagurek in https://github.com/processing/p5.js/pull/6314
* Add methods to construct p5.Geometry from other p5 drawing functions by @davepagurek in https://github.com/processing/p5.js/pull/6287
* Handle missing exact edge vertices in buildGeometry by @davepagurek in https://github.com/processing/p5.js/pull/6320
* Fix strokes on framebuffers with different aspect ratios by @davepagurek in https://github.com/processing/p5.js/pull/6339
* Fix freed geometry leaving attributes in a broken state by @davepagurek in https://github.com/processing/p5.js/pull/6323
* Improve performance of line rendering by @davepagurek in https://github.com/processing/p5.js/pull/6230
* Add support for webGL instancing by @RandomGamingDev in https://github.com/processing/p5.js/pull/6276
* Add shaders for filter() constants, and use them by default in P2D by @wong-justin in https://github.com/processing/p5.js/pull/6324
* Fix clip() on both the main canvas and framebuffers by @davepagurek in https://github.com/processing/p5.js/pull/6376
* fixed texture filtering bug in p5.Framebuffer by @KeyboardSounds in https://github.com/processing/p5.js/pull/6420
* Fix clear() on framebuffers on Intel macs by @davepagurek in https://github.com/processing/p5.js/pull/6429
* Fix textureMode(IMAGE) + beginShape(TESS) by @davepagurek in https://github.com/processing/p5.js/pull/6366
* fixed issue #6440 by @Gaurav-1306 in https://github.com/processing/p5.js/pull/6446
* Erode, dilate, threshold shader filters match closer to CPU filters by @wong-justin in https://github.com/processing/p5.js/pull/6405
* Update WebGL blur filter to match CPU blur more by @davepagurek in https://github.com/processing/p5.js/pull/6460
* Fix camera flipping on framebuffers between push/pop calls by @davepagurek in https://github.com/processing/p5.js/pull/6471
* Setuniform by @Gaurav-1306 in https://github.com/processing/p5.js/pull/6474
* resolved issue #6399 by @Gaurav-1306 in https://github.com/processing/p5.js/pull/6480
* Auto-bind filter shaders to the filter graphic by @davepagurek in https://github.com/processing/p5.js/pull/6482
* new PR for issue #6383(Problem for diagonal)   by @perminder-17 in https://github.com/processing/p5.js/pull/6488

### Friendly Error System (FES)
* Add Hindi translation to FES by @Ayush23Dash in https://github.com/processing/p5.js/pull/6272
* Re-worded lines 413 and 446 of FES Developer Notes by @OnexiMedina in https://github.com/processing/p5.js/pull/6307
* Reference FES Contributor Docs inside FES Directory along with a diagram to understand usages of FES functions by @Ayush23Dash in https://github.com/processing/p5.js/pull/6335
* Fixed typing errors in fes_core.js documentation by @Garima3110 in https://github.com/processing/p5.js/pull/6478
* Update friendly_error_system.md by @Garima3110 in https://github.com/processing/p5.js/pull/6481
* Update fes_reference_dev_notes.md by @Garima3110 in https://github.com/processing/p5.js/pull/6486

### Reference Documentation Update
We updated a group of p5.js Reference pages as part of 2023 Season of Docs (SoD) program, with a goal to make them more accessible and beginner-friendly. Thanks to the SoD technical writer @nickmcintyre ✨.
* Edit docs for math functions by @nickmcintyre in https://github.com/processing/p5.js/pull/6281
* docs(typography): fix typos in example for textFont by @meezwhite in https://github.com/processing/p5.js/pull/6401
* Edit docs for p5.Vector by @nickmcintyre in https://github.com/processing/p5.js/pull/6340
* Edit docs for pixels functions by @nickmcintyre in https://github.com/processing/p5.js/pull/6390
* Edit docs for loading & displaying images by @nickmcintyre in https://github.com/processing/p5.js/pull/6425
* Update docs for p5.Image by @nickmcintyre in https://github.com/processing/p5.js/pull/6434
* Edit docs for p5.Font by @nickmcintyre in https://github.com/processing/p5.js/pull/6453
* Edit docs for image by @nickmcintyre in https://github.com/processing/p5.js/pull/6424
* Edit docs for typography load and display by @nickmcintyre in https://github.com/processing/p5.js/pull/6450

### Google Summer of Code (GSoC) 2023 Wrap up
* 🌸 Added GSoC wrap up! by @dewanshDT in https://github.com/processing/p5.js/pull/6403
* Gsoc 23 Wrapup post by @Ayush23Dash in https://github.com/processing/p5.js/pull/6415
* add GSoC'23 wrapup post for Justin Wong by @wong-justin in https://github.com/processing/p5.js/pull/6418
* Create lichlyter_gsoc_2023.md by @katlich112358 in https://github.com/processing/p5.js/pull/6455
* Create munusshih_gsoc_2023.md by @munusshih in https://github.com/processing/p5.js/pull/6461

### Other Code Update
* Ask to disable printing when print() called with no arguments by @davepagurek in https://github.com/processing/p5.js/pull/6253
* fix textWidth() and textToPoints() by @munusshih in https://github.com/processing/p5.js/pull/6184
* Fix issue where nf with 0 'right' parameter returns undefined in string by @limzykenneth in https://github.com/processing/p5.js/pull/6291
* Update environment.js with fix for frameRate description by @quinton-ashley in https://github.com/processing/p5.js/pull/6269
* Implement clip() to shapes by @davepagurek in https://github.com/processing/p5.js/pull/6306
* Clarified workflow for contributing documentation by @thatguyseven in https://github.com/processing/p5.js/pull/6312
* Clears MediaElement canvas at the beginning of every frame by @donaldzhu in https://github.com/processing/p5.js/pull/6309
* Clean up gruntfile release related steps by @Qianqianye in https://github.com/processing/p5.js/pull/6321
* fix-return-type by @asukaminato0721 in https://github.com/processing/p5.js/pull/6326
* fix HALF_FLOAT by @asukaminato0721 in https://github.com/processing/p5.js/pull/6330
* Added .gitattributes to Increase compatability with Window users and line endings by @SilasVM in https://github.com/processing/p5.js/pull/6317
* update all contributors setup by @gr2m in https://github.com/processing/p5.js/pull/6341
* refine canvas' type by @asukaminato0721 in https://github.com/processing/p5.js/pull/6328
* MouseEvent, WheelEvent and KeyboardEvent type by @asukaminato0721 in https://github.com/processing/p5.js/pull/6329
* fixed-wrong-capture-size-and-freeze-issue by @Prateek93a in https://github.com/processing/p5.js/pull/5159
* add more event type by @asukaminato0721 in https://github.com/processing/p5.js/pull/6379
* Main by @j-adel in https://github.com/processing/p5.js/pull/6374
* Update labeler Github Action by @stampyzfanz in https://github.com/processing/p5.js/pull/6395
* add unregisterMethod function by @capGoblin in https://github.com/processing/p5.js/pull/6426
* add before/after preload and setup by @capGoblin in https://github.com/processing/p5.js/pull/6433
* Fix: Misleading error message when NaN passed by @capGoblin in https://github.com/processing/p5.js/pull/6464
* Support pixel density on p5.Image (fixes issue #6114) by @Gaurav-1306 in https://github.com/processing/p5.js/pull/6447
* Fix orphan canvas when sketch is removed before canvas creation by @limzykenneth in https://github.com/processing/p5.js/pull/6355

### Other Documentation Update
* Fixed GitHub capitalization typo in contributor_docs by @SilasVM in https://github.com/processing/p5.js/pull/6284
* Fixing typo in "What are issues?" by @snwarner22 in https://github.com/processing/p5.js/pull/6288
* Fixed GitHub spelling in CONTRIBUTING.md by @SilasVM in https://github.com/processing/p5.js/pull/6295
* Fixed grammatical errors in contributor_guidelines.md by @thatguyseven in https://github.com/processing/p5.js/pull/6296
* Update documentation_style_guide.md with new guideline by @zelf0 in https://github.com/processing/p5.js/pull/6334
* add missing code contributors to all contributors in README and `.all-contributors.rc` file by @gr2m in https://github.com/processing/p5.js/pull/6349
* docs(all-contributors): remove @stellartux as requested by @gr2m in https://github.com/processing/p5.js/pull/6368
* docs(src/utilities): Use `describe()` instead of `@alt` by @Zearin in https://github.com/processing/p5.js/pull/5598
* Fix typo in export path to fix dev mode by @mykongee in https://github.com/processing/p5.js/pull/6373
* Improve Readme for future Contributors to codebase by @Ayush23Dash in https://github.com/processing/p5.js/pull/6260
* Fixed mousePressed() Example Error by @Utkarsh3128 in https://github.com/processing/p5.js/pull/6413
* Update README.md by @katlich112358 in https://github.com/processing/p5.js/pull/6458
* Fixed typing errors in validate_params.js file's documentation by @Garima3110 in https://github.com/processing/p5.js/pull/6473
* typo and unused variable from core by @benschac in https://github.com/processing/p5.js/pull/6476

## New Contributors 💗
* @munusshih made their first contribution in https://github.com/processing/p5.js/pull/6184
* @SilasVM made their first contribution in https://github.com/processing/p5.js/pull/6284
* @snwarner22 made their first contribution in https://github.com/processing/p5.js/pull/6288
* @thatguyseven made their first contribution in https://github.com/processing/p5.js/pull/6296
* @OnexiMedina made their first contribution in https://github.com/processing/p5.js/pull/6307
* @donaldzhu made their first contribution in https://github.com/processing/p5.js/pull/6309
* @gr2m made their first contribution in https://github.com/processing/p5.js/pull/6341
* @RandomGamingDev made their first contribution in https://github.com/processing/p5.js/pull/6276
* @mykongee made their first contribution in https://github.com/processing/p5.js/pull/6373
* @j-adel made their first contribution in https://github.com/processing/p5.js/pull/6374
* @meezwhite made their first contribution in https://github.com/processing/p5.js/pull/6401
* @dewanshDT made their first contribution in https://github.com/processing/p5.js/pull/6403
* @Utkarsh3128 made their first contribution in https://github.com/processing/p5.js/pull/6413
* @KeyboardSounds made their first contribution in https://github.com/processing/p5.js/pull/6420
* @capGoblin made their first contribution in https://github.com/processing/p5.js/pull/6426
* @Gaurav-1306 made their first contribution in https://github.com/processing/p5.js/pull/6446
* @katlich112358 made their first contribution in https://github.com/processing/p5.js/pull/6455
* @Garima3110 made their first contribution in https://github.com/processing/p5.js/pull/6473
* @benschac made their first contribution in https://github.com/processing/p5.js/pull/6476
* @perminder-17 made their first contribution in https://github.com/processing/p5.js/pull/6488
* @lakshay451 made their first contribution in https://github.com/processing/p5.js/pull/6493

**Full Changelog**: https://github.com/processing/p5.js/compare/v1.7.0...v1.8.0

## v1.7.0 — 2023-07-10

## What's Changed 🎊
Thanks to all the contributors! - Qianqian

### WebGL
1.7.0 adds WebGL2 support, provides tools for smoother camera movement and more natural orbitControl() thanks to a number of improvements by @inaridarkfox4231. It also introduces createFramebuffer() for fast layering and feedback, as well as the ability to read 3d depth information. - Thanks @davepagurek for the summarization
* Add WebGL2 support by @davepagurek in https://github.com/processing/p5.js/pull/6035
* #6022 Issue:Update light.js by @nikhilhvr in https://github.com/processing/p5.js/pull/6053
* Add Framebuffer support by @davepagurek in https://github.com/processing/p5.js/pull/6072
* Improve zooming behavior with orbitControl() by @inaridarkfox4231 in https://github.com/processing/p5.js/pull/6105
* Implement load/updatePixels() and get() for framebuffers by @davepagurek in https://github.com/processing/p5.js/pull/6109
* Specification change for ortho() and frustum(), and implementation of scaling in orbitControl() of ortho() by @inaridarkfox4231 in https://github.com/processing/p5.js/pull/6111
* Align the method of moving the camera with the right button in orbitControl() to the movement of the mouse by @inaridarkfox4231 in https://github.com/processing/p5.js/pull/6116
* Enable orbitControl() on mobile environment by @inaridarkfox4231 in https://github.com/processing/p5.js/pull/6119
* Fix lights() to properly specify gray by @inaridarkfox4231 in https://github.com/processing/p5.js/pull/6128
* Default ambientMaterial to the base material color if unspecified by @davepagurek in https://github.com/processing/p5.js/pull/6130
* Allow texture() to work under specular in WEBGL mode by @inaridarkfox4231 in https://github.com/processing/p5.js/pull/6138
* Improve orbitControl() to make it smoother by @inaridarkfox4231 in https://github.com/processing/p5.js/pull/6140
* Prevent _orbit() inside orbitControl() from making up vector parallel to y-axis by @inaridarkfox4231 in https://github.com/processing/p5.js/pull/6150
* Improvement of orbitControl(): Behavior when going out of canvas during operation by @inaridarkfox4231 in https://github.com/processing/p5.js/pull/6169
* Add EasyCam-like behavior to orbitControl() as an option by @inaridarkfox4231 in https://github.com/processing/p5.js/pull/6176
* In orbitControl(), use movedX,Y instead of difference of mouseX,Y by @inaridarkfox4231 in https://github.com/processing/p5.js/pull/6192
* Fix bugs in saveGif for WebGL2 contexts by @davepagurek in https://github.com/processing/p5.js/pull/6201
* Make sure p5.Graphics size is correct before resizing framebuffers by @davepagurek in https://github.com/processing/p5.js/pull/6234
* implementation of p5.Camera.set() function by @inaridarkfox4231 in https://github.com/processing/p5.js/pull/6243
* implement p5.Camera.slerp(), 3x3Matrix functions and minor spec-change of orbitControl() by @inaridarkfox4231 in https://github.com/processing/p5.js/pull/6251
* In p5.Camera.slerp, change the eye-center distance interpolation to be logarithmically based by @inaridarkfox4231 in https://github.com/processing/p5.js/pull/6259
* fix triangle() orientation in webgl mode by @inaridarkfox4231 in https://github.com/processing/p5.js/pull/6263

### FES
* FES throws an error when non globally exposed function's name used in other context by @aditya-shrivastavv in https://github.com/processing/p5.js/pull/6055
* [FES] Replace throw error with FES by @chechenxu in https://github.com/processing/p5.js/pull/6098
* Correct msgWithReference logic in FES to fix issue 5576 by @Ayush23Dash in https://github.com/processing/p5.js/pull/6221
* Update FES check for internal errors to support ES6 classes by @davepagurek in https://github.com/processing/p5.js/pull/6244

### Documentation
* Removed custom navbar.md in Korean translation of contributors docs by @al6862 in https://github.com/processing/p5.js/pull/6039
* Translation of the contribution guidelines to arabic by @MostafaEwis in https://github.com/processing/p5.js/pull/6017
* contributing doc by @Bernice55231 in https://github.com/processing/p5.js/pull/6102
* update documentation of ambientMaterial() by @ArshM17 in https://github.com/processing/p5.js/pull/6146
* Typo fixed: "The file maybe be loaded..." to "The file may be loaded..." by @camelCaseSensitive in https://github.com/processing/p5.js/pull/6149
* WebGL mode documentation improvements by @wong-justin in https://github.com/processing/p5.js/pull/6167
* contributor_docs zh trans by @wuyudi in https://github.com/processing/p5.js/pull/6199
* Add a style guide for documentation. Addresses #6178 by @nickmcintyre in https://github.com/processing/p5.js/pull/6206
* add fes zh trans by @wuyudi in https://github.com/processing/p5.js/pull/6210
* Edit docs for 2D primitives. Resolves #6217 by @nickmcintyre in https://github.com/processing/p5.js/pull/6218
* Edit color creating & reading docs. Addresses #6219 by @nickmcintyre in https://github.com/processing/p5.js/pull/6223
* Fix typos in contributor docs. Resolves #6227 by @zelf0 in https://github.com/processing/p5.js/pull/6228
* Update doc guides to use let for declarations by @nickmcintyre in https://github.com/processing/p5.js/pull/6232
* Update code samples for 2D primitives. Resolves #6239  by @nickmcintyre in https://github.com/processing/p5.js/pull/6240

### Dependencies
* Bump tough-cookie from 2.3.3 to 4.1.3 by @dependabot in https://github.com/processing/p5.js/pull/6256

### Others
* Bug fix for frameRate() by @quinton-ashley in https://github.com/processing/p5.js/pull/6015
* Updating JSDocs and module URLs by @konstantinstanmeyer in https://github.com/processing/p5.js/pull/6036
* Build output cleanup by @Ucodia in https://github.com/processing/p5.js/pull/6028
* removed .prettierrc file by @aditya-shrivastavv in https://github.com/processing/p5.js/pull/6044
* nf() handling exponential numbers and roundingOff decimal part correctly by @aditya-shrivastavv in https://github.com/processing/p5.js/pull/5973
* #6006 issue: Update p5.Color.js by @sawaisinghh in https://github.com/processing/p5.js/pull/6047
* Fix malformed json in .all-contributorsrc by @davepagurek in https://github.com/processing/p5.js/pull/6051
* Fix updatePixels() for media elements by @davepagurek in https://github.com/processing/p5.js/pull/6046
* Allow textAlign(CENTER, CENTER) with max width but no max height by @sawaisinghh in https://github.com/processing/p5.js/pull/6060
* Apply blendMode inside _drawPoints by @inaridarkfox4231 in https://github.com/processing/p5.js/pull/6069
* Fix gifs not animating in 1.6.0 by @davepagurek in https://github.com/processing/p5.js/pull/6067
* rename identifier `globalFunctions` to `classesWithGlobalFns` by @aditya-shrivastavv in https://github.com/processing/p5.js/pull/6076
* use es6-style class for some classes. by @wuyudi in https://github.com/processing/p5.js/pull/6075
* Fix black first frame when rendering gifs in setup by @davepagurek in https://github.com/processing/p5.js/pull/6081
* Make gif test less flaky by @davepagurek in https://github.com/processing/p5.js/pull/6090
* changed mousePressed reference description issue#6045 and variable name of example by @yogitheboss in https://github.com/processing/p5.js/pull/6059
* added deletion of the success message in the saveGif function by @agrshch in https://github.com/processing/p5.js/pull/6086
* Simplified isNumber function by @anpanring in https://github.com/processing/p5.js/pull/6095
* Do away with strokeIndices and construct Geometry directly with edges by @inaridarkfox4231 in https://github.com/processing/p5.js/pull/6121
* Factor transformations into position and area for shapes' accessible outputs - addresses #4721 by @calebfoss in https://github.com/processing/p5.js/pull/6122
* Replace os import to always use '\n' for EOL - resolves #6038 by @calebfoss in https://github.com/processing/p5.js/pull/6124
* fix min() and max() crashing on large arrays by @pmarsh-scottlogic in https://github.com/processing/p5.js/pull/6129
* Added enable() option for createSelect() by @Aqmalp99 in https://github.com/processing/p5.js/pull/6132
* Do not use angleBetween() for angle calculation in _orbit() inside orbtiControl(). by @inaridarkfox4231 in https://github.com/processing/p5.js/pull/6154
* more class to es6 by @wuyudi in https://github.com/processing/p5.js/pull/6088
* Update offline docs CSS from p5.js-website by @davepagurek in https://github.com/processing/p5.js/pull/6177
* #6164 Fixes inability to display single-frame GIFs by @ozramos in https://github.com/processing/p5.js/pull/6171
* Changed em tags (asterisks) to multiplication symbols by @Acha0203 in https://github.com/processing/p5.js/pull/6183
* fix missing extends by @wuyudi in https://github.com/processing/p5.js/pull/6187
* convert some missing class. by @wuyudi in https://github.com/processing/p5.js/pull/6173
* use atan2 to calculate angleBetween() by @inaridarkfox4231 in https://github.com/processing/p5.js/pull/6205
* implementation of p5.Vector slerp function by @inaridarkfox4231 in https://github.com/processing/p5.js/pull/6222
* add missing chainable/doc. by @wuyudi in https://github.com/processing/p5.js/pull/6209
* Supporting existing canvas element for createCanvas() and createGraphics() by @ffd8 in https://github.com/processing/p5.js/pull/6229
* Don't unpack premultiply alpha for text data textures by @davepagurek in https://github.com/processing/p5.js/pull/6236
* Clean up YUIDoc warnings by @limzykenneth in https://github.com/processing/p5.js/pull/6246
* Edit color setting docs. Addresses #6219 by @zelf0 in https://github.com/processing/p5.js/pull/6226
* Update offlnie reference CSS to fix bullets in class fields/methods by @davepagurek in https://github.com/processing/p5.js/pull/6250
* try convert remaining to class by @wuyudi in https://github.com/processing/p5.js/pull/6174


## New Contributors
* @quinton-ashley made their first contribution in https://github.com/processing/p5.js/pull/6015
* @konstantinstanmeyer made their first contribution in https://github.com/processing/p5.js/pull/6036
* @al6862 made their first contribution in https://github.com/processing/p5.js/pull/6039
* @sawaisinghh made their first contribution in https://github.com/processing/p5.js/pull/6047
* @MostafaEwis made their first contribution in https://github.com/processing/p5.js/pull/6017
* @wuyudi made their first contribution in https://github.com/processing/p5.js/pull/6075
* @nikhilhvr made their first contribution in https://github.com/processing/p5.js/pull/6053
* @agrshch made their first contribution in https://github.com/processing/p5.js/pull/6086
* @anpanring made their first contribution in https://github.com/processing/p5.js/pull/6095
* @Bernice55231 made their first contribution in https://github.com/processing/p5.js/pull/6102
* @chechenxu made their first contribution in https://github.com/processing/p5.js/pull/6098
* @pmarsh-scottlogic made their first contribution in https://github.com/processing/p5.js/pull/6129
* @Aqmalp99 made their first contribution in https://github.com/processing/p5.js/pull/6132
* @camelCaseSensitive made their first contribution in https://github.com/processing/p5.js/pull/6149
* @ArshM17 made their first contribution in https://github.com/processing/p5.js/pull/6146
* @ozramos made their first contribution in https://github.com/processing/p5.js/pull/6171
* @Acha0203 made their first contribution in https://github.com/processing/p5.js/pull/6183
* @wong-justin made their first contribution in https://github.com/processing/p5.js/pull/6167
* @zelf0 made their first contribution in https://github.com/processing/p5.js/pull/6228
* @Ayush23Dash made their first contribution in https://github.com/processing/p5.js/pull/6221

### Added by @allcontributors
Contributed to p5.js-website GitHub repo, reviewing, reporting bugs, translation, creating add-on libraries, event organizing, design, etc.
* docs: add dewanshDT as a contributor for bug by @allcontributors in https://github.com/processing/p5.js/pull/6029
* docs: add konstantinstanmeyer as a contributor for doc by @allcontributors in https://github.com/processing/p5.js/pull/6037
* docs: add al6862 as a contributor for bug, and code by @allcontributors in https://github.com/processing/p5.js/pull/6041
* docs: add monmon2003 as a contributor for code by @allcontributors in https://github.com/processing/p5.js/pull/6043
* docs: add kr-2003 as a contributor for bug by @allcontributors in https://github.com/processing/p5.js/pull/6049
* docs: add nown1ne as a contributor for bug, and code by @allcontributors in https://github.com/processing/p5.js/pull/6050
* docs: add sawaisinghh as a contributor for doc by @allcontributors in https://github.com/processing/p5.js/pull/6052
* docs: add anpanring as a contributor for bug by @allcontributors in https://github.com/processing/p5.js/pull/6057
* docs: add Aryan1982 as a contributor for code by @allcontributors in https://github.com/processing/p5.js/pull/6058
* docs: add MostafaEwis as a contributor for translation by @allcontributors in https://github.com/processing/p5.js/pull/6061
* docs: add nabilhassein as a contributor for translation by @allcontributors in https://github.com/processing/p5.js/pull/6062
* docs: add sawaisinghh as a contributor for bug, and code by @allcontributors in https://github.com/processing/p5.js/pull/6065
* docs: add wuyudi as a contributor for translation by @allcontributors in https://github.com/processing/p5.js/pull/6073
* docs: add agrshch as a contributor for code by @allcontributors in https://github.com/processing/p5.js/pull/6087
* docs: add shibomb as a contributor for code by @allcontributors in https://github.com/processing/p5.js/pull/6092
* docs: add siddhant1 as a contributor for bug, and code by @allcontributors in https://github.com/processing/p5.js/pull/6108
* docs: add calebfoss as a contributor for ideas, review, and plugin by @allcontributors in https://github.com/processing/p5.js/pull/6112
* docs: add chechenxu as a contributor for code by @allcontributors in https://github.com/processing/p5.js/pull/6113
* docs: add pmarsh-scottlogic as a contributor for code by @allcontributors in https://github.com/processing/p5.js/pull/6131
* docs: add ozramos as a contributor for code by @allcontributors in https://github.com/processing/p5.js/pull/6180
* docs: add munusshih as a contributor for code by @allcontributors in https://github.com/processing/p5.js/pull/6185
* docs: add wuyudi as a contributor for code by @allcontributors in https://github.com/processing/p5.js/pull/6186
* docs: add peilingjiang as a contributor for code, design, and translation by @allcontributors in https://github.com/processing/p5.js/pull/6194
* docs: add Decoy4ever as a contributor for code by @allcontributors in https://github.com/processing/p5.js/pull/6195
* docs: add shujuuu as a contributor for bug, ideas, and design by @allcontributors in https://github.com/processing/p5.js/pull/6198
* docs: add neondev27 as a contributor for translation by @allcontributors in https://github.com/processing/p5.js/pull/6160
* docs: add lindapaiste as a contributor for bug, code, and 2 more by @allcontributors in https://github.com/processing/p5.js/pull/6197
* docs: add wong-justin as a contributor for code, and doc by @allcontributors in https://github.com/processing/p5.js/pull/6224
* docs: add aceslowman as a contributor for code, and doc by @allcontributors in https://github.com/processing/p5.js/pull/6225
* docs: add nbriz as a contributor for review by @allcontributors in https://github.com/processing/p5.js/pull/6241
* docs: add Ayush23Dash as a contributor for code by @allcontributors in https://github.com/processing/p5.js/pull/6242
* docs: add zelf0 as a contributor for doc by @allcontributors in https://github.com/processing/p5.js/pull/6254

**Full Changelog**: https://github.com/processing/p5.js/compare/v1.6.0...v1.7.0

## v1.6.0 — 2023-02-22

## What's Changed 🎊
This release helps make p5.js WebGL mode work more like 2D mode: shape drawing, transparency, blend modes, and strokes with support for line caps and joins. WebGL mode can now blend colors along vertices and curves in strokes in addition to fills. We've also included lots of bug fixes for text, textures, and gif exports, including letting you export gifs from setup(). Thanks @davepagurek for the summary! Thanks @limzykenneth for supporting the release process! - @Qianqianye  💜


* Fix release action error due to unset secret by @limzykenneth in https://github.com/processing/p5.js/pull/5837
* Check for the existence of _friendlyAutoplayError before calling it by @davepagurek in https://github.com/processing/p5.js/pull/5825
* Handle v1.div(v2) when vectors are 2D by @davepagurek in https://github.com/processing/p5.js/pull/5834
* Enable WebGL blending when drawing with shaders by @davepagurek in https://github.com/processing/p5.js/pull/5856
* Handle MULTIPLY with alpha in WebGL by @davepagurek in https://github.com/processing/p5.js/pull/5855
* Change curAmbientColor to [1, 1, 1, 1] by @jwdunn1 in https://github.com/processing/p5.js/pull/5858
* Fix visual glitches in WebGL font rendering by @davepagurek in https://github.com/processing/p5.js/pull/5860
* getTargetFrameRate issue #5762 by @sz245 in https://github.com/processing/p5.js/pull/5839
* Update .all-contributorsrc by @dwight9339 in https://github.com/processing/p5.js/pull/5862
* Add Entry for GSoC 2022 Wrapup by @Malayvasa in https://github.com/processing/p5.js/pull/5863
* Fix tint() for p5.MediaElement by @davepagurek in https://github.com/processing/p5.js/pull/5871
* Improved the example code for `createCamera()`! by @Brahvim in https://github.com/processing/p5.js/pull/5873
* Minor corrections regarding of the text function. by @inaridarkfox4231 in https://github.com/processing/p5.js/pull/5885
* Fix palette generation bugs in saveGif() by @davepagurek in https://github.com/processing/p5.js/pull/5883
* Clear depth when background() is called by @davepagurek in https://github.com/processing/p5.js/pull/5886
* Update attributes.js by @UnityOfFairfax in https://github.com/processing/p5.js/pull/5424
* Fixed `curvePoint` and `curveTangent` ignoring  `curveTightness` by @sparshg in https://github.com/processing/p5.js/pull/5638
* Add static versions of existing mutable vector functions by @weslord in https://github.com/processing/p5.js/pull/5044
* About behavior of resetMatrix function in webgl by @inaridarkfox4231 in https://github.com/processing/p5.js/pull/5899
* Match TRIANGLE_FAN strokes in WebGL mode by @davepagurek in https://github.com/processing/p5.js/pull/5901
* fix the behavior of the quad function. by @inaridarkfox4231 in https://github.com/processing/p5.js/pull/5905
* Match line drawing orientation to primitive face by @inaridarkfox4231 in https://github.com/processing/p5.js/pull/5906
* Use TESS as the default shape mode in WebGL by @davepagurek in https://github.com/processing/p5.js/pull/5909
* Fix texture coordinate warning when using beginShape(TESS) by @davepagurek in https://github.com/processing/p5.js/pull/5910
* Turn on premultiplied alpha (and alpha) by default by @davepagurek in https://github.com/processing/p5.js/pull/5917
* Support beginShape(TESS) for faces that don't face the camera by @davepagurek in https://github.com/processing/p5.js/pull/5914
* Modify the shader so that the line can be colored per vertex by @inaridarkfox4231 in https://github.com/processing/p5.js/pull/5915
* GSoD: another round of edits to contributor docs by @limzykenneth in https://github.com/processing/p5.js/pull/5841
* Modify  bezierVertex() and quadraticVertex() so that curFillColor becomes an interpolated value by @inaridarkfox4231 in https://github.com/processing/p5.js/pull/5920
* Unbind textures when done with a shader by @davepagurek in https://github.com/processing/p5.js/pull/5923
* Fix WebGL vertex stroke colors for retained mode + some shape modes by @davepagurek in https://github.com/processing/p5.js/pull/5928
* Revert "Bump flat and mocha" by @davepagurek in https://github.com/processing/p5.js/pull/5939
* Made image loading failure in preload() not to stop whole process by @r21nomi in https://github.com/processing/p5.js/pull/5918
* fix: saveGif's third argument made more optional by @Neilblaze in https://github.com/processing/p5.js/pull/5931
* Modify the lightingShader to allow per-vertex coloring by @inaridarkfox4231 in https://github.com/processing/p5.js/pull/5938
* Update mocha to latest version by @limzykenneth in https://github.com/processing/p5.js/pull/5944
* Fixed Typos in steward_guidelines.md by @ChinmayKadam172 in https://github.com/processing/p5.js/pull/5945
* fix : setPosition and move method modified in p5.Camera.js by @Prateek462003 in https://github.com/processing/p5.js/pull/5949
* please add my name to the contibuter list by @aditya-shrivastavv in https://github.com/processing/p5.js/pull/5963
* Stroke cap+join support for WebGL by @davepagurek in https://github.com/processing/p5.js/pull/5802
* Disable unused vertexAttribute to avoid environment-dependent vanishing bugs by @inaridarkfox4231 in https://github.com/processing/p5.js/pull/5970
* Fix Frame Rate higher than target on high refresh rate displays (>200Hz) by @JoeCastor in https://github.com/processing/p5.js/pull/5847
* Make the orientation of triangle() clockwise by @inaridarkfox4231 in https://github.com/processing/p5.js/pull/5978
* fixes the semitransparent stroke disabled by @Prateek462003 in https://github.com/processing/p5.js/pull/5985
* Omit processing to the 4th argument in p5.js webgl stroke() by @inaridarkfox4231 in https://github.com/processing/p5.js/pull/5989
* Resolves Issue #5511 : GIF's don't update when using setUniform by @AryanKoundal in https://github.com/processing/p5.js/pull/5986
* Fix textureWrap REPEAT for WebGL Power Of Two Image Element by @kate-grant in https://github.com/processing/p5.js/pull/5987
* Don't run draw right after setup if saving a gif by @davepagurek in https://github.com/processing/p5.js/pull/6002
* Fixed line drawing in WebGL when there is a previously defined texture by @leslieyip02 in https://github.com/processing/p5.js/pull/5982
* fixed incorrect movement of box by @yogitheboss in https://github.com/processing/p5.js/pull/6009
* Resolves Issue#5958 3D orbitControl allowing +-90 degrees not enough. by @AryanKoundal in https://github.com/processing/p5.js/pull/6012

### By @dependabot
* Bump express from 4.16.2 to 4.18.2 by @dependabot in https://github.com/processing/p5.js/pull/5887
* Bump simple-git from 3.5.0 to 3.15.0 by @dependabot in https://github.com/processing/p5.js/pull/5889
* Bump flat and mocha by @dependabot in https://github.com/processing/p5.js/pull/5922
* Bump minimatch from 3.0.4 to 3.0.8 by @dependabot in https://github.com/processing/p5.js/pull/5930
* Bump json5 from 2.1.1 to 2.2.3 by @dependabot in https://github.com/processing/p5.js/pull/5929
* Bump simple-git from 3.15.0 to 3.16.0 by @dependabot in https://github.com/processing/p5.js/pull/5979
* Bump http-cache-semantics from 4.1.0 to 4.1.1 by @dependabot in https://github.com/processing/p5.js/pull/6003

## New Contributors 💗
### Contributed to p5.js GitHub repo
* @jwdunn1 made their first contribution in https://github.com/processing/p5.js/pull/5858
* @sz245 made their first contribution in https://github.com/processing/p5.js/pull/5839
* @dwight9339 made their first contribution in https://github.com/processing/p5.js/pull/5862
* @Malayvasa made their first contribution in https://github.com/processing/p5.js/pull/5863
* @Brahvim made their first contribution in https://github.com/processing/p5.js/pull/5873
* @inaridarkfox4231 made their first contribution in https://github.com/processing/p5.js/pull/5885
* @UnityOfFairfax made their first contribution in https://github.com/processing/p5.js/pull/5424
* @sparshg made their first contribution in https://github.com/processing/p5.js/pull/5638
* @r21nomi made their first contribution in https://github.com/processing/p5.js/pull/5918
* @Neilblaze made their first contribution in https://github.com/processing/p5.js/pull/5931
* @ChinmayKadam172 made their first contribution in https://github.com/processing/p5.js/pull/5945
* @Prateek462003 made their first contribution in https://github.com/processing/p5.js/pull/5949
* @aditya-shrivastavv made their first contribution in https://github.com/processing/p5.js/pull/5963
* @JoeCastor made their first contribution in https://github.com/processing/p5.js/pull/5847
* @AryanKoundal made their first contribution in https://github.com/processing/p5.js/pull/5986
* @kate-grant made their first contribution in https://github.com/processing/p5.js/pull/5987
* @leslieyip02 made their first contribution in https://github.com/processing/p5.js/pull/5982
* @yogitheboss made their first contribution in https://github.com/processing/p5.js/pull/6009

### Added by @allcontributors
Contributed to p5.js-website GitHub repo, reviewing, reporting bugs, translation, creating add-on libraries, event organizing, design, etc.

* @raclim made their first contribution for code, added by @allcontributors in https://github.com/processing/p5.js/pull/5845
* @lf32 made their first contribution for bug, doc, and 3 more, added by @allcontributors in https://github.com/processing/p5.js/pull/5876
* @Brahvim made their first contribution for doc, added by @allcontributors in https://github.com/processing/p5.js/pull/5884
* @UnityOfFairfax made their first contribution for code, added by @allcontributors in https://github.com/processing/p5.js/pull/5895
* @inaridarkfox4231 made their first contribution for code, added by @allcontributors in https://github.com/processing/p5.js/pull/5896
* @jwdunn1 made their first contribution for bug, and code, added by @allcontributors in https://github.com/processing/p5.js/pull/5897
* @Malayvasa made their first contribution for design, and code, added by @allcontributors in https://github.com/processing/p5.js/pull/5898
* @wagedu made their first contribution for bug, added by @allcontributors in https://github.com/processing/p5.js/pull/5903
* @weslord made their first contribution for doc, and test, added by @allcontributors in https://github.com/processing/p5.js/pull/5904
* @ChinmayKadam172 made their first contribution for doc, added by @allcontributors in https://github.com/processing/p5.js/pull/5950
* @pinky-pig made their first contribution for translation, added by @allcontributors in https://github.com/processing/p5.js/pull/5935
* @Prateek462003 made their first contribution for code, added by @allcontributors in https://github.com/processing/p5.js/pull/5954
* @aditya-shrivastavv made their first contribution for bug, code, and doc, added by @allcontributors in https://github.com/processing/p5.js/pull/5965
* @davidbmx made their first contribution for bug, and code, added by @allcontributors in https://github.com/processing/p5.js/pull/5976
* @AryanKoundal made their first contribution for code, added by @allcontributors in https://github.com/processing/p5.js/pull/5990
* @alptugan made their first contribution for code, plugin, and 3 more, added by @allcontributors in https://github.com/processing/p5.js/pull/5992
* @ltciro made their first contribution for translation, added by @allcontributors in https://github.com/processing/p5.js/pull/5993
* @kate-grant made their first contribution for bug, code, and test, added by @allcontributors in https://github.com/processing/p5.js/pull/6004
* @yogitheboss made their first contribution for example, added by @allcontributors in https://github.com/processing/p5.js/pull/6011
* @holomorfo made their first contribution for translation, added by @allcontributors in https://github.com/processing/p5.js/pull/6014
* @quinton-ashley made their first contribution for code, bug, and plugin, added by @allcontributors in https://github.com/processing/p5.js/pull/6016
* @ninioArtillero made their first contribution for translation, added by @allcontributors in https://github.com/processing/p5.js/pull/6019
* @hvillase made their first contribution for translation, added by @allcontributors in https://github.com/processing/p5.js/pull/6023
* @shivanshsharma13 made their first contribution for translation, added by @allcontributors in https://github.com/processing/p5.js/pull/6024
* @Elliot-Hernandez made their first contribution for translation, added by @allcontributors in https://github.com/processing/p5.js/pull/6025
* @hunahpu18 made their first contribution for translation, added by @allcontributors in https://github.com/processing/p5.js/pull/6027

You can find all of our contributors in our [README](https://github.com/processing/p5.js#contributors). Thank you to all the contributors! 💜

**Full Changelog**: https://github.com/processing/p5.js/compare/v1.5.0...v1.6.0

## v1.5.0 — 2022-10-18

## What's Changed 🎊
Now you can export gif from p5.js directly (Thanks to GSoC 2022 contributor [@Jesús Rascón](https://github.com/jesi-rgb)!), scale images to fit or fill a box automatically, get better tint() performance, combine webGL materials, + lots of small webGL fixes. Thanks [Dave Pagurek](https://twitter.com/davepvm/status/1582338698212884481) for the summary! Thanks [Kenneth Lim](https://github.com/limzykenneth) and [evelyn masso](https://github.com/outofambit) for supporting the release process. - Qianqian

More details below:

* only include necessary files in zip by @outofambit in https://github.com/processing/p5.js/pull/5732
* Add automatic labelling to issues by @stampyzfanz in https://github.com/processing/p5.js/pull/5731
* Fix applyMatrix example missing from reference page by @limzykenneth in https://github.com/processing/p5.js/pull/5738
* Fixes #5207 by @awelles in https://github.com/processing/p5.js/pull/5495
* Fix issue labeler permissions and regex by @stampyzfanz in https://github.com/processing/p5.js/pull/5744
* Fixed setHeading() not using the current angle mode by @KevinGrajeda in https://github.com/processing/p5.js/pull/5736
* Improve performance of tint() by @davepagurek in https://github.com/processing/p5.js/pull/5471
* Fix issue #5702 by @msed21 in https://github.com/processing/p5.js/pull/5747
* Update .all-contributorsrc by @IkeB108 in https://github.com/processing/p5.js/pull/5748
* Correct typo on box() in inline documentation by @calebfoss in https://github.com/processing/p5.js/pull/5751
* Label update by @Qianqianye in https://github.com/processing/p5.js/pull/5758
* Make reserved word assignment regex work better with function calls by @davepagurek in https://github.com/processing/p5.js/pull/5759
* Add support for QUADS and QUAD_STRIP in WebGL mode by @davepagurek in https://github.com/processing/p5.js/pull/5768
* Fix vertex ordering for beginShape(QUADS) in WebGL mode by @davepagurek in https://github.com/processing/p5.js/pull/5771
* Shrink image used for tint tests to speed them up by @davepagurek in https://github.com/processing/p5.js/pull/5773
* Animated GIF masking by @yifanmai in https://github.com/processing/p5.js/pull/5508
* Clarify select option behavior by @ggorlen in https://github.com/processing/p5.js/pull/5777
* Implement `saveGif` as a native p5 function by @jesi-rgb in https://github.com/processing/p5.js/pull/5709
* fixes for #5785 by @dhowe in https://github.com/processing/p5.js/pull/5787
* GSoD Contributor Docs Editorial Changes by @limzykenneth in https://github.com/processing/p5.js/pull/5764
* Added round corner property for rect() in WebGL mode by @ShenpaiSharma in https://github.com/processing/p5.js/pull/5789
* Create graciazhang_gsoc_2022.md by @Gracia-zhang in https://github.com/processing/p5.js/pull/5796
* smrghsh GSOC'22 project wrap up by @smrghsh in https://github.com/processing/p5.js/pull/5798
* Fix WebGL blending bugs by @davepagurek in https://github.com/processing/p5.js/pull/5794
* Add texture coordinates to WebGL rounded rects by @davepagurek in https://github.com/processing/p5.js/pull/5795
* Update README.md with GSoC 2022 wrap up link (Gracia) by @Gracia-zhang in https://github.com/processing/p5.js/pull/5797
* Add project_wrapup README link to smrghsh GSoC 22 by @smrghsh in https://github.com/processing/p5.js/pull/5799
* Added shubham-gsoc-2022-project-wrapup by @ShenpaiSharma in https://github.com/processing/p5.js/pull/5800
* Image fit features by @Manpreet-Singh001 in https://github.com/processing/p5.js/pull/5784
* Feature Implemeted -- Multiple Material support for geometry by @ShenpaiSharma in https://github.com/processing/p5.js/pull/5774
* Refactor and clean up build configurations by @limzykenneth in https://github.com/processing/p5.js/pull/5792
* Bump trim-newlines and np by @dependabot in https://github.com/processing/p5.js/pull/5806
* Handle making a p5.Texture out of the main canvas by @davepagurek in https://github.com/processing/p5.js/pull/5815
* Update contributor name by @ecridge in https://github.com/processing/p5.js/pull/5818
* Prevent load* methods outside of preload from rerunning setup by @davepagurek in https://github.com/processing/p5.js/pull/5816
* Use textContent to avoid HTML special characters in options by @ggorlen in https://github.com/processing/p5.js/pull/5782
* Continuation of Contributor Docs Edits (GSoD) by @limzykenneth in https://github.com/processing/p5.js/pull/5813
* Bump semver-regex from 2.0.0 to 3.1.4 by @dependabot in https://github.com/processing/p5.js/pull/5826
* Make sure setAttributes updates lingering references to the old canvas by @davepagurek in https://github.com/processing/p5.js/pull/5824
* Bump node-fetch and puppeteer by @dependabot in https://github.com/processing/p5.js/pull/5827
* Added GSOC 2022 Project Wrapup by @aceslowman in https://github.com/processing/p5.js/pull/5828
* Added entry for GSOC 2022 Wrapup post by @aceslowman in https://github.com/processing/p5.js/pull/5829
* Fixed typo in comment by @SableRaf in https://github.com/processing/p5.js/pull/5833
* Handle vertex data in TESS mode by @davepagurek in https://github.com/processing/p5.js/pull/5830

## New Contributors 💗
### Contributed to p5.js GitHub repo
* @awelles made their first contribution in https://github.com/processing/p5.js/pull/5495
* @msed21 made their first contribution in https://github.com/processing/p5.js/pull/5747
* @IkeB108 made their first contribution in https://github.com/processing/p5.js/pull/5748
* @calebfoss made their first contribution in https://github.com/processing/p5.js/pull/5751
* @yifanmai made their first contribution in https://github.com/processing/p5.js/pull/5508
* @ggorlen made their first contribution in https://github.com/processing/p5.js/pull/5777
* @Gracia-zhang made their first contribution in https://github.com/processing/p5.js/pull/5796
* @smrghsh made their first contribution in https://github.com/processing/p5.js/pull/5798
* @Manpreet-Singh001 made their first contribution in https://github.com/processing/p5.js/pull/5784
* @SableRaf made their first contribution in https://github.com/processing/p5.js/pull/5833

### Added by @allcontributors
Contributed to p5.js-website GitHub repo, reviewing, reporting bugs, translation, creating add-on libraries, event organizing, design, etc.
* @ongzzzzzz made their first contribution for plugin, added by @allcontributors in https://github.com/processing/p5.js/pull/5754
* @bsubbaraman made their first contribution for plugin, added by @allcontributors in https://github.com/processing/p5.js/pull/5755
* @jdeboi made their first contribution for plugin, added by @allcontributors in https://github.com/processing/p5.js/pull/5756
* @Manpreet-Singh001 made their first contribution, added by @allcontributors in https://github.com/processing/p5.js/pull/5803
* @TetroGem made their first contribution, added by @allcontributors in https://github.com/processing/p5.js/pull/5804
* @ggorlen made their first contribution for code, added by @allcontributors in https://github.com/processing/p5.js/pull/5822

**Full Changelog**: https://github.com/processing/p5.js/compare/v1.4.2...v1.5.0

## v1.4.2 — 2022-07-21

## What's Changed 🎊
* Updated some JsDoc definitions by @Gaweph in https://github.com/processing/p5.js/pull/5578
* Improve documetation clarity of material methods by @JetStarBlues in https://github.com/processing/p5.js/pull/5310
* docs(contributing md): add language to code blocks by @stampyzfanz in https://github.com/processing/p5.js/pull/5586
* fixes issue #5191 along with minor grammatical edits by @reejuBhattacharya in https://github.com/processing/p5.js/pull/5592
* Assorted edits to inline docs by @nickmcintyre in https://github.com/processing/p5.js/pull/5560
* Bump marked from 0.7.0 to 4.0.10 by @dependabot in https://github.com/processing/p5.js/pull/5554
* Bump simple-get from 3.1.0 to 3.1.1 by @dependabot in https://github.com/processing/p5.js/pull/5605
* docs(src/io): Use `describe()` instead of `@alt` by @Zearin in https://github.com/processing/p5.js/pull/5595
* docs(src/math): Use `describe()` instead of `@alt` by @Zearin in https://github.com/processing/p5.js/pull/5596
* docs(src/typography): Use `describe()` instead of `@alt` by @Zearin in https://github.com/processing/p5.js/pull/5597
* Update contributor_docs/README.md by @Zearin in https://github.com/processing/p5.js/pull/5606
* Improve documentation clarity of light methods by @JetStarBlues in https://github.com/processing/p5.js/pull/5312
* Improve clarity of `specularColor()` example by @JetStarBlues in https://github.com/processing/p5.js/pull/5314
* Fix typo in vertex.js by @eltociear in https://github.com/processing/p5.js/pull/5613
* Fixes issue #5603 by @reejuBhattacharya in https://github.com/processing/p5.js/pull/5604
* updated isLooping return type by @Gaweph in https://github.com/processing/p5.js/pull/5618
* docs(src/events): Use `describe()` over `@alt`  by @Zearin in https://github.com/processing/p5.js/pull/5593
* Fixed bug were cached colors are not cleared by @0xJonas in https://github.com/processing/p5.js/pull/5353
* docs(p5.Vector): Formatting and minor copy edits by @Zearin in https://github.com/processing/p5.js/pull/5580
* Reference Catmull-Rom in the docs for curvePoint by @davepagurek in https://github.com/processing/p5.js/pull/5493
* Fix typo in fes_reference_dev_notes.md by @eltociear in https://github.com/processing/p5.js/pull/5642
* build(deps-dev): bump simple-git from 1.132.0 to 3.3.0 by @dependabot in https://github.com/processing/p5.js/pull/5639
* Fixed typo on atan2() page by @koolaidkrusade in https://github.com/processing/p5.js/pull/5655
* Fix typo on 'updatePixels()' page by @smilee in https://github.com/processing/p5.js/pull/5648
* build(deps): bump minimist from 1.2.5 to 1.2.6 by @dependabot in https://github.com/processing/p5.js/pull/5652
* refactor: replace deprecated String.prototype.substr() by @CommanderRoot in https://github.com/processing/p5.js/pull/5643
* Update p5.Element.js by @error-four-o-four in https://github.com/processing/p5.js/pull/5664
* Fix typo in p5.RendererGL.Immediate.js by @eltociear in https://github.com/processing/p5.js/pull/5676
* Fix typo by @idodana in https://github.com/processing/p5.js/pull/5672
* p5.image docs typo fix by @processprocess in https://github.com/processing/p5.js/pull/5671
* build(deps-dev): bump grunt from 1.3.0 to 1.5.3 by @dependabot in https://github.com/processing/p5.js/pull/5679
* build(deps-dev): bump simple-git from 3.3.0 to 3.5.0 by @dependabot in https://github.com/processing/p5.js/pull/5661
* Publishing FES Survey Results and Friendly Errors i18n Book by @almchung in https://github.com/processing/p5.js/pull/5691
* build(deps): bump shell-quote from 1.7.2 to 1.7.3 by @dependabot in https://github.com/processing/p5.js/pull/5698
* Update `saveFrames` documentation by @jesi-rgb in https://github.com/processing/p5.js/pull/5694
* added describe() to all 3d reference examples by @aceslowman in https://github.com/processing/p5.js/pull/5706
* Reword first issue welcome comment to mention issue forms by @stampyzfanz in https://github.com/processing/p5.js/pull/5640
* Update Readme for evelyn moving to mentor role by @outofambit in https://github.com/processing/p5.js/pull/5714
* Fixed background transparency with Images by @yashlamba in https://github.com/processing/p5.js/pull/5683
* Fix noSmooth printing message when used with a non WebGL graphics by @limzykenneth in https://github.com/processing/p5.js/pull/5726
* Fixes #5160 by @KevinGrajeda in https://github.com/processing/p5.js/pull/5682

## New Contributors 💗
### Contributed to p5.js GitHub repo
* @stampyzfanz made their first contribution in https://github.com/processing/p5.js/pull/5586
* @0xJonas made their first contribution in https://github.com/processing/p5.js/pull/5353
* @koolaidkrusade made their first contribution in https://github.com/processing/p5.js/pull/5655
* @smilee made their first contribution in https://github.com/processing/p5.js/pull/5648
* @CommanderRoot made their first contribution in https://github.com/processing/p5.js/pull/5643
* @error-four-o-four made their first contribution in https://github.com/processing/p5.js/pull/5664
* @idodana made their first contribution in https://github.com/processing/p5.js/pull/5672
* @processprocess made their first contribution in https://github.com/processing/p5.js/pull/5671
* @jesi-rgb made their first contribution in https://github.com/processing/p5.js/pull/5694
* @aceslowman made their first contribution in https://github.com/processing/p5.js/pull/5706
* @yashlamba made their first contribution in https://github.com/processing/p5.js/pull/5683
* @KevinGrajeda made their first contribution in https://github.com/processing/p5.js/pull/5682

### Added by @allcontributors
Contributed to p5.js-website GitHub repo, reviewing, reporting bugs, translation, creating add-on libraries, event organizing, design, etc.
* @unjust made their first contribution for bug, added by @allcontributors in https://github.com/processing/p5.js/pull/5611
* @Gaweph made their first contribution for code, added by @allcontributors in https://github.com/processing/p5.js/pull/5612
* @eltociear made their first contribution for doc, added by @allcontributors in https://github.com/processing/p5.js/pull/5614
* @KouichiMatsuda made their first contribution for bug, added by @allcontributors in https://github.com/processing/p5.js/pull/5621
* @taejs made their first contribution for bug, added by @allcontributors in https://github.com/processing/p5.js/pull/5623
* @Divyansh013 made their first contribution for translation, added by @allcontributors in https://github.com/processing/p5.js/pull/5624
* @rinkydevi made their first contribution for translation, added by @allcontributors in https://github.com/processing/p5.js/pull/5625
* @cas-c4ta made their first contribution for bug, added by @allcontributors in https://github.com/processing/p5.js/pull/5626
* @danieljamesross made their first contribution for bug, added by @allcontributors in https://github.com/processing/p5.js/pull/5627
* @liz-peng made their first contribution for design, code, tool, added by @allcontributors in https://github.com/processing/p5.js/pull/5645
* @tapioca24 made their first contribution for plugin, added by @allcontributors in https://github.com/processing/p5.js/pull/5701
* @adarrssh made their first contribution for translation, added by @allcontributors in https://github.com/processing/p5.js/pull/5711
* @kaabe1 made their first contribution for design, eventOrganizing, added by @allcontributors in https://github.com/processing/p5.js/pull/5713
* @Guirdo made their first contribution for translation, added by @allcontributors in https://github.com/processing/p5.js/pull/5715
* @3ru made their first contribution for bug, review, code, added by @allcontributors in https://github.com/processing/p5.js/pull/5716
* @LEMIBANDDEXARI made their first contribution for translation, added by @allcontributors in https://github.com/processing/p5.js/pull/5721
* @probablyvivek made their first contribution for translation, added by @allcontributors in https://github.com/processing/p5.js/pull/5724
* @anniezhengg made their first contribution for code, design, added by @allcontributors in https://github.com/processing/p5.js/pull/5729
* @SNP0301 made their first contribution for translation, added by @allcontributors in https://github.com/processing/p5.js/pull/5730

You can find all of our contributors in our [README](https://github.com/processing/p5.js#contributors). Thank you to all the contributors! 💜

**Full Changelog**: https://github.com/processing/p5.js/compare/v1.4.1...v1.4.2

## v1.4.1 — 2022-02-03

## What's Changed 🎉
* Update .all-contributorsrc by @anniemckinnon in https://github.com/processing/p5.js/pull/5342
* Rename `Lights, Camera` module to `3D` by @JetStarBlues in https://github.com/processing/p5.js/pull/5295
* removed unused .jshintrc by @N4M3L355 in https://github.com/processing/p5.js/pull/5345
* Point to wiki in text() reference page by @JetStarBlues in https://github.com/processing/p5.js/pull/5319
* Fixed round implementation support for numbers that have string representations that use exponential notation. by @sflanker in https://github.com/processing/p5.js/pull/5341
* GSoC'21: adding to FES phase 1 by @Aloneduckling in https://github.com/processing/p5.js/pull/5305
* docs: add jiwonme as a contributor for code by @allcontributors in https://github.com/processing/p5.js/pull/5352
* Rename `aMaterialColor` attribute to `aVertexColor` by @JetStarBlues in https://github.com/processing/p5.js/pull/5303
* Improve documentation clarity of shader methods by @JetStarBlues in https://github.com/processing/p5.js/pull/5307
* Improve clarity of `noLights()` example by @JetStarBlues in https://github.com/processing/p5.js/pull/5313
* Improve clarity of `lightFalloff()` example by @JetStarBlues in https://github.com/processing/p5.js/pull/5315
* Improve documentation clarity of texture methods by @JetStarBlues in https://github.com/processing/p5.js/pull/5316
* docs: add truemaxdh as a contributor for bug, code by @allcontributors in https://github.com/processing/p5.js/pull/5365
* Detecting redeclaration of p5.js reserved constants and functions by @Aloneduckling in https://github.com/processing/p5.js/pull/5351
* Fix typo in image.js by @eltociear in https://github.com/processing/p5.js/pull/5375
* docs: add katiejliu as a contributor for code by @allcontributors in https://github.com/processing/p5.js/pull/5378
* add VERSION const as p5.VERSION by @micuat in https://github.com/processing/p5.js/pull/5165
* fixing links to p5.MediaElement - resolves #5355 by @guilhermesilveira in https://github.com/processing/p5.js/pull/5356
* docs: add guilhermesilveira as a contributor for doc by @allcontributors in https://github.com/processing/p5.js/pull/5379
* Add gsoc 2021 project wrapup by @Aloneduckling in https://github.com/processing/p5.js/pull/5372
* Bump path-parse from 1.0.5 to 1.0.7 by @dependabot in https://github.com/processing/p5.js/pull/5371
* Final Work Product Submission for GSoC 2021 - Anais Gonzalez by @anagondesign in https://github.com/processing/p5.js/pull/5382
* add project wrap-up to README.md by @Aloneduckling in https://github.com/processing/p5.js/pull/5383
* make it possible to call "npm run dev" per docs without having called "npm grunt" first by @gregsadetsky in https://github.com/processing/p5.js/pull/5391
* Update dom.js comments by @WayGuan in https://github.com/processing/p5.js/pull/5394
* Fixing ReferenceError: totalHeight is not defined throw by textAlign(… by @malviys in https://github.com/processing/p5.js/pull/5366
* Unit test fix to resolve #5367 by @almchung in https://github.com/processing/p5.js/pull/5412
* Update puppeteer and other dependencies by @limzykenneth in https://github.com/processing/p5.js/pull/5413
* Create nikiito_gsoc_2021.md and add Work Product Report link to first paragraph by @niki-ito in https://github.com/processing/p5.js/pull/5399
* add gsoc 2021 project wrapup for addon library development - p5.teach.js by @aditya-siddheshwar in https://github.com/processing/p5.js/pull/5418
* Update README.md by @niki-ito in https://github.com/processing/p5.js/pull/5417
* GSOC 2021 wrap-up post added by @SanjaySinghRajpoot in https://github.com/processing/p5.js/pull/5419
* Update README.md with link to GSoC 2021 wrap-up by @anagondesign in https://github.com/processing/p5.js/pull/5423
* Create katiejliu_gsoc_2021.md by @katiejliu in https://github.com/processing/p5.js/pull/5425
* Added Documentation for GSoC 2021 by @jhongover9000 in https://github.com/processing/p5.js/pull/5426
* Fix typo in vertex.js by @eltociear in https://github.com/processing/p5.js/pull/5431
* fix horizontal/vertical alignment for multi-line text by @dhowe in https://github.com/processing/p5.js/pull/5432
* explicitly check if mouseIsPressed is true for documentation by @michaeleggers in https://github.com/processing/p5.js/pull/5437
* Added wrap-up of gsoc-21 @satyasaibhushan by @satyasaibhushan in https://github.com/processing/p5.js/pull/5439
* add internal functions for changing translation language in i18next by @outofambit in https://github.com/processing/p5.js/pull/5443
* Add myself to contributors by @camilleroux in https://github.com/processing/p5.js/pull/5444
* Fix typo in dom.js by @eltociear in https://github.com/processing/p5.js/pull/5459
* fix: Update the rem instance method to be chainable by @aaronccasanova in https://github.com/processing/p5.js/pull/5461
* New FES Contributor Docs + FES Survey Link by @almchung in https://github.com/processing/p5.js/pull/5460
* FES Contributors doc link updates by @almchung in https://github.com/processing/p5.js/pull/5473
* Fix to Issue #5462 by @dhowe in https://github.com/processing/p5.js/pull/5466
* Remove reference to p5 instance in p5.Vector objects by @limzykenneth in https://github.com/processing/p5.js/pull/5469
* Removes invalid website inconsolata reference by @guilhermesilveira in https://github.com/processing/p5.js/pull/5381
* Resolves #5481 Set uniform arrays bug by @aferriss in https://github.com/processing/p5.js/pull/5483
* fixed-select-option-using-label-issue by @Prateek93a in https://github.com/processing/p5.js/pull/5098
* Fixed Typo in Hindi translation of the contributor_docs by @IamEzio in https://github.com/processing/p5.js/pull/5492
* Updated strokeWeight() documentation by @reejuBhattacharya in https://github.com/processing/p5.js/pull/5480
* docs: add reejuBhattacharya as a contributor for doc by @allcontributors in https://github.com/processing/p5.js/pull/5498
* docs: Fix typos (its/it’s) by @Zearin in https://github.com/processing/p5.js/pull/5500
* Add a uModelViewProjectionMatrix uniform by @JetStarBlues in https://github.com/processing/p5.js/pull/5283
* Add an example for resetShader() by @JetStarBlues in https://github.com/processing/p5.js/pull/5265
* Allow clear colors to propagate to the webGL clear method. by @aferriss in https://github.com/processing/p5.js/pull/5515
* Fixed function isTextureShader. by @sflanker in https://github.com/processing/p5.js/pull/5510
* Allow p5.Texture inputs to setUniform by @aferriss in https://github.com/processing/p5.js/pull/5517
* Allow texture() to accept p5.Texture argument without throwing a warning. by @aferriss in https://github.com/processing/p5.js/pull/5519
* Fixed GIF Freezing After Returning to Unfocused Tab by @frigorific44 in https://github.com/processing/p5.js/pull/5484
* docs: add akshatnema as a contributor for code by @allcontributors in https://github.com/processing/p5.js/pull/5531
* docs: add IamEzio as a contributor for bug by @allcontributors in https://github.com/processing/p5.js/pull/5532
* docs: add Himanshu664 as a contributor for bug by @allcontributors in https://github.com/processing/p5.js/pull/5533
* docs: add chosamuel as a contributor for bug by @allcontributors in https://github.com/processing/p5.js/pull/5534
* docs: add TOrfevres as a contributor for bug by @allcontributors in https://github.com/processing/p5.js/pull/5536
* docs: add reejuBhattacharya as a contributor for code by @allcontributors in https://github.com/processing/p5.js/pull/5537
* docs: add JaPatGitHub as a contributor for doc by @allcontributors in https://github.com/processing/p5.js/pull/5538
* docs: add Zearin as a contributor for doc by @allcontributors in https://github.com/processing/p5.js/pull/5539
* docs: add pifragile as a contributor for bug by @allcontributors in https://github.com/processing/p5.js/pull/5540
* docs: add KevinWorkman as a contributor for doc by @allcontributors in https://github.com/processing/p5.js/pull/5541
* docs: add j-stodd as a contributor for bug by @allcontributors in https://github.com/processing/p5.js/pull/5542
* docs: add soegaard as a contributor for doc by @allcontributors in https://github.com/processing/p5.js/pull/5543
* docs: add oleboleskole3 as a contributor for bug by @allcontributors in https://github.com/processing/p5.js/pull/5544
* docs: add awelles as a contributor for bug by @allcontributors in https://github.com/processing/p5.js/pull/5545
* resolves #5465, typo in setMag() example by @montoyamoraga in https://github.com/processing/p5.js/pull/5535
* docs: add andreiantonescu as a contributor for bug by @allcontributors in https://github.com/processing/p5.js/pull/5546
* docs: add dipamsen as a contributor for bug by @allcontributors in https://github.com/processing/p5.js/pull/5547
* docs: add soegaard as a contributor for bug by @allcontributors in https://github.com/processing/p5.js/pull/5548
* docs: add stigmollerhansen as a contributor for bug by @allcontributors in https://github.com/processing/p5.js/pull/5549
* docs: add frigorific44 as a contributor for code by @allcontributors in https://github.com/processing/p5.js/pull/5550
* docs: add willmartian as a contributor for ideas by @allcontributors in https://github.com/processing/p5.js/pull/5551
* Fixes bug introduced by #5483 by @aferriss in https://github.com/processing/p5.js/pull/5553
* docs: Use “×” for dimensions by @Zearin in https://github.com/processing/p5.js/pull/5502
* fixes issues #5374 and #5504 by @reejuBhattacharya in https://github.com/processing/p5.js/pull/5558
* feat: enable Github Issue Forms by @willmartian in https://github.com/processing/p5.js/pull/5479
* Fix typo in curveVertex doc by @beaumu in https://github.com/processing/p5.js/pull/5566
* dom.js - Make PositionType argument optional by @Gaweph in https://github.com/processing/p5.js/pull/5569
* Changes webGL alpha buffer to false. by @aferriss in https://github.com/processing/p5.js/pull/5555
* resolves issue #5421 by @reejuBhattacharya in https://github.com/processing/p5.js/pull/5572
* docs: add beaumu as a contributor for doc by @allcontributors in https://github.com/processing/p5.js/pull/5573
* fixes issue #5574 by @reejuBhattacharya in https://github.com/processing/p5.js/pull/5575
* Allow settings object for p5.Texture by @aferriss in https://github.com/processing/p5.js/pull/5557
* FES ko new translation file + en file minor updates by @almchung in https://github.com/processing/p5.js/pull/5581
* Update inline documentation to use describe() instead of @alt | resolves #5139 by @lm-n in https://github.com/processing/p5.js/pull/5140
* docs(src/color/): Use `describe('…')` over `@alt` by @Zearin in https://github.com/processing/p5.js/pull/5577
* Bump cached-path-relative from 1.0.2 to 1.1.0 by @dependabot in https://github.com/processing/p5.js/pull/5582

## New Contributors 💗
* @N4M3L355 made their first contribution in https://github.com/processing/p5.js/pull/5345
* @eltociear made their first contribution in https://github.com/processing/p5.js/pull/5375
* @guilhermesilveira made their first contribution in https://github.com/processing/p5.js/pull/5356
* @anagondesign made their first contribution in https://github.com/processing/p5.js/pull/5382
* @WayGuan made their first contribution in https://github.com/processing/p5.js/pull/5394
* @malviys made their first contribution in https://github.com/processing/p5.js/pull/5366
* @niki-ito made their first contribution in https://github.com/processing/p5.js/pull/5399
* @aditya-siddheshwar made their first contribution in https://github.com/processing/p5.js/pull/5418
* @katiejliu made their first contribution in https://github.com/processing/p5.js/pull/5425
* @jhongover9000 made their first contribution in https://github.com/processing/p5.js/pull/5426
* @michaeleggers made their first contribution in https://github.com/processing/p5.js/pull/5437
* @camilleroux made their first contribution in https://github.com/processing/p5.js/pull/5444
* @aaronccasanova made their first contribution in https://github.com/processing/p5.js/pull/5461
* @IamEzio made their first contribution in https://github.com/processing/p5.js/pull/5492
* @reejuBhattacharya made their first contribution in https://github.com/processing/p5.js/pull/5480
* @Zearin made their first contribution in https://github.com/processing/p5.js/pull/5500
* @frigorific44 made their first contribution in https://github.com/processing/p5.js/pull/5484
* @willmartian made their first contribution in https://github.com/processing/p5.js/pull/5479
* @beaumu made their first contribution in https://github.com/processing/p5.js/pull/5566
* @Gaweph made their first contribution in https://github.com/processing/p5.js/pull/5569

**Full Changelog**: https://github.com/processing/p5.js/compare/v1.4.0...v1.4.1

## v1.4.0 — 2021-06-29

### General Changes
- Updated p5 sound library to `v1.0.1`! ([Release notes](https://github.com/processing/p5.js-sound/releases/v1.0.1))

### Code Changes
- Added support for UInt32 vertex indices
- Change p5.Geometry's module/submodule
- Fixes initialization of user-defined stroke shader
- Processing keyword changed to p5 on mouse.js
- Disable codecov comments
- Fix "Javacript" typo in error message
- Update GIF disposal handling
- Update reference.js
- Add text wrapping function
- Update browser compatibility info for build process
- `describeElement()` regex quick fix

### Documentation Changes
- Removed redundant string "(Optional)" everywhere in the inline documentation
- Fixes canvas size problem of `fract()` page in reference section
- add missing space in `arc()` docs
- Add `p5.Camera.frustum` documentation on reference page
- `norender` class added to createCapture documentation
- Update README.md -- aligned vertical bars
- Updated Hindi contributor docs README.md
- Added missing hindi translations to unit_testing.md
- Add fes message
- Fix copypasta in sample code
- Add a reference from one `dist()` the other one and vise-verse.
- Improve `createCamera()` example
- Fix the `texture()` example
- Add `vertex()` variant to documentation
- Add example for `specularMaterial()`
- Update `describe()` reference
- Fix typos show up in docs
- Fix "it's" in translation.json
- Improve documentation clarity of some of the camera methods
- Group materials on reference page
- Added hindi translations for es6-adoption.md file
- Added example and decription of params of `beginShape()`
- Fixed the documentation for Vector.angleBetween to indicate that it respects `angleMode`.
- Adding missing `</code></div>` in the centerY and centerZ example code
- Remove extra optional text from docs for `describe()`
- Fix typos in descriptions
- Update Maintainers in Contributor Docs
- Fixed errors in hindi translation of contributor docs
- Fixed typo
- Converted some auto-generated links in the reference documentation to same-document references


### New Contributors

😻 **New contributors since last release:** @Nitin-Rana, @sflanker, @pearmini, @osteele, @code4humanity, @JetStarBlues, @JetStarBlues, @ghalestrilo, @TylersGit, @ageonic, @cryptochap, @christhomson, @DavidWeiss2, @leokamwathi, @davepagurek, @Rahulm2310, @smrnjeet222, @maxthomax

You can find all of our contributors in our [ReadMe](https://github.com/processing/p5.js#contributors).

## v1.3.1 — 2021-03-28

- Merge pull request #5060 from ShenpaiSharma/Issue_#5046  9722a0d2
- Merge pull request #5123 from processing/all-contributors/add-b4ux1t3  a509c431
- Merge pull request #5122 from b4ux1t3/small-typo  42748270
- Added missing space.  c84dae06
- Merge pull request #5106 from JuanIrache/main  02416f33
- Merge pull request #5107 from micuat/add-version-const  a1ce015b
- Merge pull request #4989 from fal-works/fix/inline-docs  68ac2be8
- Merge pull request #5103 from duskvirkus/gl-stroke-bug-fix  4c194ec0
- catch crashes of fetch when loading image  5fa7ca93
- docs: add @params tag to windowResized()  d46e5b95
- docs: revert changes in event handler functions remove @return tags (see #4988)  485dc366
- docs: revert changes in windowResized() remove description about "return false" remove @param, @return tags (see #4988)  81499b88
- adding unit tests for p5.RendererGL.prototype.ellipse and p5.RendererGL.arc  105e0e88
- fixing bug for drawing ellipse/arc with detail higher than 50 and improving documentation for ellipse/arc arguments  e395827a
- Merge pull request #5090 from msub2/main  3e1eae2e
- Merge pull request #5093 from lawreka/revert-hyphenation  19fa3101
- remove word breaks and hyphenation  7368adb1
- Using offscreen canvas to extract the pixel data of webgl canvas using CanvasRenderingContext2D.  7240ce60
- Merge pull request #4642 from outofambit/fix-ie11-support  6fe2d80e
- Add check for TypedArrays in applyMatrix  18557561
- Merge pull request #5084 from Aloneduckling/correct-style-example  55af0368
- Merge pull request #4756 from TakumaKira/main  39b4fd7e
- Changed the styles of dom-style examples  1983eed6
- Fixes tint in 2d canvas with webgl p5.Graphics  27fb4ac2
- docs: improve inline docs of key event handlers add @param `[event]`  df8a3ca9
- docs: improve inline docs of event handler funcs add @return as they may `return false`  b7123bc8
- docs: improve inline docs of `windowResized()` add description about `return false`, add @param `[event]`  8a2a4dc7
- docs: fix inline docs of `int()` param `radix` was missing  3d965b4e
- White dot with a small radius is not entirely white.  881cfa33
- Allow drawing point with large scale and small strokeWeight.  dc9ab8f9
- White dot with a small radius is not entirely white.  1fc96687
- Allow drawing point with large scale and small strokeWeight.  0864adb1

https://github.com/processing/p5.js/compare/1.3.0...v1.3.1

## 1.3.0 — 2021-03-10

- removing empty-example link to p5.sound until load functionality is fixed closes #5068  1b931906
- adding note about textFont return type closes #4926  02c7eb11
- adding note about p5 editor to getURL methods closes #5035  7fda84a1
- adding note about cumulative mask property to mask closes #5012  d4aec1ac
- removing unnecessary backslash in blendmode documentation closes #5042  85dc5a0e
- fixing some npm vulnerabilities  6407fbff
- Merge branch 'main' of github.com:processing/p5.js into main  f8cd935d
- Merge pull request #5073 from processing/dependabot/npm_and_yarn/elliptic-6.5.4  8fb8c93e
- Merge pull request #5069 from meodai/main  a20779df
- Merge pull request #5075 from processing/all-contributors/add-Aloneduckling  336389a1
- docs: update .all-contributorsrc [skip ci]  298be5bd
- Merge pull request #5071 from Aloneduckling/p5js-camera-docs  e6b7382b
- docs: update README.md [skip ci]  5ec2075c
- Merge pull request #5074 from processing/all-contributors/add-msub2  7ad3311c
- Merge pull request #5072 from msub2/main  c212eab9
- docs: update .all-contributorsrc [skip ci]  9d87b3f0
- docs: update README.md [skip ci]  6290db33
- these changes are in response to PR comments  d4db58ab
- Bump elliptic from 6.5.3 to 6.5.4  a33b0590
- Remove unused parameters, updated inline examples  e913f92a
- applyMatrix now accepts an array as the first argument  873ef633
- make the example readonly by adding norender class  56a968cc
- replaces the minified version of p5.sound with the plain one in the demo  78b8d37a
- add examples and docs for centerX/Y/Z and upX/Y/Z  8fb358ee
- add documentation for eyeX, eyeY, eyeZ properties  8082db16
- Merge pull request #5055 from satyasaibhushan/remove_space_under_foundation_section  a8afd776
- mention camera opbect properties in the docs  bbe0a71b
- Merge pull request #5063 from processing/saveFrame-typo  acf5f8f6
- fix typo on saveFrames  c77db0ec
- Merge pull request #5062 from processing/all-contributors/add-sosunnyproject  81d87b36
- docs: update .all-contributorsrc [skip ci]  fce32ef2
- docs: update README.md [skip ci]  e0b15da5
- docs: add jcelerier as a contributor (#5059)  f1010c1b
- docs: add vulongphan as a contributor (#5058)  3d838776
- update lights function to handle non-RGB color modes (#5049)  be51645f
- added submodule to Foundation section in reference to remove inconsistencies in spacing  cefdcd7d
- Merge pull request #5052 from rt1301/#5045-filter-doc  f81bb700
- feat:updated p5.Image filter() methods docs  435c321a
- Merge pull request #1 from processing/main  a82db0f5
- Merge pull request #5041 from processing/all-contributors/add-satyasaibhushan  bb4ba44f
- docs: update .all-contributorsrc [skip ci]  60eeae83
- docs: update README.md [skip ci]  b30e5c9a
- delete duplicate "tool" and fix link to avatar  39fcd6e8
- delete comma to fix it  a82557a6
- Fixed link to Mozilla JS practices  eb9b15a4
- Merge pull request #5033 from Prateek93a/update-unit-testing-doc  a765b367
- Merge branch 'hdcola/main' into main  396907da
- Edit Chinese translation of contributor documentation  4f878bcf
- Update unit_testing.md  a8abe642
- Merge pull request #5028 from nakednous/patch-1  0fb94743
- Update .all-contributorsrc  e248e413
- Merge pull request #5026 from processing/all-contributors/add-ShenpaiSharma  2861c2c6
- docs: update .all-contributorsrc [skip ci]  cefcfab3
- docs: update README.md [skip ci]  5c50ff7c
- Merge pull request #5025 from ShenpaiSharma/Issue_#5014  c86c76cd
- Added comment to explain default 10FPS  b933baf2
- Changed frameInfo.delay value whent it is equal to 0  0002ceb1
- Merge pull request #4996 from weslord/static-normalize  5db68fb2
- Merge pull request #5013 from PandaBalls/main  f2f8bb12
- Merge pull request #5020 from processing/all-contributors/add-myselfhimself  0261e251
- Merge pull request #5017 from myselfhimself/patch-1  c2c89928
- docs: update .all-contributorsrc [skip ci]  a4e7cf52
- docs: update README.md [skip ci]  01b5f7b0
- #4866 V texture coordinate inversion on OBJ loadModel  2b6302d2
- fix saveTable() issue  46b7e950
- translation into Chinese  ae90c376
- Merge pull request #5008 from processing/add-self-as-steward  23db9e67
- added myself as steward  4218dd10
- Add self as steward  5b16ce01
- Merge pull request #5003 from choxi/offscreen-render-bug  35f23125
- Fixes offscreen rendering bug  4b146e40
- Add tests for p5.Vector.normalize()  41431349
- Add static version of Vector.normalize()  3d34b2e9
- Make p5.Vector.mag() comments consistent with others  18dbd51a
- Merge pull request #4986 from siv2r/patch-1  96886878
- Update .all-contributorsrc  426b6935
- Merge pull request #4979 from Aloneduckling/DOM-examples-corrected  f326680c
- Merge pull request #4972 from siv2r/static-rotate  2c1a6931
- Merge pull request #4984 from limzykenneth/color_toString  49f2a519
- Fix typo in color toString method  8d7a063a
- Merge pull request #4981 from processing/all-contributors/add-frappelatte28  c1da5e2a
- docs: update .all-contributorsrc [skip ci]  a6ac09cd
- docs: update README.md [skip ci]  fa1264fb
- improved checks for static p5.Vector rotate()  0b89c6fb
- Merge branch 'main' into DOM-examples-corrected  efcfe58a
- better checks for rotate (static function)  b5abdddb
- Merge pull request #4819 from Aloneduckling/add-DOM-example  54b6f0b9
- removed no render class, and corrected the styling of DOM examples for better display  48d309ce
- added example for rotate func (static implementation)  f25907b1
- removed addtional param description for angle  2ab9ab10
- added rotate (static function) for p5.Vector  998d10ca
- Merge pull request #4901 from Vamoss/main  8741583b
- Merge pull request #4963 from processing/all-contributors/add-siv2r  176bf5d9
- docs: update .all-contributorsrc [skip ci]  95240abf
- docs: update README.md [skip ci]  bd382c12
- Merge pull request #4962 from siv2r/fix_typos-inline_documentation  f77c8e6f
- remove smooth option from quad function (original restored)  df81685f
- Merge branch 'main' of https://github.com/processing/p5.js into main  253eec5c
- added npm run before grunt  c709728f
- renamed yuidoc-p5-theme-src to yuidoc-p5-theme  321cfe38
- fixed broken link  daf46051
- changed definition to description  f4a5e1f7
- added line break before the template image  e8b9dc7d
- Merge pull request #4959 from limzykenneth/pupeteer-update  174e5794
- Add linux sandbox flag to puppeteer command  e9f04db7
- Update puppeteer to latest version  94e99fde
- Merge branch 'main' of https://github.com/processing/p5.js into main  549133f4
- Smooth Quad Distortion (relates to #4288)  75b8afdf
- examples now showing, removed spaces which caused error during build  2155745a
- removed norender class, DOM examples now working  ea6fc593

https://github.com/processing/p5.js/compare/v1.2.0...v1.3.0

## 1.2.0 — 2020-12-20

_(no notes)_

## 1.1.9 — 2020-07-23

- downgrade np to fix 2FA problem  c3edea7c

https://github.com/processing/p5.js/compare/v1.1.8...v1.1.9

## 1.1.7 — 2020-07-22

_(no notes)_

## 1.1.5 — 2020-07-22

- updating gitignore for parameterData.json trying to fix build error  7b582aa9
- updating path for parameterData.json trying to fix build error  379127d5

https://github.com/processing/p5.js/compare/v1.1.4...v1.1.5

## 1.1.4 — 2020-07-22

- adding documentation for build tasks  711c2c86

https://github.com/processing/p5.js/compare/v1.1.3...v1.1.4

## 1.1.3 — 2020-07-22

* standardize documentation formatting
* translation of contributor docs
* expand FES coverage
* add i18n for FES parameter validation
* remove parameterData from minified library
* bug fixes for saveGIF, DOM, webgl methods
* expand unit test coverage
* add ssv option for loadTable
* add fileType param to loadModel
* fixes to build process

## 1.0.0 — 2020-02-29

Read about 1.0 release here: https://medium.com/processing-foundation/p5-js-1-0-is-here-b7267140753a

* adding documentation and diagram for graphics objects
* Fix issue with trying to draw non-existent strokes
* add i18n contributor guide
* add i18next / 18n support for friendly error system messages
* add i18n contributor guide
* updating documentation for rotation constants 
* take angleMode into consideration for rotationXYZ
* fix cylinder and cone uv bug
* Start counting millis() just before setup() is called
* Add support for twitter polling
* Always depthMask when buffer is present
* Remove background caching and blend when non-standard blendMode 
* Removed legacy printMatrix method
* Add third argument to position method
* Remove benchmarking code from the repo
* Added static method of rem() and its documentation
* Added support for arrays as argument in math methods
* added rem() method on p5.Vector
* Add line-break support to saveStrings function
* updating reset of 3d primitives to check for stroke before printing warning
* Remove alpha args from specular/ambientMaterial
* p5.sound 0.3.12
* Update issue templates 
* Added disable method for createSelect element
* Make perPixelLighting the default
* allow rect() to use just 3 parameters for a square, similar to how ellipse() allows 3 params
* Fix iOS lighting issues
* Set webgl default to TRIANGLE_FAN 
* Updated developer_docs in preparation for Developer Docs website
* Only enable vertexAttribute once, and blending fix
* Better array equal method
* Only change blend state in GL when necessary
* Better background caching
* adding style guide notes for yuidoc
* updating code style guide
* merge p5.dom into core
* Making alt text field for images 
* add more autoplay error catching logic
* use autoplay error helper 
* add friendly autoplay error helper 
* use FES for failed manual media play
* Adding image element to createImg callback 
* Added fract() method to calculation.js

## 0.10.2 — 2019-10-14

* expanding foundational JS docs
* fix release task

## 0.10.0 — 2019-10-14

- merge p5.dom.js into p5.js
- update source and samples to ES6

- add erase() and noErase()
- pointer lock API
- promise-based preload
- add optional crossOrigin parameter to createImg()
- require alt text when creating images
- remove _pixelsDirty
- angleBetween() now returns value between -PI and PI

- copy() now works with 2D and WebGL
- perPixelLighting fixed in Android 8+ for WebGL
- zoom sensitivity for orbitControl
- specularColor() for WebGL mode
- frustum() for WebGL mode
- clear depth every frame in WebGL mode
- emissive() lighting for WebGL mode
- spotLight() lighting for WebGL mode
- removeLights() function for WebGL mode
- falloff() for lighting in WebGL mode
- loadModel() can now load .stl files

## 0.9.0 — 2019-07-02

* Implement 'deltaTime' global variable
* Added falloff function
* default drawMode as FILL in WebGL
* improved uniform names
* unify lighting
* Add Tint support in WebGL
* add localStorage support
* 3D createGraphics setAttributes working
* removing sync option
* add p5-test suite
* fix updatePixels bug
* fix onBlur undefined return
* fix text to bindTextures during shader initialization 
* fix directional light direction calculation wrt. view matrix
* Fix nfs()
* fix mouseX, mouseY and touchX, touchY for noCanvas 
* fix video.get()
* fix createCapture loaded event to wait for metadata
* fix mobile safari for touch event duplication
* add unit tests for jsonp
* add mouse events unit tests
* core/attributes.js: add unit tests
* core/transform.js: add unit tests
* core/p5.Element.js: add more unit tests
* events/mouse.js: add unit tests
* events/keyboard.js: create unit tests
* events/touch.js: create unit tests
* image/pixels.js : add unit tests
* image/filters.js: add unit tests
* upgrade mocha
* port node tests to tdd style
* move config to task runner
* add recommended extensions for vscode
* add eslint plugin
* add grunt-simple-nyc

## 0.8.0 — 2019-04-08

* updated reference examples to ES6
* updated dev docs to ES6
* fix p5.dom drop() function
* add toggleClass(), hasClass(), addClass() methods to p5.dom
* fix get() method for createCapture()
* fix style() function for positioning
* fix normals for cylinder() and cone()
* fix arc()
* fix handling of keyboard events with multiple sketch instances
* fix for pixel updating
* add p5.Graphics.reset()
* fix for circle() to take diameter instead of radius
* fix for square() to accept corner radius argument
* fix Infinity handling for int(), float(), hex()
* fix texture wrapping
* add image() to webgl mode
* added blendMode() to webgl mode
* add resetShader() method
* add lights() function to webgl mode
* implemented shininess()
* setAttributes() can be called before gl canvas is created

## 0.7.3 — 2019-01-20

* added `circle()` and `square()` functions
* add `BOLDITALIC` option for `textStyle()`
* fix webgl triangle strip, triangles, stroke issue with 2D vertex
* updates to p5.XML
* improve `loadX()` tests
* updates to p5.Sound library
* updated many examples to ES6

## 0.7.2 — 2018-09-02

* fix for element.mousePressed() bug
* updates to webgl mode
* update test/ filenames to match src/

## 0.7.1 — 2018-08-10

* fix for npm install of p5
* merged gsoc reports
* added color picker to p5.dom

## 0.7.0 — 2018-08-10

* update and move `developer_docs`
* update reference build process
* update parameter checking and FES
* webgl fixes
* rearrange and rename files in `core/` folder
* fix pixelDensity issues
* remove phantomJS testing, add mochaChrome
* fixes to createVideo()

## 0.6.1 — 2018-04-28

* rename PrintWriter.flush() to PrintWriter.clear()
* fixes to webgl mode
* added default class to p5 instances
* deprecated array methods
* added examples
* reference fixes

## 0.6.0 — 2018-01-20

* Add all-contributors to README
* Replace jscs and jshint with eslint 
* Add code lint autofix using prettier 
* Fix global doubleClicked event not firing
* Fix double click function not firing for p5.Element 
* Updates to param validation
* Added karma benchmarking
* Enable self-hosting yui docs
* Improvements to yuidocs and reference
* Make 'rotate' default to Z-axis
* Improvements to p5.Vector
* WEBGL lighting updates
* Adding custom shader support
* Clarify gruntfile

## 0.5.16 — 2017-10-12

* major webgl updates (see https://mlarghydracept.github.io/GSOC17/ and http://www.katehollenbach.com/gsoc-2017/)
* add detach event listener support
* fix image() docs
* fix frameCount increment
* fixes to docs and tests

## 0.5.14 — 2017-08-29

* remove CSS styling from FES
* merge release automation tasks!

## 0.5.13 — 2017-08-26

* adding friendly error system updates
* update docs

## 0.5.12 — 2017-08-12

* adding p5.StringDict, p5.NumberDict, p5.TypedDict
* fix to textWidth()
* fix bug with preload() / decrementPreload
* fix bug with frameRate()
* cache fillStyle and strokeStyle to improve performance
* fix to webgl immediate mode to improve performance
* added #rgba and #rrggbbaa support
* added doubleClicked() function
* added constants DEG_TO_RAD & RAD_TO_DEG
* reorganization of unit tests to support modularization
* fixes and examples added to docs
* update opentype to 0.5.7
* fix for loadFont()
* updates to p5.dom to support checkbox and radio input elements
* added issue template
* update p5.sound 0.3.5
* update p5.dom 0.3.4

## 0.5.11 — 2017-06-01

* fix for mouseDragged
* fix to text bounds detection
* adding ability to change options for createSelect()
* change angleBetween to instance method
* fix tint() for p5.Graphics
* documentation example fixes

## 0.5.10 — 2017-05-18

* patch for mouseIsPressed bug
* add support for numbers in httpDo()
* check extension for loadTable

## 0.5.9 — 2017-05-10

* enable select() for existing dropdown element
* fix httpPost, httpGet
* add default application/json header for httpGet
* fixing broken select() on touch issue (duplicate touch/mouse event firing issue still exists in some browsers)
* change getNumber() to getNum()
* handle empty cell for p5.Table getNum()
* handling of blank lines in p5.Table
* fix saveTable() function, now currently formats output
* remove need for type argument in saveTable()
* fix map() with HSB constrained values
* update opentype to 0.6.9
* textFont() now returns current font
* webgl shape texturing fix
* reference updates for updatePixels() and loadPixels()
* reference updates for filter() documentation

## 0.5.8 — 2017-03-25

* Switched from reqwest to fetch for loadX() methods
* New signatures for `httpDo()`
* Change `loadTable()` and `loadStrings()` to use `httpDo()` for consistency
* Fix blendMode switching in FF
* Fix mousePressed issues in Chrome
* Fix for `keyIsPressed()` function
* Fix for `textToPoints()` function
* Fix `frameRate()` docs
* Fix `color()` documentation
* Fix video `removeCue()` function
* Added docs for loading screen
* Added ISSUE_TEMPLATE.md
* Updated mocha-grunt and other modules to fix build errors

## 0.5.7 — 2017-02-09

- default params for perspective()
- fix for keyIsPressed()
- fix textBound() bug
- fix css cursors not appearing
- fix touchEnded() bug
- fix saveCanvas() bug
- add remove() method for p5.Graphics
- fix typos in documentation and examples

## 0.5.6 — 2017-01-03

- fix touchX/Y updating
- added default params for ortho()
- added type param for createInput()
- fix to image() drawing for DOM elements
- fix p5.Vector.rotate()
- updates to reference documentation and examples

## 0.5.5 — 2016-12-05

- fix loadPixels()
- webgl / general cleanup
- webgl / fix camera near and far planes and orthographic camera
- fix for colors rgbaToHSLA and hslaToRGBA fix
- update order of arguments for image()
- update p5.sound to 0.3.2
- update p5.dom to 0.4.15
- remove touchX/Y
- take scaling into account with mouse
- remove validateParameters legacy code
- fix seeding for randomGaussian
- fix get() to return area when requested

## 0.5.4 — 2016-10-01

- add functionality for accessibility alt text for reference examples
- fix winMouseX/Y vars
- fix windowWidth, windowHeight vars
- fix to loadJSON method
- fix image resize() method
- add continuous slider functionality to createSlider() function
- documented and add tests for on demand global mode
- add support for mask() function in p5.MediaElement
- change println() to print(). remove println()
- update sound version 0.3.1

## 0.5.3 — 2016-08-18

- improvements to documentation
- performance enhancement of get()
- removing print() method
- add access to p5 instance from global scope
- fix for windowWidth and windowHeight
- add optional param to redraw() to control number of redraws
- add removeAttribute() function (p5.dom)
- fixes to 2D primitives in webgl mode
- cleanup and refactoring of webgl code
- add property to p5 to disable friendly errors
- added alt text capability for reference

## 0.5.2 — 2016-06-17

- fix bug with rotate()
- fix bug with webgl texture, so no longer requires p5.dom included
- fix handling of mouseX/mouseY
- fix p5.Color methods and string handling
- update documentation
- fix webgl lights, material, and geometry

## 0.5.1 — 2016-06-10

- doc fixes
- improvements to docs to load faster
- fix to push/pop bug causing accumulating transformations
- improvements to textures in webgl mode
- renames p5.Renderer3D to p5.RendererGL
- fixes for font alignment bugs, updates to docs
- fix for capture width/height bug

## 0.5.0 — 2016-05-02

- major WebGL / 3D fixes and updates
- OBJ loader functionality added
- minor updates to documentation

## 0.4.24 — 2016-04-25

- Fixed bug with shearX/Y
- Fixed bug with p5.Image.blend()
- Fix bugs with push()/pop() on draw() loop
- Fix loadPixels() bug ONCE AND FOR ALL (hopefully?)
- p5.XML implemented
- Add an 'init' registerMethod() type
- Documentation and example improvements
- Preprocess docs descriptions as Markdown for better display
- Added yuidoc preprocessor for overloaded methods
- Log helpful warnings if user overwrites p5 globals

## 0.4.23 — 2016-03-04

- Fix typos in docs.
- Added examples.
- Fix to loadTable() to handle files with no header.
- Cleanup of color functions to support colorMode with p5.Graphics.
- Better friendly error help for top level p5 function calls.
- Fix bug with get()/loadPixels() in capture.
- Fix to style().
- Removed p5.Element.rotate() and p5.Element.translate().
- Add speed() method for video playback.

## 0.4.22 — 2016-02-04

- p5.sound v0.3.0
  - fix p5.SoundFile memory leak
  - error handling for loadSound and createConvolver
  - ensure that all p5.sound objects can be disposed
  - many improvements to p5.Env including new methods: `setADSR()`, `setRange()`, `ramp()`, `setExp()`
  - add p5.FFT `getCentroid()`
- p5.dom v0.2.7
- p5.MediaElement size() fix for loadPixels
- fix text() errors when font is loaded outside of preload() && preload() exists
- fix keyPressed event firing
- fix image.resize() auto-resize
- documentation updates

## 0.4.21 — 2016-01-05

- documentation cleanup
- updates to yuidoc tasks
- add minify p5.dom.js task to grunt
- added p5.Font.textToPoints()
- cleanup style() function and added examples
- fix set()/get() to round to integer pixel vals
- fix mouse coords to update on frame correctly
- fix for accumulating transforms across draw calls

## 0.4.20 — 2015-12-11

### bug fixes
- fix tint() for capture
- fixes to p5.MediaElement
- fix to mouse wheel event

### features
- child() returns array of children if called with no args
- add top level help warnings for random(), color() outside setup/draw
- added tests, optimized run time
- added modernizr.js to test suite to check browser functionality before running tests
- added ellipsoid

### documentation
- added fault tolerance for failed examples in ref pages
- fixed frameRate() example
- remove duplicate references files in docs folder
- setup helpers.js and grunt tasks to handle building local dev vs production versions of the reference

### workflow
- add preliminary saucelabs integration
- update to p5.sound

## 0.4.19 — 2015-11-11

- crucial bug fix for broken webgl mode in 0.4.18
- updated select() and selectAll() methods

## 0.4.18 — 2015-11-09

p5.dom
- add center() function
- add createRadio() function
- fix to select() to work with more objects
- .style() now works with loadFont() 

p5.sound
- update to version 0.2.16

webgl
- fixes to texture binding
- add 3D distance function
- various updates and fixes

core
- add identifier to touch objects
- add error callbacks for load functions
- fix to loadPixels() for capture
- fix to capture when drawing into canvas using image()
- change from devicePixelScaling() to pixelDensity()
- round pixelDensity to int to fix firefox
- color refactor
- fix to saveStrings()
- handling of dragging with mouseIsPressed variable
- added docs and tests for dom

## 0.4.17 — 2015-10-13

critical bug fix to enable webgl

## 0.4.16 — 2015-10-12

- fix to callbacks with preload
- updated p5.dom docs
- disable window.devicemotion event for p5 IDE (was causing crash)
- fix to loadXML
- auto-incrementing defaultCanvas id for each instance of p5 on page

## 0.4.15 — 2015-10-06

- critical bug fix that was breaking loading, text, and other functionality
- updates to p5.dom

## 0.4.14 — 2015-10-05

- WEBGL mode! 3D, lights, camera, etc
- fixes to preload, now allows callback
- error message for loadJSON and loadStrings
- createSlider fix
- expose all arguments of drawImage() to image()
- optimization of arguments slice
- fixes to rotation and acceleration functionality

## 0.4.13 — 2015-09-20

- fix to `splitTokens()
- fix to `createFileInput()
- fix to reading text from dropzone
- minor updates to documentation
- update p5.sound

## 0.4.12 — 2015-09-16

- critical bug fix for image loading and other image and pixel functionality

## 0.4.10 — 2015-09-13

- fix to `get()`
- refactor of `p5` variables to support `p5.graphics` objects holding their own style properties
- cleanup of typography method calls
- temporary removal of friendly errors

## 0.4.9 — 2015-09-01

- fixed preload method
- improved docs for noise
- additions and improvements to p5.dom

## 0.4.8 — 2015-08-18

- fixes to acceleration functions
- add `deviceShaken()`
- 3D updates
- improved font tests
- add callback for `loadFont()`
- fixes to `colorMode()` and `color().toString()`
- rename `fullscreen()` to `fullScreen()`
- grunt task improvements, browserify compatibility added

## 0.4.7 — 2015-07-17

- fix set()
- fix resetMatrix()
- fix to arc()
- font optimizations, textAscent() and textDescent()
- fix text wrapping
- rename of accelerometer methods to deviceTurned() and deviceMoved()
- improvements to npm and grunt processes
- added JSCS for linting
- removed built lib from repo
- progress on 3D

## 0.4.6 — 2015-06-24

- Added code of conduct (contributing.md).
- Refactored graphics to have separate rendering contexts for Canvas and WebGL renderers. Added `p5.Renderer`, `p5.Renderer2D`, and `p5.Renderer3D`. Began implementation of `p5.Renderer3D`.
- Added `p5.Font` class and support for `loadFont()` and various typography functions.
- Refactored codebase to have more reasonable folder structure, changed require links within files to use relative paths.
- Fixes to frameRate issues.
- Fixes to `p5.Color` and related functions, added support for HSLA.
- Added browser-specific checks for the various smoothings.
- Updates to documentation throughout.
- Fixed arc method (in progress).
- Implemented `loadXML()`.
- Fixed bugs with `nf()`.
- Fixed issues with pixels and retina.
- Cleaned up gruntfile.
- Added friendly error messages.

## 0.4.5 — 2015-05-27

- fix lerpColor()
- updated DOM examples
- fix to touch events
- added support for char(), int(), byte(), etc
- updated inline doc

## 0.4.4 — 2015-04-13

- added p5.Vector `equals()` method
- `createCapture()` now supports constraints object and callback
- added support for color strings
- fixed touchX and touchY coords
- updated documentation

## 0.4.3 — 2015-03-30

fixes and improvements to loadTable and p5.Table
helper in text() function to handle non-string input
added accelerometer functions
added documentation
fixes for name of event handler methods

## 0.4.2 — 2015-02-16

- fix to loadJSON()
- fixes to p5.Color + tests

## 0.4.1 — 2015-02-13

- Refactor `p5.Color` to fix bugs.
- Fix `preload()` to avoid losing additional args, support `loadTable()`.
- Adding `p5.File` functionality to p5.dom.js, including open and drag and drop.
- Fix for `mask()` function to fix incorrect inversion of alpha.
- Fix to `arc()` function to support cases where `w !== h`.
- Wrapping modules to support amd/browserify.
- Fixes to `p5.Vector()`.

## 0.4.0 — 2015-02-02

- fixes to background and pixels so they're not affected by transforms
- added async option for instantiation
- updates to p5.sound and p5.sound docs
- p5.dom amd module wrapper
- added touchIsDown variable
- added optional failure callback to loadImage

## 0.3.16 — 2015-01-08

- UMD compatible
- added documentation and minor fixes

## 0.3.15 — 2014-12-23

- fix nfc
- remove overwrite of escape function
- added documentation
- added httpDo method
- added url helper methods

## 0.3.14 — 2014-12-10

- added element specific touch listeners, and default fallbacks for mouse/touch
- added devicePixelScaling() method
- added httpGet and httpPost methods
- added support for \n and \t in text()
- added key clearing for keyIsDown() method onblur
- merged p5.sound updates
- fixed bug with getElements()
- fixed bug with loadPixels in capture

## 0.3.13 — 2014-12-04

fixing small bugs with blendMode
added keyIsDown() method
refactor curves to support shape mode and improve performance

## 0.3.12 — 2014-11-24

added loadJSON type argument
fixes to p5.dom, capture pixel support, context passing for event listeners
optimization of image methods to support fewer arguments
bug fixes
examples added to inline src

## 0.3.11 — 2014-11-03

Updates to mouse and touch functionality.
Fixes to frameCount starting frame and webcam tint checks.

## 0.3.9 — 2014-10-10

fix bugs with scaling for retina
fix bug with push/pop in p5.Graphics
fix preload bug
improved canvasResize function
adding int and string methods

## 0.3.8 — 2014-09-25

- updated mouse prevent default behavior
- improved mouse and touch documentation
- fixed bugs with key input for firefox
- fixed scaling bugs for retina

## 0.3.7 — 2014-09-19

minor fixes and bower integration

## 0.3.6 — 2014-09-11

adding noCanvas(), windowResized(), better default handling for mouse and touch, support for child() and parent() node arguments, improvements to save() methods, small bug fixes

## 0.3.5 — 2014-08-28

fixing bugs with text(), ellipse(), and loadPixels() for video

## 0.3.4 — 2014-08-27

updated p5.sound, much improved save function, fixed bugs related to library hooks.

## 0.3.3 — 2014-08-17

Improved mouse/touch fallback handling, window resize updating fixed, other small fixes and additions.

## 0.3.2 — 2014-08-09

Fixing bugs with push and pop, storing pointer to canvas context for speed optimization, other small fixes, updated documentation.

## 0.3.0 — 2014-08-06

Updates to p5.sound and p5.dom libraries. Bug fixes for color. Updated documentation.

## 0.2.23 — 2014-07-31 (prerelease)

Preliminary alpha release, testing webhooks and github release workflow. Optimizing color, pixels, math.

## 0.2.22 — 2014-07-21 (prerelease)

Preliminary alpha release, testing webhooks and github release workflow.

