---
source: https://swup.js.org/getting-started/example
title: "Example — swup"
fetched: 2026-10-28
---

# Example

Swup requires two things to work: a content container with an id and an animation class, as well
as corresponding transition styles it can wait for when loading a page.

We'll tackle these one by one. See below for the [complete code](https://swup.js.org/getting-started/example/#complete-example) and an
interactive [demo](https://swup.js.org/getting-started/example/#demo).

## [1. Content container](https://swup.js.org/getting-started/example/#1-content-container)

Let's mark our main element as a [content container](https://swup.js.org/options/#containers) by adding the id `#swup`.

We'll also add a special [animation class](https://swup.js.org/options/#animationselector) to let swup know that we
want to wait for this element to finish animating whenever a new page is loaded.

```
<main id="swup" class="transition-fade">
  <h1>Welcome</h1>
  <p>Lorem ipsum dolor sit amet.</p>
</main>
```

```
<main id="swup" class="transition-fade">
  <h1>Welcome</h1>
  <p>Lorem ipsum dolor sit amet.</p>
</main>
```

## [2. Animation styles](https://swup.js.org/getting-started/example/#2-animation-styles)

Let's define a CSS transition on the special animation class added before:

```
/* Define a transition duration during page visits */
html.is-changing .transition-fade {
  transition: opacity 0.25s;
  opacity: 1;
}

/* Define the styles for the unloaded pages */
html.is-animating .transition-fade {
  opacity: 0;
}
```

```
/* Define a transition duration during page visits */
html.is-changing .transition-fade {
  transition: opacity 0.25s;
  opacity: 1;
}

/* Define the styles for the unloaded pages */
html.is-animating .transition-fade {
  opacity: 0;
}
```

For this example, we're using CSS to animate our page transition. Swup also supports JS animations
and native View Transitions. Learn more about [defining animations](https://swup.js.org/getting-started/animations/).

## [3. Initialize swup](https://swup.js.org/getting-started/example/#3-initialize-swup)

Finally, we'll load and initialize swup. And we're good to go!

```
import Swup from 'https://unpkg.com/swup@4?module';

const swup = new Swup();
```

```
import Swup from 'https://unpkg.com/swup@4?module';

const swup = new Swup();
```

## [Complete example](https://swup.js.org/getting-started/example/#complete-example)

Putting it all together, this is the complete code required for a basic swup setup.

```
<html>
  <head>
    <title>Swup Example</title>
    <style>
      html.is-changing .transition-fade {
        transition: opacity 0.25s;
        opacity: 1;
      }
      html.is-animating .transition-fade {
        opacity: 0;
      }
    </style>
  </head>
  <body>
    <main id="swup" class="transition-fade">
      <h1>Welcome</h1>
      <p>Lorem ipsum dolor sit amet.</p>
    </main>
    <script type="module">
      import Swup from 'https://unpkg.com/swup@4?module';
      const swup = new Swup();
    </script>
  </body>
</html>
```

```
<html>
  <head>
    <title>Swup Example</title>
    <style>
      html.is-changing .transition-fade {
        transition: opacity 0.25s;
        opacity: 1;
      }
      html.is-animating .transition-fade {
        opacity: 0;
      }
    </style>
  </head>
  <body>
    <main id="swup" class="transition-fade">
      <h1>Welcome</h1>
      <p>Lorem ipsum dolor sit amet.</p>
    </main>
    <script type="module">
      import Swup from 'https://unpkg.com/swup@4?module';
      const swup = new Swup();
    </script>
  </body>
</html>
```

## [Demo](https://swup.js.org/getting-started/example/#demo)

Here's an interactive demo to try out the fade animation we've just built together.

Head to the [demo page](https://swup.js.org/getting-started/demos/) for more examples.

[View Source](https://github.com/swup/demos/tree/main/basic/)
