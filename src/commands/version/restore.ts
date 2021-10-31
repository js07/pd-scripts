import { Command, flags } from '@oclif/command';
import { restoreVersion } from '../../actions';

export default class VersionRestore extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({ char: 'h' }),
  }

  static args = [{ name: 'files', required: true }]

  static strict = false

  async run() {
    const { argv } = this.parse(VersionRestore);

    return restoreVersion({ globs: argv });
  }
}
