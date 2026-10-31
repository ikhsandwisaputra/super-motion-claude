---
source: https://www.tylerxhobbs.com/words/probability-distributions-for-algorithmic-artists
title: "Probability Distributions for Algorithmic Artists | Tyler Hobbs"
fetched: 2026-10-28
---

# Probability Distributions for Algorithmic Artists

ByTyler Hobbs

Published2014.10.18

Back To[Essays](https://www.tylerxhobbs.com/words/categories/essays)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/b55b4e90c3a5a72a05120f66ed1073747e67bee8-6000x3375.jpg?w=3800&q=85&fit=clip&auto=format)

1

For the pedants reading this, I have obviously simplified many details in order to make the subject more approachable for those without a background in mathematics.

For those who aren't familiar with probability, a probability distribution is a way of describing the odds that a given number will be chosen at random [1]. As described in my essay on [randomness in the composition of artwork](https://www.tylerxhobbs.com/words/randomness-in-the-composition-of-artwork), randomness and control over it can be very important for algorithmic artwork. I spend a considerable portion of my time fine-tuning probability distributions to achieve the desired aesthetic effects. This post describes some of the common distributions that are useful for artwork.

## Uniform Distribution

As the name implies, with a uniform distribution you have equal odds of choosing any number in the specified range. This is the default distribution for random() functions in every programming language and environment that I'm aware of. It is extremely flexible if used properly, and every other distribution listed here can be built on top of it.

Aesthetically, plain uniform distributions are useful for achieving even coverage over an area.

If we use a uniform distribution for the x coordinate of a vertical line, it will look something like this:

![Placeholder](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAFCAYAAABFA8wzAAAACXBIWXMAAA9hAAAPYQGoP6dpAAAARElEQVQYle3QoQ2AQAAEwW/hpmYEAkgQ8PCEhFIx3wEWcVm1K66gYUuyJmlJzr4ryYwBU5IbD3bU7lUcnQvG8gfb1w9fI05O5PZJ08gAAAAASUVORK5CYII=)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/a2705ac174e8021d02a1ca593d08b632f0145f7c-8000x2000.png?w=3800&q=85&fit=clip&auto=format)

1D Uniform Distribution

If we use a uniform distribution for 2D coordinates, the appearance will be similar to static:

![Placeholder](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAFCAYAAABFA8wzAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAiElEQVQYlU2PSQ7DMAwD/Qbx/4cibZ3F6RuLEUggB0GmRY/oUVXLdUjaXZzPqro8+6F9d6OZWR+SpqRvVc1hMQ3qgTuwfkD3kviid0lvSS/3BgJAfFybtz23B0LHk6UJ0TD08KNAY5y+72/l+wbgSZG+k3p+kTDApOKrGKgl6TY4aZ8QzvHiWX8JfFeoAuQDvgAAAABJRU5ErkJggg==)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/a4ec51a71d98acfc86c403834e9b3e48fcf73f56-8000x2000.png?w=3800&q=85&fit=clip&auto=format)

2D Uniform Distribution

2

For a demonstration of this, ask several people to imagine a die is rolled 20 times, writing down the imaginary sequence of results. Then, roll an actual die 20 times and record the results. The actual sequence will typically contain runs of the same number several times in a row, whereas the imaginary sequences will not. Likewise, one number may appear only zero or one times in the real sequence, but the imaginary sequences will have more balanced amounts of each number.

Note that the typical person's idea of what "randomness" (i.e. the uniform distribution) looks like does not necessarily match reality. Uniform distributions tend to form clumps or runs far more frequently than an untrained person would guess [2].

