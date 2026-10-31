---
source: https://github.com/jwagner/simplex-noise.js/releases
title: "jwagner/simplex-noise.js GitHub releases"
fetched: 2026-10-28
---

# jwagner/simplex-noise.js — GitHub releases (8 entries, newest first)

## 4.0.3 — 2024-07-26

- Additional tweaks to __PURE__ annotations to avoid warnings in rollup.js. Contributed by [Damien Seguin](https://github.com/dmnsgn).

## 4.0.2 — 2024-07-10

- Tweaked __PURE__ annotations to avoid warnings in rollup.js. Contributed by [Damien Seguin](https://github.com/dmnsgn).

## 4.0.1 — 2022-10-14

* Explicitly defined the return type of createNoise4D to be NoiseFunction4D. Contributed by [satelllte](https://github.com/satelllte).

## 4.0.0 — 2022-07-23

**This new version completely changes the API**

- Reworked the API so that the noise functions can be imported individually.
  When combined with tree shaking this helps with build sizes.
- Removed the built in version of the ALEA PRNG to focus the library to do only one thing.
   If you want to continue to use it you'll have to install and import it separately.
- Noise functions are a bit faster (~ 20 - 30%).
- Noise values can be different from previous versions
- Input coordinates bigger than 2^31 may not result in a noisy output anymore.
  If you have a use case that is affected by this change, please file an issue.
- Test coverage is now at 100%.
- A big thank you to @mreinstein, @redblobgames and everyone else involved
  for their comments and PRs which motivated me to create this new version.

## 3.0.1 — 2022-01-04

## What's Changed
* Updated examples to es6 by @amilajack in https://github.com/jwagner/simplex-noise.js/pull/26
* Fix source map warnings by @jwagner in https://github.com/jwagner/simplex-noise.js/pull/44

## New Contributors
* @amilajack made their first contribution in https://github.com/jwagner/simplex-noise.js/pull/26

**Full Changelog**: https://github.com/jwagner/simplex-noise.js/compare/3.0.0...3.0.1

## 3.0.0 — 2021-08-23

- Changed module structure. When using bundlers that import the es module even using require() the import might need to be updated.
- Dependency update
- Setting sideEffects: false in package.json
- Added snapshot tests
- Code converted to typescript, the package can of course still be used from regular JS
- Dropped bower
- Added support for es modules

## 2.4.0 — 2018-02-10

Included a PRNG based on ALEA to directly allow seeding
Included typescript definitions

## 2.3.0 — 2016-12-31

_(no notes)_

