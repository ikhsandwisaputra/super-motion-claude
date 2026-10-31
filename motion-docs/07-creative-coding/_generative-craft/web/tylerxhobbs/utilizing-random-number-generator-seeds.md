---
source: https://www.tylerxhobbs.com/words/utilizing-random-number-generator-seeds
title: "Utilizing Random Number Generator Seeds | Tyler Hobbs"
fetched: 2026-10-28
---

# Utilizing Random Number Generator Seeds

ByTyler Hobbs

Published2016.12.22

Back To[Essays](https://www.tylerxhobbs.com/words/categories/essays)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/208b15aa7ca28c5e57f4d12523f050f2ffd83e5b-4396x2472.jpg?w=3800&q=85&fit=clip&auto=format)

Most generative artwork heavily [utilizes randomness](https://www.tylerxhobbs.com/words/randomness-in-the-composition-of-artwork), making the output of each run unique. That's usually a good thing, but sometimes it's useful to be able to regenerate exactly the same image. For example, while developing a piece of generative artwork, you may want to work with small images to make the generation process faster. However, once the program is complete, you'll need to generate a much larger image if you want to be able to print it at a reasonable size. Sometimes, you'll want this larger image to be exactly the same as a smaller version that you like. That's where seeds come in handy.

## How Pseudo-random Number Generators Work

The standard random number generator available in most programming languages is actually a pseudo-random number generator (pRNG). This means that the numbers it produces aren't actually random, but are a series of transformations applied to a starting number: the seed. Given different seeds, the pRNG will produce different sequences of numbers. Given the same seed, the pRNG will always produce the same sequence of numbers. We can take advantage of this by using different seeds when we want unique images, but a specific seed when we want a particular generative image.

## Using Seeds With Processing (or Quil)

In Processing, you can set the seed for the pRNG with the randomSeed() function. In Quil, this is the random-seed function.

In order to get a different seed each time the program is run, I like to use a timestamp. However, you should note that only the highest 48 bits of the seed are used (rather than the expected full 64 bits). So, if you use something like System.currentTimeMillis() for the seed, you may end up generating the same image multiple times in a row. To avoid this, I use System.nanoTime() as the seed value.

```clojure
(let [seed (System/nanoTime)]
  (println "setting seed to:" seed)
  ; Random.setSeed() only uses the highest 48 bits of the seed
  (random-seed seed))
```

To make it easy to keep track of what seed was used to generate a particular image, I include the seed in the saved filename. I also include a millisecond timestamp to ensure that time-based sorting of the filenames works across restarts of the JVM:

```clojure
(let [filename (str "sketch-" cur-time "-seed-" seed ".tif")]
  (save filename)
  (println "done saving" filename))
```

If I want to generate another image using a particular seed, I can get it from the filename and simply hardcode it.

```clojure
(random-seed 31339586838380)
```

Putting it all together, my draw() function normally looks like this:

```clojure
(defn draw []
  (no-loop)
  (doseq [img-num (range 1)]
    (println "generating image" img-num)
    (let [cur-time (System/currentTimeMillis)
          seed (System/nanoTime)]
      ; Random.setSeed() only uses the highest 48 bits of the seed
      (random-seed seed)
      (println "setting seed to:" seed)

      ; actually generate the image
      (main)

      ; save the image to a file
      (let [filename (str "sketch-" cur-time "-seed-" seed ".tif")]
        (save filename)
        (println "done saving" filename)))))
```

–

*From time to time, I write about my thoughts and artistic process. If you'd like to be notified the next time I publish an essay, sign up for my newsletter in the menu.*

## Continue Reading

* [A Randomized Approach to Circle Packing](https://www.tylerxhobbs.com/words/a-randomized-approach-to-circle-packing)
* [Probability Distributions for Algorithmic Artists](https://www.tylerxhobbs.com/words/probability-distributions-for-algorithmic-artists)
* [Creating Soft Textures Generatively](https://www.tylerxhobbs.com/words/creating-soft-textures-generatively)
* [Code Goes In, Art Comes Out](https://www.tylerxhobbs.com/words/code-goes-in-art-comes-out)
* [Working with Color in Generative Art](https://www.tylerxhobbs.com/words/working-with-color-in-generative-art)
