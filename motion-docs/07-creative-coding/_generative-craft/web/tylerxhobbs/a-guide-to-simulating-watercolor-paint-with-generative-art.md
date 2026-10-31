---
source: https://www.tylerxhobbs.com/words/a-guide-to-simulating-watercolor-paint-with-generative-art
title: "A Guide to Simulating Watercolor Paint with Generative Art | Tyler Hobbs"
fetched: 2026-10-28
---

# A Guide to Simulating Watercolor Paint with Generative Art

ByTyler Hobbs

Published2017.4.21

Back To[Essays](https://www.tylerxhobbs.com/words/categories/essays)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/c6aa221ab9a43e5ab0088018619331ed65e8aa8d-4800x2700.jpg?w=3800&q=85&fit=clip&auto=format)

I've gotten many requests to explain the technique behind my "watercolor" generative artwork. My approach is similar to the techniques I described in [Creating Soft Textures Generatively.](https://www.tylerxhobbs.com/words/creating-soft-textures-generatively) The algorithm is not particularly exotic. Instead, it's conceptually simple but fine-tuned.

## Watercolor Inspiration

I frequently experiment with watercolor paints in my sketchbook. I particularly love the insanely detailed and varied effects that the paints can produce. One sketch caught my eye became the focus while developing this technique.

My goal was not to realistically reproduce everything about the watercolor paint. Instead, I aimed to capture the essence of it that I really enjoy. Here’s how it’s done.

![Placeholder](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAQABQDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAcIBv/EACUQAAEEAgAEBwAAAAAAAAAAAAIBAwQRAAUGBxMhCBIiJDFBcf/EABUBAQEAAAAAAAAAAAAAAAAAAAME/8QAHxEAAQQABwAAAAAAAAAAAAAAAQACAxESEyEiQYHx/9oADAMBAAIRAxEAPwB6z+GOHQfJ09NEN5PV3BLvJ58UOkgsSoMyJD6BkzZdJKRVv7xz7rax5+z9rsEShS1E0rMLzdeivRYrTzoyPK2tkq3gZUmMvJ29eqp7YwwUdeRRUkrLFOxBa/uGMKTptabqkLIUvf4wxKCnpf/Z)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/966e3a84ebf61a620c029aa758e45032742e01ad-6000x4893.jpg?w=3800&q=85&fit=clip&auto=format)

Watercolor doodle from sketchbook

## Use a Recursive Polygon Deformation Algorithm

The technique to simulate watercolor in generative art consists of stacking lots of nearly transparent layers on top of each other. To create the watercolor-like appearance of a gradual fade out, the layers need to have a lot of variation in their shape. However, in areas with sharper boundaries, the layers need less variation.

The core of the watercolor technique is a recursive polygon deformation algorithm.

It's pretty simple, and it goes something like this:

