const fs = require('fs');

async function fix() {
  const envFile = fs.readFileSync('.env', 'utf8');
  const getEnv = (key) => {
    const match = envFile.match(new RegExp(`^${key}="?([^"\\n]+)"?`, 'm'));
    return match ? match[1] : null;
  };

  const url = getEnv('SUPABASE_URL');
  const key = getEnv('SUPABASE_SERVICE_ROLE_KEY');

  // Update Beeswax Candle to Beeswax Candles in categories
  console.log("Renaming Beeswax Candle -> Beeswax Candles in categories table...");
  const catRes = await fetch(`${url}/rest/v1/categories?slug=eq.beeswax-candle`, {
    method: 'PATCH',
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: 'Beeswax Candles' })
  });
  console.log(catRes.status);

  // Update products with legacy category names
  const legacyMap = {
    'Honey Comb': 'Honey',
    'Gift Packs': 'Honey',
    'Multiflora': 'Honey'
  };

  console.log("Reassigning legacy product categories...");
  for (const [oldCat, newCat] of Object.entries(legacyMap)) {
    const pRes = await fetch(`${url}/rest/v1/products?category=eq.${encodeURIComponent(oldCat)}`, {
      method: 'PATCH',
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ category: newCat })
    });
    console.log(`Updated ${oldCat} to ${newCat}:`, pRes.status);
  }

  console.log("Done.");
}

fix().catch(console.error);
