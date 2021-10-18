const PIPEDREAM_LOGIN_URL = 'https://pipedream.com/auth/login';

export async function signin(page, { username, password }) {
  await page.goto(PIPEDREAM_LOGIN_URL);

  // Sign in
  await page.type('[placeholder="Email (or username)"]', username);
  await page.type('[placeholder="Password"]', password);
  await page.waitForTimeout(100);
  await page.click('[data-pd-t="sign in with password"]');

  await page.waitForNavigation();
  await page.waitForTimeout(1000);
}
