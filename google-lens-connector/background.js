chrome.commands.onCommand.addListener(async (command) => {
  switch (command) {
    case 'switch_google_lens':
      switchToGoogleLensAndPasteContent()
      break;
  }
})

async function switchToGoogleLensAndPasteContent() {
  const tabs = await chrome.tabs.query({})
  let lens;
  const lensTabs = tabs.filter((tab) => tab.title.toLowerCase().includes('google lens'))
  if (lensTabs.length > 0) {
    // prefer the active if there is one
    if (lensTabs.some(tab => tab.active)) {
      lens = lensTabs.find(tab => tab.active)
    }
    else {
      lens = lensTabs.pop() // get the last one
    }
    // focus the window
    await chrome.windows.update(lens.windowId, { focused: true })
    // and focus the tab
    await chrome.tabs.update(lens.id, { active: true })
  }
  else {
    // or else we open the tab
    lens = await createTab('https://lens.google.com/search?p=ASQ0Rg2uxTXSxQvsyPkGYn21rwDt8WAUbrd5ZtAYvZ5awjMgJ6l_qdDtA1eFa5RaK1pA0sTpvavFoySSDTMJMpNCS07sZO7KiBIBYRR-GuSCTlQHxVrTKeUmPM1Szc9AJe01JMOwj7pw2ehbpviCe4E4EhTHM8lbhZLb9-sNL3RQT_MHdg-w9tbWWA0PwYR9CiwH3QWhik5tp663ZYPYPdFr1qXLKFG2OVSzUdeXtqkMuq-4_t48oRZ_VlUQLN_LfD12KeF56qeC78_nzTdMlV8z7Ed-TLMJdOJwtEqzPZwrpZFaAWf038u0PrF7&s&ep=cnts#lns=W251bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsIkVpWUtKREZpT0dJek9UWmpMVEJsTkdNdE5EQXdaUzFpWmpVekxXSmxZV1UzTm1FeE9UYzFOdz09IixbWzUzLDQ1XV0sbnVsbCxudWxsLDJd')
    await new Promise(r => setTimeout(r, 1500))
  }


  /* inject paste emulation script */
  await chrome.scripting.executeScript({
    target: { tabId: lens.id },
    world: 'MAIN',
    func: function () {
      // window.location.hash = 'shouldFocus'
      // wait a little that puppeteer clicks on the page
      window.pasteContent()
      return
      setTimeout(() => {
        pasteContent()
      }, 250)
    }
  })
}


async function createTab (url) {
  return await chrome.tabs.create({ url })
}
