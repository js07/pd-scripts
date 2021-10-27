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
pd-scripts/0.0.0 darwin-x64 node-v14.18.1
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

_See code: [src/commands/create.ts](https://github.com/js07/pd-scripts/blob/v0.0.0/src/commands/create.ts)_

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
<!-- commandsstop -->
