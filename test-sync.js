import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config({ path: '.env' });

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function run() {
  console.log("Fetching Ajwain Honey...");
  const { data: p } = await supabase.from('products').select('*').eq('slug', 'ajwain-honey').single();
  if (!p) {
    console.log("Product not found.");
    return;
  }
  
  const originalKey = p.image_key;
  const newKey = "test-image-key-" + Date.now();
  console.log(`Original image_key: ${originalKey}`);
  console.log(`Setting new image_key: ${newKey}`);
  
  await supabase.from('products').update({ image_key: newKey }).eq('id', p.id);
  
  console.log("Waiting 30 seconds to see if background sync overwrites it...");
  await new Promise(r => setTimeout(r, 30000));
  
  const { data: p2 } = await supabase.from('products').select('*').eq('id', p.id).single();
  console.log(`After 30s image_key: ${p2.image_key}`);
  
  if (p2.image_key === newKey) {
    console.log("SUCCESS: Image key remained! No automatic overwrite happened in the database.");
  } else {
    console.log("FAILED: Image key was overwritten!");
  }
  
  // Revert
  await supabase.from('products').update({ image_key: originalKey }).eq('id', p.id);
}

run();
