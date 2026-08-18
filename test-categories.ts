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

const supabaseUrl = env.VITE_SUPABASE_URL || env.SUPABASE_URL;
const supabaseKey = env.VITE_SUPABASE_PUBLISHABLE_KEY || env.SUPABASE_PUBLISHABLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false }
});

async function run() {
  console.log("=== Database Categories ===");
  // Note: RLS on categories table has been tricky, let's use the REST endpoint via fetch using the key
  const resDb = await fetch(`${supabaseUrl}/rest/v1/categories?select=slug,image_url`, {
    headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
    }
  });
  if (resDb.ok) {
      console.log(await resDb.json());
  } else {
      console.log("DB fetch failed:", resDb.status, await resDb.text());
  }

  console.log("=== Cache Categories JSON ===");
  const resCache = await fetch(`${supabaseUrl}/storage/v1/object/public/media/public_cache/categories.json?t=` + Date.now());
  if (resCache.ok) {
      const data = await resCache.json();
      console.log(data.map((c: any) => ({ slug: c.slug, image_url: c.image_url })));
  } else {
      console.log("Cache fetch failed:", resCache.status, await resCache.text());
  }
}

run();
