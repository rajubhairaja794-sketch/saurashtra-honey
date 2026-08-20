import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;

console.log("URL:", supabaseUrl);
console.log("KEY prefix:", supabaseKey?.substring(0, 10));

const supabaseAdmin = createClient(supabaseUrl, supabaseKey, { auth: { persistSession: false } });

async function run() {
  const buf = Buffer.from("hello world", "utf-8");
  const path = `products/test_admin_upload_${Date.now()}.txt`;
  
  const up = await supabaseAdmin.storage
    .from("media")
    .upload(path, buf, { contentType: "text/plain", upsert: false });
    
  console.log("UPLOAD RESULT:", up.error ? up.error.message : "SUCCESS!");
}
run();
