import fs from 'fs';

const envFile = fs.readFileSync('.env', 'utf-8');
const env = Object.fromEntries(
  envFile.split('\n')
    .filter(line => line.includes('='))
    .map(line => {
      const idx = line.indexOf('=');
      const key = line.slice(0, idx).trim();
      const val = line.slice(idx + 1).replace(/"/g, '').trim();
      return [key, val];
    })
);

process.env.VITE_SUPABASE_URL = env.VITE_SUPABASE_URL;
process.env.VITE_SUPABASE_PUBLISHABLE_KEY = env.VITE_SUPABASE_PUBLISHABLE_KEY;

// Patch global fetch for Supabase
function isNewSupabaseApiKey(value) {
  return value.startsWith('sb_publishable_') || value.startsWith('sb_secret_');
}

const originalFetch = global.fetch;
global.fetch = async (input, init) => {
  if (typeof input === 'string' && input.includes('supabase.co')) {
    const headers = new Headers(init?.headers);
    const key = env.VITE_SUPABASE_PUBLISHABLE_KEY;
    if (isNewSupabaseApiKey(key) && headers.get('Authorization') === `Bearer ${key}`) {
      headers.delete('Authorization');
    }
    headers.set('apikey', key);
    return originalFetch(input, { ...init, headers });
  }
  return originalFetch(input, init);
};

import { fetchShopCategories } from './src/lib/category-catalog';
import { fetchAllHomepageCategories } from './src/lib/homepage-cms.functions';

async function diagnose() {
  console.log("Diagnosing categories...");
  const shopCats = await fetchShopCategories();
  console.log(`fetchShopCategories returned ${shopCats.length} categories.`);
  console.log(shopCats.map(c => c.name));

  const homeCats = await fetchAllHomepageCategories();
  console.log(`fetchAllHomepageCategories returned ${homeCats.length} categories.`);
  console.log(homeCats.map(c => c.category_slug));
}

diagnose().catch(console.error);
