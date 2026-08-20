import { createClient } from '@supabase/supabase-js';
const SUPABASE_URL = process.env.VITE_SUPABASE_URL as string;
const SUPABASE_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function run() {
  const { data, error } = await supabase.from('products').delete().neq('id', '00000000-0000-0000-0000-000000000000').select();
  console.log("Delete result:", data, error);
}
run();
