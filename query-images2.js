import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL;
const anonKey = process.env.SUPABASE_PUBLISHABLE_KEY;

async function run() {
  const client = createClient(url, anonKey);
  
  console.log("--- PRODUCTS (LATEST) ---");
  const { data: prods, error: err2 } = await client.from("products").select("id, name, image_url, images, image_key").order('updated_at', { ascending: false }).limit(5);
  if (err2) console.log(err2);
  else console.table(prods);
}
run();
