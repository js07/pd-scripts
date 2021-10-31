// import moduleName from '../utils/pipedream/cli'
import { Command, flags } from '@oclif/command';
import { publish } from '../actions/publish';
import { actionCommandArgs, publishArgs } from '../args';
// import { publishFiles } from '../utils/pipedream/cli';

export default class Publish extends Command {
  static description = 'Publish actions'

  static flags = {
    help: flags.help({ char: 'h' }),
    ...publishArgs,
  }

  static args = [...actionCommandArgs]

  static strict = false

  async run() {
    const { argv, flags } = this.parse(Publish);

    publish({ globs: argv, profile: flags.profile, dev: flags.dev });
  }
}
