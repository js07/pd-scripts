import { launch } from '../utils/puppeteer';
import { signin } from './signin';
import { log } from '../utils/logger';
import { addWorkflow } from './add-workflow';

export interface CreateWorkflowsOptions {
  username: string;
  password: string;
  actions: string[];
  app: string;
  accountName?: string;
  selectAccount?: boolean;
  headless?: boolean;
  combined?: boolean; // all actions in one workflow
}

export async function createWorkflows({
  username,
  password,
  actions,
  app,
  accountName,
  selectAccount,
  headless,
  combined,
}: CreateWorkflowsOptions) {
  const browser = await launch({ headless });
  const page = await browser.newPage();
  log('Signing in to Pipedream...');
  await signin(page, { username, password });

  if (combined) {
    const workflowTitle = `${app} | ${actions.length} actions`;
    log(`Creating workflow: ${workflowTitle}`);
    await addWorkflow(page, { actions, app, accountName, selectAccount });
    log(`Created workflow: ${workflowTitle}`);
  } else {
    for (const action of actions) {
      const workflowTitle = `${app} | ${action}`;
      log(`Creating workflow: ${workflowTitle}`);
      /* eslint-disable-next-line no-await-in-loop */
      await addWorkflow(page, { actions: [action], app, accountName, selectAccount });
      log(`Created workflow: ${workflowTitle}`);
    }
  }

  await browser.close();
}
