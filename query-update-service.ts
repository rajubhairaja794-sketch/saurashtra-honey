import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://lxdkcqdkfuuqjudsysrr.supabase.co", 
  "sb_secret_cqNX4_QC1ds9g5mro5pVJA_DKEZguTf"
);

async function run() {
  const { data: before, error: beforeErr } = await supabase.from('products').select('id, name, image_url, images, updated_at').eq('slug', 'ajwain-honey');
  console.log("BEFORE ERR:", beforeErr);
  console.log("SNAPSHOT A:", JSON.stringify(before, null, 2));
}
run();
