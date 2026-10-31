---
source: https://www.tylerxhobbs.com/words/aesthetically-pleasing-triangle-subdivision
title: "Aesthetically Pleasing Triangle Subdivision | Tyler Hobbs"
fetched: 2026-10-28
---

# Aesthetically Pleasing Triangle Subdivision

ByTyler Hobbs

Published2017.7.27

Back To[Essays](https://www.tylerxhobbs.com/words/categories/essays)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/be912649a8c8e216a09cbf30bff6b64ed995a8a0-6000x3474.jpg?w=3800&q=85&fit=clip&auto=format)

Triangles are a natural shape to experiment with in generative artwork. Mesh grids of triangles are especially common. One common approach is to use something like [Delaunay triangulation](https://en.wikipedia.org/wiki/Delaunay_triangulation) to create a mesh. I've been experimenting with a technique that's simpler, rougher, and a little more flexible. So far the results have been good. I'd like to show you how this basic strategy for triangle subdivision looks pleasing.

## Bland Splitting

A naive approach to splitting a triangle with points A, B, and C might look like this:

1. Pick one of the three points for the start of the splitting line. Let's pick point A.
2. Calculate the middle of the side opposing point A, and call it point D.
3. Draw a line from point A to point D, splitting the triangle into two new triangles.

When this algorithm is applied recursively, it produces a regular, rigid effect:

![Placeholder](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAEDCP/EAB0QAAICAgMBAAAAAAAAAAAAAAABAhIDMhEhMVH/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AOhJSdn2Sz+iWzIRWuNuvoGPUAJQXLFEABpCCqAAP//Z)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/92ca77e049830c552dbc95955ad3cf379bcc1f18-1400x1400.jpg?w=3800&q=85&fit=clip&auto=format)

## Randomized Splitting

To make things a little more interesting, you can randomize the location of point D. A simple way to do this is to pick a random value t between 0 and 1, and use that to interpolate between points B and C. For example, when t = 0, D = B. When t = 1, D = C. When t = 0.5, D falls exactly between B and C.

If you use a (truncated) [Gaussian distribution](https://tylerxhobbs.com/essays/2014/probability-distributions-for-algorithmic-artists) for picking t centered on 0.5, you'll get much more varied results than before:

![Placeholder](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGQABAQADAQAAAAAAAAAAAAAAAAUCAwQH/8QAJhAAAgICAQMCBwAAAAAAAAAAAQMCBAARUQUTMRJhFCEiQUNxsf/EABYBAQEBAAAAAAAAAAAAAAAAAAABAv/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APaXXZlUViRBYRHf9zn6lesJWa9eRlbf4A/HHk5wqc1t9666TNq5GMBLxvk+2V/gD0+m1rZFlmUfUxnJ4/WZVOppkpPbLJMlE6lInycZW6bWUmpEPZHuS+uXtvGBnQTBIDljTG7MzzmhNll0FD9GHq+w+ZxjCqFFMOxsx2ZSJJOMYwj/2Q==)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/a03c9d4f62bd7b71139733057caba62d5191f0d5-2800x2800.jpg?w=3800&q=85&fit=clip&auto=format)

## Self-Balancing Splitting

One quality of the previous approach is that it tends to produce very skewed, stretched out triangles. I'm personally not a huge fan of this. I noticed that if I tried to draw "pleasing" triangle subdivisions by hand, this never happened. So, mentally, I must have been considering other rules subconsciously that avoided this. With a bit of thinking, I realized that I was typically trying to split the triangles in a way that minimized the difference between the longest side and the shortest side.

A simple way to follow this rule is to always make point D fall on the longest side of the triangle. With this one change to the algorithm, the triangle subdivision becomes self-balancing:

![Placeholder](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGQABAAIDAAAAAAAAAAAAAAAAAAEDAgQI/8QAHhAAAgICAwEBAAAAAAAAAAAAAAECETFBAxIhBCL/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAv/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AOjJtRleW8I1fom3yPomkWTfWSt29E1+U35slSIxSiq7MEcc2o5S9xQAy5fUr0WNXFrVAAUQbrOAAB//2Q==)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/3a0662892c68ab4471c15da3e74ed40525c17c52-2800x2800.jpg?w=3800&q=85&fit=clip&auto=format)

## Varying Recursion Depth

If you want more variety in the generated image, try varying the recursion depth (i.e. how many times you subdivide a triangle). I've experimented with a couple of different approaches to this.

## Non-Deterministic Base Case

The simplest approach is to utilize a random number generator in the recursive function to determine if the base case has been hit. In other words, if we should stop subdividing. You can do a simple biased coin flip to determine if you should continue:

```clojure
(if (or (odds 0.1)
    (>= depth 14))
  ; avoid resource exhaustion with a reasonable max
  ; stop the recursion
  [curves]
  ; continue with recursion
  (do
    ...))
```

![Placeholder](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGQABAQADAQAAAAAAAAAAAAAAAAUBAwYH/8QAIhAAAgICAgIDAQEAAAAAAAAAAQIDBAAFERIhYQYxcRQy/8QAFgEBAQEAAAAAAAAAAAAAAAAAAQAC/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A9x1+6GuSCtY7zqQzPOfoehk35dHJtNlVGucMk8fUP24Vf33mz5jrVpVkeByUdgFjJ/yfQyHFQuXbobTmZFQKGLeA5H3mS6PW6ncUaUVcNG4QcAs3nGX9bBegpRR2ZVeUDyT5OMC4KnYnsyWobMzzKrdlLnkj8yzWj/jtGeCSQMFDdS3K8n1jGIZp7m7xKGl7cSEAsMYxkX//2Q==)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/061edd2a9710647253729704250173c3098dfaad-2800x2800.jpg?w=3800&q=85&fit=clip&auto=format)

This can be easily adjusted to make the image more dense by changing the stopping odds to 0.01:

![Placeholder](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGQABAQEAAwAAAAAAAAAAAAAAAAUCAwYH/8QAIxAAAgICAgIBBQAAAAAAAAAAAQIDBAARBRITIRQiMUFCYf/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AqXbcpnAWdz9TdlDH0Mzx18vN4i088QB7dW+39zmtItRJZY1LuT2ca37zr68hLXsSRVYQfJtj611GRXoVO1farF0800YUBHVvxjJvCU5rHHxyPY8RP6I/oYyDPIRfFtxiN3IZjsMdg5InpxQzWHj2Gce8YyilxdYRVQqSyhd712xjGB//2Q==)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/b492d1d2fb88a3491f9b4c184862356d23ead29c-2800x2800.jpg?w=3800&q=85&fit=clip&auto=format)

Or, you can make it more likely to stop as the depth increases:

```clojure
(if (or (odds (rescale depth 0 14 0.0 0.07))
        (>= depth 14))
  ...)
```

![Placeholder](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGQABAQADAQAAAAAAAAAAAAAAAAUCAwYE/8QAIxAAAgEDBAIDAQAAAAAAAAAAAQIDAAQFERITISJhFDFBcf/EABUBAQEAAAAAAAAAAAAAAAAAAAEA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A7f411c3MqXELpITvVg/2PyqVlkggLTyxxTRSqm0udWA/Kn5LMbm5Yo5I+BiEdl69CsbOCGCzFxcxazSKX5i3W71QVA/Inlll3ysGckEE6aUrzY5MxdWwmjeFUY+IZ9p0/lKE2ZTDWqY9J1MvJJMd3n0dPVTLuMrGtuHfgEo8NeqUpTpLPGWxibVW6bQd0pSgv//Z)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/78e191d9f3c979e372601fdd75a73ed580a9a1b6-2800x2800.jpg?w=3800&q=85&fit=clip&auto=format)

You can also make the depth dependent on some other factor, such as the y-axis position of the center of the triangle:

```clojure
(if (or (odds (max 0 (rescale avg-y 0 (h) -0.05 0.12)))
        (>= depth 14))
  ...)
```

![Placeholder](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAAMBAAAAAAAAAAAAAAAAAAMFBgL/xAAmEAACAQQCAQIHAAAAAAAAAAABAgMABAUREiFBEyIGFSMxMlFh/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCy+IEusVkJZbefskvoP+X8rhsh6+PN01zOraHEb8+d1osph45sgIvWWTcoViw7AJ8VYZHE48z/ACazgZreI+6Q/cya/dRWEsMjNNE7PLNsOR0/XilXrYKx9R/qpA4OnjUEgN5pQbrMS6zk6hI/ZxYHj3upbdFWSV2AdmPMlu9mlKgnXFWlyizSRAO42ePW6UpQf//Z)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/0b3c2d6ff4b07fcc1e056eeaf7240986f62a7cf9-2800x2800.jpg?w=3800&q=85&fit=clip&auto=format)

## Inherited Depth

I often like my images to have "big" shapes or areas in them that share a quality, like being dark or light, dense or sparse. One way to encourage that with triangle subdivision is to set an approximate termination depth early on, while we're still dealing with fairly large triangles.

Here's a super naive approach where we set a random termination depth once we're on the third round of recursion:

![Placeholder](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGQABAAMBAQAAAAAAAAAAAAAAAAQFBgMH/8QAIxAAAQQCAAcBAQAAAAAAAAAAAwABAgQFEQYSISIxMkETcf/EABYBAQEBAAAAAAAAAAAAAAAAAAABAv/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AN3xJw9Atp7VUxIElLc4c3R1SYixetZM9UQi9smf72s3lT2yuRv3DCpMARiS08yv6x/i2OIqPTA0G5Jln7F+usqs8PMR8eKYyu7O2tv52i8rzGZyuBy9ylUloH6POPb8dEFxhKQmCacuac5zdnlJ+q6FKWk+qxiQbT9NoiCQAA8kGNi3FpldtO6IiD//2Q==)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/a42cab9b5d14dad7c741b44b157496faef11fb4b-2800x2800.jpg?w=3800&q=85&fit=clip&auto=format)

You can introduce more nuance by doing a slightly more complicated version of this. In the first three rounds, allow the termination depth to be randomly reset, similar to the previous technique. However, children are free to adjust their termination depth by one (going one deeper or one shallower than the parent), with decreasing probability of this happening as we reach greater depths (smaller triangles).

Here's what that might look like:

![Placeholder](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGQABAQADAQAAAAAAAAAAAAAAAAUBAwQH/8QAJhAAAgIBAgUEAwAAAAAAAAAAAQIDBAAFEQYSISIxEzJBURRSgf/EABYBAQEBAAAAAAAAAAAAAAAAAAABAv/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APU+J7YgvERkmFxuTvsVObVpNNpUDCQh5F3aXf5yZdSHiO3YqxySrYH6r0X+5TkFvSIIYJJFal6Yi5mXqp+jmVd2ly1qVRYHV5HU9z+eY/eMxpdK2agMbcyE7g7fGMC/o1CtQpk1olVpO5mPknJXFKKkkDAe7ckHqN8YwqjQZvw4u4+3GMYH/9k=)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/df2d04cd692e602027eb3276b2cdd252bb33e105-2800x2800.jpg?w=3800&q=85&fit=clip&auto=format)

## Bonus: Replacing Lines With Curves

Things get fun when we relax our definition of "triangle". Instead of always using straight lines for the sides of triangles, you can use multi-segment curves. Instead of splitting lines, you can split the curve at a segment end that approximates the value of t.

For fun, I defined my starting "triangles" to have curves that matched the perimeter of a circle. Each side of the "triangle" spans 1/3rd of the circle. When combined with the inherited depth method above (and some extra effects for good measure), the result looks like this:

![Placeholder](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGQABAQEAAwAAAAAAAAAAAAAAAAQFAQYI/8QAJRAAAQMDBAICAwAAAAAAAAAAAQIDBAAFERIhIjEGYRMWUXGB/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAL/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD0W+48ZKkMOpU4O056qb5JDkZ9BXo0nkrO/wDKxkXe3x7/ADWkyFDAOteMgH91NEnxGrfLmyZanUFWAEjupU7tby4YiNSws/mlQePPR12ttTDyigknl2PVKCdfjluVd3JJaOtYJUnPEk+q5+v2825yOWj8ecjfcH1SlBoWq3R4kNDTKOPe5yc0pSg//9k=)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/56b4c92d75fcc781a86b0d9656b55e70a87ac3f3-6000x6000.jpg?w=3800&q=85&fit=clip&auto=format)

You can also warp the curves. I tried applying gaussian noise to one or two points in the middle of each line, and then running the result through a Chaikin-curve algorithm to smooth it out. This produces a very interesting texture when the recursion depth is high. I used this technique to produce [*Voyage*](https://www.tylerxhobbs.com/works/voyage):

![Placeholder](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAYHBAX/xAAmEAACAgIBAwIHAAAAAAAAAAABAgMEABEFEiExBhMVIkFRYXGh/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAEC/8QAFREBAQAAAAAAAAAAAAAAAAAAABH/2gAMAwEAAhEDEQA/ALzjeRjp3lKP1Eee++2X0FmGeFJI2HSw35zB/iXt+3LCGVGPy9K72Pqd5Vi9PRopZdy6FerYPbX3zKtVChhsn+4zPKXrau8O1V5ADrqVuxxgqXqVo4+YjrRgpAkRIQeDnPWZ7Mt+nNI5rxuoVd+AT4/WMYR5HJhKvIWIYIkWNG0AB+MYxlH/2Q==)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/9f03f69f978f08037caf14c627116b0f9d46b593-6000x6000.jpg?w=3800&q=85&fit=clip&auto=format)

Voyage, 2017

–

*EDIT: Anthony DePasquale created a super slick*[interactive version of this algorithm](https://depasquale.art/works/triangle-divider/)*that allows you to play with all of the parameters. Try it out and generate your own images without writing any code.*

–

*From time to time, I write about my thoughts and artistic process. If you'd like to be notified the next time I publish an essay, sign up for my newsletter in the menu.*

## Continue Reading

* [Flow Fields](https://www.tylerxhobbs.com/words/flow-fields)
* [A Guide to Simulating Watercolor Paint with Generative Art](https://www.tylerxhobbs.com/words/a-guide-to-simulating-watercolor-paint-with-generative-art)
* [Fidenza](https://www.tylerxhobbs.com/words/fidenza)
* [Code Goes In, Art Comes Out](https://www.tylerxhobbs.com/words/code-goes-in-art-comes-out)
