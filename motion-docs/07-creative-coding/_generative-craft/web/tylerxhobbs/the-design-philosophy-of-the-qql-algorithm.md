---
source: https://www.tylerxhobbs.com/words/the-design-philosophy-of-the-qql-algorithm
title: "The Design Philosophy of the QQL Algorithm | Tyler Hobbs"
fetched: 2026-10-28
---

# The Design Philosophy of the QQL Algorithm

ByTyler Hobbs

Published2024.4.9

Links[Project Deep Dive](https://www.tylerxhobbs.com/words/qql)[Works](https://www.tylerxhobbs.com/works/qql)[Project Website](https://qql.art/)

Back To[Essays](https://www.tylerxhobbs.com/words/categories/essays)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/031f0f7e9755238c03d3a28544c1a806d50a0e8d-6000x3376.jpg?w=3800&q=85&fit=clip&auto=format)

A year and half ago, [*QQL*](https://www.tylerxhobbs.com/works/qql) was released. While *QQL* is experimental on several fronts, such as minting mechanics and [community curation](https://qql.art/mints), the core of it is a sophisticated long-form generative art algorithm. In many ways, designing that algorithm was a fascinating process, and one that helped me to clearly organize my thoughts about long-form work. Because this was a collaboration between myself and [Dandelion Mané](https://twitter.com/teamDandelion), the co-creator of *QQL*, a significant amount of time was spent discussing the philosophy of the design. Perhaps because we both share engineering backgrounds, we were eager for a philosophy that was clear, communicable, and actionable. In this essay, I will share the final design philosophy that we arrived at.

![Placeholder](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAaABQDASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAYHBAP/xAAmEAACAQQCAQMFAQAAAAAAAAABAgMABAURBiESBzFBExQWQlFS/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AN/qRmr7EZ20isZF8ZNIke9DZPbNXX1CyywcctLYgOsxAdiPeoKOXZrk3J4FublR9eVU7UaQE/FXTn9rb3mAs8cl4Jsla68PEaMi/wBoJ/8AiXG8ozXd5lmtJpDsxKNgUVitrkWSNDPapJIGJLOO6KBWwlnb2zy3McfjMrh4w366+KqOOv4uTTY5bplXIwtstGNMAevE1LAx+1n7PvTXwwlM7aMhKsUOyOjQW58BZhtTwWcz/wCynZopayc0i3I8ZHG1B6Y0UH//2Q==)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/2a9bae85e239641ddd0eda98e8ceeaec65e2c927-1529x2000.jpg?w=3800&q=85&fit=clip&auto=format)

Dandelion and Tyler in the studio

> Emergence was perhaps our favorite property of good long-form generative art, so it was a pleasure to focus on that in the design process.

Before we dive in, it's worth remembering an important characteristic of *QQL*: mints from the algorithm are not generated randomly. They are carefully curated by the community of collectors, often after combing through thousands of outputs from the algorithm. This means that the algorithm can afford to take a lot of "risk". It's okay if 20% of the outputs are bad, as long as 1% of them are excellent. Collectors will ignore bad outputs and only seek out those top 1%. As a result, when designing the algorithm, we had the opportunity to optimize it for *emergence*. In other words, we could optimize it so that those top 1% might be wild and unexpected — truly surprising results. Emergence was perhaps our favorite property of good long-form generative art, so it was a pleasure to focus on that in the design process.

Looking back at the results thus far, I feel quite comfortable saying that *QQL* has been wildly successful when it comes to emergence. Not only has there been huge variety in what people generate and appreciate, but there have been a truly remarkable number of those bizarre, one-in-a-million, what-are-the-odds kinds of outputs. These are real surprises, images that neither I nor Dandelion anticipated in any way. In many cases, we're not even sure exactly how the algorithm arrived at such a result! I couldn't be more pleased with an outcome like that. My goal, by sharing the design philosophy of the *QQL* algorithm here, is to assist other generative artists in achieving similar results, if they so desire.

![Placeholder](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAZCAIAAAC+dZmEAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEj0lEQVQ4jU2UWW/cNhSF/fOLLmmLpkXSxont2LNIo5FE7VxEkdpFrTMjyfZolv6TQk4eCvCBxL0fcC7O5bm5nobrdDhPh9OxPx0Pl+lwmcbzNJ6P43Uar9NwmRvGyzRMx2F67Y+vw1w6PV9P481l6p/7vKritEzqmr/s+Usv+k70ZXiok31XDp047vN+XxZNxUUV5KKqy+PLfobPx4MoQ5dCJ0BRAtvCFQlKIBDgoXQ3OYMN0Q5kWQQaDTw74AoMPJ+2jThPw8352GdF6hCEfBSHfsyRCYD8+MRWt6W5rDA4mJ+b9U948bunPjiupdkQz3D5Bk9DUwvGKKMkozTGRNMMSdpgsGU2yIm1I1Ku/eM8/WnKD5IGNsCOw2Ds28ssexp2TREQFzomcxGzHd9SQm8dumtiyhFUSwYyajBkeMi7M8i97lCGDvtqhi/T0NaZa26kxZ2iAEsHvnqX6H9Wzq+1875yHyqiltROKOKMOjSwoRrSxa5hs+zLNO53FYLO02L1eWXcKfbD/Wfl9sfC+HlA71v3S4s2HQGpZ0TQTqklgkUR/NOW3vn4Bo99x3i42jofJO/HJfzjUdE2Xwu86gKpY/KebzuqYddWgQ1NlUOZUbUUwenY31xO4/Oh5QFf6fA3Cf+wRkvHS2OrTu0qserMqlKLUfvRQH/JUFIAAAAS3DTZ+djfXE/jeGg4Z4qNPm7R3xpyfFTmsCpQmaM6JRFDquN9kOFHyZNUZ6PatkeaWnyXvd9XPCKMuqEPPYRd7EdRkCRBHpMmJCl2kG1sdUtS3UcF3soIWKQR+Td4qJuCc6eO7b7wyzgIfIIZ80MeBaSibolADZUUGooB/1ijd0+easC2SGbZl2koy4JgL+Q4FUykMKa2RbHNGQ18QZ2GGDXWUmyuTffdg/bLJ1nTzSaPvs+862pMmYl9wDFmek63COuK52xd4niIOJZrAsezTQ8spcX93ZNrWF2ZXabh5noaXsddXmSO78sQSN4awTWDK8uQVwq42zoPivUgaQsAHKKGaE30deDau6b4Dp9e94dOpBxS/KTD+6UrqXBrOxsdyJK+0dWFKd2ttKXsyQxvuKsnAR7m9RxurtM4Pe/6ToiEJIHE6crEysLd3lvKV3sLvG2mf4pX72VttbRkz90yHxdZ2h/ab+s5vHRlX6ZtmSZZEDE7wVvTkG4V+W+gy64Z6I9U/iIDY2OZBLs8iglP40xMr/N/HnYirRht86Ss8jRhMXWxrSmqvjRsxXYc2/ChhSkNGI/iyCbhyvAJT6fXfoarMgt9HBBMeJjkmSizPA3jMKABoQzHUVBksRBZmhcm4rdr5+vGiZN0tuo8DV2bR9yzbF3SbQMHYcSyLCxEVoq4rXjXJHmR0Tg1/PhJR/drDQC9nH1+m7nfFVnsIgQcx/KgSyCAyHV5HKVhJ0hTMhJGNg4MxFyf0QBlkdt3yTerxtex3bVZVadtlfd1cqi4EEkkSlHlfZv0XV41VV3mTVXsu7rfV+NBTC/tnJ7X03h5i+U5q9+C+t9puEzD6Ticj8Nl6i/zc27432W8nubzH75xcBlBYOQUAAAAAElFTkSuQmCC)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/fa19eb75524c0843ff2aee7cd7fae896d82aec12-2400x3000.png?w=3800&q=85&fit=clip&auto=format)

QQL #138

![Placeholder](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAZCAIAAAC+dZmEAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFAElEQVQ4jTXGaVMTZwAA4P01Vkvu3exm73evd+8re+YkByCECqgIilpEInEQURBy0qm0U+3P7MBMZ54PD/Lnx9e3Hw5+DPf/Pd77efz05+HKz4P473339pn5fUO87TK3Pep2AObbytW2cvlE+vZEvtlW/3lu/dhzkdnLrZv9rdu93/56sfl9d+X7TvrHwLheky477EWEXTq5S69wXWcul8XzZfGsLXzpSLM+/L5m3m54yHSlPVtdXqy2F/3mvBvPW9Z1KnwK6JFVHolLI/qXj/zSmUacmszIZE4c7lMoX8XqPDUWNRuZJsE0rk5ifxzak6o6ccULix3p5LGEDenssLJ0QufOeOyTQJyKxKnKfLakbxacmOrU0pCpqU0MdaLDsQomkLpSKmcyfiJiJwA95UtnfOkcoFcCfi0SY7kyNrixKU1UaarIM1VBriXhWhbHsjAW6bFIfBbLH0BpCEqnAnYpEddyZaxUZpCcQ/JGoxe2MDflqSLOZGmmSMgnnj0D/DngzgF5JhDvAPaKKx5wpaFQ/iwRXxTyClJzlVlozI3OLkwwh2Am8PN7yDFNfKCJEU2MGPw9g+1Txadk/jlV+J0rDQE6ErFzmZhCaqFSC5VeQHou03PxnkAhQ7Z4zBSHTOmYLR4yhX0qt0tm9pjsW5A9ErNDKX8G0bGGz3R8quMzg5xZzMxiJgZ1DQnkWMgdguxbkHsDsq9B5hWfeQkyL6XcgZp/Y+QPzcLIxr64+FeP+OpVLgL2siZfpNJnnznRUOSdUnyl5F/IuV0puytn7wILzwxs1yX2q+TLgHob0kcRcxSzRzH3vqEMe+77rnMQizt6GdkzyC0d39SxgY4NNHSgYRtG5bHDDQJxK5G3EmX73l1SdaftPV2r76zU1lKrbvDIqsY2IZnCyv+oROcTS2n4eju02rHdiuxmaDVDsxnZrXrU7rRa7UYU+Y6lIxGgLL6i8YQOKpZEexrvm7Jvq5FrpL6dhnYSGnFVjwM9DowkctJakNSCMHZ9V0MCUHZ4zOJQG5RDjWv4sBXqrVDvhEYvMvuptpJKvUToxKAT8p1I6CRytwaXU7npcUhLReuwVFfyDYj2PHG9bq+33PWW86TpbLXs7WVtpyNvtYX1lOlXyZWAXA2Z1Zhbjbl+lUQ6Lr1skx0L69rUemIOOvFGL93sRtvd4FnXf9a3nq/oO134OGY7LtnxqF7A9kPQj8FqxCLNqtKuim2PX/aVblzttmqddq3fCtdb4aATbvb8Qc9da1l1Tww0NjS4yBZjR0k8mHoK4rl21TMCV/Md23ND208cP/J9L4qjpNFIms24UfejRNEsXlB5SQeKJUBHUF1BdRHBjAQzuGNEvJGwWsxBX4CWYkew2oRBC1abolMj5WoZuGXBLYs+Lod3xCrCmSlrxKyR3NFjWvYoXmV4hYeOYIbAjHgjZKCPAwvjDJQzMN7CJZ+QPBw4iGj4gu4DzeM1D0CHAwpD8SzN80AWRBWIKgdUipNxSsArAK8AgpYoXqd4lWQURJUhVFRZgrIEVSAZNK0TxB2SNEjKIEmVqEhlHGBlgJYBVhYJUqE4uUKJOIF4LOmwlEWTNk2GFFEnSo1y4V7xDlZI0bxfzJiFJbPwq1lYsrG8h5ccNGcVM0iEZX0045SWvFKmgeZ6aLZ/J9fHcn001ytll4uZpPDIzf1i5x44uQdu4aFXeOTlH/r5h/8Byw7oYTPYESgAAAAASUVORK5CYII=)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/a510a8339f7ac35742cba2cb86b4194cf02748d7-2400x3000.png?w=3800&q=85&fit=clip&auto=format)

QQL #154

## Orthogonal Features

Because Dandelion and I decided early on to optimize the algorithm for emergence, we began to contemplate what qualities in a long-form algorithm actually facilitate emergence. We took a look back at [*Fidenza*](https://www.tylerxhobbs.com/words/fidenza), which had been particularly successful in this regard. There were many outputs that were highly unexpected, and in general, the algorithm had a wonderful feeling of surprise as you scrolled through the results. At an abstract level, we wondered, what was it that made that happen?

The core idea we began to focus on was feature design, and specifically how different features were related to each other. You can think of features as the high-level decisions that shape what kind of output will be generated. We thought that the most effective features were those that were:

1. *Independent*, in the sense that the value of that particular feature could vary wildly, without restricting the range of possible values for any *other* feature. This quality makes the features highly composable, which is important for getting wide-reaching and unpredictable combinations.
2. *Distinct*, in the sense that any pair of features are not overly correlated or linked in behavior. Each feature should bring a distinct contribution to the overall result, and not be blended in a messy way with any other feature.

We called features with these properties *orthogonal features*, which roughly means that the features are “perpendicular”, in some sense. If you think about the entire potential output space of a generative algorithm, it is a multi-dimensional space. The different features are what contribute new dimensions to that output space. For example, if a simple algorithm only has three features, scale (small to large), turbulence (calm to wild), and texture (smooth to rough), then the potential output space has three dimensions, and looks something like this:

![Placeholder](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAABYlAAAWJQFJUiTwAAAA80lEQVQ4jcWU2QqDMBBFj9FqbEx3KH3q//9lGbgpQ5C2itCBQY3JyZ0lgT/ZDkhABMIWwD1wAzLQbgGMwAHo3VgQvFkDHKSyhGuQEThV44uBRdEgxRfgqByvAnZ6LwXq5YsV2qJJ0CTox9w12mXOW0GsymendG7u26JykbWg+Chld+ApaKrmJOUzeejoFIwKaXAbPeST+1c8ubXvHm21eHC7BH1ntUdWqFT5ayUifsprU1Uzru23AutdNUPVh4ssSH7WsyhaDezV/dcqxPro/WydKnmsAFHji48YyqGF5tVY+Kbc8rrJ9eWP3iZAM1P+9e57Ab9CBWVJRdQIAAAAAElFTkSuQmCC)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/bb46d784897291e1313c323496e9cb566c386cde-1930x1930.png?w=3800&q=85&fit=clip&auto=format)

This is a very clear and well-behaved space, because those three features are perfectly orthogonal. They are independent, composable, and distinct. You would never confuse one for the other, and any particular value for one feature could be safely mixed with any combination of values for the other two features. These features are clearly orthogonal.

When designing *QQL*, we wanted to strive for features with the same properties. And, whenever we felt that the algorithm needed greater variety, we searched for a new, orthogonal feature that could be added to the space. This may sound simple, but it's actually quite difficult to do well. Many potential features are hard to combine with the entire potential output space of the algorithm. It’s also common for a feature idea to begin as something small that’s hard to generalize. Or, the feature idea may be fuzzy, and hard to distill into clear boundaries. It takes some work to cleanly separate those feature ideas into distinct, independent, powerful concepts.

After many rounds of reworking, the final feature set for *QQL* ended up being:

* Color Palette
* Color Variety
* Color Mode
* Structure
* Flow Direction (or Flow Pattern)
* Flow Turbulence
* Density
* Ring Size
* Ring Size Variety (e.g. constant size vs a mixture of sizes)
* Ring Thickness
* Ring Pattern (i.e. 1 vs 3 vs 7 rings per dot)
* Margin

Most of these are highly orthogonal. There are no restrictions against particular combinations. And, each is generally a clear and distinct concept from any other feature (although some deal with closely related aspects of the output, such as Ring Size and Ring Size Variety). With twelve orthogonal features, the output space has a substantial amount of variety. I believe this is what made it worthwhile for the community to generate over 30 million *QQLs* in the first year — it's able to continuously surprise.

![Placeholder](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAZCAIAAAC+dZmEAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEG0lEQVQ4jYWU6XLjKBRG8/7vk07ctmVZC0IbiB20ISHsWFIeYspO98zPqTo/blGcAu5H3bfd682rJ4ve/Q/qxU/xWln+Rf3do7+9ftsX7a2YO/zoqm1EXxZ/WfSw+IfVNrslm2Wr5evEb5aOA7Ej8RPfvH7bFj33pG+uS338IuFNJ7cW3MwfvgzcTL61+aMrHl0x6YwKQGQ+Ds36lL22BssyaLPjXASzBK4r722xvtjaYu/Adxfufbi3Zy+Pgl+JyOzQbF495V7hOk9QHgmUKpkbU846X3W+6fx57JBuw3Xtzqs5eHPWJhEGThb/kceOIJTXNcSkYKLUshxZ6kniaeJZsmhgDezp1dLL3MF+KPu+dLbZlp+TR9qoioqK4FxgOPJioumILhYHtglGFnWyMDTvKBxa1JpSs2xS1ebU2+71YCk2BdOFIdlQxFMDWppKdJF1oFCg8cUQ0NKyZ2UrKkYhrZKRF5uTz6h6y2pdYA56BicCe5YzCpoqQlVSI9DUWVOCpkhplTEEG5Qxkk8deb150Xbisq0kTQ0Bgy5tX44iaaurbDIhS8lLVgNUJHUJUQUxglKi2Ypnzvui73PjBjiyWKGolcAN4N7GnkeLSBaTzDwa0FViwEhFSEVZZTReLN+Wp6w2V9/6ZGLRQC6DCOc+W4Z8MeCmgZNpWwUKBrK4ijLhZULLhGMwGvzs9u7VNjXeZJNMnDh7flhUZA2cdbyYbJCVwJmoUpOHXXbuwUmlJ1VcJ41e8qK2rn7wyItwZMGAD5aFLU8GHt/aYm7rQeUDz+cmXcrzAo82PY5Z4GX5I8vdgJ1+ruxjYEfWXARNeBMrnCwq9102irDFUVfHtjot1cHBT1ccbyJ/RvW9yL1PN/GxsveRfjblCeVBU4SqiCYcjywSdYCyAMNQ5meLDnNzdDy8dX+uLX0LLfltq4+hOKj8KOBJZpc2vczpuc/OJAvqOsFNRutY1heJw5Ymc9tsTr9tTnYMsuxkwO8Jnl0dujpw2WmJj7fglws/FDhLknWm7EXW0diQa0tj1+JnVKuTLYEiPs/p+VZHNxQ96suKwhVdH+nhHr/PxdHx1Ot8YEnbRBKFAoWDqtZFva2L6nllQOjSwDeJI+BO0k2CVWd3Hk3oc6g/JxZOPFLoyqqYVAmt017VT3lz2rFyhNc5v85V1FfRgGOvgDNpz2Je/EbgF6sCWV94FQoMZAM6UfqRvhrm1INAD88Linwd9vAkyrNmsaFxW4dtfpDFOytPDQxYddUU6CYeVf4105+/rTZZPlC0CrDr/KHAyBNNs54Xi4B3Gd91MPFA46iX5dzhSRVOV4+Z70/Z693ybSD7RL9n/u3YwxLf0y8rNid2x/e52ab6a2wes1gX9Zj4w7LtNYNf8v/z37h+Tu+/9T+xCt+drURldQAAAABJRU5ErkJggg==)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/aefd02f1c0b50ebcc955d041abcce6dc754e0eed-2400x3000.png?w=3800&q=85&fit=clip&auto=format)

QQL #1 features high color variety, low density, medium size with no size variation, and 7 rings per dot.

![Placeholder](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAZCAIAAAC+dZmEAAAACXBIWXMAAAsTAAALEwEAmpwYAAACpUlEQVQ4jW2UiZKjIBBA5/8/bZKMAg3I1d2oqPmLrUaTmZ3d1CuLw9cHZfhgZuLfv18r9IY6rxc+iBmJM3LGmpELcqaaqaYfyArWJHBCjlhzDyFyRg5YJ6y+CK7MFjt94E6KTJ3sChG7zMyJqsMZcIYym44utT/7FDuvLVPktYj1zFwjiWlErh0GvDDfVFOqwap7mkiXzJGqxQrEFjtEFr8BIpDndyzAGt49J2In0BtxXthL7gM6F/lbjsQOL/lMC0jmb6QLYnj5lywHxpJZtL5xZSBx9AWbPgUk81M+M78FkJ77tGc704r80oDwf/Krw94zv+SL7vP7IH713Lvtpn8f27uc11FDx/48sETs8RTQU/GUJ0yB4oTRY5woTpQ8ZYcFUGq2JPmuA8tME5WJUsAQ0Se0GU1BhTgWHFHQBU1GG9FPGDzlJH8QkalQzjidAuHA5VHLbc6fc77N+bbkz7ncqnDn8sAyFEmfLpnJM461POZ8X9JtTbcWby3cW3h07mu4r1HWF4n4WcujkmOmj8o4k13zfU397enR/Nfmx82p5tTm9OZ0c6p51aaxTV/rdF/iYy72lGkprsWvFr5aGESzage9g9kE2AAawGZtc7Y5aM6sXs/JVzrl7FtQZ7Yd1KHUc9SH0oeCk13BrmEztoFr1jXnlhi6TLSkabPm0Pqp1HNQx6Cfgz5G8xzhOZpjhGMwx2D24YxiN3BLjFXKJl6nsCt4DuYYzX6izKGMmDKAp+S3PUoPpGCdIktmpNWHfbRnbVLnaI5Bd9Qx6ucgUZ4KeiEXzYcuEy0hbTBt4HbjDuV2JYG2s0/dS+2dS35tD+N28GuQz0S+sBlxSWWNeY1pDWkJaYm/iGuI6xRbSE1281zkEhOZmWvnvKPP8b/8dWX3e/sPDiAIrigXGlEAAAAASUVORK5CYII=)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/8c647db9963e05cfae697f53003d35c6a0106d6b-2400x3000.png?w=3800&q=85&fit=clip&auto=format)

QQL #245 features a circular spiral structure, high density, and small sizes with some amount of variation.

![Placeholder](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAZCAIAAAC+dZmEAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB7ElEQVQ4jXWUC66rIBCGuwotYgVRBAQGvPtf3M3wUKw9yR9CgI95MbzeQ0doR2g/jD/1fi4SinoP3YvQbuJUrJNY2SWZtLJFotKEpzkXknHxGSdChv5Fxl5ItntpvbJ+2/1mvXKAsjgvcqAdaB+0A6XMwsRIaP8itF825oKCY/cBt30wEFH5aF6EaMKxh2OHaHYnufgUWEjmQKXTWfkK7UJ2QXu0aSAm+EB4XqYLtn5LdvI57aN2oaouQvboaCwPKWbr0b0cVYJb+3URCn9ze6nwTRHjhJguSik4dXM7wVvO0On8eRTJwwBmy0DEhFm/tTC3oIqr5QpkPJrVJ1wuai2XmDOcT1e3WziUQhof9Lfb7glffPU8lkJ+l8pBKlWTMJxHDUf2/3o2HuHtYfksVWstGWxJHwzC6x0+t6+qVPheQvPT8nUIsMhNtYKp78f8hHPfKH91QoJTniGamg7zhDk2QJuwlGck/5VOKm8+oCPWb6KJmbugbkWqqca3kRN+vvn4C258u7l9tWo0DcxqndeSsFLbexucZPM8m5jFio3hQNsUeduPJf5vWM6iwlx8lFn0vqodR20ljjjJkkmrsTJp3bRgc/rD3kNHP2TilM3jxFFsRk1FFEdcxwN1i+LvSTuEn8rf8l9b57/9Hy0+42GIcxTnAAAAAElFTkSuQmCC)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/66abd5bcaff50c22a3de0ae80afd08014dc154bd-2400x3000.png?w=3800&q=85&fit=clip&auto=format)

QQL #240 features a strict Formation structure, vertical flow with no turbulence, high density, and 1-ring dots.

![Placeholder](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAZCAIAAAC+dZmEAAAACXBIWXMAAAsTAAALEwEAmpwYAAADrUlEQVQ4jYWUCU8bORiG8yPIyYZA/Nme8ZUEwhEgnAHSQrblWM6SAxiOhJJzclCkcnUr7a/eHQ9EbFvtSq9mLI+fef29/mSPDylXfogN0tFhMRFVkxE+HiRxPR/rL/hZHvc1SBOx1GJuZ790cXFeqeTPrLUP22YyHcDx/4FDNDG1lD2vlDu33ZtG/ermc91udr5085YVm176D97jQ0qlFqxyudFubuzsxaYXzWQ6OZfZPS50vnQ/nZyS0WmvLuoXcIgk1rd3W137/dZumCUHonJgRHqjEuKpw+JJ57Yzn80F8L9I/6s8ET5ePD+v1G7k1MLAiPRDrG8ys7Jud9vbh5+G2Jg36nzyuQEhFQEVQsozIietStmqlOnYzMCIcFf4QXmjciydqbUaB4XSsJjowwGkCEiFRRikJ8LG85Z1XavGphdd+NUhll7bsHvtrYOjsOk6Ky9SYVBThM0RFkHSEySJ7OZOs2Pn/th3HQaiTs10dOb49MzutdOr629rZlh8NIx31HRgH1J8Yq5gndft5sf9o+TcikwtTC1lD0sn7dvuXr4I8ZTbQj5tu0zZBSM5w4yAhoMkPpbO5M+sVseuthqVWrXRbjU79l6+KCbn+7ZBpEaxKDJa4/idYQ65sMubydmV3OZBoVSwrN3jwnz2dxxPBXDMrxcE9Ia3DaPOcZmTZfoGdhUiiRExgWJTTm/juC8q3fkAUgaInGFeM1Lj+JTRzM+wT3eIK1/0ZTKIFAOxQY2yJiuMXDGy3q/5x+55bQa/TijuxGtWGLY5NDm2ObYF/mAYL2n/IK/bRqAoyHnCDg16w0iPw71AT1pdAbkfYG/fTVc4Q/m2YV4y0uC4x/GTQH9J9F2ie4FqHGepOeTCfl1YGCkMMkH4MmW7Br1kpM5xi+OugAcB3yV6lnAnoMXxBXtNO4gUgExivkTZpmGUGLlmuM5wQ5M9ge8FPEn0VUCHQ43jMiNFky5Q5sC/gZol/NikV4zcMFzjuMZw3QnG8XmU8CThq4SegCaHKicVTk4dZw0PgVol7FKTnxl2T/JWwIOzT/RNPx8dZ3Qn4FY4f2lw/NKeQ6BWKLMYvXZIZ7d3Ap51Nn9q+JsePMvoo0AP+kd3ArYMYxikJwxqnvIjk5ZMajFS5aQtoCugy13hjlMtbutDdoOocvL+JTBQHIsU4bOEL1C2SlnWMNcMc406WnVmnOcKNTOULVOWoWyRsjgWzk3itC6okNagvmIcvR2/KqTlDMA52n8uwL8BjfM30R7IsGEAAAAASUVORK5CYII=)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/1919244c178ef3de568d4915c6eb759c6be0f289-2400x3000.png?w=3800&q=85&fit=clip&auto=format)

