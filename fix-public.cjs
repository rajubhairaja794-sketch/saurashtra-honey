const fs = require('fs');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace the import
  content = content.replace(/const\s+\{\s*supabaseAdmin\s*\}\s*=\s*await\s+import\("@\/integrations\/supabase\/client\.server"\);\n?/g, 'const { supabase } = await import("@/integrations/supabase/client");\n');
  
  // Replace supabaseAdmin.with supabase.
  content = content.replace(/supabaseAdmin\./g, 'supabase.');

  fs.writeFileSync(filePath, content);
  console.log('Processed', filePath);
}

processFile('src/lib/abandoned-cart.functions.ts');
processFile('src/lib/newsletter.functions.ts');
processFile('src/lib/orders.functions.ts');
processFile('src/lib/category-catalog.ts');
processFile('src/lib/coupons.functions.ts');

