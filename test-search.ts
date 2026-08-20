import { createClient } from '@supabase/supabase-js';
const supabase = createClient(process.env.VITE_SUPABASE_URL as string, process.env.VITE_SUPABASE_PUBLISHABLE_KEY as string);
async function run() {
  const { data, error } = await supabase.from('products').select('id, slug, name, image_url, images').not('image_url', 'is', null);
  console.log("Products with image_url:", JSON.stringify(data, null, 2), error);
}
run();
