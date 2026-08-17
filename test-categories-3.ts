import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const env = fs.readFileSync('.env', 'utf-8');
const VITE_SUPABASE_URL = env.match(/SUPABASE_URL="(.*)"/)?.[1] || '';
const SUPABASE_SERVICE_ROLE_KEY = env.match(/SUPABASE_SERVICE_ROLE_KEY=(.*)/)?.[1] || '';

const supabase = createClient(VITE_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
  global: {
    fetch: (input, init) => {
      const headers = new Headers(init?.headers);
      headers.set('apikey', SUPABASE_SERVICE_ROLE_KEY);
      headers.delete('Authorization');
      return fetch(input, { ...init, headers });
    }
  }
});

async function main() {
  const { data, error } = await supabase.from('categories').select('*');
  console.log("Error:", error);
  console.log("Data:", data);
}

main();
