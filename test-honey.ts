import fs from "fs";
function loadEnv(path) {
  if (!fs.existsSync(path)) return;
  const content = fs.readFileSync(path, "utf-8");
  for (const line of content.split("\n")) {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      let key = match[1];
      let value = match[2] || "";
      if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
      process.env[key] = value;
    }
  }
}
loadEnv(".env");
loadEnv(".env.local");
import { createClient } from "@supabase/supabase-js";
async function run() {
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_PUBLISHABLE_KEY);
  const { data, error } = await supabase.from("categories").select("id, name, slug, image_url").eq("slug", "honey").single();
  if (error) { console.error("Error fetching honey:", error); return; }
  console.log("=== HONEY DATABASE ROW ===");
  console.log(JSON.stringify(data, null, 2));
}
run();
