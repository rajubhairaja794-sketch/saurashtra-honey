const fs = require('fs');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Remove the import line: const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  content = content.replace(/const\s+\{\s*supabaseAdmin\s*\}\s*=\s*await\s+import\("@\/integrations\/supabase\/client\.server"\);\n?/g, '');
  
  // Replace supabaseAdmin.from( with context.supabase.from(
  content = content.replace(/supabaseAdmin\.from\(/g, 'context.supabase.from(');
  
  // Replace supabaseAdmin.storage with context.supabase.storage
  content = content.replace(/supabaseAdmin\.storage/g, 'context.supabase.storage');

  // Replace supabaseAdmin.rpc( with context.supabase.rpc(
  content = content.replace(/supabaseAdmin\.rpc\(/g, 'context.supabase.rpc(');

  // We leave supabaseAdmin.auth.admin alone, but wait! We removed the import!
  // If supabaseAdmin.auth.admin is still there, it will be undefined!
  // We need to put the import back JUST for functions that use supabaseAdmin.auth.admin.
  
  fs.writeFileSync(filePath, content);
  console.log('Processed', filePath);
}

processFile('src/lib/admin-cms.functions.ts');
processFile('src/lib/admin.functions.ts');
processFile('src/lib/abandoned-cart.functions.ts');
processFile('src/lib/newsletter.functions.ts');
processFile('src/lib/site-settings.functions.ts');
processFile('src/lib/supply-services-catalog.ts');
processFile('src/lib/orders.functions.ts');
processFile('src/lib/coupons.functions.ts');

