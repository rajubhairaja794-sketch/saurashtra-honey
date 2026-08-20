import { createClient } from '@supabase/supabase-js';
const supabase = createClient(process.env.VITE_SUPABASE_URL as string, process.env.VITE_SUPABASE_PUBLISHABLE_KEY as string);
async function run() {
  const { data: existingProd, error } = await supabase
    .from("products")
    .select("id")
    .eq("slug", "ajwain-honey")
    .maybeSingle();

  console.log("existingProd:", existingProd, "error:", error);
}
run();
