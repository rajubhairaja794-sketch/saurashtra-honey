const fs = require('fs');
let content = fs.readFileSync('src/lib/supply-services-catalog.ts', 'utf8');
content = content.replace(/const\s+\{\s*supabaseAdmin\s*\}\s*=\s*await\s+import\("@\/integrations\/supabase\/client\.server"\);\n?/g, '');
content = content.replace(/supabaseAdmin\.from\(/g, 'context.supabase.from(');
content = content.replace(/seedWhoWeSupplyIfEmpty\(supabaseAdmin\)/g, 'seedWhoWeSupplyIfEmpty(context.supabase)');
fs.writeFileSync('src/lib/supply-services-catalog.ts', content);
