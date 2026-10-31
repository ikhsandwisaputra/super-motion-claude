---
source: https://gsap.com/docs/v3/GSAP/UtilityMethods/wrap()
title: "wrap"
fetched: 2026-10-28
---

# wrap

### Returns : \*[​](#returns-- "Direct link to Returns : *")

Returns the next item in an array or number in a range after the given index. Or returns a function that returns that object or value if no index is given.

***

Places a number (or index of an Array) into a specified range such that when it exceeds the maximum, it wraps back to the start and if it is less than the minimum, it wraps to the end. In the context of tweening this has the effect of cycling through the values.

For example, if you have 10 elements with the `"box"` class applied, and you've got a `["red", "green", "yellow"]` array of colors that you'd like to have those elements animate to so that the first box animates to `"red"`, then next to `"green"`, then next to `"yellow"` and then wrap around again so that the 4th would go to `"red"`, 5th to `"green"`, etc., `wrap()` is perfect for that. If we don't provide an `index` value, we'll get a `function` instead that's ready to do wrapping accordingly.

```
//returns the corresponding value in the array (wrapping back to the beginning when necessary)
let color = gsap.utils.wrap(["red", "green", "yellow"], 5); // "yellow" (index 5 maps to index 2 in a 3-element Array)

//or use a range
let num = gsap.utils.wrap(5, 10, 12); // 7 (12 is two more than the max of 10, so it wraps around to the start and goes two up from there)

//if we don't provide an index, we get a function that's ready to do wrapping accordingly
let wrapper = gsap.utils.wrap(["red", "green", "yellow"]);

//now we just feed an index number into the function we got back from the line above and we'll get the corresponding value from the wrapped Array
let color = wrapper(5) // "yellow"
```

HTMLCSSJS

Use with AI

Copy promptCode and context for any AI tool[Open in ClaudeStart a chat about this demo](https://claude.ai/new)[Open in CursorSend the demo to Cursor's agent](https://cursor.com/link/prompt)

[](https://codepen.io/GreenSock/pen/5364a46c2767c6258132f7805ea0035e)

```
<h4>GSAP 3 wrap() / wrapYoyo() utilities</h4>
<div id="ball1" class="ball flair flair--2"></div>
<div id="ball2" class="ball flair flair--4"></div>
```

```
body{
  display:flex;
  align-items:stretch;
  justify-content:space-around;
  min-height:100vh;
  flex-direction: column;
}

.ball {
  width: 100px;
  height: 100px;
  will-change: transform;
}

h4 {
  margin: 20px;
  text-align: center
}
```

```
gsap.defaults({duration:20, ease:"none"});

var windowWrap = gsap.utils.wrap(0, window.innerWidth),
    windowYoyo = gsap.utils.wrapYoyo(0, window.innerWidth);

gsap.to("#ball1", {
  x: 10000,
  modifiers: {
    x: x => windowWrap(parseFloat(x)) + "px"
  }
});

gsap.to("#ball2", {
  x: 10000,
  modifiers: {
    x: x => windowYoyo(parseFloat(x)) + "px"
  }
});
```

## Parameters[​](#parameters "Direct link to Parameters")

1. **value 1** : \[*Array* | *Number*] - The Array of values **or** the minimum number in the range. If an Array is provided, the index becomes the second parameter.
2. **value 2** : *Number* - The maximum number in the range **or** if an Array is provided as the first argument, this parameter should be the index.
3. **index** : *Number* - (optional) The number to apply the wrapping to within the provided range