QQL #117 features the large size, but with *wild* size variety, which means it can jump from huge rings all the way down to tiny dots.

## Continuous (and Probabilistic) Features

My first long-form work, *Fidenza*, had a lot of "binary" features. These are features that are either on or off, with nothing in between. The Spiral, Outline, Super Blocks, Soft Shapes, Sharp Angles, and Margin features were all binary. On the one hand, this is nice, because it makes it very easy to tell if a particular feature is enabled or not. On the other hand, it constricts the output space to a more limited range, and eliminates the possibility of outcomes somewhere in the middle. What if *Fidenza* had not just Smooth Angles and Sharp Angles, but also Semi-Sharp Angles and Very Sharp Angles? Or, what if outlines didn't always need to be complete, but could also be partial, and selectively applied? Or what if there was a possibility for a loose spiral as well as a tight spiral?

![Placeholder](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAIAAADtbgqsAAAACXBIWXMAAAsTAAALEwEAmpwYAAACx0lEQVQokQXBWU/aAAAA4P6wqQvKqUChFGhLy2FpKaXQFijWgiCXB95GGerMVDwWwWMM43RKlrmJcZotc9Msmj34tH+x7wM2NxYqc8XcsOSJ0VQxwhX4SCpWq1V/tE+a9fXG7savy49n9c2pwlBlNr80k6VJD2iG/CTJMjhwvD91UM1Nj0u+eIAsCmxRjA4njpq7T3cXrePaSWP3793Vdeu4Mju2XiltLY9HIwEUwSKiEFUk4GQvf7yTmJ8Iu3kfMkjjSTqk8PXa2k379LBere1s3LYvzj80Z0r5pdnsm8W8ECIhmwMjgxgbAdIynY67GRLWWvQqm6HH3ttnB0WBy2WUqMCJfGSkkEsqss+DsxTBs14INHV2dXf29HZ0GwCOtDMeh8vUq37Z1a3uVvWoXnR09RlMThixmkEbaHS77ChiczpgPhySYqKHwF0owlAkR3uBajm+NCVnOdJrA70E5kIRi9nC+JlMIhVjOZ4ikmL/gOjPpuVmY//T+elyZeF1eeaksf35dAc4rI6/XR2dGgqzXoQLUkGa9BB4JpkqT88WkskhMVBSgqOD7Pxk8ftN++/jw/uD3aO9zfvb1tPDF6A4lMgoAhfAHZAJd8K4w+6ErCzDSJLEBGimH0uwRJTG5Ri/XV1rHNTnp0uL08X9rZV39Q0Ahi1mi1GtUWnVKrvVBIMmnVZr6OvTG80qtdZg0Nkhs9lo6NXrMKeTwHEbBHkITAyzUZ4DfAxBULgNtTAUtjCZnCslOdrtJVAUcRpNegdmp0MBjEA1Go1BqwNNetgGJmS5XJ5ffjUHpMcGUqMDwiBbGpO+tao3Z+uLWXGEp/KSnw9aQwKpFFN8IgI5YBRBQ36XxPt3Nld+//z6eH8NZEbl4ZISTwsTk+m79tHjVXM1L4+zvknFLYVBX9DFpgR/lAFRp8vTH6QpKUwdbi0+/7n893z3HyiEVWohcKVwAAAAAElFTkSuQmCC)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/3f77487db98d6b070d8ed1ad065ed93864f1f53a-3228x1956.png?w=3800&q=85&fit=clip&auto=format)

A random selection of Fidenzas, showing many binary or otherwise non-continuous features.

While working on [*Incomplete Control*](https://www.tylerxhobbs.com/words/incomplete-control), I decided to avoid these kinds of binary features and instead to focus on "continuous" features. These could have a low value, a high value, or anything in between. There was a smooth range of potential values for every feature. As a result, the set of outputs from *Incomplete Control* are not divisible into clear camps based on features. Every output has other outputs that are "close" to it in the output space, something that was not true for *Fidenza*. With *Fidenza*, a Spiral was fundamentally separated from the rest of the set. I liked that the continuous features gave *Incomplete Control* a highly "unified" feeling, like it was one particular idea instead of a bag of separate ideas.

![Placeholder](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAIAAADtbgqsAAAACXBIWXMAAAsTAAALEwEAmpwYAAACsUlEQVQokRXS6U7aAAAA4D7kEt2cIvdpsUABQRg6RUBAyn0IbWlLoeVouVoRy6UIAVGDcUv2Z4+y7HuGD1g+iqvnIdcgcsnrYbc2HbTQPNJmS8+jFkNkyqXUfMQ/cGgpGRD4ijRolbIxBku9Tnu/FkNgPRe369GgWyXQ1HLSW097VCkpcvjLU6dZLVB4ZjXjZkKJLAQlkV3OBLqc42vo51r6u50DrXpZ7FQpLJ1CgoNO7b5dzcaDDJmVRAYvJtLJcKeJ1okoEnJVsBRfx1NIqJhDJLGxGHcBm9XshCHQpNWqDz0u2HMC69QKG2Q68zjMJp1ep3Y7IfhYo5Ttgka1DTKq5Ac6rfLUaT33OAAnfOw5sR0f6dXKQwdsccKQWiGDQIPXBYNGrV6rdDutVsikUuxbIaPdCqrk+watwuO0nJ/agT5HjQdNmsgnY4E+Twg8kUYCNSI/EhtkKZ1NR7sdhq1hiVigxaB9rpKJh7B8bCyyTxIPvC7uf79Ph32GLqffFv23hVAlspJQ/1yP+g2CporLhTR5aJNoajrkNs8DhipwLPbxIv35mAEN+rbTwG8z0Wu/lyUzLJkLX/mKmRuOLqZvriKhi2qliBfi/jP3bTZWKedC/h/R0HmdLnSbOGABDTbIpFPJD/Z2zEYNaFAffNvRa+RWs0EtP5DLvlvMBqNGvrfzRa9Rgibd/t6ubP8rdKSDLUdANOCLhy9/ep12iyly5Qn6HNYjzYXPhUSvvC7Y5bAg4YugzwGD2uClB4n4XXaL2wHdBM8TkUvgSaBWY77XwPBCbDpgx22iFA+02fLjWKCpWxJLLaftUY/Gc9HxHfsyF6pErkYW5qP2ctYHNveFt1lzwGMkmphPOguJI/OxLlueTe4oGquS6e2qt5Ba9P9/3OdmyDFoj6O2m/Hn++M/wEirle/PTRwAAAAASUVORK5CYII=)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/794ebb642022cd433f303af5b214d808a218de17-3234x2000.png?w=3800&q=85&fit=clip&auto=format)

A random selection of Incomplete Controls, showing continuous feature behavior.

When designing *QQL*, Dandelion and I had a strong preference to use continuous features, whenever possible. Most of the final features express a "range" of values:

* Color Variety (low to high)
* Turbulence (low to high)
* Ring Size (small to large)
* Ring Size Variety (low to high)
* Spacing (dense to sparse)
* Ring Thickness (thick to thin)
* Direction (any tilt angle is possible, and spirals can have any degree of tightness)

As an aide to continuous feature design, we also heavily utilized "probabilistic" feature values. This means that when you select a Ring Size of "large", you don't get the exact same large size every time. Instead, some amount of randomized variability is introduced. This means the rings are generally large, but sometimes you might get massive rings, and other times they're merely "big". This probabilistic approach had a couple of benefits.

First, it allowed for a better user interface, and correspondingly, better trait values when browsing the collection of mints. Imagine if Ring Size could have been a value between 1 and 100. The interface would need a slider (with fine-grained control), and when browsing the collection, you would need to use a drop-down with up to 100 options just to explore that feature. By using probabilistic values, we were able to simply offer "Small", "Medium", and "Large" in the user interface, and when browsing the collection you have the same experience. But, even with only three size options, the randomization allows actual outputs to span a range of behaviors that is closer to that 1-to-100 approach.

![Placeholder](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAdCAYAAACqhkzFAAAACXBIWXMAABYlAAAWJQFJUiTwAAAEC0lEQVRIiY1W23LiVhDkM2yDLgZJoAsXAeYOa2wEAdYx4OyuXeVd7+JNbSUfkKc85M876REjiKtSlYcpoaM5PT09c+aQy+fzME0Ttm3j8vJSzLQsFAoGCoWC2MXFhZhhGLAsS3yKxSJKpZL85hq/ESvnOg7GnSvMulcYNRsYN6uYtV1M2zbiehFFr4i8mTozMIFc10W5XBZzXVfWCMrguThu4MeHHf64X+Fx1MPzuIY/70r463MRH+99+G0f+Us652WT4zgCVKlUxMrlsqwxQwEMgwC75BbP0wmSuIak7uB5aGC/tDCfevBqHvK2KQz/C9B13SOgbVmIggCteh3tOEa/c4VRr4V2HCIIPJScUqbP/wI0DAOe56Fer+Pm5gYvL1+w3+8xny9Qq9XlG7VTQBbiVMPy25QJSIcoijAY9HH/8x22m3uMRkNQDjrTh86sKN8JykKcmm3b4pdjdLIgYLVaRRSFAhQ3GhKg3W7LBvqRDf1YyH6/L1ar1WQ/g9AnZxhHR1oQBKhWIySzGfbfvuLhYSdrdKZmcRxjPk/wuv+G7697JEmSgVKSHLUhXUagqeidTgfLnxZ4N5nAORTmVJr1eoX1aoletysBuU8Ynp+fiz58oTGKPA+nh+8MykzIkLIwA4L4fkXYDYcDdLtdIZQjGDViBDKQVvA8AdMgekr4jQAE9H0fYRhgOBjg6fETttsNwjA8VpkOTIeRaGRAXbTKWhRuqlTS3kvbrYbr63fSFVwTwGP1YiwWC6xWK6ku2WhBmM5kMsFquUSv1xVQzcr3fcnKssx/M6Q+0+k1ZrMZGo26rJEFfZgu+/PX769SkEajIcEC38+yObSNAadUkoVUoyqiMMxGE406szitVhPj8UgyITv9XpTGTosnja1HiYCs3KmzAnIeahewYNyjZ9g0TcmCPilDxxGGNAJrMZQlfWg6C3nub29vRZo4joVI1oenbXMqMk2ZapW1rdgFm80G2+0Wg8FAtOc62QogN+lJIUMyoJGpThECaiZsHQLRoijKMsoYqrB6T6Ra+vL7LaBzWFNf+3BsSYQ4mYYEYQuwyuw/9pmOqVMN5RI7FEGfruuKliQhVSYYUxwNh/j08QOenh4xHo8RRqE460a94d6ee8/z0Gw2pR+zohC007nCw24roATXtJWhDgsFVPMOgHKWddrohnKZDZ7qwXU2K/uLv/ldQRW4UChI0FSmyrEo2h4E0JOR9mIxC6izUu8R7csoCqXafM80JF29wajFZDLGbrdFksyyc3qch1Xx51Xwfr3Cy5fPuHu/llOWDQcZmIerkQXiNOaI3203oqWmptcnrdVs4peHHX7/7Yc8pSjUUP+zqDF9RtOJwu9nZ2eZlmppQVIyJFX4Zzj8DdT8WwnMxZmhAAAAAElFTkSuQmCC)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/c7a5246f3be4ab7be456c1acba4ae6876b7cbb79-805x1170.png?w=3800&q=85&fit=clip&auto=format)

