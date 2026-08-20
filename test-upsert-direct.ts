import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';

const supabase = createClient(process.env.VITE_SUPABASE_URL as string, process.env.VITE_SUPABASE_PUBLISHABLE_KEY as string);
const SUPABASE_SERVICE_ROLE = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

// Use Service Role to bypass RLS for debugging
const adminSupabase = SUPABASE_SERVICE_ROLE 
  ? createClient(process.env.VITE_SUPABASE_URL as string, SUPABASE_SERVICE_ROLE) 
  : supabase;

async function run() {
  const { data: prod } = await adminSupabase.from('products').select('*').eq('slug', 'ajwain-honey').single();
  if (!prod) return console.log("Not found");
  
  const payload = {
    ...prod,
    images: ["https://lxdkcqdkfuuqjudsysrr.supabase.co/storage/v1/object/public/media/products/test-direct.png"],
    image_url: "https://lxdkcqdkfuuqjudsysrr.supabase.co/storage/v1/object/public/media/products/test-direct.png"
  };
  
  const { id, ...rest } = payload;
  
  console.log("UPDATING with:", JSON.stringify(rest.images));
  
  const { data: updated, error } = await adminSupabase
    .from("products")
    .update(rest)
    .eq("id", id)
    .select("id, image_url, images")
    .single();
    
  console.log("RESULT:", JSON.stringify(updated, null, 2), error);
}
run();
