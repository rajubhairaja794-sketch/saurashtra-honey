import { createClient } from '@supabase/supabase-js';
const supabase = createClient(process.env.VITE_SUPABASE_URL as string, process.env.VITE_SUPABASE_PUBLISHABLE_KEY as string);
async function run() {
  const { data } = supabase.storage.from("media").getPublicUrl("products/test.png");
  console.log(data);
}
run();
