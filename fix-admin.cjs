const fs = require('fs');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace supabaseAdmin.from( with context.supabase.from(
  content = content.replace(/supabaseAdmin\.from\(/g, 'context.supabase.from(');
  
  // Replace supabaseAdmin.storage with context.supabase.storage
  content = content.replace(/supabaseAdmin\.storage/g, 'context.supabase.storage');

  // Replace supabaseAdmin.rpc( with context.supabase.rpc(
  content = content.replace(/supabaseAdmin\.rpc\(/g, 'context.supabase.rpc(');

  // Handle the imports. We can just leave the import as is, it's fine if it's unused.
  // BUT we must make sure that `supabaseAdmin` is still used if `auth.admin` is called.
  
  fs.writeFileSync(filePath, content);
  console.log('Processed', filePath);
}

processFile('src/lib/admin-cms.functions.ts');
processFile('src/lib/admin.functions.ts');
processFile('src/lib/site-settings.functions.ts');

