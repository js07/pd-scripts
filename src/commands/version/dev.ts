import { Command, flags } from '@oclif/command';
import { setDevVersion } from '../../actions';
import args, { actionCommandArgs } from '../../args';

export default class VersionDev extends Command {
  static description = 'Set action versions to current timestamp'

  static flags = {
    help: flags.help({ char: 'h' }),
    storePrev: args.storePrev,
  }

  static args = [...actionCommandArgs]

  static strict = false

  async run() {
    const { argv, flags } = this.parse(VersionDev);

    return setDevVersion({ globs: argv, storePrev: flags.storePrev });
  }
}
