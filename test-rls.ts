import { createClient } from '@supabase/supabase-js';
const supabase = createClient(process.env.VITE_SUPABASE_URL as string, process.env.VITE_SUPABASE_PUBLISHABLE_KEY as string);
async function run() {
  const { data, error } = await supabase.rpc('get_policies'); // Supabase doesn't have this by default, but let's query pg_policies using service role
  console.log(error);
}
run();
