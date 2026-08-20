import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.VITE_SUPABASE_URL as string, 
  process.env.SUPABASE_SERVICE_ROLE_KEY as string, 
  { auth: { persistSession: false } }
);

async function run() {
  const { data, error } = await supabaseAdmin.from("hero_slides").select("*").limit(1);
  console.log("Admin Error:", error);
  console.log("Admin Data Length:", data?.length);
}
run();
