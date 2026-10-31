---
source: https://theorangeduck.com/page/spring-roll-call
title: "Spring-It-On: The Game Developer's Spring-Roll-Call"
fetched: 2026-10-28
---

---

# Spring-It-On: The Game Developer's Spring-Roll-Call

### 04/03/2021

Springs! What do springs have to do with game development? We'll if you're asking that question and reading this article you're in the right place. Because we're about to do a lot of talking about springs... and, while some of you may well have used springs before, I'm guessing that even if you did the code you used resided in the dark depths of your project as a set of mysterious equations that no one ever touched.

And that's sad, because although the maths can undeniably be tricky, springs are interesting, and a surprisingly versatile tool, with lots of applications in Computer Science that I never even realized were possible until I thought "wouldn't it be nice to know how those equations came about?" and dug a bit deeper.

So I think every Computer Scientist, and in particular those interested in game development, animation, or physics, could probably benefit from a bit of knowledge of springs. In the very least this: what they are, what they do, how they do it, and what they can be used for. So with that in mind, let's start right from the beginning: *The Damper*.

---

### The Damper

* [The Damper](https://theorangeduck.com/page/spring-roll-call#damper)
* [The Exact Damper](https://theorangeduck.com/page/spring-roll-call#exactdamper)

### The Spring Damper

* [The Spring Damper](https://theorangeduck.com/page/spring-roll-call#springdamper)
* [The Exact Spring Damper](https://theorangeduck.com/page/spring-roll-call#exactspringdamper)
* [Over, Under, and Critical Damping](https://theorangeduck.com/page/spring-roll-call#damping)
* [The Half-life and the Frequency](https://theorangeduck.com/page/spring-roll-call#halflife)
* [The Damping Ratio](https://theorangeduck.com/page/spring-roll-call#dampingratio)
* [The Critical Spring Damper](https://theorangeduck.com/page/spring-roll-call#critical)

### Applications

* [Smoothing](https://theorangeduck.com/page/spring-roll-call#smoothing)
* [Filtering](https://theorangeduck.com/page/spring-roll-call#filtering)
* [Controllers](https://theorangeduck.com/page/spring-roll-call#controllers)
* [Inertialization](https://theorangeduck.com/page/spring-roll-call#inertialization)
* [Interpolation](https://theorangeduck.com/page/spring-roll-call#interpolation)
* [Resonance](https://theorangeduck.com/page/spring-roll-call#resonance)
* [Extrapolation](https://theorangeduck.com/page/spring-roll-call#extrapolation)

### Other Springs

* [The Double Spring](https://theorangeduck.com/page/spring-roll-call#doublespring)
* [The Timed Spring](https://theorangeduck.com/page/spring-roll-call#timedspring)
* [The Velocity Spring](https://theorangeduck.com/page/spring-roll-call#velocityspring)
* [The Quaternion Spring](https://theorangeduck.com/page/spring-roll-call#quaternionspring)
* [The Scale Spring](https://theorangeduck.com/page/spring-roll-call#scalespring)
* [The Tracking Spring](https://theorangeduck.com/page/spring-roll-call#trackingspring)

### Conclusion

* [Source Code](https://theorangeduck.com/page/spring-roll-call#sourcecode)
* [Conclusion](https://theorangeduck.com/page/spring-roll-call#conclusion)

---

# The Damper

As a game developer here is a situation you've probably come across: for some reason there is an object which suddenly we realize should be at a different position - perhaps we got some information from a game server about where it should really be, or the player did something and now the object needs to be moved. Well, when we move this object we probably don't want it to pop - instead we would prefer if it moved more smoothly towards the new position.

A simple thing we might try to achieve this is to just blend the object's position `x` with the new goal position `g` by some fixed `factor` such as `0.1` each frame.

In C++ we might write something like this, and while this code is for a single `float` the same can be done for a position just by applying it to each component of the vector independently.

```C
float lerp(float x, float y, float a)
{
    return (1.0f - a) * x + a * y;
}

float damper(float x, float g, float factor)
{
    return lerp(x, g, factor);
}
```

By applying this `damper` function each frame we can smoothly move toward the goal without popping. We can even control the speed of this movement using the `factor` argument:

```C
x = damper(x, g, factor);
```

Below you can see a visualization of this in action where the horizontal axis represents time and the vertical axis represents the position of the object.

[

](/media/uploads/springs/damper.m4v)

But this solution has a problem: if we change the framerate of our game (or the timestep of our system) we get different behavior from the `damper`. More specifically, it moves the object slower when we have a lower framerate:

[

](/media/uploads/springs/damper_dt.m4v)

And this makes sense if we think about it - if the game is running at 30 frames per second you are going to perform half as many calls to `damper` as if you were running at 60 frames per second, so the object is not going to get pulled toward the goal as quickly. One simple idea for a fix might be to just multiply the factor by the timestep `dt` - now at least when the timestep is larger the object will move more quickly toward the goal...

```C
float damper_bad(float x, float t, float damping, float dt)
{
    return lerp(x, t, damping * dt);
}
```

This might appear like it works on face value but there are two big problems with this solution which can come back to bite us badly. Firstly, we now have a mysterious `damping` variable which is difficult to set and interpret. But secondly, and more importantly, if we set the `damping` or the `dt` too high (such that `damping * dt > 1`) the whole thing becomes unstable, and in the worst case explodes:

[

](/media/uploads/springs/damper_bad.m4v)

We could use various hacks like clamping `damping * dt` to be less than `1` but there is fundamentally something wrong with what we've done here. We can see this if we imagine that `damping * dt` is roughly equal to `0.5` - here, doubling the `dt` does not produce the same result as applying the damper twice: lerping with a factor of `0.5` twice will take us 75% of the way toward the goal, while lerping with a `factor` of `1.0` once will bring us 100% of the way there. So what's the real fix?

---

## The Exact Damper

Let's start our investigation by plotting the behavior of `x` using the normal `damper` with a fixed `dt` of `1.0`, a `goal` of `0`, and a `factor` of `0.5`:

![decay](https://theorangeduck.com/media/uploads/springs/decay.png)

Here we can see repeated calls to `lerp` actually produce a kind of exponential decay toward the goal:

\begin{align\*}
& t = 0, \! &x& = 1.0 \\
& t = 1, \! &x& = 0.5 \\
& t = 2, \! &x& = 0.25 \\
& t = 3, \! &x& = 0.125 \\
\end{align\*}

And for a \( \text{lerp} \) factor of \( 0.5 \), we can see that this pattern is exactly the equation \( x\_t = 0.5^t \). So it looks like somehow there is an exponential function governing this relationship, but how did this appear? The trick to uncovering this exponential form is to write our system as a recurrence relation.

#### Recurrence Relation

We'll start by defining a separate variable \( y = 1 - damping \cdot ft \), which will make the maths a bit easier later on. In this case \( ft \) is a fixed, small \( dt \) such as \( \tfrac{1}{60} \). Then we will expand the \( \text{lerp} \) function:

\begin{align\*}
x\_{t + 1} &= \text{lerp}(x\_t,\, g,\, 1 - y) \\
x\_{t + 1} &= (1 - (1 - y)) \cdot x\_t + (1 - y) \cdot g \\
x\_{t + 1} &= y \cdot x\_t - (y - 1) \cdot g \\
x\_{t + 1} &= y \cdot x\_t - y \cdot g + g
\end{align\*}

Now for the recurrence relation: by plugging this equation into itself we are going to see how the exponent appears. First we need to increment \( t + 1 \) to \( t + 2 \) and then replace the new \( x\_{t + 1} \) which appears on the right hand side with the same equation again.

\begin{align\*}
x\_{t + 1} &= y \cdot x\_t - y \cdot g + g \\
x\_{t + 2} &= y \cdot x\_{t + 1} - y \cdot g + g \\
x\_{t + 2} &= y \cdot (y \cdot x\_t - y \cdot g + g) - y \cdot g + g \\
x\_{t + 2} &= y \cdot y \cdot x\_t - y \cdot y \cdot g + y \cdot g - y \cdot g + g \\
x\_{t + 2} &= y \cdot y \cdot x\_t - y \cdot y \cdot g + g \\
\end{align\*}

If we repeat this process again and we can start to see a pattern emerging:

\begin{align\*}
x\_{t + 2} &= y \cdot y \cdot x\_t - y \cdot y \cdot g + g \\
x\_{t + 3} &= y \cdot y \cdot x\_{t + 1} - y \cdot y \cdot g + g \\
x\_{t + 3} &= y \cdot y \cdot (y \cdot x\_t - y \cdot g + g) - y \cdot y \cdot g + g \\
x\_{t + 3} &= y \cdot y \cdot y \cdot x\_t - y \cdot y \cdot y \cdot g + y \cdot y \cdot g - y \cdot y \cdot g + g \\
x\_{t + 3} &= y \cdot y \cdot y \cdot x\_t - y \cdot y \cdot y \cdot g + g \\
\end{align\*}

More generally we can see that:

\begin{align\*}
x\_{t + n} = y^n \cdot x\_t - y^n \cdot g + g
\end{align\*}

Ah-ha! Our exponent has appeared. And by rearranging a bit we can even write this in terms of \( \text{lerp} \) again:

\begin{align\*}
x\_{t + n} &= y^n \cdot x\_t - y^n \cdot g + g \\
x\_{t + n} &= y^n \cdot x\_t + g \cdot (1 - y^n) \\
x\_{t + n} &= \text{lerp}(x\_t,\, g,\, 1 - y^n) \\
\end{align\*}

As a small tweak, we can make the exponent negative:

\begin{align\*}
x\_{t + n} &= \text{lerp}(x\_t,\, g,\, 1 - y^n) \\
x\_{t + n} &= \text{lerp}(x\_t,\, g,\, 1 - \tfrac{1}{y}^{-n}) \\
\end{align\*}

Remember that \( n \) represents a multiple of \( ft \), so if we have a new arbitrary \( dt \) we will need to convert it to \( n \) first using \( n = \tfrac{dt}{ft} \). In C++ we would write it as follows:

```C
float damper_exponential(
    float x,
    float g, 
    float damping, 
    float dt, 
    float ft = 1.0f / 60.0f)
{
    return lerp(x, g, 1.0f - powf(1.0 / (1.0 - ft * damping), -dt / ft));
} 
```

Let's see it action! Notice how it produces the same, identical and stable behavior even when we make the `dt` and `damping` large.

[

](/media/uploads/springs/damper_exponent.m4v)

So have we fixed it? Well, in this formulation we've essentially solved the problem by letting the behavior of the damper match one particular timestep while allowing the rate of decay to still vary. In this case `1.0f - ft * damping` is our *rate of decay*, and it dictates what proportion of the distance toward the goal will remain after `ft` in time. As long as we make the fixed timestep `ft` small enough, `ft * damping` should never exceed `1.0` and the system remains stable and well behaved.

#### The Half-Life

But there is another, potentially better way to fix the problem. Instead of fixing the timestep, we can fix the *rate of decay* and let the timestep vary. This sounds a little odd at first but in practice it makes things much easier. The basic idea is simple: let's set the rate of decay to \( 0.5 \) and instead scale the timestep such that we can control the exact *half-life* of the damper - a.k.a the time it takes for the distance to the goal to reduce by half:

\begin{align\*}
x\_{t + dt} &= \text{lerp}\left(x\_t,\, g,\, 1 - \tfrac{1}{0.5}^{-dt / halflife}\right) \\
x\_{t + dt} &= \text{lerp}\left(x\_t,\, g,\, 1 - 2^{-dt / halflife}\right) \\
\end{align\*}

This simplifies the code and gives a more intuitive parameter to control the damper. Now we don't ever need to worry about if we've set the `damping` too large or made the fixed timestep `ft` small enough.

```C
float damper_exact(float x, float g, float halflife, float dt)
{
    return lerp(x, g, 1.0f - powf(2, -dt / halflife));
}
```

For neatness, we can also switch to an exponential base using the change of base theorem: just multiply the `dt` by \( ln(2) = 0.69314718056 \) and switch to using `expf`. Finally, we should add some small epsilon value like `1e-5f` to avoid division by zero when our `halflife` is very small:

```C
float damper_exact(float x, float g, float halflife, float dt, float eps=1e-5f)
{
    return lerp(x, g, 1.0f - expf(-(0.69314718056f * dt) / (halflife + eps)));
}
```

The change of base theorem tells us another thing: that changing the *rate of decay* is no different from scaling the `dt` in the exponent. So using the `halflife` to control the damper should not limit us in any of the behaviors we want to achieve compared to if we changed the *rate of decay* like in our previous setup.

There is one more nice little trick we can do - a fast approximation of the negative exponent function using one over a simple polynomial (or we could use this [even better approximation from Danny Chapman](https://twitter.com/Mr_Rowl/status/1577454895652708352)):

```C
float fast_negexp(float x)
{
    return 1.0f / (1.0f + x + 0.48f*x*x + 0.235f*x*x*x);
}
```

And that's it - we've converted our unstable damper into one that is fast, stable, and has intuitive parameters!

```C
float damper_exact(float x, float g, float halflife, float dt, float eps=1e-5f)
{
    return lerp(x, g, 1.0f-fast_negexp((0.69314718056f * dt) / (halflife + eps)));
}
```

Let's see how it looks...

[

](/media/uploads/springs/damper_implicit.m4v)

Perfect!

---

# The Spring Damper

The exact damper works well in a lot of cases, but has one major issue - it creates discontinuities when the goal position changes quickly. For example, even if the object is moving in one direction, it will immediately switch to moving in the opposite direction if the goal changes direction. This can create a kind of annoying sudden movement which you can see in the previous videos.

The problem is that there is no velocity continuity - no matter what happened in the previous frames the damper will always move toward the goal. Let's see how we might be able to fix that. We can start by looking again at our old broken bad damper, and examining it in a bit more detail:

\begin{align\*}
x\_{t + dt} &= \text{lerp}(x\_t,\, g,\, dt \cdot damping) \\
x\_{t + dt} &= x\_t + dt \cdot damping \cdot (g - x\_t) \\
\end{align\*}

We can see that this looks a bit like a physics equation where \( damping \cdot (g - x\_t) \) represents the velocity.

\begin{align\*}
v\_{t \phantom{+ dt}} &= damping \cdot (g - x\_t) \\
x\_{t + dt} &= x\_t + dt \cdot v\_t \\
\end{align\*}

This system is like a kind of particle with a velocity always proportional to the difference between the current particle position and the goal position. This explains the discontinuity - the velocity of our damper will always be directly proportional to the difference between the current position and the goal without ever taking any previous velocities into account.

What if instead of setting the velocity directly each step we made it something that changed more smoothly? For example, we could instead *add* a velocity taking us toward the goal to the current velocity, scaled by a different parameter which for now we will call the \( stiffness \).

\begin{align\*}
v\_{t + dt} & = v\_t + dt \cdot stiffness \cdot (g - x\_t) \\
x\_{t + dt} & = x\_t + dt \cdot v\_t \\
\end{align\*}

But the problem now is that this particle wont slow down until it has already over-shot the goal and is pulled back in the opposite direction. To fix this we can add a \( q \) variable which represents a *goal velocity*, and add another term which takes us toward this goal velocity. This we will scale by another new parameter which we will call the \( damping \) (for reasons which will become clearer later in the article).

\begin{align\*}
v\_{t + dt} & = v\_t + dt \cdot stiffness \cdot (g - x\_t) + dt \cdot damping \cdot (q - v\_t) \\
x\_{t + dt} & = x\_t + dt \cdot v\_t \\
\end{align\*}

When \( q \) is very small we can think of this like a kind of friction term which simply subtracts the current velocity. And when \( q = 0 \) and \( dt \cdot damping = 1 \) we can see that this friction term actually completely removes the existing velocity, reverting our system back to something just like our original damper.

Another way to think about these terms is by thinking of them as accelerations, which can be shown more clearly by factoring out the \( dt \):

\begin{align\*}
a\_{t \phantom{+ dt}} & = stiffness \cdot (g - x\_t) + damping \cdot (q - v\_t) \\
v\_{t + dt} & = v\_t + dt \cdot a\_t \\
x\_{t + dt} & = x\_t + dt \cdot v\_t \\
\end{align\*}

Assuming the mass of our particle is exactly one, it really is possible to think about this as two individual forces - one pulling the particle in the direction of the goal velocity, and one pulling it toward the goal position. If we use a small enough \( dt \) we can actually plug these functions together and simulate a simple damped spring with exactly the velocity continuity we wanted. Here is a function which does that (using [semi-implicit euler integration](https://gafferongames.com/post/integration_basics/)).

```C
void spring_damper_bad(
    float& x,
    float& v, 
    float g,
    float q, 
    float stiffness, 
    float damping, 
    float dt)
{
    v += dt * stiffness * (g - x) + dt * damping * (q - v);
    x += dt * v;
}
```

Let's see how it looks:

[

](/media/uploads/springs/springdamper_bad.m4v)

But unfortunately just like before we have problems when the \( dt \) is large, and certain settings for \( stiffness \) and \( damping \) can make the system unstable. These unintuitive parameters like \( damping \) and \( stiffness \) are also back again... arg!

[

](/media/uploads/springs/springdamper_unstable.m4v)

Can we give this spring the same treatment as we did for our damper by fiddling around with the maths? Well yes we can, but unfortunately from here on in things are going to get a bit more complicated...

---

## The Exact Spring Damper

This time the exact version of our model is too complicated to solve using a simple recurrence relation. Instead we're going to have to try a different tactic: we're going to guess an equation we think models the spring and then try to work out how to compute all the different parameters of that equation based on the parameters we do know such as the \( damping \) and \( stiffness \).

If we take a look at the movement of the spring in the previous section we can see there are basically two features - an exponential decay toward the goal position, and a kind of oscillation, a bit like a \( \cos \) or \( \sin \) function. So let's try and come up with an equation which fits that kind of shape and go from there. What about something like this?

\begin{align\*}
x\_t = j \cdot e^{-y \cdot t} \cdot \cos(w \cdot t + p) + c
\end{align\*}

Where \( j \) is the amplitude, \( y \) controls the time it takes to decay, a bit like our half-life parameter, \( t \) is the time, \( w \) is the frequency of oscillations, \( p \) is the phase of oscillations, and \( c \) is an offset on the vertical axis. This seems like a reasonable formulation of the behavior we saw previously.

But before we try to find all of these unknown parameters, let's write down the derivatives of this function with respect to \( t \) too. We'll use \( v\_t \) to denote the velocity, and \( a\_t \) to denote the acceleration.

\begin{align\*}
x\_t &= j \cdot e^{-y \cdot t} \cdot \cos(w \cdot t + p) + c \\
v\_t &= - y \cdot j \cdot e^{-y \cdot t} \cdot \cos(w \cdot t + p) \\
&- w \cdot j \cdot e^{-y \cdot t} \cdot \sin(w \cdot t + p) \\
a\_t &= y^2 \cdot j \cdot e^{-y \cdot t} \cdot \cos(w \cdot t + p) \\
&- w^2 \cdot j \cdot e^{-y \cdot t} \cdot \cos(w \cdot t + p) \\
&+ 2 \cdot w \cdot y \cdot j \cdot e^{-y \cdot t} \cdot \sin(w \cdot t + p) \\
\end{align\*}

Those might look a bit scary but we can make them a lot less scary by just summarizing some of the common terms:

\begin{align\*}
C &= j \cdot e^{-y \cdot t} \cdot \cos(w \cdot t + p) \\
S &= j \cdot e^{-y \cdot t} \cdot \sin(w \cdot t + p) \\
\end{align\*}

Giving us the following:

\begin{align\*}
x\_t &= C + c \\
v\_t &= -y \cdot C - w \cdot S \\
a\_t &= y^2 \cdot C - w^2 \cdot C + 2 \cdot w \cdot y \cdot S \\
\end{align\*}

#### Finding the Spring Parameters

Our plan for finding the first set of unknown parameters is as follows: we're going to substitute these new equations for \( x\_t \), \( v\_t \), and \( a\_t \) into our previous equation of motion \( a\_t = s \cdot (g - x\_t) + d \cdot (q - v\_t) \) (where \( d = damping \) and \( s = stiffness\) ) and try to rearrange to solve for \( y \), \( w \), and \( c \) using all the other values we know: \( s \), \( d \), \( q \), and \( g \).

But first let's shuffle around some terms in this equation of motion: expanding the \( stiffness \) and \( damping \) terms, moving some values onto the left hand side, and finally negating everything. This will make the next steps much easier for us.

\begin{align\*}
a\_t &= s \cdot (g - x\_t) + d \cdot (q - v\_t) \\
0 &= s \cdot (g - x\_t) + d \cdot (q - v\_t) - a\_t \\
0 &= s \cdot g - s \cdot x\_t + d \cdot q - d \cdot v\_t - a\_t \\
-s \cdot g - d \cdot q &= -s \cdot x\_t - d \cdot v\_t - a\_t \\
s \cdot g + d \cdot q &= s \cdot x\_t + d \cdot v\_t + a\_t \\
\end{align\*}

Now let's substitute in our three new equations we just created for \( x\_t \), \( v\_t \), and \( a\_t \):

\begin{align\*}
s \cdot g + d \cdot q &= s \cdot x\_t + d \cdot v\_t + a\_t \\
s \cdot g + d \cdot q &= s \cdot (C + c) + d \cdot (-y \cdot C - w \cdot S) + ((y^2 - w^2) \cdot C + 2 \cdot w \cdot y \cdot S)
\end{align\*}

And by multiplying out and then gathering all the coefficients of \( C \) and \( S \) together we can get:

\begin{align\*}
s \cdot g + d \cdot q &= s \cdot (C + c) + d \cdot (-y \cdot C - w \cdot S) + ((y^2 - w^2) \cdot C + 2 \cdot w \cdot y \cdot S) \\
s \cdot g + d \cdot q - s \cdot c &= s \cdot C + d \cdot -y \cdot C - d \cdot w \cdot S + y^2 \cdot C - w^2 \cdot C + 2 \cdot w \cdot y \cdot S \\
s \cdot g + d \cdot q - s \cdot c &= ((y^2 - w^2) - d \cdot y + s) \cdot C + (2 \cdot w \cdot y - d \cdot w) \cdot S \\
\end{align\*}

There is one more additional fact we can use to get the variables we need from this equation: because \( C \) and \( S \) are essentially \( \cos \) and \( \sin \) functions with the same phase, amplitude, and frequency, the only way this equation can be balanced for all potential values of \( t \), \( w \), \( y \), \( j \) and \( c \) is when both the coefficients of \( C \) and \( S \) are zero and when the left hand side equals zero. This gives us three smaller equations to solve:

\begin{align}
s \cdot g + d \cdot q - s \cdot c &= 0 \\
(y^2 - w^2) - d \cdot y + s &= 0 \\
2 \cdot w \cdot y - d \cdot w &= 0 \\
\end{align}

#### Finding \( c \)

Using equation \( (1) \) we can solve for \( c \) right away to get our first unknown!

\begin{align\*}
s \cdot g + d \cdot q - s \cdot c &= 0 \\
s \cdot g + d \cdot q &= s \cdot c \\
g + \tfrac{d \cdot q}{s} &= c \\
\end{align\*}

#### Finding \( y \)

And by rearranging equation \( (3) \) we can also find a solution for \( y \):

\begin{align\*}
2 \cdot w \cdot y - d \cdot w &= 0 \\
d \cdot w &= 2 \cdot w \cdot y \\
d &= 2 \cdot y \\
\tfrac{d}{2} &= y \\
\end{align\*}

#### Finding \( w \)

Which we can substitute into equation \( (2) \) to solve for \( w \):

\begin{align\*}
(y^2 - w^2) - d \cdot y + s &= 0 \\
(\left(\tfrac{d}{2}\right)^2 - w^2) - d \cdot \tfrac{d}{2} + s &= 0 \\
\tfrac{d^2}{4} - w^2 - \tfrac{d^2}{2} + s &= 0 \\
\tfrac{d^2}{4} - \tfrac{d^2}{2} + s &= w^2 \\
s - \tfrac{d^2}{4} &= w^2 \\
\sqrt{s - \tfrac{d^2}{4}} &= w \\
\end{align\*}

#### Finding the Spring State

There are two final unknown variables remaining: \( j \), and \( p \) - the amplitude and the phase. Unlike \( y \), \( w \), and \( c \), these two are determined by the initial conditions of the spring. Therefore, given some initial position and velocity, \( x\_0 \) and \( v\_0 \), we can plug these in our equations along with \( t = 0 \) to get some more equations we will use to find \( j \) and \( p \):

\begin{align\*}
x\_0 &= j \cdot e^{-y \cdot 0} \cdot \cos(w \cdot 0 + p) + c \\
x\_0 &= j \cdot \cos(p) + c \\
\\
v\_0 &= -y \cdot j \cdot e^{-y \cdot 0} \cdot \cos(w \cdot 0 + p) - w \cdot j \cdot e^{-y \cdot 0} \cdot \sin(w \cdot 0 + p) \\
v\_0 &= -y \cdot j \cdot \cos(p) - w \cdot j \cdot \sin(p)
\end{align\*}

#### Finding \( j \)

Let's start with \( j \). First we'll re-arrange our equation for \( x\_0 \) in terms of \( p \):

\begin{align\*}
x\_0 &= j \cdot \cos(p) + c \\
x\_0 - c &= j \cdot \cos(p) \\
\tfrac{x\_0 - c}{j} &= \cos(p) \\
\arccos\left(\tfrac{x\_0 - c}{j}\right) &= p \\
\end{align\*}

And substitute this into our equation for \( v\_0 \):

\begin{align\*}
v\_0 &= -y \cdot j \cdot \cos(p) - w \cdot j \cdot \sin(p) \\
v\_0 &= -y \cdot j \cdot \cos\left(\arccos\left(\tfrac{x\_0 - c}{j}\right)\right) - w \cdot j \cdot \sin\left(\arccos\left(\tfrac{x\_0 - c}{j}\right)\right) \\
v\_0 &= -y \cdot j \cdot \tfrac{x\_0 - c}{j} - w \cdot j \cdot \sqrt{1 - \tfrac{(x\_0 - c)^2}{j^2}} \\
v\_0 &= -y \cdot (x\_0 - c) - w \cdot j \cdot \sqrt{1 - \tfrac{(x\_0 - c)^2}{j^2}} \\
\end{align\*}

Which we can now rearrange for \( j \):

\begin{align\*}
v\_0 + y \cdot (x\_0 - c) &= -w \cdot j \cdot \sqrt{1 - \tfrac{(x\_0 - c)^2}{j^2}} \\
\frac{v\_0 + y \cdot (x\_0 - c)}{-w \cdot j} &= \sqrt{1 - \tfrac{(x\_0 - c)^2}{j^2}} \\
\frac{(v\_0 + y \cdot (x\_0 - c))^2}{(-w \cdot j)^2} &= 1 - \frac{(x\_0 - c)^2}{j^2} \\
\frac{(v\_0 + y \cdot (x\_0 - c))^2}{w^2} &= j^2 - (x\_0 - c)^2\\
\frac{(v\_0 + y \cdot (x\_0 - c))^2}{w^2} + (x\_0 - c)^2 &= j^2 \\
\sqrt{\frac{(v\_0 + y \cdot (x\_0 - c))^2}{w^2} + (x\_0 - c)^2} &= j \\
\end{align\*}

Nice! Since this relies on squares and a square root, some sign information is lost. This means that in our code we will also need to negate \( j \) in the case that \( x\_0 - c < 0 \).

#### Finding \( p \)

Finally, we are ready to find \( p \). We can start by rearranging our velocity equation \( v\_0 \) for \( j \):

\begin{align\*}
v\_0 &= -y \cdot j \cdot \cos(p) - w \cdot j \cdot \sin(p) \\
v\_0 &= j \cdot (-y \cdot \cos(p) - w \cdot \sin(p)) \\
\frac{v\_0}{-y \cdot \cos(p) - w \cdot \sin(p)} &= j \\
\end{align\*}

And then substitute this into our equation for \( x\_0 \) to solve for \( p \):

\begin{align\*}
x\_0 &= j \cdot \cos(p) + c \\
x\_0 &= \left(\frac{v\_0}{-y \cdot \cos(p) - w \cdot \sin(p)}\right) \cdot \cos(p) + c \\
x\_0 - c &= \frac{v\_0 \cdot \cos(p)}{-y \cdot \cos(p) - w \cdot \sin(p)} \\
x\_0 - c &= \frac{v\_0}{-y - w \cdot \tfrac{\sin(p)}{\cos(p)}} \\
x\_0 - c &= \frac{v\_0}{-y - w \cdot \tan(p)} \\
(x\_0 - c) \cdot (-y - w \cdot \tan(p)) &= v\_0 \\
-(x\_0 - c) \cdot y - (x\_0 - c) \cdot w \cdot \tan(p) &= v\_0 \\
-(x\_0 - c) \cdot w \cdot \tan(p) &= v\_0 + (x\_0 - c) \cdot y \\
\tan(p) &= \frac{v\_0 + (x\_0 - c) \cdot y}{-(x\_0 - c) \cdot w} \\
p &= \arctan\left(\frac{v\_0 + (x\_0 - c) \cdot y}{-(x\_0 - c) \cdot w}\right) \\
\end{align\*}

#### Putting it together

Putting all of this together, and throwing in a fast approximate `atanf` for fun, we get the following...

```C
float fast_atan(float x)
{
    float z = fabs(x);
    float w = z > 1.0f ? 1.0f / z : z;
    float y = (M_PI / 4.0f)*w - w*(w - 1)*(0.2447f + 0.0663f*w);
    return copysign(z > 1.0f ? M_PI / 2.0 - y : y, x);
}

float squaref(float x)
{
    return x*x;
}

void spring_damper_exact(
    float& x, 
    float& v, 
    float x_goal, 
    float v_goal, 
    float stiffness, 
    float damping, 
    float dt, 
    float eps = 1e-5f)
{
    float g = x_goal;
    float q = v_goal;
    float s = stiffness;
    float d = damping;
    float c = g + (d*q) / (s + eps);
    float y = d / 2.0f;
    float w = sqrtf(s - (d*d)/4.0f);
    float j = sqrtf(squaref(v + y*(x - c)) / (w*w + eps) + squaref(x - c));
    float p = fast_atan((v + (x - c) * y) / (-(x - c)*w + eps));

    j = (x - c) > 0.0f ? j : -j;

    float eydt = fast_negexp(y*dt);

    x = j*eydt*cosf(w*dt + p) + c;
    v = -y*j*eydt*cosf(w*dt + p) - w*j*eydt*sinf(w*dt + p);
}
```

Phew - that was a lot of equations and re-arranging, but it worked, and produces a smooth, stable motion even with a very large `dt` or `stiffness`. And anyway, doesn't it feel nice to actually use those high school trig identities and do some old school equation manipulation for once!

[

](/media/uploads/springs/springdamper_implicit.m4v)

---

## Over, Under, and Critical Damping

But hold on... one of the steps we took in the previous section wasn't really legit... can you spot it? Here is the problem:

\begin{align\*}
w = \sqrt{s - \tfrac{d^2}{4}}
\end{align\*}

It's a square root... but I never assured you the input to this square root couldn't be negative. In fact it can be... and definitely will be if \( d \) is large!

But what does this negative square root actually correspond to? Does it mean that there is no exact solution to this spring when the \( damping \) is large? Do we just have to give up? Well, not exactly...

In fact we didn't notice when we came up with our original equation to model the behavior of the spring, but there are three different ways this spring can act depending on the relative sizes of the \( damping \) and \( stiffness \) values.

If \( s - \tfrac{d^2}{4} > 0 \) it means the spring is *under* damped, causing oscillations to appear with motions governed by the equations we already derived. If \( s - \tfrac{d^2}{4} = 0 \) it means the spring is *critically* damped, meaning it returns to the goal as fast as possible without extra oscillation, and if \( s - \tfrac{d^2}{4} < 0 \) it means the spring is *over* damped, and will return slowly toward the goal.

In each of these cases there is a different set of basic equations governing the system, leading to a different derivation just like the one we completed. I'm going to save us a bit of time and write them all our here rather than going through the trial and error process of examining different guesses at equations and seeing if they fit:

#### Under Damped:

\begin{align\*}
x\_t &= j \cdot e^{-y \cdot t} \cdot \cos(w \cdot t + p) + c \\
v\_t &= - y \cdot j \cdot e^{-y \cdot t} \cdot \cos(w \cdot t + p) \\
&- w \cdot j \cdot e^{-y \cdot t} \cdot \sin(w \cdot t + p) \\
a\_t &= y^2 \cdot j \cdot e^{-y \cdot t} \cdot \cos(w \cdot t + p) \\
&- w^2 \cdot j \cdot e^{-y \cdot t} \cdot \cos(w \cdot t + p) \\
&+ 2 \cdot w \cdot y \cdot j \cdot e^{-y \cdot t} \cdot \sin(w \cdot t + p) \\
\end{align\*}

#### Critically Damped:

\begin{align\*}
x\_t &= j\_0 \cdot e^{-y \cdot t} + t \cdot j\_1 \cdot e^{-y \cdot t} + c \\
v\_t &= -y \cdot j\_0 \cdot e^{-y \cdot t} - y \cdot t \cdot j\_1 \cdot e^{-y \cdot t} + j\_1 \cdot e^{-y \cdot t} \\
a\_t &= y^2 \cdot j\_0 \cdot e^{-y \cdot t} + y^2 \cdot t \cdot j\_1 \cdot e^{-y \cdot t} - 2 \cdot y \cdot j\_1 \cdot e^{-y \cdot t} \\
\end{align\*}

#### Over Damped:

\begin{align\*}
x\_t &= j\_0 \cdot e^{-y\_0 \cdot t} + j\_1 \cdot e^{-y\_1 \cdot t} + c \\
v\_t &= -y\_0 \cdot j\_0 \cdot e^{-y\_0 \cdot t} - y\_1 \cdot j\_1 \cdot e^{-y\_1 \cdot t} \\
a\_t &= y\_0^2 \cdot j\_0 \cdot e^{-y\_0 \cdot t} + y\_1^2 \cdot j\_1 \cdot e^{-y\_1 \cdot t} \\
\end{align\*}

What we did in the previous section was solve for the under damped case, but the other two cases require exactly the same style of derivation to get them working.

#### Solving the Critically Damped Case

Let's start with the easiest: the critically damped case. The first two unknowns \( c \) and \( y \) have exactly the same solution as in the under-damped case, \( c = g + \frac{d \cdot q}{s} \) and \( y = \tfrac{d}{2} \), while the other two unknowns \( j\_0 \) and \( j\_1 \) can be found easily from the initial conditions \( x\_0 \), \( v\_0 \), and \( t = 0 \):

\begin{align\*}
x\_0 &= j\_0 \cdot e^{-y \cdot 0} + 0 \cdot j\_1 \cdot e^{-y \cdot 0} + c \\
x\_0 &= j\_0 + c \\
\end{align\*}

And for the velocity...

\begin{align\*}
v\_0 &= -y \cdot j\_0 \cdot e^{-y \cdot 0} - y \cdot 0 \cdot j\_1 \cdot e^{-y \cdot t} + j\_1 \cdot e^{-y \cdot 0} \\
v\_0 &= -y \cdot j\_0 + j\_1 \\
\end{align\*}

Giving us...

\begin{align\*}
j\_0 &= x\_0 - c \\
j\_1 &= v\_0 + j\_0 \cdot y \\
\end{align\*}

And that's it, easy!

#### Solving the Over Damped Case

The over-damped case is a little more difficult so let's first summarize some terms again to make our equations clearer.

\begin{align\*}
E\_0 &= j\_0 \cdot e^{-y\_0 \cdot t} \\
E\_1 &= j\_1 \cdot e^{-y\_1 \cdot t} \\
\end{align\*}

Giving us...

\begin{align\*}
x\_t &= E\_0 + E\_1 + c \\
v\_t &= -y\_0 \cdot E\_0 - y\_1 \cdot E\_1 \\
a\_t &= y\_0^2 \cdot E\_0 + y\_1^2 \cdot E\_1 \\
\end{align\*}

We'll start by finding the two unknowns \( y\_0 \), and \( y\_1 \). Just like before we are going to substitute these equations into our equation of motion, gathering up the coefficients for the exponential terms:

\begin{align\*}
s \cdot g + d \cdot q &= s \cdot x\_t + d \cdot v\_t + a\_t \\
s \cdot g + d \cdot q &= s \cdot (E\_0 + E\_1 + c) + d \cdot (-y\_0 \cdot E\_0 - y\_1 \cdot E\_1) + (y\_0^2 \cdot E\_0 + y\_1^2 \cdot E\_1) \\
s \cdot g + d \cdot q &= s \cdot E\_0 + s \cdot E\_1 + s \cdot c - d \cdot y\_0 \cdot E\_0 - d \cdot y\_1 \cdot E\_1 + y\_0^2 \cdot E\_0 + y\_1^2 \cdot E\_1 \\
s \cdot g + d \cdot q - s \cdot c &= (s - d \cdot y\_0 + y\_0^2) \cdot E\_0 + (s - d \cdot y\_1 + y\_1^2) \cdot E\_1 \\
\end{align\*}

Again, just like before, this equation is only solved when both coefficients and the left hand side equal zero. This gives us our existing solution for \( c \) plus two more quadratic equations to solve:

\begin{align\*}
s - d \cdot y\_0 + y\_0^2 &= 0 \\
s - d \cdot y\_1 + y\_1^2 &= 0 \\
\end{align\*}

In this case \( y\_0 \) and \( y\_1 \) represent the two different solutions to the same quadratic, so we can use the quadratic formula to get these:

\begin{align\*}
y\_0 &= \frac{d + \sqrt{d^2 - 4 \cdot s}}{2} \\
y\_1 &= \frac{d - \sqrt{d^2 - 4 \cdot s}}{2} \\
\end{align\*}

Now that these are found we're ready to solve for \( j\_0 \) and \( j\_1 \) using the initial conditions \( x\_0 \), \( v\_0 \), and \( t = 0 \):

\begin{align\*}
x\_0 &= j\_0 \cdot e^{-y\_0 \cdot 0} + j\_1 \cdot e^{-y\_1 \cdot 0} + c \\
x\_0 &= j\_0 + j\_1 + c \\
\\
v\_0 &= -y\_0 \cdot j\_0 \cdot e^{-y\_0 \cdot 0} - y\_1 \cdot j\_1 \cdot e^{-y\_1 \cdot 0} \\
v\_0 &= -y\_0 \cdot j\_0 - y\_1 \cdot j\_1 \\
\end{align\*}

First we'll re-arrange our eqiation for \( x\_0 \) in terms of \( j\_0 \)

\begin{align\*}
x\_0 &= j\_0 + j\_1 + c \\
x\_0 - j\_1 - c &= j\_0 \\
\end{align\*}

Which we'll substitute into our equation for \( v\_0 \) to solve for \( j\_1 \):

\begin{align\*}
v\_0 &= -y\_0 \cdot j\_0 - y\_1 \cdot j\_1 \\
v\_0 &= -y\_0 \cdot (x\_0 - j\_1 - c) - y\_1 \cdot j\_1 \\
v\_0 &= -y\_0 \cdot x\_0 + y\_0 \cdot j\_1 + y\_0 \cdot c - y\_1 \cdot j\_1 \\
-v\_0 &= y\_0 \cdot x\_0 - y\_0 \cdot j\_1 - y\_0 \cdot c + y\_1 \cdot j\_1 \\
y\_0 \cdot c - v\_0 - y\_0 \cdot x\_0 &= - y\_0 \cdot j\_1 + y\_1 \cdot j\_1 \\
y\_0 \cdot c - v\_0 - y\_0 \cdot x\_0 &= j\_1 \cdot (y\_1 - y\_0) \\
\frac{y\_0 \cdot c - v\_0 - y\_0 \cdot x\_0}{y\_1 - y\_0} &= j\_1 \\
\end{align\*}

After which is is easy to get \( j\_0 \):

\begin{align\*}
x\_0 &= j\_0 + j\_1 + c \\
x\_0 - j\_1 - c &= j\_0 \\
\end{align\*}

And that's it! Let's add all of these different cases to our spring damper function:

```C
void spring_damper_exact(
    float& x, 
    float& v, 
    float x_goal, 
    float v_goal, 
    float stiffness, 
    float damping, 
    float dt, 
    float eps = 1e-5f)
{
    float g = x_goal;
    float q = v_goal;
    float s = stiffness;
    float d = damping;
    float c = g + (d*q) / (s + eps);
    float y = d / 2.0f; 
    
    if (fabs(s - (d*d) / 4.0f) < eps) // Critically Damped
    {
        float j0 = x - c;
        float j1 = v + j0*y;
        
        float eydt = fast_negexp(y*dt);
        
        x = j0*eydt + dt*j1*eydt + c;
        v = -y*j0*eydt - y*dt*j1*eydt + j1*eydt;
    }
    else if (s - (d*d) / 4.0f > 0.0) // Under Damped
    {
        float w = sqrtf(s - (d*d)/4.0f);
        float j = sqrtf(squaref(v + y*(x - c)) / (w*w + eps) + squaref(x - c));
        float p = fast_atan((v + (x - c) * y) / (-(x - c)*w + eps));
        
        j = (x - c) > 0.0f ? j : -j;
        
        float eydt = fast_negexp(y*dt);
        
        x = j*eydt*cosf(w*dt + p) + c;
        v = -y*j*eydt*cosf(w*dt + p) - w*j*eydt*sinf(w*dt + p);
    }
    else if (s - (d*d) / 4.0f < 0.0) // Over Damped
    {
        float y0 = (d + sqrtf(d*d - 4*s)) / 2.0f;
        float y1 = (d - sqrtf(d*d - 4*s)) / 2.0f;
        float j1 = (c*y0 - x*y0 - v) / (y1 - y0);
        float j0 = x - j1 - c;
        
        float ey0dt = fast_negexp(y0*dt);
        float ey1dt = fast_negexp(y1*dt);

        x = j0*ey0dt + j1*ey1dt + c;
        v = -y0*j0*ey0dt - y1*j1*ey1dt;
    }
}
```

Awesome! Now it works even for very high `damping` values!

[

](/media/uploads/springs/springdamper_implicit_fixed.m4v)

---

## The Half-life and the Frequency

We're almost there, but our functions still use these mysterious `damping` and `stiffness` parameters. Can we turn these into something a bit more meaningful? Yes! Just like before we can use a `halflife` parameter instead of a `damping` parameter by controlling what we give as input to the `exp` functions:

```C
float halflife_to_damping(float halflife, float eps = 1e-5f)
{
    return (4.0f * 0.69314718056f) / (halflife + eps);
}
    
float damping_to_halflife(float damping, float eps = 1e-5f)
{
    return (4.0f * 0.69314718056f) / (damping + eps);
}
```

Here as well as our previous constant of \( ln(2) \) we need to multiply by `4`. This is a bit of a fudge factor but roughly it corresponds to the fact that we divide by two once to get \( y \) from \( d \), and that the spring equation is usually a sum of two exponential terms instead of the single one we had for the damper.

*(For an alternative, less fudged half-life formulation check out [this article](https://theorangeduck.com/page/fitting-code-driven-displacement-revisited#true-half-life)*

What about the `stiffness` parameter? Well this one we can turn into a parameter called `frequency`:

```C
float frequency_to_stiffness(float frequency)
{
   return squaref(2.0f * M_PI * frequency);
}

float stiffness_to_frequency(float stiffness)
{
    return sqrtf(stiffness) / (2.0f * M_PI);
}
```

Which is close to what will become \( w \) in the under-damped case.

Both are not completely honest names - the velocity continuity and oscillations of the spring means that the position will not be exactly half way toward the goal in `halflife` time, while the `frequency` parameter is more like a pseudo-frequency as the rate of oscillation is also affected by the `damping` value. Nonetheless, both give more intuitive controls for the spring than the `damping` and `stiffness` alternatives.

[

](/media/uploads/springs/springdamper_implicit_halflife.m4v)

Along these lines, another useful set of functions are those that give us settings for these two parameters in the critical case (i.e. when \( \tfrac{d^2}{4} = s \) ). These can be useful for setting defaults or in other cases when we only want to set one of these parameters.

```C
float critical_halflife(float frequency)
{
    return damping_to_halflife(sqrtf(frequency_to_stiffness(frequency) * 4.0f));
}

float critical_frequency(float halflife)
{
    return stiffness_to_frequency(squaref(halflife_to_damping(halflife)) / 4.0f);
}
```

The `critical_halflife` function doesn't make that much sense since when critical there aren't any oscillations, but it can still be useful in certain cases. Putting it all together we can provide our spring with a nicer interface:

```C
void spring_damper_exact(
    float& x, 
    float& v, 
    float x_goal, 
    float v_goal, 
    float frequency, 
    float halflife, 
    float dt, 
    float eps = 1e-5f)
{    
    float g = x_goal;
    float q = v_goal;
    float s = frequency_to_stiffness(frequency);
    float d = halflife_to_damping(halflife);
    float c = g + (d*q) / (s + eps);
    float y = d / 2.0f; 
    
    ...

}
```

Below you can see which critical `frequency` corresponds to a given `halflife`. And now I promise we really are done: that's it, an exact damped spring!

[

](/media/uploads/springs/springdamper_implicit_critical.m4v)

---

## The Damping Ratio

Although controlling the frequency is nice, there is a different control which may be even better for users as it resembles a bit more the scale from *less springy* to *more springy* they might want. This is the *damping ratio*, where a value of \( 1 \) means a critically damped spring, a value \( < 1 \) means an under-damped spring, and a value \( > 1 \) means a over-damped spring.

The equation for the damping ratio \( r \) is as follows, where \( d \) is the damping and \( s \) is the stiffness:

\begin{align\*}
r = \frac{d}{2\ \sqrt{s}}
\end{align\*}

This we can re-arrange to solve for stiffness or damping as required.

```C
float damping_ratio_to_stiffness(float ratio, float damping)
{
    return squaref(damping / (ratio * 2.0f));
}

float damping_ratio_to_damping(float ratio, float stiffness)
{
    return ratio * 2.0f * sqrtf(stiffness);
}
```

And use instead of the frequency.

```C
void spring_damper_exact_ratio(
    float& x, 
    float& v, 
    float x_goal, 
    float v_goal, 
    float damping_ratio, 
    float halflife, 
    float dt, 
    float eps = 1e-5f)
{    
    float g = x_goal;
    float q = v_goal;
    float d = halflife_to_damping(halflife);
    float s = damping_ratio_to_stiffness(damping_ratio, d);
    float c = g + (d*q) / (s + eps);
    float y = d / 2.0f; 
    
    ...

}
```

And here it is in action!

[

](/media/uploads/springs/damping_ratio.m4v)

---

## The Critical Spring Damper

Looking at our exact spring damper, the critical case is particularly interesting for us (and is most likely the case you may have actually used in your games) - not only because it's the situation where the spring moves toward the goal as fast as possible without additional oscillation, but because it's the easiest to compute and also *to use* as it has fewer parameters. We can therefore make a special function for it, which will allow us to remove the `frequency` parameter and throw in a few more basic optimizations:

```C
void critical_spring_damper_exact(
    float& x, 
    float& v, 
    float x_goal, 
    float v_goal, 
    float halflife, 
    float dt)
{
    float g = x_goal;
    float q = v_goal;
    float d = halflife_to_damping(halflife);
    float c = g + (d*q) / ((d*d) / 4.0f);
    float y = d / 2.0f;	
    float j0 = x - c;
    float j1 = v + j0*y;
    float eydt = fast_negexp(y*dt);

    x = eydt*(j0 + j1*dt) + c;
    v = eydt*(v - j1*y*dt);
}
```

With no special cases for over-damping and under-damping this can compile down to something very fast. Separate functions for other common situations can be useful too, such as when the goal velocity `q` is zero...

```C
void simple_spring_damper_exact(
    float& x, 
    float& v, 
    float x_goal, 
    float halflife, 
    float dt)
{
    float y = halflife_to_damping(halflife) / 2.0f;	
    float j0 = x - x_goal;
    float j1 = v + j0*y;
    float eydt = fast_negexp(y*dt);

    x = eydt*(j0 + j1*dt) + x_goal;
    v = eydt*(v - j1*y*dt);
}
```

or when the goal position is zero too...

```C
void decay_spring_damper_exact(
    float& x, 
    float& v, 
    float halflife, 
    float dt)
{
    float y = halflife_to_damping(halflife) / 2.0f;	
    float j1 = v + x*y;
    float eydt = fast_negexp(y*dt);

    x = eydt*(x + j1*dt);
    v = eydt*(v - j1*y*dt);
}
```

Another optimization that can be useful is to pre-compute `y` and `eydt` for a given `halflife`. If there are many springs that need to be updated with the same `halflife` and `dt` this can provide a big speed-up.

---

# Applications

## Smoothing

Probably the most common application of springs in game development is smoothing - any noisy signal can be easily smoothed in real time by a spring damper and the half life can be used to control the amount of smoothing applied vs how responsive it is to changes.

[

](/media/uploads/springs/application_smoothing.m4v)

---

## Filtering

Springs also work well for filtering out sudden changes or jitters in signals, and even springs with quite a small `halflife` will do really well at removing any sudden jitters.

[

](/media/uploads/springs/application_filtering.m4v)

---

## Controllers

Another common application of springs in game development is for moving characters. The usual process is to take the user input from the gamepad and turn it into a desired character velocity, which we then set as the goal for a spring. Each timestep we tick this spring and use what it produces as a velocity with which to move the character. By tweaking the parameters of the spring we can achieve movement with different levels of smoothness and responsiveness.

The slightly unintuitive thing to remember about this setup is that we are using the spring in a way such that its position corresponds to the character's velocity - meaning the spring's velocity will correspond to the character's acceleration.

Assuming the desired character velocity remains fixed we can also use this spring to predict the *future* character velocity by simply by evaluating the spring with a larger \( dt \) than we normally would and seeing what the result is.

If we want the character's *position* after some timestep (not just the velocity) we can compute it more accurately by using the *the integral* of our critical spring equation with respect to time. This will give us an accurate prediction of the future position of the character too.

\begin{align\*}
x\_{t} &= \int (j\_0 \cdot e^{-y \cdot t} + t \cdot j\_1 \cdot e^{-y \cdot t} + c) \,dt \\
x\_{t} &= \tfrac{-j\_1}{y^2} \cdot e^{-y \cdot t} + \tfrac{-j\_0 - j\_1 \cdot t}{y} \cdot e^{-y \cdot t} + \tfrac{j\_1}{y^2} + \tfrac{j\_0}{y} + c \cdot t + x\_0 \\
\end{align\*}

And translated into code...

```C
void spring_character_update(
    float& x, 
    float& v, 
    float& a, 
    float v_goal, 
    float halflife, 
    float dt)
{
    float y = halflife_to_damping(halflife) / 2.0f;	
    float j0 = v - v_goal;
    float j1 = a + j0*y;
    float eydt = fast_negexp(y*dt);

    x = eydt*(((-j1)/(y*y)) + ((-j0 - j1*dt)/y)) + 
        (j1/(y*y)) + j0/y + v_goal * dt + x;
    v = eydt*(j0 + j1*dt) + v_goal;
    a = eydt*(a - j1*y*dt);
}
```

This code is the same as the critically damped spring, but applied to the character velocity and the integral used to compute the character position. If we want to predict the future trajectory we can use this to update arrays of data each with a different \( dt \):

```C
void spring_character_predict(
    float px[], 
    float pv[], 
    float pa[], 
    int count,
    float x, 
    float v, 
    float a, 
    float v_goal, 
    float halflife,
    float dt)
{
    for (int i = 0; i < count; i++)
    {
        px[i] = x; 
        pv[i] = v; 
        pa[i] = a;
    }

    for (int i = 0; i < count; i++)
    {
        spring_character_update(px[i], pv[i], pa[i], v_goal, halflife, i * dt);
    }
}
```

This really shows how using a completely exact spring equation comes in handy - we can accurately predict the state of the spring at any arbitrary point in the future without having to simulate what happens in between.

[

](/media/uploads/springs/application_controller.m4v)

Here you can see me moving around a point in the world using the above code and a desired character velocity coming from the gamepad. By adjusting the `halflife` of the spring we can achieve different levels of responsiveness and smoothness, and by evaluating the spring at various different times in the future we can predict where the character would be if the current input were to remain fixed (shown in red).

This is exactly the method we use to predict the future character trajectory in [Learned Motion Matching](https://theorangeduck.com/page/learned-motion-matching).

---

## Inertialization

In game animation, [inertialization](https://www.youtube.com/watch?v=BYyv4KTegJI) is the name given to a kind of blending that fades in or out an offset between two animations. Generally it can be used as a more performant alternative to a cross-fade blend since it only needs to evaluate one animation at a time. In the original presentation a polynomial is used blend out this offset smoothly, but springs can be used for this too.

The idea is this: if we have two different streams of animation we wish to switch between, at the point of transition we record the offset between the currently playing animation and the one we want to switch to. Then, we switch to this new animation but add back the previously recorded offset. We then decay this offset smoothly toward zero over time - in this case using a spring damper.

In code it looks something like this. First at the transition point we record the offset in terms of position and velocity between the currently playing animation `src` and the one we're going to switch to `dst`:

```C
void inertialize_transition(
    float& off_x, float& off_v, 
    float src_x, float src_v,
    float dst_x, float dst_v)
{
    off_x = (src_x + off_x) - dst_x;
    off_v = (src_v + off_v) - dst_v;
}
```

We then switch to this animation, and at every frame we decay this offset toward zero, adding the result back to our currently playing animation.

```C
void inertialize_update(
    float& out_x, float& out_v,
    float& off_x, float& off_v,
    float in_x, float in_v,
    float halflife,
    float dt)
{
    decay_spring_damper_exact(off_x, off_v, halflife, dt);
    out_x = in_x + off_x;
    out_v = in_v + off_v;
}
```

Here you can see it in action:

[

](/media/uploads/springs/application_inertialization.m4v)

As you can see, each time we toggle the button there is a transition between the two different streams of animation (in this case two different \( \sin \) waves shown in red), while the inertialization smoothly fills in the difference (shown in blue).

Unlike the original presentation which uses a polynomial to blend out the offset over a specific period, a spring does not provide a fixed blend time and can easily overshoot. However the exponential decay does mean it tends to look smooth and blends out to something negligible at a very fast rate. In addition, since there is no need to remember the last transition time the code is very simple, and because we use the `decay_spring_damper_exact` variant of the spring it can be made exceptionally fast, in particular when all the blends for the different bones use the same `halflife` and `dt` to update.

This is exactly the method we use for switching between animations in our Motion Matching implementation as demonstrated in [Learned Motion Matching](https://theorangeduck.com/page/learned-motion-matching).

---

## Interpolation

The time dimension of a spring doesn't have to always be the real time that ticks by - it can be any variable that increases monotonically. For example we could use the parameterization along a curve as the time dimension to feed to a spring to produce a kind of spline.

Here I set up a piecewise interpolation of some 2D control points and used that as position and velocity goal for two springs (one for each dimension in 2D).

```C
void piecewise_interpolation(
    float& x,
    float& v,
    float t,
    float pnts[],
    int npnts)
{
    t = t * (npnts - 1);
    int i0 = floorf(t);
    int i1 = i0 + 1;
    i0 = i0 > npnts - 1 ? npnts - 1 : i0;
    i1 = i1 > npnts - 1 ? npnts - 1 : i1;
    float alpha = fmod(t, 1.0f);
    
    x = lerp(pnts[i0], pnts[i1], alpha);
    v = (pnts[i0] - pnts[i1]) / npnts;
}
```

The result is a kind of funky spline which *springs* toward the control points. By adjusting the `halflife` and `frequency` we can produce some interesting shapes but overall the result has an odd feel to it since it's not symmetric and usually doesn't quite reach the last control point. Perhaps some more experimentation here could be interesting, such as running two springs along the control points in opposite directions and mixing the result.

[

](/media/uploads/springs/application_interpolation.m4v)

I think there is probably still a way to formulate an interesting and useful type of spline using springs. Tell me if you manage to come up with anything interesting!

---

## Resonance

If you've got a signal which you think contains at specific frequency but you don't know exactly which frequency it is what do you do? Well, I can already see you starting to type "fast fourier transform" into google but hold on a second, do you really need to do something that complicated?

Springs can be used to see if a signal is oscillating at a specific frequency! Fed with a goal moving at their resonate frequency springs will oscillate and build up energy, while fed a goal moving at any other frequency will make them die out and lose energy.

We can measure the energy of the spring using the sum of potential and kinematic energies.

```C
float spring_energy(
    float x, 
    float v, 
    float frequency,
    float x_rest = 0.0f, 
    float v_rest = 0.0f,
    float scale = 1.0f)
{
    float s = frequency_to_stiffness(frequency);
    
    return (
        squaref(scale * (v - v_rest)) + s * 
        squaref(scale * (x - x_rest))) / 2.0f;
}
```

Then, if we want to see which frequency is contained in a signal we can simply drive a spring (or multiple springs at different frequencies) and see which setting produces the most energy.

[

](/media/uploads/springs/application_resonance.m4v)

As mentioned in the previous sections, the `frequency` parameter we're using doesn't actually reflect the true resonate frequency of the spring (the true resonate frequency is also affected by the `damping`), but we can find the frequency we need to set a spring to match some resonant frequency by fixing the `halflife`:

```C
float resonant_frequency(float goal_frequency, float halflife)
{
    float d = halflife_to_damping(halflife);
    float goal_stiffness = frequency_to_stiffness(goal_frequency);
    float resonant_stiffness = goal_stiffness - (d*d)/4.0f;
    return stiffness_to_frequency(resonant_stiffness);
}
```

When trying to pick out specific frequencies the `halflife` of the spring affects the sensitivity. A long `halflife` (or low `damping`) means the spring will only build up energy when driven at frequencies very close to its resonate frequency, and it will build up more energy too. While a shorter `halflife` means a broader range of frequencies that build up energy.

For a really cool application of this idea check out [this blog post](https://quazikb.github.io/WaveEq/index.html) by [Kevin Bergamin](https://quazikb.github.io/).

---

## Extrapolation

If we have an object moving at a velocity with damping applied we can use a damper to estimate a what the position might be at some time in the future.

The idea is to assume the velocity is being reduced over time via an exponential decay (i.e. via a damper):

\begin{align\*}
v\_t &= v\_0 \cdot e^{-y \cdot t} \\
\end{align\*}

Then, like in the controller example, we can then take the integral of this equation to work out the exact future position at some time \( t \):

\begin{align\*}
x\_t &= \int v\_0 \cdot e^{-y \cdot t} \, dt \\
x\_t &= \tfrac{v\_0}{y}\ (1 - e^{-y \cdot t}) + x\_0 \\
\end{align\*}

In code it looks something like this where `halflife` controls the decay rate of the velocity.

```C
void extrapolate(
    float& x,
    float& v,
    float dt,
    float halflife,
    float eps = 1e-5f)
{
    float y = 0.69314718056f / (halflife + eps);
    x = x + (v / (y + eps)) * (1.0f - fast_negexp(y * dt));
    v = v * fast_negexp(y * dt);
}
```

And here is a little demo showing it in action:

[

](/media/uploads/springs/extrapolation.m4v)

---

# Other Springs

## Double Spring

You'll notice that the spring damper has a kind of asymmetric look to it - the start is very steep and it quickly evens out. We can achieve more of an "S" shape to the spring by using another spring on the goal. We'll deem this the "double spring":

```C
void double_spring_damper_exact(
    float& x, 
    float& v, 
    float& xi,
    float& vi,
    float x_goal,
    float halflife, 
    float dt)
{
    simple_spring_damper_exact(xi, vi, x_goal, 0.5f * halflife, dt);
    simple_spring_damper_exact(x, v, xi, 0.5f * halflife, dt);
}
```

And here you can see it in action:

[

](/media/uploads/springs/double_spring.m4v)

In red you can see the intermediate spring `xi` while in blue you can see the "double spring" which has a slightly more "S" shaped start and end.

---

## Timed Spring

There is another nice property of critically damped springs we can use to our advantage. From the `halflife` we can compute the *lag* - the amount of time the spring will lag behind a target which is moving at a constant velocity:

```C
float halflife_to_lag(float halflife)
{
    return halflife / 0.69314718056f;
}

float lag_to_halflife(float lag)
{
    return lag * 0.69314718056f;
}
```

For example, in some cases we might not want the spring to reach the goal immediately but at some specific time in the future - yet we might still want to keep the smoothing and filtering properties the spring brings when the goal changes quickly. Here is a spring variant that takes as input a goal time as well as a goal position and tries to achieve the goal at approximately the correct time. The idea is to track a linear interpolation directly toward the goal but to do so at exactly the right amount time in the future to compensate for the lag.

```C
void timed_spring_damper_exact(
    float& x,
    float& v,
    float& xi,
    float x_goal,
    float t_goal,
    float halflife,
    float dt)
{
    float min_time = t_goal > dt ? t_goal : dt;
    
    float v_goal = (x_goal - xi) / min_time;
    
    float t_goal_future = halflife_to_lag(halflife);
    float x_goal_future = t_goal_future < t_goal ?
        xi + v_goal * t_goal_future : x_goal;
        
    simple_spring_damper_exact(x, v, x_goal_future, halflife, dt);
    
    xi += v_goal * dt;
}
```

Below we can see this spring in action, with the linear interpolation toward the goal shown in red.

[

](/media/uploads/springs/timed_spring.m4v)

---

## Velocity Spring

We can use a similar idea to make a spring that tries to maintain a given velocity by tracking an intermediate target that moves toward the goal at that fixed velocity. As before, we can compensate for the lag by tracking the target a little bit into the future.

```C
void velocity_spring_damper_exact(
    float& x,
    float& v,
    float& xi,
    float x_goal,
    float v_goal,
    float halflife,
    float dt)
{
    float x_diff = ((x_goal - xi) > 0.0f ? 1.0f : -1.0f) * v_goal;
    
    float t_goal_future = halflife_to_lag(halflife);
    float x_goal_future = fabs(x_goal - xi) > t_goal_future * v_goal ?
        xi + x_diff * t_goal_future : x_goal;
    
    simple_spring_damper_exact(x, v, x_goal_future, halflife, dt);
    
    xi = fabs(x_goal - xi) > dt * v_goal ? xi + x_diff * dt : x_goal; 
}
```

And here is how this one looks, with the intermediate target shown in red.

[

](/media/uploads/springs/velocity_spring.m4v)

---

## Quaternion Spring

The simplified code of the simple spring damper also lends itself to be easily adapted to other things such as quaternions. Here the main trick is to convert quaternion differences into [angular velocities](https://theorangeduck.com/page/exponential-map-angle-axis-angular-velocity) (first convert to angle axis then scale the axis by the angle) so that they can interact with the other terms such as the exponential terms and the spring velocity.

```C
void simple_spring_damper_exact_quat(
    quat& x, 
    vec3& v, 
    quat x_goal, 
    float halflife, 
    float dt)
{
    float y = halflife_to_damping(halflife) / 2.0f;	
	
    vec3 j0 = quat_to_scaled_angle_axis(quat_mul(x, quat_inv(x_goal)));
    vec3 j1 = v + j0*y;
	
    float eydt = fast_negexp(y*dt);

    x = quat_mul(quat_from_scaled_angle_axis(eydt*(j0 + j1*dt)), x_goal);
    v = eydt*(v - j1*y*dt);
}
```

One thing that is perhaps unintuitive about this derivation is the fact that we actually compute a rotation which takes the goal toward the initial state rather than the other way around (which is what we might expect).

It's a good exercise to try and do this same style of derivation for other spring variants and other quantities such as angles, but I'll leave that as an exercise for you...

---

## Scale Spring

In [this post](https://theorangeduck.com/page/scalar-velocity) I show how we can derive an equation for a spring that works on object scales.

---

## Tracking Spring

See [this article](https://theorangeduck.com/page/perfect-tracking-springs) for a spring which can be used to perfectly track animation data while still removing discontinuities.

---

# ConclusionSource Code

The source code for all the demos shown in this article can be found [here](https://github.com/orangeduck/Spring-It-On). They use [raylib](https://www.raylib.com/) and more specifically [raygui](https://github.com/raysan5/raygui) but once you have both of those installed you should be ready to roll.

---

## Conclusion

I hope this article has piqued your interest in springs. Don't hesitate to get in contact if you come up with any other interesting derivations, applications, or spring variations. I'd be more than happy to add them to this article for others to see. Other than that there is not much more to say - happy exploring!
