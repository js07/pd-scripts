import { Command, flags } from '@oclif/command';
import { bumpVersion } from '../../actions';
import args from '../../args';

export default class VersionBump extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({ char: 'h' }),
    storePrev: args.storePrev,
  }

  static args = [{ name: 'files', required: true }]

  static strict = false

  async run() {
    const { argv, flags } = this.parse(VersionBump);

    bumpVersion({ globs: argv, storePrev: flags.storePrev });
  }
}
