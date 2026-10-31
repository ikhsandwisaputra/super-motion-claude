---
source: https://www.tylerxhobbs.com/words/texture-study-dormant-grass
title: "Texture Study: Dormant Grass | Tyler Hobbs"
fetched: 2026-10-28
---

# Texture Study: Dormant Grass

ByTyler Hobbs

Published2014.12.14

Back To[Essays](https://www.tylerxhobbs.com/words/categories/essays)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/a4fdaf98533dacd455d147868df2734aa1dbe073-1800x1012.jpg?w=3800&q=85&fit=clip&auto=format)

Texture is a blast to play with. The more that I work with texture, the more I believe that algorithmic artwork is specially equipped for it. Textures that would be extremely tedious to create by hand can be whipped out in several hours by code. When you're done, you're free to reuse the work in a new piece for little additional cost.

In this essay, I will explain a recent texture study that I completed. Off the trails near my home, there are unmowed sections of land where the native Texas grasses grow freely. These long grasses always catch my eye. They're so soft, and despite being fairly uniform, they contain a lot of subtle variety. Every time I see them, I know these natural textures are far more sophisticated than any of the textures I use in my work.

![Placeholder](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAPABQDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAUGBP/EACAQAAEEAgIDAQAAAAAAAAAAAAECAwQRAAUGMQcSQSH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8An9JpRsFIEvWORgOltK6yje8b6sAvLkvEqFUTi6JNkIPs24Uj7RzbM5I7F9G1kk1YPd4E7J8Va5DygmQ8QTf7hjRzlBSqnioL+0LwwP/Z)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/1e6a5027ec67e01311cd43e065dfcf727f8b94cb-2048x1536.jpg?w=3800&q=85&fit=clip&auto=format)

What do you do when you find something better than your work? You study it and learn from it, of course. So that's what we'll do here.

## First Analysis

The first thing that I notice about the grass is that it's clumpy. Due to perspective, the clumps near the foreground have a rounder and more irregular shape, while the clumps closer to the horizon are flatter, squished, and more regular.

Additionally, lighter strands of grass are consistently on top of darker strands. This makes sense, because the grass is naturally pretty uniformly light in value. Most of the darker values are due to shadow or dirt, both of which have to be below the lighter values.

As a first step, I modeled the clumps and their values as ellipses. Lighter clumps have a slightly different distribution from the darker clumps, being concentrated roughly 2/3rds of the way up to the horizon.

If you squint, the value structures are pretty close to matching the reference at this point. But, of course, we don't have any texture yet.

