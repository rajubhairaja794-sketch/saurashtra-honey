import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
const envFile = fs.readFileSync('.env', 'utf-8');
const lines = envFile.split('\n');
let url = '', key = '';
for (const line of lines) {
  if (line.startsWith('VITE_SUPABASE_URL=')) url = line.split('=')[1].trim().replace(/"/g, '');
  if (line.startsWith('VITE_SUPABASE_PUBLISHABLE_KEY=')) key = line.split('=')[1].trim().replace(/"/g, '');
}
const supabase = createClient(url, key);
async function run() {
  const { data, error } = await supabase.rpc("recent_public_orders", { _limit: 2 });
  console.log("Anon result:", error ? error.message : data);
}
run();