![Placeholder](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAYAAABiDJ37AAAACXBIWXMAABYlAAAWJQFJUiTwAAADyklEQVQokWNQVVUVMjAwEHZwcOB1d3fncnJy4nJ3d+f28PDgcnZ25nJzc+f29gvm8QmM4HXz8OZ2dXXlcnR05DExMeHT1dXl19HR5TcxsxewtHEX1NTSFWVQU1PjB0lGRESwtbW1MZeVlTE3NDSwNDQ2sNTVljPnlDSyeqZ08TondAsFpLdzFBYWsFhZW3OpKKsIysjKCCnJyYu665lLxFm5i1to64szqKqqCpiZmfHm5+ezvn37lvH0mdNMly9dYTp7+jrT/88fGYs7V7E6JE8VsY6fLO2ZNYtn+qy5zGamptxycnKiYuLiYooyElLhlgpyVb6aMq7GqpIgA/lNTU15MzIyWE+cOM60bu16pg1b1zDNWT2VedOeGUwJFbPYbOMnilvFTpBzSZnC19w5kdnOxppTRUVFSFpaVlhFWUosyE9SsiBLRsLORgHhwuzsbNaLly4ybd+2g6l1TQJr9hIL7rxlZpxRta0cNklTRa0Spkg5pk7jq+lawJKfk87i6ubGYWFhyWFuZcQZmmrKGZFtwq1npCYEdqGJiQlvWnoq65Pbbxinrq1jylxixB2/UEE0dr6ScEB1Cr9ndLuYT2SrhGtMl2BC5RzWa2cPMK5YtY5p7do1TEuXLWc6cPAsk39AKJuamrogOFJALszKyWB9fecnY+UyH9bURZoCSYuURGLnqojGFPhK5romylXaxMmlumZLZCW1cTy+d55xy8b1TPv3bGXaumUT08XzZ5iiIiPYNDQ0BCAGmpvxZmZms+45fIgpfYE5Z8ICTcHU5QY8+W1aQiXxlmoN7l7q3Xa+Sk12/oq9zkH8B6fPYF5y4D7TmnWnmJat3Ma0/+BxpoiISDZNDU1BaKSY8BZnFbOsOlfInL1Uma9giaLw8skqPAsSlaRbYw1M29NstWdku8hPCHDWXOxmqng6WZP3zlov1rsnypkfX1/G9P//S8bIyDCQCwUZ1NXV+L1dTAXbSh34uvsNRBr6leSmtCgp7EhRlFseoq7VmGJuXttgqTGh10aqOdVNbUawqe62cGWVnTmqkutrDYWWN1vxLe/04KnIcOY10tcSZtDSVBcM9raQzU210ijINzYsyjQwrg81Nmx3MdMrdXXWior3U4ussVKIadaTCcyzU0oMd9KpdbfQb/M00a8PsdCqjLdRr0h1VM2KcVCwszSQZNBQVxVysDNT9vSxMfT0szHxdrA19DO0N3AxdNcxMg9QMbDzlLUJNJSxT1BSsoxXUzUOsNGwtnXT9jZ21Pcztdf3tHPW8XJz1fFydVC3MDWQBgANzSR7WdW6uQAAAABJRU5ErkJggg==)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/4317d3c8991da2240bb825c3b4d39d8e29d3e2fa-2987x1859.png?w=3800&q=85&fit=clip&auto=format)

## Gaussian (Normal) Distribution

Unlike the uniform distribution, the [Gaussian distribution](http://www.mathsisfun.com/data/standard-normal-distribution.html) is extremely prevalent in nature. Heights, lengths, weights, temperatures, and many more measures of natural items typically show a Gaussian distribution. In this distribution, numbers close to the *mean* (typically represented by μ) are most likely to be chosen. The *standard deviation* (typically represented by σ) describes how concentrated or spread out the odds are around the mean.

Aesthetically, Gaussian distributions are good for values that should be approximately the same, but with some outliers for variety:

![Placeholder](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAFCAYAAABFA8wzAAAACXBIWXMAAA9hAAAPYQGoP6dpAAAAYElEQVQYle3QsRGCUBBFUSTC5O3+3b2RdEFCHVRAM0TWYmQZzlAARo6NWIQpDZzgdEAPXIGxqqbMXCJic/enme2S3pK+kj5mdrj7q7X2iIh7Zq5VNQM3YAAu3QlO/x7+AMEfQbrSnmmxAAAAAElFTkSuQmCC)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/3bb076f5a43a4a68e2093725aaf1510ab0fd408b-8000x2000.png?w=3800&q=85&fit=clip&auto=format)

1D Gaussian Distribution

When the standard deviation is high, Gaussian distributions can produce somewhat erratic results with extreme outliers. Note that Gaussian distributions do not have a min or max, so ocassionally it can be useful to bound them.

When used for x and y coordinates, this distribution produces a cloud:

![Placeholder](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC8ElEQVQ4jYWUSY9NYRCGT+s2O9/3VdVbd4EWs8S0IuaEhSnEFDaCsEHY0yIxhV74C9L4A40OC9MPEPSKFTZYGHaIXpgib6uT3LSIm1Tuufec7zlvVb1VlbtXER3uPsrdu9x9nLtPcPdJ7p7cPUeU+J7o7mPdvZNnW61Ww6iaH+2w8QFRd28B6AYwG8AcADPdfYq7W7xsDM+1Wq2OkcB2GEFTAcwDsATAOgBbzWyHmW0GsArA/ACXyKYrGFWjritSRChZYWbbzeywqp5U1Quq2quqZ83sOO8BWEbl/kctz44mtIo6sB4asLVmdpAQEbkmIrdKKfdKKQ9F5I6IXFXVM2a2H8AaANPblHZWQa4BTGM6ZnZIVS8H6EnO+UXO+XXO+U3O+VUp5bGI3OAzAV0a6ddkVVE35rrYzPao6iURuZ1zfp5SepdS+pRS+hrxOaX0nvdEZEBVz0X68yP1cVV0i01YzfqIyPVSymBK6UNd10N1XX+v6/pHBK+HCC2lPBWRPjM7AmClu08mi0ChHQBsUNUepppzfkk1AfhZ1/WvCF5/o2qmHyp7AKyPWtYEGoC5ZrZNVS+WUu6zXimloVD1a0T8YPp8ppTyQFXPm9mm8GgmsLC7AexlN3PObyPd/wHvs44ANoeFCoGJdL6FdoiGMOUv/0j5O8vB7otIv6qeiJRnNQo5Zt1tTemjNVj4/zTlkYhcMbNj4cdusqoYdNpmoZntCpX9OednKaWPYRVahqAvYZtnInIzbLObliOCE1PFlNRhnWVmtpe1DGMPspth6sbYg9FdGvsAgOUApjbLompfCmEfTss+vj1GbyBG7y6v+R/HkuMZqc6IlTa8eUYuB1poRijdxfqo6mnCI06Z2VEz28kF4u7NcqAg7oSO9uXaKOWgs0mL2CgAG81sC4Pm51QAWMBnOBRxZnjTNOurHcq3UDprykZNCcXcQgymx0XAD59h/ZtdOLxkKzMbCeVNQlkCHmJ9qIRBi9EVVPUXjMDfy0DpRtcpwl8AAAAASUVORK5CYII=)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/fd5fed7aa1454ed27b0d335f3783383d712042b5-8000x8000.png?w=3800&q=85&fit=clip&auto=format)

