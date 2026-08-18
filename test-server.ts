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

import { supabaseAdmin } from "./src/integrations/supabase/client.server";

async function runTests() {
  console.log("Starting server tests...");

  // Test 1: Select one category
  const { data: catData, error: catErr } = await supabaseAdmin.from("categories").select("id").limit(1);
  console.log("DATABASE: " + (catErr ? "FAIL - " + catErr.message + " (Code: " + catErr.code + ")" : "PASS"));

  // Test 2: List the existing cache bucket
  const { data: listData, error: listErr } = await supabaseAdmin.storage.from("media").list("public_cache");
  console.log("STORAGE LIST: " + (listErr ? "FAIL - " + listErr.message : "PASS"));

  // Test 3: Upload a tiny JSON file
  const testPath = "public_cache/test_admin_" + Date.now() + ".json";
  const { data: upData, error: upErr } = await supabaseAdmin.storage.from("media").upload(testPath, JSON.stringify({test: true}), { contentType: "application/json" });
  console.log("STORAGE UPLOAD: " + (upErr ? "FAIL - " + upErr.message : "PASS"));

  // Test 4: Read it
  let readPass = false;
  if (upData) {
    const { data: readData, error: readErr } = await supabaseAdmin.storage.from("media").download(testPath);
    console.log("STORAGE READ: " + (readErr ? "FAIL - " + readErr.message : "PASS"));
    readPass = !readErr;
  } else {
    console.log("STORAGE READ: FAIL (Upload failed)");
  }

  // Test 5: Delete ONLY that temporary test file
  if (upData) {
    const { data: delData, error: delErr } = await supabaseAdmin.storage.from("media").remove([testPath]);
    console.log("STORAGE DELETE: " + (delErr ? "FAIL - " + delErr.message : "PASS"));
  } else {
    console.log("STORAGE DELETE: FAIL (Upload failed)");
  }
}

runTests().catch(console.error);
