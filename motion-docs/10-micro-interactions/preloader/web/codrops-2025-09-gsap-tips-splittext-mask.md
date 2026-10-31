---
source: https://tympanus.net/codrops/2025/09/03/7-must-know-gsap-animation-tips-for-creative-developers/
title: "7 Must-Know GSAP Animation Tips for Creative Developers | Codrops"
fetched: 2026-10-28
---

By [Carl Schooff](https://tympanus.net/codrops/author/carl_schooff/ "Posts by Carl Schooff")
in
[Tutorials](https://tympanus.net/codrops/category/tutorials/) on
September 3, 2025

# 7 Must-Know GSAP Animation Tips for Creative Developers

Discover seven practical GSAP tips that will help you create smoother, smarter, and more creative web animations with less code.

[GSAP](https://tympanus.net/codrops/tag/gsap/)

![](https://tympanus.net/codrops/wp-content/uploads/2025/08/image-2025-08-30-at-09.22.37.jpg?x95600)

Today we’re going to go over some of my favorite GSAP techniques that can bring you great results with just a little code.

Although the GSAP documentation is among the best, I find that developers often overlook some of GSAP’s greatest features or perhaps struggle with finding their practical application.

The techniques presented here will be helpful to GSAP beginners and seasoned pros. It is recommended that you understand the basics of loading GSAP and working with tweens, timelines and SplitText. My free [beginner’s course GSAP Express](https://www.creativecodingclub.com/courses/FreeGSAP3Express?ref=0d0431) will guide you through everything you need for a firm foundation.

If you prefer a video version of this tutorial, you can watch it here:

## Tip 1: SplitText Masking

[GSAP’s SplitText](https://gsap.com/docs/v3/Plugins/SplitText/) just went through a major overhaul. It has **14 new features** and weighs in at roughly 7kb.

SplitText allows you to split HTML text into characters, lines, and words. It has powerful features to support screen-readers, responsive layouts, nested elements, foreign characters, emoji and more.

My favorite feature is its built-in support for masking (available in SplitText version 3.13+).

Prior to this version of SplitText you would have to *manually nest your animated text* in parent divs that have **overflow** set to **hidden** or **clip** in the css.

SplitText now does this for you by creating “wrapper divs” around the elements that we apply masking to.

### Basic Implementation

The code below will split the h1 tag into chars and also apply a mask effect, which means the characters will not be visible when they are outside their bounding box.

```javascript
const split = SplitText.create("h1", {
	type:"chars",
	mask:"chars"
})
```

### Demo: Split Text Masking (Basic)

See the Pen
Codrops Tip 1: Split Text Masking – Basic by Snorkl.tv (@snorkltv)
on CodePen.

This simple implementation works great and is totally fine.

However, if you inspect the DOM you will see that 2 new <div> elements are created **for each** character:

* an outer div with overflow:clip
* an inner div with text

With 17 characters to split this **creates 34 divs** as shown in the simplified DOM structure below

```markup
<h1>SplitText Masking
	<div> <!-- char wrapper with overflow:clip -->
		<div>S</div>
	</div>
	<div> <!-- char wrapper with overflow:clip -->
		<div>p</div>
	</div>
	<div> <!-- char wrapper with overflow:clip -->
		<div>l</div>
	</div>
	<div> <!-- char wrapper with overflow:clip -->
		<div>i</div>
	</div>
	<div> <!-- char wrapper with overflow:clip -->
		<div>t</div>
	</div>
	...
</h1>
```

### The More Efficient Approach

If you want to minimize the amount of DOM elements created you can split your text into **characters** and **lines**. Then you can just set the masking on the lines element like so:

```javascript
const split = SplitText.create("h1", {
	type:"chars, lines",
	mask:"lines"
})
```

### Demo: Split Text Masking (Better with chars and lines)

See the Pen
Codrops Tip 1: Split Text Masking – Better with chars and lines by Snorkl.tv (@snorkltv)
on CodePen.

Now if you inspect the DOM you will see that there is

* 1 line wrapper div with overflow:clip
* 1 line div
* 1 div per character

With 17 to characters to split this creates only 19 divs in total:

```markup
<h1>SplitText Masking
	<div> <!-- line wrapper with overflow:clip -->
		<div> <!-- line -->
			<div>S</div>
			<div>p</div>
			<div>l</div>
			<div>i</div>
			<div>t</div>
			...
		</div>
	</div>
</h1>
```

## Tip 2: Setting the Stagger Direction

From my experience 99% of stagger animations go from left to right. Perhaps that’s just because it’s the standard flow of written text.

However, GSAP makes it super simple to add some animation pizzazz to your staggers.

To change the direction **from** which staggered animations start you need to use the **object-syntax** for the stagger value

### Normal Stagger

Typically the stagger value is a single number which specifies the amount of time between the start of each target element’s animation.

```javascript
gsap.to(targets, {x:100, stagger:0.2}) // 0.2 seconds between the start of each animation
```

### Stagger Object

By using the **stagger object** we can specify multiple parameters to fine-tune our staggers such as each, amount, from, ease, grid and repeat. See the [GSAP Stagger Docs](https://gsap.com/resources/getting-started/Staggers/) for more details.
Our focus today will be on the **from** property which allows us to specify *from which* direction our staggers should start.

```javascript
gsap.to(targets, {x:100,
   stagger: {
     each:0.2, // amount of time between the start of each animation
     from:”center” // animate from center of the targets array
}
```

The from property in the stagger object can be any one of these string values

* “start” (default)
* “center”
* “end”
* “edges”
* “random”

### Demo: Stagger Direction Timeline

In this demo the characters animate in from center and then out from the edges.

See the Pen
Codrops Tip 2: Stagger Direction Timeline by Snorkl.tv (@snorkltv)
on CodePen.

### Demo: Stagger Direction Visualizer

See the Pen
Codrops Tip 2: Stagger Direction Visualizer by Snorkl.tv (@snorkltv)
on CodePen.

## Tip 3: Wrapping Array Values

The [gsap.utils.wrap()](https://gsap.com/docs/v3/GSAP/UtilityMethods/wrap()) function allows you to pull values from an array and apply them to multiple targets. This is great for allowing elements to animate in from opposite directions (like a zipper), assigning a set of colors to multiple objects and many more creative applications.

### Setting Colors From an Array

I love using gsap.utils.wrap() with a set() to instantly manipulate a group of elements.

```javascript
// split the header
const split = SplitText.create("h1", {
	type:"chars"
})

//create an array of colors
const colors = ["lime", "yellow", "pink", "skyblue"]

// set each character to a color from the colors array
gsap.set(split.chars, {color:gsap.utils.wrap(colors)})
```

When the last color in the array (skyblue) is chosen GSAP will *wrap back to the beginning* of the array and apply lime to the next element.

### Animating from Alternating Directions

In the code below each target will animate in from alternating y values of -50 and 50.

Notice that you can define the array directly inside of the wrap() function.

```javascript
const tween = gsap.from(split.chars, {
	y:gsap.utils.wrap([-50, 50]),
	opacity:0,
	stagger:0.1
})
```

### Demo: Basic Wrap

See the Pen
Codrops Tip 3: Basic Wrap by Snorkl.tv (@snorkltv)
on CodePen.

### Demo: Fancy Wrap

In the demo below there is a timeline that creates a sequence of animations that combine **stagger direction** and **wrap**. Isn’t it amazing what GSAP allows you to do with just a few simple shapes and a few lines of code?

See the Pen
Codrops Tip 3: Fancy Wrap by Snorkl.tv (@snorkltv)
on CodePen.

As you watch the animation be sure to go through the GSAP code to see which tween is running each effect.

I strongly recommend editing the animation values and experimenting.

## Tip 4: Easy Randomization with the “random()” String Function

GSAP has its own random utility function [gsap.utils.random()](https://gsap.com/docs/v3/GSAP/UtilityMethods/random()) that lets you tap into convenient randomization features *anywhere* in your JavaScript code.

```javascript
// generate a random number between 0 and 450
const randomNumber = gsap.utils.random(0, 450)
```

To randomize values in animations we can use the **random string** shortcut which saves us some typing.

```javascript
//animate each target to a random x value between 0 and 450
gsap.to(targets, {x:"random(0, 450)"})

//the third parameter sets the value to snap to
gsap.to(targets, {x:"random(0, 450, 50)"}) // random number will be an increment of 50

//pick a random value from an array for each target
gsap.to(targets, fill:"random([pink, yellow, orange, salmon])"
```

### **Demo: Random String**

See the Pen
Codrops Tip 4: Random String by Snorkl.tv (@snorkltv)
on CodePen.

## TIP 5: repeatRefresh:true

This next tip appears to be pure magic as it allows our animations to produce new results each time they repeat.

GSAP internally stores the start and end values of an animation the first time it runs. This is a performance optimization so that each time it repeats there is no additional work to do. By default repeating tweens always produce the exact same results (which is a good thing).

When dealing with dynamic or function-based values such as those generated with the random string syntax “random(0, 100)” we can tell GSAP to **record new values** on repeat by setting **repeatRefresh:true**.

You can set **repeatRefresh:true** in the **config object** of a single tween OR on a timeline.

```javascript
//use on a tween
gsap.to(target, {x:”random(50, 100”, repeat:10, repeatRefresh:true})

//use on a timeline
const tl = gsap.timeline({repeat:10, repeatRefresh:true})
```

### **Demo: repeatRefresh Particles**

The demo below contains a single timeline with **repeatRefresh:true**.

Each time it repeats the circles get assigned a new random scale and a new random x destination.

Be sure to study the JS code in the demo. Feel free to fork it and modify the values.

See the Pen
Codrops Tip 5: repeatRefresh Particles by Snorkl.tv (@snorkltv)
on CodePen.

## TIP 6: Tween The TimeScale() of an Animation

GSAP animations have getter / setter values that allow you to get and set properties of an animation.

### Common Getter / Setter methods:

* paused() gets or sets the paused state
* duration() gets or sets the duration
* reversed() gets or sets the reversed state
* progress() gets or sets the progress
* timeScale() gets or sets the timeScale

### Getter Setter Methods in Usage

```javascript
animation.paused(true) // sets the paused state to true
console.log(animation.paused()) // gets the paused state
console.log(!animation.paused()) // gets the inverse of the paused state
```

### See it in Action

In the demo from the previous tip there is code that **toggles the paused state** of the particle effect.

```javascript
//click to pause
document.addEventListener("click", function(){
	tl.paused(!tl.paused())
})
```

This code means “every time the document is clicked the timeline’s paused state will change to the inverse (or opposite) of what it currently is”.

If the animation is paused, it will become “unpaused” and vice-versa.

This works great, but I’d like to show you trick for making it less abrupt and smoothing it out.

### Tweening Numeric Getter/Setter Values

We can’t tween the paused() state as it is either **true** or **false.**

Where things get interesting is that *we can tween* numeric getter / setter properties of animations like progress() and timeScale().

**timeScale()** represents a factor of an animation’s playback speed.

* timeScale(1): playback at normal speed
* timeScale(0.5) playback at half speed
* timeScale(2) playback at double speed

### Setting timeScale()

```javascript
//create an animation with a duration of 5 seconds
const animation = gsap.to(box, {x:500, duration:5})

//playback at half-speed making it take 10 seconds to play
animation.timeScale(0.5)
```

### Tweening timeScale()

```javascript
const animation = gsap.to(box, {x:500, duration:5}) // create a basic tween

// Over the course of 1 second reduce the timeScale of the animation to 0.5
gsap.to(animation, {timeScale:0.5, duration:1})
```

### Dynamically Tweening timeScale() for smooth pause and un-pause

Instead of abruptly changing the paused state of animation as the particle demo above does we are now going to tween the timeScale() for a MUCH smoother effect.

### Demo: Particles with timeScale() Tween

See the Pen
Codrops Tip 6: Particles with timeScale() Tween by Snorkl.tv (@snorkltv)
on CodePen.

Click anywhere in the demo above to see the particles smoothly slow down and speed up on each click.

The code below basically says “if the animation is currently playing then we will slow it down or else we will speed it up”. Every time a click happens the isPlaying value toggles between true and false so that it can be updated for the next click.

## Tip 7: GSDevTools Markers and Animation IDs

Most of the demos in this article have used [GSDevTools](https://gsap.com/docs/v3/Plugins/GSDevTools/) to help us control our animations. When building animations I just love being able to scrub at my own pace and study the sequencing of all the moving parts.

However, there is more to this powerful tool than just scrubbing, playing and pausing.

### Markers

The in and out markers allow us to loop ANY section of an animation. As an added bonus GSDevTools remembers the previous position of the markers so that each time we reload our animation it will start  and end at the same time.

This makes it very easy to loop a particular section and study it.

![](https://tympanus.net/codrops/wp-content/uploads/2025/08/image-6-800x400.png?x95600)

Image from [GSDevTools Docs](https://gsap.com/docs/v3/Plugins/GSDevTools/)

Markers are a huge advantage when building animations longer than 3 seconds.

To explore, [open The Fancy Wrap() demo](https://codepen.io/snorkltv/pen/MYaOKaL?editors=0010) in a new window, move the markers and reload.

**Important:** The markers are only available on screens wider than 600px. On small screens the UI is minimized to only show basic controls.

### Setting IDs for the Animation Menu

The animation menu allows us to navigate to different sections of our animation based on an **animation id**. When dealing with long-form animations this feature is an absolute life saver.

Since GSAP’s syntax makes creating complex sequences a breeze, it is not un-common to find yourself working on animations that are beyond 10, 20 or even 60 seconds!

To set an animation id:

```javascript
const tl = gsap.timeline({id:"fancy"})

//Add the animation to GSDevTools based on variable reference
GSDevTools.create({animation:tl})

//OR add the animation GSDevTools based on id
GSDevTools.create({animation:"fancy"})
```

With the code above the name “fancy” will display in GSDevTools.

Although you can use the id with a single timeline, this feature is most helpful when working with nested timelines as discussed below.

### Demo: GSAP for Everyone

See the Pen
Codrops Tip 7: Markers and Animation Menu by Snorkl.tv (@snorkltv)
on CodePen.

This demo is 26 seconds long and has 7 child timelines. Study the code to see how each timeline has a unique id that is displayed in the animation menu.

Use the animation menuto navigate to and explore each section.

**Important:** The animation menu is only available on screens wider than 600px.

Hopefully you can see how useful markers and animation ids can be when working with these long-form, hand-coded animations!

## Want to Learn More About GSAP?

I’m here to help.

I’ve spent nearly 5 years archiving everything I know about GSAP in video format spanning 5 courses and nearly 300 lessons at [creativeCodingClub.com](https://www.creativecodingclub.com/bundles/creative-coding-club?ref=0d0431).

I spent many years “back in the day” using GreenSock’s ActionScript tools as a Flash developer and this experience lead to me being hired at GreenSock when they switched to JavaScript. My time at GreenSock had me creating countless demos, videos and learning resources.

Spending years answering literally thousands of questions in the support forums has left me with a unique ability to help developers of all skill levels avoid common pitfalls and get the most out of this powerful animation library.

It’s my mission to help developers from all over the world discover the joy of animating with code through affordable, world-class training.

Visit [Creative Coding Club](https://www.creativecodingclub.com/bundles/creative-coding-club?ref=0d0431) to learn more.
