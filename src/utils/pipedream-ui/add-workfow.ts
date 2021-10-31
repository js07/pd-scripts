import { Page } from 'puppeteer-core';
import { log } from '../logger';
import { addAction } from './add-action';

const PIPEDREAM_NEW_WORKFLOW_URL = 'https://pipedream.com/new';

export interface AddWorkflowOptions {
  actions: string[];
  app: string;
  accountName?: string;
  selectAccount?: boolean;
}

export async function addWorkflow(
  page: Page,
  { actions, app, accountName, selectAccount }: AddWorkflowOptions
) {
  // Navigate to new workflow url
  await page.goto(PIPEDREAM_NEW_WORKFLOW_URL);
  await page.waitForTimeout(3000);
  const appcues = await page.$<HTMLDivElement>('.appcues');
  if (appcues) {
    await appcues.evaluate(el => {
      el.style.display = 'none';
    });
  }
  const titleSelector = '[placeholder="Title"]';
  // Set title of workflow, press enter, wait
  await page.waitForTimeout(100);
  await page.waitForSelector(titleSelector);
  await page.click(titleSelector);
  const subTitle = actions.length === 1 ? actions[0] : `${actions.length} actions`;
  await page.type(titleSelector, `${app} | ${subTitle}`);
  await page.waitForTimeout(200);
  await page.keyboard.press('Enter');
  await page.waitForTimeout(1000);

  // Click on HTTP API trigger, wait
  const webhookTriggerSelector = 'button[data-appcues="HTTP / Webhook"]';
  await page.waitForSelector(webhookTriggerSelector);
  await page.click(webhookTriggerSelector);
  await page.waitForTimeout(2500);

  for (const action of actions) {
    log(`Adding action: ${action}`);
    /* eslint-disable-next-line no-await-in-loop */
    await addAction(page, {
      action, app, accountName, selectAccount,
    });
  }

  // Press deploy (type cmd+d), wait
  // Press save (click save), wait
  const saveButtonXPath = "//button[text()='Save' and contains(concat(' ', @class, ' '), ' v-button ')]";
  await page.waitForXPath(saveButtonXPath);
  await page.evaluate(saveButtonXPath => {
    const saveButton = document.evaluate(
      saveButtonXPath,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    ).singleNodeValue as HTMLButtonElement;
    if (!saveButton) {
      throw new Error('Account button is not found');
    }
    saveButton.click();
  }, saveButtonXPath);
  await page.waitForTimeout(1000);
  return page;
}
