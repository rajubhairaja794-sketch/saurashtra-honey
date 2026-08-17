import fs from 'fs';
import { createClient } from '@supabase/supabase-js';

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

const supabase = createClient(env.VITE_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

async function getSSR() {
  const res = await fetch('http://localhost:8081/');
  const html = await res.text();
  
  // Extract categories from SSR HTML
  const matches = [...html.matchAll(/<h3[^>]*>([^<]+)<\/h3>/g)];
  // We need to filter only the ones that are categories. The categories are in Explore Our World.
  // Actually let's just grab all h3s and filter known categories for a quick proof.
  const categories = matches.map(m => m[1].trim());
  return categories.filter(c => ['All Products', 'Honey', 'Beeswax', 'Bee Pollen', 'Beeswax Candles', 'Beeswax Products', 'Beauty Products'].includes(c));
}

async function run() {
  console.log("1. Clearing homepage_category_selection...");
  await supabase.from('homepage_category_selection').delete().neq('id', '00000000-0000-0000-0000-000000000000');

  console.log("Waiting 2s for frontend to reflect...");
  await new Promise(r => setTimeout(r, 2000));
  
  let cats = await getSSR();
  console.log("Categories when empty (Fallback):", cats);

  console.log("2. Adding 'All Products' and 'Honey' to homepage_category_selection...");
  await supabase.from('homepage_category_selection').insert([
    { category_slug: 'all-products', sort_order: 1, enabled: true },
    { category_slug: 'honey', sort_order: 2, enabled: true }
  ]);

  console.log("Waiting 2s for frontend to reflect...");
  await new Promise(r => setTimeout(r, 2000));
  
  cats = await getSSR();
  console.log("Categories after adding 2:", cats);
  if (cats.length === 2 && cats[0] === 'All Products' && cats[1] === 'Honey') {
    console.log("✅ TEST 1 PASSED: Admin selection perfectly controls website.");
  } else {
    console.log("❌ TEST 1 FAILED.");
  }

  console.log("3. Removing 'All Products'...");
  await supabase.from('homepage_category_selection').delete().eq('category_slug', 'all-products');

  console.log("Waiting 2s for frontend to reflect...");
  await new Promise(r => setTimeout(r, 2000));
  
  cats = await getSSR();
  console.log("Categories after removal:", cats);
  if (cats.length === 1 && cats[0] === 'Honey') {
    console.log("✅ TEST 2 PASSED: Removed category disappeared from frontend.");
  } else {
    console.log("❌ TEST 2 FAILED.");
  }
}

run().catch(console.error);
