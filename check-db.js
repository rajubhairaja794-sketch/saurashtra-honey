import { createClient } from '@supabase/supabase-js';
const supabase = createClient(
  process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);
async function check() {
  const { data: products, error } = await supabase.from('products').select('name, category');
  if (error) throw error;
  console.log(products);
}
check().catch(console.error);
