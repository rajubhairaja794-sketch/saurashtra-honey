import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://lxdkcqdkfuuqjudsysrr.supabase.co";
const supabaseKey = "sb_secret_cqNX4_QC1ds9g5mro5pVJA_DKEZguTf";

const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  const { data, error } = await supabase.from('hero_slides').select('*');
  console.log("Error:", error);
  console.log("Data:", JSON.stringify(data, null, 2));
}

check();
