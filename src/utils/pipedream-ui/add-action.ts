import { Page } from 'puppeteer-core';
import { aOrAn } from '../text';
import { xPathExpression } from '../xpath';

interface AddActionOptions {
  action: string;
  app: string;
  accountName?: string;
  selectAccount?: boolean;
  versionType?: 'MY ACTION' | 'BETA' | '';
}

export async function addAction(
  page: Page,
  { action, app, accountName, selectAccount, versionType = 'MY ACTION' }: AddActionOptions
) {
  await page.waitForTimeout(500);
  const addStepSelector = 'a[data-pd-t="add cell"]';
  await page.waitForSelector(addStepSelector);

  // Click on last add step button on page, wait
  await page.$$eval(addStepSelector,
    elements => {
      const addStepAnchor = elements[elements.length - 1] as HTMLAnchorElement;
      addStepAnchor.click();
    });
  await page.waitForTimeout(2000);

  const searchAppSelector = '[placeholder="Search for an app"]';
  await page.waitForSelector(searchAppSelector);
  // Enter app name in "Search for an App", wait
  await page.click(searchAppSelector);
  await page.waitForTimeout(100);
  await page.type(searchAppSelector, app);
  await page.waitForTimeout(2500);

  const appButtonSelector = `//div[text()='${app}' and contains(concat(' ', @class, ' '), ' flex-grow ')]`;
  await page.waitForXPath(appButtonSelector);
  // Click on App with correct name, wait
  await page.evaluate(appButtonSelector => {
    const appButton = document.evaluate(
      appButtonSelector,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    ).singleNodeValue as HTMLDivElement;
    if (!appButton) {
      throw new Error('App button is not found');
    }
    appButton.click();
  }, appButtonSelector);
  await page.waitForTimeout(100);

  const aOrAnAppName = aOrAn(app);
  const searchActionSelector = `[placeholder="Search for ${aOrAnAppName} action"]`;
  await page.waitForSelector(searchActionSelector);
  // Enter action name in "Search for a <App> action", wait
  await page.click(searchActionSelector);
  await page.waitForTimeout(100);
  await page.type(searchActionSelector, action);
  await page.waitForTimeout(1500);

  // Click on issue with correct name, wait
  await page.evaluate(
    async (actionExpr, app, versionType) => {
      const startTime = Date.now();
      function sleep(ms: number) {
        return new Promise(resolve => {
          setTimeout(resolve, ms);
        });
      }

      let actionButton: HTMLDivElement | HTMLButtonElement | null = null;

      const actionButtonXPath = `//button[contains(concat(' ', @class, ' '), ' mb-1 bg-grey-lightest ')
      and descendant::div[text()=${actionExpr}]
      ${versionType ? ` and ./div[contains(text(), '${versionType}')]` : ''}]`;
      let currentTime = Date.now();
      while (currentTime - startTime < 300000) {
        actionButton = document.evaluate(
          actionButtonXPath,
          document,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          null
        ).singleNodeValue as HTMLButtonElement;
        if (actionButton) {
          break;
        }
        // Click load more actions
        // bg-grey-lightest rounded-sm text-bluegrey-dark
        const loadMoreActionsButton = document.evaluate(
          `//div[text()='Load more ${app} actions' and contains(concat(' ', @class, ' '), ' ml-1 ')]`,
          document,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          null
        ).singleNodeValue as HTMLDivElement;
        if (!loadMoreActionsButton) {
          throw new Error('Load more actions button is not found');
        }
        loadMoreActionsButton.click();
        /* eslint-disable-next-line no-await-in-loop */
        await sleep(150);
        currentTime = Date.now();
      }
      if (!actionButton) {
        throw new Error('Action button is not found');
      }
      actionButton.click();
    },
    xPathExpression(action),
    app,
    versionType
  );
  await page.waitForTimeout(3000);

  // Click on first button in dropdown (div.class="drop-down-content" -> button.class="mt-qr"), wait
  if (accountName) {
    await page.evaluate(accountNameExpr => {
      const accountButton = document.evaluate(
        `//span[text()=${accountNameExpr} and contains(concat(' ', @class, ' '), ' mr-1 ')]`,
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      ).singleNodeValue as HTMLSpanElement;
      if (!accountButton) {
        throw new Error('Account button is not found');
      }
      accountButton.click();
    }, xPathExpression(accountName));
    await page.waitForTimeout(1500);
  } else if (selectAccount) {
    const accountDropdownSelector =
        '.drop-down-content.fixed>.bg-white.w-40.border-blue-dark';
    const dropdownChildCount = await page.evaluate(
      accountDropdownSelector => {
        return document.querySelector(accountDropdownSelector)
          .childElementCount;
      },
      accountDropdownSelector
    );
      // If account dropdown has greater than 2 children, an account has been connected for the app
    if (dropdownChildCount > 2) {
      // Click on first element in dropdown, the connected account
      // await page.click('.drop-down-content>.bg-white>div:first-child>button');
      await page.evaluate(accountDropdownSelector => {
        const accountButton = document.querySelector<HTMLButtonElement>(
          `${accountDropdownSelector}>div:first-child>button`
        );
        if (!accountButton) {
          throw new Error('Account button is not found');
        }
        accountButton.click();
      }, accountDropdownSelector);
      await page.waitForTimeout(1500);
    }
  }
  return page;
}
