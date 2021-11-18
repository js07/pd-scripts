pd-scripts
==========

Scripts for developing Pipedream components

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@js07/pd-scripts)](https://npmjs.org/package/@js07/pd-scripts)
[![License](https://img.shields.io/npm/l/@js07/pd-scripts?color=blue)](https://github.com/js07/pd-scripts/blob/master/LICENSE)

<!-- toc -->
* [Dependencies](#dependencies)
* [Installation](#installation)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Dependencies
* [Node.js](https://nodejs.org/en/)
* [Google Chrome](https://www.google.com/chrome/)
* [Pipedream CLI](https://pipedream.com/docs/cli/install/)

# Installation

## npm
###### _Requires [Node.js 8+](https://nodejs.org/en/download/)_

[Install the package globally](https://docs.npmjs.com/downloading-and-installing-packages-globally) by running the following command:
```
npm install -g @js07/pd-scripts
```
## macOS Installer

Download and open [pd-scripts.pkg](https://pd-scripts.s3.amazonaws.com/pd-scripts.pkg).

## Windows Executable

- Windows (32-bit): [pd-scripts-x86.exe](https://pd-scripts.s3.amazonaws.com/pd-scripts-x86.exe)
- Windows (64-bit): [pd-scripts-x64.exe](https://pd-scripts.s3.amazonaws.com/pd-scripts-x64.exe)

## Binaries

Extract the tar archive file and place the `pd-scripts` folder somewhere in [your `PATH`](https://opensource.com/article/17/6/set-path-linux).

- [Linux (x64)](https://pd-scripts.s3.amazonaws.com/pd-scripts-linux-x64.tar.gz)
- [Linux (ARM)](https://pd-scripts.s3.amazonaws.com/pd-scripts-linux-arm.tar.gz)
- [Windows (32-bit)](https://pd-scripts.s3.amazonaws.com/pd-scripts-win32-x86.tar.gz)
- [Windows (64-bit)](https://pd-scripts.s3.amazonaws.com/pd-scripts-win32-x64.tar.gz)
- [macOS (64-bit)](https://pd-scripts.s3.amazonaws.com/pd-scripts-darwin-x64.tar.gz)


# Usage
<!-- usage -->
```sh-session
$ npm install -g @js07/pd-scripts
$ pd-scripts COMMAND
running command...
$ pd-scripts (-v|--version|version)
@js07/pd-scripts/0.2.0 darwin-x64 node-v14.18.1
$ pd-scripts --help [COMMAND]
USAGE
  $ pd-scripts COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`pd-scripts create FILES`](#pd-scripts-create-files)
* [`pd-scripts help [COMMAND]`](#pd-scripts-help-command)
* [`pd-scripts publish FILES`](#pd-scripts-publish-files)
* [`pd-scripts qa FILES`](#pd-scripts-qa-files)
* [`pd-scripts refresh URL`](#pd-scripts-refresh-url)
* [`pd-scripts update [CHANNEL]`](#pd-scripts-update-channel)
* [`pd-scripts version:bump FILES`](#pd-scripts-versionbump-files)
* [`pd-scripts version:dev FILES`](#pd-scripts-versiondev-files)
* [`pd-scripts version:reset FILES`](#pd-scripts-versionreset-files)
* [`pd-scripts version:restore FILES`](#pd-scripts-versionrestore-files)
* [`pd-scripts version:set FILES`](#pd-scripts-versionset-files)
* [`pd-scripts version:show`](#pd-scripts-versionshow)
* [`pd-scripts version:store FILES`](#pd-scripts-versionstore-files)

## `pd-scripts create FILES`

Create a workflow from action files

```
USAGE
  $ pd-scripts create FILES

ARGUMENTS
  FILES  action files or folder

OPTIONS
  -h, --help               show CLI help
  -p, --password=password  (required) Pipedream password
  -u, --username=username  (required) Pipedream username or email
  --app=app                (required) App name
  --[no-]combined          Add all actions to the same workflow
  --[no-]headless          run puppeteer in headless mode
  --selectAccount          select connected app account in action config
```

_See code: [src/commands/create.ts](https://github.com/js07/pd-scripts/blob/v0.2.0/src/commands/create.ts)_

## `pd-scripts help [COMMAND]`

display help for pd-scripts

```
USAGE
  $ pd-scripts help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.3/src/commands/help.ts)_

## `pd-scripts publish FILES`

Publish actions

```
USAGE
  $ pd-scripts publish FILES

ARGUMENTS
  FILES  action files or folder

OPTIONS
  -h, --help         show CLI help
  --dev              use dev mode
  --profile=profile  pipedream profile to use
```

_See code: [src/commands/publish.ts](https://github.com/js07/pd-scripts/blob/v0.2.0/src/commands/publish.ts)_

## `pd-scripts qa FILES`

Publish and create a workflow from actions

```
USAGE
  $ pd-scripts qa FILES

ARGUMENTS
  FILES  action files or folder

OPTIONS
  -h, --help               show CLI help
  -p, --password=password  (required) Pipedream password
  -u, --username=username  (required) Pipedream username or email
  --app=app                (required) App name
  --[no-]combined          Add all actions to the same workflow
  --dev                    use dev mode
  --[no-]headless          run puppeteer in headless mode
  --profile=profile        pipedream profile to use
  --selectAccount          select connected app account in action config

EXAMPLE
  $ pd-scripts qa components/confection --app "Confection" -u <PDUsernawme> -p "<PDPassword>"
```

_See code: [src/commands/qa.ts](https://github.com/js07/pd-scripts/blob/v0.2.0/src/commands/qa.ts)_

## `pd-scripts refresh URL`

Refresh actions in a workflow

```
USAGE
  $ pd-scripts refresh URL

ARGUMENTS
  URL  url of workflow

OPTIONS
  -h, --help               show CLI help
  -p, --password=password  (required) Pipedream password
  -u, --username=username  (required) Pipedream username or email
  --[no-]headless          run puppeteer in headless mode

EXAMPLE
  $ pd-scripts refresh https://pipedream.com/@pdusername/workflow-name-p_OKCKmHN/edit -u "<PDUsernawme>" -p 
  "<PDPassword>"
```

_See code: [src/commands/refresh.ts](https://github.com/js07/pd-scripts/blob/v0.2.0/src/commands/refresh.ts)_

## `pd-scripts update [CHANNEL]`

update the pd-scripts CLI

```
USAGE
  $ pd-scripts update [CHANNEL]

OPTIONS
  --from-local  interactively choose an already installed version
```

_See code: [@oclif/plugin-update](https://github.com/oclif/plugin-update/blob/v1.5.0/src/commands/update.ts)_

## `pd-scripts version:bump FILES`

Bump action versions

```
USAGE
  $ pd-scripts version:bump FILES

ARGUMENTS
  FILES  action files or folder

OPTIONS
  -h, --help   show CLI help
  --storePrev  store action versions to restore later?
```

_See code: [src/commands/version/bump.ts](https://github.com/js07/pd-scripts/blob/v0.2.0/src/commands/version/bump.ts)_

## `pd-scripts version:dev FILES`

Set action versions to current timestamp

```
USAGE
  $ pd-scripts version:dev FILES

ARGUMENTS
  FILES  action files or folder

OPTIONS
  -h, --help   show CLI help
  --storePrev  store action versions to restore later?
```

_See code: [src/commands/version/dev.ts](https://github.com/js07/pd-scripts/blob/v0.2.0/src/commands/version/dev.ts)_

## `pd-scripts version:reset FILES`

Reset action versions to `0.0.1`

```
USAGE
  $ pd-scripts version:reset FILES

ARGUMENTS
  FILES  action files or folder

OPTIONS
  -h, --help   show CLI help
  --storePrev  store action versions to restore later?
```

_See code: [src/commands/version/reset.ts](https://github.com/js07/pd-scripts/blob/v0.2.0/src/commands/version/reset.ts)_

## `pd-scripts version:restore FILES`

Restore action versions to previously stored versions

```
USAGE
  $ pd-scripts version:restore FILES

ARGUMENTS
  FILES  action files or folder

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/version/restore.ts](https://github.com/js07/pd-scripts/blob/v0.2.0/src/commands/version/restore.ts)_

## `pd-scripts version:set FILES`

Set action versions

```
USAGE
  $ pd-scripts version:set FILES

ARGUMENTS
  FILES  action files or folder

OPTIONS
  -h, --help             show CLI help
  -v, --version=version  (required)
  --storePrev            store action versions to restore later?
```

_See code: [src/commands/version/set.ts](https://github.com/js07/pd-scripts/blob/v0.2.0/src/commands/version/set.ts)_

## `pd-scripts version:show`

Show stored versions

```
USAGE
  $ pd-scripts version:show

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/version/show.ts](https://github.com/js07/pd-scripts/blob/v0.2.0/src/commands/version/show.ts)_

## `pd-scripts version:store FILES`

Store action versions

```
USAGE
  $ pd-scripts version:store FILES

ARGUMENTS
  FILES  action files or folder

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/version/store.ts](https://github.com/js07/pd-scripts/blob/v0.2.0/src/commands/version/store.ts)_
<!-- commandsstop -->
