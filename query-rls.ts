import { createClient } from "@supabase/supabase-js";
const supabase = createClient("https://lxdkcqdkfuuqjudsysrr.supabase.co", "sb_publishable_E3rv2tJCU_jTt1wL_TyWDQ_u1_9ztgY");

async function run() {
  const { data, error } = await supabase.from('products').select('*').limit(1);
  console.log(Object.keys(data?.[0] || {}).join(", "));
}
run();