The QQL Control Panel

The second benefit is that the probabilistic approach offers more opportunities for outliers and surprise combinations. Sticking with Ring Size as an example, you can, on rare occasions, get very large or very small rings. Or, you can get a size that's just a hair below "Medium" that just so happens to allow a particular circle-packing pattern to line up. These kinds of subtle shifts in feature values can really help to maximize emergence.

Overall, these design decisions around features seem to have been highly effective, and are a big part of why *QQL* produces such a wide variety of interesting and unique behaviors.

## The Motif

Let's zoom back out to high-level design philosophy. As I wrote in [*The Rise of Long-Form Generative Art*](https://www.tylerxhobbs.com/words/the-rise-of-long-form-generative-art), it's always important to balance variety in a long-form generative algorithm with unity and cohesion. So far, most of this essay has discussed ways to achieve variety. But, there's no point to adding more and more variety to an algorithm if the result just feels like five different ideas stuffed into a bag. As the artist, it's important that you take counter-balancing steps to ensure a cohesive result.

Towards this end, Dandelion and I both felt that it was crucial for *QQL* to have a clear visual identity. In other words, we wanted to ensure that if you saw almost any output from the algorithm, you could recognize it as a *QQL*. So, even though we designed a large set of highly orthogonal features to produce a high level of variety, we didn't want that variety to ever break or obscure the core visual language of the work.

