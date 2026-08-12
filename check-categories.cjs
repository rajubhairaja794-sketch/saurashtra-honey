const fs = require('fs');

async function check() {
  const envFile = fs.readFileSync('.env', 'utf8');
  const getEnv = (key) => {
    const match = envFile.match(new RegExp(`^${key}="?([^"\\n]+)"?`, 'm'));
    return match ? match[1] : null;
  };

  const url = getEnv('SUPABASE_URL');
  const key = getEnv('SUPABASE_SERVICE_ROLE_KEY');
  const headers = { apikey: key, Authorization: `Bearer ${key}` };

  const catsRes = await fetch(`${url}/rest/v1/categories?select=*`, { headers });
  const cats = await catsRes.json();
  
  const prodsRes = await fetch(`${url}/rest/v1/products?select=id,name,category,category_id`, { headers });
  const prods = await prodsRes.json();

  console.log("--- CATEGORIES ---");
  console.log(cats);
  
  console.log("\n--- PRODUCTS ---");
  console.log(prods.map(p => ({ id: p.id, name: p.name, category: p.category, category_id: p.category_id })));
}

check().catch(console.error);
