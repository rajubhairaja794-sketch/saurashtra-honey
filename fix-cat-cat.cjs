const fs = require('fs');
let content = fs.readFileSync('src/lib/category-catalog.ts', 'utf8');

// Remove the duplicated block starting at line 126
const parts = content.split('});\n    \n  if (error) {');
if (parts.length > 1) {
  content = parts[0] + '});\n';
  fs.writeFileSync('src/lib/category-catalog.ts', content, 'utf8');
}
