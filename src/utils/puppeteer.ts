import puppeteer from 'puppeteer-core';
import findChrome from 'chrome-finder';
const chromePath = findChrome();

export async function launch({ headless = true }) {
  const browser = await puppeteer.launch({
    headless,
    executablePath: chromePath,
  });
  return browser;
}
