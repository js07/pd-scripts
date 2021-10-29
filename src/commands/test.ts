import { Command, flags } from '@oclif/command';
import { get } from '../utils/datastore';
import { ACTION_VERSIONS_KEY } from '../utils/files';

export default class Test extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({ char: 'h' }),
  }

  static args = [{ name: 'files', required: true }]

  static strict = false

  async run() {
    // const {argv} = this.parse(Test);

    const data = get(ACTION_VERSIONS_KEY);

    this.log('test', data);
  }
}
