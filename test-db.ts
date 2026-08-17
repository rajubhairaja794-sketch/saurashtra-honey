import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

function isNewSupabaseApiKey(value) {
  return value.startsWith('sb_publishable_') || value.startsWith('sb_secret_');
}

function createSupabaseFetch(supabaseKey) {
  return (input, init) => {
    const headers = new Headers(
      typeof Request !== 'undefined' && input instanceof Request ? input.headers : undefined,
    );

    if (init?.headers) {
      new Headers(init.headers).forEach((value, key) => headers.set(key, value));
    }

    if (isNewSupabaseApiKey(supabaseKey) && headers.get('Authorization') === `Bearer ${supabaseKey}`) {
      headers.delete('Authorization');
    }

    headers.set('apikey', supabaseKey);
    return fetch(input, { ...init, headers });
  };
}


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

const supabase = createClient(
  env.VITE_SUPABASE_URL,
  env.VITE_SUPABASE_PUBLISHABLE_KEY,
  {
    global: {
      fetch: createSupabaseFetch(env.VITE_SUPABASE_PUBLISHABLE_KEY),
    }
  }
);

async function checkDB() {
  console.log('--- ADMIN SELECTIONS (homepage_category_selection) ---');
  const { data: sel, error: errSel } = await supabase.from('homepage_category_selection').select('*').order('sort_order', { ascending: true });
  console.log(sel);
  if (errSel) console.error(errSel);

  console.log('\n--- CATEGORIES TABLE ---');
  const { data: cat, error: errCat } = await supabase.from('categories').select('*');
  console.log(cat);
  if (errCat) console.error(errCat);
}

checkDB();
