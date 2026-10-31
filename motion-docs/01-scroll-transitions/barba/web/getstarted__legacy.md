---
source: https://barba.js.org/docs/getstarted/legacy
title: "barba.js"
fetched: 2026-10-28
---

* [# Get Started](https://barba.js.org/docs/getstarted/intro/)

  1. [## Intro](https://barba.js.org/docs/getstarted/intro/)
  2. [## Install](https://barba.js.org/docs/getstarted/install/)
  3. [## Markup](https://barba.js.org/docs/getstarted/markup/)
  4. [## Basic transition](https://barba.js.org/docs/getstarted/basic-transition/)
  5. [## Run custom code](https://barba.js.org/docs/getstarted/custom-code/)
  6. [## Lifecycle](https://barba.js.org/docs/getstarted/lifecycle/)
  7. [## Legacy example](https://barba.js.org/docs/getstarted/legacy/)
  8. [## Browser support](https://barba.js.org/docs/getstarted/browser-support/)
  9. [## Useful links](https://barba.js.org/docs/getstarted/useful-links/)
* [# Advanced](https://barba.js.org/docs/advanced/options/)

  1. [## Options](https://barba.js.org/docs/advanced/options/)
  2. [## Hooks](https://barba.js.org/docs/advanced/hooks/)
  3. [## Transitions](https://barba.js.org/docs/advanced/transitions/)
  4. [## Views](https://barba.js.org/docs/advanced/views/)
  5. [## Strategies](https://barba.js.org/docs/advanced/strategies/)
  6. [## Recipes](https://barba.js.org/docs/advanced/recipes/)
  7. [## Third party scripts](https://barba.js.org/docs/advanced/third-party/)
  8. [## Utils](https://barba.js.org/docs/advanced/utils/)
  9. [## Developer API](https://barba.js.org/api/)
* [# Plugins](https://barba.js.org/docs/plugins/intro/)

  1. [## Intro](https://barba.js.org/docs/plugins/intro/)
  2. [## Router](https://barba.js.org/docs/plugins/router/)
  3. [## Prefetch](https://barba.js.org/docs/plugins/prefetch/)
  4. [## Css](https://barba.js.org/docs/plugins/css/)
  5. [## Head](https://barba.js.org/docs/plugins/head/)
  6. [## Preset](https://barba.js.org/docs/plugins/preset/)

# Legacy example

This example do not use **any modern javascript syntax**, neither modules.
You can safely copy/paste this legacy code and use it as a starting point for playing with Barba.

## Code

You need **at least two pages** to make a Barba transition:

* `index.html`, the homepage of the website

|  |  |
| --- | --- |
| ``` 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 ``` | ``` <!DOCTYPE html> <html lang="en">   <head>     <meta charset="utf-8">     <title>Index — BarbaJS legacy example</title>   </head>   <body>      <!-- base styles to prevent container from moving during transition -->     <style media="screen">       [data-barba="container"] {         position: absolute;         font-family: monospace;       }     </style>      <!-- define the wrapper and the container -->     <div data-barba="wrapper">       <div data-barba="container" data-barba-namespace="home">         <h1>Home</h1>         <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>         <a href="about.html">About</a>       </div>     </div>      <!-- load barba (UMD version) -->     <script src="https://unpkg.com/@barba/core"></script>      <!-- load gsap animation library (minified version) -->     <script src="https://unpkg.com/gsap@latest/dist/gsap.min.js"></script>      <!-- init barba with a simple opacity transition -->     <script type="text/javascript">       barba.init({         transitions: [{           name: 'opacity-transition',           leave(data) {             return gsap.to(data.current.container, {               opacity: 0             });           },           enter(data) {             return gsap.from(data.next.container, {               opacity: 0             });           }         }],       });     </script>   </body> </html> ``` |

* `about.html`, another page of the website

|  |  |
| --- | --- |
| ``` 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 ``` | ``` <!DOCTYPE html> <html lang="en">   <head>     <meta charset="utf-8">     <title>About — BarbaJS legacy example</title>   </head>   <body>     <div data-barba="wrapper">       <div data-barba="container" data-barba-namespace="about">         <h1>About</h1>         <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>         <a href="index.html">Go back home</a>       </div>     </div>      <!-- no need to add scripts on the other page since Barba doesn't reload browser between pages -->   </body> </html> ``` |

> Be sure to read the [markup section](https://barba.js.org/docs/getstarted/markup/) before diving into Barba.

[Lifecycle](https://barba.js.org/docs/getstarted/lifecycle/)
[Browser support](https://barba.js.org/docs/getstarted/browser-support/)
