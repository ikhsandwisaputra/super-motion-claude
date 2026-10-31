---
source: https://motion.dev/docs/react-motion-ui-installation
title: "Install Motion UI"
fetched: 2026-10-28
---

# Install Motion UI

Install Motion UI in your React project from the private registry, keeping your token out of source control.

Motion UI is served through Motion's private registry.

You need a [Motion+ membership](https://motion.dev/plus) to get an access token for the registry at `api.motion.dev`. Your access token is a secret: it never belongs in `package.json`, lockfiles, or anything else you commit. The setup below keeps it in an environment variable instead.

You can find your token on your [Motion+ tokens page](https://motion.dev/dashboard/tokens).

## Quick start (npm, pnpm, Bun)

**1. Create (or update) `.npmrc` in your project root:**

```ini
@motionplus:registry=https://api.motion.dev/npm/
//api.motion.dev/npm/:_authToken=${MOTION_TOKEN}
```

This file is safe to commit: it references an environment variable, not the token itself.

**2. Add the dependency to `package.json`:**

```json
{
  "dependencies": {
    "motion-plus": "npm:@motionplus/core@^2.12.0"
  }
}
```

This installs the scoped package `@motionplus/core` under the name `motion-plus`, so imports work exactly as documented:

```tsx
import { Cursor } from "motion-plus/react"
```

If you prefer, you can depend on `@motionplus/core` directly and import from `@motionplus/core/react` instead.

**3. Provide the token and install:**

```bash
export MOTION_TOKEN=your-token-here
npm install   # or pnpm install / bun install
```

Semver ranges work like any npm package: `^2.12.0`, `2.12.0`, `latest`.

## Where to put the token

Your package manager reads `${MOTION_TOKEN}` from the **process environment** at install time. How you set it depends on your tooling:

- **Bun** loads `.env` files automatically. Add `MOTION_TOKEN=...` to `.env` (and `.env` to `.gitignore`) and you're done.
- **npm and pnpm** do *not* read `.env` files. Export the variable in your shell, use [direnv](https://direnv.net), or prefix installs with [dotenv-cli](https://www.npmjs.com/package/dotenv-cli): `npx dotenv-cli -- npm install`.

**Note:**
npm exits with `Failed to replace env in config` on every command while `MOTION_TOKEN` is unset, including commands that don't touch the network. Everyone on your team (and CI) needs it set.

## Yarn

**Yarn 1 (Classic)** ignores the scoped-registry line in `.npmrc`, so add a `.yarnrc` alongside it:

```ini
"@motionplus:registry" "https://api.motion.dev/npm/"
```

Keep the `.npmrc` from the quick start: Yarn 1 reads the auth token from it. Then set `MOTION_TOKEN` in your shell and `yarn install`.

**Yarn 2+ (Berry)** uses `.yarnrc.yml` instead of `.npmrc`:

```yaml
npmScopes:
  motionplus:
    npmRegistryServer: "https://api.motion.dev/npm"
    npmAuthToken: "${MOTION_TOKEN}"
```

## CI

Add `MOTION_TOKEN` as a secret in your CI provider and expose it as an environment variable. For example, in GitHub Actions:

```yaml
- run: npm ci
  env:
    MOTION_TOKEN: ${{ secrets.MOTION_TOKEN }}
```

The same applies to deploy platforms that run your install step (Vercel, Netlify, etc.): add `MOTION_TOKEN` to their environment variable settings.

## Migrating from the URL-based install

If you previously installed Motion UI via `https://api.motion.dev/registry.tgz?...`:

1. Replace the dependency in `package.json` with the alias form from the quick start. Your imports don't change.
2. Add the `.npmrc` (and `.yarnrc` or `.yarnrc.yml` if you use Yarn).
3. Delete your lockfile entry for `motion-plus` (or simply reinstall) so it re-resolves against the registry.
4. **If your token was ever committed** (in `package.json`, a lockfile, or a URL), treat it as compromised: regenerate it from your account page.

The old endpoint keeps working, so you can migrate whenever suits you.

## Troubleshooting

- **`401 Unauthorized`.** `MOTION_TOKEN` is empty or invalid at install time. Remember npm and pnpm don't read `.env` files; check the variable is actually exported in the environment running the install. Regenerate the token from your account page if needed.
- **`401` under pnpm with a warning that it "Ignored project-level auth setting".** pnpm 11+ refuses to expand `${MOTION_TOKEN}` in an `_authToken` line that sits in a committed project `.npmrc`, so it sends no credential. Keep the `@motionplus:registry=...` line in `.npmrc`, but provide the token from a source pnpm trusts. In a CI or deploy build step (Cloudflare Pages, etc.), run this before `pnpm install`:

  ```bash
  pnpm config set "//api.motion.dev/npm/:_authToken" "$MOTION_TOKEN"
  ```

  It writes the resolved token to the user-level config, which stays out of your repo. Writing the same line to `~/.npmrc` works too.
- **`404` from `registry.npmjs.org` for `@motionplus/...`.** The scoped-registry config isn't being picked up. Check the `.npmrc` is in the project root (Yarn users: see the Yarn section above).
- **Install works locally but fails in CI or on deploy.** `MOTION_TOKEN` isn't set in that environment. Add it as a secret.
- **Monorepos (pnpm workspaces, Rush, Turborepo).** The config above works natively; place `.npmrc` at the workspace root.
