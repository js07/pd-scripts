import { Command, flags } from '@oclif/command';
import { get } from '../../utils/datastore';
import { ACTION_VERSIONS_KEY } from '../../utils/files';

export default class VersionShow extends Command {
  static description = 'Show stored versions'

  static flags = {
    help: flags.help({ char: 'h' }),
  }

  static args = []

  async run() {
    const data = get(ACTION_VERSIONS_KEY);

    this.log(data);
  }
}
