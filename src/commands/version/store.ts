import { Command, flags } from '@oclif/command';
import { storeVersion } from '../../actions';
import { actionCommandArgs } from '../../args';

export default class VersionStore extends Command {
  static description = 'Store action versions'

  static flags = {
    help: flags.help({ char: 'h' }),
  }

  static args = [...actionCommandArgs]

  static strict = false

  async run() {
    const { argv } = this.parse(VersionStore);

    return storeVersion({ globs: argv });
  }
}
