import { Command, flags } from '@oclif/command';
import { resetVersion } from '../../actions';
import args from '../../args';

export default class VersionReset extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({ char: 'h' }),
    storePrev: args.storePrev,
  }

  static args = [{ name: 'files', required: true }]

  static strict = false

  async run() {
    const { argv, flags } = this.parse(VersionReset);

    return resetVersion({ globs: argv, storePrev: flags.storePrev });
  }
}
