import { Command, flags } from '@oclif/command';
import { createWorkflow } from '../actions';
import { actionCommandArgs, workflowArgs } from '../args';

export default class Create extends Command {
  static description = 'Create a workflow from action files'

  static flags = {
    help: flags.help({ char: 'h' }),
    ...workflowArgs,
  }

  static args = [...actionCommandArgs]

  static strict = false

  async run() {
    const { argv, flags } = this.parse(Create);

    createWorkflow({
      globs: argv,
      username: flags.username,
      password: flags.password,
      app: flags.app,
      selectAccount: flags.selectAccount,
      headless: flags.headless,
      combined: flags.combined,
    });
  }
}
