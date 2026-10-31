---
source: https://www.tylerxhobbs.com/words/creating-soft-textures-generatively
title: "Creating Soft Textures Generatively | Tyler Hobbs"
fetched: 2026-10-28
---

# Creating Soft Textures Generatively

ByTyler Hobbs

Published2015.4.27

Back To[Essays](https://www.tylerxhobbs.com/words/categories/essays)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/60e6a82a3be32bcd9c4a36687b7b444d7bf91744-6000x3375.jpg?w=3800&q=85&fit=clip&auto=format)

Most of the generative artwork I see exclusively uses hard, sharp transitions. Some pieces use smooth gradients or basic transparency to create transitions. Very few pieces go beyond that. In my own work, my preference is to create some soft areas with few or no distinct edges. This happens naturally when working with analog media like paints, pastels, or pencils, but in programmatic artwork, you usually have to work for it.

As I see it, there are three main tools that you can use for creating soft areas:

* Layered transparent objects
* Small or fine objects repeated many times
* Creating a blur effect through direct pixel manipulation

I will cover the first two options. These come the most naturally to me, and I have much more experience with them. Direct pixel manipulation can also create a huge variety of interesting effects, so don't hesitate to explore that on your own.

The examples below use [Processing](https://processing.org/) through Quil, a Clojure wrapper. You can use my [tutorial on Quil](https://tylerxhobbs.com/essays/2015/using-quil-for-artwork) to set up an environment if you'd like to run the example code directly. Each of the example images are created in a 300x600 image.

Before each of the code examples below, the following setup code will be run:

```clojure
; make the color mode HSB with hue in [0, 360], saturation in [0, 100],
; brightness in [0, 100], and alpha in [0.0, 1.0]
(color-mode :hsb 360 100 100 1.0)

; make the background white
(background 0 0 100)

; define top-left corner of rectangle, width, and height
(def left-x 20)
(def top-y 20)
(def rect-height 260)
(def minimum-width 360)

; don't create outlines on polygons
(no-stroke)
```

## Layering Transparent Objects

Layering transparent objects is the most straightforward technique. Typically you will stack slightly-offset polygons with a low-opacity fill. The basic technique looks something like this:

```clojure
; fill the rectangles with gray with 0.1 alpha
(fill 0 0 50 0.1)

; draw the rectangle layers
(doseq [i (range 20)]
  (let [actual-width (+ minimum-width (* 10 i))]
    (rect left-x top-y actual-width rect-height)))
```

This will produce a rectangle that looks something like this:

![Placeholder](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKABQDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAIGBP/EACEQAAICAgEEAwAAAAAAAAAAAAEEAgMABREGEkFCUVKS/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AKXbbJ2OzaEWrgBYeB3YiOydLEQWriOftly8osXLiV6STI+gxVlFhaOF6fwMC16ZsnZp6ZTkZSPk4Zr1MYxRrEYgD4AwwP/Z)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/77ee887941b29697a7d06bb4c6e4f7b5f8620349-600x300.jpg?w=3800&q=85&fit=clip&auto=format)

The quality of the soft transitional region can be modified in a few ways. First, you can change the opacity and number of repetitions to get a smoother (or rougher) blend:

```clojure
; use 2% opacity
(fill 0 0 50 0.02)

(doseq [i (range 100)]
  (let [actual-width (+ minimum-width (* 2 i))]
    (rect left-x top-y actual-width rect-height)))
```

With ten times as many layers, the effect is much smoother:

![Placeholder](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKABQDASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAYCAwQF/8QAIRAAAgICAQQDAAAAAAAAAAAAAQIDBAAFEQYhMVFBUlP/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A7G52l5drbVbcwAkYABz7yqjtLxtRg3JiOfucf79OsbsxNeEkue5QZCvTqiZeK0Pn8xgPHSsryaWFndmY/JOGb9Mirr4wqqB6AwwP/9k=)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/84d5d61163b9864c5ee4cbb9ec12a1e39dbdfd93-600x300.jpg?w=3800&q=85&fit=clip&auto=format)

