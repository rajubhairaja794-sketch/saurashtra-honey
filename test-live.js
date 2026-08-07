const { chromium } = require('@playwright/test');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log('BROWSER_CONSOLE:', msg.text()));
  page.on('pageerror', error => console.log('BROWSER_ERROR:', error.message));
  
  await page.goto('https://saurastra.netlify.app/');
  
  // Wait a bit to let it render
  await page.waitForTimeout(3000);
  
  const content = await page.content();
  if (content.includes("This page didn't load")) {
    console.log("Found error text on page!");
  } else {
    console.log("No error text found on page.");
  }
  
  await browser.close();
})();
