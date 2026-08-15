const fs = require('fs');

const files = [
  'src/lib/admin-cms.functions.ts',
  'src/lib/blog-server.functions.ts',
  'src/lib/newsletter.functions.ts',
  'src/lib/site-settings.functions.ts',
  'src/lib/admin.functions.ts'
];

for (const file of files) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Remove the import statement for supabaseAdmin
    content = content.replace(/const \{ supabaseAdmin \} = await import\("@\/integrations\/supabase\/client\.server"\);\n?/g, '');
    
    // Replace usages of supabaseAdmin with context.supabase
    content = content.replace(/supabaseAdmin/g, 'context.supabase');
    
    // Fix seedDefaultCategoriesIfEmpty signature if it exists
    content = content.replace(/export async function seedDefaultCategoriesIfEmpty\(context\.supabase: SB\)/g, 'export async function seedDefaultCategoriesIfEmpty(supabase: SB)');
    
    // Inside listCategories, fix the call to seedDefaultCategoriesIfEmpty
    content = content.replace(/await seedDefaultCategoriesIfEmpty\(context\.supabase\)/g, 'await seedDefaultCategoriesIfEmpty(context.supabase)');
    
    fs.writeFileSync(file, content, 'utf8');
    console.log("Fixed", file);
  }
}
