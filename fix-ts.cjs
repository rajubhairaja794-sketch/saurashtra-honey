const fs = require('fs');

let adminContent = fs.readFileSync('src/lib/admin-cms.functions.ts', 'utf8');
adminContent = adminContent.replace(
  'async function audit(',
  'async function audit(supabase: any, '
);
adminContent = adminContent.replace(
  /await context\.supabase\n    \.from\("audit_logs"\)/g,
  'await supabase\n    .from("audit_logs")'
);
adminContent = adminContent.replace(
  /export async function seedDefaultCategoriesIfEmpty\(supabaseAdmin: SB\) \{/g,
  'export async function seedDefaultCategoriesIfEmpty(supabase: SB) {'
);
adminContent = adminContent.replace(
  /await context\.supabase\n      \.from\("categories"\)/g,
  'await supabase\n      .from("categories")'
);
adminContent = adminContent.replace(
  /await context\.supabase\n      \.from\("products"\)/g,
  'await supabase\n      .from("products")'
);
adminContent = adminContent.replace(
  /await context\.supabase\n      \.delete\(\)/g,
  'await supabase\n      .delete()'
);
adminContent = adminContent.replace(/await audit\(context\.userId/g, 'await audit(context.supabase, context.userId');
adminContent = adminContent.replace(/await audit\(\n/g, 'await audit(context.supabase, \n');
adminContent = adminContent.replace(/inputValidator\(/g, 'validator(');
fs.writeFileSync('src/lib/admin-cms.functions.ts', adminContent);

let supplyContent = fs.readFileSync('src/lib/supply-services-catalog.ts', 'utf8');
supplyContent = supplyContent.replace(
  'export async function seedWhoWeSupplyIfEmpty(supabaseAdmin: any) {',
  'export async function seedWhoWeSupplyIfEmpty(supabase: any) {'
);
supplyContent = supplyContent.replace(
  /await context\.supabase\n      \.from\("who_we_supply_services"\)/g,
  'await supabase\n      .from("who_we_supply_services")'
);
supplyContent = supplyContent.replace(
  /await context\.supabase\.from\("who_we_supply_services"\)\.insert/g,
  'await supabase.from("who_we_supply_services").insert'
);
supplyContent = supplyContent.replace(
  /await seedWhoWeSupplyIfEmpty\(context\.supabase\);/g,
  'const { supabase } = await import("@/integrations/supabase/client");\n      await seedWhoWeSupplyIfEmpty(supabase);'
);
supplyContent = supplyContent.replace(/inputValidator\(/g, 'validator(');
fs.writeFileSync('src/lib/supply-services-catalog.ts', supplyContent);

let couponsContent = fs.readFileSync('src/lib/coupons.functions.ts', 'utf8');
couponsContent = couponsContent.replace(/inputValidator\(/g, 'validator(');
fs.writeFileSync('src/lib/coupons.functions.ts', couponsContent);

let ordersContent = fs.readFileSync('src/lib/orders.functions.ts', 'utf8');
ordersContent = ordersContent.replace(/inputValidator\(/g, 'validator(');
fs.writeFileSync('src/lib/orders.functions.ts', ordersContent);

console.log("Fixed TS issues.");
