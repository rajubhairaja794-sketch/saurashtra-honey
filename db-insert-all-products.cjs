const fs = require('fs');

async function fix() {
  const envFile = fs.readFileSync('.env', 'utf8');
  const getEnv = (key) => {
    const match = envFile.match(new RegExp(`^${key}="?([^"\\n]+)"?`, 'm'));
    return match ? match[1] : null;
  };

  const url = getEnv('SUPABASE_URL');
  const key = getEnv('SUPABASE_SERVICE_ROLE_KEY');

  console.log("Checking if all-products exists...");
  const checkRes = await fetch(`${url}/rest/v1/categories?slug=eq.all-products`, {
    headers: { apikey: key, Authorization: `Bearer ${key}` }
  });
  const check = await checkRes.json();

  if (check.length === 0) {
    console.log("Inserting all-products category...");
    const insRes = await fetch(`${url}/rest/v1/categories`, {
      method: 'POST',
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        slug: 'all-products',
        name: 'All Products',
        sort_order: 0,
        active: true
      })
    });
    console.log("Insert status:", insRes.status);
  } else {
    console.log("all-products already exists.");
  }
}

fix().catch(console.error);