One way that we attempted to ensure this was to be very rigorous with the use of a motif. We settled on the "ring-dot" as the motif for *QQL*. No matter what features were selected, or what extreme outlier behavior happened, the ring-dot should to be present and visually identifiable.

![Placeholder](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAZCAIAAAC+dZmEAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEEklEQVQ4jTWUC4tVVRTHz2fpntfe67H3uefs13nccUbTsKzMpKRkLEmllIRARAgKSSxQUyIx1MYZTQkkx3k4TlRfTfa5BovLvnB++/9fa6+1kkkDhYHC4CQGZZYKx5mLBxF04TmzOAZlhnKDucXcUNZA1kAyaTA3WFhIRzh3XDjO7etbcsepwcxA/MZAGWXiOTWYzuHMUmkhN5D9D498vCI3VEQMSzsPKC0Uo5e0kcmkgdESZgZfaxrMHZWey3gpCjuexygcFY5Kh5E3URlSA2kzwpaKmBLELzwLT8KPZNDjX4y813nUGOG0gdJBEW1HWDiCQNiyDCzcCEe16EI6WTosvc5iIWjSyCQ1KHyMMSUSnqFlbhkdiUaWjSzHnOdpC4diNJ9bnNSQZAZLR9KTdCgsSq+g1RxYt6rqKtVNwavINwCeqI12yjFitfNRjVpCj9Ki8Ar62u1r3/vonZNfHv/i7PKRTw+HNzt0pCyqVsnXheTCclJEWZYOpQERYfb7+5NfLd+8dfmPR788efzrnTs/nb9wZungQuVIdxW2VWEpn8PCkwwkHAgbK4edPrp85Pbtqzubq39vP3q59XBnc21t9ebpcyfMHgdBiaBSS+nYRQn3rAbFvaKOZcB6yZ6/cObZ07v/vny8s7m29fzBi43VzWe/X/nx0uKhJeFZBiXim8cnSPSg9aCqmVaDgkBuX7j47ddb6yv/7T55sbG2sb6ytb6y/fzBzVuX3/pgPzgCzyooDvGpEz2L8PirsaV60Z795tTTP3/7Zycqv9hY3d1+uLm+cvnKxaW399AIU2D0nBlMuI+euVeqV9gStOrdY4eu3/ju+V/3d7ce7m4/2tlcu3fv2menP2lmNRgAz+CV9CrCaoiGo3jMnKXHetF8/PnRH65eunv32v37N67//P2pc8v9gRYsiEaCRfIsPcd35o6xI+xId6g7AA/UcbPX7n1/39Hjh4+d+PDgkQN2yYDH+ByW0HPVKvRjk6iOpEfhwPTSDLGNZMuyVdLh1FEdSHtEB2ARg1JDXc9qvzDlMCqPU4HSoQ6gO6K2Kp1KrSoMqkZqC+QAHZJjDkoPddVXda+p5TROlYlzD+PcFF5hW4tQZV4VnrGteGgwMEYe0I76FikQ9ZxbSFJXZVbnJjZN6jR0Nc0aNVTThSkNNQ8Gg5I29t/c/Dg8BC0VDpLJfCHNF6Dloq2gr6qZNnu06lh7VnG3QOZIDVM11NhPsas4IHuZzLt0viInjiY2bpmqx7rHaZBTh2rcpLnnatZMFwwvGO7r6NxDIvtG9k3plQxxyidxOQJ6WQWpnWAXi1x6VcaCsWoVdZVoq9zr1FACg5GDka3iXgsfl0vaSGGEckJZgXHU4gwIR+iAPXJXlaFKXfWGoVcoWFu+LQqzGAAAAABJRU5ErkJggg==)

![MISSING ALT TEXT](https://cdn.sanity.io/images/6e7gp05s/production/ed5197ec15632f199c3c506239c7bbeca26418b5-2400x3000.png?w=3800&q=85&fit=clip&auto=format)

QQL #55, featuring a prominent ring-dot in the center.

We were willing to sacrifice the range of some features, or even whole features entirely, in order to strongly preserve the motif. For example, we experimented with incredibly small values for Ring Size, but found that this lost a clear sense of ring-dot and instead moved into a "smooth" space that felt very different. Similarly, we experimented with extreme values of Density that would pack the dots to a high level of overlap. This too seemed to lose some of the core visual identity of the algorithm, and so we decided to maintain a minimum level of spacing around the dots. In some ways, that spacing also became part of the motif. Other experimental features, like multiple layers, or alternative rough textures for ring-dots, were likewise discarded in order to keep the motif strong. In the end, we felt this was absolutely the right decision. Those experimental features were interesting to see, but not at the expense of the core identity of the work.

## In Summary

If I had to briefly summarize the design goals of *QQL*, I would describe them like this:

* Optimize for emergence
* Make features highly composable
* Keep the aesthetics connected across the entire set

Dandelion and I knew that if we achieved these, we could give curators and collectors an opportunity to express themselves and their aesthetic values. The algorithm would naturally span a range of emotional qualities. And, at the same time, it would maintain its identity as a single work of art. Now, looking back at a year and a half of *QQL*, I couldn’t be more pleased with how our work achieved those goals.

## Continue Reading

* [QQL: Analogs with PACE Verso](https://www.tylerxhobbs.com/words/qql-analogs)
* [Fidenza](https://www.tylerxhobbs.com/words/fidenza)
* [The Rise of Long-Form Generative Art](https://www.tylerxhobbs.com/words/the-rise-of-long-form-generative-art)
* [PROOF's QQL Project Spotlight](https://www.tylerxhobbs.com/words/proofs-qql-project-spotlight)
* [QQL and the Future of Generative Art with Alex Estorick](https://www.tylerxhobbs.com/words/qql-and-the-future-of-generative-art)
