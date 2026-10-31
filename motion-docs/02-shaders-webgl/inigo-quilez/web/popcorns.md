---
source: https://iquilezles.org/articles/popcorns/
title: "Inigo Quilez :: computer graphics, maths, shaders, fractals, demoscene"
fetched: 2026-10-28
---

### [Inigo Quilez](https://iquilezles.org/)  ::     ::

[![](https://iquilezles.org/imgEmail.png)](mailto:iquilezles@hotmail.com "Youtube")
 [![](https://iquilezles.org/imgTwitter.png)](https://twitter.com/iquilezles "Twitter")
[![](https://iquilezles.org/imgBluesky.png)](https://bsky.app/profile/iquilezles.bsky.social "Bluesky")
 [![](https://iquilezles.org/imgFacebook.png)](https://www.facebook.com/inigo.quilez.art "Facebook")
[![](https://iquilezles.org/imgYoutube.png)](https://www.youtube.com/channel/UCdmAhiG8HQDlz8uyekw4ENw "Youtube")
 [![](https://iquilezles.org/imgInstagram.png)](https://www.instagram.com/inigoquilez/ "Instagram")
 [![](https://iquilezles.org/imgTikTok.png)](https://www.tiktok.com/@inigoquilez "Tiktok")
 [![](https://iquilezles.org/imgBiliBili.png)](https://space.bilibili.com/673661710 "Bilibili")
 [![](https://iquilezles.org/imgShadertoy.png)](https://www.shadertoy.com/user/iq/ "Shadertoy")
 [![](https://iquilezles.org/imgPatreon.png)](https://www.patreon.com/inigoquilez "Patreon")
[![](https://iquilezles.org/imgPayPal.png)](https://www.paypal.com/paypalme/SMOOTHSTEPLLC "Paypal")

I first read about the so called "Pop Corn" images in a website by Cliff Pickover some time in the later 90s. The idea behind them was to plot the evolution of a dynamical system like

p'(t) = v(p)

 where **p** is a point and **v** is a stationary velocity field. To make such a simulation in a computer, the simplest way is to code some simple Euler integrator which will simulate the derivative with some differences and a small delta time. In two dimensions, if we make **p** = (**x**,**y**) and **v**=(**f**,**g**), then that would look like this:

 xn+1 = xn + λ⋅f(x,y)
 yn+1 = yn + λ⋅g(x,y)

 where **λ** is the time step value (it should be something small). Now it's up to you to choose nice formulas for **f(p)** and **g(p)**. The original Pickover's formulas were trigonometric functions, but you can use anything you like. In my experiments of 1999 I used the original Pickover's formulas. The result made it into the 64 kb demo called [rare](https://iquilezles.org/demoscene). Later in 2006 I made the following video:

[![ ](../../demoscene/dem_31_p.jpg)](../../demoscene/dem_31.mp4)
 Here I animated **f(p)** and **g(p)** over time, using slightly different formulas to produce some nice fluid-like shapes:

 f(x,y) = cos( t0 + y + cos(t1+ πx))
 g(x,y) = cos( t2 + x + cos(t3+ πy))

 The **ti** parameters are linearly time varying values that produce the actual animation.

[![](https://iquilezles.org/articles/popcorns/emppera_p.jpg)](https://iquilezles.org/articles/popcorns/emppera)
 Enmpperaltta - a popcorn image (click to enlarge)

[![ ](../../demoscene/dem_31_p.jpg)](../../demoscene/dem_31.mp4)
 Variations - a popcorn video (click to play)

 The way the video was rendered was this - just like with IFS methods, I picked a random point **p** in the plane and iterated it with the above formulas. This produced an orbit over space. I track the density of each pixel of the plane by counting how many times an iterated point landed in it. After performing some billion iterations, the image was noise-free enough, and it was interpreted as a density that I used to index into a color palette. In my case, what I did instead was to compute the density three times with slightly different parameters, and assign the resulting densities to the red, green and blue channels of the image.

 But you can also use very different rendering algorithms. For example, the image below doesn't do a density calculation, and instead iterates the formulas for a different initial point **p** that is at the center of each pixel, and then computes the distance traveled by **p** as a result of the iterations. The image you get is this, and the code you can find it here: <https://www.shadertoy.com/view/Mdl3RH>:

![](https://iquilezles.org/articles/popcorns/gfx00.jpg)

[inigo quilez](https://iquilezles.org) - learning computer graphics since 1994
