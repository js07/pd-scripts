import { Command, flags } from '@oclif/command';
import { ACTION_VERSIONS_KEY } from '../../pipedream/actions';
import { get } from '../../utils/datastore';

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