1. For each line A -> C in the polygon, find the midpoint, B. From a [Gaussian distribution](https://tylerxhobbs.com/essays/2014/probability-distributions-for-algorithmic-artists) centered on B, pick a new point B'.
2. Update the polygon, replacing the line A -> C with two lines: A -> B' and B' -> C
3. If we haven't hit our max recursion depth, repeat from step 1, splitting the child lines.

Depending on the variation in your Gaussian distribution and the recursion depth, this will produce a polygon with jagged, detailed edges.

## How the Polygon Deformation Technique Works

To illustrate how the polygon deformation technique works to create a watercolor effect, I'm going to apply it to a simple regular polygon:

![Placeholder](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAIIBgf/xAAiEAACAQQBBAMAAAAAAAAAAAABAgADBAURBgcSMVEyQXH/xAAXAQEBAQEAAAAAAAAAAAAAAAAABgQF/8QAHREAAgEEAwAAAAAAAAAAAAAAAAMCAQQFISIxQf/aAAwDAQACEQMRAD8A0TybP2nHscbu9Y63pVHlj6nK8d6nY/K5FLSvQe2NQ9qMTsE+o6w4S8yuHt61ijVTbsWamv2Pc8q4px3JZHN21OlbVkVHDO7KQFAM57nMiykY00VeMxli+yk50uW/ejS0Saa9tNV3vQA3E3EqVJVFX4qq/g1EQCoiIB//2Q==)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/088673bc3a49fe64d04da4fcca68437a348f4071-1600x1600.jpg?w=3800&q=85&fit=clip&auto=format)

The basic watercolor shape is created through one round of polygon deformation. The input polygon is taken and run through the deformation function multiple times (somewhere around 7). The resulting polygon becomes the "base polygon" for all of the layers we will create.

It looks something like this:

![Placeholder](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGgABAAIDAQAAAAAAAAAAAAAAAAEEAwYHCP/EACMQAAICAQMEAwEAAAAAAAAAAAECAAMEBQYRByExQRJRYRP/xAAYAQADAQEAAAAAAAAAAAAAAAAAAQYEBf/EABwRAAIDAAMBAAAAAAAAAAAAAAABAgMRBAUxIf/aAAwDAQACEQMRAD8A77vfdVG1NPrysml7VdviAv3NN2X1WGua6un5eF/EXtxUynnj8MzdeMK/J27RbW9hrrs71InPJ+yfU5Ft7aW4sjVMYYeHdRb2sSxwVA4/Zzb7rI25Hwr+s63hX8B2XNKT3635h6siVdLXJXTsdc4qckIBYV8ExN6JKSxtFiytLUK2IrqfTDkSVVVACqAB2HA8REYaTERAR//Z)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/ed5a2bb6a27b80fa692984d77db2a3372719bcaa-1600x1600.jpg?w=3800&q=85&fit=clip&auto=format)

For each layer, start with the "base polygon" and run it through the deformation function several more times (maybe 4 or 5). This will produce a polygon that is similar to the base polygon, but differs in all of the fine details. Draw the polygon with low opacity (somewhere around 4%). Repeat this for 30 to 100 layers.

The result will look like this:

![Placeholder](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGwABAAEFAQAAAAAAAAAAAAAAAAQBAwUGCAf/xAAlEAACAQQABgIDAAAAAAAAAAABAgMABAURBgcUISIxElEzQWH/xAAYAQACAwAAAAAAAAAAAAAAAAABBgAEBf/EAB8RAAEEAgIDAAAAAAAAAAAAAAEAAgMRBCEFMRITIv/aAAwDAQACEQMRAD8A6E4t4kteG8f1F0C7E6SNT3JrWsDzOxuQuniu06RdD4sx3s/VYznbibq5itb2BS8UQKuB7H9ry7D4bI394iWlrK7Ahj4+hWbNPIyTxaNJw4ziMLIwvbK763u+l1FDIs0SSRnaMNg/YpUfFRyRY22jnO5FjAY6131Sr46Sk4AOICkSxJMhSVFdD7BG6pFBFF+KNE/XiNUpUQs1SuUpSigv/9k=)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/b235d4707d0d1bff021660502ccc79f08d0e7575-1600x1600.jpg?w=3800&q=85&fit=clip&auto=format)

## Refine With Low and High Variation Areas

The steps so far will produce a shape that has somewhat soft edges all around. In order to give the border sharp edges in some areas and soft edges in others, we can assign different levels of "variance" to each line segment. Segments with high variance will undergo large changes in each mutation round, and segments with low variance will undergo small changes. When a segment is split into two child segments, those children can inherit the parent's variance. Of course, the variance needs to decrease somewhat, and it's also a good idea to slightly randomize what variance each child gets assigned.

With this change in place, the blobs look more interesting:

![Placeholder](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGgABAAIDAQAAAAAAAAAAAAAAAAQFAgYIB//EACIQAAICAwACAQUAAAAAAAAAAAECAwQABREGEgchIjFRUv/EABkBAAIDAQAAAAAAAAAAAAAAAAIGAQMEBf/EAB4RAAICAgIDAAAAAAAAAAAAAAECAAMEEQUhEjFB/9oADAMBAAIRAxEAPwDonyjfV/HtW120rMoPqqr+Sc1XT/KGqvWVisI1VfTpZ/r936GZ/MFC/e0MQoI0iK/ZEUdJGePePeP39tb9a8DssbASH+c5991iWeKxs4ri8LIwzde2j399TpmtZiswJNCwaNh0HGVGi1T0dXDXMrEoMZrBOu4tOiBiFPUvCAQQR0HI1TX1akkslaBI2lPXKjncYwtSsMQCAZKAAxjGTBn/2Q==)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/0c2c27ea2541e10dc3b1ad751b3937380a83cbdd-1600x1600.jpg?w=3800&q=85&fit=clip&auto=format)

![Placeholder](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGwABAAICAwAAAAAAAAAAAAAAAAUGAgMEBwj/xAAiEAABBAIBBAMAAAAAAAAAAAABAAIDBAURUQYHEiETFIH/xAAYAQADAQEAAAAAAAAAAAAAAAAEBQYCA//EACARAAEDAwUBAAAAAAAAAAAAAAEAAxECBBMFEhQhMVH/2gAMAwEAAhEDEQA/AO7+r+sIcDA1zm/LIToMBVRpd1JbEzYhRA8jrYO1BdxcbckvOmc1zo2j8Cr3TGHv5C/GaIG2uGzwOUqcfcyQFdWWlWPEyOwT9nxej6Vj7FWOUjXkN6RY0YDBUijefJzWgE8omIUXVG4wuFbo17IcyZgc13ogrVhsDj6E0j6sAjceERYgTKJyVhs0g9KbA16CIi6INf/Z)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/18aed949e3e918d16749befa1da1305782bcefc3-1600x1600.jpg?w=3800&q=85&fit=clip&auto=format)

## Refine With Texture Masking

Natural watercolor is not perfectly smooth, and has some variation in the opacity. To capture a little of that, you can use a different texture mask on each of the 30 to 100 layers. The mask will make some parts of the layer full transparent, creating variations in the final opacity. For this example, I'm randomly placing about 1000 small circles on the image for the texture mask.

```clojure
; draw the watercolor blob shape
(with-graphics the-blob-mask
  (background 0 0 0)
  (stroke 0 0 layer-alpha)
  (fill 0 0 layer-alpha)

  (begin-shape)
  (doseq [[x y] final-poly]
    (vertex x y))
  (end-shape))

; draw the circles onto the texture mask
(with-graphics the-texture-mask
  (background 0 0 0)
  (no-stroke)
  (fill 0 0 layer-alpha)
  (doseq [j (range 900)]
    (let [x (random 0 (w))
          y (random 0 (h))
          len (abs-gauss (w 0.03) (w 0.02))
          [hue sat bright] (color-fn)]
      (fill hue sat bright)
      (ellipse x y len len)))

; Blend the watercolor blob shape layer into the current
; layer, only taking the darkest pixel from each. This
; effectively means we're taking the "intersection" of
; the two masks.
(blend the-blob-mask 0 0 (w) (h) 0 0 (w) (h) :darkest))
(with-graphics the-overlay
  ; make the whole background red
  (background 5 80 80)
  ; apply the combination blob/texture mask
  (mask-image the-texture-mask))

; apply the masked layer
(image the-overlay 0 0)
```

The result looks like this:

![Placeholder](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGgABAAIDAQAAAAAAAAAAAAAAAAEDBQYHCP/EACUQAAEEAQMEAgMAAAAAAAAAAAEAAgMEEQUGEgcTITEiMkFRcf/EABcBAAMBAAAAAAAAAAAAAAAAAAABBQb/xAAgEQABAwIHAAAAAAAAAAAAAAAAAQMRAgQFMTJBUaHw/9oADAMBAAIRAxEAPwDvG8t1xbbiDponv5jDS38Fabs/qdJYvGtq7eXdfxicwYx/Vk+re2Lus14ben/N0IIfHnGR+1yjamkWrutVuNed0Mco7jmN+vlS33XaHURMjV4dZWb1ktderflPdnp1pDmgj0fKKImhsTGjOAABlFRMspLgHAgjIPsKmrTrVGFlaCOJpOSGtx5REQErEF6IiYj/2Q==)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/72b1a25e2e04a9cd5f5bb90dab42051d1fc59734-2800x2800.jpg?w=3800&q=85&fit=clip&auto=format)

## Refinement: Color Blending

Blending multiple colors with this technique works well so long as you interleave the layers. For example, do five layers of a red blob, then five layers of a yellow blob, then five red, etc. This doesn't really replicate what happens with real watercolor paint, but it looks cool anyway.

When combined with the texture masking above, this looks like so:

![Placeholder](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGgABAAIDAQAAAAAAAAAAAAAAAAUGAgMHCP/EACMQAAICAgEEAgMAAAAAAAAAAAECAAMEEQUGEiExBxMyYXH/xAAYAQACAwAAAAAAAAAAAAAAAAAEBgIDBf/EAB4RAAIDAAEFAAAAAAAAAAAAAAECAAQRAwUSEzFx/9oADAMBAAIRAxEAPwD0XzXL08dSd2ILN60T6kLV1C9rootQsfQB9yE+WWamzFdaW+og97hfG/2ZVukM3Hs5vEqNTO7PoedeYu3zZex28TECMlTpyPV8+b7ncKiTUpb2REyHgCJvgYMi6Zqy8WnLpanJrWythoqw3KxxnSPEYebZkUUMLUs2h7vx/kRIOoJBIhdbldEZVYgfZbYiJZA5/9k=)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/b5130a38f46c1d2106ee1ea3ecacdc689eea669e-2800x2800.jpg?w=3800&q=85&fit=clip&auto=format)

## Example Works

Here are a couple of works that I've created with these techniques so far.

![Placeholder](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAUEAwf/xAAjEAACAgIBAwUBAAAAAAAAAAABAgMEABETEiExBSNBUWJx/8QAGAEAAgMAAAAAAAAAAAAAAAAAAwQAAQX/xAAbEQACAgMBAAAAAAAAAAAAAAAAAQIRAyExEv/aAAwDAQACEQMRAD8A9PqSR92qpNHEGPVvI/qcYa8PeLSa2AfjKNCeSpUkVJBIqtv+5lnrPYs8jx7ZjsdBx6EWpOVmi6iq86OfLaQkcPJ+urGLDxwylQZPsjeMIsMa2inlm9pmqtAgrya3pl2Rkum7iwyiRwFBI7+MYyY+MZn0l2r86TuAwPfyRvGMY8kqAtKz/9k=)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/dcf3a47d09a69c239d9edbf597968ff437bfaf61-2800x2800.jpg?w=3800&q=85&fit=clip&auto=format)

Isohedral XI, 2017

![Placeholder](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAeABQDASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAUGAwf/xAAiEAACAgICAgIDAAAAAAAAAAABAgADBBESIQUxE0EiUmH/xAAYAQADAQEAAAAAAAAAAAAAAAACBQYDBP/EAB8RAAICAQQDAAAAAAAAAAAAAAABAgNRBAUUIRESFf/aAAwDAQACEQMRAD8At8HLWlSyAMf2/kcY+fTdWW5jko2ROT+L8paLFre0qkoMXMVSTWwO+jFMq3F+CxjTDUR9k+yofz6h2CoCoPW4SbB32fuEE34dWCRtwGTbId9+pkt11DHiSNe5TfAA3sd9zI4VfJiQPy9xxKlMkatxlW+xKmdaRssdwjNfDq2zz+4QOPHB2fVeT//Z)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/0df1eb60dad91bb80892f0aba734cbc757842858-1866x2800.jpg?w=3800&q=85&fit=clip&auto=format)

Linear II, 2017

–

*From time to time, I write about my thoughts and artistic process. If you'd like to be notified the next time I publish an essay, sign up for my newsletter in the menu.*

## Continue Reading

* [How to Hack a Painting](https://www.tylerxhobbs.com/words/how-to-hack-a-painting)
* [Flow Fields](https://www.tylerxhobbs.com/words/flow-fields)
* [Aesthetically Pleasing Triangle Subdivision](https://www.tylerxhobbs.com/words/aesthetically-pleasing-triangle-subdivision)
* [Creating Soft Textures Generatively](https://www.tylerxhobbs.com/words/creating-soft-textures-generatively)
* [Working with Color in Generative Art](https://www.tylerxhobbs.com/words/working-with-color-in-generative-art)
