---
source: https://swup.js.org/plugins/a11y-plugin
title: "Accessibility Plugin — swup"
fetched: 2026-10-28
---

[v5.2.1](https://github.com/swup/a11y-plugin/)

# Accessibility Plugin

A [swup](https://swup.js.org) plugin for enhanced accessibility.

Loading new content via AJAX is a great experience for most users, but comes with serious
shortcomings for screen reader users. This plugin will improve that:

* **Announce page visits** to screenreaders by reading the new page title
* **Restore focus** after swapping out the content
* **Skip animations** for users with a preference for reduced motion

Accessibility can be hard to get right. That's why we're keen to hear your feedback. Share your
experience and suggest improvements by [opening an issue](https://github.com/swup/a11y-plugin/issues/new/choose)
on this repo. Let's make swup better together!

## [Installation](https://swup.js.org/plugins/a11y-plugin/#installation)

Install the plugin from npm and import it into your bundle.

```
npm install @swup/a11y-plugin
```

```
npm install @swup/a11y-plugin
```

```
import SwupA11yPlugin from '@swup/a11y-plugin';
```

```
import SwupA11yPlugin from '@swup/a11y-plugin';
```

Or include the minified production file from a CDN:

```
<script src="https://unpkg.com/@swup/a11y-plugin@5"></script>
```

```
<script src="https://unpkg.com/@swup/a11y-plugin@5"></script>
```

## [Usage](https://swup.js.org/plugins/a11y-plugin/#usage)

To run this plugin, include an instance in the swup options.

```
const swup = new Swup({
  plugins: [new SwupA11yPlugin()]
});
```

```
const swup = new Swup({
  plugins: [new SwupA11yPlugin()]
});
```

## [Markup](https://swup.js.org/plugins/a11y-plugin/#markup)

The plugin should work out of the box if you use proper semantic markup for your content, i.e. a
descriptive `h1` for each page heading. See the options below for customizing what tags to look for.

```
<body> <!-- will be focused -->
  <header>
    Logo
  </header>
  <main>
    <h1>Page Title</h1> <!-- will be announced -->
    <p>Lorem ipsum dolor sit amet</p>
  </main>
</body>
```

```
<body> <!-- will be focused -->
  <header>
    Logo
  </header>
  <main>
    <h1>Page Title</h1> <!-- will be announced -->
    <p>Lorem ipsum dolor sit amet</p>
  </main>
</body>
```

## [Announcements](https://swup.js.org/plugins/a11y-plugin/#announcements)

The plugin will announce the new page to screen readers after navigating to it. It will look for the
following and announce the first one found:

* Heading label: `<h1 aria-label="About"></h1>`
* Heading content: `<h1>About</h1>`
* Document title: `<title>About</title>`
* Page URL: `/about/`

The easiest way to announce a page title differing from the main heading is using `aria-label`. The
example below will be announced as `Homepage`.

```
<h1 aria-label="Homepage">Project Title</h1>
```

```
<h1 aria-label="Homepage">Project Title</h1>
```

## [Focus](https://swup.js.org/plugins/a11y-plugin/#focus)

On page navigation, the plugin will reset focus to the body, imitating default browser behavior.
When clicking anchor links on the same page, the plugin will focus the target of the link.

## [Styling](https://swup.js.org/plugins/a11y-plugin/#styling)

Browsers will display a visible outline around elements focused by this plugin. That's great for
orientation of keyboard users, but tends to be annoying for mouse users. We can make both groups of
users happy by using a combination of the `:focus` and `:focus-visible` pseudo-class to hide any
focus outlines while the site is being used with a mouse:

```
:focus:not(:focus-visible) {
  outline: none;
}
```

```
:focus:not(:focus-visible) {
  outline: none;
}
```

See these guides on [Controlling focus](https://web.dev/control-focus-with-tabindex/)
and [Styling focus](https://web.dev/style-focus/) for details and more examples.

## [Options](https://swup.js.org/plugins/a11y-plugin/#options)

All options with their default values:

```
{
  headingSelector: ['main h1', 'h1'],
  respectReducedMotion: true,
  autofocus: false,
  announcements: {
    visit: 'Navigated to: {title}',
    url: 'New page at {url}'
  }
}
```

```
{
  headingSelector: ['main h1', 'h1'],
  respectReducedMotion: true,
  autofocus: false,
  announcements: {
    visit: 'Navigated to: {title}',
    url: 'New page at {url}'
  }
}
```

### [headingSelector](https://swup.js.org/plugins/a11y-plugin/#headingselector)

The selector for finding page headings. The content of the first found heading will be read to
screenreaders after a new page was loaded. The default selector uses an array to prioritize
headings inside the `main` element.

### [respectReducedMotion](https://swup.js.org/plugins/a11y-plugin/#respectreducedmotion)

Whether to respects users' preference for reduced motion.

Disable animated page transitions and animated scrolling if a user has enabled a
setting on their device to minimize the amount of non-essential motion. Learn more about
[prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion).

### [autofocus](https://swup.js.org/plugins/a11y-plugin/#autofocus)

Whether to focus elements with an `autofocus` attribute after navigation.

### [announcements](https://swup.js.org/plugins/a11y-plugin/#announcements-1)

How the new page is announced. A visit is announced differently depending on whether the new page
has a title or not. If found, the main heading or document title is announced. If neither is found,
the new url will be announced instead:

* **Title found?** Read `announcements.visit`, replacing `{title}` with the new title
* **No title?** Read `announcements.visit` too, but replacing `{title}` with the content of `announcements.url`

```
{
  announcements: {
    visit: 'Navigated to: {title}',
    url: 'New page at {url}'
  }
}
```

```
{
  announcements: {
    visit: 'Navigated to: {title}',
    url: 'New page at {url}'
  }
}
```

#### [Translations](https://swup.js.org/plugins/a11y-plugin/#translations)

For multi-language sites, pass in a nested object keyed by locale. The locale must match the
`html` element's [lang](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/lang) attribute
exactly. Use an asterisk `*` to declare fallback translations.

```
{
  announcements: {
    'en-US': {
      visit: 'Navigated to: {title}',
      url: 'New page at {url}'
    },
    'de-DE': {
      visit: 'Navigiert zu: {title}',
      url: 'Neue Seite unter {url}'
    },
    'fr-FR': {
      visit: 'Navigué vers : {title}',
      url: 'Nouvelle page à {url}'
    },
    '*': {
      visit: '{title}',
      url: '{url}'
    }
  }
}
```

```
{
  announcements: {
    'en-US': {
      visit: 'Navigated to: {title}',
      url: 'New page at {url}'
    },
    'de-DE': {
      visit: 'Navigiert zu: {title}',
      url: 'Neue Seite unter {url}'
    },
    'fr-FR': {
      visit: 'Navigué vers : {title}',
      url: 'Nouvelle page à {url}'
    },
    '*': {
      visit: '{title}',
      url: '{url}'
    }
  }
}
```

## [Visit object](https://swup.js.org/plugins/a11y-plugin/#visit-object)

The plugin extends the visit object with a new `a11y` key that can be used to customize the
behavior on the fly.

```
{
  from: { ... },
  to: { ... },
  a11y: {
    announce: 'Navigated to: About',
    focus: {
      selector: 'body',
      wait: true
    }
  }
}
```

```
{
  from: { ... },
  to: { ... },
  a11y: {
    announce: 'Navigated to: About',
    focus: {
      selector: 'body',
      wait: true
    }
  }
}
```

### [visit.a11y.announce](https://swup.js.org/plugins/a11y-plugin/#visit-a11y-announce)

Type: `string` | `false` | `undefined`

The text to announce after the new page was loaded. This is the final text after choosing the
correct language from the [announcements](https://swup.js.org/plugins/a11y-plugin/#announcements) option and filling in any placeholders.
Modify it to read a custom announcement.

Since the text can only be populated once the new page was fetched and its contents are available, the only place to inspect or modify this would be right before the `content:announce` hook.

```
swup.hooks.before('content:announce', (visit) => {
  visit.a11y.announce = 'New page loaded';
});
```

```
swup.hooks.before('content:announce', (visit) => {
  visit.a11y.announce = 'New page loaded';
});
```

### [visit.a11y.focus](https://swup.js.org/plugins/a11y-plugin/#visit-a11y-focus)

Type: `Object` | `string` | `false`, Default: `Object`

Customize which element to focus after the new page has loaded, and when. Defaults moving the focus to the `<body>` on `visit:end`:

```
swup.hooks.on('visit:start', (visit) => {
  if (someCondition()) {
    visit.a11y.focus = {
      /** focus <main> instead of <body> */
      selector: 'main',
      /** apply focus immeditely after 'content:replace' instead of waiting until 'visit:end' */
      wait: false
    };
  }
});
```

```
swup.hooks.on('visit:start', (visit) => {
  if (someCondition()) {
    visit.a11y.focus = {
      /** focus <main> instead of <body> */
      selector: 'main',
      /** apply focus immeditely after 'content:replace' instead of waiting until 'visit:end' */
      wait: false
    };
  }
});
```

Set `visit.focus = false` to completely disable focus handling.

## [Hooks](https://swup.js.org/plugins/a11y-plugin/#hooks)

The plugin adds two new hooks: `content:announce` and `content:focus`. Both run directly
after the internal `content:replace` handler, when the new content is already in the DOM.

### [content:announce](https://swup.js.org/plugins/a11y-plugin/#content-announce)

Executes the announcement of the new page title.

```
swup.hooks.on('content:announce', () => console.log('New content was announced'));
```

```
swup.hooks.on('content:announce', () => console.log('New content was announced'));
```

### [content:focus](https://swup.js.org/plugins/a11y-plugin/#content-focus)

Executes the focussing of the new page.

```
swup.hooks.on('content:focus', () => console.log('New content received focus'));
```

```
swup.hooks.on('content:focus', () => console.log('New content received focus'));
```

## [Methods on the swup instance](https://swup.js.org/plugins/a11y-plugin/#methods-on-the-swup-instance)

The plugin adds the following method to the swup instance:

### [announce](https://swup.js.org/plugins/a11y-plugin/#announce)

Announce something programmatically. Use this if you are making use of
[`options.resolveUrl`](https://swup.js.org/options/#resolve-url) and still want
state changes to be announced.

```
swup.announce?.(`Filtered by ${myFilterString}`);
```

```
swup.announce?.(`Filtered by ${myFilterString}`);
```
