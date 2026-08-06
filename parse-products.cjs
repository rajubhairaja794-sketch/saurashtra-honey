const fs = require('fs');
let code = fs.readFileSync('src/lib/products.ts', 'utf8');

// Extract imports
const imports = [...code.matchAll(/import\s+(\w+)\s+from\s+["']@\/assets\/([^"']+)["']/g)];
let imageMap = {};
imports.forEach(m => { imageMap[m[1]] = m[2]; });

// Strip imports
code = code.replace(/import\s+.*?;\n/g, '');

// Inject image variables
let prefix = '';
for (const [key, val] of Object.entries(imageMap)) {
  prefix += `const ${key} = "${val}";\n`;
}

// Convert typescript to JS by removing types (rough approach)
// Let's just find the products array string
const startIdx = code.indexOf('export const products');
if (startIdx !== -1) {
    let arrStr = code.slice(startIdx);
    arrStr = arrStr.replace(/export const products: Product\[\] = /, 'const products = ');
    arrStr = arrStr.replace(/export const findProduct.*/s, ''); // remove the rest
    
    // We can evaluate this
    const executable = prefix + arrStr + '\nconsole.log(JSON.stringify(products, null, 2));';
    fs.writeFileSync('temp-executable.js', executable);
} else {
    console.error("Products array not found");
}
