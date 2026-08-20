import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL as string, 
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY as string, 
  { auth: { persistSession: false } }
);

async function run() {
  const { data, error } = await supabase.from("products").select("id,slug,name,image_key,image_url,images").limit(3);
  console.log("Products Data:", JSON.stringify(data, null, 2));
}
run();
