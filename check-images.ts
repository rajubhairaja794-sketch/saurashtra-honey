import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const envFile = fs.readFileSync('.env', 'utf-8');
const env = Object.fromEntries(
  envFile.split('\n')
    .filter(line => line.includes('='))
    .map(line => {
      const idx = line.indexOf('=');
      const key = line.slice(0, idx).trim();
      let val = line.slice(idx + 1).trim();
      if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
      return [key, val];
    })
);

// Frontend uses VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY
const supabaseUrl = env.VITE_SUPABASE_URL || env.SUPABASE_URL;
const supabaseKey = env.VITE_SUPABASE_PUBLISHABLE_KEY || env.SUPABASE_PUBLISHABLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false }
});

async function run() {
  console.log("=== Products ===");
  const { data: prods, error: errProds } = await supabase.from('products').select('slug, name, image_key, image_url, images, updated_at');
  if (errProds) console.error("Prods Err:", errProds);
  if (prods) {
    const customImages = prods.filter(p => p.image_url || p.images?.length > 0 || (p.image_key && p.image_key.includes('/')));
    console.log(`Total products: ${prods.length}. Products with custom images: ${customImages.length}`);
    for (const p of customImages.slice(0, 10)) {
      console.log(`Product: ${p.name} (${p.slug})`);
      console.log(`  image_key:`, p.image_key);
      console.log(`  image_url:`, p.image_url);
      console.log(`  images:`, p.images);
      console.log('---');
    }
  }

  console.log("=== Categories ===");
  const { data: cats, error: errCats } = await supabase.from('categories').select('slug, name, image_url');
  if (errCats) console.error("Cats Err:", errCats);
  if (cats) {
    const customCats = cats.filter(c => c.image_url);
    console.log(`Total categories: ${cats.length}. Custom: ${customCats.length}`);
    for (const c of customCats.slice(0, 10)) {
        console.log(`Category: ${c.name} (${c.slug})`);
        console.log(`  image_url:`, c.image_url);
        console.log('---');
    }
  }
}

run();
