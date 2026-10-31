---
source: https://gsap.com/docs/v3/Plugins/Physics2DPlugin
title: "Physics2D"
fetched: 2026-10-28
---

# Physics2D

Quick Start

#### CDN Link

Copy

```
gsap.registerPlugin(Physics2DPlugin) 
```

#### Minimal usage

```
gsap.to(element, {
  duration: 2,
  physics2D: { velocity: 300, angle: -60, gravity: 400 },
});
```

## Description[​](#description "Direct link to Description")

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/YzdOVbK)

```
<div class="container">
  <div class="wrapper">
    <h4>Click anywhere to fire the Flair Cannon!</h4>
    <div class="cannon flair"></div>
    <div class="flair-container"></div>
  </div>
</div>
```

```
html, body {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

h4 {
  color: var(--mid);
  position: absolute;
  width: 100%;
  left: 0;
  right: 0;
  top: 1rem;
  text-align: center;
  pointer-events: none;
}

.container {
  position: relative;
  width: 90vw;
  height: 90vh;
  max-width: 90vh;
  max-height: 90vw;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-radius: 9px;
  background: #0e100f;
}

.wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  overflow: hidden;
}

.cannon {
  position: relative;
  z-index: 10;
  background: transparent;
}

.flair-container {
  width: 50px;
  height: 50px;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}

.flair {
  width: 50px;
  height: 50px;
  background-image: url("/demo-assets/flair.webp");
  background-size: contain;
  background-repeat: no-repeat;
}

.flair-bullet {
  position: absolute;
  top: 0;
  left: 0;
  width: 50px;
  height: 50px;
  will-change: transform;
  opacity: 0;
}

.flair--2 {
  background-image: url("/demo-assets/flair-2.webp");
}

.flair--3 {
  background-image: url("/demo-assets/flair-3.webp");
}

.flair--4 {
  background-image: url("/demo-assets/flair-4.webp");
}

.flair--5 {
  background-image: url("/demo-assets/flair-5.webp");
}

.flair--6 {
  background-image: url("/demo-assets/flair-6.webp");
}

.flair--7 {
  background-image: url("/demo-assets/flair-7.webp");
}

.flair--8 {
  background-image: url("/demo-assets/flair-8.webp");
}

.flair--9 {
  background-image: url("/demo-assets/flair-9.webp");
}

.flair--10 {
  background-image: url("/demo-assets/flair-10.webp");
}

.flair--11 {
  background-image: url("/demo-assets/flair-11.webp");
}

.flair--12 {
  background-image: url("/demo-assets/flair-12.webp");
}

.flair--13 {
  background-image: url("/demo-assets/flair-13.webp");
}

.flair--14 {
  background-image: url("/demo-assets/flair-14.webp");
}

.flair--15 {
  background-image: url("/demo-assets/flair-15.webp");
}

.flair--16 {
  background-image: url("/demo-assets/flair-16.webp");
}

.flair--17 {
  background-image: url("/demo-assets/flair-17.webp");
}

.flair--18 {
  background-image: url("/demo-assets/flair-18.webp");
}

.flair--19 {
  background-image: url("/demo-assets/flair-19.webp");
}

.flair--20 {
  background-image: url("/demo-assets/flair-20.webp");
}

.flair--21 {
  background-image: url("/demo-assets/flair-21.webp");
}

.flair--22 {
  background-image: url("/demo-assets/flair-22.webp");
}

.flair--23 {
  background-image: url("/demo-assets/flair-23.webp");
}

.flair--24 {
  background-image: url("/demo-assets/flair-24.webp");
}

.flair--25 {
  background-image: url("/demo-assets/flair-25.webp");
}

.flair--26 {
  background-image: url("/demo-assets/flair-26.webp");
}

.flair--27 {
  background-image: url("/demo-assets/flair-27.webp");
}

.flair--28 {
  background-image: url("/demo-assets/flair-28.webp");
}

.flair--29 {
  background-image: url("/demo-assets/flair-29.webp");
}

.flair--30 {
  background-image: url("/demo-assets/flair-30.webp");
}

.flair--31 {
  background-image: url("/demo-assets/flair-31.webp");
}

.flair--32 {
  background-image: url("/demo-assets/flair-32.webp");
}

.flair--33 {
  background-image: url("/demo-assets/flair-33.webp");
}

.flair--34 {
  background-image: url("/demo-assets/flair-34.webp");
}

.flair--35 {
  background-image: url("/demo-assets/flair-35.webp");
}

@media (min-width: 768px) {
  .flair,
  .flair-container {
    width: 100px;
    height: 100px;
  }
}
```

