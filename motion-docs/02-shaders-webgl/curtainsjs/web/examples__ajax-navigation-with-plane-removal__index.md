---
source: https://www.curtainsjs.com/examples/ajax-navigation-with-plane-removal/index.html
title: "curtains.js | AJAX navigation example with plane removal"
fetched: 2026-10-28
---

# This is the homepage

## Removing and adding planes at each AJAX call

Sometimes, you may want to use curtains.js with an ajax navigation. Thanks to the remove() method there's an easy way to achieve it.
The idea is to delete the planes just before each AJAX call and to add new planes just after we'd get the AJAX response.

After initialising our main Curtains object on window load, this is what happens when you click on a menu link above:

1. Get the link href and send an AJAX call
2. Once we got the response, remove all the existing planes via the **remove()** method, set a timeout (useful to animate page transitions) and append the new content
3. After the content has been appended, add the new planes using the **new Plane()** constructor if needed

### Pros

* Clean code and SEO friendly markup
* Perfect to use with SPA frameworks like React, Vue or Angular (or with your own custom AJAX navigation script)

### Cons

* Can cause a small delay before appearing, mostly due to images (or other assets) loading time
