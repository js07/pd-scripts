import { Command, flags } from '@oclif/command';
import { setDevVersion } from '../../utils/files';

export default class VersionDev extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({ char: 'h' }),
  }

  static args = [{ name: 'files', required: true }]

  static strict = false

  async run() {
    const { argv } = this.parse(VersionDev);

    setDevVersion(argv);
  }
}
