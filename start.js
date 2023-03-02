import puppeteer, { Browser } from 'puppeteer';
import path from 'path';
import { executablePath, extensions } from './config.js';
import { wait } from './util.js';

const __dirname = path.dirname(new URL(import.meta.url).pathname.slice(1));

const _extensions = [
  path.join(__dirname, '/google-lens-connector'),
  ...extensions,
];

const browser = await puppeteer.launch({
  headless: false,
  userDataDir: 'User Data',
  defaultViewport: null,
  executablePath,
  args: [
    '--start-maximized',
    `--disable-extensions-except=${_extensions.join(',')}`,
    `--load-extension=${_extensions.join(',')}`,
    '--autoplay-policy=no-user-gesture-required',
    // '--profile-directory="Profile 4"',
    '--disable-infobars',
    '--test-type',
  ],
  ignoreDefaultArgs: ['--enable-automation'],
});

/*
browser.on('targetchanged', async (target) => {
  try {
    const page = await target.page()
    const title = await page.title()
    const url = await page.url()
    // console.log(url)
    if (!title.includes('Google Lens')) {
      return
    }
    console.log(`${title} url has changed`)
    if (url.includes('shouldFocus')) {
      console.log('pasting content')
      await page.click('body > script')
      await page.bringToFront()
      await page.keyboard.down('Control')
      await page.keyboard.press('V')
      await page.keyboard.up('Control')
    }
    // page.bringToFront()
  }
  catch(e) {
    console.log(`oops not working (${e})`)
  }
})
*/

const onTargetEvent = async (target, type) => {
  console.log(`New target event (${type})`);
  try {
    if (target.hasPasteContentExposedFunction) {
      console.log('Already exposed, pass');
      return;
    }
    const page = await target.page();
    if (page == null) {
      console.log('not a page');
      return;
    }
    // await wait(2000)
    const url = await new Promise(async (resolve) => {
      let url;
      do {
        if (url) {
          await new Promise((r) => setTimeout(r, 100));
        }
        url = await page.url();
      } while (url === 'about:blank' || url === ':');
      resolve(url);
    });
    const title = await page.title();
    console.log(`url: "${url}"`);
    console.log('title: ', title);
    if (url.includes('lens.google.com')) {
      console.log('Exposition in progress');
      await page.exposeFunction('pasteContent', async () => {
        // await page.click('c-wiz')
        // await page.click('body')
        // await page.waitForNetworkIdle()
        // await page.bringToFront();
        await page.mouse.click(0, 0);
        await page.keyboard.down('Control');
        await page.keyboard.press('V');
        await page.keyboard.up('Control');
        for (let i = 0; i < 4; ++i) {
          await new Promise((r) => setTimeout(r, 500));
          page.bringToFront();
        }
      });
      target.hasPasteContentExposedFunction = true;
      return;
    }
    // if (title == 'Loading...') {
    //   page.close()
    // }
  } catch (e) {
    console.error(e);
  }
};

browser.on('targetcreated', (target) => onTargetEvent(target, 'created'));
browser.on('targetchanged', (target) => onTargetEvent(target, 'changed'));

const lensUrl =
  'https://lens.google.com/search?p=ASQ0Rg2uxTXSxQvsyPkGYn21rwDt8WAUbrd5ZtAYvZ5awjMgJ6l_qdDtA1eFa5RaK1pA0sTpvavFoySSDTMJMpNCS07sZO7KiBIBYRR-GuSCTlQHxVrTKeUmPM1Szc9AJe01JMOwj7pw2ehbpviCe4E4EhTHM8lbhZLb9-sNL3RQT_MHdg-w9tbWWA0PwYR9CiwH3QWhik5tp663ZYPYPdFr1qXLKFG2OVSzUdeXtqkMuq-4_t48oRZ_VlUQLN_LfD12KeF56qeC78_nzTdMlV8z7Ed-TLMJdOJwtEqzPZwrpZFaAWf038u0PrF7&s&ep=cnts';

const pages = await browser.pages();
pages[0].close();
const lensPage = await browser.newPage(lensUrl);
lensPage.goto(lensUrl);
