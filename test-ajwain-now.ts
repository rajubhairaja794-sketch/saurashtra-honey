import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function runTest() {
  const { data: before, error: err1 } = await supabase.from('products').select('*').eq('slug', 'ajwain-honey').single();
  if (err1) {
    console.error("Fetch error:", JSON.stringify(err1, null, 2));
    return;
  }
}
runTest();
