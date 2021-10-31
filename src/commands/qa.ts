import { Command, flags } from '@oclif/command';
import { qa } from '../actions/qa';
import { actionCommandArgs, publishArgs, workflowArgs } from '../args';

export default class Qa extends Command {
  static description = 'Publish and create a workflow from actions'

  static flags = {
    help: flags.help({ char: 'h' }),
    ...publishArgs,
    ...workflowArgs,
  }

  static args = [...actionCommandArgs]

  static strict = false

  static examples = [
    '$ pd-scripts qa components/confection --app "Confection" -u <PDUsernawme> -p "<PDPassword>"',
  ]

  async run() {
    const { argv, flags } = this.parse(Qa);

    qa({
      globs: argv,
      ...flags,
    });
  }
}
