// import moduleName from '../utils/pipedream/cli'
import { Command, flags } from '@oclif/command';
import { publish } from '../actions/publish';
import args from '../args';
// import { publishFiles } from '../utils/pipedream/cli';

export default class Publish extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({ char: 'h' }),
    profile: args.profile,
    dev: args.dev,
  }

  static args = [{ name: 'files', required: true }]

  static strict = false

  async run() {
    const { argv, flags } = this.parse(Publish);

    publish({ globs: argv, profile: flags.profile, dev: flags.dev });
    // publishFiles(argv, flags.profile);
  }
}
