import { createClient } from '@supabase/supabase-js';
const SUPABASE_URL = process.env.VITE_SUPABASE_URL as string;
const SUPABASE_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function run() {
  const { data, error } = await supabase.from('products').select('slug, image_url, updated_at');
  console.log("ALL URLS:", data?.map(d => d.image_url));
}
run();
