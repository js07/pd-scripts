import { launch } from '../puppeteer';
import { signin } from './signin';
const { aOrAn } = require('../text');
const { xPathExpression } = require('../xpath');

const PIPEDREAM_NEW_WORKFLOW_URL = 'https://pipedream.com/new';

export async function createWorkflows({
  username,
  password,
  actions,
  app,
  accountName,
  selectAccount,
  headless,
}) {
  const browser = await launch({ headless });
  const page = await browser.newPage();
  await signin(page, { username, password });

  for (const action of actions) {
    console.log(`Creating workflow: ${app} | ${action}`);
    await createWorkflow(page, { action, app, accountName, selectAccount });
  }

  await browser.close();
}

async function createWorkflow(
  page,
  { action, app, accountName, selectAccount }
) {
  // Navigate to new workflow url
  await page.goto(PIPEDREAM_NEW_WORKFLOW_URL);
  await page.waitForTimeout(3000);
  let appcues = await page.$('.appcues');
  if (appcues) {
    await appcues.evaluate((el) => (el.style.display = 'none'));
  }
  // Set title of workflow, press enter, wait
  await page.waitForTimeout(100);
  await page.click('[placeholder="Title"]');
  await page.type('[placeholder="Title"]', `${app} | ${action}`);
  await page.waitForTimeout(200);
  await page.keyboard.press('Enter');
  await page.waitForTimeout(1000);

  // Click on HTTP API trigger, wait
  await page.click('button[data-appcues="HTTP / Webhook"]');
  await page.waitForTimeout(2500);

  // Click on add a step, wait
  await page.click('a[data-pd-t="add cell"]');
  await page.waitForTimeout(200);

  // Enter app name in "Search for an App", wait
  await page.click('[placeholder="Search for an app"]');
  await page.type('[placeholder="Search for an app"]', app);
  await page.waitForTimeout(1500);

  // Click on App with correct name, wait
  await page.evaluate((app) => {
    const appButton = document.evaluate(
      `//div[text()='${app}' and contains(concat(' ', @class, ' '), ' flex-grow ')]`,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    ).singleNodeValue;
    appButton.click();
  }, app);
  await page.waitForTimeout(1500);

  // Enter action name in "Search for a <App> action", wait
  const aOrAnAppName = aOrAn(app);
  await page.click(`[placeholder="Search for ${aOrAnAppName} action"]`);
  await page.type(`[placeholder="Search for ${aOrAnAppName} action"]`, action);
  await page.waitForTimeout(1500);

  // Click on issue with correct name, wait
  await page.evaluate(
    async (actionExpr, app) => {
      let isTimeout = false;
      setTimeout(() => {
        isTimeout = true;
      }, 300000);
      function sleep(ms) {
        return new Promise((resolve) => {
          setTimeout(resolve, ms);
        });
      }

      let actionButton;

      while (!isTimeout) {
        actionButton = document.evaluate(
          `//div[text()=${actionExpr} and contains(concat(' ', @class, ' '), ' font-bold ')]`,
          document,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          null
        ).singleNodeValue;
        if (actionButton) {
          break;
        }
        // Click load more actions
        document
          .evaluate(
            `//div[text()='Load more ${app} actions' and contains(concat(' ', @class, ' '), ' ml-1 ')]`,
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
          )
          .singleNodeValue.click();
        await sleep(50);
      }
      actionButton.click();
    },
    xPathExpression(action),
    app
  );
  await page.waitForTimeout(3000);

  // Click on first button in dropdown (div.class="drop-down-content" -> button.class="mt-qr"), wait
  if (accountName) {
    await page.evaluate((accountNameExpr) => {
      const accountButton = document.evaluate(
        `//span[text()=${accountNameExpr} and contains(concat(' ', @class, ' '), ' mr-1 ')]`,
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      ).singleNodeValue;
      accountButton.click();
    }, xPathExpression(accountName));
    await page.waitForTimeout(1500);
  } else if (selectAccount) {
    const accountDropdownSelector =
      '.drop-down-content.fixed>.bg-white.w-40.border-blue-dark';
    const dropdownChildCount = await page.evaluate(
      (accountDropdownSelector) => {
        return document.querySelector(accountDropdownSelector)
          .childElementCount;
      },
      accountDropdownSelector
    );
    // If account dropdown has greater than 2 children, an account has been connected for the app
    if (dropdownChildCount > 2) {
      // Click on first element in dropdown, the connected account
      // await page.click('.drop-down-content>.bg-white>div:first-child>button');
      await page.evaluate((accountDropdownSelector) => {
        document
          .querySelector(`${accountDropdownSelector}>div:first-child>button`)
          .click();
      }, accountDropdownSelector);
      await page.waitForTimeout(1500);
    }
  }

  // Press deploy (type cmd+d), wait
  // Press save (click save), wait
  await page.evaluate(() => {
    const saveButton = document.evaluate(
      `//button[text()='Save' and contains(concat(' ', @class, ' '), ' v-button ')]`,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    ).singleNodeValue;
    saveButton.click();
  });
  await page.waitForTimeout(1000);
}
