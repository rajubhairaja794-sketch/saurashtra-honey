const fs = require('fs');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  // For public files, we replace context.supabase with supabase
  content = content.replace(/context\.supabase/g, 'supabase');
  fs.writeFileSync(filePath, content);
  console.log('Processed', filePath);
}

processFile('src/lib/abandoned-cart.functions.ts');
processFile('src/lib/newsletter.functions.ts');
processFile('src/lib/orders.functions.ts');
processFile('src/lib/category-catalog.ts');
processFile('src/lib/coupons.functions.ts');

