---
source: https://swup.js.org/plugins/create-plugin
title: "Create a plugin 🎉 — swup"
fetched: 2026-10-28
---

# Create a plugin 🎉

Anyone can create and publish swup plugins. To create a new plugin, install the [swup CLI](https://swup.js.org/cli/)
and let it create one from a template. Or head over directly to the
[plugin template repo](https://github.com/swup/plugin-template) and follow the instructions there.

## [Tips](https://swup.js.org/plugins/create-plugin/#tips)

* Check out existing plugins before creating one. Maybe the desired functionality can be integrated into an existing plugin?
* If you think your new plugin should be an official swup plugin and live under the `@swup/*` npm namespace, get in touch at [gmarcuk@gmail.com](mailto:gmarcuk@gmail.com).

## [Developing plugins](https://swup.js.org/plugins/create-plugin/#developing-plugins)

### [Accessing swup](https://swup.js.org/plugins/create-plugin/#accessing-swup)

The swup instance is automatically assigned to the plugin instance and can be accessed as
`this.swup` in the `mount` and `unmount` methods.

### [Cleaning up](https://swup.js.org/plugins/create-plugin/#cleaning-up)

Plugins need to clean up after themselves in the `umount` method: cancel any event listeners, undo
any DOM changes, etc.

### [Logging](https://swup.js.org/plugins/create-plugin/#logging)

Use swup's `log` method to output any relevant information. By default this method doesn't do
anything. It will starting outputting information only if installed alongside the
[debug plugin](https://swup.js.org/plugins/debug-plugin/).

### [Replacing swup hooks](https://swup.js.org/plugins/create-plugin/#replacing-swup-hooks)

You might want to react to certain lifecycle hooks by replacing swup's internal handler completely.
The default handler is passed to the callback as the third parameter, should you decide to let
swup handle this hook based on some condition.

```
this.swup.hooks.replace('animation:await', (visit, args, defaultHandler) => {
  if (someCondition) {
    // Detect animation timing ourselves
  } else {
    // Let swup handle animation timing
    return defaultHandler(visit, args);
  }
});
```

```
this.swup.hooks.replace('animation:await', (visit, args, defaultHandler) => {
  if (someCondition) {
    // Detect animation timing ourselves
  } else {
    // Let swup handle animation timing
    return defaultHandler(visit, args);
  }
});
```

### [Custom hooks](https://swup.js.org/plugins/create-plugin/#custom-hooks)

You might need to create your own new hooks to implement additional functionality.

Create a new hook in `mount`:

```
this.swup.hooks.create('form:submit');
```

```
this.swup.hooks.create('form:submit');
```

Call the hook whenever makes sense:

```
this.swup.hooks.call('form:submit');
```

```
this.swup.hooks.call('form:submit');
```

Pass in arguments to hand them along to any registered handlers.

```
this.swup.hooks.call('form:submit', { formData: 123 });
```

```
this.swup.hooks.call('form:submit', { formData: 123 });
```

### [Making custom hooks replaceable](https://swup.js.org/plugins/create-plugin/#making-custom-hooks-replaceable)

Passing in a default handler when calling a hook will allow users of your plugin
to replace this default handler with a custom implementation. This is an advanced pattern to avoid
monkeypatching instance methods.

In the example below, the default form handler uses `fetch` to submit the form.

```
const args = { action: url, data: new FormData() };
this.swup.hooks.call('form:submit', args, (visit, { action, data }) => {
  return fetch(action, { body: data }).then(/* */);
});
```

```
const args = { action: url, data: new FormData() };
this.swup.hooks.call('form:submit', args, (visit, { action, data }) => {
  return fetch(action, { body: data }).then(/* */);
});
```

Consumers can now replace the default handler with a custom handler. In this example, they are
using axios to submit the form instead.

```
swup.hooks.replace('form:submit', (visit, { action, data }) => {
  return axios.get(action, { params: data }).then(/* */);
});
```

```
swup.hooks.replace('form:submit', (visit, { action, data }) => {
  return axios.get(action, { params: data }).then(/* */);
});
```
