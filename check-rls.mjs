import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);
async function run() {
    const { data, error } = await supabase.from('products').select('id,slug,published');
    console.log("Anon Read:", data ? data.length : 0, error ? error.message : '');
    
    // Test with admin key
    const admin = createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY);
    const { data: d2, error: e2 } = await admin.from('products').select('id,slug,published');
    console.log("Admin Read:", d2 ? d2.length : 0, e2 ? e2.message : '');
}
run();
