import { Command, flags } from '@oclif/command';
import { bumpVersion } from '../../actions';
import args, { actionCommandArgs } from '../../args';

export default class VersionBump extends Command {
  static description = 'Bump action versions'

  static flags = {
    help: flags.help({ char: 'h' }),
    storePrev: args.storePrev,
  }

  static args = [...actionCommandArgs]

  static strict = false

  async run() {
    const { argv, flags } = this.parse(VersionBump);

    return bumpVersion({ globs: argv, storePrev: flags.storePrev });
  }
}
