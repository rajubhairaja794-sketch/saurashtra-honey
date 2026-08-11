import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
const envFile = fs.readFileSync('.env', 'utf-8');
const lines = envFile.split('\n');
let url = '';
let key = '';
for (const line of lines) {
  if (line.startsWith('VITE_SUPABASE_URL=')) url = line.split('=')[1].trim().replace(/"/g, '');
  if (line.startsWith('VITE_SUPABASE_PUBLISHABLE_KEY=')) key = line.split('=')[1].trim().replace(/"/g, '');
}
const supabase = createClient(url, key);

async function run() {
  const { data, error } = await supabase
      .from("hero_slides")
      .select("*")
      .eq("page", "home")
      .eq("active", true)
      .order("sort_order", { ascending: true });
  console.log("Error:", error);
  console.log("Data length:", data ? data.length : 0);
}
run();
