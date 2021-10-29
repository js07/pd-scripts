import { Command, flags } from '@oclif/command';
import { setVersion } from '../../actions';
import args from '../../args';

export default class VersionSet extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({ char: 'h' }),
    storePrev: args.storePrev,
    version: flags.string({ char: 'v', required: true }),
  }

  static args = [{ name: 'files', required: true }]

  static strict = false

  async run() {
    const { argv, flags } = this.parse(VersionSet);

    return setVersion({ globs: argv, storePrev: flags.storePrev, version: flags.version });
  }
}
