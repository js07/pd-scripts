import { Command, flags } from '@oclif/command';
import { resetVersion } from '../../actions';
import args, { actionCommandArgs } from '../../args';

export default class VersionReset extends Command {
  static description = 'Reset action versions to `0.0.1`'

  static flags = {
    help: flags.help({ char: 'h' }),
    storePrev: args.storePrev,
  }

  static args = [...actionCommandArgs]

  static strict = false

  async run() {
    const { argv, flags } = this.parse(VersionReset);

    return resetVersion({ globs: argv, storePrev: flags.storePrev });
  }
}
