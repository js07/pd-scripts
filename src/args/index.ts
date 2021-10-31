import { flags } from '@oclif/command';

export const publishArgs = {
  profile: flags.string({ description: 'pipedream profile to use' }),
  dev: flags.boolean({ description: 'use dev mode', default: true }),
};

export const workflowArgs = {
  username: flags.string({ char: 'u', description: 'Pipedream username or email', required: true }),
  password: flags.string({ char: 'p', description: 'Pipedream password', required: true }),
  app: flags.string({ description: 'App name', required: true }),
  headless: flags.boolean({ default: true, allowNo: true, description: 'run puppeteer in headless mode' }),
  selectAccount: flags.boolean({ default: false, description: 'select connected app account in action config' }),
  combined: flags.boolean({ description: 'Add all actions to the same workflow', default: true }),
};

const args = {
  storePrev: flags.boolean({ description: 'store action versions to restore later?', default: false }),
  ...publishArgs,
  ...workflowArgs,
};

export default args;

export const actionCommandArgs = [{ name: 'files', required: true, description: 'action files or folder' }];

export const positionalArgs = [
  ...actionCommandArgs,
];
