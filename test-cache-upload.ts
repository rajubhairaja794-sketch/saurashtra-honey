import { publishCategoriesJSON } from './src/lib/admin-cms.functions';
import * as fs from 'fs';

const env = fs.readFileSync('.env', 'utf-8').split('\n').reduce((acc, line) => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    acc[match[1]] = match[2].replace(/^["'](.*)["']$/, '$1');
  }
  return acc;
}, {} as Record<string, string>);

process.env.SUPABASE_URL = env.SUPABASE_URL || env.VITE_SUPABASE_URL;
process.env.SUPABASE_SERVICE_ROLE_KEY = env.SUPABASE_SERVICE_ROLE_KEY;

async function run() {
  const { supabaseAdmin } = await import("./src/integrations/supabase/client.server");
  try {
    await publishCategoriesJSON(supabaseAdmin);
    console.log("TEST SUCCESSFUL");
  } catch (e) {
    console.error("TEST FAILED:", e);
  }
}
run();
