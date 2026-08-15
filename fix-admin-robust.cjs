const fs = require('fs');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace instances where there's a newline or space
  // We want to replace `supabaseAdmin` with `context.supabase`, BUT we must NOT replace it in the import statement
  // `const { supabaseAdmin } = await import("@/integrations/supabase/client.server");`
  // AND we must NOT replace it in `supabaseAdmin.auth.admin`
  
  // First, hide the imports
  content = content.replace(/const \{\s*supabaseAdmin\s*\} = await import\("@\/integrations\/supabase\/client\.server"\);/g, '/*__IMPORT__*/');
  
  // Hide auth.admin
  content = content.replace(/supabaseAdmin\.auth\.admin/g, '/*__AUTH_ADMIN__*/');

  // Also hide `export async function seedDefaultCategoriesIfEmpty(supabaseAdmin: SB) {`
  content = content.replace(/seedDefaultCategoriesIfEmpty\(supabaseAdmin: SB\)/g, '/*__SEED__*/');

  // Now replace all remaining supabaseAdmin with context.supabase
  content = content.replace(/\bsupabaseAdmin\b/g, 'context.supabase');

  // Restore
  content = content.replace(/\/\*__IMPORT__\*\//g, 'const { supabaseAdmin } = await import("@/integrations/supabase/client.server");');
  content = content.replace(/\/\*__AUTH_ADMIN__\*\//g, 'supabaseAdmin.auth.admin');
  content = content.replace(/\/\*__SEED__\*\//g, 'seedDefaultCategoriesIfEmpty(supabaseAdmin: SB)');

  fs.writeFileSync(filePath, content);
  console.log('Processed', filePath);
}

processFile('src/lib/admin-cms.functions.ts');
processFile('src/lib/admin.functions.ts');
processFile('src/lib/site-settings.functions.ts');
processFile('src/lib/abandoned-cart.functions.ts');
processFile('src/lib/newsletter.functions.ts');
processFile('src/lib/orders.functions.ts');
processFile('src/lib/category-catalog.ts');
processFile('src/lib/coupons.functions.ts');
processFile('src/lib/supply-services-catalog.ts');

