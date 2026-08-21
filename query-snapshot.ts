import { createClient } from "@supabase/supabase-js";
const supabase = createClient("https://lxdkcqdkfuuqjudsysrr.supabase.co", "sb_publishable_E3rv2tJCU_jTt1wL_TyWDQ_u1_9ztgY");

async function run() {
  const { data } = await supabase.from('products').select('id, name, image_url, images, updated_at').eq('slug', 'ajwain-honey');
  console.log("SNAPSHOT:", JSON.stringify(data, null, 2));
}
run();
