---
source: https://rapier.rs/docs/user_guides/javascript/getting_started_js
title: "Getting started | Rapier"
fetched: 2026-10-28
---

# Getting started

## Installing Rapier from NPM[â](https://rapier.rs:443/docs/user_guides/javascript/getting_started_js/#installing-rapier-from-npm "Direct link to Installing Rapier from NPM")

Rapier is available as the [@dimforge/rapier2d](https://www.npmjs.com/package/@dimforge/rapier2d) and
[@dimforge/rapier3d](https://www.npmjs.com/package/@dimforge/rapier3d) NPM packages. You may add the following to
your `package.json`:

* Example 2D
* Example 3D

```json
  "dependencies": {
    "@dimforge/rapier2d": "*", // Replace the * by the latest version number.
  }
```

```json
  "dependencies": {
    "@dimforge/rapier3d": "*", // Replace the * by the latest version number.
  }
```

Because Rapier is actually a WebAssembly module, it has to be loaded asynchronously. The following shows a basic
example with a dynamic rigid-body falling on the ground.

* Example 2D
* Example 3D

```js
import('@dimforge/rapier2d').then(RAPIER => {
    // Use the RAPIER module here.
    let gravity = { x: 0.0, y: -9.81 };
    let world = new RAPIER.World(gravity);

    // Create the ground
    let groundColliderDesc = RAPIER.ColliderDesc.cuboid(10.0, 0.1);
    world.createCollider(groundColliderDesc);

    // Create a dynamic rigid-body.
    let rigidBodyDesc = RAPIER.RigidBodyDesc.dynamic()
        .setTranslation(0.0, 1.0);
    let rigidBody = world.createRigidBody(rigidBodyDesc);

    // Create a cuboid collider attached to the dynamic rigidBody.
    let colliderDesc = RAPIER.ColliderDesc.cuboid(0.5, 0.5);
    let collider = world.createCollider(colliderDesc, rigidBody);

    // Game loop. Replace by your own game loop system.
    let gameLoop = () => {
        // Step the simulation forward.
        world.step();

        // Get and print the rigid-body's position.
        let position = rigidBody.translation();
        console.log("Rigid-body position: ", position.x, position.y);

        setTimeout(gameLoop, 16);
    };

    gameLoop();
})
```

```js
import('@dimforge/rapier3d').then(RAPIER => {
    // Use the RAPIER module here.
    let gravity = { x: 0.0, y: -9.81, z: 0.0 };
    let world = new RAPIER.World(gravity);

    // Create the ground
    let groundColliderDesc = RAPIER.ColliderDesc.cuboid(10.0, 0.1, 10.0);
    world.createCollider(groundColliderDesc);

    // Create a dynamic rigid-body.
    let rigidBodyDesc = RAPIER.RigidBodyDesc.dynamic()
        .setTranslation(0.0, 1.0, 0.0);
    let rigidBody = world.createRigidBody(rigidBodyDesc);

    // Create a cuboid collider attached to the dynamic rigidBody.
    let colliderDesc = RAPIER.ColliderDesc.cuboid(0.5, 0.5, 0.5);
    let collider = world.createCollider(colliderDesc, rigidBody);

    // Game loop. Replace by your own game loop system.
    let gameLoop = () => {
        // Step the simulation forward.
        world.step();

        // Get and print the rigid-body's position.
        let position = rigidBody.translation();
        console.log("Rigid-body position: ", position.x, position.y);

        setTimeout(gameLoop, 16);
    };

    gameLoop();
})
```

See the `testbed3d/src/demos` and `testbed2d/src/demos` folders for examples on how to initialize a Rapier physics
world using these bindings.

## Using Rapier without a bundler[â](https://rapier.rs:443/docs/user_guides/javascript/getting_started_js/#using-rapier-without-a-bundler "Direct link to Using Rapier without a bundler")

If you are attempting to use Rapier without a bundler, or if you are using a bundler that doesn't support WASM
files properly, the previous solution will be difficult to get working. The alternative is to use our compatibility
UMD packages `@dimforge/rapier2d-compat` or `@dimforge/rapier3d-compat`. These packages embed the WASM file (encoded
in base64) into the main `JS` file. This results in a slightly different initialization process:

* Example 2D
* Example 3D

```js
import RAPIER from 'https://cdn.skypack.dev/@dimforge/rapier2d-compat';

RAPIER.init().then(() => {
    // Run the simulation.
});

// OR using the await syntax:
async function run_simulation() {
    await RAPIER.init();
    // Run the simulation.
    _run_simulation(RAPIER);
}
run_simulation()
```

```js
import RAPIER from 'https://cdn.skypack.dev/@dimforge/rapier3d-compat';

RAPIER.init().then(() => {
    // Run the simulation.
    _run_simulation(RAPIER);
});

// OR using the await syntax:
async function run_simulation() {
    await RAPIER.init();
    // Run the simulation.
    _run_simulation(RAPIER);
}
```

A complete example can be found [on flems.io](https://flems.io/#0=N4IgtglgJlA2CmIBcAWAnAOgIxYDQgDMIEBnZAbVADsBDMRJEDACwBcxYR8BjAeytbwByEAB4oEAG4ACaAF4AOiABGvAB5KAfKID0EyZoVVxU2VEUgA5gCdeAVypQtu-ZpABfXNToMmAKzIefkFhRggwAAdea1ZpACUAQQAFAEkAUTjpAlswaSU2VgiSJB0dbigqDBIAawBPCJpuaowoeEkdAAEJMAJoy3gdaxoIiHhrACYoAFo+SJpWJQBuIyMaAHcaCFjE1IyMCCotgAoASmWqIz4qElibe0c4+G5YuWkoXm47egEMftY0hDfVgAIVqKSgRwABncHFBISdfvAQfcJFRLABhWCjASPZ6nc6Xfg3aQINGsZgAfQcW2krxhDyerBY8AgljY0h00hQGAADOcrsSbDRJFtarTpMBpGokNIebhpLUZZgABxYaQAKhJQks5Kph1Y7n5RNia2isCg4qo8DW8WS6TiGAA6maIUKRaxamcVlRTdZzRhSTrKdSXlqycH9QSqKVpOjrPB5vBpOSk-SnBcqALbrZYejeLAsa1rAAReAkbjinb2jB5gvQMal8sYT6qaBHIzSaRp3FMtbQckc6TjXAdrs5hnPZms9mc8ZGBEkJEAFSG11g8wg-HbVE73cZGDU0gA1GOUT2MH2oAPZyOd6fYeexSe95PmCy2bFZ-Oo77-dx44mtaFmMRxpkB9YlmW3BehmMZxgmgjSDQby1LQkAVtYrLQFMqhQLUGDelm0iqGoALwEC4rvJ8QKIv8gJCCCYIQpCJHwka1yxCRPbiiRZE0X8wIogcGJYgxPb4t6MYAKqLnkIA3Bu3BKFk0RIdICmsBAGFYdMuFigcNwJlABGZsa0iYZY0CCXhjYVq8VZ7HEOnWbUtktKhdBaaco5VEicS8KwG5bgAsvMzAYKkg4oCcPmLqwK40GuQVUNunadlx+6HieGWTpe15DreaXEeoj7HsVajnm+06fkOo4wYSHHmc5vB4eKv7Gf+CHwE5llQC5RwWVZLWuVB9XRpy8GJmpLa8NA0h8HWRZIawgXcG+FqsLwTW9S5JkNcSC3AZB5aVnaezgUWbkzW2o45b2-bMIOw63SV+5VR+T3ft67XNgBggXSBh0QbZ8qDX1w1jTGjxxeVfEMQA5CQ0hRCQWybjuJBbeS8yyKwiPzbwcyacoCDSH2A4EHYrB2PGyariQvTWGAJAmbx9E-DctQIAG8AEKGkIACTADhr25Q9T3uBEaiQucbPkQxVQetzm0ROKgvC3dU4fbOkvS1GMYAOJIkhjjSHYERQFNKbbdhen4yjaP8CZRGJeEU2vKctKaBKo5EZKajymK7jimDu2sPT66aVuMGdkRtiBVHO6vKHw0YPHyUSXecs0Zzyv04zuSvJC4eJSQkfwEcQtqLr8pC7UusnOZAWJpXwDp4n7hDFAJwy0YhqSZyBs+CSvC8BEGDxPAETrtwSbKGKtT2NY0i8GsO6WMPsCj6rJC1IZYDO2Zhmqx7jdyN7wCjj9x+Z528YAI52GWrAJIcYDJQAYkM9BHK77+CDBfuGY4opAEGMSQNBYBHGPvKH6ml6DHw1NILAPJUEwS4PJeACBnjozIIwcYABmJAPIPBeBAGhXwzYSCBBAFcEIrARB6R9lnRo1Q0wzHzNEGUABicYaA+F8POO4b03CSLMPSqw9hC0uHSG4VgKAAB2GgypuDnE7O9NgMpxg8gAKRqK1HzGUKBlR6NHA7ROMoaDKExrAKm8B9F5WYEY0xVBhEZm4WmcRxFJHjmmNI6wPCCAEKgGgZQWB9GqBWoTGUuj9EaNYDKFBLjOwIEMdIAArLEsxvBUYWKQtY-Mdj9ElySoIGUUxMnJLJg9GUyosmuKMBgxc2DE54JAFgJA4xlQeAALruCAA).

## Rendering Debug Shapes[â](https://rapier.rs:443/docs/user_guides/javascript/getting_started_js/#rendering-debug-shapes "Direct link to Rendering Debug Shapes")

Rapier does not come with any built-in rendering capabilities, so you must do the rendering yourself. However, the debug shape data
can be accessed directly from the physics world instance by calling `debugRender()`.

```js
const { vertices, colors } = world.debugRender();
```

These are each flat arrays filled with shape and color data for every body and collider in the physics world.

The `vertices` array contains point data of where to draw lines while the `colors` array contains the RGBA values to associate
with each line.

info

The colors of each body are not configurable in the current version of Rapier. The colors given will
be based on the type of the given rigid body or collider and the current kinematic state of it.

Below is an example of rendering this data using Pixi.js and Pixi Viewport.

```js
import * as PIXI from "pixi.js";
import { Viewport } from "pixi-viewport";
```

```js
render(world: RAPIER.World) {
    const { vertices, colors } = world.debugRender();

    this.lines.clear();

    for (let i = 0; i < vertices.length / 4; i += 1) {
        let color = PIXI.utils.rgb2hex([
            colors[i * 8],
            colors[i * 8 + 1],
            colors[i * 8 + 2],
        ]);
        this.lines.lineStyle(1.0, color, colors[i * 8 + 3], 0.5, true);
        this.lines.moveTo(vertices[i * 4], -vertices[i * 4 + 1]);
        this.lines.lineTo(vertices[i * 4 + 2], -vertices[i * 4 + 3]);
    }

    this.renderer.render(this.scene);
}
```

An example of this in action can be see in the [Rapier.js testbed code](https://github.com/dimforge/rapier/blob/master/bindings/typescript/testbed2d/src/Graphics.ts).
