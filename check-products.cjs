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
  
  const prodsRes = await fetch(`${url}/rest/v1/products?select=id,name,category`, { headers });
  const prods = await prodsRes.json();

  console.log(prods);
}
check().catch(console.error);
