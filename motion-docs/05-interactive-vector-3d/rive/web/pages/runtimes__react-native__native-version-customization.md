---
source: https://rive.app/docs/runtimes/react-native/native-version-customization
title: "Native SDK Version Customization"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Native SDK Version Customization

How to override the underlying iOS or Android Rive Native SDK version used by Rive React Native

> [!WARNING]
>
> **⚠️ Advanced Configuration**
> This section is for advanced users who need to use specific versions of the Rive native SDKs. In most cases, you should use the default versions that come with the library. Only customize these versions if you have a specific requirement and understand the potential compatibility implications.
>
> **Important:** If you customize the native SDK versions and later update Rive React Native to a newer version, you should revisit your custom version settings. The custom versions you specified may not be compatible with the updated Rive React Native version. Always check the default versions in the new release and test thoroughly.

### Default behavior

By default, Rive React Native uses the native SDK versions specified in its `package.json`. For example, `@rive-app/react-native` `0.5.5` uses:

```json theme={null}
"runtimeVersions": {
  "ios": "6.28.1",
  "android": "11.12.1"
}
```

These versions are tested and known to work well with that version of Rive React Native. Check the [release notes](https://github.com/rive-app/rive-nitro-react-native/releases) for the versions used by each release.

### Customizing versions

You can override these default versions using platform-specific configuration files.

See the available native Rive [Android](https://github.com/rive-app/rive-android/releases) and [iOS](https://github.com/rive-app/rive-ios/releases) versions.

> [!NOTE]
>
> Some features need a minimum native SDK version. For example, [GPU Canvas](/docs/runtimes/react-native/gpu-canvas) requires Rive iOS `6.25.0` and Rive Android `11.12.0` or later.

#### iOS (vanilla React Native)

Create or edit `ios/Podfile.properties.json`:

```json theme={null}
{
  "RiveRuntimeIOSVersion": "6.24.0"
}
```

Then run:

```bash theme={null}
cd ios && pod install
```

#### Android (vanilla React Native)

Add to `android/gradle.properties`:

```properties theme={null}
Rive_RiveRuntimeAndroidVersion=11.9.2
```

#### Expo projects

For Expo projects, use an inline config plugin in your `app.config.ts`:

```typescript theme={null}
import { ExpoConfig, ConfigContext } from "expo/config";
import {
  withPodfileProperties,
  withGradleProperties,
} from "@expo/config-plugins";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  plugins: [
    (config) => {
      config = withPodfileProperties(config, (config) => {
        config.modResults["RiveRuntimeIOSVersion"] = "6.24.0";
        return config;
      });

      config = withGradleProperties(config, (config) => {
        config.modResults.push({
          type: "property",
          key: "Rive_RiveRuntimeAndroidVersion",
          value: "11.9.2",
        });
        return config;
      });

      return config;
    },
  ],
});
```

### Version resolution priority

The library resolves versions in the following order:

**iOS:**

1. `RIVE_RUNTIME_IOS_VERSION` environment variable when running `pod install`
2. `$RiveRuntimeIOSVersion` global in your `Podfile`
3. `ios/Podfile.properties.json` → `RiveRuntimeIOSVersion`
4. `package.json` → `runtimeVersions.ios` (default)

**Android:**

1. `RiveRuntimeAndroidVersion` in your root project's `ext` block (`android/build.gradle`)
2. `android/gradle.properties` → `Rive_RiveRuntimeAndroidVersion`
3. `package.json` → `runtimeVersions.android` (default)
