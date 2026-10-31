---
source: https://tympanus.net/codrops/2020/06/17/making-stagger-reveal-animations-for-text/
title: "Making Stagger Reveal Animations for Text | Codrops"
fetched: 2026-10-28
---

By [Manoela Ilic](https://tympanus.net/codrops/author/crnacura/ "Posts by Manoela Ilic")
in
[Tutorials](https://tympanus.net/codrops/category/tutorials/) on
June 17, 2020

# Making Stagger Reveal Animations for Text

A short tutorial on how to recreate a letter stagger animation with GSAP and Splitting.js.

[GSAP](https://tympanus.net/codrops/tag/gsap/) [page transition](https://tympanus.net/codrops/tag/page-transition/) [typography](https://tympanus.net/codrops/tag/typography/)

[![](https://tympanus.net/codrops/wp-content/uploads/2020/06/TypographyMotion_featured.jpg?x95600)](http://tympanus.net/Tutorials/TypographyMotion/ "Making Stagger Reveal Animations for Text Demo")

[Demo](http://tympanus.net/Tutorials/TypographyMotion/)
[Code](https://github.com/codrops/TypographyMotion/)

[Thibaud Allie](https://dribbble.com/thibaudallie) made [this](https://dribbble.com/shots/11133412-Transitions-Fashion-stylist-Project) wonderful animation which you can see live on the site of [Dani Morales](http://www.danimorales-style.com/). It happens when you click on “About” (and then “Close”). This kind of show/hide animation on the typographic elements is being used in many designs lately. At Codrops we call it a “reveal” animation.

I fell in love with that lettering effect and wanted to reimplement it using [GSAP](https://greensock.com/gsap/) and [Splitting.js](https://splitting.js.org/). So I made a similar typography based layout and move the lines of text by staggering the letter animations.

The simplified markup looks like this:

```
<section class="content__item content__item--home content__item--current">
	<p class="content__paragraph" data-splitting>Something</p>
	<p class="content__paragraph" data-splitting>More</p>
	...
</section>
<section class="content__item content__item--about">
	<p class="content__paragraph" data-splitting>Something</p>
	<p class="content__paragraph" data-splitting>Else</p>
	...
</section>
```

Note that the necessary style for the **content\_\_paragraph** element is `overflow: hidden` so that the reveal/unreveal animation works.

All elements with the “data-splitting” attribute will be split up into spans that we can then animate individually. So let’s have a look at the JavaScript for that.

Initially, we need to import some libraries and styles:

```
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import Splitting from "splitting";
import { gsap } from 'gsap';
import { preloadFonts } from './utils';
import Cursor from "./cursor";
```

I’m using some Adobe Fonts here ([Freight Big Pro](https://freightcollection.com/) and [Tenon](https://fonts.adobe.com/fonts/tenon)) so let’s preload them:

```
preloadFonts('lwc3axy').then(() => document.body.classList.remove('loading'));
```

Then it’s time to split all the texts into spans:

```
Splitting();
```

The design has a [custom cursor](https://tympanus.net/codrops/2020/03/24/animated-custom-cursor-effects/) that we call as follows:

```
new Cursor(document.querySelector('.cursor'))
```

*Tiny break:* Want to get website inspiration? **[Check out our Webzibition](https://tympanus.net/codrops/news/) and see whats trending.**

Let’s get all relevant DOM elements:

```
let DOM = {
    content: {
        home: {
            section: document.querySelector('.content__item--home'),
            get chars() {
                return this.section.querySelectorAll('.content__paragraph .word > .char, .whitespace');
            },
            isVisible: true
        },
        about: {
            section: document.querySelector('.content__item--about'),
            get chars() {
                return this.section.querySelectorAll('.content__paragraph .word > .char, .whitespace')
            },
            get picture() {
                return this.section.querySelector('.content__figure');
            },
            isVisible: false
        }
    },
    links: {
        about: {
            anchor: document.querySelector('a.frame__about'),
            get stateElement() {
                return this.anchor.children;
            }
        },
        home: document.querySelector('a.frame__home')
    }
};
```

Let’s have a look at the GSAP timeline now where all the magic happens (and also some default settings):

```
const timelineSettings = {
    staggerValue: 0.014,
    charsDuration: 0.5
};
const timeline = gsap.timeline({paused: true})
    .addLabel('start')
    // Stagger the animation of the home section chars
    .staggerTo( DOM.content.home.chars, timelineSettings.charsDuration, {
        ease: 'Power3.easeIn',
        y: '-100%',
        opacity: 0
    }, timelineSettings.staggerValue, 'start')
    // Here we do the switch
    // We need to toggle the current class for the content sections
    .addLabel('switchtime')
    .add( () => {
        DOM.content.home.section.classList.toggle('content__item--current');
        DOM.content.about.section.classList.toggle('content__item--current');
    })
    // Change the body's background color
    .to(document.body, {
        duration: 0.8,
        ease: 'Power1.easeInOut',
        backgroundColor: '#c3b996'
    }, 'switchtime-=timelineSettings.charsDuration/4')
    // Start values for the about section elements that will animate in
    .set(DOM.content.about.chars, {
        y: '100%'
    }, 'switchtime')
    .set(DOM.content.about.picture, {
        y: '40%',
        rotation: -4,
        opacity: 0
    }, 'switchtime')
    // Stagger the animation of the about section chars
    .staggerTo( DOM.content.about.chars, timelineSettings.charsDuration, {
        ease: 'Power3.easeOut',
        y: '0%'
    }, timelineSettings.staggerValue, 'switchtime')
    // Finally, animate the picture in
    .to( DOM.content.about.picture, 0.8, {
        ease: 'Power3.easeOut',
        y: '0%',
        opacity: 1,
        rotation: 0
    }, 'switchtime+=0.6');
```

When we click on the “About” or logo/home link we want to toggle the current content by playing and reversing the timeline. We also want to toggle the current state of the “About” and “Close” link:

```
const switchContent = () => {
    DOM.links.about.stateElement[0].classList[DOM.content.about.isVisible ? 'add' : 'remove']('frame__about-item--current');
    DOM.links.about.stateElement[1].classList[DOM.content.about.isVisible ? 'remove' : 'add']('frame__about-item--current');
    timeline[DOM.content.about.isVisible ? 'reverse' : 'play']();
    DOM.content.about.isVisible = !DOM.content.about.isVisible;
    DOM.content.home.isVisible = !DOM.content.about.isVisible;
};

DOM.links.about.anchor.addEventListener('click', () => switchContent());
DOM.links.home.addEventListener('click', () => {
    if ( DOM.content.home.isVisible ) return;
    switchContent();
});
```

And that’s all the magic! It’s not too complicated and you can do many nice effects with this kind of letter animation.

[](https://tympanus.net/codrops/wp-content/uploads/2020/06/TypographyMotion_opt.mp4)

Thank you for reading and hopefully this was relevant and helpful 🙂

Please reach out to me [@codrops](https://twitter.com/codrops) or [@crnacura](https://twitter.com/crnacura) if you have any questions or suggestions.

## Credits

* Recreation of the animation seen on [Dani Morales](http://www.danimorales-style.com/) designed by [Thibaud Allie](https://dribbble.com/thibaudallie)
* Image by [Silviu Beniamin Tofan](https://unsplash.com/@tofansilviuben) from [Unsplash.com](https://unsplash.com/)
* [Splitting.js](https://splitting.js.org/) by Steven Shaw
* [GSAP](https://greensock.com/gsap/) by GreenSock
