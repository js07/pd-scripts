import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { getActionsFromFiles } from './utils/files';
import { createWorkflows } from './utils/pipdream-ui/create-workflows';

function parseArgumentsIntoOptions() {
  const argv = yargs(hideBin(process.argv))
    .command({
      command: 'create <files...>',
      desc: 'Create a workflow for each action file',
      builder: (yargs) => {
        return yargs
          .positional('files', {
            describe: 'a list of action files',
          })
          .option('u', {
            type: 'string',
            alias: ['username'],
            describe: 'Pipedream username or email',
            demandOption: true,
          })
          .option('p', {
            type: 'string',
            alias: ['password'],
            describe: 'Pipedream password',
            demandOption: true,
          })
          .option('app', {
            type: 'string',
            describe: 'Name of the app (with correct capitalization)',
            demandOption: true,
          })
          .option('account', {
            type: 'string',
            describe: 'Identity of the connected account for this app',
          })
          .option('select-account', {
            type: 'boolean',
            describe:
              'If the connected account for this app should be selected',
            default: false,
          })
          .option('headless', {
            type: 'boolean',
            describe: 'Whether to run the browser in headless mode',
            default: true,
          })
          .example([
            [
              '$0 create components/google_sheets/actions/**/*.js -u <username> -p "<password>" --app "Google Sheets"',
            ],
          ]);
      },
      handler: (argv) => {
        const actionNames = getActionsFromFiles(argv.files);
        createWorkflows({
          actions: actionNames,
          username: argv.username,
          password: argv.password,
          app: argv.app,
          selectAccount: argv.selectAccount,
          headless: argv.headless,
        });
      },
    })
    .demandCommand()
    .alias('help', 'h')
    .alias('version', 'v')
    .parse();
  return argv;
}

export async function cli() {
  parseArgumentsIntoOptions();
}
