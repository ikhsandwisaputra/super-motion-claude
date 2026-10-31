---
source: https://swup.js.org/plugins/forms-plugin
title: "Forms Plugin — swup"
fetched: 2026-10-28
---

[v3.6.0](https://github.com/swup/forms-plugin)

# Forms Plugin

A [swup](https://swup.js.org) plugin for submitting forms.

* Serialize and submit forms with animated page transitions
* Opt-in with a configurable selector, by default `form[data-swup-form]`
* Respects custom animations set on the form element

**Note:** This plugin is meant for simple scenarios like search or
contact forms. For complex requirements like custom
serialization, it is recommended to use the swup API directly.

## [Installation](https://swup.js.org/plugins/forms-plugin/#installation)

Install the plugin from npm and import it into your bundle.

```
npm install @swup/forms-plugin
```

```
npm install @swup/forms-plugin
```

```
import SwupFormsPlugin from '@swup/forms-plugin';
```

```
import SwupFormsPlugin from '@swup/forms-plugin';
```

Or include the minified production file from a CDN:

```
<script src="https://unpkg.com/@swup/forms-plugin@3"></script>
```

```
<script src="https://unpkg.com/@swup/forms-plugin@3"></script>
```

## [Usage](https://swup.js.org/plugins/forms-plugin/#usage)

To run this plugin, include an instance in the swup options.

```
const swup = new Swup({
  plugins: [new SwupFormsPlugin()]
});
```

```
const swup = new Swup({
  plugins: [new SwupFormsPlugin()]
});
```

## [Server response](https://swup.js.org/plugins/forms-plugin/#server-response)

The server response must be a valid page with all containers to be replaced by swup.

## [Form attributes](https://swup.js.org/plugins/forms-plugin/#form-attributes)

Action, method and encoding type attributes set on the form are respected.

[Externally associated inputs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#form) are
supported. Inputs and submit buttons that live outside the form but reference it via `form="form-id"` are
included in the submission.

Submitter overrides are supported. If the submitter is a button, its `formaction`, `formmethod`, `formenctype`
and `formtarget` attributes override the form's corresponding attributes, matching native browser behavior.

```
<!-- The form itself, handled by swup -->
<form id="search" action="/search" data-swup-form></form>

<!-- External input associated with the form above -->
<input name="q" form="search" />

<!-- External submitter associated with the form above, overriding the form action -->
<button type="submit" form="search" formaction="/search/advanced">Search</button>
```

```
<!-- The form itself, handled by swup -->
<form id="search" action="/search" data-swup-form></form>

<!-- External input associated with the form above -->
<input name="q" form="search" />

<!-- External submitter associated with the form above, overriding the form action -->
<button type="submit" form="search" formaction="/search/advanced">Search</button>
```

## [Custom animations](https://swup.js.org/plugins/forms-plugin/#custom-animations)

The plugin respects custom animations set on the form using the `data-swup-animation` attribute:

```
<!-- Animate with an 'overlay' custom animation -->
<form action="/" data-swup-form data-swup-animation="overlay"></form>
```

```
<!-- Animate with an 'overlay' custom animation -->
<form action="/" data-swup-form data-swup-animation="overlay"></form>
```

## [Inline Forms](https://swup.js.org/plugins/forms-plugin/#inline-forms)

If you give a form an additional attribute `[data-swup-inline-form]`, swup will:

* update only that form when being submitted, ignoring the default `containers`.
* scroll back to the beginning of the form
* scope animations to the form itself

### [Example](https://swup.js.org/plugins/forms-plugin/#example)

**HTML**

```
<form id="form-1" class="transition-form" data-swup-form data-swup-inline-form method="POST">
  <input name="test"></input> <input type="submit"></input>
</form>
```

```
<form id="form-1" class="transition-form" data-swup-form data-swup-inline-form method="POST">
  <input name="test"></input> <input type="submit"></input>
</form>
```

**CSS**

```
.transition-form.is-changing {
  transition: opacity 200ms;
}
.transition-form.is-animating {
  opacity: 0;
}
```

```
.transition-form.is-changing {
  transition: opacity 200ms;
}
.transition-form.is-animating {
  opacity: 0;
}
```

## [Options](https://swup.js.org/plugins/forms-plugin/#options)

### [`formSelector`](https://swup.js.org/plugins/forms-plugin/#formselector)

Type: `String`, Default: `form[data-swup-form]`

Customize the selector for forms which should be handled by swup.

### [`inlineFormSelector`](https://swup.js.org/plugins/forms-plugin/#inlineformselector)

Type: `String`, Default: `form[data-swup-inline-form]`

Customize the selector for [inline forms](https://swup.js.org/plugins/forms-plugin/#inline-forms)

### [`stripEmptyParams`](https://swup.js.org/plugins/forms-plugin/#stripemptyparams)

Type: `Boolean`, Default: `false`

Strip empty parameters from forms with `action="GET"` before submitting.

* Before: `?foo=&bar=baz&bat=`
* After: `?bar=baz`

## [Hooks](https://swup.js.org/plugins/forms-plugin/#hooks)

The plugin adds two new hooks to swup.

### [`form:submit`](https://swup.js.org/plugins/forms-plugin/#form-submit)

Triggered when a form is submitted.

```
swup.hooks.on('form:submit', (visit, { el, event }) => {
  console.log(el);
});
```

```
swup.hooks.on('form:submit', (visit, { el, event }) => {
  console.log(el);
});
```

### [`form:submit:newtab`](https://swup.js.org/plugins/forms-plugin/#form-submit-newtab)

Triggered when a form is submitted to a new tab or window. This will happen if the user
has pressed either the `Command` (Mac), `Control` (Windows) or `Shift` key while submitting
the form. The plugin normalizes that behavior across browsers.
