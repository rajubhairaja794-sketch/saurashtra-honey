import { createClient } from "@supabase/supabase-js";

async function testKeys2() {
  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  const client1 = createClient(url, serviceKey); // Default supabase client

  console.log("\n--- Testing Service Key (Default Client) ---");
  try {
    const { error } = await client1.from("categories").select("*").limit(1);
    if (error) console.log("Service Error:", error.message);
    else console.log("Service Success!");
  } catch(e) { console.log("Service Exception:", e.message); }
}

testKeys2();
