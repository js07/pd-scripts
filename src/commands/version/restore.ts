import { Command, flags } from '@oclif/command';
import { restoreVersion } from '../../actions';
import { actionCommandArgs } from '../../args';

export default class VersionRestore extends Command {
  static description = 'Restore action versions to previously stored versions'

  static flags = {
    help: flags.help({ char: 'h' }),
  }

  static args = [...actionCommandArgs]

  static strict = false

  async run() {
    const { argv } = this.parse(VersionRestore);

    return restoreVersion({ globs: argv });
  }
}
