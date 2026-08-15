import { createClient } from "@supabase/supabase-js";

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

async function testKeys() {
  const url = process.env.SUPABASE_URL;
  const anonKey = process.env.SUPABASE_PUBLISHABLE_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  console.log("URL:", url);
  console.log("Anon:", anonKey);
  console.log("Service:", serviceKey);

  console.log("\n--- Testing Anon Key ---");
  try {
    const anonClient = createClient(url, anonKey, { global: { fetch: createSupabaseFetch(anonKey) } });
    const { error } = await anonClient.from("categories").select("*").limit(1);
    if (error) console.log("Anon Error:", error.message);
    else console.log("Anon Success!");
  } catch(e) { console.log("Anon Exception:", e.message); }

  console.log("\n--- Testing Service Key ---");
  try {
    const serviceClient = createClient(url, serviceKey, { global: { fetch: createSupabaseFetch(serviceKey) } });
    const { error } = await serviceClient.from("categories").select("*").limit(1);
    if (error) console.log("Service Error:", error.message);
    else console.log("Service Success!");
  } catch(e) { console.log("Service Exception:", e.message); }
}

testKeys();
