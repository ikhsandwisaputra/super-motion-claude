---
source: https://iquilezles.org/articles/functions/
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

 When writing shader or during any procedural creation process (texturing, modeling, shading, animation...) you often find yourself modifying signals in different ways so they behave the way you need. It is common to use smoothstep() to threshold some values, or pow() to shape a signal, or clamp() to clip it, mod() to make it repeat, a mix() to blend between two signals, exp() for attenuation, etc etc. All these functions are often conveniently available by default in most languages. However there are some operations that are also relatively used that don't come by default in any language. The following is a list of some of the functions (of families of functions rather) that I find myself using over and over again. You have the Graphtoy links in each so you can explore them interactively:

### Identities

---

**Almost Identity**
[graphtoy.com example](https://graphtoy.com/?f1(x,t)=cond(x<.1,(x/.1)*(x/.1)*((2*.05-.1)*(x/.1)+(-3*.05+2*.1))+.05,x)&v1=true&f2(x,t)=cond(x<.2,(x/.2)*(x/.2)*((2*.1-.2)*(x/.2)+(-3*.1+2*.2))+.1,x)&v2=true&f3(x,t)=cond(x<.4,(x/.4)*(x/.4)*((2*.2-.4)*(x/.4)+(-3*.2+2*.4))+.2,x)&v3=true&f4(x,t)=&v4=false&f5(x,t)=&v5=false&f6(x,t)=&v6=false&grid=1&coords=0.5,0.5,0.6666666666666666)

 Imagine you want to clip a signal **x** to some epsilon value **e**. Using max(x,e) creates a discontinuity. So instead, let **m** be a blending width, and smoothly blend the epsilon **e** into the signal approaches as it approaches zero:

`float almostIdentity( float x, float m, float e )
{
if( x>m ) return x;
float a = 2.0*e - m;
float b = 2.0*m - 3.0*e;
float t = x/m;
return (a*t+b)*t*t + e;
}`

**Smooth Identity 2/ Smooth abs()**
[graphtoy.com example](https://graphtoy.com/?f1(x,t)=cond(x*x%3C0.7*0.7,%20%20(x*x+0.7*0.7)/(2*0.7)%20,%20abs(x)%20)&v1=true&f2(x,t)=cond(x*x%3C0.5*0.5,%20%20(x*x+0.5*0.5)/(2*0.5)%20,%20abs(x)%20)&v2=true&f3(x,t)=cond(x*x%3C0.3*0.3,%20%20(x*x+0.3*0.3)/(2*0.3)%20,%20abs(x)%20)&v3=true&f4(x,t)=cond(x*x%3C0.1*0.1,%20%20(x*x+0.1*0.1)/(2*0.1)%20,%20abs(x)%20)&v4=true&f5(x,t)=&v5=false&f6(x,t)=&v6=false&grid=1&coords=-0.02,0.6,1.3)

 Another piece-wise smooth identity or smooth absolute value is this one, which happens to be the one we use for the traditional smooth minimum of SDFs (the quadratic polynomial):

`float smoothAbs( float x, float n )
{
float x2 = x*x;
float n2 = n*n;
return x2<n2 ? (x2+n2)/(2.0*n) : abs(x);
}`

 You can also write this one as:

`float smoothAbs( float x, float n )
{
float h = max(k-abs(b),0.0);
return abs(b) + h*h/(2.0*k);
}`

**Smooth Identity / Smooth abs 2()**
[Youtube explanation](https://www.youtube.com/shorts/-6Yb4X_GMOc)
[graphtoy.com example](https://graphtoy.com/?f1(x,t)=abs(x)&v1=true&f2(x,t)=sqrt(x*x+.001)&v2=true&f3(x,t)=sqrt(x*x+.01)&v3=true&f4(x,t)=sqrt(x*x+.1)&v4=true&f5(x,t)=&v5=false&f6(x,t)=&v6=false&grid=1&coords=-0.02,0.6,1.3)

 A different way to achieve a near identity is through the square root of a biased square. I saw this technique first in a shader by user "omeometo" in Shadertoy. This approach can be a bit slower than the cubic above, depending on the hardware, but I find myself using it a lot these days, specially for "smooth mirroring" shapes, since it behaves almost like the absolute value of x. While it has zero derivative, it has a non-zero second derivative, so keep an eye in case it causes problems in your application.

`float smoothAbs( float x, float n )
{
return sqrt(x*x+n*n);
}`

**Smoothstep Integral**
[Youtube explanation](https://www.youtube.com/shorts/g8J6Jff3fHo)
[graphtoy.com example](https://graphtoy.com/?f1(x,t)=cond( x>1, x-1/2, x*x*x*(1.0-x*0.5/1)/1/1 )&v1=true&f2(x,t)=cond( x>2, x-2/2, x*x*x*(1.0-x*0.5/2)/2/2 )&v2=true&f3(x,t)=cond( x>3, x-3/2, x*x*x*(1.0-x*0.5/3)/3/3 )&v3=true&f4(x,t)=cond( x>4, x-4/2, x*x*x*(1.0-x*0.5/4)/4/4 )&v4=true&f5(x,t)=&v5=false&f6(x,t)=&v6=false&grid=1&coords=2.7055086190038993,1.5164494985707484,4.304979572182703)

 If you use smoothstep for a velocity signal (say, you want to smoothly accelerate a stationary object into constant velocity motion), you need to integrate smoothstep() over time in order to get the actual position of value of the animation. The function below is exactly that, the position of an object that accelerates with smoothstep. Note its derivative is never larger than 1, so no decelerations happen.

`float integralSmoothstep( float x, float T )
{
if( x>T ) return x - T/2.0;
return x*x*x*(1.0-x*0.5/T)/T/T;
}`

### Impulses

---

**Exponential Impulse**
[graphtoy.com example](https://graphtoy.com/?f1(x,t)=cond(x<0,0,1*x*exp(1.0-1*x))&v1=true&f2(x,t)=cond(x<0,0,2*x*exp(1.0-2*x))&v2=true&f3(x,t)=cond(x<0,0,4*x*exp(1.0-4*x),0)&v3=true&f4(x,t)=cond(x<0,0,8*x*exp(1.0-8*x),0)&v4=true&f5(x,t)=&v5=false&f6(x,t)=&v6=false&grid=1&coords=1.6,0.4,2.3)

 Impulses are great for triggering behaviours or making envelopes for music or animation. Basically, for anything that grows fast and then decays slowly. The following is an exponential impulse function. Use **k** to control the stretching of the function. Its maximum, which is 1, happens at exactly x = 1/k.

`float expImpulse( float x, float k )
{
float h = k*x;
return h*exp(1.0-h);
}`

**Polynomial Impulse**
[graphtoy.com example](https://graphtoy.com/?f1(x,t)=cond(x>0,2*sqrt(2)*x/(1+2*x*x),0)&v1=true&f2(x,t)=cond(x>0,2*sqrt(4)*x/(1+4*x*x),0)&v2=true&f3(x,t)=cond(x>0,2*sqrt(16)*x/(1+16*x*x),0)&v3=true&f4(x,t)=cond(x>0,2*sqrt(64)*x/(1+64*x*x),0)&v4=true&f5(x,t)=cond(x>0,2*sqrt(256)*x/(1+256*x*x),0)&v5=true&f6(x,t)=cond(x>0,2*sqrt(1024)*x/(1+1024*x*x),0)&v6=true&grid=1&coords=2,0.4,2)

 Another impulse function that doesn't use exponentials can be designed by using polynomials. Use **k** to control falloff of the function. For example, a quadratic can be used, which peaks at x = sqrt(1/k).

`float quaImpulse( float k, float x )
{
return 2.0*sqrt(k)*x/(1.0+k*x*x);
}`

 You can easily generalize it to other powers to get different falloff shapes, where **n** is the degree of the polynomial:

`float polyImpulse( float k, float n, float x )
{
return (n/(n-1.0))*
pow((n-1.0)*k,1.0/n)*
x/(1.0+k*pow(x,n));
}`
 These generalized impulses peak at x = [k(n-1)]-1/n.

**Sustained Impulse**

 Similar to the previous, but it allows for control on the width of attack (through the parameter "k") and the release (parameter "f") independently. Also, the impulse releases at a value of 1 instead of 0.

`float sustainedImpulse( float x, float f, float k )
{
float s = max(x-f,0.0);
return min( x*x/(f*f), 1.0+(2.0/f)*s*exp(-k*s));
}`

**Sinc Impulse**
[graphtoy.com example](https://graphtoy.com/?f1(x,t)=sin(PI*(1*x-1))/(1*x-1)&v1=true&f2(x,t)=sin(PI*(2*x-1))/(2*x-1)&v2=false&f3(x,t)=sin(PI*(3*x-1))/(3*x-1)&v3=false&f4(x,t)=sin(PI*(4*x-1))/(4*x-1)&v4=false&f5(x,t)=sin(PI*(5*x-1))/(5*x-1)&v5=true&f6(x,t)=sin(PI*(6*x-1))/(6*x-1)&v6=false&grid=1&coords=3.6540008339393957,0.7262163726498378,4.7243520595099415)

 A phase shifted [sinc curve](http://mathworld.wolfram.com/SincFunction.html) can be useful if it starts at zero and ends at zero, for some bouncing behaviors (suggested by Hubert-Jan). Give **k** different integer values to tweak the amount of bounces. The functions max value is 1.0, but it can take negative values, which can make it unusable in some applications.

`float sinc( float x, float k )
{
float a = PI*(k*x-1.0);
return sin(a)/a;
}`

**Falloff**
[graphtoy.com example](https://graphtoy.com/?f1(x,t)=cond(x<1,cond(x<0, 1, 1/(1*1)*x*x - (2/1)*x + 1),0)&v1=true&f2(x,t)=cond(x<2,cond(x<0, 1, 1/(2*2)*x*x - (2/2)*x + 1),0)&v2=true&f3(x,t)=cond(x<3,cond(x<0, 1, 1/(3*3)*x*x - (2/3)*x + 1),0)&v3=true&f4(x,t)=cond(x<4,cond(x<0, 1, 1/(4*4)*x*x - (2/4)*x + 1),0)&v4=true&f5(x,t)=&v5=false&f6(x,t)=&v6=false&grid=1&coords=1.5,0.5,3.0)

 A quadratic falloff, like those in physically based point lights, but reaching zero at a given distance "m" rather than just asymptotically reaching it at infinity. Great for range controlled shadows, etc.

`float trunc_fallof( float x, float m )
{
if( x>m ) return 0.0;
x /= m;
return (x-2.0)*x+1.0;
}`

### Unitary remappings

---

 These functions below remap the [0,1] interval into the [0,1] interval. They can be used to adjust image contrasts, shape terrain slopes, modulate movements, sculpt forms, etc. One such a common function is the smoothstep(), which I don't include here for it is ubiquitous.

**Almost Unit Identity**
[graphtoy.com example](https://graphtoy.com/?f1(x,t)=x&v1=false&f2(x,t)=x*x*(2-x)&v2=true&f3(x,t)=x*x*(3-2*x)&v3=false&f4(x,t)=&v4=false&f5(x,t)=&v5=false&f6(x,t)=&v6=false&grid=1&coords=0.5,0.5,0.75)

 This is a near-identiy function that maps the unit interval into itself. It is the cousin of smoothstep(), in that it maps 0 to 0, 1 to 1, and has a 0 derivative at the origin, just like smoothstep. However, instead of having a 0 derivative at 1, it has a derivative of 1 at that point. It's equivalent to the Almost Identiy above with n=0 and m=1. Since it's a cubic just like smoothstep() it is very fast to evaluate:

`float almostUnitIdentity( float x )
{
return x*x*(2.0-x);
}`

**Gain**
[graphtoy.com example](https://graphtoy.com/?f1(x,t)=cond( x<0.5, 0.5*pow(2*x, 1/4)  , 1-0.5*pow(2*(1-x), 1/4) )&v1=true&f2(x,t)=cond( x<0.5, 0.5*pow(2*x, 1/2)  , 1-0.5*pow(2*(1-x), 1/2) )&v2=true&f3(x,t)=cond( x<0.5, 0.5*pow(2*x, 1)  , 1-0.5*pow(2*(1-x), 1) )&v3=true&f4(x,t)=cond( x<0.5, 0.5*pow(2*x, 2)  , 1-0.5*pow(2*(1-x), 2) )&v4=true&f5(x,t)=cond( x<0.5, 0.5*pow(2*x, 4)  , 1-0.5*pow(2*(1-x), 4) )&v5=true&f6(x,t)=&v6=false&grid=1&coords=0.5,0.5,0.75)

 Remapping the unit interval into the unit interval by expanding the sides and compressing the center, and keeping 1/2 mapped to 1/2, that can be done with the gain() function. This was a common function in RSL tutorials (the Renderman Shading Language). k=1 is the identity curve, k<1 produces the classic gain() shape, and k>1 produces "s" shaped curves. The curves are symmetric (and inverse) for k=a and k=1/a.

`float gain( float x, float k )
{
float a = 0.5*pow(2.0*((x<0.5)?x:1.0-x), k);
return (x<0.5)?a:1.0-a;
}`

**Parabola**
[graphtoy.com example](https://graphtoy.com/?f1(x,t)=cond(abs(x-.5)>.5,0,pow(4*x*(1-x),1/4))&v1=true&f2(x,t)=cond(abs(x-.5)>.5,0,pow(4*x*(1-x),1/2))&v2=true&f3(x,t)=cond(abs(x-.5)>.5,0,pow(4*x*(1-x),1))&v3=true&f4(x,t)=cond(abs(x-.5)>.5,0,pow(4*x*(1-x),2))&v4=true&f5(x,t)=cond(abs(x-.5)>.5,0,pow(4*x*(1-x),4))&v5=true&f6(x,t)=&v6=false&grid=1&coords=0.5,0.5,0.75)

 A nice choice to remap the 0..1 interval into 0..1, such that the corners are mapped to 0 and the center to 1. You can then rise the parabola to a power k to control its shape.

`float parabola( float x, float k )
{
return pow( 4.0*x*(1.0-x), k );
}`

**Power Curve**

 This is a generalization of the Parabola() above. It also maps the 0..1 interval into 0..1 by keeping the corners mapped to 0. But in this generalization you can control the shape one either side of the curve, which comes handy when creating leaves, eyes, and many other interesting shapes.

`float pcurve( float x, float a, float b )
{
float k = pow(a+b,a+b)/(pow(a,a)*pow(b,b));
return k*pow(x,a)*pow(1.0-x,b);
}`
 Note that **k** is chosen such that the curve reaches exactly 1 at its maximum for illustration purposes, but in many applications the curve needs to be scaled anyways so the slow computation of **k** can be simply avoided.

**Tonemap**

 This function maps the 0 to 0 and 1 to 1, while rising the middle tones upwards, similar to a power function with exponent smaller than 1. However, when the numerator is not k+1 but something else (usually larger), this function is often used as a color tonemapping transfer function (similar to the Reinhard tonemapper), hence the name. Usually k>0, but you can make it between 0 and -1 to bend the curves inwards like a possitive power curve.

`float tone( float x, float k )
{
return (k+1.0)*x/(1.0+k*x);
}`

### Bumps

---

**Cubic Pulse**
[graphtoy.com example](https://graphtoy.com/?f1(x,t)=cond(abs(x)>1/4,0,1.0 - (x*4)*(x*4)*(3.0-2.0*abs(x*4)))&v1=true&f2(x,t)=cond(abs(x)>1/2,0,1.0 - (x*2)*(x*2)*(3.0-2.0*abs(x*2)))&v2=true&f3(x,t)=cond(abs(x)>1,0,1.0 - (x/1)*(x/1)*(3.0-2.0*abs(x/1)))&v3=true&f4(x,t)=cond(abs(x)>2,0,1.0 - (x/2)*(x/2)*(3.0-2.0*abs(x/2)))&v4=true&f5(x,t)=cond(abs(x)>2,0,1.0 - (x/2)*(x/2)*(3.0-2.0*abs(x/2)))&v5=false&f6(x,t)=&v6=false&grid=1&coords=0.0,0.2,2.0)

 Chances are you found yourself doing smoothstep(c-w,c,x)-smoothstep(c,c+w,x) very often as a way to select a region centered at **c** that goes from **c-w** to **c+w**. I know I do, and that's why I made this cubicPulse() below. You can also use it as a replacement for a gaussian with local support.

`float cubicPulse( float x, float c, float w )
{
x = abs(x - c);
if( x>w ) return 0.0;
x /= w;
return 1.0 - x*x*(3.0-2.0*x);
}`

**Rational Bump**
[graphtoy.com example](https://graphtoy.com/?f1(x,t)=1/(x*x*64+1)&v1=true&f2(x,t)=1/(x*x*16+1)&v2=true&f3(x,t)=1/(x*x*6+1)&v3=true&f4(x,t)=1/(x*x*2.5+1)&v4=true&f5(x,t)=1/(x*x+1)&v5=true&f6(x,t)=1/(x*x*0.5+1)&v6=true&grid=1&coords=0,0.2,2)

 This function can also be a replacement for a gaussian sometimes if you can do with infinite support, ie, this function never reaches exactly zero no matter how far you go in the real axis:

`float rationalBump( float x, float k )
{
return 1.0/(1.0+k*x*x);
}`

**Double Bump**
[graphtoy.com example](https://graphtoy.com/?f1(x,t)=x/(1+pow(x,2))&v1=true&f2(x,t)=x/(1+pow(x,4))&v2=true&f3(x,t)=x/(1+pow(x,8))&v3=true&f4(x,t)=x/(1+pow(x,16))&v4=true&f5(x,t)=x/(1+pow(x,32))&v5=true&f6(x,t)=x/(1+pow(abs(x),2048))&v6=true&grid=1&coords=0,0,3)

 This is a double bump with controllable attenuation. The way it's listed below, the derivative at 0 is always 1, which makes it perfect to create smooth RELU functions if you attach a y=x segment when x is positive. If on the other hand yo don't care about the inclination at the origin and instead you want to normalize it so it always peaks with a value of 1.0, then you can multiply the function above by k/pow((k-1),(1-1/k)).

`float doubleBump( float x, float k )
{
return x/(1.0+pow(x,k)) );
}`

### Sigmoids / Steps

---

**Exponential Step**
[graphtoy.com example](https://graphtoy.com/?f1(x,t)=cond( x<0, 1, exp2(-exp2(6)*pow(x,6)) )&v1=true&f2(x,t)=cond( x<0, 1, exp2(-exp2(5)*pow(x,5)))&v2=true&f3(x,t)=cond( x<0, 1, exp2(-exp2(4)*pow(x,4)))&v3=true&f4(x,t)=cond( x<0, 1, exp2(-exp2(3)*pow(x,3)))&v4=true&f5(x,t)=cond( x<0, 1, exp2(-exp2(2)*pow(x,2)))&v5=true&f6(x,t)=cond( x<0, 1, exp2(-exp2(1)*pow(x,1)))&v6=true&grid=1&coords=0.5,0.5,0.75)

 A natural attenuation is an exponential of a linearly decaying quantity. A gaussian, is an exponential of a quadratically decaying quantity: purple curve, exp(-x2). You can generalize and keep increasing powers, and get a sharper and sharper s-shaped curves. For really high values of n you can approximate a perfect step().

`float expStep( float x, float k )
{
return exp2(-pow(x,k));
}`

[inigo quilez](https://iquilezles.org) - learning computer graphics since 1994
