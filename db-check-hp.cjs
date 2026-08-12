const fs = require('fs');
async function fix() {
  const envFile = fs.readFileSync('.env', 'utf8');
  const getEnv = (key) => {
    const match = envFile.match(new RegExp(`^${key}="?([^"\\n]+)"?`, 'm'));
    return match ? match[1] : null;
  };
  const url = getEnv('SUPABASE_URL');
  const key = getEnv('SUPABASE_SERVICE_ROLE_KEY');
  const res = await fetch(`${url}/rest/v1/homepage_category_selection`, {
    headers: { apikey: key, Authorization: `Bearer ${key}` }
  });
  console.log(await res.json());
}
fix().catch(console.error);
