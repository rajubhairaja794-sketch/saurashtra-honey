import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.VITE_SUPABASE_URL as string, process.env.VITE_SUPABASE_PUBLISHABLE_KEY as string);

async function run() {
  const { data, error } = await supabase.rpc('execute_sql', { query: 'SELECT * FROM pg_policies WHERE tablename = \'hero_slides\'' });
  console.log("Policies:", data || error);
}
run();
