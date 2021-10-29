import { Command, flags } from '@oclif/command';
import { createWorkflows } from '../actions';
import { getActionsFromFiles } from '../utils/files';

export default class Create extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({ char: 'h' }),
    // flag with a value (-n, --name=VALUE)
    username: flags.string({ char: 'u', description: 'Pipedream username or email', required: true }),
    password: flags.string({ char: 'p', description: 'Pipedream password', required: true }),
    app: flags.string({ description: 'App name', required: true }),
    // flag with no value (-f, --force)
    headless: flags.boolean({ default: true, allowNo: true }),
    selectAccount: flags.boolean({ default: false }),
  }

  static args = [{ name: 'files', required: true }]

  static strict = false

  async run() {
    const { argv, flags } = this.parse(Create);

    const actionNames = getActionsFromFiles(argv);
    // const actionNames = getActionsFromFiles(args.files)
    createWorkflows({
      actions: actionNames,
      username: flags.username,
      password: flags.password,
      app: flags.app,
      selectAccount: flags.selectAccount,
      headless: flags.headless,
    });

    // const name = flags.name ?? 'world'
    // this.log(`hello ${name} from /Users/jacobpines/Documents/FL/turing/pd-scripts/src/commands/create.ts`)
    // if (args.file && flags.force) {
    //   this.log(`you input --force and --file: ${args.file}`)
    // }
  }
}