Second, you can change the length over which the soft area is blended (I'll make it shorter):

```clojure
(def minimum-width 520)
(fill 0 0 50 0.1)
(doseq [i (range 20)]
  (let [actual-width (+ minimum-width (* 2 i))]
    (rect left-x top-y actual-width rect-height)))
```

The transition is 1/5th as long now:

![Placeholder](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKABQDASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAUDBAYH/8QAJBAAAQQBAwMFAAAAAAAAAAAAAQACAwQFBhESE1SSFBUhQnH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A0uWyV1uTtBtqYASHYclU9zvd3N5LoN6pWNyYmvCSXH6BQejrdvD4BAy0FZmmwDXSyve7qOG5P4hO9NwxsxgDI2NHI/AaAhB//9k=)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/bb164d1f789ad18b0a25b8bb158c0d345d398c48-600x300.jpg?w=3800&q=85&fit=clip&auto=format)

So far the soft transition area is quite uniform. One easy way to give it more character is to use a [probability distribution](https://tylerxhobbs.com/essays/2014/probability-distributions-for-algorithmic-artists) for the width:

```clojure
(doseq [i (range 20)]
  (let [actual-width (+ minimum-width (random 0 200))]
    (rect left-x top-y actual-width rect-height)))
```

![Placeholder](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKABQDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAIGBP/EAB8QAAICAgIDAQAAAAAAAAAAAAEEAgMABRExBhJSQv/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCl22ydjs2hFq4AWHge2Ijs3S1WC1cRz9ZcvKLFy4lekkyP4GIsosLo8L09/AwL3x+cp6qiUpEkjs4Zo1kRFKsRAA46GGB//9k=)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/ecb1713fda35aa977dbbf0533eeef11c3988c28b-600x300.jpg?w=3800&q=85&fit=clip&auto=format)

Using a Gaussian distribution will give us a different pattern. Typically, it will have more segments at the start, but a few extreme outliers.

```clojure
(defn gauss [mean variance]
  (+ mean (* variance (random-gaussian))))

(doseq [i (range 20)]
  (let [actual-width (+ minimum-width (abs (gauss 0 100)))]
    (rect left-x top-y actual-width rect-height)))
```

This produces something with a little more variety:

![Placeholder](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKABQDASIAAhEBAxEB/8QAGAAAAgMAAAAAAAAAAAAAAAAAAAYBAgT/xAAeEAACAgIDAQEAAAAAAAAAAAABBAIDAAURUnESQv/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwBl22ydjs2hFq4AWHgfWW1Gyck9WJNXEc9sdHlFi5cSvSSZH8DJQUXDMSF6QeegwG/V2TknAmRJ9wzYnCIoiBEAeYYH/9k=)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/0daa04e842362e121deec00f4b3b5a694f276a0c-600x300.jpg?w=3800&q=85&fit=clip&auto=format)

So far, all of the soft transitional regions have been rectangular in shape and in their transitional layers. To produce different effects, we can modify the shape of the (previously rectangular) polygon on the transitional side. Let's start with a basic example: extending the top and bottom by random amounts:

```clojure
(doseq [i (range 20)]
  (let [top-width (+ minimum-width (abs (gauss 0 100)))
        bottom-width (+ minimum-width (abs (gauss 0 100)))]
    ; in Processing, the y-axis is inverted with 0 at the top
    (begin-shape)
    (vertex left-x                  top-y)
    ; top left
    (vertex (+ left-x top-width)    top-y)
    ; top right
    (vertex (+ left-x bottom-width) (+ top-y rect-height))
    ; bottom right
    (vertex left-x                  (+ top-y rect-height))
    ; bottom left     (end-shape :close)))
```

This is where things start to get interesting. We get some pretty cool effects in the transition region:

![Placeholder](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKABQDASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAYBAgMH/8QAIBABAAEFAAEFAAAAAAAAAAAAAQQAAgMFERIUIUFCUv/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwBl22ym27OUWyswGR4eVTqtpM9di8pWVO+43U6zokZmZlj4Vbn6FVixIxmtSPhHv4KDoWmPLXYbrrm5TvWitdcBDxgAc+KKD//Z)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/3156b58e59cf7bae6c978be5933b8aa2e3c50ea6-600x300.jpg?w=3800&q=85&fit=clip&auto=format)

```clojure
; leave space at the top and bottom for fan-out
(def top-y 30)
(def rect-height 240)
(doseq [i (range 20)]
(let [top-x-extend (abs (gauss 0 100))
      top-width (+ minimum-width top-x-extend)
      right-top-offset (* -1 (abs (gauss (* 0.1 top-x-extend) 1.0)))
      bottom-x-extend (abs (gauss 0 100))
      bottom-width (+ minimum-width bottom-x-extend)
      right-bottom-offset (abs (gauss (* 0.1 bottom-x-extend) 1.0))]

  (begin-shape)

  ; top left
  (vertex left-x                   top-y)
  ; begin top fan-out
  (vertex (+ left-x minimum-width) top-y)
  ; top right
  (vertex (+ left-x top-width)     (+ top-y right-top-offset))
  ; bottom right
  (vertex (+ left-x bottom-width)  (+ top-y rect-height right-bottom-offset))
  ; begin bottom fan-out
  (vertex (+ left-x minimum-width) (+ top-y rect-height))
  ; bottom left
  (vertex left-x                   (+ top-y rect-height))

  (end-shape :close)))
```

![Placeholder](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKABQDASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAIDBQYH/8QAHxABAAIDAAIDAQAAAAAAAAAAAQIDAAQFITEREhQV/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ANZ1e504dLZjDevIliAS9YvO7XSu3KoWbt8or5GWdP2NHUlfNdWhV8rWZH+HUijHVoH59lZgXnHT+fV95LJPKuGLSBXEADDA/9k=)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/881ee4e029b68224c3da4d97d64243965be43f6a-600x300.jpg?w=3800&q=85&fit=clip&auto=format)

Or, you can avoid sharp corners by using bezier curves for the right side:

```clojure
(doseq [i (range 20)]
  (let [top-width (+ minimum-width (abs (gauss 0 20)))
        control-1-width (+ minimum-width 40 (abs (gauss 0 100)))
        control-2-width (+ minimum-width 40 (abs (gauss 0 100)))
        bottom-width (+ minimum-width (abs (gauss 0 20)))]
    (begin-shape)

    ; top left
    (vertex left-x top-y)

    ; top right
    (vertex (+ left-x top-width) top-y)

    ; make the curve
    (bezier-vertex
      ; control 1
      (+ left-x control-1-width) (+ top-y (* 0.333 rect-height))
      ; control 2
      (+ left-x control-2-width) (+ top-y (* 0.666 rect-height))
      ; bottom right
      (+ left-x bottom-width) (+ top-y rect-height))

    ; bottom left
    (vertex left-x (+ top-y rect-height))

    (end-shape :close)))
```

![Placeholder](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKABQDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAMGBP/EAB8QAAEFAQACAwAAAAAAAAAAAAEAAgMEBREGEjFCYf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCl1tK63TtBtqYASHg9kzE19KPUrmGzK9/sB6l3eqyvVKxuTE14SS4/QLd4zUrt1oiIIgR8EMCC6pyPkqxvlHHkDo/UJyEH/9k=)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/6368f553701863fec3eec42e5c5ce988e29dd8e9-600x300.jpg?w=3800&q=85&fit=clip&auto=format)

## Repetition of Small Objects

My preferred way to create soft transitional areas is by laying down a bunch of very small objects. Usually these are dots, lines, or curves, but other polygons work as well. This tends to be more computationally expensive than the previous technique of layering transparent polygons, but the effects can be well worth it.

Let's begin with a very simple technique: spreading dots out in a Gaussian distribution away from the rectangle.

```clojure
; make the fill fully opaque
(fill 0 0 50 1.0)

; fill in the non-transitional area of the rectangle
(rect left-x top-y minimum-width rect-height)

; draw dots
(doseq [i (range 20000)]
  (let [x (+ minimum-width (abs (gauss 0 60)))
        y (random top-y (+ top-y (- rect-height 2)))]
    (rect x y 2 2)))
```

The effect is a very smooth, even fade out:

![Placeholder](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKABQDASIAAhEBAxEB/8QAGgAAAQUBAAAAAAAAAAAAAAAAAAECAwUGB//EAB8QAQACAwACAwEAAAAAAAAAAAECBAADBREhEjFBUf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwC47PUvR6tuMbe4DZIAm/3F4/UvS6OiLb3IyPuebm/TrN3ctfSrN9sDHc+nWLUEraR8/kDA6XzVaOlVX4nvDJKoFeAHg8YYH//Z)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/c97361e4aad222d5a24d801f3c3e94798815ced9-600x300.jpg?w=3800&q=85&fit=clip&auto=format)

For aesthetic reasons, I usually prefer to work with lines instead of dots. There are many, many interesting things you can do with a lot of lines. I'll cover some of the simplest techniques first. For example, you can extend lines horizontally from the rectangle using a Gaussian distribution for the length of the line:

```clojure
(fill 0 0 50 1.0)
(rect left-x top-y minimum-width rect-height)

(stroke-weight 0.1)
(stroke 0 0 50 1.0)

(doseq [i (range 5000)]
  (let [line-start-x (+ left-x minimum-width)
        line-end-x (+ left-x minimum-width (abs (gauss 0 60)))
        y (random top-y (+ top-y rect-height))]
    (line line-start-x y line-end-x y)))
```

This gives a neat sort of "smear" effect:

![Placeholder](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKABQDASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAMHAgX/xAAfEAEAAgICAgMAAAAAAAAAAAABAgQAAwURIUFCQ1H/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A7HM8pejytuMbe4DZIAm/uJo8pebekbm7pkfNygX6dZu7lr6VZvlgZitTqm+CVtPfZ9ZgU3h1lxtdkqsDzhjaIFXWAB16wwP/2Q==)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/658d79e433ca88f2d4246fee4ad812f7afeea375-600x300.jpg?w=3800&q=85&fit=clip&auto=format)

If horizontal lines work, why not vertical lines?

```clojure
(fill 0 0 50 1.0)
(rect left-x top-y minimum-width rect-height)

(stroke-weight 0.1)
(stroke 0 0 50 1.0)

(doseq [i (range 1000)]
  (let [x (+ left-x minimum-width (abs (gauss 0 60)))
        bottom-y (+ top-y rect-height -1)]
    (line x top-y x bottom-y)))
```

![Placeholder](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKABQDASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAQHAwX/xAAiEAACAgIBAwUAAAAAAAAAAAABAgMEAAUxBhMkESFRUlP/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A7G52l5drbVbcwAkYABz84tBtb/eTzJ+fucod+nWN2YmvCSXPuUGZRUqvcXxoOfzGBR+m3Z9JUZ2LMUHqThjWpULr4QoAAXgDDA//2Q==)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/c6af5a52629b02e27ce2fb520b37e2cbb19707e2-600x300.jpg?w=3800&q=85&fit=clip&auto=format)

What if we don't use a particular direction for the lines at all?

```clojure
(fill 0 0 50 1.0)
(rect left-x top-y minimum-width rect-height)

(stroke-weight 0.1)
(stroke 0 0 50 1.0)

(doseq [i (range 8000)]
  (let [top-x (+ left-x minimum-width (gauss 0 50))
        bottom-x (+ left-x minimum-width (gauss 0 50))
        bottom-y (+ top-y rect-height)]
    (line top-x (random top-y bottom-y)
          bottom-x (random top-y bottom-y))))
```

The result is much more chaotic and full of energy:

![Placeholder](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKABQDASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAcCAwQF/8QAIhAAAgICAQMFAAAAAAAAAAAAAQIDBAAFERIUMSEkQlFT/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AOxudpeXa21W3MAJGAAc/eUVNvsFsxlbk/PUPmcYN+nWN2YmvCSXPqUGS11Kr3UftoPP5jAZOoZ31tZpG5YoCThmisAsCAAAAeBhgf/Z)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/83ec378dd884355c5f3a85c666e52f029e0879ec-600x300.jpg?w=3800&q=85&fit=clip&auto=format)

Now we move on to one of my favorite techniques for laying down lots of small objects. Adding slight, loose patterns to the mostly-random small objects can create a lot of interesting effects. Even subtle patterns show up pretty clearly, and you can get a lot of variety in the results. To start, let's use random directional lines as before, but cluster the lines so that several of them point in nearly the same direction:

```clojure
(fill 0 0 50 1.0)
(rect left-x top-y minimum-width rect-height)

(stroke-weight 0.1)
(stroke 0 0 50 1.0)

(doseq [i (range 1000)]
  (let [top-x (+ left-x minimum-width (gauss 0 60))
        bottom-x (+ left-x minimum-width (gauss 0 60))
        bottom-y (+ top-y rect-height)
        mean-start-y (random top-y bottom-y)
        mean-finish-y (random top-y bottom-y)]
    (doseq [i (range 8)]
      (line (gauss top-x 5)    (gauss mean-start-y 5)
            (gauss bottom-x 5) (gauss mean-finish-y 5)))))
```

Like before, the result is chaotic and energetic, but now it has a bit of structure and rhythm. To me, it's reminiscent of a bird's nest or a bundle of sticks.

![Placeholder](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKABQDASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAQHAwX/xAAkEAACAgIABAcAAAAAAAAAAAABAgMEAAUGERIxFCEkQUJRUv/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDsbnaXl2ttVtzACRgAHP3ikO2vrKpW5N1c/wBHKLfp1jdmJrwklz5lBmEFOr4pPTQ9x8BgUnhuaSXSVJJT1uyAlj74Y1r1VacQUAADsBhgf//Z)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/fae7c15f167da3e3cbc9ab4bd94fd580b9877b4a-600x300.jpg?w=3800&q=85&fit=clip&auto=format)

## Wrapping Up

The examples I gave here are just a simple starting point for your own experimentation. Try some crazy ideas and see what works.

–

*From time to time, I write about my thoughts and artistic process. If you'd like to be notified the next time I publish an essay, sign up for my newsletter in the menu.*

## Continue Reading

* [Texture Study: Dormant Grass](https://www.tylerxhobbs.com/words/texture-study-dormant-grass)
* [Incomplete Control](https://www.tylerxhobbs.com/words/incomplete-control)
* [A Guide to Simulating Watercolor Paint with Generative Art](https://www.tylerxhobbs.com/words/a-guide-to-simulating-watercolor-paint-with-generative-art)
* [Probability Distributions for Algorithmic Artists](https://www.tylerxhobbs.com/words/probability-distributions-for-algorithmic-artists)