2D Gaussian Distribution

If you're using [Processing](http://processing.org/), the [randomGaussian()](http://processing.org/reference/randomGaussian_.html) function will use a Gaussian distribution with a mean of 0 and a standard deviation of 1. To change the mean, simply add the desired mean to the result of randomGaussian(). To change the standard deviation, multiply the result.

This is the distribution that I use most frequently.

## Power Law Distribution

Power law distributions are exponentially skewed towards a defined minimum. The probability of a number being randomly selected exponentially decreases as the number gets larger:

![Placeholder](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAFCAYAAABFA8wzAAAACXBIWXMAAA9hAAAPYQGoP6dpAAAATklEQVQYlbWO2wnAMAwD7TuyRBbK/huV9AEmhH61Bn1IgrNCHWpXm4qaRVG087lkEZ8DgQF0oHFdFs3+0c6v2Q8LK3DO2wHn5zfg3Z/AA5R4BWZXKncjAAAAAElFTkSuQmCC)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/04083d64bb89224a4a516b80ee7b011da930d903-8000x2000.png?w=3800&q=85&fit=clip&auto=format)

1D Pareto Distribution

The [Pareto distribution](http://en.wikipedia.org/wiki/Pareto_distribution) is perhaps the most commonly used power law distribution. Examples of this distribution in real life include the population of cities (many small cities, few very large cities) and the wealth of individuals (many poor individuals, few very rich).

Aesthetically, the Pareto distribution is useful for achieving a balance of different sized objects. The range of sizes can be very large, but you are likely to get very few large objects:

![Placeholder](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAA9hAAAPYQGoP6dpAAACVUlEQVQ4ja2UW29TQQyED1ILlF5omrZJm2+8Te/3e4FSoQqJByT+//9Bk05QVB544UiW93hnba893k7SjqSxpG1JaxHbAJaB98ACsCSpL2mUfethzm1V1VFVPXSSDiQdBjQIyLYx0AdWIg60FdxBtKKbpHNJX+3wLD+HgNOq2I6ALWAd2ACGQEvws+i9aAe4lfRsh8eSTiXt5xqj2A6AgTOLbE7yecGdRI/jdFfStaRvXb18O1Xl66xaYrPjReAt8M5r19e4qmrRm9HDqjqsqntn6M2dFLdnyQE7XLIzNyYO3ZRt7wc/SF23Zh26BkdJfxjApD6p30dg1Q2Kk/EMvqKd0IWkpy4/rsHoFW38LYcyC15LWg9uPEObUbI+ntAmNbChX1Ufqmoxto2qmgcc9I3XVbVUVevZN74XvZY+XHUp6BSwEKfDHJyrqq611mW9GNywtdZvrbmBa621XmvNDi8NJF11gVcssbmWvu4cMO91Va0mmIxP0EG6vV9Vt7OT4s4NIhOOhX/LmZTeq0kxXtGV4XjsQtIJsckX2+EMsfuviD0dhN3ovT/EBq6BW+AcMFX2Y7vwqAHbwMgjCRwEdxN9ApwBDvBZ0g87/AI8AnfZPI/tAThKkL2sHeQ++3dxfJeEnoFfXQCfkpUPHcd2E0ctspeMrhNseosr4BJ4An7+/yvrZWQu/cIAO5bYTuPIjbF47QnxS+R9a7PD2qN4L+n7dJZtNHgy6P+YZXd2OsumzF+z7HTNIV/HD6ypYZvr6UfVTi1em2/TB9ZcNF2sTZ0bP7C/ARlZuTbCJYFLAAAAAElFTkSuQmCC)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/0051009f5acf2de0d1625847b296697e7a1429a0-8000x8000.png?w=3800&q=85&fit=clip&auto=format)

2D Pareto Rectangle Sizes

For example, in my [*Community*](https://www.tylerxhobbs.com/works/community) series of works, I used a pseudo-Pareto distribution to choose the length and width of polygons. Note that there are many tiny polygons, but very few large polygons. The number of small, medium, and large objects is well-balanced.

![Placeholder](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGQABAQADAQAAAAAAAAAAAAAAAAYDBAcF/8QAJBAAAQQCAgIBBQAAAAAAAAAAAQACAwUEERIxBiFBFCJCUXH/xAAWAQEBAQAAAAAAAAAAAAAAAAACAwT/xAAbEQACAwEBAQAAAAAAAAAAAAAAAQIDESExQf/aAAwDAQACEQMRAD8AobO3M22M21pOtjsj9LQsvKIvG4DBkQmaeZvLiDvh/Vis7JlZWmQRhz3e+uiuYS5E9nYS5Jc4tk6B65LJOrJaXjPVw63g3lfaYseSzbQ4a05vSKSra54wog+STkB+J0ETTSC65N8Z63k4D8KPY+FH1eJF9YBo6b7A38oidgavheYH24rAOgiIpoq/T//Z)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/90d84256dacd0f777c2dfcce6edf0fbf25b49a88-4000x4000.jpg?w=3800&q=85&fit=clip&auto=format)

*Community 5*, 2014

## Continue Reading

* [Utilizing Random Number Generator Seeds](https://www.tylerxhobbs.com/words/utilizing-random-number-generator-seeds)
* [Code Goes In, Art Comes Out](https://www.tylerxhobbs.com/words/code-goes-in-art-comes-out)
* [Incomplete Control](https://www.tylerxhobbs.com/words/incomplete-control)
* [Color Arrangment in Generative Art](https://www.tylerxhobbs.com/words/color-arrangment-in-generative-art)
* [Aesthetically Pleasing Triangle Subdivision](https://www.tylerxhobbs.com/words/aesthetically-pleasing-triangle-subdivision)
