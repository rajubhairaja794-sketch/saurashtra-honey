import { createClient } from '@supabase/supabase-js';
const supabase = createClient(process.env.VITE_SUPABASE_URL as string, process.env.SUPABASE_SERVICE_ROLE_KEY as string);
async function run() {
  const { data, error } = await supabase.storage.from('media').list('products', { limit: 10, offset: 0 });
  console.log(data, error);
}
run();
