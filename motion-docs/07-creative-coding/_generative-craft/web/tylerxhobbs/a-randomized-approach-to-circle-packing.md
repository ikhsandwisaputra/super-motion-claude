---
source: https://www.tylerxhobbs.com/words/a-randomized-approach-to-circle-packing
title: "A Randomized Approach to Circle Packing | Tyler Hobbs"
fetched: 2026-10-28
---

# A Randomized Approach to Circle Packing

ByTyler Hobbs

Published2016.5.2

Back To[Essays](https://www.tylerxhobbs.com/words/categories/essays)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/87eccfb6f24d216e6549487448ad3619fcc5199b-4000x2250.jpg?w=3800&q=85&fit=clip&auto=format)

A few months ago, I got really into circle packing. The goal of circle packing is basically to cram a bunch of circles into a space as tightly as possible. This is actually a well-explored area of mathematics (just check out the [Wikipedia article](https://en.wikipedia.org/wiki/Circle_packing)), but I wanted something simple that's easy to implement and has a nice aesthetic effect. I opted for a brute-force approach that tries to place a circle in thousands of random locations until a fit is found. I'll describe the details of that and some of the artwork that I've created with this approach.

## The Basic Algorithm

To begin, I pick the size of the circles I want to insert, and roughly how many circles of each size to use. For example, I may ask for 10 circles with radius 50 and 300 circles with radius 10. The count is "rough" because it's just an upper bound -- the algorithm may give up before hitting that number.

The algorithm begins with the largest circles and ends with the smallest circles. For each circle size, it attempts to insert new circles until it hits the requested count or there are 2000 failed attempts in a row. Once the count or failure limit is hit, it moves on to the next smaller size. I picked 2000 failures to provide a balance between performance and the final density. A lower number can be used to give up more quickly, or a higher number can be used to pack the circles with higher density.

To see if a randomly chosen location is a good fit for a new circle, we need to check for collisions with any other circles. Fortunately, it's very efficient to check for a collision of two circles: you just need to see if the distance between their center points is larger than the sum of their radii. Another improvement to efficiency comes from checking against the largest circles first. A large circle covers more area, making it more likely to be responsible for a collision.

Combined with some colors, this procedure is really all it took to produce [*Take Me to the Desert*](https://www.tylerxhobbs.com/works/take-me-to-the-desert):

![Placeholder](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGgABAQACAwAAAAAAAAAAAAAAAAUBAgQGB//EACMQAAICAgIBBAMAAAAAAAAAAAECAxEABBIhBRMiQVExcYH/xAAXAQADAQAAAAAAAAAAAAAAAAABAwQA/8QAHBEAAgICAwAAAAAAAAAAAAAAAAECUREUAwQx/9oADAMBAAIRAxEAPwD1hXh2t11lnkjj5G++v1WVJJ610hiAKqa5fYzq+68o8m7a6xtyb3Lyr+5iTyXHYi1hzNryL17RXxeSrgwhuzKi0z7DyOYth0W64hbrGStUMPVJ256aQkAV0PrGHWjZl2pUb7kKREslhu+/nOHDqoNaIFnaybJNk4xldCH6VNbWQxAktZ/OMYwMbFLB/9k=)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/70d36e546a4bd87e44f59d737ce833681f3aeb47-4000x4000.jpg?w=3800&q=85&fit=clip&auto=format)

Take me to the Desert, 2016

## Filling an Arbitrary Polygon

Filling any arbitrary polygon with circles is a little trickier, because we not only need to check for collisions with other circles, but also with the border of the polygon. Checking if a circle is inside of a polygon is more complex and more expensive to compute. Fortunately, there's a pretty well known solution. Here's my version in Java:

```java
public static boolean polygonContainsPoint(int[] polygonXPoints, int[] polygonYPoints, int testX, int testY) {
  int numVerts = polygonXPoints.length;
  boolean c = false;
  int j = numVerts - 1;
  for (int i = 0; i < numVerts; i++)     {
    double deltaX = polygonXPoints[j] - polygonXPoints[i];
    double ySpread = testY - polygonYPoints[i];
    double deltaY = polygonYPoints[j] - polygonYPoints[i];
    if (((polygonYPoints[i] > testY) != (polygonYPoints[j] > testY)) &&
        (testX < (((deltaX * ySpread) / deltaY) + polygonXPoints[i]))) {
      c = !c;
    }
    j = i;
  }
  return c;
}
```

You just pass in a list of x and y vertices that make up the polygon along with a point to test, and you get back a boolean to let you know if the point is inside the polygon.

To know if a circle is fully inside a polygon, you technically need to check every point in the circle. However, for our purposes, just checking some of the points around the circle is good enough. I opted to test a decihexagon (16 points) with the same centerpoint and radius as the circle:

```java
for (int k = 0; k < 16; k++) {
  double theta = Math.PI * (k / 8.0);
  int pointX = x + (int) (radius * Math.cos(theta));
  int pointY = y + (int) (radius * Math.sin(theta));
  if (!polygonContainsPoint(xPolygon, yPolygon, pointX, pointY)) {
    // move on to the next location
  }
}
```

With the ability to fill arbitrary polygons, we can now do cool stuff like Meet Me Inside, which fills many (potentially overlapping) polygons:

![Placeholder](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAZABQDASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAUDBAcG/8QAJhAAAQMDAwQCAwAAAAAAAAAAAgEDBAAFEQYhURITIkEWMTRhcf/EABgBAAIDAAAAAAAAAAAAAAAAAAECAAME/8QAHREAAQQDAQEAAAAAAAAAAAAAAQACAxESIUExkf/aAAwDAQACEQMRAD8A1G+6ycKQcWO6UVUyK+OVzzmkPyoTiNwrjd3VUkLuH0bqPvfmqVysEqNqF16UIg66qqAEvjULUJg55xZbAugRJgwLCZ/S1nBe44gaSG7s6XQ2WTpeNABps5piKr5OLutFWI2mH1BexAaVrOBVXM7UUajHCrRC6ufQmGoLHd5kkTkIElsDyhAvSqDxWez7Rc274Jm1JjxBdTpBsFVcc7Vv1UXfz2/4tCNojfmPVC3LRS+zDDbtzQ9xwl9qSrlVopov2tFNtFf/2Q==)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/ba26ac1e3a949fcc6e85b036031738796b8b835a-4000x5000.jpg?w=3800&q=85&fit=clip&auto=format)

Meet Me Inside, 2016

## Furthermore

A nice thing about this approach is that it's applicable to other shapes besides circles. For example, I've used the same technique for a series of works packing triangles:

![Placeholder](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGQABAQEAAwAAAAAAAAAAAAAAAAQCAwUG/8QAJBAAAgICAgEDBQAAAAAAAAAAAQIAAwQREyESBUFRFDEycZH/xAAXAQEBAQEAAAAAAAAAAAAAAAACBAAD/8QAHhEBAAICAQUAAAAAAAAAAAAAAQACETEDEhMhcfD/2gAMAwEAAhEDEQA/APd2X5H1NwxayqeBC263MYfg9a3W7bZ6r1o/ydlyhEKhWKsQVVO9TgsBfI5DWE0fy9/3JKoGCdMFnzLMY28e+6wTsL8CJmjJy1UqtLOAdAkbiBrbOo+qnzJfVK1qyA9W0Oj0D1KKF5WrDe6bOvmIm4V7YxWN+pTg2WDHAFjfeIiVoQmp/9k=)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/ab33e8d037c6b89500aa79e100a33135fed50fe2-1800x1800.jpg?w=3800&q=85&fit=clip&auto=format)

Up There, 2016

I hope this inspires you to play around with circle packing and create new artwork!

*–*

*From time to time, I write about my thoughts and artistic process. If you'd like to be notified the next time I publish an essay, sign up for my newsletter in the menu.*

## Continue Reading

* [QQL](https://www.tylerxhobbs.com/words/qql)
* [Aesthetically Pleasing Triangle Subdivision](https://www.tylerxhobbs.com/words/aesthetically-pleasing-triangle-subdivision)
* [Flow Fields](https://www.tylerxhobbs.com/words/flow-fields)
* [Color Arrangment in Generative Art](https://www.tylerxhobbs.com/words/color-arrangment-in-generative-art)
* [Randomness in the Composition of Artwork](https://www.tylerxhobbs.com/words/randomness-in-the-composition-of-artwork)
