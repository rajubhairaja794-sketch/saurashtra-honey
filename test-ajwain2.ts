import { createClient } from '@supabase/supabase-js';
const supabase = createClient(process.env.VITE_SUPABASE_URL as string, process.env.VITE_SUPABASE_PUBLISHABLE_KEY as string);
async function run() {
  const { data, error } = await supabase.from('products').select('*').eq('slug', 'ajwain-honey').single();
  console.log(JSON.stringify(data, null, 2), error);
}
run();
