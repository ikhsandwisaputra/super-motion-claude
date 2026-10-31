---
source: https://iquilezles.org/articles/ismoothstep/
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

### Intro

---

[Smoothstep](https://en.wikipedia.org/wiki/Smoothstep) is one of the most frequently used functions in computer graphics, from animation to pattern generation, procedural modeling and [texture filtering](https://iquilezles.org/articles/texture), among many other. Now, sometimes one might want to reverse the effect of a smoothstep, and doing so it's a little tricky - the inverse of a cubic polynomial requires finding its roots and, while analytically computable, it's not trivial. This article describes how to derive and compute the inverse.

 To the right of this text, you can see the smoothstep function in yellow, it's inverse in blue, and the composition of both in grey, which naturally matches the identity function (grey diagonal line).

![](https://iquilezles.org/articles/ismoothstep/gfx00.png)

### The math

---

 The cubic smoothstep() is simply, after remapping and clamping,

 y(x) = x2(3-2x)

Inverting this function requires solving the cubic equation

 x(y) = 2x3 - 3x2 + y

 The discriminant of this equation is

 Δ = 27⋅4y(1-y)

 which is between 0 and 27 - always positive or zero - which means the equation will have generally 3 real solutions, and they will be repeated exactly at y=0 and y=1.

 The standard way to solve a cubic equation with three real roots is the trigonometric form of [Cardano's formula](https://proofwiki.org/wiki/Cardano%27s_Formula). One starts by computing

 p = (3ac-b2) / (3a2)
 q = (-2b3 + 9abc - 27a2d) / (27a3)

 R = q/2
 Q = p/3

 and since in our case a=2, b=-3, c=0 and d=y, we get

 R = (1-2y)/8
 Q = -1/4

 With R and Q at hand, we can apply the trigonometric solution, which is

 φ = acos( R/sqrt(-Q3) )
 x = 2⋅sqrt(-Q)⋅cos(φ/3 + 2π/3) - b/3a

 where the phase 2π/3 selects the correct root. This simplifies nicely to

 φ = acos(1-2y)
 x = 0.5 + cos((φ-2π)/3)

 which is pretty compact. There's a transformation and an extra simplification that can be done by noting that sin() and cos() are shifted by π/2, and combining that offset with the -π offset we already added to φ:

 ϕ = asin(1-2\*y)
 x = 0.5 + cos( π/2 + ϕ/3 )

 which using the trigonometric identity cos(A+B) = cos(A)⋅cos(B) - sin(A)⋅sin(B) simplifies to

 ϕ = asin(1-2y)
 x = 0.5 - sin( ϕ/3 )

### The code

---

 Here goes some GLSL code for the maths above:

`float inverse_smoothstep( float y )
{
return 0.5 - sin(asin(1.0-2.0*y)/3.0);
}`
 And here's a realtime running implementation, <https://www.shadertoy.com/view/MsSBRh>

[inigo quilez](https://iquilezles.org) - learning computer graphics since 1994
