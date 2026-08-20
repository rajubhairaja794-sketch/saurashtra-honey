import { createClient } from '@supabase/supabase-js';
const SUPABASE_URL = process.env.VITE_SUPABASE_URL as string;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY as string;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function run() {
  const { data, error } = await supabase.from('products').select('image_url, images, updated_at').eq('slug', 'ajwain-honey').single();
  console.log("DB RECORD:", JSON.stringify(data, null, 2));
}
run();
