/**
 * Path to Google Chrome executable.
 * 
 * By default, puppeteer use a downloaded version of Chromium.
 * Leave blank, but if you need video support, write the path of your own Google Chrome executable,
 * Usually located there: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
 */
// export const executablePath = ''
export const executablePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'


/**
 * Array of extensions to add in your Chrome instance.
 *
 * E.g.
 * [
 *   'C:\\Users\\John\\gits\\my-extension',
 *   'C:\\Users\\John\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Extensions\\bgjfekefhjemchdeigphccilhncnjldn\\7.1.1355.1162_0'
 * ]
 *
 * Note: If you load an extension from AppData (like above) changing the settings of that extension won't affect
 * the settings in other Chrome instances where it is loaded. Puppeteer saves changes to its own data directory.
 */
export const extensions = [
];