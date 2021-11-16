import { Command, flags } from '@oclif/command';
import args from '../args';
import { refreshActions } from '../actions';

export default class Refresh extends Command {
  static description = 'Refresh actions in a workflow';

  static flags = {
    help: flags.help({ char: 'h' }),
    username: args.username,
    password: args.password,
    headless: args.headless,
  };

  static args = [
    { name: 'url', required: true, description: 'url of workflow' },
  ];

  static examples = [
    '$ pd-scripts refresh https://pipedream.com/@pdusername/workflow-name-p_OKCKmHN/edit ' +
    '-u "<PDUsernawme>" -p "<PDPassword>"',
  ];

  async run() {
    const { args, flags } = this.parse(Refresh);

    refreshActions({
      url: args.url,
      username: flags.username,
      password: flags.password,
      headless: flags.headless,
    });
  }
}
