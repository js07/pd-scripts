import { Command, flags } from '@oclif/command';
import { setVersion } from '../../actions';
import args, { actionCommandArgs } from '../../args';

export default class VersionSet extends Command {
  static description = 'Set action versions'

  static flags = {
    help: flags.help({ char: 'h' }),
    storePrev: args.storePrev,
    version: flags.string({ char: 'v', required: true }),
  }

  static args = [...actionCommandArgs]

  static strict = false

  async run() {
    const { argv, flags } = this.parse(VersionSet);

    return setVersion({ globs: argv, storePrev: flags.storePrev, version: flags.version });
  }
}
