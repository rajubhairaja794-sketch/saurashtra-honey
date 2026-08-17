import puppeteer from 'puppeteer';

async function runTest() {
  console.log("Starting Puppeteer...");
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  const getFrontendCategories = async () => {
    return await page.evaluate(() => {
      const h2s = Array.from(document.querySelectorAll('h2'));
      const targetH2 = h2s.find(h2 => h2.textContent?.includes("Explore Our World"));
      if (targetH2) {
        const section = targetH2.closest('section');
        if (section) {
          const sectionLinks = Array.from(section.querySelectorAll('a[href^="/shop"]'));
          if (sectionLinks.length > 0) {
            return sectionLinks.map(a => a.querySelector('h3')?.textContent?.trim() || '').filter(Boolean);
          }
        }
      }
      return [];
    });
  };

  console.log("1. Navigating to frontend...");
  await page.goto('http://localhost:8081/', { waitUntil: 'networkidle2' });
  let initialCategories = await getFrontendCategories();
  console.log("Initial Frontend Categories:", initialCategories);

  console.log("2. Logging into Admin...");
  await page.goto('http://localhost:8081/admin', { waitUntil: 'networkidle2' });
  
  await page.waitForSelector('input[type="email"]');
  await page.type('input[type="email"]', 'founder@saurashtrahoney.com');
  await page.type('input[type="password"]', '123456');
  
  // Login
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const login = btns.find(b => b.textContent?.includes('LOG IN'));
    if (login) login.click();
  });
  
  console.log("Waiting for dashboard...");
  await page.waitForSelector('a[href="/admin/homepage/categories"]', { timeout: 10000 });
  console.log("Logged in!");

  console.log("3. Navigating to Homepage Categories...");
  await page.goto('http://localhost:8081/admin/homepage/categories', { waitUntil: 'networkidle2' });
  await page.waitForSelector('select');

  // Add "All Products"
  console.log("Adding 'All Products' category to homepage...");
  await page.evaluate(() => {
    const select = document.querySelector('select');
    if (select) {
      select.value = 'all-products';
      select.dispatchEvent(new Event('change', { bubbles: true }));
    }
  });
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const addBtn = btns.find(b => b.textContent?.includes('ADD CATEGORY'));
    if (addBtn) addBtn.click();
  });
  await page.waitForTimeout(1000);

  // Add "Honey"
  console.log("Adding 'Honey' category to homepage...");
  await page.evaluate(() => {
    const select = document.querySelector('select');
    if (select) {
      select.value = 'honey';
      select.dispatchEvent(new Event('change', { bubbles: true }));
    }
  });
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const addBtn = btns.find(b => b.textContent?.includes('ADD CATEGORY'));
    if (addBtn) addBtn.click();
  });
  await page.waitForTimeout(1000);

  console.log("Saving Categories...");
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const saveBtn = btns.find(b => b.textContent?.includes('SAVE CATEGORIES'));
    if (saveBtn) saveBtn.click();
  });
  await page.waitForTimeout(2000);

  console.log("4. Verifying on Frontend...");
  await page.goto('http://localhost:8081/', { waitUntil: 'networkidle2' });
  let newCategories = await getFrontendCategories();
  console.log("New Frontend Categories:", newCategories);

  if (newCategories.length === 2 && newCategories[0] === "All Products" && newCategories[1] === "Honey") {
    console.log("✅ TEST 1 PASSED: Added categories appear on frontend in exact order!");
  } else {
    console.log("❌ TEST 1 FAILED: Frontend categories do not match what was added.");
  }

  console.log("5. Testing removal...");
  await page.goto('http://localhost:8081/admin/homepage/categories', { waitUntil: 'networkidle2' });
  await page.waitForSelector('select');

  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const removeBtn = btns.find(b => b.textContent?.includes('REMOVE'));
    if (removeBtn) removeBtn.click();
  });
  await page.waitForTimeout(500);

  console.log("Saving Categories...");
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const saveBtn = btns.find(b => b.textContent?.includes('SAVE CATEGORIES'));
    if (saveBtn) saveBtn.click();
  });
  await page.waitForTimeout(2000);

  console.log("6. Verifying removal on Frontend...");
  await page.goto('http://localhost:8081/', { waitUntil: 'networkidle2' });
  let finalCategories = await getFrontendCategories();
  console.log("Final Frontend Categories:", finalCategories);

  if (finalCategories.length === 1 && finalCategories[0] === "Honey") {
    console.log("✅ TEST 2 PASSED: Removed category disappeared from frontend!");
  } else {
    console.log("❌ TEST 2 FAILED: Frontend categories did not reflect removal.");
  }

  await browser.close();
  console.log("Test suite completed.");
}

runTest().catch(console.error);
