import { Command, flags } from '@oclif/command';
import { resetVersion } from '../../utils/files';

export default class VersionReset extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({ char: 'h' }),
  }

  static args = [{ name: 'files', required: true }]

  static strict = false

  async run() {
    const { argv } = this.parse(VersionReset);

    resetVersion(argv);
  }
}
