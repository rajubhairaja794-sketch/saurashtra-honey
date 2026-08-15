import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL;
const anonKey = process.env.SUPABASE_PUBLISHABLE_KEY;

function isNewSupabaseApiKey(value) {
  return value.startsWith('sb_publishable_') || value.startsWith('sb_secret_');
}

function createSupabaseFetch(supabaseKey) {
  return (input, init) => {
    const headers = new Headers(init?.headers);
    if (isNewSupabaseApiKey(supabaseKey) && headers.get('Authorization') === `Bearer ${supabaseKey}`) {
      headers.delete('Authorization');
    }
    headers.set('apikey', supabaseKey);
    return fetch(input, { ...init, headers });
  };
}

async function run() {
  const client = createClient(url, anonKey, { global: { fetch: createSupabaseFetch(anonKey) } });
  
  console.log("--- PRODUCTS ---");
  const { data: prods, error: err2 } = await client.from("products").select("id, name, image_url, images, image_key").limit(5);
  if (err2) console.log(err2);
  else console.table(prods);
  
}
run();