![Placeholder](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGgABAAIDAQAAAAAAAAAAAAAAAAUHAQMEBv/EACMQAAIBBAICAgMAAAAAAAAAAAECAwAEBRESEwYhFTEiYXH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AvH4qzljROpAno/XsCt4xFkwKiJCANa1UOM/FDZwHsid3QHjyGzXA/lXF2W4MMZYkKjPxJoJ2bB2wYdSBV19A+hSvI5Tzpbe66lxs84VR+cJ2v8FKCoUzV8fGEuhNqS21GgCjWv3WMTn7zMYK6nvhC80J0jhNGlKCbiydzDbW6xOEUxg6FKUoP//Z)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/ff89a727b0e227038a066fc5109522a3f3069fc5-1800x1800.jpg?w=3800&q=85&fit=clip&auto=format)

## Adding Lines

Grass has mostly vertical lines, so I simply started with those. In place of each ellipse, I generated 100 vertical lines with X and Y locations determined by a [Gaussian distribution](https://www.tylerxhobbs.com/words/probability-distributions-for-algorithmic-artists). The mean of the distribution matched the center of the (replaced) ellipse, and the standard deviation matched the height and width of the ellipse.

To match perspective, the width and height of the lines is scaled depending on the Y position of the line. Near the top, they're thin and short. Near the bottom, they're thick and tall.

![Placeholder](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAUCBwT/xAAkEAACAgECBQUAAAAAAAAAAAABAgADEQQFBhIhMUETIiNhcf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDvtO2acqPj7jqJp9toVuVKwufqSRxDQVC13BiB4M23EVfpgIfd5Jge63aNIWGalJx3xEl2b+S2VZCMRA5LwxqbGqBY5YDvLeq1Nq1nlbH5EQIlu56pGwtnSIiB/9k=)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/e0bddede30e96aff59f34d474f3f3953d7f95fb5-1800x1800.jpg?w=3800&q=85&fit=clip&auto=format)

This at least looks like some sort of grass or grain. The texture is nice and soft already. But in real life, grass isn't perfectly straight.

## Slants and Curves

To give the blades of grass variety, I added two things: a slant and a curve. I'll describe the slant first.

Due to perspective, grass closer to the foreground tends to have stronger and more erratic slants. Closer to the horizon, it appears nearly vertical. Also, blades of grass within a clump tend to slant the same way, although there can be a lot of variation (especially near the foreground). When each clump of grass is drawn, an average slant for the clump is first calculated, and then individual blades may have a slant that slightly differs from that.

The curvature of the blades of grass follow a similar pattern. Near the horizon, the perceived amount of curvature is small, but up close, the curves are quite obvious. The curves are quadratic Bezier curves, so to increase curvature near the foreground, I simply increased how far the control points could move away from the center of the blade.

![Placeholder](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGgABAAIDAQAAAAAAAAAAAAAAAAQHAQMFBv/EACIQAAEEAgICAwEAAAAAAAAAAAIAAQMRBAUhQQYSIzFhUf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwC4g02E0A/ELj2zcUsy6bX1bhGzfi4EvkmNOIjHleldKRBucKWP5ZPc2/roJkmhwyKxGKuvpF5rM8ow4pyD3qukQVTrc+dhN2JrZuHpR8jaZkuUQvMQjdUPCIg0ZM0jS8m7/ruiIg//2Q==)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/637fe42686287ade8861cb70bb310a065ccb94f0-1800x1800.jpg?w=3800&q=85&fit=clip&auto=format)

There's a little more liveliness in the texture now, but it's pretty far from the reference. It looks like a field of wheat, perhaps.

> What do you do when you find something better than your work? You study it and learn from it, of course.

## Refining to Match Reality

With the basic structures in place, we can look more closely at the reference to see where the differences are and refine the study. It's too light, and the strokes are too long and too thick.

To darken it a bit, I lowered the number of bright patches and made them smaller. I also made the blades of grass shorter and thinner, as well as tweaked the curvature to make the clumps less uniform.

![Placeholder](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGgABAAIDAQAAAAAAAAAAAAAAAAIFAQMHBP/EACAQAAIBBAMBAQEAAAAAAAAAAAECAAMEBREGITESFSL/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A6XbYSxW30tFQx6BMj+HbMrA00Db1uV2P5At3ahBVVmYAjqZuMxRs2VfsAsNaf3cD2vxmj/O0XevQPYlbV5GVIAukHXgbyIHHsNkLqpbIxrMCG+R89aEjn765pXFNhWdmPe2O4iBop1XqIGZiWPvcRED/2Q==)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/13a3752082fa782ac2cc15b24f178de8b21e3ae0-1800x1800.jpg?w=3800&q=85&fit=clip&auto=format)

The light patches were still popping too much. The lightest values were too light, and the smaller clumps were becoming very concentrated. To remedy this, I stretched out the clumps horizontally (especially near the horizon) and lowered the number of strokes within the lighter clumps. I also dropped the lightest value from a 9 to an 8.5.

![Placeholder](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGgABAAMAAwAAAAAAAAAAAAAAAAIDBQQGB//EACMQAAEEAQMFAQEAAAAAAAAAAAEAAgMEEQUhMQYSEyJhQVH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A7pDoWneVpELe943PxRk0anUly0ep4LRlZ03U9aN1Zsc/kHBfjGyuj6gqyXg0yhzDtjG6CVmnVdID42u25Jwi4du1A6dxka0H6fxEHkkNiQ6aPY5adj/Fp0bctem2xGQZsE9zt8IiCia/asSGSWZxeecIiIP/2Q==)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/a495a9a98204c742a2261640cc8a8c4b5cb559a3-1800x1800.jpg?w=3800&q=85&fit=clip&auto=format)

The grass was still too long, so I shortened it once again. This time, instead of shortening it uniformly, I changed the code that picks the height of the stroke to take the value (lightness) of the stroke into account. Dark strokes are shorter, light strokes are longer. Put another way, longer strokes are more likely to be light, because they rise above the shadows of the other grass.

If you squint at this point, it should look pretty close to the reference photo. What's missing is some of the variety in details and a few tweaks to the values.

![Placeholder](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGgABAAEFAAAAAAAAAAAAAAAAAAQCAwUGB//EACEQAAEDBQACAwAAAAAAAAAAAAEAAgMEBRESITFhE1Gx/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ANnhtFPLTtOGbHne5SSyUjX7jUP8FxCxUd4+doLJY4365DRwBSDdo5IIt3tPMnv6gv1Fnp3vDicc+kUSe4EvBjcwMI5lyIOeVFU+GippGBu8jcOJHlUw1kpIyRhg1A9IiCBVTSOmcd3D0DwIiIP/2Q==)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/cb3aeb9a1ade690c14d849543dfc65edcce51d69-1800x1800.jpg?w=3800&q=85&fit=clip&auto=format)

![Placeholder](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGgABAAEFAAAAAAAAAAAAAAAAAAUCAwQGB//EACIQAAICAgICAgMAAAAAAAAAAAECAAMEEQUhEiIxYRMyUf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDelwKNBURWUroHcoTj8ZCUcfXx0JEYPO15NKXNaiK46Al5+TStbVstQg9r32YGRlcXSLj6b+wIkZfyy+Y8s38Z1+vzqIHKMDNvalavLSL7AD+xg8llX5OWLLT6joxECP5Lm86jKatLvVQNbERED//Z)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/0a755403859c5ccaf1aa61fd99bdc88617e473e8-1800x1800.jpg?w=3800&q=85&fit=clip&auto=format)

## Variety, Values, and Finishing Touches

Up to this point, I was using five or six values. I decided to expand that to a full range of values. Each clump could be assigned one of eight values (from roughly 1 to 9 on a value scale). Within the clump, individual blades of grass have some variation in their value. I used a Gaussian distribution with a mean centered on the average value for the clump.

I also increased the amount of variation in the height of blades within a clump, especially for lighter values.

Last, to break up some of the stronger clumps and add more small patches and pieces of grass, I decreased the size of the clumps, decreased the average number of blades within a clump, and increased the variation in the number of blades within a clump. To compensate and keep the value ratios the same, I increased the total number of clumps.

The final result is a texture with a little more life-like variety:

![Placeholder](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGgABAAEFAAAAAAAAAAAAAAAAAAYBAgMFB//EACAQAAICAgICAwAAAAAAAAAAAAECAAMEEQUSEzEjUZH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AkGPgYvjQhQXYdhsSj4tdhHfxhNyPV85bS6l8mp6/qWDlHuL2sFsoU60DrrA3l3F4/YfEr7HuJFcvnlFxCWqVA0NbiBz6zJtag7bfUAiYn5HJr7Olmt+1Hr8iIDyuQDs7I2YiIH//2Q==)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/e56ee79407cab04b886062c6882ade7489588132-1800x1800.jpg?w=3800&q=85&fit=clip&auto=format)

Dormant Grass Study, 2014

## What I Learned

So what did I get out of my study?

First, nature comes packed with a huge amount of variety. There are definitely patterns, but they're subtle and not strict. So many things may influence a natural texture that you have to take a lot of overlapping patterns into account.

Second, it *is* possible to capture some of the character of natural textures with algorithms. This is especially true if you pick something with a lot of "repetition". In this case, there are probably tens of thousands of blades of grass. Over those kinds of numbers, patterns can start to form.

–

*From time to time, I write about my thoughts and artistic process. If you'd like to be notified the next time I publish an essay, sign up for my newsletter in the menu.*

## Continue Reading

* [Wall](https://www.tylerxhobbs.com/words/wall)
* [On Sketching (and the Life-Cycle of Artistic Ideas)](https://www.tylerxhobbs.com/words/on-sketching-and-the-life-cycle-of-artistic-ideas)
* [A Guide to Simulating Watercolor Paint with Generative Art](https://www.tylerxhobbs.com/words/a-guide-to-simulating-watercolor-paint-with-generative-art)
* [Connected, for the Moment](https://www.tylerxhobbs.com/words/connected-for-the-moment)
* [The Importance of Generative Art](https://www.tylerxhobbs.com/words/the-importance-of-generative-art)