```
console.clear();

const masterTl = gsap.timeline({
  paused: true,
});
const cannon = document.querySelector(".cannon");
const angle = 20;
const tl1 = gsap
  .timeline()
  .to(cannon, {
    rotation: -angle,
    duration: 0.65,
    ease: "power1.inOut"
  })
  .to(
    cannon,
    {
      rotation: angle,
      ease: "power1.inOut",
      duration: 1,
      repeat: 3,
      yoyo: true
    }
  )
.to(cannon, {
    rotation: 0,
    duration: 0.65,
    ease: "power1.inOut"
  });

const bullets = [];
const bulletsContainer = document.querySelector(".flair-container");
const tl1Time = tl1.duration();

for (i = 0; i < 40; i++) {
  const className = "flair--" + gsap.utils.random(2, 35, 1);
  flairBullet = document.createElement("div");
  flairBullet.setAttribute("class", "flair flair-bullet " + className);
  bulletsContainer.appendChild(flairBullet);
  bullets.push(flairBullet);
  gsap.set(flairBullet, { scale: "random(0.4, 0.6)" });
}

const tl2 = gsap
  .timeline()
  .to(bullets, {
    opacity: 1,
    duration: 0.25,
    stagger: {
      amount: tl1Time
    }
  })
  .to(
    bullets,
    {
      duration: tl1Time,
      physics2D: {
        velocity: "random(600, 850)",
        angle: () => 270 + gsap.getProperty(cannon, "rotation"),
        gravity: 600
      },
      stagger: {
        amount: tl1Time
      }
    },
    0
  );
masterTl
  .add(tl1, 0)
  .add(tl2, 0)
  .play();
window.addEventListener("click", () => masterTl.restart());
```

Plugins[Physics2DPlugin](/docs/v3/Plugins/Physics2DPlugin.md)

Provides simple physics functionality for tweening an Object's `x` and `y` coordinates (or `left` and `top`) based on a combination of `velocity`, `angle`, `gravity`, `acceleration`, `accelerationAngle`, and/or `friction`. It is not intended to replace a full-blown physics engine and does not offer collision detection, but serves as a way to easily create interesting physics-based effects with the GreenSock Animation Platform.

## **Config Object**[​](#config-object "Direct link to config-object")

* ### Property

  ### Description

  #### velocity[](#velocity)

  Number - The initial velocity of the object measured in pixels per time unit. Default: `0`.

* #### angle[](#angle)

  Number - The initial angle (in degrees) at which the object should travel. This only matters when a `velocity` is defined. For example, if the object should start out traveling at -60 degrees (towards the upper right), the `angle` would be `-60`. Default: `0`.

* #### gravity[](#gravity)

  Number - The amount of downward acceleration applied to the object, measured in pixels per second. You can either use `gravity` or `acceleration`, not both because `gravity` is the same thing as `acceleration` applied at an `accelerationAngle` of `90`. Think of gravity as a convenience property that automatically sets the `accelerationAngle` for you. Default: `null`.

* #### acceleration[](#acceleration)

  Number - The amount of acceleration applied to the object, measured in pixels per second, it would be measured per frame). To apply the acceleration in a specific direction that is different than the angle, use the `accelerationAngle` property. You can either use `gravity` or `acceleration`, not both because `gravity` is the same thing as `acceleration` applied at an `accelerationAngle` of `90`. Default: `null`.

* #### accelerationAngle[](#accelerationAngle)

  Number - The angle at which acceleration is applied (if any), measured in degrees. So if, for example, you want the object to accelerate towards the left side of the screen, you’d use an `accelerationAngle` of `180`. If you define a `gravity` value, it will automatically set the `accelerationAngle` to `90` (downward). Default: `null`.

* #### friction[](#friction)

  Number - A value between 0 and 1 where 0 is no friction, 0.08 is a small amount of friction, and 1 will completely prevent any movement. This is not meant to be precise or scientific in any way, but it serves as an easy way to apply a friction-like physics effect to your tween. Generally it is best to experiment with this number a bit - start with very small values like 0.02. Also note that friction requires more processing than physics tweens without any friction. Default: `0`.

* #### xProp[](#xProp)

  String - By default, the `x` property of the target object is used to control x-axis movement, but if you’d prefer to use a different property name, use `xProp` like `xProp: "left"`. Default: `"x"`.

* #### yProp[](#yProp)

  String - By default, the `y` property of the target object is used to control y-axis movement, but if you’d prefer to use a different property name, use `yProp` like `yProp: "top"`. Default: `"y"`.

info

Parameters are not intended to be dynamically updateable, but one unique convenience is that everything is reverseable. So if you spawn a bunch of particle tweens, for example, and throw them into a timeline, you could simply call `reverse()` on the timeline to watch the particles retrace their steps right back to the beginning. Keep in mind that any easing equation you define for your tween will be completely ignored for these properties.

## Usage[​](#usage "Direct link to Usage")

```
gsap.to(element, {
  duration: 2,
  physics2D: { velocity: 300, angle: -60, gravity: 400 },
});
//or
gsap.to(element, {
  duration: 2,
  physics2D: { velocity: 300, angle: -60, friction: 0.1 },
});
//or
gsap.to(element, {
  duration: 2,
  physics2D: {
    velocity: 300,
    angle: -60,
    acceleration: 50,
    accelerationAngle: 180,
  },
});
```

## **Demos**[​](#demos "Direct link to demos")

Check out more [Physics2D demos on codepen](https://codepen.io/collection/AORzWx)
