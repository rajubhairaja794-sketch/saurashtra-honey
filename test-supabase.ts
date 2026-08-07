import { createClient } from "@supabase/supabase-js";


const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testQuery() {
  console.log("Running query...");
  const { data, error } = await supabase
    .from("products")
    .select("id,slug,name,tagline,description,category,flora,badge,price,price_max,mrp,rating,reviews_count,sizes,benefits,image_key,image_url,images,attributes")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Supabase Error:", error);
  } else {
    console.log(`Found ${data?.length || 0} products.`);
  }

  // Also try status="published"
  const { data: data2, error: error2 } = await supabase
    .from("products")
    .select("id,slug,name,tagline,description,category,flora,badge,price,price_max,mrp,rating,reviews_count,sizes,benefits,image_key,image_url,images,attributes")
    .eq("status", "published")
    .order("sort_order", { ascending: true });
    
  if (error2) {
    console.error("Supabase Error 2:", error2);
  } else {
    console.log(`Found ${data2?.length || 0} products using status=published.`);
  }
}

testQuery();
