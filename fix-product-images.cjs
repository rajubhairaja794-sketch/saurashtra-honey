const fs = require('fs');

const file = 'src/lib/product-images.ts';
let content = fs.readFileSync(file, 'utf8');

// Replace the string manipulation inside resolveImage to just use the URL if it's already a valid supabase.co URL.
const regex = /if \(cleanUrl\.includes\('lxdkcqdkfuuqjudsysrr\.supabase\.co'\) \|\| cleanUrl\.includes\('\/media\/'\)\) \{[\s\S]*?resultUrl = `https:\/\/lxdkcqdkfuuqjudsysrr\.supabase\.co\/storage\/v1\/object\/public\/media\/\$\{path\}`;[\s\S]*?\}/;

const replacement = `if (cleanUrl.includes('lxdkcqdkfuuqjudsysrr.supabase.co')) {
      resultUrl = cleanUrl;
    } else if (cleanUrl.includes('/media/')) {
       const parts = cleanUrl.split('/media/');
       let path = parts[parts.length - 1];
       path = path.split('?')[0].split('#')[0];
       if (path.includes('supabase.co')) {
           const pathParts = path.split('/');
           path = "hero/" + pathParts[pathParts.length - 1];
       }
       resultUrl = \`https://lxdkcqdkfuuqjudsysrr.supabase.co/storage/v1/object/public/media/\${path}\`;
    }`;

content = content.replace(regex, replacement);
fs.writeFileSync(file, content, 'utf8');
