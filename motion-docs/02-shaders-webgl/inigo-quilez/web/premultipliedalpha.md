---
source: https://iquilezles.org/articles/premultipliedalpha/
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

 I'm aware that enough has been said about Premultiplied Alpha vs Not-Premultiplied Alpha blending and compositing, so this article won't try to teach you about premultiplied alpha or preach its benefits or correctness. Although if you do need to learn about that or get a refreshed, then I recommend you visit [Tom Forsyth's great and classic article](https://tomforsyth1000.github.io/blog.wiki.html), then come back here to continue reading.

 In this article I just wanted to give a mathematical characterization to the problem of "black edges" when you render an image or texture that has black transparent background and some opaque pixels. As we might know from experience, things go wrong when using regular alpha blending and you start scaling up or down such image, although things also go wrong when any linear pixel operation happens, such as mipmapping, filtering with a low pass flilter such a blur, etc.

 Now, we also know that one workaround is to dilate the color of the solid bits of the texture outwards to the black pixels. This might or might not be easy to do, but we also know it's unnecessary under premultiplied alpha, which is easy enough to do. In this article we'll explore why and how exactly both of these approaches work.

 So for now let's assume you are doing the right thing here, that is, we are using premultiplied alpha blending and hence our blending equation for a texture color **c** and alpha value **a** and a background destination color **d** is

 Bp(c,a,d) = c + (1-a)⋅d

 as opposed to regular alpha blending

 Br(c,a,d) = c⋅a + (1-a)⋅d

 Note I used the p and r subscript to differentiate "premultiplied" and "regular" alpha-blending. Now let's also assume that we are doing some simple bilinear scaling of our texture, and keep the math simple let's assume this is 1D scaling only. In other words, any two consecutive texels of our texture will generate a gradient of colors and alphas during rendering, of the form

 S(c) = c1 + x⋅(c2-c1)
 S(a) = a1 + x⋅(a2-a1)

 That is, the color **c** will transition from c1 to c2 as x goes from 0 to 1 across the pixels of the destination buffer **d**, and alpha **a** will also transition from a1 to a2, linearly. So far, pretty simple. And let's do things even simpler if we assume the background **d** is of constant color, although everything we'll prove still works if we don't assume this.

 So, now this is the key observation for this article: we expect scaling and then blending the texture into the screen (which is the normal order of operations) to result in the same picture as if we were blending the texture with the background first and then scaling the result. In other words, we want

 Bp(S(cp),S(a),d) = S( Bp(cp,a,d) )

 Or yet in other words, we want that blending a scaled image is the same as scaling a blended image.

### The math of Premultiplied Alpha Blending

So, let's expand the formulas and see if we can prove this to be true:

Bp(S(c),S(a),d) =
 S(c) + (1-S(a))⋅d =
 c1 + x⋅(c2-c1) + d⋅( 1 - a1 - x⋅(a2-a1) ) =
 c1 + d⋅(1-a1) + x⋅[ c2 - c1 - d⋅(a2-a1) ] =
 Bp(c1,a1,d) + x⋅[ c2 - d⋅a2 + d - (c1 - d⋅a1 + d) ] =
 Bp(c1,a1,d) + x⋅[ Bp(c2,a2,d) - Bp(c1,a1,d) ] =
 S(Bp(c,a,d))

 Or in short

Bp(S(c),S(a),d) = S(Bp(c,a,d))

 So indeed, blending interpolated pixels is the same as interpolating blended pixels. Fantastic, pre-multiplied alpha blending works!

![](https://iquilezles.org/articles/premultipliedalpha/gfx01.png)

### The math of Regular Alpha Blending

Now, let's see why and how regular alpha blending does not work. Recall our blending equations is now Br(c,a,d) = c⋅a + (1-a)⋅d, so

Br(S(c),S(a),d) =
 S(c)S(a) + d⋅(1-S(a)) =
 [c1+x⋅(c2-c1)]⋅[a1+x⋅(a2-a1)] + d⋅[1 - a1 - x⋅(a2-a1)] =
 c1a1+d⋅(1-a1) + c1x⋅(a2-a1) + a1x⋅(c2-c1) + x2⋅(c2-c1)(a2-a1) - x⋅d⋅(a2-a1) =
 Br(c1,a1,d) + x⋅[ c1a2 + a1c2 - a1c1 -a2c2 + B(c2,a2,d) - B(c1,a1,d) ] + x2⋅(c2-c1)(a2-a1) =
 Br(c1,a1,d) + x⋅[Br(c2,a2,d) - Br(c1,a1,d)] x⋅[ c1a2 + a1c2 - a1c1 -a2c2] + x2⋅(c2-c1)(a2-a1) =
 S(Br(c,a,d)) + x⋅( c1a2 + a1c2 - a1c1 -a2c2) + x2⋅(c2-c1)(a2-a1) =
 S(Br(c,a,d)) + x⋅[ c1a2 + a1c2 - a1c1 -a2c2 + x⋅(c2a2-c2a1-c1a2+c1a1)] =
 S(Br(c,a,d)) + x(1-x)⋅(c1a2 + a1c2 - a1c1 - a2c2)

 Summarizing, we have that

Br(S(c),S(a),d) = S(Br(c,a,d)) + x(1-x)⋅(c1a2 + a1c2 - a1c1 - a2c2)

 That is, the blending of interpolated pixels is the same as the interpolation of the blended pixels PLUS some weird stuff that depends on the pixels we are interpolating and the interpolation factor x. And that's naturally a problem. But let's analyze that “weird stuff” a bit to see how exactly things get wrong here and it produces a black border rather than some other thing.

![](https://iquilezles.org/articles/premultipliedalpha/gfx00.png)

### The error term

 For example, the shape of the problem is a parabola: x⋅(1-x), and this parabola will cancel when x=0 or x=1, which is exactly at the exact pixel positions we are interpolating between. So, the colors of the pixels will be alright at exact pixel locations, it's between pixel locations that things will look wrong, and this will peak at the center of the parabola which happens at x=0.5, right between the two pixels.

 We know this wrongness often manifest as the infamous dark edge, so let's see why that is the shape and color of our error:

 Recall the error is

 e = x⋅(1-x)⋅(c1⋅a2 + a1⋅c2 - a1⋅c1 - a2⋅c2)

 So first we note that the error will be zero for all x, meaning that everything wil be correct even between pixels, if a1=a2

 Sin in that case c1⋅a2 cancels out with -c1⋅a1 and c2⋅a1 cancels out with -c2⋅a2.

 So, we won't see rendering artifacts in the solid parts of the texture, nor in the fully transparent areas of the texture. It's in the transitions between opaque and transparent that the error term e will be non-zero. This checks with experience:

 Similarly, if the alpha channel does change but the color channel doesn't, then c1=c2 and in that case c1⋅a1 cancels out with -c2⋅a1 and c1⋅a2 cancels out with c2⋅a2, and so e=0 and then too we won't see an error. This corresponds to the hack of dilating the pixel colors of the billboards outwards into the transparent areas. Again, the math checks with what we know from experience.

 The failure is when either the alpha channel changes (ie, a1 != a2) and the color channel changes (ie, c1 != c2), because then nothing cancels out, e is always bigger than zero except for the exact pixel center x=0 and x=1, and so we see the error.

Furthermore, assuming we are transitioning for example from a green leave (c1=green, a1=1) to a black transparent background (c2=black, a2=0), then the error term will be:

 e = -x⋅(1-x)⋅c1

 while if we are transitioning the other way from a black transparent background (c1=black, a1=zero) to the leaf (c2=green, a2=1) we get

 e = -x⋅(1-x)⋅c2

 In both cases the error is a negative color contribution to the rendering, stronger the brighter our leaf color is. In the worst case scenario, right in the middle of the transition, at x=0.5, this error will be:

 e = -c2/4

 For example, in the pure green to white transition in the picture below, this means the error is -255/4 and therefore the color at the darkest point in the transition will be 255 - 255/4 = 191 instead of the expected 255, which matches the empirical measurement.

 I probably don't need to justify myself if I claim that non-premultipled alpha blending will go horribly wrong in the case of general 2D bilinear interpolation given that just the 1D linear interpolation misbehaves.

![](https://iquilezles.org/articles/premultipliedalpha/gfx02.png)

 I'm aware there's no actionable advice in this article, other than keep doing what you probably were already doing in terms of premultiplied blending, but I hope you enjoyed the little mathematical take on it.

 Lastly, here's the source code used to make the pictures in the article, which shows how to perform the correct premultiplied alpha blending: [https://www.shadertoy.com/view/cds3z7M](https://www.shadertoy.com/view/cds3z7)

[inigo quilez](https://iquilezles.org) - learning computer graphics since 1994
