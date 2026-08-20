import { createClient } from '@supabase/supabase-js';
const supabase = createClient(process.env.VITE_SUPABASE_URL as string, process.env.VITE_SUPABASE_PUBLISHABLE_KEY as string);
async function run() {
  const { data, error } = await supabase.rpc('exec_sql', { sql_query: "SELECT 1" });
  console.log(data, error);
}
run();
