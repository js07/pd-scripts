const puppeteer = require('puppeteer-core');
const findChrome = require('chrome-finder');
const chromePath = findChrome();

export async function launch({ headless = true }) {
  const browser = await puppeteer.launch({
    headless,
    executablePath: chromePath,
  });
  return browser;
}
