import { createClient } from '@supabase/supabase-js';
const supabase = createClient(process.env.VITE_SUPABASE_URL as string, process.env.VITE_SUPABASE_PUBLISHABLE_KEY as string);
async function run() {
  const { data, error } = await supabase.from('products').select('id, slug, updated_at, image_url, images').eq('slug', 'ajwain-honey');
  console.log(data, error);
}
run();
