---
source: https://www.react-spring.dev/docs/components
title: "react-spring"
fetched: 2026-10-28
---

# [Component APIs](https://www.react-spring.dev/docs/components#component-apis)

## [Hooks vs Components](https://www.react-spring.dev/docs/components#hooks-vs-components)

As with all our APIs we have a component and hook version. We personally
recommend using the hook version as it is more inline with react's vision
of the future of react. However, we understand there are codebases out there
that still use class components and we want to support those too.

The typical format for importing the component version is to remove the `use` part of the name, e.g.

```jsx
import { useSpring } from '@react-spring/web'

// becomes

import { Spring } from '@react-spring/web'
```

All the props remain the same. It's just a light wrapper and uses a `render props` method:

```jsx
import { Spring } from '@react-spring/web'

const MyComponent = () => {

return (

<Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>

{style => <animated.div style={style} />}

</Spring>

)

}
```
