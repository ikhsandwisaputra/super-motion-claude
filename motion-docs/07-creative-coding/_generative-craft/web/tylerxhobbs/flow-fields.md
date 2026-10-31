---
source: https://www.tylerxhobbs.com/words/flow-fields
title: "Flow Fields | Tyler Hobbs"
fetched: 2026-10-28
---

# Flow Fields

ByTyler Hobbs

Published2020.2.3

Back To[Essays](https://www.tylerxhobbs.com/words/categories/essays)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/a7d505a47c94d7fc90afd09bc6362a3eebbad1b4-4001x2250.jpg?w=3800&q=85&fit=clip&auto=format)

Flow fields are incredibly powerful and flexible tools for producing interesting curves. They are one of the main tools I've used in my own generative art over the last few years, and I find myself going back to them over and over again. It's entirely possible that I've used them in more programs than any other person alive.

Flow fields are also something that many programmers reach for early on when they first get into creating algorithmic artwork, but few take the time to polish their use and explore the crazy variety of ways they can be used. In this essay, I'm going to cover the basics of flow fields, suggestions for different variations on their use, and tips for making them look good.

## A Grid Of Angles

Flow fields are based around a grid. Roughly speaking, this grid covers the whole image/canvas. At each point in the grid, you store an angle. Your grid should be stored as a 2D array of floating point numbers. Each item in the array holds an angle and represents a point in the grid.

When you initialize the grid, you need to pick a resolution. In other words, the spacing between the elements in the grid. The higher the resolution, the finer details you can create, and the smoother the curves. The downside is that performance can suffer if you crank it way up. I usually use around 0.5% of the image width for my resolution. I also use an integer length for the spacing to make the math easy and to avoid floating point precision errors.

The last configuration bits you need to decide on are the bounds of the grid. You might be tempted to make them match the sides and top of the frame/image. I've found it's better to make it larger -- sometimes much larger. Why? If your curves go outside the bounds of the image, it's nice if they don't simply disappear forever. I like them to have a chance of turning around and curving back into the image. Also, it's sometimes better to start curves outside the image and let them flow into it.

Let's assume we've got an image that's 1000 x 1000 pixels, and we want to give ourselves 50% extra margin outside the bounds of the image. We can initialize our grid like this (pseudocode):

```csharp
left_x = int(width * -0.5)
right_x = int(width * 1.5)
top_y = int(height * -0.5)
bottom_y = int(height * 1.5)

resolution = int(width * 0.01)

num_columns = (right_x - left_x) / resolution
num_rows = (bottom_y - top_y) / resolution

grid = float[num_columns][num_rows]

default_angle = PI * 0.25

for (column in num_columns) {
  for (row in num_rows) {
    grid[column][row] = default_angle
  }
}
```

If we were to run a little program to visualize the grid in this state, it would look approximately like this (resolution adjusted for visibility):

![Placeholder](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAFwABAAMAAAAAAAAAAAAAAAAAAAECCP/EABcQAQEBAQAAAAAAAAAAAAAAAAABEQL/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A0uACKFANNAFeuroAP//Z)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/1823466f260f13733ba15286fd4480ba8edd5bff-2000x2000.jpg?w=3800&q=85&fit=clip&auto=format)

Default grid with all angles set to pi\* 0.25

We now have a usable field. Sadly, like this it would only draw straight lines. We'll work on that. For now, let's just make it turn a bit as it moves down the image by doing this:

```csharp
for (column in num_columns) {
  for (row in num_rows) {
    angle = (row / float(num_rows)) * PI
    grid[column][row] = angle
  }
}
```

That looks something like:

![Placeholder](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAECCP/EABgQAQADAQAAAAAAAAAAAAAAAAABAhEh/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AOl1QAkYvM7wBrepoAxe06AD/9k=)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/9424ae13f842de05ea9eeebafc3343e546eedfdf-2000x2000.jpg?w=3800&q=85&fit=clip&auto=format)

Curved grid

## Drawing Curves Through The Field

Now we're going to use the grid to draw a curve. Here's the basic concept. We pick a starting point. We find a corresponding nearby point in the grid. We take the angle from that point in the grid, and take a small step in the direction of that angle. In our new location, we perform another lookup in the grid, and then repeat this process in a loop.

In pseudocode, that's something like:

```csharp
// starting point
x = 500
y = 100

begin_curve()

for (n in [0..num_steps]) {

  draw_vertex(x, y)

  x_offset = x - left_x
  y_offset = y - top_y

	column_index = int(x_offset / resolution)
	row_index = int(y_offset / resolution)

	// NOTE: normally you want to check the bounds here
	grid_angle = grid[column_index][row_index]

  x_step = step_length * cos(grid_angle)
  y_step = step_length * sin(grid_angle)

  x = x + x_step
  y = y + y_step
}

end_curve()
```

If we execute this for one curve, we'll get something that looks like:

![Placeholder](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAIBCP/EABsQAAICAwEAAAAAAAAAAAAAAAABAiEDETFB/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AOl3wmLtxfUUR3LXiAtgibe6AG7MjSoACZyewAB//9k=)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/7edbdd3a5f22e0bf732672e30b6931e8229ed3d4-2000x2000.jpg?w=3800&q=85&fit=clip&auto=format)

Drawing a single, simple curve through the field.

We need to pick values for a few key parameters of how we draw the curves: the step\_length, num\_steps, and the starting position (x, y). The simplest is the step\_length. Typically, this should be small enough that you don't see any sharp points on the curve. For me, that's usually around 0.1% to 0.5% of the image width. I go larger for quicker render speeds, and smaller if there are tight turns that need to be clean.

The other variables need longer discussion, so they'll each get a section here.

## Values For num\_steps

The value of num\_steps will affect the texture of the result. Short curves may look more like "fur". Long curves are more fluid. Here's an example of the same program run with two different values for num\_steps. First, with short curves, and then with long curves:

![Placeholder](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAAMBAAAAAAAAAAAAAAAAAAMEBgf/xAAlEAACAgAGAgEFAAAAAAAAAAABAgADBAUREiIxEyFhI1FxkdH/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ALGMzkqEOGvYMp0LgdywubWJh3F9gY3aHh238mAGZG/atP09vIt2FH2kgzNjx8i+McQJFbtczTYNAuny8TnJutX1VyX9+4hGZqvsq3itio2l9PmSm1xg1t11dwGP5iIFbBYy+yncbCPZ6iIgf//Z)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/2008d9a766db995b2b0ab5f9bc64e5d86109c0c7-1500x1500.jpg?w=3800&q=85&fit=clip&auto=format)

With short curves

![Placeholder](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGQABAAMBAQAAAAAAAAAAAAAAAAMHCAIF/8QAJBAAAgEDBAICAwAAAAAAAAAAAQIDAAQRBhITIQVhMTIzQnH/xAAVAQEBAAAAAAAAAAAAAAAAAAABAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ALFvdcWVuvKb4NH9n2Lkn+16EetPGm0Wdm4i+DvxgmsseK1DPbXk+YQ6g7GZ/hc+qlXVMhkkt2LSwn6Mx+KC1QdZwk/imfH7ADulZz8XqK1ms1aWe6DA4wjdClSVnDPJzFt3cjHd7qZpGglkjjxsIzgjPdKUhzbSycK4dh6BxSlKE//Z)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/6e4a4f5f7d26bdfc603fa4e4df5f02f9d85ad1a0-1500x1500.jpg?w=3800&q=85&fit=clip&auto=format)

With long curves

Note how the first feels rougher, and the second feels smoother. The first has more patchy areas of light and dark, but it's more consistent and has a flatter feeling. The second has much more visible long lines that lead the eye, and break up the image in a particular way.

Another consideration is if you're blending colors. The shorter curves may keep distinct sections of colors more separate, where longer curves may drag one color further into another color's section. When I'm using a lot of color variation, I usually pick a short to medium length curve to avoid really drawn out blending areas:

![Placeholder](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAPABQDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAABwAEBf/EACAQAAEEAgIDAQAAAAAAAAAAAAEAAgMRBRIEBhMVIVH/xAAWAQEBAQAAAAAAAAAAAAAAAAAEAQP/xAAeEQACAQMFAAAAAAAAAAAAAAAAAQMCERUFEhQhUf/aAAwDAQACEQMRAD8AZJstD5qbLTlj5OabHIA94I/UZuz2x3NilzeX2CWWWxeoKBTpcl+xOQhs9qYwe0Yfu6kUN7K7UCipTFymvPg8Z//Z)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/4a5ade8ad624c193ed742aeaeff912ce40f5d9ab-6000x4500.jpg?w=3800&q=85&fit=clip&auto=format)

Unfenced Existence, 2018

![Placeholder](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAPABQDASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAMEAQb/xAAgEAACAgICAgMAAAAAAAAAAAABAgMRAAQiMQUhEkFh/8QAFQEBAQAAAAAAAAAAAAAAAAAABAL/xAAdEQACAgEFAAAAAAAAAAAAAAABAgADERIhIjFR/9oADAMBAAIRAxEAPwDu9SCOMkQqCAb66x25rrMjBh9djvINLclijLuPTHibvG7e8yxLQ5MeX4MI6ObNpaOgr5SEePDdSIAvoAi8M2hbH4q1m7JOGOGkdmDOfJ//2Q==)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/ba5c3c6053da326c02babf984865864511da4c72-4000x3000.jpg?w=3800&q=85&fit=clip&auto=format)

Detail from Fragments of Thought D, 2018

On the other hand, if I'm using very similar colors, going with longer curves can work just fine. Note the background here, which uses subtly different cream colors:

![Placeholder](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAPABQDASIAAhEBAxEB/8QAGAAAAgMAAAAAAAAAAAAAAAAAAAUDBAf/xAAlEAACAQQBAwQDAAAAAAAAAAABAgMABAURBjFBUQcSExQhYXH/xAAWAQEBAQAAAAAAAAAAAAAAAAABBAX/xAAdEQABBAIDAAAAAAAAAAAAAAABAAIDESExE5Gh/9oADAMBAAIRAxEAPwDVPTrJx3XFoLeWTc0IMRB/Da7Uu5HkGmzeLx1sxZULGT9a80vjs58TmUt2kClj1Xof7T2HAfeylzcpL8YYBWOtk+anc7iOc3pEDjPYIqtqrd8osYLh4oY3mCHRdDob70VHccRtI5nUxs53v3FtbooLwNN9Wk2KAjLz0F//2Q==)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/648627df63a9fb563c950923d0e5bfc198c40db2-2000x1494.jpg?w=3800&q=85&fit=clip&auto=format)

Detail from Loxodography 0.26, 2019

## Selecting Starting Positions

All of your curves have to start somewhere. Usually, I use one of three options for picking the starting points:

1. Use a regular grid for starting points
2. Use uniformly random selection to pick the points
3. Use circle packing

The regular grid is the simplest, but sometimes it can feel overly stiff. Uniformly random selection has a looser feeling, but it will leave some clumps and some sparse areas, which are not always what you want. The circle packing approach has a nice balance: things are pretty evenly spaced out, but with enough random variation that it's more relaxed.

These differences are subtle if you're just drawing long lines with no color variation or other special behavior:

![Placeholder](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAUGB//EACUQAAEDAwQCAgMAAAAAAAAAAAEAAgMEBREGEhNBITEHIhRRYf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCX8YxRQWSnDsAtAz/F0SXUVLBTvgc4EObtOe1x7S1x47SMOwT0oeur/JQiF1O4mR/jbn2gn64t2NR1LrfLtgkO/H6J9osxLcbvVO5TC8572og1Whi6op3crido8DKm6g+14oA77DlxgoiDb/iQvAJYPXSIiD//2Q==)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/4d5fe0e4982c467a350cc32514be53f9b0cbd551-2000x2000.jpg?w=3800&q=85&fit=clip&auto=format)

Grid

![Placeholder](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAUGB//EACQQAAEDBAICAgMAAAAAAAAAAAEAAgMEBQYREyESQQcxMmGx/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AJXxZHx2qCJzyxrG9gfxdIkv8EdE+kDh2D0fevS5NhNcIqOMeQ8ztzwoGdZDNbJ4ZqZxL3uOhtBKzu28mR1Etvl1DIA/QP0faLJVF3uc8pk43d/pEG1wWZ76OUucSdaU/LTuvtwcA4B/0URBraaCHgYeGMkjf4oiIP/Z)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/f968be70a1d6a8d86b38dd6dcea7ad9d95aa52ed-2000x2000.jpg?w=3800&q=85&fit=clip&auto=format)

Random

![Placeholder](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAUGB//EACQQAAEDBAICAgMAAAAAAAAAAAEAAgMEBQYREzESIQdBUWGx/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AJPxWwMtUETnloY32B/F0iTIYI6N9IHDZB9fnX0uSYRXCKjjGx5nbnhQs5yCe2Twy0xJc9xLRtBKzq28mR1Etvk1DIA/W+ie0WTqLtc6iUycT/f6KINrgsz30cxc4k60p+WnddbfLTgH9FEQaymgh4GHhj2RvpERB//Z)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/97a5eac9bc17bbf27b1cc33eca1f1ef4d1b18d7f-2000x2000.jpg?w=3800&q=85&fit=clip&auto=format)

Circle Packing

But if you make the lines short, the difference is super obvious:

![Placeholder](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAIEAwf/xAAgEAADAAIBBAMAAAAAAAAAAAAAAQIDIREEEzFhElGR/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APZccy/K5Z0q1K+P6Rhe6X2uCcqcva34AduL20B23STp79ACsco0ZEnhjnfsADH1VVGRKaaXHIAA/9k=)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/cd2d3497a46b8f0a465ec1a529e81a306a9ad7a7-2000x2000.jpg?w=3800&q=85&fit=clip&auto=format)

Grid

![Placeholder](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAIEAwf/xAAjEAACAwABAQkAAAAAAAAAAAABAgADESEyEhMiMTNBUWGB/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APaaawLFr3RzjCUCWtNQbp5B+ZxocBVAbHrOEHyMok5TbQq6eDnOwJvrVrNC5E0ihDy5ZWPJEQM6eF+7Xo7G/sqn0F+9MRA3oimtNGnPeIiB/9k=)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/ab38a6c3f2d42817bbd4d05e4f4b485337e7c67d-2000x2000.jpg?w=3800&q=85&fit=clip&auto=format)

Random

![Placeholder](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGQABAQEAAwAAAAAAAAAAAAAAAAMCAQQH/8QAIBAAAgICAgIDAAAAAAAAAAAAAQIAEQMhEjEEIkFhkf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD2vhTnkSSN0Opp8qsoDD16IMiLViZjK4ta7J6gcNSsQoQj7iVVS9kX+RAjj0h3evmVZFLs1bSqiIHX8nM+PLxU6iIgf//Z)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/2e58b27867182615c1530b9e0a19aa6c2257c999-2000x2000.jpg?w=3800&q=85&fit=clip&auto=format)

Circle Packing

Other design choices can make this aspect of flow fields important, so I recommend considering it carefully. You may also want to experiment with other choices, like starting everything from the edges or the center.

## Distorting The Vectors

One big design decision is how you want to distort the vectors in your field. The method you use for this will determine what shapes your curves take. It will determine whether there are loops, abrupt turns, and overlapping lines.

### **Perlin Noise**

About 90% of the time, people use Perlin noise to initialize the vectors. This is handy and easy, because it gives you smooth, continuous values across the 2D plane. It also has a nice variety of "scale" in the noise - there are some large features, medium features, and small features. Processing makes it very easy to use: the noise() function returns Perlin noise values (between 0.0 and 1.0) given some coordinates.

If we go back to our initialization code, instead of putting in the default\_angle, we can do something like:

```csharp
for (column in num_columns) {
  for (row in num_rows) {

    // Processing's noise() works best when the step between
    // points is approximately 0.005, so scale down to that
    scaled_x = column * 0.005
    scaled_y = row * 0.005

    // get our noise value, between 0.0 and 1.0
    noise_val = noise(scaled_x, scaled_y)

    // translate the noise value to an angle (betwen 0 and 2 * PI)
    angle = map(noise_val, 0.0, 1.0, 0.0, PI * 2.0)

    grid[column][row] = angle
  }
}
```

You'll want to play with noiseDetail() settings and the exact parameters of how you scale the noise value to angles in order to get the effects you like.

![Placeholder](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAAMBAAAAAAAAAAAAAAAAAAUGBwT/xAAjEAABAwQCAgMBAAAAAAAAAAABAgMEAAUREgYhE0EHUWEx/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AIaxWBq48QiJdTsVr2Vgfyq3yOyvW/kUFuG+puQWyEKHZ69H8rZuJWZyIVtx9ZETYqQtHYwfVQdwsT1z58qWy0fBEASs46/RQVCD8j3a0xxDuMMrfaONwk4UPRpV1u0mGzMU23BcWhIwD4s0oOvhtwk22AiLFXq0hZSM9nGfutLs1pjpmOPgubP4U4NuicUpQSa7HBWoktn6pSlB/9k=)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/949141f74bc33950e06633feab3755cfd34b157e-2000x2000.jpg?w=3800&q=85&fit=clip&auto=format)

Using Perlin noise for angles

For what it's worth, I actually recommend that you try to come up with your own distortion techniques instead of relying on Perlin noise, simply because it's so overdone. But, it can still be a good tool to know about or start out with.

###

### **Non-Continuous Distortions**

An important attribute of the distortion technique you choose is whether it is "continuous" or not. By that, I mean that the transition across neighboring vectors is smooth, without sudden jumps. As I mentioned, Perlin noise is like this. I have a custom distortion technique that I like to use that also has this property. When you use continuous distortion, your curves will not cross each other, and they'll be smooth and organic.

However, it's also worth experimenting with non-continuous vector distortion. A simple example of that is to start with Perlin noise, but round each vector's angle to a multiple of pi/10. We get more sculpted, rocky forms this way.

If we crank it up to pi/4, things get crazy.

![Placeholder](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGgABAAIDAQAAAAAAAAAAAAAAAAQFAgMHBv/EACcQAAIBBAEDAgcAAAAAAAAAAAECAwAEBREhBhIxFFETIjNhcYHB/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APAWS46CcpeRu5X6ciHRP2NbLm6uRGyQRskROuF2SPasspd2sTJJYrFLs77QPH6qzsupluIo4ltiZV8Dt0BQQrK0y/p1MUTQoeVVl5170qPmM7F69xMTLIOCwfj8UoOtW/QODksI5PhTIzee19fyuR9aY6LH5KS2tZJUj3o/NyaUoKqDG2qpox9592JJpSlB/9k=)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/1ee0c982b8be585eb43ac497e623922d55fed09d-2000x2000.jpg?w=3800&q=85&fit=clip&auto=format)

pi/10

![Placeholder](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGgABAAIDAQAAAAAAAAAAAAAAAAMEAgUGCP/EACUQAAICAgEDBAMBAAAAAAAAAAECAwQABREGEkEhIjFCBxNRYf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDiE1xOjez2kzRuy+n8HjNZQszoUsVJGgsr7kYHjn/M6rqPW29brU1cdnunnbvlMY9F58ZWj6SuroRLXUtLC/28jj4wIJPyLuKzfqfYWoyPqXOMyk09iQhpqRDEDxjA9I1+kNO8wnkrl3BPHcecvS6OjHqGgSMrG7e7j5xjAnXpjVMid1YMQoHJxjGB/9k=)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/afac5051d07cc4217dfd5709f4df5828a0a662ad-2000x2000.jpg?w=3800&q=85&fit=clip&auto=format)

pi/4

Alternatively, you could simply pick a random angle (between 0 and pi) for each row of vectors or pick a random angle for every single vector.

![Placeholder](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGQABAAIDAAAAAAAAAAAAAAAAAAQFAgYH/8QAJBAAAQMEAgICAwAAAAAAAAAAAQACAwQFERIGIRMxFUEiMjX/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AnTXil8bNrFK0/bdFEmvUbX/xJg3r01UruUVkrHsmij2AwDt3lR/nq9urvHGWeiC5BsFTcq8yA0lomZCQMDRFWm71RDS1uQRnqQ4RB0aLhVhle3ahb997FZScGsA1xRftnP5lEQIuF2Mt6pMAHGA8oiIP/9k=)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/de10faa4cbfad3db068220e031687bf32ceacd5d-2000x2000.jpg?w=3800&q=85&fit=clip&auto=format)

Random angle per row

![Placeholder](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAQDAQf/xAAiEAABBAIBBAMAAAAAAAAAAAABAAIDEQQhEgUTMUEUI1H/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A9Py4xxuW2t520+CB6CrmcxrmvhYOemknSiB+THG6YWHEgtO+JC7jNmkkBBqPmR5sINMw5LpR28dsjQKDiEVTQCBROtX+ogwbIYjExgbT4bOvdKntshwfrHGhYCIgx6Pc+E10hJIJGiiIg//Z)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/42621bd2bfbaa48110e8a8083bcba67317a3d923-2000x2000.jpg?w=3800&q=85&fit=clip&auto=format)

Random angle per vector

1

[Ben Kovach](https://bendotk.com/) also pointed me to a [great paper that describes a solid technique for creating evenly spaced flow lines](https://web.cs.ucdavis.edu/~ma/SIGGRAPH02/course23/notes/papers/Jobard.pdf).

The point is that non-continuous distortions can also produce good stuff.

## Mixing With Other Techniques

There are an endless number of ways to play with flow fields and use them in new ways. For inspiration, here a few of the things I've tried out.

You can enforce a minimum distance between curves. At each step of a curve, check if any other existing curves are too close, and if so, stop. I used this technique on [Mirror Removal](https://www.tylerxhobbs.com/works/mirror-removal) in 2019 [1].

![Placeholder](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGQABAAIDAAAAAAAAAAAAAAAAAAMEAQIH/8QAIxAAAgICAQQCAwAAAAAAAAAAAQIAAwQRBRIhIjETJGGSof/EABUBAQEAAAAAAAAAAAAAAAAAAAEA/8QAFhEBAQEAAAAAAAAAAAAAAAAAABFB/9oADAMBAAIRAxEAPwDpVNdFVGOBh0uzVhtldljJaFUlvl4+gL6HhBfWJhug8q6ATK1XI3LR+N7I9xhxjlaVpzGWlRUpUEqnYb1Eczf9wFh3KKf5EA0x866upaQVKIOkdSgnUlXPtX0tX6CIilHN3m5DXXM3X68ew1ERBP/Z)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/a7f4fce2e863aebaa543f88ad933031646e06ad0-6000x6000.jpg?w=3800&q=85&fit=clip&auto=format)

Mirror Removal #5, 2019

You can draw dots in place of continuous curves. If you add checks to avoid collisions, the effect can be very nice:

![Placeholder](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAANABQDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAABgAEBf/EACcQAAEEAQIDCQAAAAAAAAAAAAEAAgMEESExBRIjBhMUFSJCUXHR/8QAFgEBAQEAAAAAAAAAAAAAAAAAAQAD/8QAFxEBAQEBAAAAAAAAAAAAAAAAAQACEv/aAAwDAQACEQMRAD8AL8OryTMGWjkPuOzf1dutQfWjPhq5e47vfpn6WU3BDXlc2IdFvpGdM/KJ2u0XEZ5cmdzRnQBQOrFTEmvUnd/1KkBdjVSN+e3sAGTmIG5UnhnrN//Z)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/59ffd6a8b83df83c05e117abba722a43afb2bdd1-4000x2667.jpg?w=3800&q=85&fit=clip&auto=format)

Side Effects Inclue\d, 2019

You can slightly distort the grid in between rounds of drawing. This will change the curves you get subtly, giving you variety and overlapping curves without totally changing everything, like in [*Festival Notes*](https://www.tylerxhobbs.com/works/festival-notes).

You can also transition between neighboring curves to create the outline of a polygon. If you interpolate between two neighbors (possibly with non-linear easing), you can get smooth, lovely shapes, as seen in *[Stripes](https://www.tylerxhobbs.com/works/stripes).*

![Placeholder](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAZABQDASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAUCAwcG/8QAKBAAAgIBAwEHBQAAAAAAAAAAAQIDBAAFESESBhMxNFFhgRUjQmJx/8QAFgEBAQEAAAAAAAAAAAAAAAAAAwQC/8QAHREAAgICAwEAAAAAAAAAAAAAAAECIQMSERMxIv/aAAwDAQACEQMRAD8A3O1bPfNEsiq/iPfD6ghl7jr+4R07/tiLtLHJBAyVZkknVuoqTyiHxJxFS1fu5nIlUoFCLIx5J9fnI+mLk5J2zfZPXzhK2aTA4MY56iOCcMXaRZMtFGWFwPDk77++GGpNDOFnB60Wg1W/VpRW3maQGSR136wfxB9MT1NMs65rcVE1pq0EexdiNhxmuv5x/jLI/MH+ZVDJoq9Jp4lkf0Tp10q1YoIhskahQMMuwwxD/9k=)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/c065326609a151c43e0df76b860eafe4bbf74345-3200x4000.jpg?w=3800&q=85&fit=clip&auto=format)

Festival Notes 0.161, 2019

![Placeholder](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAZABQDASIAAhEBAxEB/8QAGgAAAgMBAQAAAAAAAAAAAAAAAAUDBAYBB//EACcQAAIBAwIFBAMAAAAAAAAAAAECAAMEEQUSEyExUXIUNEGxMjVh/8QAGAEAAgMAAAAAAAAAAAAAAAAAAgMAAQT/xAAcEQACAgMBAQAAAAAAAAAAAAAAAQIREhMhA3H/2gAMAwEAAhEDEQA/APauLWQZY4UdcfU6lbgsaztluQC9hIripiiu7IB5KD1kboq3FvTP5OckH4WYnGT+D81aSNBahrmkK1QgM3PEJRTVaK7logsgOAe8Ieu+4g2lyxdf03HpSRl872HYStUvEe4fiDAAO4/J/gjjUfdVfGZi490/kfqG3SFqOUqHWl23Fsabm13FufWEd6N+toeMJWpS62ReriqP/9k=)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/4b975bef41d00854bc7f0faa336cb11978e881b6-3200x4000.jpg?w=3800&q=85&fit=clip&auto=format)

Stripes 0.30, 2019

You can insert objects that distort the grid around them. With [*Ectogenesis*](https://www.tylerxhobbs.com/works/ectogenesis), I approximated how fluid would move and wrap around an object.

I'll admit, the code was kinda tricky to get just right on this one.

![Placeholder](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAMABQDASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAUCAwQH/8QAIxAAAgICAQIHAAAAAAAAAAAAAQIDEQAEEgUhEyIyQVFhcf/EABUBAQEAAAAAAAAAAAAAAAAAAAME/8QAGhEAAgMBAQAAAAAAAAAAAAAAAAECERJhIv/aAAwDAQACEQMRAD8A4Lzdpe8pB9rPpGMR1RdTQbVgig2PHsySOnmU/RxUJH4yPypmuz85fKANONwKZl71lMvTphwWVaIptzItRih+YZkk3p1Kqr0AKArDHvoWOH//2Q==)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/81d02107e52c5d21aad2c25cde4746d966aa9ba6-6000x3579.jpg?w=3800&q=85&fit=clip&auto=format)

Detail from Ectogenesis 0.175, 2019

## Wrap Up

That's most of what I have to say about flow fields. As with any technique, I think the important part is first trying to understand them from top to bottom and then loosening up and doing them your own way. Don't just use Perlin noise and call it a day.

–

*EDIT: Claudio Esperança has created an amazing [interactive version of the examples in this essay](https://observablehq.com/@esperanc/flow-fields) using Observable. I recommend playing around with it!*

–

*From time to time, I write about my thoughts and artistic process. If you'd like to be notified the next time I publish an essay, sign up for my newsletter in the menu.*

## Continue Reading

* [Aesthetically Pleasing Triangle Subdivision](https://www.tylerxhobbs.com/words/aesthetically-pleasing-triangle-subdivision)
* [A Randomized Approach to Circle Packing](https://www.tylerxhobbs.com/words/a-randomized-approach-to-circle-packing)
* [Randomness in the Composition of Artwork](https://www.tylerxhobbs.com/words/randomness-in-the-composition-of-artwork)
* [Fidenza](https://www.tylerxhobbs.com/words/fidenza)
* [Incomplete Control](https://www.tylerxhobbs.com/words/incomplete-control)
