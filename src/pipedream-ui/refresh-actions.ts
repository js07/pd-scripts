import { Page } from 'puppeteer-core';
import { log } from '../utils/logger';
import { launch } from '../utils/puppeteer';
import { signin } from './signin';

export async function refreshActions(page: Page) {
  await page.waitForTimeout(500);
  const refreshButtonSelector =
    'button.group.v-button.relative.flex.flex-nowrap.items-center' +
    '.justify-center.border.border-solid.rounded.whitespace-nowrap.uppercase.h-3.w-3.mx-1.' +
    'rounded.hover_text-white.hover_bg-green.invisible.group-hover_visible.has-tooltip';
  await page.waitForSelector(refreshButtonSelector);

  await page.$$eval(refreshButtonSelector, async elements => {
    for (const element of elements) {
      (element as HTMLAnchorElement).click();
    }
  });
  await page.waitForTimeout(2000);

  return page;
}

interface RefreshWorkflowActionsOptions {
  url: string;
  headless?: boolean;
  username: string;
  password: string;
}

export async function refreshWorkflowActions({
  url,
  headless = true,
  username,
  password,
}: RefreshWorkflowActionsOptions) {
  const browser = await launch({ headless });
  const page = await browser.newPage();
  log('Signing in to Pipedream...');
  await signin(page, { username, password });

  await page.goto(url);
  await refreshActions(page);

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

  await browser.close();
}
