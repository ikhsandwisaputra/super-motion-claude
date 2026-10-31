---
source: https://swup.js.org/cli
title: "CLI — swup"
fetched: 2026-10-28
---

[v5.0.3](https://github.com/swup/cli/)

# CLI

[![Version](https://img.shields.io/npm/v/@swup/cli.svg)](https://npmjs.org/package/@swup/cli)
[![License](https://img.shields.io/npm/l/@swup/cli.svg)](https://github.com/gmrchk/cli/blob/main/package.json)
[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)

A command-line interface (CLI) to help develop [swup](https://swup.js.org/) sites and plugins.

* Validate your website in CI/CD
* Create plugins and themes from a best-practice template
* Bundle plugins and themes using microbundle

![terminal screenshot](https://github.com/swup/cli/assets/869813/0d59b849-0801-4043-a325-801ed2d2982d)

## [Contents](https://swup.js.org/cli/#contents)

* [Installation](https://swup.js.org/cli/#installation)
* [Usage](https://swup.js.org/cli/#usage)
* [Commands](https://swup.js.org/cli/#commands)

## [Installation](https://swup.js.org/cli/#installation)

Install the CLI globally from npm.

```
npm install -g @swup/cli
```

```
npm install -g @swup/cli
```

## [Usage](https://swup.js.org/cli/#usage)

The CLI will install a binary called `swup` you can run, followed by any of the provided [commands](https://swup.js.org/cli/#commands).

```
$ swup [command]
> Running command...

$ swup --help [command]
> Show help for command [command]

$ swup --version
> @swup/cli/5.0.3 darwin-arm64 node-v18.16.0
```

```
$ swup [command]
> Running command...

$ swup --help [command]
> Show help for command [command]

$ swup --version
> @swup/cli/5.0.3 darwin-arm64 node-v18.16.0
```

## [Commands](https://swup.js.org/cli/#commands)

* [`swup create NAME`](https://swup.js.org/cli/#swup-create-name)
* [`swup help [COMMANDS]`](https://swup.js.org/cli/#swup-help-commands)
* [`swup package:build`](https://swup.js.org/cli/#swup-packagebuild)
* [`swup package:check`](https://swup.js.org/cli/#swup-packagecheck)
* [`swup package:dev`](https://swup.js.org/cli/#swup-packagedev)
* [`swup package:format`](https://swup.js.org/cli/#swup-packageformat)
* [`swup package:lint`](https://swup.js.org/cli/#swup-packagelint)
* [`swup validate`](https://swup.js.org/cli/#swup-validate)

## [`swup create NAME`](https://swup.js.org/cli/#swup-create-name)

Create a swup plugin or theme

```
USAGE
  $ swup create NAME [-t plugin|theme]

ARGUMENTS
  NAME  Name of the plugin to create

FLAGS
  -t, --type=<option>  [default: plugin] Type
                       <options: plugin|theme>

DESCRIPTION
  Create a swup plugin or theme

  Generate a new swup plugin or theme from an official, best-practice template

EXAMPLES
  $ swup create SwupExamplePlugin

  $ swup create SwupExampleTheme

FLAG DESCRIPTIONS
  -t, --type=plugin|theme  Type

    Choose the type of project to create: plugin or theme. Not required if name ends with "Plugin" or "Theme".
```

```
USAGE
  $ swup create NAME [-t plugin|theme]

ARGUMENTS
  NAME  Name of the plugin to create

FLAGS
  -t, --type=<option>  [default: plugin] Type
                       <options: plugin|theme>

DESCRIPTION
  Create a swup plugin or theme

  Generate a new swup plugin or theme from an official, best-practice template

EXAMPLES
  $ swup create SwupExamplePlugin

  $ swup create SwupExampleTheme

FLAG DESCRIPTIONS
  -t, --type=plugin|theme  Type

    Choose the type of project to create: plugin or theme. Not required if name ends with "Plugin" or "Theme".
```

*See code: [src/commands/create.ts](https://github.com/swup/cli/blob/5.0.3/src/commands/create.ts)*

## [`swup help [COMMANDS]`](https://swup.js.org/cli/#swup-help-commands)

Display help for swup.

```
USAGE
  $ swup help [COMMANDS] [-n]

ARGUMENTS
  COMMANDS  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for swup.
```

```
USAGE
  $ swup help [COMMANDS] [-n]

ARGUMENTS
  COMMANDS  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for swup.
```

*See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.2.20/src/commands/help.ts)*

## [`swup package:build`](https://swup.js.org/cli/#swup-package-build)

Build package

```
USAGE
  $ swup package:build [--check]

FLAGS
  --[no-]check  Check package info

DESCRIPTION
  Build package

  Build package code for distribution using microbundle

EXAMPLES
  $ swup package:build

FLAG DESCRIPTIONS
  --[no-]check  Check package info

    Check for required package.json fields before bundling. Disable using --no-check.
```

```
USAGE
  $ swup package:build [--check]

FLAGS
  --[no-]check  Check package info

DESCRIPTION
  Build package

  Build package code for distribution using microbundle

EXAMPLES
  $ swup package:build

FLAG DESCRIPTIONS
  --[no-]check  Check package info

    Check for required package.json fields before bundling. Disable using --no-check.
```

*See code: [src/commands/package/build.ts](https://github.com/swup/cli/blob/5.0.3/src/commands/package/build.ts)*

## [`swup package:check`](https://swup.js.org/cli/#swup-package-check)

Check package info

```
USAGE
  $ swup package:check

DESCRIPTION
  Check package info

  Ensure a bundle package.json is valid

EXAMPLES
  $ swup package:check
```

```
USAGE
  $ swup package:check

DESCRIPTION
  Check package info

  Ensure a bundle package.json is valid

EXAMPLES
  $ swup package:check
```

*See code: [src/commands/package/check.ts](https://github.com/swup/cli/blob/5.0.3/src/commands/package/check.ts)*

## [`swup package:dev`](https://swup.js.org/cli/#swup-package-dev)

Develop package

```
USAGE
  $ swup package:dev [--check]

FLAGS
  --[no-]check  Check package info

DESCRIPTION
  Develop package

  Build package code for development using microbundle and watch for changes

EXAMPLES
  $ swup package:dev

FLAG DESCRIPTIONS
  --[no-]check  Check package info

    Check for required package.json fields before bundling. Disable using --no-check.
```

```
USAGE
  $ swup package:dev [--check]

FLAGS
  --[no-]check  Check package info

DESCRIPTION
  Develop package

  Build package code for development using microbundle and watch for changes

EXAMPLES
  $ swup package:dev

FLAG DESCRIPTIONS
  --[no-]check  Check package info

    Check for required package.json fields before bundling. Disable using --no-check.
```

*See code: [src/commands/package/dev.ts](https://github.com/swup/cli/blob/5.0.3/src/commands/package/dev.ts)*

## [`swup package:format`](https://swup.js.org/cli/#swup-package-format)

Format package

```
USAGE
  $ swup package:format

DESCRIPTION
  Format package

  Fix code formatting issues using prettier

EXAMPLES
  $ swup package:format
```

```
USAGE
  $ swup package:format

DESCRIPTION
  Format package

  Fix code formatting issues using prettier

EXAMPLES
  $ swup package:format
```

*See code: [src/commands/package/format.ts](https://github.com/swup/cli/blob/5.0.3/src/commands/package/format.ts)*

## [`swup package:lint`](https://swup.js.org/cli/#swup-package-lint)

Lint package

```
USAGE
  $ swup package:lint

DESCRIPTION
  Lint package

  Check code for formatting issues using prettier

EXAMPLES
  $ swup package:lint
```

```
USAGE
  $ swup package:lint

DESCRIPTION
  Lint package

  Check code for formatting issues using prettier

EXAMPLES
  $ swup package:lint
```

*See code: [src/commands/package/lint.ts](https://github.com/swup/cli/blob/5.0.3/src/commands/package/lint.ts)*

## [`swup validate`](https://swup.js.org/cli/#swup-validate)

Validate a swup-powered site

```
USAGE
  $ swup validate [-u <value> | -s <value>] [-c] [-l <value>] [-t
    all|containers|transition-duration|transition-styles] [-p] [--containers <value>] [--animation <value>] [--styles
    <value>]

FLAGS
  -c, --crawl            Crawl site
  -l, --limit=<value>    Limit
  -p, --parallel         Parallel
  -s, --sitemap=<value>  Sitemap
  -t, --tests=<option>   [default: all] Tests
                         <options: all|containers|transition-duration|transition-styles>
  -u, --url=<value>      URL
  --animation=<value>    [default: [class*="transition-"]] Animation selector
  --containers=<value>   [default: #swup] Containers
  --styles=<value>       [default: opacity,transform] Expected styles

DESCRIPTION
  Validate a swup-powered site

  Crawl your site and validate that all pages are accessible and render correctly

EXAMPLES
  $ swup validate

  $ swup validate --url https://mysite.com/about

  $ swup validate --crawl --url https://mysite.com

  $ swup validate --tests containers,transition-duration

  $ swup validate --asynchronous

FLAG DESCRIPTIONS
  -c, --crawl  Crawl site

    Crawl the site for all public URLs and validate all found pages. Requires the --url flag as a base URL.

  -l, --limit=<value>  Limit

    Limit the number of pages to validate when crawling or reading from a sitemap.

  -p, --parallel  Parallel

    Run all tests asynchronously. A lot faster, but might cause issues.

  -s, --sitemap=<value>  Sitemap

    If no URL is passed, the local sitemap file will be scanned for public URLs. Accepts a local filepath or URL.

  -t, --tests=all|containers|transition-duration|transition-styles  Tests

    Specify which tests to run when validating. Defaults to all.

  -u, --url=<value>  URL

    Base URL to validate. Will validate this single URL only, unless --crawl is specified.

  --animation=<value>  Animation selector

    Selector of elements that should be animated.

  --containers=<value>  Containers

    Selectors of containers to validate, separated by comma.

  --styles=<value>  Expected styles

    CSS properties expected to change during animations, separated by comma.
```

```
USAGE
  $ swup validate [-u <value> | -s <value>] [-c] [-l <value>] [-t
    all|containers|transition-duration|transition-styles] [-p] [--containers <value>] [--animation <value>] [--styles
    <value>]

FLAGS
  -c, --crawl            Crawl site
  -l, --limit=<value>    Limit
  -p, --parallel         Parallel
  -s, --sitemap=<value>  Sitemap
  -t, --tests=<option>   [default: all] Tests
                         <options: all|containers|transition-duration|transition-styles>
  -u, --url=<value>      URL
  --animation=<value>    [default: [class*="transition-"]] Animation selector
  --containers=<value>   [default: #swup] Containers
  --styles=<value>       [default: opacity,transform] Expected styles

DESCRIPTION
  Validate a swup-powered site

  Crawl your site and validate that all pages are accessible and render correctly

EXAMPLES
  $ swup validate

  $ swup validate --url https://mysite.com/about

  $ swup validate --crawl --url https://mysite.com

  $ swup validate --tests containers,transition-duration

  $ swup validate --asynchronous

FLAG DESCRIPTIONS
  -c, --crawl  Crawl site

    Crawl the site for all public URLs and validate all found pages. Requires the --url flag as a base URL.

  -l, --limit=<value>  Limit

    Limit the number of pages to validate when crawling or reading from a sitemap.

  -p, --parallel  Parallel

    Run all tests asynchronously. A lot faster, but might cause issues.

  -s, --sitemap=<value>  Sitemap

    If no URL is passed, the local sitemap file will be scanned for public URLs. Accepts a local filepath or URL.

  -t, --tests=all|containers|transition-duration|transition-styles  Tests

    Specify which tests to run when validating. Defaults to all.

  -u, --url=<value>  URL

    Base URL to validate. Will validate this single URL only, unless --crawl is specified.

  --animation=<value>  Animation selector

    Selector of elements that should be animated.

  --containers=<value>  Containers

    Selectors of containers to validate, separated by comma.

  --styles=<value>  Expected styles

    CSS properties expected to change during animations, separated by comma.
```

*See code: [src/commands/validate.ts](https://github.com/swup/cli/blob/5.0.3/src/commands/validate.ts)*
