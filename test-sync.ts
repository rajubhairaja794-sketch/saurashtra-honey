import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.VITE_SUPABASE_ANON_KEY!
);

async function run() {
  console.log("Fetching Ajwain Honey...");
  const { data: p, error } = await supabase.from('products').select('*').eq('slug', 'ajwain-honey').single();
  
  if (error || !p) {
    console.error("Error fetching product:", error);
    return;
  }
  
  const originalKey = p.image_key;
  const newKey = "test-image-key-" + Date.now();
  console.log(`Original image_key: ${originalKey}`);
  console.log(`Setting new image_key: ${newKey}`);
  
  await supabase.from('products').update({ image_key: newKey }).eq('id', p.id);
  
  console.log("Waiting 60 seconds for background sync...");
  let ticks = 0;
  const interval = setInterval(() => {
    ticks += 10;
    process.stdout.write(ticks + "s... ");
  }, 10000);
  
  await new Promise(r => setTimeout(r, 60000));
  clearInterval(interval);
  console.log("\nChecking database again...");
  
  const { data: p2 } = await supabase.from('products').select('*').eq('id', p.id).single();
  console.log(`After 60s image_key: ${p2.image_key}`);
  
  if (p2.image_key === newKey) {
    console.log("✅ SUCCESS: Image key remained! No automatic overwrite happened in the database.");
  } else {
    console.log("❌ FAILED: Image key was overwritten! " + p2.image_key);
  }
  
  // Revert back
  await supabase.from('products').update({ image_key: originalKey }).eq('id', p.id);
  console.log("Reverted to original.");
}
run();
