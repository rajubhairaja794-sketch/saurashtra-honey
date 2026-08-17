import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const env = fs.readFileSync('.env', 'utf-8');
const VITE_SUPABASE_URL = env.match(/VITE_SUPABASE_URL="(.*)"/)?.[1] || '';
const SUPABASE_SERVICE_ROLE_KEY = env.match(/SUPABASE_SERVICE_ROLE_KEY=(.*)/)?.[1] || '';

const supabase = createClient(VITE_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
  global: {
    headers: {
      apikey: SUPABASE_SERVICE_ROLE_KEY
    }
  }
});

async function main() {
  const { data, error } = await supabase.from('categories').select('*').order('sort_order', { ascending: true });
  if (error) {
    console.error("Error:", error);
  } else {
    console.log("Categories:", JSON.stringify(data, null, 2));
  }
}

main();
