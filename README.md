pd-scripts
==========

Scripts for developing Pipedream components

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/pd-scripts.svg)](https://npmjs.org/package/pd-scripts)
[![Downloads/week](https://img.shields.io/npm/dw/pd-scripts.svg)](https://npmjs.org/package/pd-scripts)
[![License](https://img.shields.io/npm/l/pd-scripts.svg)](https://github.com/js07/pd-scripts/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g pd-scripts
$ pd-scripts COMMAND
running command...
$ pd-scripts (-v|--version|version)
pd-scripts/0.0.2 darwin-x64 node-v14.18.1
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
* [`pd-scripts publish [FILE]`](#pd-scripts-publish-file)
* [`pd-scripts test FILES`](#pd-scripts-test-files)
* [`pd-scripts version [FILE]`](#pd-scripts-version-file)
* [`pd-scripts version:bump FILES`](#pd-scripts-versionbump-files)
* [`pd-scripts version:dev FILES`](#pd-scripts-versiondev-files)
* [`pd-scripts version:reset FILES`](#pd-scripts-versionreset-files)
* [`pd-scripts version:restore FILES`](#pd-scripts-versionrestore-files)
* [`pd-scripts version:set FILES`](#pd-scripts-versionset-files)
* [`pd-scripts version:store FILES`](#pd-scripts-versionstore-files)

## `pd-scripts create FILES`

describe the command here

```
USAGE
  $ pd-scripts create FILES

OPTIONS
  -h, --help               show CLI help
  -p, --password=password  (required) Pipedream password
  -u, --username=username  (required) Pipedream username or email
  --app=app                (required) App name
  --[no-]headless
  --selectAccount
```

_See code: [src/commands/create.ts](https://github.com/js07/pd-scripts/blob/v0.0.2/src/commands/create.ts)_

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

## `pd-scripts publish [FILE]`

describe the command here

```
USAGE
  $ pd-scripts publish [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/publish.ts](https://github.com/js07/pd-scripts/blob/v0.0.2/src/commands/publish.ts)_

## `pd-scripts test FILES`

describe the command here

```
USAGE
  $ pd-scripts test FILES

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/test.ts](https://github.com/js07/pd-scripts/blob/v0.0.2/src/commands/test.ts)_

## `pd-scripts version [FILE]`

describe the command here

```
USAGE
  $ pd-scripts version [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/version.ts](https://github.com/js07/pd-scripts/blob/v0.0.2/src/commands/version.ts)_

## `pd-scripts version:bump FILES`

describe the command here

```
USAGE
  $ pd-scripts version:bump FILES

OPTIONS
  -h, --help   show CLI help
  --storePrev  store action versions to restore later?
```

_See code: [src/commands/version/bump.ts](https://github.com/js07/pd-scripts/blob/v0.0.2/src/commands/version/bump.ts)_

## `pd-scripts version:dev FILES`

describe the command here

```
USAGE
  $ pd-scripts version:dev FILES

OPTIONS
  -h, --help   show CLI help
  --storePrev  store action versions to restore later?
```

_See code: [src/commands/version/dev.ts](https://github.com/js07/pd-scripts/blob/v0.0.2/src/commands/version/dev.ts)_

## `pd-scripts version:reset FILES`

describe the command here

```
USAGE
  $ pd-scripts version:reset FILES

OPTIONS
  -h, --help   show CLI help
  --storePrev  store action versions to restore later?
```

_See code: [src/commands/version/reset.ts](https://github.com/js07/pd-scripts/blob/v0.0.2/src/commands/version/reset.ts)_

## `pd-scripts version:restore FILES`

describe the command here

```
USAGE
  $ pd-scripts version:restore FILES

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/version/restore.ts](https://github.com/js07/pd-scripts/blob/v0.0.2/src/commands/version/restore.ts)_

## `pd-scripts version:set FILES`

describe the command here

```
USAGE
  $ pd-scripts version:set FILES

OPTIONS
  -h, --help             show CLI help
  -v, --version=version  (required)
  --storePrev            store action versions to restore later?
```

_See code: [src/commands/version/set.ts](https://github.com/js07/pd-scripts/blob/v0.0.2/src/commands/version/set.ts)_

## `pd-scripts version:store FILES`

describe the command here

```
USAGE
  $ pd-scripts version:store FILES

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/version/store.ts](https://github.com/js07/pd-scripts/blob/v0.0.2/src/commands/version/store.ts)_
<!-- commandsstop -->
