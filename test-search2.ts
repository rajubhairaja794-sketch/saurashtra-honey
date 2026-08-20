import { createClient } from '@supabase/supabase-js';
const supabase = createClient(process.env.VITE_SUPABASE_URL as string, process.env.VITE_SUPABASE_PUBLISHABLE_KEY as string);
async function run() {
  const { data, error } = await supabase.from('products').select('id, slug, name, images');
  const found = data?.filter(p => p.images && Array.isArray(p.images) && p.images.some((img: string) => img.startsWith('http')));
  console.log("Products with http in images:", JSON.stringify(found, null, 2));
}
run();
