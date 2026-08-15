const fs = require('fs');

const files = [
  'src/lib/supply-services-catalog.ts',
  'src/lib/orders.functions.ts',
  'src/lib/coupons.functions.ts'
];

for (const file of files) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Remove the import statement for supabaseAdmin
    content = content.replace(/const \{ supabaseAdmin \} = await import\("@\/integrations\/supabase\/client\.server"\);\n?/g, '');
    
    // Replace usages of supabaseAdmin with context.supabase
    content = content.replace(/supabaseAdmin/g, 'context.supabase');
    
    // Fix seedWhoWeSupplyIfEmpty signature if it exists
    content = content.replace(/export async function seedWhoWeSupplyIfEmpty\(context\.supabase: any\)/g, 'export async function seedWhoWeSupplyIfEmpty(supabase: any)');
    
    // Inside listWhoWeSupply, fix the call to seedWhoWeSupplyIfEmpty
    content = content.replace(/await seedWhoWeSupplyIfEmpty\(context\.supabase\)/g, 'await seedWhoWeSupplyIfEmpty(context.supabase)');
    
    fs.writeFileSync(file, content, 'utf8');
    console.log("Fixed", file);
  }
}
