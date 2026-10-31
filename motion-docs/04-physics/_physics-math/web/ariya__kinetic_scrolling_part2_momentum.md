---
source: https://ariya.io/2013/11/javascript-kinetic-scrolling-part-2
title: "JavaScript Kinetic Scrolling: Part 2 · ariya.io"
fetched: 2026-10-28
---

# JavaScript Kinetic Scrolling: Part 2

## Nov 25, 2013

[#javascript](https://ariya.io/tags/javascript/)
[#kinetic](https://ariya.io/tags/kinetic/)
[#math](https://ariya.io/tags/math/)
[#physics](https://ariya.io/tags/physics/)
[#web](https://ariya.io/tags/web/)

In the second part of this series of JavaScript [kinetic scrolling](https://ariya.io/tag/kinetic) example, the inertial effect is implemented. This is done by **tracking** the movement while the user is still dragging the view and then **automatically scroll** the view until it stops at some point.

[The first part](https://ariya.io/2013/08/javascript-kinetic-scrolling-part-1.html "JavaScript Kinetic Scrolling: Part 1") already covered the basic drag-and-scroll technique (if you have not read it yet, please do so because the concept will be reused here). Before we add the kinetic effect, let us see first what happens to the scroll offset of a list view as the user taps, drags, and releases his finger.

![tracking](https://ariya.io/images/2013/11/tracking.png)

The shaded area in the above diagram is when the user still *manually* controls the list, he scrolls up and then down and then up again. Right when this user finally releases his finger, the list starts to enter the *automatic* scrolling mode. During this mode, the list starts moving at a certain speed but then it slows down and then eventually it comes to a halt. To carry out the automatic scrolling, it is important to figure out the *initial velocity* right at that release moment. This is done by *tracking* the finger position and computes the velocity, this happens between the tap and release.

![kinetic](https://ariya.io/images/2013/11/kinetic.gif)

If this kinetic scrolling is implemented properly, what we would get is something depicted in the following animation (GIF, forgive the quality). Should you want to play with the live demo, go to [ariya.github.io/kinetic/2](http://ariya.github.io/kinetic/2/) with your favorite modern smartphone. Pay attention to the smooth scrolling as you flick the list. Note that it does not have edge bouncing feature yet, we will cover this in some future episode.

How to **track the velocity** while the user is still dragging and scrolling the list? A simple approach, among a billion possibilities, is to use a periodic timer. When the timer fires, retrieve the current position and use it to compute the velocity. Empirically, tracking the position 10 times per second (a timer interval of 100 ms) proves to be sufficient.

This tracking activity shall start as soon as the user initiates the tap, hence we modify our `tap()` function implementation to look like the following. The key here is that the function `track()` which will be invoked repeatedly as long as we still want to track the velocity.

```javascript
function tap(e) {
    pressed = true;
    reference = ypos(e);
Â 
    velocity = amplitude = ;
    frame = offset;
    timestamp = Date.now();
    clearInterval(ticker);
    ticker = setInterval(track, 100);
Â 
    e.preventDefault();
    e.stopPropagation();
    return false;
}
```

The code for `track()` is quite short. The idea is to compare the current position and time to the previous recorded position and time, `frame` and `timestamp`, respectively. From this delta, the instantaneous velocity `v` is easily obtained. The last line acts as a simple [moving average filter](https://en.wikipedia.org/wiki/Moving_average), this protects us from any wild variation, either from the user’s own erratic movement or from other input noise.

```javascript
function track() {
    var now, elapsed, delta, v;
Â 
    now = Date.now();
    elapsed = now - timestamp;
    timestamp = now;
    delta = offset - frame;
    frame = offset;
Â 
    v = 1000 * delta / (1 + elapsed);
    velocity = 0.8 * v + 0.2 * velocity;
}
```

The `track()` function plays its role during the *manual dragging* (the shaded part in the previous diagram). Once the user releases his finger from the touch device, the situations changes dramatically. Now we have to use the computed launch velocity to decide the next move, as evidenced from the implementation of the following function.

```javascript
function release(e) {
    pressed = false;
Â 
    clearInterval(ticker);
    if (velocity > 10 || velocity < -10) {
        amplitude = 0.8 * velocity;
        target = Math.round(offset + amplitude);
        timestamp = Date.now();
        requestAnimationFrame(autoScroll);
    }
Â 
    e.preventDefault();
    e.stopPropagation();
    return false;
}
```

Compared to the original code (in [Part 1](https://ariya.io/2013/08/javascript-kinetic-scrolling-part-1.html "JavaScript Kinetic Scrolling: Part 1")), there is additional block to trigger the automatic scrolling, `autoScroll` function. The threshold speed of 10 pixels/second is used to prevent any automatic scrolling if the velocity is too low. The launch velocity is used to compute where the scrolling needs to stop, this is the purpose of the `amplitude` variable. The factor *0.8* is tweakable. If you want to make the list feel “heavy” reduce the number. Consequently, a higher factor will give the illusion of a smooth and frictionless list. Updating the scroll offset is the responsibility of `autoScroll()` function. Note how this is trigger using [requestAnimationFrame](http://www.html5rocks.com/en/tutorials/speed/animations/) for a jankfree animation.

![kinetic-differential](https://ariya.io/images/2013/08/kinetic-differential.png)

A typical flick list has a deceleration that is a form of [exponential decay](http://en.wikipedia.org/wiki/Exponential_decay). In other words, the deceleration system is just an **overdamped** [spring-mass system](http://en.wikipedia.org/wiki/Spring%E2%80%93mass_system#Spring.2Fmass_system). Fortunately, it is a standard differential equation and [its solution](http://en.wikipedia.org/wiki/Exponential_decay#Solution_of_the_differential_equation) is rather straightforward (*Å·* is the target position, *A* is the amplitude, *t* is the current time, *Ï* is the time constant).

The math may look scary but the actual code is not that complicated. As long as this `autoScroll()` function still needs to move the list by more than 0.5 pixel, it will be repeatedly invoked. In fact, the following lines of code (it is indeed quite short, isn’t it?) is the heart of this well-known deceleration effect.

```javascript
function autoScroll() {
    var elapsed, delta;
    if (amplitude) {
        elapsed = Date.now() - timestamp;
        delta = -amplitude * Math.exp(-elapsed / timeConstant);
        if (delta > 0.5 || delta < -0.5) {
            scroll(target + delta);
            requestAnimationFrame(autoScroll);
        } else {
            scroll(target);
        }
    }
}
```

The value of `timeConstant` here is quite important. If you want to really mimic iOS (in its UIWebView, [decelerationRate normal](http://developer.apple.com/library/ios/#documentation/UIKit/Reference/UIScrollView_Class/Reference/UIScrollView.html#/apple_ref/doc/c_ref/UIScrollViewDecelerationRateNormal)), the suggested value is 325. This corresponds to a time constant of 325 ms. Math geeks may also realize that with the animation interval of 16.7 ms (from 60 fps), this automatic scrolling effectively reduces the scrolling velocity by a factor of 0.95, which is `Math.exp(-16.7 / 325)`, until it barely moves and therefore the scrolling is stopped completely.

Just to emphasize again, the chart of *position* as a function of *time* for this deceleration is depicted below, created using Google [plot 150\*(1-exp(-t/325))](https://www.google.com/search?q=plot+150*(1-exp(-t%2F325))&oq=plot). You may have seen the tail (last part) of the first diagram showing this kind of exponential decay curve.

![deceleration](https://ariya.io/images/2013/11/deceleration.png)

Note that this kind of automatic scrolling also means that the scrolling will stop, *regardless* of the initial velocity computed earlier, after approximately 1.95 seconds (`6 * 325`). System theory tells us that after the duration of 6x the time constant, the position will be within 0.25% of the target position (mathematically, you can get that from calculating `Math.exp(-6)`). Thus, by choosing the time constant, you can make the list feel light or heavy, depending on your need.

How about the rest of the code? It is, surprisingly, still the same as the one presented in [first part](https://ariya.io/2013/08/javascript-kinetic-scrolling-part-1.html "JavaScript Kinetic Scrolling: Part 1"). There is no need to modify `drag()` function because the behavior is still the same. Also the helper functions need not change at all. Recycling always feels good!

![kinetic-paint](https://ariya.io/images/2013/08/kinetic-paint.png)

To see the full JavaScript code (roughly 130 lines), check the repository [github.com/ariya/kinetic/](https://github.com/ariya/kinetic/). It has been tested on Android 4.3 or later (Chrome, Firefox), Android 2.3 (Kindle Fire), and iOS 6 or later (Mobile Safari). Also, as I mentioned in the beginning of this series, treat this example code as an example, nothing more and nothing less (it is optimized for readability and less on performance). Use the basic knowledge to inspire you to write, implement, and tweak your own variant of kinetic scrolling. That said, it doesn’t mean that this particular code is really slow. With Nexus 4 and Nexus 7, there is no problem of hitting 60 fps most of the time. This can also be verified by looking at the detailed frame statistics (using Chrome Developer Tools). Obviously, the [painting time HUD](https://ariya.io/2013/08/continuous-painting-mode-in-chrome.html "Continuous Painting Mode in Chrome") is also very useful in this analysis.

The physics effect has fascinated many developers since iPhone popularized the concept. In fact, the web-oriented implementation of this concept exists in various forms (virtually in all mobile-focused libraries), from the early [PastryKit](http://stackoverflow.com/questions/1143589/what-is-the-pastrykit-framework) edition to a dedicated microlibrary such as [FTScroller](http://labs.ft.com/articles/ft-scroller/). If you are always curious about the math and the physics behind it, I hope my explanation above shows that there is nothing really mystical about it.

In the third part, an important feature will be shown: **snap to grid**.

**Update**: It is published, please enjoy [Part 3](https://ariya.io/2013/12/javascript-kinetic-scrolling-part-3.html "JavaScript Kinetic Scrolling: Part 3").
