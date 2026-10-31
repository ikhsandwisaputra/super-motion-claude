---
source: https://rive.app/docs/runtimes/react/caching-a-rive-file
title: "Caching a Rive File"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Caching a Rive File

Under most circumstances a `.riv` file should load quickly and managing the `RiveFile` yourself is not necessary. But if you intend to use the same `.riv` file in multiple parts of your application, or even on the same screen, it might be advantageous to load the file once and keep it in memory.

## Example usage

Here’s a simplified example showing how to integrate the `useRiveFile` hook to reuse a `RiveFile` across components:

```javascript theme={null}
import React, { useState } from 'react';
import { useRiveFile } from '@rive-app/react-canvas';

// Custom Wrapper component to display the Rive animation
const RiveAnimation = ({ riveFile }) => {
    const { RiveComponent } = useRive({
        riveFile: riveFile,
        autoplay: true
    });

    return <RiveComponent/>;
};

function App() {
const { riveFile, status } = useRiveFile({
    src: 'https://cdn.rive.app/animations/myrivefile.riv',
});

const [instanceCount] = useState(5); // Number of RiveAnimation components to render

if (status === 'idle') {
    return <div>Idle...</div>;
}

if (status === 'loading') {
    return <div>Loading...</div>;
}

if (status === 'failed') {
    return <div>Failed to load Rive file.</div>;
}

// Each RiveAnimation component uses the RiveFile we loaded earlier, so it is only fetched and initialized once
return (
    <div className="App">
        <header className="App-header">Rive Instances</header>
        <div className="rive-list">
        {Array.from({ length: instanceCount }, (_, index) => (
            <RiveAnimation key={`rive-instance-${index}`} riveFile={riveFile} />
        ))}
        </div>
    </div>
    );

}

export default App;
```

> [!NOTE]
>
> A file from `useRiveFile` created with `enableGPUCanvas: true` can't be shared across components the way this example shares one —
> GPU Canvas binds a file to a single `<canvas>`, so the first Rive component claims it. Call `useRiveFile` inside each component
> instead of reusing one file across multiple components. While sharing a file won't fail; the runtime prints a warning and re-imports
> the file for each additional Rive instance, which means the file you passed in goes unused. See [GPU Canvas](/docs/runtimes/react/gpu-canvas).
