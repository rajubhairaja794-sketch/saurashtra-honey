import { createClient } from '@supabase/supabase-js';
const SUPABASE_URL = process.env.VITE_SUPABASE_URL as string;
const SUPABASE_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function run() {
  // Try to update with Anon key (will fail)
  const { error } = await supabase.from('products').update({ tagline: "Test" }).eq('slug', 'ajwain-honey');
  console.log("Anon update:", error?.message || "Success");
}
run();
